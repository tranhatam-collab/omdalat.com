# TEAM 3 UNIVERSAL COMPLIANCE EXECUTION — 2026-04-28

Version: 1.0  
Status: ACTIVE  
Owner: Team 3  
Parent standards:
- `docs/OMDALAT_UNIVERSAL_STANDARDS_ACTIVATION_2026-04-28.md`
- `docs/OMDALAT_AND_APDALAT_TEAM_UPDATE_2026-04-28.md`
- `docs/OMDALAT_AND_APDALAT_UNIVERSAL_STANDARDS_ROLLOUT_PLAN_2026-04-28.md`

---

## 0) Team 3 Scope Lock

- `omdalat.com`: public web entry (Team 3 only touches app-coupled lanes when requested).
- `app.omdalat.com`: Team 3 primary runtime, member flow, gate semantics, release evidence.
- `ap.omdalat.com`: editorial runtime outside Team 3 app scope; no role/gating crossover.

## 1) Mandatory Rules For Team 3

Team 3 must:

- keep app/member metadata and noindex discipline stable;
- keep status copy, gate copy, and dashboard labels aligned with codex meaning;
- classify blockers by `code`, `toolchain`, `governance` in every report;
- never claim live without artifact + smoke evidence.

Team 3 must not:

- redefine role semantics;
- redefine gating meaning;
- treat app runtime as language/SEO governance exception.

## 2) P0 Checklist (Current Round)

- [ ] app metadata/noindex audit refreshed on member surfaces
- [ ] app gate copy/status copy/dashboard labels reviewed against current codex
- [ ] build/deploy lane evidence refreshed (`build`, `build:cf`, runtime map)
- [ ] smoke evidence refreshed for app runtime lane
- [ ] Team 3 gate report emitted with mandatory format

## 3) Required Gate Commands

```bash
pnpm --filter @omdalat/app build:cf
pnpm --filter @omdalat/web build:cf
npm run cf:runtime-map:check
npm run mail:smoke:e2e:live
npm run mail:smoke:e2e:live-strict
npm run team3:report:check
```

## 4) Report Format (Mandatory)

Team 3 reports must follow:

- `docs/TEAM3_GATE_REPORT_TEMPLATE_2026-04-28.md`
- `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md` (current submission file)

and include:

- commands used
- pages tested
- affected files
- result
- risks
- rollback note
- approval recommendation
- blocker classification (`code/toolchain/governance`)

## 5) Current Known Constraints

- `mail:smoke:e2e:live-strict` remains non-default gate because strict outbox has intermittent failures.
- `ap.omdalat.com` canonical cleanup can be enforced only when infra/DNS ownership is explicitly in scope for Team 3.

## 6) Next Action

Use this file as Team 3 entrypoint before each runtime change, and publish a fresh gate report after each P0 pass.
