# Om Dalat Go-Live Report — 2026-06-22

## Summary

All 20 items from the comprehensive audit (`OMDALAT_FULL_AUDIT_2026-06-20.md`) have been addressed. 18 items are fully closed per AGENTS.md standards (code merged + tests pass + prod == repo + artifact preserved). 2 items are blocked on manual user action.

**Commit:** `6357232` on `main` branch
**Deploy:** omdalat-web Pages + omdalat-brand-renderer Worker

---

## Test Results (per AGENTS.md evidence standard)

| Test Suite | Count | Status |
|------------|-------|--------|
| CI Guard (SQL bypass) | 12 files scanned | PASS |
| vitest (workers/api) | 82 tests | PASS |
| e2e (registration next-param) | 6 tests | PASS |
| **Total** | **88 tests** | **ALL PASS** |

---

## Live Verification (2026-06-22 02:33 UTC)

| URL | Expected | Actual | Status |
|-----|----------|--------|--------|
| `omdalat.com` | 308 → /vi | 308 → /vi | ✅ |
| `lily.omdalat.com` | 200 | 200 | ✅ |
| `brand.omdalat.com` | 200 | 200 | ✅ |
| `brand.omdalat.com/lily` | 301 → lily.omdalat.com | 301 → lily.omdalat.com | ✅ |
| `omdalat.com/vi/join` | register link with next param | `href="/vi/member/register?next=/member/welcome"` | ✅ |
| `omdalat.com/vi/member` (guest) | 307 → login?next=/member | 307 → login?next=%2Fmember | ✅ |
| `omdalat.com/vi/member/resources` (guest) | 307 → login?next=/member/resources | 307 → login?next=%2Fmember%2Fresources | ✅ |

---

## Items Completed

### P0 — Critical (Compliance Bypass)

| ID | Item | Evidence |
|----|------|----------|
| P0-1 | Fix seed_lily.sql: verified→unknown, published→private_preview | `seed_lily.sql` modified, CI guard passes |
| P0-2 | Fix 0010 migration: remove UPDATE verified/published | `0010_lily_compliance_evidence.sql` modified, CI guard passes |
| P0-3 | CI guard script for SQL bypass detection | `scripts/guard-sql-compliance-bypass.mjs` + CI workflow job |

### P1 — High (Bugs & Tests)

| ID | Item | Evidence |
|----|------|----------|
| P1-4 | Fix brand.omdalat.com/lily routing | 301 redirect verified live |
| P1-5 | Wire overclaim validator to hardcoded content | 10 hardcoded samples tested in overclaim-validator.test.ts |
| P1-6 | Overclaim validator test | 33 tests PASS |
| P1-7 | Auth rejection test (401/403) | 24 tests in auth-cors-slug.test.ts PASS |
| P1-8 | ?slug override 403 test | Included in auth-cors-slug.test.ts |
| P1-9 | CORS preflight test | Included in auth-cors-slug.test.ts |

### P2 — Medium (Content & Features)

| ID | Item | Evidence |
|----|------|----------|
| P2-11 | vuonhong3.omdalat.com DNS CNAME | ⚠️ BLOCKED — MCP token read-only, needs manual Cloudflare dashboard action |
| P2-12 | Replace 'homestay' in renderer | 4 generic uses replaced with 'nơi lưu trú'/'stay space'; 6 Lily-context uses retained (legitimate "not a homestay") |
| P2-13 | Add GET /brands, DELETE /brands/:id | `brand-list.ts`, `brand-delete.ts` created, registered in index.ts |
| P2-14 | 5 editorial articles | stories.json: 15→20 articles |
| P2-15 | Work profile JSON files | `work-profiles.json` with 3 profiles created |

### P3 — Low (Cleanup)

| ID | Item | Evidence |
|----|------|----------|
| P3-16 | Correction notices on old plans | 4 docs updated with CORRECTION NOTICE header |
| P3-17 | Remove console.log from renderer | 1 console.log removed from brand-site.ts |
| P3-18 | Update TRUE_STATE_AUDIT | Correction notice added |

### Infrastructure

| ID | Item | Status |
|----|------|--------|
| INFRA-19 | GitHub Actions CLOUDFLARE_API_TOKEN secret | ⚠️ BLOCKED — `gh` CLI not authenticated, needs manual secret setup |

### Registration Fixes (commit 02c93c2)

| ID | Item | Evidence |
|----|------|----------|
| REG-10 | 4 e2e tests for registration next-param fixes | 6 e2e tests PASS (vi + en variants) |

---

## Blocked Items (require user action)

### P2-11: vuonhong3.omdalat.com DNS CNAME

**Action needed:** Add CNAME record in Cloudflare dashboard:
- Type: CNAME
- Name: `vuonhong3.omdalat.com`
- Target: `omdalat.com`
- Proxied: Yes (orange cloud)

The brand-renderer Worker already has `vuonhong3.omdalat.com/*` in its routes, so once DNS is added, the subdomain will work.

### INFRA-19: GitHub Actions CLOUDFLARE_API_TOKEN

**Action needed:** Add repository secrets in GitHub:
1. `CLOUDFLARE_API_TOKEN` — API token with Pages edit permission
2. `CLOUDFLARE_ACCOUNT_ID` — `f3f9e76222dcb488d5e303e29e8ba192`

Run: `gh secret set CLOUDFLARE_API_TOKEN` and `gh secret set CLOUDFLARE_ACCOUNT_ID`

---

## Files Changed (commit 6357232)

- 24 files changed, 3057 insertions(+), 47 deletions(-)
- New files: 14 (tests, routes, guard script, work-profiles, e2e spec, audit docs)
- Modified files: 10 (renderer, index.ts, migrations, CI workflow, stories.json, old docs)

---

## Deployment Artifacts

- **Web (Pages):** `omdalat-web-ezk.pages.dev` → `omdalat.com`
- **Brand Renderer (Worker):** `omdalat-brand-renderer` → `lily.omdalat.com`, `brand.omdalat.com`, `vuonhong3.omdalat.com`
- **Version ID:** `15d2dfff-f2af-4002-a629-77e747c68ffe`

---

## Compliance Status

Per AGENTS.md rules, all compliance fields in seed/migration files are now `unknown` or `pending`. No SQL file sets `verified` or `published` directly. The CI guard script enforces this on every PR.

The compliance route (`POST /api/omdalat/brands/:id/compliance`) remains the ONLY way to set compliance fields, with evidence_map, reason, and super admin auth requirements.

---

## Verdict

**GO-LIVE READY** with 2 manual action items pending (DNS CNAME + GitHub secret).

All automated gates are closed. All tests pass. Production matches repository state.
