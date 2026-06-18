import type { Env } from '../index';
import { logAudit } from '../lib/audit';
import { handleCorsPreflight, withCors } from '../lib/cors';

/**
 * Brand admin login endpoint.
 * POST /api/omdalat/admin/login
 * Body: { email, password }
 * Returns: { token, admin_id, brand_id, role } or 401
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

  try {
    const body = await request.json() as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      const resp = new Response(
        JSON.stringify({ error: 'Email and password required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Lookup admin by email
    const admin = await env.DB.prepare(
      `SELECT id, brand_id, password_hash, role, is_active, name
       FROM brand_admins
       WHERE email = ?`
    ).bind(email).first();

    if (!admin || !(admin.is_active as boolean)) {
      const resp = new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Verify password (bcrypt comparison)
    // In production: use proper bcrypt. Here we use a simple compare for the skeleton.
    // TODO: Replace with bcrypt.compare when bcrypt wasm is available in Workers.
    const passwordMatch = await comparePassword(password, admin.password_hash as string);
    if (!passwordMatch) {
      const resp = new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
      return withCors(request, resp, env);
    }

    // Generate session token (256-bit random, base64url)
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const token = btoa(String.fromCharCode(...tokenBytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h

    await env.DB.prepare(
      `INSERT INTO admin_sessions (id, admin_id, brand_id, token, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      generateSessionId(),
      admin.id,
      admin.brand_id,
      token,
      expiresAt,
      new Date().toISOString()
    ).run();

    await logAudit(env, admin.id as string, 'admin.login', 'admin', admin.id as string, {
      email,
      brand_id: admin.brand_id
    });

    const resp = new Response(
      JSON.stringify({
        token,
        admin_id: admin.id,
        brand_id: admin.brand_id,
        role: admin.role,
        name: admin.name,
        expires_at: expiresAt
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
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

async function comparePassword(plain: string, hash: string): Promise<boolean> {
  // Placeholder: In production, use bcrypt wasm or Cloudflare Workers-compatible bcrypt.
  // For now, we accept a hard-coded development check so the middleware compiles.
  // This MUST be replaced before any real data is inserted.
  return plain === hash;
}

function generateSessionId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return 'sess_' + btoa(String.fromCharCode(...bytes)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
}
