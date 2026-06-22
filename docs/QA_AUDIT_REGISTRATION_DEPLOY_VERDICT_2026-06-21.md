# QA Audit Verdict: Registration next-param fixes deploy + live test
**Date**: 2026-06-21
**Commit**: `02c93c2` on `main`
**Deployment**: `11072f7f` on CF Pages (omdalat-web)
**Auditor**: Devin (ground-truth verification, no claims from reports)

---

## 1. PRE-DEPLOY VERIFICATION

### Git state
| Item | Value |
|------|-------|
| Branch | main |
| HEAD | 02c93c2 |
| Commit message | "fix(auth): fix registration next-param chain — 4 bugs" |
| Files changed | 4 (join/page.tsx, member/page.tsx, member/resources/page.tsx, application-status/page.tsx) |
| Lines changed | +25 / -2 |
| Working tree | CLEAN |

### Diff review (all 4 fixes correct)
1. `/join` page: `localizePath("/member")` changed to `localizePath("/member/register?next=/member/welcome")` — CORRECT
2. `/member/page.tsx`: Added `canAccessSignedIn` gate with `gatePathForRequirement("signed_in", ...)` — CORRECT
3. `/member/resources/page.tsx`: Added `canAccessSignedIn` gate with `gatePathForRequirement("signed_in", ...)` — CORRECT
4. `/member/application-status/page.tsx`: Profile link now uses `shouldContinueToNext ? /member/profile?next=${encodeURIComponent(nextPath)} : /member/profile` — CORRECT

### Build
| Check | Result |
|-------|--------|
| tsc --noEmit (apps/web) | PASS (0 errors in fixed files; pre-existing e2e errors unrelated) |
| vitest run (workers/api) | 25/25 PASS |
| pnpm build:cf | PASS (44 routes built, 0 errors) |

---

## 2. DEPLOY PROCESS

### CI (GitHub Actions)
| Step | Result |
|------|--------|
| Checkout | success |
| pnpm setup | success |
| Node.js setup | success |
| Install dependencies | success |
| Build CF Pages output | success |
| Deploy to CF Pages | FAILURE (CLOUDFLARE_API_TOKEN secret missing/invalid in GitHub) |

### Local deploy (wrangler CLI)
| Step | Result |
|------|--------|
| Build | PASS |
| Upload | PASS (75 files, 2.63 sec) |
| Deployment created | `11072f7f-db45-4223-893a-b1a903d8ffbe` |
| Source commit | `02c93c2` |
| Status | LIVE (13 seconds after upload) |

### CI deploy issue
The GitHub Actions `deploy-cloudflare-pages.yml` workflow failed at the "Deploy to Cloudflare Pages" step. The `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` secret is not configured in the GitHub repository. This needs to be fixed for future CI deploys to work.

---

## 3. LIVE TEST RESULTS (curl against https://omdalat.com)

### TEST 1: /vi/join register link
**Before**: `href="/vi/member"` (dashboard, no register)
**After**: `href="/vi/member/register?next=/member/welcome"`
**Verdict**: PASS

### TEST 2: /vi/member guest gate
**Before**: HTTP 200 (no gate, guest sees empty dashboard)
**After**: HTTP 307 → `https://omdalat.com/vi/member/login?next=%2Fmember`
**Verdict**: PASS

### TEST 3: /vi/member/resources guest gate
**Before**: HTTP 200 (no gate, guest sees empty resources)
**After**: HTTP 307 → `https://omdalat.com/vi/member/login?next=%2Fmember%2Fresources`
**Verdict**: PASS

### TEST 4: /vi/member/application-status?next=/member/handbook profile link
**Before**: `href="/vi/member/profile"` (next param dropped)
**After**: `href="/vi/member/profile?next=%2Fmember%2Fhandbook"` (next preserved)
**Verdict**: PASS

---

## 4. FINAL VERDICT (per AGENTS.md standard)

### AGENTS.md rule (verbatim)
> An issue is **CLOSED** only when ALL four conditions are met:
> 1. Code merged
> 2. Tests pass (including negative tests)
> 3. prod == repo
> 4. Artifact preserved
>
> **Curl/manual checks are NOT sufficient evidence.**

### Condition check

| Condition | Status | Evidence |
|-----------|--------|----------|
| 1. Code merged | MET | Commit `02c93c2` on `main`, 4 files, +25/-2 lines |
| 2. Tests pass (incl. negative) | NOT MET | vitest 25/25 pass BUT these are gate/compliance tests, NOT registration next-param tests. No automated test covers the 4 fixed bugs. See gap analysis below. |
| 3. prod == repo | MET | CF Pages deployment `11072f7f` built from commit `02c93c2` |
| 4. Artifact preserved | MET | This report + commit message + deployment record |

### Verdict: DEPLOYED but NOT CLOSED

The 4 fixes are **live on omdalat.com** (deployment `11072f7f` from `02c93c2`). Curl tests confirm the behavior changed correctly. **However, per AGENTS.md, curl is not sufficient evidence.** The fixes cannot be declared CLOSED because no automated test covers them.

### Test gap analysis

| Bug fixed | Existing automated test? | Gap |
|-----------|--------------------------|-----|
| 1. /join link → /member/register?next=/member/welcome | NO | `public-intro-h1-cta-lock.spec.ts` checks CTA label text but NOT the href target |
| 2. /member guest gate → redirect to login | NO | `member-review-queue.spec.ts` seeds a member session; never tests guest (no cookie) |
| 3. /member/resources guest gate → redirect to login | NO | Same — no guest-path test exists |
| 4. application-status profile link preserves next | NO | `member-review-queue.spec.ts` uses `?next=/member/operations` but tests the review form, not the profile link href |

### What curl showed (NOT sufficient per AGENTS.md, recorded for reference only)

| Test | Curl result | Note |
|------|-------------|------|
| /vi/join register link | `href="/vi/member/register?next=/member/welcome"` | Correct but curl = manual check |
| /vi/member guest | HTTP 307 → login?next=%2Fmember | Correct but curl = manual check |
| /vi/member/resources guest | HTTP 307 → login?next=%2Fmember%2Fresources | Correct but curl = manual check |
| /vi/member/application-status?next=... profile link | `href="/vi/member/profile?next=%2Fmember%2Fhandbook"` | Correct but curl = manual check |

---

## 5. ACTIONS REQUIRED TO CLOSE

| # | Action | Priority | Effort |
|---|--------|----------|--------|
| 1 | Write e2e test: /join page register link href = `/member/register?next=/member/welcome` | HIGH | 30 min |
| 2 | Write e2e test: guest (no cookie) → /member → 307 redirect to login | HIGH | 30 min |
| 3 | Write e2e test: guest (no cookie) → /member/resources → 307 redirect to login | HIGH | 30 min |
| 4 | Write e2e test: /member/application-status?next=/member/handbook → profile link href preserves next | HIGH | 30 min |
| 5 | Run e2e suite against live deployment (or preview) and capture output | HIGH | 1 hour |
| 6 | Fix GitHub Actions CLOUDFLARE_API_TOKEN secret so CI deploys work | HIGH | DevOps |

---

## 6. REMAINING ISSUES (not scope of this audit)

| Issue | Priority | Owner |
|-------|----------|-------|
| GitHub Actions deploy fails (CLOUDFLARE_API_TOKEN secret missing) | HIGH | DevOps |
| VPS mail.iai.one TLS handshake timeout (email verification blocked) | HIGH | DevOps |
| `getMemberRouteRequirement` / `passesMemberRequirement` dead code | LOW | Dev |
| Guest → reviewed page cascade gate (manual click required) | MEDIUM | Dev |

---

## 7. HONEST SUMMARY

**Status**: DEPLOYED, NOT CLOSED.

The code is on main, the deployment is live, and curl confirms the behavior. But per the project's own AGENTS.md rules, this is not enough. Four e2e tests must be written and run to provide valid evidence. Until then, the 4 fixes remain in "DEPLOYED but NOT CLOSED" state.

I overclaimed "VERIFIED" in my earlier verbal report. That was wrong per AGENTS.md. Corrected here.

---

*Deployed to CF Pages (11072f7f from 02c93c2). Not CLOSED per AGENTS.md — 4 e2e tests required. 2026-06-21.*
