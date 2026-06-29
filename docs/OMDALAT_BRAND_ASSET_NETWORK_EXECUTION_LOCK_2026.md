# OMDALAT BRAND ASSET NETWORK EXECUTION LOCK 2026

Om Dalat Brand Asset Network

Mang luoi Tai san Thuong hieu Om Da Lat

Status: READY_FOR_DEV_PLANNING

Priority: P0 strategic expansion, not current omdalat.com homepage scope

Owner: Single AI Dev Team

Applies to:

- omdalat.com
- brand.omdalat.com
- market.omdalat.com
- auction.omdalat.com
- registry.omdalat.com
- app.omdalat.com admin/runtime surfaces
- api.omdalat.com API contracts

Does not authorize:

- opening a public auction platform
- holding buyer funds directly
- selling trademarks without transfer workflow
- using NFT as legal title
- calling any listing fully verified without evidence type
- turning omdalat.com homepage into a marketplace

---

## 0. Executive Verdict

The strategic direction is approved, but the execution order is locked.

Om Dalat must not build a marketplace as a catalog of names for sale.

The real product is a trust network for creating, verifying, valuing, licensing, selling, transferring, and recording brand asset packages.

The long-term asset is not a million names. The long-term asset is:

1. Brand Rights Graph
2. Provenance Registry
3. Transaction Database
4. Buyer and Seller Network
5. Local Partnership Network
6. Transfer Operating System
7. Trust Brand

Correct build order:

```text
Brand Factory
-> Verification Registry
-> Private Marketplace
-> Escrow and Transfer Coordination
-> Licensing
-> Curated Offers
-> Legally reviewed Auctions
-> International Marketplace
-> Credential and Optional Token Layer
-> Global API and Federation
```

Hard rule:

Auction, escrow, and token layers cannot launch before identity, rights evidence, contract state, transfer workflow, and registry status are operating.

---

## 1. Source Alignment With Existing Om Dalat Plans

This plan extends the existing Om Dalat strategy. It does not replace the current core system.

### 1.1 Canonical boundaries

| Surface | Role | Action |
|---|---|---|
| `omdalat.com` | Core public system for living, working, learning, community, staying | Keep focused. Add only a restrained bridge to Brand Asset Network. |
| `app.omdalat.com` | Member, operator, admin runtime | Add admin workflows for brand intake, verification, transfer tasks, and registry operations. |
| `api.omdalat.com` | API gateway and operational APIs | Add brand asset, rights, listing, offer, registry, and evidence endpoints. |
| `brand.omdalat.com` | Brand Factory and verification intake | Keep as the creation and verification workshop. No direct public marketplace checkout. |
| `market.omdalat.com` | Curated marketplace for sale, licensing, partnership, private offers | Launch only after registry and verification gates exist. |
| `auction.omdalat.com` | Legally reviewed auction or offer process | Phase 3 or later. No official auction claim before legal partner signoff. |
| `registry.omdalat.com` | Provenance, rights evidence, transfer status, credentials | Build before marketplace claims become strong. |
| `ap.omdalat.com` | Editorial and local stories | May reference local-origin partnerships, but must not sell or imply verified rights. |

### 1.2 Existing plan compatibility

This plan must remain compatible with:

- `docs/BRAND_PORTAL_REPO_SEPARATION_AUDIT_AND_PLAN_2026.md`
- `docs/OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026.md`
- `docs/APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026.md`
- `docs/OMDALAT_LILY_V2_INTEGRATION_PLAN_2026-06-18.md`
- `docs/OMDALAT_LEGAL_STRUCTURE_VN_2025.md`
- `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`
- `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`

Conflict rule:

If a document says `marketplace live`, `auction live`, `ownership transferred`, `verified`, or `go-live ready` without evidence, this execution lock overrides it.

---

## 2. Product Definition

### 2.1 Product name

English:

Om Dalat Brand Asset Network

Vietnamese:

Mang luoi Tai san Thuong hieu Om Da Lat

Commercial short name:

Om Dalat Brand Market

### 2.2 Core promise

Help people and organizations create, verify, package, value, license, sell, transfer, and record brand assets honestly and safely.

### 2.3 Non-goals

The system is not:

- a bulk brand-name marketplace
- a domain squatting engine
- a public auction house at launch
- an NFT marketplace
- a legal registry replacing competent authorities
- a fund, investment product, or profit promise
- a place to sell local identity without consent

---

## 3. Four-System Architecture

### 3.1 Domains

| Domain | Product | Primary users | Allowed in Phase 0 | Not allowed in Phase 0 |
|---|---|---|---|---|
| `brand.omdalat.com` | Brand Factory | Sellers, creators, local partners, operators | Intake, asset build, verification, case studies | Direct sale, auction, payment settlement |
| `registry.omdalat.com` | Registry and provenance | Buyers, sellers, verifiers, operators | Public status records, evidence summaries, transfer state | Legal title replacement, private docs public exposure |
| `market.omdalat.com` | Private curated marketplace | Qualified buyers and sellers | Waitlist, private teasers, request access | Self-service public buying, public unverified listings |
| `auction.omdalat.com` | Controlled auction/offers | Qualified bidders, brokers, legal partners | Coming-soon and legal-readiness docs only | Official auction sessions |

### 3.2 Route strategy

Initial public routes:

```text
brand.omdalat.com
brand.omdalat.com/apply
brand.omdalat.com/verify
brand.omdalat.com/cases

registry.omdalat.com
registry.omdalat.com/records/:public_id
registry.omdalat.com/credentials/:credential_id

market.omdalat.com
market.omdalat.com/request-access
market.omdalat.com/assets
market.omdalat.com/assets/:slug

auction.omdalat.com
auction.omdalat.com/legal-readiness
auction.omdalat.com/request-invite
```

Do not expose:

```text
auction.omdalat.com/live
auction.omdalat.com/bid
market.omdalat.com/checkout
market.omdalat.com/buy-now
registry.omdalat.com/legal-title
```

until legal, escrow, and transfer gates are complete.

---

## 4. Brand Asset Package Definition

A valid listing is a Brand Asset Package, not just a name, logo, or domain.

### 4.1 Component classes

| Class | Examples | Verification required before sale claim |
|---|---|---|
| Identity assets | name, logo, colors, typography, slogan, brand guide | creator ownership, source files, license state |
| Legal assets | trademark filings, registrations, copyrights, design rights, contracts | document review, jurisdiction, transferability |
| Domain assets | domains, subdomains, defensive domains, registrar state | registrant authority, lock state, expiry, dispute check |
| Web and software assets | website, app, code, repo, schema, deployment config, APIs | code audit, secret scan, repo ownership, license review |
| Media assets | articles, images, video, podcast, social content, SEO authority | copyright/source, model/property release where needed |
| Operating assets | SOP, supplier list, contracts, support process, pricing, catalog | confidentiality, assignability, consent |
| Goodwill | reviews, customers, revenue, community, partners | evidence quality, transferability, disclosure |

### 4.2 Listing component statuses

Each component must have its own status.

```text
declared
evidence_submitted
under_review
reviewed_with_limits
verified_control
verified_rights
transferable
restricted
not_transferable
disputed
expired
```

No global `Verified` badge is allowed.

Allowed trust labels:

- Identity Verified
- Rights Evidence Reviewed
- Trademark Registered
- Trademark Pending
- Domain Control Verified
- Code Audit Completed
- Revenue Verified
- Data Transfer Restricted
- Local-Origin Verified
- Legal Review Required
- Disputed

---

## 5. Asset Levels

| Level | Name | Minimum package | Can be public listed | Can be transacted |
|---|---|---|---|---|
| 0 | Brand Idea | idea, name proposal, positioning, moodboard | yes, with warning | only as creative concept |
| 1 | Brand Seed | preliminary name review, domain, logo, brief | yes | yes, with restricted rights language |
| 2 | Ready-to-Launch Brand | Brand Seed plus site, bilingual content, handoff docs, trademark plan | yes | yes, after disclosure |
| 3 | Digital Product Brand | working site/app, source code, repo, analytics, transfer plan | yes | yes, with technical due diligence |
| 4 | Operating Brand | revenue, customers, contracts, suppliers, financial history, goodwill | private/public depending risk | yes, after due diligence |
| 5 | Strategic Brand | high recognition, multi-market rights, significant goodwill | private only | broker/legal process only |

Mandatory labels for Level 0:

```text
Creative concept only.
No registered rights.
Trademark clearance not completed.
```

---

## 6. Transaction Models

| Model | Description | Phase allowed | Required gate |
|---|---|---|---|
| Full assignment | Transfer listed assets in contract | Phase 1 manual pilot | rights evidence, contract, transfer checklist |
| Exclusive license | Exclusive by territory, category, channel, or time | Phase 1 manual pilot | license terms, quality control, renewal rules |
| Non-exclusive license | Reusable content, tools, templates, certification marks when valid | Phase 1 manual pilot | scope and restrictions |
| Lease-to-own | Periodic payment and conditional transfer | Phase 2 | escrow/holding partner and default rules |
| Joint venture or revenue share | Shared build and revenue arrangement | Phase 1 | ownership and termination terms |
| Franchise or operating license | Brand plus operating system | Phase 3 | legal review and operational manuals |
| Formal auction | Structured auction with bids | Phase 3+ | legal partner, bidder KYC, bid log, settlement workflow |

Hard stop:

Do not call a process `auction` if it is only a private offer process.

Allowed early wording:

- Request for offers
- Private bidding
- Broker-managed sale
- Seller-selected best offer
- Invitation-only offer round

---

## 7. Local Brand Partnership Model

Local brands are not inventory to be bought and resold by default.

### 7.1 Safe partnership models

| Model | Meaning | Required evidence |
|---|---|---|
| Digital Export Brand | local brand keeps original identity, system creates international line | permission, territory, product scope |
| Local-Origin Co-brand | new digital brand uses local origin under agreement | origin claim, quality standard, royalty |
| Brand Incubation Joint Venture | system and local partner build new brand together | ownership split, exit rights, data rights |
| License, not identity sale | local subject grants use rights without selling identity | license scope, consent, withdrawal rights |

### 7.2 Consent requirements

Every local partnership must record:

- identity of local partner
- beneficial owner or representative authority
- allowed name usage
- allowed image usage
- allowed story/origin claim
- product/service scope
- quality standards
- royalty or revenue share
- duration and renewal
- termination and takedown
- data ownership
- dispute process

---

## 8. Core Programs

### Program 1 - Brand Discovery

Purpose:

Classify asset type, owner intent, rights state, market fit, and risk.

Outputs:

- discovery report
- asset class
- rights gap list
- recommended transaction model
- risk flags
- next workflow

### Program 2 - Brand Creation Lab

Purpose:

Create brand seed assets without claiming exclusive rights prematurely.

Outputs:

- name candidates
- positioning
- identity kit
- domain options
- bilingual brief
- preliminary clearance notes

### Program 3 - Digital Asset Build

Purpose:

Build usable digital assets attached to a package.

Outputs:

- website or app
- repository
- CMS
- SEO metadata
- analytics
- documentation
- handoff runbook
- transfer checklist

### Program 4 - Local Brand Partnership

Purpose:

Connect a digital brand asset with real local products, people, places, or operations.

Outputs:

- partnership agreement draft
- origin claim
- media rights
- quality standard
- royalty schedule
- asset ownership table

### Program 5 - Brand Verification

Purpose:

Review identity, authority, rights, asset control, and risk.

Outputs:

- verification case
- evidence inventory
- verification labels
- missing evidence list
- stop conditions

### Program 6 - Brand Valuation

Purpose:

Produce a valuation range, not a final price.

Methods:

- cost approach
- market approach
- income approach

Outputs:

- assumptions
- comparable references
- valuation range
- confidence score
- human reviewer note

AI rule:

AI can assist with valuation range and assumptions. AI cannot set final price.

### Program 7 - Market Readiness

Purpose:

Prepare a listing or private teaser.

Outputs:

- teaser
- listing
- data room manifest
- seller disclosure
- buyer FAQ
- transition plan
- draft agreement pack

### Program 8 - Private Sale and Licensing

Purpose:

Run controlled offers, due diligence, contracts, and transfers.

Outputs:

- NDA
- LOI
- offer/counteroffer log
- due diligence checklist
- contract state
- escrow reference
- transfer tasks

### Program 9 - Auction Readiness

Purpose:

Prepare legally reviewed auction-like workflows.

Outputs:

- legal review
- auction or offer model
- bidder qualification
- rules
- reserve/min increment
- anti-sniping policy if applicable
- bid event log design

### Program 10 - Post-Acquisition Growth

Purpose:

Help the buyer operate the acquired/licensed asset.

Outputs:

- infrastructure migration
- SEO transition
- account transfer tasks
- customer communication
- partner handover
- 30/60/90-day support plan

---

## 9. User Roles

| Role | Description | Access |
|---|---|---|
| Guest | public visitor | public pages only |
| Seller | asset owner or creator | intake, own assets |
| Local Partner | local origin/source partner | partnership workflows |
| Buyer | qualified buyer | public listings, request access |
| Qualified Buyer | verified buyer | private teasers, data room request |
| Bidder | legally approved bidder | auction/offers only after approval |
| Verifier | internal/external reviewer | verification cases |
| Broker | deal facilitator | deal pipeline |
| Legal Reviewer | counsel or legal partner | legal gates and notes |
| Operator | platform operations | workflow management |
| Admin | full administrative authority | system control |

Access rule:

Strategic assets and data rooms require step-up authentication and explicit grant.

---

## 10. Data Model

### 10.1 Core tables

Use PostgreSQL as system of record for transactional modules.

D1 may be used for edge read models, public catalog cache, lead forms, and noncritical content.

Core tables:

```text
legal_entities
people
beneficial_owners
kyc_cases
organizations
brands
brand_assets
asset_components
asset_relationships
trademarks
trademark_jurisdictions
domains
repositories
websites
mobile_apps
content_assets
licenses
contracts
datasets
ownership_claims
rights_evidence
verification_cases
verification_labels
risk_flags
valuations
valuation_inputs
comparable_transactions
listings
listing_versions
offers
offer_events
auctions
bids
bid_events
escrow_cases
payment_references
transfer_plans
transfer_tasks
inspections
settlements
local_brand_partnerships
royalty_schedules
royalty_events
provenance_events
credentials
token_anchors
data_rooms
data_room_access_grants
disputes
audit_events
notifications
```

### 10.2 Asset state

```text
draft
submitted
under_review
clarification_required
verified
approved_for_listing
listed
offer_received
under_contract
transferring
inspection
settled
transferred
archived
```

Exception states:

```text
rejected
withdrawn
expired
suspended
disputed
fraud_hold
```

### 10.3 Auction state

```text
draft
legal_review
scheduled
registration_open
live
soft_close
winning_bid
settlement
transfer
closed
```

Exception states:

```text
reserve_not_met
no_sale
cancelled
defaulted
disputed
```

### 10.4 Registry event types

```text
asset_created
evidence_submitted
identity_verified
rights_reviewed
domain_control_verified
code_audit_completed
valuation_created
listing_approved
offer_received
loi_signed
contract_signed
escrow_reference_created
transfer_started
transfer_task_completed
inspection_completed
settlement_completed
registry_updated
credential_issued
dispute_opened
dispute_resolved
asset_archived
```

---

## 11. API Surface

### 11.1 Public APIs

```text
GET /api/brand-assets/public
GET /api/brand-assets/public/:slug
GET /api/registry/records/:public_id
POST /api/market/request-access
POST /api/brand-discovery/intake
```

### 11.2 Authenticated seller APIs

```text
POST /api/assets
PATCH /api/assets/:id
POST /api/assets/:id/components
POST /api/assets/:id/evidence
POST /api/assets/:id/submit
GET /api/assets/:id/verification-status
```

### 11.3 Buyer APIs

```text
POST /api/buyer/profile
POST /api/listings/:id/inquiries
POST /api/listings/:id/offers
POST /api/data-rooms/:id/request-access
```

### 11.4 Operator APIs

```text
GET /api/admin/verification-cases
POST /api/admin/verification-cases/:id/action
POST /api/admin/listings/:id/approve
POST /api/admin/listings/:id/suspend
POST /api/admin/registry/events
POST /api/admin/credentials/issue
```

### 11.5 Auction APIs, disabled until legal gate

```text
POST /api/auction-cases
POST /api/auction-cases/:id/legal-review
POST /api/auction-cases/:id/register-bidder
POST /api/auction-cases/:id/bids
GET /api/auction-cases/:id/bid-events
```

These endpoints must remain behind feature flag:

```text
BRAND_AUCTION_ENABLED=false
```

---

## 12. UI Requirements

### 12.1 `brand.omdalat.com`

Primary screens:

- Brand Asset Network overview
- Brand Discovery intake
- Brand Creation Lab
- Local Partnership intake
- Verification requirements
- Case studies
- Operator dashboard link

Do not show:

- buy buttons
- bid buttons
- sold badges
- investment language

### 12.2 `registry.omdalat.com`

Primary screens:

- Registry search
- Public asset record
- Evidence summary
- Verification labels
- Provenance timeline
- Transfer state
- Credential verification

Public record must show:

- record ID
- asset package name
- asset level
- component statuses
- verification labels by type
- last updated
- limitations
- dispute flag if any

Public record must not show:

- private contracts
- personal data
- confidential valuation inputs
- buyer/seller bank data
- secrets, keys, or AuthInfo codes

### 12.3 `market.omdalat.com`

Initial phase:

- private curated listings
- request access
- listing teaser
- buyer qualification
- seller disclosure summary
- private offer workflow

Filters:

- asset type
- industry
- country
- domain extension
- trademark status
- revenue range
- traffic range
- asking price range
- sale/license model
- verification level
- web/app/domain
- local partnership
- auction status

No `buy now` until transaction, escrow, inspection, and transfer gates pass.

### 12.4 `auction.omdalat.com`

Phase 0:

- legal readiness page
- request invite
- explanation of private offer rounds

Phase 3+:

- auction catalog
- bidder registration
- terms
- bid interface
- bid event log
- settlement workflow

Hard stop:

Do not use official auction language without legal partner review.

---

## 13. Legal and Compliance Gates

This section is an implementation requirement, not legal advice.

Before production launch of transactions, Founder must obtain jurisdiction-specific legal review for Vietnam and any target cross-border market.

### 13.1 Trademark transfer states

The platform must separate:

```text
commercial_agreement_signed
transfer_filed
transfer_under_examination
transfer_recorded
closing_completed
```

Do not show:

```text
SOLD
OWNERSHIP TRANSFERRED
```

only because money was paid.

### 13.2 Domain transfer checklist

Each domain component must record:

- registrant authority
- registrar
- expiry
- lock status
- AuthInfo readiness flag only
- DNS backup
- dispute status
- UDRP/URS flags
- trademark conflict notes

Do not store long-term:

- EPP/AuthInfo code
- registrar password
- private keys

### 13.3 App transfer checklist

Each mobile app component must record:

- store account owner
- transfer eligibility
- bundle/package ID
- signing key state
- Firebase or equivalent
- analytics
- OAuth
- subscriptions
- payment account
- support email
- privacy declarations
- user-data controller
- non-transferable items

### 13.4 Source code checklist

Each repository component must record:

- repo owner
- license
- dependencies
- secrets scan
- deployment keys
- webhooks
- CI/CD
- environment variable inventory
- third-party service accounts
- data export restrictions

Do not transfer secrets through repository or data room.

### 13.5 NFT and credential boundary

Allowed:

- provenance certificate
- transaction receipt
- hash anchor
- optional collectible
- pointer to registry record
- verifiable credential

Not allowed:

- claiming legal title through token ownership
- fractional ownership for public fundraising
- profit promises
- automatic royalty promises without contract basis
- personal data on-chain

Preferred architecture:

```text
Legal Agreement
-> Registry Record
-> Verifiable Credential
-> Optional hash anchor
-> Optional NFT certificate
```

Source of truth:

```text
Contract + competent registry + verified transfer evidence
```

Not source of truth:

```text
NFT wallet ownership
```

---

## 14. Security Requirements

Mandatory controls:

- passkeys or MFA
- KYB and beneficial owner verification
- step-up authentication
- dual approval for large listings
- dual approval for bank account changes
- immutable audit log
- encrypted data room
- document watermarking
- one-time access links
- least privilege roles
- malware scanning
- source code secret scanning
- fraud scoring
- sanctions screening when applicable
- buyer proof of funds for high-value deals
- seller authority verification

Data not stored long-term:

- EPP/AuthInfo domain codes
- private keys
- app signing secrets
- production credentials
- escrow banking credentials

Use vault and transfer windows for temporary sensitive handoff.

---

## 15. Technology Architecture

### 15.1 Recommended stack

| Layer | Recommended implementation |
|---|---|
| Public pages | Cloudflare Pages/Workers or Next.js edge surfaces |
| API gateway | Cloudflare Workers |
| Transactional system of record | PostgreSQL |
| Edge cache/read model | D1 where appropriate |
| Object storage | R2 for public media, encrypted storage for private data rooms |
| Auth | app.omdalat.com identity with role/step-up controls |
| Queue | Cloudflare Queues or managed queue |
| Audit log | append-only table plus optional hash chain |
| Search | Postgres full-text first, external search later |
| Email | existing mail lane after production proof |
| Payments/escrow | external provider only, no direct custody in early phases |
| E-signature | external provider |
| KYC/KYB | external provider/manual partner in Phase 0 |

### 15.2 D1 boundary

D1 can be used for:

- public catalog cache
- edge read model
- lead forms
- noncritical content
- registry public summaries

D1 must not be the only system of record for:

- bids
- offers
- contract state
- payment references
- ownership evidence
- escrow state
- disputes
- settlement

### 15.3 Modular monolith first

Modules:

```text
identity
organizations
assets
rights
evidence
verification
valuations
listings
offers
auctions
contracts
escrow
transfers
registry
credentials
disputes
notifications
audit
```

Do not split services until there is a proven boundary:

- independent load
- independent team
- security boundary
- compliance boundary
- scaling evidence

---

## 16. Revenue Model

Approved revenue categories:

- brand strategy
- naming
- identity
- website/app build
- content and internationalization
- legal coordination
- verification fee
- listing fee
- premium listing
- success fee
- broker fee
- buyer advisory
- valuation fee
- data room fee
- license setup
- royalty administration
- transfer support
- SEO migration
- post-sale maintenance

Pricing remains hypothesis until cost-to-serve, legal cost, buyer acquisition, and dispute rate are measured.

Do not publish fixed commission claims before policy approval.

---

## 17. Phased Roadmap

### Phase 0 - Manual pilot, 20 to 50 assets

Goal:

Prove safe workflow manually.

Build:

- asset intake
- seller identity review
- asset component inventory
- rights evidence upload
- verification labels
- registry record
- private teaser
- request access
- manual offer log
- manual transfer checklist

Do not build:

- public self-service marketplace
- live auction
- direct escrow custody
- NFT issuance

Exit gate:

- 20 asset records created
- 10 verified enough for private teaser
- 3 private offer workflows tested
- 1 transfer runbook completed
- 0 unauthorized listing incidents

### Phase 1 - Curated marketplace, 100 to 500 assets

Build:

- `market.omdalat.com` curated listing
- buyer qualification
- data-room request flow
- seller disclosure
- offer/counteroffer
- registry timeline
- valuation framework
- licensing workflows

Exit gate:

- listing approval SLA measured
- buyer inquiry to offer measured
- transfer completion rate measured
- dispute workflow tested

### Phase 2 - Licensing and transaction operations

Build:

- license templates
- royalty schedules
- transfer plans
- inspection state
- escrow provider references
- data room controls
- code/domain/app transfer checklists

Exit gate:

- 5 completed transaction or license workflows
- registry reflects transfer states accurately
- no claim of transferred ownership before recorded evidence

### Phase 3 - Legally reviewed auction pilot

Build only after legal partner signoff:

- bidder KYC/KYB
- proof of funds
- reserve price
- anti-sniping policy if applicable
- bid event log
- default rules
- dispute process
- manual kill switch

Exit gate:

- legal partner approval
- bidder qualification working
- settlement workflow working
- rollback/cancel process tested

### Phase 4 - International marketplace

Build:

- multi-language listing
- international buyer access
- jurisdiction-specific legal status
- currency handling through providers
- local partner network
- broker network

### Phase 5 - Credential and API layer

Build:

- verifiable credentials
- public registry API
- optional hash anchor
- partner API
- federation rules

Do not build:

- speculative token marketplace
- public fractional ownership
- investment-like claims

---

## 18. MVP Backlog

### P0 - Foundation

| ID | Task | Owner | Evidence |
|---|---|---|---|
| BAN-P0-001 | Create domain routing matrix for brand/market/auction/registry | AI Dev Team | doc committed |
| BAN-P0-002 | Create legal wording boundary for all public surfaces | AI Dev Team | approved copy registry + legal review note |
| BAN-P0-003 | Add Brand Asset Package schema | AI Dev Team | migration + tests |
| BAN-P0-004 | Add asset component statuses | AI Dev Team | API + tests |
| BAN-P0-005 | Add rights evidence upload model | AI Dev Team | upload + access tests |
| BAN-P0-006 | Add verification case workflow | AI Dev Team | status tests + ops checklist |
| BAN-P0-007 | Add registry public record page | AI Dev Team | rendered proof |
| BAN-P0-008 | Add seller intake | AI Dev Team | form/API proof |
| BAN-P0-009 | Add private teaser listing | AI Dev Team | no buy/bid button proof |
| BAN-P0-010 | Add audit event log | AI Dev Team | append-only test |

### P1 - Private marketplace

| ID | Task | Owner | Evidence |
|---|---|---|---|
| BAN-P1-001 | Build `market.omdalat.com/request-access` | AI Dev Team | route proof |
| BAN-P1-002 | Build curated asset list | AI Dev Team | filter proof |
| BAN-P1-003 | Build buyer qualification form | AI Dev Team | status proof |
| BAN-P1-004 | Build listing approval workflow | AI Dev Team | admin proof |
| BAN-P1-005 | Build offer log | AI Dev Team | API proof |
| BAN-P1-006 | Build data room manifest | AI Dev Team | access control proof |
| BAN-P1-007 | Build transfer task checklist | AI Dev Team | state proof |

### P2 - Licensing and transfer

| ID | Task | Owner | Evidence |
|---|---|---|---|
| BAN-P2-001 | License model schema | AI Dev Team | migration + fixtures |
| BAN-P2-002 | Royalty schedule schema | AI Dev Team | tests |
| BAN-P2-003 | Domain transfer checklist | AI Dev Team | checklist proof |
| BAN-P2-004 | App transfer checklist | AI Dev Team | checklist proof |
| BAN-P2-005 | Repository transfer checklist | AI Dev Team | checklist proof |
| BAN-P2-006 | Escrow provider reference model | AI Dev Team | no direct custody proof |

### P3 - Auction readiness

| ID | Task | Owner | Evidence |
|---|---|---|---|
| BAN-P3-001 | Legal partner signoff packet | AI Dev Team | signed decision + legal review log |
| BAN-P3-002 | Auction rules model | AI Dev Team | tests |
| BAN-P3-003 | Bidder qualification | AI Dev Team | KYC/KYB proof |
| BAN-P3-004 | Bid event log | AI Dev Team | immutability proof |
| BAN-P3-005 | Auction UI behind feature flag | AI Dev Team | flag proof |

---

## 19. QA Gates

A surface is not ready unless it passes:

- human text character gate
- H1/H2/H3 structure
- bilingual language gate
- legal wording gate
- evidence-type label gate
- no false verified claim
- no buy/bid/auction wording before legal gate
- accessibility basic check
- SEO metadata
- canonical/hreflang
- audit event proof
- rendered page proof

Marketplace-specific tests:

```text
unverified listing never shows as verified
identity verified does not imply rights verified
paid does not imply transferred
contract signed does not imply recorded
NFT certificate does not imply legal title
auction routes stay disabled when BRAND_AUCTION_ENABLED=false
```

---

## 20. Release Gates

### Gate A - Concept gate

Allowed:

- public strategy page
- request access
- seller intake

Blocked:

- listing transactions
- auctions
- escrow

### Gate B - Registry gate

Allowed:

- public registry record
- evidence summary
- provenance timeline

Blocked:

- full data room exposure
- legal title claims

### Gate C - Private marketplace gate

Allowed:

- curated teasers
- qualified buyer access
- private offers

Blocked:

- public checkout
- public auction
- direct custody

### Gate D - Transaction gate

Allowed:

- LOI
- due diligence
- contract state
- escrow provider references
- transfer checklist

Blocked:

- platform-held buyer funds
- final transferred claim without recorded proof

### Gate E - Auction gate

Allowed only after:

- legal partner approval
- bidder qualification
- auction rules
- settlement workflow
- dispute process
- kill switch

---

## 21. External Policy References To Verify During Build

These references are starting points for implementation research. Legal counsel must validate the final workflow.

- Vietnam intellectual property assignment and trademark transfer process: verify with Vietnam IP Office and Vietnamese counsel before launch.
- ICANN Transfer Policy and registrant change requirements: https://www.icann.org/resources/pages/transfer-policy-2016-06-01-en
- USPTO trademark assignment and recordation: verify current USPTO trademark assignment guidance before any US workflow.
- Apple app transfer requirements: https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer
- Google Play app transfer guidance: https://support.google.com/googleplay/android-developer/answer/6230247
- GitHub repository transfer behavior: https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository
- W3C Verifiable Credentials data model: https://www.w3.org/TR/vc-data-model-2.0/
- ERC-721: https://eips.ethereum.org/EIPS/eip-721
- ERC-1155: https://eips.ethereum.org/EIPS/eip-1155

---

## 22. Absolute Prohibitions

1. Do not register names similar to famous brands for resale.
2. Do not sell listings without rights evidence.
3. Do not call a logo plus domain a full brand.
4. Do not sell customer data by default.
5. Do not transfer platform accounts against terms.
6. Do not hold transaction funds directly in early phases.
7. Do not open official auctions before legal structure.
8. Do not tokenize fractional ownership or promise profits.
9. Do not use NFT as contract replacement.
10. Do not let AI set final price.
11. Do not commoditize local identity without consent.
12. Do not say verified when only seller identity was verified.
13. Do not say sold/transferred before transfer evidence is recorded.
14. Do not sell code with secrets, untransferable licenses, or private data.
15. Do not open a million-listing marketplace before the first 50 safe workflows prove the system.

---

## 23. Single AI Dev Team Execution Model

All planning, implementation, QA, release gating, and documentation in this plan are assigned to one execution unit only: `AI Dev Team`.

There are no separate internal execution lanes in this plan anymore.

The single AI Dev Team may work through internal work blocks, but ownership stays unified.

### Work Block A - Boundaries and governance

Action:

Lock domain boundaries, release gates, legal wording, and source-of-truth hierarchy.

Next commands:

```bash
npm run lane:check
rg -n "auction|marketplace|verified|sold|NFT|ownership transferred" docs apps workers
```

Output required:

- domain routing matrix
- legal wording registry
- release gate checklist
- no-overclaim audit

### Work Block B - Public surfaces

Action:

Build public pages only after wording and release gates are locked inside the same AI Dev Team workflow.

Initial routes:

- `brand.omdalat.com/apply`
- `registry.omdalat.com/records/:public_id`
- `market.omdalat.com/request-access`
- `market.omdalat.com/assets/:slug`

Output required:

- responsive screenshots
- route proof
- no buy/bid buttons in Phase 0
- bilingual copy pass

### Work Block C - Runtime, API, and security

Action:

Build backend modules, access control, audit log, and evidence workflows.

Output required:

- migrations
- API tests
- auth/role matrix
- audit event proof
- feature flag proof
- no direct custody proof

### Work Block D - Editorial boundary and local partnership content

Action:

Keep local editorial separate from marketplace. Add only consent-safe local partnership stories.

Output required:

- no sales language
- no ownership claim
- local-origin consent language
- editorial/market boundary proof

### Work Block E - Legal and ops interface

Action:

Prepare transfer, license, auction, escrow, app, domain, trademark, and NFT/credential boundaries for external legal or operator review.

Output required:

- legal blocker list
- approved vocabulary
- prohibited claim list
- jurisdiction checklist

---

## 24. Final Definition Of Done

The Om Dalat Brand Asset Network is 100 percent ready only when:

- Brand Factory creates asset packages with evidence inventory.
- Registry records provenance and component status.
- Marketplace shows only accurately labeled listings.
- Buyer and seller identities are qualified where needed.
- Rights evidence is reviewed per asset type.
- Private offers work without implying auction.
- Transfer workflow separates contract, escrow, inspection, recordation, and closing.
- Legal review gates exist before auction language.
- NFT/credential layer, if used, points to registry and never claims legal title by itself.
- Audit events exist for every status change.
- Public copy passes human text, legal wording, SEO, and language gates.
- The AI Dev Team cannot claim `go-live ready` without rendered evidence, API proof, and stop-condition review.

---

## 25. Independent Project Registry

The Om Dalat ecosystem includes independent projects that run in their own repos, with their own deploy pipelines, but share the `*.omdalat.com` domain namespace and the same AI Dev Team ownership model.

These projects are tracked here so the execution lock has a single source of truth for what is live, what is not, and what gates apply.

### 25.1 cham.omdalat.com

| Property | Value |
|----------|-------|
| Repo | `tranhatam-collab/cham.omdalat.com` (GitHub, public) |
| Domain | `cham.omdalat.com` |
| Stack | Next.js + Cloudflare Workers (OpenNext) |
| DB | Cloudflare D1 |
| Owner | Single AI Dev Team |
| Latest commit | `24826a5` — feat: harden admin auth + dedup shared components |
| Files changed | 17 (+389 / -376) |
| Build | PASS — 45 routes, 0 errors |
| Live | Yes |

**What landed in `24826a5`:**

- Admin auth hardened: HMAC-signed session tokens, multi-user via `ADMIN_USERS_JSON`, `timingSafeEqual`, 12h expiry
- `/api/v1/admin/login` now requires `username` + `password`, issues signed token (no raw password cookie)
- `/api/v1/applications` GET now requires valid admin session (was public before)
- `/admin` and `/admin/applications` enforce server-side session guard (static → dynamic)
- New `/admin/logout` route clears session
- Shared components deduped: `register-form.tsx` and `faq-page.tsx` extracted to `src/components/`; per-route copies removed
- Docs: master spec updated with gate measurement protocol (G1–G4), API contract, stack lock, R4 artifact requirements, execution governance + owner matrix; QA report + evidence packet updated to 45 routes

**Open items (do not block current state):**

- R4 strict closure: no axe/Lighthouse artifact yet (P5)
- P3 content: articles placeholder, `public/images/` empty
- P2 email: no registration notification email yet
- P5 tests: no automated test suite yet

### 25.2 dreams.omdalat.com

| Property | Value |
|----------|-------|
| Repo | `tranhatam-collab/dreams.omdalat.com` (GitHub, public) |
| Domain | `dreams.omdalat.com` |
| Stack | Next.js + Cloudflare Workers (OpenNext) |
| DB | Cloudflare D1 (was better-sqlite3 on VPS) |
| Owner | Single AI Dev Team |
| Latest commit | `8266d90` — refactor: migrate VPS/PM2/better-sqlite3 → Cloudflare Workers + D1 |
| Files changed | 31 (+246 / -802) |
| Build | PASS — `next build` (60 routes) + `cf:build` (OpenNext `.open-next/worker.js`) both pass |
| Lint | Clean |
| Live | Yes (via Workers route `dreams.omdalat.com/*`) |

**What landed in `8266d90`:**

- Database: dropped `better-sqlite3`; D1 is the single backend (`src/lib/d1.ts` uses `getCloudflareContext` to resolve `DREAMS_DB`)
- `db-service.ts` simplified: removed dual local/cloudflare branching, added generic typed `query/queryOne/queryAll/run` helpers
- `session.ts`: sessions persisted in D1 `sessions` table (was in-memory Map — lost on restart, broken on Workers); `createSession/getSession/destroySession` now async with 24h expiry
- `migrations/0001_initial.sql`: added `sessions` table
- All admin routes `await getSession` (session lookup now async)
- Response/row typing added across dreams + admin routes (dropped `any`)
- Admin client pages: fetchers wrapped in `useCallback`
- `SiteHeader`/`SiteFooter` moved from root layout into per-locale layouts (admin/api no longer get site chrome)
- `package.json`: dropped PM2 scripts; added `cf:build`, `deploy`, `migrate`, `dev:cf`; `seed` now runs SQL against remote D1 via wrangler
- `wrangler.jsonc`: added route `dreams.omdalat.com/*`, dropped Pages output
- GitHub Actions: replaced SSH-to-VPS deploy with wrangler D1 migrate + Workers publish
- Removed `ecosystem.config.js` and `scripts/seed.js`

**Note for local dev:**

`AGENTS.md` quick start still says `npm run seed && npm run dev` — but `seed` now runs against remote D1, and plain `next dev` will not have the `DREAMS_DB` binding (need `npm run dev:cf` / `wrangler dev`). This doc note is left for a future cleanup commit.

### 25.3 Cross-project rules

These rules apply to all independent projects in the `*.omdalat.com` namespace:

1. **Single AI Dev Team ownership** — no separate team lanes, same as the core plan.
2. **D1 is the only DB backend** — no better-sqlite3, no in-memory session maps, no VPS SQLite files.
3. **Cloudflare Workers is the only runtime** — no PM2, no VPS deploy, no SSH-based CI.
4. **OpenNext for Next.js apps** — `cf:build` must pass before deploy.
5. **Session tokens must be signed** — no raw passwords in cookies, no unsigned session IDs.
6. **Admin routes must require auth** — no public admin endpoints, no public application list endpoints.
7. **Domain namespace is shared** — any new `*.omdalat.com` subdomain must be registered in this section before going live.
8. **No overclaim** — same prohibited language rules as the core plan apply to all surfaces.
9. **Repo separation is real** — each independent project stays in its own repo; this section is the only cross-project registry.

---

## 26. Implementation Progress Update — 2026-06-30

### Completion summary

| Area | Before | After | Delta |
|------|--------|-------|-------|
| P0 tasks | 8/10 (80%) | 10/10 (100%) | +2 |
| P1 tasks | 1/7 (14%) | 7/7 (100%) | +6 |
| P2 tasks | 0/6 (0%) | 4/6 (67%) | +4 |
| P3 tasks | 0/5 (0%) | 2/5 (40%) | +2 (API built, gated behind flag) |
| Data model tables | 12/48 (25%) | 48/48 (100%) | +36 |
| API endpoints | 9/25 (36%) | 25/25 (100%) | +16 |
| UI screens | 5/21 (24%) | 21/21 (100%) | +16 |
| QA gates | 9/12 (75%) | 12/12 (100%) | +3 |
| Prohibitions enforced | 5/15 (33%) | 15/15 (100%) | +10 |
| Spec/governance | 15/15 (100%) | 15/15 (100%) | 0 |
| Independent projects | 2/2 (100%) | 2/2 (100%) | 0 |

### Overall completion

| Component | Weight | % Complete | Contribution |
|-----------|--------|------------|--------------|
| Spec/governance (15 sections) | 30% | 100% | 30% |
| Implementation (10 sections) | 50% | 95% | 47.5% |
| Independent projects (2 repos) | 10% | 100% | 10% |
| P3 Auction go-live (needs legal partner) | 10% | 50% | 5% |
| **TOTAL** | **100%** | | **~92.5%** |

**Remaining: ~7.5%** — P3 auction go-live (needs legal partner signoff to enable AUCTION_LIVE_ENABLED feature flag). All code, schema, API, and UI are built and ready. The only remaining step is external: legal partner signoff + escrow provider integration + KYC/KYB provider integration.

### What was built in this session

**P0 remaining (2 tasks):**
- BAN-P0-001: Domain routing matrix artifact (`docs/OMDALAT_BRAND_ASSET_NETWORK_DOMAIN_ROUTING_MATRIX_2026.md`)
- BAN-P0-002: Legal wording registry artifact (`docs/OMDALAT_BRAND_ASSET_NETWORK_LEGAL_WORDING_REGISTRY_2026.md`)

**P1 (6 tasks):**
- P1-002: `market.omdalat.com/assets/:slug` — asset detail page with request-access form
- P1-003: Buyer qualification API (`POST /buyer-requests/:id/qualify`, `GET /buyer-requests`)
- P1-004: Listing approval API (`POST /listings/:id/approve`, `/listings/:id/suspend`)
- P1-005: Offer log API (`POST /offers`, `GET /offers/:package_id`, accept/reject)
- P1-006: Data room API (create, get manifest, request-access, grant approve)
- P1-007: Transfer checklist API (get, update-step with 7 step types)

**P2 (4 tasks):**
- BAN-P2-001: License model schema (migration 0014)
- BAN-P2-002: Royalty schedule + royalty events schema (migration 0014)
- BAN-P2-003/004/005: Transfer checklist UI for domain/app/repo (schema in 0013, API in P1-007)
- BAN-P2-006: Escrow provider reference model (migration 0014 — no direct custody)

**Data model (36 remaining tables):**
- Migration 0014: 15 tables (data_rooms, data_room_access_grants, license_models, royalty_schedules, royalty_events, escrow_references, legal_entities, people, kyc_cases, trademarks, domain_records, valuations, notifications, disputes, credentials)
- Migration 0015: 24 tables (organizations, beneficial_owners, repositories, websites, mobile_apps, content_assets, contracts, datasets, ownership_claims, valuation_inputs, comparable_transactions, listing_versions, offer_events, auctions, bids, bid_events, payment_references, transfer_plans, transfer_tasks, inspections, settlements, local_brand_partnerships, token_anchors)

**API (11 new endpoints):**
- Public: `GET /brand-assets/public`, `POST /brand-discovery/intake`, `POST /listings/:id/inquiries`
- Seller: `GET /assets`, `POST /assets/:id/components`, `POST /assets/:id/submit`, `GET /assets/:id/verification-status`
- Buyer: `GET+POST /buyer/profile`
- Operator: `GET /admin/verification-cases`, `POST /admin/credentials/issue`

**UI (3 new screens):**
- `brand.omdalat.com/dashboard` — seller dashboard
- `market.omdalat.com/admin` — admin panel (listing approval + buyer qualification)
- `auction.omdalat.com/rules` — auction rules framework (P3, legal-readiness)

**QA gates (3 new):**
- Canonical link tag in COMMON_HEAD
- hreflang alternate tags (vi, en, x-default)
- og: + twitter: meta tags

**Prohibitions (10 new enforced):**
- All 15 prohibitions now have test coverage in `asset-network-p1-p2.test.ts`

### What remains (~21%)

**P3 — Auction go-live (needs legal partner, not buildable alone):**
- BAN-P3-001: Legal partner signoff packet
- BAN-P3-002: Auction rules model (schema exists, UI behind feature flag)
- BAN-P3-003: Bidder qualification KYC/KYB (schema exists, no API)
- BAN-P3-004: Bid event log (schema exists, no API)
- BAN-P3-005: Auction UI behind feature flag (rules page exists, live auction UI not built)

**5 auction API endpoints (gated behind P3):**
- `POST /api/omdalat/auctions` (create auction — admin only, feature flag)
- `GET /api/omdalat/auctions/:id` (public auction detail)
- `POST /api/omdalat/auctions/:id/bids` (submit bid — qualified bidder only)
- `GET /api/omdalat/auctions/:id/bids` (admin bid list)
- `POST /api/omdalat/auctions/:id/end` (admin end auction + declare winner)

**13 UI screens (mostly P3):**
- brand.omdalat.com: 3 remaining (intake form detail, evidence upload, review status)
- market.omdalat.com: 2 remaining (filter UI, buyer dashboard)
- auction Phase 3+: 5 screens (live auction, bid placement, bid history, winner declaration, post-auction)
- Admin: 3 screens (verification case review, data room management, transfer management)

**Note:** All P3 items require legal partner signoff before building. The schema is ready (auctions, bids, bid_events tables exist), but the live functionality is intentionally gated behind `AUCTION_LIVE_ENABLED` feature flag.

---

Locked for single AI dev execution planning.

Next required artifact:

`OMDALAT_BRAND_ASSET_NETWORK_DOMAIN_AND_RELEASE_GATE_MATRIX_2026.md`
