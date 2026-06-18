# 10 — BRAND OMDALAT RELEASE GATES AND EVIDENCE PACKET 2026

**Status:** LOCKED  
**Date:** 2026-06-18  

---

## 1. Release Gates

A brand CANNOT be published unless ALL gates pass.

### Gate 1: Owner Consent

- [ ] Digital consent form signed
- [ ] Consent logged in DB with timestamp
- [ ] Evidence: consent screenshot or digital signature

### Gate 2: Identity Verification

- [ ] Owner identity verified (phone/Zalo call)
- [ ] Business location verified (cross-check Google Maps)
- [ ] Evidence: verification call log or message screenshot

### Gate 3: Image Rights

- [ ] All photos have rights_status = 'cleared'
- [ ] No photos of people without consent
- [ ] Evidence: rights checklist signed by owner

### Gate 4: Content Completeness

- [ ] All content blocks present (hero, story, location, contact, etc.)
- [ ] Both VI and EN versions complete
- [ ] No placeholder text
- [ ] Evidence: content completeness report

### Gate 5: SEO Readiness

- [ ] Meta tags complete
- [ ] Schema markup present
- [ ] hreflang links correct
- [ ] OG image exists
- [ ] Evidence: SEO checklist

### Gate 6: Accessibility

- [ ] All images have alt text
- [ ] WCAG 2.1 AA minimum
- [ ] Keyboard navigation works
- [ ] Evidence: accessibility report

### Gate 7: Owner Review

- [ ] Owner reviewed preview microsite
- [ ] Owner explicitly approved
- [ ] Evidence: owner approval log

### Gate 8: Compliance

- [ ] No privacy risks
- [ ] No legal issues
- [ ] Disclaimers present
- [ ] Evidence: compliance report

### Gate 9: Admin Approval

- [ ] Admin reviewed entire evidence packet
- [ ] Admin explicitly approved
- [ ] Evidence: admin approval log

---

## 2. Evidence Packet Structure

```
evidence/{brand_id}/
├── 01_intake/
│   └── intake_form.json
├── 02_consent/
│   └── owner_consent.pdf (or digital log)
├── 03_verification/
│   ├── identity_verification_log.json
│   └── location_verification.json
├── 04_content/
│   ├── content_blocks_vi.json
│   ├── content_blocks_en.json
│   └── content_completeness_report.json
├── 05_seo/
│   ├── meta_tags.json
│   ├── schema_markup.json
│   └── seo_checklist.json
├── 06_images/
│   ├── photo_inventory.json
│   └── rights_checklist.json
├── 07_accessibility/
│   └── accessibility_report.json
├── 08_owner_review/
│   └── owner_approval.json
├── 09_compliance/
│   └── compliance_report.json
├── 10_admin/
│   └── admin_approval.json
└── 11_qa/
    └── qa_final_report.json
```

---

## 3. Release Command

```bash
# Admin triggers publish
POST /api/omdalat/brands/{brand_id}/publish-request
Headers: Authorization: Bearer {admin_token}

# System checks all gates
# If all pass → status = published
# If any fail → return error with gate name
```

---

## 4. Post-Publish Monitoring

| Check | Frequency | Owner |
|-------|-----------|-------|
| Site live | Immediate | DevOps |
| OG image visible | 1 hour | SEO |
| Google indexing | 7 days | SEO |
| Owner feedback | 30 days | Content |
| Photo rights re-audit | Quarterly | Compliance |
| Content freshness | Quarterly | Content |

---

## 5. Emergency Unpublish

If any of the following occurs, brand is unpublished immediately:

- Owner revokes consent
- Legal complaint received
- Photo rights dispute
- False information discovered
- Safety concern reported

Unpublish process:
1. Set status → 'unpublished'
2. Replace live site with holding page
3. Log reason in audit
4. Notify owner within 24h
5. Fix issue
6. Re-run gates
7. Re-publish
