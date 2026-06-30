import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireSuper } from '../lib/auth';
import { logAudit } from '../lib/audit';

/**
 * DELETE /api/omdalat/brands/:id
 * Soft-delete a brand by setting publication_status to 'archived'.
 * Requires super admin auth.
 * Hard delete is NOT supported — brands are archived for audit trail.
 */
export const handleBrandDelete = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'DELETE') {
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
    const pathParts = url.pathname.split('/').filter(Boolean);
    const brandId = pathParts[3]; // /api/omdalat/brands/:id

    if (!brandId) {
      const response = new Response(
        JSON.stringify({ error: 'Brand ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    // Check brand exists
    const existing = await env.DB.prepare(
      `SELECT id, name_vi, publication_status FROM brands WHERE id = ?`
    ).bind(brandId).first();

    if (!existing) {
      const response = new Response(
        JSON.stringify({ error: 'Brand not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, response, env);
    }

    // Soft-delete: set publication_status to 'archived'
    await env.DB.prepare(
      `UPDATE brands SET publication_status = 'archived', updated_at = ? WHERE id = ?`
    ).bind(new Date().toISOString(), brandId).run();

    // Log audit
    await logAudit(env, {
      action: 'brand_archived',
      actor: auth.email,
      target: brandId,
      reason: `Brand '${existing.name_vi}' archived by ${auth.email}`,
    });

    const response = new Response(
      JSON.stringify({
        success: true,
        brand_id: brandId,
        previous_status: existing.publication_status,
        new_status: 'archived',
        message: 'Brand archived (soft delete). Hard delete not supported for audit trail.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  } catch (err) {
    const response = new Response(
      JSON.stringify({ error: 'Failed to archive brand', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, response, env);
  }
};
