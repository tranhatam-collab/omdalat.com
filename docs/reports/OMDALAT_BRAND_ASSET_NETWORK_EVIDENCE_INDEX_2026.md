# OMDALAT BRAND ASSET NETWORK — EVIDENCE INDEX 2026

**Audit date:** 2026-06-30
**Commit:** 42accef961c9cd67bd19594d9541f13f69fd2a4c

---

## 1. Repository Evidence

| Item | Value | Source |
|------|-------|--------|
| repository_full_name | tranhatam-collab/omdalat.com | `git remote -v` |
| default_branch | main | `git branch --show-current` |
| HEAD_full_SHA | 42accef961c9cd67bd19594d9541f13f69fd2a4c | `git rev-parse HEAD` |
| remote_url | git@github.com:tranhatam-collab/omdalat.com.git | `git remote -v` |
| working_tree_status | clean (6 untracked static-pages dirs) | `git status --short` |
| submodules | none | `git submodule status` |

---

## 2. Commit Evidence (7 commits verified)

| Short | Full SHA | Message |
|-------|----------|---------|
| 4718528 | 471852872f229aace0d2d6e708480582379935ef | feat: P0 remaining + P1 + P2 schema |
| 57b247d | 57b247d3550c02192c6d450f8d61787e3b918805 | feat: P2 data model + 11 API + 3 UI + QA |
| d046c26 | d046c2619479c46a1d6b04abb26dbfcb38865fe5 | docs: execution lock 79% |
| 418487e | 418487ed0750eef7423253f1a31d898c0302943a | feat: P3 auction API + 7 UI |
| bdcb3d3 | bdcb3d3391f332a06a507436e5dadeaaa995cca3 | docs: execution lock 90% |
| 79d29cb | 79d29cb994df3dbdb6ea97e8908800288fbc449a | feat: all 21 UI screens |
| 42accef | 42accef961c9cd67bd19594d9541f13f69fd2a4c | docs: execution lock 92.5% |

**Command:** `git rev-parse <short-sha>` for each
**Result:** All 7 FOUND on branch `main`

---

## 3. Test Evidence

| Item | Value |
|------|-------|
| Command | `npx vitest run --reporter=verbose` |
| Working dir | `workers/api/` |
| Start | 07:50:10 |
| Duration | 2.21s |
| Exit code | 0 |
| Test files | 6 passed (6) |
| Tests | 169 passed (169) |
| Failed | 0 |
| Skipped | 0 |
| Coverage | not configured |

### Test file inventory

| File | describe | it (static) |
|------|----------|-------------|
| tests/asset-network-gates.test.ts | 10 | 42 |
| tests/asset-network-p1-p2.test.ts | 15 | 36 |
| tests/auth-cors-slug.test.ts | 5 | 25 |
| tests/compliance-update.test.ts | 2 | 11 |
| tests/gate-compliance.test.ts | 3 | 16 |
| tests/overclaim-validator.test.ts | 6 | 25 |
| **Total** | **41** | **155** (169 with dynamic) |

---

## 4. Database Evidence

| Item | Value |
|------|-------|
| D1 database name | omdalat-core |
| D1 database UUID | eab4c371-fa07-4035-b711-315121f92d4a |
| Production tables (excl d1_migrations) | 89 |
| BAN-specific tables (migrations 0011-0015) | 50 |
| Migrations applied | 15 + 2 seeds |

**Command:** `npx wrangler d1 execute omdalat-core --remote --command "SELECT COUNT(*) as total_tables FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' AND name NOT LIKE 'd1_migrations'" --env production`
**Result:** `total_tables: 89`

---

## 5. API Evidence

| Item | Value |
|------|-------|
| BAN-specific endpoints registered | 44 |
| Source file | `workers/api/src/index.ts` |
| Command | `grep -E "router\.(get|post|put|patch|delete)\(" src/index.ts` |

---

## 6. UI Evidence

| Item | Value |
|------|-------|
| UI handlers exported | 22 |
| All wired in index.ts | YES |
| Source file | `workers/brand-renderer/src/routes/asset-network.ts` |
| Router file | `workers/brand-renderer/src/index.ts` |
| Command | `grep "export async function handle" workers/brand-renderer/src/routes/asset-network.ts` |

---

## 7. Deployment Evidence

### Worker: omdalat-platforms-api

| Item | Value |
|------|-------|
| Deployment ID | 242918cd-b725-44e5-83c0-78d1905ee13d |
| Deployed at | 2026-06-29T17:30:08.219Z |
| Route | api.omdalat.com |
| Command | `npx wrangler deployments list --env production` |

### Worker: omdalat-brand-renderer

| Item | Value |
|------|-------|
| Deployment ID | 5356173a-028a-4adb-8a5c-0db787625c36 |
| Deployed at | 2026-06-29T17:39:24.024Z |
| Routes | brand.omdalat.com, registry.omdalat.com/*, market.omdalat.com/*, auction.omdalat.com/* |
| Command | `npx wrangler deployments list --env production` |

---

## 8. Live Smoke Evidence (22 surfaces)

All 22 surfaces tested with `curl -s -o /tmp/smoke.html -w "%{http_code}" -L <url>`.
All returned HTTP 200 with unique titles and canonical tags.
See FINAL_QA_AUDIT §8 for full table.

---

## 9. Auction Feature Flag Evidence

| Item | Value |
|------|-------|
| Flag name | AUCTION_LIVE_ENABLED |
| Default value | undefined (treated as false) |
| In wrangler config | NO |
| Server-side check | YES — `isAuctionLive(env)` in all 5 handlers |
| Live test: GET /auctions/:id | 403 with `{"status":"legal_readiness"}` |
| Source | `workers/api/src/routes/auction.ts:22-24` |

---

## 10. Security Evidence

| Check | Result |
|-------|--------|
| Auth on 8 protected endpoints | 8/8 return 401 |
| Auth on POST /offers | **FAIL — returns 400 (no auth check)** |
| Auth on POST /evidence | **FAIL — returns 400 (no auth check)** |
| Auction API bypass | NOT POSSIBLE (auth + flag) |
| Secrets in commits | NOT FOUND (vars are config, secrets via wrangler) |
| CORS | Configured to omdalat.com subdomains only |
