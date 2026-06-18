# 12 — BRAND OMDALAT MASTER PACK README 2026

**Om Dalat Brand System Portal — DEV MASTER PACK v1.0**

**Date:** 2026-06-18  
**Status:** LOCKED  
**Owner:** Product Lead — Om Dalat Brand Infrastructure  

---

## What Is This?

This is the complete development specification for the **Om Dalat Brand System Portal**.

It is NOT a website for a single brand. It is the infrastructure that enables thousands of local brands to own their digital presence.

---

## 12 Files

| # | File | Purpose | Status |
|---|------|---------|--------|
| 01 | `01_BRAND_OMDALAT_MASTER_PORTAL_STRATEGY_LOCK_2026.md` | Vision, mission, positioning, 4-layer architecture, governance | LOCKED |
| 02 | `02_BRAND_OMDALAT_LIVE_WEB_MIGRATION_AND_LILY_SEPARATION_PLAN_2026.md` | Migration from brand-as-Lily to brand-as-portal | ACTIVE |
| 03 | `03_BRAND_OMDALAT_INFORMATION_ARCHITECTURE_AND_BILINGUAL_COPY_SPEC_2026.md` | Sitemap, routes, navigation, full bilingual copy | LOCKED |
| 04 | `04_BRAND_OMDALAT_INTAKE_VERIFICATION_AND_APPROVAL_WORKFLOW_2026.md` | 9-stage workflow from submit to publish | LOCKED |
| 05 | `05_BRAND_OMDALAT_CMS_DATA_MODEL_AND_API_SPEC_2026.md` | DB schema, API endpoints, R2 structure | LOCKED |
| 06 | `06_BRAND_OMDALAT_BRAND_FACTORY_AGENT_ORCHESTRATION_SPEC_2026.md` | AI agent pipeline (Maps, SEO, Content, Image, Compliance, Translation, QA) | DRAFT |
| 07 | `07_BRAND_OMDALAT_SECURITY_PRIVACY_CONSENT_AND_COMPLIANCE_STANDARD_2026.md` | Consent framework, privacy, audit logs, rollback | LOCKED |
| 08 | `08_BRAND_OMDALAT_SEO_I18N_AND_INTERNATIONAL_EXPANSION_SPEC_2026.md` | SEO standards, translation principles, expansion roadmap | LOCKED |
| 09 | `09_BRAND_OMDALAT_DEV_CONTENT_FIELD_QA_HANDOFF_2026.md` | QA checklist for content, schema, SEO, images, accessibility, mobile, performance | ACTIVE |
| 10 | `10_BRAND_OMDALAT_RELEASE_GATES_AND_EVIDENCE_PACKET_2026.md` | 9 release gates + evidence packet structure | LOCKED |
| 11 | `11_BRAND_OMDALAT_IMPLEMENTATION_BACKLOG_2026.csv` | 40 tasks with priority, owner, estimate, dependencies | ACTIVE |
| 12 | `12_BRAND_OMDALAT_MASTER_PACK_README_2026.md` | This file — entry point | LOCKED |

---

## Quick Start for DEV

### If you are Team 1 (Portal Frontend)

1. Read: 01 (Strategy), 03 (IA + Copy), 05 (API)
2. Build: `brand.omdalat.com` single-page portal with 8 sections
3. Verify: Bilingual, responsive, SEO meta, language switcher

### If you are Team 2 (Backend + API)

1. Read: 01 (Strategy), 04 (Workflow), 05 (CMS + API), 07 (Security)
2. Build: Intake API, consent flow, approval workflow, evidence packet
3. Verify: Audit logs, rollback, compliance gates

### If you are Team 3 (AI + Agents)

1. Read: 01 (Strategy), 06 (Agent Orchestration), 08 (SEO I18N)
2. Build: Maps Agent, SEO Agent, Content Agent, Translation Agent
3. Verify: Factual accuracy, bilingual quality, no hallucination

---

## Key Principles (READ FIRST)

1. **brand.omdalat.com is NOT a brand microsite.** It is the strategic portal.
2. **Every brand gets its own subdomain:** `{brand}.omdalat.com`
3. **Vietnamese is the source language.** English is the first international layer.
4. **AI prepares. Humans decide.** No auto-publish without owner + admin approval.
5. **Evidence packet required for every published brand.** No exceptions.

---

## Current State (2026-06-18)

| Component | Status |
|-----------|--------|
| Brand Portal page | ✅ Live on brand.omdalat.com |
| Portal bilingual | ✅ VI + EN with switcher |
| Portal SEO | ✅ Meta, OG, Twitter, schema |
| Lily microsite | ✅ Live on brand renderer |
| Lily DNS | ⏳ CNAME pending (user action) |
| Intake system | ⏳ Not built |
| Consent flow | ⏳ Not built |
| Approval dashboard | ⏳ Not built |
| AI agents | ⏳ Not built |
| Evidence packet | ⏳ Not built |

---

## Definition of Done (Brand Portal)

- [ ] brand.omdalat.com serves portal only (no brand content)
- [ ] Every brand has its own `{brand}.omdalat.com` subdomain
- [ ] Intake system accepts brand submissions
- [ ] Owner consent workflow complete
- [ ] Admin approval dashboard operational
- [ ] Evidence packet auto-generated on publish
- [ ] Bilingual (VI + EN) on all properties
- [ ] SEO meta + schema on all pages
- [ ] Audit log captures all actions
- [ ] Rollback procedure tested
- [ ] 50 brands published (Phase 1 target)

---

## Contact

- Product Lead: product@omdalat.com
- Dev Lead: dev@omdalat.com
- Content Lead: content@omdalat.com

---

**Generated with Om Dalat Brand System Portal — v1.0**
**Locked: 2026-06-18**
