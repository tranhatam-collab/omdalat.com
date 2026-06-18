# APDALAT_BRAND_FACTORY_CODE_AUDIT_2026-06-17

Audit of the **in-progress** Brand Factory implementation vs. the locked plan
(`APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17.md`,
`OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026.md`,
`BRAND_SITE_VUONHONG3_BUILD_SPEC_2026.md`).

Reviewed: `workers/api/src/**`, `workers/brand-renderer/src/**`,
`workers/api/migrations/0002–0005 + seed_vuonhong3.sql`,
`ap.omdalat.com/content/cms/place-vuonhong3.json`.

Verdict: **good skeleton, unsafe to deploy.** The schema, holding-page flow, and
layer separation are correct. But the **human-approval, compliance, consent, and
CORS gates — the reason this system exists — are stubbed or bypassable.** Fix all
CRITICAL + HIGH before anything is exposed publicly.

Severity: 🔴 CRITICAL (blocks deploy) · 🟠 HIGH · 🟡 MEDIUM · 🟢 NOTE/positive

---

## 🔴 CRITICAL

### C1 — No auth on any Brand Factory endpoint; `approve_publish` is wide open
`workers/api/src/index.ts` wires `/approve`, `/publish`, `/intake`, `/agent-runs`,
`/inquiry` with **zero authentication**. `brand-approval.ts` takes `approved_by`
from the **request body** (free text), not an authenticated identity.

→ Anyone on the internet can `POST /api/omdalat/brands/:id/approve`
`{"action":"approve_publish","approved_by":"x"}` and **publish any brand**, defeating
the locked rule "approve publish = Admin" (consistency audit §5a-2). This is the whole
governance model gone.

**Fix:** add an auth middleware (session/JWT from the L1 member system, role=`admin`)
on every `/api/omdalat/*` mutation. `approved_by` must come from the authenticated
principal, not the body. Intake/agent-runs require at least an operator role.

### C2 — CORS allows every origin with credentials
`workers/api/src/lib/cors.ts` → `isOriginAllowed()` `return true` ("for testing"),
and `withCors`/`addCorsHeaders` echo the request Origin **and** set
`Access-Control-Allow-Credentials: true`, with cookies scoped to `.omdalat.com`.

→ Any website can make credentialed cross-origin calls to `api.omdalat.com`. Violates
locked CORS rule (consistency audit §5a-3: origin must match `*.omdalat.com` **AND**
the brand be `published`).

**Fix:** implement `isOriginAllowed` = `origin` ends with `.omdalat.com` on the apex
list **and**, for brand subdomains, a D1 lookup that the brand is `published`. Never
combine credentials with a wildcard/echo origin for untrusted hosts.

### C3 — Lodging compliance gate is not actually checked
`brand-publish.ts` / `brand-approval.ts` → `checkPublishGates()` sets
`compliance_reviewed = true` merely because an `approve_compliance` **approval row
exists**. It never reads `compliance_checklists` values.

→ A homestay (`can_host_stay=1`) can be published with
`lodging_compliance='unknown'`, `pccc='unknown'` — exactly the NĐ 96/2016 legal risk
the gate exists to prevent (spec §8, consistency audit §4.6). The renderer likewise
shows the **Stay** nav from `can_host_stay` alone, without checking compliance values.

**Fix:** in `checkPublishGates`, when `brand.can_host_stay=1`, require
`compliance_checklists.lodging_compliance != 'unknown'` AND `business_registration
!= 'unknown'` AND `pccc != 'unknown'` (verified/pending/not_applicable OK). Gate the
renderer Stay section on the same values, not just `can_host_stay`.

---

## 🟠 HIGH

### H1 — Renderer ignores the Host; subdomain routing is fake
`workers/brand-renderer/src/routes/brand-site.ts`:
`const slug = url.searchParams.get('slug') || 'vuonhong3';` — it reads the `Host`
header into an unused var and **defaults every request to `vuonhong3`**. And
`workers/brand-renderer/wrangler.jsonc` route is `brand.omdalat.com` (single host),
not the locked wildcard `*.omdalat.com`.

→ The core "Host → slug → D1 → published?" delivery (spec §3, consistency audit
§5a-3) is not wired; every brand subdomain would render Vườn Hồng 3.

**Fix:** derive slug from `Host` (`vuonhong3.omdalat.com` → `vuonhong3`); 404/holding
on unknown. Set the route to the wildcard `*.omdalat.com` (Cloudflare for SaaS / custom
hostnames as decided) and exclude reserved hosts (`www`, `app`, `ap`, `api`, `brand`).

### H2 — Inquiry stores personal data with no consent (NĐ 13/2023)
`brand-inquiry.ts` reads only `contact, message, locale, source` — no `consent` field,
no validation, no Turnstile. The renderer form (`generateBrandSiteHTML`) has **no
consent checkbox**. Phone numbers are persisted to `inquiries` without recorded consent.

→ Violates spec §9 and NĐ 13/2023 (locked legal requirement).

**Fix:** require `consent === true`; reject otherwise. Add the bilingual consent
checkbox + text to the form. Add Turnstile (`TURNSTILE_SECRET_KEY` already provisioned)
and rate-limiting. Consider storing `consent_text_version` + timestamp on the row.

### H3 — No overclaim / forbidden-copy validator exists
`workers/api/src/lib/validators.ts` only has checkout/webhook validators. The locked
overclaim blocker (consistency audit §4.1) and forbidden-copy list (spec §5 — `nổi
tiếng`, `tốt nhất`, `đạt chuẩn`, `đã mở cửa đón khách`, `đặt ngay`/`book now`, `organic`
w/o cert) are implemented **nowhere**, and the `ap` editorial keyword blocker
(`hotel/homestay/booking/...`) is not enforced on L2 content either.

→ Content can be published with forbidden claims; no gate stops it.

**Fix:** add `validateBrandCopy(payload, {layer, brand})` run on content-block
create/update and as a `qa`/`content_approved` precondition. Block L3 overclaim words;
block L2 (`ap`) travel/hotel words. Return the offending term.

### H4 — `/publish` does not require the Admin `approve_publish` row
Spec §10 lists `admin_publish = approvals row action='approve_publish'` as a required
gate. `brand-publish.ts` checks consent/content/images/compliance/qa but **not** that an
`approve_publish` approval exists. So publish can occur without the explicit Admin
publish decision (and, per C1, with no auth at all).

**Fix:** add `admin_publish` to `checkPublishGates` (an `approve_publish` row by an
admin must exist), or collapse to a single authenticated publish path. Make the two
publish entrypoints (`/approve` w/ approve_publish, and `/publish`) consistent.

---

## 🟡 MEDIUM

### M1 — Unfilled `{{TOKEN}}` placeholders can render publicly
Seed rows still contain `{{ADDRESS_VI}}`, `{{OWNER_CONTACT}}`, `{{PLACE_ID}}`. Neither
the publish gate nor the renderer guards against unresolved tokens, so a published page
could literally display `{{ADDRESS_VI}}`.

**Fix:** add a publish-gate check rejecting any content/contact field matching
`/\{\{.*?\}\}/`; renderer should hide fields containing tokens.

### M2 — Stored-content XSS / breakage in renderer
`generateBrandSiteHTML` interpolates DB strings (hero/story/products/experiences,
`address_vi`) directly into HTML with no escaping. Admin-curated, but still stored-XSS
risk and breaks on quotes/`<`.

**Fix:** HTML-escape all interpolated content; or render via a templating layer that
escapes by default.

### M3 — SEO: no robots/noindex, no JSON-LD
Holding pages lack `<meta name="robots" content="noindex">` (spec §6 requires noindex
while `private_preview`) → a homestay preview could be indexed. Published site HTML has
no `LodgingBusiness` JSON-LD (spec §6) and no OG image tags.

**Fix:** noindex on all non-published states; inject JSON-LD + OG only on publish, with
no empty/placeholder fields.

### M4 — EN render/publish keys off `status`, not `translation_status`
`renderBrandSite` selects content `WHERE status='published'`; it works for the seed
only because EN blocks are `status='draft'`. The locked rule is EN shows iff
`translation_status='ready'`, and `qa_passed` should assert it. Currently fragile.

**Fix:** gate EN locale on `translation_status='ready'`; add to QA checks.

### M5 — Duplicate D1 migration ownership
`workers/brand-renderer/wrangler.jsonc` also declares `migrations_dir: ../api/migrations`
against the same `omdalat-core` DB. Two workers managing one DB's migration bookkeeping
invites double-apply/conflict.

**Fix:** migrations owned by `workers/api` only; the renderer binds the DB read-only
(no `migrations_dir`).

---

## 🟢 NOTES / what's correct (keep)

- Migrations use **separate `CREATE INDEX`** statements (no inline INDEX) — heeds the
  prior SQLite/D1 lesson (commit `4bb87cb`). Clean.
- `ap.omdalat.com/content/cms/place-vuonhong3.json` correctly uses category `noi-chon`,
  title "Vườn Hồng 3" (no "Homestay"), no booking words → **L2 keyword blocker respected.**
- Seed sets `brand_type=homestay`, `can_host_stay=1`, `publication_status=private_preview`,
  consent `pending`, compliance `unknown` → correct safe initial state.
- Private-preview holding copy matches spec Variant B verbatim.
- `logAudit` is wired on brand mutations → good ground-truth trail.
- Three-layer separation (L1 api / L2 ap json / L3 renderer) is physically present.

---

## Fix order (gate to "safe to expose")

1. C1 auth on all `/api/omdalat/*` mutations (+ `approved_by` = authenticated admin).
2. C2 real CORS allowlist (`*.omdalat.com` + published) — drop allow-all.
3. C3 compliance values enforced for `can_host_stay` (publish + renderer).
4. H1 Host-based slug + wildcard route.
5. H2 inquiry consent + Turnstile.
6. H3 overclaim/forbidden-copy validator (L2 + L3).
7. H4 require `approve_publish` row; unify publish paths.
8. M1–M5 before first real public brand.

Re-audit after C1–C3 + H1–H4 land. Do not point a real `{brand}.omdalat.com` at the
public internet until at least the CRITICAL items are closed.
