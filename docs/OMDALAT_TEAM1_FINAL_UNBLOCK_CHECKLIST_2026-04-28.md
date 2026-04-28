Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Final Unblock Checklist

Version: v1.0.0

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

* `REVIEWED_BLOCKED_P0`

### 1.1 Mục phải hoàn thành

* Hoàn thiện text-level extract cho `title/meta/canonical/hreflang` theo route trong:
  * `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
  * `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* Nộp `alt text audit` riêng theo route/public surface.
  * `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`
* Đóng route gap canonical Team 1 probe ngày `2026-04-29`:
  * `https://omdalat.com/vi/contact` không còn `404`
  * `https://omdalat.com/en/contact` không còn `404`
  * `https://omdalat.com/vi/about` không còn `404`
* Tạo `Om public evidence packet` file index gom:
  * smoke summary
  * metadata extract artifacts
  * alt text audit artifacts
  * QA references

### 1.2 Điều kiện Team 1 chấp nhận

* Không còn marker baseline (`PRESENT__TEXT_AUDIT_NEXT`, `EXPECTED__LOCALE_WIRED`, `PENDING_AUDIT`) trên route đã claim complete.
* Evidence path trỏ đúng file thật trong repo.
* Không có claim `PASS` nếu chưa có evidence tương ứng.

### 1.3 Mức đóng lane

* `PASS_WITH_QUEUE` nếu P0 sạch nhưng còn P1 content hardening.
* `PASS` nếu cả P0 và các điểm QA/SEO cốt lõi đã sạch theo board.

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

### 2.2 Điều kiện Team 1 chấp nhận

* Có đường dẫn artifact/smoke mới, không chỉ viện dẫn baseline cũ `2026-04-23`.
* Không trộn blocker toolchain với blocker code.
* Role semantics/gate semantics không đổi nghĩa.

### 2.3 Mức đóng lane

* `PASS_WITH_QUEUE` nếu P0 runtime evidence sạch, còn P1 persistence deepening.
* `PASS` nếu cả runtime evidence và surface evidence đạt chuẩn khóa.

---

## 3. Ap Team — Ap Editorial

Current status:

* `PENDING_REPORT`

### 3.1 Mục phải hoàn thành

* Nộp report current-state theo:
  * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* Điền đủ matrix:
  * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* Nộp evidence cho:
  * metadata/canonical/hreflang
  * sitemap/robots
  * image alt/caption/filename
  * Om <-> Ap contextual linking
  * `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

### 3.2 Điều kiện Team 1 chấp nhận

* Report đủ 10 mục theo format.
* Matrix không để trống route editorial chính.
* Evidence path có thật và khớp claim.

### 3.3 Mức đóng lane

* `REVIEWED_BLOCKED_P0` nếu đã nộp nhưng evidence chưa đủ.
* `PASS_WITH_QUEUE` nếu P0 editorial sạch nhưng còn hàng P1.

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
* Ap Team thoát `PENDING_REPORT`
* Team 1 có thể chốt state tổng theo lane bằng evidence, không cần suy đoán
