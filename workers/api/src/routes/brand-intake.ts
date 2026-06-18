import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';

export const handleBrandIntake = async (
  request: Request,
  env: Env
): Promise<Response> => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const {
      owner_name,
      owner_contact,
      maps_url,
      google_place_id,
      lat,
      lng,
      address_vi,
      address_en,
      administrative_area,
      brand_name_vi,
      brand_name_en,
      slug,
      subdomain,
      brand_type,
      can_host_stay,
      can_host_visit,
      can_sell_product,
      can_host_work
    } = body;

    // Validate required fields
    if (!owner_name || !owner_contact || !lat || !lng || !brand_name_vi || !slug || !subdomain) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date().toISOString();

    // Create owner record
    const ownerId = generateId('own');
    const ownerResult = await env.DB.prepare(
      `INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      ownerId,
      owner_name,
      owner_contact,
      'pending',
      null,
      `Brand intake for ${brand_name_vi}`,
      now,
      now
    ).run();

    if (!ownerResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create owner record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create place record
    const placeId = generateId('plc');
    const placeResult = await env.DB.prepare(
      `INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng, address_vi, address_en,
                          administrative_area, maps_status, verification_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      placeId,
      ownerId,
      maps_url || null,
      google_place_id || null,
      lat,
      lng,
      address_vi || null,
      address_en || null,
      administrative_area || null,
      maps_url ? 'named_place' : 'coordinates_only',
      'pending',
      now,
      now
    ).run();

    if (!placeResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create place record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create brand record
    const brandId = generateId('brnd');
    const brandResult = await env.DB.prepare(
      `INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain, brand_type,
                          can_host_stay, can_host_visit, can_sell_product, can_host_work,
                          publication_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      brandId,
      placeId,
      ownerId,
      brand_name_vi,
      brand_name_en || brand_name_vi,
      slug,
      subdomain,
      brand_type || 'farm',
      can_host_stay ? 1 : 0,
      can_host_visit ? 1 : 0,
      can_sell_product ? 1 : 0,
      can_host_work ? 1 : 0,
      'draft',
      now,
      now
    ).run();

    if (!brandResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create brand record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create brand intake record
    const intakeId = generateId('intake');
    const missingFields = [];
    const riskFlags = [];

    if (!maps_url) missingFields.push('maps_url');
    if (!google_place_id) missingFields.push('google_place_id');
    if (!address_vi) missingFields.push('address_vi');
    if (can_host_stay) riskFlags.push('lodging_compliance_required');

    await env.DB.prepare(
      `INSERT INTO brand_intakes (id, place_id, raw_input, missing_fields, risk_flags, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      intakeId,
      placeId,
      JSON.stringify(body),
      JSON.stringify(missingFields),
      JSON.stringify(riskFlags),
      now
    ).run();

    // Create compliance checklist
    const complianceId = generateId('cmp');
    await env.DB.prepare(
      `INSERT INTO compliance_checklists (id, brand_id, business_registration, lodging_compliance,
                                          food_safety, pccc, tourism_service, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      complianceId,
      brandId,
      'unknown',
      can_host_stay ? 'unknown' : 'not_applicable',
      can_sell_product ? 'unknown' : 'not_applicable',
      'unknown',
      can_host_visit ? 'unknown' : 'not_applicable',
      now
    ).run();

    await logAudit(env, null, 'brand.intake.created', 'brand', brandId, {
      owner_id: ownerId,
      place_id: placeId,
      brand_name: brand_name_vi,
      slug,
      subdomain,
      brand_type
    });

    const response = new Response(
      JSON.stringify({
        brand_id: brandId,
        owner_id: ownerId,
        place_id: placeId,
        intake_id: intakeId,
        status: 'draft',
        missing_fields: missingFields,
        risk_flags: riskFlags
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

    return withCors(request, response, env);
  } catch (error) {
    console.error('Brand intake error:', error);
    await logAudit(env, null, 'brand.intake.error', 'brand', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, errorResponse, env);
  }
};
