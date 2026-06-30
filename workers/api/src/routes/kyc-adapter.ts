import type { Env } from '../index';
import { rateLimitWrite, RATE_LIMIT_TIERS } from '../lib/rate-limit';
import { requireCleanUpload } from '../lib/upload-pipeline';

/**
 * KYC/KYB Provider Adapter Abstraction
 *
 * STATUS: NOT_IMPLEMENTED — interface only. No production provider connected.
 *
 * This abstraction defines the contract that a real KYC/KYB provider must implement.
 * When a provider account is obtained (Onfido, Stripe Identity, Jumio, etc.),
 * create a concrete implementation and wire it via the KYC_PROVIDER env var.
 *
 * Per execution lock section 17 Phase 3:
 * - No live auction until legal partner signoff
 * - No bidder qualification without KYC/KYB verification
 * - Provider must support webhook authentication + replay protection
 *
 * Production readiness: BLOCKED — requires provider account + contract + sandbox verification
 */

export interface KycCase {
  case_id: string;
  provider: string;
  subject_type: 'individual' | 'organization';
  subject_id: string;
  status: 'pending' | 'in_review' | 'clear' | 'rejected' | 'expired';
  created_at: string;
  updated_at: string;
  provider_reference?: string;
  rejection_reason?: string;
  documents_required?: string[];
}

export interface KycSubmissionRequest {
  subject_type: 'individual' | 'organization';
  subject_id: string; // email or org ID
  package_id?: string; // for auction bidder qualification
  auction_id?: string; // for auction bidder qualification
  callback_url: string;
  documents: {
    type: 'passport' | 'national_id' | 'driver_license' | 'business_license' | 'articles_of_incorporation';
    upload_id: string;
    file_hash: string;
  }[];
}

export interface KycWebhookEvent {
  case_id: string;
  status: KycCase['status'];
  provider_reference: string;
  timestamp: string;
  signature: string; // HMAC signature for verification
  raw_payload: string;
}

/**
 * Abstract KYC provider interface.
 * Concrete implementations must handle:
 * - Provider-specific API calls
 * - Webhook signature verification (HMAC)
 * - Replay protection (nonce/timestamp check)
 * - Idempotency (case_id deduplication)
 * - Retry logic with exponential backoff
 * - Dead-letter queue for failed webhooks
 * - Provider outage fallback
 * - Audit events for every state transition
 */
export interface KycProviderAdapter {
  /** Create a new KYC/KYB case with the provider */
  createCase(req: KycSubmissionRequest, env: Env): Promise<{ case_id: string; provider_reference: string; redirect_url?: string }>;

  /** Get case status from provider (polling fallback) */
  getCaseStatus(case_id: string, env: Env): Promise<KycCase>;

  /** Verify webhook signature (HMAC) — must return false if signature invalid */
  verifyWebhookSignature(payload: string, signature: string, env: Env): boolean;

  /** Process webhook event — must be idempotent */
  processWebhookEvent(event: KycWebhookEvent, env: Env): Promise<void>;

  /** Check if a subject is cleared (for auction bidder qualification) */
  isSubjectCleared(subject_id: string, env: Env): Promise<boolean>;
}

/**
 * Stub provider — returns NOT_IMPLEMENTED for all calls.
 * This is the default when no provider is configured.
 * DO NOT use in production — it will block all KYC-gated functionality.
 */
export class StubKycProvider implements KycProviderAdapter {
  async createCase(req: KycSubmissionRequest, env: Env): Promise<{ case_id: string; provider_reference: string; redirect_url?: string }> {
    throw new Error('KYC provider not configured. Set KYC_PROVIDER env var and obtain a provider account. Status: NOT_IMPLEMENTED');
  }

  async getCaseStatus(case_id: string, env: Env): Promise<KycCase> {
    throw new Error('KYC provider not configured. Status: NOT_IMPLEMENTED');
  }

  verifyWebhookSignature(payload: string, signature: string, env: Env): boolean {
    // Stub: always reject — no provider to verify against
    return false;
  }

  async processWebhookEvent(event: KycWebhookEvent, env: Env): Promise<void> {
    throw new Error('KYC provider not configured. Webhook rejected. Status: NOT_IMPLEMENTED');
  }

  async isSubjectCleared(subject_id: string, env: Env): Promise<boolean> {
    // Stub: always return false — no one is cleared without a real provider
    return false;
  }
}

/**
 * Get the configured KYC provider adapter.
 * Returns StubKycProvider if no provider is configured.
 *
 * To add a real provider:
 * 1. Implement KycProviderAdapter (e.g., OnfidoKycProvider)
 * 2. Add KYC_PROVIDER env var (e.g., "onfido")
 * 3. Add KYC_PROVIDER_API_KEY as a wrangler secret
 * 4. Add KYC_WEBHOOK_SECRET as a wrangler secret
 * 5. Register the provider in the switch below
 * 6. Run sandbox contract tests
 * 7. Verify webhook signature verification works
 * 8. Only then change status to PRODUCTION_CONFIGURED
 */
export function getKycProvider(env: Env): KycProviderAdapter {
  const providerName = (env as any).KYC_PROVIDER || 'stub';
  switch (providerName) {
    case 'stub':
    default:
      return new StubKycProvider();
    // case 'onfido':
    //   return new OnfidoKycProvider(env);
    // case 'stripe_identity':
    //   return new StripeIdentityKycProvider(env);
    // case 'jumio':
    //   return new JumioKycProvider(env);
  }
}

/**
 * POST /api/omdalat/kyc/submit
 * Submit a KYC/KYB case (buyer or auction bidder)
 * Auth route — submitter must be authenticated
 */
export const handleKycSubmit = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  // Import auth — circular dependency avoided by dynamic import
  const { requireAuth } = await import('../lib/auth');
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  const rateLimit = await rateLimitWrite(
    env,
    'kyc:submit',
    (auth as any).email,
    RATE_LIMIT_TIERS.kycSubmit.limit,
    RATE_LIMIT_TIERS.kycSubmit.windowSeconds
  );
  if (!rateLimit.ok) return withCors(request, rateLimit.response, env);

  try {
    const body = await request.json() as any;
    const provider = getKycProvider(env);

    // X6 FIX: KYC documents must reference clean upload_ids from the pipeline,
    // not arbitrary external file_url strings.
    const rawDocs = body.documents || [];
    const documents: KycSubmissionRequest['documents'] = [];
    for (const doc of rawDocs) {
      if (doc.file_url !== undefined) {
        return withCors(request, new Response(
          JSON.stringify({ error: 'KYC documents must use upload_id, not file_url' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      if (!doc.upload_id) {
        return withCors(request, new Response(
          JSON.stringify({ error: 'Each KYC document must have upload_id' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      const uploadCheck = await requireCleanUpload(env, doc.upload_id, (auth as any).email, 'kyc');
      if (!uploadCheck.ok) {
        return withCors(request, new Response(
          JSON.stringify({ error: uploadCheck.error }),
          { status: uploadCheck.status, headers: { 'Content-Type': 'application/json' } }
        ), env);
      }
      documents.push({
        type: doc.type,
        upload_id: doc.upload_id,
        file_hash: doc.file_hash || uploadCheck.record.sha256_hash,
      });
    }

    const req: KycSubmissionRequest = {
      subject_type: body.subject_type || 'individual',
      subject_id: (auth as any).email || body.subject_id,
      package_id: body.package_id,
      auction_id: body.auction_id,
      callback_url: body.callback_url || 'https://omdalat.com/kyc/callback',
      documents,
    };

    const result = await provider.createCase(req, env);

    // Record case in DB
    const now = new Date().toISOString();
    const caseId = `kyc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    await env.DB.prepare(
      `INSERT INTO kyc_cases (id, case_type, status, created_at, updated_at)
       VALUES (?, ?, 'pending', ?, ?)`
    ).bind(caseId, req.subject_type, now, now).run();

    return withCors(request, new Response(
      JSON.stringify({ success: true, case_id: caseId, provider_reference: result.provider_reference, redirect_url: result.redirect_url }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    const msg = String(err);
    const isNotImplemented = msg.includes('NOT_IMPLEMENTED');
    return withCors(request, new Response(
      JSON.stringify({ error: isNotImplemented ? 'KYC provider not configured' : 'Failed to submit KYC case', detail: msg, status: isNotImplemented ? 'not_implemented' : 'error' }),
      { status: isNotImplemented ? 501 : 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

// Re-export for route registration
import { handleCorsPreflight, withCors } from '../lib/cors';
