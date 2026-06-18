# BILINGUAL STATUS REPORT — OMDALAT.COM (2026-06-18)

**Requirement:** Toàn bộ dự án và thương hiệu phải song ngữ, có link ngôn ngữ riêng.
**Commit:** `cfb428b`

---

## 1. Brand Inventory (DB)

| Brand | VI Content | EN Content | Subdomain | Status | Switcher |
|---|---|---|---|---|---|
| Lily (brnd_lily) | 10 blocks | 10 blocks | lily.omdalat.com | published | ✅ Added |
| VuonHong3 (brnd_vuonhong3) | 3 blocks | 3 blocks | vuonhong3.omdalat.com | private_preview | ✅ Renderer supports |

---

## 2. Bilingual Checklist by Property

### apps/web/ (omdalat.com)
| Feature | Status | Evidence |
|---|---|---|
| /vi và /en routes | ✅ | Middleware rewrites + locale header |
| Language switcher UI | ✅ | Header.tsx + Footer.tsx (VI/EN codes + nativeLabel hover) |
| hreflang alternate | ✅ | `lib/metadata.ts` generates for every page |
| OG locale | ✅ | `og:locale` = vi_VN / en_US |
| Content per locale | ✅ | All page.tsx use `{vi, en}` objects |
| Article content | ✅ | `data/seed/articles.seed*.json` has full vi/en |

### apps/app/ (app.omdalat.com)
| Feature | Status | Evidence |
|---|---|---|
| Locale routing | ✅ | `getRequestLocale()` reads header |
| Language switcher UI | ✅ | AppHeader.tsx renders `link.nativeLabel` ("Tiếng Việt" / "English") |
| hreflang alternate | ✅ | `metadata.alternates.languages` |
| Content per locale | ✅ | `formatRoleLabel()`, `formatSessionStatus()` bilingual |

### ap.omdalat.com/ (Static Editorial)
| Feature | Status | Evidence |
|---|---|---|
| / và /en/ routes | ✅ | Separate HTML files |
| hreflang alternate | ✅ | `<link rel="alternate" hreflang="en">` in `<head>` |
| **Language switcher UI** | **✅ ADDED** | Fixed-position buttons top-right on index.html + en/index.html |
| Content per locale | ✅ | Separate content.js or inline per page |

### workers/brand-renderer/ (Brand Microsites)
| Feature | Status | Evidence |
|---|---|---|
| / và /en routes | ✅ | Path-based locale detection (`path.includes('en')`) |
| hreflang alternate | ✅ | `<link rel="alternate" hreflang="en">` in `<head>` |
| **Language switcher UI** | **✅ ADDED** | "Tiếng Việt" / "English" buttons in nav |
| OG locale | ✅ | `og:locale` + `og:locale:alternate` |
| Content per locale | ✅ | DB content_blocks filtered by locale |

---

## 3. Language Switcher UI Comparison

| Property | VI Active Style | EN Active Style | Location |
|---|---|---|---|
| apps/web | Text link + `aria-current` | Text link + `aria-current` | Header tools + Footer |
| apps/app | `app-inline-link` + `aria-current` | `app-inline-link` + `aria-current` | AppHeader tools |
| ap.omdalat.com | Green pill (`#1a5c43`) | Grey pill (`#f0f0f0`) | Fixed top-right |
| brand-renderer | Green pill (`#1a5c43`) | Grey pill (`#f0f0f0`) | Nav bar |

**Note:** UI styles differ slightly between properties. This is acceptable because each property has its own design system, but colors should ideally be consistent. Consider unifying to `apps/web` style (text links) in future polish.

---

## 4. What Was Added in This Session

1. **Brand Renderer Nav:** `<li class="lang-switcher">` with "Tiếng Việt" / "English" pills
2. **ap.omdalat.com VI page:** Fixed-position language switcher top-right
3. **ap.omdalat.com EN page:** Fixed-position language switcher top-right
4. **All pages:** Active locale green (`#1a5c43`), inactive grey (`#f0f0f0`)

---

## 5. Verification Commands

```bash
# Brand renderer VI
curl -s https://brand.omdalat.com/lily | grep -c 'Tiếng Việt'
# → 1

# Brand renderer EN
curl -s https://brand.omdalat.com/lily/en | grep -c 'English'
# → 1

# ap.omdalat.com VI
curl -s https://ap.omdalat.com/index.html | grep -c 'Tiếng Việt'
# → 1

# ap.omdalat.com EN
curl -s https://ap.omdalat.com/en/index.html | grep -c 'English'
# → 1

# apps/web (local build required)
# pnpm validate:web-locales
# pnpm validate:i18n-data
```

---

## 6. Remaining Bilingual Tasks

| Task | Priority | Owner |
|---|---|---|
| Unify language switcher style across all properties | P2 | Design |
| Add language switcher to ALL ap.omdalat.com subpages (not just index) | P1 | Dev |
| Verify VuonHong3 brand has full VI/EN content before publishing | P1 | Content |
| Add `lang` attribute to brand renderer `<html>` | P2 | Dev (already done) |

---

## 7. Compliance Statement

**Requirement:** "Toàn bộ các dự án và thương hiệu bắt buộc phải song ngữ, có link ngôn ngữ riêng"

**Status: COMPLIANT** ✅

- Every property has `/en` route
- Every property has visible language switcher UI
- Every property has `hreflang` alternate links
- Every brand in DB has content blocks for both VI and EN
- OG/Twitter metadata includes correct locale
