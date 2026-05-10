# OMDALAT INFORMATION ARCHITECTURE AND ROUTING 2026

Version: LOCKED  
Status: Canonical IA and routing map for rebuild

---

## 0. Quyet Dinh Kien Truc

Om Dalat chạy độc lập trên một domain duy nhất:

- `https://omdalat.com`

Mọi surface phải nằm trong cùng một hệ:

- public web
- docs public-facing
- member area
- app nội bộ

---

## 1. Route Map Moi

### Core

- `/vi`
- `/en`

### Primary Sections

- `/vi/life`
- `/vi/work`
- `/vi/learning`
- `/vi/community`
- `/vi/stay`
- `/vi/join`
- `/vi/articles`

### Support

- `/vi/about`
- `/vi/how-it-works`
- `/vi/faq`
- `/vi/contact`
- `/vi/policies`
- `/vi/privacy`
- `/vi/terms`

### System

- `/member`
- `/docs`
- `/app`

### Member Subroutes

- `/member/welcome`
- `/member/profile`
- `/member/resources`
- `/member/application-status`
- `/member/investor-overview`
- `/member/operations`
- `/member/handbook`
- `/member/programs`
- `/member/node-model`

### Internal

- `/internal/*`

### Admin

- `/admin/*`

### English Mirror

- `/en/life`
- `/en/work`
- `/en/learning`
- `/en/community`
- `/en/stay`
- `/en/join`
- `/en/articles`

---

## 2. Menu Chuan

### VI

- Trang chủ
- Sống
- Làm
- Học
- Cộng đồng
- Ở lại
- Bài viết
- Tham gia

### EN

- Home
- Life
- Work
- Learning
- Community
- Stay
- Articles
- Join

### Header Right

- `VI / EN`
- `Đăng nhập`
- `Thành viên`
- `Bắt đầu`

---

## 3. Redirect Bat Buoc

Tất cả URL cũ mang logic cũ phải redirect `301` sang hệ mới.

Ví dụ:

- `/vi/what-is-omdalat` -> `/vi/about`
- `/vi/work-and-opportunity` -> `/vi/work`
- `/vi/creative-economy` -> `/vi/learning` hoặc `/vi/work` tùy nội dung
- các link docs cũ -> `/docs`
- các link app cũ -> `/app`
- các CTA member hoặc tài liệu sâu cũ -> `/member`

---

## 4. Viec Phai Go Ngay

Trang live hiện vẫn còn link `docs.omdala.com` trong khối `Docs / Help` và trong nhiều CTA liên quan tài liệu. Phải gỡ toàn bộ ngay khi rebuild.

Phải gỡ ngay:

- `docs.omdala.com`
- `app.omdala.com`
- `OMDALA`
- `Docs / Help`
- `Build proof`
- `city node`
- `global layer`

---

## 5. Rule Cho `/docs`

`/docs` là docs public-facing của Om Dalat trên cùng domain.

Nó phải chứa ít nhất:

- getting started
- how it works
- community rules
- stay guide
- work guide
- FAQ

`/docs` không phải data room.

---

## 6. Rule Cho `/member`

`/member` là lớp tài nguyên dành cho thành viên đã đăng ký.

Nó phải chứa ít nhất:

- investor overview
- operations
- handbook
- programs
- node model
- resources

Các route dưới `/member` phải có gating rõ theo role.

Tối thiểu phải có:

- `/member/welcome`
- `/member/profile`
- `/member/resources`
- `/member/application-status`
- `/member/investor-overview`
- `/member/operations`
- `/member/handbook`
- `/member/programs`
- `/member/node-model`

---

## 7. Rule Cho `/app`

`/app` là app nội bộ nhẹ cho flow thành viên, apply, profile, records cơ bản.

Không được định vị như app của hệ khác.

Nó phải chứa ít nhất:

- profile
- apply
- dashboard
- membership
- resources
