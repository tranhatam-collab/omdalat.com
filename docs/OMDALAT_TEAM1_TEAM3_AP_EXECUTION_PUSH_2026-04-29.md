Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Execution Push — Team 3 + Ap Team

Version: v1.0.0

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
* `POST /api/support` -> `502`
* `POST /api/contact` -> `405`

### 1.2 Command bắt buộc Team 3 phải nộp kết quả

```bash
curl -I https://app.omdalat.com/vi/member/register
curl -I https://app.omdalat.com/vi/member/operations
curl -i -sS -X POST https://app.omdalat.com/api/support -H 'content-type: application/json' --data '{"name":"team3-check","email":"team3@omdalat.com","subject":"runtime-check","message":"ping"}'
curl -i -sS -X POST https://omdalat.com/api/contact -H 'content-type: application/json' --data '{"name":"team3-check","email":"team3@omdalat.com","message":"ping"}'
npm run cf:runtime-map:check
npm run mail:smoke:e2e:live
```

### 1.3 Điều kiện Team 1 nhận closure Team 3

* register/operations không còn `404`
* support không còn `502`
* contact không còn `405` cho contract release hiện tại
* runtime-map check pass
* mail smoke live pass
* packet cập nhật:
  * `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`

---

## 2. Ap Team — Lệnh chạy ngay

### 2.1 Trạng thái hiện tại

* Lane đang `PENDING_REPORT` (mới có baseline prefill Team 1, chưa có owner evidence thật)

### 2.2 File Ap Team bắt buộc điền

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

### 2.3 Điều kiện Team 1 nhận review Ap lane

* report đủ 10 mục theo format
* matrix có route editorial chính + metadata/locale status rõ
* evidence packet có path thật cho:
  * canonical/hreflang/sitemap/robots
  * alt/caption/filename audit
  * QA summary

---

## 3. Quy tắc không chờ nhau

* Team 3 không chờ Ap Team để xử lý runtime drift.
* Ap Team không chờ Team 3 để nộp report editorial.
* Team 1 chỉ chờ evidence, không chờ nói miệng.

---

## 4. Team 1 closure rule

* Team 3 chỉ thoát `REVIEWED_BLOCKED_P0` khi có fresh pass evidence.
* Ap Team chỉ thoát `PENDING_REPORT` khi nộp current-state report thật.
* Global gate vẫn `NO_GO` cho tới khi cả 2 lane đạt điều kiện trên.

