# OMDALAT_COMPLETION_REPORT_RECONCILIATION_2026-06-17

Reconciling the **"67% completion" report** (and its 3 docs:
`OMDALAT_TOTAL_COMPLETION_AUDIT_2026.md`, `OMDALAT_REMAINING_TASKS_DETAILED_2026.md`,
`OMDALAT_COMPLETION_ROADMAP_2026.md`) against **ground truth in the repo** and the
locked plan + my code audit (`APDALAT_BRAND_FACTORY_CODE_AUDIT_2026-06-17.md`).

Method: founder's own rule — *ground truth from build/output, not a text report.*
Every claim below was checked against files/commands, not taken on faith.

> **Headline:** the report is **directionally useful but dangerously optimistic.** It
> correctly flags the git corruption, but it scores a **security/governance layer that
> is not actually enforced** as "90% ✅ / Production deployment successful," and its
> "weaknesses" list **omits the real deploy-blockers** (no auth, allow-all CORS,
> compliance gate not enforced, renderer ignores Host). A "% complete" that counts
> ungated, unauthenticated code as nearly done hides exactly the risk this whole system
> was built to prevent.

---

## 1. Claim-by-claim verdict

| Report claim | Ground truth | Verdict |
| --- | --- | --- |
| "Git repository corrupted (CRITICAL)" | `git status` → `fatal: unable to read tree (cbc379b5…)`; `git fsck` hangs. Real. | ✅ **Accurate** — genuinely CRITICAL; blocks clean commits. |
| "3 report docs created" | All 3 exist, 3 distinct md5s (not duplicates). | ✅ Accurate. |
| "Workers & API: 90% ✅" | Auth on Brand Factory endpoints: **0 matches**. CORS `isOriginAllowed` → `return true` (3×, allow-all). Compliance gate checks an *approval row*, never `compliance_checklists` values. Renderer ignores `Host`. | ❌ **Misleading** — the code exists, but the governance/trust layer (the actual product) is **not enforced**. Functionally far below 90%. |
| "Production deployment successful ✅" | Only `.wrangler/tmp/dev-*` artifacts found (local `wrangler dev`). No proof of a prod deploy; and if it *was* deployed, it shipped no-auth + allow-all-CORS + fake-routing code. | ❌ **Unverified & unsafe** — the ✅ is unjustified; if literal, it's a security incident, not a milestone. |
| "Brand Factory system operational" | 2 brands seeded (`vuonhong3`, `lily`) but both `private_preview`, `consent='pending'`, compliance `unknown`, full of `{{TOKEN}}`. Pipeline endpoints return 200 but bypassable. | ⚠️ **Half-true** — scaffolded & demoable, not *operational* under its own gates. |
| "2/5 brand profiles (40%)" | `seed_vuonhong3.sql`, `seed_lily.sql` present. Both are placeholder scaffolds, owners unverified. Lily coords `12.15, 108.45` look **rounded/placeholder**, not resolved from its Maps link. | ⚠️ Overstated — 2 *scaffolds*, ~0 *verified profiles*. |
| "DNS for lily.omdalat.com (30 min)" | Renderer derives slug from `?slug=` query (`|| 'lily'`), **not** the Host. DNS alone won't route it. | ❌ Wrong effort estimate — blocked by code (audit H1), not a 30-min DNS task. |
| "Multi-layer architecture implemented" | L1 api / L2 ap-json / L3 renderer all physically present. | ✅ Accurate (structurally). |
| Weaknesses = {git, frontend behind, content missing, testing} | True but **incomplete** — omits: no API auth, allow-all CORS, lodging-compliance gate not enforced, renderer fake routing, inquiry without consent (NĐ 13/2023). | ❌ **Critical omission** — the report's risk list misses the deploy-blockers. |
| Overall "67%" | Blends "scaffolding exists" with "gate enforced & verified" into one number. | ⚠️ Misleading frame (see §3). |

---

## 2. My prior CRITICAL findings are STILL OPEN (not fixed before this report)

Re-verified today, after the report was written:

- **C1 (no auth):** `brand-approval.ts` auth-token matches = **0**. Anyone can
  `approve_publish`. Open.
- **C2 (allow-all CORS):** `cors.ts` still `return true`. Open.
- **C3 (compliance gate fake):** `checkPublishGates` still counts an `approve_compliance`
  row, never reads `lodging_compliance`/`pccc` values. Open.
- **H1 (renderer ignores Host):** still `url.searchParams.get('slug') || 'lily'`
  (default merely changed `vuonhong3`→`lily`). Open.

→ The "67%/90%" was reported **on top of known, unfixed CRITICAL gaps**, without listing
them as blockers. That is the central reconciliation failure.

---

## 3. Why "% complete" is the wrong frame here

The locked plan's thesis: **the gates ARE the product** (owner consent, compliance,
overclaim block, human approve-publish, real Host routing). A feature whose gate is not
enforced is not "90% done" — for trust purposes it is **0%**, because it cannot be
exposed safely. Counting lines-of-endpoint as completion inverts the risk.

Two honest numbers instead of one blended 67%:

| Dimension | Reality |
| --- | --- |
| **Scaffolding / infra present** (D1 schema, migrations 0001–0007, workers, renderer stub, 2 seeds, ap CMS json) | ~70% — genuinely substantial. |
| **Trust/governance enforced & verifiable** (auth, CORS, compliance gate, consent, overclaim block, Host routing, clean git) | **~10%** — the gates that make any of it publishable are stubbed/bypassable; git can't even ship a fix cleanly. |

"Publishable-to-the-public readiness" = bounded by the second number, **~10%**, not 67%.

---

## 4. Scope additions the team made (not in the locked plan — audit them too)

- **`0006_media_assets.sql`** — new D1 table for brand media with
  `rights_status` + `consent_obtained`. Good direction (covers the image-rights gate),
  but **field-name drift** from the locked image standard (`license_type`,
  `consent_verified`). Decision needed: adopt this shape or align to the standard;
  document either way. Confirm the publish/render path actually *reads*
  `consent_obtained` (else it repeats the C3 pattern).
- **`0007_business_lines.sql`** — new concept "business lines" for multi-line brands
  (Lily). Its status enum *encodes* gating (`roadmap_private_noindex`,
  `phase_1_public_after_compliance`, `phase_1_public_after_owner_confirmation`) — good
  instinct. But it is **net-new architecture absent from the locked plan**. Add a plan
  entry (which layer, who flips status, how it interacts with the brand publish gate)
  so it doesn't drift.
- **Lily coordinates `12.15, 108.45`** look rounded/placeholder — verify they were
  actually resolved from the Maps link (unlike vuonhong3's precise `12.0985412`).
  Don't seed approximate geo as if verified.

---

## 5. Corrected priority (supersedes the report's "Phase 1")

The report's Phase 1 = {git, DNS, commit Lily}. Correct order:

1. **Git recovery** — ✅ the report is right this is #1 (can't safely ship fixes otherwise).
   Recover the missing tree object / re-clone + cherry-pick working tree; verify
   `git fsck` clean before anything else.
2. **Close CRITICAL gates before any public exposure** (audit C1→C2→C3, then H1→H4):
   auth on `/api/omdalat/*`, real CORS allowlist, compliance-value gate, Host-based
   routing. **Do not** treat "DNS for lily" as a step until H1 lands.
3. **Re-baseline the completion number** using §3's two dimensions, not a single 67%.
4. Then the report's frontend/content/testing sprints — which are legitimately behind
   and fairly described.

---

## 6. What the report got right (keep)

- Flagging git corruption as #1 CRITICAL — correct and important.
- Frontend (apps/web, apps/app) and editorial content genuinely behind — fair.
- Testing/QA ~low — fair; no test suite was found for the brand factory gates.
- Roadmap structure (phased sprints) is a reasonable shape **once §5 reorders it**.

---

## 7. One-line verdict

The system is a **solid scaffold sitting on unenforced gates and a corrupted git
repo.** It is **not 67% toward the locked plan in the way that matters**: until auth,
CORS, the compliance gate, and Host routing are real (and git is clean), public-launch
readiness is ~10%, regardless of how many endpoints return 200.

---

## 8. Round 2 — "Multi-tenant admin (commit 5c95c92)" reconciliation

The team then reported multi-tenant architecture "locked/deployed." Ground-truth check:

### ✅ Verified TRUE
- **Git recovered.** `git cat-file -t cbc379b5` → `tree` (was `fatal: unable to read
  tree`); `git log`/`status` work. The earlier CRITICAL git corruption is **resolved.**
  (Note: uncommitted changes remain — `place-lily-lac-duong.json`, member login/register.)
- **Wildcard route now real.** `workers/brand-renderer/wrangler.jsonc` has
  `"pattern": "*.omdalat.com/*", "zone_name": "omdalat.com"` (+ `brand.omdalat.com`
  custom domain). Fixes the routing-config half of audit H1.
- **Renderer reads Host.** `brand-site.ts` now derives slug from the subdomain
  (`host.split('.')`, excludes `brand/api/www`). Fixes the other half of H1.
- **Portal is live.** `https://brand.omdalat.com` returns "Om Dalat Brand System Portal".
- **File 13 doc exists** (`docs/brand-portal/13_…`, brand-portal = 13 files).

### ❌ Claimed-done but NOT in the code (docs/schema only)
- **No `brand_admins` / `admin_sessions` tables.** Migrations still end at `0007`; grep
  for those names in `migrations/` = none. The "DB Schema mới" is **not in the repo.**
- **No auth enforcement.** `requireAuth/requireAdmin/verifySession/admin_sessions` in
  worker `src/` = **0 matches.** The role model (owner/manager/editor/super-admin) and
  "Tenant Isolation Rules 1–4 (WHERE brand_id, session brand_id claim, cross-tenant
  403)" are **prose only** — unenforceable, since there is no auth to establish *which*
  tenant a caller is. **Audit C1 still OPEN.**
- **No `/admin` routes.** grep `/admin` in renderer + api `src/` = none. The claimed
  "lily.omdalat.com/admin", "brand.omdalat.com/admin", login → draft → request-publish
  → super-admin-approve flow **does not exist in code.**
- **CORS still allow-all** (`cors.ts` `return true` ×3). **Audit C2 still OPEN.**
- **Compliance-value gate still not enforced.** **Audit C3 still OPEN** (unchanged).

### ⚠️ New issue introduced
- **Query param overrides Host → tenant leak.** `brand-site.ts` checks
  `url.searchParams.get('slug')` **before** the Host. So `lily.omdalat.com/?slug=vuonhong3`
  renders Vườn Hồng 3 under Lily's host — breaks the "1 subdomain = 1 tenant" isolation
  the report just locked. Host must be authoritative; drop/ignore the `?slug=` override
  in production.
- **`lily.omdalat.com` not live** (ECONNREFUSED) — consistent with pending DNS, so not a
  contradiction, but "Lily operational" is not yet true.

### Net
The multi-tenant **architecture is now well-documented and the public portal +
wildcard routing are real** — genuine progress on H1. But the **admin system's entire
value is tenant isolation, and that depends on auth + admin tables that are not in the
code.** Building more tenant surface (live wildcard `*.omdalat.com/*`) on top of an API
with **no auth and allow-all CORS** *increases* exposure. C1/C2/C3 remain the gating
blockers; "locked/deployed" overstates a layer that is currently doc + route + schema-less.

**Do not wire any `/admin` panel onto the live wildcard until C1 (auth) and C2 (CORS)
are enforced** — an unauthenticated admin panel on a live tenant host is the worst case.
