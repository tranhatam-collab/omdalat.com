import type { Env } from '../index';

/**
 * Upload Pipeline — X6 security fix
 *
 * Every sensitive file (evidence, KYC, data-room) must flow through this
 * pipeline. The system does NOT accept arbitrary external URLs.
 *
 * Pipeline stages:
 *   1. Request upload (validate MIME, size, extension)
 *   2. Generate internal quarantine R2 key
 *   3. Record pending_scan entry in upload_quarantine
 *   4. Client uploads bytes to R2 (presigned URL or direct Worker upload)
 *   5. Trigger malware scan hook (stub until provider configured)
 *   6. On clean: approve to private storage; on infected: reject
 *   7. Downstream handlers reference upload_id, not file_url
 *
 * STATUS: scan hook is a stub. No real malware provider is configured.
 * Production readiness for file flows remains BLOCKED until scan provider is wired.
 */

export interface UploadFileRequest {
  originalName: string;
  sizeBytes: number;
  mimeType: string;
  sha256Hash?: string; // client-provided pre-check; server will re-verify
}

export interface UploadRecord {
  id: string;
  uploader_email: string;
  target_type: string;
  target_id?: string;
  original_name: string;
  storage_key: string;
  size_bytes: number;
  mime_type: string;
  sha256_hash: string;
  status: 'pending_scan' | 'scanning' | 'clean' | 'infected' | 'expired' | 'rejected';
  scan_provider?: string;
  scan_result?: string;
  scan_score?: number;
  scan_started_at?: string;
  scan_completed_at?: string;
  metadata_json?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

// Allowed MIME types for sensitive uploads
// NOTE: SVG is intentionally excluded because it can contain JavaScript.
// Office and archive formats are excluded because they commonly carry macros/
// embedded objects.
export const ALLOWED_UPLOAD_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/tiff',
  'application/pdf',
]);

// Maximum file size: 50 MB
export const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;

export const UPLOAD_MIME_ERROR = `Only PNG, JPEG, WebP, TIFF, and PDF files are allowed. SVG, Office, and archive files are rejected for security.`;

export type ValidationResult = {
  ok: true;
  safeName: string;
  normalizedMime: string;
} | {
  ok: false;
  error: string;
  status: 400;
};

/**
 * Validate an upload request before any bytes are accepted.
 */
export function validateUploadRequest(req: UploadFileRequest): ValidationResult {
  const normalizedMime = req.mimeType.trim().toLowerCase();
  if (!ALLOWED_UPLOAD_MIME_TYPES.has(normalizedMime)) {
    return {
      ok: false,
      error: UPLOAD_MIME_ERROR,
      status: 400,
    };
  }

  if (!req.sizeBytes || req.sizeBytes <= 0) {
    return {
      ok: false,
      error: 'File size must be greater than 0',
      status: 400,
    };
  }

  if (req.sizeBytes > MAX_UPLOAD_SIZE_BYTES) {
    return {
      ok: false,
      error: `File size exceeds maximum of ${MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)} MB`,
      status: 400,
    };
  }

  // Strip dangerous characters from filename
  const safeName = req.originalName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 255);
  if (!safeName) {
    return {
      ok: false,
      error: 'Invalid file name',
      status: 400,
    };
  }

  return { ok: true, safeName, normalizedMime };
}

/**
 * Generate a deterministic quarantine storage key.
 */
export function generateQuarantineKey(uploadId: string, safeName: string): string {
  return `quarantine/${uploadId}/${safeName}`;
}

/**
 * Create a pending quarantine record. Returns upload_id that the client must
 * use for the actual upload and that downstream handlers must reference.
 */
export async function createQuarantineRecord(
  env: Env,
  uploaderEmail: string,
  targetType: string,
  targetId: string | undefined,
  req: UploadFileRequest,
  metadata?: Record<string, any>
): Promise<{ ok: true; uploadId: string; storageKey: string } | { ok: false; error: string; status: number }> {
  const validation = validateUploadRequest(req);
  if (!validation.ok) {
    return { ok: false, error: validation.error, status: validation.status };
  }

  const id = `upl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const storageKey = generateQuarantineKey(id, validation.safeName);
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

  await env.DB.prepare(
    `INSERT INTO upload_quarantine (
      id, uploader_email, target_type, target_id, original_name, storage_key,
      size_bytes, mime_type, sha256_hash, status, metadata_json, expires_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_scan', ?, ?, ?, ?)`
  ).bind(
    id,
    uploaderEmail,
    targetType,
    targetId || null,
    validation.safeName,
    storageKey,
    req.sizeBytes,
    validation.normalizedMime,
    req.sha256Hash || 'unknown',
    JSON.stringify(metadata || {}),
    expiresAt,
    now,
    now
  ).run();

  await env.DB.prepare(
    `INSERT INTO upload_audit_events (id, upload_id, action, actor, reason, metadata_json, created_at)
     VALUES (?, ?, 'uploaded', ?, ?, ?, ?)`
  ).bind(
    `uev_${Date.now()}`,
    id,
    uploaderEmail,
    'Upload request validated and quarantined',
    JSON.stringify({ mime_type: validation.normalizedMime, size_bytes: req.sizeBytes }),
    now
  ).run();

  return { ok: true, uploadId: id, storageKey };
}

/**
 * Trigger malware scan. This is a HOOK — currently a stub.
 * In production, wire to Cloudflare AV, ClamAV, or a provider API.
 */
export async function triggerMalwareScan(
  env: Env,
  uploadId: string,
  storageKey: string
): Promise<{ ok: true; status: 'pending_scan' } | { ok: false; error: string }> {
  const now = new Date().toISOString();

  // Mark as scanning
  await env.DB.prepare(
    `UPDATE upload_quarantine SET status = 'scanning', scan_provider = 'stub', scan_started_at = ?, updated_at = ?
     WHERE id = ?`
  ).bind(now, now, uploadId).run();

  await env.DB.prepare(
    `INSERT INTO upload_audit_events (id, upload_id, action, actor, reason, created_at)
     VALUES (?, ?, 'scan_started', ?, ?, ?)`
  ).bind(`uev_${Date.now()}`, uploadId, 'system', 'Malware scan hook invoked (stub provider)', now).run();

  // Stub: no real provider. Status remains pending_scan until a provider is configured.
  // This intentionally blocks production file flows.
  return { ok: true, status: 'pending_scan' };
}

/**
 * Finalize scan result (called by scan provider webhook or manual review).
 */
export async function finalizeScan(
  env: Env,
  uploadId: string,
  result: 'clean' | 'infected' | 'rejected',
  reason?: string
): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  const now = new Date().toISOString();

  const upload = await env.DB.prepare(
    `SELECT id, status FROM upload_quarantine WHERE id = ?`
  ).bind(uploadId).first() as { id: string; status: string } | null;

  if (!upload) {
    return { ok: false, error: 'Upload not found', status: 404 };
  }

  if (!['pending_scan', 'scanning'].includes(upload.status)) {
    return { ok: false, error: 'Scan already finalized', status: 409 };
  }

  const newStatus = result === 'clean' ? 'clean' : (result === 'infected' ? 'infected' : 'rejected');

  await env.DB.prepare(
    `UPDATE upload_quarantine SET status = ?, scan_result = ?, scan_completed_at = ?, updated_at = ?
     WHERE id = ?`
  ).bind(newStatus, reason || null, now, now, uploadId).run();

  await env.DB.prepare(
    `INSERT INTO upload_audit_events (id, upload_id, action, actor, reason, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(`uev_${Date.now()}`, uploadId, `scan_${newStatus}`, 'system', reason || '', now).run();

  return { ok: true };
}

/**
 * Verify an upload is clean and owned by the requesting user before allowing
 * a downstream handler to reference it.
 */
export async function requireCleanUpload(
  env: Env,
  uploadId: string,
  uploaderEmail: string,
  targetType?: string
): Promise<{ ok: true; record: UploadRecord } | { ok: false; error: string; status: number }> {
  const upload = await env.DB.prepare(
    `SELECT * FROM upload_quarantine WHERE id = ?`
  ).bind(uploadId).first() as UploadRecord | null;

  if (!upload) {
    return { ok: false, error: 'Upload not found', status: 404 };
  }

  if (upload.uploader_email !== uploaderEmail) {
    return { ok: false, error: 'Upload does not belong to you', status: 403 };
  }

  if (targetType && upload.target_type !== targetType) {
    return { ok: false, error: 'Upload target type mismatch', status: 400 };
  }

  if (upload.status !== 'clean') {
    return { ok: false, error: `Upload is not clean (status: ${upload.status}). Wait for scan completion or re-upload.`, status: 403 };
  }

  return { ok: true, record: upload };
}

/**
 * Reject an upload that was submitted via pipeline but has not been scanned.
 * Used by downstream handlers when scan is still pending.
 */
export async function rejectUpload(
  env: Env,
  uploadId: string,
  reason: string
): Promise<void> {
  const now = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE upload_quarantine SET status = 'rejected', scan_result = ?, updated_at = ? WHERE id = ?`
  ).bind(reason, now, uploadId).run();

  await env.DB.prepare(
    `INSERT INTO upload_audit_events (id, upload_id, action, actor, reason, created_at)
     VALUES (?, ?, 'rejected', 'system', ?, ?)`
  ).bind(`uev_${Date.now()}`, uploadId, reason, now).run();
}
