# Om Dalat Project Rules for AI Agents

## Legal Entity (ADR-003)

**CÔNG TY TNHH SX-TM-DV THÁI LÂM** is the legal entity for the entire Om Dalat ecosystem.

- MST: 5801443073
- Address: 42 Cao Bá Quát, Phường Lang Biang, Đà Lạt, Lâm Đồng
- Representative: TRẦN NGUYỄN HẠ THI
- Type: Công ty TNHH 2 thành viên trở lên
- Active since: 2020-09-17
- Status: Đang hoạt động

This entity covers: Tam Farms (chain model), Lily (reference location), and all future brands/locations.

**Rule:** All legal references in charters, terms, privacy policies, and contracts MUST reference this entity. Do NOT use "Tran Ha Tam sole proprietorship" — that was the pre-2026-07-01 placeholder.

## Architecture (ADR-003)

- **Tam Farms** = Chain Model (brand_type: `chain_model`). NOT a location. Audited under TAMFARMS_MODEL_STANDARD.
- **Lily** = Reference Location 01 (brand_type: `reference_location`). Audited under TAMFARMS_LOCATION_STANDARD.
- **English name:** "Tam Farms" (plural), NOT "Tam Farm" (singular).
- Compliance rules (lodging, PCCC, business_registration) apply to LOCATIONS, not to the chain model.
- 5-tier standard system: see `docs/governance/standards/`

## Definition of "CLOSED" / "DONE" / "VERIFIED"

An issue, gate, or blocker is **CLOSED** only when ALL four conditions are met:

1. **Code merged** — the fix/feature is committed to `main` with a descriptive commit message
2. **Tests pass** — including negative tests that prove the gate actually blocks bad cases
3. **prod == repo** — production database state matches committed seed/migration files
4. **Artifact preserved** — evidence, audit trail, or documentation exists and is referenced

**Curl/manual checks are NOT sufficient evidence.** They can pass because:
- Prod was hand-edited out-of-band (the exact bypass we closed on 2026-06-18)
- Cache returns stale results
- The test only checks the happy path

**Valid evidence types:**
- Automated test output (CI green)
- Migration file that records state change with evidence references
- `lily_audit_events` or `brand_approvals` table entry
- Screenshot or signed document (for legal compliance)

---

## Compliance & Legal Gates

### Critical Rule: Compliance fields MUST NOT be updated manually

The fields `lodging_compliance`, `business_registration`, `pccc` in `compliance_checklists` are **LEGAL ASSERTIONS**.

**PROHIBITED:**
- `wrangler d1 execute ... UPDATE compliance_checklists SET lodging_compliance='verified'`
- Any direct SQL UPDATE to compliance fields without evidence

**REQUIRED:**
- Use `/api/omdalat/brands/:id/compliance` (POST) route
- Requires `evidence_map`: every field must reference an `evidence_id` in `compliance_evidence` table
- Requires `reason` (min 20 chars)
- Writes audit trail to `lily_audit_events` + `brand_approvals` + `audit_logs`
- Requires super admin auth

### Allowed compliance values

```
verified, approved, not_applicable, unknown, pending
```

The **publish gate** and **renderer `/stay` gate** use the same allowlist:
```js
const OK = new Set(['verified', 'approved', 'not_applicable']);
```

Any value NOT in this set blocks publishing AND blocks `/stay` rendering.

---

## Publish Gate (C3 Gate)

Before any brand with `can_host_stay=1` can be published:

```
owner_consent === 'approved'
content_approved === true
images_approved === true
compliance_reviewed === true  // all 3 fields in OK set
qa_passed === true
```

The `compliance_reviewed` check **overrides** any approval in `brand_approvals` table. Even if someone manually inserts an approval row, the gate still checks the actual compliance values.

---

## Renderer Gate Parity

The renderer (`brand-site.ts`) must use the **exact same logic** as the publish gate:

| Gate | Location | Logic |
|------|----------|-------|
| Publish | `brand-publish.ts:213` | `new Set(['verified','approved','not_applicable']).has(value)` |
| `/stay` route | `brand-site.ts:~157` | `!STAY_OK.has(brand.lodging_compliance)` → 404 |
| Nav link (V2) | `brand-site.ts:~327,~568` | `STAY_OK.has(...)` ? show : hide |
| Nav link (home) | `brand-site.ts:~2038` | `STAY_OK.has(...)` ? show : hide |

**Rule:** When updating publish gate logic, update ALL renderer gates simultaneously.

---

## Evidence & Audit Trail

### Required evidence for compliance claims

| Field | Required Evidence | Example |
|-------|-------------------|---------|
| `business_registration` | Business license photo/scan | "42C8002522" — Phong Tai chinh huyen Lac Duong |
| `lodging_compliance` | ANTT cert or hotel license | "62/GCN" — Cong an huyen Lac Duong, NĐ 96/2016 |
| `pccc` | PCCC inspection report | "BBKT-17022022" — Phong Canh sat PCCC&CNCH |

### Evidence storage

1. Physical photos: store in secure folder, filename pattern `{brand}_{type}_{date}.{ext}`
2. Database: insert into `compliance_evidence` table with:
   - `reference_number` (document number)
   - `issuing_authority` (who issued it)
   - `issue_date`
   - `verified_by` (person who verified)
   - `notes` (summary of document content)

---

## Database State Sync

After ANY manual D1 command that changes brand state:

1. **Immediately** update `seed_lily.sql` or create a migration
2. **Run tests** to verify the state change doesn't break gates
3. **Commit** before declaring anything "done"

**Never leave prod != repo overnight.** This is how bypasses happen.

---

## Testing Requirements

### Gate tests (negative tests are mandatory)

Every gate MUST have tests proving:
- It blocks the bad case (unknown, pending, null, missing row)
- It passes the good case (verified, approved, not_applicable)
- It handles edge cases (can_host_stay=0 bypass, missing compliance row)

Location: `workers/api/tests/gate-*.test.ts`

### Current test files

| File | Coverage |
|------|----------|
| `gate-compliance.test.ts` | Publish gate + renderer /stay gate (15 tests) |
| `compliance-update.test.ts` | Compliance update route validation (10 tests) |

---

## Content & Overclaim

### Hardcoded content in `brand-site.ts`

The 7 Living & Working articles (and all program/article content) are currently hardcoded in TypeScript.

**Problem:** They bypass the `content_blocks` → `overclaim-validator` pipeline.

**Fix (when time permits):**
1. Move hardcoded content into `content_blocks` table
2. Run `validateBrandCopy()` over it before publish
3. Or: extend validator to check the hardcoded map in a unit test

### Image Reality Standard

- No "minh hoa" (illustrative) images on public pages
- All images must be real or marked `image_pending` (hidden)
- `alt_text` must describe actual content, not "hinh anh minh hoa"

---

## Deployment Checklist

Before declaring any deploy "live":

- [ ] Code committed to `main`
- [ ] Tests pass (`npx vitest run`)
- [ ] DB migrations applied (if schema changed)
- [ ] Seed file matches prod (for existing brands)
- [ ] `wrangler deploy` succeeded for all workers
- [ ] Verify prod == repo (check DB state vs committed files)
- [ ] Negative test: confirm gate blocks bad case on prod
- [ ] Anti-confusion CI guard passes (`node scripts/guard-subdomain-anti-confusion.mjs`)
- [ ] No secrets in commits (check with `git log --all --source --full-diff -p | grep -i "password\|token\|secret"`)

---

## Subdomain Anti-Confusion Guard

**Script:** `scripts/guard-subdomain-anti-confusion.mjs`
**CI:** `.github/workflows/ci-guard.yml` → job `guard-subdomain-anti-confusion`
**Standard:** `docs/governance/OMDALAT_ANTI_CONFUSION_CI_STANDARD_2026.md`

This guard enforces 15 rules + F1/F2 specific checks. It must pass before any deploy.
Run locally: `node scripts/guard-subdomain-anti-confusion.mjs`

Key rules:
- `ap.omdalat.com` must NOT appear in middleware redirects (F2).
- App deploy workflow must build `@omdalat/app`, not `@omdalat/web` (F1).
- `OMDALAT_AP` must NOT be used as a product identifier.
- `app.omdalat.com` must be fully `noindex` (robots.txt + middleware).
- Every brand marked LIVE must have a Brand Charter in `docs/governance/brand-charters/`.

---

## Contact & Emergency

If you discover prod != repo or compliance was set without evidence:

1. **DO NOT** publish any more changes
2. Document current state (screenshots, DB queries)
3. Create incident record in `lily_audit_events`
4. Revert to last known good state if safe
5. Alert: Tran Ha Tam (owner)

---

## Version

Last updated: 2026-06-30
Audit trigger: Senior review found prod≠repo gap (compliance set without migration)
Status: Rules adopted, gates fixed, tests passing, evidence recorded
Subdomain anti-confusion guard: ACTIVE (2026-06-30)
