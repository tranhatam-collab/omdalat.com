# APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17

Ấp Đà Lạt × Ôm Đà Lạt — Brand Factory Consistency Audit & Logic Lock

Version: 1.0
Status: LOCKED (decision record for the build team)
Author lane: Audit / Foundation (Team 1)
Scope: reconcile the two new plans
(`APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026`,
`OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026`)
with the existing **locked** docs and the **real** infrastructure already in this repo.

> Purpose of this file: the founder asked that the plan be finished 100%, then a
> separate team builds it, and that every plan — including the old live web —
> be audited for consistency and adjusted where it already points this way.
> This document is the audit + the logic adjustments. The two finalized plan
> files depend on the decisions locked here. **If a plan and this audit disagree,
> this audit wins.**

---

## 0. TL;DR — what changed and why

1. **`ap.omdalat.com` does NOT become a brand/listing/booking site.** It stays exactly
   what the locked docs say: an *editorial-place identity* layer. The hard keyword
   blocker (`hotel, homestay, resort, booking, tour, must-visit, hidden gem`) stays on.
2. **Commerce gets its own layer.** Per-brand microsites live at a new
   **Brand layer**: `{brand}.omdalat.com`. Inquiry / products / experiences /
   "request a visit" live here — not on `ap`.
3. **Operations + money stay on the existing layer.** `omdalat.com` /
   `app.omdalat.com` / `api.omdalat.com` keep the member system and the
   **already-built `pay.iai.one` payment lane**. AI agents never create payments,
   legal entities, or auto-publish.
4. **No new infrastructure is invented.** The Brand Factory reuses the existing
   `omdalat-core` D1 database, `omdalat-assets` R2 bucket, `omdalat-automation`
   queue, `media_asset` rights/consent model, and the `api.omdalat.com` worker.
   New work = new D1 migrations + new routes + a subdomain renderer, not a new stack.
5. **The "AI 80–90% + human 10–20% gate" already exists** as the editorial publish
   gate. We extend it; we do not reinvent it.

---

## 1. Three-layer model (the core reconciliation)

The new plan kept calling for "3 lớp web" but then loaded commerce onto `ap`. The
locked docs forbid that. The correct, conflict-free decomposition is:

| Layer | Domain(s) | Role | Commerce? | Source of truth |
| --- | --- | --- | --- | --- |
| **L1 Operations** | `omdalat.com`, `app.omdalat.com`, `api.omdalat.com` | Hệ sống: member, stay, work, programs, **payments**, owner dashboards, inquiry/booking processing | Yes (existing `pay.iai.one` lane) | `omdalat-core` D1 |
| **L2 Editorial** | `ap.omdalat.com` | Editorial-place identity: con người, nơi chốn, nhịp sống, câu chuyện, ảnh | **No** (locked) | Ap CMS (`page/article/profile/place/...`) |
| **L3 Brand** *(new)* | `{brand}.omdalat.com` | Per-brand microsite: story + products + experiences + **inquiry CTA** | Inquiry/lead only; booking/payment delegated to L1 | `omdalat-core` D1 (new `brand_*` tables) |

**Data flow for one place:**

```
Google Maps / coords / owner form
  → Brand Factory intake (L3 record in omdalat-core)
  → human verification + owner consent
  → produces BOTH:
       (a) L2 editorial `place`/`profile` on ap.omdalat.com   [story, no commerce]
       (b) L3 brand microsite {brand}.omdalat.com             [story + inquiry]
  → inquiry / booking submitted on L3
  → processed by L1 api.omdalat.com (+ pay.iai.one if money moves)
```

The L2 editorial entry and the L3 microsite **soft-link** to each other using the
existing `OMDALAT_TO_APDALAT_PRESENCE_AND_LINKING_RULES_2026` bridge rules. They do
**not** mirror content (locked anti-pattern) — L2 is the *story*, L3 is the *brand*.

---

## 2. Conflict register (plan vs. locked docs)

| # | New-plan element | Conflicts with | Resolution (locked here) |
| --- | --- | --- | --- |
| C1 | `dablah.omdalat.com` / homestay brand pages, `brand_type: homestay` | `APDALAT_CMS_SCHEMA_2026 §0, §11.1` (no listing/booking; keyword blocker on *homestay/booking/tour*) | Homestay/farmstay pages are **L3 brand microsites**, never `ap` content. `ap`'s blocker stays. L3 has its own overclaim gate (see §4). |
| C2 | Booking / "đặt lịch" / inquiry-to-booking on brand pages | `OMDALAT_TO_APDALAT…RULES §2.2` (`ap` does not run forms/booking/member) and `…§9` (don't break stay-flow) | Inquiry forms render on **L3**; submission is processed by **L1** `api.omdalat.com`. `ap` keeps only soft editorial bridges. |
| C3 | New `place` entity with commercial fields (`can_host_stay`, `legal_status`, `products`) | Locked `ap` `place` type is editorial (`place_thesis`, `living_qualities`, `sensory_notes`) | Keep the locked `ap` `place` **as-is**. Commercial place data → new `brand` + `place_commercial` tables in `omdalat-core` (L3/L1), distinct from the `ap` `place`. |
| C4 | New `image_assets` + `image_source_logs` schema | Existing `media_asset` already has `license_type/scope`, `source_type`, `consent_required`, `consent_verified` | **Do not** create a parallel image model. Reuse `media_asset`; the plan's "image log" = the existing rights/consent fields. Add only `place_ref`/`brand_ref` columns. |
| C5 | Payment API (`/publish` gated on payment, revenue share) | `PHASE_4_PAYMENT_LANE_GOVERNANCE_2026-05-12` + `wrangler.jsonc` (sole authority = `pay.iai.one`/PayOS via `api.omdalat.com`) | All money flows go through the **existing** payment lane. No new payment provider, no agent-initiated charges. Revenue-share is an L1 ledger feature, phase 2+. |
| C6 | "AI tự động tạo… publish" pipeline | `APDALAT_CMS_SCHEMA_2026 §8` publish gate (language/SEO/image-rights/links all must pass) + founder rule "AI 80–90%, human 10–20%" | The agent pipeline **writes drafts and runs checks**; the existing publish gate + an owner-consent gate are mandatory human steps. Wire agents *into* the gate, don't bypass it. |
| C7 | EN content generated by agents | Language codex: `vi` is source, `en` is reviewed *adaptation*, **not machine translation**; `translation_status` must be `ready` to publish EN | Bilingual Content Agent drafts EN as adaptation marked `in_progress`; EN publish still blocked until a human sets `ready`. |
| C8 | Wildcard `*.omdalat.com` subdomains | `ap.omdalat.com` is currently a **static** site; no subdomain renderer exists; CORS in `wrangler.jsonc` only allow-lists fixed hosts | Build an explicit **allowlisted** subdomain renderer (L3). No host resolves publicly until its record is `published`. Update `CORS_ORIGINS` per launched brand or move to a suffix match with care. |
| C9 | "100 web nhánh" framed as 100 projects | `MASTER_BUILD_SYSTEM` / repo is a template-driven monorepo | Build the **Brand Factory** (one renderer + one schema) first. Each brand = one DB record + assets + approval, never a new app. (Plan already says this in its closing line — locked.) |
| C10 | Naming drift (`Tam Farm`, "farm nổi tiếng", "đạt chuẩn") | `BRAND_ARCHITECTURE_OMDALAT` (not tourism, not decorative) + overclaim rules | Keep `Ôm Đà Lạt/Om Dalat`, `Ấp Đà Lạt/Ap Dalat` naming. Overclaim words forbidden until evidence exists (the plan's §17.3/§10.4 lists — promoted to a hard validator). |

**No conflicts found** between the new plan and: the image reality standard, the
Vietnamese-first rule, the soft-bridge linking model, the verification-before-publish
philosophy, or the `Computer.iai.one` audit/rollback/ground-truth stance. Those are
*reinforced* by the existing docs and carried forward unchanged.

---

## 3. Real-infrastructure mapping (what the build team actually has)

Verified from the repo on 2026-06-17:

- **Worker**: `omdalat-platforms-api` → route `api.omdalat.com`
  (`workers/api/wrangler.jsonc`). New Brand Factory routes live **here**.
- **D1**: `omdalat-core` (`eab4c371-fa07-4035-b711-315121f92d4a`), `migrations_dir: migrations`.
  Current migration `0001_init_payment_schema.sql` defines `users`,
  `payment_sessions`, `payment_orders`. Brand Factory adds `0002_…` onward.
- **R2**: `omdalat-assets` — brand/place images go here (variants per image policy).
- **Queue**: `omdalat-automation` — agent runs / async generation / webhook fan-out.
- **Payment authority**: `pay.iai.one` (PayOS), callbacks to `api.omdalat.com`
  (do **not** introduce a second provider).
- **Mail**: `mail.iai.one` (`pay@`, `noreply@`, `support@`, `billing@`).
- **CORS** already includes `ap.omdalat.com`; add brand hosts deliberately (C8).
- **Sites today**:
  - `apps/web` → `omdalat.com` (Next, L1 public)
  - `apps/app` → `app.omdalat.com` (Next, L1 member)
  - `apps/docs` → docs
  - `ap.omdalat.com/` → **static HTML** editorial site (sitemaps, sections
    `con-nguoi/noi-chon/nhip-song/cau-chuyen`). The CMS schema is locked in docs
    but **not yet implemented as a data layer** — this is the gap the Brand Factory
    closes for L2, and net-new for L3.

**Implication:** The Brand Factory is mostly *additive* — new migrations, new worker
routes, a new subdomain renderer app, and (for L2) turning the static `ap` site into a
CMS-rendered site. It does not require re-platforming.

---

## 4. New hard validators to add (promoted from prose to gates)

These were narrative "do not say" lists in the plan. Lock them as machine checks:

1. **Overclaim blocker (all layers)** — block publish if copy contains, without an
   evidence record: `nổi tiếng`, `tốt nhất`, `đạt chuẩn`, `organic` (without cert id),
   `đã mở cửa đón khách` (unless `can_host_visit=verified`), `đặt ngay`/`book now`
   (unless booking is legally enabled).
2. **ap editorial blocker (L2 only)** — keep the existing `hotel/homestay/resort/
   booking/tour/must-visit/hidden gem` block on `ap` copy.
3. **Owner-consent gate (L3 publish)** — `owner.consent_status = approved` required;
   `revoked` → auto-unpublish.
4. **Image rights gate** — reuse `media_asset.consent_verified` +
   `license_type` present for every hero/card before publish.
5. **EN-adaptation gate** — `translation_status = ready` required to expose `/en`.
6. **Compliance gate (activity-dependent)** — if `can_host_stay` then lodging fields
   (`business_registration`, `lodging_compliance`, `pccc`) must not be `unknown`
   before any stay-related CTA renders. Legal refs: NĐ 96/2016 (an ninh trật tự /
   lưu trú), NĐ 13/2023 (dữ liệu cá nhân), food-safety rules for ăn uống.

---

## 5. Founder-owned decisions

### 5a. Resolved (locked 2026-06-17)

1. **Operating legal entity (who receives money) = Công ty TNHH Thái Lâm.**
   - This is the merchant of record for the `pay.iai.one`/PayOS lane and the
     counterparty on owner agreements / revenue-share contracts.
   - Action for build team: billing identity, invoices, and `BILLING_EMAIL`/receipts
     must reflect Công ty TNHH Thái Lâm. AI agents still never initiate payments
     (audit C5) — they only prepare drafts.
2. **Publish-approval authority = Admin.**
   - `Admin` is the human gate at `founder_review` → `owner_review` → `published`
     (companion §2 state machine). `approvals.approved_by` records the Admin identity.
   - No brand reaches `published` without an Admin `approve_publish` row.
3. **Subdomain delivery = Wildcard `*.omdalat.com` + D1 allowlist (Option A).**
   - One wildcard DNS record + one renderer (Worker/Pages); adding a brand = one D1
     record, **no DNS change** → narrowest Cloudflare/DNS token (no standing DNS-write
     for agents). Matches "each brand = one record" (audit C9).
   - **Cloudflare for SaaS is NOT used now.** It is reserved for phase 3, only if a
     brand brings its *own external* domain (e.g. `tamfarm.vn`).
   - **CORS change required (replaces the static `CORS_ORIGINS` list in
     `workers/api/wrangler.jsonc`):** allow an origin only if it (1) matches
     `*.omdalat.com` AND (2) the brand's `publication_status = 'published'` in D1.
     Never blanket-allow `*.omdalat.com` without gate (2).
   - **Renderer rule (C8 reaffirmed):** wildcard DNS resolving ≠ page rendering. The
     renderer reads `Host`, looks up the brand in D1, and returns a holding/404 page
     unless `publication_status = 'published'`. Wildcard does not weaken no-auto-publish.

### 5b. Still open (inputs needed before build)

4. Google Maps Platform + Google Business Profile OAuth provisioning.
5. First 3 verified places + 20–50 real images + owner consent forms.

Everything else in the two finalized plan files is buildable from this audit.

---

## 6. Definition of done for this audit

- [x] Every new-plan element checked against the locked docs (C1–C10).
- [x] 3-layer model resolves the editorial-vs-commerce conflict without editing the
      locked `ap` docs.
- [x] New work mapped to existing infra (D1/R2/Queue/payment/mail).
- [x] Overclaim/consent/compliance gates specified as validators.
- [x] Founder-owned decisions isolated from buildable spec.

Next files (finalized, depend on this audit):
- `APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026.md` — strategy (L2+L3 boundaries locked)
- `OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026.md` — execution (mapped to `omdalat-core`)
