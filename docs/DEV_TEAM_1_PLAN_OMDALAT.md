# DEV_TEAM_1_PLAN_OMDALAT.md

## Version
3.2

## Status
Locked team execution plan

## Date updated
2026-05-03

## Owner
Team 1

## Current role
Codex / Team 1

## Mission
Foundation, Content, SEO, Product Logic, execution control, current sprint public cleanup

---

## 1. Nhiệm vụ chính

Team 1 là trung tâm giữ logic nền của toàn hệ.

Team 1 sở hữu:

- positioning
- language codex
- information architecture
- homepage logic và system copy
- SEO structure
- access model ở cấp sản phẩm
- handbook access boundary
- acceptance criteria
- review và change control giữa 3 team

Trong sprint hiện tại, Team 1 trực tiếp xử lý thêm:

- cleanup public live
- homepage rewrite
- build blocker P0 ảnh hưởng public surface
- content operating system: homepage work layer, first foundation articles, internal linking, and 100-article SEO roadmap

Team 1 không sở hữu dài hạn:

- component library implementation
- animation chi tiết
- auth/backend implementation
- CMS field ownership
- database migrations
- release ops execution

---

## 2. Deliverables bắt buộc

### Phase A

- khóa spec nền
- khóa copy nền
- cleanup dấu vết hệ cũ
- rewrite homepage public live
- đổi menu, CTA, meta

### Phase B

- review handoff của Team 2 và Team 3
- chốt shared contract changes
- chốt copy cho member teaser, gate screens, dashboard labels

### Phase C

- QA ngôn ngữ, SEO, IA, access semantics
- chuẩn bị founder review và weekly sync decisions

---

## 3. File và vùng công việc nên thuộc Team 1

- `docs/OMDALAT_*`
- locale copy source
- SEO metadata rules
- route meaning và redirect logic
- acceptance checklists
- founder handoff summaries

Trong sprint hiện tại, Team 1 cũng trực tiếp chạm vào:

- `apps/web/app/*` cho public cleanup P0
- public homepage copy surface
- public navigation và CTA logic

---

## 4. Phụ thuộc

### Cần Team 2 chốt

- member UI shell
- gate screen states
- member/public crossover states

### Cần Team 3 chốt

- CMS schema
- content seed
- handbook/resource mapping
- access field naming

---

## 5. Cơ chế báo cáo

### Daily async

- what shipped
- current blockers
- contracts changed
- impact to Team 2 / Team 3

### Weekly

- spec nào đã khóa
- public/member boundary có đổi không
- CTA, route, access, SEO có gì cần chốt
- handoff nào được phát ra cho Team 2 và Team 3

---

## 6. KPI thành công

- không còn lệch brand ở public surface
- homepage đúng spec
- không có 2 nguồn chân lý khác nhau
- Team 2 và Team 3 build không lệch semantics
- change control có log
- weekly sync ra quyết định rõ

---

## 7. Cập nhật bắt buộc (Content Operating System 2026-05-03)

Team 1 kích hoạt file kế hoạch tổng:

- `docs/OMDALAT_CONTENT_OPERATING_SYSTEM_AND_100_SEO_ROADMAP_2026-05-03.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

Phạm vi đã áp dụng:

- homepage có block `Làm việc từ Đà Lạt`
- homepage có block `Bài nền đang mở`
- homepage có bridge `Ấp Đà Lạt`
- 3 bài nền đầu tiên đã được đưa vào content seed và public runtime
- article detail có link nội bộ bắt buộc sang `/work`, `/stay`, `/join`, và 2 bài liên quan
- article body giữ layout đọc dài với max-width 720px
- homepage và article visual phải bám đời sống thật tại Đà Lạt, không dùng hướng du lịch hóa hoặc nghỉ dưỡng hóa
- seed ảnh bài viết đã tách thành nguồn riêng: `data/seed/article-images.seed.json`
- gate kiểm tra source/license/alt/caption/crop cho bài published đã tích hợp vào `scripts/validate-content-seed.mjs`
- 3 bài nền đầu tiên hiện dùng ảnh work-context đã duyệt trong seed: bàn làm việc/quán nhỏ/trao đổi quanh laptop. Đây là lớp runtime tạm đạt chuẩn vai trò; khi có bộ ảnh owned tại Đà Lạt, chỉ thay seed và giữ nguyên gate.

Quy tắc cho các team:

- Content không được nộp bài rời rạc, phải nằm trong roadmap/pillar.
- SEO không được mở slug mới ngoài roadmap nếu chưa cập nhật plan.
- DEV không được render song ngữ lẫn nhau trong cùng một visible page khi site đang dùng route `/vi` và `/en`.
- DEV và Content không được chọn ảnh chỉ vì đẹp; ảnh phải đúng Đà Lạt thật, đúng intent của block hoặc bài, và không làm sai kỳ vọng về sống/làm/ở lại.
- Ap Team giữ `ap.omdalat.com` là editorial site độc lập; Om chỉ bridge đúng ngữ cảnh.
- Team 1 giữ quyền review cuối với mọi thay đổi ảnh public/editorial nếu ảnh mới có nguy cơ làm lệch vai trò trang.

Checklist điều phối ảnh bắt buộc:

- route nào dùng ảnh nào phải có log `used_routes`
- ảnh public phải có `alt_vi`, `alt_en`, `caption_vi`, `caption_en`
- ảnh phải pass desktop crop và mobile crop trước khi đưa vào release gate
- không thay ảnh vì "đẹp hơn" nếu làm lệch ngữ cảnh bài

---

## 8. Cập nhật bắt buộc (Language Lock 2026-04-19)

Team 1 chịu trách nhiệm áp dụng và kiểm duyệt 3 file nền mới:

- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_AND_APDALAT_COPY_ROLLOUT_PLAN_2026.md`

Chuẩn review bắt buộc:

- tiếng Việt có dấu đầy đủ và đúng chuẩn văn
- tiếng Anh rõ nghĩa kỹ thuật, không dịch thô
- không dùng wording sale/hype
- không lệch ranh giới `omdalat.com` và `ap.omdalat.com`
