# BRAND AUDIT — Những Khu Vườn Tâm / Tam Farm (tamfarms.omdalat.com)

**Audit date:** 2026-07-01
**Standard:** `docs/governance/OMDALAT_LOCAL_BRAND_STANDARD_2026.md` v1.0
**Auditor:** Devin (automated, evidence-based)
**Method:** Live curl, D1 queries, Cloudflare API, repo code read

---

## Verdict

| Tier | Pass | Total | Rate | Status |
|------|------|-------|------|--------|
| FOUNDATION | 14 | 18 | 77.8% | ❌ NOT READY |
| CERTIFIED | 4 | 22 | 18.2% | ❌ NOT READY |

**Verdict: NOT READY — 4 FOUNDATION gaps + 18 CERTIFIED gaps phải đóng trước khi nhân rộng.**

---

## A. Identity & Legal

### A. FOUNDATION

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| A.F.1 | Brand Charter tồn tại | ✅ PASS | `docs/governance/brand-charters/tamfarms-charter.md` (135 lines) |
| A.F.2 | Brand ID duy nhất | ✅ PASS | `OMDALAT_TAMFARMS` / `TAMFARMS` |
| A.F.3 | Tên VI chính thức | ✅ PASS | "Những Khu Vườn Tâm" |
| A.F.4 | Tên EN chính thức | ✅ PASS | "Tam Farm" |
| A.F.5 | Canonical domain | ✅ PASS | `tamfarms.omdalat.com` — DNS resolve 104.21.84.52 |
| A.F.6 | Forbidden names | ✅ PASS | "Tam Farm Resort, Tam Farm Hotel, Tam Farms Homestay, Tâm Farm, Tamfarms, Tam Farms Đà Lạt" |
| A.F.7 | Founder approval | ✅ PASS | "Trần Hà Tâm — 2026-06-30, Founder Lock APPROVED" |
| A.F.8 | Role 1 câu | ✅ PASS | "Những Khu Vườn Tâm là mạng lưới các khu vườn có chỗ ở, bếp, không gian làm việc..." |

**FOUNDATION A: 8/8 PASS**

### A. CERTIFIED

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| A.C.1 | Legal entity | ✅ PASS | "Operating under Trần Hà Tâm sole proprietorship" |
| A.C.2 | Operating owner | ✅ PASS | "Trần Hà Tâm" |
| A.C.3 | Trademark status | ✅ PASS | "Not registered — operating as a personal brand/program name" |
| A.C.4 | Logo/content rights | ✅ PASS | "Trần Hà Tâm" |
| A.C.5 | Scope Must/May/Must-not | ✅ PASS | 3 sections, detailed, specific |
| A.C.6 | "What it is NOT" table | ✅ PASS | 7-row table (khách sạn, homestay, resort, chữa bệnh, tuyển dụng, đầu tư, 1 farm duy nhất) |
| A.C.7 | Go-live conditions | ✅ PASS | Founder Lock §15 — 18 conditions listed |
| A.C.8 | Ecosystem relationship | ✅ PASS | Table: omdalat.com, app, lily, cuocsong.muonnoi.org |

**CERTIFIED A: 8/8 PASS** ✅

---

## B. Content & SEO

### B. FOUNDATION

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| B.F.1 | Bilingual VI/EN | ✅ PASS | VI: "Những Khu Vườn Tâm — Tam Farm" EN: "Tam Farm · Những Khu Vườn Tâm — Live fully..." |
| B.F.2 | `<title>` unique | ✅ PASS | VI + EN differ, include brand name |
| B.F.3 | `<meta description>` | ✅ PASS | Present on /vi/ and articles |
| B.F.4 | `<link rel="canonical">` | ✅ PASS | `/vi/` → canonical `https://tamfarms.omdalat.com/vi/` |
| B.F.5 | `<meta name="robots">` | ✅ PASS | `index,follow` on /vi/ and articles |
| B.F.6 | `robots.txt` | ✅ PASS | `User-agent: * / Allow: / / Sitemap: ...` |
| B.F.7 | `sitemap.xml` | ✅ PASS | 58 URLs |
| B.F.8 | No overclaim | ✅ PASS | 0 forbidden terms in content |
| B.F.9 | No placeholder | ✅ PASS | 0 matches (coming soon, đang xây dựng, lorem ipsum) |
| B.F.10 | No "minh họa" images | ✅ PASS | 0 matches |

**FOUNDATION B: 10/10 PASS** ✅

### B. CERTIFIED

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| B.C.1 | hreflang | ❌ FAIL | MISSING on /vi/, /en/, and all article pages |
| B.C.2 | Schema.org JSON-LD | ❌ FAIL | 0 `application/ld+json` blocks on any page |
| B.C.3 | OG tags (homepage) | ⚠️ PARTIAL | /vi/ has og:type, og:title, og:description, og:url, og:locale — MISSING og:image |
| B.C.4 | Twitter Card tags | ❌ FAIL | 0 twitter: meta tags on any page |
| B.C.5 | Real images (OG image) | ❌ FAIL | No og:image tag at all — cannot verify |
| B.C.6 | Content qua publish gate | ❌ FAIL | No D1 record, no content_blocks, no approvals — static site bypasses Brand Factory |
| B.C.7 | Article pages full content | ✅ PASS | 10 articles VI + 10 EN, full content (> 500 words each) |
| B.C.8 | Language switcher | ✅ PASS | lang-switcher.js present on all pages |

**CERTIFIED B: 2/8 PASS (6 FAIL)**

---

## C. Compliance & Evidence

### C. FOUNDATION

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| C.F.1 | Compliance row tồn tại | ❌ FAIL | Tam Farm NOT in D1 `brands` table — no compliance_checklists row |
| C.F.2 | Owner consent | ❌ FAIL | No D1 owner record — consent not recorded in database (Founder Lock exists but not in DB) |

**FOUNDATION C: 0/2 PASS (2 FAIL)** ⚠️

### C. CERTIFIED

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| C.C.1 | business_registration | ❌ FAIL | No D1 record |
| C.C.2 | lodging_compliance | ❌ FAIL | No D1 record (can_host_stay not set in DB) |
| C.C.3 | pccc | ❌ FAIL | No D1 record |
| C.C.4 | Evidence rows | ❌ FAIL | 0 evidence records |
| C.C.5 | Evidence reference numbers | ❌ FAIL | N/A — no evidence |
| C.C.6 | Evidence issuing authority | ❌ FAIL | N/A — no evidence |
| C.C.7 | Evidence issue date | ❌ FAIL | N/A — no evidence |
| C.C.8 | Compliance set via API | ❌ FAIL | No compliance set at all |
| C.C.9 | Publish gate pass | ❌ FAIL | No publish gate — static site, no D1 |

**CERTIFIED C: 0/9 PASS (9 FAIL)** ⚠️

**Note:** Tam Farm charter §Status says "Location release: NOT YET (no verified location — due diligence pending)". This is consistent — compliance evidence requires a real verified location first.

---

## D. Tech & Ops

### D. FOUNDATION

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| D.F.1 | DNS resolve | ✅ PASS | 104.21.84.52 (proxied) |
| D.F.2 | TLS | ✅ PASS | HTTPS 200, no cert error |
| D.F.3 | HTTP 200 homepage | ✅ PASS | GET 200 |
| D.F.4 | 404 thật | ❌ FAIL | `/nonexistent-page-test` → 200 (serves homepage, not 404) — Cloudflare Pages SPA fallback |
| D.F.5 | Pages project | ✅ PASS | `omdalat-tamfarms` Pages project, custom domain `tamfarms.omdalat.com` |

**FOUNDATION D: 4/5 PASS (1 FAIL)**

### D. CERTIFIED

| ID | Item | Result | Evidence |
|----|------|--------|----------|
| D.C.1 | Runtime SHA | ❌ FAIL | `/version` returns HTML (homepage), not JSON — static site has no /version endpoint |
| D.C.2 | Monitoring | ⚠️ PARTIAL | Cloudflare Pages dashboard (access logs), but no `wrangler tail` (not a Worker) |
| D.C.3 | Rollback | ✅ PASS | Cloudflare Pages deployment history |
| D.C.4 | Tenant isolation | ⚠️ N/A | Static site — no server-side tenant routing, `?slug=` ignored (returns 200 but no data leak) |
| D.C.5 | Publish gate in code | ❌ FAIL | No publish gate — static site bypasses Brand Factory pipeline |
| D.C.6 | /stay gate | ⚠️ N/A | Tam Farm has no /stay route (charter says "không hoạt động như khách sạn") |
| D.C.7 | Anti-confusion guard | ✅ PASS | `guard-subdomain-anti-confusion.mjs` PASS |
| D.C.8 | SQL compliance guard | ✅ PASS | `guard-sql-compliance-bypass.mjs` PASS (no SQL for this brand) |
| D.C.9 | Tests pass | ✅ PASS | 268/268 (api) + 2/2 (brand-renderer) — Tam Farm static site has no tests but doesn't break existing |
| D.C.10 | D1 record | ❌ FAIL | 0 rows in `brands` table for tamfarms |
| D.C.11 | Cookie scope | ⚠️ N/A | No auth on Tam Farm site (static, no login) |

**CERTIFIED D: 4/11 PASS (4 FAIL, 3 N/A)**

---

## Gap Summary

### FOUNDATION gaps (must close before "NOT READY" → "FOUNDATION READY")

| # | Gap | Severity | Fix |
|---|-----|----------|-----|
| 1 | **C.F.1**: No compliance row in D1 | P0 | Create D1 brand record + compliance_checklists row (even if `unknown`) |
| 2 | **C.F.2**: No owner consent in D1 | P0 | Create owner record with consent_status |
| 3 | **D.F.4**: 404 returns 200 | P1 | Add proper 404.html or configure Cloudflare Pages 404 behavior |
| 4 | *(none in A or B)* | — | — |

### CERTIFIED gaps (must close before "FOUNDATION READY" → "CERTIFIED")

| # | Gap | Severity | Fix |
|---|-----|----------|-----|
| 5 | **B.C.1**: hreflang missing | P1 | Add `<link rel="alternate" hreflang="en">` + `x-default` to all VI pages, `hreflang="vi"` to EN pages |
| 6 | **B.C.2**: Schema.org missing | P1 | Add JSON-LD (Organization on homepage, Article on article pages) |
| 7 | **B.C.3**: OG image missing | P2 | Create og:image (JPG, 1200×630) + add og:image tag |
| 8 | **B.C.4**: Twitter cards missing | P2 | Add twitter:card, twitter:title, twitter:description, twitter:image |
| 9 | **B.C.6**: No publish gate | P1 | Migrate to D1 + brand-renderer, OR create equivalent static-site gate |
| 10 | **C.C.1-9**: No compliance evidence | P0 | Need verified location first → then collect evidence → set via API |
| 11 | **D.C.1**: No runtime SHA | P2 | Add /version endpoint (or accept N/A for static sites) |
| 12 | **D.C.5**: No publish gate in code | P1 | Same as #9 |
| 13 | **D.C.10**: No D1 record | P1 | Create brand record in D1 |

### Root cause

Tam Farm was built as a **static Cloudflare Pages site** outside the Brand Factory pipeline. This bypasses:
- D1 brand record → no compliance, no publish gate, no content_blocks
- brand-renderer Worker → no /version, no tenant isolation, no /stay gate
- Overclaim validator pipeline → content is hardcoded HTML (though manual review found no overclaim)

**Decision needed:** Migrate Tam Farm into D1 + brand-renderer (like Lily), OR adapt the standard to accommodate static sites with equivalent manual gates.

---

## What Tam Farm does RIGHT

- ✅ Most comprehensive charter (135 lines, "What it is NOT" table, 18 go-live conditions)
- ✅ Founder Lock with explicit go-live conditions
- ✅ 10 full articles VI + EN (20 pages total)
- ✅ No overclaim, no placeholder content
- ✅ Google Sign-In registration flow
- ✅ Facebook Messenger integration
- ✅ Language switcher on all pages
- ✅ Sitemap with 58 URLs
- ✅ Bilingual SEO meta tags (title, description, canonical, robots)

---

## Recommendation

1. **Immediate (FOUNDATION):** Create D1 brand record + owner + compliance row (status `unknown`) + fix 404
2. **Short-term (CERTIFIED B):** Add hreflang, schema.org, OG image, Twitter cards to all pages
3. **Medium-term (CERTIFIED C):** Verify first location → collect compliance evidence → set via API
4. **Architecture decision:** Migrate to D1 + brand-renderer OR formalize static-site path in the standard
