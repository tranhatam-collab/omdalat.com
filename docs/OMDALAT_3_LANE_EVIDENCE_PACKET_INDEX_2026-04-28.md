Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Evidence Packet Index

Version: v1.0.0

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

* alt text audit riêng cho lane Om public vẫn còn nhiều dòng `PENDING_AUDIT`
* metadata matrix chưa phủ full route P0 ở mức text-level extract
* Team 1 probe canonical `2026-04-29` ghi nhận route gap:
  * `https://omdalat.com/vi/contact` -> `404`
  * `https://omdalat.com/en/contact` -> `404`
  * `https://omdalat.com/vi/about` -> `404`

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

Gap còn mở:

* runtime parity cho `app.omdalat.com` (dang thieu register/operations/support lane)
* mail lane (`/api/contact`, `/api/support`) chua dat smoke contract
* fresh artifact + smoke pass packet sau khi chot runtime mapping

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

---

## 4. Team 1 rule

* Nếu report có prose nhưng thiếu matrix lane tương ứng, chưa được xem là complete.
* Nếu matrix có dữ liệu nhưng thiếu evidence path, chưa được xem là complete.
* Nếu evidence path không khớp claim, Team 1 phải đánh `BLOCKED` hoặc `RETURN_FOR_REVISION`.
