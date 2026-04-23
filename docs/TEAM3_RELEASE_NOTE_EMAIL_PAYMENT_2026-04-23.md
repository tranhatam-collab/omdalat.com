# Team 3 Release Note — Email + Payment (2026-04-23)

## 1) Email lane

Status: `DONE`

- Fixed smoke dependency fragility by removing browser-runtime coupling in `scripts/mail-smoke-e2e.mjs` and switching member verification flows to HTTP form-submit against live runtime.
- Re-ran live smoke on canonical origins:

```bash
SMOKE_RUNTIME_TARGET=live \
SMOKE_WEB_ORIGIN=https://omdalat.com \
SMOKE_APP_ORIGIN=https://app.omdalat.com \
npm run mail:smoke:e2e
```

Evidence:
- `reports/email-smoke/2026-04-23T05-35-37-961Z/summary.json`
- Result: `success=true`, `5/5 flow pass`, `runtimeTarget=live`, `assertionMode=runtime`

## 2) Payment lane

Status: `PHASE_2_NOT_IN_SCOPE`

- Current release does not include an active checkout/payment lane.
- No active checkout endpoint or payment smoke script is shipped as part of this live cut.
- Team 3 explicitly locks payment to Phase 2 for this release window to avoid false-live interpretation.

## 3) Release impact

- Email is no longer a blocker for current live cut.
- Payment is not a blocker for this release because it is explicitly out of scope and deferred to Phase 2.
