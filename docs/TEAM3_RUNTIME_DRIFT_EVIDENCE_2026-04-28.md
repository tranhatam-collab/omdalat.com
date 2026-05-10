Om Dalat / Om Da Lat

Team 3 Runtime Drift Evidence

Date: 2026-04-29

Status: RESOLVED_P0_PASS_WITH_QUEUE

---

## 1) Runtime map result (latest)

Command:

* `npm run cf:runtime-map:check`

Observed (`2026-04-29`):

* `PASS` web runtime account + canonical domain
* `PASS` app runtime account + canonical domain
* `PASS` `www.app.omdalat.com` DNS resolve + canonical redirect
* `PASS` app localized login noindex
* `PASS` app localized register route
* `PASS` app localized operations reviewed gate (`302` to application-status with `required=reviewed-member`)
* `PASS` app support API lane (`{"ok":true,...}`)

Conclusion:

* Runtime drift blocker da duoc go cho lane Team 3.
* Checkpoint drift cu da pass lai tren canonical live:
  * `GET https://app.omdalat.com/vi/member/register` -> `200`
  * `GET https://app.omdalat.com/vi/member/operations` -> `302` reviewed gate
  * `POST https://app.omdalat.com/api/support` -> `{"ok":true,...}`
  * `POST https://omdalat.com/api/contact` -> `{"ok":true,...}`

---

## 2) Canonical deployment evidence (app)

Commands:

* `pnpm --filter @omdalat/app build:cf`
* `wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main --commit-dirty=true`
* `CLOUDFLARE_ACCOUNT_ID=93112... wrangler pages deployment list --project-name omdalat-app --json`

Observed:

* New canonical deployment:
  * `https://cb980b6b.omdalat-app.pages.dev`
* Deployment list trong account `931...` da co deployment moi nhat.

Conclusion:

* `app.omdalat.com` dang theo runtime canonical da deploy moi.

---

## 3) Mail smoke evidence

Commands:

* `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
* `npm run mail:smoke:e2e:live-strict`

Observed:

* Runtime smoke: `PASS`
  * `reports/email-smoke/2026-04-28T18-28-38-812Z/summary.json`
* Strict outbox: `FAIL` (intermittent timeout khi wait web runtime)
  * `reports/email-smoke/2026-04-28T18-31-20-973Z/error.txt`

Conclusion:

* Runtime lane pass cho release gate chinh.
* Strict outbox nen giu o hardening lane, chua bat buoc P0 cho cycle nay.

---

## 4) Root cause + hardening patch

Observed root cause:

* Wrangler Pages account/project context co drift khi project name trung giua 2 accounts.

Applied hardening:

* Updated `scripts/team3_live_deploy_and_smoke.sh` de set wrangler pages cache context theo tung account/project truoc moi deploy.

Conclusion:

* Giam rui ro deploy nham shadow runtime trong cac nhip tiep theo.
