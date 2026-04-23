# OMDALAT DEV CHANNEL MAPPING AND 15-MIN AUTOMATION — 2026-04-23

Version: LOCKED  
Status: ACTIVE  
Owner: Team 1  
Scope: Team 1, Team 2, Team 3 trong repo `omdalat.com`

---

## 0) Tuyên bố vận hành

Từ thời điểm này, các team đang dev không chờ nhắc thủ công theo ngày.

Nhịp nhắc tự động chạy **15 phút một lần** trong thread Team 1 cho tới khi từng team:

1. hoàn tất toàn bộ nhiệm vụ được giao,
2. nộp báo cáo đúng kênh,
3. có evidence test/build/smoke tương ứng,
4. được Team 1 đánh dấu `DONE`.

Nếu một team chưa xong, automation tiếp tục nhắc team đó.  
Nếu một team xong phần của mình nhưng đang chờ team khác, trạng thái phải là `WAITING_ON_DEPENDENCY`, kèm tên team đang chờ và bằng chứng phần mình đã xong.

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

### Team 2 channel

- Vai trò: Web/public UI, canonical UI smoke, public text/metadata/alt evidence
- Báo cáo vào:
  - `docs/DEV_TEAM_2_PLAN_OMDALAT.md`
  - `apps/web/TEAM2_FINAL_HANDOFF_YYYY-MM-DD.md`
  - file report bổ sung nếu có evidence mới

### Team 3 channel

- Vai trò: App/member/runtime/CMS/infra, app canonical, noindex, DNS, API smoke, email live smoke, payment readiness
- Báo cáo vào:
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

## 4) Team 2 reminder command

Mỗi lần heartbeat, nếu Team 2 chưa `DONE`, nhắc Team 2 chạy hoặc xác nhận:

```bash
PREVIEW_BASE_URL=https://omdalat.com pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts
pnpm --filter @omdalat/web run validate:web-locales
```

Team 2 phải báo cáo:

- canonical UI/public pass hay fail,
- số route public đã rà,
- số lỗi VI/EN/metadata/alt/CTA còn lại,
- file evidence mới nhất,
- nếu bị block thì block bởi Team 1 hay Team 3.

---

## 5) Team 3 reminder command

Mỗi lần heartbeat, nếu Team 3 chưa `DONE`, nhắc Team 3 chạy hoặc xác nhận:

```bash
npm run cf:runtime-map:check
curl -i -sS -X POST https://app.omdalat.com/api/support -H "Content-Type: application/json" --data '{"subject":"team3 heartbeat","message":"runtime support check","route":"/settings"}'
curl -I -sS https://app.omdalat.com/vi/member/login
dig +short www.app.omdalat.com
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
```

Team 3 phải báo cáo:

- app canonical runtime pass hay fail,
- `www.app.omdalat.com` DNS đã resolve chưa,
- support API còn lỗi không,
- noindex/member guard còn đúng không,
- CMS/publish rule song ngữ đã khóa chưa,
- email live smoke có report mới `5/5` chưa,
- payment lane là `DONE`, `PHASE_2`, hay `BLOCKED` chưa,
- file evidence mới nhất.

Nếu payment được giữ trong scope live đồng bộ, Team 3 phải bổ sung và chạy:

```bash
npm run payment:smoke:live
```

Nếu payment không thuộc live hiện tại, Team 3 phải ghi rõ `Phase 2 / not in scope` trong release note để không bị hiểu nhầm là đã hoàn tất.

---

## 6) Stop rule

Automation chỉ được tắt khi tất cả các dòng sau đều `DONE`:

- Team 1: release gate + report tổng + Go/No-Go cuối
- Team 2: canonical public UI + bilingual public evidence + alt/metadata report
- Team 3: app runtime + DNS phụ + CMS/publish rule + noindex evidence + email smoke live + payment scope/evidence

Nếu chỉ một team xong, automation vẫn chạy cho các team còn lại.

---

## 7) Báo cáo bắt buộc mỗi lần heartbeat

Heartbeat phải tạo một status ngắn gồm:

- Team 1: `DONE / ACTIVE / WAITING_ON_DEPENDENCY`
- Team 2: `DONE / ACTIVE / WAITING_ON_DEPENDENCY`
- Team 3: `DONE / ACTIVE / WAITING_ON_DEPENDENCY`
- Blocker P0 hiện tại
- Việc tiếp theo trong 15 phút tới
- % còn lại toàn hệ

---

## 8) Câu chốt

Không nghỉ theo cảm giác.  
Không chờ nếu phần mình chưa xong.  
Chỉ chờ nhau khi phần mình đã hoàn tất và có evidence.
