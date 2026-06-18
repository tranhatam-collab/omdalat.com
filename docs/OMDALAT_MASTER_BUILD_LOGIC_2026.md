# OMDALAT_MASTER_BUILD_LOGIC_2026

The single source-of-truth build-logic plan for the Om Dalat / Ap Dalat / Brand
Factory / Lily V2 system. Everything else is a detail doc; **this file decides order,
dependencies, and invariants.** If any doc disagrees with this one on sequencing or a
gate, this file wins.

Status: LOCKED · Last ground-truthed: 2026-06-18
Reconciles: the 3-layer lock, multi-tenant admin, Brand Factory code, and the Lily V2
Master Pack (22 files in `docs/LILY_V2_IMPLEMENTATION_MASTER_PACK_2026/`).
Read-with: `APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17.md`,
`APDALAT_BRAND_FACTORY_CODE_AUDIT_2026-06-17.md`,
`OMDALAT_COMPLETION_REPORT_RECONCILIATION_2026-06-17.md`.

---

## 0. The 6 invariants (never violated, at any phase)

1. **Gates are the product.** A feature whose gate is not *enforced in code* is 0% done
   for trust purposes, regardless of how much code exists. No "% complete" counts an
   unenforced gate as progress.
2. **3 layers, fixed roles.** L1 ops+money (`omdalat.com`/`app`/`api`, `pay.iai.one`) ·
   L2 editorial (`ap.omdalat.com`, no commerce, hotel/booking keyword-blocked) ·
   L3 brand microsites (`{brand}.omdalat.com`, story+inquiry; booking delegates to L1).
3. **Multi-tenant isolation.** 1 subdomain = 1 tenant. The **Host is authoritative** for
   tenant identity. Every tenant-scoped query carries `WHERE brand_id = ?`. Cross-tenant
   access → 403. No client-supplied value (query param, body) may override the Host.
4. **Human gate before public.** AI/agents draft ≤90%; an authenticated **Admin**
   (super-admin for publish) approves. `approved_by` = the authenticated principal,
   never a body field.
5. **No overclaim, Vietnamese-first.** VI is source; EN is reviewed adaptation
   (`translation_status='ready'` to show). Forbidden copy (overclaim L3 + hotel/booking
   on L2) is blocked by a validator, not by convention.
6. **Ground truth.** Done = build/log/output proves it (migration applied, endpoint
   returns 403 unauth, page renders by Host). A text report is not evidence.

---

## 1. Verified state (2026-06-18) — what is actually true

### ✅ Real and correct
- **Git recovered** (`git fsck` clean; `cbc379b5` readable). Commits land.
- **L1/L2/L3 + multi-tenant routing present.** `brand-renderer` wrangler has wildcard
  `*.omdalat.com/*` (zone `omdalat.com`) + `brand.omdalat.com`; renderer derives slug
  from Host subdomain.
- **`brand.omdalat.com` portal is live** ("Om Dalat Brand System Portal").
- **C1 auth — DONE.** `requireAuth`/`requireSuper` (`lib/auth.ts`) enforced on
  `/approve` and `/publish`; `brand_admins` + `admin_sessions` tables exist.
- **C2 CORS — DONE.** `isOriginAllowed` = static allowlist + `*.omdalat.com` **and**
  `publication_status='published'`. Allow-all removed.
- **Schema depth:** migrations 0001–0007 (+ `0004_brand_admins`), 2 brand seeds
  (`vuonhong3`, `lily`), `media_assets`, `business_lines`, ap L2 editorial JSON.
- **Lily V2 Master Pack** present: 22 spec files incl. DB schema, OpenAPI contract,
  role/permission matrix, privacy/compliance, QA gates.

### ❌ Still open / defects (these gate everything below — see P0)
- **C3 — compliance-VALUE gate NOT enforced.** `checkPublishGates` still only counts an
  `approve_compliance` *row*; it never reads `lodging_compliance/business_registration/
  pccc` values. A homestay (Lily, Vườn Hồng 3) can be published with lodging=`unknown`.
  Legal risk (NĐ 96/2016). **OPEN.**
- **H3 — overclaim/forbidden-copy validator: absent.** No code blocks "đặt ngay/đã mở
  cửa/đạt chuẩn" (L3) or "homestay/booking" (L2). **OPEN.**
- **Tenant leak — `?slug=` overrides Host.** `brand-site.ts` honors
  `url.searchParams.get('slug')` before Host → `lily.omdalat.com/?slug=vuonhong3`
  renders the wrong tenant. Violates invariant 3. **OPEN.**
- **Migration collision** — two `0004_*` files (`0004_brand_admins.sql`,
  `0004_brand_compliance.sql`). Renumber admins → `0008_brand_admins.sql`.
- **Stray file** `workers/api/src/lib/audit 2.ts` (accidental copy) — delete.
- **Overstated "Phase 2 COMPLETED."** The "8 Lily V2 routes (/stay,/workspace,…)" have
  **no route files**; `apps/app/app/lily` does not exist. They are content text, not
  working routes. Treat Lily V2 site as **scaffold**, not done.
- **`lily.omdalat.com` not live** (ECONNREFUSED) — DNS CNAME pending.

---

## 2. System map (one picture)

```
L1  omdalat.com / app.omdalat.com / api.omdalat.com    [Next + Worker + D1 omdalat-core + pay.iai.one]
      ├─ member system, payments, owner/admin dashboards
      ├─ Brand Factory API: intake, agent-runs, approve(auth), publish(auth), inquiry
      └─ Lily workspace OS (app.omdalat.com/lily/*)               ← Master Pack 04,09

L2  ap.omdalat.com                                      [editorial; no commerce; keyword-blocked]
      └─ place/profile entries (e.g. place-vuonhong3, place-lily) soft-linking to L3

L3  *.omdalat.com  (one tenant per subdomain)           [brand-renderer Worker]
      ├─ brand.omdalat.com  → Super-Admin Brand Portal (Om Dalat)
      ├─ {brand}.omdalat.com → public microsite + (future) /admin tenant panel
      │     • lily.omdalat.com  (multi-business-line: stay/workspace/programs/jobs/…)  ← Master Pack
      │     • vuonhong3.omdalat.com (homestay)                                          ← build spec
      └─ tenant identity = Host (authoritative); isolation by brand_id
```

Lily is **one L3 tenant** that happens to have multiple `business_lines`; the Master
Pack is the per-tenant spec set, not a separate system.

---

## 3. Build sequence (dependency-ordered; do not skip ahead)

### P0 — Close the gates (blocks ALL public exposure)
No tenant DNS, no `/admin` panel, no "publish" goes live until P0 is green.

1. **C3 compliance-value gate.** In `checkPublishGates`: when `brand.can_host_stay=1`,
   require `compliance_checklists.lodging_compliance != 'unknown'` AND
   `business_registration != 'unknown'` AND `pccc != 'unknown'`. Gate the renderer Stay
   section on the same values. *Evidence:* publish a homestay with lodging=`unknown` →
   400.
2. **H3 overclaim validator.** `validateBrandCopy(payload,{layer})` on content
   create/update + as a `content_approved` precondition. Block L3 overclaim list and L2
   hotel/booking list; return the offending term. *Evidence:* save "đặt ngay" → rejected.
3. **Tenant leak.** Make Host authoritative: ignore `?slug=` in production (allow only
   in a `APP_ENV=sandbox` flag). *Evidence:* `lily/?slug=vuonhong3` renders Lily.
4. **Migration hygiene.** Renumber `0004_brand_admins.sql` → `0008_brand_admins.sql`;
   delete `audit 2.ts`. *Evidence:* `wrangler d1 migrations list` is sequential, applies
   clean on a fresh DB.
5. **Re-verify C1/C2 on every mutation route** (intake, agent-runs, inquiry-admin reads):
   auth present, `approved_by`=principal. *Evidence:* unauth `POST /approve` → 401.

Exit P0 when: a fresh-DB migrate succeeds, the 5 evidences pass, and no public host is
reachable that bypasses a gate.

### P1 — Make one tenant real, end-to-end (Lily as the reference)
Depends on P0. Lily is the proof that the tenant pipeline works under the gates.

1. **DB:** apply Lily Master Pack `16_LILY_DB_SCHEMA_V1.sql` as `0009_lily_v2_schema.sql`
   (renumber — **not** `0005`, which is taken). Map its tables onto `business_lines` +
   tenant tables; no parallel `brands`.
2. **API:** implement Master Pack `17_LILY_API_CONTRACT_OPENAPI_V1.yaml` as
   `workers/api/src/routes/lily-*.ts`, all auth-gated + `WHERE brand_id`.
3. **Public site:** turn the "8 V2 routes" from content into **real renderer routes**
   (`/stay /workspace /programs /jobs /training /international /visa-support /apply`),
   each VI-first + EN-adaptation-gated, fed by content_blocks. Homestay/stay route gated
   by C3.
4. **Owner consent + compliance + images** for Lily filled (the human 10–20%); resolve
   the rounded `12.15,108.45` to real coordinates.
5. **DNS:** add CNAME `lily` → `omdalat.com` (proxied). *Evidence:* `lily.omdalat.com`
   serves the microsite by Host; `curl` 200; gates honored.

Exit P1 when: Lily publishes only after super-admin approval with all gates green, and
renders live and isolated.

### P2 — Tenant admin panel (multi-tenant self-service)
Depends on P0+P1. Build `{brand}.omdalat.com/admin` + `brand.omdalat.com/admin`
(super-admin) per Master Pack `09`,`10`,`19` (role matrix) and the multi-tenant doc.
Auth via `brand_admins`/`admin_sessions`; session scoped + `brand_id` claim; every read
isolated. **Never wire `/admin` before P0** (an unauthed admin on a live tenant is the
worst case).

### P3 — Lily workspace OS in L1 app
Depends on P1. `app.omdalat.com/lily/*` per Master Pack `04`,`09` (residency, workspace,
job board, learning). This is L1 (member/auth/money), not the L3 microsite.

### P4 — Compliance & operations
Master Pack `13` (privacy/terms, NĐ 13/2023), `07` (foreign-resident/visa support —
**no legal overclaim**; status + checklist only), `14` (QA release gates + evidence
packet). Wire the evidence packet into the publish gate.

### P5 — Content & SEO at scale
Master Pack `11`,`12`. L2 editorial backlog (30 articles), real images (rights/consent
via `media_assets`), JSON-LD + OG on publish, hreflang. Then replicate the tenant
pipeline to the next brands (Vườn Hồng 3 → cluster 1).

---

## 4. Per-phase Definition of Done (global gate to "100%")

A phase is done only when (invariant 1 + 6):
- migrations apply clean on a fresh `omdalat-core`;
- every new mutation route returns 401/403 unauthenticated and 403 cross-tenant;
- every gate has a passing negative test (the bad input is actually blocked);
- VI present, EN gated on `translation_status='ready'`;
- no `{{TOKEN}}` placeholder renders publicly;
- an evidence packet (Master Pack `14`) records the proofs — not prose.

The system is "100%" only when each live tenant passes the rubric in
`APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026.md §17` **and** P0 gates have negative-test
coverage in CI.

---

## 5. Honest completion picture (replaces the single "67%/done")

| Dimension | State |
| --- | --- |
| Infra / schema / routing scaffold | ~75% (substantial, real) |
| Security gates (C1 auth, C2 CORS) | **done** ✅ |
| Trust gates (C3 compliance, overclaim, tenant-leak) | **open** — P0 |
| One tenant live end-to-end under gates | ~20% (Lily scaffolded, not live, gates pending) |
| Tenant admin panel / workspace OS | ~5% (spec only) |
| Content / SEO / multi-brand scale | early |

**Public-launch readiness is bounded by the trust gates: until P0 is green, ~15%.**
The path to 100% is P0 → P1 → P2 → P3 → P4 → P5, gates enforced at every step.

---

## 6. Standing rule for the dev team

Build **depth-first through one tenant (Lily) under the gates**, not breadth-first
across features. Every "done" must ship with the negative test that proves its gate.
Adding surface (routes, tenants, panels) on top of an open gate increases risk and does
not increase completion.
