# OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04

Om Dalat / Ôm Đà Lạt

Status: ACTIVE EXECUTION  
Owner: Codex / Team 1 coordination  
Scope: Sprint 0 launch for the first 3 foundation articles  
Start: 2026-05-05  
Release target: staging first, production only after QA signoff

---

## 0. Kết luận

SOP đã ban hành. Từ Sprint 0, toàn team chuyển sang thực thi.

Sprint này không mở thêm chủ đề mới, không brainstorm thêm roadmap, không sửa lan man ngoài phạm vi.

Sprint 0 chỉ tập trung đưa 3 bài mở nền lên local/staging, nghiệm thu bằng mắt người và bằng tool, sau đó mới đề xuất production.

---

## 1. Phạm vi duy nhất của Sprint 0

Ba bài launch:

1. `song-o-da-lat-la-gi`
   - VI: `Sống ở Đà Lạt là gì?`
   - EN: `What living in Dalat means beyond changing your address`
2. `lam-viec-o-da-lat-co-thuc-te-khong`
   - VI: `Làm việc ở Đà Lạt có thực tế không?`
   - EN: `Is working in Dalat realistic?`
3. `tu-mot-ky-nang-den-thu-nhap-o-da-lat`
   - VI: `Từ một kỹ năng nhỏ đến thu nhập.`
   - EN: `From one small skill to income in Dalat`

Không đưa thêm bài thứ 4 vào Sprint 0.

---

## 2. File đã chuẩn bị

Runtime seed hiện tại:

- `data/seed/articles.seed.json`
- `data/seed/article-images.seed.json`

Runtime launch-only snapshot để Team 2 test nhanh 3 bài:

- `data/seed/articles.seed.sprint0-launch.json`

Payload V2 bàn giao cho CMS/Dev:

- `data/seed/articles.seed.launch-v2.json`

Ảnh WebP đã tạo cho Sprint 0:

- `apps/web/public/images/articles/song-o-da-lat-la-gi-01.webp`
- `apps/web/public/images/articles/lam-viec-o-da-lat-co-thuc-te-khong-01.webp`
- `apps/web/public/images/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat-01.webp`

Runtime adapter đã đọc được:

- `locales.vi`
- `locales.en`
- `meta_title`
- `meta_description`
- `internal_links`
- `article-images.seed.json` trỏ local `/images/articles/*.webp`

---

## 3. Team Content — deadline 2 ngày

Team Content chỉ làm 3 việc:

1. Đọc lại 3 bài trong:
   - `data/seed/articles.seed.sprint0-launch.json`
   - `data/seed/articles.seed.launch-v2.json`
   - `data/seed/articles.seed.json`
2. Đối chiếu từng bài với:
   - `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
   - bộ lọc 4 Không / 4 Có
3. Nếu sửa wording, sửa cả:
   - root adapter trong `articles.seed.json`
   - `locales.vi` / `locales.en`
   - launch-only snapshot trong `data/seed/articles.seed.sprint0-launch.json`
   - payload V2 trong `data/seed/articles.seed.launch-v2.json`

Không được:

- mở thêm bài mới
- đổi slug
- đổi tinh thần bài sang chill, chữa lành, nghỉ dưỡng, bỏ phố trốn áp lực
- sửa tiếng Anh bằng dịch máy

Output Content phải nộp:

- xác nhận 3 bài pass SOP
- danh sách câu đã sửa nếu có
- xác nhận meta title dưới 60 ký tự
- xác nhận meta description dưới 155 ký tự

---

## 4. Team 2 — deadline 2 đến 3 ngày

Team 2 chịu trách nhiệm local/staging UI.

Team 2 phải test:

- `/vi/articles/song-o-da-lat-la-gi`
- `/en/articles/song-o-da-lat-la-gi`
- `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
- `/en/articles/lam-viec-o-da-lat-co-thuc-te-khong`
- `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`
- `/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Checklist bắt buộc:

- article body max-width 720px
- paragraph đọc thoáng, không social-style
- không trộn VI/EN trong cùng visible page
- ảnh hero không vỡ tỷ lệ
- ảnh dùng WebP local từ `/images/articles/`
- internal links hiển thị đúng payload
- CTA cuối bài trỏ đúng `/vi/join` hoặc `/en/join`
- mobile không vỡ chữ, không chồng nội dung

Team 2 không tự sửa wording. Nếu UI cần rút chữ, gửi lại Team 1.

---

## 5. Team 3 — deadline 2 đến 3 ngày

Team 3 chịu trách nhiệm data contract và validator.

Team 3 phải kiểm:

- `articles.seed.json` vẫn đủ 30 record cho runtime hiện tại
- 3 bài launch có `locales.vi` / `locales.en`
- 3 bài launch có `meta_title` / `meta_description`
- 3 bài launch có `internal_links`
- 3 ảnh launch có source/license log
- 3 ảnh launch trỏ file WebP local có thật

Team 3 phải giữ rõ:

- `articles.seed.json` = runtime adapter hiện tại
- `articles.seed.sprint0-launch.json` = runtime snapshot chỉ có 3 bài để Team 2 test nhanh
- `articles.seed.launch-v2.json` = payload V2 bàn giao CMS

Không chuyển toàn bộ 30 bài sang V2 trong Sprint 0.

---

## 6. QA / SEO — deadline 1 ngày

QA / SEO chạy nghiệm thu sau khi Team 2 đưa lên local/staging.

Commands bắt buộc:

```bash
pnpm validate:content-seed
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
```

Nếu có build:

```bash
pnpm --filter @omdalat/web build
```

SEO kiểm:

- title đúng locale
- meta description đúng locale
- canonical đúng `/vi` và `/en`
- hreflang VI/EN trỏ đúng nhau
- OG/Twitter image không thiếu
- alt không trống

Nghiệm thu bằng mắt người:

1. Đọc xong có thấy muốn đi chill, mơ mộng, nghỉ dưỡng không?
   - Nếu có: fail.
2. Đọc xong có thấy Đà Lạt là nơi cần kỹ năng, kỷ luật, công việc thật và hệ thống không?
   - Nếu có: pass.
3. Chuyển VI/EN có lỗi 404 hoặc vỡ layout không?
   - Nếu có: fail.

---

## 7. Definition of Done

Sprint 0 chỉ được gọi là done khi:

- 3 bài launch render đúng local/staging
- 6 route VI/EN đều mở được
- 3 ảnh WebP local render đúng
- metadata VI/EN đúng
- internal link và CTA đúng
- `pnpm validate:content-seed` pass
- `validate:web-locales` pass
- `validate:i18n-data` pass
- QA bằng mắt người pass
- report của Team 2, Team 3, QA đều có dòng `Content SOP impact`

---

## 8. Evidence hiện tại từ Codex

Run date: 2026-05-04

Đã pass:

- `pnpm validate:content-seed`
- `pnpm --filter @omdalat/web validate:web-locales`
- `pnpm --filter @omdalat/web validate:i18n-data`
- `pnpm --filter @omdalat/web exec tsc --noEmit`
- `npm run cf:runtime-map:check`

Local dev route smoke:

- `/vi/articles/song-o-da-lat-la-gi` -> `200`, H1: `Sống ở Đà Lạt là gì?`
- `/en/articles/song-o-da-lat-la-gi` -> `200`, H1: `What living in Dalat means beyond changing your address`
- `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong` -> `200`, H1: `Làm việc ở Đà Lạt có thực tế không?`
- `/en/articles/lam-viec-o-da-lat-co-thuc-te-khong` -> `200`, H1: `Is working in Dalat realistic?`
- `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` -> `200`, H1: `Từ một kỹ năng nhỏ đến thu nhập tại Đà Lạt`
- `/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` -> `200`, H1: `From one small skill to income in Dalat`

Build note:

- `pnpm --filter @omdalat/web build` đã qua validate, compile, type/lint và static page generation.
- Local build bị dừng chủ động ở bước `Collecting build traces` sau khi treo lâu; chưa được dùng làm production release evidence.

Chưa được tính là done:

- chưa có browser screenshot desktop/mobile
- chưa có visual crop evidence cho 3 ảnh hero
- chưa có staging canonical/hreflang snapshot cuối
- chưa deploy production

---

## 9. Điều cấm trong Sprint 0

- Không mở thêm bài thứ 4.
- Không đổi slug đã publish.
- Không đổi toàn bộ CMS schema trong một nhịp.
- Không thay ảnh vì đẹp hơn.
- Không dùng ảnh du lịch hóa.
- Không deploy production khi mới chỉ pass local.
- Không claim done nếu thiếu evidence.

---

## 10. Câu chốt

Sprint 0 không nhằm chứng minh ta có nhiều nội dung.

Sprint 0 chỉ nhằm chứng minh hệ đã có thể đưa một bài đúng chuẩn từ SOP -> payload -> ảnh -> UI -> SEO -> QA -> staging mà không lệch tinh thần.
