# OMDALAT QA ACCEPTANCE CHECKLIST 2026

Version: LOCKED  
Status: Acceptance checklist before release

---

## Brand

- không còn nhắc OMDALA
- dùng đúng Om Dalat / Ôm Đà Lạt
- không còn wording cũ

---

## Language

- đúng codex
- không hype
- không bán hàng kiểu startup
- không dùng từ cấm
- không trộn VI/EN trong cùng một visible article page
- pass `HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL` gate

---

## Content SOP

Chuẩn khóa áp dụng: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.

- bài viết pass bộ lọc 4 KHÔNG / 4 CÓ
- cấu trúc bài có vấn đề, sự thật, giải pháp hoặc hệ thống
- không lãng mạn hóa Đà Lạt theo hướng chill, chữa lành, trốn áp lực
- CTA đúng ngữ cảnh bài
- internal link tối đa 3-4 link chính và đúng silo
- batch 10 bài có đủ outline, VI, EN, metadata, visual, QA evidence

---

## SEO

- title/description đúng
- canonical đúng
- hreflang VI/EN
- internal linking đầy đủ
- alt text đầy đủ
- member/app routes noindex đúng
- OG title/description/image đầy đủ

---

## Image Reality

Chuẩn khóa áp dụng: `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`.
Chuẩn SOP áp dụng: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.

- ảnh đúng vai trò trang và đúng ngữ cảnh bài
- không du lịch hóa hoặc nghỉ dưỡng hóa
- có dấu hiệu đời sống hoặc làm việc thật
- có `alt_vi`, `alt_en`
- có `caption_vi`, `caption_en` nếu cần
- có source/license log theo schema image asset chuẩn (`ImageAssets`)
- alt/caption phải đúng vai trò bài, không tái sử dụng sai ngữ cảnh
- nguồn ảnh có license và ghi nhận phê duyệt
- crop desktop pass
- crop mobile pass
- pass `Image Reality` cho 3 bài đầu lane public
- không tái dùng ảnh sai ngữ cảnh
- batch mới dùng `WebP` hoặc `AVIF`
- tên file ảnh batch mới bám slug bài viết

---

## UX

- mobile tốt
- menu rõ
- CTA rõ
- đọc dễ
- tốc độ nhanh

---

## Content

- không placeholder
- không lorem ipsum
- không text rỗng
- không mô tả mơ hồ

---

## Technical

- không còn link ngoài sai hệ
- redirect pass
- `/docs` hoạt động
- `/member` hoạt động
- `/app` hoạt động
- JSON i18n sạch
- không hardcode text linh tinh
- gating theo role hoạt động đúng

---

## Access Control

- public chỉ thấy nội dung public
- member teaser chỉ hiện title và excerpt ngắn
- registered member thấy đúng tài nguyên mức registered
- reviewed member thấy đúng tài nguyên mức reviewed
- internal/admin không rò rỉ nội dung protected ra public sitemap

---

## Final Release Gate

Chỉ pass khi:

- live `/vi` và `/en` phản ánh đúng mô hình mới
- menu đã đổi sang `Life / Work / Learning / Community / Stay / Articles / Join`
- toàn bộ dấu vết hệ cũ đã được dọn khỏi public surface
- homepage public không lộ deck hoặc handbook sâu
- tất cả ảnh trên surface chính pass `Image Reality` gate
- tất cả bài mới pass `Content SOP` gate
- tất cả URL trong inventory pass `character hygiene`, `H standard`, `true state`

---

## Dẫn chiếu bắt buộc

- `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`
- `docs/OMDALAT_HUMAN_TEXT_GATE_URL_INVENTORY_2026-05-05.md`
- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
- `docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md`
- `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`
