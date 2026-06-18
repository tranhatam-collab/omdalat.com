import type { Env } from '../index';

export interface AuditLogData {
  error?: string;
  [key: string]: any;
}

export const logAudit = async (
  env: Env,
  actorUserId: string | null,
  action: string,
  entityType: string,
  entityId: string | null,
  data: AuditLogData = {}
): Promise<void> => {
  try {
    const id = `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO audit_logs
       (id, actor_user_id, action, entity_type, entity_id, old_values, new_values, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      actorUserId,
      action,
      entityType,
      entityId,
      null, // old_values
      JSON.stringify(data), // new_values
      'success',
      now
    ).run();
  } catch (error) {
    console.error('Failed to log audit:', error);
    // Don't throw - audit logging should not break the main flow
  }
};
