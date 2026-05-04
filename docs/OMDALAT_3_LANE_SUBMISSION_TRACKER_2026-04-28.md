Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Submission Tracker

Version: v1.3.0

Status: ACTIVE

Date updated: 2026-05-04

Owner: Team 1

---

## 0. Mục đích

File này dùng để Team 1 theo dõi:

* team nào đã nộp report
* team nào còn pending
* evidence đã đủ chưa
* reviewer đã chốt được gì

Supporting files:

* `docs/OMDALAT_TEAM1_3_LANE_REVIEW_PROTOCOL_2026-04-28.md`
* `docs/OMDALAT_3_LANE_DECISION_LOG_2026-04-28.md`
* `docs/OMDALAT_3_LANE_EVIDENCE_PACKET_INDEX_2026-04-28.md`
* `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`

---

## 1. Team 2 — Om Public

Report path:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* canonical report: `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md`
* matrix: `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
* evidence packet: `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md`

Submission status:

* `RECEIVED`

Review status:

* `PASS_WITH_QUEUE`

Evidence status:

* `READY_WITH_QUEUE`

Team 1 note:

* Team 2 đã nộp report canonical + metadata matrix + alt audit + evidence packet đủ cho core P0 route set.
* Team 1 xác nhận route gap canonical đã đóng sau deploy `f633122e`:
  * `/vi/contact` -> `200`
  * `/en/contact` -> `200`
  * `/vi/about` -> `200`
* Closure rule `D-007` đã được thỏa điều kiện, lane Om public được chuyển sang `PASS_WITH_QUEUE`.
* Tiến độ Team 2 current-state: `100%` cho P0 closure; phần còn lại chuyển về P1 queue.
* Team 1 áp dụng thêm `Image Reality` requirement từ `D-012` cho mọi report lane.

---

## 2. Team 3 — App Member Runtime

Report path:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`

Submission status:

* `RECEIVED`

Review status:

* `DONE_CLOSED`

Evidence status:

* `READY_CLOSED`

Team 1 note:

* Team 3 da nop fresh artifact + fresh smoke packet tren canonical runtime.
* Team 1 recheck ngay `2026-04-29`:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS`
  * deploy canonical app runtime -> `https://cb980b6b.omdalat-app.pages.dev`
  * `npm run cf:runtime-map:check` -> `PASS` (bao gom localized reviewed gate + support lane)
* `SMOKE_RUNTIME_TARGET=live ... npm run mail:smoke:e2e` -> `PASS`
* Khong con blocker P0 cho Team 3.
* Tiến độ Team 3 current-state: `100%` cho cycle hien tai.
* `D-012` đang theo dõi image reality evidence khi lane có ảnh công khai mới.
* Ghi chú bổ sung (2026-05-04): strict outbox retry đã chạy với `SMOKE_REQUIRE_OUTBOX=1` + `SMOKE_ALLOW_LIVE_OUTBOX=1` nhưng vẫn timeout chờ web runtime; muc nay da chuyen backlog hardening theo `D-013`.
* Ghi chú governance (2026-05-04): khi Team 3 cham vao CMS/article seed, packet phai kem validator/content-contract evidence theo `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.
* Team 1 closure: lane Team 3 da duoc dong o `DONE_CLOSED` cho cycle hien tai theo `D-014`.

---

## 3. Ap Team — Ap Editorial

Report path:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`

Submission status:

* `RECEIVED`

Review status:

* `PASS_WITH_QUEUE`

Evidence status:

* `READY_WITH_QUEUE`

Team 1 note:

* Ap Team đã nộp đủ bộ current-state:
  * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
  * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
  * `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`
* Team 1 đã xác nhận nhanh bằng command nội bộ:
  * `node scripts/check-content-routes.mjs` -> `PASS`
* Team 1 chốt verdict lane Ap: `PASS_WITH_QUEUE` cho P0 intake/review cycle hiện tại.
* Queue còn lại của Ap:
  * live-domain probe packet
  * visual evidence packet cho image-rich routes
* `D-012` áp dụng cho evidence image của surface Ap như hardening yêu cầu tiếp theo.

---

## 4. Team 1 rule

* Không đổi `PENDING` thành `RECEIVED` nếu file chưa có nội dung current-state thật.
* Không đổi `EVIDENCE PENDING` thành `READY` nếu chưa có path rõ cho build, smoke, QA, metadata, hoặc audit matrix phù hợp với lane đó.
* Khi review xong, Team 1 phải cập nhật lại audit board chính.

Team 1 completion note (2026-05-04):

* Cycle review/coordination scope da dong.
* Bao cao dong cycle: `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`
