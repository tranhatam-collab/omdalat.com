# OMDALAT / Ôm Đà Lạt

This repository is now locked for the independent `omdalat.com` system only.

Current naming lock:

- Display name: `Ôm Đà Lạt`
- English standard: `Om Dalat`
- Internal uppercase brand: `OMDALAT`

Current product position:

- a real-life living system in Da Lat
- focused on `Life`, `Work`, `Learning`, and `Community`
- not a tourism site
- not a retreat
- not a course
- not a startup-hype landing page

Important rule:

- `omdalat.com` is being planned and rebuilt as an independent system
- do not use `omdala.com` as the source of truth for public copy, IA, SEO, or product direction here

## Source Of Truth

Start from these files:

1. `docs/OMDALAT_PUBLIC_MEMBER_GLOBAL_SYSTEM_MASTER_2026.md`
2. `docs/OMDALAT_MASTER_REBUILD_INDEX_2026.md`
3. `docs/OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md`
4. `docs/OMDALAT_LANGUAGE_CODEX_SYSTEM_2026.md`
5. `docs/OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md`
6. `docs/OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md`
7. `docs/OMDALAT_MEMBERSHIP_GATING_FLOW_SPEC_2026.md`
8. `docs/OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md`
9. `docs/OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md`
10. `docs/OMDALAT_DEV_IMPLEMENTATION_BACKLOG_2026.md`
11. `docs/OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md`

Team companion docs:

- `docs/OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md`
- `docs/OMDALAT_CONTENT_SYSTEM_AND_EDITORIAL_PLAN_2026.md`
- `docs/OMDALAT_SEO_MASTER_PLAN_2026.md`
- `docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md`
- `docs/OMDALAT_PRODUCT_AND_MEMBERSHIP_SYSTEM_2026.md`
- `docs/OMDALAT_OPERATIONS_AND_COMMUNITY_SYSTEM_2026.md`
- `docs/OMDALAT_SCALE_MASTER_PLAN_2026_2030.md`
- `docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md`
- `docs/OMDALAT_APP_MEMBER_DASHBOARD_SPEC_2026.md`

If an older file conflicts with the documents above, the files above win.

## Local Development

Run:

```bash
corepack pnpm dev
```

Default local URL:

- `http://127.0.0.1:4173/`

Main live public surface right now:

- `/` served from `apps/web/index.html`

The public surface has been rewritten around the current Om Dalat lock:

- clear Vietnamese copy
- English naming support
- homepage sections for `Sống`, `Làm`, `Học`, `Cộng đồng`, `Ở lại`, `Tham gia`
- SEO-ready topic system for the first 30 content directions
- docs now assume a future split between `public`, `member`, and `internal` visibility on the same domain

## Repo Notes

This repo still contains older scaffolds and legacy route shells from previous planning phases.
Treat them as implementation leftovers unless they have been explicitly updated to match the locked Om Dalat docs.

## Structure

```text
omdalat.com/
  apps/
    web/
    app/
    docs/
  packages/
  services/
  data/
  docs/
  scripts/
```
