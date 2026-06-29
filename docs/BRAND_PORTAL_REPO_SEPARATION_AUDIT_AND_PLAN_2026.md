# BRAND PORTAL — REPO SEPARATION AUDIT & MASTER PLAN 2026

**Date:** 2026-06-18  
**Status:** ARCHITECTURE REVIEW COMPLETE  
**Owner:** Product Lead — Om Dalat Brand Infrastructure  
**Classification:** Strategic — Repo Separation  

---

## PART 1: CURRENT STATE VERIFICATION

### 1.1 DNS Status

| Domain | DNS Status | Verify Command | Result |
|--------|-----------|----------------|--------|
| `brand.omdalat.com` | ✅ ACTIVE | `curl -s https://brand.omdalat.com` | Om Dalat Brand System Portal |
| `lily.omdalat.com` | ⚠️ NXDOMAIN | `nslookup lily.omdalat.com` | **NOT FOUND** |
| `api.omdalat.com` | ✅ ACTIVE | `curl -s https://api.omdalat.com/health` | API operational |
| `omdalat.com` | ✅ ACTIVE | `curl -s https://omdalat.com` | Next.js site live |

**Finding:** `lily.omdalat.com` chưa có DNS record. User cần tạo CNAME trong Cloudflare dashboard:
```
Type: CNAME
Name: lily
Target: brand.omdalat.com
Proxy: Enabled (orange cloud)
```

### 1.2 Brand Portal — Live Status

| Feature | Status | Evidence |
|---------|--------|----------|
| Portal page | ✅ LIVE | `curl https://brand.omdalat.com` |
| Bilingual VI/EN | ✅ | Language switcher in nav |
| 8 sections | ✅ | Hero, Problem, Model, Who, Cases, Roadmap, Lang, CTA |
| SEO meta | ✅ | OG, Twitter, schema, hreflang |
| Lily removed | ✅ | No Lily content on portal |
| Lily case study | ✅ | Card only, not full content |

### 1.3 Code Location (Current)

```
omdalat.com/                          ← monorepo hiện tại
├── workers/
│   ├── api/                           ← API worker (giữ nguyên)
│   └── brand-renderer/                ← ĐANG Ở ĐÂY — sẽ tách ra
│       ├── src/
│       │   ├── index.ts
│       │   └── routes/
│       │       ├── brand-site.ts      ← Portal + Microsite renderer
│       │       └── holding-page.ts
│       └── wrangler.jsonc             ← Route: brand.omdalat.com
├── apps/
│   ├── web/                           ← omdalat.com (giữ nguyên)
│   └── app/                           ← app.omdalat.com (giữ nguyên)
└── docs/
    └── brand-portal/                  ← 12-file DEV PACK
```

---

## PART 2: AUDIT — DEPENDENCIES & COUPLING

### 2.1 Database Coupling

```
brand-renderer/wrangler.jsonc:
├── DB → omdalat-core (D1)            ← SHARED
│   └── migrations_dir: ../api/migrations  ← RELATIVE PATH
└── ASSETS → omdalat-assets (R2)      ← SHARED
```

**Impact:** Brand renderer dùng chung DB `omdalat-core` với API worker. Nếu tách repo, cần quyết định:
- **Option A:** Giữ shared DB — brand-portal repo chỉ deploy worker, dùng DB hiện có
- **Option B:** Tách DB riêng — brand-portal có D1 riêng, sync qua API

**Khuyến nghị:** Option A (shared DB). DB schema brands/places/owners/content_blocks là nền tảng chung. Tách DB sẽ tạo sync complexity không cần thiết.

### 2.2 Code Coupling

| Dependency | Type | Severity | Action |
|-----------|------|----------|--------|
| `itty-router` | npm package | Low | Install in new repo |
| `wrangler` | CLI tool | Low | Install in new repo |
| `omdalat-core` D1 | DB binding | Medium | Share via account_id |
| `omdalat-assets` R2 | Storage binding | Medium | Share via account_id |
| `../api/migrations` | Relative path | High | **MUST FIX** — copy hoặc symlink |
| `packages/core` | Shared TS types | High | **MUST FIX** — publish hoặc duplicate |

### 2.3 Package Dependencies

```json
// workers/brand-renderer/package.json (inferred)
{
  "dependencies": {
    "itty-router": "^5.x"      // lightweight router
  },
  "devDependencies": {
    "wrangler": "^4.x",         // Cloudflare CLI
    "@cloudflare/workers-types": "^4.x"
  }
}
```

**Finding:** Brand renderer có dependency rất nhẹ. Không phụ thuộc vào Next.js, React, hoặc bất kỳ package nào của monorepo.

---

## PART 3: TARGET ARCHITECTURE — REPO ĐỘC LẬP

### 3.1 Repo Structure Mới

```
omdalat-brand-portal/                 ← REPO MỚI
├── README.md
├── wrangler.jsonc                     ← brand.omdalat.com route
├── package.json
├── tsconfig.json
├── .devin/
│   └── skills/
│       └── brand-portal/
│           └── SKILL.md               ← Devin skill for this repo
├── src/
│   ├── index.ts                       ← Worker entry point
│   ├── types/
│   │   └── env.ts                     ← Env interface (from packages/core)
│   ├── routes/
│   │   ├── portal.ts                  ← Brand Portal (brand.omdalat.com)
│   │   ├── brand-site.ts              ← Brand microsite ({brand}.omdalat.com)
│   │   └── holding-page.ts            ← Preview/draft/holding pages
│   ├── lib/
│   │   ├── db.ts                      ← D1 query helpers
│   │   ├── seo.ts                     ← Meta tag generators
│   │   ├── schema.ts                  ← JSON-LD builders
│   │   └── i18n.ts                    ← Translation helpers
│   └── components/
│       ├── PortalLayout.ts            ← Portal HTML shell
│       ├── BrandLayout.ts             ← Microsite HTML shell
│       └── sections/
│           ├── HeroSection.ts
│           ├── ProblemSection.ts
│           ├── ModelSection.ts
│           ├── WhoSection.ts
│           ├── CasesSection.ts
│           ├── RoadmapSection.ts
│           ├── LangSection.ts
│           └── CtaSection.ts
├── migrations/                        ← Copied from omdalat-core (or symlink)
│   ├── 0001_init.sql
│   ├── 0002_brand_factory.sql
│   ├── 0003_brand_content.sql
│   └── 0004_brand_portal.sql
├── docs/
│   └── (12-file DEV PACK copied here)
└── scripts/
    ├── deploy.sh
    └── test.sh
```

### 3.2 4-Layer Architecture (Confirmed)

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: Brand Microsites                                  │
│  lily.omdalat.com | tamfarm.omdalat.com | ...               │
│  Rendered by: omdalat-brand-portal/src/routes/brand-site.ts │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: Brand Portal                                      │
│  brand.omdalat.com                                          │
│  Rendered by: omdalat-brand-portal/src/routes/portal.ts     │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: Ap Dalat                                          │
│  ap.omdalat.com                                             │
│  Repo: omdalat.com/ap.omdalat.com/ (static)               │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: Om Dalat Core                                   │
│  omdalat.com | app.omdalat.com | api.omdalat.com          │
│  Repo: omdalat.com/ (monorepo)                            │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Repo Separation Decision Matrix

| Property | omdalat.com (giữ nguyên) | omdalat-brand-portal (repo mới) |
|----------|---------------------------|----------------------------------|
| **Domain** | omdalat.com, app.omdalat.com, api.omdalat.com | brand.omdalat.com, *.omdalat.com |
| **Framework** | Next.js (web + app) | Cloudflare Worker (pure TS) |
| **Runtime** | Edge (Next.js) | Cloudflare Workers |
| **DB** | omdalat-core D1 (shared) | omdalat-core D1 (shared) |
| **Storage** | omdalat-assets R2 (shared) | omdalat-assets R2 (shared) |
| **Owner model** | Single AI Dev Team (core surfaces, app, api) | Single AI Dev Team (brand asset surfaces) |
| **Deploy** | Vercel/Cloudflare Pages | Cloudflare Workers |
| **CI/CD** | Vercel + Wrangler | Wrangler only |

---

## PART 4: MIGRATION PLAN — 5 PHASES

### Phase 1: Prepare (Week 1)

**Goal:** Tạo repo mới, copy code, verify build.

```bash
# 1. Create new repo
git init omdalat-brand-portal
cd omdalat-brand-portal

# 2. Copy brand-renderer code
cp -r ../omdalat.com/workers/brand-renderer/src/ ./src/
cp ../omdalat.com/workers/brand-renderer/wrangler.jsonc ./
cp ../omdalat.com/workers/brand-renderer/package.json ./ 2>/dev/null || npm init -y

# 3. Copy migrations (decouple from relative path)
cp -r ../omdalat.com/workers/api/migrations/ ./migrations/

# 4. Copy types from packages/core (or create standalone)
# Option: copy only needed types, don't import from monorepo

# 5. Install dependencies
npm install itty-router wrangler @cloudflare/workers-types

# 6. Update wrangler.jsonc
# - Remove "../api/migrations" relative path
# - Set migrations_dir: "./migrations"
# - Keep same DB binding (omdalat-core)
# - Keep same R2 binding (omdalat-assets)

# 7. Test build locally
npx wrangler dev

# 8. Verify on localhost
# curl http://localhost:8787/ → portal
# curl http://localhost:8787/?slug=lily → Lily microsite
```

### Phase 2: Refactor (Week 2)

**Goal:** Tách portal.ts ra khỏi brand-site.ts, tạo component structure.

| Task | Effort | Owner |
|------|--------|-------|
| Extract `portal.ts` from `brand-site.ts` | 4h | AI Dev Team |
| Create component structure (Hero, Problem, Model...) | 8h | AI Dev Team |
| Add type definitions (standalone, no monorepo dep) | 4h | AI Dev Team |
| Create shared lib (db.ts, seo.ts, schema.ts, i18n.ts) | 8h | AI Dev Team |
| Unit tests for components | 8h | AI Dev Team |

**Code Change:**
```typescript
// src/index.ts (NEW)
import { Router } from 'itty-router';
import { handlePortal } from './routes/portal';
import { handleBrandSite } from './routes/brand-site';

const router = Router();

// Route detection
router.get('*', (request, env) => {
  const host = request.headers.get('Host') || '';
  const isPortal = host === 'brand.omdalat.com';
  
  if (isPortal) {
    return handlePortal(request, env);
  }
  return handleBrandSite(request, env);
});
```

### Phase 3: Deploy Parallel (Week 3)

**Goal:** Deploy repo mới song song, test trên staging subdomain.

```bash
# 1. Create staging worker
# wrangler.jsonc staging route: brand-staging.omdalat.com

# 2. Deploy
npx wrangler deploy --env=staging

# 3. Verify
# curl https://brand-staging.omdalat.com → portal
# curl https://brand-staging.omdalat.com/?slug=lily → Lily

# 4. Compare outputs
diff <(curl -s https://brand.omdalat.com) <(curl -s https://brand-staging.omdalat.com)
```

### Phase 4: Switchover (Week 4)

**Goal:** Chuyển brand.omdalat.com sang repo mới.

```bash
# 1. Update DNS (if needed) — usually same worker name
# 2. Deploy production from new repo
npx wrangler deploy --env=production

# 3. Verify
# curl https://brand.omdalat.com → portal (from new repo)

# 4. Monitor for 24h
# Check logs, errors, response times
```

### Phase 5: Cleanup (Week 5)

**Goal:** Xóa brand-renderer khỏi omdalat.com repo.

```bash
# 1. Remove from omdalat.com repo
rm -rf workers/brand-renderer/

# 2. Update root wrangler config (if any)
# Remove brand-renderer references

# 3. Update docs
# Add note: brand-renderer moved to omdalat-brand-portal repo

# 4. Archive old docs (optional)
# Keep for history, but mark as deprecated
```

---

## PART 5: RISK ASSESSMENT

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| DB schema drift | Medium | High | Keep migrations in BOTH repos until fully stable |
| Deploy conflict | Low | High | Use staging environment; 24h monitoring |
| Code divergence | Medium | Medium | Weekly sync meetings; shared API spec |
| R2 asset path change | Low | Medium | Keep same bucket; same path structure |
| DNS misconfiguration | Low | High | Test staging first; keep old config backup |
| Team confusion | Medium | Low | Clear README; repo naming; onboarding docs |

---

## PART 6: DEFINITION OF DONE (Repo Separation)

- [ ] `omdalat-brand-portal` repo created and initialized
- [ ] All brand-renderer code migrated + builds successfully
- [ ] No relative paths to `../api/migrations` or `packages/core`
- [ ] `brand.omdalat.com` serves portal from NEW repo
- [ ] `{brand}.omdalat.com` serves microsites from NEW repo
- [ ] Old `workers/brand-renderer/` removed from `omdalat.com` repo
- [ ] DB still shared (`omdalat-core`) with clear ownership
- [ ] R2 still shared (`omdalat-assets`) with clear ownership
- [ ] Staging environment (`brand-staging.omdalat.com`) operational
- [ ] Deploy from new repo documented and tested
- [ ] Team knows which repo to work in

---

## PART 7: GIT REPO CREATION SCRIPT

```bash
#!/bin/bash
# scripts/create-brand-portal-repo.sh

set -e

SRC="/Users/tranhatam/Documents/Devnewproject/omdalat.com"
DEST="/Users/tranhatam/Documents/Devnewproject/omdalat-brand-portal"

echo "=== Creating omdalat-brand-portal repo ==="

# 1. Init repo
mkdir -p "$DEST"
cd "$DEST"
git init

# 2. Copy source code
cp -r "$SRC/workers/brand-renderer/src" ./

# 3. Copy and fix wrangler config
cp "$SRC/workers/brand-renderer/wrangler.jsonc" ./
# Fix: change migrations_dir from "../api/migrations" to "./migrations"
sed -i '' 's|"../api/migrations"|"./migrations"|g' wrangler.jsonc

# 4. Copy migrations
cp -r "$SRC/workers/api/migrations" ./

# 5. Create package.json
cat > package.json << 'EOF'
{
  "name": "omdalat-brand-portal",
  "version": "1.0.0",
  "description": "Om Dalat Brand System Portal — Renders brand.omdalat.com and all brand microsites",
  "main": "src/index.ts",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "deploy:staging": "wrangler deploy --env=staging",
    "test": "vitest"
  },
  "dependencies": {
    "itty-router": "^5.0.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240614.0",
    "wrangler": "^4.0.0",
    "vitest": "^2.0.0"
  }
}
EOF

# 6. Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*"]
}
EOF

# 7. Copy DEV PACK docs
mkdir -p docs
cp -r "$SRC/docs/brand-portal/"* ./docs/

# 8. Create README
cat > README.md << 'EOF'
# Om Dalat Brand System Portal

**Domain:** brand.omdalat.com  
**Purpose:** Strategic portal and brand microsite renderer for the Om Dalat brand infrastructure.

## Quick Start

```bash
npm install
npm run dev        # Local dev
npm run deploy     # Production deploy
```

## Architecture

- `src/routes/portal.ts` — brand.omdalat.com (portal)
- `src/routes/brand-site.ts` — {brand}.omdalat.com (microsites)
- `src/routes/holding-page.ts` — preview/draft pages

## Dev Pack

See `docs/` for 12 specification files.

## Shared Resources

- **DB:** `omdalat-core` (D1) — owned by omdalat.com repo
- **Storage:** `omdalat-assets` (R2) — owned by omdalat.com repo
EOF

# 9. Git commit
git add .
git commit -m "feat(init): migrate from omdalat.com monorepo\n\n- Brand renderer extracted to standalone repo\n- Portal + microsite renderer separated\n- DEV PACK docs included\n- Shared DB/R2 bindings preserved"

echo "=== Done ==="
echo "Next steps:"
echo "  cd $DEST"
echo "  npm install"
echo "  npm run dev"
```

---

## PART 8: SUMMARY

### What Happens to omdalat.com Repo?

| Component | Action |
|-----------|--------|
| `apps/web/` | **KEEP** — omdalat.com public site |
| `apps/app/` | **KEEP** — app.omdalat.com member app |
| `workers/api/` | **KEEP** — api.omdalat.com (may merge with brand-portal later) |
| `workers/brand-renderer/` | **REMOVE** after migration complete |
| `ap.omdalat.com/` | **KEEP** — static editorial site |
| `docs/brand-portal/` | **COPY** to new repo, keep in old for history |

### What Happens to brand.omdalat.com?

| Property | Before | After |
|----------|--------|-------|
| Repo | `omdalat.com/workers/brand-renderer/` | `omdalat-brand-portal/` |
| Deploy | From monorepo | From standalone repo |
| Code | Single `brand-site.ts` | `portal.ts` + `brand-site.ts` + components |
| DB | Shared `omdalat-core` | Still shared `omdalat-core` |
| Owner model | Single AI Dev Team | Single AI Dev Team |

### Timeline

| Phase | Duration | Week |
|-------|----------|------|
| Prepare (repo creation, code copy) | 1 week | Week 1 |
| Refactor (component separation) | 1 week | Week 2 |
| Deploy Parallel (staging test) | 1 week | Week 3 |
| Switchover (production cut) | 1 week | Week 4 |
| Cleanup (remove from old repo) | 1 week | Week 5 |
| **Total** | **5 weeks** | |

---

## CÂU KHÓA CHO KẾ HOẠCH THỰC THI

> `brand.omdalat.com` không còn nằm trong repo `omdalat.com`.  
> Nó có repo riêng: `omdalat-brand-portal`.  
> Toàn bộ việc tách repo và vận hành bề mặt brand asset thuộc một `AI Dev Team` duy nhất, không chia lane thực thi nội bộ.  
> DB và R2 vẫn dùng chung — đó là hợp đồng (contract), không phải coupling.

---

**Locked:** 2026-06-18  
**Next review:** After Phase 2 (Refactor complete)

---

## PART 9: BRAND ASSET NETWORK UPDATE (2026-06-29)

This repo separation plan remains valid for `brand.omdalat.com`, but it is now a subset of the larger Brand Asset Network plan.

New governing file:

* `docs/OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md`

Updated interpretation:

* `brand.omdalat.com` is the Brand Factory, verification intake, and case-study surface.
* `brand.omdalat.com` must not become the marketplace checkout surface.
* `market.omdalat.com` is the future curated marketplace for sale, licensing, and private offers.
* `registry.omdalat.com` is the source of public provenance, evidence summaries, verification labels, and transfer state.
* `auction.omdalat.com` is disabled for official auction workflows until legal signoff, bidder qualification, settlement workflow, dispute rules, and kill switch exist.

Additional hard stops:

* Do not claim a brand asset is fully verified when only identity is verified.
* Do not claim ownership transferred when only contract or payment state changed.
* Do not use NFT or credential ownership as legal title.
* Do not let Brand Portal repo own transaction settlement or escrow logic.

Impact on repo separation:

The future `omdalat-brand-portal` repo may render Brand Factory pages and brand microsites, but the transaction modules should remain behind API/runtime contracts owned by the single AI Dev Team and governed by the release gates in the execution lock.
