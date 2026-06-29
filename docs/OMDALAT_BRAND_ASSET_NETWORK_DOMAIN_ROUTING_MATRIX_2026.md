# OMDALAT BRAND ASSET NETWORK — DOMAIN ROUTING MATRIX

**Artifact ID:** BAN-P0-001  
**Owner:** Single AI Dev Team  
**Status:** LOCKED  
**Date:** 2026-06-29  
**Source:** `docs/OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md` section 3

---

## 1. Canonical domain registry

| Domain | Role | Phase live | Runtime | Repo | Route handler |
|--------|------|-----------|---------|------|---------------|
| `omdalat.com` | Core public system (living, working, learning, community, staying) | Phase 0 | Vercel (Next.js) | `omdalat.com` | Next.js app router |
| `www.omdalat.com` | Alias of `omdalat.com` | Phase 0 | Vercel | `omdalat.com` | Next.js app router |
| `app.omdalat.com` | Member, operator, admin runtime | Phase 0 | Vercel | `omdalat.com` | Next.js app router |
| `api.omdalat.com` | API gateway and operational APIs | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/api` | `itty-router` |
| `brand.omdalat.com` | Brand Factory + verification intake | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `asset-network.ts` + `brand-site.ts` |
| `lily.omdalat.com` | Lily brand microsite | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `brand-site.ts` |
| `vuonhong3.omdalat.com` | Vuon Hong 3 brand microsite | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `brand-site.ts` |
| `registry.omdalat.com` | Provenance, rights evidence, transfer status, credentials | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `asset-network.ts` `handleRegistrySite` |
| `market.omdalat.com` | Curated marketplace (request-access only in Phase 0) | Phase 0 | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `asset-network.ts` `handleMarketSite` |
| `auction.omdalat.com` | Auction — legal-readiness mode only | Phase 0 (legal-readiness), Phase 3+ (live) | Cloudflare Workers | `omdalat.com` `workers/brand-renderer` | `asset-network.ts` `handleAuctionSite` |
| `ap.omdalat.com` | Editorial and local stories | Phase 0 | Static (Cloudflare Pages) | `omdalat.com` `ap.omdalat.com/` | Static HTML |
| `cham.omdalat.com` | Independent project — registration platform | Phase 0 | Cloudflare Workers (OpenNext) | `tranhatam-collab/cham.omdalat.com` | Next.js on Workers |
| `dreams.omdalat.com` | Independent project — dreams platform | Phase 0 | Cloudflare Workers (OpenNext) | `tranhatam-collab/dreams.omdalat.com` | Next.js on Workers |

---

## 2. DNS records (Cloudflare zone `omdalat.com`)

| Subdomain | Type | Content | Proxied | Created |
|-----------|------|---------|---------|---------|
| `registry` | A | `192.0.2.1` | yes | 2026-06-29 |
| `market` | A | `192.0.2.1` | yes | 2026-06-29 |
| `auction` | A | `192.0.2.1` | yes | 2026-06-29 |
| `api` | AAAA | `100::` (Worker custom domain) | yes | 2026-06-17 |
| `brand` | (custom domain Worker) | — | yes | 2026-06-17 |
| `lily` | (route `lily.omdalat.com/*`) | — | yes | 2026-06-17 |
| `vuonhong3` | (route `vuonhong3.omdalat.com/*`) | — | yes | 2026-06-17 |

---

## 3. Worker route bindings

### `omdalat-brand-renderer-production`
- `brand.omdalat.com` (custom domain)
- `registry.omdalat.com/*` (zone route)
- `market.omdalat.com/*` (zone route)
- `auction.omdalat.com/*` (zone route)

### `omdalat-brand-renderer` (legacy, non-production)
- `lily.omdalat.com/*` (zone route)
- `vuonhong3.omdalat.com/*` (zone route)

### `omdalat-platforms-api-production`
- `api.omdalat.com` (custom domain)
- Producer for `omdalat-automation` queue

---

## 4. Routing logic (brand-renderer `src/index.ts`)

```
Request → extract Host → split subdomain
  if subdomain === 'registry' → handleRegistrySite
  if subdomain === 'market'   → handleMarketSite
  if subdomain === 'auction'  → handleAuctionSite
  if subdomain === 'brand' AND path includes 'apply' → handleBrandFactoryApply
  else → handleBrandSite (brand microsite lookup by slug)
```

---

## 5. Prohibited routing patterns

| Pattern | Reason |
|---------|--------|
| `?slug=` query override on brand-renderer | Tenant leakage — rejected with 403 |
| `brand.omdalat.com/<slug>` as brand site | Redirects to `<slug>.omdalat.com` (301) |
| `api.omdalat.com` served by brand-renderer | Was broken by `*.omdalat.com/*` catch-all — fixed 2026-06-29 by using specific routes |
| `auction.omdalat.com` with live bid/buy buttons | Hard stop until P3 legal partner signoff |
| `market.omdalat.com` with buy-now checkout | Hard stop — request-access only in Phase 0 |

---

## 6. Verification

- `curl -sI https://registry.omdalat.com` → 200 ✅
- `curl -sI https://market.omdalat.com` → 200 ✅
- `curl -sI https://auction.omdalat.com` → 200 ✅
- `curl -sI https://brand.omdalat.com/apply` → 200 ✅
- `curl -s https://api.omdalat.com/health` → `{"status":"ok"}` ✅
- `curl -sI https://lily.omdalat.com` → 200 ✅

---

Locked. Any new `*.omdalat.com` subdomain must be registered here before going live.
