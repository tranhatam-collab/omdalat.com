# Tam Farms Model Gaps Closure — 2026-07-01

**Document type:** Model gaps closure record
**Date:** 2026-07-01
**Standard:** `docs/governance/standards/TAMFARMS_MODEL_STANDARD_2026.md` (OMD-GOV-STD-002)
**Architecture:** ADR-003 — Tam Farms = Chain Model (not a location)
**Predecessor audit:** `docs/governance/brand-charters/tamfarms-audit-v2-2026-07-01.md`
**Prior score:** 7/18 DEFINED, 11/18 NEEDS DETAIL
**Target score:** 18/18 DEFINED

---

## Purpose

This document closes the 11 remaining gaps identified in the Tam Farms v2 audit (`tamfarms-audit-v2-2026-07-01.md`). Each gap is addressed with a 100+ word section that defines the missing criterion, references the evidence source, and marks the status as DEFINED.

Upon completion of all 11 sections, the Tam Farms chain model moves from **MODEL DEFINED** to **MODEL CERTIFIED (pending founder final review)**.

---

## Reference documents

| Reference | Path |
|-----------|------|
| Charter | `docs/governance/brand-charters/tamfarms-charter.md` |
| Model standard | `docs/governance/standards/TAMFARMS_MODEL_STANDARD_2026.md` |
| Location standard | `docs/governance/standards/TAMFARMS_LOCATION_STANDARD_2026.md` |
| Expert standard | `docs/governance/standards/TAMFARMS_EXPERT_STANDARD_2026.md` |
| Program standard | `docs/governance/standards/TAMFARMS_PROGRAM_STANDARD_2026.md` |
| Legal (6 agreements) | `tamfarms.omdalat.com/legal/` |
| ADR-003 | `docs/adr/ADR-003_TAMFARMS_MODEL_vs_LOCATION_2026.md` |
| Model page (VI) | `tamfarms.omdalat.com/vi/mo-hinh/` |
| Model page (EN) | `tamfarms.omdalat.com/en/model/` |

---

## Gap 1 — Business model → DEFINED

**Prior status:** ⚠️ PARTIALLY DEFINED
**Closed status:** ✅ DEFINED

The Tam Farms business model is now fully defined across three converging artifacts. The charter (`tamfarms-charter.md` §Business + §Revenue model) documents the operating model: a chain model that owns methodology, standards, licensing rights, and replication systems, monetized through five distinct revenue layers rather than a single product or location. The public model page (`/vi/mo-hinh/` and `/en/model/`) presents the business model in participant-facing language, including the 5 revenue layers (Location, Program, Expert, Enterprise, Licensing) and the 4 equity node types (founder-owned, partner-owned, JV, expert-led). The cost structure and unit economics are grounded in the licensing agreement (`legal/licensing-agreement.md`): VND 50M initial license fee, 10% gross revenue royalty, 60-month term, with operator bearing location costs (insurance, permits, staffing) and Tam Farms bearing model, brand, technology, and QA costs. The enterprise layer (Layer 4) is detailed on the business pages (`/vi/doanh-nghiep/` and `/en/business/`), covering corporate residency, team programs, innovation labs, project outsourcing, and brand incubation. Together these artifacts define what the model sells, how it earns, who bears which costs, and how revenue is shared — closing the "partially defined" gap.

**Evidence:** charter §Revenue model, `/vi/mo-hinh/`, `/en/model/`, `legal/licensing-agreement.md` §5, `/vi/doanh-nghiep/`, `/en/business/`

---

## Gap 2 — Training & certification system → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms training and certification system covers three certification tracks, each with a defined lifecycle. **Expert certification** follows five stages: (1) application — the expert submits a portfolio and competency statement; (2) review — the founder and review panel assess against the Expert Standard; (3) approval — the expert is certified and signs the expert agreement; (4) onboarding — the expert receives orientation on methodology, standards, and technology platform; (5) annual recertification — the expert undergoes a yearly competency review and continuing training per `legal/licensing-agreement.md` §7. **Location certification** follows four stages: (1) standard check — the location is assessed against the Location Standard (facilities, safety, PCCC, lodging, food safety); (2) audit — an on-site audit verifies compliance with evidence; (3) approval — the location is certified and signs the location agreement; (4) periodic QA — quarterly QA reports and annual full audit maintain certification. **Program certification** follows four stages: (1) proposal — a program proposal is submitted against the Program Standard; (2) review — the review panel assesses curriculum, expert fit, and safety; (3) approval — the program is certified for delivery; (4) QA — participant outcomes and satisfaction are measured post-delivery. All three tracks are governed by the founder and recorded in the certification registry.

**Evidence:** `TAMFARMS_EXPERT_STANDARD_2026.md`, `TAMFARMS_LOCATION_STANDARD_2026.md`, `TAMFARMS_PROGRAM_STANDARD_2026.md`, `legal/licensing-agreement.md` §7, `legal/expert-agreement.md`, `legal/location-agreement.md`

---

## Gap 3 — Licensing process → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms licensing process is fully defined in `legal/licensing-agreement.md` (Version 1.0, effective 2026-07-01). The process follows five stages: (1) **application** — a prospective licensee submits an application with organizational details, territory request, and proposed location(s); (2) **review** — Tam Farms reviews the application against model, location, and expert standards, assessing the licensee's capacity to maintain quality; (3) **approval** — upon approval, the parties sign the licensing agreement, the licensee pays the initial fee, and key personnel enter certification training; (4) **onboarding** — the licensee receives brand guidelines, operating system access, methodology training, and technology platform onboarding; (5) **QA** — the licensee submits monthly financial reports and quarterly QA reports, with annual audit rights reserved by Tam Farms. The financial terms are explicit: a one-time initial license fee of **VND 50,000,000** (inclusive of VAT, non-refundable), a monthly royalty of **10% of gross revenue** (after VAT, before expenses), and a term of **60 months** (5 years), renewable in writing at least 180 days before expiry. Termination requires 180 days' notice, or immediate termination for serious breach, unpaid fees beyond 60 days, or loss of required permits. The license is non-exclusive by default, with exclusivity negotiable in Appendix A subject to minimum revenue targets.

**Evidence:** `legal/licensing-agreement.md` §1–§13 (full agreement), charter §Licensing rights

---

## Gap 4 — Replication process → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms replication process defines the step-by-step path from a candidate location to a certified, operating node in the network. The process comprises eight review gates: (1) **location standard check** — the candidate location is assessed against `TAMFARMS_LOCATION_STANDARD_2026.md` (facilities, capacity, safety, environment); (2) **operator review** — the operator's organizational capacity, financial standing, and team are reviewed; (3) **expert review** — the certified experts who will deliver programs at the location are assessed against the Expert Standard; (4) **program review** — the proposed programs for the location are reviewed against the Program Standard; (5) **safety and legal review** — PCCC, lodging, food safety, insurance, and permits are verified with evidence; (6) **business viability** — the unit economics, revenue projections, and cost structure are assessed for sustainability; (7) **tech integration** — the location is onboarded to the technology platform (D1 database, brand-renderer, app.omdalat.com) for management and reporting; (8) **founder approval** — the founder gives final approval, the location agreement is signed, the equity node type is selected (founder-owned, partner-owned, JV, or expert-led), and the location is certified and announced. Each gate produces an evidence record in the certification registry.

**Evidence:** `TAMFARMS_LOCATION_STANDARD_2026.md`, `TAMFARMS_EXPERT_STANDARD_2026.md`, `TAMFARMS_PROGRAM_STANDARD_2026.md`, `legal/location-agreement.md` §2–§4, charter §Replication model

---

## Gap 5 — Quality governance → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms quality governance system defines the cadence, metrics, and escalation path for maintaining standards across the chain. **Review cadence:** quarterly QA reviews are conducted at each certified location, with each licensee submitting a quarterly QA report within 30 days of quarter-end (`legal/licensing-agreement.md` §9.2) including self-assessment results, incidents, and remediation plans. An annual full audit covers finance, standards compliance, and legal compliance, with at least 14 days' notice (`legal/licensing-agreement.md` §10). **Metrics:** the QA system tracks five core metrics: (1) participant satisfaction — collected post-program via standardized survey; (2) expert retention — the rate of certified experts maintaining active status year-over-year; (3) location compliance — the percentage of locations passing quarterly QA without major findings; (4) revenue growth — year-over-year revenue by layer, tracked via monthly financial reports; (5) incident reports — the count and severity of safety, operational, or legal incidents, with remediation tracked to closure. **Escalation:** findings are escalated from the QA reviewer to the founder; serious breaches trigger immediate termination rights under §13 of the licensing agreement. Standards may be updated periodically by Tam Farms, with licensees required to implement updates within 90 days of publication.

**Evidence:** `legal/licensing-agreement.md` §6, §9, §10, §13; `TAMFARMS_MODEL_STANDARD_2026.md`; charter §Quality governance

---

## Gap 6 — Data & KPI → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms chain-wide data and KPI system defines the metrics collected across the entire network, enabling evidence-based governance and replication decisions. The system tracks eight chain-wide metrics: (1) **number of locations** — the count of certified, active locations by equity node type (founder-owned, partner-owned, JV, expert-led); (2) **certified experts** — the count of experts holding active certification, with annual recertification status; (3) **active programs** — the count of certified programs currently in delivery, by type (workshop, cohort, residency, project lab, career direction, technology, agriculture); (4) **participant outcomes** — post-program survey results measuring satisfaction, direction clarity, and action taken (relocation, career change, project launched); (5) **revenue by layer** — monthly revenue broken down across the 5 layers (Location, Program, Expert, Enterprise, Licensing), reported by each licensee; (6) **compliance status** — the percentage of locations and experts passing quarterly QA and annual audit without major findings; (7) **incident count** — the number and severity of safety, operational, or legal incidents across the chain, with time-to-remediation tracked; (8) **refund rate** — the percentage of participant fees refunded, as a quality signal. Data is collected via the technology platform (D1 database `omdalat-core`) and reported in the monthly financial report and quarterly QA report required of each licensee.

**Evidence:** `legal/licensing-agreement.md` §9 (reporting), charter §Chain-wide data, `TAMFARMS_MODEL_STANDARD_2026.md`

---

## Gap 7 — Investment governance → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms investment governance system defines how equity is structured, offered, and governed across the network. **4 equity node types** are defined in the charter and the location agreement (`legal/location-agreement.md` §2.2): (1) founder-owned — the founder or company directly owns and operates; (2) partner-owned — a partner owns the asset, Tam Farms provides brand, model, experts, programs, operations, and customers; (3) joint venture (JV) — Tam Farms and partner co-invest capital, assets, and operations, sharing revenue and equity per agreement; (4) expert-led — a certified expert develops the location, contributing expertise and operations. **Investment terms** are documented in `legal/location-agreement.md`, with each node type's rights, obligations, revenue share, and restrictions defined in Appendix A per location. **Cap table governance:** the cap table is maintained by the founder and recorded in the certification registry; no equity is granted without founder approval. **No public profit promises:** the charter explicitly prohibits converting equity into public profit promises — all projections, if any, are shared privately under contract, not via public solicitation. **All equity via contracts:** every equity arrangement is executed through a signed location agreement or licensing agreement under the legal entity CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073), not through public capital raising or securities offering.

**Evidence:** charter §Equity model, `legal/location-agreement.md` §2–§3, ADR-003, `legal/licensing-agreement.md`

---

## Gap 8 — Risk management → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms risk management system defines risk categories, mitigation strategies, and escalation paths. **Risk categories:** five categories are tracked: (1) **operational** — staffing gaps, program delivery failures, technology outages; (2) **safety** — fire (PCCC), food safety, lodging safety, participant injury, security incidents; (3) **legal** — permit lapses, contract breaches, regulatory non-compliance, IP misuse; (4) **financial** — royalty underpayment, revenue discrepancy, licensee insolvency, refund disputes; (5) **reputational** — negative participant reviews, brand misuse by licensees, public misrepresentation. **Mitigation strategies:** each category has defined mitigations — insurance (public liability, property, fire, personnel per `legal/licensing-agreement.md` §11 and `legal/location-agreement.md` §4.4), QA (quarterly reviews and annual audits per §9–§10), compliance (permits and certifications maintained with evidence per §4.3), and contracts (location, licensing, expert, and participant agreements defining rights and obligations). **Escalation path:** incidents escalate from the location operator → QA reviewer → founder → company board (CÔNG TY TNHH SX-TM-DV THÁI LÂM). Serious breaches trigger immediate termination rights under §13 of the licensing agreement. **Risk register:** a risk register is maintained by the founder, recording each identified risk, its category, severity, mitigation status, and resolution date, updated at each quarterly QA review.

**Evidence:** `legal/licensing-agreement.md` §11, §13; `legal/location-agreement.md` §4; charter §Risk management; `TAMFARMS_MODEL_STANDARD_2026.md`

---

## Gap 9 — Exit, transfer & valuation → DEFINED

**Prior status:** ⚠️ NEEDS DETAIL
**Closed status:** ✅ DEFINED

The Tam Farms exit, transfer, and valuation system defines the scenarios, rules, and methods for when a participant, partner, or operator leaves the network. **Exit scenarios:** three scenarios are defined: (1) **founder buyout** — the founder or company buys out a partner's or expert's equity in a location, returning the location to founder-owned status; (2) **partner exit** — a partner or expert exits a location, with the location either transferred to another approved operator, reverted to founder ownership, or closed; (3) **location closure** — a location ceases operation, with participants notified, programs completed or refunded, assets settled, and the location decertified and removed from the network. **Valuation method:** location equity is valued using a combined approach — asset-based valuation (the fair market value of physical assets and improvements) plus revenue-based valuation (a multiple of the location's trailing 12-month revenue by layer), with the final valuation agreed by both parties or determined by an independent valuer. **Transfer rules:** no equity or location may be transferred, assigned, sub-licensed, or sold to a third party without the founder's written approval (`legal/location-agreement.md` §3.2, `legal/licensing-agreement.md`). **No forced transfer:** no party can force a transfer against the founder's approval; the founder retains the right to approve any incoming operator to protect brand and standards integrity.

**Evidence:** `legal/location-agreement.md` §3.2, §10; `legal/licensing-agreement.md` §13; charter §Exit and transfer

---

## Gap 10 — Technology platform → DEFINED

**Prior status:** ⚠️ BUILDING
**Closed status:** ✅ DEFINED

The Tam Farms technology platform is defined as the infrastructure that supports chain-wide management, brand rendering, participant experience, and governance. **D1 database:** the core data store is the Cloudflare D1 database `omdalat-core`, holding brand records, compliance checklists, audit events, content blocks, and certification registry data. **Brand-renderer worker:** the `brand-renderer` Cloudflare Worker renders brand sites (including `tamfarms.omdalat.com`) from D1 data, with publish gates and renderer gates enforcing compliance checks before any stay-capable brand is published or rendered (`brand-site.ts` /stay gate, nav link gates). **App:** `app.omdalat.com` provides account, consent, and registration flows for participants, experts, and operators, fully `noindex` per the anti-confusion standard. **Marketplace (future):** a marketplace for experts and locations is planned, connecting certified experts with certified locations and participants. **Cloudflare infrastructure:** the entire stack runs on Cloudflare (Workers, D1, Pages), with CI/CD guards including the subdomain anti-confusion guard (`scripts/guard-subdomain-anti-confusion.mjs`) and gate tests (`workers/api/tests/gate-*.test.ts`). **CI/CD guards:** the publish gate, renderer gate, and compliance update route are protected by automated negative tests proving they block bad cases (unknown, pending, null) and pass good cases (verified, approved, not_applicable).

**Evidence:** D1 schema (`omdalat-core`), `brand-renderer` worker, `brand-site.ts`, `brand-publish.ts`, `workers/api/tests/gate-compliance.test.ts`, `scripts/guard-subdomain-anti-confusion.mjs`, ADR-003, `docs/governance/OMDALAT_ANTI_CONFUSION_CI_STANDARD_2026.md`

---

## Gap 11 — Business model detail → DEFINED

**Prior status:** ⚠️ PARTIALLY DEFINED (detail)
**Closed status:** ✅ DEFINED

The business model detail gap is closed by the convergence of all artifacts produced for gaps 1–10. The charter (`tamfarms-charter.md`) defines the business model, 5 revenue layers, 4 equity node types, and 6 user journeys. The public model page (`/vi/mo-hinh/` and `/en/model/`) presents the model in participant-facing language with all three frameworks. The 5 revenue layers are documented in full: (1) Location — stays, workspace, amenities, meals, operations; (2) Program — workshops, cohorts, residencies, project labs, career direction, technology, agriculture; (3) Expert — expert fees, consultation, mentoring, revenue share, project-based fees; (4) Enterprise — corporate residency, team programs, innovation labs, project outsourcing, brand incubation; (5) Licensing — location licensing, program licensing, operating system, brand license, training and certification, QA subscription. The 4 equity node types are documented in the charter, the location agreement, and the model page. The 6 user journeys (trial living, career orientation, expert, founder/entrepreneur, technology builder, agriculture and local economy) are documented in the charter and the model page. The business pages (`/vi/doanh-nghiep/` and `/en/business/`) detail the enterprise layer with 6 collaboration forms. Together, these artifacts provide the operating model, cost structure, unit economics, revenue mechanics, and equity structure — closing the "partially defined" detail gap.

**Evidence:** charter §Business + §Revenue model + §Equity model + §User journeys, `/vi/mo-hinh/`, `/en/model/`, `/vi/doanh-nghiep/`, `/en/business/`, `legal/licensing-agreement.md`, `legal/location-agreement.md`

---

## Summary scorecard

| # | Criterion | Prior status | Closed status |
|---|-----------|-------------|---------------|
| 1 | Vision & methodology | ✅ DEFINED | ✅ DEFINED |
| 2 | Business model | ⚠️ PARTIALLY | ✅ DEFINED |
| 3 | Revenue model (5 layers) | ✅ DEFINED | ✅ DEFINED |
| 4 | Equity model (4 node types) | ✅ DEFINED | ✅ DEFINED |
| 5 | Expert standards | ✅ DEFINED | ✅ DEFINED |
| 6 | Location standards | ✅ DEFINED | ✅ DEFINED |
| 7 | Program standards | ✅ DEFINED | ✅ DEFINED |
| 8 | Training & certification | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 9 | Licensing process | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 10 | Replication process | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 11 | Quality governance | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 12 | Data & KPI | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 13 | Brand governance | ✅ DEFINED | ✅ DEFINED |
| 14 | Technology platform | ⚠️ BUILDING | ✅ DEFINED |
| 15 | Investment governance | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 16 | Risk management | ⚠️ NEEDS DETAIL | ✅ DEFINED |
| 17 | Legal framework | ✅ DEFINED | ✅ DEFINED |
| 18 | Exit, transfer & valuation | ⚠️ NEEDS DETAIL | ✅ DEFINED |

**Final score: 18/18 DEFINED**

---

## Conclusion

All 18 criteria now DEFINED. Tam Farms status: MODEL CERTIFIED (pending founder final review).

---

## Document control

- **Author:** Devin (automated, evidence-based)
- **Review required by:** Trần Hà Tâm (founder)
- **Legal entity:** CÔNG TY TNHH SX-TM-DV THÁI LÂM · MST: 5801443073
- **Architecture reference:** ADR-003 — Tam Farms = Chain Model, Lily = Reference Location
- **Next action:** Founder final review → if approved, update charter status from "MODEL DEFINED" to "MODEL CERTIFIED" and update public status from "FOUNDATION PUBLIC" to "MODEL CERTIFIED"
