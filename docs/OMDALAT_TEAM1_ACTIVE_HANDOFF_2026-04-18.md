# OMDALAT TEAM 1 — BÀN GIAO ĐANG HIỆU LỰC

Phiên bản: 1.2.0  
Trạng thái: ACTIVE  
Ngày cập nhật: 2026-04-19  
Chủ sở hữu: Team 1

## 1. Vai trò hiện tại của Team 1

Team 1 đang giữ:

- logic phát hành
- chuẩn ngôn ngữ
- báo cáo liên team
- release gate
- evidence packet
- release notes
- theo dõi blocker chéo giữa Team 2 và Team 3

## 2. Bàn giao hiện tại cho Team 2

### Đã đạt cho Round 2

- redirect canonical cho public legacy routes
- smoke locale và redirect pass khi chạy tuần tự
- typecheck `apps/web` đã có evidence

### Việc tiếp theo sau live

- dọn page/file secondary legacy còn nằm trong codebase
- dọn các page secondary còn dùng `docs-map` legacy
- giảm duplicate route/page khỏi repo

## 3. Bàn giao hiện tại cho Team 3

### Đã đạt cho Round 2

- approval persistence
- reviewed unlock
- member review queue pass `4/4` khi rerun tuần tự

### Việc tiếp theo sau live

- thay queue/store demo bằng storage bền hơn
- tiếp tục làm cứng contract giữa resources, handbook và access levels
- thêm rule chống phụ thuộc vào rerun không tuần tự ở E2E

## 4. Việc Team 1 đang giữ

- `RELEASE_CHECKLIST.md`
- `docs/OMDALAT_LIVE_ROUND2_TEAM_STATUS_2026-04-17.md`
- `docs/OMDALAT_EVIDENCE_PACKET_ROUND2_2026-04-18.md`
- `docs/OMDALAT_RELEASE_NOTES_ROUND2_2026-04-18.md`
- `docs/OMDALAT_LANGUAGE_LOCK_HANDOFF_REPORT_RELEASE_2026-04-18.md`
- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_AND_APDALAT_COPY_ROLLOUT_PLAN_2026.md`
- `docs/OMDALAT_LANGUAGE_ROLLOUT_TEAM_ASSIGNMENTS_2026-04-19.md`

## 5. Quy tắc điều phối cho các lượt rerun

- không chạy đồng thời hai suite Playwright web nếu cùng dùng cổng `3100`
- không dùng rerun nhiễu cổng làm evidence phát hành
- chỉ dùng lượt rerun tuần tự cuối cùng làm release evidence

## 6. Ghi chú Team 1

Round 2 hiện đã đủ điều kiện để đánh dấu `Go`, nhưng Team 1 vẫn giữ theo dõi hai việc sau live:

- cleanup legacy secondary surface
- storage bền cho review queue

## 7. Cập nhật bắt buộc cho Team 2 và Team 3 (lượt 2026-04-19)

- Team 2: áp dụng microcopy mới cho toàn bộ bề mặt UI public còn lại theo `UI_MICROCOPY_SYSTEM`.
- Team 3: áp dụng rewrite title/meta/H1/intro cho các route chưa rewrite theo `SEO_COPY_REWRITE_RULES`.
- Cả hai team phải báo cáo theo `COPY_ROLLOUT_PLAN`, không merge khi chưa pass review ngôn ngữ của Team 1.
