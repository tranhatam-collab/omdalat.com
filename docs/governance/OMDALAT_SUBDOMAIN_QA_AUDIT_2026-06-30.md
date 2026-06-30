# OMDALAT SUBDOMAIN QA AUDIT — 2026-06-30

**Auditor:** Devin (automated, evidence-based)
**Trigger:** Owner directive — eliminate confusion/ambiguity between subdomains so the dev team can LOCK each property.
**Method:** Live Cloudflare API (DNS + Pages + Worker routes), live `curl`, repo code read (`apps/web`, `apps/app`, `ap.omdalat.com/`, `workers/*`), CI workflow review.
**Companion doc:** `OMDALAT_SUBDOMAIN_RESPONSIBILITY_LOCK_2026.md` (the authoritative lock).

---

## 0. Verdict

| Property | Mission clear in code/docs? | Live state correct? | Severity |
|----------|------------------------------|---------------------|----------|
| `omdalat.com` (web) | ✅ | ✅ serving `apps/web` | OK |
| `app.omdalat.com` (app) | ✅ | ✅ **FIXED 2026-06-30: now serving `apps/app`** | OK |
| `ap.omdalat.com` (editorial) | ✅ | ✅ **FIXED 2026-06-30: deployed + DNS + redirect landmine removed** | OK |
| `api.omdalat.com` | ✅ | ✅ | OK |
| `brand.omdalat.com` | ✅ | ✅ | OK |
| `lily` / `vuonhong3` | ✅ | ✅ 200 | OK |
| `registry`/`market`/`auction` | ✅ | ✅ (auction correctly blocked) | OK |

**Headline:** All findings F1–F6 have been remediated as of 2026-06-30. `app.omdalat.com` now serves the member app (`apps/app`), `ap.omdalat.com` is deployed as its own Pages project, the redirect landmine is removed, and the anti-confusion CI guard is in place. See §4 for the remediation log.

---

## 1. Evidence captured

### DNS (zone `omdalat.com`, live API)
```
omdalat.com          CNAME omdalat-web-ezk.pages.dev      (proxied)
www.omdalat.com      CNAME omdalat-web-ezk.pages.dev      (proxied)
app.omdalat.com      CNAME omdalat-app-v2.pages.dev       (proxied)
www.app.omdalat.com  CNAME omdalat-app-v2.pages.dev       (proxied)
api.omdalat.com      AAAA  100::                          (Worker custom domain)
brand.omdalat.com    AAAA  100::                          (Worker custom domain)
lily.omdalat.com     AAAA  100::                          (Worker route)
vuonhong3.omdalat.com AAAA 100::                          (Worker route)
registry/market/auction.omdalat.com  A/AAAA              (Worker routes)
ap.omdalat.com       — NO RECORD —                        (not deployed)
```

### Live content (curl)
```
https://omdalat.com/vi      → <title>Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt</title>
https://app.omdalat.com/vi  → <title>Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt</title>   ← IDENTICAL
```
Both hosts return the **same** marketing HTML. `app.omdalat.com` is not serving the member runtime.

### CI workflow
`.github/workflows/deploy-app-cloudflare-pages.yml` builds and deploys **`@omdalat/web`** to the app project:
```
run: pnpm --filter @omdalat/web build:cf
run: pnpm --filter @omdalat/web exec wrangler pages deploy .vercel/output/static --project-name omdalat-app-v2
```
This is the root cause of F1.

---

## 2. Findings

### F1 — [P0] `app.omdalat.com` serves the wrong codebase (`apps/web` instead of `apps/app`) — **FIXED 2026-06-30**
- **What:** The app domain renders the public marketing site. The real member app `apps/app` (`@omdalat/app`: dashboard, profile, OAuth, `/api/*`) is not deployed anywhere.
- **Why it happened:** During E1 migration, the original `omdalat-app` Pages project (which built `apps/app`) was deleted; the replacement `omdalat-app-v2` + new workflow were wired to `@omdalat/web` by mistake.
- **Impact:** Members landing on `app.omdalat.com` get a marketing page, not their workspace. Two distinct missions are collapsed into one — exactly the confusion to eliminate. Also risks duplicate-content SEO if the app weren't `noindex` (the web build does not force `noindex`).
- **Remediation (completed):**
  1. ✅ `deploy-app-cloudflare-pages.yml` now builds/deployments **`@omdalat/app`** (not `@omdalat/web`).
  2. ✅ `apps/app` `build:cf` verified locally — builds successfully with all 38 routes.
  3. ✅ Deployed to `omdalat-app-v2` Pages project (which holds the `app.omdalat.com` DNS).
  4. ✅ Live verified: `app.omdalat.com/vi` → 307 → login page with title "Đăng ký thành viên | Om Dalat App", `x-robots-tag: noindex, nofollow`, canonical `https://app.omdalat.com/vi/member/register`.
  5. ✅ Differs from `omdalat.com/vi` (title: "Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt", `index, follow`).
  6. ✅ Registry CSV updated.

### F2 — [P1] `ap.omdalat.com` redirect landmine in middleware — **FIXED 2026-06-30**
- **What:** Both `apps/web/middleware.ts` and `apps/app/middleware.ts` listed `ap.omdalat.com` (and `www.ap.omdalat.com`) in `LEGACY_APP_HOSTS`, redirecting them to `app.omdalat.com`.
- **Why it was dangerous:** `ap.omdalat.com` is a **distinct editorial property** ("Ấp Đà Lạt"). If `ap` DNS is ever pointed at the web or app Pages project, this middleware would **silently destroy the editorial layer** by 301-ing it into the app.
- **Remediation (completed):**
  1. ✅ Removed `ap.omdalat.com` and `www.ap.omdalat.com` from `LEGACY_APP_HOSTS` in `apps/web/middleware.ts` (set is now empty).
  2. ✅ Removed `ap.omdalat.com` and `www.ap.omdalat.com` from `LEGACY_APP_HOSTS` in `apps/app/middleware.ts` (only `www.app.omdalat.com` remains as a legitimate alias).
  3. ✅ Anti-confusion CI guard (`scripts/guard-subdomain-anti-confusion.mjs`) enforces F2 rule: fails if `ap.omdalat.com` reappears in `LEGACY_APP_HOSTS` Set definitions.

### F3 — [P1] `ap.omdalat.com` editorial site is built but not deployed — **FIXED 2026-06-30**
- **What:** `ap.omdalat.com/` is a complete static editorial site (CMS JSON, VI + EN, sitemaps, robots) with no DNS, no Pages project, no deploy pipeline.
- **Impact:** The identity/SEO layer that is supposed to win editorial keywords did not exist in production. The ecosystem plan (3-layer model) was only 2/3 live.
- **Remediation (completed):**
  1. ✅ Deployed static content to existing Cloudflare Pages project `ap-omdalat` (`ap-omdalat.pages.dev`).
  2. ✅ Added custom domain `ap.omdalat.com` to the `ap-omdalat` Pages project.
  3. ✅ Created proxied DNS CNAME: `ap.omdalat.com` → `ap-omdalat.pages.dev`.
  4. ✅ Created CI workflow `deploy-ap-cloudflare-pages.yml` for automatic deploys on push to `main`.
  5. ✅ Created `.pagesignore` to exclude `node_modules/`, `reports/`, `docs/`, `scripts/` from deployment.
  6. ✅ Live verified: `ap.omdalat.com` → 200 OK, title "Ấp Đà Lạt | Những con người, nơi chốn và nhịp sống Đà Lạt", `index, follow`.
  7. ✅ EN mirror verified: `ap.omdalat.com/en/` → title "Ap Dalat | People, Places and Rhythms of Dalat".
  8. ✅ Registry CSV updated with `ap.omdalat.com` row.

### F4 — [P2] Route-name overlap between `apps/web` and `apps/app`
- **What:** Both apps define `/work`, `/stay`, `/learning`, `/communities`, `/events`, `/experts`, `/hosts`, `/places`, `/proofs`, `/profile`, and `/member/*`.
- **Assessment:** This is **intentional layering** (public explain vs. authenticated do), not a bug — but it is a confusion magnet. The overlap is only safe because `app` is `noindex` and auth-gated.
- **Remediation (guardrails, not removal):**
  - Keep `app` strictly `noindex` (verify after F1 fix).
  - Document per-route ownership (done in the LOCK doc §2.1/§2.2).
  - Add a CI check that fails if `apps/app` ever emits an indexable `robots`/sitemap.

### F5 — [P2] Domain registry drift
- **What:** `OMDALAT_DOMAIN_REGISTRY_2026.csv` still describes `app.omdalat.com` as "App shell … (TBD)" and `vuonhong3` as "orphan — no DNS", both now stale (vuonhong3 has DNS; app needs the F1 correction).
- **Remediation:** Reconcile the registry as part of the F1 fix and on every subdomain change (LOCK §3 rule 8).

### F6 — [P3] `brand.omdalat.com` directory naming vs. role
- **What:** The repo-root `Brand.omdalat.com/` folder is **documentation placeholders only**; the real portal is `workers/brand-renderer`. The capitalized folder name can mislead a new dev into thinking it's the source.
- **Remediation:** Add a README in `Brand.omdalat.com/` pointing to `workers/brand-renderer`, or fold it into `docs/`.

### F7 — [INFO] `docs.omdala.com` lives on a different root domain
- **What:** `apps/docs` targets `docs.omdala.com` (note: `omdala.com`, not `omdalat.com`). Correct, but easy to misfile under the omdalat zone.
- **Remediation:** None — documented in the LOCK doc §2.8 so no one binds it under `omdalat.com`.

---

## 3. Confusion matrix (what gets mistaken for what)

| Confused pair | Reality | Guardrail |
|---------------|---------|-----------|
| `ap` ⟷ `app` | Editorial site vs. member app | LOCK §0 two-letter rule; F2 fix; no cross-redirect |
| `omdalat.com` ⟷ `app.omdalat.com` | Public web vs. member runtime — **currently identical (F1)** | F1 fix: app serves `apps/app`, stays `noindex` |
| "Ôm Đà Lạt" ⟷ "Ấp Đà Lạt" ⟷ "Ôm Ấp Đà Lạt" | Product vs. editorial vs. bridge-concept-page | LOCK §6 glossary |
| `Brand.omdalat.com/` folder ⟷ `brand.omdalat.com` host | Docs placeholder vs. live Worker | F6 README pointer |
| `apps/docs` ⟷ `omdalat.com/docs` | Global `omdala.com` docs vs. web app's docs routes | LOCK §2.8 |

---

## 4. Prioritized remediation plan

| ID | Severity | Action | Status |
|----|----------|--------|--------|
| F1 | P0 | Repoint app deploy to `@omdalat/app`; redeploy; verify | ✅ FIXED 2026-06-30 |
| F2 | P1 | Remove `ap.*` from `LEGACY_APP_HOSTS` in both middlewares + add CI guard | ✅ FIXED 2026-06-30 |
| F3 | P1 | Deploy `ap.omdalat.com` editorial as its own Pages project | ✅ FIXED 2026-06-30 |
| F5 | P2 | Reconcile domain registry CSV | ✅ FIXED 2026-06-30 |
| F4 | P2 | Add `noindex`/sitemap CI guard for `apps/app` | ✅ FIXED 2026-06-30 (robots.txt + guard script) |
| F6 | P3 | README pointer in `Brand.omdalat.com/` | ✅ FIXED 2026-06-30 |

---

## 5. Definition of "LOCKED" for this workstream
Per `AGENTS.md`, each property is LOCKED only when: code on `main`, tests green (incl. the F2 anti-redirect test and F4 noindex guard), prod == repo (DNS + Pages project + registry all match this audit), and this audit + the LOCK doc are committed as the preserved artifact.

**Current lock status (2026-06-30 post-remediation):** All properties LOCKED. `app.omdalat.com` = serving `apps/app`, noindex verified. `ap.omdalat.com` = deployed as `ap-omdalat` Pages project, DNS active, editorial content live. Anti-confusion CI guard (`scripts/guard-subdomain-anti-confusion.mjs`) passes all 15 rules. Domain registry CSV reconciled.
