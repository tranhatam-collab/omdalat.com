Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 Admin Next Actions

Version: v1.3.0

Status: FINAL NOTICE (TEAM1 CYCLE CLOSED)

Date updated: 2026-05-04

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
* `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`
* `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`
* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* `docs/SPRINT0_ACCEPTANCE_PACKET_TEMPLATE_2026-05-05.md`
* `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* `docs/OMDALAT_BRANDPRO_TEAM_APPLICATION_LOCK_2026-05-08.md`
* `docs/OMDALAT_BRANDPRO_GATE0_DECISION_2026-05-08.md`
* `docs/OMDALAT_BRAND_SOURCE_CONFLICT_MATRIX_2026-05-08.md`

Quick command:

* `npm run team1:lane:check`

---

## 1. Team 1 review snapshot

* Team 2: `PASS_WITH_QUEUE` (P0 complete, tiếp tục queue hardening).
* Team 3: `DONE_CLOSED` (cycle hien tai da dong, `100%`).
* Ap Team: `PASS_WITH_QUEUE` (P0 complete, tiếp tục queue hardening).
* Team 1: `DONE` cho cycle hien tai.

Brandpro overlay now active:

* Gate 0 public law da duoc ap dung cho `omdalat.com`.
* Public naming hierarchy: `Ôm Đà Lạt / Om Dalat`.
* Public/app domains: `omdalat.com` + `app.omdalat.com`.
* Neu sprint docs xung dot voi Brandpro Gate 0, uu tien theo Brandpro lock va source conflict matrix.

---

## 2. Việc Team 2 cần làm ngay

* Không còn nhiệm vụ blocker P0.
* Tiếp tục P1 queue:
  * mở rộng alt/caption audit cho secondary public surfaces
  * tăng regression check cho bilingual copy

File chính:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
* `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`

---

## 3. Việc Team 3 cần làm ngay

* Cycle Team 3 hien tai da `DONE_CLOSED`.
* Cac muc tiep theo la hardening backlog hau cycle:
  * strict outbox retry tren runner on dinh
  * cleanup split-account/decommission shadow project
  * validator/content-contract evidence cho batch CMS/article moi theo SOP

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

---

## 6. Team 1 completion notice

* Team 1 da chot hoan thanh cycle dieu phoi hien tai.
* Bao cao dong cycle: `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`
* Tu nhip nay, Team 1 chi mo lai khi co cycle moi hoac founder directive moi.

## 7. Sprint 0 execution note

* Sprint 0 dang o mode thuc thi cho 3 bai launch.
* Packet nghiem thu bat buoc truoc GO staging:
  * `docs/SPRINT0_ACCEPTANCE_PACKET_TEMPLATE_2026-05-05.md`
  * `docs/SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md`
  * `docs/SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md`
  * `docs/SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md`
  * `pnpm validate:sprint0-launch`
  * `pnpm sprint0:acceptance:check`
* Team 1 / Team 3 da prefill current-state packet; Team 2 + QA/SEO bo sung visual/staging proof va signoff cuoi.
* Blocker ky thuat local da giam: `tsc --noEmit` da pass sau khi regenerate `.next` types; phan con lai la `Collecting build traces` timeout + visual/staging proof.
  * `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`
  * `data/seed/articles.seed.sprint0-launch.json`
  * `data/seed/article-images.seed.json`
* Brand semantics cho Sprint 0 phai theo:
  * `docs/OMDALAT_BRANDPRO_TEAM_APPLICATION_LOCK_2026-05-08.md`
  * `docs/OMDALAT_BRANDPRO_GATE0_DECISION_2026-05-08.md`
  * `docs/OMDALAT_BRAND_SOURCE_CONFLICT_MATRIX_2026-05-08.md`
