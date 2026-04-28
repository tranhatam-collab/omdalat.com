Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Execution Push — Team 3 + Ap Team

Version: v1.1.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 1

---

## 0. Mục đích

File này là lệnh đẩy việc ngay cho 2 lane đang chờ:

* Team 3 — App member runtime
* Ap Team — Ap editorial

Không chờ nhau. Mỗi team tự chạy lane của mình và nộp evidence theo đúng format Team 1.

---

## 1. Team 3 — Lệnh chạy ngay

### 1.1 Runtime drift cần đóng

Probe Team 1 tại `00:24 ICT, 2026-04-29`:

* `GET /vi/member/register` -> `404`
* `GET /vi/member/operations` -> `404`
* `POST /api/support` -> `200`
* `POST /api/contact` -> `200`
* shadow runtime mới:
  * `https://d6b35718.omdalat-app-2ol.pages.dev/vi/member/register` -> `200`

### 1.2 Command bắt buộc Team 3 phải nộp kết quả

```bash
curl -I https://app.omdalat.com/vi/member/register
curl -I https://app.omdalat.com/vi/member/operations
npm run cf:runtime-map:check
npm run mail:smoke:e2e:live
```

### 1.3 Điều kiện Team 1 nhận closure Team 3

* register/operations không còn `404`
* support/contact tiếp tục giữ `200`
* runtime-map check pass
* mail smoke live pass
* packet cập nhật:
  * `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`

---

## 2. Ap Team — Lệnh chạy ngay

### 2.1 Trạng thái hiện tại

* Lane đang `REVIEW_READY` (đã có owner evidence current-state)

### 2.2 File Ap Team bắt buộc điền

* `DONE` `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `DONE` `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `DONE` `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

### 2.3 Điều kiện Team 1 nhận review Ap lane

* nộp thêm live-domain probe packet
* nộp visual packet cho image-rich routes

---

## 3. Quy tắc không chờ nhau

* Team 3 không chờ Ap Team để xử lý runtime drift.
* Ap Team không chờ Team 3 để nộp report editorial.
* Team 1 chỉ chờ evidence, không chờ nói miệng.

---

## 4. Team 1 closure rule

* Team 3 chỉ thoát `REVIEWED_BLOCKED_P0` khi gate `D-009` pass trên canonical host.
* Ap Team đang `REVIEW_READY`, Team 1 sẽ chốt verdict cuối sau khi xem live-domain probe packet.
* Global gate vẫn `NO_GO` cho tới khi cả 2 lane đạt điều kiện trên.
