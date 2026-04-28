Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Evidence Packet Index

Version: v1.2.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 1

---

## 0. Mục đích

File này định nghĩa rõ Team 1 mong chờ loại evidence nào từ mỗi lane.

Nếu một team claim done mà evidence packet thiếu phần bắt buộc trong lane của mình, Team 1 có thể trả report về trạng thái `RETURN_FOR_REVISION`.

---

## 1. Om Public

Evidence tối thiểu:

* route inventory matrix
* bilingual metadata check
* alt text check
* smoke / QA summary
* build evidence nếu có thay đổi build lane
* note cho bridge Om -> Ap nếu có thay đổi

Expected attachments:

* `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`
* report lane Om public

Current Team 2 submission (2026-04-28):

* report alias:
  * `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* report canonical:
  * `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md`
* matrix:
  * `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
* evidence packet:
  * `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md`
* smoke baseline reference:
  * `34/34 passed` canonical public smoke on `https://omdalat.com` (as declared in Team 2 report)

Gap còn mở:

* không còn gap P0 trong core route set
* queue còn lại:
  * mở rộng alt/caption audit cho secondary public surfaces ngoài core route set

---

## 2. App Member Runtime

Evidence tối thiểu:

* access and surface matrix
* artifact status
* smoke evidence mới nhất
* blocker note: code vs toolchain
* metadata/noindex status

Expected attachments:

* `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* report lane App member runtime

Current Team 3 submission (2026-04-28):

* report:
  * `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* matrix:
  * `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* live smoke fail:
  * `reports/email-smoke/2026-04-28T12-45-51-410Z/error.txt`
  * `reports/email-smoke/2026-04-28T12-46-34-497Z/error.txt`
* runtime map fail reference:
  * `npm run cf:runtime-map:check` (member operations gate + support API lane fail)
* deployment mapping evidence:
  * `CI=1 CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages project list --json`
  * `CI=1 CLOUDFLARE_ACCOUNT_ID=f3f9... wrangler pages project list --json`
* consolidated drift evidence:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`
* Team 1 recheck mới:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS`
  * deploy shadow runtime: `https://d6b35718.omdalat-app-2ol.pages.dev`
  * gate tăng cường (`D-009`) fail trên canonical host:
    * `https://app.omdalat.com/vi/member/register` -> `404`
    * `https://app.omdalat.com/vi/member/operations` -> `404`
  * support/contact lane đã phục hồi:
    * `POST https://app.omdalat.com/api/support` -> `200`
    * `POST https://omdalat.com/api/contact` -> `200`

Gap còn mở:

* runtime parity cho `app.omdalat.com` (dang thieu localized register/operations lane)
* fresh runtime-map pass theo gate `D-009`
* fresh smoke packet sau khi canonical host bắt kịp artifact mới

Decision note:

* Team 1 đã khóa ở `D-003`: strict outbox hiện là hardening lane có điều kiện, chưa phải mandatory gate cho vòng activation hiện tại

---

## 3. Ap Editorial

Evidence tối thiểu:

* route and metadata matrix
* image alt/caption/filename audit
* sitemap / robots / canonical / hreflang status
* QA summary
* Om <-> Ap contextual linking note

Expected attachments:

* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`
* report lane Ap editorial

Current Ap Team submission (2026-04-29):

* report:
  * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* matrix:
  * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* evidence packet:
  * `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`
* route/sitemap/robots check:
  * `node scripts/check-content-routes.mjs` -> `PASS`

Gap còn mở:

* live-domain probe packet bổ sung (P1 queue)
* visual evidence packet cho image-rich routes (P1 queue)

---

## 4. Team 1 rule

* Nếu report có prose nhưng thiếu matrix lane tương ứng, chưa được xem là complete.
* Nếu matrix có dữ liệu nhưng thiếu evidence path, chưa được xem là complete.
* Nếu evidence path không khớp claim, Team 1 phải đánh `BLOCKED` hoặc `RETURN_FOR_REVISION`.
