Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Checkpoint

Version: v1.1.0

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

* Status: `PASS_WITH_QUEUE`
* Progress: `100%` cho P0
* Ghi chú:
  * route gap canonical đã đóng sau deploy `f633122e`:
    * `/vi/contact` -> `200`
    * `/en/contact` -> `200`
    * `/vi/about` -> `200`
  * phần còn lại chỉ là P1 hardening queue

### 1.2 Team 3 — App member runtime

* Status: `REVIEWED_BLOCKED_P0`
* Progress: `~82%` (còn `~18%`)
* Lý do còn block:
  * canonical parity trên `app.omdalat.com` chưa đạt
  * checker gate mới `D-009` đang fail localized routes
  * chưa có fresh pass packet sau khi canonical host bắt kịp artifact mới
* Team 1 probe mới (`2026-04-29`) xác nhận:
  * `/vi/member/register` -> `404`
  * `/vi/member/operations` -> `404`
  * `/api/support` -> `200`
  * `/api/contact` -> `200`
* Shadow runtime đã pass:
  * deploy: `https://d6b35718.omdalat-app-2ol.pages.dev`
  * `/vi/member/register` -> `200`

### 1.3 Ap Team — Ap editorial

* Status: `REVIEW_READY`
* Progress: `~88%` (theo packet owner lane)
* Lý do còn block:
  * chờ Team 1 verdict cuối
  * live-domain probe bổ sung chưa nộp

---

## 2. P0 done / P0 blocked / P1 queue (tổng hợp)

### 2.1 P0 done

* Bộ chuẩn universal đã kích hoạt cho Om/App/Ap ở lớp governance.
* Team 2 và Team 3 đã nộp report theo format 10 mục.
* Team 1 đã review xong 2 lane đã nộp.
* Team 1 đã prefill baseline cho lane Ap để rút thời gian nộp.

### 2.2 P0 blocked

* Team 3: canonical parity ở `app.omdalat.com`.
* Ap Team: không còn blocked do thiếu submission; còn chờ verdict Team 1.

### 2.3 P1 queue

* Om public: content hardening + blacklist regression VI/EN.
* App runtime: persistence deepening cho stay/work/resources/earnings.
* Ap editorial: regression title/meta/alt/caption theo locale.

---

## 3. Việc 15 phút tiếp theo cho từng team

### Team 2

1. Không còn blocker P0; tiếp tục hardening P1.
2. Mở rộng alt/caption audit cho secondary surfaces.
3. Bổ sung regression check blacklist VI/EN theo queue.

### Team 3

1. Chốt runtime parity cho `app.omdalat.com` (register/operations/support/contact lanes).
2. Rerun `npm run cf:runtime-map:check`.
3. Rerun `npm run mail:smoke:e2e:live`.
4. Cập nhật packet `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md` theo run mới.

### Ap Team

1. Chuẩn bị live-domain probe packet (`canonical/hreflang/robots/sitemap` trên host live).
2. Bổ sung visual evidence packet cho các route image-rich.
3. Chờ Team 1 verdict cuối và xử lý ngay nếu có revision.

---

## 4. Global gate

* Current gate: `NO_GO_FOR_FULL_3_LANE_CLOSURE`
* Team 1 closure lock for Team 2: `D-007` đã đạt điều kiện, closure result khóa tại `D-008`
* Điều kiện để Team 1 chuyển sang `GO`:
  * Team 3 thoát `REVIEWED_BLOCKED_P0`
  * Ap Team có verdict cuối (`PASS_WITH_QUEUE` hoặc `PASS`)
