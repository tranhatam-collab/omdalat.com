# OMDALAT EMAIL SMOKE LIVE EVIDENCE (2026-04-20 → 2026-04-21)

## Mục tiêu

1. Chạy `mail:smoke:e2e` trên target runtime live (không dùng `next dev` local).
2. Gắn report pass `5/5` vào release evidence của `omdalat.com`.
3. Chuyển email lane từ `partial` sang `done` sau khi pass.

## Kết quả trước đó (2026-04-20)

- Trạng thái: **FAIL**
- Report:
  - `/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-20T08-11-02-413Z`
- Lỗi chính:
  - `Unable to clear smoke outbox: 404`

## Hành động xử lý (2026-04-21)

1. Mở lại endpoint smoke outbox trên runtime live web (`/api/_mail-smoke/outbox` trả `200`).
2. Sửa `MAIL_API_URL` secret cho `omdalat-web` và `omdalat-app` về base endpoint đúng.
3. Chạy lại build + deploy Cloudflare Pages:
   - Web: `https://1bd018f2.omdalat-web-ezk.pages.dev`
   - App: `https://d86d73c0.omdalat-app-2ol.pages.dev`
4. Nâng script smoke để chạy được trên live runtime không phụ thuộc `next dev` local:
   - `assertionMode: runtime` cho live target
   - kiểm tra đủ 5 flow từ runtime thật

## Lệnh pass chuẩn canonical mới nhất

```bash
SMOKE_RUNTIME_TARGET=live \
SMOKE_WEB_ORIGIN=https://omdalat.com \
SMOKE_APP_ORIGIN=https://app.omdalat.com \
npm run mail:smoke:e2e
```

## Evidence pass

- Report pass:
  - `/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-22T02-03-56-746Z/summary.json`
- Trạng thái:
  - `success: true`
  - `flows: 5/5` (`contact`, `support`, `join`, `magic_link`, `email_verification`)
  - `runtimeTarget: live`
  - `appOrigin: https://app.omdalat.com`

## Quyết định lane

- Email lane: **`done`**
- Đã đạt yêu cầu:
  - chạy live target
  - có report pass `5/5`
  - đã gắn vào release evidence
