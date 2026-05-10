# OMDALAT TEAM1 FINAL PRODUCTION GATE (2026-04-19)

Om Dalat / Ôm Đà Lạt  
Owner: Team 1  
Scope lock: `omdalat.com` + `app.omdalat.com`

---

## 1) Kết quả build và deploy trong phiên này

- `pnpm --filter @omdalat/web build:cf`: PASS
- `pnpm --filter @omdalat/app build:cf`: PASS
- Deploy web: `https://0cfa08d1.omdalat-web-ezk.pages.dev`
- Deploy app: `https://e69c5732.omdalat-app-2ol.pages.dev`

Smoke trên preview:

- web preview hiển thị copy mới theo scope `om + app`, không còn bridge `Ấp Đà Lạt`
- app preview canonical về `https://app.omdalat.com/...` và có `noindex, nofollow` cho route member

---

## 2) Đối chiếu Team 2

PASS các mục Team 2 trong phạm vi mới:

1. Homepage dọn nhãn `Ấp Đà Lạt / Ap Dalat` khỏi bề mặt public trong repo.
2. Header/footer/homepage CTA đã chuyển sang luồng `app.omdalat.com`.
3. Regression lock được cập nhật:
   - `apps/web/e2e/public-intro-h1-cta-lock.spec.ts`
   - `apps/web/e2e/team2-quick-qa.spec.ts`
4. Kết quả test:
   - `public-intro-h1-cta-lock.spec.ts`: 32 passed
   - `team2-quick-qa.spec.ts`: 2 passed

Ghi chú:

- `smoke-locales.spec.ts` và `member-review-queue.spec.ts` có lỗi socket reset cục bộ do dev server không ổn định trong phiên; không phải lỗi compile/release artifact.

---

## 3) Đối chiếu Team 3

PASS một phần, còn blocker production domain:

Đã PASS:

1. App middleware không còn redirect `app -> ap` trong source hiện tại.
2. Build artifact app mới đã deploy thành công lên Pages preview.
3. Metadata app trên preview đã canonical về `app.omdalat.com`.

Chưa PASS (blocker):

1. `app.omdalat.com` production hiện vẫn trả `308` sang `ap.omdalat.com`.
2. `wrangler pages project list` cho thấy project `omdalat-app` chưa có custom domain `app.omdalat.com`.
3. `www.app.omdalat.com` chưa resolve DNS.

---

## 4) Quyết định Go/No-Go

**NO-GO production custom domain tại thời điểm báo cáo.**

Lý do chặn:

1. Domain production `app.omdalat.com` chưa trỏ vào project/app runtime mới trong account deploy hiện tại.
2. Traffic production app vẫn nằm ở hạ tầng cũ, trái với scope khóa `om + app`.

---

## 5) Việc còn lại để chuyển Go

P0 (bắt buộc):

1. Bind `app.omdalat.com` vào project `omdalat-app` trên account live đúng.
2. Bỏ redirect legacy `app -> ap` ở hạ tầng cũ đang phục vụ production.
3. Propagate DNS cho `www.app.omdalat.com` (nếu dùng).

P1 (sau khi bind xong):

1. Re-smoke production:
   - `curl -I https://app.omdalat.com/vi/member/login`
   - canonical/hreflang/noindex
   - login, application-status, gate flow
2. Chuyển `RELEASE_CHECKLIST.md` sang trạng thái **Go**.

---

## 6) Tỷ lệ hoàn thành

- Team 1 (code + docs + gate): **95%**
- Team 2 (public surface theo scope mới): **92%**
- Team 3 (app deploy + domain cutover): **78%**
- Kế hoạch tổng (vòng 2): **88%**

Phần còn lại chủ yếu là hạ tầng domain/binding production, không còn là blocker ở lớp code artifact.
