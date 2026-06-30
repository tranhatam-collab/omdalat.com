import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireSuper } from '../lib/auth';

/**
 * GET /api/omdalat/brands
 * List all brands with compliance status.
 * Requires super admin auth.
 */
export const handleBrandList = async (
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

  // Require super admin auth
  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) {
    return withCors(request, auth, env);
  }

  const superCheck = requireSuper(auth);
  if (superCheck instanceof Response) {
    return withCors(request, superCheck, env);
  }

  try {
    const url = new URL(request.url);
    const statusFilter = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 100);
    const offset = Math.max(parseInt(url.searchParams.get('offset') || '0', 10), 0);

    let query = `
      SELECT
        b.id, b.name_vi, b.name_en, b.slug, b.subdomain, b.brand_type,
        b.can_host_stay, b.can_host_visit, b.can_sell_product, b.can_host_work,
        b.publication_status, b.ap_place_ref, b.created_at, b.updated_at,
        c.lodging_compliance, c.business_registration, c.pccc,
        o.name as owner_name, o.consent_status
      FROM brands b
      LEFT JOIN compliance_checklists c ON b.id = c.brand_id
      LEFT JOIN owners o ON b.owner_id = o.id
    `;
    const binds: string[] = [];

    if (statusFilter) {
      query += ` WHERE b.publication_status = ?`;
      binds.push(statusFilter);
    }

    query += ` ORDER BY b.created_at DESC LIMIT ? OFFSET ?`;
    binds.push(String(limit), String(offset));

    const stmt = env.DB.prepare(query);
    const result = await stmt.bind(...binds).all();

    const response = new Response(
      JSON.stringify({
        brands: result.results || [],
        count: result.results?.length || 0,
        limit,
        offset,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to list brands', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};
