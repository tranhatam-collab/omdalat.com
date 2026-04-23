# OMDALAT ACCEPTANCE FIXES — 2026-04-23

Version: v1.0.0
Status: DONE
Owner: Team 1
Scope: acceptance blockers raised after final gate review

---

## 1) Contact language split

Status: `DONE`

- `apps/web/app/contact/ContactForm.tsx` now receives the active locale.
- `/vi/contact` renders Vietnamese-only form labels, placeholders, button text, topics, helper copy, and status messages.
- `/en/contact` renders English-only form labels, placeholders, button text, topics, helper copy, and status messages.
- Status updates use `aria-live="polite"`.
- Inputs now include `name`, `autocomplete`, and email-specific `inputMode` / `spellCheck={false}`.

---

## 2) Contact metadata by locale

Status: `DONE`

- `apps/web/app/contact/page.tsx` now uses `generateMetadata()` and `buildCurrentLocalePageMetadata()`.
- `/vi/contact` has Vietnamese title, description, canonical, Open Graph, Twitter metadata.
- `/en/contact` has English title, description, canonical, Open Graph, Twitter metadata.

---

## 3) Contact docs link keeps locale

Status: `DONE`

- Contact page docs CTA now uses `resolveDocsHref(locale, docsContext.primary.href)`.
- `/vi/contact` points to `/vi/docs/getting-started`.
- `/en/contact` points to `/en/docs/getting-started`.

---

## 4) Homepage image language and loading

Status: `DONE`

- Homepage image alt text is now localized per VI/EN.
- Primary hero image uses:
  - `loading="eager"`
  - `fetchPriority="high"`
  - explicit `width` and `height`
- Secondary hero and gallery images use:
  - `loading="lazy"`
  - `fetchPriority="auto"`
  - explicit `width` and `height`

---

## 5) Sitemap routes and hreflang

Status: `DONE`

- Sitemap now includes:
  - `/vi/life`
  - `/en/life`
  - `/vi/docs`
  - `/en/docs`
- Sitemap alternate language keys now use locale descriptors:
  - `vi-VN`
  - `en`

---

## 6) Legacy docs non-canonical warning

Status: `DONE`

- Added `docs/OMDALAT_LEGACY_DOCS_NON_CANONICAL_INDEX_2026-04-23.md`.
- Updated `docs/README_DEV_HANDOFF_OMDALAT.md`.
- Updated `docs/OMDALAT_MASTER_REBUILD_INDEX_2026.md`.
- Any old doc that conflicts with the new domain/language/runtime lock is now treated as `NON_CANONICAL_REFERENCE_ONLY`.

---

## 7) Browser evidence

Status: `DONE`

Commands:

```bash
pnpm --filter @omdalat/web test:e2e -- e2e/contact-language-and-sitemap.spec.ts --reporter=line
pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts e2e/contact-language-and-sitemap.spec.ts --reporter=line
```

Results:

- Contact/sitemap regression: `4/4 passed`
- Full public browser gate: `108/108 passed`

---

## 8) Build evidence

Status: `DONE`

Command:

```bash
pnpm --filter @omdalat/web build:cf
```

Result:

- `PASS`

