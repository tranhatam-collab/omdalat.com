# OMDALAT I18N EXPANSION READINESS 2026

Phiên bản: LOCKED  
Trạng thái: Dùng cho Team 1, Team 2, Team 3 trước khi mở thêm locale

## 1. Mục tiêu

Chuẩn bị sẵn hệ đa ngôn ngữ để sau này mở thêm locale mà không phải đập lại:

- routing
- locale switcher
- hreflang
- metadata
- sitemap
- fallback nội dung

## 2. Locale đang public

- `vi`
- `en`

## 3. Locale đã khóa để mở rộng sau

- `fr`
- `de`
- `ja`
- `ko`
- `zh-cn`
- `zh-tw`
- `es`
- `ru`

Các locale này hiện ở trạng thái:

- chưa public
- chưa index
- chưa hiển thị trên switcher public
- đã có registry và fallback chuẩn

## 4. Rule mở locale mới

Chỉ mở locale khi đủ 4 điều kiện:

1. Có người biên tập thật
2. Có metadata thật cho homepage và core pages
3. Có QA bản dịch
4. Có seed nội dung đủ để không thành site mỏng

## 5. Fallback rule

- `vi` là ngôn ngữ nguồn
- `en` là ngôn ngữ quốc tế hóa đầu tiên
- các locale tương lai fallback về `en` cho đến khi có nội dung biên tập thật

## 6. Những gì đã sẵn trong code

- locale registry chung ở `packages/core/i18n.ts`
- public locale switcher dùng registry, không hardcode
- hreflang scaffold dùng registry
- sitemap dùng registry
- metadata helper có fallback theo locale
- `pickLocalized()` chịu được locale tương lai mà không làm vỡ UI

## 7. Việc cần làm khi bật một locale mới

1. Chuyển locale đó từ planned sang public trong registry
2. Thêm nội dung đã biên tập cho:
   - homepage
   - about
   - life
   - work
   - learning
   - community
   - stay
   - join
   - articles
3. QA metadata, hreflang, sitemap
4. Smoke test locale mới
5. Chỉ index sau khi pass QA

## 8. Cảnh báo

Không bật locale chỉ vì muốn nhìn “quốc tế”.

Locale mở ra nhưng chưa đủ nội dung sẽ:

- làm site mỏng
- làm SEO yếu
- làm người dùng mất niềm tin
- tăng gánh QA không cần thiết

## 9. Kết luận

Hệ hiện tại đã sẵn để mở thêm locale sau này theo cách an toàn.

Chưa nên public thêm locale cho đến khi có nội dung thật và QA thật.
