import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';

export const handleLilyPublic = async (
  request: Request,
  env: Env
): Promise<Response> => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Route: /api/lily/public
  if (pathParts[2] === 'public' && request.method === 'GET') {
    return getPublicConfig(request, env);
  }

  // Route: /api/lily/stay-plans
  if (pathParts[2] === 'stay-plans' && request.method === 'GET') {
    return getStayPlans(request, env);
  }

  // Route: /api/lily/applications
  if (pathParts[2] === 'applications' && request.method === 'POST') {
    return createApplication(request, env);
  }

  return new Response('Not found', { status: 404 });
};

async function getPublicConfig(request: Request, env: Env): Promise<Response> {
  try {
    // Get Lily brand config (brand_id = 'brnd_lily')
    const brandResult = await env.DB.prepare(
      `SELECT id, name_vi, name_en, slug, subdomain, brand_type,
              can_host_stay, can_host_visit, can_sell_product, can_host_work,
              publication_status
       FROM brands
       WHERE slug = 'lily'`
    ).first();

    if (!brandResult) {
      return new Response(
        JSON.stringify({ error: 'Lily brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const brand = brandResult as any;

    // Get published content blocks
    const contentBlocksResult = await env.DB.prepare(
      `SELECT locale, block_type, payload
       FROM content_blocks
       WHERE brand_id = ? AND status = 'published'
       ORDER BY locale, block_type`
    ).bind(brand.id).all();

    const contentBlocks = contentBlocksResult.results || [];

    // Get stay plans
    const stayPlansResult = await env.DB.prepare(
      `SELECT plan_code, name_vi, name_en, minimum_nights, maximum_nights,
              price_period, public_price_minor, currency, application_only, status
       FROM lily_stay_plans
       WHERE brand_id = ? AND status = 'published'`
    ).bind(brand.id).all();

    const stayPlans = stayPlansResult.results || [];

    await logAudit(env, null, 'lily.public.viewed', 'brand', brand.id, {
      publication_status: brand.publication_status
    });

    const response = new Response(
      JSON.stringify({
        brand: {
          id: brand.id,
          name_vi: brand.name_vi,
          name_en: brand.name_en,
          slug: brand.slug,
          subdomain: brand.subdomain,
          brand_type: brand.brand_type,
          can_host_stay: brand.can_host_stay,
          can_host_visit: brand.can_host_visit,
          can_sell_product: brand.can_sell_product,
          can_host_work: brand.can_host_work,
          publication_status: brand.publication_status
        },
        content_blocks: contentBlocks,
        stay_plans: stayPlans
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Lily public config error:', error);
    await logAudit(env, null, 'lily.public.error', 'brand', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
}

async function getStayPlans(request: Request, env: Env): Promise<Response> {
  try {
    // Get Lily brand
    const brandResult = await env.DB.prepare(
      `SELECT id FROM brands WHERE slug = 'lily'`
    ).first();

    if (!brandResult) {
      return new Response(
        JSON.stringify({ error: 'Lily brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const brand = brandResult as any;

    // Get published stay plans
    const stayPlansResult = await env.DB.prepare(
      `SELECT plan_code, name_vi, name_en, minimum_nights, maximum_nights,
              price_period, public_price_minor, currency, application_only, status
       FROM lily_stay_plans
       WHERE brand_id = ? AND status = 'published'
       ORDER BY minimum_nights`
    ).bind(brand.id).all();

    const stayPlans = stayPlansResult.results || [];

    await logAudit(env, null, 'lily.stay_plans.viewed', 'brand', brand.id, {
      count: stayPlans.length
    });

    const response = new Response(
      JSON.stringify({ stay_plans: stayPlans }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Lily stay plans error:', error);
    await logAudit(env, null, 'lily.stay_plans.error', 'brand', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
}

async function createApplication(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      nationality,
      preferredStart,
      preferredDuration,
      purpose,
      introduction,
      consent
    } = body;

    // Validate required fields
    if (!name || !email || !purpose || consent !== true) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, purpose, consent' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Lily brand
    const brandResult = await env.DB.prepare(
      `SELECT id FROM brands WHERE slug = 'lily'`
    ).first();

    if (!brandResult) {
      return new Response(
        JSON.stringify({ error: 'Lily brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const brand = brandResult as any;

    // Generate application ID
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    // Insert application
    await env.DB.prepare(
      `INSERT INTO lily_applications
       (application_id, brand_id, user_id, email, nationality, preferred_start, preferred_end, purpose, status, consent_record_id, created_at, updated_at)
       VALUES (?, ?, NULL, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?)`
    ).bind(
      applicationId,
      brand.id,
      email,
      nationality || null,
      preferredStart || null,
      preferredStart && preferredDuration ? calculateEndDate(preferredStart, preferredDuration) : null,
      purpose,
      `consent_${applicationId}`,
      now,
      now
    ).run();

    await logAudit(env, null, 'lily.application.created', 'application', applicationId, {
      email,
      purpose,
      nationality
    });

    const response = new Response(
      JSON.stringify({
        application_id: applicationId,
        status: 'submitted',
        message: 'Application submitted successfully'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Lily application creation error:', error);
    await logAudit(env, null, 'lily.application.error', 'application', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
}

function calculateEndDate(startDate: string, duration: string): string {
  const start = new Date(startDate);
  let daysToAdd = 7; // default weekly

  switch (duration) {
    case 'weekly':
      daysToAdd = 7;
      break;
    case 'two_weeks':
      daysToAdd = 14;
      break;
    case 'monthly':
      daysToAdd = 30;
      break;
    case 'one_to_three_months':
      daysToAdd = 90;
      break;
    case 'custom':
      daysToAdd = 30; // default for custom
      break;
  }

  const end = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return end.toISOString();
}
