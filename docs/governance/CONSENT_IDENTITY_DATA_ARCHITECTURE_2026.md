# Om Dalat — Consent, Identity, and Data Architecture (Cross-Product)

**Date:** 2026-06-30
**Status:** DESIGN — implementation pending (Phase 5)
**Scope:** All `*.omdalat.com` products

---

## 1. Core Principle

**"Product independence" does NOT mean each site creates weak auth.**

It means:
- Each product has its own business data
- Each product has its own consent model
- Identity is shared (one user, one account) but DATA is NOT shared without explicit consent
- Cross-product data transfer is a deliberate, consented, audited event

---

## 2. Identity Architecture

### 2.1 Central Identity (Shared)

A single identity table shared across all products. One user, one account, one login.

```
central_identity
├── id (uuid, immutable)
├── email (unique, verified)
├── phone (optional, verified)
├── display_name
├── locale (vi | en)
├── mfa_enabled (boolean)
├── passkey_credentials (json array)
├── created_at
├── last_login_at
├── account_status (active | suspended | deleted)
└── deletion_requested_at (nullable)
```

**What's shared:** Identity only (who you are).
**What's NOT shared:** Any product-specific personal or business data.

### 2.2 Per-Product Profiles

Each product has its own profile table, linked to central_identity by `identity_id`.

```
cham_profiles          (participant data — projects, evidence, outcomes)
dreams_profiles        (dream statements, dream maps, pathways)
market_seller_profiles (packages, listings, evidence submissions)
market_buyer_profiles  (buyer requests, offers, data room access)
lily_participant_profiles (residency applications, stay history)
brand_factory_profiles (seller intake, package build status)
```

**Rule:** A user can have a profile in zero, one, or many products. Having a profile in one product does NOT automatically create a profile in another.

### 2.3 Authentication

| Requirement | Status | Priority |
|-------------|--------|----------|
| Session token (Bearer) | DONE | — |
| Session expiry | DONE | — |
| is_active check | DONE | — |
| Passkey/MFA for admin | PENDING | P1 |
| Session rotation | PENDING | P2 |
| Short-lived admin sessions (15 min) | PENDING | P2 |
| CSRF protection | PENDING | P1 |
| Secure cookie attributes (HttpOnly, Secure, SameSite=Strict) | PENDING | P1 |
| Per-subdomain cookie (NOT .omdalat.com wildcard) | PENDING | P1 |
| No localStorage tokens for sensitive permissions | PENDING | P1 |
| No shared admin token | PENDING | P1 |

### 2.4 Cookie Domain Scoping

**Current (WRONG):** `COOKIE_DOMAIN=.omdalat.com` — cookie shared across ALL subdomains.

**Required:** Each product sets its own cookie:
- `api.omdalat.com` → cookie domain `api.omdalat.com`
- `brand.omdalat.com` → cookie domain `brand.omdalat.com`
- `market.omdalat.com` → cookie domain `market.omdalat.com`

**Exception:** `app.omdalat.com` (consent center) may use `.omdalat.com` cookie to provide cross-product SSO, but this cookie must be a lightweight session pointer only — NOT an auth token.

---

## 3. Consent Architecture

### 3.1 Consent Registry

A central consent registry tracks every consent grant. Each consent is per-purpose, per-product.

```
consent_registry
├── id (uuid)
├── identity_id (fk → central_identity)
├── product (brand | market | auction | registry | cham | dreams | lily | app)
├── purpose (enum — see 3.2)
├── granted_at
├── granted_via (checkbox | settings_page | api)
├── expires_at (nullable)
├── revoked_at (nullable)
├── revocation_reason (nullable)
├── consent_text_version (fk → consent_text_versions)
└── audit_correlation_id
```

### 3.2 Consent Purposes (Per-Purpose, NEVER "Agree to All")

| Purpose | Products | Description |
|---------|----------|-------------|
| `application` | All | Basic account creation and service delivery |
| `marketing` | All | Marketing emails, newsletters |
| `story_publication` | Chạm, Dreams | Publishing user's story publicly |
| `ai_processing` | All | AI analysis of user-submitted content |
| `referral` | All | Referring user to another product |
| `cross_product_transfer` | All | Transferring data from one product to another |
| `data_room_access` | Market | Accessing seller's data room |
| `legal_document_processing` | Market, Brand | Processing legal documents for brand transfer |
| `organization_introduction` | Market | Introducing buyer to seller organization |
| `credential_issuance` | Registry | Issuing verifiable credential |
| `photo_content` | Lily | Using participant photos for marketing |
| `residency_application` | Lily | Processing residency application |
| `health_safety` | Lily | Processing health/safety data for residency |

**Rule:** Each consent is granted individually. No "I agree to all" checkbox. No bundled consent.

### 3.3 Consent Text Versioning

Every consent purpose has versioned text. When text changes, users must re-consent.

```
consent_text_versions
├── id (uuid)
├── purpose (enum)
├── product (enum)
├── version (semver)
├── text_vi (text)
├── text_en (text)
├── effective_date
└── active (boolean)
```

### 3.4 Consent Flow

```
User visits product
→ Product checks consent_registry for required purposes
→ If missing: show consent screen (per-purpose checkboxes)
→ User grants/denies each purpose
→ Consent recorded with text version
→ Product proceeds only with granted purposes
→ User can revoke anytime via app.omdalat.com consent center
→ Revocation propagates to all products within 24h
```

### 3.5 Cross-Product Transfer Flow

```
Source product proposes transfer
→ User sees exact fields being transferred
→ User grants cross_product_transfer consent (one-time, per-transfer)
→ Destination product accepts
→ Transfer event recorded in consent_registry + audit log
→ User can revoke where applicable (note: some transfers are irreversible —
   e.g., once a credential is issued, revocation means "revoked" not "deleted")
```

---

## 4. Data Architecture

### 4.1 Data Classification

| Layer | What | Shared? | Example |
|-------|------|---------|---------|
| Shared identity identifiers | User ID, email | YES (central_identity) | `identity_id: uuid-123` |
| Product-specific personal data | User's profile in that product | NO | Chạm project, Dreams dream map |
| Product-specific business data | Business records | NO | Market listings, Brand packages |
| Cross-product referral records | "User X was referred from Dreams to Chạm" | YES (with consent) | `referral_records` table |
| Central consent references | Consent grants | YES (consent_registry) | "User granted story_publication for Dreams" |
| Central audit correlation IDs | Audit event IDs | YES (for cross-product audit) | `audit_correlation_id` |

### 4.2 What Must NOT Be Shared Directly

| Data | Owner Product | Cannot be accessed by |
|------|--------------|----------------------|
| Dream Statement | Dreams | Market, Brand, Registry |
| Potential Profile | Chạm | Dreams, Market, Brand |
| Personal evidence | Chạm | Market, Brand |
| Buyer financial proof | Market | Chạm, Dreams, Lily |
| Seller legal documents | Market/Brand | Chăm, Dreams, Lily |
| Residency health/safety data | Lily | ALL other products |
| Data room files | Market | ALL other products (even Market admin needs explicit grant) |

### 4.3 Database Schema Strategy

**Option A (current): Single D1 database `omdalat-core` with all tables**

Pros: Simple, no cross-database joins needed
Cons: No physical isolation, all products share one database

**Option B (recommended): Separate D1 databases per product**

```
omdalat-identity    — central_identity, consent_registry, admin_sessions
omdalat-brand       — asset_packages, rights_evidence, verification_cases
omdalat-market      — marketplace_listings, asset_offers, data_rooms, buyer_requests
omdalat-auction     — auctions, bids, auction_events
omdalat-registry    — registry_events, credentials
omdalat-cham        — cham_profiles, cham_projects, cham_evidence
omdalat-dreams      — dreams_profiles, dream_statements, dream_maps
omdalat-lily        — lily_profiles, residency_applications, safety_incidents
```

Pros: Physical isolation, per-product backup/restore, per-product access control
Cons: Cross-product queries require API calls, not SQL joins

**Recommendation:** Option B, but only when product count grows beyond 3 active products. For now, use Option A with strict table naming convention (`cham_*`, `dreams_*`, `lily_*`, `market_*`, `brand_*`, `auction_*`, `registry_*`) and row-level access control.

### 4.4 Access Control at Data Layer

Every product-specific table must have:
```sql
owner_identity_id TEXT,    -- who owns this row
product TEXT,              -- which product this belongs to
created_at TEXT,
updated_at TEXT,
```

Access pattern:
```sql
-- Seller viewing their own packages
SELECT * FROM asset_packages WHERE owner_identity_id = ? AND product = 'brand';

-- Buyer viewing their own offers
SELECT * FROM asset_offers WHERE buyer_identity_id = ? AND product = 'market';

-- Admin viewing all (requires requireSuper)
SELECT * FROM asset_packages WHERE product = 'brand';
```

---

## 5. Privacy Rights Implementation

### 5.1 Data Export (GDPR/PIPL Right to Access)

```
User requests export via app.omdalat.com
→ privacy_officer reviews
→ Export job queries all product databases for owner_identity_id = user
→ Export includes: identity, all profiles, all consent records, all audit events
→ Export delivered as signed JSON + PDF summary
→ Export event logged in audit
```

### 5.2 Data Deletion (Right to Erasure)

```
User requests deletion via app.omdalat.com
→ privacy_officer reviews
→ Soft delete: account_status = 'deleted', deletion_requested_at = now
→ 30-day grace period (user can cancel)
→ Hard delete after grace period:
   - Delete central_identity record
   - Delete all product profiles
   - Delete consent records
   - Anonymize audit events (keep event, remove identity_id)
   - DO NOT delete: legal records (trademark assignments, contracts) — these are
     legally required to retain. Anonymize instead.
→ Deletion event logged in audit (with anonymized identity)
```

### 5.3 Consent Revocation

```
User revokes consent via app.omdalat.com
→ consent_registry.revoked_at = now
→ Propagation: all products check consent_registry before using data
→ Within 24h: data related to revoked consent is no longer used
→ Note: already-processed data (e.g., already-published story) may require
  separate takedown request
```

---

## 6. Implementation Priority

| Phase | Task | Priority |
|-------|------|----------|
| Phase 2 | Fix data room IDOR (remove X-Buyer-Email, use session) | P0 |
| Phase 2 | Add ownership checks to offers + evidence | P1 |
| Phase 5 | Build central_identity table | P1 |
| Phase 5 | Build consent_registry table | P1 |
| Phase 5 | Build consent_text_versions table | P1 |
| Phase 5 | Build per-purpose consent UI | P1 |
| Phase 5 | Build consent center at app.omdalat.com | P2 |
| Phase 5 | Implement cross-product transfer flow | P2 |
| Phase 5 | Implement data export | P2 |
| Phase 5 | Implement data deletion (soft + hard) | P2 |
| Phase 7 | Move from .omdalat.com cookie to per-subdomain cookies | P1 |
| Phase 7 | Add passkey/MFA for admin | P1 |
| Phase 7 | Add CSRF protection | P1 |
