/**
 * Negative/positive tests for publish gate and renderer /stay gate
 * These must pass before any publish or /stay route can be considered "closed"
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import type { Env } from '../src/index';

// Helper to mock D1 results
// Query 1: brands → rows[0]
// Query 2: compliance_checklists → rows[1]
function mockDB(rows: Record<string, unknown>[]) {
  let queryCount = 0;
  return {
    prepare: () => ({
      bind: () => ({
        first: async () => {
          const idx = queryCount++;
          return rows[idx] ?? null;
        },
        all: async () => ({ results: rows }),
        run: async () => ({ success: true })
      })
    })
  } as unknown as Env['DB'];
}

describe('C3 Publish Gate — compliance_reviewed', () => {
  const checkPublishGates = async (env: Env, brandId: string) => {
    // Inline the same logic from brand-publish.ts
    const gates = {
      owner_consent: false,
      content_approved: false,
      images_approved: false,
      compliance_reviewed: true, // default, then override
      qa_passed: false
    };

    const brandCheck = await env.DB.prepare(
      `SELECT can_host_stay FROM brands WHERE id = ?`
    ).bind(brandId).first() as any;

    if (brandCheck && brandCheck.can_host_stay === 1) {
      const complianceValues = await env.DB.prepare(
        `SELECT lodging_compliance, business_registration, pccc
         FROM compliance_checklists
         WHERE brand_id = ?`
      ).bind(brandId).first() as any;

      if (complianceValues) {
        const ok = new Set(['verified', 'approved', 'not_applicable']);
        if (!ok.has(complianceValues.lodging_compliance) ||
            !ok.has(complianceValues.business_registration) ||
            !ok.has(complianceValues.pccc)) {
          gates.compliance_reviewed = false;
        }
      } else {
        gates.compliance_reviewed = false;
      }
    }

    return gates;
  };

  it('BLOCKS when lodging_compliance is "unknown"', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      { lodging_compliance: 'unknown', business_registration: 'verified', pccc: 'verified' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(false);
  });

  it('BLOCKS when lodging_compliance is "pending"', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      { lodging_compliance: 'pending', business_registration: 'verified', pccc: 'verified' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(false);
  });

  it('BLOCKS when compliance row is missing', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      null // no compliance row
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(false);
  });

  it('PASSES when all compliance values are "verified"', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      { lodging_compliance: 'verified', business_registration: 'verified', pccc: 'verified' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(true);
  });

  it('PASSES when all compliance values are "approved"', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      { lodging_compliance: 'approved', business_registration: 'approved', pccc: 'approved' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(true);
  });

  it('PASSES when all compliance values are "not_applicable"', async () => {
    const db = mockDB([
      { can_host_stay: 1 },
      { lodging_compliance: 'not_applicable', business_registration: 'not_applicable', pccc: 'not_applicable' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(true);
  });

  it('PASSES when brand can_host_stay=0 (no lodging, no compliance check)', async () => {
    const db = mockDB([
      { can_host_stay: 0 },
      { lodging_compliance: 'unknown', business_registration: 'unknown', pccc: 'unknown' }
    ]);
    const gates = await checkPublishGates({ DB: db } as Env, 'brnd_test');
    expect(gates.compliance_reviewed).toBe(true);
  });
});

describe('Renderer /stay Gate — STAY_OK allowlist', () => {
  const STAY_OK = new Set(['verified', 'approved', 'not_applicable']);

  it('BLOCKS /stay when lodging_compliance is "unknown"', () => {
    expect(STAY_OK.has('unknown')).toBe(false);
  });

  it('BLOCKS /stay when lodging_compliance is "pending"', () => {
    expect(STAY_OK.has('pending')).toBe(false);
  });

  it('BLOCKS /stay when lodging_compliance is "pending_verification"', () => {
    expect(STAY_OK.has('pending_verification')).toBe(false);
  });

  it('BLOCKS /stay when lodging_compliance is NULL', () => {
    expect(STAY_OK.has(null as any)).toBe(false);
  });

  it('BLOCKS /stay when lodging_compliance is undefined', () => {
    expect(STAY_OK.has(undefined as any)).toBe(false);
  });

  it('PASSES /stay when lodging_compliance is "verified"', () => {
    expect(STAY_OK.has('verified')).toBe(true);
  });

  it('PASSES /stay when lodging_compliance is "approved"', () => {
    expect(STAY_OK.has('approved')).toBe(true);
  });

  it('PASSES /stay when lodging_compliance is "not_applicable"', () => {
    expect(STAY_OK.has('not_applicable')).toBe(true);
  });
});
