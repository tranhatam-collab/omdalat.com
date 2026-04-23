# Team 3 Runtime Canonical + Account Decision (2026-04-22)

## 1) `www.app.omdalat.com` canonical cleanup

### Done
- Added custom domain `www.app.omdalat.com` to Pages project `omdalat-app` in account `93112cc89181e75335cbd7ef7e392ba3`.
- Domain object created successfully.

### Current status
- Domain validation state: `pending`
- Verification message: `CNAME record not set`
- API evidence time: `2026-04-22` (ICT), endpoint `/accounts/931.../pages/projects/omdalat-app/domains/www.app.omdalat.com`

### Team 1 verification update — 2026-04-23

Status: `DONE`

Team 1 đã kiểm tra lại sau khi Team 3 xử lý DNS và kích hoạt Pages custom domain.

Kết quả:

- `npm run cf:runtime-map:check`: `PASS`
- `dig +short www.app.omdalat.com`: trả Cloudflare IP
- `https://www.app.omdalat.com/vi/member/login`: trả `HTTP/2 308` sang `https://app.omdalat.com/vi/member/login`
- `https://app.omdalat.com/vi/member/login`: trả `HTTP/2 200`
- `x-robots-tag: noindex, nofollow` vẫn đúng trên member login

Kết luận: blocker `www.app.omdalat.com` đã đóng. Từ thời điểm này không nhắc lại `CNAME record not set` như blocker live.

### Required DNS action (external to current token scope)
- Add DNS record:
  - Type: `CNAME`
  - Name: `www.app`
  - Target: `omdalat-app.pages.dev`
  - Proxy: `Proxied`

Automation script (for a token with Zone DNS Write + Pages Write):
- `npm run cf:app:www:activate`

After DNS propagation, `www.app.omdalat.com/*` will land on app runtime and be redirected `308` to `https://app.omdalat.com/*` by app middleware.

---

## 2) Production smoke policy decision

Decision: keep production smoke default at **runtime mode** (current behavior), not strict outbox by default.

### Why
- Production mail delivery should not depend on smoke outbox instrumentation.
- Runtime-mode validates user-visible behavior (`HTTP`, redirect/gate flow, route success) without forcing internal test mailbox coupling.

### Strict mode availability
- Strict outbox on live remains available, but now requires explicit double opt-in:
  - `SMOKE_REQUIRE_OUTBOX=1`
  - `SMOKE_ALLOW_LIVE_OUTBOX=1`

This prevents accidental strict-production runs.

### Live evidence
- Runtime smoke pass report mới nhất: `reports/email-smoke/2026-04-23T12-38-33-939Z/summary.json`
- Strict live smoke hiện chưa ổn định cho gate production trong phiên này:
  - `reports/email-smoke/2026-04-23T12-36-03-585Z/` (`Timed out waiting for web runtime: fetch failed`)
  - `reports/email-smoke/2026-04-23T12-37-20-020Z/` (`Timed out waiting for web runtime: fetch failed`)

Operational decision hiện tại: giữ runtime mode làm gate chính; strict outbox để trạng thái optional/manual.

---

## 4) `ap.omdalat.com` long-term canonical cleanup

Status: `IN_PROGRESS`

- Team 3 đã thêm canonical redirect guard vào app middleware và web middleware cho:
  - `ap.omdalat.com`
  - `www.ap.omdalat.com`
- Team 3 đã deploy runtime mới:
  - web: `https://b4016c45.omdalat-web-ezk.pages.dev`
  - app: `https://88c8b10d.omdalat-app-2ol.pages.dev`
- Tuy nhiên `ap` vẫn chưa canonical sạch vì DNS hiện tại đang trỏ Vercel:
  - `dig +short ap.omdalat.com` -> `76.76.21.21`
  - `curl -I https://ap.omdalat.com/` -> `HTTP/2 200` + `server: Vercel`
- Kết luận: redirect đã có trong runtime Cloudflare nhưng chưa có hiệu lực cho `ap` cho đến khi đổi DNS/binding hoặc decommission host ở hạ tầng ngoài repo.

Runtime check đã bổ sung cảnh báo:

- `npm run cf:runtime-map:check` có mục `ap host canonical cleanup`
- Có thể bật mode enforce bằng: `CF_RUNTIME_REQUIRE_AP_CANONICAL_REDIRECT=1`
- Enforce check hiện tại: `FAIL` do `ap` chưa đi vào runtime Cloudflare.

---

## 3) Split-account anti-drift guardrail (until single-account cutover)

Current pinned mapping:
- Web canonical runtime: account `f3f9e76222dcb488d5e303e29e8ba192` (`omdalat-web`)
- App canonical runtime: account `93112cc89181e75335cbd7ef7e392ba3` (`omdalat-app`)

Implemented guardrails:
- New check script: `npm run cf:runtime-map:check`
- Deploy script `scripts/team3_live_deploy_and_smoke.sh` now deploys with explicit per-runtime account IDs:
  - `WEB_CF_ACCOUNT_ID` (default `f3f9...`)
  - `APP_CF_ACCOUNT_ID` (default `931...`)

Long-term convergence target:
- Move to single-account runtime ownership after DNS write access is available for `omdalat.com` and `app.omdalat.com`.
- Recommended target account: `931...` (app runtime already canonical there), then retire shadow projects in `f3...`.
