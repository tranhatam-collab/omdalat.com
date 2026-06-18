# QA FIX PLAN — OMDALAT.COM (2026-06-18)

**Based on:** `QA_AUDIT_REPORT_2026-06-18.md`
**Approach:** Fix P0 first, then P1, then P2. Small groups, easy rollback.

---

## Group A: P0 — Brand Renderer (Workers)

### A1 — Add SEO Meta + Schema to Brand Renderer
**File:** `workers/brand-renderer/src/routes/brand-site.ts`
**What:** Inject `<meta>` tags for OG, Twitter, robots, theme-color, and JSON-LD schema into HTML `<head>`.
**Safe:** Yes. Purely additive. No existing code removed.
**Evidence after fix:** `curl -s https://brand.omdalat.com/lily | grep -E 'og:|twitter:|schema.org'` returns results.

### A2 — Align Brand Renderer Theme with Main App
**File:** `workers/brand-renderer/src/routes/brand-site.ts`
**What:** Change gradient from purple (#667eea → #764ba2) to green palette matching `apps/web` (#0f3d2e based).
**Safe:** Yes. CSS-only change.
**Evidence after fix:** Brand page renders with green tones.

---

## Group B: P1 — Main App (apps/web)

### B1 — Improve Article Listing Alt Text
**File:** `apps/web/app/articles/page.tsx`
**What:** Change `alt={article.title}` to `alt={locale === "vi" ? "Hình ảnh minh họa: " + article.title : "Featured image: " + article.title}`
**Safe:** Yes. One line change.

### B2 — Improve VisualNarrative Alt Text
**File:** `apps/web/components/shared/ContentPage.tsx`
**What:** Pass specific alt per visual instead of generic "Visuals for..."
**Safe:** Yes. Requires `getVisualsForContext()` to return alt text; if not possible, hardcode better generic.

### B3 — Add Language Switcher UI to Static Site
**File:** `ap.omdalat.com/index.html` + `assets/app.js`
**What:** Add visible `<a href="/en/">English</a>` / `<a href="/">Tiếng Việt</a>` toggle in header.
**Safe:** Yes. Client-side only.

### B4 — Decide + Apply "Ap Dalat" Branding Standard
**File:** `apps/web/components/layout/Footer.tsx`
**What:** Either keep "Ap Dalat" (international romanization) or change to "Ấp Đà Lạt" with diacritics. Decision needed.
**Safe:** Yes. Text-only.

### B5 — Self-Host Hero Images
**File:** `apps/web/app/page.tsx`
**What:** Download 3 Unsplash images to R2 bucket `omdalat-assets/images/hero/`. Update URLs.
**Safe:** Yes. URL swap only.

---

## Group C: P2 — Polish

### C1 — Language Switcher Shows Native Label
**File:** `apps/web/components/layout/Header.tsx`
**What:** Change `VI`/`EN` codes to `Tiếng Việt` / `English` (or `Vietnamese` / `English`).
**Safe:** Yes. Text-only.

### C2 — Test Mobile Menu on iOS
**File:** `apps/web/components/layout/Header.tsx`
**What:** Browser-test `<details>` behavior. If buggy, refactor to React state.
**Safe:** Only test first; refactor if needed.

---

## Rollback Strategy

- Each group is a separate commit.
- If any group breaks, `git revert` that commit only.
- Brand renderer changes tested on `brand.omdalat.com/lily` before considering done.
- Web app changes tested via `pnpm build` before commit.

---

## Suggested Order

1. **Group A1** (P0 meta/schema) → deploy → test
2. **Group A2** (P0 theme) → deploy → test
3. **Group B1** (P1 alt text) → build → commit
4. **Group B4** (P1 branding) → build → commit
5. **Group C1** (P2 switcher label) → build → commit
6. **Final QA** → run `pnpm validate:*` scripts
