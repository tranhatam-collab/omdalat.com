Om Dalat / Om Da Lat

Sprint 0 Acceptance Packet Current State

Version: v0.1.0

Status: PARTIAL_READY

Date updated: 2026-05-07

Owner: Team 1 / Team 3

Audience: Team 2 / QA / SEO / Team 1

---

## 0. Scope

3 bai launch:

1. `/vi/articles/song-o-da-lat-la-gi` + `/en/articles/song-o-da-lat-la-gi`
2. `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong` + `/en/articles/lam-viec-o-da-lat-co-thuc-te-khong`
3. `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` + `/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`

---

## 1. Team 2 runtime evidence

Commands used:

* `pnpm validate:content-seed`
* `pnpm --filter @omdalat/web validate:web-locales`
* `pnpm --filter @omdalat/web validate:i18n-data`
* `pnpm --filter @omdalat/web exec tsc --noEmit`
* `npm run cf:runtime-map:check`

Result:

* `validate:content-seed`: `PASS`
* `validate:web-locales`: `PASS`
* `validate:i18n-data`: `PASS`
* `tsc --noEmit`: `PASS`
* `cf:runtime-map:check`: `PASS`

UI checks:

* reading width (`720px` target): `PENDING_VISUAL_REVIEW`
* locale split VI/EN: `PASS_LOCAL_ROUTE_SMOKE`
* contextual CTA mapping: `PASS_SEED_MAPPING`
* responsive image ratio (mobile + desktop): `PENDING_VISUAL_REVIEW`

Evidence links:

* board reference: `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`
* notes:
  * local dev route smoke da xac nhan 6/6 route `200`
  * build compile/type/page generation da pass truoc khi stall tai `Collecting build traces`
  * preview Playwright con dang cho runner co quyen Chromium IPC on dinh
  * metadata/canonical/hreflang expected values da duoc khoa trong `docs/SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md`

---

## 2. QA + SEO acceptance

Canonical + hreflang:

* article 1: `PENDING_STAGING_REVIEW`
* article 2: `PENDING_STAGING_REVIEW`
* article 3: `PENDING_STAGING_REVIEW`

Metadata:

* title/meta VI/EN article 1: `PASS_SEED_PRESENT`
* title/meta VI/EN article 2: `PASS_SEED_PRESENT`
* title/meta VI/EN article 3: `PASS_SEED_PRESENT`

SOP eye-check:

* khong chill hoa / mo mong hoa: `PASS_CONTENT_REVIEW_BASELINE`
* khong copy sale/hype: `PASS_CONTENT_REVIEW_BASELINE`
* khong tron VI/EN: `PASS_DATA_CONTRACT_BASELINE`

Decision:

* `PENDING_STAGING_SIGNOFF`
* `HUMAN_TEXT_GATE_BASELINE_PASS`

Reason:

* du lieu seed va cac gate local da xanh
* van can visual/staging proof cho canonical + hreflang + responsive
* van chua co fresh deploy moi vi Team 3 deploy script dang bi chan boi Wrangler auth

---

## 3. Team 3 contract confirmation

Payload source of truth:

* `data/seed/articles.seed.json`
* `data/seed/articles.seed.launch-v2.json`
* `data/seed/articles.seed.sprint0-launch.json`
* `data/seed/article-images.seed.json`

Contract checks:

* `locales.vi` / `locales.en` present on launch payload: `PASS`
* `featured_image` present on launch runtime records: `PASS`
* image record has source/license + alt/caption VI/EN: `PASS`

---

## 4. Open items before GO staging

* Team 2 can nop screenshot set desktop/mobile cho 3 route VI + 3 route EN
* QA/SEO can nop canonical + hreflang staging proof theo `docs/SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md`
* preview Playwright rerun can thuc hien tren runner co Chromium IPC permission on dinh
* Team 3 can rerun deploy moi sau khi co lai session/token Wrangler hop le

---

## 5. Current signoff state

Team 2 owner:

* `PENDING`

QA owner:

* `PENDING`

SEO owner:

* `PENDING`

Team 1 reviewer:

* `PRE-FILLED_CURRENT_STATE_READY`

---

## 6. True state

* `SPRINT0_LOCAL_GATES_PASS`
* `HUMAN_TEXT_PROTOCOL_APPLIED`
* `STAGING_PROOF_PENDING`
* `FRESH_DEPLOY_BLOCKED_BY_WRANGLER_AUTH`
