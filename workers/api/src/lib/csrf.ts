/**
 * CSRF token validation for state-changing requests.
 */

import { parseCookie } from './session';

const STATE_METHODS = new Set(['POST', 'PUT', 'DELETE', 'PATCH']);

export function isStateChanging(method: string): boolean {
  return STATE_METHODS.has(method.toUpperCase());
}

export function validateCsrf(request: Request, expectedToken: string): boolean {
  const headerToken = request.headers.get('X-CSRF-Token') || '';
  if (!headerToken) return false;
  return constantTimeEquals(headerToken, expectedToken);
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function csrfErrorResponse(): Response {
  return new Response(JSON.stringify({ error: 'CSRF token invalid or missing' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}
