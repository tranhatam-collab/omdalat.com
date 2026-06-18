# LILY WEEKLY, MONTHLY AND BUILDER RESIDENCY SYSTEM 2026

## 1. Product catalogue

| Code | Product | Duration | Availability |
|---|---|---:|---|
| `LILY-W1` | Weekly Stay | 7 nights minimum | Pilot first |
| `LILY-W2` | Extended Weekly Stay | 14 nights | After W1 pilot |
| `LILY-M1` | Monthly Stay | 28 nights or written calendar month | Pilot after W1 |
| `LILY-M3` | Extended Residency | 84 nights / 3 months | Legal and capacity review |
| `LILY-BR1` | Builder Residency | 28–90 nights | Programme eligibility required |
| `LILY-CR1` | Contributor Residency | Project-defined | Separate stay and work agreements |

Prices are stored and presented by period, never converted into a public nightly sales price.

## 2. Application state machine

```text
draft
→ submitted
→ identity_review
→ suitability_review
→ interview_required | offer_preparation | declined
→ offer_sent
→ offer_accepted | offer_expired | offer_declined
→ agreement_pending
→ payment_pending
→ pre_arrival
→ checked_in
→ active
→ extension_review | checkout_pending
→ completed | terminated
```

Every transition stores actor, timestamp, reason and evidence reference.

## 3. Weekly workflow

```text
Apply
→ Application review
→ Optional interview
→ Room and weekly scope proposal
→ Agreements
→ Payment confirmation
→ Pre-arrival checklist
→ Check-in and orientation
→ Mid-week check
→ Weekly review
→ Checkout or extension
```

Weekly review covers room condition, community rhythm, safety, workspace use, programme progress and unresolved support issues.

## 4. Monthly workflow

```text
Apply
→ Suitability and identity review
→ Room assignment proposal
→ Monthly plan and full cost disclosure
→ Agreements and deposit/payment
→ Pre-arrival
→ Check-in
→ Weekly reviews
→ Monthly review
→ Extend / Change lane / Exit
```

Monthly plan must state utilities, cleaning, laundry, workspace, kitchen, visitors, garden participation, programme access, refunds, deposit, notice period and prohibited activities.

## 5. Builder Residency

Eligibility requires:

- accepted stay application;
- selected learning or project objective;
- named mentor/project owner;
- written 30/60/90-day output plan;
- weekly review availability;
- no unresolved serious conduct issue;
- legal work gate where relevant.

Builder Residency output examples:

- a working website or documented product;
- a content/SEO operating system;
- a verified local-brand profile;
- a portfolio of accepted digital tasks;
- a project proposal with evidence.

## 6. Room allocation

The allocation engine checks:

- room status;
- verified capacity;
- existing stay overlap;
- maintenance blocks;
- applicant compatibility and accessibility;
- duration and extension probability;
- gender/privacy preferences where lawfully and respectfully collected;
- operator approval.

No two active stays may overlap for the same exclusive room allocation.

## 7. Check-in package

- identity verification;
- signed accommodation terms;
- room inventory and condition record;
- key/access log;
- emergency contact;
- house rules acknowledgement;
- foreign temporary-residence workflow where applicable;
- privacy/photo preference;
- workspace orientation;
- optional programme selection.

## 8. Extension rules

Extensions are not automatic. They require:

- room availability;
- payment/account status;
- conduct and safety review;
- lawful immigration status for foreign residents;
- programme/work eligibility if relevant;
- written updated term.

## 9. Exit workflow

- checkout notice;
- room inspection;
- key return;
- account reconciliation;
- document-retention classification;
- open task/project handoff;
- resident feedback;
- alumni/contributor status decision.

## 10. Cancellation and refund model

The public site must not invent a refund promise. The operator configures a written policy covering:

- cooling-off or review period where applicable;
- cancellation before arrival;
- late cancellation;
- operator cancellation;
- force majeure;
- deposits and damage;
- programme fee separation;
- third-party visa/legal service fees.

The exact policy requires legal and commercial approval before payment production.
