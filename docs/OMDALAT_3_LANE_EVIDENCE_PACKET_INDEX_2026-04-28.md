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
* image reality check conformance theo
  * `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
  * `docs/OMDALAT_OM_PUBLIC_IMAGE_REALITY_AUDIT_2026-04-29.md`
* Content SOP:
  * `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
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
  * `docs/OMDALAT_OM_PUBLIC_IMAGE_REALITY_AUDIT_2026-04-29.md` (alt/caption/source/log evidence)
* smoke baseline reference:
  * `34/34 passed` canonical public smoke on `https://omdalat.com` (as declared in Team 2 report)

Gap còn mở:

* không còn gap P0 trong core route set
* queue còn lại:
  * mở rộng alt/caption audit cho secondary public surfaces ngoài core route set
  * bổ sung image reuse/context audit theo chuẩn mới cho hình nền/mức cao tiếp theo

---

## 2. App Member Runtime

Evidence tối thiểu:

* access and surface matrix
* artifact status
* smoke evidence mới nhất
* blocker note: code vs toolchain
* metadata/noindex status
* neu co thay doi CMS/article seed: validator/content-contract evidence theo `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
* neu co image asset moi: bang chung `WebP`/`AVIF`, file naming theo slug, source/license log, alt/caption VI/EN theo `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

Expected attachments:

* `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
* report lane App member runtime

Current Team 3 submission (2026-04-28):

* report:
  * `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* matrix:
  * `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* live smoke pass:
  * `reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
* runtime map pass reference:
  * `npm run cf:runtime-map:check` (pass full check including localized operations reviewed gate)
* canonical deployment evidence:
  * `https://cb980b6b.omdalat-app.pages.dev`
  * `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages deployment list --project-name omdalat-app --json`
* strict smoke hardening fail (non-gating queue):
  * `reports/email-smoke/2026-05-03T17-20-26-871Z/error.txt`
* consolidated parity proof:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`

Gap còn mở:

* khong con gap blocker cho cycle hien tai
* cac muc strict outbox / split-account / content-contract duoc theo doi o hardening backlog hau cycle (`D-014`)

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
* image reality gate evidence: source/license log + alt/caption theo song ngữ cho ảnh đã duyệt

Expected attachments:

* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`
* `ap.omdalat.com/docs/APDALAT_IMAGE_AND_GALLERY_POLICY_2026.md`
* `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
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
