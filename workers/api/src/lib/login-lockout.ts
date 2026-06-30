/**
 * Login lockout policy: track failed attempts and lock accounts after threshold.
 */

import type { Env } from '../index';

export const MAX_FAILED_ATTEMPTS = 5;
export const LOCKOUT_MINUTES = 30;

export async function recordFailedLogin(
  env: Env,
  email: string,
  adminId: string | null,
  reason: string,
  ip: string,
  ua: string
): Promise<{ locked: boolean; lockedUntil?: string }> {
  const now = new Date().toISOString();
  const attemptId = `la_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  await env.DB.prepare(
    `INSERT INTO login_attempts (id, email, admin_id, ip_address, user_agent, success, failure_reason, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(attemptId, email, adminId, ip, ua, false, reason, now).run();

  if (!adminId) return { locked: false };

  const lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
  await env.DB.prepare(
    `UPDATE brand_admins
     SET failed_login_attempts = failed_login_attempts + 1,
         locked_until = CASE WHEN failed_login_attempts + 1 >= ? THEN ? ELSE locked_until END
     WHERE id = ?`
  ).bind(MAX_FAILED_ATTEMPTS, lockUntil, adminId).run();

  const admin = await env.DB.prepare(
    `SELECT failed_login_attempts, locked_until FROM brand_admins WHERE id = ?`
  ).bind(adminId).first();

  return {
    locked: Boolean(admin?.locked_until && new Date(admin.locked_until as string) > new Date()),
    lockedUntil: admin?.locked_until as string | undefined,
  };
}

export async function recordSuccessfulLogin(
  env: Env,
  adminId: string,
  ip: string,
  ua: string
): Promise<void> {
  const attemptId = `la_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO login_attempts (id, email, admin_id, ip_address, user_agent, success, failure_reason, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(attemptId, null, adminId, ip, ua, true, null, now).run();

  await env.DB.prepare(
    `UPDATE brand_admins
     SET failed_login_attempts = 0, locked_until = NULL, last_login = ?
     WHERE id = ?`
  ).bind(now, adminId).run();
}

export async function isLocked(env: Env, email: string): Promise<{ locked: boolean; lockedUntil?: string }> {
  const admin = await env.DB.prepare(
    `SELECT id, locked_until FROM brand_admins WHERE email = ?`
  ).bind(email).first();
  if (!admin) return { locked: false };
  if (admin.locked_until && new Date(admin.locked_until as string) > new Date()) {
    return { locked: true, lockedUntil: admin.locked_until as string };
  }
  return { locked: false };
}
