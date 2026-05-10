# DEV_TEAM_3_PLAN_OMDALAT.md

## Version
3.2

## Status
Locked team execution plan

## Date updated
2026-05-04

## Owner
Team 3

## Mission
CMS, Member System, Backend, Ops Tools, content/data contracts

---

## 0. Source Priority Update (Brandpro Gate 0 - 2026-05-08)

Team 3 phải áp dụng source theo thứ tự:

1. `docs/README_DEV_HANDOFF_OMDALAT.md`
2. `docs/OMDALAT_BRANDPRO_TEAM_APPLICATION_LOCK_2026-05-08.md`
3. `docs/OMDALAT_BRANDPRO_GATE0_DECISION_2026-05-08.md`
4. `docs/OMDALAT_BRAND_SOURCE_CONFLICT_MATRIX_2026-05-08.md`
5. `docs/OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md`
6. Các app/CMS/runtime/sprint docs còn lại nếu không xung đột

Operational law đang active:

- public/app direction là `omdalat.com` và `app.omdalat.com`
- public meaning là independent real-life living system in Dalat
- legacy `app.omdala.com` hoặc `docs.omdala.com` chỉ được xem là historical/internal context

Hard stop cho Team 3:

- không encode legacy OMDALA public framing vào CMS labels, app metadata, dashboard copy, support flow, seed data, schema
- không claim deploy/runtime done nếu evidence mới chưa khớp Brandpro law và Sprint 0 gate

---

## 1. Nhiệm vụ chính

Team 3 chịu trách nhiệm lớp dữ liệu, member system, backend contract và ops tooling của Om Dalat.

Team 3 sở hữu:

- CMS collections
- member access control
- login/register logic
- profile completion logic
- review states
- dashboard data states
- member resources
- handbook structures
- internal ops docs structure
- notification basics

Trong sprint hiện tại, Team 3 ưu tiên:

- chốt CMS schema
- chốt content seed
- chốt handbook/resource mapping
- chuẩn bị data contracts cho Team 1 và Team 2 render đúng

Team 3 không sở hữu:

- public homepage implementation
- public visual system
- brand wording gốc
- public IA ownership

---

## 2. Deliverables bắt buộc

### Phase A

- CMS fields
- access levels
- role logic
- locale-aware content fields

### Phase B

- auth skeleton
- register/login logic
- member route guards
- gate behavior
- dashboard data model

### Phase C

- handbook section tree
- member resource categories
- notification basics
- noindex rules cho member/app/internal

### Phase D

- QA acceptance data checks
- beta readiness snapshot
- release blockers reporting

---

## 3. File và vùng code nên thuộc Team 3

- `data/*`
- `apps/web/lib/*` liên quan auth/access/data contracts
- member middleware và role checks
- CMS config
- content seed / fixtures
- handbook content sources
- release và QA docs

---

## 4. Phụ thuộc

### Cần Team 1 chốt

- access semantics
- role naming
- gate copy
- handbook access boundary
- noindex/index rules

### Cần Team 2 chốt

- member shell UI states
- gate screen layout
- dashboard shell needs
- form UI grouping

---

## 5. Cơ chế báo cáo

### Daily async

- logic nào đã xong
- blocker auth/CMS/access
- contract nào ảnh hưởng Team 1 hoặc Team 2

### Weekly

- access model implementation progress
- CMS/schema changes
- member resources rendering progress
- route guards và noindex status
- release blockers

---

## 6. KPI thành công

- CMS schema sạch
- access matrix chạy đúng
- member/internal layers không lẫn
- Team 2 có đủ data/state để render
- Team 1 không phải sửa lại semantics sau khi build
- member/app/internal không bị index sai

---

## 7. Cập nhật bắt buộc (Language Lock 2026-04-19)

Team 3 phải áp dụng trực tiếp:

- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md` cho title/meta/H1/intro ở route member/public do Team 3 sở hữu
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md` cho gate screens, dashboard labels, trạng thái và notifications
- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` cho CMS/article schema, validator, locale content và sprint handoff
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md` cho thay đổi contract mới từ vòng Codex hiện tại
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` cho image seed, source/license log, alt/caption và crop status

Checklist merge bổ sung:

- không còn wording kỹ thuật khô kiểu `Unlocked at`, `Unlocks at`
- member states theo đúng bộ từ khóa mới: `Open sections`, `Next step`, `Participation status`
- không index nhầm route member/internal sau khi thay copy
- content schema mới ưu tiên `locales.vi` và `locales.en`; root-level `title_vi`, `title_en` chỉ là adapter runtime hiện tại
- validator phải chặn bài publish nếu thiếu metadata locale, featured image, alt fallback hoặc source/license log
- ảnh batch mới phải là `WebP` hoặc `AVIF` và tên file bám slug bài viết

## 8. Cập nhật bắt buộc (Content SOP 2026-05-04)

Team 3 chịu trách nhiệm biến SOP thành contract dữ liệu sạch.

CMS/data layer phải bảo đảm:

- mỗi article có `slug`, `pillar_key`, `status`, `access_level`, `tags`, `locales`, `featured_image`
- `pillar_key` chỉ nhận `work`, `stay`, `life`, `system`
- `status` chỉ nhận `draft`, `published`, `archived`
- `access_level` chỉ nhận `public`, `members_only`
- nội dung VI/EN không bị trộn trong một field
- route `/vi/*` và `/en/*` truy vấn đúng locale
- hreflang/canonical/sitemap chỉ mở cho nội dung publish hợp lệ

Team 3 không tự đổi wording để vừa schema. Nếu payload không đạt SOP, trả lại Content/Team 1 sửa trước khi nhập CMS.

Mọi report tiếp theo của Team 3 phải có dòng xác nhận:

- đã đọc `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- validator/CMS contract không cho publish batch sai SOP
- `locales.vi` / `locales.en` là schema đích cho CMS v2
- ảnh batch mới bị chặn nếu không phải `WebP` hoặc `AVIF`

---

## 9. Team 1 change notice áp dụng ngay (2026-05-04)

Team 3 phải nhận baseline mới từ:

- `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`
- `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`
- `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`
- `docs/OMDALAT_TEAM1_ADMIN_NEXT_ACTIONS_2026-04-28.md`
- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`
- `docs/OMDALAT_BRANDPRO_TEAM_APPLICATION_LOCK_2026-05-08.md`
- `docs/OMDALAT_BRANDPRO_GATE0_DECISION_2026-05-08.md`
- `docs/OMDALAT_BRAND_SOURCE_CONFLICT_MATRIX_2026-05-08.md`
- `docs/OMDALAT_BRANDPRO_PHASE1_FORENSICS_KICKOFF_2026-05-08.md`

Yêu cầu bắt buộc:

- giữ tương thích runtime cho pillar alias `life` và `earning` trong nhịp chuyển đổi seed hiện tại.
- không đổi payment lane ra ngoài `PHASE_2_NOT_IN_SCOPE` nếu chưa có release directive mới.
- không claim `DONE` lane Team 3 khi chưa qua vòng review mới của Team 1.
- treat old OMDALA app/docs references as blocked for new public/app implementation unless Team 1 revalidates.

## 10. Closure trạng thái Team 3 và điều phối Team 1 (2026-05-04)

Team 3 tự chốt cycle hiện tại ở trạng thái:

* `DONE_CLOSED`
* Progress cycle hiện tại: `100%`

Khóa vận hành:

* runtime smoke mặc định là release gate của cycle đã đóng
* strict outbox giữ ở hardening backlog (không blocker closure)
* split-account cleanup và validator/content-contract evidence tiếp tục ở hậu cycle khi có batch mới

File tham chiếu:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* `docs/OMDALAT_3_LANE_DECISION_LOG_2026-04-28.md` (`D-014`)
* `docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md`
* `docs/OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md`

Thông tin cho Team 2:

* Team 2 lane Om public đang ở `PASS_WITH_QUEUE` theo `D-008`.
* P0 team2 đã đóng, team2 vẫn giữ hardening queue P1.

## 11. Sprint 0 Execution kickoff (2026-05-04)

Team 3 chuyển từ planning sang execution cho 3 bài mở nền.

Deliverables đã sẵn:

* runtime seed: `data/seed/articles.seed.json` (3 bài launch publish + meta/internal links + locales + featured_image)
* launch-only runtime snapshot: `data/seed/articles.seed.sprint0-launch.json`
* launch schema V2: `data/seed/articles.seed.launch-v2.json`
* image records: `data/seed/article-images.seed.json` (3 hero launch chuẩn `webp` + slug naming)
* execution guide: `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`
* legacy brief vẫn tham chiếu được: `docs/SPRINT0_LAUNCH_3_FOUNDATION_ARTICLES_2026-05-04.md`

Gate đã chạy:

* `npm run validate:content-seed` -> `PASS`
* `pnpm validate:sprint0-launch` -> `PASS`
* `pnpm sprint0:acceptance:check` -> `PENDING`

Current Sprint 0 closure state:

* `visual_pending=6/6`
* `staging_pending=6/6`
* `packet_signoff_pending=YES`
* `packet_deploy_blocked=YES`
* `packet_build_trace_blocked=YES`

Automation rule:

* heartbeat `team-3-continuous-execution` chi duoc tat khi:
  * `pnpm sprint0:acceptance:check` -> `READY_TO_CLOSE`
  * Team 2 + QA + SEO da ky signoff trong packet
  * fresh deploy blocker khong con o trang thai `WRANGLER_AUTH` nua
