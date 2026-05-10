Ap Dalat / Ấp Đà Lạt

Ap Editorial Route And Metadata Matrix

Version: v1.1.0

Status: AP_TEAM_CURRENT_STATE_SUBMITTED

Date updated: 2026-04-29 00:32 ICT

Owner: Ap Team

Reviewer: Team 1

Scope: route inventory + metadata + image audit cho lane Ap editorial

---

## 0. Mục đích

File này là matrix current-state do Ap Team xác nhận sau baseline prefill của Team 1.

Mục tiêu:

* nhìn rõ route editorial chính đang có
* metadata song ngữ đã đủ chưa
* image alt/caption/filename đã theo chuẩn chưa
* canonical / hreflang / sitemap / robots đã đúng chưa
* xác nhận Ap giữ vai trò editorial độc lập, không trùng lane Om

---

## 1. Evidence sources

* Runtime/local static preview: `http://127.0.0.1:4174/`
* Static source: `ap.omdalat.com`
* Metadata source:
  * `ap.omdalat.com/content/cms/seo-overrides.json`
  * `ap.omdalat.com/content/cms/sections.json`
  * `ap.omdalat.com/content/cms/stories.json`
  * `ap.omdalat.com/content/cms/people.json`
  * `ap.omdalat.com/content/cms/places.json`
  * `ap.omdalat.com/content/cms/image-essays.json`
* Image source:
  * `ap.omdalat.com/content/cms/image-assets.json`
  * `ap.omdalat.com/assets/content.js`
* Route/sitemap/robots check:
  * `node scripts/check-content-routes.mjs`
* JS syntax check:
  * `node -c assets/app.js`

---

## 2. Current-state matrix

| Route | Locale | Page type | Title | Meta description | Canonical | Hreflang | Sitemap | Robots | Alt text | Caption | Filename | Om link status | QA status | Evidence path | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `vi-VN` | `homepage-editorial` | `Ấp Đà Lạt | Những con người, nơi chốn và nhịp sống Đà Lạt` | `Hiểu Đà Lạt như một nơi để ở lại, làm việc và giữ một nhịp sống có thể đi đường dài.` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `CONTEXTUAL_PASS` | `PASS` | `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md` | Local preview `200 OK`; homepage keeps editorial role. |
| `/en/` | `en` | `homepage-editorial` | `Ap Dalat | People, Places and Rhythms of Dalat` | `Read Dalat as a living place through its people, places, work, and daily rhythms.` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `CONTEXTUAL_PASS` | `PASS` | `ap.omdalat.com/docs/AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md` | Local preview `200 OK`; EN metadata is localized. |
| `/con-nguoi/` | `vi-VN` | `category` | `Con người | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/en/people/` | `en` | `category` | `People | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/noi-chon/` | `vi-VN` | `category` | `Nơi chốn | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/en/places/` | `en` | `category` | `Places | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/nhip-song/` | `vi-VN` | `category` | `Nhịp sống | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/en/rhythms/` | `en` | `category` | `Rhythms | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/lam-viec/` | `vi-VN` | `category` | `Làm việc | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `CONTEXTUAL_PASS` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Work category may bridge softly to Om by policy. |
| `/en/work/` | `en` | `category` | `Work | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `CONTEXTUAL_PASS` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Work category may bridge softly to Om by policy. |
| `/cau-chuyen/` | `vi-VN` | `category` | `Câu chuyện | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/en/stories/` | `en` | `category` | `Stories | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Category exists in sitemap and source route set. |
| `/hinh-anh/` | `vi-VN` | `category` | `Hình ảnh | Ấp Đà Lạt` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Image category included in image sitemap set. |
| `/en/images/` | `en` | `category` | `Images | Ap Dalat` | Section thesis from CMS. | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/sections.json` | Image category included in image sitemap set. |
| `/con-nguoi/nguoi-lam-viec-online-tu-da-lat/` | `vi-VN` | `person-detail` | `Một người làm việc online từ Đà Lạt` | `Điều khó không phải là mạng hay cuộc gọi. Điều khó là xây được một nhịp làm việc không lạc khỏi đời sống thật.` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/content/cms/people.json` | Local preview `200 OK`; gallery ids added. |
| `/en/people/nguoi-lam-viec-online-tu-da-lat/` | `en` | `person-detail` | `Someone Working Online from Dalat` | `The hard part is not the internet or the calls. It is building a work rhythm that does not drift away from real life.` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE` | `PASS` | `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html` | Missing static shell was added; local preview `200 OK`. |
| `all story/person/place/image details` | `vi-VN/en` | `detail-rollup` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `PASS` | `NONE/CONTEXTUAL_PASS` | `PASS` | `ap.omdalat.com/content/vi.json`, `ap.omdalat.com/content/en.json` | Rollup: `23/23` content objects have gallery evidence; `8/8` image assets have bilingual alt/caption. |

---

## 3. Check summary

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

* content build: `PASS` (`stories: 15`, `people: 3`, `places: 3`, `imageEssays: 2`)
* JS syntax: `PASS`
* content routes + phase-2 sitemap set + robots policy: `PASS`
* image SEO source audit: `PASS` (`8` images, `23/23` gallery pages, `0` missing image text)
* local smoke: `PASS` on sampled VI/EN homepage and people detail routes

---

## 4. Known note

`scripts/sync-routes-sitemap.mjs` and `scripts/sync-static-routes-meta.mjs` hit filesystem `ETIMEDOUT` while rewriting many static files in this environment. Ap Team resolved the only resulting route gap manually:

* added `ap.omdalat.com/en/people/nguoi-lam-viec-online-tu-da-lat/index.html`

After that, `node scripts/check-content-routes.mjs` passed.

---

## 5. Definition of done

Matrix is complete for first-round Team 1 review because:

* route editorial chính have current-state rows
* metadata song ngữ has current-state evidence
* image system has current-state evidence
* sitemap/robots/canonical/hreflang checks pass
* evidence path khớp với report Ap editorial
