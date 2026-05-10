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

## 6) Content SOP completion update

Additional active notice:

- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`

This notice records the Codex completion round for the Content SOP and explains the exact impact for Team 1, Team 2, Team 3, Content/SEO, QA/DevOps and Ap Team.

Effective immediately:

1. `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` is a Level A gate for every public article batch.
2. Batch content cannot be called done if it fails the 4 Không / 4 Có filter.
3. New article images must publish as `WebP` or `AVIF`, named by slug.
4. CMS v2 should move toward `locales.vi` and `locales.en`.
5. Reports must state whether the change was docs-only or runtime/content-seed affecting.

Next reports from all teams must include a short "Content SOP impact" line.

## 7) Sprint 0 execution packet

Sprint 0 is now the first runtime/content-seed batch under the SOP gate.

Active files:

1. `data/seed/articles.seed.json` — current 30-record runtime seed.
2. `data/seed/articles.seed.sprint0-launch.json` — isolated 3-article runtime snapshot for quick Team 2 UI testing.
3. `data/seed/articles.seed.launch-v2.json` — V2 CMS/schema handoff payload.
4. `data/seed/article-images.seed.json` — image records with local WebP source, license, alt/caption.
5. `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md` — detailed owner/deadline/gate plan.

Team 1 does not approve production until Team 2, Team 3, QA/SEO all attach fresh evidence for this Sprint 0 packet.
