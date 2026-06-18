import type { Env } from '../index';
import { generateId } from '../lib/id-gen';
import { validateCheckoutRequest } from '../lib/validators';
import { createPaymentSession } from '../lib/payment-service';
import { logAudit } from '../lib/audit';

export const handlePaymentCheckoutSession = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const { plan_code, email, idempotency_key, vat_company_name, vat_tax_id, vat_address } = body;

    // Validate input
    const validation = validateCheckoutRequest({ plan_code, email });
    if (!validation.valid) {
      await logAudit(env, null, 'payment.checkout.invalid', 'payment_session', null, {
        error: validation.error,
        plan_code,
        email
      });
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Idempotency: return existing session if idempotency_key was already used
    if (idempotency_key) {
      const existing = await env.DB.prepare(
        `SELECT id, status, checkout_url, expires_at FROM payment_sessions
         WHERE idempotency_key = ?`
      ).bind(idempotency_key).first();

      if (existing) {
        await logAudit(env, null, 'payment.checkout.idempotent', 'payment_session', existing.id, {
          plan_code,
          idempotency_key
        });
        return new Response(
          JSON.stringify({
            session_id: existing.id,
            checkout_url: existing.checkout_url,
            expires_at: existing.expires_at,
            status: existing.status,
            idempotent: true
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create session in omdalat.com database
    const sessionId = generateId('paysess');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

    // Store session in D1
    const insertResult = await env.DB.prepare(
      `INSERT INTO payment_sessions
       (id, plan_code, amount_vnd, currency, status, provider, idempotency_key, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      sessionId,
      plan_code,
      100000, // Default VND amount
      'VND',
      'pending',
      'payos',
      idempotency_key || null,
      expiresAt,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    if (!insertResult.success) {
      await logAudit(env, null, 'payment.checkout.db_error', 'payment_session', sessionId, {
        error: 'Failed to create session',
        plan_code
      });
      return new Response(
        JSON.stringify({ error: 'Failed to create payment session' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call pay.iai.one to create checkout
    const payIaiResponse = await fetch(
      `${env.PAY_IAI_ONE_BASE_URL}/checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.PAY_IAI_ONE_API_KEY}`
        },
        body: JSON.stringify({
          tenant_code: env.PAY_IAI_ONE_TENANT_CODE,
          site_code: env.PAY_IAI_ONE_SITE_CODE,
          plan_code,
          email,
          currency: 'VND',
          amount: 100000,
          session_id: sessionId,
          callback_url: `${env.PAY_IAI_ONE_CALLBACK_BASE_URL}/api/pay/webhook`,
          success_url: env.GATEWAY_SUCCESS_URL
        })
      }
    );

    const payIaiData = await payIaiResponse.json();

    if (!payIaiResponse.ok) {
      await logAudit(env, null, 'payment.checkout.pay_iai_error', 'payment_session', sessionId, {
        error: payIaiData.error || 'Pay IAI request failed',
        plan_code,
        status_code: payIaiResponse.status
      });
      return new Response(
        JSON.stringify({
          error: 'Failed to initialize payment gateway',
          status: payIaiResponse.status
        }),
        { status: payIaiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update session with checkout_url
    if (payIaiData.checkout_url) {
      await env.DB.prepare(
        `UPDATE payment_sessions
         SET checkout_url = ?, provider_session_id = ?, updated_at = ?
         WHERE id = ?`
      ).bind(
        payIaiData.checkout_url,
        payIaiData.session_id || sessionId,
        new Date().toISOString(),
        sessionId
      ).run();
    }

    await logAudit(env, null, 'payment.checkout.created', 'payment_session', sessionId, {
      plan_code,
      email,
      provider: 'payos',
      amount_vnd: 100000
    });

    return new Response(
      JSON.stringify({
        session_id: sessionId,
        checkout_url: payIaiData.checkout_url,
        expires_at: expiresAt,
        status: 'pending'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Payment checkout error:', error);
    await logAudit(env, null, 'payment.checkout.error', 'payment_session', null, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
