/**
 * TOTP verification (RFC 6238) using Web Crypto API.
 * No external dependencies — uses HMAC-SHA1 via crypto.subtle.
 */

const STEP = 30; // seconds
const DIGITS = 6;
const WINDOW = 1; // allow ±1 step (30s drift each way)

// Base32 decode (RFC 4648)
const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Decode(secret: string): Uint8Array {
  const clean = secret.replace(/=+$/, '').replace(/\s/g, '').toUpperCase();
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;
  for (const ch of clean) {
    const val = BASE32.indexOf(ch);
    if (val === -1) throw new Error(`Invalid base32 char: ${ch}`);
    buffer = (buffer << 5) | val;
    bits += 5;
    if (bits >= 8) {
      bytes.push((buffer >> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(bytes);
}

// int64 to 8-byte big-endian
function intToBytes(n: number): Uint8Array {
  const buf = new Uint8Array(8);
  // JS numbers are 53-bit safe; for TOTP counters this is fine
  let val = n;
  for (let i = 7; i >= 0; i--) {
    buf[i] = val & 0xff;
    val = Math.floor(val / 256);
  }
  return buf;
}

async function hmacSha1(key: Uint8Array, msg: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msg);
  return new Uint8Array(sig);
}

export async function generateTOTP(secret: string, time: number = Date.now() / 1000): Promise<string> {
  const counter = Math.floor(time / STEP);
  const key = base32Decode(secret);
  const msg = intToBytes(counter);
  const hash = await hmacSha1(key, msg);

  // Dynamic truncation (RFC 4226)
  const offset = hash[hash.length - 1] & 0x0f;
  const binary = ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  const otp = binary % Math.pow(10, DIGITS);
  return otp.toString().padStart(DIGITS, '0');
}

export async function verifyTOTP(
  secret: string,
  code: string,
  time: number = Date.now() / 1000
): Promise<boolean> {
  if (!code || code.length !== DIGITS) return false;
  const counter = Math.floor(time / STEP);

  // Check current + window (±WINDOW steps)
  for (let w = -WINDOW; w <= WINDOW; w++) {
    const expected = await generateTOTP(secret, (counter + w) * STEP);
    if (timingSafeEqual(expected, code)) return true;
  }
  return false;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
