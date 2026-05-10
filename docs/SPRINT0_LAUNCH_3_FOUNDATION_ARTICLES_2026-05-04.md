# SPRINT 0 LAUNCH — 3 FOUNDATION ARTICLES (2026-05-04)

Status: EXECUTION ACTIVE  
Owner: Team 1 + Team 3  
Lane: Om public content launch + Team 2 render + QA/SEO acceptance

---

## 1) Scope khóa cho Sprint 0

Chỉ chạy 3 bài mở nền:

* `song-o-da-lat-la-gi`
* `lam-viec-o-da-lat-co-thuc-te-khong`
* `tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Seed runtime đã sẵn trong:

* `data/seed/articles.seed.json`
* `data/seed/article-images.seed.json`

---

## 2) Team Content (D+2)

* Chốt final copy VI/EN đúng SOP.
* Chốt meta title/description VI/EN.
* Chốt CTA contextual theo intent bài.
* Chốt hero ảnh đúng chuẩn Image Reality.

Acceptance:

* payload giữ tương thích runtime hiện tại và có lớp schema V2 (`locales`, `featured_image`)
* không có copy draft/placeholder

---

## 3) Team 2 Frontend (D+3)

* Render article template cho 3 bài launch.
* Bảo đảm max reading width 720px.
* Bảo đảm locale split `/vi` và `/en` không lẫn ngôn ngữ.
* Bảo đảm CTA cuối bài trỏ đúng intent (`/stay`, `/work`, `/join`).
* Test responsive mobile/desktop.

Acceptance:

* 3 route VI + 3 route EN render đúng
* hero image hiển thị đúng tỷ lệ

---

## 4) QA + SEO (D+1 sau Team 2)

* Chạy `npm run validate:content-seed`
* Verify canonical + hreflang cho 3 bài VI/EN.
* Đọc mắt người theo SOP: không mơ mộng hóa/chill hóa.

Acceptance:

* validator pass
* hreflang/canonical đúng cặp bài
* no-go nếu lệch tinh thần SOP

---

## 5) Team 3 execution note

Team 3 đã hoàn tất payload execution lane cho Sprint 0:

* 3 bài launch có metadata + internal links + CTA + schema V2 locales trong `articles.seed.json`
* 3 hero records dùng naming slug + `webp` trong `article-images.seed.json`
* validator pass với payload hiện tại

Proof command:

* `npm run validate:content-seed`

---

## 6) Handoff

* Team 2 nhận dữ liệu trực tiếp từ `data/seed/*` (không chờ thêm file tạm).
* Team QA/SEO dùng cùng payload để nghiệm thu staging.
* Team 1 giữ quyền review cuối cho copy semantics và image reality.
