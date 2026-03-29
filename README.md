# OMDALAT

OMDALAT is the first city implementation of OMDALA.

This repository is the foundation for:

- `omdalat.com`
- `app.omdalat.com`
- the first local living lab
- real density, proof, and activity

OMDALAT is not a tourism site and not a generic community landing page.
It is the first operating city layer under OMDALA.

## Role in the brand system

- `OMDALA` = master/global system
- `OMDALAT` = first city node and proof layer

## Positioning

Primary line:

- OMDALAT
- The First Living Intelligence City

Supporting line:

- Where OMDALA becomes real.

## Start here

Read:

1. `docs/MASTER_BUILD_SYSTEM_OMDALA_OMDALAT.md`
2. `docs/BRAND_ARCHITECTURE_OMDALAT.md`
3. `docs/README_DEV_HANDOFF_OMDALAT.md`

## Local development

Run:

```bash
corepack pnpm dev
```

The local server starts on `http://127.0.0.1:4173/` by default.

Routes:

- `/` = public city-layer homepage served from `apps/web`
- `/apps/app/` = local operating layer prototype
- `/apps/web/` = direct web app route inside the repo

Runtime scaffold:

- `apps/web/app/*` now contains the Stage 2 Next runtime shells from the build order
- the static root flow stays active through `apps/web/index.html` until runtime deployment is wired in
- public shell paths like `/places`, `/hosts`, `/trust`, and `/contact` now resolve through the static dev server instead of 404ing

Suggested publish roots:

- `omdalat.com` -> `apps/web`
- `app.omdalat.com` -> `apps/app`

Optional custom port:

```bash
corepack pnpm dev -- --port 4321
```

## Repo structure

```text
omdalat.com/
  .editorconfig
  .env.example
  .nvmrc
  scripts/
    build.mjs
    check-workspace.mjs
    dev-server.mjs
  apps/
    web/
      app/
      components/
      index.html
      app.js
      lib/
      next.config.js
      package.json
      styles.css
      styles/
      tsconfig.json
    app/
  packages/
  services/
  data/
  docs/
  package.json
  pnpm-workspace.yaml
  turbo.json
```

## Immediate build intent

This repo now carries both a static-first city layer foundation and a parallel Stage 2 runtime scaffold for `apps/web`.
The next build phase should wire runtime routes to real entities, SEO helpers, and shared packages without interrupting the current static proof surface.
