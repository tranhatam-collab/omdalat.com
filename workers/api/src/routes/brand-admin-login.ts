import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { hashPassword, verifyPassword } from '../lib/password-hash';
import { recordFailedLogin, recordSuccessfulLogin, isLocked, MAX_FAILED_ATTEMPTS } from '../lib/login-lockout';
import { generateToken, generateSessionId, generateCsrfToken, fingerprintHash, cookieHeader } from '../lib/session';

/**
 * Brand admin login endpoint.
 * POST /api/omdalat/admin/login
 * Body: { email, password, mfa_code? }
 * Returns: { admin_id, brand_id, role, name, csrf_token } + sets HttpOnly session cookie
 */
export const handleBrandAdminLogin = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return handleCorsPreflight(request, env);
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || 'unknown';

  try {
    const body = await request.json() as { email?: string; password?: string; mfa_code?: string };
    const { email, password } = body;

    if (!email || !password) {
      const resp = new Response(
        JSON.stringify({ error: 'Email and password required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Check account lockout before verifying password
    const lockStatus = await isLocked(env, email);
    if (lockStatus.locked) {
      const resp = new Response(
        JSON.stringify({ error: 'Account locked. Try again later.', locked_until: lockStatus.lockedUntil }),
        { status: 423, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Lookup admin by email
    const admin = await env.DB.prepare(
      `SELECT id, brand_id, password_hash, role, is_active, name, mfa_enabled, mfa_secret
       FROM brand_admins
       WHERE email = ?`
    ).bind(email).first();

    if (!admin) {
      await recordFailedLogin(env, email, null, 'missing_admin', ip, ua);
      const resp = new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    if (!(admin.is_active as boolean)) {
      await recordFailedLogin(env, email, admin.id as string, 'inactive', ip, ua);
      const resp = new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Verify password hash
    const passwordMatch = await verifyPassword(password, admin.password_hash as string);
    if (!passwordMatch) {
      const lock = await recordFailedLogin(env, email, admin.id as string, 'invalid_password', ip, ua);
      const resp = new Response(
        JSON.stringify({
          error: 'Invalid credentials',
          ...(lock.locked ? { locked_until: lock.lockedUntil } : {}),
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // MFA check (stub — if enabled, require code)
    if (admin.mfa_enabled) {
      // TODO: verify TOTP code against admin.mfa_secret
      // For now, block login if MFA enabled but no code provided.
      if (!body.mfa_code) {
        const resp = new Response(
          JSON.stringify({ error: 'MFA code required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
        return withCors(request, resp, env);
      }
    }

    // Generate session token and CSRF token
    const token = generateToken();
    const csrfToken = generateCsrfToken();
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h
    const fpHash = await fingerprintHash(request, env);
    const now = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO admin_sessions (id, admin_id, brand_id, token, expires_at, created_at,
                                   fingerprint_hash, csrf_token, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      sessionId,
      admin.id,
      admin.brand_id,
      token,
      expiresAt,
      now,
      fpHash,
      csrfToken,
      ip,
      ua
    ).run();

    await recordSuccessfulLogin(env, admin.id as string, ip, ua);

    await logAudit(env, admin.id as string, 'admin.login', 'admin', admin.id as string, {
      email,
      brand_id: admin.brand_id,
      ip,
      session_id: sessionId,
    });

    // Set per-subdomain or scoped cookie.
    // Prefer Host-derived cookie domain; fallback to env.COOKIE_DOMAIN.
    const host = request.headers.get('Host') || env.COOKIE_DOMAIN || 'api.omdalat.com';
    const cookieDomain = host.includes('omdalat.com') ? `.omdalat.com` : host;
    const setCookie = cookieHeader('om_session', token, {
      domain: cookieDomain,
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });

    const resp = new Response(
      JSON.stringify({
        admin_id: admin.id,
        brand_id: admin.brand_id,
        role: admin.role,
        name: admin.name,
        csrf_token: csrfToken,
        expires_at: expiresAt,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': setCookie } }
    );
    return withCors(request, resp, env);
  } catch (error) {
    console.error('Admin login error:', error);
    const resp = new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    return withCors(request, resp, env);
  }
};

// Re-export for backward-compatible seed utilities.
export { hashPassword };
