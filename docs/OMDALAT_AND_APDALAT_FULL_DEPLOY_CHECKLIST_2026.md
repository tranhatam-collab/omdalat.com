# OMDALAT AND APDALAT FULL DEPLOY CHECKLIST 2026

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Full Deploy Checklist

Version: LOCKED  
Status: Production-ready  
Scope: code, content, SEO, tracking, QA, launch, post-launch

Locked content SOP: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
Locked text protocol gate: `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`

## 0. Tuyên bố khóa

Đây là checklist deploy cho một hệ có 2 lớp khác nhau:

- `omdalat.com` = lớp tham gia hệ
- `ap.omdalat.com` = lớp editorial

Checklist này chỉ được xem là pass khi:

- 2 site rõ vai trò
- không còn dấu vết hệ cũ
- không trùng nội dung chính
- cross-link đúng ngữ cảnh
- launch không làm loãng brand

## 1. Mục tiêu deploy

Deploy phải đạt 5 mục tiêu cùng lúc:

1. `omdalat.com` giữ đúng vai trò hệ sống
2. `ap.omdalat.com` mở đúng vai trò editorial
3. 2 site hỗ trợ nhau bằng linking và SEO đúng chỗ
4. không còn tàn dư `OMDALA`
5. sau launch có thể đo được hiệu quả thật

## 2. Điều kiện tiên quyết

Chưa được deploy nếu một trong các điều kiện sau chưa pass:

- chưa dọn sạch `docs.omdala.com`
- chưa dọn sạch `app.omdala.com`
- homepage `omdalat.com` còn CTA `OMDALA`
- role của `om` và `ap` chưa được khóa bằng file spec
- bridge block chưa được chốt copy
- tracking chưa có plan tối thiểu
- batch bài viết mới chưa pass SOP nội dung
- URL inventory chưa pass text protocol gate (`character hygiene`, `H standard`, `true state`)

## 3. Phân vai trước deploy

### Team 1

Owner:

- brand logic
- language codex
- SEO boundary
- linking rules
- release gate
- QA logic cuối

### Team 2

Owner:

- homepage block
- footer link
- article CTA contextual
- UI polish
- responsive QA

### Team 3

Owner:

- config domain
- environment
- analytics / tracking event
- build / deploy / rollback
- sitemap / robots / canonical / noindex runtime

## 4. Giai đoạn P0: dọn sạch hệ cũ

Đây là gate bắt buộc trước mọi deploy liên quan `ap.omdalat.com`.

### 4.1 Cleanup trên `omdalat.com`

Phải gỡ:

- `docs.omdala.com`
- `app.omdala.com`
- mọi wording `OMDALA`
- block `Docs / Help`
- CTA kiểu `Đọc docs OMDALA`
- CTA kiểu `Mở app OMDALA`

### 4.2 Cleanup trong codebase

Phải rà:

- components
- locale files
- metadata
- redirects
- docs static cũ
- footer
- article CTA

### 4.3 Gate pass

Pass khi:

- không còn link ngoài hệ cũ trên active surface
- không còn brand cũ trên active surface
- không còn CTA cũ trên homepage hiện tại

## 5. Giai đoạn P1: nối Ap Dalat vào Om Dalat

### 5.1 Homepage bridge block

Bắt buộc thêm:

- H2: `Ấp Đà Lạt`
- Text: `Những con người, nơi chốn và nhịp sống làm nên Đà Lạt hôm nay.`
- CTA: `Mở Ấp Đà Lạt`

Vị trí:

- sau section định nghĩa hệ
- hoặc gần section bài viết

Không được:

- thay CTA chính `Tham gia`
- đưa `ap` thành hero action

### 5.2 Footer link

Bắt buộc thêm:

- `Ấp Đà Lạt / Ap Dalat`

Rule:

- cùng tab
- không dùng wording kỹ thuật
- không làm đậm hơn link hệ chính

### 5.3 Utility navigation

Nếu menu chính còn dài:

- chưa đưa `ap` vào menu chính
- chỉ dùng utility nav hoặc footer

## 6. Giai đoạn P2: contextual linking

Chỉ thêm CTA sang `ap` ở các page phù hợp:

- nhịp sống
- câu chuyện
- nơi chốn
- hình ảnh
- cảm nhận về Đà Lạt

Không thêm bừa ở:

- trang tham gia chính
- form
- dashboard
- flow member

### 6.1 CTA mẫu tiếng Việt

- `Đọc thêm về những câu chuyện Đà Lạt tại Ấp Đà Lạt`
- `Khám phá con người và nơi chốn tại Ấp Đà Lạt`
- `Xem những góc làm việc và nhịp sống tại Đà Lạt`

### 6.2 CTA mẫu tiếng Anh

- `Read more stories at Ap Dalat`
- `Explore people and places on Ap Dalat`
- `See work corners and daily rhythms in Dalat`

## 7. Giai đoạn P3: feed editorial

Chỉ mở khi `ap.omdalat.com` đã có đủ nội dung thật.

### 7.1 Điều kiện

- có ít nhất 9 đến 12 bài nền
- có 3 bài mới nhất đủ chất lượng
- metadata và canonical sạch
- không trùng keyword chính với `om`

### 7.2 Triển khai

Homepage `omdalat.com` có thể thêm:

- H2: `Bài viết từ Ấp Đà Lạt`
- feed 3 bài mới nhất

Không được:

- biến homepage `om` thành magazine wall
- để feed editorial lấn át flow tham gia

## 8. SEO checklist

### 8.1 Boundary keyword

Pass khi:

- `omdalat.com` giữ keyword transactional / decision
- `ap.omdalat.com` giữ keyword editorial / discovery

### 8.2 Canonical

- mỗi site canonical về chính mình
- không canonical chéo

### 8.3 Sitemap

- `om` sitemap riêng
- `ap` sitemap riêng
- không đưa route protected vào sitemap

### 8.4 Robots

- `ap` editorial pages = index
- `om` public pages = index
- `om` member / internal / app protected pages = noindex

### 8.5 Hreflang

Nếu `ap` có `vi` và `en`:

- hreflang đúng theo từng locale
- không tạo hreflang giả cho page chưa có bản dịch

## 9. Content checklist

Chuẩn kiểm duyệt nội dung bắt buộc: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.
Chuẩn text/SEO/report gate bắt buộc: `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`.

Mọi bài public mới phải pass:

- bộ lọc tinh thần 4 Không / 4 Có
- cấu trúc Title / Excerpt / Hook / Reality / System / Contextual CTA
- tách nội dung VI và EN sạch, không trộn hai ngôn ngữ trong cùng visible page
- metadata VI/EN riêng
- internal link tối đa 3-4 link đúng silo
- ảnh WebP hoặc AVIF, tên file theo slug, source/license log đầy đủ

### 9.1 `omdalat.com`

Phải có:

- hệ sống là gì
- sống / làm / học / cộng đồng
- ở lại
- tham gia
- hình ảnh đúng vai trò trang và đúng intent từng bài theo chuẩn khóa

Không được trượt sang:

- kể chuyện dài kiểu tạp chí
- gallery ảnh chính
- narrative không dẫn hành động

### 9.2 `ap.omdalat.com`

Phải có:

- con người
- nơi chốn
- nhịp sống
- hình ảnh
- câu chuyện
- hình ảnh bám đời sống địa phương, không du lịch hóa

Không được trượt sang:

- form tham gia chính
- package pages
- logic member
- selling copy của hệ sống

## 10. UX checklist

Pass khi:

- user đang muốn tham gia không bị kéo đi đọc story vô lý
- user đang đọc story không bị ép tham gia quá sớm
- link sang `ap` nhìn tự nhiên
- link từ `ap` về `om` chỉ xuất hiện khi intent đã chín hơn

## 11. Tracking checklist

Track tối thiểu:

- click `om -> ap`
- click `ap -> om`
- click bridge block homepage
- click footer link
- click CTA contextual
- session continuation

Metrics cần đọc sau launch:

- CTR bridge block
- CTR footer
- page depth trên `ap`
- số session từ `ap` quay lại `om`
- số session từ `ap` đi tới `join`

## 12. Technical checklist

### 12.1 Config

Phải có hằng số rõ ràng:

```ts
const AP_DALAT_URL = "https://ap.omdalat.com";
const OM_DALAT_URL = "https://omdalat.com";
```

### 12.2 Link rendering

- dùng link helper dùng chung
- không hardcode lung tung
- có thể gắn tracking dễ dàng

### 12.3 Build

Pass khi:

- build `om` pass
- build `ap` pass
- không có route conflict
- không có redirect loop

### 12.4 Headers

Kiểm:

- canonical
- robots
- sitemap
- cache policy nếu có

## 13. Pre-live QA checklist

### 13.1 Manual QA

- homepage `om` có block `Ấp Đà Lạt`
- footer có link `Ấp Đà Lạt`
- CTA contextual đúng page
- không còn `docs.omdala.com`
- không còn `app.omdala.com`
- không còn `OMDALA` trên active surface

### 13.2 Content SOP QA

Chuẩn kiểm duyệt: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.

- không có copy lãng mạn hóa, chill hóa, chữa lành hóa, bỏ phố trốn áp lực
- bài có logic vấn đề -> sự thật -> hệ thống
- CTA đi đúng intent: work, stay, life hoặc join
- VI/EN tách sạch theo route hoặc locale đang hiển thị
- internal link không vượt 3-4 link chính
- payload nội dung mới theo schema bàn giao đã khóa

### 13.3 SEO QA

- title đúng
- meta description đúng
- canonical đúng
- không trùng keyword chính
- feed editorial không làm loãng homepage

### 13.4 Image Reality QA

Chuẩn kiểm duyệt: `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` và `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.

- ảnh đúng vai trò trang và đúng ngữ cảnh bài
- không dùng ảnh du lịch hóa hoặc nghỉ dưỡng hóa
- có dấu hiệu đời sống hoặc làm việc thật
- có log source/license cho từng ảnh
- batch bài mới dùng ảnh `WebP` hoặc `AVIF`
- tên file ảnh bám slug bài viết
- có `alt_vi`, `alt_en`
- có `caption_vi`, `caption_en` khi cần
- crop desktop và mobile đều pass
- không tái dùng ảnh sai ngữ cảnh giữa các bài khác intent

### 13.5 Browser QA

- desktop
- mobile
- tab tiếng Việt
- tab tiếng Anh nếu có
- click cross-site không vỡ flow

## 14. Launch order

Thứ tự đúng:

1. deploy cleanup của `omdalat.com`
2. xác minh active surface đã sạch hệ cũ
3. deploy bridge block + footer link
4. deploy `ap.omdalat.com`
5. kiểm canonical / sitemap / robots của cả hai
6. mở CTA contextual
7. bật tracking
8. smoke test sau launch

## 15. Rollback plan

Nếu launch có vấn đề:

### 15.1 Rollback mức nhẹ

- tắt bridge block
- tắt CTA contextual
- giữ footer link nếu không gây lỗi

### 15.2 Rollback mức mạnh

- redeploy version `om` trước khi nối `ap`
- giữ `ap` chưa public
- rollback tracking snippet nếu gây lỗi UI

### 15.3 Không làm khi rollback

- không rollback lẫn cả logic cleanup hệ cũ nếu cleanup đó đã đúng
- không tái mở link `OMDALA`

## 16. Post-launch 72 giờ

Phải theo dõi:

- lỗi console
- redirect lỗi
- canonical lỗi
- click rate sang `ap`
- tỷ lệ quay lại `om`
- session vào `join`

## 17. Sai lầm nghiêm trọng

Cấm:

- launch `ap` khi `om` còn đầy dấu vết `OMDALA`
- dùng cùng title SEO giữa 2 site
- dùng cùng intent ở 2 site
- biến `ap` thành blog phụ vô danh
- biến `om` thành editorial portal
- đặt cross-link ở mọi nơi

## 18. Definition of done

Deploy được xem là hoàn chỉnh khi:

- `om` và `ap` rõ vai trò
- active surface của `om` sạch hệ cũ
- `ap` được nối vào như lớp editorial, không chen vai trò chính
- SEO không xung đột
- content mới pass SOP nội dung
- cross-link đúng chỗ
- tracking hoạt động
- QA pass
- launch ổn định

## 19. Câu chốt

- `omdalat.com` là nơi tham gia hệ
- `ap.omdalat.com` là nơi cảm được Đà Lạt

Nếu hai site cùng nói một thứ, cả brand lẫn SEO sẽ yếu đi.  
Nếu chia đúng vai trò, chúng sẽ kéo nhau lên.

---

## 20. Dẫn chiếu bắt buộc

- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
- `docs/OMDALAT_CONTENT_OPERATING_SYSTEM_AND_100_SEO_ROADMAP_2026-05-03.md`
- `docs/OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md`
- `docs/OMDALAT_CONTENT_SEO_30_ARTICLES_2026.md`
- `docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md`
- `docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md`
