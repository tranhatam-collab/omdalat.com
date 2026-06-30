# OMDALAT SUBDOMAIN RESPONSIBILITY LOCK — 2026

**Status:** AUTHORITATIVE (locks subdomain ownership; supersedes ad-hoc decisions)
**Owner:** Tran Ha Tam
**Last updated:** 2026-06-30 (post-remediation: F1–F6 fixed, anti-confusion CI active, brand charters created)
**Scope:** Every hostname under `omdalat.com` + the sibling `ap.omdalat.com` editorial property + `docs.omdala.com`.

> This document exists to make subdomain responsibilities **unambiguous and impossible to confuse**, especially `ap.omdalat.com` vs `app.omdalat.com`. If a change contradicts this file, the change is wrong until this file is updated and re-approved.

---

## 0. The two-letter rule that must never be broken

```
ap.omdalat.com   →  "Ấp Đà Lạt"   →  EDITORIAL / IDENTITY   →  READ, FEEL, UNDERSTAND
app.omdalat.com  →  "Ôm Đà Lạt App" →  MEMBER RUNTIME / APP   →  DO, ACT, PARTICIPATE
```

- `ap` = **một chữ p** = nội dung biên tập, bản sắc, con người, nơi chốn, nhịp sống. **Không** đăng nhập, **không** booking, **không** dashboard.
- `app` = **hai chữ p** = ứng dụng thành viên đã đăng nhập (dashboard, hồ sơ, request, proof).
- They are **sibling layers, not funnel stages**. `ap` is NOT a pre-landing page for `app`, and `app` is NOT a logged-in version of `ap`.
- **No build, middleware, redirect, DNS, or copy may merge, alias, or redirect these two into each other.** (See QA finding F2 — **FIXED 2026-06-30**: `ap.omdalat.com` removed from `LEGACY_APP_HOSTS` in both `apps/web/middleware.ts` and `apps/app/middleware.ts`. Anti-confusion CI guard enforces this rule going forward.)

---

## 1. Canonical property map (locked)

| # | Hostname | Brand name | Mission (one line) | Source of truth (repo) | Cloudflare resource | Type |
|---|----------|-----------|--------------------|------------------------|---------------------|------|
| 1 | `omdalat.com`, `www.omdalat.com` | **Ôm Đà Lạt** (root) | Public marketing + navigation hub: explain the system, route people in | `apps/web` (`@omdalat/web`) | `omdalat-web` | Pages |
| 2 | `app.omdalat.com`, `www.app.omdalat.com` | **Ôm Đà Lạt App** | Authenticated member runtime: dashboard, profile, requests, proofs | `apps/app` (`@omdalat/app`) | `omdalat-app-v2` (Pages project, serving `apps/app` since 2026-06-30 F1 fix) | Pages |
| 3 | `ap.omdalat.com` | **Ấp Đà Lạt** | Editorial / identity layer: people, places, rhythms, stories, images | `ap.omdalat.com/` (static) | `omdalat-ap` (Pages project `ap-omdalat`) | Static Pages |
| 4 | `api.omdalat.com` | **BAN Platform API** | Brand Asset Network REST API + brand factory backend | `workers/api` (`omdalat-platforms-api`) | `omdalat-platforms-api-production` | Worker |
| 5 | `brand.omdalat.com` | **Brand Factory** | Seller intake, package build, evidence submit, per-brand redirect | `workers/brand-renderer` | `omdalat-brand-renderer-production` | Worker |
| 6 | `lily.omdalat.com` | **Lily** (brand) | Per-brand public site (residency + stay + programs) | `workers/brand-renderer` (D1-driven) | `omdalat-brand-renderer-production` | Worker route |
| 7 | `vuonhong3.omdalat.com` | **Vườn Hồng 3** (brand) | Per-brand public site | `workers/brand-renderer` (D1-driven) | `omdalat-brand-renderer-production` | Worker route |
| 8 | `registry.omdalat.com` | **Registry** | Provenance + public evidence summary + credential view | `workers/brand-renderer` (`asset-network.ts`) | `omdalat-brand-renderer-production` | Worker route |
| 9 | `market.omdalat.com` | **Brand Asset Market** | Marketplace listings + data room + inquiry | `workers/brand-renderer` (`asset-network.ts`) | `omdalat-brand-renderer-production` | Worker route |
| 10 | `auction.omdalat.com` | **Auction** | Auction info only; live bidding **BLOCKED** pending legal | `workers/brand-renderer` (`asset-network.ts`) | `omdalat-brand-renderer-production` | Worker route |
| 11 | `docs.omdala.com` | **OMDALA Docs** | Global ecosystem documentation (note: `omdala.com`, not `omdalat.com`) | `apps/docs` (`@omdalat/docs`) | `omdalat-docs` | Pages/static |

**Email / infra records** (`em563`, `s1/s2._domainkey`, `dkim`, `_dmarc`, MX/SPF/TXT on apex) are owned by the **email/deliverability** function and are out of scope for product teams. Do not touch without coordination.

---

## 2. Per-property responsibility detail

### 2.1 `omdalat.com` — Ôm Đà Lạt Root (PUBLIC WEB)
- **Code:** `apps/web` → Pages project `omdalat-web` → DNS CNAME `omdalat-web-ezk.pages.dev`.
- **Mission:** The public front door. Explains the four pillars (Life / Work / Learning / Community), hosts public guides/articles, and starts the member registration flow.
- **Indexing:** SEO-indexed. `/member/*`, `/internal/*`, `/admin/*` are `noindex`.
- **Owns these routes:** `/`, `/about`, `/life`, `/community`, `/work`, `/learning`, `/stay`, `/articles[/slug]`, `/contact`, `/join`, `/docs/*`, `/privacy`, `/terms`, `/communities/[slug]`, `/places/[slug]`, `/proofs/[slug]`, plus the public-facing `/member/*` entry pages (login/register/verify/welcome/status).
- **Must NOT:** Be the authenticated runtime. Public `/member/*` pages here are entry/marketing surfaces only; the real logged-in workspace lives on `app.omdalat.com`.
- **Canonical origin:** `https://omdalat.com` (`apps/web/lib/canonical.ts`).

### 2.2 `app.omdalat.com` — Ôm Đà Lạt App (MEMBER RUNTIME)
- **Code:** `apps/app` (`@omdalat/app`) → Pages project `omdalat-app`.
- **Mission:** The authenticated member runtime / operations workspace. Dashboard, profile, settings, requests, proofs, earnings, host/expert/contributor tooling, admin review.
- **Indexing:** **Fully `noindex`** (`robots.txt` Disallow all; layout sets `index:false`). It must never compete with `omdalat.com` or `ap.omdalat.com` in search.
- **Auth:** Required. Google OAuth + session. Session cookie domain `.omdalat.com`.
- **Owns these routes:** `/dashboard`, `/profile`, `/settings`, `/earnings`, `/proofs`, `/resources`, `/contributor`, `/admin/review`, and the runtime versions of `/places`, `/hosts`, `/experts`, `/communities`, `/events`, `/work`, `/stay`, `/learning`, plus `/api/*` (auth, member, places, work, stay, support, admin).
- **Must NOT:** Serve `apps/web`. Must NOT redirect or absorb `ap.omdalat.com`. Must NOT be indexed.
- **Canonical origin:** `https://app.omdalat.com` (`apps/app/wrangler.toml` → `NEXT_PUBLIC_APP_ORIGIN`).

### 2.3 `ap.omdalat.com` — Ấp Đà Lạt (EDITORIAL — DISTINCT PROPERTY)
- **Code:** `ap.omdalat.com/` directory — **pure static HTML + vanilla JS**, CMS-first JSON in `content/cms/*.json`. Not Next.js. Not a Worker.
- **Mission:** The editorial / identity layer for Đà Lạt. People, places, rhythms, work-life, stories, image essays. Builds organic authority and emotional belonging; soft-bridges to `omdalat.com` **only** when reader intent shifts to participation.
- **It is NOT:** a tourism site, booking site, lodging directory, dashboard, member app, or a duplicate of `omdalat.com`. (Per `APDALAT_INFORMATION_ARCHITECTURE_2026.md`.)
- **Sections:** `con-nguoi` (people), `noi-chon` (places), `nhip-song` (rhythms), `lam-viec` (work), `cau-chuyen` (stories), `hinh-anh` (images), `chu-de` (topics), `ve-ap-da-lat` (about), `om-ap-da-lat` (bridge), `faq`, `lien-he`, `tim-kiem`, plus `/en/` mirror.
- **Branding:** Site name is **"Ấp Đà Lạt" / "Ap Dalat"**. The phrase **"Ôm Ấp Đà Lạt"** is a *bridge concept on the `om-ap-da-lat` page only* — it is NOT the site's primary name.
- **SEO ownership (locked split):** `ap` owns editorial/long-tail keywords (Ấp Đà Lạt, nhịp sống Đà Lạt, con người Đà Lạt, câu chuyện Đà Lạt, hình ảnh Đà Lạt, làm việc online từ Đà Lạt, …). `om` owns participation keywords (Ôm Đà Lạt, ở lại Đà Lạt, tham gia cộng đồng, thành viên …). Neither may cannibalize the other's territory.
- **Must NOT:** Be confused with `app.omdalat.com`. Be redirected to `app`. Carry login/booking/dashboard. (Per `APDALAT_TO_OMDALAT_LINKING_RULES_2026.md`, linking is intent-gated and rare.)

### 2.4 `api.omdalat.com` — BAN Platform API (BACKEND)
- **Code:** `workers/api` → `omdalat-platforms-api-production`.
- **Mission:** The single backend for the brand factory + asset network: intake, preview, approval, publish, compliance (audited), content-blocks (overclaim-validated), admin auth, registry/market/auction/evidence/transfer/offer APIs, payments, uploads.
- **Must NOT:** Render public HTML pages or own SEO. It is JSON/HTTP only.

### 2.5 `brand.omdalat.com` — Brand Factory portal (WORKER)
- **Code:** `workers/brand-renderer` (`brand-site.ts` portal branch + `asset-network.ts` factory handlers).
- **Mission:** Seller-facing portal: apply/intake, verify, evidence, cases, dashboard. Also redirects `brand.omdalat.com/<slug>` → `<slug>.omdalat.com`.
- **Tenant isolation rule:** Brand is resolved from the **Host header only**. `?slug=` override returns **403**. Never trust query/path for tenant identity.

### 2.6 Per-brand sites (`lily`, `vuonhong3`, future brands) — WORKER ROUTES
- **Code:** `workers/brand-renderer/brand-site.ts`, data from D1 `omdalat-core`.
- **Mission:** Each brand subdomain renders **only that brand's** published content. One brand = one subdomain = one row in `brands`.
- **Gates (locked, must stay in parity):** see §4.

### 2.7 `registry` / `market` / `auction` — Asset Network surfaces — WORKER ROUTES
- **Code:** `workers/brand-renderer/asset-network.ts`.
- **Mission:** `registry` = provenance/evidence; `market` = listings/data-room/inquiry; `auction` = info only (live bidding **BLOCKED** until legal signoff — do not enable without owner approval).

### 2.8 `docs.omdala.com` — Global docs
- **Code:** `apps/docs`. Note the **root domain is `omdala.com`**, not `omdalat.com`. Do not bind it to an `omdalat.com` host.

---

## 3. Anti-confusion rules (hard rules for dev team)

1. **One source of truth per host.** A hostname maps to exactly one repo path and one Cloudflare resource (table §1). No host may be served by two codebases.
2. **`app` serves `apps/app`. `web` (root) serves `apps/web`.** A deploy that pushes `apps/web` to the `app.omdalat.com` project is a release-blocking defect.
3. **`ap` is never redirected.** No middleware `LEGACY_APP_HOSTS` entry, no Page Rule, no Worker route may send `ap.omdalat.com` or `www.ap.omdalat.com` to `app` or `web`. `ap` is its own static property.
4. **`noindex` discipline.** `app.omdalat.com` is fully `noindex`. `omdalat.com` and `ap.omdalat.com` are indexable and own disjoint keyword sets (§2.3).
5. **Tenant isolation by Host only** for brand renderer (`?slug=` → 403).
6. **Compliance fields are legal assertions** — only set via the audited `/api/omdalat/brands/:id/compliance` route with `evidence_map` + `reason`. Never via direct SQL. (See `AGENTS.md`.)
7. **Renderer gate parity** — when the publish gate changes, all `/stay` + nav gates in `brand-site.ts` change in the same PR (§4).
8. **Registry is the ledger.** Every hostname change (add/retire/repoint) updates `docs/governance/OMDALAT_DOMAIN_REGISTRY_2026.csv` in the same PR.

---

## 4. Per-brand publish + render gate (locked)

A brand with `can_host_stay=1` is publishable **only** when ALL are true:

```
owner_consent      === 'approved'
content_approved   === true
images_approved    === true
compliance_reviewed=== true   // lodging_compliance ∈ {verified, approved, not_applicable}
qa_passed          === true
copy_clean         === true   // overclaim validator passed on published content blocks
```

The renderer must enforce the same allowlist:

```js
const STAY_OK = new Set(['verified', 'approved', 'not_applicable']);
// /stay route, nav links (V2 + home) — all use STAY_OK
```

| Gate | Location |
|------|----------|
| Publish | `workers/api/src/routes/brand-publish.ts` |
| `/stay` route | `workers/brand-renderer/src/routes/brand-site.ts` |
| Nav links | `brand-site.ts` (V2 + home nav) |

---

## 5. Per-brand onboarding & LOCK procedure (the "khóa" process)

Use this exact sequence to add or lock a brand. Each step has an evidence artifact.

1. **Intake** — `POST /api/omdalat/brand-intake` → creates `owner`, `place`, `brand` (status `draft`), `compliance_checklist` (`unknown`).
2. **Content** — `POST /api/omdalat/brands/:id/content-blocks` (and `PATCH …`) → all copy passes the overclaim validator (`copy_clean`).
3. **Evidence** — insert documents into `compliance_evidence` (reference_number, issuing_authority, issue_date, verified_by, notes).
4. **Compliance** — `POST /api/omdalat/brands/:id/compliance` with `evidence_map` + `reason` (≥20 chars), super-admin auth → writes `lily_audit_events` + `brand_approvals` + `audit_logs`.
5. **Approvals** — `POST /api/omdalat/brands/:id/approve` for content, images, compliance.
6. **Publish** — `POST /api/omdalat/brands/:id/publish` (all §4 gates must pass).
7. **Bind subdomain** — add the route to `workers/brand-renderer/wrangler.jsonc`, create proxied DNS (`AAAA 100::`), set the `brands.subdomain` field, redeploy worker.
8. **Register** — add the hostname row to `OMDALAT_DOMAIN_REGISTRY_2026.csv` with status + last_audited_sha.
9. **LOCK** — brand is "locked" only when: code on `main`, tests green, prod==repo (seed/migration committed), and evidence preserved (per `AGENTS.md` definition of CLOSED).

**A brand must never be published by editing prod D1 directly.** That bypasses the gate and is a compliance incident.

---

## 6. Naming glossary (paste into onboarding docs)

| Term | Means | Host |
|------|-------|------|
| **Ôm Đà Lạt** | The participation/operations product (root + app) | `omdalat.com`, `app.omdalat.com` |
| **Ấp Đà Lạt** | The editorial/identity property | `ap.omdalat.com` |
| **Ôm Ấp Đà Lạt** | A *bridge concept* (one page on `ap`), NOT a site name | `ap.omdalat.com/om-ap-da-lat` |
| **Brand Factory** | Seller portal to onboard a brand | `brand.omdalat.com` |
| **A brand** (e.g. Lily) | One tenant's public site | `<slug>.omdalat.com` |
| **BAN** | Brand Asset Network (the API + registry/market/auction) | `api/registry/market/auction.omdalat.com` |

---

## 7. Change control

- Any new subdomain, repoint, or retirement requires: (a) a PR updating this file + the registry CSV, (b) owner approval, (c) the §5 LOCK conditions.
- This file is the tie-breaker. If code, DNS, or docs disagree with it, treat the discrepancy as a defect and open a QA finding.
