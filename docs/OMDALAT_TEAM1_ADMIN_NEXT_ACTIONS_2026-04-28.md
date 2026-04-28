Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Admin Next Actions

Version: v1.2.0

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

* Team 2: `PASS_WITH_QUEUE` (P0 complete, tiếp tục queue hardening).
* Team 3: `REVIEWED_BLOCKED_P0` (`~18%` còn lại) vì canonical parity fail ở localized member routes.
* Ap Team: `PASS_WITH_QUEUE` (P0 complete, tiếp tục queue hardening).

---

## 2. Việc Team 2 cần làm ngay

* Không còn nhiệm vụ blocker P0.
* Tiếp tục P1 queue:
  * mở rộng alt/caption audit cho secondary public surfaces
  * tăng regression check cho bilingual copy

File chính:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`

---

## 3. Việc Team 3 cần làm ngay

* Chốt runtime parity cho host canonical:
  * `/vi/member/register` phải `200`
  * `/vi/member/operations` phải redirect reviewed gate
* Rerun:
  * `npm run cf:runtime-map:check`
  * `npm run mail:smoke:e2e:live`
* Cập nhật `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md` bằng artifact/smoke mới nếu pass.
* Ghi rõ mapping quyết định cuối giữa account canonical và shadow runtime nếu có chuyển domain/project.

File chính:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`

---

## 4. Việc Ap Team cần làm ngay

* Chuẩn bị live-domain probe packet cho các route editorial chính.
* Bổ sung visual evidence cho image-rich routes (cards, hero, gallery).
* Giữ đồng bộ role boundary Om/App/Ap trong các vòng content mở rộng tiếp theo.

File chính:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

---

## 5. Team 1 rule

* Không lane nào được tự chuyển `BLOCKED` sang `DONE` nếu Team 1 chưa review.
* Không claim P0 done nếu thiếu matrix lane bắt buộc.
* Không claim done nếu evidence path không khớp claim.
