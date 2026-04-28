Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Final Unblock Checklist

Version: v1.1.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 1

Audience: Team 2 / Team 3 / Ap Team / QA / SEO / Content

Scope: checklist cuối để chuyển lane từ `REVIEWED_BLOCKED_P0` sang `PASS_WITH_QUEUE` hoặc `PASS`

---

## 0. Mục đích

File này là checklist unblock cuối mà Team 1 dùng để khóa từng lane.

Nguyên tắc:

* không thêm việc mới ngoài scope P0 hiện tại
* chỉ gỡ đúng blocker đang mở
* mỗi mục phải có evidence path

---

## 1. Team 2 — Om Public

Current status:

* `PASS_WITH_QUEUE`

### 1.1 Mục phải hoàn thành

* `DONE` text-level metadata extract cho core P0 routes.
* `DONE` alt text audit core P0 routes.
* `DONE` route gap canonical đã đóng (`/vi/contact`, `/en/contact`, `/vi/about` đều `200`).
* `DONE` evidence packet Om public đã cập nhật sau deploy.

### 1.2 Điều kiện Team 1 chấp nhận

* Đã đạt.

### 1.3 Mức đóng lane

* `PASS_WITH_QUEUE` (đã chốt tại `D-008`).

---

## 2. Team 3 — App Member Runtime

Current status:

* `REVIEWED_BLOCKED_P0`

### 2.1 Mục phải hoàn thành

* Nộp fresh artifact + fresh smoke batch sau activation `2026-04-28`.
* Nộp evidence packet mới cho:
  * metadata/noindex surfaces
  * access matrix verification
  * runtime smoke summary mới
  * `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* Ghi rõ kết luận blocker sau fresh run:
  * `CODE`
  * `TOOLCHAIN`
  * `INFRA`
  * hoặc `NONE`
* Đóng gate `D-009`:
  * `https://app.omdalat.com/vi/member/register` -> `200`
  * `https://app.omdalat.com/vi/member/operations` -> redirect reviewed gate

### 2.2 Điều kiện Team 1 chấp nhận

* Có đường dẫn artifact/smoke mới, không chỉ viện dẫn baseline cũ `2026-04-23`.
* Không trộn blocker toolchain với blocker code.
* Role semantics/gate semantics không đổi nghĩa.
* Canonical host parity pass theo `D-009`.

### 2.3 Mức đóng lane

* `PASS_WITH_QUEUE` nếu P0 runtime evidence sạch, còn P1 persistence deepening.
* `PASS` nếu cả runtime evidence và surface evidence đạt chuẩn khóa.

---

## 3. Ap Team — Ap Editorial

Current status:

* `REVIEW_READY`

### 3.1 Mục phải hoàn thành

* `DONE` Nộp report current-state:
  * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `DONE` Điền matrix:
  * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `DONE` Nộp evidence packet:
  * `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`
* Bổ sung lane hardening:
  * live-domain probe packet
  * visual evidence packet cho image-rich routes

### 3.2 Điều kiện Team 1 chấp nhận

* Report/matrix/packet khớp claim hiện tại.
* Không có lệch role giữa Om và Ap.
* Hoàn tất live-domain probe nếu Team 1 yêu cầu cho verdict cuối.

### 3.3 Mức đóng lane

* `PASS_WITH_QUEUE` nếu P0 editorial sạch và còn hàng P1.
* `REVIEWED_BLOCKED_P0` nếu review phát hiện gap lớn ở live-domain parity.

---

## 4. Rule Team 1

* Không lane nào tự đổi status.
* Team 1 review xong lane nào phải cập nhật ngay:
  * `docs/OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md`
  * `docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md`
  * `docs/OMDALAT_3_LANE_DECISION_LOG_2026-04-28.md`

---

## 5. Definition of done

Checklist này hoàn thành khi:

* Team 2 và Team 3 thoát `REVIEWED_BLOCKED_P0`
* Ap Team có verdict Team 1 cuối
* Team 1 có thể chốt state tổng theo lane bằng evidence, không cần suy đoán
