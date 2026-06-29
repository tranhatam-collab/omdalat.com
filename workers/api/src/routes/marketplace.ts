import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/marketplace/request-access
 * Public route — buyer submits request for access to marketplace
 */
export const handleMarketplaceRequestAccess = async (
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
    const { buyer_name, buyer_email, buyer_organization, buyer_type, package_id, message } = body;

    if (!buyer_name || !buyer_email) {
      const response = new Response(
        JSON.stringify({ error: 'buyer_name and buyer_email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const now = new Date().toISOString();
    const id = `brq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // If package_id is provided, verify it exists
    let pkgId = package_id;
    if (pkgId) {
      const pkg = await env.DB.prepare(
        `SELECT id FROM asset_packages WHERE id = ? OR public_id = ? OR slug = ?`
      ).bind(pkgId, pkgId, pkgId).first();
      if (!pkg) {
        const response = new Response(
          JSON.stringify({ error: 'Package not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
        return withCors(request, response, env);
      }
      pkgId = pkg.id as string;
    }

    await env.DB.prepare(
      `INSERT INTO buyer_requests (id, package_id, buyer_name, buyer_email, buyer_organization, buyer_type, qualification_status, message, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)`
    ).bind(id, pkgId || null, buyer_name, buyer_email, buyer_organization || null, buyer_type || 'individual', message || null, now, now).run();

    const response = new Response(
      JSON.stringify({
        success: true,
        request_id: id,
        message: 'Your request has been received. You will be contacted about qualification.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to submit request', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};

/**
 * GET /api/omdalat/marketplace/listings
 * Public route — get curated listings (only approved + live)
 */
export const handleMarketplaceListings = async (
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
    // Only show listings that are approved and live
    // AND the package is published
    // AND market_status allows viewing
    const result = await env.DB.prepare(
      `SELECT ml.id, ml.listing_type, ml.title_vi, ml.title_en, ml.description_vi, ml.description_en,
              ml.asking_price_vnd, ml.asking_price_usd, ml.currency,
              ap.public_id, ap.slug, ap.name_vi, ap.name_en, ap.asset_level, ap.summary_vi, ap.summary_en
       FROM marketplace_listings ml
       JOIN asset_packages ap ON ml.package_id = ap.id
       WHERE ml.status = 'live'
         AND ap.publication_status = 'published'
         AND ap.market_status IN ('request_access_only', 'private_tease', 'open_listing')
       ORDER BY ml.updated_at DESC`
    ).all();

    const response = new Response(
      JSON.stringify({
        listings: result.results || [],
        count: result.results?.length || 0,
        note: 'All listings are curated. No buy/bid buttons. Contact via request-access.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to get listings', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};

/**
 * POST /api/omdalat/marketplace/listings
 * Admin route — create a marketplace listing
 */
export const handleMarketplaceListingCreate = async (
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
    const body = await request.json() as any;
    const { package_id, listing_type, title_vi, title_en, description_vi, description_en, asking_price_vnd, asking_price_usd } = body;

    if (!package_id || !title_vi || !title_en) {
      const response = new Response(
        JSON.stringify({ error: 'package_id, title_vi, title_en are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    const now = new Date().toISOString();
    const id = `ml_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    await env.DB.prepare(
      `INSERT INTO marketplace_listings (id, package_id, listing_type, title_vi, title_en, description_vi, description_en, asking_price_vnd, asking_price_usd, currency, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'VND', 'pending_review', ?, ?)`
    ).bind(id, package_id, listing_type || 'private_teaser', title_vi, title_en, description_vi || null, description_en || null, asking_price_vnd || null, asking_price_usd || null, now, now).run();

    const response = new Response(
      JSON.stringify({ success: true, listing_id: id, status: 'pending_review' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to create listing', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};
