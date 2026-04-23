# TEAM 3 FINAL CLOSURE — 2026-04-23

Om Dalat / Ôm Đà Lạt

Status: DONE_CLOSED
Owner: Team 3
Reviewer: Team 1
Scope: app runtime, Cloudflare runtime map, member guard, email smoke, payment scope

---

## 0) Kết luận

Team 3 đã hoàn thành scope Om/app cho live bước đầu.

Team 3 không còn là blocker release hiện tại.

---

## 1) Evidence đã pass

- `pnpm --filter @omdalat/web build:cf`: PASS
- `pnpm --filter @omdalat/app build:cf`: PASS
- `npm run cf:runtime-map:check`: PASS ở runtime-only mode
- `www.app.omdalat.com` redirect về `app.omdalat.com`: PASS
- `app.omdalat.com/vi/member/login`: PASS, có `x-robots-tag: noindex, nofollow`
- member reviewed gate: PASS
- support API lane: PASS
- email live smoke runtime: PASS `5/5`
  - `reports/email-smoke/2026-04-23T12-45-14-325Z/summary.json`

---

## 2) Payment

Payment web live hiện tại giữ trạng thái:

```text
PHASE_2_NOT_IN_SCOPE
```

Pay repo-side form và email templates đã xanh ở lớp repo/smoke, nhưng chỉ được ghi nhận là:

```text
REPO_SMOKE_READY_NOT_LIVE
```

Không claim production payment live cho tới khi đủ:

- runtime secret production `MAIL_API_*`
- `PAY_EMAIL_ADAPTER_INTERNAL_KEY`
- `/v1/send` accepted proof
- payment provider ref
- mail `messageId`
- D1/canonical evidence row
- inbox proof thật từ hai Gmail
- pay gate unlock khỏi `LOCK_RETAINED_WITH_REASON`

---

## 3) Strict outbox

Strict outbox không dùng làm release gate hiện tại.

Runtime smoke là gate chính cho email live trong release này.

---

## 4) Ap Dalat / `ap.omdalat.com`

`ap.omdalat.com` là website editorial độc lập và nằm ngoài phạm vi build/deploy của repo `omdalat.com`.

Do đó:

- không đổi DNS/binding `ap.omdalat.com` trong Team 3 Om/app release,
- không dùng `CF_RUNTIME_REQUIRE_AP_CANONICAL_REDIRECT=1` làm gate bắt buộc,
- không xem `ap.omdalat.com` đang trỏ Vercel là blocker của Team 3 cho live bước đầu.

Nếu sau này cần redirect/decommission `ap.omdalat.com`, việc đó phải mở scope riêng cho Ap Dalat/infra.

---

## 5) Team 1 closure

Team 1 chốt Team 3:

```text
DONE_CLOSED
```

Thời điểm chốt: `2026-04-23 20:21 +07`
