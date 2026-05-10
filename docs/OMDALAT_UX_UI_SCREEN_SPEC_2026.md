# OMDALAT_UX_UI_SCREEN_SPEC_2026

## Om Dalat / Ôm Đà Lạt

UX/UI Screen Specification

Version: LOCKED  
Status: Figma-level text spec  
Scope: public, member, and key action screens

---

## 0. Nguyên tắc UI

- sạch
- ít chữ trên từng màn
- khoảng trắng đủ
- ảnh thật
- không làm như startup SaaS
- không làm như resort booking site
- không dùng hiệu ứng phô trương

Visual direction:

- nền sáng ấm hoặc trung tính
- xanh lá muted, be tự nhiên, than nhẹ
- chữ đen/xám đậm, đọc rõ
- card bo vừa phải
- shadow rất nhẹ
- icon line nếu cần, không lạm dụng

---

## 1. Homepage

### Frame 1: Hero

Layout: 2 cột desktop, 1 cột mobile  
Left: H1, subline, intro, 2 CTA  
Right: 1 ảnh lớn đời sống thật

Primary CTA: `Bắt đầu từ đây`  
Secondary CTA: `Xem cách tham gia`

Spacing: thoáng, không dày chữ  
Mobile: giữ hero ngắn, tránh chiếm quá 1.5 màn hình

### Frame 2: Đây là gì

Layout: full-width block  
Content: 3 dòng ngắn  
Typography: headline vừa, body 18-20px desktop, 16-18px mobile  
Background: neutral

### Frame 3: 4 trục

Layout: grid 2x2  
Cards: Sống, Làm, Học, Cộng đồng  
Card content: title + 2 dòng mô tả  
Interaction: hover nhẹ desktop, tap-friendly mobile

### Frame 4: Không gian

Layout: image grid 3-5 ảnh  
Captions: rất ngắn  
Goal: cho thấy nơi này có thật

### Frame 5: Bài viết

Layout: 3 article cards  
Card fields: category, title, excerpt 1 dòng, CTA  
Below: button `Xem tất cả bài viết`

### Frame 6: Cách tham gia

Layout: 3 steps ngang desktop, dọc mobile  
Steps: `Hiểu đúng -> Gửi hồ sơ -> Thử phù hợp`  
Below: CTA `Gửi hồ sơ`

### Frame 7: Khu vực dành cho thành viên

Layout: 1 band nhẹ hoặc 1 card lớn  
Content: title + 2 dòng + 2 buttons  
Không được: làm như paywall aggressive

### Frame 8: FAQ

Layout: accordion nhẹ  
Items: 3-5 câu hỏi  
Rule: đóng mở mượt, không animation nặng

### Frame 9: CTA cuối

Text: `Ở lại hoặc rời đi. Nhưng hiểu rõ trước.`  
Buttons: `Bắt đầu từ đây`, `Đọc hướng dẫn`

---

## 2. Article page

Structure:

- breadcrumb
- H1
- subline hoặc intro
- hero image
- meta row: ngày, category
- body content
- quote line
- related articles
- CTA cuối

Content width:

- 680-760px desktop
- mobile full-width với padding tốt

Typography:

- line-height thoáng
- paragraph ngắn
- H2 đủ khoảng trắng
- quote line tách nền hoặc kẻ nhẹ

Related articles:

- 3 card
- cùng category hoặc liên quan

CTA cuối:

- `Xem cách tham gia`
- `Tìm nơi ở`

---

## 3. Stay page

Goal:

Giải thích nơi ở và giúp người dùng tự đánh giá phù hợp.

Sections:

1. Hero
2. Các loại chỗ ở
3. Mức giá
4. Điều kiện cơ bản
5. Ai phù hợp / không phù hợp
6. Câu hỏi thường gặp
7. Form quan tâm

Cards for stay types:

- Dorm
- Private room
- Shared long-stay option

Card fields:

- tên loại
- mức giá
- phù hợp với ai
- ghi chú ngắn

Form fields:

- Họ tên
- Dự kiến đến khi nào
- Dự định ở bao lâu
- Bạn cần loại chỗ ở nào
- Ghi chú thêm

---

## 4. Work page

Goal:

Giải thích việc gì có thể làm và cách bắt đầu thực tế.

Sections:

1. Hero
2. Làm việc ở đây nghĩa là gì
3. Những loại công việc phù hợp
4. Mức thu nhập và kỳ vọng thực tế
5. Cách bắt đầu từ số 0
6. Bài viết liên quan
7. CTA gửi hồ sơ

Work cards:

- freelance
- remote work
- project-based work
- community-based contribution

Card fields:

- loại việc
- yêu cầu cơ bản
- mức cam kết thời gian
- note ngắn

---

## 5. Learning page

Goal:

Làm rõ `học` ở đây không phải khóa học kiểu cũ.

Sections:

1. Hero
2. Học từ trải nghiệm là gì
3. Học qua công việc
4. Học qua cộng đồng
5. Học qua nhịp sống
6. Những chương trình đang có
7. CTA

Program cards:

- title
- thời lượng
- output
- phù hợp với ai

---

## 6. Community page

Goal:

Trình bày cộng đồng như một phần kỷ luật, không phải social club.

Sections:

1. Hero
2. Nguyên tắc chung
3. Hoạt động nền
4. Quy tắc ứng xử
5. Red flags
6. Câu hỏi thường gặp
7. CTA

Rules layout:

Danh sách ngắn, rõ, không quá nhiều chữ trên một hàng.

---

## 7. Join page

Goal:

Biến sự quan tâm thành hồ sơ đủ để review.

Sections:

1. Intro
2. Những điều cần biết trước khi gửi hồ sơ
3. Form
4. Giải thích quy trình review
5. FAQ ngắn

Form fields:

- Họ và tên
- Email
- Số điện thoại hoặc liên hệ khác
- Bạn đang ở đâu
- Bạn muốn gì
- Bạn có thể làm gì
- Bạn dự định ở bao lâu
- Link giới thiệu bản thân
- Ghi chú thêm

Submit button:

- `Gửi hồ sơ`

After-submit state:

- cảm ơn ngắn
- nói rõ bước tiếp theo
- không hứa review ngay lập tức

---

## 8. Member register page

Goal:

Tạo tài khoản gọn, ít friction.

Fields:

- Họ tên
- Email
- Mật khẩu
- Đồng ý điều khoản

Copy:

Ngắn, rõ, không làm như upsell.

---

## 9. Member dashboard

Sections:

- Trạng thái hồ sơ
- Bước tiếp theo
- Tài liệu đã mở
- Tài nguyên gợi ý
- Hồ sơ cá nhân
- Hỗ trợ

First-time state:

- welcome card
- checklist 3 bước
- nhắc hoàn tất hồ sơ

Reviewed state:

- mở cards cho investor overview, operations, handbook
- không lộ internal items

---

## 10. Gate screen

Goal:

Khi user chưa đủ quyền, không trả 404, mà giải thích bước tiếp theo.

Elements:

- title
- 2 dòng giải thích
- 1 CTA chính
- 1 CTA phụ

Example VI:

Title: `Nội dung này dành cho thành viên`  
Text: `Bạn cần hoàn tất hồ sơ cơ bản để mở phần này.`  
Buttons: `Hoàn tất hồ sơ / Quay lại`

---

## 11. Mobile behavior rules

- sticky header gọn
- menu full-screen sạch
- form fields đủ lớn
- buttons cao tối thiểu 44px
- card spacing thoáng
- tránh slider khó dùng
- ảnh crop tốt

---

## 12. Accessibility baseline

- contrast đủ
- font size dễ đọc
- focus states rõ
- alt text thật
- form labels đầy đủ
- error messages rõ

---

## 13. Definition of done

UX/UI spec được xem là xong khi:

- homepage, article, stay, work, learning, community, join, member dashboard, gate screen đều có spec rõ
- mobile-first pass
- copy bám codex
- không còn ảnh hưởng ngôn ngữ hệ cũ
- team design có thể dựng Figma ngay
- team dev có thể code mà không đoán thêm
