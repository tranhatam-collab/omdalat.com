import type { Env } from '../index';
import { verifyWebhookSignature } from '../lib/webhook-validator';
import { logAudit } from '../lib/audit';
import { generateId } from '../lib/id-gen';

export const handlePaymentWebhook = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('X-Signature') || '';

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(body, signature, env.PAYMENT_WEBHOOK_SECRET);
    if (!isValid) {
      console.warn('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const payload = JSON.parse(body);
    const webhookId = generateId('webhook');
    const eventId = payload.transaction_id || payload.id || null;

    // Idempotency: check if this event was already processed
    if (eventId) {
      const existing = await env.DB.prepare(
        `SELECT id FROM payment_webhooks
         WHERE event_id = ? AND status = 'processed'`
      ).bind(eventId).first();
      if (existing) {
        console.warn(`Duplicate webhook event ${eventId} — already processed`);
        return new Response(
          JSON.stringify({ received: true, duplicate: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Store webhook record
    await env.DB.prepare(
      `INSERT INTO payment_webhooks
       (id, provider, event_type, event_id, payload, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      webhookId,
      payload.provider || 'payos',
      payload.event_type || 'payment.completed',
      eventId,
      body,
      'pending',
      new Date().toISOString()
    ).run();

    // Handle payment completion
    if (
      payload.event_type === 'payment.completed' ||
      payload.event_type === 'payment.success'
    ) {
      const { session_id, transaction_id, amount, currency } = payload;

      if (session_id) {
        // Check if order already exists for this session (idempotency)
        const existingOrder = await env.DB.prepare(
          `SELECT id FROM payment_orders WHERE session_id = ? AND status = 'paid'`
        ).bind(session_id).first();

        if (!existingOrder) {
          // Update session status
          await env.DB.prepare(
            `UPDATE payment_sessions
             SET status = ?, provider_session_id = ?, updated_at = ?
             WHERE id = ?`
          ).bind(
            'completed',
            transaction_id,
            new Date().toISOString(),
            session_id
          ).run();

          // Create order record
          const orderId = generateId('order');
          await env.DB.prepare(
            `INSERT INTO payment_orders
             (id, session_id, plan_code, amount_vnd, currency, status, provider, provider_transaction_id, created_at, updated_at)
             SELECT ?, ?, plan_code, ?, ?, ?, ?, ?, ?, ?
             FROM payment_sessions WHERE id = ?`
          ).bind(
            orderId,
            session_id,
            amount || 100000,
            currency || 'VND',
            'paid',
            payload.provider || 'payos',
            transaction_id,
            new Date().toISOString(),
            new Date().toISOString(),
            session_id
          ).run();

          // Queue email notification
          await env.AUTOMATION_QUEUE.send({
            type: 'payment.completed',
            session_id,
            order_id: orderId,
            amount,
            timestamp: new Date().toISOString()
          });
        } else {
          console.warn(`Order already exists for session ${session_id} — skipping`);
        }
      }

      // Mark webhook as processed
      await env.DB.prepare(
        `UPDATE payment_webhooks
         SET status = ?, processed_at = ?
         WHERE id = ?`
      ).bind(
        'processed',
        new Date().toISOString(),
        webhookId
      ).run();

      await logAudit(env, null, 'payment.webhook.processed', 'payment_order', session_id || null, {
        event_type: payload.event_type,
        transaction_id,
        amount,
        currency
      });
    }

    return new Response(
      JSON.stringify({ received: true, webhook_id: webhookId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
