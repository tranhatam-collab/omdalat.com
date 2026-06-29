import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuth, requireSuper } from '../lib/auth';

/**
 * GET /api/omdalat/brand-assets/public
 * Public route — list published packages (no sensitive data)
 */
export const handlePublicBrandAssets = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const result = await env.DB.prepare(
      `SELECT public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, listing_status, created_at
       FROM asset_packages
       WHERE publication_status = 'published'
       ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(limit, offset).all();

    return withCors(request, new Response(
      JSON.stringify({ packages: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list packages', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/brand-discovery/intake
 * Public route — Brand Discovery intake form (lighter than full package submit)
 */
export const handleBrandDiscoveryIntake = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  try {
    const body = await request.json() as any;
    const { name_vi, name_en, contact_email, discovery_notes } = body;

    if (!name_vi || !contact_email) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'name_vi and contact_email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `bdi_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Store as a Level 0 package with discovery_notes in summary
    await env.DB.prepare(
      `INSERT INTO asset_packages (id, public_id, slug, name_vi, name_en, summary_vi, asset_level, listing_status, market_status, publication_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, 'draft', 'not_listed', 'private', ?, ?)`
    ).bind(
      id,
      `BDI-${Date.now().toString(36).toUpperCase()}`,
      `bdi-${Date.now().toString(36)}`,
      name_vi,
      name_en || null,
      discovery_notes || null,
      now, now
    ).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'discovery_intake_submitted', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, id, contact_email, 'Brand Discovery intake', now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, package_id: id, message: 'Discovery intake received. You will be contacted about next steps.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to submit intake', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/assets
 * Authenticated seller route — list seller's own packages
 */
export const handleSellerAssetsList = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const result = await env.DB.prepare(
      `SELECT * FROM asset_packages ORDER BY created_at DESC LIMIT 100`
    ).all();

    return withCors(request, new Response(
      JSON.stringify({ packages: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list assets', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/assets/:id/components
 * Authenticated seller route — add component to a package
 */
export const handleSellerAddComponent = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const packageId = pathParts[3];
    const body = await request.json() as any;
    const { component_class, component_name, status, sort_order, metadata } = body;

    if (!component_class || !component_name) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'component_class and component_name are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `cmp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO asset_components (id, package_id, component_class, component_name, status, sort_order, metadata, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, packageId, component_class, component_name, status || 'declared', sort_order || 0, metadata ? JSON.stringify(metadata) : null, now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, component_id: id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to add component', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/assets/:id/submit
 * Authenticated seller route — submit package for review (changes publication_status to 'in_review')
 */
export const handleSellerSubmitPackage = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const packageId = pathParts[3];
    const now = new Date().toISOString();

    await env.DB.prepare(
      `UPDATE asset_packages SET publication_status = 'in_review', updated_at = ? WHERE id = ?`
    ).bind(now, packageId).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'package_submitted_for_review', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, packageId, (auth as any).email || 'seller', 'Package submitted for review', now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, package_id: packageId, status: 'in_review' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to submit package', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/assets/:id/verification-status
 * Authenticated seller route — get verification status for a package
 */
export const handleSellerVerificationStatus = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const packageId = pathParts[3];

    const pkg = await env.DB.prepare(
      `SELECT id, public_id, name_vi, listing_status, publication_status FROM asset_packages WHERE id = ?`
    ).bind(packageId).first() as any;

    if (!pkg) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Package not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const cases = await env.DB.prepare(
      `SELECT id, case_type, status, created_at, updated_at FROM verification_cases WHERE package_id = ? ORDER BY created_at DESC`
    ).bind(packageId).all();

    const components = await env.DB.prepare(
      `SELECT component_class, component_name, status FROM asset_components WHERE package_id = ? ORDER BY sort_order`
    ).bind(packageId).all();

    return withCors(request, new Response(
      JSON.stringify({
        package: pkg,
        components: components.results || [],
        verification_cases: cases.results || [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to get verification status', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET/POST /api/omdalat/buyer/profile
 * Authenticated buyer route — get or update buyer profile
 */
export const handleBuyerProfile = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);

  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const email = (auth as any).email || 'unknown';

    if (request.method === 'GET') {
      // Look up buyer_requests by email
      const result = await env.DB.prepare(
        `SELECT * FROM buyer_requests WHERE buyer_email = ? ORDER BY created_at DESC LIMIT 50`
      ).bind(email).all();

      return withCors(request, new Response(
        JSON.stringify({ buyer_email: email, requests: result.results || [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    if (request.method === 'POST') {
      // Update profile (stored as a buyer_request with type 'profile_update')
      const body = await request.json() as any;
      const { buyer_name, buyer_organization, buyer_type } = body;
      const now = new Date().toISOString();
      const id = `brq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

      await env.DB.prepare(
        `INSERT INTO buyer_requests (id, package_id, buyer_email, buyer_name, buyer_organization, buyer_type, qualification_status, message, created_at, updated_at)
         VALUES (?, NULL, ?, ?, ?, ?, 'profile', ?, ?, ?)`
      ).bind(id, email, buyer_name || null, buyer_organization || null, buyer_type || 'individual', 'Profile update', now, now).run();

      return withCors(request, new Response(
        JSON.stringify({ success: true, request_id: id }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to handle buyer profile', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/admin/verification-cases
 * Admin route — list all verification cases
 */
export const handleAdminVerificationCases = async (
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

    let query = `SELECT vc.*, ap.name_vi, ap.name_en, ap.public_id
                 FROM verification_cases vc
                 JOIN asset_packages ap ON vc.package_id = ap.id`;
    const binds: string[] = [];
    if (status) {
      query += ` WHERE vc.status = ?`;
      binds.push(status);
    }
    query += ` ORDER BY vc.created_at DESC LIMIT 100`;

    const result = await env.DB.prepare(query).bind(...binds).all();

    return withCors(request, new Response(
      JSON.stringify({ cases: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list verification cases', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/admin/credentials/issue
 * Admin route — issue a credential (pointer to registry, NOT legal title)
 */
export const handleAdminCredentialIssue = async (
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
    const { package_id, credential_type, credential_url, token_anchor } = body;

    if (!package_id || !credential_type) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id and credential_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `cred_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO credentials (id, package_id, credential_type, credential_url, token_anchor, issued_at, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'active', ?)`
    ).bind(id, package_id, credential_type, credential_url || null, token_anchor || null, now, now).run();

    // Log registry event
    await env.DB.prepare(
      `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
       VALUES (?, ?, 'credential_issued', 1, ?, ?, ?)`
    ).bind(`rev_${Date.now()}`, package_id, (auth as any).email, `Credential ${credential_type} issued`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, credential_id: id, note: 'Credential is a pointer to registry record, not legal title.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to issue credential', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/listings/:id/inquiries
 * Public route — buyer sends inquiry about a listing
 */
export const handleListingInquiry = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const listingId = pathParts[3];
    const body = await request.json() as any;
    const { buyer_email, buyer_name, message } = body;

    if (!buyer_email || !buyer_name || !message) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'buyer_email, buyer_name, and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Store inquiry as a notification
    const listing = await env.DB.prepare(
      `SELECT package_id FROM marketplace_listings WHERE id = ?`
    ).bind(listingId).first() as any;

    if (!listing) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Listing not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    await env.DB.prepare(
      `INSERT INTO notifications (id, package_id, recipient, notification_type, subject, body, status, created_at)
       VALUES (?, ?, ?, 'listing_inquiry', ?, ?, 'pending', ?)`
    ).bind(id, listing.package_id, buyer_email, `Inquiry from ${buyer_name}`, message, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, inquiry_id: id, message: 'Inquiry submitted. The seller will be notified.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to submit inquiry', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
