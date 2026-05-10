# APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026

## Canonical base
Use `https://ap.omdalat.com` as the only sitemap and robots canonical base.

## Crawl scope
Include only public HTML pages for VI and EN.
Exclude `/tim-kiem/` and `/en/search/` from crawl paths in `robots.txt`.
Disallow raw source paths such as `/assets/`, `/content/`, `/docs/`, and `/images/excluded/`.

## Preview alias
Do not add the Vercel preview alias to sitemap or robots.
Preview URLs are for verification only.

## Update rule
Whenever a static route is added, removed, or renamed, update `sitemap.xml` in the same change.

## Phase 2 sitemap set
`sitemap.xml` is a sitemap index that references:
- `sitemap-pages.xml`
- `sitemap-stories.xml`
- `sitemap-images.xml`
- `sitemap-vi.xml`
- `sitemap-en.xml`
