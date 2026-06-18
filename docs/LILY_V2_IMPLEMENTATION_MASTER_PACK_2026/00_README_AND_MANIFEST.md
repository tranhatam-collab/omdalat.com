# LILY V2 IMPLEMENTATION MASTER PACK 2026

**Version:** 2.0 — Founder Lock / Implementation Pack  
**Date:** 2026-06-18  
**Status:** Approved for implementation; public release remains evidence-gated  
**Source of truth:** `01_LILY_FOUNDER_LOCK_MASTER_SPEC_2026.md`

## 1. Purpose

This pack converts Lily V2 from a general concept into a buildable, auditable system for:

- `lily.omdalat.com` — public bilingual brand and application layer;
- `app.omdalat.com/lily/*` — authenticated operating workspace;
- `brand.omdalat.com/case-studies/lily` — case study only;
- `api.omdalat.com/api/lily/*` — operational API and audit trail.

Lily V2 is a **weekly/monthly Living & Working Garden**, not a daily homestay marketplace. Accommodation, learning, project work, and immigration/work-authorisation support are separate contracts and separate system states.

## 2. Reading order

1. Founder truth and boundaries: `01`
2. Public site, routes and bilingual copy: `02`
3. Residency products and workflows: `03`
4. Workspace and proof-of-work: `04`
5. Learning tracks: `05`
6. Job board and project delivery: `06`
7. Foreign resident support: `07`
8. Physical inventory and CMS: `08`
9. App workspace and roles: `09`
10. Brand Portal case study: `10`
11. Content and SEO: `11`
12. Image reality: `12`
13. Privacy, terms and compliance: `13`
14. QA, gates and evidence: `14`
15. Build backlog: `15`
16–20. Technical appendices for DB, API, content, permissions and source assumptions.

## 3. Canonical domain lock

| Domain | Canonical responsibility |
|---|---|
| `lily.omdalat.com` | Public explanation, verified spaces, weekly/monthly programmes, application entry point |
| `app.omdalat.com/lily/*` | Applicant, resident, contributor, mentor and admin operations |
| `brand.omdalat.com` | Om Dalat Brand System Portal; Lily is a case study only |
| `api.omdalat.com/api/lily/*` | Shared API, state transitions, audit events |
| `pay.iai.one` | Payment authority when payment is legally and operationally enabled |

## 4. Route correction

The canonical app path is `/lily/*` on the `app.omdalat.com` host:

- Correct: `https://app.omdalat.com/lily/dashboard`
- Incorrect: `https://app.omdalat.com/app/lily/dashboard`

## 5. Non-negotiable release rules

- No nightly price or daily booking flow in V2.
- No public claim of visa sponsorship, visa issuance, guaranteed work permit, guaranteed employment or guaranteed income.
- No room is publicly available until its real photos, capacity, amenities, safety and operating status are verified.
- No foreign resident is assigned local project work until the legal work-authorisation gate is approved.
- No passport or immigration document is accepted through a public unauthenticated form.
- VI is the canonical source language; EN is reviewed adaptation.
- Every publish, override, room assignment, legal-status change and payment transition is auditable.

## 6. Build teams

### Team 1 — Architecture / Governance
Owns founder lock, roles, legal/privacy review, state machines, release gates and final approval.

### Team 2 — Public Web / CMS / Content
Owns Lily public site, bilingual content, SEO, images, application UX and Brand Portal migration.

### Team 3 — App / API / Operations
Owns resident workspace, inventory, applications, programmes, task system, cases, notifications, payments and audit logs.

## 7. Pack status vocabulary

- **LOCKED:** may not be changed without Founder decision record.
- **BUILDABLE:** sufficient for implementation.
- **EVIDENCE REQUIRED:** architecture is defined but production claim is blocked until evidence exists.
- **LEGAL REVIEW REQUIRED:** final public language or operation requires qualified review.

## 8. Final authority

When documents conflict, apply this order:

1. Founder Lock (`01`)
2. Privacy/Compliance (`13`)
3. QA/Release Gates (`14`)
4. Technical schemas (`16`–`19`)
5. Other implementation documents
