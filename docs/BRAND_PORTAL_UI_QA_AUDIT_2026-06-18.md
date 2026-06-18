# BRAND_PORTAL_UI_QA_AUDIT_2026-06-18

Strict QA of the **`brand.omdalat.com`** user-facing UI, for the dev team.
Audience of this site = local people: nhà vườn, hộ kinh doanh, homestay, quán, nghệ
nhân. **Rule: zero developer/architecture language anywhere a user can read it.**

Method: live HTTP read of `brand.omdalat.com` (VI + EN) + source review.
Source: the page is generated in `workers/brand-renderer/src/routes/brand-site.ts`
(a single **~125 KB** file; line numbers below).

Verdict: **NOT user-ready.** Two blocking classes: (1) developer/architecture jargon
shown directly to farmers; (2) a misleading + legally-risky brand-status display. Plus a
structural identity problem: the page is a static explainer mislabeled a "Portal."

---

## 0. Blocking summary

| # | Severity | Issue |
|---|---|---|
| B1 | 🔴 | Dev/architecture jargon in user UI ("Mô hình 4 lớp / Lớp 1–4", "Phase 1–3", "dashboard", "inquiry", "node vận hành", EN "Layer"). |
| B2 | 🔴 | Brand showcase shows **"Lily — Đã xuất bản"** (hardcoded) while Lily is reverted to private_preview / un-permitted → public false-status + relto the legal issue. |
| B3 | 🟠 | "Tam Farm" shown as a real in-progress brand — it's a placeholder/example, not a real seeded brand → fictional brand presented as real. |
| B4 | 🟠 | Identity mismatch: titled "Brand System Portal" but it's a **static explainer** — no login, no brand management, no real portal function. |
| B5 | 🟡 | Register/tone wrong for audience; English UI also leaks "Layer/Phase"; copy explains the *system* instead of the *user's benefit*. |

---

## 1. B1 — Developer language inventory (remove ALL of these from UI)

Each row: the jargon as shown → source line in `brand-site.ts` → plain human replacement.
**Only user-rendered strings are listed; code identifiers with the same name are fine.**

| Jargon (as user sees) | Line | Replace with (VI) | Replace with (EN) |
|---|---|---|---|
| "Mô hình 4 lớp" | L2352 | "Cách hoạt động" | "How it works" |
| "Lớp 1 … dashboard" | L2353 | (don't expose layers) "Bạn gửi thông tin về nơi của mình" | "You tell us about your place" |
| "Lớp 2 …" | L2354 | "Chúng tôi giúp dựng hồ sơ và hình ảnh thật" | "We help build a real profile and photos" |
| "Lớp 3 …" | L2355 | "Bạn có một trang riêng cho thương hiệu" | "You get your own brand page" |
| "Lớp 4 …" | L2356 | "Khách tìm thấy và liên hệ với bạn" | "Customers find and contact you" |
| "Phase 1 / Phase 2 / Phase 3" | L2391–2392 | "Bây giờ / Sắp tới / Về sau" (mô tả bằng lợi ích, không đánh số 'Phase') | "Now / Next / Later" |
| "dashboard" | L2353 | "trang quản lý của bạn" | "your management page" |
| "inquiry" | L2220 | "yêu cầu liên hệ" / "Gửi liên hệ" | "enquiry" / "Get in touch" |
| "node vận hành" (Lily copy) | L1528 (x3) | "một nơi hoạt động thật" | "a real working place" |
| "Layer" (EN section) | L2380 (x9) | (mirror the VI "How it works" rewrite) | "How it works" |

Notes:
- `workflow` (L365, ×11) and most `inquiry` hits are **code identifiers**, not UI — leave
  those; fix only the rendered ones (L2220, L2352–2392, L1528, L2380).
- The whole "4-layer model" section must be **re-conceived as user benefit**, not system
  architecture. A nhà vườn does not care about layers; they care about: *được tìm thấy,
  có trang riêng, có khách liên hệ.*

**Acceptance test (make it a CI check):** render every public page (VI + EN) and grep the
HTML for a denylist — must return **zero**:
`lớp 1|lớp 2|lớp 3|lớp 4|mô hình 4 lớp|phase [0-9]|dashboard|workflow|inquiry|node vận hành|layer|schema|gate|API|worker`.

---

## 2. B2 — Brand showcase shows false/risky status (🔴 ties to the legal issue)

`L2360` hardcodes **"Lily — Đã xuất bản"** in the showcase. Problems:
1. **Hardcoded**, not read from DB → it can (and now does) contradict the real
   `publication_status`. Lily was reverted to `private_preview` (un-permitted lodging);
   the portal still publicly says "Đã xuất bản."
2. Publicly asserting a brand is "published" when its lodging compliance is unverified is
   the same NĐ 96/2016 exposure flagged in the senior audit, surfaced on the marketing
   page.

**Fix:**
- Drive the showcase from the DB: `SELECT name_vi, publication_status FROM brands` and
  only show brands that are **legitimately** `published` (i.e., passed the publish gate
  with `owner_consent=approved` + compliance in allowlist). Never hardcode status.
- Show a human status label, not the system enum: `published → "Đang hoạt động"`,
  `private_preview/draft → "Đang chuẩn bị"` (or omit unpublished brands entirely).
- Until Lily is legitimately published, it must show "Đang chuẩn bị" or not appear.

## 3. B3 — Placeholder brand shown as real

`L2524` lists **"Tam Farm"** as an in-progress brand, but the only seeded brands are
`vuonhong3` and `lily`. "Tam Farm" was an *archetype example* in the strategy docs.
Presenting a non-existent brand as real on a public page misleads users and partners.
**Fix:** render the brand list from the DB only; remove hardcoded example brands.

## 4. B4 — Identity: "Portal" with no portal

The page `<title>` is "Om Dalat Brand System Portal" but it is a **static landing page**
(two "Bắt đầu" CTAs to a contact page; no login, no brand management, no approval queue).
Per the master plan, `brand.omdalat.com` is the **super-admin Brand Portal**. Decide and
align:
- **Option A (recommended):** `brand.omdalat.com` = the public *marketing/intake* site
  (what it is today). Then **rename** it (drop "Portal/System" from `<title>` and UI),
  and host the real admin portal at a protected path/subdomain (e.g.
  `brand.omdalat.com/admin`, auth-gated) — which still does not exist in code.
- **Option B:** make this the actual portal (login + brand management). Bigger build.
Either way, **stop calling a brochure a "Portal"** in the UI/title.

## 5. B5 — Register, tone, bilingual

- Copy currently explains the **system to itself**. Rewrite to speak to a nhà vườn in
  plain Vietnamese: concrete benefit, no English nouns (dashboard/workflow/inquiry).
- The English version leaks "Layer/Phase" — EN must be a real human adaptation, same
  benefit framing, not a literal translation of the architecture.
- "Homestay/Café/Farm" in the "Ai có thể tham gia" list are fine here (this is the brand
  layer, not the `ap` editorial layer) — no keyword-blocker issue on this page.

---

## 6. Fix plan for the dev team (ordered)

1. **B2 + B3 first (truth):** make the brand showcase DB-driven; show only legitimately
   `published` brands; human status labels; remove "Đã xuất bản" hardcode and "Tam Farm".
   (Closes a live false-status that overlaps the legal issue.)
2. **B1 (language):** rewrite the "4-layer"/"Phase" sections + the listed strings per §1;
   add the denylist render-test to CI as the definition of done.
3. **B4 (identity):** pick Option A/B; fix `<title>` and any "Portal/System/node" wording.
4. **B5 (copy polish):** rewrite VI for the real audience; redo EN as adaptation.
5. Refactor debt (not user-facing, but enabling): the 125 KB `brand-site.ts` should split
   portal vs brand-microsite vs content; move copy into data so non-devs can edit it
   without touching a 125 KB TS file (this is *why* dev language leaks into the UI).

**Definition of done (user-facing):**
- The denylist render-test returns zero on every public page, VI + EN.
- Every brand/status shown is read from the DB and true; no hardcoded brand or status.
- A non-technical reader (a nhà vườn) can read the whole page and understand what they
  get, with no word that belongs in a codebase.

---

## 7. Note on the A2/C report (commit 3d012bd)

The audited compliance route (evidence-required, super-admin, 25 tests) + AGENTS.md
"definition of closed" directly address the **integrity/process** findings of the senior
audit — that is the right direction and, if the tests are real and green, the strongest
fix made so far. It is **separate** from this UI audit; I'll re-verify those gate/route
tests on request. This document is strictly about what a real user sees on
`brand.omdalat.com`.
