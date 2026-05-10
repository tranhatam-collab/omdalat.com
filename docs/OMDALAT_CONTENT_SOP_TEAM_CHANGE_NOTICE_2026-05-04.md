# OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04

Om Dalat / Ôm Đà Lạt  
Ap Dalat / Ấp Đà Lạt

Status: ACTIVE TEAM NOTICE  
Owner: Codex / Team 1 coordination  
Date: 2026-05-04  
Scope: Team 1, Team 2, Team 3, Content, SEO, QA, DevOps, Ap Team, AI contributors

---

## 0. Kết luận

Từ vòng cập nhật này, `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` là gate Level A cho mọi batch bài viết public của Ôm Đà Lạt.

Không bài viết, ảnh bài viết, metadata, internal link, schema handoff hoặc deploy content nào được claim xong nếu chưa pass SOP này.

Chuẩn ảnh thật vẫn nằm ở `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`, nhưng từ nay bị ràng thêm bởi Content SOP: batch mới phải dùng ảnh publish dạng `WebP` hoặc `AVIF`, tên file bám slug, có source/license log, alt/caption VI/EN và crop evidence.

---

## 1. Thay đổi đã khóa

1. Content SOP được tạo thành source of truth chính thức:
   - `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
2. Content handoff schema đích chuyển về dạng:
   - `locales.vi`
   - `locales.en`
   - `featured_image`
3. Seed root-level hiện tại như `title_vi`, `title_en`, `content_vi`, `content_en` chỉ là adapter runtime hiện tại, không phải schema canonical dài hạn.
4. Nội dung VI/EN phải tách sạch theo route/locale. Không dùng kiểu một bài visible trộn hai ngôn ngữ.
5. Mỗi bài chỉ có tối đa 3-4 internal link chính:
   - 1 link pillar
   - 1-2 link ngang
   - 1 CTA cuối nếu intent đủ chín
6. Ảnh batch mới phải:
   - đúng đời sống Đà Lạt thật
   - không du lịch hóa
   - không nghỉ dưỡng hóa
   - `WebP` hoặc `AVIF`
   - tên file bám slug
   - có alt/caption theo VI/EN
   - có source/license log

---

## 2. Việc Team 1 cần làm ngay

Team 1 giữ quyền review cuối với:

- bộ lọc tinh thần 4 Không / 4 Có
- title, excerpt, hook, reality, system, CTA
- route meaning và pillar meaning
- internal link silo
- thay đổi ảnh có nguy cơ làm lệch kỳ vọng người đọc
- approval cuối trước khi batch content được đưa sang Dev

Team 1 không được để tồn tại hai chuẩn mâu thuẫn nhau giữa SOP, image standard, CMS spec, QA checklist và deploy checklist.

---

## 3. Việc Content / SEO cần làm ngay

Content và SEO chỉ được bàn giao bài khi đủ:

- bản VI hoàn chỉnh
- bản EN chuyển ngữ tự nhiên, không dịch máy
- title/meta riêng cho từng locale
- excerpt 2-3 câu
- body có đủ: vấn đề -> sự thật -> hệ thống
- CTA contextual đúng intent
- internal link tối đa 3-4 link
- ảnh đúng bài, đúng vai trò, đúng chuẩn source/license
- payload JSON theo schema trong SOP

Không nộp bài kiểu cảm hứng, chill, chữa lành, bỏ phố trốn áp lực hoặc review du lịch.

---

## 4. Việc Team 2 cần làm ngay

Team 2 chịu trách nhiệm bề mặt public/article UI.

Team 2 phải bảo đảm:

- article page không trộn VI/EN trong cùng visible page
- layout đọc đúng nhịp, không biến bài thành social post
- CTA và internal link render đúng theo payload đã duyệt
- alt image có fallback theo title đúng locale nếu thiếu alt riêng
- ảnh không bị crop làm sai ngữ cảnh
- mobile/desktop đều không vỡ title, excerpt, CTA, article body

Team 2 không tự sửa wording để đẹp UI. Nếu cần rút chữ, gửi lại Team 1 duyệt.

---

## 5. Việc Team 3 cần làm ngay

Team 3 chịu trách nhiệm contract dữ liệu, CMS, validator và runtime handoff.

Team 3 phải bảo đảm:

- CMS v2 dùng `locales.vi` và `locales.en`
- validator chặn publish nếu thiếu locale metadata, featured image, alt fallback hoặc source/license log
- batch mới chặn ảnh không phải `WebP` hoặc `AVIF`
- batch mới chặn ảnh không bám slug
- route `/vi/*` và `/en/*` query đúng locale
- canonical/hreflang/sitemap chỉ mở cho nội dung publish hợp lệ

Team 3 không tự đổi wording để vừa schema. Payload sai SOP thì trả lại Content/Team 1.

---

## 6. Việc Ap Team cần làm ngay

Ap Team tiếp tục giữ vai trò editorial độc lập.

Ap Team phải biết:

- Content SOP của Om không biến Ap thành join/system site
- Image Reality Standard vẫn áp dụng cho Ap
- ảnh Ap phải kể đời sống thật, con người thật, nơi chốn thật
- không trùng keyword transactional chính với Om
- bridge từ Ap về Om chỉ xuất hiện khi intent đã chín
- mọi ảnh/caption/alt/hreflang/canonical vẫn phải có evidence

Ap không dùng ảnh du lịch hóa để kéo traffic nhanh nếu ảnh làm sai vai trò editorial.

---

## 7. Việc QA / DevOps cần làm ngay

QA / DevOps không cho qua release nếu thiếu:

- Content SOP QA
- Image Reality QA
- metadata VI/EN
- canonical/hreflang đúng
- route `/vi` và `/en` không lỗi
- internal link đúng locale
- source/license log ảnh
- browser evidence desktop/mobile
- rollback note nếu batch content gây lỗi

Không còn pass miệng.

---

## 8. Quy tắc cho Codex / AI contributors

Mọi AI contributor, gồm Codex, phải theo các quy tắc này:

- đọc SOP trước khi sửa content, article seed, image seed, CMS schema hoặc QA gate
- không claim done nếu chưa có evidence phù hợp
- nếu chỉ sửa docs thì báo rõ không chạy runtime build
- nếu sửa runtime/content seed thì chạy validator tương ứng
- không tự đổi brand, route, access, CTA, role semantics
- không tự thay ảnh chỉ vì đẹp hơn
- cập nhật file kế hoạch/team notice khi thay đổi có tác động liên team

---

## 9. Evidence tối thiểu cho batch content mới

Khi batch content chạm runtime, report phải có:

```bash
pnpm validate:content-seed
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
```

Nếu có build/deploy:

```bash
pnpm --filter @omdalat/web build
npm run cf:runtime-map:check
```

Nếu chỉ cập nhật docs/SOP:

- `rg -n "OMDALAT_CONTENT_SYSTEM_SOP" docs ap.omdalat.com/docs`
- danh sách file docs đã chạm
- ghi rõ không deploy, không đổi runtime

Sprint 0 đang là batch runtime/content-seed đầu tiên áp dụng SOP này. File điều phối chính:

- `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`
- `docs/OMDALAT_SPRINT0_LAUNCH_EXECUTION_2026-05-05.md`
- `data/seed/articles.seed.json`
- `data/seed/articles.seed.sprint0-launch.json`
- `data/seed/articles.seed.launch-v2.json`
- `data/seed/article-images.seed.json`

---

## 10. Những file đã được cập nhật trong vòng Codex này

Nhóm SOP / content / image / QA:

- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
- `docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md`
- `docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md`
- `docs/OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md`
- `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`

Nhóm roadmap / plan:

- `docs/OMDALAT_CONTENT_OPERATING_SYSTEM_AND_100_SEO_ROADMAP_2026-05-03.md`
- `docs/OMDALAT_CONTENT_SYSTEM_AND_EDITORIAL_PLAN_2026.md`
- `docs/OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md`
- `docs/OMDALAT_CONTENT_SEO_30_ARTICLES_2026.md`
- `docs/DEV_TEAM_1_PLAN_OMDALAT.md`
- `docs/DEV_TEAM_2_PLAN_OMDALAT.md`
- `docs/DEV_TEAM_3_PLAN_OMDALAT.md`

Nhóm notice / handoff:

- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`

---

## 11. Queue tiếp theo

P0 Sprint 0 đang active:

- Team 2 render và kiểm 6 route `/vi` + `/en` của 3 bài launch trên local/staging.
- QA/SEO chụp evidence canonical, hreflang, metadata, OG/Twitter image và mobile/desktop crop.
- Team 1 duyệt mắt người theo bộ lọc 4 Không / 4 Có trước khi đề xuất production.

P0 đã xử lý cho payload launch:

- chuyển 3 ảnh launch thành asset publish `WebP`
- đổi tên ảnh launch theo slug
- bổ sung validator cho `locales`, metadata, internal links và local `/images/` source
- runtime article adapter đọc `locales`, metadata, internal links và featured image

P1:

- thêm regression chống trộn VI/EN trong visible article page
- mở rộng article SEO snapshot cho title/meta/hreflang
- thêm test internal link theo pillar
- chuẩn hóa report 10 bài/tuần theo SOP
- tạo owned photography brief cho bộ ảnh Đà Lạt thật

---

## 12. Câu chốt cho toàn team

Content không phải phần trang trí cho web.

Content là một phần vận hành của hệ Ôm Đà Lạt: giúp người đọc hiểu đúng rằng ở lại Đà Lạt cần kỹ năng, kỷ luật, công việc thật, cộng đồng đúng nhịp và một hệ thống đủ rõ.
