import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { validateBrandCopy } from '../lib/overclaim-validator';

export const handleBrandPreview = async (
  request: Request,
  env: Env
): Promise<Response> => {
  // Handle CORS preflight
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
    // Expected path: /api/omdalat/brands/:id/preview
    const brandId = pathParts[3]; // Index 3 is the brand ID

    if (!brandId) {
      const response = new Response(
        JSON.stringify({ error: 'Brand ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    // Fetch brand with related data
    const brandResult = await env.DB.prepare(
      `SELECT
        b.id, b.name_vi, b.name_en, b.slug, b.subdomain, b.brand_type,
        b.can_host_stay, b.can_host_visit, b.can_sell_product, b.can_host_work,
        b.publication_status, b.ap_place_ref, b.created_at, b.updated_at,
        p.id as place_id, p.maps_url, p.google_place_id, p.lat, p.lng,
        p.address_vi, p.address_en, p.administrative_area, p.maps_status, p.verification_status,
        o.id as owner_id, o.name as owner_name, o.contact as owner_contact, o.consent_status
       FROM brands b
       JOIN places p ON b.place_id = p.id
       JOIN owners o ON b.owner_id = o.id
       WHERE b.id = ?`
    ).bind(brandId).first();

    if (!brandResult) {
      const response = new Response(
        JSON.stringify({ error: 'Brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    // Fetch content blocks
    const contentBlocksResult = await env.DB.prepare(
      `SELECT id, locale, block_type, payload, status, translation_status
       FROM content_blocks
       WHERE brand_id = ?
       ORDER BY locale, block_type`
    ).bind(brandId).all();

    // H3: overclaim validator — check content blocks for forbidden terms
    const contentBlocks = contentBlocksResult.results || [];
    const overclaimErrors: string[] = [];
    
    for (const block of contentBlocks) {
      const payload = typeof block.payload === 'string' ? block.payload : JSON.stringify(block.payload);
      const validation = validateBrandCopy(payload, 'L3'); // L3 brand microsites
      if (!validation.valid) {
        overclaimErrors.push(...validation.errors);
      }
    }

    // Fetch products
    const productsResult = await env.DB.prepare(
      `SELECT id, name_vi, name_en, season, notes, status
       FROM products
       WHERE brand_id = ?
       ORDER BY name_vi`
    ).bind(brandId).all();

    // Fetch experiences
    const experiencesResult = await env.DB.prepare(
      `SELECT id, title_vi, title_en, capacity, duration, safety_notes, status
       FROM experiences
       WHERE brand_id = ?
       ORDER BY title_vi`
    ).bind(brandId).all();

    // Fetch compliance checklist
    const complianceResult = await env.DB.prepare(
      `SELECT id, business_registration, lodging_compliance, food_safety, pccc, tourism_service, updated_at
       FROM compliance_checklists
       WHERE brand_id = ?`
    ).bind(brandId).first();

    // Fetch recent agent runs
    const agentRunsResult = await env.DB.prepare(
      `SELECT id, run_type, mode, status, created_at
       FROM agent_runs
       WHERE brand_id = ?
       ORDER BY created_at DESC
       LIMIT 10`
    ).bind(brandId).all();

    await logAudit(env, null, 'brand.preview.viewed', 'brand', brandId, {
      publication_status: brandResult.publication_status,
      overclaim_errors: overclaimErrors.length
    });

    const response = new Response(
      JSON.stringify({
        brand: brandResult,
        content_blocks: contentBlocksResult.results || [],
        products: productsResult.results || [],
        experiences: experiencesResult.results || [],
        compliance: complianceResult,
        recent_agent_runs: agentRunsResult.results || [],
        overclaim_validation: {
          valid: overclaimErrors.length === 0,
          errors: overclaimErrors
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Brand preview error:', error);
    await logAudit(env, null, 'brand.preview.error', 'brand', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
};
