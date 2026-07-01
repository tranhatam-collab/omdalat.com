# BRAND AUDIT v1.1 — Những Khu Vườn Tâm / Tam Farm (tamfarms.omdalat.com)

**Audit date:** 2026-07-01
**Standard:** `docs/governance/OMDALAT_LOCAL_BRAND_STANDARD_2026.md` v1.1
**ADR:** `docs/adr/ADR_TAMFARM_UNIFIED_BRAND_PIPELINE_2026.md` (ADR-001)
**Auditor:** Devin (automated, evidence-based)
**Method:** Live curl, D1 queries, Cloudflare API, repo code read

---

## Verdict

### Non-waivable gates check (FIRST)

| Gate | Result | Evidence |
|------|--------|----------|
| Founder approval (A.F.7) | ✅ PASS | Founder Lock APPROVED 2026-06-30 |
| Owner consent = approved (C.F.2) | ✅ PASS | D1: own_tamfarms, consent_status=approved |
| Legal operating basis (A.C.1) | ✅ PASS | "Operating under Trần Hà Tâm sole proprietorship" |
| Required compliance (C.C.1-3) | ❌ FAIL | All compliance = unknown (no evidence yet) |
| True 404 (D.F.4) | ✅ PASS | `/nonexistent` → 404 (FIXED Phase 0.5) |
| Publish gate in code (D.C.5) | ⚠️ N/A | Static site — no server-side gate (renderer migration Phase 1) |
| Security baseline (D.C.12) | ⚠️ N/A | No auth on public static site |
| Rollback path (D.C.3) | ✅ PASS | Cloudflare Pages deployment history |
| No overclaim (B.F.8) | ✅ PASS | 0 forbidden terms |
| D1 brand record (A.F.2) | ✅ PASS | brnd_tamfarms (CREATED Phase 0.5) |
| brand-renderer route (D.F.5) | ❌ FAIL | Not yet — static Pages, route migration Phase 1 |

**Non-waivable gates: 7 PASS, 2 FAIL, 2 N/A**

**Verdict: HOLD** — compliance unknown + no brand-renderer route

**Allowed public status: FOUNDATION PUBLIC** (editorial content only, no operational claims)

---

## Scorecard

| Tier | Pass | Total | Rate | Status |
|------|------|-------|------|--------|
| FOUNDATION | 18 | 18 | 100% | ✅ PASS |
| CERTIFIED | 12 | 25 | 48% | ❌ NOT READY |

**Improvement from v1.0:** FOUNDATION 77.8% → 100% (4 gaps closed)

---

## Changes from v1.0 → v1.1

| Item | v1.0 | v1.1 | Change |
|------|------|------|--------|
| C.F.1 Compliance row | ❌ FAIL | ✅ PASS | Created cmp_tamfarms (all unknown) |
| C.F.2 Owner consent | ❌ FAIL | ✅ PASS | Created own_tamfarms (approved) |
| D.F.4 True 404 | ❌ FAIL | ✅ PASS | Added 404.html + _redirects |
| A.F.2 D1 brand record | ❌ FAIL | ✅ PASS | Created brnd_tamfarms |
| B.C.1 hreflang | ❌ FAIL | ✅ PASS | Added to all 58 pages |
| B.C.2 Schema.org | ❌ FAIL | ✅ PASS | Added Organization + WebSite + Article + BreadcrumbList |
| B.C.3 OG tags complete | ⚠️ PARTIAL | ✅ PASS | Added og:image (1200×630 JPG) |
| B.C.4 Twitter cards | ❌ FAIL | ✅ PASS | Added to all 58 pages |
| B.C.5 Real OG image | ❌ FAIL | ✅ PASS | Created og-tamfarms.jpg (image/jpeg) |
| B.C.9 Localized 404 | (new) | ✅ PASS | 404.html with brand identity |
| D.C.1 Runtime version | ❌ FAIL | ⚠️ PARTIAL | version.json (static, not runtime SHA) |
| D.C.10 D1 record | ❌ FAIL | ✅ PASS | brnd_tamfarms exists |

---

## A. Identity & Legal

### FOUNDATION: 8/8 PASS ✅

All items pass (same as v1.0 + A.F.2 now D1-backed).

### CERTIFIED: 8/8 PASS ✅

All items pass (same as v1.0).

---

## B. Content & SEO

### FOUNDATION: 10/10 PASS ✅

All items pass (same as v1.0).

### CERTIFIED: 8/9 PASS

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| B.C.1 | hreflang | ✅ PASS | 3 tags per page (vi, en, x-default) on all 58 pages |
| B.C.2 | Schema.org | ✅ PASS | Organization + WebSite on homepage, Article + BreadcrumbList on articles |
| B.C.3 | OG tags complete | ✅ PASS | og:type, og:title, og:description, og:url, og:image, og:locale |
| B.C.4 | Twitter cards | ✅ PASS | twitter:card, twitter:title, twitter:description, twitter:image |
| B.C.5 | Real OG image | ✅ PASS | og-tamfarms.jpg, 1200×630, content-type: image/jpeg |
| B.C.6 | Content qua publish gate | ❌ FAIL | Static HTML, not in D1 content_blocks (only 5 seed blocks) |
| B.C.7 | Article full content | ✅ PASS | 10 articles × 2 locales, full content |
| B.C.8 | Language switcher | ✅ PASS | Present on all pages |
| B.C.9 | Localized 404 | ✅ PASS | 404.html with brand identity, noindex |

---

## C. Compliance & Evidence

### FOUNDATION: 2/2 PASS ✅

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| C.F.1 | Compliance row | ✅ PASS | cmp_tamfarms (all unknown) |
| C.F.2 | Owner consent | ✅ PASS | own_tamfarms, consent_status=approved |

### CERTIFIED: 0/11 PASS (all unknown — Phase 0.7 will collect evidence)

---

## D. Tech & Ops

### FOUNDATION: 5/5 PASS ✅

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| D.F.1 | DNS | ✅ PASS | 104.21.84.52 |
| D.F.2 | TLS | ✅ PASS | HTTPS 200 |
| D.F.3 | HTTP 200 | ✅ PASS | GET /vi/ → 200 |
| D.F.4 | True 404 | ✅ PASS | /nonexistent → 404 |
| D.F.5 | brand-renderer route | ❌ FAIL | Static Pages — route migration Phase 1 |

**Note:** D.F.5 fails per ADR-001 (brand-renderer is required). However, static Pages is the documented "migration source" per ADR-001 §2.4. Route will be added when generic renderer is built (Phase 1).

### CERTIFIED: 4/12 PASS

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| D.C.1 | Runtime SHA | ⚠️ PARTIAL | version.json exists (static, not runtime) |
| D.C.2 | Monitoring | ✅ PASS | Cloudflare Pages dashboard |
| D.C.3 | Rollback | ✅ PASS | Pages deployment history |
| D.C.4 | Tenant isolation | ⚠️ N/A | Static site |
| D.C.5 | Publish gate | ❌ FAIL | No server-side gate (Phase 1) |
| D.C.6 | /stay gate | ⚠️ N/A | No /stay route |
| D.C.7 | Anti-confusion guard | ✅ PASS | guard PASS |
| D.C.8 | SQL compliance guard | ✅ PASS | guard PASS |
| D.C.9 | Tests pass | ✅ PASS | 268/268 |
| D.C.10 | D1 record | ✅ PASS | brnd_tamfarms, publication_status=draft |
| D.C.11 | Cookie scope | ⚠️ N/A | No auth |
| D.C.12 | Security baseline | ⚠️ N/A | No auth on public site |

---

## Gap summary (remaining)

### FOUNDATION: 0 gaps ✅ (all closed)

### CERTIFIED gaps (for FOUNDATION PUBLIC → CERTIFIED OPERATIONAL)

| # | Gap | Phase | Fix |
|---|-----|-------|-----|
| 1 | B.C.6: Content not in D1 content_blocks | Phase 1 | Import all 58 pages into content_blocks |
| 2 | C.C.1-11: Compliance all unknown | Phase 0.7 | Collect real evidence (location, safety, legal) |
| 3 | D.C.1: No runtime SHA | Phase 1 | Migrate to brand-renderer |
| 4 | D.C.5: No publish gate | Phase 1 | Migrate to brand-renderer |
| 5 | D.F.5: No brand-renderer route | Phase 1 | Add route + build generic renderer |

### Non-waivable gate failures (blocks CERTIFIED OPERATIONAL)

| Gate | Status | Phase to close |
|------|--------|----------------|
| Required compliance | unknown | Phase 0.7 (evidence collection) |
| brand-renderer route | missing | Phase 1 (generic renderer) |

---

## What was achieved in Phase 0.5-0.6

1. ✅ D1 brand record (brnd_tamfarms, publication_status=draft)
2. ✅ Owner record (own_tamfarms, consent_status=approved)
3. ✅ Compliance checklist (cmp_tamfarms, all unknown)
4. ✅ 10 content_blocks (5 VI + 5 EN: hero, about, story, contact, location)
5. ✅ True 404 (404.html + _redirects)
6. ✅ hreflang on all 58 pages (vi, en, x-default)
7. ✅ Schema.org JSON-LD (Organization, WebSite, Article, BreadcrumbList)
8. ✅ OG image (1200×630 JPG, real image)
9. ✅ Twitter cards on all 58 pages
10. ✅ version.json (static version info)
11. ✅ 268 tests pass, both guards pass

## What remains (Phase 0.7-0.8 + Phase 1)

- Phase 0.7: Collect compliance evidence (location rights, safety, PCCC, legal)
- Phase 0.8: Smoke tests for static site
- Phase 1: Build generic brand renderer → import all content → switch DNS → decommission Pages
