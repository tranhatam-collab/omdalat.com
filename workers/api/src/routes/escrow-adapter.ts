import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';

/**
 * Escrow Provider Adapter Abstraction
 *
 * STATUS: NOT_IMPLEMENTED — interface only. No production provider connected.
 *
 * Per execution lock section 22 prohibitions:
 * - No direct custody — Om Dalat does NOT hold funds
 * - Escrow is via EXTERNAL provider only
 * - No "we hold funds" language anywhere
 *
 * This abstraction defines the contract for an external escrow provider
 * (Escrow.com, Mangopay, Stripe Connect, etc.).
 *
 * Production readiness: BLOCKED — requires provider account + contract + sandbox verification
 */

export interface EscrowCase {
  escrow_id: string;
  provider: string;
  transaction_id: string; // references asset_offers or auctions
  status: 'pending' | 'funded' | 'released' | 'refunded' | 'disputed' | 'cancelled';
  amount_vnd?: number;
  amount_usd?: number;
  currency: string;
  buyer_email: string;
  seller_email: string;
  created_at: string;
  updated_at: string;
  provider_reference?: string;
  funded_at?: string;
  released_at?: string;
}

export interface EscrowCreateRequest {
  transaction_id: string; // offer_id or auction_id
  transaction_type: 'offer' | 'auction';
  amount_vnd?: number;
  amount_usd?: number;
  currency: string;
  buyer_email: string;
  seller_email: string;
  package_id: string;
  callback_url: string;
}

export interface EscrowWebhookEvent {
  escrow_id: string;
  status: EscrowCase['status'];
  provider_reference: string;
  timestamp: string;
  signature: string;
  raw_payload: string;
}

/**
 * Abstract Escrow provider interface.
 * Concrete implementations must handle:
 * - Provider-specific API calls (create, fund, release, refund)
 * - Webhook signature verification (HMAC)
 * - Replay protection
 * - Idempotency (escrow_id deduplication)
 * - Reconciliation (periodic sync with provider)
 * - Provider outage state
 * - Manual fallback process
 * - Audit events for every state transition
 * - NO direct custody — funds stay with provider
 */
export interface EscrowProviderAdapter {
  /** Create escrow case with external provider */
  createEscrow(req: EscrowCreateRequest, env: Env): Promise<{ escrow_id: string; provider_reference: string; buyer_deposit_url?: string }>;

  /** Get escrow status from provider (polling fallback) */
  getEscrowStatus(escrow_id: string, env: Env): Promise<EscrowCase>;

  /** Release funds to seller (after transfer completion) */
  releaseEscrow(escrow_id: string, env: Env): Promise<void>;

  /** Refund to buyer (if transfer fails) */
  refundEscrow(escrow_id: string, reason: string, env: Env): Promise<void>;

  /** Verify webhook signature */
  verifyWebhookSignature(payload: string, signature: string, env: Env): boolean;

  /** Process webhook event — must be idempotent */
  processWebhookEvent(event: EscrowWebhookEvent, env: Env): Promise<void>;

  /** Reconciliation — sync all open escrows with provider */
  reconcile(env: Env): Promise<{ synced: number; mismatches: number }>;
}

/**
 * Stub provider — returns NOT_IMPLEMENTED for all calls.
 * Default when no provider is configured.
 */
export class StubEscrowProvider implements EscrowProviderAdapter {
  async createEscrow(req: EscrowCreateRequest, env: Env): Promise<{ escrow_id: string; provider_reference: string; buyer_deposit_url?: string }> {
    throw new Error('Escrow provider not configured. Set ESCROW_PROVIDER env var and obtain a provider account. Status: NOT_IMPLEMENTED');
  }

  async getEscrowStatus(escrow_id: string, env: Env): Promise<EscrowCase> {
    throw new Error('Escrow provider not configured. Status: NOT_IMPLEMENTED');
  }

  async releaseEscrow(escrow_id: string, env: Env): Promise<void> {
    throw new Error('Escrow provider not configured. Cannot release funds. Status: NOT_IMPLEMENTED');
  }

  async refundEscrow(escrow_id: string, reason: string, env: Env): Promise<void> {
    throw new Error('Escrow provider not configured. Cannot refund. Status: NOT_IMPLEMENTED');
  }

  verifyWebhookSignature(payload: string, signature: string, env: Env): boolean {
    return false;
  }

  async processWebhookEvent(event: EscrowWebhookEvent, env: Env): Promise<void> {
    throw new Error('Escrow provider not configured. Webhook rejected. Status: NOT_IMPLEMENTED');
  }

  async reconcile(env: Env): Promise<{ synced: number; mismatches: number }> {
    throw new Error('Escrow provider not configured. Cannot reconcile. Status: NOT_IMPLEMENTED');
  }
}

/**
 * Get the configured Escrow provider adapter.
 *
 * To add a real provider:
 * 1. Implement EscrowProviderAdapter (e.g., EscrowComProvider)
 * 2. Add ESCROW_PROVIDER env var (e.g., "escrow_com")
 * 3. Add ESCROW_PROVIDER_API_KEY as a wrangler secret
 * 4. Add ESCROW_WEBHOOK_SECRET as a wrangler secret
 * 5. Register the provider in the switch below
 * 6. Run sandbox contract tests
 * 7. Verify webhook signature verification works
 * 8. Run reconciliation test
 * 9. Only then change status to PRODUCTION_CONFIGURED
 */
export function getEscrowProvider(env: Env): EscrowProviderAdapter {
  const providerName = (env as any).ESCROW_PROVIDER || 'stub';
  switch (providerName) {
    case 'stub':
    default:
      return new StubEscrowProvider();
    // case 'escrow_com':
    //   return new EscrowComProvider(env);
    // case 'mangopay':
    //   return new MangopayProvider(env);
    // case 'stripe_connect':
    //   return new StripeConnectProvider(env);
  }
}

/**
 * POST /api/omdalat/escrow/create
 * Create an escrow case with external provider
 * Auth route — buyer must be authenticated
 */
export const handleEscrowCreate = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const { requireAuth } = await import('../lib/auth');
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const body = await request.json() as any;
    const provider = getEscrowProvider(env);

    const req: EscrowCreateRequest = {
      transaction_id: body.transaction_id,
      transaction_type: body.transaction_type || 'offer',
      amount_vnd: body.amount_vnd,
      amount_usd: body.amount_usd,
      currency: body.currency || 'VND',
      buyer_email: (auth as any).email || body.buyer_email,
      seller_email: body.seller_email,
      package_id: body.package_id,
      callback_url: body.callback_url || 'https://omdalat.com/escrow/callback',
    };

    if (!req.transaction_id || !req.seller_email || !req.package_id) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'transaction_id, seller_email, and package_id are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const result = await provider.createEscrow(req, env);

    // Record in DB
    const now = new Date().toISOString();
    const escrowId = `esc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    await env.DB.prepare(
      `INSERT INTO escrow_references (id, provider, provider_reference, status, currency, created_at, updated_at)
       VALUES (?, 'stub', ?, 'pending', ?, ?, ?)`
    ).bind(escrowId, result.provider_reference, req.currency, now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, escrow_id: escrowId, provider_reference: result.provider_reference, buyer_deposit_url: result.buyer_deposit_url }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    const msg = String(err);
    const isNotImplemented = msg.includes('NOT_IMPLEMENTED');
    return withCors(request, new Response(
      JSON.stringify({ error: isNotImplemented ? 'Escrow provider not configured' : 'Failed to create escrow', detail: msg, status: isNotImplemented ? 'not_implemented' : 'error' }),
      { status: isNotImplemented ? 501 : 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * GET /api/omdalat/escrow/:id
 * Get escrow status
 * Auth route
 */
export const handleEscrowStatus = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'GET') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const { requireAuth } = await import('../lib/auth');
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const escrowId = pathParts[3];

    // Get from DB first
    const dbRecord = await env.DB.prepare(
      `SELECT * FROM escrow_references WHERE id = ?`
    ).bind(escrowId).first() as any;

    if (!dbRecord) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'Escrow case not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    // Try to get live status from provider
    const provider = getEscrowProvider(env);
    let liveStatus: EscrowCase | null = null;
    try {
      liveStatus = await provider.getEscrowStatus(escrowId, env);
    } catch {
      // Provider not configured — return DB record only
    }

    return withCors(request, new Response(
      JSON.stringify({
        escrow: dbRecord,
        live_status: liveStatus,
        note: liveStatus ? 'Status synced from provider' : 'Provider not configured — showing DB record only',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to get escrow status', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
