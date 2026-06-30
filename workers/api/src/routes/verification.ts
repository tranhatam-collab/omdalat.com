import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/verification/cases
 * Admin route — create a verification case for a package
 */
export const handleVerificationCaseCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const body = await request.json() as any;
    const { package_id, case_type, priority } = body;

    if (!package_id || !case_type) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id and case_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `vc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO verification_cases (id, package_id, case_type, status, priority, submitted_by, submitted_at, created_at, updated_at)
       VALUES (?, ?, ?, 'open', ?, ?, ?, ?, ?)`
    ).bind(id, package_id, case_type, priority || 'normal', (auth as any).email, now, now, now).run();

    // Log registry event
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, 'verification_started', 0, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, package_id, (auth as any).email, `Verification case ${case_type} opened`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, case_id: id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to create case', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/verification/cases/:id/tasks
 * Admin route — add a verification task to a case
 */
export const handleVerificationTaskAdd = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const caseId = pathParts[4];
    const body = await request.json() as any;
    const { task_type, description, evidence_id } = body;

    if (!task_type || !description) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'task_type and description are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `vt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO verification_tasks (id, case_id, task_type, description, status, evidence_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)`
    ).bind(id, caseId, task_type, description, evidence_id || null, now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, task_id: id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to add task', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/verification/cases/:id/complete
 * Admin route — mark a verification case as approved or rejected
 */
export const handleVerificationCaseComplete = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const caseId = pathParts[4];
    const body = await request.json() as any;
    const { status, review_notes } = body;

    if (!status || !['approved', 'rejected', 'withdrawn'].includes(status)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'status must be approved, rejected, or withdrawn' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();

    // Get case to find package_id
    const caseRow = await env.DB.prepare(
      `SELECT package_id, case_type FROM verification_cases WHERE id = ?`
    ).bind(caseId).first();

    if (!caseRow) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Case not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    await env.DB.prepare(
      `UPDATE verification_cases SET status = ?, reviewed_by = ?, reviewed_at = ?, review_notes = ?, updated_at = ? WHERE id = ?`
    ).bind(status, (auth as any).email, now, review_notes || null, now, caseId).run();

    // Log registry event (public for approved, private for rejected)
    const eventType = status === 'approved' ? 'verification_passed' : 'verification_failed';
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, caseRow.package_id, eventType, status === 'approved' ? 1 : 0, (auth as any).email,
      `Verification ${caseRow.case_type}: ${status}${review_notes ? ' — ' + review_notes : ''}`, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, caseRow.package_id, `verification_${status}`, (auth as any).email, review_notes || `Case ${caseId} ${status}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, case_id: caseId, status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to complete case', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
