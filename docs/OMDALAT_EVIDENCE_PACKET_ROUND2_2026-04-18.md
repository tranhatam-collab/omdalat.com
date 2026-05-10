# OMDALAT EVIDENCE PACKET — ROUND 2

Phiên bản: 1.1.0  
Trạng thái: Dùng cho review phát hành  
Ngày cập nhật: 2026-04-18  
Chủ sở hữu: Team 1

## 1. Mục đích

Gói bằng chứng này gom lại kết quả cuối để chốt Round 2 trước khi live.

## 2. Evidence từ Team 1

### Kiểm thử app

- `pnpm --filter @omdalat/app test:e2e -- e2e/moderation-pipeline.spec.ts`
- Kết quả: `3 passed`

### Build Cloudflare

- `pnpm --filter @omdalat/app build:cf`
- Kết quả: pass
- Build summary:
  - Middleware Functions: `1`
  - Edge Function Routes: `16`
  - `_worker.js/index.js` đã sinh tại `apps/app/.vercel/output/static/_worker.js/index.js`

- `pnpm --filter @omdalat/web build:cf`
- Kết quả: pass
- Build summary:
  - Middleware Functions: `1`
  - Edge Function Routes: `60`
  - `_worker.js/index.js` đã sinh tại `apps/web/.vercel/output/static/_worker.js/index.js`

### Ghi chú Team 1

- app member gate đã có `/member/login` và `/member/application-status`
- app nav đã được kéo về các route thật
- tài liệu phát hành đã được chuẩn hóa về tiếng Việt có dấu đầy đủ

## 3. Evidence từ Team 2

### Commit đã bàn giao

- `5632700` — `team2: enforce legacy public route redirects and smoke assertions`

### Kiểm thử web

- `pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts`
- Kết quả dùng cho release gate: `54 passed`

Ghi chú:

- Có một lượt rerun lỗi vì hai suite Playwright web cùng tranh cổng `3100`.
- Evidence hợp lệ cho release gate là lượt rerun tuần tự cuối cùng đã pass.

## 4. Evidence từ Team 3

### Commit đã bàn giao

- `af2374e` — `test(team3): fix approval persistence and reviewed unlock`

### Kiểm thử member flow

- `pnpm --filter @omdalat/web test:e2e -- e2e/member-review-queue.spec.ts`
- Kết quả dùng cho release gate: `4 passed`

Ghi chú:

- Một lượt rerun nhiễu do chồng cổng với suite smoke đã bị loại khỏi release evidence.
- Lượt rerun tuần tự cuối cùng pass đủ `4/4`.

## 5. Evidence về trạng thái kỹ thuật

- reviewed unlock hoạt động lại đúng
- application status phản ánh đúng trạng thái hồ sơ
- locale smoke cho `/vi` và `/en` pass
- redirect canonical legacy pass trong smoke
- artifact Cloudflare cho web và app đã được sinh lại sau thay đổi mới nhất

## 6. Lệnh deploy thật đã khóa

```bash
wrangler pages deploy apps/web/.vercel/output/static --project-name omdalat-web --branch main
wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main
```

## 7. Điều còn theo dõi sau live

- dọn page/file secondary còn giữ logic legacy trong codebase
- dọn các tham chiếu `docs-map` legacy còn nằm ở lớp secondary
- thay review queue demo bằng storage bền hơn khi mở beta rộng hơn

## 8. Kết luận evidence

Với evidence cuối cùng đang có:

- app moderation pass
- member review queue pass
- smoke locales pass
- build Cloudflare pass cho cả web và app

Round 2 đủ căn cứ để đánh dấu **Go** cho nhịp live hiện tại.
