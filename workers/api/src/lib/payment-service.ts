import type { Env } from '../index';

/**
 * Create a payment session in the database
 */
export const createPaymentSession = async (
  env: Env,
  sessionId: string,
  planCode: string,
  amountVnd: number,
  expiresAt: string
): Promise<boolean> => {
  try {
    const result = await env.DB.prepare(
      `INSERT INTO payment_sessions
       (id, plan_code, amount_vnd, currency, status, provider, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      sessionId,
      planCode,
      amountVnd,
      'VND',
      'pending',
      'payos',
      expiresAt,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    return result.success;
  } catch (error) {
    console.error('Failed to create payment session:', error);
    return false;
  }
};

/**
 * Get payment session by ID
 */
export const getPaymentSession = async (
  env: Env,
  sessionId: string
): Promise<Record<string, unknown> | null> => {
  try {
    const result = await env.DB.prepare(
      `SELECT * FROM payment_sessions WHERE id = ?`
    ).bind(sessionId).first();

    return result || null;
  } catch (error) {
    console.error('Failed to get payment session:', error);
    return null;
  }
};

/**
 * Update payment session status
 */
export const updateSessionStatus = async (
  env: Env,
  sessionId: string,
  status: string,
  providerSessionId?: string
): Promise<boolean> => {
  try {
    const result = await env.DB.prepare(
      `UPDATE payment_sessions
       SET status = ?, provider_session_id = ?, updated_at = ?
       WHERE id = ?`
    ).bind(
      status,
      providerSessionId || null,
      new Date().toISOString(),
      sessionId
    ).run();

    return result.success;
  } catch (error) {
    console.error('Failed to update session status:', error);
    return false;
  }
};
