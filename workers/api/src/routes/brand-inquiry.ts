import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';

export const handleBrandInquiry = async (
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
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Expected path: /api/omdalat/brands/:id/inquiry
    const brandId = pathParts[3]; // Index 3 is the brand ID

    const body = await request.json();
    const { contact, message, locale, source } = body;

    // Validate required fields
    if (!brandId || !contact || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: contact, message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate locale
    const localeValue = locale || 'vi';
    if (!['vi', 'en'].includes(localeValue)) {
      return new Response(
        JSON.stringify({ error: 'Invalid locale. Must be "vi" or "en"' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if brand exists and is published or in private_preview
    const brandCheck = await env.DB.prepare(
      `SELECT id, publication_status, name_vi, name_en FROM brands WHERE id = ?`
    ).bind(brandId).first();

    if (!brandCheck) {
      return new Response(
        JSON.stringify({ error: 'Brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (brandCheck.publication_status !== 'published' && brandCheck.publication_status !== 'private_preview') {
      return new Response(
        JSON.stringify({ error: 'Brand is not accepting inquiries' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const now = new Date().toISOString();

    // Create inquiry record
    const inquiryId = `inq_${Date.now()}`;
    const inquiryResult = await env.DB.prepare(
      `INSERT INTO inquiries (id, brand_id, contact, message, locale, source, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      inquiryId,
      brandId,
      contact,
      message,
      localeValue,
      source || 'brand_site',
      'pending',
      now
    ).run();

    if (!inquiryResult.success) {
      return new Response(
        JSON.stringify({ error: 'Failed to create inquiry record' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Inquiry created:', inquiryId, 'for brand:', brandId, 'contact:', contact);

    const response = new Response(
      JSON.stringify({
        inquiry_id: inquiryId,
        brand_id: brandId,
        status: 'pending',
        message: 'Inquiry received. We will respond shortly.'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

    return response;
  } catch (error) {
    console.error('Brand inquiry error:', error);
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return errorResponse;
  }
};
