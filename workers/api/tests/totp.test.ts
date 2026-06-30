/**
 * TOTP verification tests — RFC 6238 compliance.
 */

import { describe, it, expect } from 'vitest';
import { generateTOTP, verifyTOTP, base32Decode } from '../src/lib/totp';

// RFC 6238 test vectors — secret "12345678901234567890" (base32: GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ)
const RFC_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
// RFC 6238 test times and expected codes (SHA-1, 8 digits → we use 6, so recompute)
// For 6-digit TOTP with SHA-1:
// T=59 (1970+59s) → counter=1 → 287082
// T=1111111109 → counter=37037036 → 081804
// T=1111111111 → counter=37037037 → 050471

describe('Base32 decode', () => {
  it('decodes RFC test secret correctly', () => {
    const bytes = base32Decode(RFC_SECRET);
    expect(bytes.length).toBe(20);
    // "12345678901234567890" as ASCII
    expect(String.fromCharCode(...bytes)).toBe('12345678901234567890');
  });

  it('handles lowercase and padding', () => {
    const a = base32Decode('JBSWY3DP');
    const b = base32Decode('jbswy3dp=');
    expect(a).toEqual(b);
  });

  it('throws on invalid char', () => {
    expect(() => base32Decode('INVALID!')).toThrow();
  });
});

describe('TOTP generation', () => {
  it('generates 6-digit code', async () => {
    const code = await generateTOTP(RFC_SECRET, 59);
    expect(code).toMatch(/^\d{6}$/);
  });

  it('generates same code for same time', async () => {
    const c1 = await generateTOTP(RFC_SECRET, 1234567890);
    const c2 = await generateTOTP(RFC_SECRET, 1234567890);
    expect(c1).toBe(c2);
  });

  it('generates different code for different time step', async () => {
    const c1 = await generateTOTP(RFC_SECRET, 1000);
    const c2 = await generateTOTP(RFC_SECRET, 1000 + 30);
    expect(c1).not.toBe(c2);
  });
});

describe('TOTP verification', () => {
  it('verifies correct code at current time', async () => {
    const time = 1234567890;
    const code = await generateTOTP(RFC_SECRET, time);
    const valid = await verifyTOTP(RFC_SECRET, code, time);
    expect(valid).toBe(true);
  });

  it('verifies code within ±1 step window', async () => {
    const time = 1000;
    const code = await generateTOTP(RFC_SECRET, time + 30); // 1 step ahead
    const valid = await verifyTOTP(RFC_SECRET, code, time);
    expect(valid).toBe(true);
  });

  it('verifies code 1 step behind', async () => {
    const time = 1000;
    const code = await generateTOTP(RFC_SECRET, time - 30); // 1 step behind
    const valid = await verifyTOTP(RFC_SECRET, code, time);
    expect(valid).toBe(true);
  });

  it('rejects code outside window (2+ steps)', async () => {
    const time = 1000;
    const code = await generateTOTP(RFC_SECRET, time + 60); // 2 steps ahead
    const valid = await verifyTOTP(RFC_SECRET, code, time);
    expect(valid).toBe(false);
  });

  it('rejects wrong code', async () => {
    const valid = await verifyTOTP(RFC_SECRET, '000000', 1234567890);
    expect(valid).toBe(false);
  });

  it('rejects empty code', async () => {
    const valid = await verifyTOTP(RFC_SECRET, '', 1234567890);
    expect(valid).toBe(false);
  });

  it('rejects wrong-length code', async () => {
    const valid = await verifyTOTP(RFC_SECRET, '12345', 1234567890);
    expect(valid).toBe(false);
  });

  it('rejects code with wrong secret', async () => {
    const code = await generateTOTP(RFC_SECRET, 1234567890);
    const valid = await verifyTOTP('JBSWY3DPEHPK3PXP', code, 1234567890);
    expect(valid).toBe(false);
  });
});
