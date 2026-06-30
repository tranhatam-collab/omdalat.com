import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';
import { rateLimitWrite, RATE_LIMIT_TIERS } from '../lib/rate-limit';
import { requireCleanUpload } from '../lib/upload-pipeline';

/**
 * POST /api/omdalat/evidence
 * Submit rights evidence for a package/component (seller or admin)
 * Auth route — submitter must be authenticated.
 *
 * X6 FIX: Evidence no longer accepts arbitrary file_url. The client must upload
 * the file through /api/omdalat/uploads/* pipeline and pass a clean upload_id.
 */
export const handleEvidenceSubmit = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  // F2 FIX: Require authentication before any validation or DB write.
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  const rateLimit = await rateLimitWrite(
    env,
    'evidence:submit',
    (auth as any).email,
    RATE_LIMIT_TIERS.evidenceSubmit.limit,
    RATE_LIMIT_TIERS.evidenceSubmit.windowSeconds
  );
  if (!rateLimit.ok) return withCors(request, rateLimit.response, env);

  try {
    const body = await request.json() as any;
    const { package_id, component_id, evidence_type, reference_number, issuing_authority, issue_date, expiry_date, jurisdiction, description, upload_id, file_hash } = body;

    if (!package_id || !evidence_type || !description) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id, evidence_type, and description are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // X6 FIX: Reject legacy file_url submissions. Uploads must flow through the pipeline.
    if (body.file_url !== undefined) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'file_url is not accepted. Use upload_id from the upload pipeline.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    if (!upload_id) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'upload_id is required. Request an upload slot via POST /api/omdalat/uploads/request first.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // X3 FIX: Validate evidence_type against allowed enum
    const validEvidenceTypes = [
      'trademark_registration', 'business_license', 'domain_ownership',
      'copyright_certificate', 'social_media_proof', 'revenue_proof',
      'contract', 'other'
    ];
    if (!validEvidenceTypes.includes(evidence_type)) {
      return withCors(request, new Response(
        JSON.stringify({ error: `Invalid evidence_type. Must be one of: ${validEvidenceTypes.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // X3 FIX: Verify package ownership (submitter must own the package or be super admin)
    const pkg = await env.DB.prepare(
      `SELECT owner_email FROM asset_packages WHERE id = ?`
    ).bind(package_id).first() as any;
    if (!pkg) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }
    if (pkg.owner_email && pkg.owner_email !== (auth as any).email && (auth as any).role !== 'super') {
      return withCors(request, new Response(
        JSON.stringify({ error: 'You do not own this package. Only the package owner can submit evidence.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // X6 FIX: Verify the referenced upload is clean and owned by the submitter
    const uploadCheck = await requireCleanUpload(env, upload_id, (auth as any).email, 'evidence');
    if (!uploadCheck.ok) {
      return withCors(request, new Response(
        JSON.stringify({ error: uploadCheck.error }),
        { status: uploadCheck.status, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `ev_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO rights_evidence (id, package_id, component_id, evidence_type, reference_number, issuing_authority, issue_date, expiry_date, jurisdiction, description, upload_id, file_hash, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'clean', ?, ?)`
    ).bind(id, package_id, component_id || null, evidence_type, reference_number || null, issuing_authority || null, issue_date || null, expiry_date || null, jurisdiction || null, description, upload_id, file_hash || uploadCheck.record.sha256_hash, now, now).run();

    // Log registry event
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, 'evidence_submitted', 0, ?, ?)`
    ).bind(`rev_${Date.now()}`, package_id, (auth as any).email || 'unknown', `Evidence submitted: ${evidence_type} — ${description.slice(0, 80)}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, evidence_id: id, status: 'clean', upload_id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to submit evidence', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/evidence/:id/verify
 * Admin route — verify or reject submitted evidence
 */
export const handleEvidenceVerify = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const evidenceId = pathParts[3];
    const body = await request.json() as any;
    const { status, verification_notes } = body;

    if (!status || !['verified', 'rejected'].includes(status)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'status must be verified or rejected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE rights_evidence SET upload_status = ?, verified_by = ?, verified_at = ?, verification_notes = ?, updated_at = ? WHERE id = ?`
    ).bind(status, (auth as any).email, now, verification_notes || null, now, evidenceId).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, evidence_id: evidenceId, status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to verify evidence', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/transfers
 * Admin route — create a transfer checklist for a package
 */
export const handleTransferCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const body = await request.json() as any;
    const { package_id, offer_id, escrow_provider, escrow_reference } = body;

    if (!package_id) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `tc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO transfer_checklists (id, package_id, offer_id, status, escrow_provider, escrow_reference, escrow_status, created_at, updated_at)
       VALUES (?, ?, ?, 'in_progress', ?, ?, 'pending', ?, ?)`
    ).bind(id, package_id, offer_id || null, escrow_provider || null, escrow_reference || null, now, now).run();

    // Log registry event
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, 'transfer_initiated', 1, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, package_id, (auth as any).email, 'Transfer process initiated', now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, transfer_id: id, status: 'in_progress' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to create transfer', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
