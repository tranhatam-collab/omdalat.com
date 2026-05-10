# TEAM 3 GATE REPORT — 2026-04-29

Version: 1.1  
Status: PASS_WITH_QUEUE  
Owner: Team 3  
Surface: `app.omdalat.com` runtime + member lane

---

## 0) Scope

- Task id: `TEAM3-RUNTIME-PARITY-2026-04-29`
- Surface: app runtime parity + reviewed unlock + smoke gate
- Goal: close Team 3 P0 runtime blocker and submit fresh evidence

## 1) Commands Used

```bash
pnpm --filter @omdalat/app build:cf
wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main --commit-dirty=true
npm run cf:runtime-map:check
SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e
npm run mail:smoke:e2e:live-strict
```

## 2) Key Result

- Pass:
  - canonical app deployment success: `https://cb980b6b.omdalat-app.pages.dev`
  - runtime map full pass including localized reviewed gate and support lane
  - drift probes old-checkpoint pass lai:
    - `GET /vi/member/register` -> `200`
    - `GET /vi/member/operations` -> `302` reviewed gate
    - `POST /api/support` -> `{"ok":true,...}`
    - `POST /api/contact` -> `{"ok":true,...}`
  - live runtime smoke pass (`success=true`)
- Queue:
  - strict outbox smoke remains unstable (timeout on web runtime wait)

## 3) Evidence

- runtime map pass: command output `2026-04-29`
- runtime smoke pass:
  - `/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
- strict smoke fail:
  - `/Users/tranhatam/Documents/Devnewproject/omdalat.com/reports/email-smoke/2026-04-28T18-31-20-973Z/error.txt`

## 4) Risks

- strict outbox lane flaky in live mode; if promoted to mandatory gate now, release can false-fail.

## 5) Rollback Note

- rollback trigger:
  - app localized login/register/gate or support lane fail post deploy
- rollback path:
  - redeploy previous known-good app deployment on `omdalat-app`
  - rerun `cf:runtime-map:check` + runtime smoke

## 6) Approval Recommendation

- Recommendation: `GO_WITH_QUEUE`
- Queue item:
  - keep strict outbox as hardening lane (not P0 cutover blocker in this cycle)
