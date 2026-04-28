Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Admin Next Actions

Version: v1.0.0

Status: ACTIVE NOTICE

Date updated: 2026-04-29

Owner: Team 1

Audience: Team 2 / Team 3 / Ap Team / QA / SEO / Content

---

## 0. Mục đích

File này là thông báo admin sau vòng review mới nhất của Team 1.

Mục tiêu:

* ai cũng biết lane nào đang ở đâu
* biết chính xác cần nộp gì tiếp theo
* tránh nhắc lại việc đã xong

Companion files:

* `docs/OMDALAT_TEAM1_FINAL_UNBLOCK_CHECKLIST_2026-04-28.md`
* `docs/OMDALAT_3_LANE_GLOBAL_PROGRESS_2026-04-28.md`
* `docs/OMDALAT_TEAM1_CHECKPOINT_2026-04-29.md`
* `docs/OMDALAT_TEAM1_TEAM3_AP_EXECUTION_PUSH_2026-04-29.md`
* `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`

Quick command:

* `npm run team1:lane:check`

---

## 1. Team 1 review snapshot

* Team 2: `REVIEWED_BLOCKED_P0` (`~8%` còn lại) vì còn alt audit pending và route gap canonical.
* Team 3: `REVIEWED_BLOCKED_P0` (`~40%` còn lại) vì runtime drift (`404/502/405`) và smoke fail.
* Ap Team: `PENDING_REPORT` (`~65%` còn lại từ baseline prefill) vì chưa nộp current-state evidence thật.

---

## 2. Việc Team 2 cần làm ngay

* Hoàn thiện alt audit: không còn `PENDING_AUDIT` ở các route P0 trong:
  * `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`
* Bổ sung metadata text-level cho full route P0 trong:
  * `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* Phối hợp Team 3 xác minh route gap canonical Team 1 vừa probe:
  * `curl -I https://omdalat.com/vi/contact`
  * `curl -I https://omdalat.com/en/contact`
  * `curl -I https://omdalat.com/vi/about`
* Cập nhật lại evidence packet Om public sau khi route gap được đóng.

File chính:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`

---

## 3. Việc Team 3 cần làm ngay

* Chốt runtime parity cho host canonical để các lane sau không còn drift:
  * `/vi/member/register`
  * `/vi/member/operations`
  * `/api/support`
  * `/api/contact`
* Rerun:
  * `npm run cf:runtime-map:check`
  * `npm run mail:smoke:e2e:live`
* Cập nhật `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md` bằng artifact/smoke mới nếu pass.
* Phối hợp Team 2 xác minh route gap Om public nếu nguyên nhân nằm ở mapping/deploy parity.

File chính:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`

---

## 4. Việc Ap Team cần làm ngay

* Nộp report current-state lane editorial theo format chuẩn.
* Điền route+metadata matrix cho các route editorial chính.
* Nộp evidence cho `sitemap/robots/canonical/hreflang` và image system.
* Xác nhận/hoàn thiện baseline prefill Team 1 đã tạo trong report, matrix, evidence packet.
* Nộp thêm quick progress `% còn lại` ở cuối report để Team 1 tổng hợp global progress theo cùng công thức.

File chính:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

---

## 5. Team 1 rule

* Không lane nào được tự chuyển `BLOCKED` sang `DONE` nếu Team 1 chưa review.
* Không claim P0 done nếu thiếu matrix lane bắt buộc.
* Không claim done nếu evidence path không khớp claim.
