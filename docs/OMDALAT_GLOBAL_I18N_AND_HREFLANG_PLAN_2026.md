# OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026

## Om Dalat / Ôm Đà Lạt

Global i18n and hreflang Plan

Version: LOCKED  
Status: Production-ready  
Scope: internationalization architecture, SEO localization, language governance

---

## 0. Mục tiêu

Ôm Đà Lạt phải ưu tiên:

1. tiếng Việt chuẩn
2. tiếng Anh chuẩn

Đồng thời, ngay từ đầu phải có kiến trúc đủ sạch để mở rộng sang các ngôn ngữ phổ biến khác mà không phải đập lại hệ.

Đây là kế hoạch cho:

- ngôn ngữ
- routing
- metadata
- hreflang
- content keys
- SEO đa ngôn ngữ

---

## 1. Nguyên tắc ngôn ngữ

### Vietnamese

Là ngôn ngữ gốc của hệ.

Yêu cầu:

- có dấu đầy đủ
- rõ
- thực
- không màu mè
- không bán hàng
- không sáo rỗng
- không dùng từ cấm trong codex

### English

Là ngôn ngữ quốc tế hóa đầu tiên.

Yêu cầu:

- clear
- grounded
- simple
- not marketing
- not startup hype
- not literal translation when awkward

### Other languages later

Chỉ mở khi có:

- nhu cầu thực
- biên tập viên phù hợp
- kiểm soát chất lượng ngôn ngữ

---

## 2. Locale strategy

### Phase 1

- vi
- en

### Phase 2 ready, not public yet

- fr
- de
- ja
- ko
- zh-cn
- zh-tw
- es
- ru

### Rule

Không public các locale mới chỉ vì muốn `quốc tế`.  
Chỉ mở khi có nội dung được biên tập đúng.

---

## 3. Routing model

### Recommended

- `https://omdalat.com/vi/...`
- `https://omdalat.com/en/...`

### Future-ready

- `https://omdalat.com/fr/...`
- `https://omdalat.com/de/...`

### Default

Người dùng mới vào root `/` được điều hướng theo:

1. nếu có lựa chọn cũ trong cookie -> theo lựa chọn đó
2. nếu không có -> ưu tiên `vi`
3. có thể gợi ý chuyển sang `en` nếu browser language phù hợp

### Rule

Không auto-redirect quá mạnh gây khó crawl.  
Root nên rõ ràng và có logic ổn định.

---

## 4. File structure for content

### Required

- `/content/vi.json`
- `/content/en.json`

### Optional future

- `/content/fr.json`
- `/content/de.json`
- `/content/ja.json`

### Content key rules

- key theo meaning, không theo wording tạm thời
- ổn định lâu dài
- không dùng key quá chung chung như `title1`, `button2`

### Example

```json
{
  "nav.home": "Trang chủ",
  "nav.life": "Sống",
  "hero.title": "Ôm Đà Lạt",
  "hero.subtitle": "Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật.",
  "cta.start": "Bắt đầu từ đây"
}
```

English:

```json
{
  "nav.home": "Home",
  "nav.life": "Life",
  "hero.title": "Om Dalat",
  "hero.subtitle": "A place to live, work, learn, and build a real life in Dalat.",
  "cta.start": "Start here"
}
```

---

## 5. Translation governance

### Rule 1

Tiếng Việt là nguồn gốc.

### Rule 2

Tiếng Anh là bản thích ứng rõ nghĩa, không phải bản dịch từng chữ.

### Rule 3

Không dùng công cụ auto-translate làm bản public cuối cùng nếu chưa qua biên tập.

### Rule 4

Không dịch y nguyên các cụm mang tính văn hóa nếu làm mất nghĩa.  
Ưu tiên giữ đúng tinh thần của hệ.

---

## 6. hreflang implementation

### Homepage

Trang tiếng Việt:

- hreflang `vi-VN`
- alternate `en`

Trang tiếng Anh:

- hreflang `en`
- alternate `vi-VN`

### Example

```html
<link rel="alternate" hreflang="vi-VN" href="https://omdalat.com/vi" />
<link rel="alternate" hreflang="en" href="https://omdalat.com/en" />
<link rel="alternate" hreflang="x-default" href="https://omdalat.com/vi" />
```

### Article pages

Mỗi bài phải có bản locale tương ứng nếu tồn tại.  
Nếu chưa có bản EN, không tạo hreflang giả.

---

## 7. Canonical rules

- mỗi locale có canonical riêng
- không canonical mọi locale về một bản duy nhất
- bài VI canonical về URL VI
- bài EN canonical về URL EN

Ví dụ:

- `/vi/song-o-da-lat-la-gi` canonical chính nó
- `/en/living-in-dalat-what-it-means` canonical chính nó

---

## 8. Metadata localization

Mỗi locale phải có:

- title
- meta description
- `og:title`
- `og:description`
- `og:locale`
- `twitter:title`
- `twitter:description`
- structured data localized khi phù hợp

### Homepage sample VI

Title: Ôm Đà Lạt | Sống và làm việc tại Đà Lạt  
Description: Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây giá trị dài hạn.

### Homepage sample EN

Title: Om Dalat | Live and Work in Dalat  
Description: Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build long-term value.

---

## 9. Slug strategy

### Vietnamese

Cho phép dùng slug không dấu, gạch nối.  
Ví dụ:

- `/vi/song-o-da-lat-la-gi`
- `/vi/chi-phi-song-da-lat-2026`

### English

Slug riêng theo nghĩa tiếng Anh, không bắt buộc mirror từng chữ.  
Ví dụ:

- `/en/living-in-dalat-what-it-means`
- `/en/cost-of-living-in-dalat-2026`

### Rule

Không ép slug EN giống slug VI.

---

## 10. Structured data localization

### Required types

- Organization
- WebSite
- Article
- FAQPage
- BreadcrumbList

### Localization rule

- tên tổ chức có thể giữ Om Dalat
- description theo locale
- article headlines theo locale
- FAQ theo locale

---

## 11. Sitemap strategy

### Required now

- `/sitemap.xml`
- include VI và EN URLs

### Future-ready

- sitemap index nếu số lượng tăng
- tách:
  - `sitemap-pages.xml`
  - `sitemap-articles.xml`
  - `sitemap-en.xml`
  - `sitemap-vi.xml`

### Rule

Chỉ đưa vào sitemap các trang public indexable.  
Không đưa member routes vào sitemap.

---

## 12. CMS localization model

### Articles

```json
{
  "title_vi": "",
  "title_en": "",
  "slug_vi": "",
  "slug_en": "",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft|published"
}
```

### Spaces

```json
{
  "name": "",
  "slug": "",
  "description_vi": "",
  "description_en": "",
  "status": "draft|published"
}
```

### Member resources

Có thể chỉ có VI trước.  
Nếu chưa có EN, UI phải nói rõ là `currently available in Vietnamese`.

---

## 13. Language switcher UX

### Required

- hiển thị rõ `VI / EN`
- luôn dễ thấy ở header
- giữ người dùng ở page tương đương nếu bản locale đó tồn tại
- nếu không có page tương đương, đưa về parent page locale đó

### Examples

- đang ở bài VI, bấm EN -> sang bài EN tương ứng nếu có
- nếu chưa có EN -> sang `/en/articles` hoặc hiện thông báo nhẹ

### Không làm

- dropdown quá nặng
- dùng cờ quốc gia làm yếu tố chính
- tự redirect khó đoán

---

## 14. Future multilingual readiness

Ngay từ đầu Team DEV phải chuẩn bị:

- locale-aware routes
- locale-aware metadata
- locale-aware sitemap generation
- locale-aware CMS fields
- language switcher logic
- hreflang generation utility

Không cần public tất cả ngôn ngữ ngay.  
Nhưng phải build nền đúng từ đầu.

---

## 15. SEO quality control for multilingual pages

### Must pass

- không dịch máy thô
- không duplicate giữa locale
- title/description riêng
- canonical riêng
- hreflang đúng
- content body đủ chất lượng
- internal links theo locale

### Must avoid

- EN page mỏng hơn nhiều so với VI page trong thời gian dài
- locale pages chưa hoàn chỉnh nhưng vẫn index
- title giống hệt nhau giữa nhiều locale

---

## 16. DEV implementation requirements

### Utilities cần có

- locale resolver
- hreflang generator
- locale metadata builder
- alternate page resolver
- fallback logic
- sitemap locale builder

### Middleware cần có

- detect locale
- set locale cookie
- safe fallback to default
- preserve current path when switching locale if possible

---

## 17. Definition of done

Kế hoạch i18n và hreflang được xem là hoàn thành khi:

- VI và EN tách rõ
- text đi từ locale files
- metadata riêng theo locale
- canonical đúng
- hreflang đúng
- sitemap đúng
- language switcher hoạt động
- kiến trúc sẵn sàng cho thêm locale sau này

---

## 18. Câu chốt

Quốc tế hóa không bắt đầu bằng việc dịch thật nhiều.  
Quốc tế hóa bắt đầu bằng một hệ ngôn ngữ đủ sạch để mở rộng đúng lúc.
