/**
 * Verify webhook signature using HMAC-SHA256
 * Production-ready implementation using Web Crypto API
 */
export const verifyWebhookSignature = async (
  body: string,
  signature: string,
  secret: string
): Promise<boolean> => {
  try {
    if (!signature || !secret) {
      return false;
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const computed = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const computedHex = Array.from(new Uint8Array(computed))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison to prevent timing attacks
    if (computedHex.length !== signature.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < computedHex.length; i++) {
      result |= computedHex.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return result === 0;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};
