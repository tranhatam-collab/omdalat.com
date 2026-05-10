# OMDALAT APDALAT TEAM1 FINAL RELEASE GATE 2026

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Team 1 Final Release Gate

Version: LOCKED  
Status: Production-ready  
Scope: quyết định Go / No-Go cuối cùng của Team 1 trước deploy

## 0. Mục tiêu

File này là cổng chặn cuối cùng của Team 1.

Sau khi Team 2 và Team 3 báo cáo, Team 1 chỉ dùng file này để chốt:

- Go
- Go with fixes
- No-Go

Không bàn lại định hướng ở bước này.  
Chỉ đối chiếu xem hệ đã đúng hay chưa.

## 1. Điều Team 1 phải bảo vệ

Team 1 chỉ cần giữ 4 thứ:

1. đúng brand
2. đúng vai trò 2 site
3. đúng flow người dùng
4. đúng boundary SEO

Nếu một trong 4 thứ này lệch, chưa deploy.

## 2. Điều kiện Go tuyệt đối

Chỉ được đánh dấu `Go` khi cả 4 nhóm dưới đây đều pass.

### 2.1 Brand pass

- không còn `OMDALA` trên active surface của `omdalat.com`
- không còn `docs.omdala.com`
- không còn `app.omdala.com`
- `omdalat.com` và `ap.omdalat.com` được mô tả đúng vai trò

### 2.2 UX pass

- homepage có bridge block `Ấp Đà Lạt`
- footer có link `Ấp Đà Lạt / Ap Dalat`
- CTA contextual chỉ xuất hiện ở page phù hợp
- không có link nào kéo user sai flow tham gia

### 2.3 SEO pass

- canonical đúng
- không canonical chéo
- keyword chính không trùng giữa `om` và `ap`
- anchor text cross-site có nghĩa

### 2.4 Runtime pass

- build pass
- deploy path pass
- tracking tối thiểu đã gắn
- rollback note đã sẵn

## 3. Ma trận quyết định

### Go

Chọn `Go` khi:

- mọi P0 đã sạch
- mọi P1 đã lên
- Team 2 pass
- Team 3 pass
- Team 1 review active surface không thấy drift

### Go with fixes

Chọn `Go with fixes` khi:

- không còn blocker brand
- không còn blocker SEO
- chỉ còn lỗi nhỏ về wording, spacing, tracking label hoặc QA hậu launch

### No-Go

Chọn `No-Go` khi còn một trong các lỗi sau:

- active surface còn `OMDALA`
- active surface còn `docs.omdala.com` hoặc `app.omdala.com`
- bridge block chưa có
- footer chưa có link `Ấp Đà Lạt`
- canonical sai
- intent 2 site đang trùng
- deploy target chưa xác thực

## 4. Evidence tối thiểu Team 1 phải nhận

### Từ Team 2

- ảnh hoặc evidence active homepage
- evidence footer
- danh sách page đã gắn CTA contextual
- note desktop/mobile pass

### Từ Team 3

- build pass
- deploy target
- canonical / robots / sitemap check
- tracking events list
- rollback note

Nếu thiếu evidence, chưa chốt `Go`.

## 5. Mẫu review của Team 1

### A. Brand

- Pass / Fail
- Ghi chú:

### B. UX

- Pass / Fail
- Ghi chú:

### C. SEO

- Pass / Fail
- Ghi chú:

### D. Runtime

- Pass / Fail
- Ghi chú:

### Quyết định cuối

- Go
- Go with fixes
- No-Go

### Owner Team 1

- tên người chốt
- ngày giờ chốt

## 6. P0 phải sạch trước khi đọc tiếp

Nếu còn bất kỳ dấu vết nào dưới đây trên active surface, dừng lại:

- `OMDALA`
- `docs.omdala.com`
- `app.omdala.com`
- `Docs / Help`
- CTA cũ đi ra ngoài hệ

## 7. Lỗi nhỏ có thể để hậu deploy

Chỉ những lỗi sau mới được để sau deploy:

- wording phụ
- spacing phụ
- tracking label phụ
- feed editorial chưa bật
- polish UI nhỏ

Không bao gồm:

- brand drift
- canonical sai
- cross-link sai vai trò
- flow sai

## 8. Câu chốt

Team 1 không deploy vì “đã gần xong”.  
Team 1 chỉ chốt Go khi hệ đã đúng nghĩa.
