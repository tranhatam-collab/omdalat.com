# APDALAT_INFORMATION_ARCHITECTURE_2026
## Version 1.0
## Status: Locked
## Scope: ap.omdalat.com
## Language model: Vietnamese first, English adaptation
## Depends on: APDALAT_POSITIONING_AND_CONTENT_SYSTEM_MASTER_2026, APDALAT_LANGUAGE_CODEX_2026, APDALAT_HOMEPAGE_COPY_MASTER_2026, APDALAT_UX_UI_EDITORIAL_SCREEN_SPEC_2026

---

## 0. IA Lock Statement
Information Architecture của Ấp Đà Lạt phải làm rõ trong 15 giây:
1. Đây là lớp bản sắc và đời sống (identity/editorial layer)
2. Không phải trang du lịch, booking, lưu trú
3. Khác vai trò với omdalat.com (participation/operations layer)

Mọi route, nav, taxonomy, internal link và CTA phải phục vụ nguyên tắc này.

---

## 1. Domain and Locale Structure

### 1.1 Canonical domain
- `https://ap.omdalat.com`

### 1.2 Locale strategy
- Default: Vietnamese
- Secondary: English
- Route policy:
  - `https://ap.omdalat.com/` -> Vietnamese homepage
  - `https://ap.omdalat.com/en` -> English homepage
  - Vietnamese section routes không prefix locale (ngắn, tự nhiên)
  - English routes dùng prefix `/en`

### 1.3 Hreflang
- `vi-VN` (primary)
- `en`
- `x-default` -> Vietnamese homepage

---

## 2. Top-Level Navigation System

### 2.1 Primary nav (VI)
1. Trang chủ (`/`)
2. Cách sống (`/cach-song`)
3. Làm việc (`/lam-viec`)
4. Con người (`/con-nguoi`)
5. Nơi chốn (`/noi-chon`)
6. Sinh kế (`/sinh-ke`)
7. Tương lai (`/tuong-lai`)
8. Nhật ký (`/nhat-ky`)
9. Về Ấp (`/ve-ap-da-lat`)
10. Ở lại cùng Ôm Đà Lạt (`/di-tiep-voi-om-da-lat`)

### 2.2 Primary nav (EN)
1. Home (`/en`)
2. Ways of Living (`/en/ways-of-living`)
3. Work (`/en/work`)
4. People (`/en/people`)
5. Places (`/en/places`)
6. Livelihood (`/en/livelihood`)
7. Future (`/en/future`)
8. Journal (`/en/journal`)
9. About (`/en/about`)
10. Continue with Om Dalat (`/en/continue-with-om-dalat`)

---

## 3. Route Map (Phase 1)

### 3.1 Core pages
- `/`
- `/ve-ap-da-lat`
- `/cach-song`
- `/lam-viec`
- `/con-nguoi`
- `/noi-chon`
- `/sinh-ke`
- `/tuong-lai`
- `/nhat-ky`
- `/di-tiep-voi-om-da-lat`

### 3.2 Core page EN equivalents
- `/en`
- `/en/about`
- `/en/ways-of-living`
- `/en/work`
- `/en/people`
- `/en/places`
- `/en/livelihood`
- `/en/future`
- `/en/journal`
- `/en/continue-with-om-dalat`

### 3.3 Editorial standards page
- `/tieu-chuan-bien-tap`
- `/en/editorial-standards`

---

## 4. Route Map (Phase 2)

### 4.1 Content detail templates
- Bài viết chuẩn: `/bai-viet/{slug}`
- Chân dung người: `/con-nguoi/{slug}`
- Nơi chốn chi tiết: `/noi-chon/{slug}`
- Bộ ảnh: `/hinh-anh/{slug}`

### 4.2 Category archives
- `/chu-de/{topic-slug}`
- `/tu-khoa/{tag-slug}`

### 4.3 Place collections
- `/ban-do-song`
- `/ban-do-song/{area-slug}`

---

## 5. Route Map (Phase 3)

### 5.1 Thematic series
- `/chuyen-de/{series-slug}`

### 5.2 Seasonal reports
- `/bao-cao/{year}/{season-slug}`

### 5.3 Future village reports
- `/tuong-lai/bao-cao-mo-hinh/{slug}`

---

## 6. Content Types (CMS Source of Truth)

### 6.1 `page`
Dùng cho: homepage, about, transition page, editorial standards.

### 6.2 `article`
Bài viết dài theo 8 pillar.

### 6.3 `profile`
Chân dung con người.

### 6.4 `place`
Nơi chốn/không gian sống-làm việc.

### 6.5 `photo_essay`
Bộ ảnh có nhịp kể chuyện.

### 6.6 `series`
Chuỗi bài theo luận đề.

### 6.7 `report`
Báo cáo theo mùa/chủ đề tương lai.

---

## 7. Taxonomy System

### 7.1 Primary pillars (required)
1. Cách sống
2. Làm việc
3. Con người
4. Nơi chốn
5. Sinh kế
6. Văn hóa đời thường
7. Tương lai vùng nhỏ
8. Đà Lạt và thế giới

### 7.2 Secondary tags (controlled vocabulary)
- khí hậu
- nhịp sáng
- nhịp tối
- gia đình trẻ
- freelancer
- giáo dục
- nông nghiệp
- thủ công
- quán nhỏ
- khu dốc
- vùng ven
- làm việc online
- xưởng nhỏ
- cộng đồng
- thuộc về

Tag mới phải qua editorial review, tránh phình taxonomy.

---

## 8. Page Blueprint Requirements

### 8.1 Homepage
Required blocks:
1. Hero
2. Brand clarification block (không phải du lịch/lưu trú)
3. Three-lens block
4. Featured essays
5. Featured people & livelihood
6. Living map selections
7. Future thesis block
8. Soft Om Dalat bridge

### 8.2 Hub pages
Required blocks:
1. Section thesis (80-120 chữ)
2. Featured piece
3. 6-12 archive cards
4. Related route links
5. Optional soft bridge

### 8.3 Article page
Required blocks:
1. Eyebrow
2. H1
3. Standfirst
4. Hero image
5. Body
6. Related reads
7. Optional bridge
8. Metadata + author note

---

## 9. Internal Linking Model

### 9.1 Minimum linking rules per new article
- 2 links tới bài cùng pillar
- 1 link tới pillar lân cận
- 1 link tới page nền tảng (`/ve-ap-da-lat` hoặc `/di-tiep-voi-om-da-lat` nếu đúng intent)

### 9.2 Bridge intent rules
Chỉ đặt module chuyển sang omdalat.com khi intent là:
- ở lại lâu hơn
- tham gia cộng đồng
- host/contribute
- cần bước thực hành tiếp theo

Không đặt bridge cứng ở mọi bài.

---

## 10. URL and Slug Standards

### 10.1 Vietnamese slugs
- không dấu
- lowercase
- gạch nối
- 4-10 từ
- phản ánh đúng search intent

### 10.2 English slugs
- natural phrase, không literal machine translation

### 10.3 Anti-patterns
- `/post-1`
- `/new-article-final`
- slug clickbait

---

## 11. Search and Discovery Architecture

### 11.1 On-site search (Phase 2)
Search theo:
- tiêu đề
- standfirst
- tag
- địa danh
- loại nội dung

### 11.2 Discovery routes
- Theo pillar
- Theo chủ đề dài hạn
- Theo nơi chốn
- Theo con người
- Theo ảnh

Không triển khai ranking kiểu travel list.

---

## 12. Navigation Behavior Rules

### 12.1 Header
- gọn, không nhồi menu
- language switch rõ
- link Om Dalat luôn có nhưng không áp đảo

### 12.2 Footer
- nhắc lại role split giữa Ap Dalat và Om Dalat
- ưu tiên đường dẫn đọc tiếp, không conversion-heavy

---

## 13. Structured Data Mapping

### 13.1 Sitewide
- Organization
- WebSite
- BreadcrumbList (khi có)

### 13.2 Content-level
- Article (article/profile)
- ImageObject (photo_essay)
- CollectionPage (hub pages)

### 13.3 Required fields
- headline
- description
- datePublished
- dateModified
- author
- image
- inLanguage

---

## 14. Governance and Ownership

### 14.1 Brand owner
- khóa ngôn ngữ
- kiểm soát phân biệt với omdalat.com

### 14.2 Editorial owner
- pillar balance
- quality gate trước publish

### 14.3 SEO owner
- keyword intent guardrail
- chống trôi sang hotel/travel intent

### 14.4 Frontend owner
- semantic structure
- internal linking widgets
- locale routing + hreflang

---

## 15. QA Gate Before Publish
1. Trang có thể hiện rõ là editorial/living layer không?
2. Có dấu hiệu travel/hotel copy không?
3. H1/meta/slug có đúng intent sống-làm việc-thuộc về không?
4. Có internal links tối thiểu theo chuẩn?
5. Có bridge đúng ngữ cảnh chưa?
6. Có EN adaptation nếu trang public EN không?

Nếu fail >=2 mục: không publish.

---

## 16. Definition of Done
IA được xem là hoàn thành khi:
1. Team dev dựng được toàn bộ route core mà không đoán thêm
2. Team content có taxonomy ổn định để xuất bản 100 bài đầu
3. Mỗi template thể hiện đúng vai trò Ấp Đà Lạt
4. Liên kết sang omdalat.com diễn ra đúng intent, không ép chuyển đổi
5. Hệ thống sẵn sàng mở rộng Phase 2 và Phase 3 mà không đổi trục
