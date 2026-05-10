Ap Dalat / Ấp Đà Lạt

Ap Editorial Evidence Packet

Version: v1.1.0

Status: AP_TEAM_CURRENT_STATE_SUBMITTED

Date updated: 2026-04-29 00:32 ICT

Owner: Ap Team

Reviewer: Team 1

Scope: evidence packet current-state cho lane Ap editorial

---

## 0. Core attachments

* report:
  * `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`
* route/metadata matrix:
  * `ap.omdalat.com/docs/AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md`
* SEO handoff:
  * `ap.omdalat.com/docs/APDALAT_SEO_MASTER_PLAN_2026.md`

---

## 1. Metadata and SEO evidence

Title/meta extract paths:

* `ap.omdalat.com/content/cms/seo-overrides.json`
* `ap.omdalat.com/content/cms/sections.json`
* `ap.omdalat.com/content/cms/stories.json`
* `ap.omdalat.com/content/cms/people.json`
* `ap.omdalat.com/content/cms/places.json`
* `ap.omdalat.com/content/cms/image-essays.json`
* `ap.omdalat.com/content/vi.json`
* `ap.omdalat.com/content/en.json`

Canonical/hreflang evidence:

* `ap.omdalat.com/index.html`
* `ap.omdalat.com/en/index.html`
* `ap.omdalat.com/con-nguoi/nguoi-lam-viec-online-tu-da-lat/index.html`
* `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html`

Sitemap/robots evidence:

* `ap.omdalat.com/robots.txt`
* `ap.omdalat.com/sitemap.xml`
* `ap.omdalat.com/sitemap-pages.xml`
* `ap.omdalat.com/sitemap-stories.xml`
* `ap.omdalat.com/sitemap-images.xml`
* `ap.omdalat.com/sitemap-vi.xml`
* `ap.omdalat.com/sitemap-en.xml`
* command: `node scripts/check-content-routes.mjs`
* result: `PASS: content routes, phase-2 sitemap set, and robots policy are consistent.`

---

## 2. Image system evidence

Alt text audit path:

* `ap.omdalat.com/content/cms/image-assets.json`
* `ap.omdalat.com/assets/content.js`

Caption audit path:

* `ap.omdalat.com/content/cms/image-assets.json`
* `ap.omdalat.com/assets/content.js`

Filename naming audit path:

* `ap.omdalat.com/content/cms/image-assets.json`
* `ap.omdalat.com/images/ready/hero/`
* `ap.omdalat.com/images/ready/card/`
* `ap.omdalat.com/images/ready/og/`
* `ap.omdalat.com/images/originals/`

Renderer evidence:

* `ap.omdalat.com/assets/app.js`
  * `createImage(...)` emits real `<img>` elements with localized `alt`
  * `createFigure(...)` emits captions
  * `renderInlineGallery(...)` renders story/person/place image galleries
* `ap.omdalat.com/assets/styles.css`
  * `inline-image-gallery`
  * image object-fit handling for cards, article hero, galleries

Audit result:

```text
{ images: 8, galleryPages: 23, totalPages: 23, missingImageText: 0 }
```

Interpretation:

* `8/8` image assets have bilingual alt/caption source values.
* `23/23` content objects have gallery coverage.
* No current image asset is missing required alt/caption source fields.

---

## 3. Cross-linking evidence

Om <-> Ap contextual linking audit path:

* `ap.omdalat.com/docs/APDALAT_TO_OMDALAT_LINKING_RULES_2026.md`
* `ap.omdalat.com/docs/APDALAT_SEO_MASTER_PLAN_2026.md`
* `ap.omdalat.com/content/cms/bridge-blocks.json`
* `ap.omdalat.com/content/cms/stories.json`

Mismatched intent findings:

* `PASS`: Ap current content remains editorial.
* `PASS`: Work stories may bridge only through contextual logic.
* `PASS`: No blanket CTA pattern was added during image SEO work.
* `PASS`: Homepage keeps a soft bridge role only.

---

## 4. QA evidence

Commands run:

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

* `node scripts/build-content-from-cms.mjs`: `PASS`
  * `stories: 15`
  * `people: 3`
  * `places: 3`
  * `imageEssays: 2`
* `node -c assets/app.js`: `PASS`
* `node scripts/check-content-routes.mjs`: `PASS`
* image SEO source audit: `PASS`
* local preview smoke:
  * `GET /` -> `200 OK`
  * `GET /en/` -> `200 OK`
  * `GET /con-nguoi/nguoi-lam-viec-online-tu-da-lat/` -> `200 OK`
  * `GET /en/people/nguoi-lam-viec-online-tu-da-lat/` -> `200 OK`

---

## 5. Blockers

No Ap editorial P0 blocker remains for first-round Team 1 review.

Operational note:

* Bulk static rewrite scripts hit filesystem `ETIMEDOUT` in this local environment when writing many files:
  * `scripts/sync-routes-sitemap.mjs`
  * `scripts/sync-static-routes-meta.mjs`
* The only route gap detected after that was fixed manually:
  * `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html`
* Final route/sitemap/robots check passes after the manual fix.

---

## 6. Definition of done

Packet is complete for Team 1 first-round review because:

* metadata + image + linking + QA evidence have explicit paths
* report and matrix no longer rely on baseline placeholders
* current-state source and smoke evidence are recorded
* Ap lane can move from `PENDING_REPORT` to Team 1 review
