/**
 * Session management with rotation, fingerprint binding, and per-subdomain cookies.
 */

import type { Env } from '../index';

export interface SessionContext {
  id: string;
  adminId: string;
  brandId: string | null;
  token: string;
  email: string;
  role: 'owner' | 'manager' | 'editor' | 'super';
  csrfToken: string;
  fingerprintHash: string;
  expiresAt: string;
}

export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function generateSessionId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return 'sess_' + btoa(String.fromCharCode(...bytes)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
}

export function generateCsrfToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
}

export async function fingerprintHash(request: Request, env: Env): Promise<string> {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || 'unknown';
  const host = request.headers.get('Host') || env.COOKIE_DOMAIN || '.omdalat.com';
  const data = `${ip}:${ua}:${host}`;
  const encoder = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/=+$/, '');
}

export function cookieHeader(name: string, value: string, opts: { domain?: string; maxAge?: number; httpOnly?: boolean; secure?: boolean; sameSite?: string; path?: string }): string {
  const parts = [`${name}=${value}`];
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.httpOnly) parts.push('HttpOnly');
  if (opts.secure) parts.push('Secure');
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  if (opts.path) parts.push(`Path=${opts.path}`);
  return parts.join('; ');
}

export function parseCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearCookieHeader(name: string, domain?: string): string {
  const parts = [`${name}=`, 'Max-Age=0', 'Path=/', 'HttpOnly', 'Secure'];
  if (domain) parts.push(`Domain=${domain}`);
  return parts.join('; ');
}
