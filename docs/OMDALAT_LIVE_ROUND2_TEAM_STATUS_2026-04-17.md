# OMDALAT LIVE ROUND 2 — BÁO CÁO TRẠNG THÁI TEAM

Phiên bản: 2.1.0  
Trạng thái: Bản báo cáo chính thức của Team 1  
Ngày cập nhật: 2026-04-18  
Chủ sở hữu: Team 1

## 1. Mục đích

Đây là bản chốt cho cả 3 team trước khi live Round 2:

- xác nhận team nào đã đạt
- xác nhận blocker nào đã đóng
- tách lỗi điều phối test khỏi lỗi sản phẩm thật
- chốt `Go / No-Go`

## 2. Kết quả đã xác minh

### Team 1 tự xác minh

- `pnpm --filter @omdalat/app test:e2e -- e2e/moderation-pipeline.spec.ts` → `3 passed`
- `pnpm --filter @omdalat/app build:cf` → pass
- `pnpm --filter @omdalat/web build:cf` → pass

### Handoff đã xác minh lại từ team liên quan

- Team 3: `af2374e` — `test(team3): fix approval persistence and reviewed unlock`
- Team 3: `pnpm --filter @omdalat/web test:e2e -- e2e/member-review-queue.spec.ts` → `4 passed` khi rerun tuần tự
- Team 2: `5632700` — `team2: enforce legacy public route redirects and smoke assertions`
- Team 2: `pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts` → `54 passed` khi rerun tuần tự
- Team 2: `apps/web` typecheck → pass theo handoff đã bàn giao

## 3. Đánh giá theo team

### Team 1

Trạng thái: Đạt

Đã làm:

- sửa app gate để `/member/login` và `/member/application-status` có bề mặt thật
- đồng bộ app Playwright host với runtime dev để moderation E2E đo đúng
- rerun Cloudflare build cho cả web và app
- cập nhật checklist, release notes và evidence packet theo chuẩn ngôn ngữ mới

### Team 2

Trạng thái: Đạt cho Round 2

Đã làm:

- giữ redirect canonical cho route legacy public
- giữ smoke assertions cho locale và redirect
- pass lại smoke locales khi chạy đúng tuần tự

Ghi chú:

- cleanup xóa hết page/file legacy khỏi repo vẫn là việc sau live

### Team 3

Trạng thái: Đạt cho Round 2

Đã làm:

- giữ approval persistence
- giữ reviewed unlock
- pass lại review queue `4/4` khi chạy đúng tuần tự

Ghi chú:

- queue/store vẫn là storage demo; cần thay bằng storage bền hơn trước beta rộng hơn

## 4. Tình trạng kỹ thuật hiện tại

### Public surface

- route chính `/vi` và `/en` pass smoke
- redirect legacy pass
- canonical surface đủ điều kiện cho Round 2

### Member surface

- app moderation pass
- reviewed unlock pass
- application status phản ánh đúng trạng thái

### Build surface

- artifact Cloudflare đã sinh lại cho cả web và app
- `_worker.js` và `nop-build-log.json` đều có mặt ở cả hai project

## 5. Ghi chú điều phối test

Trong lúc kiểm tra, có một lượt rerun web bị lỗi vì hai suite Playwright cùng dùng cổng `3100`.

Kết luận:

- đó là lỗi điều phối test
- không dùng lượt đó làm release evidence
- evidence hợp lệ là các lượt rerun tuần tự cuối cùng

## 6. Go / No-Go

### Build

Go

### Redirect và public routing

Go

### Member reviewed unlock

Go

### Cleanup legacy trong repo

Không chặn Round 2, nhưng vẫn là follow-up bắt buộc sau live

## 7. Kết luận

Round 2 **đủ điều kiện kỹ thuật để live** theo phạm vi hiện tại.

Nhịp tiếp theo:

1. deploy Cloudflare Pages theo lệnh đã khóa
2. giữ cleanup legacy ở sprint riêng
3. đưa review queue sang storage bền hơn trước beta rộng hơn
