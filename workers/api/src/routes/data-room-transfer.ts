import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/data-rooms
 * Admin route — create a data room for a package
 */
export const handleDataRoomCreate = async (
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
    const { package_id, name, description, manifest } = body;

    if (!package_id || !name) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id and name are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `dr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // manifest is a JSON array of file descriptors: [{key, name, type, hash, size}]
    await env.DB.prepare(
      `INSERT INTO data_rooms (id, package_id, name, description, manifest, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'active', ?, ?)`
    ).bind(id, package_id, name, description || null, manifest ? JSON.stringify(manifest) : '[]', now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, data_room_id: id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to create data room', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/data-rooms/:id
 * Admin or qualified buyer — get data room manifest (file list, not file contents)
 */
export const handleDataRoomGet = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const dataRoomId = pathParts[3];

    // X1 FIX: Require authentication FIRST — before any data lookup.
    // Buyer access is verified via session, NOT a spoofable X-Buyer-Email header.
    const auth = await requireAuth(request, env);
    if (auth instanceof Response) return withCors(request, auth, env);

    let hasAccess = false;
    const superCheck = requireSuper(auth as any);
    if (!(superCheck instanceof Response)) {
      hasAccess = true; // admin/super has full access
    }

    if (!hasAccess) {
      // Check if this authenticated user has a granted access row.
      // Uses auth.email from verified session — NOT a client-controlled header.
      const grant = await env.DB.prepare(
        `SELECT id FROM data_room_access_grants WHERE data_room_id = ? AND buyer_email = ? AND status = 'granted' AND (expires_at IS NULL OR expires_at > ?)`
      ).bind(dataRoomId, (auth as any).email, new Date().toISOString()).first();
      if (grant) hasAccess = true;
    }

    if (!hasAccess) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Access denied. Request access first.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Now fetch the data room (auth + access already established)
    const dr = await env.DB.prepare(
      `SELECT * FROM data_rooms WHERE id = ?`
    ).bind(dataRoomId).first() as any;

    if (!dr) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Data room not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Return manifest only — not file contents
    return withCors(request, new Response(
      JSON.stringify({
        data_room: {
          id: dr.id,
          package_id: dr.package_id,
          name: dr.name,
          description: dr.description,
          manifest: JSON.parse(dr.manifest || '[]'),
          status: dr.status,
        },
        note: 'Manifest shows file metadata only. File contents require separate access per file.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to get data room', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/data-rooms/:id/request-access
 * Buyer requests access to a data room
 */
export const handleDataRoomRequestAccess = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  // X4 FIX: Require authentication. Previously anyone could submit access requests
  // with any email, enabling spam and impersonation.
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const dataRoomId = pathParts[3];
    const body = await request.json() as any;
    const { reason } = body;

    // Use authenticated email — NOT body-provided email (prevents impersonation)
    const buyer_email = (auth as any).email;
    const buyer_name = (auth as any).email; // Can be enhanced with profile lookup

    // X4 FIX: Verify data room exists before creating a request. Prevents orphaned
    // pending grants for rooms that don't exist (if FK is not enforced or not present).
    const dr = await env.DB.prepare(
      `SELECT id FROM data_rooms WHERE id = ?`
    ).bind(dataRoomId).first();
    if (!dr) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Data room not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `drg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO data_room_access_grants (id, data_room_id, buyer_email, buyer_name, reason, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`
    ).bind(id, dataRoomId, buyer_email, buyer_name, reason || null, now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, request_id: id, status: 'pending' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to request access', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/data-rooms/:id/grants/:grant_id/approve
 * Admin route — approve or reject data room access
 */
export const handleDataRoomGrantApprove = async (
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
    const grantId = pathParts[5];
    const body = await request.json() as any;
    const { status, expires_at } = body;

    if (!status || !['granted', 'rejected'].includes(status)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'status must be granted or rejected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE data_room_access_grants SET status = ?, expires_at = ?, updated_at = ? WHERE id = ?`
    ).bind(status, expires_at || null, now, grantId).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, grant_id: grantId, status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to update grant', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/transfers/:id
 * Admin route — get transfer checklist detail
 */
export const handleTransferGet = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const transferId = pathParts[3];

    const transfer = await env.DB.prepare(
      `SELECT * FROM transfer_checklists WHERE id = ?`
    ).bind(transferId).first();

    if (!transfer) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Transfer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    return withCors(request, new Response(
      JSON.stringify({ transfer }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to get transfer', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/transfers/:id/update-step
 * Admin route — update a single step in the transfer checklist
 */
export const handleTransferUpdateStep = async (
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
    const transferId = pathParts[3];
    const body = await request.json() as any;
    const { step, status, notes } = body;

    // Allowed steps and their status fields
    const allowedSteps: Record<string, string> = {
      domain: 'domain_transfer_status',
      app: 'app_transfer_status',
      repo: 'repo_transfer_status',
      trademark: 'trademark_transfer_status',
      contract: 'contract_status',
      escrow: 'escrow_status',
      recording: 'recording_status',
    };

    const column = allowedSteps[step];
    if (!column) {
      return withCors(request, new Response(
        JSON.stringify({ error: `Invalid step. Allowed: ${Object.keys(allowedSteps).join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    if (!status || !['pending', 'in_progress', 'completed', 'failed'].includes(status)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'status must be pending, in_progress, completed, or failed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const notesColumn = allowedSteps[step].replace('_status', '_notes');
    const now = new Date().toISOString();

    // Build UPDATE dynamically — column names are from allowlist, safe
    await env.DB.prepare(
      `UPDATE transfer_checklists SET ${column} = ?, ${notesColumn} = ?, updated_at = ? WHERE id = ?`
    ).bind(status, notes || null, now, transferId).run();

    // Check if all steps completed
    const tc = await env.DB.prepare(
      `SELECT domain_transfer_status, app_transfer_status, repo_transfer_status, trademark_transfer_status, contract_status, escrow_status, recording_status, package_id FROM transfer_checklists WHERE id = ?`
    ).bind(transferId).first() as any;

    if (tc) {
      const allComplete = ['domain_transfer_status', 'app_transfer_status', 'repo_transfer_status', 'trademark_transfer_status', 'contract_status', 'escrow_status', 'recording_status']
        .every(col => tc[col] === 'completed');

      if (allComplete) {
        await env.DB.prepare(
          `UPDATE transfer_checklists SET status = 'completed', completed_at = ? WHERE id = ?`
        ).bind(now, transferId).run();

        // Log registry event
        await env.DB.prepare(
          `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
           VALUES (?, ?, 'transfer_completed', 1, ?, ?, ?)`
        ).bind(`rev_${Date.now()}`, tc.package_id, (auth as any).email, 'Transfer process completed', now).run();
      }
    }

    return withCors(request, new Response(
      JSON.stringify({ success: true, transfer_id: transferId, step, status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to update step', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
