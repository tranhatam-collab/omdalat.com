Om Dalat / Om Da Lat

Team 3 Report

Lane: App Member Runtime

Version: v1.4.0

Status: DONE_CLOSED

Date updated: 2026-05-04

Owner: Team 3

Reviewer: Team 1

Scope: member runtime routes, reviewed unlock gate, support/contact API lanes, canonical parity, smoke evidence, CMS/content contract alignment

---

## 1. Lane + owner

* Lane: `App member runtime`
* Owner: `Team 3`
* Reviewer: `Team 1`

## 2. Scope đã kiểm

* Team 3 da chot lai runtime parity tren host canonical `app.omdalat.com`.
* Build, deploy, reviewed gate, support lane, DNS canonical va smoke runtime da co evidence moi ngay `2026-04-29`.
* Khong doi semantics role/gate; chi sua runtime mapping, reviewed unlock path, va deploy path.
* Theo `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`, Team 3 giu trach nhiem contract du lieu: locale split, schema gate, access level, featured image, validator va publish eligibility.

## 3. P0 done

* `DONE` Build artifact moi:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS` (local retry hook da absorb Next worker SIGSEGV transient)
* `DONE` Deploy app vao canonical account/project:
  * `https://cb980b6b.omdalat-app.pages.dev` (account `931...`, project `omdalat-app`)
* `DONE` Runtime map gate pass:
  * `npm run cf:runtime-map:check` -> `PASS`
* `DONE` Reviewed unlock tren app host:
  * `GET https://app.omdalat.com/vi/member/operations` -> `302` den `.../vi/member/application-status?required=reviewed-member...`
* `DONE` Mail runtime smoke pass:
  * `SMOKE_RUNTIME_TARGET=live ... npm run mail:smoke:e2e` -> `success=true`
  * latest summary: `reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
* `DONE` Drift probes old-checkpoint da pass lai tren live:
  * `GET https://app.omdalat.com/vi/member/register` -> `200`
  * `GET https://app.omdalat.com/vi/member/operations` -> `302` den reviewed gate
  * `POST https://app.omdalat.com/api/support` -> `{"ok":true,...}`
  * `POST https://omdalat.com/api/contact` -> `{"ok":true,...}`
* `DONE` Domain canonical runtime:
  * `app.omdalat.com` + `www.app.omdalat.com` deu tro ve runtime app canonical va redirect dung.
* `DONE` Governance hook cho Team 3 da duoc khoa trong plan:
  * `docs/DEV_TEAM_3_PLAN_OMDALAT.md` da noi `OMDALAT_CONTENT_SYSTEM_SOP.md` + `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` vao lane CMS/data contract cua Team 3.

## 4. P0 blocked

* [code] none
* [toolchain] none

## 5. P1 queue

* strict outbox policy:
  * `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com SMOKE_REQUIRE_OUTBOX=1 SMOKE_ALLOW_LIVE_OUTBOX=1 npm run mail:smoke:e2e` van timeout o buoc wait web runtime (`Timed out waiting for web runtime: fetch failed`)
  * giu strict o hardening lane, khong la release blocker cua cycle da dong
* split-account cleanup:
  * shadow project con ton tai, theo doi decommission/rename sau cutover
* content contract follow-up:
  * can co evidence validator/seed gate cho schema `locales`, `pillar_key`, `status`, `access_level`, `featured_image`
  * can bao dam batch media moi theo `WebP`/`AVIF`, file name bam slug, co source/license log va alt/caption VI/EN khi Team 3 nhan payload tu Content/CMS

## 6. Files / routes / modules liên quan

* code:
  * `apps/app/lib/member-session.ts`
  * `apps/app/app/member/operations/page.tsx`
  * `scripts/check-cloudflare-runtime-map.mjs`
  * `scripts/team3_live_deploy_and_smoke.sh`
* docs:
  * `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
  * `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`
  * `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
  * `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

## 7. Commands đã chạy

* `pnpm --filter @omdalat/app build:cf`
* `wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main --commit-dirty=true`
* `npm run cf:runtime-map:check`
* `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
* `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com SMOKE_REQUIRE_OUTBOX=1 SMOKE_ALLOW_LIVE_OUTBOX=1 npm run mail:smoke:e2e`
* `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages deployment list --project-name omdalat-app --json`
* `dig +short www.app.omdalat.com`
* `rg -n "OMDALAT_CONTENT_SYSTEM_SOP|OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026|WebP|AVIF" docs/DEV_TEAM_3_PLAN_OMDALAT.md`

## 8. Evidence

* runtime map pass: command output ngay `2026-04-29`
* smoke live pass:
  * `reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
* strict smoke fail (non-gating hardening):
  * `reports/email-smoke/2026-05-03T17-20-26-871Z/error.txt`
* canonical app deployment:
  * `https://cb980b6b.omdalat-app.pages.dev`
* governance evidence:
  * `docs/DEV_TEAM_3_PLAN_OMDALAT.md` co muc `Content SOP 2026-05-04`
  * Team 3 plan da khoa rule `locales`, `pillar_key`, `status`, `access_level`, `featured_image`

## 9. Quyết định cần Team 1 chốt

* Da chot o decision log:
  * `D-013`: strict outbox la hardening lane, khong la blocker cycle da dong
  * `D-014`: Team 3 dong cycle o trang thai `DONE_CLOSED`; cac muc con lai chuyen backlog hau cycle

## 10. Việc tiếp theo + phần trăm còn lại

* viec tiep theo:
  * giu monitor smoke runtime theo nhip
  * khi Team 3 dong vao CMS/article seed, nop them bang chung validator theo `OMDALAT_CONTENT_SYSTEM_SOP.md`
  * theo doi decommission split-account theo ke hoach infra
* phan tram con lai:
  * `0%` cho cycle hien tai (`DONE_CLOSED`)
