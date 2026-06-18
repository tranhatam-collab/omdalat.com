# QA AUDIT — PHASE 1: ANALYZE ONLY (2026-06-18)

## Repo Scope
`/Users/tranhatam/Documents/Devnewproject/omdalat.com`

---

## 1. Framework / Build Tool

| Item | Value |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Runtime | Edge (`export const runtime = "edge"`) |
| Package Manager | pnpm 10.6.5 (workspace) |
| Language | TypeScript 5.8.2 |
| Build | Custom Node scripts (`scripts/build.mjs`, `scripts/validate-*.mjs`) |
| CSS | `globals.css` (custom design system, not Tailwind) |

---

## 2. App Structure

### apps/web/ — Public Site (omdalat.com)
- **Layout**: `app/layout.tsx` → `<Header />` + `<main>` + `<Footer />`
- **Middleware**: `middleware.ts` — locale routing (`/vi`, `/en`), legacy redirects
- **Locale Strategy**: Middleware rewrites + `x-omdalat-locale` header → server components read header
- **Default Locale**: `vi` (Vietnamese)
- **Supported Locales**: `vi`, `en`

### apps/app/ — Member App (app.omdalat.com)
- Separate Next.js app for authenticated member area
- Routes: `/dashboard`, `/profile`, `/member/login`, `/member/register`, etc.

### ap.omdalat.com/ — Static Editorial Site
- Pure HTML/CSS/JS (no framework)
- `index.html` loads `assets/app.js` + `assets/content.js`
- `data-locale` attribute drives client-side locale
- 75+ HTML pages in subdirectories

### workers/
- `api/` — Cloudflare Worker REST API (`api.omdalat.com`)
- `brand-renderer/` — Cloudflare Worker HTML renderer (`brand.omdalat.com`)

---

## 3. Content Source

| Source | Location | Format |
|---|---|---|
| Articles | `data/seed/articles.seed*.json` | Bilingual JSON (vi/en) |
| Images | `data/seed/article-images.seed.json` | Image references |
| Page Copy | Inline in `page.tsx` files | `{ vi: "...", en: "..." }` objects |
| Component Labels | `components/**/*.tsx` | `locale === "vi" ? "..." : "..."` ternary |
| Footer/Nav | `Footer.tsx`, `Nav.tsx`, `Header.tsx` | Static arrays with vi/en |

---

## 4. Route / Page List (apps/web)

### Public Pages
```
/                    → redirects to /vi
/vi, /en             → Home (hero + pillars + articles)
/life                → Life pillar
/work                → Work pillar
/learning            → Learning pillar
/community           → Community pillar
/stay                → Stay pillar
/articles            → Article listing
/articles/[slug]     → Article detail
/about               → About
/contact             → Contact form
/join                → Join/apply
/privacy             → Privacy policy
/terms               → Terms
/docs                → Docs hub
/docs/*              → Doc pages
```

### Member Pages (require auth)
```
/member/login
/member/register
/member/profile
/member/dashboard
/member/operations
/member/handbook
/member/resources
/member/welcome
/member/application-status
/member/verify
/member/investor-overview
/member/programs
```

### Legacy Redirects (middleware)
- `/what-is-omdalat` → `/about`
- `/free-member` → `/join`
- `/packages` → `/stay`
- `/events`, `/hosts`, `/experts`, `/communities` → `/community`
- `/places` → `/stay`
- `/proofs` → `/articles`

---

## 5. i18n / Language Structure

### Middleware Flow
1. Request hits `middleware.ts`
2. If path is `/`, redirect to `/$locale` (default `vi`)
3. Extract locale from first path segment
4. Rewrite to internal path without locale prefix
5. Set `x-omdalat-locale` header
6. Server components read header via `getRequestLocale()`

### Server Component Pattern
```tsx
const locale = await getRequestLocale();
const text = locale === "vi" ? "Tiếng Việt" : "English";
```

### Language Switcher
- `getLocaleSwitchLinks()` generates links like `/vi/current-path` ↔ `/en/current-path`
- Rendered as uppercase codes: `VI`, `EN`
- In header tools + footer

---

## 6. SEO / Meta Implementation

### `lib/metadata.ts`
- `buildPageMetadata()` generates:
  - `title`, `description`
  - `canonical` URL
  - `alternates.languages` (hreflang)
  - `openGraph` (OG title, description, image, locale)
  - `twitter` (card, title, description, image)
  - `icons` (favicon)
  - `robots` (index/follow or noindex)

### `lib/schema.ts`
- JSON-LD schemas:
  - `Organization` schema
  - `WebSite` schema
  - `WebPage` schema
  - `Article` schema (for articles)

### Per-Page Metadata
- Each `page.tsx` exports `generateMetadata()`
- Uses `buildCurrentLocalePageMetadata({ title: {vi, en}, description: {vi, en}, path })`

### OG Image
- `defaultRuntimeOgImage` — static OG image URL
- Articles can override with `featured_image`

---

## 7. Menu / Mobile Menu Implementation

### Desktop Menu (`Header.tsx` + `Nav.tsx`)
- **Brand**: "Ôm Đà Lạt" / "Om Dalat" + tagline
- **Primary Nav**: Trang chủ/Home, Sống/Life, Làm/Work, Học/Learning, Cộng đồng/Community, Ở lại/Stay, Bài viết/Articles, Tham gia/Join
- **Tools**: Language switcher (VI/EN), Member link, CTA "Bắt đầu từ đây"/"Start here"

### Mobile Menu (`Header.tsx`)
- `<details>` HTML element (no JS framework)
- Hamburger icon: 3 CSS spans (`<span /><span /><span />`)
- `aria-label`: "Mở menu điều hướng" / "Open navigation menu"
- Panel contains `Nav` + tools

### Footer (`Footer.tsx`)
- 3 sections: Brand description, Primary links (8), Support links (6 + language)
- Links use `localizePath(link.href, locale)`

---

## 8. Deploy / Build Output

### Web App
- `wrangler.toml` / `wrangler.jsonc` config for Pages deployment
- Build output: `.next/` → Cloudflare Pages
- Custom domain: `omdalat.com`

### App (Member)
- Separate Pages project: `omdalat-app`
- Custom domain: `app.omdalat.com` (currently redirecting to `ap.omdalat.com`)

### Static Editorial
- Static files served from `ap.omdalat.com`
- No build step

### Workers
- `wrangler deploy` for API + brand-renderer
- Custom domains: `api.omdalat.com`, `brand.omdalat.com`

---

## 9. Key Files for QA

| Component | File |
|---|---|
| Layout | `apps/web/app/layout.tsx` |
| Header | `apps/web/components/layout/Header.tsx` |
| Nav | `apps/web/components/layout/Nav.tsx` |
| Footer | `apps/web/components/layout/Footer.tsx` |
| Metadata | `apps/web/lib/metadata.ts` |
| Schema | `apps/web/lib/schema.ts` |
| Locale | `apps/web/lib/locale.ts` |
| Middleware | `apps/web/middleware.ts` |
| Homepage | `apps/web/app/page.tsx` |
| Robots | `apps/web/app/robots.ts` |
| Static Index | `ap.omdalat.com/index.html` |
| Brand Renderer | `workers/brand-renderer/src/routes/brand-site.ts` |

---

## 10. Notable Patterns

### Locale Ternary Anti-Pattern
Throughout codebase, locale switching uses inline ternary:
```tsx
{locale === "vi" ? "Đăng nhập" : "Sign in"}
```
This is repeated in ~50+ locations across components and pages.

### Hard-Coded Text in Page.tsx
Page content uses inline `{vi: "...", en: "..."}` objects instead of CMS/external JSON.

### No i18n Library
No `next-intl`, `react-i18next`, or similar. All localization is hand-rolled via middleware + ternary.

### Accessibility
- `aria-label` present on nav and mobile menu
- `aria-current="page"` on active language link
- `aria-hidden="true"` on hamburger icon spans
- `aria-label` on footer nav sections

---

## Next Phase: Bước 2 — AUDIT REPORT

Based on this analysis, the audit will focus on:
1. Language consistency (vi/en separation, no mixing)
2. Menu mobile behavior and accessibility
3. SEO metadata completeness per page
4. Alt text on images
5. CTA/form/footer consistency
6. Responsive design
7. Placeholder/TODO detection
8. Static site (ap.omdalat.com) vs Next.js app consistency
