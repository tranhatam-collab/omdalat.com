# APDALAT_QA_CHECKLIST_2026
## Version: LOCKED
## Status: Production-ready
## Scope: ap.omdalat.com
## Required by: Founder / Dev / Design / Content / SEO / QA / Codex
## Purpose: Provide one release-facing QA checklist for Ap Dalat
## System lock reference: `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
---
## 0. BRAND QA
Check:
1. Có rõ đây không phải site du lịch không
2. Có rõ đây không phải hotel/homestay brand không
3. Có rõ đây khác Om Dalat không
4. Câu chữ có đi theo living language system không

---
## 1. UX / UI QA
Check:
1. Homepage load ổn
2. Header/footer rõ
3. Locale switch đúng
4. Hero copy không bị vỡ nhịp
5. Card grid không gãy trên mobile
6. Hình ảnh không bị crop hỏng

---
## 2. CONTENT QA
Check:
1. Mọi trang có H1 duy nhất
2. Copy không rơi sang brochure tone
3. CTA không bị salesy
4. Related links có nghĩa thật
5. Bridge to Om Dalat chỉ xuất hiện đúng ngữ cảnh
6. Ảnh và text hình ảnh đúng ngữ cảnh bài, không du lịch hóa

---
## 3. SEO QA
Check:
1. Title unique
2. Meta description unique
3. Canonical đúng
4. hreflang đúng nếu có cặp locale
5. OG image có
6. Slug sạch

---
## 4. IMAGE QA
Check:
1. `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` đã được áp dụng
2. Ảnh có source/license log rõ
3. Alt text có đủ (`alt_vi`, `alt_en` nếu có bản song ngữ)
4. Caption có nghĩa nếu cần
5. Không tái dùng ảnh sai ngữ cảnh
6. Không có watermark công khai
7. Crop desktop/mobile pass
8. File tối ưu đủ nhanh

---
## 5. RELEASE QA
Check:
1. Không broken links
2. Không missing assets
3. Không route rơi về sai locale
4. Không có text hardcoded đi lệch registry
5. Live URL trả về đúng content

---
## 6. DEFINITION OF DONE
Release chỉ được xem là pass khi các lỗi ảnh hưởng brand, route, locale, metadata, và image quality đều đã được xử lý.
