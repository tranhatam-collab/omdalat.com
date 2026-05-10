# ap.omdalat.com

Prototype editorial build for `ap.omdalat.com`.

## Open locally

Canonical public domain: [https://ap.omdalat.com](https://ap.omdalat.com)

Preview alias: [https://apomdalatcom.vercel.app](https://apomdalatcom.vercel.app)

Use the live site or preview alias, or serve the repo through any static HTTP server so the locale JSON files in [`content/`](./content) can be loaded correctly.

## Included

- VI-first homepage, hubs, support pages, and detail pages
- English homepage, hubs, support pages, and detail pages
- Sample story, people, place, and image essay templates
- Local image pack with ready hero/card/OG derivatives in [`images/ready/`](./images/ready)
- CMS collections in [`content/cms/`](./content/cms) as source-of-truth
- Generated locale content files in [`content/vi.json`](./content/vi.json) and [`content/en.json`](./content/en.json)
- SEO image manifest in [`images/seo/dalat-image-manifest.json`](./images/seo/dalat-image-manifest.json)
- Public crawl files in [`robots.txt`](./robots.txt) and phase-2 sitemap set:
  [`sitemap.xml`](./sitemap.xml),
  [`sitemap-pages.xml`](./sitemap-pages.xml),
  [`sitemap-stories.xml`](./sitemap-stories.xml),
  [`sitemap-images.xml`](./sitemap-images.xml),
  [`sitemap-vi.xml`](./sitemap-vi.xml),
  [`sitemap-en.xml`](./sitemap-en.xml)
- One homepage bridge link to `https://omdalat.com`
- Shared content and rendering logic in [`assets/content.js`](./assets/content.js) and [`assets/app.js`](./assets/app.js)
- Strategy docs in [`docs/`](./docs)
- Reporting templates in [`reports/`](./reports)

## Read first

1. [`docs/APDALAT_MASTER_PROJECT_INDEX_2026.md`](./docs/APDALAT_MASTER_PROJECT_INDEX_2026.md)
2. [`docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`](./docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md)
3. [`docs/APDALAT_INFORMATION_ARCHITECTURE_2026.md`](./docs/APDALAT_INFORMATION_ARCHITECTURE_2026.md)
4. [`docs/APDALAT_SEO_MASTER_PLAN_2026.md`](./docs/APDALAT_SEO_MASTER_PLAN_2026.md)
5. [`docs/APDALAT_CMS_SCHEMA_2026.md`](./docs/APDALAT_CMS_SCHEMA_2026.md)
6. [`docs/APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026.md`](./docs/APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026.md)
7. [`reports/WEEKLY_STATUS_2026_04_19.md`](./reports/WEEKLY_STATUS_2026_04_19.md)
8. [`reports/DECISION_LOG_2026.md`](./reports/DECISION_LOG_2026.md)

## Next build steps

1. Replace sample copy with the first production editorial batch.
2. Keep CMS-first editing in `content/cms/*`, then regenerate locale content and routes.
3. Port routes into Next.js or Astro when the repo is ready for production tooling.
4. Add server-side schema output and richer Open Graph extraction.

## QA Command

Run route and crawl consistency checks before each release:

```bash
node scripts/check-content-routes.mjs
```

Build pipeline from CMS collections:

```bash
node scripts/migrate-content-to-cms.mjs
node scripts/build-content-from-cms.mjs
node scripts/sync-routes-sitemap.mjs
node scripts/sync-static-routes-meta.mjs
node scripts/check-og-extraction.mjs
```

`sync-routes-sitemap.mjs` now emits the full phase-2 sitemap set (`sitemap.xml` index + 5 child sitemaps).

Visual QA matrix (foundation batch):

```bash
node scripts/run-visual-qa-matrix.mjs --mode=foundation
```

Visual QA matrix (core pages + foundation batch, mobile + desktop):

```bash
node scripts/run-visual-qa-matrix.mjs --mode=core --include-desktop
```

Visual QA plan only (full-detail routes, no screenshot capture):

```bash
node scripts/run-visual-qa-matrix.mjs --mode=full-detail --print-plan
```

Visual QA full-detail matrix (all detail routes, mobile + desktop):

```bash
node scripts/run-visual-qa-matrix.mjs --mode=full-detail --include-desktop --output=reports/visual-qa/2026-04-21/full-detail
```

Team 1 release gate:

```bash
node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19 --expected-visual-min=10
```

Team 1 release gate for core matrix (mobile + desktop):

```bash
node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19/core --expected-visual-min=56
```

Team 1 release gate for full-detail matrix (mobile + desktop):

```bash
node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-21/full-detail --visual-mode=full-detail --visual-include-desktop
```

Team 1 release gate with auto baseline from mode (no manual expected min):

```bash
node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19/core --visual-mode=core --visual-include-desktop
```

Team 1 release gate with visual diff threshold policy (baseline + critical/normal thresholds):

```bash
node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-21/full-site --visual-mode=full-site --visual-include-desktop --visual-baseline-dir=reports/visual-baseline/full-site --visual-diff-rules-file=scripts/visual-diff-threshold-rules.json --visual-diff-default-max=0.03 --visual-diff-critical-max=0.015
```

Team 1 periodic full-site regression preset (visual + gate in one command):

```bash
bash scripts/team1-regression-full-site.sh
```

Current full-site plan covers detail + hubs + support routes (72 routes => 144 screenshots on mobile+desktop).

Initialize or refresh baseline after intended visual changes:

```bash
bash scripts/team1-regression-full-site.sh --refresh-baseline
```

Route-intent thresholds are defined in:

`scripts/visual-diff-threshold-rules.json`

Current policy:
- `landing-core`: `1.0%`
- `pillar-detail`: `1.2%`
- `support-pages`: `1.8%`
- default: `2.5%`

Round 2 calibration command (history-aware, with safety caps):

```bash
npm run qa:visual:calibrate:round2
```

Calibration report output:

`reports/visual-qa/threshold-calibration-round2.json`

Visual diff report output:

`reports/visual-qa/<date>/full-site/visual-diff-report.json`

Preview full-site route plan only:

```bash
bash scripts/team1-regression-full-site.sh --plan
```
