/**
 * Content blocks + overclaim validator wiring tests
 */

import { describe, it, expect } from 'vitest';
import { handleContentBlockCreate, handleContentBlockUpdate } from '../src/routes/content-blocks';

function mockEnv(overrides?: any): any {
  return {
    DB: {
      prepare: () => ({
        bind: () => ({
          first: async () => overrides?.first ?? null,
          all: async () => ({ results: overrides?.all ?? [], success: true }),
          run: async () => ({ success: true, meta: { changes: 1 } }),
        }),
        first: async () => overrides?.first ?? null,
        all: async () => ({ results: overrides?.all ?? [], success: true }),
        run: async () => ({ success: true, meta: { changes: 1 } }),
      }),
    },
    COOKIE_DOMAIN: '.omdalat.com',
  };
}

function mockReq(method: string, path: string, body: any, headers: Record<string, string> = {}): Request {
  return new Request(`https://api.omdalat.com${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe('Content block create — overclaim gate', () => {
  it('creates content block with valid L3 copy', async () => {
    const env = mockEnv({
      first: {
        admin_id: 'adm_001', brand_id: 'brnd_lily', role: 'super', is_active: 1,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        email: 'admin@omdalat.com', fingerprint_hash: null, csrf_token: 'tok',
      },
    });
    const req = mockReq('POST', '/api/omdalat/brands/brnd_lily/content-blocks', {
      block_type: 'about', payload: { text: 'A quiet garden in Lac Duong.' },
    }, { Authorization: 'Bearer ' + 't'.repeat(40) });
    const res = await handleContentBlockCreate(req, env);
    expect(res.status).toBe(201);
    const json = await res.json() as any;
    expect(json.validation.valid).toBe(true);
  });

  it('blocks L3 overclaim terms', async () => {
    const env = mockEnv({
      first: {
        admin_id: 'adm_001', brand_id: 'brnd_lily', role: 'super', is_active: 1,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        email: 'admin@omdalat.com', fingerprint_hash: null, csrf_token: 'tok',
      },
    });
    const req = mockReq('POST', '/api/omdalat/brands/brnd_lily/content-blocks', {
      block_type: 'cta', payload: { text: 'Đặt ngay để không bỏ lỡ cơ hội tốt nhất.' },
    }, { Authorization: 'Bearer ' + 't'.repeat(40) });
    const res = await handleContentBlockCreate(req, env);
    expect(res.status).toBe(400);
    const json = await res.json() as any;
    expect(json.error).toContain('overclaim');
    expect(json.validation.valid).toBe(false);
  });

  it('rejects invalid block_type', async () => {
    const env = mockEnv({
      first: {
        admin_id: 'adm_001', brand_id: 'brnd_lily', role: 'super', is_active: 1,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        email: 'admin@omdalat.com', fingerprint_hash: null, csrf_token: 'tok',
      },
    });
    const req = mockReq('POST', '/api/omdalat/brands/brnd_lily/content-blocks', {
      block_type: 'invalid', payload: {},
    }, { Authorization: 'Bearer ' + 't'.repeat(40) });
    const res = await handleContentBlockCreate(req, env);
    expect(res.status).toBe(400);
  });
});

describe('Content block update — overclaim gate', () => {
  it('updates block with valid copy', async () => {
    const env = mockEnv({
      first: {
        id: 'cb_001', block_type: 'about', payload: '{}',
        admin_id: 'adm_001', brand_id: 'brnd_lily', role: 'super', is_active: 1,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        email: 'admin@omdalat.com', fingerprint_hash: null, csrf_token: 'tok',
      },
    });
    const req = mockReq('PATCH', '/api/omdalat/brands/brnd_lily/content-blocks/cb_001', {
      payload: { text: 'Updated safe text.' },
    }, { Authorization: 'Bearer ' + 't'.repeat(40) });
    const res = await handleContentBlockUpdate(req, env);
    expect(res.status).toBe(200);
  });

  it('blocks update that introduces overclaim', async () => {
    const env = mockEnv({
      first: {
        id: 'cb_001', block_type: 'about', payload: '{}',
        admin_id: 'adm_001', brand_id: 'brnd_lily', role: 'super', is_active: 1,
        expires_at: new Date(Date.now() + 3600000).toISOString(),
        email: 'admin@omdalat.com', fingerprint_hash: null, csrf_token: 'tok',
      },
    });
    const req = mockReq('PATCH', '/api/omdalat/brands/brnd_lily/content-blocks/cb_001', {
      payload: { text: 'Sản phẩm hoàn hảo, không thể tốt hơn.' },
    }, { Authorization: 'Bearer ' + 't'.repeat(40) });
    const res = await handleContentBlockUpdate(req, env);
    expect(res.status).toBe(400);
    const json = await res.json() as any;
    expect(json.validation.valid).toBe(false);
  });
});
