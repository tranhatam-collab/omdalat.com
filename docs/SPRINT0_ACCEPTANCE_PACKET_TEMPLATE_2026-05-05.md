Om Dalat / Om Da Lat

Sprint 0 Acceptance Packet Template

Version: v1.0.0

Status: ACTIVE TEMPLATE

Date updated: 2026-05-05

Owner: Team 1

Audience: Team 2 / QA / SEO / Team 3

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
* (optional) preview smoke playwright commands

Result:

* `validate:content-seed`: `PASS|FAIL`
* `validate:web-locales`: `PASS|FAIL`
* `validate:i18n-data`: `PASS|FAIL`
* `tsc --noEmit`: `PASS|FAIL`

UI checks:

* reading width (`720px` target): `PASS|FAIL`
* locale split VI/EN: `PASS|FAIL`
* contextual CTA mapping: `PASS|FAIL`
* responsive image ratio (mobile + desktop): `PASS|FAIL`

Evidence links:

* screenshot set path:
* preview/base URL:
* notes:
* route matrix:
  * `docs/SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md`

---

## 2. QA + SEO acceptance

Canonical + hreflang:

* article 1: `PASS|FAIL`
* article 2: `PASS|FAIL`
* article 3: `PASS|FAIL`

Metadata:

* title/meta VI/EN article 1: `PASS|FAIL`
* title/meta VI/EN article 2: `PASS|FAIL`
* title/meta VI/EN article 3: `PASS|FAIL`

SOP eye-check:

* khong chill hoa / mo mong hoa: `PASS|FAIL`
* khong copy sale/hype: `PASS|FAIL`
* khong tron VI/EN: `PASS|FAIL`

Decision:

* `GO_STAGING|NO_GO`

Reason:

* ...
* route-by-route evidence can be attached via `docs/SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md`

---

## 3. Team 3 contract confirmation

Payload source of truth:

* `data/seed/articles.seed.json`
* `data/seed/articles.seed.launch-v2.json`
* `data/seed/article-images.seed.json`

Contract checks:

* `locales.vi` / `locales.en` present on launch payload: `PASS|FAIL`
* `featured_image` present on launch runtime records: `PASS|FAIL`
* image record has source/license + alt/caption VI/EN: `PASS|FAIL`

---

## 4. Final signoff

Team 2 owner:

QA owner:

SEO owner:

Team 1 reviewer:

Signoff time:
