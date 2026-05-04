# DEV_TEAM_2_PLAN_OMDALAT.md

## Version
3.2

## Status
Locked team execution plan

## Date updated
2026-05-04

## Owner
Team 2

## Mission
Design, Frontend, Public Web, responsive implementation, member UI shell support

---

## 1. Nhiệm vụ chính

Team 2 chịu trách nhiệm lớp thiết kế và frontend public của Om Dalat.

Team 2 sở hữu:

- design system
- Figma implementation
- public pages
- homepage components
- article pages
- responsive behavior
- locale-aware UI
- stay/work/learning/community/join screens
- public docs UI

Trong sprint hiện tại, Team 2 hỗ trợ thêm:

- skeleton `/member`
- login/register/gate screen UI shell
- dashboard shell states cần cho Team 3 nối logic

Team 2 không sở hữu:

- brand wording gốc
- route semantics
- access model semantics
- CMS schema ownership
- auth/backend implementation

---

## 2. Deliverables bắt buộc

### Phase A

- design system v1
- homepage screens
- public page shells
- responsive header/footer/navigation

### Phase B

- article screen
- stay/work/learning/community/join screens
- public docs UI
- member gate screen shell

### Phase C

- mobile QA
- accessibility QA
- locale UI refinement
- support member shell rendering

---

## 3. File và vùng code nên thuộc Team 2

- `apps/web/app/*` cho public UI
- public route components
- article presentation components
- navigation, footer, locale switcher UI
- gate screen UI components
- dashboard shell components khi cần hỗ trợ Team 3

---

## 4. Phụ thuộc

### Cần Team 1 chốt

- homepage copy
- page structure
- CTA wording
- locale content keys
- SEO metadata rules

### Cần Team 3 chốt

- member states
- access-level rendering rules
- dashboard data states
- resource teaser data

---

## 5. Cơ chế báo cáo

### Daily async

- UI nào đã dựng
- current blockers
- state nào cần Team 1 hoặc Team 3 chốt

### Weekly

- public pages đã pass tới đâu
- mobile/responsive issues
- UI state gaps ảnh hưởng member rendering
- change requests cần Team 1 phê duyệt

---

## 6. KPI thành công

- public UI đúng codex
- homepage và public pages render sạch
- responsive tốt
- gate screens rõ
- UI không tự đổi nghĩa spec
- hỗ trợ Team 3 render member states đúng

---

## 7. Cập nhật bắt buộc (Language Lock 2026-04-19)

Team 2 phải áp dụng trực tiếp:

- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md` (cho H1/intro public pages)
- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` (cho article UI, CTA contextual, internal link và tách locale)
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md` (thông báo thay đổi SOP từ vòng Codex hiện tại)
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` (cho ảnh public, article cover, card, bridge)

Checklist merge bổ sung:

- không còn CTA kiểu thúc ép
- header/footer/buttons/forms/empty states theo microcopy chuẩn mới
- bridge copy Om ↔ Ap đúng ngữ cảnh
- mọi thay đổi copy phải gửi Team 1 review trước merge
- article page không trộn tiếng Việt và tiếng Anh trong cùng visible page
- article layout giữ đoạn đọc 4-6 dòng, max width dễ đọc, không trình bày kiểu mạng xã hội
- mỗi bài chỉ render tối đa 3-4 internal link chính theo SOP
- alt image không trống và phải theo đúng locale đang hiển thị

## 8. Cập nhật bắt buộc (Content SOP 2026-05-04)

Team 2 không tự sửa nghĩa bài viết, CTA hoặc heading để làm UI đẹp hơn.

Khi render bài viết, Team 2 phải bảo toàn:

- Title, excerpt, body và CTA đã được Team 1/Content duyệt theo SOP
- tách locale VI/EN sạch
- route và link pillar: `/vi/work`, `/vi/stay`, `/vi/life`, `/vi/join` hoặc bản `/en/*` tương ứng
- hình ảnh đúng vai trò bài và không bị crop làm sai ngữ cảnh

Nếu UI cần rút ngắn chữ để tránh vỡ layout, Team 2 gửi lại Team 1 duyệt wording thay vì tự viết lại.

Mọi report tiếp theo của Team 2 phải có dòng xác nhận:

- đã đọc `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- article UI không trộn VI/EN
- ảnh/card/article cover không làm sai ngữ cảnh bài
- internal link và CTA đi đúng payload đã duyệt

---

## 9. Team 1 change notice áp dụng ngay (2026-05-04)

Team 2 phải nhận baseline mới từ:

- `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`
- `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`
- `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`

Yêu cầu bắt buộc:

- cập nhật mọi reference của bài launch sang slug mới:
  - `/vi/articles/song-o-da-lat-la-gi`
  - `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
  - `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`
- không claim `DONE` ở lane Team 2 khi chưa qua vòng review mới của Team 1.

## 10. Cập nhật trạng thái Team 2 (2026-05-04)

Team 2 lane Om public đã chốt P0 theo điều kiện Team 1:

* `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` + matrix/metadata/alt/evidence đã đầy đủ cho core P0.
* Route canonical P0 trước đây lỗi đã phục hồi:
  * `/vi/contact` -> `200`
  * `/en/contact` -> `200`
  * `/vi/about` -> `200`
* Trạng thái hiện tại: `PASS_WITH_QUEUE` (không blocker P0); P1 queue:
  * mở rộng alt/caption audit secondary
  * tiếng Anh leakage regression test

Thông tin điều phối tiếp theo:

* Team 3 đang giữ `DONE_CLOSED` trong cycle này (`docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`).
* Ap Team đang `PASS_WITH_QUEUE` với P1 queue riêng.
* Team 2 tiếp tục theo dõi hardening trên các file reference đã nộp.

File điều phối:

* `docs/OMDALAT_3_LANE_DECISION_LOG_2026-04-28.md` (`D-008`, `D-015`)
* `docs/OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md`
* `docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md`

Lưu ý QA vận hành mới (2026-05-04):

* Rerun local smoke/lock suite:
  * `PREVIEW_BASE_URL=https://omdalat.com pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts`
  * hiện tại bị fail do quyền launch Chromium trên host, không phải bug logic nội dung.
* Khi có runner cho phép chromium IPC, Team 2 cần cung cấp kết quả bổ sung cho `RUN_ID` của suite này.

## 11. Sprint 0 Launch 3 Bài (Execution từ SOP)

- Date start: 2026-05-04
- Scope: 3 bài mở nền, giao ngay cho Team Content/Dev để Team 2 test UI không đợi full 30 bài.
- Handoff payload bắt buộc:
  - `data/seed/articles.seed.launch-v2.json`
  - `data/seed/article-images.seed.json`
- Team 2 đọc trước khi dev:
  - `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
  - `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
  - `docs/OMDALAT_TEAM1_CHANGE_BROADCAST_2026-05-04.md`
- Luồng team2 khi nhận file:
  1. Nạp `articles.seed.launch-v2.json` vào local seed context và sync runtime page (không sửa VI/EN).
  2. Chạy `pnpm run validate:content-seed` + `pnpm --filter @omdalat/web run validate:web-locales` + `pnpm --filter @omdalat/web run validate:i18n-data`.
  3. Xác nhận UI:
     - article layout rộng tối đa `720px`
     - đoạn 4-6 dòng/đoạn theo mắt đọc
     - locale `/vi` và `/en` tách sạch
     - CTA bridge lấy theo `contextual_cta` (đã map sang component runtime).
- Đã cập nhật runtime để phục vụ Sprint 0:
  - `apps/web/lib/content-seed.ts` đọc `meta_title_*`, `meta_description_*`, `contextual_cta`.
  - `apps/web/app/articles/[slug]/page.tsx` dùng seed-driven metadata + contextual bridge CTA.

## 12. Team 3 packet handoff confirmed (2026-05-04)

Team 2 nhận payload từ Team 3 ở cả 2 lớp:

* runtime seed tương thích hiện tại: `data/seed/articles.seed.json`
* launch payload V2 để QA schema/content: `data/seed/articles.seed.launch-v2.json`
* image reality records cho 3 bài launch: `data/seed/article-images.seed.json`

Lệnh bắt buộc trước khi QA giao Team 1:

* `npm run validate:content-seed`
