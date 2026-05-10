# TEAM_HANDOFF_REQUIREMENTS_OMDALAT_DOCS_APP

Version: 3.0  
Status: Production-ready handoff requirements

---

## 1. Objective

File này định nghĩa yêu cầu bàn giao giữa các team cho 3 lớp:

- public web
- docs public-facing
- member/app runtime

Tất cả đều nằm trong cùng một hệ:

- `https://omdalat.com`

---

## 2. Final architecture

- Public: `https://omdalat.com/vi` và `https://omdalat.com/en`
- Docs: `https://omdalat.com/docs/*`
- Member: `https://omdalat.com/member/*`
- App: `https://omdalat.com/app/*`
- Internal: `https://omdalat.com/internal/*`

Không dùng:

- bất kỳ subdomain tách riêng nào cho docs/app/auth
- bất kỳ surface nào thuộc domain khác

---

## 3. Surface roles

### Public

Giải thích Ôm Đà Lạt là gì, ai phù hợp, cách tham gia.

### Docs

Giải thích cách dùng, nguyên tắc cộng đồng, hướng dẫn ở lại, hướng dẫn làm việc.

### Member

Mở lớp tài liệu sâu hơn cho thành viên đã đăng ký hoặc đã review.

### App

Xử lý hồ sơ, trạng thái tham gia, dashboard, tài nguyên đã mở.

### Internal

Chỉ dành cho vận hành và admin.

---

## 4. Handoff requirements

Chỉ được bàn giao giữa team khi đủ:

- route đã rõ
- access level đã rõ
- locale behavior đã rõ
- data/schema contract đã rõ
- QA expectation đã rõ
- Content SOP impact đã rõ nếu chạm bài viết, metadata, internal link hoặc ảnh
- Image Reality impact đã rõ nếu chạm ảnh public/editorial

---

## 5. Shared reporting

Mỗi team phải báo:

- route thay đổi gì
- access thay đổi gì
- schema thay đổi gì
- ảnh hưởng team khác ở đâu
- có chạm `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` không
- có chạm `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md` không

Không được đổi âm thầm các contract chung.
