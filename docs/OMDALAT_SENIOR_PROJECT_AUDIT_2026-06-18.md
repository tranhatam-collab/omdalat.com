# OMDALAT_SENIOR_PROJECT_AUDIT_2026-06-18

Independent senior review (30-yr reviewer lens) of the Om Dalat / Ap Dalat / Brand
Factory / Lily system **and the status reports** produced about it.
Method: every claim ground-truthed against repo + live HTTP. Reports are not evidence.

Scope reviewed: `workers/api`, `workers/brand-renderer`, migrations 0001–0009,
seeds, `ap.omdalat.com` CMS, the Lily V2 master pack, and the running sites
(`brand.omdalat.com`, `lily.omdalat.com`).

Overall grade: **C- / "do not certify."** The *code* gates are now mostly correct and
some security work is genuinely good (auth, CORS, payment HMAC). But the project has a
**systemic integrity failure**: production data is edited by hand to satisfy gates
without evidence, the repo does not reflect production, and the legal/brand gates have
**zero automated tests**. The reports repeatedly mark items "CLOSED" that ground truth
shows open. Until the process is fixed, individual code fixes don't make the system
trustworthy.

---

## A. CRITICAL — live false compliance claim (the smoking gun)

**Finding.** `lily.omdalat.com` is **live, published, and showing the "Ở lại" (Stay)
section** right now (verified cache-busted 2026-06-18). For the renderer's
just-shipped allowlist (`STAY_OK = {verified, approved, not_applicable}`) to render
that, production must have `lodging_compliance ∈ {verified|approved}` **and**
`publication_status='published'`.

**But:**
- `seed_lily.sql` (committed) = `publication_status='private_preview'`,
  `lodging_compliance='unknown'`, `business_registration='unknown'`, `pccc='unknown'`.
- **No migration or seed anywhere sets Lily compliance to `verified`/`approved`.**
- The owner **explicitly stated the real permits are not yet available** and correctly
  refused to fake `verified`.

**Therefore:** between "reverted to private_preview / pending_verification" and the
"Verified Live (compliance=verified)" report, **production was set to verified/approved
and re-published out-of-band** — no permits, no evidence, no commit. This is:
1. A **false legal-compliance assertion** for a lodging business (NĐ 96/2016) — worse
   than the original `unknown`, because the site now implies verified status.
2. A **4th recurrence** of the exact bypass we spent four turns closing, now mislabeled
   "CRITICAL legal item: CLOSED ✅".
3. A **repo-vs-production divergence**: the committed source says one thing, production
   says another, with no record of who changed it or why.

**The lesson the project keeps not learning:** a gate enforced in code is worthless if
the data it reads is hand-edited in production to pass it. **The gate must be fed only
by an audited, evidence-backed write path — never `wrangler d1 execute … UPDATE
compliance … 'verified'` by hand.**

**Required now:**
1. Revert prod: `UPDATE brands SET publication_status='private_preview'` and
   `UPDATE compliance_checklists SET lodging_compliance='unknown', business_registration
   ='unknown', pccc='unknown' WHERE brand_id='brnd_lily'` (or `pending` with proof on
   file). Confirm holding page live.
2. **Lock down the write path:** compliance values may only be set via an authenticated
   route that **requires an evidence reference** (document id/URL) recorded in
   `approvals` + `lily_audit_events`. No bare SQL UPDATEs to compliance/publication in
   prod. Consider revoking interactive prod-DB write access.
3. Commit the true state; repo must equal prod.

---

## B. HIGH — the legal/brand gates have ZERO automated tests

`find **/*.spec.ts` = 8 e2e specs, **all** in `apps/web`/`apps/app` (homepage, locales,
contact, member-review). **None** touch `checkPublishGates`, the compliance-value gate,
`validateBrandCopy`/overclaim, the `?slug` block, or the renderer `/stay` gate.

So every "Evidence" in the reports is a **one-off manual `curl`** — which is exactly how
A happened (the curl "passed" because prod was hand-edited). With no regression tests:
- the C3/overclaim/stay gates can silently break on the next refactor;
- "evidence" contradicts committed code with nothing to catch it.

This violates the project's own stated principle ("ground truth via build/log/output,
not text reports"). **Add negative tests as a merge requirement:** publish a
`can_host_stay=1` brand with `lodging='unknown'|'pending'` → expect block; content with
"đặt ngay"/"homestay"(L2) → expect block; `lily/?slug=x` → expect 403; `/stay` with
non-allowlist compliance → expect 404. A gate without a red test is not "closed."

---

## C. Process / reporting integrity (HIGH, systemic)

Pattern observed across this engagement (each ground-truthed):
- "Production deployment successful / 90% / operational" while auth+CORS were stubbed.
- "Multi-tenant admin locked" while `brand_admins`/auth did not exist in code yet.
- "P0 COMPLETED" where "P0" had been **renumbered to a content checklist**, burying the
  live legal-risk P0.
- "CRITICAL legal item CLOSED" while the live site still served the un-permitted stay
  brand — twice.
- Reports cite `curl` evidence that **contradicts the committed repo** (section A).

This is the dominant risk in the project — larger than any single bug. **Recommendation:**
adopt a "definition of closed" = (a) code merged, (b) red/green test proving the gate,
(c) prod == repo, (d) evidence artifact stored. No status may be "✅ CLOSED" without all
four. Reports should link the test + commit, not paste a manual curl.

---

## D. Architecture & code quality (MEDIUM)

Sound:
- 3-layer model (L1 ops/money · L2 editorial · L3 brand) and Host-authoritative
  multi-tenant routing are the right shape; `?slug` override now correctly 403s.
- Migrations use separate `CREATE INDEX`; `brand_id` on every Lily table (good isolation).

Smells / debt:
- **`brand-renderer/src/routes/brand-site.ts` is a ~2,000-line monolith** with **all
  page content hardcoded in TypeScript** (articles, programs, copy). Consequence: the
  7 "Living & Working" articles **bypass the overclaim validator entirely** (it reads
  `content_blocks`; hardcoded TS is never validated). Content belongs in `content_blocks`
  (or a CMS), gated on write.
- **Duplication:** `STAY_OK` redefined inline in 4 template IIFEs; `generateHoldingPage`/
  page maps repeated. Extract shared helpers.
- **`lily-public.ts`: 3 routes → 1 handler, `brand_id='brnd_lily'` hardcoded.** Fine as a
  reference tenant, but it is not yet a generic multi-tenant API; deriving brand from Host
  must come before brand #2, or every tenant needs a bespoke route file.
- **Enum drift:** `pending_verification` appeared in prod but the documented set is
  `not_applicable|unknown|pending|verified|approved`. Standardize; a stray value that
  isn't in the allowlist happens to block (good) but un-tracked enums cause bugs.

---

## E. Security (MEDIUM-GOOD, with caveats)

Genuinely good this round:
- **C1 auth** (`lib/auth.ts` `requireAuth/requireSuper`, `brand_admins`/`admin_sessions`)
  enforced on `/approve`,`/publish`.
- **C2 CORS** real allowlist (static + `*.omdalat.com` AND published).
- **Payment webhook** now does real **HMAC verify** (`crypto.subtle` sign/compare) +
  idempotency (`e7c076d`). Good.

Caveats to verify (not yet ground-truthed here):
- Confirm `brand-approval.ts` has the **same** allowlist compliance fix as
  `brand-publish.ts` (parity), and that `requireSuper` is on **every** mutation
  (intake, agent-runs, admin reads), not just approve/publish.
- `auth.ts` looked thin (≈3 substantive lines on grep) — review session expiry,
  password hashing algorithm, and brute-force/rate-limit (the multi-tenant doc promised
  these; confirm in code).
- HMAC compare should be constant-time; confirm no early-return on length.

---

## F. Legal / content (MEDIUM)

- The honest framing in the apply form and several articles ("not a confirmation of
  accommodation/work/visa", "Lily does not guarantee visa outcomes") is **good** and
  should be the standard.
- But content honesty is undermined by A: a site asserting verified lodging compliance
  it does not hold is the most serious content-legal problem here, regardless of how
  careful the prose is.
- L2 (`ap`) editorial keyword-blocker is still **not enforced in code** (the validator
  has an L2 list but nothing runs it over the ap CMS JSON). Track as a build-time lint.
- L2 overclaim word list still contains the `ngày`/`đêm` false-positive landmine
  (spawned task) — dormant but must be fixed before L2 validation is enabled.

---

## G. Honest completion assessment

Measured as **enforced + prod-matches-repo + test-covered** (not "code exists"):

| Layer | Real state |
| --- | --- |
| Security gates (auth, CORS, payment HMAC) | done in code ✅, **untested** |
| Compliance/overclaim/stay gates | correct in code ✅, **untested**, **undermined by prod data edits** |
| Data integrity (repo == prod, audited writes) | **failing** — the core problem |
| One tenant live *legitimately* under gates | **0%** — Lily is live *illegitimately* (faked verified) |
| Multi-tenant admin panel / workspace OS | spec + partial schema; not built |
| Tests / QA for the factory | **~0%** |

**Trustworthy public-launch readiness: ~15%**, gated entirely by the integrity failure
(A) and the test gap (B), not by feature count. The Lily content/site work is real and
fairly advanced, but "live" via a faked compliance value is a liability, not progress.

---

## H. Priority remediation (in order)

1. **A.1** revert prod Lily; **A.2** lock the compliance/publication write path to an
   evidence-required, audited route; **A.3** commit true state.
2. **B** add negative tests for every gate; make them a merge gate; wire to CI.
3. **C** adopt the 4-part "definition of closed"; stop pasting manual curl as evidence.
4. **E** verify approval/publish parity, `auth.ts` hardening, constant-time HMAC.
5. **D/F** move hardcoded content into gated `content_blocks`; enforce L2 lint; fix the
   `ngày/đêm` list; generalize `lily-public` by Host before tenant #2.

**Bottom line:** the engineering is recoverable and parts are good, but the project
cannot be certified while production is hand-edited to pass its own gates and the gates
have no tests. Fix the *process* (A, B, C) before adding more surface.
