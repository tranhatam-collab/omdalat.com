Om Dalat / Om Da Lat

App Member Runtime Evidence Packet

Version: v1.4.0

Status: DONE_CLOSED

Date updated: 2026-05-04

Owner: Team 3

Reviewer: Team 1

Scope: fresh artifact + fresh smoke + runtime parity proof cho lane App member runtime, kem governance evidence cho content/data contract

---

## 0. Core attachments

* report:
  * `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* access/surface matrix:
  * `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* runtime drift evidence:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`
* governance references:
  * `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
  * `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
  * `docs/DEV_TEAM_3_PLAN_OMDALAT.md`

---

## 1. Fresh artifact evidence

* build command:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS`
* canonical deploy command:
  * `wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main --commit-dirty=true`
* canonical deployment:
  * `https://cb980b6b.omdalat-app.pages.dev`
* account/project:
  * account `93112...`
  * project `omdalat-app`

---

## 2. Fresh smoke evidence

* runtime-map command:
  * `npm run cf:runtime-map:check`
* runtime smoke command:
  * `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
* runtime smoke summary:
  * `reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
* result:
  * `PASS` (runtime-map pass + smoke live success)
* drift checkpoint re-probe (`2026-04-29`):
  * `GET https://app.omdalat.com/vi/member/register` -> `200`
  * `GET https://app.omdalat.com/vi/member/operations` -> `302` reviewed gate
  * `POST https://app.omdalat.com/api/support` -> `{"ok":true,...}`
  * `POST https://omdalat.com/api/contact` -> `{"ok":true,...}`

---

## 3. Metadata/noindex/access evidence

* app login noindex:
  * runtime-map: `PASS` (`x-robots-tag=noindex, nofollow`)
* app localized register:
  * runtime-map: `PASS` (`status=200`)
* app localized reviewed gate:
  * runtime-map: `PASS` (`status=302` -> `application-status?required=reviewed-member`)
* support API lane:
  * runtime-map: `PASS` (`{"ok":true,...}`)

---

## 4. Content/data contract note

* Team 3 governance scope theo SOP:
  * schema `locales`, `pillar_key`, `status`, `access_level`, `featured_image`
  * route locale split `/vi/*` va `/en/*`
  * publish eligibility chi mo cho payload hop le
* image handoff expectation cho batch moi:
  * publish asset phai la `WebP` hoac `AVIF`
  * ten file bam slug
  * co source/license log
  * co alt/caption VI/EN theo `Image Reality`
* current evidence state:
  * Team 3 plan da khoa contract nay trong `docs/DEV_TEAM_3_PLAN_OMDALAT.md`
  * packet runtime hien tai chua claim mot batch CMS/article moi da duoc ingest trong cycle nay

---

## 5. Blocker classification

* final blocker status:
  * `NO_P0_BLOCKER`
* remaining items:
  * da chuyen sang hardening backlog hau cycle (`strict outbox`, `split-account cleanup`)

---

## 6. Strict outbox note

* strict smoke command:
  * `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com SMOKE_REQUIRE_OUTBOX=1 SMOKE_ALLOW_LIVE_OUTBOX=1 npm run mail:smoke:e2e`
* latest strict result:
  * `FAIL` -> `reports/email-smoke/2026-05-03T17-20-26-871Z/error.txt` (`Timed out waiting for web runtime: fetch failed`)
* recommendation:
  * giu strict o hardening lane; runtime smoke la release gate chinh cho cycle nay.

---

## 7. Definition of done

Packet nay duoc xem la complete cho Team 1 review khi:

* fresh artifact da len canonical app runtime
* runtime-map pass
* runtime smoke pass
* blocker classification ro rang
* neu co doi batch CMS/article, packet phai kem validator/content-contract evidence theo SOP

Trang thai hien tai:

* `DONE_CLOSED` cho cycle hien tai.
