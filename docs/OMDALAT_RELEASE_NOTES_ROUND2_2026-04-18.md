# OMDALAT RELEASE NOTES — ROUND 2

Phiên bản: 1.1.0  
Trạng thái: Sẵn sàng dùng cho review phát hành  
Ngày cập nhật: 2026-04-18  
Chủ sở hữu: Team 1

## 1. Tổng quan

Round 2 chốt bốn việc chính:

- khóa lại public redirect và locale smoke cho web
- làm chắc reviewed unlock và review queue của member flow
- đưa app member gate về trạng thái kiểm thử được và build được trên Cloudflare
- cập nhật lại toàn bộ tài liệu phát hành theo chuẩn tiếng Việt có dấu đầy đủ

## 2. Thay đổi chính

### Team 1 — release gate, app member flow, và artifact

- thêm page `/member/login` và `/member/application-status` cho app để luồng gate không rơi vào khoảng trống
- chỉnh app navigation về đúng các route đang tồn tại thật
- khóa lại app moderation E2E bằng cách đồng bộ host test với runtime dev của Next
- chạy lại `build:cf` cho cả web và app, xác nhận đã sinh `_worker.js` và `nop-build-log.json`
- cập nhật `RELEASE_CHECKLIST.md`, evidence packet, release notes và báo cáo team bằng tiếng Việt chuẩn

### Team 2 — public redirect và locale routing

- giữ redirect canonical cho toàn bộ route legacy public
- giữ smoke assertions cho `/vi` và `/en`
- xác nhận các route chính và route redirect hoạt động khi chạy tuần tự

### Team 3 — reviewed unlock và review queue

- approval persistence hoạt động lại đúng
- reviewed unlock mở đúng sau khi duyệt
- review queue pass lại `4/4` khi chạy tuần tự, không chồng cổng với suite khác

## 3. Kết quả kỹ thuật đã chốt

- `pnpm --filter @omdalat/app test:e2e -- e2e/moderation-pipeline.spec.ts` → `3 passed`
- `pnpm --filter @omdalat/web test:e2e -- e2e/member-review-queue.spec.ts` → `4 passed`
- `pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts` → `54 passed`
- `pnpm --filter @omdalat/web build:cf` → pass
- `pnpm --filter @omdalat/app build:cf` → pass

## 4. Ghi chú quan trọng

- App cần edge runtime để `next-on-pages` đi hết toàn bộ route động.
- Trong quá trình kiểm tra, có một lượt rerun web bị sai do hai suite Playwright cùng tranh cổng `3100`; kết quả dùng cho release gate là lượt rerun tuần tự đã pass.
- Codebase vẫn còn một số page/file secondary mang logic legacy để phục vụ redirect và cleanup hậu live. Đây là follow-up sau Round 2, không dùng làm evidence chính cho canonical surface.

## 5. Chưa nằm trong round này

- dọn hết toàn bộ page secondary cũ khỏi repo
- thay review queue demo bằng storage bền hơn
- dọn các tham chiếu `docs-map` legacy còn nằm ở lớp secondary

## 6. Kết luận

Round 2 đã đạt mức đủ để chuẩn bị live:

- build gần live có artifact rõ
- member flow chính đã pass lại
- locale smoke đã pass lại
- tài liệu phát hành đã đồng bộ ngôn ngữ

Nhịp tiếp theo là deploy theo lệnh Cloudflare Pages đã khóa trong checklist và giữ cleanup hậu live ở sprint riêng.
