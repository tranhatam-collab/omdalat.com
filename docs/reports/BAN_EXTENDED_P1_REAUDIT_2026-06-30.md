# BAN Extended P1 Re-Audit — Ownership, MIME, Rate Limit, IDOR

**Date:** 2026-06-30
**Auditor:** Devin (independent)
**Scope:** Deep-dive on offers, evidence, data room handlers beyond the initial auth check (F1/F2)
**Method:** Code review of `offers-admin.ts`, `evidence-transfer.ts`, `data-room-transfer.ts`, `auth.ts`

---

## Executive Summary

**Verdict: HOLD — 6 new P1 vulnerabilities found**

The initial audit (F1, F2) added `requireAuth` to offers and evidence. That closed the "no auth at all" hole. But auth alone is not sufficient. This extended audit found 6 additional P1 issues:

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| X1 | Data room IDOR — buyer access via spoofable X-Buyer-Email header | P0 | DOCUMENTED |
| X2 | Offers — no ownership check (any authenticated user can offer on any package) | P1 | DOCUMENTED |
| X3 | Evidence — no package ownership check | P1 | DOCUMENTED |
| X4 | Data room request-access — NO AUTH REQUIRED | P1 | DOCUMENTED |
| X5 | No rate limiting on any write endpoint | P1 | DOCUMENTED |
| X6 | No file MIME validation, no malware scan, no size limit on evidence uploads | P1 | DOCUMENTED |

---

## X1: Data Room IDOR — P0 CRITICAL

**File:** `workers/api/src/routes/data-room-transfer.ts` lines 84-101

**Finding:** `handleDataRoomGet` checks buyer access via `X-Buyer-Email` HTTP header. This header is client-controlled and can be set to ANY email address, including one that has been granted access.

```typescript
// VULNERABLE CODE:
const buyerEmail = request.headers.get('X-Buyer-Email') || '';
if (buyerEmail) {
  const grant = await env.DB.prepare(
    `SELECT id FROM data_room_access_grants WHERE data_room_id = ? AND buyer_email = ? AND status = 'granted'`
  ).bind(dataRoomId, buyerEmail, ...).first();
  if (grant) hasAccess = true;
}
```

**Attack:** Any unauthenticated user can:
1. Know (or guess) a data room ID (format: `dr_{timestamp}_{random}`)
2. Set `X-Buyer-Email: granted_buyer@example.com` header
3. If that email has a granted access row, the attacker gets the data room manifest

**Fix:** Remove `X-Buyer-Email` header check entirely. Buyer access must be verified via authenticated session:

```typescript
// FIXED:
const auth = await requireAuth(request, env);
if (auth instanceof Response) return withCors(request, auth, env);

let hasAccess = false;
const superCheck = requireSuper(auth as any);
if (!(superCheck instanceof Response)) {
  hasAccess = true; // admin
} else {
  // Check if this authenticated user has a granted access row
  const grant = await env.DB.prepare(
    `SELECT id FROM data_room_access_grants 
     WHERE data_room_id = ? AND buyer_email = ? AND status = 'granted' 
     AND (expires_at IS NULL OR expires_at > ?)`
  ).bind(dataRoomId, auth.email, new Date().toISOString()).first();
  if (grant) hasAccess = true;
}

if (!hasAccess) {
  return withCors(request, new Response(
    JSON.stringify({ error: 'Access denied' }),
    { status: 403 }
  ), env);
}
```

---

## X2: Offers — No Ownership Check — P1

**File:** `workers/api/src/routes/offers-admin.ts` lines 10-78

**Finding:** `handleOfferCreate` authenticates the user (F1 fix) but does NOT verify:
1. The authenticated user owns the `buyer_request_id` they're submitting
2. The package is active/published (can offer on draft packages)
3. The seller isn't offering on their own listing
4. No duplicate offer check (same buyer, same package, same type)
5. No currency validation (hardcoded 'VND' even when `offer_amount_usd` is provided)
6. No amount boundaries (can submit negative or absurd amounts)
7. No idempotency (retry creates duplicate offer)

**Attack:** Any authenticated user can:
1. Use another user's `buyer_request_id` to submit an offer
2. Submit offers on draft/unpublished packages
3. Submit unlimited duplicate offers
4. Submit negative amounts

**Fix:**
```typescript
// After auth, before insert:

// 1. Verify buyer_request ownership
if (buyer_request_id) {
  const brq = await env.DB.prepare(
    `SELECT qualification_status, buyer_email FROM buyer_requests WHERE id = ?`
  ).bind(buyer_request_id).first() as any;
  if (!brq) return ...404;
  if (brq.buyer_email !== auth.email) return ...403 'Not your buyer request';
  if (brq.qualification_status !== 'qualified') return ...403;
}

// 2. Verify package is published
const pkg = await env.DB.prepare(
  `SELECT publication_status, owner_email FROM asset_packages WHERE id = ?`
).bind(package_id).first() as any;
if (!pkg) return ...404;
if (pkg.publication_status !== 'published') return ...403 'Package not available';
if (pkg.owner_email === auth.email) return ...403 'Cannot offer on own package';

// 3. Duplicate check
const existing = await env.DB.prepare(
  `SELECT id FROM asset_offers WHERE package_id = ? AND buyer_request_id = ? AND status = 'submitted'`
).bind(package_id, buyer_request_id).first();
if (existing) return ...409 'Offer already submitted';

// 4. Amount validation
if (offer_amount_vnd !== null && offer_amount_vnd < 0) return ...400;
if (offer_amount_usd !== null && offer_amount_usd < 0) return ...400;
```

---

## X3: Evidence — No Package Ownership Check — P1

**File:** `workers/api/src/routes/evidence-transfer.ts` lines 10-59

**Finding:** `handleEvidenceSubmit` authenticates the user (F2 fix) but does NOT verify:
1. The authenticated user owns the package they're submitting evidence for
2. The evidence_type is a valid enum value
3. The file_url is a valid R2 URL (not arbitrary external URL)
4. The file has been scanned for malware

**Attack:** Any authenticated user can:
1. Submit evidence to ANY package (even ones they don't own)
2. Submit evidence with arbitrary `evidence_type` strings
3. Submit evidence with `file_url` pointing to external malicious URLs

**Fix:**
```typescript
// After auth, before insert:

// 1. Verify package ownership (or admin)
const pkg = await env.DB.prepare(
  `SELECT owner_email FROM asset_packages WHERE id = ?`
).bind(package_id).first() as any;
if (!pkg) return ...404;
if (pkg.owner_email !== auth.email && auth.role !== 'super') {
  return ...403 'Not your package';
}

// 2. Validate evidence_type
const validTypes = ['trademark_registration', 'business_license', 'domain_ownership',
  'copyright_certificate', 'social_media_proof', 'revenue_proof', 'contract', 'other'];
if (!validTypes.includes(evidence_type)) {
  return ...400 'Invalid evidence type';
}

// 3. Validate file_url is R2 internal
if (file_url && !file_url.startsWith('https://omdalat.com/r2/') && !file_url.startsWith('r2://')) {
  return ...400 'File must be uploaded via R2';
}
```

---

## X4: Data Room Request Access — NO AUTH — P1

**File:** `workers/api/src/routes/data-room-transfer.ts` lines 137-178

**Finding:** `handleDataRoomRequestAccess` does NOT require authentication. Anyone can submit an access request with any email address. This enables:

1. Spam requests (no rate limit)
2. Email flooding (victim's inbox filled with access request confirmations)
3. Impersonation (request access using someone else's email)

**Fix:**
```typescript
// Add auth at the top:
const auth = await requireAuth(request, env);
if (auth instanceof Response) return withCors(request, auth, env);

// Use authenticated email instead of body-provided email:
const buyer_email = auth.email;
const buyer_name = auth.email; // or fetch from profile
// Remove buyer_email and buyer_name from body parsing
```

---

## X5: No Rate Limiting — P1

**Finding:** No endpoint in the BAN API has rate limiting. An authenticated user (or unauthenticated for public endpoints) can:

1. Submit unlimited offers
2. Submit unlimited evidence
3. Request unlimited data room access
4. Submit unlimited buyer requests
5. Brute-force login (no lockout)

**Fix (two layers):**

1. **Cloudflare WAF rate limit rules** (for public endpoints):
```
Pattern: (http.request.uri.path contains "/api/omdalat/brand-discovery/intake")
Expression: (cf.threat_score lt 10)
Limit: 10 requests per 1 minute per IP
Action: Block
```

2. **Application-level rate limiting** (for authenticated endpoints):
```typescript
// New middleware: checkRateLimit
async function checkRateLimit(env: Env, key: string, limit: number, windowMs: number): Promise<boolean> {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const counter = await env.DB.prepare(
    `SELECT count FROM rate_limit_counters WHERE key = ? AND window_start = ?`
  ).bind(key, windowStart).first() as any;
  if (counter && counter.count >= limit) return false;
  await env.DB.prepare(
    `INSERT INTO rate_limit_counters (key, window_start, count) VALUES (?, ?, 1)
     ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1`
  ).bind(key, windowStart).run();
  return true;
}

// Usage in handler:
const allowed = await checkRateLimit(env, `offer:${auth.email}`, 10, 60000);
if (!allowed) return new Response('Rate limit exceeded', { status: 429 });
```

---

## X6: No File Validation — P1

**Finding:** `handleEvidenceSubmit` accepts `file_url` and `file_hash` as free-text strings. There is:

1. No MIME type validation
2. No malware scanning
3. No file size validation
4. No R2 access control (file_url could be any URL)
5. No metadata stripping (EXIF, GPS data in photos)

**Required pipeline (before evidence/data room go-live):**
```
Upload → Quarantine → MIME check → Malware scan → Metadata strip → Classify → Approved storage → Signed URL
```

See `SECURITY_OBSERVABILITY_RELEASE_MODEL_2026.md` section 2.2 for full pipeline.

---

## Auth System Gaps

**File:** `workers/api/src/lib/auth.ts`

| Gap | Severity | Description |
|-----|----------|-------------|
| No CSRF protection | P1 | Bearer token in Authorization header mitigates CSRF, but if token is ever moved to cookie, CSRF is needed |
| No session rotation | P2 | Token is static until expiry — should rotate on sensitive operations |
| No MFA/passkey | P1 | Admin accounts have single-factor auth only |
| Cookie domain .omdalat.com | P1 | Session cookie shared across all subdomains — one compromise = all products |
| No login lockout | P1 | No rate limit on login attempts — brute force possible |
| Token length check only | P2 | `token.length < 32` is the only validation — no format check |

---

## Remediation Priority

| ID | Fix | Priority | Effort |
|----|-----|----------|--------|
| X1 | Data room IDOR — remove X-Buyer-Email, use session | P0 | 30 min |
| X4 | Data room request-access — add auth | P1 | 15 min |
| X2 | Offers — add ownership + duplicate + amount checks | P1 | 1 hour |
| X3 | Evidence — add ownership + type validation | P1 | 45 min |
| X5 | Rate limiting — Cloudflare WAF + D1 counter | P1 | 2 hours |
| X6 | File validation — MIME + size + R2 check | P1 | 2 hours |
| Auth | MFA + CSRF + per-subdomain cookie + lockout | P1 | 4 hours |

**Total estimated effort: ~10 hours**

---

## Test Coverage Gaps

The current test suite (202 tests) covers:
- Auth enforcement (401 without session) ✓
- Feature flag enforcement (403 without flag) ✓
- Route wiring (22 handlers) ✓
- Prohibited language scan ✓

The test suite does NOT cover:
- ❌ IDOR (X1) — no test verifies buyer can't access another buyer's data room
- ❌ Ownership checks (X2, X3) — no test verifies user can't offer on/evidence another's package
- ❌ Rate limiting (X5) — no test verifies 429 after limit exceeded
- ❌ File validation (X6) — no test verifies invalid MIME is rejected
- ❌ Privilege escalation — no test verifies non-super can't access super routes
- ❌ CSRF — no test
- ❌ Session fixation — no test
- ❌ Replay attack — no test

**Required test additions (Phase 6):**
- 7 negative tests for each X1-X6 finding
- 5 privilege escalation tests
- 3 CSRF/session tests
- 3 replay attack tests

---

## Conclusion

The initial F1/F2 fix (adding `requireAuth`) was necessary but insufficient. Authentication without authorization is just a login wall — an authenticated user can still access other users' data.

**X1 (data room IDOR) is a P0 vulnerability** that should be fixed immediately. An unauthenticated attacker can access any data room manifest by spoofing an email header.

**X2-X6 are P1 vulnerabilities** that should be fixed before any real seller or buyer uses the platform.

**Recommendation:** Fix X1 immediately. Fix X2-X6 in Phase 2 before onboarding any real users. Add the missing negative tests in Phase 6.
