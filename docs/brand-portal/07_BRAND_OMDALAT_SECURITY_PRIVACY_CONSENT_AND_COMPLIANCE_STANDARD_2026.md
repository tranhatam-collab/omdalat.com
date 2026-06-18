# 07 — BRAND OMDALAT SECURITY PRIVACY CONSENT AND COMPLIANCE STANDARD 2026

**Status:** LOCKED  
**Date:** 2026-06-18  
**Classification:** Internal — Legal Review Required

---

## 1. Consent Framework

### Owner Consent

Before any brand is published, the owner must explicitly consent to:

- [ ] Display of business name, address, and contact on public website
- [ ] Use of provided photos on brand microsite and Om Dalat properties
- [ ] Inclusion in Om Dalat brand network and case studies
- [ ] Bilingual (VI + EN) publication of brand content
- [ ] SEO indexing by search engines
- [ ] Future international language expansion

### Consent Process

1. Digital consent form sent to owner via Zalo/email
2. Owner reviews preview microsite
3. Owner clicks "I consent" with timestamp
4. Consent logged in `owners.consent_status = 'signed'`
5. Evidence packet archived

### Consent Revocation

- Owner can revoke consent at any time
- Revocation triggers:
  - Brand status → `unpublished`
  - Microsite → holding page
  - Content → retained for 30 days then deleted
  - Evidence packet → retained for legal purposes

---

## 2. Privacy Standards

### Data Minimization

| Data | Public | Internal Only | Deleted After |
|------|--------|---------------|---------------|
| Business name | ✅ | | Never |
| Address | ✅ | | Never |
| Phone | ✅ (optional) | | Owner request |
| Owner name | ✅ (display name only) | | Owner request |
| Owner personal phone | | ✅ | Brand unpublish + 30d |
| ID documents | | ✅ | Verification + 30d |
| Financial info | ❌ | ❌ | Never collected |

### Photo Rights

- Every photo must have `rights_status`: pending, cleared, disputed
- Owner must confirm they own rights or have permission
- No photos of people without consent
- No photos of children without parental consent
- Disputed photos → immediate removal

---

## 3. Compliance Checklist

### Pre-Publish Checklist

- [ ] Owner consent signed and logged
- [ ] Identity verified (phone/Zalo call)
- [ ] Location verified (cross-check Google Maps)
- [ ] Photo rights cleared for all images
- [ ] No personal info exposed publicly
- [ ] Business name does not infringe trademarks
- [ ] Content is factual (no false claims)
- [ ] Accessibility: alt text on all images
- [ ] Accessibility: WCAG 2.1 AA minimum
- [ ] Bilingual: both VI and EN complete
- [ ] SEO: no black-hat techniques
- [ ] Legal: no promises of revenue or booking guarantees

### Ongoing Compliance

- [ ] Annual owner re-consent
- [ ] Quarterly photo rights audit
- [ ] Monthly dead link check
- [ ] Immediate response to owner complaints
- [ ] 24h response to takedown requests

---

## 4. Audit Log

Every action must be logged:

```
audit_logs
├── id: TEXT PK
├── brand_id: TEXT FK
├── actor: TEXT (who did it)
├── action: TEXT (what happened)
├── details: TEXT (JSON)
├── timestamp: DATETIME
└── ip_address: TEXT
```

Actions to log:
- Intake submission
- Owner consent sign
- Content changes
- Status changes
- Publish/unpublish
- Photo additions/removals
- Approval/rejection
- Owner complaints

---

## 5. Rollback Procedure

1. Identify reason for rollback
2. Log rollback decision in audit
3. Set brand status → `unpublished`
4. Replace live microsite with holding page
5. Notify owner within 24 hours
6. Fix issues
7. Re-run compliance check
8. Re-publish with new approval

---

## 6. Legal Disclaimers

**On every brand microsite footer:**

VI:
"Thông tin trên trang này được cung cấp bởi chủ cơ sở và được Ôm Đà Lạt hỗ trợ xuất bản. Ôm Đà Lạt không chịu trách nhiệm về chất lượng dịch vụ của cơ sở."

EN:
"Information on this page is provided by the business owner and published with support from Om Dalat. Om Dalat is not responsible for the quality of services provided by this establishment."

**On brand.omdalat.com:**

VI:
"Om Dalat Brand System Portal là hệ thống hỗ trợ xây dựng thương hiệu. Chúng tôi không đại diện cho bất kỳ thương hiệu con nào."

EN:
"Om Dalat Brand System Portal is a brand-building support system. We do not represent any individual brand."
