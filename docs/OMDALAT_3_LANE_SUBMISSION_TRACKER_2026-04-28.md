Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Submission Tracker

Version: v1.0.0

Status: ACTIVE

Date updated: 2026-04-29

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

* `REVIEWED_BLOCKED_P0`

Evidence status:

* `PARTIAL_WITH_ROUTE_GAP`

Team 1 note:

* Team 2 đã nộp report canonical + file alias theo naming tracker, đã có metadata matrix và alt audit file riêng.
* Team 1 review outcome: lane chưa thể đóng P0 vì alt audit vẫn còn `PENDING_AUDIT` và nhiều route trong matrix chưa đủ text-level extract.
* Team 1 live probe ngày `2026-04-29` ghi nhận thêm route gap trên canonical (`/vi/contact`, `/en/contact`, `/vi/about` trả `404`), nên cần Team 2 + Team 3 phối hợp xác minh runtime mapping trước khi claim done lane Om public.
* Closure policy đã khóa tại `D-007`: không chấp nhận `PASS_WITH_QUEUE` khi contact route canonical còn `404`.
* Tiến độ Team 2 current-state: giữ ở khoảng `92%` cho tới khi đóng route gap và hoàn thiện alt audit chi tiết.

---

## 2. Team 3 — App Member Runtime

Report path:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`

Submission status:

* `RECEIVED`

Review status:

* `REVIEWED_BLOCKED_P0`

Evidence status:

* `RECEIVED_BLOCKED_RUNTIME_DRIFT`

Team 1 note:

* Team 3 đã cập nhật report + matrix theo live probes ngày `2026-04-28`, không còn giữ trạng thái `partial-ready`.
* Team 1 review outcome: lane đang `BLOCKED` bởi runtime drift (route/API `404/502/405`) và toolchain dataless blocker, chưa đủ điều kiện đóng P0.
* Team 1 probe bổ sung lúc `00:24 ICT, 2026-04-29` xác nhận drift vẫn còn:
  * `GET https://app.omdalat.com/vi/member/register` -> `404`
  * `GET https://app.omdalat.com/vi/member/operations` -> `404`
  * `POST https://app.omdalat.com/api/support` (payload hợp lệ) -> `502`
  * `POST https://omdalat.com/api/contact` -> `405`
* Tiến độ Team 3 current-state: khoảng `60%`, còn lại khoảng `40%` để đóng P0.

---

## 3. Ap Team — Ap Editorial

Report path:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`

Submission status:

* `PENDING`

Review status:

* `NOT_REVIEWED`

Evidence status:

* `PENDING`

Team 1 note:

* Team 1 đã prefill baseline cho report/matrix/evidence packet của lane Ap để rút thời gian nộp.
* Chờ Ap Team xác nhận và điền current-state evidence thật để chuyển trạng thái từ `PENDING` sang `RECEIVED`.

---

## 4. Team 1 rule

* Không đổi `PENDING` thành `RECEIVED` nếu file chưa có nội dung current-state thật.
* Không đổi `EVIDENCE PENDING` thành `READY` nếu chưa có path rõ cho build, smoke, QA, metadata, hoặc audit matrix phù hợp với lane đó.
* Khi review xong, Team 1 phải cập nhật lại audit board chính.
