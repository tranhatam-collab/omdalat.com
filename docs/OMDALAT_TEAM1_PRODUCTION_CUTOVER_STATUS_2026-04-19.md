# OMDALAT TEAM1 PRODUCTION CUTOVER STATUS (2026-04-19)

Phiên bản: 1.0.0  
Trạng thái: NO-GO (custom-domain cutover)  
Owner: Team 1  

## 1) Việc đã hoàn tất trong phiên này

- Đã bind Pages domain:
  - `omdalat.com` -> project `omdalat-web` (account `f3f9...`)
  - `ap.omdalat.com` -> project `omdalat-app` (account `f3f9...`)
- Đã deploy web production branch:
  - `https://af15d288.omdalat-web-ezk.pages.dev`
- Đã fix build blocker app (`SIGSEGV`) bằng cách khóa script:
  - `apps/app/package.json`: `build:cf` dùng `NEXT_DISABLE_BUILD_WORKER=1`
- Đã build + deploy app production branch:
  - `https://135db77f.omdalat-app-2ol.pages.dev`

## 2) Trạng thái domain hiện tại

- `omdalat.com` (Pages domain status): `pending`
- `ap.omdalat.com` (Pages domain status): `pending`
- API message cho cả hai domain: `CNAME record not set`
- `app.omdalat.com`: đang `308` sang `https://ap.omdalat.com/` (đúng alias hướng canonical)

## 3) Smoke kết quả

- Preview web mới: PASS nội dung mới (Ôm Đà Lạt / bridge / footer / copy lock)
- Preview app mới: PASS deploy
- Production host:
  - `omdalat.com/vi`: vẫn đang trả bề mặt legacy (OMDALAT, links `docs.omdala.com`, `app.omdala.com`)
  - `ap.omdalat.com`: chưa resolve DNS

## 4) Blocker thực tế đang chặn Go

Blocker duy nhất còn lại là DNS CNAME chưa trỏ đúng vào Pages subdomain mới.

## 5) Cần làm ngay để chốt Go

Tại zone `omdalat.com` (account `f3f9...`), cập nhật DNS:

1. Apex `omdalat.com`  
   - CNAME (flatten) -> `omdalat-web-ezk.pages.dev`
2. Subdomain `ap.omdalat.com`  
   - CNAME -> `omdalat-app-2ol.pages.dev`

Sau đó đợi propagate và rerun:

- `curl -I https://omdalat.com/vi`
- `curl -I https://ap.omdalat.com`
- `curl -I https://app.omdalat.com` (phải giữ `308` sang `ap`)
- smoke copy legacy trên `omdalat.com/vi` (không còn `OMDALA`, `docs.omdala.com`, `app.omdala.com`)

## 6) Quyết định Team 1

Hiện tại: **NO-GO** cho cutover production domain.  
Điều kiện để đổi sang **GO**: 2 bản ghi CNAME trên được áp đúng và smoke production pass.
