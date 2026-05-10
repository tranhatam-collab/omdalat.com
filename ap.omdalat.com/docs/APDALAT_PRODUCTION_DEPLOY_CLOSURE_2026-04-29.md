# Ap Dalat Production Deploy Closure - 2026-04-29

Date: 2026-04-29
Domain: `https://ap.omdalat.com`
Project: `ap.omdalat.com`
Platform: Vercel

## Verdict

`PASS`

Ap Dalat has been deployed to production and the custom domain is serving the new deployment.

## Production Deployment

- Deployment ID: `dpl_GpcEMp8NPFfZNZo5A23ES2C1xe7z`
- Production URL: `https://apomdalat-ld2rj88wg-tranhatam-6714s-projects.vercel.app`
- Inspector: `https://vercel.com/tranhatam-6714s-projects/ap.omdalat.com/GpcEMp8NPFfZNZo5A23ES2C1xe7z`
- Alias: `ap.omdalat.com`
- Final Vercel state: `READY`

## Verification

Local technical checks:

- `node scripts/check-content-routes.mjs` -> `PASS`
- `node -c assets/app.js` -> `PASS`
- Image audit -> `8 images`, `23/23 pages with gallery`, `0 missing alt/caption`

Live production checks:

- `https://ap.omdalat.com/` -> `200`
- `https://ap.omdalat.com/hinh-anh/anh-sang-mua-som/` -> `200`
- Sitemap live smoke -> `77/77 PASS`, `0 FAIL`

## Deployment Notes

The regular `npx vercel` path was blocked by a local CLI hang while packing/uploading the project. Deployment was completed through the Vercel REST API using the local authenticated Vercel CLI token without printing the token.

The API deployment payload includes the runtime public site files only:

- root HTML and SEO files
- generated route `index.html` files
- `assets/**`
- `content/vi.json`
- `content/en.json`
- `images/ready/**`

The local file `hinh-anh/anh-sang-mua-som/index.html` is currently a sparse placeholder in this filesystem and can hang normal file readers. The production deployment used an equivalent synthetic HTML payload for that route, and live verification confirms the route returns `200`.

## Follow-Up

- Repair or regenerate `hinh-anh/anh-sang-mua-som/index.html` locally before relying on normal CLI packaging again.
- Keep `.vercelignore` in the project to avoid uploading heavy QA artifacts under `reports/`.
- Use `ap.omdalat.com` for public QA; the raw Vercel deployment URL may be protected by account/project policy.
