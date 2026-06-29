import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/asset-packages
 * Create a new Brand Asset Package (seller intake)
 * Public route — anyone can submit an asset package for review
 */
export const handleAssetPackageCreate = async (
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

  try {
    const body = await request.json() as any;
    const { name_vi, name_en, summary_vi, summary_en, seller_name, seller_contact, brand_id } = body;

    if (!name_vi || !name_en) {
      const response = new Response(
        JSON.stringify({ error: 'name_vi and name_en are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    if (!seller_name || !seller_contact) {
      const response = new Response(
        JSON.stringify({ error: 'seller_name and seller_contact are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const now = new Date().toISOString();
    const id = `bap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const publicId = `BAP-2026-${String(Date.now()).slice(-4)}`;
    const slug = name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Create or find seller (owner)
    let sellerId: string | null = null;
    if (brand_id) {
      const existingBrand = await env.DB.prepare(
        `SELECT owner_id FROM brands WHERE id = ?`
      ).bind(brand_id).first();
      if (existingBrand) {
        sellerId = existingBrand.owner_id as string;
      }
    }

    if (!sellerId) {
      sellerId = `own_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await env.DB.prepare(
        `INSERT INTO owners (id, name, contact, consent_status, created_at, updated_at) VALUES (?, ?, ?, 'pending', ?, ?)`
      ).bind(sellerId, seller_name, seller_contact, now, now).run();
    }

    await env.DB.prepare(
      `INSERT INTO asset_packages (id, brand_id, seller_id, public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, listing_status, publication_status, market_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'submitted', 'private_preview', 'not_for_sale', ?, ?)`
    ).bind(id, brand_id || null, sellerId, publicId, slug, name_vi, name_en, summary_vi || null, summary_en || null, now, now).run();

    // Log registry event
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, 'package_created', 1, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, id, seller_name, `Package ${publicId} created: ${name_vi}`, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'package_created', ?, 'Seller intake submission', ?)`
    ).bind(`ae_${Date.now()}`, id, seller_name, now).run();

    const response = new Response(
      JSON.stringify({
        success: true,
        package_id: id,
        public_id: publicId,
        slug,
        message: 'Asset package submitted for review. You will be contacted about verification.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to create asset package', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};

/**
 * GET /api/omdalat/asset-packages/:id
 * Get a single asset package with components and trust labels
 * Public for published packages, requires auth for draft/private
 */
export const handleAssetPackageGet = async (
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
    const packageId = pathParts[3];

    if (!packageId) {
      const response = new Response(
        JSON.stringify({ error: 'Package ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const pkg = await env.DB.prepare(
      `SELECT * FROM asset_packages WHERE id = ? OR public_id = ? OR slug = ?`
    ).bind(packageId, packageId, packageId).first();

    if (!pkg) {
      const response = new Response(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    // If package is not published, require auth
    if (pkg.publication_status !== 'published') {
      const auth = await requireAuth(request, env);
      if (auth instanceof Response) {
        return withCors(request, auth, env);
      }
    }

    const components = await env.DB.prepare(
      `SELECT * FROM asset_components WHERE package_id = ? ORDER BY sort_order`
    ).bind(pkg.id).all();

    const trustLabels = await env.DB.prepare(
      `SELECT atl.* FROM asset_trust_labels atl
       JOIN asset_components ac ON atl.component_id = ac.id
       WHERE ac.package_id = ?`
    ).bind(pkg.id).all();

    const registryEvents = await env.DB.prepare(
      `SELECT * FROM registry_events WHERE package_id = ? AND public_visible = 1 ORDER BY created_at DESC LIMIT 20`
    ).bind(pkg.id).all();

    const response = new Response(
      JSON.stringify({
        package: pkg,
        components: components.results || [],
        trust_labels: trustLabels.results || [],
        registry_events: registryEvents.results || [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to get package', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};

/**
 * GET /api/omdalat/asset-packages
 * List asset packages (admin only — full list)
 * Public can only see published packages via marketplace listings
 */
export const handleAssetPackageList = async (
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
    const status = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 100);

    let query = `SELECT * FROM asset_packages`;
    const binds: string[] = [];

    if (status) {
      query += ` WHERE listing_status = ?`;
      binds.push(status);
    }
    query += ` ORDER BY created_at DESC LIMIT ?`;
    binds.push(String(limit));

    const result = await env.DB.prepare(query).bind(...binds).all();

    const response = new Response(
      JSON.stringify({
        packages: result.results || [],
        count: result.results?.length || 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to list packages', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};
