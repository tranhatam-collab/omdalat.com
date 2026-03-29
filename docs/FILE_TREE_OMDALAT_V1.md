# OMDALAT.COM
## Complete File Tree — V1
## Reference Directory Structure for DEV
## Version 1.0

---

# PURPOSE

This file defines the complete target directory structure for the `omdalat.com` monorepo.

Use this as the single reference when:
- setting up the repo from scratch
- onboarding a new developer
- reviewing what has been built vs what is missing
- planning next work in the correct location

Levels shown: root → L1 → L2 → L3

---

# ROOT

```
omdalat.com/
├── .editorconfig
├── .env.example
├── .gitignore
├── .nvmrc
├── CHANGELOG.md
├── CODEOWNERS
├── LICENSE
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
│
├── .github/
├── apps/
├── data/
├── docs/
├── packages/
└── services/
```

---

# .github/

```
.github/
├── PULL_REQUEST_TEMPLATE.md
└── workflows/
    ├── build.yml
    ├── deploy-app.yml
    ├── deploy-web.yml
    └── lint.yml
```

---

# apps/

```
apps/
├── admin/
├── app/
├── docs/
└── web/
```

---

## apps/web/  →  omdalat.com

```
apps/web/
├── package.json
├── next.config.js
├── tsconfig.json
│
├── app/
│   ├── layout.tsx                  root layout
│   ├── page.tsx                    homepage
│   ├── about/
│   │   └── page.tsx
│   ├── communities/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── events/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── experts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── hosts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── join/
│   │   └── page.tsx
│   ├── places/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── proofs/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── trust/
│   │   └── page.tsx
│   └── vision/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
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
│   └── shared/
│       ├── Breadcrumb.tsx
│       ├── EntityCard.tsx
│       ├── TrustBadge.tsx
│       └── ProofCard.tsx
│
├── lib/
│   ├── canonical.ts
│   ├── hreflang.ts
│   ├── metadata.ts
│   └── schema.ts
│
├── public/
│   ├── _headers
│   ├── _redirects
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── icons/
│   └── og/
│
└── styles/
    ├── globals.css
    └── tokens.css
```

---

## apps/app/  →  app.omdalat.com

```
apps/app/
├── package.json
├── next.config.js
├── tsconfig.json
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── communities/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── events/
│   │   └── page.tsx
│   ├── experts/
│   │   └── page.tsx
│   ├── hosts/
│   │   └── page.tsx
│   ├── places/
│   │   └── page.tsx
│   ├── proofs/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── AppNav.tsx
│   │   └── AppShell.tsx
│   └── shared/
│       ├── ActivityFeed.tsx
│       ├── LocalMap.tsx
│       ├── NodeCard.tsx
│       ├── ProofCard.tsx
│       └── TrustBadge.tsx
│
└── lib/
    ├── auth.ts
    ├── roles.ts
    └── trust.ts
```

---

## apps/admin/  →  admin.omdalat.com

```
apps/admin/
├── package.json
├── next.config.js
├── tsconfig.json
│
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── communities/
    │   └── page.tsx
    ├── events/
    │   └── page.tsx
    ├── experts/
    │   └── page.tsx
    ├── hosts/
    │   └── page.tsx
    ├── moderation/
    │   └── page.tsx
    ├── places/
    │   └── page.tsx
    ├── proofs/
    │   └── page.tsx
    ├── users/
    │   └── page.tsx
    └── verifications/
        └── page.tsx
```

---

## apps/docs/  →  docs.omdalat.com

```
apps/docs/
├── package.json
├── next.config.js
├── tsconfig.json
│
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── api/
    │   └── page.tsx
    ├── brand/
    │   └── page.tsx
    ├── data-model/
    │   └── page.tsx
    ├── product/
    │   └── page.tsx
    ├── seo/
    │   └── page.tsx
    └── trust/
        └── page.tsx
```

---

# packages/

```
packages/
├── config/
├── core/
├── seo/
├── types/
└── ui/
```

## packages/config/

```
packages/config/
├── package.json
├── eslint.js
├── tailwind.js
└── tsconfig.base.json
```

## packages/types/

```
packages/types/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── community.ts
    ├── event.ts
    ├── expert.ts
    ├── host.ts
    ├── node.ts
    ├── place.ts
    ├── proof.ts
    ├── trust.ts
    ├── user.ts
    └── verification.ts
```

## packages/ui/

```
packages/ui/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── Container.tsx
    ├── EmptyState.tsx
    ├── Input.tsx
    ├── Modal.tsx
    ├── NavItem.tsx
    ├── PageIntro.tsx
    └── Section.tsx
```

## packages/core/

```
packages/core/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── constants.ts
    ├── routes.ts
    └── labels.ts
```

## packages/seo/

```
packages/seo/
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

# services/

```
services/
├── api/
├── auth/
├── matching/
├── notifications/
└── trust/
```

## services/api/

```
services/api/
├── package.json
├── tsconfig.json
├── wrangler.toml
└── src/
    ├── index.ts
    └── routes/
        ├── auth.ts
        ├── communities.ts
        ├── events.ts
        ├── experts.ts
        ├── hosts.ts
        ├── nodes.ts
        ├── places.ts
        ├── proofs.ts
        └── trust.ts
```

## services/trust/

```
services/trust/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── calculator.ts
    ├── proof-validator.ts
    └── verification.ts
```

## services/matching/

```
services/matching/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── local-discovery.ts
    └── ranking.ts
```

---

# data/

```
data/
├── README.md
├── mock/
│   ├── communities.json
│   ├── events.json
│   ├── experts.json
│   ├── hosts.json
│   ├── places.json
│   └── proofs.json
├── schemas/
│   ├── community.json
│   ├── event.json
│   ├── expert.json
│   ├── host.json
│   ├── place.json
│   └── proof.json
└── seed/
    └── README.md
```

---

# docs/

```
docs/
├── BRAND_ARCHITECTURE_OMDALAT.md
├── FILE_TREE_OMDALAT_V1.md             ← this file
├── MASTER_BUILD_SYSTEM_OMDALA_OMDALAT.md
├── MISSING_FILES_AUDIT_OMDALAT.md
├── OMDALAT_BRAND_SYSTEM_LOCK.md
├── OMDALAT_MASTER_LOCK.md
├── OMDALAT_SEO_LOCK.md
├── README_DEV_HANDOFF_OMDALAT.md
├── REPO_BUILD_ORDER_OMDALAT.md
│
├── API_SPEC_OMDALAT.md                 (to create — Stage 6)
├── CLOUDFLARE_SETUP_OMDALAT.md         (to create — Stage 9)
├── DATA_MODEL_OMDALAT.md               (to create — Stage 6)
├── DB_SCHEMA_OMDALAT.md                (to create — Stage 6)
├── DEPLOYMENT_RUNBOOK_OMDALAT.md       (to create — Stage 9)
├── MATCHING_ENGINE_OMDALAT.md          (to create — Stage 6)
├── METRICS_OMDALAT.md                  (to create — Stage 10)
├── OMDALAT_MOTION_SYSTEM.md            (to create — Stage 4)
├── PRODUCT_SPEC_OMDALAT.md             (to create — Stage 6)
├── SCREEN_FLOW_OMDALAT.md              (to create — Stage 6)
├── TRUST_ENGINE_OMDALAT.md             (to create — Stage 6)
└── USER_ROLES_OMDALAT.md               (to create — Stage 6)
```

---

# FILE COUNT OVERVIEW

| Location | Files in V1 target |
|---|---|
| Root | 10 files |
| .github/workflows | 4 files |
| apps/web | ~60 files |
| apps/app | ~30 files |
| apps/admin | ~15 files |
| apps/docs | ~10 files |
| packages/ui | ~15 files |
| packages/types | ~12 files |
| packages/core | ~5 files |
| packages/seo | ~6 files |
| packages/config | ~4 files |
| services/api | ~12 files |
| services/trust | ~5 files |
| services/matching | ~4 files |
| data/ | ~15 files |
| docs/ | ~22 files |
| **Total estimate** | **~240 files** |

---

# NAMING CONVENTIONS

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `PlaceCard.tsx` |
| Lib/utility files | camelCase | `metadata.ts` |
| Route directories | lowercase-hyphen | `places/` |
| Data files | lowercase-hyphen | `places.json` |
| Doc files | UPPER_SNAKE_CASE | `DATA_MODEL_OMDALAT.md` |
| CSS files | lowercase-hyphen | `tokens.css` |
| Config files | camelCase or dotfile | `next.config.js` |

---

# FINAL RULE

This tree is the V1 target.
Not everything must exist on day one.
But nothing should be created outside this structure without approval.

If a new file does not fit cleanly into this tree,
it is a signal that the feature or concern needs to be re-evaluated.

---

*OMDALAT File Tree V1 — Version 1.0*
