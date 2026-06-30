# Om Dalat — Role Architecture Per Subdomain (Locked)

**Date:** 2026-06-30
**Status:** LOCKED — any change requires founder approval + re-audit
**Supersedes:** ad-hoc role assignments

---

## 1. Role Taxonomy (System-Wide)

These roles are the ONLY valid roles across all `*.omdalat.com` products. Each product selects a subset.

| Role | Scope | Authority |
|------|-------|-----------|
| `system_admin` | All products | Full access to all systems, config, deploys |
| `product_admin` | One product | Full access within one product boundary |
| `reviewer` | One product | Review/approve submissions within product |
| `legal_reviewer` | Legal scope | Review legal documents, compliance, auction terms |
| `privacy_officer` | All products | Consent management, data export/delete, GDPR/PIPL |
| `finance_operator` | Finance scope | Escrow, settlement, billing, refunds |
| `support` | One product | Read-only access to user issues, no data modification |
| `content_editor` | One product | Edit content blocks, articles, translations |
| `translator` | One product | Edit translations only, no publish authority |
| `analyst` | One product | Read-only analytics, no user data access |
| `seller` | Market scope | Own packages, submit evidence, view own offers |
| `buyer` | Market scope | Request access, submit offers, view own data rooms |
| `participant` | Chạm/Dreams scope | Own profile, own dream statements, own evidence |
| `partner` | Lily scope | Own residency, own program ops, own house rules |

---

## 2. Per-Subdomain Role Assignment

### omdalat.com (Root)

| Role | Allowed | Purpose |
|------|---------|---------|
| `system_admin` | ✓ | Site config, deploys, DNS |
| `content_editor` | ✓ | Homepage, navigation, articles |
| `translator` | ✓ | VI/EN translations |
| `analyst` | ✓ | Traffic analytics |
| `privacy_officer` | ✓ | Privacy policy, consent center |

**NOT allowed:** `seller`, `buyer`, `participant`, `partner` — root site is navigation only, not a product.

**Prohibited:** Root must NOT contain marketplace business logic, shared admin panel, or copy of Chạm/Dreams/Market content.

---

### brand.omdalat.com (Brand Factory)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage all seller packages, verification cases |
| `reviewer` | ✓ | Review submitted packages, evidence |
| `legal_reviewer` | ✓ | Review legal documents in packages |
| `seller` | ✓ | Submit packages, submit evidence, view own dashboard |
| `content_editor` | ✓ | Brand Factory info pages |
| `translator` | ✓ | VI/EN translations |
| `support` | ✓ | Help sellers with intake issues |

**NOT allowed:** `buyer`, `participant`, `partner` — Brand Factory is seller-facing only.

**Prohibited:** Brand Factory must NOT process settlement, self-declare ownership, self-activate auction, or act as a full marketplace.

---

### market.omdalat.com (Brand Asset Market)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Approve listings, manage buyer requests, manage data rooms, manage transfers |
| `reviewer` | ✓ | Review listings before approval |
| `finance_operator` | ✓ | Escrow coordination, settlement tracking |
| `seller` | ✓ | View own listings, respond to buyer inquiries |
| `buyer` | ✓ | Browse, request access, submit offers, view granted data rooms |
| `content_editor` | ✓ | Marketplace info pages |
| `translator` | ✓ | VI/EN translations |
| `support` | ✓ | Help buyers/sellers with access issues |
| `analyst` | ✓ | Marketplace analytics (aggregate only, no PII) |

**NOT allowed:** `participant`, `partner` — Market is brand-asset-only, not personal profiles.

**Required additions (Phase 3):**
- Filter (DONE — F3 fix)
- URL query state (DONE — F3 fix)
- Sorting (DONE — F3 fix)
- Pagination (DONE — F3 fix)
- No-result state (DONE — F3 fix)
- Mobile filter drawer (PENDING)
- Accessible labels (PENDING)
- Listing detail true 404 (PENDING — verify)
- Permission model for data room (CRITICAL — see P1 re-audit, IDOR found)

---

### auction.omdalat.com (Auction — Legal-Readiness)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage auction rules, view history (when live) |
| `legal_reviewer` | ✓ | Review auction terms before activation |
| `finance_operator` | ✓ | Escrow, bid deposit, settlement (when live) |
| `buyer` | ✓ | View rules, qualify as bidder (when live) |
| `content_editor` | ✓ | Auction info pages |
| `translator` | ✓ | VI/EN translations |

**NOT allowed (current state):** All write operations are BLOCKED by `AUCTION_LIVE_ENABLED` feature flag (server-side enforced). No bidding, no auction creation, no winner declaration until legal signoff.

**Required before activation:**
- Legal approval record (packet template created, PENDING signoff)
- Bidder KYC/KYB (interface created, PENDING provider)
- Proof of funds
- Escrow integration (interface created, PENDING provider)
- Bid deposit mechanism
- Auction rules published
- Cancellation policy
- Dispute resolution process
- Two-person flag approval (founder + devops)
- Emergency kill switch (documented)
- Immutable bid log
- Load/concurrency test
- Clock synchronization
- Anti-sniping policy
- Rollback (rehearsed)

---

### registry.omdalat.com (Registry)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage verification cases, issue credentials |
| `reviewer` | ✓ | Review evidence, approve verification |
| `legal_reviewer` | ✓ | Review legal documents in registry records |
| `seller` | ✓ | View own package registry records |
| `buyer` | ✓ | View public registry records (provenance, public evidence summary) |
| `content_editor` | ✓ | Registry info pages, methodology documentation |
| `translator` | ✓ | VI/EN translations |
| `analyst` | ✓ | Registry analytics (aggregate only) |

**Guarantees required:**
- Registry does NOT self-create rights — it records verified facts
- Registry does NOT publicize private documents
- Registry does NOT publicize beneficial owner information
- Records are versioned (append-only event log)
- Corrections do NOT delete history
- Revoked credentials display revoked status
- Each public record has its own canonical URL (DONE — F5 fix)
- Non-existent records return true 404 (DONE — F4 fix for auction; registry 404 verified)

---

### cham.omdalat.com (Chạm — Potential Profile)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage platform, review content |
| `reviewer` | ✓ | Review potential profiles, evidence, outcomes |
| `participant` | ✓ | Own profile, own project, own evidence, own outcomes |
| `content_editor` | ✓ | Chạm info pages |
| `translator` | ✓ | VI/EN translations |
| `support` | ✓ | Help participants with profile issues |
| `privacy_officer` | ✓ | Consent management for Chạm-specific data |

**Independence requirements:**
- Separate repo (or clearly separated module)
- Separate database (or clearly partitioned tables with row-level access control)
- Separate consent model
- Separate privacy notice
- Separate admin interface
- Separate analytics property
- Separate email sender identity

**Prohibited:** Chạm must NOT share participant profiles with Dreams, Market, or Brand without specific, per-purpose consent.

**Current status:** BLOCKED — returning HTTP 500. Must fix or retire.

---

### dreams.omdalat.com (Dreams)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage platform, review content |
| `reviewer` | ✓ | Review dream statements (for quality, not approval) |
| `participant` | ✓ | Own dream statements, own dream map, own pathway |
| `content_editor` | ✓ | Dreams info pages |
| `translator` | ✓ | VI/EN translations |
| `support` | ✓ | Help participants |
| `privacy_officer` | ✓ | Consent management for Dreams-specific data |

**Prohibited:**
- Dreams must NOT become a Potential Profile (that's Chạm)
- Dreams must NOT auto-transfer data to Chạm (requires explicit consent)
- Dreams must NOT become a brand directory
- Dreams must NOT publicize stories by default (story consent is separate)

**Current status:** BLOCKED — returning HTTP 500. Must fix or retire.

---

### lily.omdalat.com (Lily Residency)

| Role | Allowed | Purpose |
|------|---------|---------|
| `product_admin` | ✓ | Manage residency, programs, house rules |
| `partner` | ✓ | Own residency ops, schedule, safety incidents |
| `participant` | ✓ | View programs, apply for residency, view own stay |
| `content_editor` | ✓ | Lily info pages, program descriptions |
| `translator` | ✓ | VI/EN translations |
| `support` | ✓ | Help participants with stay issues |
| `privacy_officer` | ✓ | Health/safety data, photo consent, residency eligibility |

**Required content:**
- Staying conditions
- Pricing
- Cancellation policy
- Emergency contact
- House rules
- Privacy notice (residency-specific)
- Safety incident reporting
- Insurance/visa disclaimer
- Participant eligibility criteria
- Content/photo consent (separate from application consent)

**Current status:** LIVE_LIMITED — served by non-production Worker (E3 finding). Must migrate to production Worker or dedicated Worker.

---

### app.omdalat.com (App Shell)

| Role | Allowed | Purpose |
|------|---------|---------|
| `system_admin` | ✓ | Shell config, navigation |
| `privacy_officer` | ✓ | Consent center, data export/delete center |
| `participant` | ✓ | View own connected accounts, notification preferences, referral records |

**Allowed functions:**
- Navigation shell between products
- User consent center (view/manage all consents across products)
- Connected-account status
- Referral records (cross-product, with consent)
- Notification preferences
- Data export/delete center

**Prohibited:**
- Must NOT be a "super app" that aggregates all product data
- Must NOT auto-merge profiles between products
- Must NOT store product-specific business data

**Current status:** LIVE_LIMITED — hosted in different Cloudflare account (E1 finding). Must consolidate.

---

### api.omdalat.com (API)

| Role | Allowed | Purpose |
|------|---------|---------|
| `system_admin` | ✓ | All API routes |
| `product_admin` | ✓ | Routes within their product namespace |
| All product roles | ✓ | Routes within their product namespace + role scope |

**Required namespace structure:**
```
/api/brand/*       — Brand Factory routes
/api/market/*      — Market routes
/api/registry/*    — Registry routes
/api/auction/*     — Auction routes
/api/cham/*        — Chạm routes (when built)
/api/dreams/*      — Dreams routes (when built)
/api/lily/*        — Lily routes (when built)
/api/identity/*    — Cross-product identity + consent
```

**Current state:** All BAN routes are under `/api/omdalat/*` — should be reorganized into product namespaces.

**Required per-route:**
- Auth (requireAuth or public)
- Role check (requireSuper, requireRole, or ownership check)
- Rate limit
- Input validation
- Audit event
- CORS scoped to allowed origins
- Version header in response

---

## 3. Cross-Product Role Constraints

| Constraint | Rule |
|-----------|------|
| A seller in Market | Can also be a participant in Chạm, but profiles are SEPARATE |
| A buyer in Market | Can also be a participant in Dreams, but dream data is NOT shared with Market |
| A product_admin for Brand | Cannot access Market admin unless also assigned Market product_admin |
| A reviewer | Cannot approve their own submission |
| A legal_reviewer | Cannot approve auction terms they drafted (dual approval required) |
| A finance_operator | Cannot initiate escrow without product_admin approval |
| A privacy_officer | Can access consent records but NOT product business data |

---

## 4. Enforcement Mechanism

| Layer | Mechanism |
|-------|-----------|
| API | `requireAuth` + `requireSuper` + `requireBrandAccess` + (NEW) `requireRole` + (NEW) `requireOwnership` |
| Renderer | Server-side auth check before rendering admin shells (PENDING — currently client-side only) |
| Database | Row-level access control via `owner_email` columns (PENDING) |
| Cloudflare | Access policy for admin routes (PENDING — not yet configured) |
| Audit | Every role-gated action logged in `asset_audit_events` with actor + role |

---

## 5. Migration Plan

1. **Phase 2 (immediate):** Add `requireOwnership` to offers + evidence + data room access
2. **Phase 2 (immediate):** Fix data room IDOR (remove X-Buyer-Email header, use authenticated session)
3. **Phase 5:** Build consent registry with per-purpose consent
4. **Phase 6:** Add `requireRole` middleware for all admin routes
5. **Phase 7:** Move from `.omdalat.com` cookie to per-subdomain cookies
6. **Phase 8:** Add passkey/MFA for system_admin + product_admin
