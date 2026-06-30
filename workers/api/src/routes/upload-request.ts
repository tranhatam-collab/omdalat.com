import type { Env } from '../index';
import { handleCorsPreflight, withCors } from '../lib/cors';
import { requireAuthAndCsrf, requireSuper } from '../lib/auth';
import { rateLimitWrite, RATE_LIMIT_TIERS } from '../lib/rate-limit';
import {
  createQuarantineRecord,
  triggerMalwareScan,
  finalizeScan,
  MAX_UPLOAD_SIZE_BYTES,
  ALLOWED_UPLOAD_MIME_TYPES,
  UPLOAD_MIME_ERROR,
} from '../lib/upload-pipeline';

/**
 * POST /api/omdalat/uploads/request
 * Request an upload slot. Validates metadata and creates a quarantine record.
 * Auth route. Client must then POST bytes to /uploads/:id/bytes.
 */
export const handleUploadRequest = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  const rateLimit = await rateLimitWrite(
    env,
    'upload:request',
    (auth as any).email,
    RATE_LIMIT_TIERS.evidenceSubmit.limit,
    RATE_LIMIT_TIERS.evidenceSubmit.windowSeconds
  );
  if (!rateLimit.ok) return withCors(request, rateLimit.response, env);

  try {
    const body = await request.json() as any;
    const {
      target_type,
      target_id,
      original_name,
      size_bytes,
      mime_type,
      sha256_hash,
    } = body;

    if (!target_type || !original_name || !size_bytes || !mime_type) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'target_type, original_name, size_bytes, and mime_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const record = await createQuarantineRecord(
      env,
      (auth as any).email,
      target_type,
      target_id,
      {
        originalName: original_name,
        sizeBytes: Number(size_bytes),
        mimeType: mime_type,
        sha256Hash: sha256_hash,
      },
      { request_ip: request.headers.get('CF-Connecting-IP') || 'unknown' }
    );

    if (!record.ok) {
      return withCors(request, new Response(
        JSON.stringify({ error: record.error }),
        { status: record.status, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    return withCors(request, new Response(
      JSON.stringify({
        success: true,
        upload_id: record.uploadId,
        status: 'pending_scan',
        storage_key: record.storageKey,
        upload_url: `/api/omdalat/uploads/${record.uploadId}/bytes`,
        max_bytes: MAX_UPLOAD_SIZE_BYTES,
        allowed_mime_types: Array.from(ALLOWED_UPLOAD_MIME_TYPES),
        mime_error: UPLOAD_MIME_ERROR,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to request upload', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};

/**
 * POST /api/omdalat/uploads/:id/bytes
 * Upload raw bytes for a previously requested upload slot.
 * Body is the raw file bytes. Content-Type must match the requested MIME type.
 * Auth route. Uploader must match the quarantine record owner.
 */
export const handleUploadBytes = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const uploadId = pathParts[3];

  const upload = await env.DB.prepare(
    `SELECT uploader_email, storage_key, size_bytes, mime_type, status FROM upload_quarantine WHERE id = ?`
  ).bind(uploadId).first() as any;

  if (!upload) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Upload not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  if (upload.uploader_email !== (auth as any).email) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Upload does not belong to you' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  if (upload.status !== 'pending_scan') {
    return withCors(request, new Response(
      JSON.stringify({ error: `Upload already finalized (status: ${upload.status})` }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  const contentType = request.headers.get('Content-Type') || 'application/octet-stream';
  const contentLength = Number(request.headers.get('Content-Length') || '0');

  if (contentType !== upload.mime_type) {
    return withCors(request, new Response(
      JSON.stringify({ error: `Content-Type mismatch. Expected ${upload.mime_type}, got ${contentType}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  if (contentLength > upload.size_bytes) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Uploaded bytes exceed declared size' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  // Read bytes and store in R2
  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > upload.size_bytes) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Uploaded bytes exceed declared size' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }

  await env.ASSETS.put(upload.storage_key, bytes, {
    httpMetadata: { contentType: upload.mime_type },
    customMetadata: { upload_id: uploadId, uploader: upload.uploader_email },
  });

  // Trigger malware scan hook (stub — no real provider)
  await triggerMalwareScan(env, uploadId, upload.storage_key);

  return withCors(request, new Response(
    JSON.stringify({
      success: true,
      upload_id: uploadId,
      status: 'pending_scan',
      note: 'File is quarantined pending malware scan. No production provider is configured.',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  ), env);
};

/**
 * POST /api/omdalat/uploads/:id/scan-result
 * Admin-only endpoint to finalize scan result (clean / infected / rejected).
 * In production, this would be called by the scan provider webhook.
 */
export const handleUploadScanResult = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method === 'OPTIONS') return handleCorsPreflight(request, env);
  if (request.method !== 'POST') {
    return withCors(request, new Response('Method not allowed', { status: 405 }), env);
  }

  const auth = await requireAuthAndCsrf(request, env);
  if (auth instanceof Response) return withCors(request, auth, env);
  const superCheck = requireSuper(auth as any);
  if (superCheck instanceof Response) return withCors(request, superCheck, env);

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const uploadId = pathParts[3];

  try {
    const body = await request.json() as any;
    const { result, reason } = body;

    if (!['clean', 'infected', 'rejected'].includes(result)) {
      return withCors(request, new Response(
        JSON.stringify({ error: 'result must be clean, infected, or rejected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    const finalized = await finalizeScan(env, uploadId, result, reason);
    if (!finalized.ok) {
      return withCors(request, new Response(
        JSON.stringify({ error: finalized.error }),
        { status: finalized.status, headers: { 'Content-Type': 'application/json' } }
      ), env);
    }

    return withCors(request, new Response(
      JSON.stringify({ success: true, upload_id: uploadId, status: result }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ), env);
  } catch (err) {
    return withCors(request, new Response(
      JSON.stringify({ error: 'Failed to finalize scan', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ), env);
  }
};
