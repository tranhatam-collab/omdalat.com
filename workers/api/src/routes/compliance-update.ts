import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * Audited compliance update route.
 * REQUIREMENTS:
 * - Super admin auth
 * - evidence_id for EACH field being updated (must exist in compliance_evidence table)
 * - reason string (min 20 chars)
 * - Updates both compliance_checklists AND inserts audit trail
 *
 * This is the ONLY approved way to set compliance to 'verified'/'approved'.
 * Direct D1 UPDATE commands are prohibited for compliance fields.
 */

const ALLOWED_VALUES = new Set(['verified', 'approved', 'not_applicable', 'unknown', 'pending']);
const AUDITABLE_FIELDS = ['business_registration', 'lodging_compliance', 'pccc', 'food_safety', 'tourism_service'];

export const handleComplianceUpdate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Require super admin
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const body = await request.json() as {
      brand_id: string;
      updates: Record<string, string>;
      evidence_map: Record<string, string>; // field -> evidence_id
      reason: string;
    };

    const { brand_id, updates, evidence_map, reason } = body;

    // Validate inputs
    if (!brand_id || typeof brand_id !== 'string') {
      return new Response(JSON.stringify({ error: 'brand_id required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return new Response(JSON.stringify({ error: 'updates required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!evidence_map || Object.keys(evidence_map).length === 0) {
      return new Response(JSON.stringify({
        error: 'evidence_map required — every updated field must reference an evidence_id from compliance_evidence table'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!reason || reason.length < 20) {
      return new Response(JSON.stringify({
        error: 'reason required (min 20 chars) — describe why this compliance status is being changed'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Validate fields
    for (const field of Object.keys(updates)) {
      if (!AUDITABLE_FIELDS.includes(field)) {
        return new Response(JSON.stringify({
          error: `Field '${field}' is not auditable. Allowed: ${AUDITABLE_FIELDS.join(', ')}`
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      if (!ALLOWED_VALUES.has(updates[field])) {
        return new Response(JSON.stringify({
          error: `Value '${updates[field]}' for '${field}' is not allowed. Allowed: ${Array.from(ALLOWED_VALUES).join(', ')}`
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      if (!evidence_map[field]) {
        return new Response(JSON.stringify({
          error: `Field '${field}' update requires an evidence_id in evidence_map`
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Verify brand exists
    const brand = await env.DB.prepare(
      `SELECT id, slug, name_vi FROM brands WHERE id = ?`
    ).bind(brand_id).first() as any;

    if (!brand) {
      return new Response(JSON.stringify({ error: 'Brand not found' }), {
        status: 404, headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify all evidence_ids exist and belong to this brand
    for (const [field, evidenceId] of Object.entries(evidence_map)) {
      const evidence = await env.DB.prepare(
        `SELECT id, evidence_type FROM compliance_evidence WHERE id = ? AND brand_id = ?`
      ).bind(evidenceId, brand_id).first() as any;

      if (!evidence) {
        return new Response(JSON.stringify({
          error: `Evidence '${evidenceId}' not found for brand '${brand_id}'. Add evidence via compliance_evidence INSERT before updating compliance.`
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Fetch current values for audit
    const current = await env.DB.prepare(
      `SELECT ${Object.keys(updates).join(', ')} FROM compliance_checklists WHERE brand_id = ?`
    ).bind(brand_id).first() as any;

    const beforeJson = current ? JSON.stringify(current) : null;

    // Build and execute UPDATE
    const setClauses = Object.keys(updates).map((field, i) => `${field} = ?`).join(', ');
    const now = new Date().toISOString();

    const updateResult = await env.DB.prepare(
      `UPDATE compliance_checklists SET ${setClauses}, updated_at = ? WHERE brand_id = ?`
    ).bind(...Object.values(updates), now, brand_id).run();

    if (!updateResult.success) {
      return new Response(JSON.stringify({ error: 'Failed to update compliance' }), {
        status: 500, headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert audit event into lily_audit_events
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await env.DB.prepare(
      `INSERT INTO lily_audit_events (event_id, brand_id, actor_user_id, action, entity_type, entity_id, before_json, after_json, reason, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      eventId,
      brand_id,
      auth.userId || auth.email || 'unknown',
      'update_compliance',
      'compliance_checklists',
      brand_id,
      beforeJson,
      JSON.stringify(updates),
      `${reason} | evidence: ${JSON.stringify(evidence_map)}`,
      now
    ).run();

    // Insert brand_approval record
    const approvalId = `apr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await env.DB.prepare(
      `INSERT INTO brand_approvals (id, brand_id, action, actor, reason, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      approvalId,
      brand_id,
      'update_compliance',
      auth.userId || auth.email || 'unknown',
      `Compliance updated: ${Object.entries(updates).map(([k,v]) => `${k}=${v}`).join(', ')}. Reason: ${reason}. Evidence: ${JSON.stringify(evidence_map)}`,
      now
    ).run();

    // Log to general audit_logs too
    await logAudit(env, auth.userId || auth.email || null, 'update_compliance', 'compliance_checklists', brand_id, {
      brand_id,
      updates,
      evidence_map,
      reason,
      actor: auth.userId || auth.email
    });

    return new Response(JSON.stringify({
      success: true,
      brand_id,
      updates,
      evidence_map,
      audit_event_id: eventId,
      approval_id: approvalId,
      message: 'Compliance updated. This change is now auditable.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Compliance update error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
