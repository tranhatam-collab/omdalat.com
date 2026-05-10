# OMDALAT SEO MASTER PLAN 2026

Version: LOCKED  
Status: SEO source of truth for Om Dalat rebuild

---

## 0. Muc Tieu

Xây authority cho các cụm:

- sống ở Đà Lạt
- làm việc ở Đà Lạt
- ở lại dài hạn tại Đà Lạt
- học từ thực tế tại Đà Lạt
- cộng đồng sống và làm việc tại Đà Lạt

---

## 1. Core Keyword Clusters

### VI

- sống ở Đà Lạt
- sống và làm việc tại Đà Lạt
- ở lại Đà Lạt dài hạn
- công việc ở Đà Lạt
- làm việc từ xa ở Đà Lạt
- cộng đồng sống ở Đà Lạt
- học từ thực tế ở Đà Lạt

### EN

- living in Dalat
- live and work in Dalat
- long-term stay in Dalat
- work in Dalat
- remote work in Dalat
- community living in Dalat
- learning through real life in Dalat

---

## 2. Meta Homepage

### VI

Title: Ôm Đà Lạt | Sống và làm việc tại Đà Lạt  
Description: Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây giá trị dài hạn trong một cộng đồng có kỷ luật.

### EN

Title: Om Dalat | Live and Work in Dalat  
Description: Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build long-term value.

---

## 3. Structured Data

- Organization
- WebSite
- BreadcrumbList
- Article
- FAQPage
- localized structured data theo locale

---

## 4. SEO Rules

- mỗi trang chỉ có 1 H1
- canonical rõ
- VI và EN có hreflang
- ảnh có alt text thật
- slug ngắn, rõ, ổn định
- nội dung không duplicate giữa VI và EN theo kiểu dịch thô
- `/member` và `/app` phải `noindex`
- sitemap phải tách public locale entries với protected routes

---

## 5. Audit Can Sua

Bản live hiện tại đang dùng title và nội dung xoay quanh `OMDALAT`, `creative system`, hoặc wording cũ, đồng thời vẫn để lại liên kết sang docs ngoài.

Điều này không còn phù hợp với định vị mới `Ôm Đà Lạt - hệ sống thực địa`.

---

## 6. Rule Cho Internal Linking

- homepage link xuống 6 trụ cột chính
- mỗi pillar page link sang ít nhất 3 bài viết
- mỗi bài viết link về pillar page tương ứng
- `/join`, `/stay`, `/work`, `/learning`, `/community` phải được link xuyên suốt
- teaser member blocks có thể link sang register/login nhưng không lộ nội dung protected

---

## 7. Rule Cho Media SEO

- alt text phải mô tả đúng ảnh thật ở Đà Lạt
- không dùng alt kiểu nhồi keyword
- tên file ảnh nên ổn định, không generic nếu self-host

---

## 8. International SEO Rule

- `vi` là source locale
- `en` là secondary locale
- `hreflang` phải có `vi-VN`, `en`, `x-default`
- metadata, OG, structured data phải localized
- future locales chỉ mở khi có content thật và QA localization pass
