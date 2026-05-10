# OMDALAT APP MEMBER DASHBOARD SPEC 2026

Version: LOCKED  
Status: Member app and dashboard product spec

---

## 0. Mục Tiêu

`/app` là bề mặt nhẹ để người dùng theo dõi hồ sơ, trạng thái tham gia, tài liệu đã mở và bước tiếp theo.

---

## 1. Core Routes

- `/app`
- `/app/profile`
- `/app/apply`
- `/app/dashboard`
- `/app/membership`
- `/app/resources`

---

## 2. Dashboard Modules

### Trạng Thái Hồ Sơ

- chưa bắt đầu
- đã đăng ký
- chờ review
- đã được mở member access
- đã được reviewed

### Tài Liệu Đã Mở

- docs đã đọc
- member resources đã mở
- handbook sections đã mở

### Bước Tiếp Theo

- hoàn tất hồ sơ
- bổ sung thông tin
- chờ phản hồi
- đặt lịch trao đổi
- bắt đầu trial

### Bài Viết Gợi Ý

- bài public phù hợp với trạng thái hiện tại
- guide cho người mới
- stay/work/community articles

### Tài Nguyên Thành Viên

- investor overview
- operations handbook
- membership guide
- resources theo access level

---

## 3. Required Data Points

- member role
- profile completion percentage
- access level
- review status
- recently unlocked resources
- recommended next action

---

## 4. UX Rule

- dashboard phải rõ trạng thái, không nặng dashboard enterprise
- mobile đọc được ngay
- resource lock state phải rõ
- mọi CTA phải dẫn tới một bước cụ thể
