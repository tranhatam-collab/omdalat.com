# OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026

## Om Dalat / Ôm Đà Lạt

Public and Member Access Model

Version: LOCKED  
Status: Production-ready  
Scope: content visibility, route access, UI gating, member states

---

## 0. Mục tiêu

Hệ phải phân lớp rõ:

- public hiểu đúng
- registered member xem sâu hơn
- reviewed member xem sâu hơn nữa
- internal chỉ cho vận hành và admin

Không để public thấy hết.  
Không để hệ thành kín hoàn toàn.  
Không biến membership thành chiêu bán hàng.

---

## 1. Các lớp truy cập

### 1. Guest

Người chưa đăng nhập.

Có thể xem:

- homepage
- pages công khai
- bài viết public
- FAQ
- form tham gia
- teaser của khu vực thành viên

Không thể xem:

- member resources
- investor materials
- ops handbook chi tiết
- dashboard riêng

### 2. Registered Member

Người đã đăng ký tài khoản và xác thực email.

Có thể xem thêm:

- member welcome page
- tóm tắt tài liệu thành viên
- một số guide mở rộng
- trạng thái hồ sơ
- profile cơ bản

Chưa được xem:

- tài liệu reviewed
- deck đầu tư chi tiết
- handbook vận hành sâu
- tài liệu nội bộ

### 3. Reviewed Member

Người đã có hồ sơ cơ bản đầy đủ và được review thủ công.

Có thể xem thêm:

- investor overview
- operations summary
- handbook mở rộng
- tài nguyên chương trình
- node model overview
- một số tài liệu chọn lọc

### 4. Internal Member

Người nội bộ, operator, contributor lõi.

Có thể xem:

- tài liệu vận hành sâu
- SOP
- node playbook
- escalation docs
- scorecard
- tài liệu triển khai

### 5. Admin

Toàn quyền.

---

## 2. Route access matrix

### Public routes

- `/vi`
- `/en`
- `/vi/about`
- `/vi/life`
- `/vi/work`
- `/vi/learning`
- `/vi/community`
- `/vi/stay`
- `/vi/join`
- `/vi/articles/*`
- `/docs/*`
- `/faq`
- `/contact`
- `/policies/*`

### Registered Member routes

- `/member`
- `/member/welcome`
- `/member/profile`
- `/member/resources`
- `/member/application-status`

### Reviewed Member routes

- `/member/investor-overview`
- `/member/operations`
- `/member/handbook`
- `/member/programs`
- `/member/node-model`

### Internal routes

- `/internal/*`

### Admin routes

- `/admin/*`

---

## 3. Visibility model for content cards

### Public resource teaser

Guest được thấy:

- title
- excerpt 1-2 dòng
- category
- badge `Dành cho thành viên đã đăng ký`

Guest không được thấy:

- full body
- attachments
- slides
- deck
- handbook full sections

### CTA rules

Guest:

- Đăng ký để xem chi tiết

Registered:

- Hoàn tất hồ sơ để xem thêm

Reviewed:

- Mở tài liệu

Internal:

- Xem tài liệu nội bộ

---

## 4. Membership flow

### Flow chuẩn

`Visit -> Read -> Register -> Verify email -> Complete profile -> Review -> Unlock more access`

### Steps chi tiết

1. Người dùng vào trang public
2. Đọc content nền tảng
3. Bấm `Đăng ký thành viên`
4. Tạo tài khoản
5. Xác thực email
6. Điền hồ sơ:
   - Họ tên
   - Đang ở đâu
   - Muốn gì
   - Có thể làm gì
   - Dự định ở bao lâu
   - Link giới thiệu bản thân
7. Chờ review
8. Được nâng lên Reviewed Member nếu phù hợp

---

## 5. UI wording rules

Không dùng:

- Premium access
- VIP
- Exclusive content
- Unlock secret materials
- Private investment opportunity

Dùng:

- Dành cho thành viên đã đăng ký
- Mở sau khi hoàn tất hồ sơ cơ bản
- Một số tài liệu chỉ dành cho thành viên phù hợp
- Nội dung chi tiết được mở theo từng bước tham gia

---

## 6. Investor materials access

### Public

Chỉ hiển thị:

- hệ đang vận hành theo 4 trục
- có mô hình scale theo node
- có dòng doanh thu nền tảng
- có thể đăng ký thành viên để tìm hiểu thêm

### Registered

Chỉ hiển thị:

- investor overview ngắn
- high-level rationale
- use cases
- câu hỏi thường gặp

### Reviewed

Được xem:

- pitch deck tóm tắt mở rộng
- logic use of funds
- timeline mức vừa phải
- scale model overview

### Internal/Admin

Được xem:

- full deck
- detailed financials
- legal docs
- pipeline
- internal notes

---

## 7. Operations handbook access

### Public

- nguyên tắc chung
- quy tắc sống
- quy tắc làm việc
- quy tắc cộng đồng
- quy trình người mới mức cơ bản
- lịch tuần mẫu

### Registered

- onboarding summary
- trial period summary
- member expectations

### Reviewed

- handbook mở rộng
- checklist từng ngày
- review tuần
- role expectations
- red flags

### Internal

- SOP chi tiết
- scripts
- moderation handling
- escalation matrix
- operator handbook full

---

## 8. CMS access schema

### MemberResources

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "access_level": "guest|registered|reviewed|internal|admin",
  "category": "investor|operations|program|resource|guide",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft|published"
}
```

### Rule

- `guest` = public
- `registered` = login required
- `reviewed` = reviewed role required
- `internal` = internal only
- `admin` = admin only

---

## 9. Middleware rules for DEV

- nếu route yêu cầu login mà chưa login -> redirect tới `/member/register` hoặc `/login`
- nếu đã login nhưng thiếu quyền -> hiển thị gate screen, không trả `404`
- gate screen phải nói rõ bước tiếp theo
- không để search engine index member/internal routes

### SEO rules

- public routes: index
- member routes: noindex
- internal/admin routes: noindex, nofollow nếu cần

---

## 10. Gate screen copy

### VI

Title  
Nội dung này dành cho thành viên

Text for Guest  
Bạn cần đăng ký tài khoản cơ bản để xem phần này.

Text for Registered  
Bạn cần hoàn tất hồ sơ cơ bản để mở thêm tài liệu phù hợp.

Text for Reviewed denied path  
Phần này hiện chưa mở cho tài khoản của bạn.

### EN

Title  
This content is for members

Text for Guest  
You need a basic account to view this section.

Text for Registered  
You need to complete your basic profile to unlock more relevant materials.

Text for Reviewed denied path  
This section is not available for your account at the moment.

---

## 11. Member dashboard minimum spec

### Sections

- Trạng thái hồ sơ
- Bước tiếp theo
- Tài liệu đang mở
- Tài nguyên gợi ý
- Hồ sơ cá nhân
- Hỗ trợ

### Status examples

- Hồ sơ mới tạo
- Chờ xác thực
- Chờ review
- Đã mở tài nguyên thành viên
- Đang trong thời gian thử

---

## 12. Notification logic

### Email / in-app notifications

- chào mừng sau khi đăng ký
- xác thực email
- nhắc hoàn tất hồ sơ
- thông báo review result
- tài liệu mới được mở
- nhắc cập nhật hồ sơ

Giọng điệu:

- ngắn
- rõ
- không thúc ép

---

## 13. Abuse and safety rules

- không cho scrape public teaser thành full content
- không để direct URL bypass role check
- không index member content
- không hiển thị internal filenames trên public UI
- không để lộ taxonomy nội bộ quá kỹ

---

## 14. Definition of done

Access model được xem là hoàn thành khi:

- role matrix rõ
- route guards hoạt động
- teaser cards đúng
- gate screens đúng ngôn ngữ
- public/member/internal content tách rõ
- noindex đúng
- CMS schema đúng
- dashboard có minimum spec
