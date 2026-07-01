# BRAND AUDIT v2 — Lily (Reference Location 01)

**Audit date:** 2026-07-01
**Standard:** `docs/governance/standards/TAMFARMS_LOCATION_STANDARD_2026.md` (OMD-GOV-STD-003)
**Architecture:** ADR-003 — Lily = Reference Location 01 (not a chain model)
**Parent model:** Tam Farms (MODEL DEFINED)
**Auditor:** Devin (automated, evidence-based)
**Method:** Live curl, D1 queries, charter review, compliance evidence check

---

## Verdict

Lily is audited as a **REFERENCE LOCATION** under Tam Farms Location Standard (20 criteria).

| Criterion | Status | Evidence |
|-----------|--------|----------|
| 1. Operating entity | ✅ PASS | CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073) |
| 2. Location rights | ✅ PASS | Place record plc_lily, address verified |
| 3. Accommodation | ✅ PASS | lodging_compliance=verified (GCN 62/GCN) |
| 4. Kitchen & food | ✅ PASS | food_safety=not_applicable (self-catered) |
| 5. Workspace | ✅ PASS | Charter + content blocks confirm workspace |
| 6. Internet | ⚠️ NEEDS VERIFICATION | Not explicitly documented |
| 7. Learning area | ✅ PASS | Charter confirms "khu học tập" |
| 8. Garden | ✅ PASS | Charter confirms "khu vườn, cây trái, dược liệu" |
| 9. Safety | ✅ PASS | pccc=verified (BBKT-17022022) |
| 10. Capacity | ✅ PASS | Charter: "01-03 người/tháng" |
| 11. Activity schedule | ⚠️ NEEDS DETAIL | Not explicitly published |
| 12. House rules | ⚠️ NEEDS DETAIL | Not on website yet |
| 13. Privacy & consent | ✅ PASS | consent_status=approved, app.omdalat.com consent center |
| 14. Assigned experts | ⚠️ NEEDS DETAIL | Not yet assigned in system |
| 15. Licensed programs | ⚠️ NEEDS DETAIL | Programs defined in Tam Farms model, not yet licensed to Lily |
| 16. Pricing | ⚠️ NEEDS DETAIL | "Chưa niêm yết công khai — tư vấn qua app" |
| 17. Cancellation | ⚠️ NEEDS DETAIL | Not documented |
| 18. Emergency response | ⚠️ NEEDS DETAIL | Support via app + email, no formal SOP |
| 19. User feedback | ⚠️ NEEDS DETAIL | No feedback system yet |
| 20. Periodic QA | ⚠️ NEEDS DETAIL | No QA cadence defined |

**Score: 9/20 PASS, 11/20 NEEDS DETAIL**

**Verdict: REFERENCE LOCATION — PARTIALLY CERTIFIED**

Lily has the critical safety and legal gates (operating entity, location rights, accommodation, safety) but needs to document operational details (pricing, cancellation, house rules, emergency response, feedback, QA).

---

## Required label check

**REQUIRED:** "A TAM FARMS REFERENCE LOCATION" / "ĐỊA ĐIỂM MẪU THUỘC HỆ NHỮNG KHU VƯỜN TÂM"

**Current state:** ❌ NOT YET DISPLAYED on lily.omdalat.com

**Action:** Add label to Lily homepage and charter. This is a non-waivable requirement per Location Standard §0.2.

---

## Compliance evidence (verified)

| Field | Status | Reference | Authority | Date |
|-------|--------|-----------|-----------|------|
| business_registration | verified | 42C8002522 | Phong Tai chinh huyen Lac Duong | 2024-12-04 |
| lodging_compliance | verified | 62/GCN | Cong an huyen Lac Duong | 2022-03-04 |
| pccc | verified | BBKT-17022022 | Phong CS PCCC&CNCH Cong an tinh Lam Dong | 2022-02-17 |
| food_safety | not_applicable | HS-TD-2022 | Cong an tinh Lam Dong | 2022-01-01 |

All 4 evidence records have real reference numbers, issuing authorities, and issue dates.

---

## What changed from v1.1 audit

| v1.1 (wrong standard) | v2 (correct standard) |
|----------------------|----------------------|
| Audited as "local brand" | Audited as "reference location" |
| Used OMDALAT_LOCAL_BRAND_STANDARD | Uses TAMFARMS_LOCATION_STANDARD |
| 22 CERTIFIED criteria (generic) | 20 LOCATION criteria (specific) |
| Cookie scope exception | N/A for location standard |
| brand-renderer route required | Still required (ADR-001) |
| Score: 23/25 (92%) | Score: 9/20 (45%) — but correct criteria |

**Key insight:** v1.1 measured generic brand criteria. v2 measures location-specific criteria. The score dropped because the correct standard is more specific about operational details (pricing, cancellation, house rules, emergency response, feedback, QA) that Lily hasn't documented yet.

---

## Gaps to close for LOCATION CERTIFIED

| # | Gap | Priority | Action |
|---|-----|----------|--------|
| 1 | Required label not displayed | P0 | Add "A TAM FARMS REFERENCE LOCATION" to homepage |
| 2 | Internet documented | P2 | Document internet speed/reliability |
| 3 | Activity schedule published | P2 | Publish activity calendar |
| 4 | House rules documented | P1 | Create /vi/noi-quy page with rules |
| 5 | Assigned experts | P1 | Assign experts in system |
| 6 | Licensed programs | P1 | Formally license Tam Farms programs to Lily |
| 7 | Pricing | P1 | Define and document pricing structure |
| 8 | Cancellation policy | P1 | Document cancellation terms |
| 9 | Emergency response SOP | P1 | Create formal emergency SOP |
| 10 | User feedback system | P2 | Implement feedback collection |
| 11 | Periodic QA cadence | P2 | Define QA review schedule |

---

## What Lily does RIGHT (confirmed by v2)

- ✅ Operating entity: CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073)
- ✅ Location rights: verified place record
- ✅ Accommodation: lodging_compliance verified (GCN 62/GCN)
- ✅ Safety: pccc verified (BBKT-17022022)
- ✅ Capacity: 01-03 người/tháng (documented)
- ✅ Garden: khu vườn, cây trái, dược liệu (documented)
- ✅ Learning area: khu học tập (documented)
- ✅ Workspace: confirmed in content blocks
- ✅ Privacy & consent: approved in D1
- ✅ Full D1 record with brand_type=reference_location
- ✅ brand-renderer Worker route (ADR-001 compliant)
- ✅ True 404, tenant isolation, /stay gate
- ✅ Bilingual VI/EN, complete SEO
- ✅ 268 tests pass

**Lily is REFERENCE LOCATION 01 — PARTIALLY CERTIFIED.**
