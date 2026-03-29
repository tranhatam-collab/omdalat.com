# OMDALAT.COM
## Repository Build Order
## Final Step-by-Step Build Sequence
## Version 2.0

---

# 1. PURPOSE

This file defines the exact build order for the `omdalat.com` repository.

It exists to:
- prevent chaotic development
- prevent premature UI work
- prevent SEO debt
- prevent missing system foundations
- ensure correct sequence from repo shell to working product

This is the mandatory implementation order for:
- frontend developers
- backend developers
- AI-assisted code generation
- design handoff coordination
- product implementation tracking

**Rule:** Do not skip ahead to later layers before earlier dependencies are locked.

---

# 2. BUILD PHILOSOPHY

```
foundation first
public structure second
product objects third
interaction fourth
trust fifth
admin sixth
scale layers later
```

OMDALAT must be built:
- as a system
- as a city-node
- as a local proof layer
- as a trust-based experience

Not as:
- a random homepage first
- a dashboard without data model
- a UI kit without product logic
- a content site without entity structure

---

# 3. MASTER STAGE OVERVIEW

| Stage | Name | Gate |
|---|---|---|
| 1 | Workspace Foundation | repo installs cleanly |
| 2 | Public Web Runtime | public site renders |
| 3 | App Runtime | app shell works |
| 4 | Shared Packages | no duplication between apps |
| 5 | SEO Foundation | metadata visible on real pages |
| 6 | Product Data Model | entities and mock data stable |
| 7 | Core Feature Implementation | city node is navigable |
| 8 | Trust + Proof Layer | trust appears in UI |
| 9 | Admin + Docs Layer | ops and docs work |
| 10 | Scale + Quality | CI, tests, analytics reliable |

---

# 4. STAGE 1 — WORKSPACE FOUNDATION

## Files to create

```
package.json
pnpm-workspace.yaml
turbo.json
.editorconfig
.nvmrc
.env.example
```

## Root scripts required

```
dev
build
lint
typecheck
format
```

## Directory structure to confirm

```
apps/
packages/
services/
docs/
data/
```

## Gate

Repo installs cleanly. Workspace runs. New developer can onboard consistently.

---

# 5. STAGE 2 — PUBLIC WEB RUNTIME

## Files to create

```
apps/web/package.json
apps/web/tsconfig.json
apps/web/next.config.js
apps/web/app/layout.tsx
apps/web/app/page.tsx
```

## Route shells to create

```
/
/places
/hosts
/experts
/communities
/events
/proofs
/join
/about
/vision
/trust
/faq
/privacy
/terms
/contact
```

## Global layout must include

- header / navigation
- footer
- theme wrapper
- metadata hook
- font preload

## Gate

Public site boots. Homepage renders. Core routes exist as shells. Theme wrapper is stable.

---

# 6. STAGE 3 — APP RUNTIME

## Files to create

```
apps/app/package.json
apps/app/tsconfig.json
apps/app/next.config.js
apps/app/app/layout.tsx
apps/app/app/page.tsx
```

## Route shells to create

```
/dashboard
/places
/hosts
/experts
/communities
/events
/proofs
/profile
/settings
```

## App layout must include

- app nav
- page frame
- placeholder auth guard
- card system
- local theme wrapper
- noindex on all pages

## Gate

App boots. Dashboard shell exists. Route map is stable.

---

# 7. STAGE 4 — SHARED PACKAGES

## packages/ui — required components

```
Button
Card
Section
Container
Badge
NavItem
EmptyState
PageIntro
```

## packages/types — required types

```
User
Node
Place
Host
Expert
Community
Event
Proof
TrustSummary
Verification
```

## packages/core — required contents

```
constants
route map
config
shared labels
```

## Gate

Shared component library exists. Domain types are shared. Web and app stop duplicating primitives.

---

# 8. STAGE 5 — SEO FOUNDATION

## Public SEO files

```
apps/web/public/robots.txt
apps/web/public/_headers
apps/web/public/_redirects
```

## robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/private/
Disallow: /preview/
Disallow: /staging/
Sitemap: https://omdalat.com/sitemap.xml
```

If the authenticated product is deployed on `https://app.omdalat.com`, block indexing on that host directly.
Only add `Disallow: /app/` when the authenticated experience lives under the same `omdalat.com` host.

## _headers

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## _redirects

```
http://omdalat.com/*       https://omdalat.com/:splat  301
http://www.omdalat.com/*   https://omdalat.com/:splat  301
https://www.omdalat.com/*  https://omdalat.com/:splat  301
```

## Metadata system — apps/web/lib/

```
metadata.ts     title, description, OG defaults + per-page override
schema.ts       JSON-LD builders: Organization, WebSite, Place, Person, Event, BreadcrumbList, ItemList, FAQPage
canonical.ts    canonical URL builder enforcing https://omdalat.com base
hreflang.ts     /vi/ and /en/ scaffold with x-default
```

## Sitemap

At minimum cover: homepage, listing pages, published detail pages.
Auto-update as entities are published or archived.

## Gate

Public pages are safely indexable. Metadata is centralized. No canonical chaos.

---

# 9. STAGE 6 — PRODUCT DATA MODEL

## Docs to write first

```
docs/PRODUCT_SPEC_OMDALAT.md
docs/DATA_MODEL_OMDALAT.md
docs/API_SPEC_OMDALAT.md
docs/TRUST_ENGINE_OMDALAT.md
docs/MATCHING_ENGINE_OMDALAT.md
```

## Mock data to create

```
data/mock/places.json        min 5 real entries
data/mock/hosts.json         min 3 real entries
data/mock/experts.json       min 3 real entries
data/mock/communities.json   min 2 real entries
data/mock/events.json        min 2 real entries
data/mock/proofs.json        min 2 real entries
```

## Schema definitions to code

```
Place
Host
Expert
Community
Event
Proof
TrustSummary
```

## Gate

Product objects are locked. Cards and pages can render real structured content.

---

# 10. STAGE 7 — CORE FEATURE IMPLEMENTATION

## 10.1 Places

- listing page
- detail page with Place JSON-LD
- place card component
- related host link
- trust signal area

## 10.2 Hosts

- listing page
- detail page with Person JSON-LD
- host card component
- linked places

## 10.3 Experts

- listing page
- detail page with Person JSON-LD
- expertise card
- locality context
- related events or communities

## 10.4 Communities

- listing page
- detail page
- member or activity summary
- linked events and places

## 10.5 Events

- listing page
- detail page with Event JSON-LD
- schedule display
- location and related entities

## 10.6 Proofs

- listing page
- detail page
- proof card
- linked entities

## Gate

OMDALAT is navigable as a real city-node system. Core entity pages exist. Internal linking is meaningful.

---

# 11. STAGE 8 — TRUST + PROOF LAYER

## Verification summary component

Must show:
- verification state
- trust state
- proof count
- credibility labels

## Proof UI

- proof card
- proof detail
- proof relationship display
- proof badges

## Trust summaries

- place trust summary
- host trust summary
- expert trust summary
- community trust summary

## Trust fields to lock

```
verified: boolean
active: boolean
proof_count: number
trust_level: enum
```

## Gate

System visibly differentiates real from generic. OMDALAT feels like a trusted network, not a directory.

---

# 12. STAGE 9 — ADMIN + DOCS LAYER

## apps/admin routes

```
/
/users
/places
/hosts
/experts
/communities
/events
/proofs
/verifications
/moderation
```

## apps/docs routes

```
/
/brand
/product
/seo
/trust
/api
/data-model
```

## Gate

Internal operations are possible. Documentation is navigable. System is maintainable.

---

# 13. STAGE 10 — SCALE + QUALITY

## CI workflows

```
.github/workflows/lint.yml
.github/workflows/build.yml
.github/workflows/deploy-web.yml
.github/workflows/deploy-app.yml
```

## Testing

```
vitest.config.ts
playwright.config.ts
```

Test coverage required:
- metadata output per page type
- route integrity
- schema JSON-LD output
- component rendering

## Performance targets

| Metric | Target |
|---|---|
| LCP | < 2.5s on mobile |
| CLS | < 0.1 |
| JS bundle (content pages) | minimal, aggressively split |

## Gate

Build, deploy, and quality checks are reliable. Repo is production-grade.

---

# 14. CHECKLIST — 50 STEPS

## Phase 1 — Workspace
- [ ] 1. `package.json`
- [ ] 2. `pnpm-workspace.yaml`
- [ ] 3. `turbo.json`
- [ ] 4. `.editorconfig`
- [ ] 5. `.nvmrc`
- [ ] 6. `.env.example`

## Phase 2 — Web runtime
- [ ] 7. `apps/web/package.json`
- [ ] 8. `apps/web/tsconfig.json`
- [ ] 9. `apps/web/next.config.js`
- [ ] 10. `apps/web/app/layout.tsx`
- [ ] 11. `apps/web/app/page.tsx` — homepage
- [ ] 12. Global nav + footer components
- [ ] 13. Homepage sections (Hero, What is OMDALAT, Live Activity, Places, Hosts, Experts, Communities, Events, Proof, Join)
- [ ] 14–27. Route shells: `/places`, `/hosts`, `/experts`, `/communities`, `/events`, `/proofs`, `/join`, `/about`, `/vision`, `/trust`, `/faq`, `/privacy`, `/terms`, `/contact`

## Phase 3 — App runtime
- [ ] 24. `apps/app/package.json`
- [ ] 25. `apps/app/tsconfig.json`
- [ ] 26. `apps/app/next.config.js`
- [ ] 27. `apps/app/app/layout.tsx`
- [ ] 28. `apps/app/app/page.tsx`
- [ ] 29. `/dashboard`
- [ ] 30. `/profile`
- [ ] 31. `/settings`

## Phase 4 — Packages
- [ ] 32. `packages/ui` — base components
- [ ] 33. `packages/types` — domain types
- [ ] 34. `packages/core` — constants + route map

## Phase 5 — SEO
- [ ] 35. `robots.txt`
- [ ] 36. `_headers`
- [ ] 37. `_redirects`
- [ ] 38. `lib/metadata.ts`
- [ ] 39. `lib/canonical.ts`
- [ ] 40. `lib/schema.ts`
- [ ] 41. Sitemap system

## Phase 6 — Docs and data
- [ ] 42. `docs/PRODUCT_SPEC_OMDALAT.md`
- [ ] 43. `docs/DATA_MODEL_OMDALAT.md`
- [ ] 44. `docs/API_SPEC_OMDALAT.md`
- [ ] 45. `docs/TRUST_ENGINE_OMDALAT.md`
- [ ] 46. `docs/MATCHING_ENGINE_OMDALAT.md`
- [ ] 47. Mock data for all core entities

## Phase 7 — Operations
- [ ] 48. `apps/admin`
- [ ] 49. `apps/docs`
- [ ] 50. CI workflows

---

# 15. WHAT MUST NOT HAPPEN

```
❌ build UI before workspace setup
❌ build detail pages before entity types exist
❌ ship indexable pages before metadata system
❌ create app dashboards before route structure
❌ invent trust UI before trust model
❌ start admin before core entities exist
❌ deploy to production before SEO foundation
```

---

# 16. WHAT CAN RUN IN PARALLEL (after Stage 1)

```
homepage visual design
component library design
mock data creation
product spec writing
API spec writing
copy system writing
```

---

# 17. BETA READINESS DEFINITION

OMDALAT is ready for beta only when:

- [ ] homepage works with real content
- [ ] core listing pages work
- [ ] at least one detail template works per entity type
- [ ] trust summary is visible
- [ ] proof objects exist and link correctly
- [ ] metadata system works on all public pages
- [ ] sitemap is live
- [ ] admin can inspect core entities
- [ ] docs explain the system clearly

---

# 18. FINAL DIRECTIVE

Build OMDALAT in order.
Do not let UI outrun the product model.
Do not let product outrun the SEO foundation.
Do not let trust become an afterthought.

Correct order creates compounding speed later.
Wrong order creates compounding cleanup later.

This file is the build sequence lock for the repository.

---

*OMDALAT Repo Build Order — Version 2.0*
