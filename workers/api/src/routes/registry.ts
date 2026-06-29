import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/registry/:public_id/events
 * Add a registry event (admin only)
 */
export const handleRegistryEventAdd = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'POST') {
    const response = new Response('Method not allowed', { status: 405 });
    return withCors(request, response, env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) {
    return withCors(request, auth, env);
  }

  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) {
    return withCors(request, superCheck, env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const publicId = pathParts[3];
    const body = await request.json() as any;
    const { event_type, description, public_visible, metadata } = body;

    if (!event_type || !description) {
      const response = new Response(
        JSON.stringify({ error: 'event_type and description are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const pkg = await env.DB.prepare(
      `SELECT id FROM asset_packages WHERE public_id = ?`
    ).bind(publicId).first();

    if (!pkg) {
      const response = new Response(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const now = new Date().toISOString();
    const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, metadata, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, pkg.id, event_type, public_visible ? 1 : 0, (auth as any).email, description, metadata ? JSON.stringify(metadata) : null, now).run();

    const response = new Response(
      JSON.stringify({ success: true, event_id: id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to add registry event', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};

/**
 * GET /api/omdalat/registry/:public_id
 * Get public registry record for a package
 * Public route — shows provenance timeline and public events
 */
export const handleRegistryGet = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'GET') {
    const response = new Response('Method not allowed', { status: 405 });
    return withCors(request, response, env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const publicId = pathParts[3];

    if (!publicId) {
      const response = new Response(
        JSON.stringify({ error: 'Public ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const pkg = await env.DB.prepare(
      `SELECT id, public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, market_status, created_at, updated_at
       FROM asset_packages WHERE public_id = ?`
    ).bind(publicId).first();

    if (!pkg) {
      const response = new Response(
        JSON.stringify({ error: 'Registry record not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const events = await env.DB.prepare(
      `SELECT event_type, actor, description, created_at FROM registry_events
       WHERE package_id = ? AND public_visible = 1 ORDER BY created_at ASC`
    ).bind(pkg.id).all();

    const components = await env.DB.prepare(
      `SELECT ac.component_class, ac.component_name, ac.status,
              GROUP_CONCAT(atl.label, ', ') as trust_labels
       FROM asset_components ac
       LEFT JOIN asset_trust_labels atl ON atl.component_id = ac.id
       WHERE ac.package_id = ?
       GROUP BY ac.id ORDER BY ac.sort_order`
    ).bind(pkg.id).all();

    const response = new Response(
      JSON.stringify({
        package: pkg,
        components: components.results || [],
        provenance: events.results || [],
        trust_labels_note: 'Labels are per-component. No global Verified badge.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to get registry record', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};
