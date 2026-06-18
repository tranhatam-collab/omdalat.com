# LILY QA, RELEASE GATES AND EVIDENCE PACKET 2026

## 1. Release levels

- `HOLD` — internal documents only.
- `PUBLIC_INFORMATION` — bilingual information, no application.
- `APPLICATION_PREVIEW` — expression of interest; no confirmed stay.
- `CONTROLLED_WEEKLY_PILOT` — one verified weekly cohort.
- `CONTROLLED_MONTHLY_PILOT` — limited monthly residents.
- `WEEKLY_MONTHLY_PRODUCTION` — stay operation passed.
- `LEARN_WORK_PRODUCTION` — programmes/tasks passed.
- `INTERNATIONAL_COORDINATION` — international support and legal gates passed.

## 2. P0 — domain and truth

- [ ] Lily removed from Brand Portal homepage identity.
- [ ] Lily canonical domain and route map configured.
- [ ] No daily price or daily booking.
- [ ] No visa/work/income guarantee.
- [ ] VI/EN copy approved.
- [ ] Operating/payment entity disclosed accurately.

## 3. P1 — property and rooms

- [ ] Property authority verified.
- [ ] Five physical rooms verified.
- [ ] Capacity and amenities verified per room.
- [ ] Shared spaces and garden verified.
- [ ] Real images and rights verified.
- [ ] Safety evidence reviewed.
- [ ] Maintenance and availability logic tested.

## 4. P2 — application and stay

- [ ] Public application works.
- [ ] Secure account/document request works.
- [ ] Offer and expiry work.
- [ ] No overlapping room allocation.
- [ ] Agreement and payment work.
- [ ] Arrival/check-in/check-out work.
- [ ] Foreign temporary-residence process tested.
- [ ] Extension, cancellation and refund states tested.

## 5. P3 — privacy and security

- [ ] Restricted document storage encrypted.
- [ ] Least-privilege role tests passed.
- [ ] Access logs verified.
- [ ] Signed/short-lived download URLs.
- [ ] Retention and deletion workflow configured.
- [ ] Breach/incident drill completed.
- [ ] AI access to resident data blocked by default.

## 6. P4 — learning and work

- [ ] Each live track has objective, content, assignment, rubric and reviewer.
- [ ] Task compensation is explicit.
- [ ] IP/confidentiality terms exist.
- [ ] Access expires after task.
- [ ] Accepted deliverable controls payment eligibility.
- [ ] Foreign work lock cannot be bypassed.
- [ ] Dispute workflow tested.

## 7. P5 — international support

- [ ] Public disclaimer reviewed.
- [ ] Qualified provider/referral record exists where used.
- [ ] Sponsor entity evidence exists where used.
- [ ] Case access controls tested.
- [ ] Expiry/revalidation alerts tested.
- [ ] Temporary-residence evidence recorded without over-collection.

## 8. End-to-end QA journeys

1. Vietnamese weekly applicant.
2. Monthly learner.
3. International stay-only resident.
4. International resident interested in local project work; work remains locked.
5. Approved work-authorisation case; task unlocks.
6. Refused/expired legal case; task locks automatically.
7. Room maintenance during offer.
8. Consent withdrawal and image unpublish.
9. Incident and emergency response.
10. Brand Portal migration and SEO duplicate check.

## 9. Evidence packet

Every release packet contains:

- release ID and level;
- deployed URLs;
- commit SHA;
- DB migration versions;
- screenshots VI/EN/mobile;
- room inventory export;
- evidence and legal-review status;
- application video;
- role/access test;
- room-overlap test;
- payment/refund test;
- passport privacy test;
- temporary-residence dry run;
- task work-lock test;
- incident drill;
- sitemap/canonical/hreflang report;
- rollback proof;
- Admin approval;
- Founder audit note.

## 10. Automatic FAIL conditions

- Lily remains the Brand Portal homepage identity.
- Nightly pricing or daily booking is public.
- A room is marketed with duplicated or unverified image.
- Passport is accepted publicly or exposed in logs.
- Foreign local work can be assigned without legal gate.
- Website promises visa, permit, employment or income.
- Payment entity or terms are missing.
- No rollback or audit trail.
