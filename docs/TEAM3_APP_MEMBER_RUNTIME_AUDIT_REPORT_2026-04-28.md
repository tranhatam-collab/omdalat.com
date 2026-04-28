Om Dalat / Om Da Lat

Team 3 Report

Lane: App Member Runtime

Version: v1.2.0

Status: SUBMITTED_BLOCKED_CANONICAL_PARITY

Date updated: 2026-04-29

Owner: Team 3

Reviewer: Team 1

Scope: member runtime routes, reviewed unlock gate, support/contact API lanes, canonical parity, smoke evidence

---

## 1. Lane + owner

* Lane: `App member runtime`
* Owner: `Team 3`
* Reviewer: `Team 1`

## 2. Scope đã kiểm

* Team 3 đã cập nhật current-state bằng live probes mới ngày `2026-04-28`.
* Kết quả: lane đang `BLOCKED` bởi runtime drift giữa account/project/deployment, không còn là trạng thái "partial ready".
* Đây là blocker hạ tầng + deploy/runtime parity; không phải đổi semantics role/gate.
* Phạm vi kiểm gồm:
  * member entry routes (`/member/login`, `/member/register`)
  * reviewed gate route (`/member/operations`, `/member/application-status`)
  * mail APIs liên quan smoke (`/api/support`, `/api/contact`)
  * runtime mapping giữa `931...` và `f3f9...`
  * local build/toolchain path cho `build:cf`

## 3. P0 done

* `DONE` Bộ chuẩn governance + report framework của Team 3 vẫn hợp lệ và đang dùng:
  * [TEAM3_UNIVERSAL_COMPLIANCE_EXECUTION_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/TEAM3_UNIVERSAL_COMPLIANCE_EXECUTION_2026-04-28.md)
  * [TEAM3_GATE_REPORT_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/TEAM3_GATE_REPORT_2026-04-28.md)
* `DONE` Matrix lane Team 3 đã chuyển sang trạng thái phản ánh live reality:
  * [APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md)
* `DONE` Build artifact mới đã tạo thành công:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS`
* `DONE` Deploy mới lên shadow runtime:
  * `https://d6b35718.omdalat-app-2ol.pages.dev`
* `DONE` Shadow runtime xác nhận lane onboarding có thật:
  * `GET /vi/member/register` -> `200`
  * `GET /vi/member/login` -> `200`
* `DONE` Support/contact API lane đã phục hồi trên canonical hosts:
  * `POST https://app.omdalat.com/api/support` -> `200`
  * `POST https://omdalat.com/api/contact` -> `200`
* `DONE` Live smoke mới nhất:
  * `SMOKE_RUNTIME_TARGET=live ... npm run mail:smoke:e2e` -> `success=true`

## 4. P0 blocked

* `[INFRA]` Canonical parity của `app.omdalat.com` chưa đạt cho localized onboarding/gate routes:
  * `GET https://app.omdalat.com/vi/member/register` -> `404`
  * `GET https://app.omdalat.com/vi/member/operations` -> `404`
* `[code]` Chưa có bằng chứng regression code ở route register; cùng commit đang trả `200` trên shadow runtime.
* `[toolchain]` Local build lane hiện `PASS`; toolchain không còn là blocker chính trong vòng này.
* `[RUNTIME_MAP]` gate tăng cường `D-009` đang fail:
  * `app localized register route` fail (`404`)
  * `app localized operations reviewed gate` fail (`404`)
* `[INFRA]` Shadow runtime đã đúng nhưng canonical domain chưa theo artifact mới; cần quyết định mapping/deploy vào đúng account đang giữ `app.omdalat.com`.

## 5. P1 queue

* thống nhất một runtime chuẩn duy nhất cho `app.omdalat.com` có đủ:
  * `/vi/member/register`
  * `/vi/member/operations` gate
  * `/api/support`
* khôi phục contact/support mail lane (`200 + {"ok":true}`) và rerun smoke live
* quyết định dứt điểm strict outbox:
  * bật `SMOKE_REQUIRE_OUTBOX=1` với outbox route live thật
  * hoặc giữ runtime mode và ghi rõ release note

## 6. Files / routes / modules liên quan

* docs:
  * [TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md)
  * [APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md)
  * [OMDALAT_3_LANE_EVIDENCE_PACKET_INDEX_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_3_LANE_EVIDENCE_PACKET_INDEX_2026-04-28.md)
  * [OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md)
* primary runtime checks:
  * `/vi/member/login`
  * `/vi/member/register`
  * `/vi/member/application-status`
  * `/vi/member/operations`
  * `/api/health`
  * `/api/support`
  * `/api/contact`

## 7. Commands đã chạy

* `pnpm --filter @omdalat/app build:cf`
* `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main`
* `npm run cf:runtime-map:check`
* `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
* `curl -I https://app.omdalat.com/vi/member/register`
* `curl -I https://app.omdalat.com/vi/member/operations`
* `curl -sS -X POST https://app.omdalat.com/api/support ...`
* `curl -sS -X POST https://omdalat.com/api/contact ...`
* `CLOUDFLARE_ACCOUNT_ID=f3f9... wrangler pages project list --json`
* `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages project list --json`
* `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages deployment list --project-name omdalat-app --json`

## 8. Evidence

* current report:
  * [TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md)
* matrix:
  * [APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md)
* runtime-map fail (gate D-009):
  * `npm run cf:runtime-map:check` output ngày `2026-04-29`
* smoke mới:
  * [summary.json](/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-28T17-59-16-886Z/summary.json)
* shadow runtime deploy:
  * `https://d6b35718.omdalat-app-2ol.pages.dev`

## 9. Quyết định cần Team 1 chốt

* Chot runtime canonical so huu lane member cho `app.omdalat.com` (khong split drift account/project).
* Chot cach xu ly mail lane trong release hien tai:
  * fix now va giu trong P0
  * hoac ha scope ro rang thanh non-release gate
* Chot strict outbox la mandatory hay hardening mode co dieu kien.

## 10. Việc tiếp theo + phần trăm còn lại

* viec tiep theo:
  * chot runtime mapping canonical cho `app.omdalat.com` de host nay nhan artifact moi
  * rerun `npm run cf:runtime-map:check` (gate D-009)
  * rerun `SMOKE_RUNTIME_TARGET=live ... npm run mail:smoke:e2e`
  * cap nhat evidence packet voi pass report moi
* phan tram con lai:
  * `18%` con lai de dong P0 Team 3; phan lon la canonical parity
