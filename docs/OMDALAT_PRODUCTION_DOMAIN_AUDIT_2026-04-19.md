# OMDALAT PRODUCTION DOMAIN AUDIT 2026-04-19

Om Dalat / Ôm Đà Lạt

Production Domain Audit

Version: WORKING  
Status: Team 1 live audit snapshot  
Audit time: 2026-04-19 (ICT)

## 1. DNS audit

### `omdalat.com`

- resolve: `PASS`
- records observed:
  - `104.21.84.52`
  - `172.67.186.147`

### `www.omdalat.com`

- resolve: `PASS`
- records observed:
  - `104.21.84.52`
  - `172.67.186.147`

### `app.omdalat.com`

- resolve: `PASS`
- records observed:
  - `104.21.84.52`
  - `172.67.186.147`

### `ap.omdalat.com`

- resolve: `FAIL`
- no A/AAAA answer observed at audit time
- HTTP request also fails with:
  - `curl: (6) Could not resolve host: ap.omdalat.com`

## 2. Production surface audit (`omdalat.com`)

### `https://omdalat.com`

- HTTP status: `308`
- redirect target: `/vi`

### `https://omdalat.com/vi`

Observed state at audit time:

- page still renders legacy brand and copy:
  - `OMDALAT – Sống và làm việc tại Đà Lạt | Hệ sinh thái sáng tạo`
- still contains legacy outbound links:
  - `https://docs.omdala.com`
  - `https://app.omdala.com`
- still contains legacy structural block:
  - `Docs / Help`

Conclusion:

- production `omdalat.com` has not cut over to the new release candidate yet.

### `https://omdalat.com/robots.txt`

Observed state:

- legacy-style robots policy still served on production

### `https://omdalat.com/sitemap.xml`

Observed state:

- sitemap still lists legacy route set (`what-is-omdalat`, `creative-economy`, `proofs`, etc.)

Conclusion:

- production SEO surface has not switched to the new route architecture yet.

## 3. Preview candidate audit

Candidate checked:

- `https://8e39c32a.omdalat-web-ezk.pages.dev`

Observed state:

- branding and copy match new Om Dalat direction:
  - `Ôm Đà Lạt`
  - core nav `Sống / Làm / Học / Cộng đồng / Ở lại / Bài viết / Tham gia`
- bridge section for `Ấp Đà Lạt` is present
- footer includes `Ấp Đà Lạt`
- robots/sitemap behavior follows new generation logic

Conclusion:

- preview is ready candidate
- production custom domain has not been cut over

## 4. Tracking audit snapshot

Cross-domain tracking (`om -> ap`, `ap -> om`) evidence is not yet complete in production audit context:

- `ap.omdalat.com` is unresolved
- no deploy-live proof for cross-domain flow on custom domain pair

Conclusion:

- tracking cross-domain cannot be signed off at production layer yet.

## 5. Team 1 release implication

Based on this audit snapshot:

- `Go` for preview/staging validation
- `No-Go` for production cutover final

Blocking items before production `Go`:

1. Publish DNS and custom domain binding for `ap.omdalat.com`
2. Cut over `omdalat.com` to the new deployed build
3. Re-smoke production (`/vi`, `/en`, join, contact, footer, redirects)
4. Confirm cross-domain tracking evidence on real domains
