import type { Env } from '../index';
import { parseCookie, fingerprintHash, clearCookieHeader } from './session';
import { validateCsrf, csrfErrorResponse } from './csrf';

export interface AuthContext {
  adminId: string;
  brandId: string | null;
  role: 'owner' | 'manager' | 'editor' | 'super';
  email: string;
  sessionToken: string;
  csrfToken: string;
}

const SESSION_COOKIE_NAME = 'om_session';

/**
 * Verify admin session from either:
 * 1. HttpOnly cookie `om_session` (preferred, AUTH_BASELINE)
 * 2. Legacy Authorization: Bearer {token} header (for compatibility during migration)
 *
 * Validates token, expiry, active admin, and fingerprint binding.
 * Returns AuthContext if valid, null if invalid/missing.
 */
export async function verifyAdminSession(
  request: Request,
  env: Env
): Promise<AuthContext | null> {
  const cookieToken = parseCookie(request, SESSION_COOKIE_NAME);
  const authHeader = request.headers.get('Authorization') || '';
  const headerToken = authHeader.replace(/^Bearer\s+/i, '').trim();
  const token = cookieToken || headerToken;

  if (!token || token.length < 32) {
    return null;
  }

  try {
    const session = await env.DB.prepare(
      `SELECT s.id, s.admin_id, s.brand_id, s.expires_at, s.fingerprint_hash, s.csrf_token,
              a.email, a.role, a.is_active
       FROM admin_sessions s
       JOIN brand_admins a ON s.admin_id = a.id
       WHERE s.token = ?`
    ).bind(token).first();

    if (!session) return null;
    if (new Date(session.expires_at as string) < new Date()) return null;
    if (!(session.is_active as boolean)) return null;

    // Fingerprint binding: same session token cannot be used from a different client/subdomain.
    const expectedFp = await fingerprintHash(request, env);
    if (session.fingerprint_hash && session.fingerprint_hash !== expectedFp) {
      return null;
    }

    return {
      adminId: session.admin_id as string,
      brandId: session.brand_id as string | null,
      role: session.role as 'owner' | 'manager' | 'editor' | 'super',
      email: session.email as string,
      sessionToken: token,
      csrfToken: (session.csrf_token as string) || '',
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
 * Require CSRF token for state-changing requests (POST/PUT/PATCH/DELETE) when
 * the session is cookie-based. Legacy Bearer-only sessions are allowed for
 * backward compatibility during migration, but cookie-based sessions must
 * present a valid X-CSRF-Token header.
 */
export function requireCsrf(request: Request, auth: AuthContext): Response | null {
  if (!isStateChanging(request.method)) return null;
  const hasCookie = parseCookie(request, SESSION_COOKIE_NAME) !== null;
  if (!hasCookie) return null; // legacy Bearer-only mode
  if (!validateCsrf(request, auth.csrfToken)) {
    return csrfErrorResponse();
  }
  return null;
}

function isStateChanging(method: string): boolean {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
}

/**
 * Require valid admin session + CSRF (for cookie-based sessions). Returns 401 or 403 if invalid.
 */
export async function requireAuthAndCsrf(
  request: Request,
  env: Env
): Promise<AuthContext | Response> {
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return auth;
  const csrf = requireCsrf(request, auth);
  if (csrf) return csrf;
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

/**
 * Clear session cookie (for logout or invalidation).
 */
export function clearSessionCookie(domain?: string): Response {
  const headers = new Headers();
  headers.append('Set-Cookie', clearCookieHeader(SESSION_COOKIE_NAME, domain));
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) }
  });
}
