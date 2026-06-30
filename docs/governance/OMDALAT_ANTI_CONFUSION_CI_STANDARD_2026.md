# OMDALAT ANTI-CONFUSION CI STANDARD 2026

**Status:** ACTIVE — enforced by `scripts/guard-subdomain-anti-confusion.mjs` in CI (`ci-guard.yml`).
**Last verified:** 2026-06-30 — all 15 rules pass.

## Enforcement

The guard script runs as a CI job (`guard-subdomain-anti-confusion`) on every pull request and push to `main`. It exits with code 1 if any rule is violated.

**Script:** `scripts/guard-subdomain-anti-confusion.mjs`
**CI workflow:** `.github/workflows/ci-guard.yml` → job `guard-subdomain-anti-confusion`

## Rules

CI must fail when:
1. `ap.omdalat.com` appears in public code (middleware redirects, page rules).
2. `OMDALAT_AP` is used as a product identifier (excluding `OMDALAT_AP_ORIGIN` env var and `OMDALAT_AP_RESERVED` registry entry).
3. App is labeled AP (single-p mislabeling in wrangler config or package.json).
4. Two products claim the same primary role.
5. A page canonical points to the wrong product subdomain.
6. Product ID is missing from the role registry.
7. Reserved brand is presented as live.
8. Admin/private route lacks noindex and no-store.
9. Brand card lacks status or owner.
10. Root renders an unapproved all-brand directory.
11. True 404 is missing for any app.
12. VI/EN ownership metadata is missing.
13. Cross-product link lacks destination label.
14. Public content has no owner.
15. Brand lacks an approved Brand Charter.

## Additional F1/F2 specific checks

The guard also enforces:
- **F1:** `deploy-app-cloudflare-pages.yml` must build `@omdalat/app`, not `@omdalat/web`.
- **F2:** `ap.omdalat.com` must not appear in `LEGACY_APP_HOSTS` Set definitions in either middleware.
