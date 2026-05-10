Om Dalat / Om Da Lat

Sprint 0 Visual And Staging Evidence Matrix

Version: v1.0.0

Status: ACTIVE

Date updated: 2026-05-07

Owner: Team 3

Audience: Team 2 / QA / SEO / Team 1

---

## 0. Muc dich

File nay la mau nop bang chung route-by-route cho Sprint 0.

Team 2 va QA/SEO khong nop chung chung "da check staging". Moi route can co:

* visual proof
* canonical proof
* hreflang proof
* CTA proof
* trang thai cuoi

---

## 1. Evidence rules

Team 2 nop:

* 1 screenshot desktop
* 1 screenshot mobile
* H1 proof
* CTA block proof
* note neu text wrap / image crop / line length co van de

QA / SEO nop:

* canonical value
* hreflang `vi-VN`, `en-US`, `x-default`
* title
* meta description
* featured image URL neu can doi chieu social/metadata

Path naming de xuat:

* `reports/sprint0/visual/<slug>/<locale>-desktop.png`
* `reports/sprint0/visual/<slug>/<locale>-mobile.png`
* `reports/sprint0/staging/<slug>/<locale>.md`
* scaffold command:
  * `pnpm sprint0:evidence:scaffold`

---

## 2. Team 2 visual evidence

| Route | Reading width | Locale split | CTA route | Desktop screenshot | Mobile screenshot | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi/articles/song-o-da-lat-la-gi` | `PENDING` | `PENDING` | `/vi/stay` | `reports/sprint0/visual/song-o-da-lat-la-gi/vi-desktop.png` | `reports/sprint0/visual/song-o-da-lat-la-gi/vi-mobile.png` | `PENDING` |  |
| `/en/articles/song-o-da-lat-la-gi` | `PENDING` | `PENDING` | `/en/stay` | `reports/sprint0/visual/song-o-da-lat-la-gi/en-desktop.png` | `reports/sprint0/visual/song-o-da-lat-la-gi/en-mobile.png` | `PENDING` |  |
| `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong` | `PENDING` | `PENDING` | `/vi/work` | `reports/sprint0/visual/lam-viec-o-da-lat-co-thuc-te-khong/vi-desktop.png` | `reports/sprint0/visual/lam-viec-o-da-lat-co-thuc-te-khong/vi-mobile.png` | `PENDING` |  |
| `/en/articles/lam-viec-o-da-lat-co-thuc-te-khong` | `PENDING` | `PENDING` | `/en/work` | `reports/sprint0/visual/lam-viec-o-da-lat-co-thuc-te-khong/en-desktop.png` | `reports/sprint0/visual/lam-viec-o-da-lat-co-thuc-te-khong/en-mobile.png` | `PENDING` |  |
| `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` | `PENDING` | `PENDING` | `/vi/join` | `reports/sprint0/visual/tu-mot-ky-nang-den-thu-nhap-o-da-lat/vi-desktop.png` | `reports/sprint0/visual/tu-mot-ky-nang-den-thu-nhap-o-da-lat/vi-mobile.png` | `PENDING` |  |
| `/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` | `PENDING` | `PENDING` | `/en/join` | `reports/sprint0/visual/tu-mot-ky-nang-den-thu-nhap-o-da-lat/en-desktop.png` | `reports/sprint0/visual/tu-mot-ky-nang-den-thu-nhap-o-da-lat/en-mobile.png` | `PENDING` |  |

---

## 3. QA / SEO staging evidence

| Route | Proof file | Canonical | `vi-VN` | `en-US` | `x-default` | Title | Meta description | Featured image | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi/articles/song-o-da-lat-la-gi` | `reports/sprint0/staging/song-o-da-lat-la-gi/vi.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/song-o-da-lat-la-gi-01.webp` | `PENDING` |  |
| `/en/articles/song-o-da-lat-la-gi` | `reports/sprint0/staging/song-o-da-lat-la-gi/en.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/song-o-da-lat-la-gi-01.webp` | `PENDING` |  |
| `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong` | `reports/sprint0/staging/lam-viec-o-da-lat-co-thuc-te-khong/vi.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/lam-viec-o-da-lat-co-thuc-te-khong-01.webp` | `PENDING` |  |
| `/en/articles/lam-viec-o-da-lat-co-thuc-te-khong` | `reports/sprint0/staging/lam-viec-o-da-lat-co-thuc-te-khong/en.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/lam-viec-o-da-lat-co-thuc-te-khong-01.webp` | `PENDING` |  |
| `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` | `reports/sprint0/staging/tu-mot-ky-nang-den-thu-nhap-o-da-lat/vi.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat-01.webp` | `PENDING` |  |
| `/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat` | `reports/sprint0/staging/tu-mot-ky-nang-den-thu-nhap-o-da-lat/en.md` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `PENDING` | `/images/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat-01.webp` | `PENDING` |  |

---

## 4. Final review rule

Team 1 chi co the chot `GO_STAGING` khi:

* 6/6 route visual status = `PASS`
* 6/6 route staging status = `PASS`
* khong co route nao bi lech locale, lech CTA, sai canonical, sai hreflang
* evidence path ton tai ro rang trong packet hoac report kem theo

---

## 5. Source of truth references

* `docs/SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md`
* `docs/SPRINT0_ACCEPTANCE_PACKET_TEMPLATE_2026-05-05.md`
* `docs/SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md`
* `data/seed/articles.seed.json`
* `data/seed/articles.seed.launch-v2.json`
* `data/seed/article-images.seed.json`
