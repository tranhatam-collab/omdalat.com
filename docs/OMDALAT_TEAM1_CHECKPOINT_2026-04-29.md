Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Checkpoint

Version: v1.0.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 1

---

## 0. Mục đích

Checkpoint này khóa trạng thái điều phối mới nhất cho 3 lane:

* Om public (Team 2)
* App member runtime (Team 3)
* Ap editorial (Ap Team)

Team 1 dùng file này để nhắc việc tiếp theo theo nhịp ngắn, không để team chờ nhau sai chỗ.

---

## 1. Snapshot hiện tại

### 1.1 Team 2 — Om public

* Status: `REVIEWED_BLOCKED_P0`
* Progress: `~92%` (còn `~8%`)
* Lý do còn block:
  * alt audit còn `PENDING_AUDIT`
  * metadata text-level chưa phủ full route P0
  * Team 1 probe canonical `2026-04-29` thấy route gap:
    * `/vi/contact` -> `404`
    * `/en/contact` -> `404`
    * `/vi/about` -> `404`

### 1.2 Team 3 — App member runtime

* Status: `REVIEWED_BLOCKED_P0`
* Progress: `~60%` (còn `~40%`)
* Lý do còn block:
  * runtime drift (`404/502/405`)
  * smoke live fail ở batch mới
  * chưa có fresh pass packet sau khi chốt parity
* Team 1 probe mới (`00:24 ICT, 2026-04-29`) vẫn fail:
  * `/vi/member/register` -> `404`
  * `/vi/member/operations` -> `404`
  * `/api/support` -> `502`
  * `/api/contact` -> `405`

### 1.3 Ap Team — Ap editorial

* Status: `PENDING_REPORT`
* Progress: `N/A` (baseline Team 1 prefill khoảng `35%`, chưa phải submission owner)
* Lý do còn block:
  * chưa nộp current-state report chính thức
  * chưa điền matrix/evidence packet bằng dữ liệu runtime thật

---

## 2. P0 done / P0 blocked / P1 queue (tổng hợp)

### 2.1 P0 done

* Bộ chuẩn universal đã kích hoạt cho Om/App/Ap ở lớp governance.
* Team 2 và Team 3 đã nộp report theo format 10 mục.
* Team 1 đã review xong 2 lane đã nộp.
* Team 1 đã prefill baseline cho lane Ap để rút thời gian nộp.

### 2.2 P0 blocked

* Team 2: route gap canonical + alt audit/metadata coverage chưa đủ.
* Team 3: runtime/API drift + smoke fail batch mới.
* Ap Team: chưa có submission current-state.

### 2.3 P1 queue

* Om public: content hardening + blacklist regression VI/EN.
* App runtime: persistence deepening cho stay/work/resources/earnings.
* Ap editorial: regression title/meta/alt/caption theo locale.

---

## 3. Việc 15 phút tiếp theo cho từng team

### Team 2

1. Điền nốt `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md` để không còn `PENDING_AUDIT` ở route P0.
2. Mở rộng `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md` cho full route P0.
3. Re-check 3 route canonical đang lỗi `404` và nộp bằng chứng mới.

### Team 3

1. Chốt runtime parity cho `app.omdalat.com` (register/operations/support/contact lanes).
2. Rerun `npm run cf:runtime-map:check`.
3. Rerun `npm run mail:smoke:e2e:live`.
4. Cập nhật packet `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md` theo run mới.

### Ap Team

1. Chuyển report từ baseline sang current-state thật:
   * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
2. Điền matrix route/metadata/image:
   * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
3. Nộp evidence packet:
   * `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

---

## 4. Global gate

* Current gate: `NO_GO_FOR_FULL_3_LANE_CLOSURE`
* Team 1 closure lock for Team 2: `D-007` (không cho `PASS_WITH_QUEUE` khi contact canonical còn `404`)
* Điều kiện để Team 1 chuyển sang `GO`:
  * Team 2 thoát `REVIEWED_BLOCKED_P0`
  * Team 3 thoát `REVIEWED_BLOCKED_P0`
  * Ap Team thoát `PENDING_REPORT`
