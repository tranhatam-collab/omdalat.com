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

---

## 9. Team 1 change notice áp dụng ngay (2026-05-04)

Team 3 phải nhận baseline mới từ:

- `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`
- `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`

Yêu cầu bắt buộc:

- giữ tương thích runtime cho pillar alias `life` và `earning` trong nhịp chuyển đổi seed hiện tại.
- không đổi payment lane ra ngoài `PHASE_2_NOT_IN_SCOPE` nếu chưa có release directive mới.
- không claim `DONE` lane Team 3 khi chưa qua vòng review mới của Team 1.

## 9. Closure trạng thái Team 3 và điều phối Team 1 (2026-05-04)

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
