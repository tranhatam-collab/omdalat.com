# OMDALAT APDALAT TEAM1 RELEASE DECISION 2026-04-19

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Team 1 Release Decision

Version: WORKING  
Status: Team 1 decision after Team 2 and Team 3 reports  
Scope: preview readiness, production cutover readiness, remaining blockers

## 0. Kết luận ngắn

Team 1 chốt như sau:

- `Go` cho preview / staging / release candidate
- `No-Go` cho production cutover cuối cùng ở thời điểm hiện tại

Lý do:

- Team 2 đã pass phần public surface và bridge block
- Team 3 đã pass build và deploy preview
- nhưng production custom domain và tracking cross-domain vẫn chưa chốt đủ

## 1. Đánh giá Team 2

Trạng thái: `PASS`

### Những gì đã pass

- cleanup active homepage
- gỡ `docs.omdala.com`
- gỡ `app.omdala.com`
- gỡ wording `OMDALA` trên active homepage
- bridge block `Ấp Đà Lạt / Ap Dalat`
- footer link `Ấp Đà Lạt / Ap Dalat`
- CTA contextual đúng vai trò
- quick QA desktop + mobile pass

### Kết luận Team 1

Team 2 đã đạt yêu cầu cho lớp public UX của đợt này.

## 2. Đánh giá Team 3

Trạng thái: `PARTIAL`

### Những gì đã pass

- build `apps/web`
- build `apps/app`
- deploy preview mới cho web
- deploy preview mới cho app
- runtime behavior mới đúng trên preview
- Cloudflare Pages không còn blocker token / account / write permission

### Những gì chưa pass hoàn toàn

- `ap.omdalat.com` chưa có DNS hoặc custom domain binding hoàn chỉnh
- production live chưa cutover sang deploy mới
- tracking cross-domain `om -> ap` và `ap -> om` chưa có evidence đầy đủ

### Kết luận Team 1

Team 3 đã đưa hệ tới mức gần live, nhưng chưa đủ để chốt production launch cuối.

## 3. Kết quả theo release gate của Team 1

### A. Brand

Trạng thái: `PASS` ở preview / candidate

Ghi chú:

- Team 2 đã dọn active homepage theo spec mới
- active surface mới không còn drift brand chính

### B. UX

Trạng thái: `PASS`

Ghi chú:

- bridge block đúng vai trò
- footer đúng vai trò
- CTA contextual đúng chỗ

### C. SEO

Trạng thái: `PASS có điều kiện`

Ghi chú:

- logic mới đúng trên preview
- production domain chưa cutover nên live public hiện vẫn chưa thể xem là pass cuối

### D. Runtime

Trạng thái: `CHƯA PASS`

Ghi chú:

- build pass
- preview deploy pass
- production custom domain chưa chốt
- tracking cross-domain chưa chốt

## 4. Quyết định chính thức của Team 1

### 4.1 Với preview / staging

`GO`

Lý do:

- đủ để review bề mặt mới
- đủ để QA flow mới
- đủ để soát SEO/runtime trên deploy candidate

### 4.2 Với production cutover cuối cùng

`NO-GO`

Lý do:

1. `ap.omdalat.com` chưa sẵn DNS hoặc custom domain thật
2. production `omdalat.com` chưa cutover sang deploy mới
3. tracking cross-domain chưa có evidence hoàn chỉnh

## 5. Những việc còn lại trước khi Team 1 đổi sang Go production

### P0

1. Gắn DNS / custom domain cho `ap.omdalat.com`
2. Bind đúng Pages project với custom domain production
3. Cutover production `omdalat.com` sang deploy mới

### P1

4. Re-smoke production sau cutover:
   - `/vi`
   - `/en`
   - homepage
   - footer
   - join
   - contact
   - redirect legacy

### P1 tiếp

5. Xác minh:
   - canonical
   - hreflang
   - robots
   - sitemap
   - noindex

### P2

6. Gắn hoặc xác nhận tracking cross-domain:
   - `om -> ap`
   - `ap -> om`
   - bridge block
   - footer
   - CTA contextual

## 6. Điều kiện để Team 1 đổi quyết định sang Go production

Team 1 sẽ đổi từ `No-Go` sang `Go` khi cả 3 điều sau đều có:

1. Domain thật hoạt động đúng:
   - `omdalat.com`
   - `ap.omdalat.com`

2. Production surface phản ánh đúng bản build mới

3. Tracking cross-domain có evidence rõ ràng

## 7. Câu chốt

Hệ hiện tại đã sẵn để vào vòng deploy thật ở mức kỹ thuật gần cuối.

Nhưng Team 1 chưa chốt production launch chỉ vì “mọi thứ gần xong”.  
Team 1 chỉ chốt `Go` khi domain thật, surface thật và tracking thật đều đã qua cùng một lượt kiểm tra.

## 8. Snapshot kiểm tra production thật của Team 1

Bản kiểm tra production domain mới nhất nằm tại:

- `docs/OMDALAT_PRODUCTION_DOMAIN_AUDIT_2026-04-19.md`

Điểm chốt từ snapshot này:

1. `ap.omdalat.com` chưa resolve DNS
2. `omdalat.com/vi` vẫn đang hiển thị bề mặt legacy (`OMDALAT`, `docs.omdala.com`, `app.omdala.com`, `Docs / Help`)
3. production robots/sitemap chưa phản ánh kiến trúc route mới
4. preview mới đã đúng spec, nhưng production chưa cutover

Kết luận giữ nguyên:

- `Go` cho preview/staging
- `No-Go` cho production cutover cuối cùng
