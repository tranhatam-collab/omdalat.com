Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Report Request

Version: v1.0.0

Status: ACTIVE REQUEST

Date updated: 2026-04-28

Owner: Team 1

Audience: Team 2 / Team 3 / Ap Team

---

## 0. Mục đích

Sau khi kích hoạt bộ chuẩn universal cho Om Dalat và Ap Dalat, Team 1 yêu cầu các team nộp lại report current-state theo cùng một format.

Mục tiêu không phải để lặp lại báo cáo cũ.

Mục tiêu là:

* quy mọi lane về cùng một chuẩn đọc
* phân biệt done thật với done theo cảm giác
* tách rõ blocker code, blocker toolchain, blocker content, blocker infra
* tạo một mặt bằng chung để Team 1 chốt P0 và P1

---

## 1. Team nào phải nộp gì

### Team 2

Nộp report cho lane:

`Om public`

Starter file:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`
* `docs/OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md`
* `docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md`

Bao gồm:

* homepage
* public routes
* docs public surface
* contact
* metadata
* sitemap
* alt text
* public CTA / menu / footer / forms
* image reality cho 3 bài đầu theo chuẩn khóa

Đặc biệt, Team 2 phải nộp thêm:

* bằng chứng ảnh đúng vai trò theo `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
* source/license log cho ảnh mới thay/review
* alt/caption song ngữ cho ảnh hero + ảnh bài

### Team 3

Nộp report cho lane:

`App member runtime`

Starter file:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`

Bao gồm:

* register
* apply
* dashboard
* stay
* work
* learning
* resources
* earnings
* contributor
* places
* admin review
* runtime build / packaging / smoke
* nếu lane có ảnh public/inline thì phải nộp evidence `ImageAssets` hoặc log nguồn ảnh đã duyệt theo chuẩn `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

### Ap Team

Nộp report cho lane:

`Ap editorial`

Starter file:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

Bao gồm:

* homepage editorial
* category pages
* article system
* metadata
* sitemap / robots / canonical / hreflang
* image system
* alt text / captions
* Om <-> Ap linking rules
* image reality pass cho toàn bộ surface Ap liên quan
* source/license log cho ảnh editorial / gallery / card

---

## 2. Format report bắt buộc

Mỗi team phải nộp đúng 10 mục sau.

### 1. Lane + owner

Ví dụ:

* Lane: Om public
* Owner: Team 2

### 2. Scope đã kiểm

Liệt kê route group, module, hoặc screen đã kiểm.

### 3. P0 done

Chỉ liệt kê những gì đã xong và có bằng chứng.

### 4. P0 blocked

Ghi rõ blocker và phân loại:

* code
* toolchain
* infra
* content
* SEO
* QA

### 5. P1 queue

Liệt kê các việc tiếp theo nhưng không chặn P0.

### 6. Files / routes / modules liên quan

Phải nêu path hoặc route chính đã chạm / đã kiểm.

### 7. Commands đã chạy

Ghi rõ command thật đã dùng.

### 8. Evidence

Ghi rõ:

* report path
* screenshot path nếu có
* smoke summary path nếu có
* build log path nếu có

### 9. Quyết định cần Team 1 chốt

Nếu có điểm mơ hồ về wording, route meaning, role meaning, canonical, gating, cross-linking, phải nêu ở đây.

### 10. Việc tiếp theo + phần trăm còn lại

Phải nêu:

* bước tiếp theo rõ ràng
* phần trăm còn lại

---

## 3. Mẫu ngắn

```md
Lane: Om public
Owner: Team 2

1. Scope đã kiểm
- ...

2. P0 done
- ...

3. P0 blocked
- [toolchain] ...
- [content] ...

4. P1 queue
- ...

5. Files / routes
- ...

6. Commands đã chạy
- ...

7. Evidence
- ...

8. Quyết định cần Team 1 chốt
- ...

9. Việc tiếp theo
- ...

10. Phần trăm còn lại
- ...
```

---

## 4. Yêu cầu riêng cho từng team

### 4.1 Team 2

Phải nộp thêm:

* route inventory public
* bilingual metadata check
* alt text check
* public CTA / menu / footer / form check

### 4.2 Team 3

Phải nộp thêm:

* phân biệt rõ blocker code và blocker toolchain
* trạng thái artifact deploy mới nhất
* smoke evidence mới nhất cho member runtime nếu có
* access matrix theo role nếu đã chạm

### 4.3 Ap Team

Phải nộp thêm:

* editorial route inventory
* bilingual metadata check
* image alt/caption/filename check
* canonical / hreflang / sitemap / robots check
* bằng chứng Ap không trùng vai trò với Om
* dẫn chứng áp dụng `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026` và `APDALAT_IMAGE_AND_GALLERY_POLICY_2026.md`

---

## 5. Điều Team 1 sẽ dùng report này để làm

Sau khi nhận đủ 3 report, Team 1 sẽ:

* review lại từng lane
* cập nhật board audit 3 lane
* chốt `P0 done / P0 blocked / P1 queue`
* quyết định lane nào được đi tiếp, lane nào phải sửa tiếp

---

## 6. Cảnh báo

Không team nào được:

* claim done nếu chưa có evidence
* gom blocker code và blocker toolchain làm một
* dùng report cũ mà không cập nhật theo format này
* bỏ qua metadata / alt text / canonical / route meaning vì coi là việc nhỏ

---

## 7. Definition of done cho yêu cầu này

Yêu cầu này chỉ hoàn thành khi:

* Team 2 nộp đủ report lane Om public
* Team 3 nộp đủ report lane App member runtime
* Ap Team nộp đủ report lane Ap editorial
* Team 1 xác nhận đã nhận và dùng được để review
