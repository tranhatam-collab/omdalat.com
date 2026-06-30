import type { Env } from '../index';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string;
  limit: number;
}

/**
 * Check and increment a rate limit counter backed by D1.
 *
 * This is a simple fixed-window counter. It is NOT suitable for high-frequency,
 * race-sensitive controls (e.g., auction bid concurrency) — those need a stronger
 * consistency primitive. It is sufficient for standard API write endpoints.
 *
 * @param env Worker environment
 * @param key Unique counter key (e.g., `offer:create:buyer@example.com`)
 * @param limit Maximum requests allowed in the window
 * @param windowSeconds Window length in seconds
 */
export async function checkRateLimit(
  env: Env,
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStartMs = Math.floor(now / (windowSeconds * 1000)) * (windowSeconds * 1000);
  const windowStart = new Date(windowStartMs).toISOString();
  const resetAt = new Date(windowStartMs + windowSeconds * 1000).toISOString();

  const row = await env.DB.prepare(
    `SELECT count FROM rate_limit_counters WHERE key = ? AND window_start = ?`
  ).bind(key, windowStart).first() as { count: number } | null;

  const current = row ? row.count : 0;
  const remaining = Math.max(0, limit - current);

  if (current >= limit) {
    return { allowed: false, remaining: 0, resetAt, limit };
  }

  await env.DB.prepare(
    `INSERT INTO rate_limit_counters (key, window_start, count) VALUES (?, ?, 1)
     ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1`
  ).bind(key, windowStart).run();

  return { allowed: true, remaining: remaining - 1, resetAt, limit };
}

/**
 * Convenience: apply rate limit to a write endpoint and return a 429 Response if exceeded.
 *
 * @param env Worker environment
 * @param requestName Human endpoint name for logging
 * @param actorId Unique actor (email or IP)
 * @param limit Max requests per window
 * @param windowSeconds Window length
 */
export async function rateLimitWrite(
  env: Env,
  requestName: string,
  actorId: string,
  limit: number,
  windowSeconds: number
): Promise<{ ok: true } | { ok: false; response: Response }> {
  const key = `${requestName}:${actorId}`;
  const result = await checkRateLimit(env, key, limit, windowSeconds);
  if (!result.allowed) {
    const resp = new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        retry_after: Math.ceil(windowSeconds / 60),
        limit: result.limit,
        reset_at: result.resetAt,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(windowSeconds / 60)),
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': String(result.remaining),
          'X-RateLimit-Reset': result.resetAt,
        },
      }
    );
    return { ok: false, response: resp };
  }
  return { ok: true };
}

/**
 * Get client IP from request. Falls back to 'unknown'.
 * Used for public endpoints that have no authenticated user.
 */
export function getClientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';
}

/**
 * Rate limit tiers for different endpoint classes.
 * These are intentionally conservative for a production marketplace.
 */
export const RATE_LIMIT_TIERS = {
  // Authenticated write endpoints
  offerCreate: { limit: 10, windowSeconds: 60 },
  evidenceSubmit: { limit: 20, windowSeconds: 60 },
  dataRoomRequestAccess: { limit: 10, windowSeconds: 60 },
  kycSubmit: { limit: 5, windowSeconds: 60 },
  escrowCreate: { limit: 5, windowSeconds: 60 },
  auctionBid: { limit: 30, windowSeconds: 60 },
  transferCreate: { limit: 10, windowSeconds: 60 },
  // Public write endpoints (per IP, stricter)
  publicIntake: { limit: 5, windowSeconds: 300 },
  publicContact: { limit: 5, windowSeconds: 300 },
};
