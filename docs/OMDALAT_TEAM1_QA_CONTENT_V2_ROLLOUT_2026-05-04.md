# OMDALAT Team 1 QA + Content V2 Rollout (2026-05-04)

Status: ACTIVE  
Owner: Team 1 (coordination)  
Scope: `omdalat.com` web runtime + shared content seed contract

## 1) What Team 1 just locked

1. Strict bilingual article runtime remains route-based:
   - `/vi/articles/[slug]`
   - `/en/articles/[slug]`
   - No CSS language hide/show strategy allowed.
2. Article seed continues as the single source:
   - `data/seed/articles.seed.json`
   - `data/seed/article-images.seed.json`
3. Pillar alias compatibility enabled for rollout safety:
   - `life -> song`
   - `earning -> xay-cuoc-doi`
4. Launch 3-article funnel is now aligned in published seed:
   - `/vi/articles/song-o-da-lat-la-gi`
   - `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
   - `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`
5. Image rendering now prefers AVIF/WebP sources with fallback and locale-safe alt strategy.
6. Article internal linking now follows contextual silo by pillar instead of one fixed link pack.
7. Vietnamese vocabulary gate is active for published copy checks:
   - disallow borrowed terms in VN fields (e.g. remote work/freelance/system/VA) without normalized VN wording.

## 2) Lane impact by team

### Team 2 (Om Public)

Required now:
1. Keep all new and edited VN article copy compliant with vocabulary gate.
2. Maintain route and metadata correctness for the new launch slug (`song-o-da-lat-la-gi`) in all public references.
3. Keep locale-consistent internal links in article cards and detail pages.

Evidence to include in next report:
1. `validate:web-locales` PASS
2. `validate:i18n-data` PASS
3. `validate:content-seed` PASS
4. canonical smoke for:
   - `/vi/articles/song-o-da-lat-la-gi`
   - `/en/articles/song-o-da-lat-la-gi`

### Team 3 (App Member Runtime)

Required now:
1. No runtime route conflicts with updated public article slugs.
2. Preserve `cf:runtime-map:check` pass status after next deploy.
3. Keep payment lane unchanged: `PHASE_2_NOT_IN_SCOPE` for this release gate.

Evidence to include in next report:
1. fresh `npm run cf:runtime-map:check` output
2. live email smoke report (runtime target)
3. explicit note if `CF_RUNTIME_REQUIRE_AP_CANONICAL_REDIRECT=1` stays disabled

### Ap Team (Ap Editorial)

Required now:
1. No dependency on old Om slug naming in editorial bridge links.
2. Keep bridge copy and metadata aligned with current Om launch 3 articles.
3. Keep image policy references aligned with current article-image seed governance.

Evidence to include in next report:
1. bridge links check (VI/EN)
2. metadata matrix delta (if any)
3. image alt/caption consistency check

## 3) Team 1 release note (current)

P0 Done:
1. Seed/runtime alignment for launch article set.
2. Contextual silo linking for article detail flow.
3. AVIF/WebP-capable image source rendering path.
4. VN vocabulary QA gate in content seed validation.

P0 Blocked:
1. None at code level for this rollout packet.
2. Full `next build` process may stall at trace collection in local environment; use CF lane evidence + validation suite as gate.

P1 Queue:
1. Extend vocabulary normalization dictionary from tags to full taxonomy.
2. Add dedicated regression tests for contextual linking by pillar.
3. Add article SEO snapshot check for launch wave (title/meta/hreflang consistency).

## 4) Commands locked for all teams

```bash
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
pnpm validate:content-seed
npm run cf:runtime-map:check
```

## 5) Coordination rule

Team 1 remains release coordinator. Team 2, Team 3, and Ap Team must report against this rollout baseline before any new GO claim.
