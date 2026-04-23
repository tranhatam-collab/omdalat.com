# OMDALAT TEAM 1 CHECK — TEAM 2 + TEAM 3 STATUS — 2026-04-23

Version: v1.0.0  
Status: ACTIVE  
Owner: Team 1  
Scope: kiểm tra báo cáo Team 2, Team 3 và nhiệm vụ còn lại trước khi đóng release tổng

---

## 0) Kết luận nhanh

Team 3 đã xử lý xong blocker `www.app.omdalat.com`.

Email live smoke đã có report mới `5/5`.

Team 1 đã kiểm chứng intake lúc `2026-04-23 18:57 +07` bằng evidence trong repo và spot-check DNS.

Mail sender/relay external cho `omdalat.com` đã có proof xanh ở lớp Mailcow + SendGrid provider acceptance.

Payment đã được Team 3 khóa là `PHASE_2_NOT_IN_SCOPE`, nên không còn là blocker cho live hiện tại.

Payment form + mẫu email thanh toán trong pay repo đã xanh ở lớp repo/smoke, nhưng Team 1 chỉ ghi nhận là `REPO_SMOKE_READY_NOT_LIVE`.

Payment activation external vẫn chưa được claim live và đang giữ trạng thái `LOCK_RETAINED_WITH_REASON`.

Phần còn lại để đóng release tổng nằm ở:

1. Team 2: `DONE` cho public surface/re-smoke gate; browser smoke ngoài sandbox trên canonical thật `34/34 passed`.
2. Team 1: tổng hợp báo cáo cuối theo `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND`.
3. Team 3: `DONE_CLOSED` cho Om/app runtime scope hiện tại.
4. Team D / Team Email SMTP: nếu payment activation được đưa vào scope live Phase 2, phải đóng đủ proof bindings/provider/D1/inbox trước khi claim.

---

## 1) Team 3 verification

### Runtime map

Lệnh:

```bash
npm run cf:runtime-map:check
```

Kết quả:

- Web runtime account: `PASS`
- App runtime account: `PASS`
- Web canonical domain: `PASS`
- App canonical domain: `PASS`
- Shadow project drift guard: `PASS`
- `www.app.omdalat.com` DNS resolves: `PASS`
- Web root redirect `omdalat.com -> /vi`: `PASS`
- App login locale redirect `app.omdalat.com/member/login -> /vi/member/login`: `PASS`
- App login `x-robots-tag: noindex, nofollow`: `PASS`
- Member reviewed gate `/vi/member/operations -> /vi/member/application-status`: `PASS`
- App support API lane `/api/support`: `PASS` (không còn 502)
- `ap.omdalat.com` canonical cleanup: `OUT_OF_SCOPE_FOR_OM_APP_RELEASE` vì `ap.omdalat.com` là website editorial độc lập ngoài repo này

### DNS + redirect

Lệnh:

```bash
dig +short www.app.omdalat.com
curl -I -sS https://www.app.omdalat.com/vi/member/login
curl -I -sS https://app.omdalat.com/vi/member/login
```

Kết quả:

- `www.app.omdalat.com` trả Cloudflare IP.
  - Team 1 spot-check: `172.67.186.147`, `104.21.84.52`.
- `https://www.app.omdalat.com/vi/member/login` trả `HTTP/2 308`.
- Redirect đúng sang `https://app.omdalat.com/vi/member/login`.
- `https://app.omdalat.com/vi/member/login` trả `HTTP/2 200`.
- Header `x-robots-tag: noindex, nofollow` vẫn đúng.
- `ap.omdalat.com` hiện trả `HTTP/2 200` từ `server: Vercel`.
- `dig +short ap.omdalat.com` trả `76.76.21.21`.
- Theo `docs/OMDALAT_APP_RUNTIME_SCOPE_AND_RESPONSIBILITIES_2026.md`, đây là website editorial độc lập ngoài phạm vi build/deploy repo này, nên không còn là blocker Team 3 cho Om/app release hiện tại.

### Email

Report mới:

```text
reports/email-smoke/2026-04-23T11-58-09-241Z/summary.json
reports/email-smoke/2026-04-23T12-38-33-939Z/summary.json
reports/email-smoke/2026-04-23T12-45-14-325Z/summary.json
```

Kết quả:

- `success=true`
- `runtimeTarget=live`
- `assertionMode=runtime`
- `5/5 flow pass`
  - `contact`: `PASS`
  - `support`: `PASS`
  - `join`: `PASS`
  - `magic_link`: `PASS`
  - `email_verification`: `PASS`
- `emailsCaptured=null`, vì đây là runtime assertion mode, không phải strict outbox mode.

Team 1 chấp nhận email lane là `GO` cho release hiện tại ở mức runtime live smoke. Team 1 chưa claim strict outbox proof cho đến khi có quyết định bật `SMOKE_REQUIRE_OUTBOX=1`.

Ghi chú intake mới:

- `reports/email-smoke/2026-04-23T11-55-25-678Z/` không có `summary.json`; lỗi do thiếu `SMOKE_WEB_ORIGIN` và `SMOKE_APP_ORIGIN` khi chạy `SMOKE_RUNTIME_TARGET=live`.
- `reports/email-smoke/2026-04-23T11-55-53-081Z/` không có `summary.json`; lỗi `Timed out waiting for web runtime: fetch failed`.
- `reports/email-smoke/2026-04-23T11-57-00-759Z/` không có `summary.json`; lỗi `Timed out waiting for web runtime: fetch failed`.
- Các attempt strict/live sau đó vẫn có timeout:
  - `reports/email-smoke/2026-04-23T12-36-03-585Z/`
  - `reports/email-smoke/2026-04-23T12-37-20-020Z/`
  - `reports/email-smoke/2026-04-23T12-41-00-324Z/`
  - `reports/email-smoke/2026-04-23T12-42-43-515Z/`
  - `reports/email-smoke/2026-04-23T12-48-00-293Z/` (strict mode: `Timed out waiting for contact emails`)
- Các attempt lỗi này không thay thế evidence pass runtime mới nhất. Evidence pass hiện tại là `2026-04-23T12-45-14-325Z`.

### Payment

Team 3 release note:

```text
docs/TEAM3_RELEASE_NOTE_EMAIL_PAYMENT_2026-04-23.md
```

Kết luận:

- Payment = `PHASE_2_NOT_IN_SCOPE`
- Không có checkout/payment lane active trong release hiện tại.
- Không được ghi payment là đã live.
- Không còn coi payment là blocker cho release hiện tại.

Pay repo-side readiness:

- Status: `REPO_SMOKE_READY_NOT_LIVE`
- Form + mẫu email thanh toán trong pay repo đã xanh ở lớp repo/smoke.
- Đây là readiness tầng code/template, không phải production payment activation proof.
- Team 1 chưa cho mở payment gate từ evidence này.

External mail/payment proof:

```text
docs/OMDALAT_EXTERNAL_MAIL_PAYMENT_ACTIVATION_STATUS_2026-04-23.md
```

Team 1 đã đọc proof external từ:

```text
/Users/tranhatam/Documents/Devnewproject/iai-platform-worktree/docs/iai-mail-platform/OMDALAT_COM_TEAM_EMAIL_SMTP_MAILBOX_INBOUND_PROOF_2026-04-23.md
```

Kết luận external:

- Mail sender/relay: `PASS_PROVIDER_ACCEPTANCE`
- `pay@omdalat.com` và `billing@omdalat.com`: active aliases tới `support@omdalat.com`
- `support@omdalat.com` và `noreply@omdalat.com`: mailbox thật
- 8/8 outbound smoke tới hai Gmail được SendGrid nhận `250 Ok`
- Payment activation: `LOCK_RETAINED_WITH_REASON`
- `BCC`: `OFF`
- Không claim payment live cho tới khi đủ runtime secret production `MAIL_API_*`, `PAY_EMAIL_ADAPTER_INTERNAL_KEY`, `/v1/send` accepted proof, payment provider ref, mail `messageId`, D1/canonical row, inbox proof thật từ hai Gmail và pay gate unlock.

### Team 3 status

Status: `DONE_CLOSED`

Team 1 đóng Team 3 lúc `2026-04-23 20:21 +07` cho scope Om/app runtime hiện tại.

Team 3 evidence cuối:

- runtime map,
- `www.app` redirect,
- noindex/member guard,
- email smoke,
- payment Phase 2 release note,
- publish rule song ngữ nếu có content indexable do Team 3 sở hữu.

Kết quả build/runtime:

- Dependency linking `@cloudflare/next-on-pages` đã được xử lý.
  - `pnpm --filter @omdalat/web exec next-on-pages --version` => `1.13.16`
  - `pnpm --filter @omdalat/app exec next-on-pages --version` => `1.13.16`
- Build local đã pass lại:
  - `pnpm --filter @omdalat/web build:cf` => `PASS`
  - `pnpm --filter @omdalat/app build:cf` => `PASS`
  - `scripts/build-cf.mjs` hiện retry cả lane `next build` và `next-on-pages`.
  - `apps/app/package.json` build script đã ép `NEXT_DISABLE_BUILD_WORKER=1 NEXT_PRIVATE_BUILD_WORKER=0` để giảm lỗi `SIGSEGV` local.
- `npm run cf:runtime-map:check` => `PASS` ở runtime-only mode.
- Team 3 giữ quyết định smoke production mặc định là runtime mode; strict outbox chỉ bật khi có gate riêng.
- `ap.omdalat.com` không còn là blocker Team 3 vì nằm ngoài scope Om/app release hiện tại.
- Payment tiếp tục giữ `PHASE_2_NOT_IN_SCOPE` cho đến khi có mandate mới.

---

## 2) Team 2 verification

### Đã pass

Theo evidence đã được Team 1 chấp nhận:

- Canonical UI/public: `PASS`
- Re-smoke public: `34/34 passed`
- Homepage/public intro/H1/CTA lock: `PASS`
- Team 2 public UI block: `100% done`

### Báo cáo mới từ Team 2

Team 2 đã nộp báo cáo 10 mục trong thread điều phối.

File Team 1 đã lưu lại:

```text
apps/web/TEAM2_FINAL_HANDOFF_2026-04-23.md
```

Team 1 đã rerun validation gates:

```bash
pnpm --filter @omdalat/web run validate:web-locales
pnpm --filter @omdalat/web run validate:i18n-data
pnpm --filter @omdalat/web run validate:content-seed
```

Kết quả:

- `validate:web-locales`: `PASS` (`web locale validation passed. keys=14`)
- `validate:i18n-data`: `PASS`
- `validate:content-seed`: `PASS`

### Team 2 closure

Status: `DONE`

Team 2 đã báo cáo nhịp mới và Team 1 đã nhận:

- `validate:web-locales`: `PASS`
- `validate:i18n-data`: `PASS`
- `validate:content-seed`: `PASS`
- Playwright CLI: `PASS`, chạy được `Version 1.58.2`
- Playwright dependency: sạch theo báo cáo Team 2
- Code Team 2/public surface: ổn định, không có diff mới trong các file Team 2 vừa kiểm tra
- Browser smoke ngoài sandbox trên canonical thật: `PASS`
  - Lệnh:
    ```bash
    PREVIEW_BASE_URL=https://omdalat.com corepack pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts --reporter=line
    ```
  - Kết quả: `34/34 passed (1.7m)`
- Team 2 không claim live payment
- Báo cáo song ngữ 10 mục: đã gửi ở nhịp trước
- Trạng thái Team 2: `100%` cho public surface/re-smoke gate

Không nhắc lại Team 2 như blocker release tổng, trừ khi có thay đổi public surface mới.

---

## 3) Team 1 next action

Status: `ACTIVE`

Team 1 phải:

1. gom báo cáo Team 2 + Team 3 vào báo cáo tổng song ngữ 10 mục,
2. cập nhật release checklist cuối,
3. chốt Go/No-Go release tổng trên phần còn lại của Team 1,
4. không nhắc lại `www.app.omdalat.com` như blocker.

---

## 4) Phần trăm còn lại

Ước tính sau kiểm tra này:

- Team 1: `99%`
- Team 2: `100%`
- Team 3: `100%`
- Toàn hệ: `99.8%`

Phần còn lại chủ yếu là Team 1 tổng hợp release gate cuối. Không còn blocker Team 2 hoặc Team 3 cho Om/app live bước đầu. `ap.omdalat.com` là site editorial độc lập ngoài repo; strict outbox chưa claim; payment production activation vẫn `LOCK_RETAINED_WITH_REASON` và thuộc Phase 2.
