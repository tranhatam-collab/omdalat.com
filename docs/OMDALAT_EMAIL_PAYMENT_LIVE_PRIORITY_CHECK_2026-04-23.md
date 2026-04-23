# OMDALAT EMAIL + PAYMENT LIVE PRIORITY CHECK — 2026-04-23

Version: v1.0.0  
Status: ACTIVE  
Owner: Team 1  
Scope: live email smoke, payment readiness, team reminder priority

---

## 0) Kết luận nhanh

Email lane **đã có pass mới trong phiên này** sau khi Team 3 xử lý được blocker dependency.

Mail sender/relay external cho `omdalat.com` cũng đã có proof xanh ở lớp Mailcow + SendGrid provider acceptance.

Payment lane đã được Team 3 khóa rõ là `PHASE_2_NOT_IN_SCOPE` cho release hiện tại.

Payment activation external vẫn là `LOCK_RETAINED_WITH_REASON` và **chưa được claim live**.

Để live đồng bộ, Team 3 cần ưu tiên đóng hai việc:

1. giữ email smoke live ở trạng thái `DONE` với evidence mới nhất,
2. giữ release note payment Phase 2 để không ai hiểu nhầm đây là lane đã live.
3. nếu đưa payment activation trở lại scope live, phải đóng đủ proof external trước khi Team 1 đổi trạng thái.

---

## 1) Email live check

### Lệnh đã chạy

```bash
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
```

### Kết quả trong phiên này

Status: `DONE`

Report blocker cũ:

```text
reports/email-smoke/2026-04-23T05-06-44-898Z
```

Lỗi:

```text
Cannot find module 'apps/web/node_modules/@playwright/test/index.js'
```

Report pass mới:

```text
reports/email-smoke/2026-04-23T05-34-46-072Z/summary.json
reports/email-smoke/2026-04-23T05-35-37-961Z/summary.json
```

Kết quả pass mới:

- `success=true`
- `runtimeTarget=live`
- `assertionMode=runtime`
- `webOrigin=https://omdalat.com`
- `appOrigin=https://app.omdalat.com`
- `5/5 flow pass`: contact, support, join, magic link, email verification

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

Email lane hiện đã `DONE`. Chỉ cần rerun lại nếu có thay đổi runtime/email sau mốc pass mới.

```bash
pnpm install --offline
test -e apps/web/node_modules/@playwright/test/index.js
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
```

Team 3 chỉ giữ email lane `DONE` khi report mới sau `2026-04-23T05-06-44-898Z` có:

- `success=true`
- `5/5 flow pass`
- target là `live`
- origin là `https://omdalat.com` và `https://app.omdalat.com`

---

## 2) Payment live check

### Kết quả rà code active

Status: `PHASE_2_NOT_IN_SCOPE`

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

Team 3 đã chốt:

```text
Payment = Phase 2 / not in scope cho release hiện tại
```

Release note:

```text
docs/TEAM3_RELEASE_NOTE_EMAIL_PAYMENT_2026-04-23.md
```

Vì vậy payment **không còn là blocker live hiện tại**, nhưng cũng **không được ghi là checkout/payment đã live**.

### External payment activation status

Status: `LOCK_RETAINED_WITH_REASON`

Proof mail external:

```text
docs/OMDALAT_EXTERNAL_MAIL_PAYMENT_ACTIVATION_STATUS_2026-04-23.md
```

Mail sender/relay đã xanh:

- `pay@omdalat.com` active alias -> `support@omdalat.com`
- `billing@omdalat.com` active alias -> `support@omdalat.com`
- `support@omdalat.com` là mailbox thật
- `noreply@omdalat.com` là mailbox thật
- 8/8 outbound smoke được SendGrid nhận `250 Ok`
- Mailcow queue rỗng

Nhưng payment live chưa được claim vì còn thiếu:

- `MAIL_API_BASE_URL`
- `MAIL_API_KEY`
- `MAIL_API_WORKSPACE_ID`
- `PAY_EMAIL_ADAPTER_INTERNAL_KEY`
- `/v1/send` accepted proof
- payment provider ref
- mail `messageId`
- D1/canonical evidence row
- inbox proof thật từ hai Gmail
- pay gate unlock khỏi `LOCK_RETAINED_WITH_REASON`

`BCC` vẫn `OFF`.

### Lệnh Team 3 cần bổ sung nếu payment là scope live

```bash
npm run payment:smoke:live
```

Nếu script chưa tồn tại, Team 3 phải tạo script tương đương và ghi report vào:

```text
reports/payment-smoke/YYYY-MM-DDTHH-mm-ss/
```

Ghi chú: lệnh trên chỉ áp dụng cho Phase 2 hoặc khi Founder đưa payment trở lại scope live.

---

## 3) Nhắc team theo mức ưu tiên

### Team 3 — P0

Email:

- giữ report live smoke mới `5/5` trong evidence,
- rerun lại nếu runtime/email thay đổi.

Payment:

- đã xác nhận `Phase 2 / not in scope`,
- giữ trạng thái này trong release note,
- không thêm CTA/payment UI public ở release hiện tại,
- không claim payment live cho tới khi external activation proof đầy đủ.

### Team 1 — P0

- không chốt release tổng là `DONE` nếu email chưa có smoke mới hoặc chưa có quyết định chấp nhận evidence pass gần nhất,
- không để payment bị hiểu nhầm là đã live nếu thực tế đang là Phase 2.

### Team 2 — P1

- chỉ cần phối hợp UI nếu Team 3 xác nhận payment in-scope,
- nếu payment out-of-scope thì không thêm CTA/payment UI public.

---

## 4) Go / No-Go hiện tại cho hai lane

Email:

- Runtime live vẫn đang phản hồi đúng ở các endpoint cơ bản.
- Smoke E2E mới nhất trong phiên này: **GO**.
- Evidence pass mới nhất: `reports/email-smoke/2026-04-23T05-35-37-961Z/summary.json`.

Payment:

- **Không phải blocker cho live hiện tại** vì Team 3 đã khóa `PHASE_2_NOT_IN_SCOPE`.
- **NO-GO trong Phase 2** nếu sau này đưa payment vào scope mà chưa có checkout/payment smoke evidence.
- **NO-GO cho payment activation external** cho tới khi đủ bindings, provider ref, D1 row và inbox proof.

---

## 5) Câu nhắc gửi team

Team 3 đã đóng lại email live smoke `5/5`, Team Email SMTP đã có proof mail sender/relay xanh, và payment vẫn phải giữ rõ là chưa live. Không còn nhắc payment như blocker live web hiện tại nếu nó ở Phase 2, nhưng tuyệt đối không claim payment live cho tới khi đủ proof external.
