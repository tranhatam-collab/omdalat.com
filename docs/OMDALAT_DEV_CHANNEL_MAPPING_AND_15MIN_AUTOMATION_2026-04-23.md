# OMDALAT DEV CHANNEL MAPPING AND 15-MIN AUTOMATION — 2026-04-23

Version: LOCKED v1.1
Status: ACTIVE  
Owner: Team 1  
Scope: Team 1 final gate trong repo `omdalat.com`; Team 2 và Team 3 đã đóng khỏi vòng nhắc

---

## 0) Tuyên bố vận hành

Từ thời điểm này, các team đang dev không chờ nhắc thủ công theo ngày.

Nhịp nhắc tự động chạy **15 phút một lần** trong thread Team 1 cho tới khi các lane còn mở:

1. hoàn tất toàn bộ nhiệm vụ được giao,
2. nộp báo cáo đúng kênh,
3. có evidence test/build/smoke tương ứng,
4. được Team 1 đánh dấu `DONE`.

Nếu một team chưa xong, automation tiếp tục nhắc team đó.  
Nếu một team xong phần của mình nhưng đang chờ team khác, trạng thái phải là `WAITING_ON_DEPENDENCY`, kèm tên team đang chờ và bằng chứng phần mình đã xong.

Team 2 đã được Team 1 chốt `DONE_CLOSED` cho public surface/re-smoke gate sau khi browser smoke ngoài sandbox trên canonical thật pass `34/34`.

Team 3 đã được Team 1 chốt `DONE_CLOSED` cho Om/app runtime scope. Từ thời điểm này, automation không nhắc Team 2 hoặc Team 3 nữa trừ khi Team 1 mở scope mới.

---

## 1) Channel mapping

### Control channel

- Kênh điều phối chính: Codex thread hiện tại
- Automation: heartbeat 15 phút một lần
- Owner điều phối: Team 1

### Team 1 channel

- Vai trò: Foundation, release gate, language/SEO governance, report tổng
- Báo cáo vào:
  - `docs/OMDALAT_TEAM1_PROGRESS_REPORT_YYYY-MM-DD.md`
  - `RELEASE_CHECKLIST.md`
  - `docs/OMDALAT_UNIVERSAL_BILINGUAL_PRELIVE_REPORT_YYYY-MM-DD.md`

### Team 2 channel — CLOSED

- Vai trò đã hoàn thành: Web/public UI, canonical UI smoke, public text/metadata/alt evidence
- Status: `DONE_CLOSED`
- Evidence:
  - browser smoke canonical `https://omdalat.com`: `34/34 passed`
  - `apps/web/TEAM2_FINAL_HANDOFF_2026-04-23.md`
- Không còn heartbeat/reminder.
- Chỉ mở lại nếu Team 1 tạo scope public surface mới.
- File tham chiếu:
  - `docs/DEV_TEAM_2_PLAN_OMDALAT.md`
  - `apps/web/TEAM2_FINAL_HANDOFF_YYYY-MM-DD.md`

### Team 3 channel — CLOSED

- Vai trò đã hoàn thành: App/member/runtime/CMS/infra, app canonical, noindex, DNS, API smoke, email live smoke, payment scope
- Status: `DONE_CLOSED`
- Evidence:
  - `docs/TEAM3_FINAL_CLOSURE_2026-04-23.md`
  - `docs/TEAM3_RUNTIME_CANONICAL_AND_ACCOUNT_DECISION_2026-04-22.md`
  - `docs/OMDALAT_EMAIL_PAYMENT_LIVE_PRIORITY_CHECK_2026-04-23.md`
- Không còn heartbeat/reminder.
- File tham chiếu:
  - `docs/DEV_TEAM_3_PLAN_OMDALAT.md`
  - `docs/TEAM3_LIVE_STATUS_YYYY-MM-DD.md`
  - `docs/TEAM3_RUNTIME_CANONICAL_AND_ACCOUNT_DECISION_YYYY-MM-DD.md`
  - `docs/OMDALAT_EMAIL_PAYMENT_LIVE_PRIORITY_CHECK_YYYY-MM-DD.md`

---

## 2) Reminder cadence

- Tần suất: mỗi 15 phút
- Không giới hạn trong giờ hành chính
- Không dừng khi chỉ có một team báo cáo xong
- Không dừng khi còn task `P0` hoặc `P1` mở
- Chỉ tắt reminder của một team khi Team 1 chốt team đó `DONE`
- Team 2 reminder đã tắt vì Team 2 đã `DONE_CLOSED`
- Team 3 reminder đã tắt vì Team 3 đã `DONE_CLOSED`

---

## 3) Team 1 reminder command

Mỗi lần heartbeat, nếu Team 1 chưa `DONE`, nhắc Team 1 chạy hoặc xác nhận:

```bash
git status --short
node scripts/validate-web-locales.mjs
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
curl -I -sS https://omdalat.com/
curl -I -sS https://app.omdalat.com/vi/member/login
```

Team 1 phải cập nhật:

- trạng thái Go/No-Go,
- % còn lại toàn hệ,
- team nào đang block team nào,
- file report mới nhất.

---

## 4) Team 2 reminder command — CLOSED

Không nhắc Team 2 nữa.

Final Team 2 evidence:

```bash
PREVIEW_BASE_URL=https://omdalat.com corepack pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts --reporter=line
```

Kết quả: `34/34 passed (1.7m)`.

---

## 5) Team 3 reminder command — CLOSED

Không nhắc Team 3 nữa.

Final Team 3 evidence:

```bash
npm run cf:runtime-map:check
pnpm --filter @omdalat/web build:cf
pnpm --filter @omdalat/app build:cf
npm run mail:smoke:e2e:live
```

Kết quả đã được Team 1 ghi trong `docs/TEAM3_FINAL_CLOSURE_2026-04-23.md`.

---

## 6) Stop rule

Automation chỉ được tắt khi tất cả các dòng sau đều `DONE`:

- Team 1: release gate + report tổng + Go/No-Go cuối

Team 2 đã `DONE_CLOSED` và không còn nằm trong stop rule đang chạy.
Team 3 đã `DONE_CLOSED` và không còn nằm trong stop rule đang chạy.

Automation hiện chỉ còn Team 1 final gate.

---

## 7) Báo cáo bắt buộc mỗi lần heartbeat

Heartbeat phải tạo một status ngắn gồm:

- Team 1: `DONE / ACTIVE / WAITING_ON_DEPENDENCY`
- Team 2: chỉ nhắc là `DONE_CLOSED` khi cần bối cảnh, không yêu cầu hành động
- Team 3: chỉ nhắc là `DONE_CLOSED` khi cần bối cảnh, không yêu cầu hành động
- Blocker P0 hiện tại
- Việc tiếp theo trong 15 phút tới
- % còn lại toàn hệ

---

## 8) Câu chốt

Không nghỉ theo cảm giác.  
Không chờ nếu phần mình chưa xong.  
Chỉ chờ nhau khi phần mình đã hoàn tất và có evidence.
