# 04 — BRAND OMDALAT INTAKE VERIFICATION AND APPROVAL WORKFLOW 2026

**Status:** LOCKED  
**Date:** 2026-06-18  

---

## 1. Workflow Overview

```
SUBMIT
  ↓
REVIEW (AI + Human)
  ↓
VERIFY (Owner + Location + Compliance)
  ↓
DRFT (Content creation)
  ↓
PREVIEW (Stakeholder review)
  ↓
OWNER REVIEW
  ↓
COMPLIANCE CHECK
  ↓
ADMIN APPROVAL
  ↓
PUBLISH
```

---

## 2. Stage Definitions

### Stage 1: SUBMIT
**Trigger:** Owner or Om Dalat staff submits brand via form.
**Input:**
- Brand name (VI + EN)
- Google Maps link
- Photos (min 5)
- Short description
- Business type
- Owner name + contact
- Consent checkbox
**Output:** Brand record created in DB with status `draft`
**Owner:** Intake Agent (AI-assisted) + Staff

### Stage 2: REVIEW
**Trigger:** Brand record created.
**Actions:**
- AI analyzes Google Maps data
- Categorizes business type
- Extracts location data
- Checks for duplicates
**Output:** Review report with recommendations
**Owner:** Review Agent (AI) + Staff

### Stage 3: VERIFY
**Trigger:** Review complete.
**Actions:**
- Owner identity verification (phone/zalo call)
- Location verification (Google Maps cross-check)
- Photo authenticity check
- Consent form signed
**Output:** Verification report
**Owner:** Verification Agent (AI-assisted) + Staff
**Gate:** If verification fails → RETURN to owner for correction

### Stage 4: DRAFT
**Trigger:** Verification passed.
**Actions:**
- Generate brand profile
- Create content blocks (hero, story, location, etc.)
- Generate SEO metadata
- Create image checklist
**Output:** Draft content blocks in DB
**Owner:** Content Agent (AI) + Content Editor

### Stage 5: PREVIEW
**Trigger:** Draft content ready.
**Actions:**
- Generate preview microsite
- Share private preview URL with owner
- Owner reviews content, images, facts
**Output:** Owner feedback or approval
**Owner:** Owner + Preview System
**Gate:** If owner rejects → RETURN to draft

### Stage 6: OWNER REVIEW
**Trigger:** Owner approves preview.
**Actions:**
- Owner explicitly approves content
- Signs digital consent
- Confirms contact info
**Output:** Owner approval logged
**Owner:** Owner
**Gate:** No approval → HOLD

### Stage 7: COMPLIANCE CHECK
**Trigger:** Owner approval received.
**Actions:**
- Image rights verification
- Privacy check (no personal info exposed)
- Legal compliance (business license if required)
- Accessibility check
**Output:** Compliance report
**Owner:** Compliance Agent (AI) + Legal Review
**Gate:** If compliance fails → RETURN to draft or HOLD

### Stage 8: ADMIN APPROVAL
**Trigger:** Compliance passed.
**Actions:**
- Admin reviews entire brand package
- Checks evidence packet completeness
- Approves for publication
**Output:** Admin approval logged
**Owner:** Admin
**Gate:** If admin rejects → RETURN with notes

### Stage 9: PUBLISH
**Trigger:** Admin approval.
**Actions:**
- Set status to `published`
- Deploy microsite to `{brand}.omdalat.com`
- Generate sitemap entry
- Notify owner
- Create evidence packet archive
**Output:** Live brand microsite
**Owner:** Publishing Agent (AI) + DevOps

---

## 3. Status Transitions

| From | To | Trigger | Gate |
|------|----|---------|------|
| draft | in_review | Submit complete | Auto |
| in_review | verifying | Review passed | Staff approval |
| verifying | verified | All checks passed | Verification report |
| verified | in_draft | Start content creation | Auto |
| in_draft | preview_ready | Content blocks created | Content review |
| preview_ready | owner_review | Preview shared | Auto |
| owner_review | owner_approved | Owner clicks approve | Owner signature |
| owner_approved | compliance_check | Owner approval logged | Auto |
| compliance_check | admin_review | Compliance passed | Compliance report |
| admin_review | published | Admin clicks approve | Admin signature |
| any | rejected | Gate fails | Reason logged |

---

## 4. Rejection Handling

| Rejection Point | Return To | Reason Logged |
|-------------------|-----------|---------------|
| Review | draft | Review notes |
| Verification | draft | Verification failure |
| Owner review | in_draft | Owner feedback |
| Compliance | in_draft | Compliance issues |
| Admin | compliance_check | Admin notes |

---

## 5. SLA Targets

| Stage | Target Duration | Max Duration |
|-------|-----------------|--------------|
| Review | 24h | 48h |
| Verification | 48h | 72h |
| Draft | 72h | 7 days |
| Preview | 48h | 72h |
| Owner review | 7 days | 14 days |
| Compliance | 24h | 48h |
| Admin approval | 24h | 48h |
| **Total** | **~10 days** | **~30 days** |
