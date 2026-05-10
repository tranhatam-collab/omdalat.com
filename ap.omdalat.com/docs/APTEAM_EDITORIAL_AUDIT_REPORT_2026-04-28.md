Ap Dalat / Ấp Đà Lạt

Ap Team Report

Lane: Ap Editorial

Version: v1.1.0

Status: AP_TEAM_CURRENT_STATE_SUBMITTED

Date updated: 2026-04-29 00:32 ICT

Owner: Ap Team

Reviewer: Team 1

Scope: homepage editorial, category pages, article system, metadata, sitemap, robots, canonical, hreflang, image system, alt text, captions, Om <-> Ap linking

---

## 1. Scope đã kiểm

Ap Team đã kiểm và nộp current-state cho:

* homepage editorial VI/EN
* category hubs: people, places, rhythms, work, stories, images
* detail surfaces:
  * `15` stories
  * `3` people profiles
  * `3` places
  * `2` image essays
* metadata source and generated locale JSON
* canonical / hreflang / sitemap / robots policy implementation
* image SEO source: alt/caption/filename/variants
* renderer behavior for SEO-readable images
* Om bridge intent discipline

---

## 2. P0 done

* `DONE` Ap Team accepts Team 1 baseline prefill and replaces it with current-state evidence.
* `DONE` Route/sitemap/robots consistency passes:
  * `node scripts/check-content-routes.mjs`
  * result: `PASS: content routes, phase-2 sitemap set, and robots policy are consistent.`
* `DONE` Metadata source is present for homepage, hubs, details, VI and EN.
* `DONE` Image SEO was upgraded:
  * `8/8` image assets have bilingual alt/caption source values.
  * `23/23` content objects have gallery coverage.
  * renderer now uses real `<img alt>` for cards, article heroes, inline galleries, and image essays.
* `DONE` Missing EN people route shell was added:
  * `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html`
* `DONE` Local preview smoke returned `200 OK` for sampled key routes:
  * `/`
  * `/en/`
  * `/con-nguoi/nguoi-lam-viec-online-tu-da-lat/`
  * `/en/people/nguoi-lam-viec-online-tu-da-lat/`

---

## 3. P0 blocked

No Ap editorial P0 blocker remains for first-round Team 1 review.

Operational note, not a lane blocker after mitigation:

* Bulk static rewrite scripts hit filesystem `ETIMEDOUT` in this local environment when writing many files:
  * `scripts/sync-routes-sitemap.mjs`
  * `scripts/sync-static-routes-meta.mjs`
* Ap Team mitigated the only detected route gap manually.
* Final `check-content-routes` passes.

---

## 4. P1 queue

* Add browser-level visual evidence screenshots for image-rich article routes.
* Add JSON-LD image object extraction audit as a second pass.
* Expand matrix from current P0 rollup to every individual article route if Team 1 requests full line-by-line closure.
* Add production-live probe for `https://ap.omdalat.com` after DNS/deploy owner confirms the target build is live.

---

## 5. Files / routes / modules liên quan

Primary evidence:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

SEO / policy locks:

* `ap.omdalat.com/docs/APDALAT_SEO_MASTER_PLAN_2026.md`
* `ap.omdalat.com/docs/APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026.md`
* `ap.omdalat.com/docs/APDALAT_TO_OMDALAT_LINKING_RULES_2026.md`
* `ap.omdalat.com/docs/APDALAT_IMAGE_AND_GALLERY_POLICY_2026.md`

Changed or audited implementation:

* `ap.omdalat.com/assets/app.js`
* `ap.omdalat.com/assets/content.js`
* `ap.omdalat.com/assets/styles.css`
* `ap.omdalat.com/content/cms/image-assets.json`
* `ap.omdalat.com/content/cms/stories.json`
* `ap.omdalat.com/content/cms/people.json`
* `ap.omdalat.com/content/cms/places.json`
* `ap.omdalat.com/content/cms/image-essays.json`
* `ap.omdalat.com/content/vi.json`
* `ap.omdalat.com/content/en.json`
* `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html`

---

## 6. Commands đã chạy

```bash
node scripts/build-content-from-cms.mjs
node -c assets/app.js
node scripts/check-content-routes.mjs
node -e "const fs=require('fs'); const vi=JSON.parse(fs.readFileSync('content/vi.json','utf8')); const en=JSON.parse(fs.readFileSync('content/en.json','utf8')); const imgs=JSON.parse(fs.readFileSync('content/cms/image-assets.json','utf8')); const pages=[...vi.stories,...vi.people,...vi.places,...vi.imageEssays]; const galleryPages=pages.filter(p=>(p.gallery||[]).length>0); const bad=imgs.filter(i=>!i.alt_vi||!i.alt_en||!i.caption_vi||!i.caption_en); console.log({images:imgs.length,galleryPages:galleryPages.length,totalPages:pages.length,missingImageText:bad.length}); if(bad.length||galleryPages.length!==pages.length) process.exit(1);"
curl -I http://127.0.0.1:4174/
curl -I http://127.0.0.1:4174/en/
curl -I http://127.0.0.1:4174/con-nguoi/nguoi-lam-viec-online-tu-da-lat/
curl -I http://127.0.0.1:4174/en/people/nguoi-lam-viec-online-tu-da-lat/
```

Results:

* content build: `PASS`
  * `stories: 15`
  * `people: 3`
  * `places: 3`
  * `imageEssays: 2`
* JS syntax: `PASS`
* content routes + phase-2 sitemap set + robots policy: `PASS`
* image SEO source audit:
  * `{ images: 8, galleryPages: 23, totalPages: 23, missingImageText: 0 }`
* local smoke:
  * `/` -> `200 OK`
  * `/en/` -> `200 OK`
  * `/con-nguoi/nguoi-lam-viec-online-tu-da-lat/` -> `200 OK`
  * `/en/people/nguoi-lam-viec-online-tu-da-lat/` -> `200 OK`

---

## 7. Evidence

Metadata:

* `ap.omdalat.com/content/cms/seo-overrides.json`
* `ap.omdalat.com/content/cms/sections.json`
* `ap.omdalat.com/content/cms/stories.json`
* `ap.omdalat.com/content/cms/people.json`
* `ap.omdalat.com/content/cms/places.json`
* `ap.omdalat.com/content/cms/image-essays.json`
* `ap.omdalat.com/content/vi.json`
* `ap.omdalat.com/content/en.json`

Image SEO:

* `ap.omdalat.com/content/cms/image-assets.json`
* `ap.omdalat.com/assets/content.js`
* `ap.omdalat.com/assets/app.js`
* `ap.omdalat.com/assets/styles.css`

Indexation:

* `ap.omdalat.com/robots.txt`
* `ap.omdalat.com/sitemap.xml`
* `ap.omdalat.com/sitemap-pages.xml`
* `ap.omdalat.com/sitemap-stories.xml`
* `ap.omdalat.com/sitemap-images.xml`
* `ap.omdalat.com/sitemap-vi.xml`
* `ap.omdalat.com/sitemap-en.xml`

Matrix / packet:

* `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md`

---

## 8. Quyết định cần Team 1 chốt

Ap Team requests Team 1 first-round review.

Suggested lane decision:

* move Ap Team from `PENDING_REPORT` to `REVIEW_READY`
* if Team 1 accepts source-level evidence and local preview smoke, lane can move to `PASS_WITH_QUEUE`
* if Team 1 requires live-domain probe evidence, keep Ap as `REVIEW_READY_BLOCKED_BY_LIVE_DEPLOY_EVIDENCE`, not `PENDING_REPORT`

---

## 9. Việc tiếp theo

* Team 1 reviews current-state report, matrix, and evidence packet.
* If required, Ap Team will add browser screenshots and full per-route matrix rows.
* Deploy owner confirms production live target for `https://ap.omdalat.com`.
* After production target is confirmed, Ap Team runs live probe and appends result.

---

## 10. Phần trăm còn lại

Current Ap owner submission readiness:

* report: `100%` for first-round review
* route/metadata matrix: `100%` for P0 + rollup review
* evidence packet: `100%` for source/local current-state review
* remaining queue: live-domain proof and optional visual screenshot packet

Recommended lane progress:

* `PENDING_REPORT` -> `REVIEW_READY`
* readiness estimate: `88%`

---

## 11. Yêu cầu riêng Ap Team

Nộp kèm:

* editorial route inventory: `DONE`
* bilingual metadata check: `DONE`
* image alt/caption/filename check: `DONE`
* canonical / hreflang / sitemap / robots check: `DONE`
* bằng chứng Ap không trùng vai trò với Om: `DONE`
