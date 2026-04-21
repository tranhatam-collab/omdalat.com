# Team 2 Final Handoff - 2026-04-21

## Footer bridge copy decision

- Locked copy for footer bridge:
  - `vi`: `Ấp Đà Lạt`
  - `en`: `Ap Dalat`
- Rationale: this matches the current production-facing footer implementation in `components/layout/Footer.tsx` and avoids drift between UI copy and QA assertions.

## Final clean gate run

Server session:

- `node_modules/.bin/next dev -H 127.0.0.1 -p 3200`

Gate commands:

- `node_modules/.bin/playwright test e2e/smoke-locales.spec.ts --config=playwright.local-3200.config.ts --reporter=line`
  - Result: `70 passed`
- `node_modules/.bin/playwright test e2e/team2-quick-qa.spec.ts --config=playwright.local-3200.config.ts --reporter=line`
  - Result: `2 passed`

## Scope closed

- Locale SEO smoke suite: pass
- Team 2 quick QA: pass
- Footer bridge copy + QA expectation: aligned and locked
