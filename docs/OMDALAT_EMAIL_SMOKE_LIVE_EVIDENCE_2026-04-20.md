# OMDALAT EMAIL SMOKE LIVE EVIDENCE (2026-04-20)

## Mục tiêu phiên này

1. Chạy `mail:smoke:e2e` trên target runtime live (không dùng `next dev` local).
2. Thu thập evidence để gắn vào release gate của `omdalat.com`.
3. Chỉ chuyển email lane sang `done` sau khi pass đủ `5/5`.

## Lệnh đã chạy (live target)

```bash
SMOKE_RUNTIME_TARGET=live \
SMOKE_WEB_ORIGIN=https://omdalat.com \
SMOKE_APP_ORIGIN=https://omdalat-app.pages.dev \
npm run mail:smoke:e2e
```

## Kết quả

- Trạng thái: **FAIL** (chưa đạt `5/5`).
- Report runtime:
  - `/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-20T08-11-02-413Z`
- Lỗi chặn:
  - `Unable to clear smoke outbox: 404`

## Bằng chứng bổ sung đã kiểm

- `GET https://omdalat.com/api/_mail-smoke/outbox` trả `404` (route outbox chưa khả dụng trên runtime web đang live).
- `curl -I https://app.omdalat.com/vi/member/login` trả `308` sang `https://ap.omdalat.com/...` (domain app canonical chưa đúng).
- `curl -I https://omdalat-app.pages.dev/vi/member/login` trả `200` (ứng dụng chạy ở pages.dev, chưa phản ánh đúng host production yêu cầu).
- Đã cập nhật lại secrets mail cho Pages projects trong account hiện hành, nhưng do runtime/domain mapping chưa đúng nên chưa đủ điều kiện pass smoke `5/5`.

## Quyết định lane

- Email lane giữ nguyên: **`partial`**.
- Chưa đủ điều kiện chuyển `done` vì chưa có report pass `5/5` trên live target.

## Điều kiện để chốt `done`

1. Chốt domain canonical đúng vai trò:
   - `omdalat.com` = public web
   - `app.omdalat.com` = ứng dụng member
   - `ap.omdalat.com` = editorial độc lập (ngoài repo này)
2. Đảm bảo runtime web live có outbox endpoint:
   - `GET/DELETE https://omdalat.com/api/_mail-smoke/outbox` trả `200`.
3. Chạy lại `mail:smoke:e2e` ở chế độ live target và đạt đủ `5/5`.
4. Cập nhật release evidence và đổi lane `partial -> done`.
