import type { Env } from '../index';
import { generateId } from './id-gen';

/**
 * Log audit entry for write operations
 */
export const logAudit = async (
  env: Env,
  actorUserId: string | null,
  action: string,
  entityType: string,
  entityId: string | null,
  payload: unknown
): Promise<void> => {
  try {
    const auditId = generateId('audit');
    const sanitizedPayload = sanitizePayload(payload);

    await env.DB.prepare(
      `INSERT INTO audit_logs
       (id, actor_user_id, action, entity_type, entity_id, new_values, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      auditId,
      actorUserId,
      action,
      entityType,
      entityId,
      JSON.stringify(sanitizedPayload),
      new Date().toISOString()
    ).run();
  } catch (error) {
    console.error('Audit log error:', error);
    // Don't throw — audit failure shouldn't block the operation
  }
};

/**
 * Sanitize sensitive fields from audit payloads
 */
const sanitizePayload = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizePayload);
  }

  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Filter out sensitive keys
      if (
        /(password|token|secret|hash|api.?key|apikey|private.?key|privatekey|signature|jwt|session.?id|sessionid|webhook|oauth|refresh|credit.?card|creditcard|cvv|ssn)/i.test(
          key
        )
      ) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizePayload(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  return data;
};
