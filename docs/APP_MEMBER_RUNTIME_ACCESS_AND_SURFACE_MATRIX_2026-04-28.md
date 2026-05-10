Om Dalat / Om Da Lat

App Member Runtime Access And Surface Matrix

Version: v1.2.0

Status: PASS_WITH_QUEUE

Date updated: 2026-04-29

Owner: Team 3

Reviewer: Team 1

Scope: access matrix + runtime surface matrix for Team 3 lane

---

## 0. Muc dich

Matrix nay la current-state thuc te cua lane `app.omdalat.com` sau dot live probes ngay `2026-04-29`.

No phan biet ro:

* route nao pass/fail tren runtime live
* blocker la `CODE`, `TOOLCHAIN`, hay `INFRA`
* evidence path nao de Team 1 review truc tiep

---

## 1. Matrix

| Route | Screen type | Guest | Registered | Under review | Active member | Contributor | Operator | Surface status | Data status | Metadata/noindex | Smoke status | Blocker type | Evidence path | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi/member/login` | `auth-entry` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `curl -I https://app.omdalat.com/vi/member/login` | live trả `200` |
| `/vi/member/register` | `auth-entry` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `npm run cf:runtime-map:check` | live tra `200`, route da phuc hoi tren canonical runtime |
| `/vi/member/application-status` | `status-gate` | `DENY` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `SEEDED` | `PASS` | `PASS` | `NONE` | `curl -I https://app.omdalat.com/vi/member/application-status` | live trả `200` |
| `/vi/member/operations` | `reviewed-gate` | `DENY` | `REDIRECT_STATUS` | `REDIRECT_STATUS` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `npm run cf:runtime-map:check` | guest bi redirect reviewed gate (`302`) den `application-status?required=reviewed-member` |
| `/dashboard` | `member-surface` | `DENY` | `ALLOW_LIMITED` | `ALLOW_LIMITED` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `SEEDED` | `PASS` | `PASS` | `NONE` | `curl -I https://app.omdalat.com/dashboard` | live redirect locale dung |
| `/api/health` | `runtime-health` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `curl -i https://app.omdalat.com/api/health` | live tra `200` va payload dung |
| `/api/support` | `support-api` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `npm run cf:runtime-map:check` | live tra `200` va payload `ok:true` |
| `omdalat.com/api/contact` | `web-contact-api` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `ALLOW` | `PASS` | `REAL` | `PASS` | `PASS` | `NONE` | `reports/email-smoke/2026-04-28T18-15-01-638Z/summary.json` | contact flow pass trong smoke live |
| `build:cf local` | `runtime-artifact` | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | `PASS` | `N/A` | `N/A` | `PASS` | `NONE` | `pnpm --filter @omdalat/app build:cf` | build pass sau co che retry; con occasional `SIGSEGV` non-blocking |

---

## 2. Rule dien

* `Surface status`: `PASS` / `FAIL` / `PARTIAL`
* `Data status`: `REAL` / `SEEDED` / `UNKNOWN`
* `Metadata/noindex`: `PASS` / `UNKNOWN` / `WRONG`
* `Smoke status`: `PASS` / `FAIL` / `NOT_RUN`
* `Blocker type`: `NONE` / `CODE` / `TOOLCHAIN` / `INFRA`

---

## 3. Definition of done

Matrix Team 3 hien da dat closure P0:

* `/vi/member/register` va `/vi/member/operations` da pass
* `/api/support` va `/api/contact` da dat smoke contract
* `cf:runtime-map:check` pass tren runtime canonical
* `mail:smoke:e2e:live` pass voi evidence moi

Queue con lai:

* strict outbox (`mail:smoke:e2e:live-strict`) dang hardening, chua la blocker P0
