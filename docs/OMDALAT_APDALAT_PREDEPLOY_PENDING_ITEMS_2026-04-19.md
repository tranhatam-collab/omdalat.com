# OMDALAT APDALAT PREDEPLOY PENDING ITEMS 2026-04-19

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Predeploy Pending Items

Version: WORKING  
Status: Team 1 summary before Team 2 and Team 3 final reports  
Scope: items that must be checked or confirmed before deploy

## 1. Mục tiêu

File này gom lại những việc còn lại trước deploy để khi Team 2 và Team 3 báo cáo xong có thể chốt ngay:

- pass
- fix nhanh
- hoặc chặn deploy

## 2. Việc còn lại của Team 2

Trạng thái hiện tại: `PASS`

### Bắt buộc phải báo cáo

1. Active homepage đã dọn sạch chưa:
   - `docs.omdala.com`
   - `app.omdala.com`
   - wording `OMDALA`
   - block `Docs / Help`

2. Bridge block `Ấp Đà Lạt` đã gắn chưa

3. Footer link `Ấp Đà Lạt / Ap Dalat` đã gắn chưa

4. Contextual CTA đã gắn ở những page nào

5. Có page nào đang link sang `ap` sai context không

6. Desktop và mobile có pass nhanh chưa

### Nếu Team 2 chưa pass

Chưa deploy.

### Kết quả Team 2 đã xác nhận

- active homepage đã dọn sạch `docs.omdala.com`, `app.omdala.com`, wording `OMDALA`, block `Docs / Help`
- bridge block `Ấp Đà Lạt / Ap Dalat` đã lên đúng vị trí
- footer đã có link `Ấp Đà Lạt / Ap Dalat`
- contextual CTA đã gắn đúng flow
- quick QA desktop + mobile đã pass

## 3. Việc còn lại của Team 3

Trạng thái hiện tại: `PARTIAL`

### Bắt buộc phải báo cáo

1. Config domain:
   - `omdalat.com`
   - `ap.omdalat.com`

2. Build:
   - build `om` pass
   - build `ap` pass

3. SEO runtime:
   - canonical đúng
   - robots đúng
   - sitemap đúng
   - noindex đúng cho route protected

4. Tracking:
   - click `om -> ap`
   - click `ap -> om`
   - click bridge block
   - click footer
   - click contextual CTA

5. Deploy blocker:
   - Cloudflare project
   - token
   - env
   - redirect

6. Rollback note đã sẵn chưa

### Nếu Team 3 chưa pass

Chưa deploy.

### Kết quả Team 3 đã xác nhận

- build `apps/web` pass
- build `apps/app` pass
- deploy preview cho web và app đã thành công
- canonical / robots / sitemap behavior mới đã đúng trên preview mới
- deploy tầng Cloudflare không còn blocker token / account / pages write

### Những điểm Team 3 vẫn còn phải chốt trước production cutover

- `ap.omdalat.com` chưa có DNS hoặc chưa bind custom domain thật
- production domain hiện tại vẫn đang phục vụ bề mặt legacy, chưa cutover sang deploy mới
- tracking cross-domain `om -> ap` và `ap -> om` chưa có evidence implement hoàn chỉnh

## 4. Việc Team 1 sẽ chốt sau khi hai team báo cáo

Team 1 chỉ chốt Go khi cả 3 nhóm dưới đều pass:

### 4.1 Brand pass

- không còn `OMDALA` trên active surface
- `om` và `ap` không trùng vai trò

### 4.2 UX pass

- bridge block đúng vị trí
- footer đúng
- CTA contextual đúng chỗ
- không phá flow tham gia

### 4.3 SEO pass

- canonical đúng
- intent không trùng
- cross-link đúng anchor

## 5. Blocker có khả năng còn tồn tại

Hiện tại Team 1 đánh dấu 4 blocker có thể còn phải xử lý:

1. Production domain live thực tế chưa cutover sang deploy mới
2. `ap.omdalat.com` chưa có DNS hoặc custom domain binding hoàn chỉnh
3. `apps/docs` là bundle static legacy chưa archive hoặc rewrite
4. Tracking cross-site có thể chưa gắn đầy đủ

## 6. Điều kiện Go

Được đánh dấu Go khi:

- Team 2 xác nhận cleanup + bridge block + footer + CTA contextual
- Team 3 xác nhận build + SEO runtime + tracking + deploy path production
- Team 1 review lại active surface và pass

## 7. Điều kiện No-Go

Chỉ cần một trong các điều sau còn tồn tại thì chưa deploy:

- còn `docs.omdala.com` hoặc `app.omdala.com` trên active surface
- bridge block chưa lên đúng
- footer chưa có link `Ấp Đà Lạt`
- canonical chéo
- keyword boundary chưa rõ
- tracking chưa có
- deploy target chưa xác thực

## 8. Câu chốt

Sau khi Team 2 và Team 3 báo cáo, Team 1 không cần bàn lại định hướng nữa.  
Chỉ cần đối chiếu file này, đánh dấu pass hoặc chặn deploy.
