# OMDALAT.COM
## Missing Files Audit
## Final Audit for Dev, Product, Design, and Founder
## Version 1.1

---

# 1. PURPOSE

This document lists the missing files, folders, systems, and implementation layers required to move the `omdalat.com` repository from early structure stage into a buildable production-ready system.

This file exists to:
- identify what is missing
- group missing work by system layer
- prioritize implementation
- prevent build chaos
- reduce rework
- help DEV start in the correct order

---

# 2. CURRENT REPOSITORY STATUS

Repository: `tranhatam-collab/omdalat.com`

Current state:
- root has `apps/`, `data/`, `docs/`, `.gitignore`, `README.md`, `index.html`, `styles.css`
- `apps/app/` and `apps/web/` now contain static-first runtime foundations plus Stage 2 shell work
- `docs/` now contains brand, build, SEO, and core product/data/API/trust/matching specs
- `data/` now contains JSON mock datasets for public and local operating layers

**Conclusion:** The repository has moved beyond direction-only docs, but still lacks several scale and operations files before it can be treated as a full production build foundation.

---

# 3. MISSING FILE GROUPS OVERVIEW

| # | Group | Priority |
|---|---|---|
| 1 | Monorepo and workspace foundation | Critical |
| 2 | App and web runtime files | Critical |
| 3 | SEO foundation files | Critical |
| 4 | Cloudflare deployment files | High |
| 5 | Product documentation | High |
| 6 | Data model and schema | High |
| 7 | API documentation | High |
| 8 | Trust and matching engine docs | High |
| 9 | Shared packages layer | Medium |
| 10 | Admin and internal ops | Medium |
| 11 | CI/CD foundation | Medium |
| 12 | Analytics and observability | Low |

---

# 4. ROOT-LEVEL FOUNDATION STATUS

## Already present

```
package.json
pnpm-workspace.yaml
turbo.json
```

## Still missing

```
.editorconfig
.nvmrc
.env.example
```

## Recommended

```
LICENSE
CHANGELOG.md
CONTRIBUTING.md
CODEOWNERS
SECURITY.md
.github/workflows/
```

**Impact if missing:**
- workspace tooling not standardized
- dependency management not locked
- environment expectations unclear
- CI/CD becomes inconsistent
- new dev onboarding is slow

---

# 5. STATUS — `apps/web`

`apps/web` = `omdalat.com` public website (SSR, SEO-first)

## Already present

```
apps/web/package.json
apps/web/next.config.js
apps/web/tsconfig.json
apps/web/app/layout.tsx
apps/web/app/page.tsx
apps/web/app/places/page.tsx
apps/web/app/hosts/page.tsx
apps/web/app/experts/page.tsx
apps/web/app/communities/page.tsx
apps/web/app/events/page.tsx
apps/web/app/proofs/page.tsx
apps/web/app/join/page.tsx
apps/web/app/about/page.tsx
apps/web/app/vision/page.tsx
apps/web/app/trust/page.tsx
apps/web/app/faq/page.tsx
apps/web/app/privacy/page.tsx
apps/web/app/terms/page.tsx
apps/web/app/contact/page.tsx
```

## Still missing — public / SEO

```
apps/web/public/robots.txt
apps/web/public/sitemap.xml
apps/web/public/_headers
apps/web/public/_redirects
apps/web/public/og/
apps/web/public/icons/
```

## Still missing — detail routes

```
apps/web/app/places/[slug]/page.tsx
apps/web/app/hosts/[slug]/page.tsx
apps/web/app/experts/[slug]/page.tsx
apps/web/app/communities/[slug]/page.tsx
apps/web/app/events/[slug]/page.tsx
apps/web/app/proofs/[slug]/page.tsx
```

## Still missing — support modules

```
apps/web/lib/metadata.ts      ← title, description, OG helper
apps/web/lib/schema.ts        ← JSON-LD builder
apps/web/lib/canonical.ts     ← canonical URL helper
apps/web/lib/breadcrumb.ts    ← breadcrumb builder
apps/web/lib/hreflang.ts      ← hreflang scaffold
```

---

# 6. STATUS — `apps/app`

`apps/app` = `app.omdalat.com` (authenticated dashboard)

## Already present

```
apps/app/README.md
apps/app/index.html
apps/app/app.js
apps/app/styles.css
```

## Still missing — Next.js app runtime

```
apps/app/package.json
apps/app/next.config.js
apps/app/tsconfig.json
apps/app/app/layout.tsx
apps/app/app/page.tsx
apps/app/app/dashboard/page.tsx
apps/app/app/places/page.tsx
apps/app/app/hosts/page.tsx
apps/app/app/experts/page.tsx
apps/app/app/communities/page.tsx
apps/app/app/events/page.tsx
apps/app/app/proofs/page.tsx
apps/app/app/profile/page.tsx
apps/app/app/settings/page.tsx
```

## Still missing — support modules

```
apps/app/lib/auth.ts
apps/app/lib/roles.ts
apps/app/lib/trust.ts
apps/app/components/node-card.tsx
apps/app/components/trust-badge.tsx
apps/app/components/proof-card.tsx
apps/app/components/activity-feed.tsx
```

---

# 7. STATUS — `packages/` LAYER

## Already present

```
packages/README.md
```

## Still missing

```
packages/ui/           ← shared components
packages/core/         ← shared business logic
packages/types/        ← shared TypeScript types
packages/seo/          ← shared SEO utilities
packages/config/       ← shared ESLint, TS, Tailwind configs
```

**Impact if missing:**
- duplicated components across apps
- design tokens drift between web and app
- TypeScript types become inconsistent
- SEO utilities get reimplemented multiple times

---

# 8. STATUS — `services/` LAYER

## Already present

```
services/README.md
```

## Still missing

```
services/api/          ← backend API (Cloudflare Workers / D1)
services/auth/         ← authentication service
services/trust/        ← trust scoring engine
services/matching/     ← local discovery matching
services/notifications/
```

---

# 9. MISSING SEO FOUNDATION

| File | Location | Priority |
|---|---|---|
| `robots.txt` | `apps/web/public/` | Critical |
| `sitemap.xml` | `apps/web/public/` or generated | Critical |
| `_headers` | `apps/web/public/` | High |
| `_redirects` | `apps/web/public/` | High |
| metadata helper | `apps/web/lib/metadata.ts` | Critical |
| JSON-LD builder | `apps/web/lib/schema.ts` | Critical |
| canonical helper | `apps/web/lib/canonical.ts` | Critical |
| hreflang scaffold | `apps/web/lib/hreflang.ts` | Medium |

---

# 10. COMPLETED CORE PRODUCT DOCUMENTATION

| File | Purpose |
|---|---|
| `docs/PRODUCT_SPEC_OMDALAT.md` | Full product specification |
| `docs/SCREEN_FLOW_OMDALAT.md` | Page flows and UX logic |
| `docs/USER_ROLES_OMDALAT.md` | Roles, permissions, access rules |
| `docs/FEATURE_TREE_OMDALAT.md` | Feature hierarchy and priority |
| `docs/CONTENT_MODEL_OMDALAT.md` | Content fields and templates |

---

# 11. COMPLETED CORE DATA MODEL DOCUMENTATION

| File | Purpose |
|---|---|
| `docs/DATA_MODEL_OMDALAT.md` | Entity definitions and relationships |
| `docs/DB_SCHEMA_OMDALAT.md` | Database table schemas |
 
**Still missing in this layer:**

| File | Purpose |
|---|---|
| `data/schemas/place.json` | Place entity schema |
| `data/schemas/host.json` | Host entity schema |
| `data/schemas/expert.json` | Expert entity schema |
| `data/schemas/community.json` | Community entity schema |
| `data/schemas/event.json` | Event entity schema |
| `data/schemas/proof.json` | Proof entity schema |
| `data/seed/` | Seed data for local dev |
| `data/mock/` | Mock data for UI development |

---

# 12. COMPLETED CORE API DOCUMENTATION

| File | Purpose |
|---|---|
| `docs/API_SPEC_OMDALAT.md` | Full API specification |

**Still missing in this layer:**

| File | Purpose |
|---|---|
| `docs/API_ROUTE_MAP_OMDALAT.md` | Route map and method overview |
| `docs/API_AUTH_RULES_OMDALAT.md` | Auth and permission rules |

**Required API route families:**

```
/v1/auth
/v1/nodes
/v1/places
/v1/hosts
/v1/experts
/v1/communities
/v1/events
/v1/proofs
/v1/trust
```

---

# 13. COMPLETED CORE TRUST + MATCHING DOCS

| File | Purpose |
|---|---|
| `docs/TRUST_ENGINE_OMDALAT.md` | Trust scoring logic, inputs, outputs |
| `docs/MATCHING_ENGINE_OMDALAT.md` | Local discovery and matching logic |

**Still missing in this layer:**

| File | Purpose |
|---|---|
| `docs/VERIFICATION_MODEL_OMDALAT.md` | Verification process and rules |
| `docs/PROOF_SYSTEM_OMDALAT.md` | Proof submission and validation |
| `docs/RANKING_RULES_OMDALAT.md` | Visibility and ranking rules |

**Why critical:**
Trust and matching are core to OMDALAT's product identity.
Without these docs, the product becomes a generic directory.

---

# 14. MISSING CLOUDFLARE / DEPLOY FILES

| File | Purpose |
|---|---|
| `_headers` | Security headers, cache rules |
| `_redirects` | URL redirect rules |
| `wrangler.toml` | Cloudflare Workers config (if Workers used) |
| `docs/DEPLOYMENT_RUNBOOK_OMDALAT.md` | Step-by-step deploy process |
| `docs/CLOUDFLARE_SETUP_OMDALAT.md` | Pages + D1 + R2 setup guide |

---

# 15. MISSING CI/CD FILES

```
.github/workflows/lint.yml
.github/workflows/build.yml
.github/workflows/deploy-web.yml
.github/workflows/deploy-app.yml
vitest.config.ts
playwright.config.ts
```

---

# 16. MISSING ADMIN LAYER

```
apps/admin/
apps/admin/package.json
apps/admin/app/layout.tsx
apps/admin/app/dashboard/page.tsx
apps/admin/app/verifications/page.tsx
apps/admin/app/proofs/page.tsx
apps/admin/app/moderation/page.tsx
apps/admin/app/users/page.tsx
```

---

# 17. MISSING DESIGN SYSTEM DOCS

| File | Purpose |
|---|---|
| `docs/OMDALAT_THEME_SYSTEM.md` | Complete design token and theme spec |
| `docs/OMDALAT_COPY_SYSTEM.md` | Voice, tone, copy patterns |
| `docs/OMDALAT_MOTION_SYSTEM.md` | Animation and transition rules |
| `docs/FIGMA_STRUCTURE_OMDALAT.md` | Figma file naming and structure |

---

# 18. PRIORITY ORDER

## Priority 1 — app runtime + SEO foundation

```
apps/app/package.json
apps/app/next.config.js
apps/app/tsconfig.json
apps/app/app/layout.tsx
apps/app/app/page.tsx
apps/web/public/robots.txt
apps/web/public/_headers
apps/web/public/_redirects
apps/web/lib/metadata.ts
apps/web/lib/schema.ts
apps/web/lib/canonical.ts
```

## Priority 2 — public web completion

```
apps/web/app/places/[slug]/page.tsx
apps/web/app/hosts/[slug]/page.tsx
apps/web/app/experts/[slug]/page.tsx
apps/web/app/communities/[slug]/page.tsx
apps/web/app/events/[slug]/page.tsx
apps/web/app/proofs/[slug]/page.tsx
apps/web/public/sitemap.xml
apps/web/public/og/
apps/web/public/icons/
apps/web/lib/breadcrumb.ts
apps/web/lib/hreflang.ts
```

## Priority 3 — shared packages + backend services

```
packages/ui/
packages/core/
packages/types/
packages/seo/
packages/config/
services/api/
services/auth/
services/trust/
services/matching/
services/notifications/
```

## Priority 4 — remaining system docs

```
docs/API_ROUTE_MAP_OMDALAT.md
docs/API_AUTH_RULES_OMDALAT.md
docs/VERIFICATION_MODEL_OMDALAT.md
docs/PROOF_SYSTEM_OMDALAT.md
docs/RANKING_RULES_OMDALAT.md
docs/OMDALAT_THEME_SYSTEM.md
docs/OMDALAT_COPY_SYSTEM.md
docs/OMDALAT_MOTION_SYSTEM.md
docs/FIGMA_STRUCTURE_OMDALAT.md
```

## Priority 5 — operations + quality

```
apps/admin/
apps/docs/
data/seed/
.github/workflows/
vitest.config.ts
playwright.config.ts
docs/DEPLOYMENT_RUNBOOK_OMDALAT.md
docs/METRICS_OMDALAT.md
```

---

# 19. FINAL DIRECTIVE

Do not start building random UI screens first.

Correct order:
1. Finish app runtime
2. Finish public SEO foundation
3. Complete public detail pages
4. Add packages and services
5. Add remaining system docs
6. Add admin, docs, and CI
7. Add seed data, deploy docs, and analytics

---

*OMDALAT Missing Files Audit — Version 1.1*
