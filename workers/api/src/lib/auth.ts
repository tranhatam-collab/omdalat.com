import type { Env } from '../index';

export interface AuthContext {
  adminId: string;
  brandId: string | null;
  role: 'owner' | 'manager' | 'editor' | 'super';
  email: string;
}

/**
 * Verify admin session from Authorization: Bearer {token} header
 * Returns AuthContext if valid, null if invalid/missing
 */
export async function verifyAdminSession(
  request: Request,
  env: Env
): Promise<AuthContext | null> {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!token || token.length < 32) {
    return null;
  }

  try {
    const session = await env.DB.prepare(
      `SELECT s.admin_id, s.brand_id, s.expires_at,
              a.email, a.role, a.is_active
       FROM admin_sessions s
       JOIN brand_admins a ON s.admin_id = a.id
       WHERE s.token = ?`
    ).bind(token).first();

    if (!session) return null;
    if (new Date(session.expires_at as string) < new Date()) return null;
    if (!(session.is_active as boolean)) return null;

    return {
      adminId: session.admin_id as string,
      brandId: session.brand_id as string | null,
      role: session.role as 'owner' | 'manager' | 'editor' | 'super',
      email: session.email as string
    };
  } catch {
    return null;
  }
}

/**
 * Require valid admin session. Returns 401 if missing/invalid.
 */
export async function requireAuth(
  request: Request,
  env: Env
): Promise<AuthContext | Response> {
  const auth = await verifyAdminSession(request, env);
  if (!auth) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return auth;
}

/**
 * Require super admin (Om Dalat team). Returns 403 if not super.
 */
export function requireSuper(auth: AuthContext): AuthContext | Response {
  if (auth.role !== 'super') {
    return new Response(JSON.stringify({ error: 'Forbidden: super admin required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return auth;
}

/**
 * Require brand-scoped access. brandId must match auth.brand_id or auth.role === 'super'.
 */
export function requireBrandAccess(auth: AuthContext, brandId: string): AuthContext | Response {
  if (auth.role === 'super') return auth;
  if (auth.brandId === brandId) return auth;
  return new Response(JSON.stringify({ error: 'Forbidden: brand access denied' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' }
  });
}
