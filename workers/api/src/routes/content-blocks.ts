/**
 * Content blocks management — create/update with overclaim validation (H3).
 * POST /api/omdalat/brands/:id/content-blocks
 * PATCH /api/omdalat/brands/:id/content-blocks/:block_id
 */

import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireBrandAccess } from '../lib/auth';
import { validateBrandCopy } from '../lib/overclaim-validator';

const VALID_BLOCK_TYPES = new Set([
  'hero', 'about', 'story', 'product', 'experience', 'location', 'faq', 'cta', 'seo', 'image'
]);

const VALID_STATUSES = new Set(['draft', 'pending_review', 'published']);

export const handleContentBlockCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const brandId = pathParts[3];
    if (!brandId) {
      return withCors(request, new Response(JSON.stringify({ error: 'Brand ID required' }), { status: 400 }), env);
    }

    const brandAccess = requireBrandAccess(auth, brandId);
    if (brandAccess instanceof Response) return withCors(request, brandAccess, env);

    const body = await request.json() as {
      locale?: string;
      block_type?: string;
      payload?: any;
      status?: string;
      translation_status?: string;
    };

    const { locale = 'vi', block_type, payload, status = 'draft', translation_status = 'in_progress' } = body;

    if (!block_type || !VALID_BLOCK_TYPES.has(block_type)) {
      return withCors(request, new Response(JSON.stringify({ error: `Invalid block_type. Must be one of: ${[...VALID_BLOCK_TYPES].join(', ')}` }), { status: 400 }), env);
    }

    const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload || {});

    // H3: overclaim validation for L3 brand microsites
    const validation = validateBrandCopy(payloadStr, 'L3');
    if (!validation.valid) {
      return withCors(request, new Response(JSON.stringify({
        error: 'Content blocked by overclaim validator',
        validation,
      }), { status: 400 }), env);
    }

    const blockId = generateId('cb');
    const now = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(blockId, brandId, locale, block_type, payloadStr, status, translation_status, now, now).run();

    await logAudit(env, auth.adminId, 'content_block.created', 'content_block', blockId, {
      brand_id: brandId,
      block_type,
      locale,
      status,
      overclaim_valid: validation.valid,
    });

    return withCors(request, new Response(JSON.stringify({ id: blockId, brand_id: brandId, validation }), { status: 201 }), env);
  } catch (error) {
    console.error('Content block create error:', error);
    return withCors(request, new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }), env);
  }
};

export const handleContentBlockUpdate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'PATCH') return new Response('Method not allowed', { status: 405 });

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const brandId = pathParts[3];
    const blockId = pathParts[5];
    if (!brandId || !blockId) {
      return withCors(request, new Response(JSON.stringify({ error: 'Brand ID and block ID required' }), { status: 400 }), env);
    }

    const brandAccess = requireBrandAccess(auth, brandId);
    if (brandAccess instanceof Response) return withCors(request, brandAccess, env);

    const body = await request.json() as {
      payload?: any;
      status?: string;
      translation_status?: string;
    };

    const existing = await env.DB.prepare(
      `SELECT id, block_type, payload FROM content_blocks WHERE id = ? AND brand_id = ?`
    ).bind(blockId, brandId).first();

    if (!existing) {
      return withCors(request, new Response(JSON.stringify({ error: 'Content block not found' }), { status: 404 }), env);
    }

    const updates: string[] = [];
    const params: any[] = [];
    let validation = { valid: true, errors: [], layer: 'L3' as const };

    if (body.payload !== undefined) {
      const payloadStr = typeof body.payload === 'string' ? body.payload : JSON.stringify(body.payload);
      validation = validateBrandCopy(payloadStr, 'L3');
      if (!validation.valid) {
        return withCors(request, new Response(JSON.stringify({
          error: 'Content blocked by overclaim validator',
          validation,
        }), { status: 400 }), env);
      }
      updates.push('payload = ?');
      params.push(payloadStr);
    }

    if (body.status && VALID_STATUSES.has(body.status)) {
      updates.push('status = ?');
      params.push(body.status);
    }

    if (body.translation_status) {
      updates.push('translation_status = ?');
      params.push(body.translation_status);
    }

    if (updates.length === 0) {
      return withCors(request, new Response(JSON.stringify({ error: 'No valid fields to update' }), { status: 400 }), env);
    }

    params.push(new Date().toISOString(), blockId, brandId);
    await env.DB.prepare(
      `UPDATE content_blocks SET ${updates.join(', ')}, updated_at = ? WHERE id = ? AND brand_id = ?`
    ).bind(...params).run();

    await logAudit(env, auth.adminId, 'content_block.updated', 'content_block', blockId, {
      brand_id: brandId,
      overclaim_valid: validation.valid,
    });

    return withCors(request, new Response(JSON.stringify({ id: blockId, validation }), { status: 200 }), env);
  } catch (error) {
    console.error('Content block update error:', error);
    return withCors(request, new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }), env);
  }
};
