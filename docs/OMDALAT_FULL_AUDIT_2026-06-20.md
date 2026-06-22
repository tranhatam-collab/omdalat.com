# OMDALAT.COM FULL AUDIT
**Date**: 2026-06-20
**Auditor**: Devin (QA mode, ground-truth verification)
**Method**: Read code, run tests, curl live endpoints, check git state. No claims from reports.

---

## 0. EXECUTIVE SUMMARY

| Area | Status | Detail |
|------|--------|--------|
| Git | CLEAN | main branch, HEAD e0d3a3e, no uncommitted changes |
| Build | PASS | tsc --noEmit exits 0 |
| Tests | 25/25 PASS | vitest run, 2 files, real assertions |
| API | LIVE | api.omdalat.com responds 200 on brand preview |
| Lily subdomain | LIVE | lily.omdalat.com responds 200, renders Lily page |
| Brand renderer /lily | BUG | brand.omdalat.com/lily renders homepage, not Lily page |
| Vuonhong3 subdomain | DOWN | DNS not resolving |
| AP editorial | LIVE | ap.omdalat.com responds 200 |
| Compliance bypass | CONFIRMED | seed_lily.sql hardcodes verified + published, bypasses audited route |
| Overclaim validator | EXISTS but NOT WIRED to renderer | Hardcoded articles bypass it |
| Frontend web | 38 pages exist | Far more than old "2/10" claim |
| Frontend app | 22 pages exist | Far more than old "4/10" claim |
| Editorial content | 2 place profiles, 0 articles | CMS JSON exists but no article files |

---

## 1. GIT STATE

| Item | Value |
|------|-------|
| Branch | main |
| HEAD | e0d3a3e858e30de7264733bede85bcd8cd4ab417 |
| Last commit | "fix(qa): complete P0+P1+P2 — sitemap, schema, DB-driven portal, form E2E" |
| Working tree | CLEAN (only untracked: bien_tap_sach, 2 docs from yesterday) |
| Commits visible | 5 recent: e0d3a3e, dd8927b, 3d012bd, 427e05c, 9cb1ca3 |

**Verdict**: Git is healthy. No corruption. No stale locks.

---

## 2. DATABASE SCHEMA (Migrations)

### Migration files
| File | Description | Status |
|------|-------------|--------|
| 0001_init_payment_schema.sql | Payment tables | EXISTS |
| 0002_brand_factory.sql | brands, owners, places | EXISTS |
| 0003_brand_content.sql | content_blocks | EXISTS |
| 0004_brand_compliance.sql | compliance_checklists | EXISTS |
| 0005_brand_workflow.sql | approvals, agent_runs, inquiries | EXISTS |
| 0006_media_assets.sql | media_assets | EXISTS |
| 0007_business_lines.sql | business_lines | EXISTS |
| 0008_brand_admins.sql | brand_admins, admin_sessions | EXISTS |
| 0009_lily_v2_schema.sql | Lily operational tables (rooms, stays, tasks, etc.) | EXISTS |
| 0010_lily_compliance_evidence.sql | compliance_evidence + brand_approvals + evidence rows | EXISTS |

### Tables created: 38 total
Core: users, payment_sessions, payment_orders, payment_webhooks, subscriptions
Brand: brands, owners, places, brand_intakes, content_blocks, products, experiences
Compliance: compliance_checklists, compliance_evidence, brand_approvals
Workflow: approvals, agent_runs, inquiries, release_reports, audit_logs
Media: media_assets
Business: business_lines
Admin: brand_admins, admin_sessions
Lily V2: lily_properties, lily_rooms, lily_room_blocks, lily_room_offers, lily_stays, lily_stay_plans, lily_programmes, lily_projects, lily_tasks, lily_task_assignments, lily_applications, lily_enrolments, lily_incidents, lily_visa_work_cases

**Verdict**: Schema is comprehensive. 38 tables across 10 migrations. No missing migration 0008 (it exists, contrary to old audit claims).

---

## 3. COMPLIANCE BYPASS (Critical Finding)

### What the code says

**seed_lily.sql (line 39-40)**:
```sql
INSERT INTO compliance_checklists ... VALUES ('cmp_lily', 'brnd_lily', 'verified', 'verified', 'not_applicable', 'verified', 'not_applicable', ...);
```

**seed_lily.sql (line 33)**:
```sql
... 'published' ...
```

**0010_lily_compliance_evidence.sql (line 67-73)**:
```sql
UPDATE compliance_checklists SET business_registration = 'verified', lodging_compliance = 'verified', pccc = 'verified' WHERE brand_id = 'brnd_lily';
```

**0010 (line 82-87)**:
```sql
UPDATE brands SET publication_status = 'published' WHERE id = 'brnd_lily';
```

### What AGENTS.md says
- "Compliance fields MUST NOT be updated manually"
- Must use POST /api/omdalat/brands/:id/compliance with evidence_map
- Must write audit trail to lily_audit_events + brand_approvals + audit_logs
- Requires super admin auth

### What the audited route does (compliance-update.ts)
- Requires auth (requireAuth + requireSuper)
- Requires evidence_map with evidence_id references
- Requires reason (min 20 chars)
- Validates evidence_id exists in compliance_evidence table
- Validates evidence_id belongs to correct brand
- Writes audit trail

### The bypass
1. seed_lily.sql directly INSERTs `verified` into compliance_checklists — bypasses the route.
2. 0010 directly UPDATEs `verified` — bypasses the route.
3. 0010 INSERTs evidence rows — but these were inserted by `devin_audit`, not by the owner, and not through the route.
4. 0010 INSERTs a brand_approvals row — but this is a direct SQL insert, not a route call.
5. No lily_audit_events entry is created by either seed or 0010.

### Evidence rows in 0010
| evidence_type | reference_number | issuing_authority | verified_by |
|---------------|-----------------|-------------------|-------------|
| business_registration | 42C8002522 | Phong Tai chinh - Ke hoach huyen Lac Duong | devin_audit |
| pccc | BBKT-17022022 | Phong Canh sat PCCC&CNCH | devin_audit |
| pccc | HS-TD-2022 | Cong an tinh Lam Dong | devin_audit |
| security_license | 62/GCN | Cong an huyen Lac Duong | devin_audit |

### Comparison: Vuonhong3 (honest state)
```sql
VALUES ('cmp_vuonhong3', 'brnd_vuonhong3', 'unknown', 'unknown', 'not_applicable', 'unknown', 'not_applicable', ...);
publication_status = 'private_preview'
```
Vuonhong3 is in the correct honest state: unknown compliance, private_preview, no evidence rows.

### Verdict
**CRITICAL BYPASS.** Lily compliance is hardcoded to `verified` + `published` in seed and migration files, bypassing the audited route that was specifically built to prevent this. The evidence rows exist but were inserted by `devin_audit`, not by the owner through the route. This violates AGENTS.md.

### Fix required
1. Change seed_lily.sql: compliance values to `unknown` or `pending`, publication_status to `private_preview`.
2. Change 0010: Remove the UPDATE statements that set `verified` and `published`. Keep the evidence rows and brand_approvals row as reference, but do not set compliance values via direct SQL.
3. If evidence is real, Founder must submit it through the compliance-update route with super admin auth.
4. Add CI guard: reject any SQL file that sets compliance to `verified`/`approved` without corresponding evidence row in the same file.

---

## 4. API ROUTES

### Registered routes (14 total)
| Route | File | Auth | Status |
|-------|------|------|--------|
| GET /health | health.ts | None | OK |
| POST /api/pay/checkout-session | payment-checkout-session.ts | None | OK |
| POST /api/pay/webhook | payment-webhook.ts | Webhook secret | OK |
| GET /api/payments/providers | payment-providers.ts | None | OK |
| GET /api/lily/public | lily-public.ts | None | OK |
| GET /api/lily/stay-plans | lily-public.ts | None | OK |
| POST /api/lily/applications | lily-public.ts | None | OK |
| POST /api/omdalat/brand-intake | brand-intake.ts | None | OK |
| POST /api/omdalat/agent-runs | agent-runs.ts | None | OK |
| GET /api/omdalat/brands/:id/preview | brand-preview.ts | None | OK |
| POST /api/omdalat/brands/:id/approve | brand-approval.ts | requireAuth + requireSuper | OK |
| POST /api/omdalat/brands/:id/publish | brand-publish.ts | requireAuth + requireSuper | OK |
| POST /api/omdalat/brands/:id/compliance | compliance-update.ts | requireAuth + requireSuper | OK |
| POST /api/omdalat/brands/:id/inquiry | brand-inquiry.ts | None | OK |
| POST /api/omdalat/admin/login | brand-admin-login.ts | None | OK |

### Missing routes (from old plan)
- GET /api/omdalat/brands (list all brands) — NOT implemented
- DELETE /api/omdalat/brands/:id — NOT implemented

### CORS
Configured in wrangler.jsonc: CORS_ORIGINS lists 10 allowed origins including lily.omdalat.com.

### ?slug protection
Renderer correctly returns 403 when `?slug` query param is used (brand-site.ts line 23-24).

**Verdict**: API is well-structured. Auth on sensitive routes. CORS configured. ?slug override blocked. Missing: list/delete brand routes (low priority).

---

## 5. BRAND RENDERER

### File: workers/brand-renderer/src/routes/brand-site.ts
- Lines: 2,769
- Hardcoded article titles: 48
- Hardcoded program titles: 14
- validateBrandCopy calls: 0 (hardcoded articles bypass overclaim validator)
- "homestay" occurrences: 14 (L2 forbidden term in L3 context)

### Gate parity
| Gate | Location | Allowlist | Status |
|------|----------|-----------|--------|
| Publish | brand-publish.ts:213 | new Set(['verified','approved','not_applicable']) | OK |
| /stay route | brand-site.ts:170 | new Set(['verified','approved','not_applicable']) | OK |
| Nav link V2 | brand-site.ts:395 | new Set(['verified','approved','not_applicable']) | OK |
| Nav link V2b | brand-site.ts:659 | new Set(['verified','approved','not_applicable']) | OK |
| Nav link home | brand-site.ts:2162 | new Set(['verified','approved','not_applicable']) | OK |

**Verdict**: Gate parity is correct. All 5 gate locations use the same allowlist.

### Critical renderer bugs
1. **brand.omdalat.com/lily renders homepage, not Lily page.** The /lily path on brand.omdalat.com returns the Om Dalat homepage (title: "Om Dalat — Hệ thương hiệu địa phương") instead of the Lily brand page. The Lily page only works on lily.omdalat.com subdomain. This is a routing bug.
2. **Hardcoded articles bypass overclaim validator.** The renderer has 48 hardcoded article titles and 14 program titles in TypeScript. These are not in content_blocks and are not validated by validateBrandCopy. This violates AGENTS.md which says "The 7 Living & Working articles (and all program/article content) are currently hardcoded in TypeScript. Problem: They bypass the content_blocks -> overclaim-validator pipeline."
3. **"homestay" appears 14 times in renderer code.** The L2 forbidden terms list includes "homestay" but this is for L2 editorial layer. However, the hardcoded content in the renderer uses "homestay" freely. If the overclaim validator were wired to the renderer, these would be flagged.

---

## 6. TESTS

### Run result
```
Test Files: 2 passed (2)
Tests: 25 passed (25)
Duration: 166ms
```

### Test coverage
| File | Tests | What it covers |
|------|-------|----------------|
| gate-compliance.test.ts | 15 | Publish gate blocks unknown/pending/missing; passes verified/approved/not_applicable; /stay gate blocks unknown/pending/NULL/undefined; passes verified/approved/not_applicable; can_host_stay=0 bypass |
| compliance-update.test.ts | 10 | Rejects without evidence_map; rejects without reason; rejects short reason; rejects invalid field; rejects invalid value; rejects missing evidence_id; rejects nonexistent evidence_id; rejects wrong-brand evidence_id; passes valid evidence; passes multiple fields |

### Missing tests
| Gap | Risk | Priority |
|-----|------|----------|
| Overclaim validator (validateBrandCopy) | Hardcoded content bypasses it, no test proves it works | HIGH |
| ?slug override returns 403 | Code exists but no test | MEDIUM |
| CORS preflight | Code exists but no test | MEDIUM |
| Auth rejection (no token, wrong token) | Code exists but no test | HIGH |
| Brand renderer routing (/lily path bug) | brand.omdalat.com/lily renders wrong page | HIGH |
| Seed bypass detection | No CI guard for SQL files setting verified without evidence | CRITICAL |

**Verdict**: 25/25 tests pass and are meaningful. But coverage is narrow: only gate logic and compliance route. No tests for overclaim, CORS, auth, renderer routing, or seed integrity.

---

## 7. RUNTIME STATUS (Live checks 2026-06-20)

| Endpoint | HTTP Status | Content | Verdict |
|----------|-------------|---------|---------|
| https://lily.omdalat.com | 200 | Lily Living & Working Garden page | LIVE, rendering correctly |
| https://brand.omdalat.com/ | 200 | Om Dalat homepage | LIVE |
| https://brand.omdalat.com/lily | 200 | Om Dalat homepage (WRONG) | BUG: should render Lily page |
| https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | 200 | Full JSON with brand + content_blocks | LIVE |
| https://ap.omdalat.com | 200 | Editorial site | LIVE |
| https://vuonhong3.omdalat.com | 000 | DNS not resolving | DOWN: DNS not configured |

### DNS status
| Subdomain | Resolves | Notes |
|-----------|----------|-------|
| lily.omdalat.com | YES | Renders correctly via brand renderer |
| vuonhong3.omdalat.com | NO | DNS not configured (dig returns empty) |
| api.omdalat.com | YES | API responds |
| brand.omdalat.com | YES | Renderer responds |
| ap.omdalat.com | YES | Editorial site responds |

**Verdict**: lily.omdalat.com is LIVE (contradicts old TRUE_STATE_AUDIT which said "does not resolve"). vuonhong3.omdalat.com is DOWN (DNS not configured). brand.omdalat.com/lily has a routing bug.

---

## 8. FRONTEND

### apps/web (marketing website)
**Pages found: 38** (far more than old "2/10" claim)

Key pages:
- / (homepage)
- /about, /contact, /join
- /articles, /articles/[slug]
- /communities/[slug], /community
- /docs/* (6 pages: faq, getting-started, how-it-works, stay-guide, work-guide, community-rules)
- /learning, /life, /work, /stay, /places/[slug], /proofs/[slug]
- /member/* (11 pages: login, register, welcome, verify, profile, programs, operations, resources, handbook, node-model, investor-overview, application-status)
- /privacy, /terms

### apps/app (member dashboard)
**Pages found: 22** (far more than old "4/10" claim)

Key pages:
- / (dashboard)
- /apply, /contributor
- /admin/review
- /communities, /events, /experts, /hosts
- /earning, /learning, /places, /proofs, /resources
- /stay, /work
- /member/* (login, register, operations, application-status)
- /profile, /settings

**Verdict**: Frontend is much more complete than old audits claimed. 38 web pages + 22 app pages = 60 total. Old audits said "2/10" and "4/10" — these were wrong. However, page existence does not mean page completeness. Each page needs content review.

---

## 9. EDITORIAL CONTENT (ap.omdalat.com)

### CMS JSON files: 21
| File | Content |
|------|---------|
| authors.json | Author definitions |
| bridge-blocks.json | Bridge content blocks |
| categories.json | Category definitions |
| contacts.json | Contact information |
| faq-items.json | FAQ entries |
| image-assets.json | Image metadata |
| image-essays.json | Image essay metadata |
| locale-configs.json | Locale configuration |
| navigation.json | Navigation structure |
| people.json | People list |
| place-lily-lac-duong.json | Lily place profile |
| place-vuonhong3.json | Vuonhong3 place profile |
| places.json | Places list |
| redirects.json | Redirect rules |
| sections.json | Section definitions |
| seo-overrides.json | SEO overrides |
| site-settings.json | Site settings |
| static-pages.json | Static page content |
| stories.json | Story content |
| support-pages.json | Support page content |
| tags.json | Tag definitions |

### Article files: 0
The articles directory is empty. No editorial articles have been written.

### Place profiles: 2 (Lily, Vuonhong3)
### People profiles: 0
### Work profiles: 0

**Verdict**: CMS structure exists but content is minimal. 2 place profiles, 0 articles, 0 people profiles, 0 work profiles. The "30 articles" target is at 0%.

---

## 10. OVERCLAIM VALIDATOR

### Code exists: workers/api/src/lib/overclaim-validator.ts
- L3 forbidden terms: 17 (dat ngay, cam ket, dam bao, chac chan, 100%, hoan toan, tuyet doi, duy nhat, so 1, dung dau, hang dau, tot nhat, ly tuong nhat, hoan hao, khong the tot hon)
- L2 forbidden terms: 16 (homestay, booking, dat phong, book now, gia dem, theo dem, khach san, hotel, motel, resort, phong trong, con phong, day phong, ngay, dem)
- validateBrandCopy function: checks payload against forbidden terms

### Where it is called
- brand-publish.ts:161-170: Called during publish gate check on content_blocks payloads. If validation fails, content_approved = false.

### Where it is NOT called
- brand-renderer/brand-site.ts: 0 calls. Hardcoded articles (48 titles, 14 programs) bypass the validator entirely.
- No test file for overclaim-validator.ts.

**Verdict**: Validator exists and is wired to publish gate for content_blocks. But hardcoded articles in renderer bypass it completely. No test proves the validator works.

---

## 11. PLAN DOCUMENTS AUDIT

### Overclaim summary
| Document | Claim | Reality | Verdict |
|----------|-------|---------|---------|
| TRUE_STATE_AUDIT | "lily.omdalat.com does not resolve" | It resolves, returns 200 | OUTDATED |
| TOTAL_COMPLETION_AUDIT | "67% complete" | Self-assessed, no gate signoff | NARRATIVE |
| TOTAL_COMPLETION_AUDIT | "Frontend 50%, web 2/10 pages" | 38 web pages exist | WRONG |
| TOTAL_COMPLETION_AUDIT | "App 4/10 pages" | 22 app pages exist | WRONG |
| TOTAL_COMPLETION_AUDIT | "Migration 0008 pending" | 0008 exists | WRONG |
| TOTAL_COMPLETION_AUDIT | "0/30 articles" | Correct, still 0 | ACCURATE |
| COMPLETION_ROADMAP | "Git corruption blocking dev" | Git is clean | WRONG |
| QA_FINAL_REPORT | "All P0+P1+P2 fixed" | Tests pass, but bypass still exists | PARTIALLY TRUE |

---

## 12. ALL ISSUES TO FIX (Priority order)

### P0: Critical (Legal/Safety)

| # | Issue | Fix | Owner | Effort |
|---|-------|-----|-------|--------|
| 1 | seed_lily.sql hardcodes `verified` + `published` bypassing audited route | Change to `unknown` + `private_preview`. Keep evidence rows as reference. If evidence is real, Founder submits through route. | Dev + Founder | 1 hour |
| 2 | 0010 migration UPDATEs `verified` + `published` via direct SQL | Remove UPDATE statements. Keep INSERT of evidence rows. | Dev | 30 min |
| 3 | No CI guard for seed bypass | Write script that scans SQL files for `verified`/`approved` without corresponding `compliance_evidence` INSERT in same file | Dev | 2 hours |

### P1: High (Bugs/Tests)

| # | Issue | Fix | Owner | Effort |
|---|-------|-----|-------|--------|
| 4 | brand.omdalat.com/lily renders homepage instead of Lily page | Fix routing in brand-site.ts: check path for slug when on brand.omdalat.com domain | Dev | 2 hours |
| 5 | Hardcoded articles bypass overclaim validator | Move 48 articles + 14 programs to content_blocks table, OR add validateBrandCopy call in renderer | Dev | 4 hours |
| 6 | No test for overclaim validator | Write test that feeds forbidden terms and verifies rejection | Dev | 1 hour |
| 7 | No test for auth rejection | Write test that calls publish/approve/compliance without token and verifies 401 | Dev | 1 hour |
| 8 | No test for ?slug override | Write test that calls renderer with ?slug=lily and verifies 403 | Dev | 30 min |
| 9 | No test for CORS | Write test that verifies CORS headers on preflight | Dev | 30 min |

### P2: Medium (Content/Features)

| # | Issue | Fix | Owner | Effort |
|---|-------|-----|-------|--------|
| 10 | 0 editorial articles | Write 5 pillar articles (people, places, livelihood) | Content | 1 week |
| 11 | vuonhong3.omdalat.com DNS not configured | Add CNAME in Cloudflare | DevOps | 30 min |
| 12 | "homestay" in renderer hardcoded content (14 occurrences) | Replace with "living & working garden" or similar | Dev | 1 hour |
| 13 | Missing API routes: list brands, delete brand | Implement GET /api/omdalat/brands and DELETE /api/omdalat/brands/:id | Dev | 2 hours |
| 14 | 0 people profiles, 0 work profiles in CMS | Create people and work profile JSON files | Content | 1 week |

### P3: Low (Cleanup)

| # | Issue | Fix | Owner | Effort |
|---|-------|-----|-------|--------|
| 15 | Old plan documents contain overclaims | Add correction notices or move to archive folder | Dev | 30 min |
| 16 | console.log in renderer (line 58) | Remove or replace with structured logging | Dev | 5 min |
| 17 | TRUE_STATE_AUDIT says lily DNS not configured | Update with current live status | Dev | 10 min |

---

## 13. WHAT IS WORKING WELL

1. **Gate logic is correct and tested.** 25/25 tests pass with meaningful assertions (blocks unknown/pending/NULL, passes verified/approved/not_applicable).
2. **Gate parity is correct.** All 5 gate locations (publish + 4 renderer gates) use the same allowlist.
3. **Auth is required on sensitive routes.** publish, approve, compliance all require requireAuth + requireSuper.
4. **?slug override is blocked.** Renderer returns 403 when ?slug is used.
5. **CORS is configured.** 10 allowed origins in wrangler.jsonc.
6. **lily.omdalat.com is live and rendering.** Returns 200 with correct Lily content.
7. **API is live and returning data.** Brand preview endpoint returns full JSON with content_blocks.
8. **Frontend has 60 pages total.** 38 web + 22 app. Much more than old audits claimed.
9. **Build passes.** tsc --noEmit exits 0.
10. **Git is clean.** No corruption, no stale locks, main branch is linear.

---

## 14. RECOMMENDED EXECUTION ORDER

### Loop 1: Close compliance bypass (P0)
1. Fix seed_lily.sql: compliance to `unknown`, publication_status to `private_preview`
2. Fix 0010: remove UPDATE statements, keep evidence INSERTs
3. Write CI guard script: scan SQL for `verified` without evidence
4. Add tests: overclaim, auth, ?slug, CORS
5. Run vitest: verify 25+ new tests pass
6. Commit

### Loop 2: Fix renderer bugs (P1)
7. Fix brand.omdalat.com/lily routing
8. Move hardcoded articles to content_blocks OR wire validateBrandCopy to renderer
9. Replace "homestay" in hardcoded content
10. Run tests
11. Commit

### Loop 3: Content + DNS (P2)
12. Add CNAME for vuonhong3.omdalat.com
13. Write 5 editorial articles
14. Create people and work profiles
15. Commit

### Loop 4: Cleanup (P3)
16. Add correction notices to old plan documents
17. Remove console.log from renderer
18. Update TRUE_STATE_AUDIT with current live status
19. Commit

---

*Full audit. Ground-truth verified. No claims from reports. 2026-06-20.*
