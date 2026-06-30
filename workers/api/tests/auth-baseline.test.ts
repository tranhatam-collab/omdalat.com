/**
 * AUTH_BASELINE tests — password hashing, lockout, fingerprint, cookies, CSRF.
 */

import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../src/lib/password-hash';
import { isLocked, recordFailedLogin, recordSuccessfulLogin, MAX_FAILED_ATTEMPTS } from '../src/lib/login-lockout';
import { fingerprintHash, generateToken, generateCsrfToken, parseCookie, cookieHeader } from '../src/lib/session';
import { verifyAdminSession, requireAuth, requireCsrf } from '../src/lib/auth';

function makeMockEnv(dbResult: any = null, extra: any = {}): any {
  const defaultFirst = {
    admin_id: 'adm_001',
    brand_id: null,
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    email: 'admin@omdalat.com',
    role: 'super',
    is_active: 1,
    fingerprint_hash: null,
    csrf_token: 'dummy_csrf',
    ...extra,
  };
  return {
    DB: {
      prepare: () => ({
        bind: () => ({
          first: async () => dbResult ?? defaultFirst,
          all: async () => ({ results: [], success: true }),
          run: async () => ({ success: true, meta: { changes: 1 } }),
        }),
        first: async () => dbResult ?? defaultFirst,
        all: async () => ({ results: [], success: true }),
        run: async () => ({ success: true, meta: { changes: 1 } }),
      }),
    },
    COOKIE_DOMAIN: '.omdalat.com',
  };
}

// Helper to build a Request with cookie
function mockReq(method: string, path: string, opts: { cookie?: string; csrf?: string; bearer?: string; headers?: Record<string, string> } = {}): Request {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...opts.headers };
  if (opts.cookie) headers['Cookie'] = opts.cookie;
  if (opts.csrf) headers['X-CSRF-Token'] = opts.csrf;
  if (opts.bearer) headers['Authorization'] = `Bearer ${opts.bearer}`;
  return new Request(`https://api.omdalat.com${path}`, { method, headers });
}

describe('Password hash — PBKDF2-SHA256', () => {
  it('hashes and verifies a password', async () => {
    const hash = await hashPassword('secret123');
    expect(hash).toMatch(/^pbkdf2:/);
    expect(await verifyPassword('secret123', hash)).toBe(true);
    expect(await verifyPassword('wrong', hash)).toBe(false);
  });

  it('produces different hashes for same password (random salt)', async () => {
    const h1 = await hashPassword('same');
    const h2 = await hashPassword('same');
    expect(h1).not.toBe(h2);
  });

  it('rejects legacy plain-text password', async () => {
    expect(await verifyPassword('secret123', 'plain-text-hash')).toBe(false);
  });
});

describe('Login lockout', () => {
  it('increments failed attempts and emits audit rows', async () => {
    const env = makeMockEnv();
    const runCalls: any[] = [];
    const origPrepare = env.DB.prepare;
    env.DB.prepare = (sql: string) => {
      const stmt = origPrepare(sql);
      return {
        ...stmt,
        bind: (...args: any[]) => {
          const b = stmt.bind(...args);
          return {
            ...b,
            run: async () => {
              runCalls.push({ sql, args });
              return b.run();
            },
          };
        },
      };
    };
    await recordFailedLogin(env, 'admin@omdalat.com', 'adm_001', 'invalid_password', '127.0.0.1', 'test');
    const attempts = runCalls.filter(c => c.sql.toLowerCase().includes('insert into login_attempts'));
    expect(attempts.length).toBe(1);
    expect(attempts[0].args[5]).toBe(false);
    expect(attempts[0].args[6]).toBe('invalid_password');
  });

  it('clears lock counters on successful login', async () => {
    const env = makeMockEnv();
    const runCalls: any[] = [];
    const origPrepare = env.DB.prepare;
    env.DB.prepare = (sql: string) => {
      const stmt = origPrepare(sql);
      return {
        ...stmt,
        bind: (...args: any[]) => {
          const b = stmt.bind(...args);
          return {
            ...b,
            run: async () => {
              runCalls.push({ sql, args });
              return b.run();
            },
          };
        },
      };
    };
    await recordSuccessfulLogin(env, 'adm_001', '127.0.0.1', 'test');
    const update = runCalls.find(c => c.sql.toLowerCase().includes('update brand_admins'));
    expect(update).toBeDefined();
    expect(update.sql.toLowerCase()).toContain('failed_login_attempts = 0');
    expect(update.sql.toLowerCase()).toContain('locked_until = null');
  });
});

describe('Session fingerprint binding', () => {
  it('fingerprintHash is stable for same request metadata', async () => {
    const env = makeMockEnv();
    const req1 = mockReq('GET', '/test', { headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' } });
    const req2 = mockReq('GET', '/test', { headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' } });
    const f1 = await fingerprintHash(req1, env);
    const f2 = await fingerprintHash(req2, env);
    expect(f1).toBe(f2);
  });

  it('fingerprintHash differs across IPs', async () => {
    const env = makeMockEnv();
    const req1 = mockReq('GET', '/test', { headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' } });
    const req2 = mockReq('GET', '/test', { headers: { 'CF-Connecting-IP': '5.6.7.8', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' } });
    const f1 = await fingerprintHash(req1, env);
    const f2 = await fingerprintHash(req2, env);
    expect(f1).not.toBe(f2);
  });
});

describe('Cookie-based auth', () => {
  it('accepts valid cookie token with matching fingerprint', async () => {
    const env = makeMockEnv();
    const req = mockReq('GET', '/test', {
      cookie: 'om_session=' + 't'.repeat(40),
      headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' },
    });
    const auth = await verifyAdminSession(req, env);
    expect(auth).not.toBeNull();
    expect(auth?.email).toBe('admin@omdalat.com');

  });

  it('rejects cookie when fingerprint mismatches', async () => {
    const env = makeMockEnv(null, { fingerprint_hash: 'other_fp' });
    const req = mockReq('GET', '/test', {
      cookie: 'om_session=' + 't'.repeat(40),
      headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' },
    });
    const auth = await verifyAdminSession(req, env);
    expect(auth).toBeNull();
  });

  it('legacy Bearer token still works', async () => {
    const env = makeMockEnv();
    const req = mockReq('GET', '/test', { bearer: 'a'.repeat(40) });
    const auth = await verifyAdminSession(req, env);
    expect(auth).not.toBeNull();
  });

  it('sets cookie header correctly', () => {
    const c = cookieHeader('om_session', 'tok', { domain: '.omdalat.com', maxAge: 3600, httpOnly: true, secure: true, sameSite: 'Strict', path: '/' });
    expect(c).toContain('om_session=tok');
    expect(c).toContain('HttpOnly');
    expect(c).toContain('Secure');
    expect(c).toContain('SameSite=Strict');
  });
});

describe('CSRF policy', () => {
  it('requires CSRF for cookie-based POST', async () => {
    const env = makeMockEnv();
    const req = mockReq('POST', '/test', {
      cookie: 'om_session=' + 't'.repeat(40),
      headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' },
    });
    const auth = await requireAuth(req, env);
    expect(auth).not.toBeInstanceOf(Response);
    const csrf = requireCsrf(req, auth as any);
    expect(csrf).toBeInstanceOf(Response);
    expect((csrf as Response).status).toBe(403);
  });

  it('allows cookie-based POST with valid CSRF', async () => {
    const env = makeMockEnv();
    const req = mockReq('POST', '/test', {
      cookie: 'om_session=' + 't'.repeat(40),
      csrf: 'dummy_csrf',
      headers: { 'CF-Connecting-IP': '1.2.3.4', 'User-Agent': 'ua', 'Host': 'api.omdalat.com' },
    });
    const auth = await requireAuth(req, env);
    const csrf = requireCsrf(req, auth as any);
    expect(csrf).toBeNull();
  });

  it('exempts Bearer-only POST from CSRF (legacy migration)', async () => {
    const env = makeMockEnv();
    const req = mockReq('POST', '/test', { bearer: 'a'.repeat(40) });
    const auth = await requireAuth(req, env);
    const csrf = requireCsrf(req, auth as any);
    expect(csrf).toBeNull();
  });
});
