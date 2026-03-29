# OMDALAT.COM
## Repo Build Order
## Sequential 50-Step Checklist for DEV
## Version 1.0

---

# PURPOSE

This file gives DEV a single ordered checklist to build the `omdalat.com` repository from zero to production-ready.

Follow steps in order. Do not skip ahead.
Mark each step complete before moving to the next.

---

# PHASE 1 — WORKSPACE FOUNDATION
## Steps 1–7

- [ ] **Step 1** — Create `package.json` at root
  - define workspace name
  - define Node engine version
  - add scripts: `dev`, `build`, `lint`, `type-check`

- [ ] **Step 2** — Create `pnpm-workspace.yaml`
  - register `apps/*`, `packages/*`, `services/*`

- [ ] **Step 3** — Create `turbo.json`
  - define pipelines: `build`, `dev`, `lint`, `type-check`
  - set correct `dependsOn` for build order

- [ ] **Step 4** — Create `.nvmrc`
  - lock Node.js version

- [ ] **Step 5** — Create `.editorconfig`
  - indent style, charset, end of line, trim trailing whitespace

- [ ] **Step 6** — Create `.env.example`
  - list all required environment variables with placeholder values
  - never commit real secrets

- [ ] **Step 7** — Create `packages/config/`
  - shared `tsconfig.base.json`
  - shared ESLint config
  - shared Tailwind config (if used)

---

# PHASE 2 — SHARED PACKAGES
## Steps 8–10

- [ ] **Step 8** — Create `packages/types/`
  - define TypeScript types for all core entities:
    `User`, `Node`, `Place`, `Host`, `Expert`, `Community`, `Event`, `Proof`, `TrustScore`
  - export from `packages/types/index.ts`

- [ ] **Step 9** — Create `packages/core/`
  - shared business logic utilities
  - trust score helpers
  - entity validators

- [ ] **Step 10** — Create `packages/ui/`
  - design token CSS variables
  - base components: `Button`, `Card`, `Badge`, `Input`, `Modal`
  - brand-locked to OMDALAT green system

---

# PHASE 3 — WEB APP FOUNDATION
## Steps 11–18

- [ ] **Step 11** — Create `apps/web/package.json`
  - dependencies: Next.js, React, TypeScript
  - reference shared config packages

- [ ] **Step 12** — Create `apps/web/next.config.js`
  - enable SSR or hybrid rendering
  - configure image domains
  - configure i18n locale routing if multilingual

- [ ] **Step 13** — Create `apps/web/tsconfig.json`
  - extend from `packages/config/tsconfig.base.json`

- [ ] **Step 14** — Create `apps/web/app/layout.tsx`
  - root layout with metadata defaults
  - font preload
  - global CSS import
  - navigation and footer

- [ ] **Step 15** — Create `apps/web/lib/metadata.ts`
  - `generateMetadata()` helper
  - default title, description, OG image
  - per-page override support

- [ ] **Step 16** — Create `apps/web/lib/schema.ts`
  - JSON-LD builder for: `Organization`, `WebSite`, `Place`, `Person`, `Event`, `ItemList`, `BreadcrumbList`, `FAQPage`

- [ ] **Step 17** — Create `apps/web/lib/canonical.ts`
  - canonical URL builder
  - enforce `https://omdalat.com` base

- [ ] **Step 18** — Create `apps/web/lib/hreflang.ts`
  - hreflang scaffold for `/vi/` and `/en/`
  - x-default support

---

# PHASE 4 — SEO FOUNDATION
## Steps 19–22

- [ ] **Step 19** — Create `apps/web/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /app/
Disallow: /api/private/
Disallow: /preview/
Disallow: /staging/
Sitemap: https://omdalat.com/sitemap.xml
```

- [ ] **Step 20** — Create `apps/web/public/sitemap.xml` or sitemap generator
  - cover: homepage, listings, detail pages
  - auto-update as entities are published

- [ ] **Step 21** — Create `apps/web/public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- [ ] **Step 22** — Create `apps/web/public/_redirects`

```
http://omdalat.com/*       https://omdalat.com/:splat  301
http://www.omdalat.com/*   https://omdalat.com/:splat  301
https://www.omdalat.com/*  https://omdalat.com/:splat  301
```

---

# PHASE 5 — WEB APP ROUTES
## Steps 23–28

- [ ] **Step 23** — Create `apps/web/app/page.tsx` (homepage)
  - H1: `OMDALAT — The First Living Intelligence City in Da Lat`
  - server-rendered intro copy
  - internal links to all main sections
  - `Organization` + `WebSite` JSON-LD
  - homepage OG image

- [ ] **Step 24** — Create listing pages
  - `/places/page.tsx`
  - `/hosts/page.tsx`
  - `/experts/page.tsx`
  - `/communities/page.tsx`
  - `/events/page.tsx`
  - each with unique H1, meta, `ItemList` JSON-LD

- [ ] **Step 25** — Create detail page templates
  - `/places/[slug]/page.tsx`
  - `/hosts/[slug]/page.tsx`
  - `/experts/[slug]/page.tsx`
  - `/communities/[slug]/page.tsx`
  - `/events/[slug]/page.tsx`
  - each with unique title, H1, breadcrumb, entity JSON-LD

- [ ] **Step 26** — Create brand pages
  - `/about/page.tsx`
  - `/vision/page.tsx`
  - `/trust/page.tsx`
  - `/join/page.tsx`

- [ ] **Step 27** — Create utility pages
  - `/faq/page.tsx` with `FAQPage` JSON-LD
  - `/privacy/page.tsx`
  - `/terms/page.tsx`
  - `/contact/page.tsx`

- [ ] **Step 28** — Create proof pages
  - `/proofs/page.tsx`
  - `/proofs/[slug]/page.tsx`

---

# PHASE 6 — APP FOUNDATION
## Steps 29–32

- [ ] **Step 29** — Create `apps/app/package.json`
  - same stack as web but no public SEO requirements

- [ ] **Step 30** — Create `apps/app/app/layout.tsx`
  - auth shell
  - role context
  - noindex on all pages

- [ ] **Step 31** — Create core app routes
  - `/dashboard/page.tsx`
  - `/places/page.tsx`
  - `/hosts/page.tsx`
  - `/experts/page.tsx`
  - `/communities/page.tsx`
  - `/events/page.tsx`
  - `/proofs/page.tsx`
  - `/profile/page.tsx`
  - `/settings/page.tsx`

- [ ] **Step 32** — Create core app components
  - `NodeCard`
  - `TrustBadge`
  - `ProofCard`
  - `ActivityFeed`
  - `LocalMap`

---

# PHASE 7 — API + DATA
## Steps 33–38

- [ ] **Step 33** — Create `services/api/`
  - Cloudflare Workers + D1 setup
  - route families: `/v1/places`, `/v1/hosts`, `/v1/experts`, `/v1/communities`, `/v1/events`, `/v1/proofs`, `/v1/trust`

- [ ] **Step 34** — Create `services/auth/`
  - session management
  - role system
  - JWT or session tokens

- [ ] **Step 35** — Create `data/schemas/`
  - `place.json`
  - `host.json`
  - `expert.json`
  - `community.json`
  - `event.json`
  - `proof.json`

- [ ] **Step 36** — Create `data/seed/`
  - minimum 5 real places
  - minimum 3 real hosts
  - minimum 3 real experts
  - minimum 2 real communities
  - minimum 2 real events

- [ ] **Step 37** — Create `services/trust/`
  - trust score calculation
  - verification rules
  - proof validation

- [ ] **Step 38** — Create `services/matching/`
  - local discovery logic
  - ranking rules
  - relevance scoring

---

# PHASE 8 — PRODUCT DOCS
## Steps 39–43

- [ ] **Step 39** — Write `docs/PRODUCT_SPEC_OMDALAT.md`
  - full product specification
  - modules, flows, acceptance criteria

- [ ] **Step 40** — Write `docs/DATA_MODEL_OMDALAT.md`
  - entity definitions
  - relationships
  - field types and constraints

- [ ] **Step 41** — Write `docs/API_SPEC_OMDALAT.md`
  - all routes, methods, request/response shapes
  - auth rules per route

- [ ] **Step 42** — Write `docs/TRUST_ENGINE_OMDALAT.md`
  - trust score inputs and weights
  - verification flow
  - proof submission and validation rules

- [ ] **Step 43** — Write `docs/MATCHING_ENGINE_OMDALAT.md`
  - discovery logic
  - ranking factors
  - local relevance signals

---

# PHASE 9 — CI/CD + DEPLOY
## Steps 44–47

- [ ] **Step 44** — Create `.github/workflows/lint.yml`
  - run on every PR
  - ESLint + TypeScript check

- [ ] **Step 45** — Create `.github/workflows/build.yml`
  - run on every PR
  - build all apps

- [ ] **Step 46** — Create `.github/workflows/deploy-web.yml`
  - deploy `apps/web` to Cloudflare Pages on merge to main

- [ ] **Step 47** — Write `docs/DEPLOYMENT_RUNBOOK_OMDALAT.md`
  - step-by-step deploy for web, app, admin
  - environment variable checklist
  - post-deploy SEO verification checklist

---

# PHASE 10 — SCALE READINESS
## Steps 48–50

- [ ] **Step 48** — Create `apps/admin/`
  - verification review queue
  - proof moderation
  - user management
  - trust score overrides

- [ ] **Step 49** — Create `apps/docs/`
  - public-facing documentation site
  - rendered from markdown or MDX
  - covers: how OMDALAT works, trust system, proof system, API (public parts)

- [ ] **Step 50** — Write `docs/METRICS_OMDALAT.md`
  - define success metrics
  - analytics event naming
  - growth phase targets

---

# FINAL RULE

Steps 1–22 must be complete before any real feature UI is built.

If SEO and workspace foundation are skipped:
- metadata will be patched later expensively
- canonical chaos will appear
- monorepo will become hard to maintain
- DEV will build on an unstable base

Steps 23–50 define the full product surface.
Do not invent features outside this order without explicit product approval.

---

*OMDALAT Repo Build Order — Version 1.0*
