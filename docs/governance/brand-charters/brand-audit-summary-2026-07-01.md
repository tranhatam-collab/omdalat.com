# BRAND AUDIT SUMMARY — Lily + Tam Farm (2026-07-01)

**Standard:** `docs/governance/OMDALAT_LOCAL_BRAND_STANDARD_2026.md` v1.0
**Date:** 2026-07-01

---

## Scorecard

| Brand | FOUNDATION | CERTIFIED | Verdict |
|-------|-----------|-----------|---------|
| **Lily** | 18/18 (100%) ✅ | 21/22 (95.5%) ✅ | **CERTIFIED WITH EXCEPTIONS** |
| **Tam Farm** | 14/18 (77.8%) ❌ | 4/22 (18.2%) ❌ | **NOT READY** |

---

## Gap Matrix

### FOUNDATION gaps

| ID | Item | Lily | Tam Farm |
|----|------|------|----------|
| A.F.1-8 | Identity & Legal | ✅ 8/8 | ✅ 8/8 |
| B.F.1-10 | Content & SEO | ✅ 10/10 | ✅ 10/10 |
| C.F.1 | Compliance row in D1 | ✅ | ❌ No D1 record |
| C.F.2 | Owner consent in D1 | ✅ | ❌ No D1 record |
| D.F.1-3 | DNS + TLS + HTTP 200 | ✅ 3/3 | ✅ 3/3 |
| D.F.4 | 404 thật | ✅ | ❌ Returns 200 |
| D.F.5 | Worker/Pages project | ✅ | ✅ |

### CERTIFIED gaps

| ID | Item | Lily | Tam Farm |
|----|------|------|----------|
| A.C.1-8 | Identity & Legal | ✅ 6/8 (2 N/A) | ✅ 8/8 |
| B.C.1 | hreflang | ✅ | ❌ Missing |
| B.C.2 | Schema.org JSON-LD | ✅ | ❌ Missing |
| B.C.3 | OG tags (complete) | ✅ | ⚠️ Missing og:image |
| B.C.4 | Twitter cards | ✅ | ❌ Missing |
| B.C.5 | Real OG image | ✅ | ❌ No og:image |
| B.C.6 | Content qua publish gate | ✅ | ❌ No D1 |
| B.C.7 | Article full content | ✅ | ✅ |
| B.C.8 | Language switcher | ✅ | ✅ |
| C.C.1-9 | Compliance + evidence | ✅ 8/9 (1 exception) | ❌ 0/9 |
| D.C.1 | Runtime SHA | ✅ | ❌ Static site |
| D.C.5 | Publish gate in code | ✅ | ❌ No D1 |
| D.C.10 | D1 record | ✅ | ❌ Missing |

---

## Root cause analysis

### Lily: CERTIFIED WITH EXCEPTIONS

Lily is the **reference implementation**. It went through the full Brand Factory pipeline:
- D1 brand record → compliance_checklists → evidence → approvals → publish gate
- brand-renderer Worker → /version, tenant isolation, /stay gate
- content_blocks in D1 → overclaim validator → publish gate

**2 exceptions (documented, acceptable):**
1. C.C.8: Compliance set via seed migration (pre-API era) — evidence-backed, audit trail exists
2. D.C.11: Cookie scope `.omdalat.com` (broad for SSO) — design decision

### Tam Farm: NOT READY

Tam Farm was built as a **static Cloudflare Pages site** outside the Brand Factory pipeline:
- No D1 record → no compliance, no publish gate, no content_blocks
- No brand-renderer Worker → no /version, no tenant isolation
- Hardcoded HTML → bypasses overclaim validator (manual review found no overclaim)

**4 FOUNDATION gaps:**
1. No compliance row in D1 (C.F.1)
2. No owner consent in D1 (C.F.2)
3. 404 returns 200 (D.F.4)
4. *(A and B FOUNDATION all pass)*

**18 CERTIFIED gaps** — primarily because the brand is not in D1.

---

## Architecture decision

| Option | Pros | Cons |
|--------|------|------|
| **A. Migrate Tam Farm to D1 + brand-renderer** | Full pipeline, publish gate, compliance, /version, tenant isolation | Significant rewrite — static HTML → Worker-rendered |
| **B. Adapt standard for static sites** | Keep fast static site, add manual gates | Two paths in standard, harder to enforce |
| **C. Hybrid: D1 record + static Pages** | D1 for compliance/owner/brand metadata, static for content | Publish gate needs custom implementation |

**Recommendation: Option C (hybrid)** — create D1 brand record + owner + compliance row, keep static Pages for content, add manual publish gate check. This closes FOUNDATION gaps immediately and most CERTIFIED gaps without full rewrite.

---

## Action plan

### Phase 0.5 — Close Tam Farm FOUNDATION gaps

1. Create D1 brand record for Tam Farm (brand_id, slug, subdomain, publication_status)
2. Create owner record with consent_status
3. Create compliance_checklists row (all `unknown` — no evidence yet)
4. Fix 404 handling (add 404.html or configure Pages)

### Phase 0.6 — Close Tam Farm CERTIFIED B gaps (SEO)

5. Add hreflang to all VI + EN pages
6. Add schema.org JSON-LD (Organization on homepage, Article on articles)
7. Create OG image (1200×630 JPG)
8. Add Twitter card tags
9. Add og:image tag

### Phase 0.7 — Close Tam Farm CERTIFIED C gaps (compliance)

10. Verify first location (due diligence)
11. Collect compliance evidence (business_registration, lodging if applicable, pccc)
12. Set compliance via API route (not manual SQL)

### Phase 0.8 — Close Tam Farm CERTIFIED D gaps (tech)

13. Add /version endpoint (or accept N/A for static sites in standard)
14. Document publish gate equivalent for static sites

---

## Can we scale to 10 brands now?

**No.** Tam Farm is NOT READY (77.8% FOUNDATION). Scaling now would replicate the gaps.

**After closing Phase 0.5-0.6:** Tam Farm reaches FOUNDATION READY + CERTIFIED B. Still missing CERTIFIED C (compliance evidence — needs real location).

**After closing Phase 0.5-0.8:** Both brands CERTIFIED. Then scale with confidence.

**Lily can serve as the CERTIFIED template today** — but the 10 new brands should go through D1 + brand-renderer from the start (Option A), not static Pages.
