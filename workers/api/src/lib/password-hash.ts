/**
 * Password hashing using PBKDF2-SHA256 with a random salt.
 * This replaces the placeholder plain-text comparison in brand-admin-login.ts.
 */

const SALT_BYTES = 16;
const ITERATIONS = 100_000;
const KEY_LEN = 32;

export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(plain),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LEN * 8
  );
  const saltB64 = btoa(String.fromCharCode(...salt)).replace(/=+$/, '');
  const hashB64 = btoa(String.fromCharCode(...new Uint8Array(derived))).replace(/=+$/, '');
  return `pbkdf2:${ITERATIONS}:${saltB64}:${hashB64}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  if (!stored || !stored.startsWith('pbkdf2:')) {
    // Legacy plain-text fallback — only for migration window; reject after all passwords upgraded.
    return false;
  }
  const parts = stored.split(':');
  if (parts.length !== 4) return false;
  const iterations = parseInt(parts[1], 10);
  const saltB64 = parts[2];
  const hashB64 = parts[3];
  const salt = Uint8Array.from(atob(saltB64), c => c.charCodeAt(0));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(plain),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LEN * 8
  );
  const derivedB64 = btoa(String.fromCharCode(...new Uint8Array(derived))).replace(/=+$/, '');
  return derivedB64 === hashB64;
}
