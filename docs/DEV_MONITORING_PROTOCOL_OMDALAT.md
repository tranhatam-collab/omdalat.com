# DEV MONITORING PROTOCOL
# OMDALAT.COM

Version: 1.0
Status: Active monitoring protocol
Owner: Codex monitoring role
Purpose: Track Team 1 and Team 2, report drift, and fix errors when needed

---

# 1. Monitoring Role

The monitoring role is responsible for:
- checking alignment between Team 1 and Team 2
- reporting risks, regressions, and drift
- identifying build and runtime failures
- fixing implementation errors when approved or clearly in-scope

This role does not replace either team.
It keeps both teams aligned and catches problems early.

---

# 2. Monitoring Targets

Monitor these areas continuously:

## Team 1
- public routes
- docs routes
- package presentation
- public pricing visibility
- docs domain consistency
- public copy vs runtime truth

## Team 2
- free-member runtime
- package entitlements
- role state
- trust/proof runtime
- program and offer operations
- access enforcement

## Shared
- role naming
- package naming
- docs gating rules
- upgrade logic language
- trust terminology

---

# 3. Red Flags To Report Immediately

- public site exposes exact prices
- docs domain references are inconsistent
- Team 1 and Team 2 use different role names
- Team 1 and Team 2 use different package names
- free-member meaning differs between docs and app
- trust labels differ across surfaces
- build preflight fails
- typecheck preflight fails
- runtime routes break
- duplicate files or drift files start affecting truth

---

# 4. Current Snapshot Baseline

Current observed state at monitoring start:
- `npm run build` preflight passes
- `npm run typecheck` preflight passes
- repo is not clean; there are many modified and duplicate files
- Team 1 and Team 2 plan docs have now been defined

This means:
- build gate is currently alive
- coordination risk is currently higher than build risk

---

# 5. Weekly Monitoring Report Format

Every report should include:

## 5.1 Team 1 status
- shipped
- changed
- drift risk
- blockers

## 5.2 Team 2 status
- shipped
- changed
- drift risk
- blockers

## 5.3 Shared contract status
- role names
- package names
- free-member meaning
- docs gating
- upgrade path wording
- trust vocabulary

## 5.4 Errors requiring fix
- build issues
- broken routes
- mismatched labels
- broken access rules
- docs/runtime inconsistency

---

# 6. Fix Priority Rules

Fix in this order:

1. broken build or broken typecheck preflight
2. broken routes or broken navigation
3. package visibility violations
4. docs/runtime truth mismatch
5. role/package naming drift
6. future-connector creep into core build

---

# 7. Reporting Style

Monitoring reports should be short and direct.

Use:
- what changed
- what is safe
- what is drifting
- what needs fixing now
- what can wait

Avoid:
- vague summaries
- generic encouragement without status
- changelog noise without impact

---

# 8. Final Directive

The monitoring role exists to keep OMDALAT coherent while two DEV teams work in parallel.

The priority is:
- one truth
- one package language
- one free-member meaning
- one trust vocabulary
- one calm path from public site to runtime value
