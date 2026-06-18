# QA AUDIT REPORT — OMDALAT.COM (2026-06-18)

**Auditor:** Senior QA Lead + Content Editor + Frontend Engineer + SEO Auditor
**Scope:** `apps/web/`, `apps/app/`, `ap.omdalat.com/`, `workers/brand-renderer/`
**Method:** Code review only (no runtime test yet)

---

## Executive Summary

| Level | Count | Status |
|---|---|---|
| P0 (Critical / Blocking) | 2 | 2 cần fix trước live |
| P1 (Major) | 5 | Nên fix trước live |
| P2 (Minor) | 4 | Có thể fix sau live |

**Overall Assessment:** Codebase well-structured, bilingual separation clean, no placeholder/TODO in public pages. **2 P0 items related to consistency between brand renderer and main app need fix before claiming "live."**

---

## P0 — CRITICAL (BLOCKING for LIVE GATE)

### P0.1 — Brand Renderer Style Mismatch with Main App

**File:** `workers/brand-renderer/src/routes/brand-site.ts`
**Evidence:** Brand renderer uses `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` (purple). Main app (`apps/web/`) uses `theme-color: #0f3d2e` (dark green) in `layout.tsx`.
**Impact:** User clicking from `omdalat.com` to `lily.omdalat.com` experiences jarring visual disconnect. Brand does not feel part of same system.
**Required fix:** Align brand renderer color palette with main app green theme, or document intentional separation.
**Priority:** P0

### P0.2 — Missing Schema + OG/Twitter in Brand Renderer

**File:** `workers/brand-renderer/src/routes/brand-site.ts`
**Evidence:** HTML output missing:
- JSON-LD Organization schema
- OG image meta tag
- Twitter card meta
- `robots` meta
- `theme-color` meta
**Impact:** Brand site not indexable properly by Google. Social sharing will show no preview image.
**Required fix:** Inject same meta/schema pattern as `apps/web/lib/metadata.ts`.
**Priority:** P0

---

## P1 — MAJOR

### P1.1 — Article Listing Alt Text is Article Title (Not Image Description)

**File:** `apps/web/app/articles/page.tsx` line 49
**Evidence:** `alt={article.title}`
**Impact:** Screen readers read article title as image description. Does not describe what the image shows.
**Required fix:** Use `article.featured_image_alt` if available, or describe image content. Minimum: `alt={locale === "vi" ? "Hình ảnh minh họa bài viết" : "Article featured image"}`.
**Priority:** P1

### P1.2 — VisualNarrative Alt Text Too Generic

**File:** `apps/web/components/shared/ContentPage.tsx` line 33
**Evidence:** `label={locale === "vi" ? "Hình minh họa cho ${eyebrowText}" : "Visuals for ${eyebrowText}"}`
**Impact:** All pillar pages have identical alt text pattern. Not descriptive.
**Required fix:** Pass specific alt text per visual from `getVisualsForContext()` or seed data.
**Priority:** P1

### P1.3 — ap.omdalat.com Static Site Lacks Language Switcher UI

**File:** `ap.omdalat.com/index.html` (and all subpages)
**Evidence:** `<html lang="vi">` hardcoded. Has `<link rel="alternate" hreflang="en">` but no UI element to switch.
**Impact:** English-speaking users cannot switch language on editorial site.
**Required fix:** Add client-side language toggle in `assets/app.js` or inline `<select>`/links.
**Priority:** P1

### P1.4 — Footer Brand Link "Ap Dalat" Romanization Inconsistent

**File:** `apps/web/components/layout/Footer.tsx` line 39
**Evidence:** `{locale === "vi" ? "Ấp Đà Lạt" : "Ap Dalat"}`
**Impact:** "Ap Dalat" is ad-hoc romanization without diacritics. Could be "Ap Dalat" or "Ấp Đà Lạt" depending on branding decision.
**Required fix:** Decide branding standard: either always Vietnamese with diacritics, or standardized romanization. If targeting international audience, "Ap Dalat" is acceptable but should be documented.
**Priority:** P1

### P1.5 — Hero Images Use Direct Unsplash URLs Without Domain Shield

**File:** `apps/web/app/page.tsx` lines 25-56
**Evidence:** `src: "https://images.unsplash.com/photo-..."`
**Impact:** If Unsplash changes URL or blocks hotlink, homepage breaks. No R2/self-hosted fallback.
**Required fix:** Download to `omdalat-assets` R2 bucket and serve from own domain.
**Priority:** P1

---

## P2 — MINOR

### P2.1 — Language Switcher Only Shows Code (VI/EN), Not Native Label

**File:** `apps/web/components/layout/Header.tsx` lines 27-30
**Evidence:** `{link.code.toUpperCase()}` renders `VI`, `EN` only. `title={link.nativeLabel}` is hover tooltip, not visible text.
**Impact:** Users may not recognize `VI`/`EN` as language switcher.
**Required fix:** Render native label: `Tiếng Việt / English` or `Vietnamese / English`.
**Priority:** P2

### P2.2 — Mobile Menu Uses `<details>` (Potential iOS Safari Quirk)

**File:** `apps/web/components/layout/Header.tsx` lines 71-84
**Evidence:** `<details className="runtime-mobile-menu">` with CSS spans for hamburger.
**Impact:** iOS Safari has known quirks with `<details>` animation and focus management.
**Required fix:** Test on iOS Safari. If buggy, replace with React state + button.
**Priority:** P2

### P2.3 — `next.config.js` Build Trace ETIMEDOUT (Known)

**File:** `apps/app/next.config.js` (modified in working tree)
**Evidence:** From `SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md`: "build compile/type/page generation pass trước khi stall tại `Collecting build traces` (`ETIMEDOUT`)"
**Impact:** Build occasionally hangs.
**Required fix:** Reduce build output or split chunks. Already tracked in `OMDALAT_TRUE_STATE_AUDIT_2026.md`.
**Priority:** P2

### P2.4 — Brand Renderer Contact Form Action URL Hard-Coded

**File:** `workers/brand-renderer/src/routes/brand-site.ts`
**Evidence:** `<form action="/api/omdalat/brands/${brand.id}/inquiry" method="POST">`
**Impact:** If API route changes, form breaks silently.
**Required fix:** Use config variable or derive from `env.APP_NAME`.
**Priority:** P2

---

## Language Quality Assessment

### Vietnamese
| Check | Result |
|---|---|
| Full diacritics | PASS |
| Consistent terminology | PASS ("Ôm Đà Lạt", "Ấp Đà Lạt", "nhịp sống") |
| No machine-translated feel | PASS (natural, human-written) |
| No mixing with English | PASS (except brand names) |

### English
| Check | Result |
|---|---|
| US/International English | PASS |
| Natural phrasing | PASS (e.g., "Live. Work. Learn. Build in Dalat.") |
| No literal translation | PASS |
| Consistent terminology | PASS ("Om Dalat", "rhythm", "system") |

### Language Separation
| Check | Result |
|---|---|
| Separate vi/en blocks | PASS (all pages use `{vi: "...", en: "..."}`) |
| No mixed-language sentences | PASS |
| Locale switcher present | PASS (Header + Footer) |
| Each locale has full content | PASS (no partial translations) |

---

## SEO / Meta Assessment

| Check | File | Result |
|---|---|---|
| `generateMetadata()` per page | All page.tsx | PASS |
| Title + Description | `lib/metadata.ts` | PASS |
| Canonical URL | `lib/metadata.ts` | PASS |
| hreflang alternates | `lib/metadata.ts` | PASS |
| OG tags | `lib/metadata.ts` | PASS |
| Twitter cards | `lib/metadata.ts` | PASS |
| JSON-LD schema | `lib/schema.ts` | PASS (Organization, WebSite, WebPage, Article) |
| robots.ts | `app/robots.ts` | PASS |
| **Brand renderer missing OG/schema** | `brand-site.ts` | **FAIL (P0.2)** |

---

## Accessibility Assessment

| Check | File | Result |
|---|---|---|
| `aria-label` on nav | `Header.tsx`, `Nav.tsx`, `Footer.tsx` | PASS |
| `aria-current="page"` on active lang | `Header.tsx` | PASS |
| `aria-hidden="true"` on icon | `Header.tsx` | PASS |
| `aria-label` on footer navs | `Footer.tsx` | PASS |
| Alt text on images | `articles/page.tsx` | PARTIAL (P1.1) |
| Alt text on hero | `page.tsx` | PASS (bilingual alt) |
| Form labels | `ContactForm.tsx` | PASS |
| Form placeholders | `ContactForm.tsx` | PASS |
| Error/success messages | `ContactForm.tsx` | PASS (bilingual) |

---

## Menu / Navigation Assessment

| Check | Result |
|---|---|
| Desktop menu | PASS (8 primary links, bilingual) |
| Mobile hamburger | PASS (`<details>` + 3 spans, `aria-label`) |
| Language switcher | PASS (VI/EN in header + footer) |
| Footer nav | PASS (primary + support links) |
| CTA present | PASS ("Bắt đầu từ đây" / "Start here") |
| **Mobile menu smoothness untested** | NEEDS BROWSER TEST |

---

## Form Assessment

| Check | File | Result |
|---|---|---|
| Labels bilingual | `ContactForm.tsx` | PASS |
| Placeholders bilingual | `ContactForm.tsx` | PASS |
| Helper text bilingual | `ContactForm.tsx` | PASS |
| Topic options bilingual | `ContactForm.tsx` | PASS |
| Status messages bilingual | `ContactForm.tsx` | PASS |
| Submit button bilingual | `ContactForm.tsx` | PASS |

---

## Placeholder / TODO Scan

| Scope | Result |
|---|---|
| `apps/web/` | **CLEAN** — no TODO/FIXME/PLACEHOLDER found |
| `apps/app/` | **CLEAN** — no TODO/FIXME/PLACEHOLDER found |
| `ap.omdalat.com/` | **CLEAN** — no placeholder found |
| `workers/brand-renderer/` | **CLEAN** — placeholders đã fix |

---

## Files to Fix (Fix Plan Preview)

| File | Issue | Priority |
|---|---|---|
| `workers/brand-renderer/src/routes/brand-site.ts` | Style mismatch + missing meta/schema | P0 |
| `apps/web/app/articles/page.tsx` | Alt text improvement | P1 |
| `apps/web/components/shared/ContentPage.tsx` | Visual alt text | P1 |
| `ap.omdalat.com/index.html` + subpages | Language switcher UI | P1 |
| `apps/web/components/layout/Footer.tsx` | "Ap Dalat" branding | P1 |
| `apps/web/app/page.tsx` | Hero image hosting | P1 |
| `apps/web/components/layout/Header.tsx` | Language switcher label | P2 |
| `apps/web/components/layout/Header.tsx` | Mobile menu `<details>` test | P2 |

---

## Live Gate Decision

**DEPLOYMENT HOLD** — 2 P0 items block "production-ready" claim:
1. Brand renderer missing SEO meta/schema (P0.2)
2. Brand renderer style mismatch with main app (P0.1)

After P0 fixed and browser-tested: **can claim live**.
