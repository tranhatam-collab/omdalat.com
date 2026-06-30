import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireSuper } from '../lib/auth';
import { rateLimitWrite, RATE_LIMIT_TIERS } from '../lib/rate-limit';

/**
 * AUCTION LAYER — All endpoints gated behind AUCTION_LIVE_ENABLED feature flag.
 * Per execution lock section 17 Phase 3: no live auction until legal partner signoff.
 * Schema exists (auctions, bids, bid_events) but functionality is intentionally disabled.
 */

const AUCTION_DISABLED_MSG = {
  error: 'Auction functionality is not live. Legal partner signoff required. Feature flag AUCTION_LIVE_ENABLED is not set.',
  status: 'legal_readiness',
  note: 'Schema is ready. Auctions table exists. Bids table exists. But no live auction until legal partner signoff.'
};

/**
 * Check if auction feature flag is enabled.
 * In production, this would check env.AUCTION_LIVE_ENABLED === 'true'.
 * Currently always returns false — auction is in legal-readiness mode.
 */
function isAuctionLive(env: Env): boolean {
  return (env as any).AUCTION_LIVE_ENABLED === 'true';
}

/**
 * POST /api/omdalat/auctions
 * Admin route — create an auction (gated behind feature flag)
 */
export const handleAuctionCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  // Feature flag gate — auction is NOT live
  if (!isAuctionLive(env)) {
    return withCors(request, new Response(
      JSON.stringify(AUCTION_DISABLED_MSG),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  try {
    const body = await request.json() as any;
    const { package_id, auction_type, start_date, end_date, reserve_price_vnd, reserve_price_usd } = body;

    if (!package_id || !auction_type) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'package_id and auction_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const now = new Date().toISOString();
    const id = `auc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    await env.DB.prepare(
      `INSERT INTO auctions (id, package_id, auction_type, start_date, end_date, reserve_price_vnd, reserve_price_usd, currency, status, feature_flag, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'VND', 'scheduled', 'AUCTION_LIVE_ENABLED', ?, ?)`
    ).bind(id, package_id, auction_type, start_date || null, end_date || null, reserve_price_vnd || null, reserve_price_usd || null, now, now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'auction_created', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, package_id, (auth as any).email, `Auction ${id} created (${auction_type})`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, auction_id: id, status: 'scheduled' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to create auction', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/auctions/:id
 * Public route — get auction detail (only if auction is live or ended)
 */
export const handleAuctionGet = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  // Feature flag gate — auction is NOT live
  if (!isAuctionLive(env)) {
    return withCors(request, new Response(
      JSON.stringify(AUCTION_DISABLED_MSG),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const auctionId = pathParts[3];

    const auction = await env.DB.prepare(
      `SELECT a.*, ap.public_id, ap.name_vi, ap.name_en
       FROM auctions a
       JOIN asset_packages ap ON a.package_id = ap.id
       WHERE a.id = ? AND a.status IN ('live', 'ended')`
    ).bind(auctionId).first() as any;

    if (!auction) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Auction not found or not live' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Get bid count (not individual bids for public)
    const bidCount = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM bids WHERE auction_id = ? AND status = 'accepted'`
    ).bind(auctionId).first() as any;

    return withCors(request, new Response(
      JSON.stringify({
        auction: {
          id: auction.id,
          auction_type: auction.auction_type,
          start_date: auction.start_date,
          end_date: auction.end_date,
          reserve_price_vnd: auction.reserve_price_vnd,
          status: auction.status,
          package: {
            public_id: auction.public_id,
            name_vi: auction.name_vi,
            name_en: auction.name_en,
          },
        },
        bid_count: bidCount?.count || 0,
        note: 'Bids are private. Only bid count is public.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to get auction', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/auctions/:id/bids
 * Authenticated bidder route — submit a bid (gated behind feature flag + KYC)
 */
export const handleAuctionBidSubmit = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  // Feature flag gate — auction is NOT live
  if (!isAuctionLive(env)) {
    return withCors(request, new Response(
      JSON.stringify(AUCTION_DISABLED_MSG),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  const rateLimit = await rateLimitWrite(
    env,
    'auction:bid',
    (auth as any).email,
    RATE_LIMIT_TIERS.auctionBid.limit,
    RATE_LIMIT_TIERS.auctionBid.windowSeconds
  );
  if (!rateLimit.ok) return withCors(request, rateLimit.response, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const auctionId = pathParts[3];
    const body = await request.json() as any;
    const { amount_vnd, amount_usd } = body;

    if (!amount_vnd && !amount_usd) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'amount_vnd or amount_usd is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Check auction is live
    const auction = await env.DB.prepare(
      `SELECT id, package_id, reserve_price_vnd, status FROM auctions WHERE id = ? AND status = 'live'`
    ).bind(auctionId).first() as any;

    if (!auction) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Auction not found or not live' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Check reserve price
    if (auction.reserve_price_vnd && amount_vnd < auction.reserve_price_vnd) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Bid below reserve price', reserve_price_vnd: auction.reserve_price_vnd }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // TODO: Check bidder KYC/KYB status — currently gated behind feature flag
    // In production, this would check kyc_cases table for cleared status

    const now = new Date().toISOString();
    const id = `bid_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const bidderId = (auth as any).email || 'unknown';

    await env.DB.prepare(
      `INSERT INTO bids (id, auction_id, bidder_id, amount_vnd, amount_usd, currency, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'VND', 'submitted', ?)`
    ).bind(id, auctionId, bidderId, amount_vnd || null, amount_usd || null, now).run();

    // Log bid event (immutable)
    await env.DB.prepare(
      `INSERT INTO bid_events (id, auction_id, bid_id, event_type, actor, metadata, created_at)
       VALUES (?, ?, ?, 'bid_placed', ?, ?, ?)`
    ).bind(`be_${Date.now()}`, auctionId, id, bidderId, JSON.stringify({ amount_vnd, amount_usd }), now).run();

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'bid_placed', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, auction.package_id, bidderId, `Bid ${id} placed on auction ${auctionId}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, bid_id: id, status: 'submitted' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to submit bid', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/auctions/:id/bids
 * Admin route — list all bids for an auction (gated behind feature flag)
 */
export const handleAuctionBidList = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  // Feature flag gate — auction is NOT live
  if (!isAuctionLive(env)) {
    return withCors(request, new Response(
      JSON.stringify(AUCTION_DISABLED_MSG),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const auctionId = pathParts[3];

    const result = await env.DB.prepare(
      `SELECT * FROM bids WHERE auction_id = ? ORDER BY amount_vnd DESC NULLS LAST, created_at ASC`
    ).bind(auctionId).all();

    return withCors(request, new Response(
      JSON.stringify({ bids: result.results || [], count: result.results?.length || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to list bids', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/auctions/:id/end
 * Admin route — end auction and declare winner (gated behind feature flag)
 */
export const handleAuctionEnd = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  // Feature flag gate — auction is NOT live
  if (!isAuctionLive(env)) {
    return withCors(request, new Response(
      JSON.stringify(AUCTION_DISABLED_MSG),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const auctionId = pathParts[3];
    const now = new Date().toISOString();

    // Get auction
    const auction = await env.DB.prepare(
      `SELECT id, package_id, status FROM auctions WHERE id = ?`
    ).bind(auctionId).first() as any;

    if (!auction) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Auction not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    if (auction.status !== 'live') {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Auction is not live', current_status: auction.status }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Find highest accepted bid
    const winningBid = await env.DB.prepare(
      `SELECT id, bidder_id, amount_vnd, amount_usd FROM bids WHERE auction_id = ? AND status = 'accepted' ORDER BY amount_vnd DESC NULLS LAST LIMIT 1`
    ).bind(auctionId).first() as any;

    // End auction
    await env.DB.prepare(
      `UPDATE auctions SET status = 'ended', updated_at = ? WHERE id = ?`
    ).bind(now, auctionId).run();

    if (winningBid) {
      // Mark winning bid
      await env.DB.prepare(
        `UPDATE bids SET status = 'winning' WHERE id = ?`
      ).bind(winningBid.id).run();

      // Log bid event
      await env.DB.prepare(
        `INSERT INTO bid_events (id, auction_id, bid_id, event_type, actor, metadata, created_at)
         VALUES (?, ?, ?, 'winner_declared', ?, ?, ?)`
      ).bind(`be_${Date.now()}`, auctionId, winningBid.id, (auth as any).email, JSON.stringify({ winner: winningBid.bidder_id, amount: winningBid.amount_vnd }), now).run();

      // Log registry event
      await env.DB.prepare(
        `INSERT INTO registry_events (id, package_id, event_type, public_visible, actor, description, created_at)
         VALUES (?, ?, 'auction_won', 1, ?, ?, ?)`
      ).bind(`rev_${Date.now()}`, auction.package_id, (auth as any).email, `Auction ${auctionId} won by ${winningBid.bidder_id}`, now).run();
    } else {
      // No bids — log no winner
      await env.DB.prepare(
        `INSERT INTO bid_events (id, auction_id, event_type, actor, metadata, created_at)
         VALUES (?, ?, 'auction_ended_no_bids', ?, ?, ?)`
      ).bind(`be_${Date.now()}`, auctionId, (auth as any).email, JSON.stringify({}), now).run();
    }

    // Log audit event
    await env.DB.prepare(
      `INSERT INTO asset_audit_events (id, package_id, action, actor, reason, created_at)
       VALUES (?, ?, 'auction_ended', ?, ?, ?)`
    ).bind(`ae_${Date.now()}`, auction.package_id, (auth as any).email, `Auction ${auctionId} ended${winningBid ? ' with winner' : ' no bids'}`, now).run();

    return withCors(request, new Response(
      JSON.stringify({
        success: true,
        auction_id: auctionId,
        status: 'ended',
        winner: winningBid ? { bid_id: winningBid.id, bidder_id: winningBid.bidder_id, amount_vnd: winningBid.amount_vnd } : null,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to end auction', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
