# OMDALAT TEAM 1 PROGRESS REPORT — 2026-04-22

## Trạng thái tổng quan

- Trạng thái live lõi: **GO**
- Trạng thái đóng release tổng: **IN PROGRESS**
- Mức hoàn thành toàn hệ hiện tại: **94%**

## Kết quả thực chạy hôm nay

### 1) Runtime canonical

- `https://omdalat.com/` -> `308` sang `/vi`
- `https://app.omdalat.com/vi/member/login` -> `200`
- `https://app.omdalat.com/api/support` -> `200`
- `https://omdalat.com/vi/member/operations` -> `307` sang gate trạng thái hồ sơ

### 2) Smoke live canonical

- Lệnh:
  - `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
- Report:
  - `reports/email-smoke/2026-04-22T02-03-56-746Z/summary.json`
- Kết quả:
  - `success=true`
  - `5/5 flow pass`

### 3) Team 2

- Team 1 chấp nhận báo cáo canonical re-smoke UI/public của Team 2 là **PASS**
- Trạng thái block Team 2 cho canonical UI/public: **100% done**

### 4) Build workspace

- Có lỗi cục bộ ở local workspace khi rerun `build:cf`:
  - `next-on-pages` bin link không ổn định
  - `styled-jsx` thiếu trong local dependency resolution
- Team 1 đã thêm hardening cho runner:
  - `scripts/build-cf.mjs`
  - `apps/web/package.json`
  - `apps/app/package.json`
- Trạng thái: cần một vòng chuẩn hóa dependency linking trước build round kế tiếp

## Đánh giá theo team

### Team 1

- Hoàn thành: **96%**
- Đã xong:
  - chốt live canonical bước đầu
  - cập nhật release decision
  - cập nhật smoke evidence canonical

### Team 2

- Hoàn thành:
  - **100% cho block canonical UI/public**
  - **92% cho rollout tổng**
- Còn lại:
  - báo cáo song ngữ cuối
  - rà alt text / metadata / text inventory theo mẫu 10 mục

### Team 3

- Hoàn thành: **88%**
- Đã xong:
  - app canonical runtime sống
  - support API canonical trả `200`
- Còn lại:
  - `www.app.omdalat.com` DNS
  - publish rule song ngữ cho content indexable
  - evidence noindex/runtime guard cuối

## Việc còn lại để đóng release tổng

1. Hoàn tất báo cáo song ngữ 10 mục.
2. Chuẩn hóa local build workspace để build `web/app` chạy lại sạch.
3. Chốt DNS phụ `www.app.omdalat.com`.
