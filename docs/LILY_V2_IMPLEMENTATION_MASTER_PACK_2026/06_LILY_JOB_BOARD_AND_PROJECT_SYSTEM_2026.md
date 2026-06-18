# LILY JOB BOARD AND PROJECT SYSTEM 2026

## 1. Purpose

The Lily Job Board exposes controlled opportunities, not a promise of employment. Public pages show categories and process; personal eligibility, compensation and sensitive details remain inside the authenticated app.

## 2. Project categories

- Content
- Translation
- SEO
- Research
- CMS
- Data Entry
- Brand QA
- Image Processing
- Video Editing
- AI Operations
- Customer Support
- Community Support

## 3. Task lifecycle

```text
draft
→ compliance_review
→ open
→ applications_received
→ assigned
→ in_progress
→ submitted
→ revision_required | accepted | rejected
→ payment_pending | closed
→ archived
```

## 4. Required task fields

- task ID and project ID;
- title and scope VI/EN where public;
- responsible project owner;
- eligibility;
- location: remote / Lily / hybrid;
- compensation: paid / volunteer / learning;
- amount or pricing method where paid;
- deadline and review SLA;
- deliverables;
- acceptance rubric;
- tools/access;
- confidentiality;
- IP ownership/licence;
- portfolio permission;
- work-authorisation requirement;
- dispute route.

## 5. Workflow

```text
Task published
→ Eligible person applies
→ Project owner reviews
→ Written assignment accepted
→ Access granted
→ Delivery submitted
→ Review and revision
→ Acceptance
→ Payment/reward processing
→ Access revoked
→ Portfolio decision
```

## 6. Compensation rules

- Paid tasks use a written amount, milestone or rate basis.
- Volunteer and learning tasks are visibly labelled before acceptance.
- Housing cannot be silently deducted as compensation.
- Resident chores are covered by residency rules, not disguised as project work.
- Payment is triggered only by the accepted-deliverable state unless a different written agreement applies.
- No project owner may promise cash outside approved payment lanes.

## 7. Foreign participant gate

For a foreign resident, a task is classified as:

- `personal_remote_overseas`
- `learning_only`
- `volunteer_review_required`
- `local_paid_work`
- `local_project_activity`

Any local work/activity requiring authorisation remains locked until legal review records `activity_unlock=true`.

## 8. Disputes

A dispute record includes assignment, evidence, review comments, payment state, parties, requested remedy and decision. Project owner cannot delete evidence after a dispute starts.

## 9. Anti-abuse

Blocked patterns:

- fake jobs used to collect passport or money;
- unpaid “trial” replacing substantial paid work;
- payment to apply;
- recruitment discrimination not justified by the role;
- harassment or retaliation;
- AI-generated deliverables presented as human work without disclosure where disclosure is required;
- production access without need.
