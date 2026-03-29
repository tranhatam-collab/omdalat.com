# OMDALAT.COM
## Full Repository File Tree
## Production-Ready Structure
## Version 1.0

---

# 1. PURPOSE

This file defines the exact folder and file structure for the `omdalat.com` monorepo.

It ensures:
- consistent architecture
- clean scaling
- separation of concerns
- easy onboarding
- zero structural refactor later

**Rule:** Create this structure exactly before writing feature code.

---

# 2. ROOT STRUCTURE

```
omdalat.com/
│
├── apps/
├── packages/
├── services/
├── docs/
├── data/
├── scripts/
├── .github/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .editorconfig
├── .nvmrc
├── .env.example
├── README.md
└── LICENSE
```

---

# 3. APPS STRUCTURE

```
apps/
│
├── web/       # omdalat.com        (public website, SSR, SEO-first)
├── app/       # app.omdalat.com    (user app, authenticated)
├── admin/     # admin.omdalat.com  (internal, noindex)
└── docs/      # docs.omdalat.com   (public documentation)
```

---

# 4. apps/web/  →  omdalat.com

```
apps/web/
│
├── package.json
├── tsconfig.json
├── next.config.js
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── places/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── hosts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── experts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── communities/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── events/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── proofs/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── join/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── vision/
│   │   └── page.tsx
│   ├── trust/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── LiveActivitySection.tsx
│   │   ├── PlacesSection.tsx
│   │   ├── HostsSection.tsx
│   │   ├── ExpertsSection.tsx
│   │   ├── CommunitiesSection.tsx
│   │   ├── EventsSection.tsx
│   │   ├── ProofSection.tsx
│   │   └── JoinSection.tsx
│   ├── cards/
│   │   ├── PlaceCard.tsx
│   │   ├── HostCard.tsx
│   │   ├── ExpertCard.tsx
│   │   ├── CommunityCard.tsx
│   │   ├── EventCard.tsx
│   │   └── ProofCard.tsx
│   ├── navigation/
│   │   └── Breadcrumb.tsx
│   └── shared/
│       ├── TrustBadge.tsx
│       └── EntityMeta.tsx
│
├── lib/
│   ├── metadata.ts        # title, description, OG helper
│   ├── schema.ts          # JSON-LD builders
│   ├── canonical.ts       # canonical URL builder
│   ├── hreflang.ts        # /vi/ /en/ scaffold
│   └── routes.ts          # route constants
│
├── styles/
│   ├── globals.css
│   └── tokens.css         # design tokens
│
└── public/
    ├── robots.txt
    ├── sitemap.xml
    ├── _headers
    ├── _redirects
    ├── icons/
    └── og/
```

---

# 5. apps/app/  →  app.omdalat.com

```
apps/app/
│
├── package.json
├── tsconfig.json
├── next.config.js
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── places/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── hosts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── experts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── communities/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── events/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── proofs/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── AppNav.tsx
│   │   └── AppShell.tsx
│   ├── cards/
│   │   ├── NodeCard.tsx
│   │   └── ProofCard.tsx
│   └── shared/
│       ├── ActivityFeed.tsx
│       ├── LocalMap.tsx
│       └── TrustBadge.tsx
│
└── lib/
    ├── api.ts
    ├── auth.ts
    ├── roles.ts
    └── trust.ts
```

---

# 6. apps/admin/  →  admin.omdalat.com

```
apps/admin/
│
├── package.json
├── tsconfig.json
├── next.config.js
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── users/
│   │   └── page.tsx
│   ├── places/
│   │   └── page.tsx
│   ├── hosts/
│   │   └── page.tsx
│   ├── experts/
│   │   └── page.tsx
│   ├── communities/
│   │   └── page.tsx
│   ├── events/
│   │   └── page.tsx
│   ├── proofs/
│   │   └── page.tsx
│   ├── verifications/
│   │   └── page.tsx
│   └── moderation/
│       └── page.tsx
│
├── components/
│   ├── tables/
│   └── forms/
│
└── lib/
    └── admin-api.ts
```

---

# 7. apps/docs/  →  docs.omdalat.com

```
apps/docs/
│
├── package.json
├── tsconfig.json
├── next.config.js
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── brand/
│   │   └── page.tsx
│   ├── product/
│   │   └── page.tsx
│   ├── seo/
│   │   └── page.tsx
│   ├── trust/
│   │   └── page.tsx
│   ├── api/
│   │   └── page.tsx
│   └── data/
│       └── page.tsx
│
└── content/
    ├── brand/
    ├── product/
    ├── seo/
    ├── trust/
    ├── api/
    └── data/
```

---

# 8. packages/

```
packages/
│
├── ui/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── EmptyState.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── NavItem.tsx
│       ├── PageIntro.tsx
│       └── Section.tsx
│
├── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── community.ts
│       ├── event.ts
│       ├── expert.ts
│       ├── host.ts
│       ├── node.ts
│       ├── place.ts
│       ├── proof.ts
│       ├── trust.ts
│       ├── user.ts
│       └── verification.ts
│
├── core/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── constants.ts
│       ├── routes.ts
│       └── labels.ts
│
└── seo/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts
        ├── canonical.ts
        ├── hreflang.ts
        ├── metadata.ts
        └── schema.ts
```

---

# 9. services/

```
services/
│
├── api/
│   ├── package.json
│   ├── tsconfig.json
│   ├── wrangler.toml
│   └── src/
│       ├── index.ts
│       └── routes/
│           ├── auth.ts
│           ├── communities.ts
│           ├── events.ts
│           ├── experts.ts
│           ├── hosts.ts
│           ├── nodes.ts
│           ├── places.ts
│           ├── proofs.ts
│           └── trust.ts
│
├── auth/
│   ├── package.json
│   └── src/
│       ├── index.ts
│       ├── session.ts
│       └── tokens.ts
│
├── trust/
│   ├── package.json
│   └── src/
│       ├── index.ts
│       ├── calculator.ts
│       ├── proof-validator.ts
│       └── verification.ts
│
└── matching/
    ├── package.json
    └── src/
        ├── index.ts
        ├── local-discovery.ts
        └── ranking.ts
```

---

# 10. data/

```
data/
│
├── README.md
│
├── mock/
│   ├── places.json
│   ├── hosts.json
│   ├── experts.json
│   ├── communities.json
│   ├── events.json
│   └── proofs.json
│
├── schemas/
│   ├── place.schema.json
│   ├── host.schema.json
│   ├── expert.schema.json
│   ├── community.schema.json
│   ├── event.schema.json
│   └── proof.schema.json
│
└── seed/
    ├── README.md
    └── seed.ts
```

---

# 11. docs/

```
docs/
│
├── — EXISTING —
├── BRAND_ARCHITECTURE_OMDALAT.md
├── FILE_TREE_OMDALAT_V1.md               ← this file
├── MASTER_BUILD_SYSTEM_OMDALA_OMDALAT.md
├── MISSING_FILES_AUDIT_OMDALAT.md
├── OMDALAT_BRAND_SYSTEM_LOCK.md
├── OMDALAT_MASTER_LOCK.md
├── OMDALAT_SEO_LOCK.md
├── README_DEV_HANDOFF_OMDALAT.md
├── REPO_BUILD_ORDER_OMDALAT.md
│
├── — TO CREATE (Stage 6) —
├── API_SPEC_OMDALAT.md
├── DATA_MODEL_OMDALAT.md
├── DB_SCHEMA_OMDALAT.md
├── MATCHING_ENGINE_OMDALAT.md
├── PRODUCT_SPEC_OMDALAT.md
├── SCREEN_FLOW_OMDALAT.md
├── TRUST_ENGINE_OMDALAT.md
├── USER_ROLES_OMDALAT.md
│
└── — TO CREATE (Stage 9–10) —
    ├── CLOUDFLARE_SETUP_OMDALAT.md
    ├── DEPLOYMENT_RUNBOOK_OMDALAT.md
    └── METRICS_OMDALAT.md
```

---

# 12. scripts/

```
scripts/
│
├── build.ts
├── generate-sitemap.ts
└── seed-db.ts
```

---

# 13. .github/

```
.github/
│
├── PULL_REQUEST_TEMPLATE.md
└── workflows/
    ├── build.yml
    ├── deploy-app.yml
    ├── deploy-web.yml
    └── lint.yml
```

---

# 14. FILE COUNT OVERVIEW

| Location | Files (V1 target) |
|---|---|
| Root | 10 |
| .github/workflows | 4 |
| apps/web | ~60 |
| apps/app | ~30 |
| apps/admin | ~15 |
| apps/docs | ~12 |
| packages/ui | ~13 |
| packages/types | ~12 |
| packages/core | ~5 |
| packages/seo | ~6 |
| services/api | ~12 |
| services/trust | ~5 |
| services/matching | ~4 |
| data/ | ~16 |
| docs/ | ~22 |
| scripts/ | 3 |
| **Total estimate** | **~230 files** |

---

# 15. NAMING CONVENTIONS

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `PlaceCard.tsx` |
| Lib / utility files | camelCase | `metadata.ts` |
| Route directories | lowercase | `places/` |
| Data files | camelCase | `places.json` |
| Doc files | UPPER_SNAKE | `DATA_MODEL_OMDALAT.md` |
| CSS files | kebab-case | `tokens.css` |
| Config files | camelCase | `next.config.js` |
| Service files | kebab-case.service | `trust.service.ts` |

---

# 16. KEY RULES

```
✓ Follow this tree exactly
✓ Keep web and app components separate
✓ Share types and ui through packages/
✓ SEO utilities live in packages/seo or apps/web/lib
✓ API logic lives in services/, not in apps/
✓ All data schemas live in data/schemas/
✓ Mock data lives in data/mock/

✗ No random folders outside this structure
✗ No duplicate components between web and app
✗ No missing robots.txt or SEO files
✗ No API logic in frontend components
✗ No data access without schema definition
```

---

# 17. FINAL DIRECTIVE

Create this file tree exactly.
Do not improvise structure.

Structure defines:
- speed
- scale
- clarity
- maintainability

If a new file does not fit cleanly into this tree,
the feature or concern needs to be re-evaluated first.

This file is the structure lock for the repository.

---

*OMDALAT File Tree V1 — Version 1.0 — Production-Ready*
