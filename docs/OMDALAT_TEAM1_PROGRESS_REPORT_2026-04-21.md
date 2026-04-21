# OMDALAT TEAM 1 PROGRESS REPORT — 2026-04-21

## Trạng thái tổng quan

- Trạng thái release hiện tại: **NO-GO (cho cutover domain canonical cuối)**
- Mức hoàn thành toàn hệ (ước lượng Team 1): **89%**
- Gate mới đang áp dụng: `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND` (mandatory trước live)

## Kết quả thực chạy phiên này

### 1) Runtime/domain

- `https://omdalat.com`
  - `/` redirect đúng về `/vi`
  - `GET/DELETE /api/_mail-smoke/outbox` trả `200`
- `https://app.omdalat.com`
  - `GET /vi/member/login` trả `200` + `x-robots-tag: noindex, nofollow`
  - nhưng `POST /api/support` trên host này còn lỗi `502`
- `https://d86d73c0.omdalat-app-2ol.pages.dev`
  - app runtime hoạt động ổn định, `POST /api/support` trả `200`

### 2) Build/deploy

- `pnpm --filter @omdalat/web build:cf`: **PASS**
- `pnpm --filter @omdalat/app build:cf`: **PASS**
- Deploy Cloudflare Pages mới nhất:
  - Web: `https://1bd018f2.omdalat-web-ezk.pages.dev`
  - App: `https://d86d73c0.omdalat-app-2ol.pages.dev`

### 3) Email smoke lane

- Đã chạy live runtime (không dùng `next dev` local):
  - `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://d86d73c0.omdalat-app-2ol.pages.dev npm run mail:smoke:e2e`
- Report pass:
  - `reports/email-smoke/2026-04-21T13-22-50-789Z/summary.json`
- Kết quả: **`success=true`, 5/5 flow pass**
- Lane email: **`done`**

## Đánh giá theo team

### Team 1 (Foundation / Content / SEO / Product Logic)

- Hoàn thành: **93%**
- Đã khóa:
  - release gate + email evidence live
  - update checklist và trạng thái lane
  - build/deploy verification thực chạy
  - universal bilingual execution plan:
    - `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`
    - `docs/OMDALAT_UNIVERSAL_BILINGUAL_EXECUTION_PLAN_2026-04-21.md`
    - `docs/OMDALAT_UNIVERSAL_BILINGUAL_PRELIVE_REPORT_2026-04-21.md` (interim)
    - `docs/OMDALAT_LANGUAGE_ROLLOUT_TEAM_ASSIGNMENTS_2026-04-19.md` (đã nối source chuẩn mới)
  - release checklist đã chặn Go nếu thiếu báo cáo song ngữ 10 mục
  - validator locale đã nối vào build gate:
    - `scripts/validate-web-locales.mjs`
    - `package.json`
    - `apps/web/package.json`

### Team 2 (Design / Frontend / Public Web)

- Hoàn thành: **87%**
- Đã pass các lock test public trước đó.
- Còn lại:
  - hoàn tất bảng kiểm kê text node/metadata/alt cho toàn bộ page public theo universal command
  - xử lý toàn bộ lỗi P0 ngôn ngữ song ngữ (nếu còn) và nộp evidence pass 4 lớp

### Team 3 (CMS / Member / Backend / Runtime / Deploy)

- Hoàn thành: **78%**
- Đã có:
  - app/pages runtime pass trên `*.pages.dev`
  - build lane `app build:cf` pass
- Còn lại (P0):
  - chốt mapping runtime canonical cho `app.omdalat.com` để API lane (`/api/support`) không còn `502`.
  - khóa rule publish content indexable theo đủ locale bắt buộc (VI + EN)
  - nộp evidence noindex member/internal không vỡ sau rewrite text

## Việc còn lại để bấm live ngay

1. Team 3: fix dứt điểm runtime host `app.omdalat.com` (UI + API cùng chuẩn, không lệch host).
2. Team 1 + Team 3: rerun smoke live trên cặp canonical cuối:
   - `SMOKE_WEB_ORIGIN=https://omdalat.com`
   - `SMOKE_APP_ORIGIN=https://app.omdalat.com`
3. Team 2: gửi re-smoke UI/public cuối trên domain canonical sau cutover.
4. Team 1: tổng hợp báo cáo song ngữ bắt buộc đủ 10 mục trước live.

## Quyết định hiện tại

- **NO-GO** cho cutover cuối ngay lúc này vì `app.omdalat.com` chưa pass API lane.
- Khi Team 3 xử lý xong `app.omdalat.com/api/support` -> `200` và 3 team nộp đủ evidence song ngữ P0, Team 1 sẽ chốt lại Go/No-Go production cuối trong cùng vòng.
