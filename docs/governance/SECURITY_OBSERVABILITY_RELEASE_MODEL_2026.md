# Om Dalat — Security Baseline, Observability, and Release Model

**Date:** 2026-06-30
**Status:** DESIGN — implementation pending (Phases 6-7)
**Scope:** All `*.omdalat.com` products

---

## 1. Security Baseline (All Public Systems)

### 1.1 HTTP Security Headers

Every public response must include:

| Header | Value | Status |
|--------|-------|--------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.omdalat.com; frame-ancestors 'none'` | PENDING |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | PENDING |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | PENDING |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | PENDING |
| `X-Content-Type-Options` | `nosniff` | PENDING |
| `X-Frame-Options` | `DENY` (or via CSP frame-ancestors) | PENDING |

**Implementation:** Add a `securityHeaders()` helper to both Workers that wraps every Response.

### 1.2 Rate Limiting

| Endpoint type | Limit | Implementation |
|---------------|-------|----------------|
| Public read (GET) | 100 req/min per IP | Cloudflare WAF rate limit rule |
| Public write (POST intake, request-access) | 10 req/min per IP | Cloudflare WAF rate limit rule |
| Authenticated read | 200 req/min per user | Application-level (D1 counter) |
| Authenticated write | 30 req/min per user | Application-level (D1 counter) |
| Authenticated admin | 60 req/min per admin | Application-level (D1 counter) |
| Login attempt | 5 attempts per 15 min per IP | Application-level + Cloudflare |
| Data room access | 20 req/hour per buyer | Application-level |

**Implementation:** Cloudflare WAF rate limit rules for public endpoints. D1-based counter for authenticated endpoints (table: `rate_limit_counters` with `key, count, window_start`).

### 1.3 Input Validation

Every API endpoint must:
- Validate HTTP method (DONE — all handlers check method)
- Validate Content-Type (PENDING)
- Validate body schema (PENDING — currently ad-hoc)
- Sanitize string inputs (PENDING — no output encoding)
- Validate IDs against expected format (PARTIAL — auction ID format check DONE)
- Reject oversized payloads (PENDING — no max body size check)
- Validate file uploads (PENDING — no MIME check, no size check)

### 1.4 Output Encoding

All HTML rendered by Workers must:
- Escape user-provided content (PENDING — check each render function)
- Use `textContent` not `innerHTML` in client-side JS (PENDING)
- Set `Content-Type: text/html; charset=utf-8` (DONE)

### 1.5 Dependency Scanning

| Tool | Frequency | Status |
|------|-----------|--------|
| `npm audit` | Every CI run | PENDING (no CI yet) |
| Dependabot | Weekly | PENDING |
| Snyk | Weekly | PENDING |
| License check | Every CI run | PENDING |

### 1.6 Secret Scanning

| Tool | Frequency | Status |
|------|-----------|--------|
| `git-secrets` | Pre-commit hook | PENDING |
| GitHub secret scanning | Continuous | ENABLED (GitHub built-in) |
| TruffleHog | Monthly | PENDING |

---

## 2. Security Baseline (Sensitive Systems)

### 2.1 Brand/Market/Auction/Registry Additional Requirements

| Requirement | Status | Priority |
|-------------|--------|----------|
| Passkey/MFA for admin | PENDING | P1 |
| Dual approval for credential issuance | PENDING | P2 |
| Signed URLs for data room file access | PENDING | P1 |
| Malware scan for uploads | PENDING | P0 (before evidence/data room go-live) |
| Document watermarking | PENDING | P2 |
| Audit trail (every action) | PARTIAL — offers/evidence/transfer have audit, others don't | P1 |
| Provider webhook signature verification | PENDING (interface defined in KYC/escrow adapters) | P1 |
| Idempotency for write operations | PENDING | P1 |
| Replay protection for webhooks | PENDING | P1 |
| Reconciliation for escrow | PENDING | P2 |
| Fraud hold mechanism | PENDING | P2 |
| Legal hold on records | PENDING | P2 |
| Immutable bid/event record | PENDING (auction blocked, but must be built before activation) | P2 |

### 2.2 Upload Security Pipeline (CRITICAL — Phase 4)

Evidence and data room files must go through:

```
Upload request
→ Authenticate user (DONE)
→ Verify ownership of target package (PENDING)
→ Check file size limit (PENDING — 50MB max)
→ Quarantine in R2 (PENDING — separate prefix `quarantine/`)
→ MIME type validation (PENDING — check magic bytes, not extension)
→ Malware scan (PENDING — ClamAV or Cloudflare AV integration)
→ Metadata stripping if needed (PENDING — EXIF, GPS data)
→ Classification (PENDING — evidence_type, sensitivity level)
→ Approved storage (PENDING — move from `quarantine/` to `approved/`)
→ Signed access URL (PENDING — time-limited, IP-bound)
→ Audit event (PARTIAL — evidence submit logged, file access not logged)
```

**Current state:** `file_url` is a free-text string with NO validation. This is a P0 vulnerability for evidence/data room go-live.

---

## 3. Observability

### 3.1 Per-Request Metadata

Every request must include (in logs):

| Field | Source | Status |
|-------|--------|--------|
| `request_id` | Generate UUID per request | PENDING |
| `release_id` | From `BUILD_COMMIT_SHA` env var | DONE (via /version) |
| `product` | From route namespace | PENDING |
| `environment` | From `APP_ENV` env var | DONE |
| `user/session correlation` | From auth context | PENDING |
| `route` | From URL pathname | PENDING |
| `status` | From response | PENDING |
| `duration` | From request start/end | PENDING |
| `error_code` | From error response | PENDING |

**Implementation:** Add a `requestContext()` middleware that generates `request_id`, attaches it to response headers (`X-Request-ID`), and logs the request.

### 3.2 Central Dashboard

| Metric | Source | Alert threshold |
|--------|--------|-----------------|
| Uptime per subdomain | Cloudflare analytics | < 99.9% monthly |
| Error rate (5xx) | Cloudflare analytics + Worker logs | > 1% over 5 min |
| p95 latency | Cloudflare analytics | > 2000ms |
| Failed login attempts | Application log | > 50 per hour per IP |
| Failed auth (401) | Application log | > 100 per min |
| Upload failures | Application log | > 10 per hour |
| Data room denied (403) | Application log | > 20 per hour per buyer |
| Bid anomalies | Application log (when auction live) | Any anomaly |
| Escrow reconciliation failures | Application log | Any failure |
| Consent failures | Application log | > 10 per hour |
| Email failures | mail.iai.one API | > 5% bounce rate |
| Queue backlog | Cloudflare Queues | > 1000 messages |
| Release version mismatch | /version check vs git | Any mismatch |

### 3.3 Alert Ownership

Every alert must have:

| Field | Example |
|-------|---------|
| Severity | P0 / P1 / P2 / P3 |
| Owner | Tran Ha Tam (founder) |
| Escalation | DevOps → Founder → Legal (for P3) |
| Response SLA | P0: 15 min, P1: 1 hour, P2: 4 hours, P3: 24 hours |
| Runbook | Link to specific runbook page |

### 3.4 Log Retention

| Log type | Retention | Storage |
|----------|-----------|---------|
| Application logs | 90 days | Cloudflare Workers Logs |
| Audit events | 7 years (legal requirement) | D1 `asset_audit_events` table |
| Access logs | 90 days | Cloudflare analytics |
| Consent records | Lifetime of account + 3 years | D1 `consent_registry` table |
| Bid records | Lifetime of platform + 7 years | D1 `auction_bids` table (immutable) |

---

## 4. Release Model

### 4.1 Release Pipeline

```
Approved commit on main
→ CI build (GitHub Actions)
  → Install dependencies
  → Run tests (vitest)
  → Run lint
  → Run type check
  → Build Workers
→ Immutable artifact (upload to Cloudflare Workers)
→ Staging deploy (separate Worker: *-staging)
→ Smoke test on staging
→ Release approval (two-person: founder + devops)
→ Production deploy (via scripts/deploy-with-sha.sh)
→ Version verification (GET /version matches git SHA)
→ Post-deploy smoke test
→ Monitoring (watch dashboards for 30 min)
→ Rollback if failed (documented + rehearsed)
```

### 4.2 Per-Release Record

Each release must record:

| Field | Example |
|-------|---------|
| Full SHA | `9f41b9ba91febed9e73f9419e91113bf952b4f3a` |
| Release ID | `rel_2026-06-30_001` |
| Artifact digest | Worker etag from Cloudflare API |
| Deployment ID | Cloudflare Worker Version ID |
| Environment | `production` |
| Migration version | Latest migration filename |
| Feature flags | `AUCTION_LIVE_ENABLED: false` |
| Approver | `Tran Ha Tam` |
| Rollback target | Previous Worker Version ID |
| Known limitations | `KYC stub, escrow stub, auction blocked` |

### 4.3 Release Train

- Each product releases independently (no forced simultaneous release)
- API and renderer for the same product CAN release together (coordinated)
- Before release, check:
  - Shared links (do other products reference this product's URLs?)
  - Consent transfer (does this release change consent flow?)
  - API compatibility (does this release break callers?)
  - Schema compatibility (does this migration break other products reading same DB?)
  - Navigation (does this release change navigation structure?)

### 4.4 Current Release State

| Aspect | Status |
|--------|--------|
| CI/CD pipeline | PENDING (no GitHub Actions for Workers yet) |
| Immutable artifacts | PARTIAL (Cloudflare Workers versions are immutable, but no artifact registry) |
| Staging environment | PENDING (no staging Workers) |
| Release approval workflow | INFORMAL (founder approves verbally) |
| /version verification | DONE (deploy-with-sha.sh) |
| Post-deploy smoke test | MANUAL (curl probes) |
| Rollback | DOCUMENTED + REHEARSED |
| Release record | INFORMAL (git commit message) |

### 4.5 Pre-Commit Hooks

| Hook | Status |
|------|--------|
| `git-secrets` (secret scanning) | PENDING |
| `lint-staged` (run lint on staged files) | PENDING |
| Type check on staged files | PENDING |
| Test on staged files (affected only) | PENDING |

---

## 5. Implementation Priority

| Phase | Task | Priority |
|-------|------|----------|
| Phase 2 | Add security headers to all responses | P1 |
| Phase 2 | Add rate limiting (Cloudflare WAF rules) | P1 |
| Phase 4 | Upload security pipeline (MIME, malware scan, quarantine) | P0 (before evidence go-live) |
| Phase 6 | Add request_id to all responses + logs | P1 |
| Phase 6 | Build central dashboard (Cloudflare analytics + custom) | P2 |
| Phase 6 | Define alert rules + runbooks | P2 |
| Phase 7 | Set up CI/CD pipeline (GitHub Actions) | P1 |
| Phase 7 | Create staging environment | P2 |
| Phase 7 | Formalize release approval workflow | P2 |
| Phase 7 | Add pre-commit hooks | P2 |
| Phase 7 | Add passkey/MFA for admin | P1 |
| Phase 7 | Add CSRF protection | P1 |
| Phase 7 | Move to per-subdomain cookies | P1 |
