# MASTER_BUILD_SYSTEM_OMDALAT
## OMDALAT.COM
## Build System Master File
## Version 1.0

---

# 1. Purpose

This document is the build-system source of truth for the `omdalat.com` repository.

It exists to lock:

- repo scope
- product scope
- domain scope
- app boundaries
- build order
- design and SEO dependencies

This repository is OMDALAT-only.

Out of scope for this repo:

- any separate global-brand repo
- any broader cross-product brand hierarchy
- external platform APIs outside explicit integration points
- external product naming decisions

---

# 2. Core Decision

OMDALAT is a standalone city-layer product for Da Lat.

This repo must build:

- `omdalat.com` as the public city-layer website
- `app.omdalat.com` as the independent member runtime
- `docs.omdalat.com` as the independent documentation layer

This repo must not depend on external global-brand assumptions in order to ship.

---

# 3. Product Definition

OMDALAT is a living city interface for:

- trusted places
- verified hosts
- local experts
- real communities
- upcoming events
- active requests
- visible proofs

The job of the system is to make Da Lat feel:

- active
- trustworthy
- local
- connected
- proof-backed

---

# 4. Domain Strategy

Primary domains and surfaces:

- `omdalat.com` = public city-layer homepage and SEO surface
- `app.omdalat.com` = independent runtime layer
- `admin.omdalat.com` = internal moderation and review surface
- `docs.omdalat.com` = public product and technical docs for OMDALAT

Rules:

- public pages must be SSR or hybrid-rendered
- internal pages must be noindex by default
- the public web and local app may share data contracts, but not route purpose

---

# 5. Repository Structure

Preferred monorepo structure:

```text
omdalat.com/
  apps/
    web/
    app/
    admin/
    docs/
  packages/
    ui/
    core/
    types/
    seo/
  services/
    api/
    auth/
    trust/
    matching/
    notifications/
  data/
  docs/
  scripts/
```

---

# 6. Product Surfaces

## 6.1 apps/web

Purpose:

- homepage
- public entity pages
- brand and participation surface
- local discovery surface
- SEO surface

Core routes:

- `/`
- `/places`
- `/hosts`
- `/experts`
- `/communities`
- `/events`
- `/proofs`
- `/join`
- `/about`
- `/vision`
- `/trust`
- `/faq`
- `/contact`

## 6.2 apps/app

Purpose:

- dashboard
- local operations
- request handling
- trust and proof review for members
- future bookings and transactions

Core routes:

- `/`
- `/dashboard`
- `/places`
- `/hosts`
- `/experts`
- `/communities`
- `/events`
- `/proofs`
- `/requests`
- `/profile`
- `/settings`

## 6.3 apps/admin

Purpose:

- moderation
- proof review
- verification review
- visibility control
- support and abuse response

## 6.4 apps/docs

Purpose:

- product specs
- brand and theme docs
- data and API docs
- onboarding for contributors

---

# 7. Core Data Model

The repo must treat these as first-class entities:

- User
- Node
- Place
- Host
- Expert
- Community
- Event
- Request
- Proof
- Verification
- TrustSummary
- Booking
- Interaction

Publishing rule:

no public entity page goes live without:

- a stable slug
- minimum real content
- verification status
- trust summary fields
- internal links to related entities

---

# 8. Core Build Phases

## Phase 1 — Workspace foundation

Create:

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `.editorconfig`
- `.nvmrc`
- `.env.example`

## Phase 2 — Public web runtime

Build `apps/web` route shells and shared layout.

## Phase 3 — Local app runtime

Build `apps/app` route shells and app frame.

## Phase 4 — Shared packages

Create `packages/ui`, `packages/core`, `packages/types`, `packages/seo`.

## Phase 5 — SEO foundation

Lock:

- metadata
- canonical
- JSON-LD
- robots
- sitemap
- redirects

## Phase 6 — Product and data specs

Create and keep current:

- product spec
- feature tree
- content model
- data model
- DB schema
- API spec
- user roles
- trust engine
- matching engine
- screen flow

## Phase 7 — Public entity pages

Build real listing and detail surfaces for:

- places
- hosts
- experts
- communities
- events
- proofs
- requests

## Phase 8 — Trust and operations

Implement:

- verification states
- proof states
- trust summaries
- moderation-ready entity states

## Phase 9 — Admin and docs

Ship:

- admin shell
- docs site
- review tools

---

# 9. Stack Direction

Preferred stack:

- Next.js for web and app
- Cloudflare Pages for frontend deployment
- Cloudflare D1 or Postgres-compatible relational core
- R2 or equivalent object storage for proofs and media
- serverless API layer for reads, writes, verification, and trust

Frontend rules:

- keep public content server-readable
- keep heavy interactivity off the critical render path
- share tokens and UI primitives across apps

---

# 10. Brand and Theme Dependencies

Before heavy feature work, DEV must respect:

- `docs/OMDALAT_BRAND_SYSTEM_LOCK.md`
- `docs/OMDALAT_MASTER_LOCK.md`
- `docs/OMDALAT_SEO_LOCK.md`

The visual direction is:

- green-mist-earth
- calm and premium
- local and operational
- alive, not flashy

Anti-patterns:

- generic SaaS dashboard feel
- neon tech styling
- travel-blog styling
- placeholder cards with no real data meaning

---

# 11. Build Rules

Do not:

- build random UI before the entity model is locked
- expose public routes without metadata
- create detail pages without real content shape
- invent trust UI before trust rules exist
- ship public filters that create crawl junk

Do:

- build with stable routes
- attach metadata from the framework level
- keep mock data structured
- preserve public/app separation
- make proof and trust visible early

---

# 12. Definition Of Ready

A feature is ready to build only when:

- route purpose is clear
- entity shape is defined
- index/noindex rule is known
- trust implications are known
- empty-state behavior is known
- related content links are known

---

# 13. Definition Of Beta

OMDALAT is ready for beta only when:

- homepage works
- core listing pages work
- at least one detail template works
- trust summary appears in UI
- proof objects exist
- metadata and sitemap work
- admin can inspect core entities
- docs are strong enough for contributor onboarding

---

# 14. Final Directive

Build OMDALAT as a living city system for Da Lat.

Not as a generic website.
Not as a tourism skin.
Not as a static design exercise.

Build for:

- activity
- proof
- trust
- repeat local usefulness
