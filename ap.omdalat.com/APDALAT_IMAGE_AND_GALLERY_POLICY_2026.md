# APDALAT_IMAGE_AND_GALLERY_POLICY_2026
## Version 1.0
## Status: Locked
## Scope: ap.omdalat.com
## Purpose: Bảo đảm hình ảnh/galleries giữ đúng tinh thần editorial của Ấp Đà Lạt và không trôi sang aesthetic du lịch/hotel

---

## 0. Image Policy Lock Statement
Hình ảnh là lớp chứng cứ của đời sống thật, không phải trang trí.
Mọi ảnh trên `ap.omdalat.com` phải làm rõ: con người thật, nơi chốn thật, nhịp sống thật, công việc thật.

---

## 1. Visual Truth Principles

### 1.1 Must show
- đời sống thường nhật
- không gian sống và làm việc có dùng thật
- chi tiết vật liệu (gỗ, kính, đá, giấy, mưa, sương) tự nhiên
- con người trong ngữ cảnh thật

### 1.2 Must avoid
- ảnh stock du lịch đại trà
- staging “luxury staycation”
- preset màu quá tay
- laptop-outdoor cliché
- drone-only identity

---

## 2. Image Categories (Approved)
1. Hero landscape có chiều sâu khí hậu
2. Portrait đời thường
3. Work corners
4. Place textures (hiên nhà, cửa sổ, bàn gỗ, vườn)
5. Daily sequences (sáng-trưa-chiều-tối)
6. Livelihood moments (nghề thật)
7. Photo essay sets

---

## 3. Acquisition and Licensing Rules

### 3.1 Preferred sources
1. In-house photography
2. Commissioned local photographers
3. Contributor network có release rõ

### 3.2 Licensing requirements
- có hồ sơ quyền sử dụng rõ ràng
- lưu `license_type`, `creator_name`, `usage_scope`, `expiry` (nếu có)
- ảnh thiếu thông tin license: không publish

### 3.3 Consent rules
- ảnh nhận diện khuôn mặt: cần consent
- ảnh trẻ em: yêu cầu consent từ người giám hộ

---

## 4. Image Editing Policy

### 4.1 Allowed edits
- exposure/white balance nhẹ
- crop phù hợp khung nội dung
- noise reduction vừa phải
- color correction giữ tự nhiên

### 4.2 Forbidden edits
- đổi trời giả
- thêm hiệu ứng cinematic mạnh
- xóa chi tiết làm sai sự thật ngữ cảnh
- grade màu làm mất bản chất không khí Đà Lạt

---

## 5. Technical Specs (Web)

### 5.1 Formats
- Primary: `AVIF`, `WebP`
- Fallback: `JPEG`
- PNG chỉ dùng khi bắt buộc (alpha/text-based)

### 5.2 Responsive variants
Mỗi ảnh cần tối thiểu:
- mobile (720w)
- tablet (1200w)
- desktop (1800w)

### 5.3 Compression targets
- Hero desktop: <= 350KB (trừ trường hợp đặc biệt)
- Card images: <= 180KB
- Thumb images: <= 90KB

### 5.4 Aspect ratio standards
- Hero: 16:9 hoặc 3:2
- Story card: 4:3
- Portrait card: 3:4
- Gallery mixed: linh hoạt, nhưng cần nhịp ổn định

---

## 6. Metadata and Accessibility

### 6.1 Required fields per image
- `alt_vi` (required)
- `alt_en` (required nếu có EN page)
- `caption_vi`
- `caption_en` (optional adaptation)
- `credit`
- `location`
- `capture_date`
- `license`

### 6.2 Alt text rules
Alt phải mô tả nội dung có nghĩa ngữ cảnh, không nhồi keyword.

Ví dụ tốt:
- `Bàn làm việc gỗ bên cửa sổ nhìn ra mưa sớm ở Đà Lạt.`

---

## 7. Gallery UX Rules

### 7.1 Editorial pacing
- mỗi gallery nên có mở-giữa-kết
- không xếp ảnh chỉ theo “đẹp riêng lẻ”
- caption ngắn, giàu bối cảnh

### 7.2 Interaction
- swipe mượt trên mobile
- keyboard navigation trên desktop
- không autoplay video/animation gây phân tán

### 7.3 Density control
- mỗi cụm ảnh cần khoảng thở
- không nhồi quá nhiều ảnh nhỏ trên một viewport

---

## 8. Homepage Image Rules

### 8.1 Hero
- bắt buộc có chiều sâu không khí và place identity
- ưu tiên ảnh có dấu vết sống/làm việc

### 8.2 Section imagery
- People: ảnh người trong ngữ cảnh nghề/life
- Places: ảnh không gian có chức năng thật
- Rhythms: ảnh thời tiết/ánh sáng theo nhịp ngày
- Work: ảnh work setups chân thực

---

## 9. File Naming and Storage Convention

### 9.1 Naming
`apdalat-{content_type}-{slug}-{location}-{yyyymmdd}-{seq}.jpg`

Ví dụ:
`apdalat-profile-nguyen-thi-a-xuan-huong-20260419-01.jpg`

### 9.2 Folder structure
- `/assets/images/heroes/`
- `/assets/images/profiles/`
- `/assets/images/places/`
- `/assets/images/essays/`
- `/assets/images/work/`

---

## 10. CMS Validation Rules

### 10.1 Publish blockers
Không cho publish nếu thiếu:
- alt text
- credit/license
- tối thiểu 1 crop hợp lệ cho mobile

### 10.2 Recommended lint checks
- ảnh quá nặng
- tỷ lệ lệch chuẩn component
- caption rỗng cho photo essay

---

## 11. Quality Review Checklist
1. Ảnh có đúng tinh thần sống thật/làm thật không?
2. Có biểu hiện travel/hotel aesthetic không?
3. Crop mobile có giữ được cảm xúc chính không?
4. Alt/caption có hữu ích và đúng ngữ cảnh không?
5. Có đủ credit + license + consent chưa?

Nếu fail >=2 mục: không publish.

---

## 12. Team Ownership

### Content/Editorial
- chọn ảnh theo câu chuyện, không chọn theo “đẹp rời rạc”

### Design
- giữ nhịp gallery và khoảng trắng chuẩn editorial

### Frontend
- responsive image pipeline
- lazy load + performance
- accessibility controls

### SEO
- ảnh có metadata đầy đủ, hỗ trợ image search đúng intent

---

## 13. Definition of Done
Image & Gallery Policy hoàn thành khi:
1. Mọi ảnh public có nguồn gốc, quyền dùng và metadata rõ
2. Hệ thống gallery đọc được như một lớp kể chuyện hình ảnh
3. Mobile performance vẫn tốt dù site image-heavy
4. Visual identity nhất quán với định vị editorial của Ấp Đà Lạt
5. Không có tín hiệu khiến brand bị hiểu thành du lịch/lưu trú
