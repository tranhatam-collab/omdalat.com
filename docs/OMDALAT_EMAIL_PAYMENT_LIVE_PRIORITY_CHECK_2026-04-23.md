# OMDALAT EMAIL + PAYMENT LIVE PRIORITY CHECK — 2026-04-23

Version: v1.0.0  
Status: ACTIVE  
Owner: Team 1  
Scope: live email smoke, payment readiness, team reminder priority

---

## 0) Kết luận nhanh

Email lane **chưa thể coi là pass mới trong phiên này** vì local workspace thiếu link dependency `@playwright/test` trong `apps/web/node_modules`.

Payment lane **chưa có bằng chứng triển khai active** trong code/runtime hiện tại. Repo chưa có script test payment, chưa có route/endpoint checkout active, và chưa có Stripe/payment integration file trong vùng code active đã rà.

Để live đồng bộ, Team 3 cần ưu tiên đóng hai việc:

1. sửa dependency linking để chạy lại live email smoke,
2. hoặc implement/khóa rõ payment lane: `done`, `not in scope`, hoặc `phase 2`, có evidence và release note.

---

## 1) Email live check

### Lệnh đã chạy

```bash
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
```

### Kết quả trong phiên này

Status: `BLOCKED_LOCAL_DEPENDENCY`

Report mới:

```text
reports/email-smoke/2026-04-23T05-06-44-898Z
```

Lỗi:

```text
Cannot find module 'apps/web/node_modules/@playwright/test/index.js'
```

### Live runtime spot check

```bash
curl -I -sS https://omdalat.com/
curl -I -sS https://app.omdalat.com/vi/member/login
curl -sS https://omdalat.com/api/mail-smoke/outbox
```

Kết quả:

- `https://omdalat.com/` trả `308` sang `https://omdalat.com/vi`
- `https://app.omdalat.com/vi/member/login` trả `200`
- `x-robots-tag: noindex, nofollow` vẫn đúng trên app member login
- `https://omdalat.com/api/mail-smoke/outbox` trả `{"ok":true,"count":0,"outbox":[]}`

### Evidence email pass gần nhất

Email lane đã có pass trước đó:

```text
reports/email-smoke/2026-04-22T02-03-56-746Z/summary.json
```

Kết quả pass trước:

- `success=true`
- `5/5 flow pass`
- `runtimeTarget=live`
- `assertionMode=runtime`

### Việc Team 3 cần làm ngay

```bash
pnpm install --offline
test -e apps/web/node_modules/@playwright/test/index.js
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
```

Team 3 chỉ được báo email lane `DONE` khi có report mới sau `2026-04-23T05-06-44-898Z` với:

- `success=true`
- `5/5 flow pass`
- target là `live`
- origin là `https://omdalat.com` và `https://app.omdalat.com`

---

## 2) Payment live check

### Kết quả rà code active

Status: `MISSING_ACTIVE_PAYMENT_LANE`

Hiện chưa thấy:

- script payment test trong root `package.json`
- script payment test trong `apps/web/package.json`
- script payment test trong `apps/app/package.json`
- file active liên quan `stripe`, `checkout`, `payment`, `billing` trong các vùng code chính
- endpoint checkout/payment active để smoke live

Các dấu hiệu hiện có chỉ ở mức tài liệu/schema:

- `payment_status` trong schema docs
- một số ghi chú `payment phase 2`

### Quyết định cần chốt

Team 3 phải chốt một trong hai hướng:

1. **Payment là Phase 2 / not in scope cho live hiện tại**  
   Khi đó phải ghi rõ trong release note và không gọi đây là blocker live hiện tại.

2. **Payment là bắt buộc cho live đồng bộ**  
   Khi đó Team 3 phải implement tối thiểu:
   - route tạo checkout session,
   - webhook hoặc callback xử lý trạng thái,
   - test mode keys/secrets,
   - smoke test live hoặc staging,
   - release evidence.

### Lệnh Team 3 cần bổ sung nếu payment là scope live

```bash
npm run payment:smoke:live
```

Nếu script chưa tồn tại, Team 3 phải tạo script tương đương và ghi report vào:

```text
reports/payment-smoke/YYYY-MM-DDTHH-mm-ss/
```

---

## 3) Nhắc team theo mức ưu tiên

### Team 3 — P0

Email:

- sửa local dependency linking,
- rerun `mail:smoke:e2e` live,
- nộp report mới `5/5`.

Payment:

- xác nhận scope release,
- nếu in-scope thì implement/test,
- nếu out-of-scope thì ghi rõ `Phase 2` trong release note.

### Team 1 — P0

- không chốt release tổng là `DONE` nếu email chưa có smoke mới hoặc chưa có quyết định chấp nhận evidence pass gần nhất,
- không để payment bị hiểu nhầm là đã xong nếu thực tế chưa có lane active.

### Team 2 — P1

- chỉ cần phối hợp UI nếu Team 3 xác nhận payment in-scope,
- nếu payment out-of-scope thì không thêm CTA/payment UI public.

---

## 4) Go / No-Go hiện tại cho hai lane

Email:

- Runtime live vẫn đang phản hồi đúng ở các endpoint cơ bản.
- Smoke E2E mới nhất trong phiên này: **NO-GO do local dependency blocker**.
- Evidence pass gần nhất vẫn dùng được để tham chiếu, nhưng cần rerun sau khi sửa dependency nếu muốn đóng release tổng.

Payment:

- **NO-GO nếu payment là scope bắt buộc của live đồng bộ.**
- **Không phải blocker nếu Team 3/Founder khóa payment là Phase 2.**

---

## 5) Câu nhắc gửi team

Team 3 cần đóng ngay email + payment lane trước khi Team 1 chốt release tổng. Email phải rerun live smoke `5/5` sau khi sửa dependency link. Payment hiện chưa có lane active; team phải chốt rõ là Phase 2 hoặc implement đủ checkout/test/report nếu coi là scope live.
