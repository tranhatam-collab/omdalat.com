/**
 * Validate checkout request payload
 */
export const validateCheckoutRequest = (data: unknown): {
  valid: boolean;
  error?: string;
} => {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, error: 'Invalid request payload' };
  }

  const req = data as Record<string, unknown>;

  // Validate plan_code
  if (typeof req.plan_code !== 'string' || !req.plan_code.trim()) {
    return { valid: false, error: 'plan_code is required and must be a string' };
  }

  // Validate email
  if (typeof req.email !== 'string' || !isValidEmail(req.email)) {
    return { valid: false, error: 'email is required and must be a valid email address' };
  }

  return { valid: true };
};

/**
 * Simple email validation
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate webhook payload
 */
export const validateWebhookPayload = (data: unknown): {
  valid: boolean;
  error?: string;
} => {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, error: 'Invalid webhook payload' };
  }

  const payload = data as Record<string, unknown>;

  // Check required fields
  if (typeof payload.event_type !== 'string') {
    return { valid: false, error: 'event_type is required' };
  }

  return { valid: true };
};
