import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * POST /api/omdalat/offers
 * Buyer submits an offer on a package (requires buyer_request_id from qualification)
 * Auth route — buyer must be authenticated and have a qualified buyer_request
 */
export const handleOfferCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  // F1 FIX: Require authentication before any validation or DB write.
  // Without this, anyone could create offers on any package.
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const body = await request.json() as any;
    const { package_id, buyer_request_id, offer_type, offer_amount_vnd, offer_amount_usd, terms, expires_at } = body;

    if (!package_id || !offer_type) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id and offer_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // X2 FIX: Ownership + package status + duplicate + amount validation.
    // Previous code only checked buyer_request qualification, not ownership.

    // 1. Verify package exists and is published
    const pkg = await env.DB.prepare(
      `SELECT publication_status, owner_email FROM asset_packages WHERE id = ?`
    ).bind(package_id).first() as any;
    if (!pkg) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }
    if (pkg.publication_status !== 'published') {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Package is not available for offers' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }
    // Seller cannot offer on their own package
    if (pkg.owner_email && pkg.owner_email === (auth as any).email) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Cannot submit offer on your own package' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // 2. Verify buyer_request ownership + qualification
    if (buyer_request_id) {
      const brq = await env.DB.prepare(
        `SELECT qualification_status, buyer_email FROM buyer_requests WHERE id = ?`
      ).bind(buyer_request_id).first() as any;
      if (!brq) {
        return withCors(request, new Response(
          JSON.stringify({ error: 'Buyer request not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      // X2 FIX: Verify the buyer_request belongs to the authenticated user
      if (brq.buyer_email && brq.buyer_email !== (auth as any).email && (auth as any).role !== 'super') {
        return withCors(request, new Response(
          JSON.stringify({ error: 'Buyer request does not belong to you' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      if (brq.qualification_status !== 'qualified') {
        return withCors(request, new Response(
          JSON.stringify({ error: 'Buyer must be qualified before submitting offer' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      // 3. Duplicate offer check
      const existing = await env.DB.prepare(
        `SELECT id FROM asset_offers WHERE package_id = ? AND buyer_request_id = ? AND status = 'submitted'`
      ).bind(package_id, buyer_request_id).first();
      if (existing) {
        return withCors(request, new Response(
          JSON.stringify({ error: 'An active offer already exists for this package and buyer request' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
    }

    // 4. Amount validation — reject negative amounts
    if (offer_amount_vnd !== null && offer_amount_vnd !== undefined && offer_amount_vnd < 0) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Offer amount cannot be negative' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }
    if (offer_amount_usd !== null && offer_amount_usd !== undefined && offer_amount_usd < 0) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Offer amount cannot be negative' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `ofr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO asset_offers (id, package_id, buyer_request_id, offer_type, offer_amount_vnd, offer_amount_usd, currency, status, terms, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'VND', 'submitted', ?, ?, ?, ?)`
    ).bind(id, package_id, buyer_request_id || null, offer_type, offer_amount_vnd || null, offer_amount_usd || null, terms ? JSON.stringify(terms) : null, expires_at || null, now, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'offer_submitted', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, package_id, (auth as any).email || buyer_request_id || 'unknown', `Offer ${offer_type} submitted`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, offer_id: id, status: 'submitted' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to create offer', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/offers/:package_id
 * Admin route — list offers for a package
 */
export const handleOfferList = async (
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
    const packageId = pathParts[3];
    const status = url.searchParams.get('status');

    let query = `SELECT * FROM asset_offers WHERE package_id = ?`;
    const binds: string[] = [packageId];
    if (status) {
      query += ` AND status = ?`;
      binds.push(status);
    }
    query += ` ORDER BY created_at DESC`;

    const result = await env.DB.prepare(query).bind(...binds).all();

    return withCors(request, new Response(
      JSON.stringify({ offers: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list offers', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/offers/:id/accept
 * POST /api/omdalat/offers/:id/reject
 * Admin route — accept or reject an offer
 */
export const handleOfferRespond = async (
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
    const offerId = pathParts[3];
    const action = pathParts[4]; // 'accept' or 'reject'
    const status = action === 'accept' ? 'accepted' : 'rejected';

    const offer = await env.DB.prepare(
      `SELECT package_id FROM asset_offers WHERE id = ?`
    ).bind(offerId).first() as any;

    if (!offer) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Offer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE asset_offers SET status = ?, updated_at = ? WHERE id = ?`
    ).bind(status, now, offerId).run();

    // Log registry event (public for accepted, private for rejected)
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, offer.package_id, `offer_${status}`, status === 'accepted' ? 1 : 0, (auth as any).email, `Offer ${offerId} ${status}`, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, offer.package_id, `offer_${status}`, (auth as any).email, `Offer ${offerId} ${status}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, offer_id: offerId, status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to respond to offer', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/buyer-requests/:id/qualify
 * Admin route — qualify or reject a buyer request
 */
export const handleBuyerQualify = async (
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
    const requestId = pathParts[3];
    const body = await request.json() as any;
    const { qualification_status, notes } = body;

    if (!qualification_status || !['qualified', 'rejected'].includes(qualification_status)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'qualification_status must be qualified or rejected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE buyer_requests SET qualification_status = ?, updated_at = ? WHERE id = ?`
    ).bind(qualification_status, now, requestId).run();

    // Log audit event
    const brq = await env.DB.prepare(
      `SELECT package_id FROM buyer_requests WHERE id = ?`
    ).bind(requestId).first() as any;

    if (brq?.package_id) {
      await env.DB.prepare(
        `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
         VALUES (?, ?, 'buyer_${qualification_status}', ?, ?, ?)`
      ).bind(`ae_${Date.now()}`, brq.package_id, (auth as any).email, notes || `Buyer request ${requestId} ${qualification_status}`, now).run();
    }

    return withCors(request, new Response(
      JSON.stringify({ success: true, request_id: requestId, qualification_status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to qualify buyer', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/buyer-requests
 * Admin route — list all buyer requests
 */
export const handleBuyerRequestList = async (
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
    const status = url.searchParams.get('status');

    let query = `SELECT * FROM buyer_requests`;
    const binds: string[] = [];
    if (status) {
      query += ` WHERE qualification_status = ?`;
      binds.push(status);
    }
    query += ` ORDER BY created_at DESC LIMIT 100`;

    const result = await env.DB.prepare(query).bind(...binds).all();

    return withCors(request, new Response(
      JSON.stringify({ requests: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list buyer requests', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/listings/:id/approve
 * POST /api/omdalat/listings/:id/suspend
 * Admin route — approve or suspend a marketplace listing
 */
export const handleListingApprove = async (
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
    const listingId = pathParts[3];
    const action = pathParts[4]; // 'approve' or 'suspend'
    const newStatus = action === 'approve' ? 'live' : 'paused';

    const listing = await env.DB.prepare(
      `SELECT package_id FROM marketplace_listings WHERE id = ?`
    ).bind(listingId).first() as any;

    if (!listing) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Listing not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE marketplace_listings SET status = ?, approved_by = ?, approved_at = ?, updated_at = ? WHERE id = ?`
    ).bind(newStatus, (auth as any).email, now, now, listingId).run();

    // Log registry event
    const eventType = action === 'approve' ? 'listing_approved' : 'listing_delisted';
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, ?, 1, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, listing.package_id, eventType, (auth as any).email, `Listing ${listingId} ${newStatus}`, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, listing.package_id, `listing_${action}d`, (auth as any).email, `Listing ${listingId} → ${newStatus}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, listing_id: listingId, status: newStatus }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to update listing', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
