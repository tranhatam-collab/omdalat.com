Om Dalat / Ôm Đà Lạt

App Member Runtime Evidence Packet

Version: v1.2.0

Status: SUBMITTED_BLOCKED_CANONICAL_PARITY

Date updated: 2026-04-29

Owner: Team 3

Reviewer: Team 1

Scope: evidence packet mới cho lane App member runtime sau activation 2026-04-28

---

## 0. Core attachments

* report:
  * `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`
* access/surface matrix:
  * `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* runtime drift evidence:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`

---

## 1. Fresh artifact evidence (required)

* build artifact id/url:
  * `https://d6b35718.omdalat-app-2ol.pages.dev`
* deploy target:
  * canonical target: `app.omdalat.com`
  * current deployed shadow runtime: `omdalat-app-2ol.pages.dev`
* build command summary:
  * `pnpm --filter @omdalat/app build:cf` -> `PASS`
* build log path:
  * log theo command output tại phiên Team 1 `2026-04-29`

---

## 2. Fresh smoke evidence (required)

* smoke run time:
  * `2026-04-29` (ICT)
* smoke command:
  * `npm run cf:runtime-map:check`
  * `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
* smoke summary path:
  * live pass: `reports/email-smoke/2026-04-28T17-59-16-886Z/summary.json`
* result:
  * `PARTIAL_FAIL`:
    * runtime-map fail do canonical `register/operations` còn `404`
    * smoke live pass (`success=true`)

---

## 3. Metadata/noindex/access evidence (required)

* metadata/noindex audit path:
  * `docs/APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md`
* access matrix verification note:
  * matrix ghi rõ route pass/fail theo live probes:
    * shadow runtime pass `/vi/member/register`
    * canonical host fail `/vi/member/register`, `/vi/member/operations`
* member gate semantics check:
  * semantics reviewed gate đúng ở policy level; hiện fail do canonical host chưa theo artifact mới

---

## 4. Blocker classification (required)

* final blocker status:
  * `BLOCKED_P0`
* if blocked, classify:
  * `INFRA` (canonical parity giữa account/project/runtime)
  * `CODE` (chưa có bằng chứng regression; shadow runtime route pass)
* blocker proof path:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`
  * `npm run cf:runtime-map:check` output ngày `2026-04-29`
  * `https://d6b35718.omdalat-app-2ol.pages.dev` so với `https://app.omdalat.com`

---

## 5. Strict outbox note

Current policy (Team 1 D-003):

* strict outbox = hardening lane có điều kiện, chưa mandatory gate cho activation cycle này.

Team 3 note for this packet:

* giữ theo `D-003`: strict outbox là hardening lane có điều kiện ở cycle hiện tại.
* strict run hiện fail vì `Unable to clear smoke outbox: 405`, chưa nâng thành mandatory gate cho activation cycle này.

---

## 6. Definition of done

Packet này được xem là complete khi:

* có fresh artifact + fresh smoke sau activation 2026-04-28
* metadata/noindex/access evidence có path rõ
* blocker classification final được ghi rõ

Trạng thái hiện tại:

* packet complete ở mức `CURRENT_STATE_BLOCKED` cho Team 1 review.
* chưa đạt `P0_CLOSED` vì canonical parity chưa xử lý xong.
