Om Dalat / Om Da Lat

Sprint 0 Article Metadata Route Proof

Version: v1.0.0

Status: CURRENT_STATE_BASELINE

Date updated: 2026-05-07

Owner: Team 3

Audience: Team 2 / QA / SEO / Team 1

---

## 0. Muc dich

File nay la bang doi chieu staging cho 3 bai launch.

QA/SEO khong can suy doan metadata/canonical/hreflang tu code. Chi can mo staging va doi chieu theo file nay.

Code sources:

* `apps/web/app/articles/[slug]/page.tsx`
* `apps/web/lib/content-seed.ts`
* `apps/web/lib/metadata.ts`
* `apps/web/lib/canonical.ts`
* `data/seed/articles.seed.json`
* `data/seed/article-images.seed.json`

---

## 1. Global route rules

Canonical origin:

* `https://omdalat.com`

Locale route rule:

* Vietnamese article: `https://omdalat.com/vi/articles/<slug>`
* English article: `https://omdalat.com/en/articles/<slug>`

Hreflang rule expected on every launch article:

* `vi-VN` -> Vietnamese URL
* `en-US` -> English URL
* `x-default` -> Vietnamese URL

---

## 2. Article 1

Slug:

* `song-o-da-lat-la-gi`

Expected routes:

* `https://omdalat.com/vi/articles/song-o-da-lat-la-gi`
* `https://omdalat.com/en/articles/song-o-da-lat-la-gi`

Expected metadata:

* `title_vi`: `Sống ở Đà Lạt là gì? | Ôm Đà Lạt`
* `title_en`: `What living in Dalat means | Om Dalat`
* `description_vi`: `Không phải đi để trốn, mà để dựng lại nhịp sống. Hiểu rõ điều này trước khi quyết định ở lại lâu.`
* `description_en`: `Dalat is not an escape location. Learn how to test rhythm, cost, and long-term fit before you stay.`

Expected featured image:

* `/images/articles/song-o-da-lat-la-gi-01.webp`

Expected CTA intent:

* `contextual_cta`: `stay`
* CTA route on page: `/vi/stay` or `/en/stay`

Expected locale content rule:

* H1 VI phai la noi dung tieng Viet
* H1 EN phai la noi dung tieng Anh

---

## 3. Article 2

Slug:

* `lam-viec-o-da-lat-co-thuc-te-khong`

Expected routes:

* `https://omdalat.com/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
* `https://omdalat.com/en/articles/lam-viec-o-da-lat-co-thuc-te-khong`

Expected metadata:

* `title_vi`: `Làm việc ở Đà Lạt có thực tế không? | Ôm Đà Lạt`
* `title_en`: `Is working in Dalat realistic? | Om Dalat`
* `description_vi`: `Kiểm tra tính thực tế của việc làm việc ở Đà Lạt qua kỹ năng, nguồn việc rõ ràng và khả năng tự quản nhịp sinh hoạt.`
* `description_en`: `Check if work in Dalat is realistic by matching skill depth, client channel, and rhythm discipline.`

Expected featured image:

* `/images/articles/lam-viec-o-da-lat-co-thuc-te-khong-01.webp`

Expected CTA intent:

* `contextual_cta`: `work`
* CTA route on page: `/vi/work` or `/en/work`

Expected locale content rule:

* H1 VI phai la noi dung tieng Viet
* H1 EN phai la noi dung tieng Anh

---

## 4. Article 3

Slug:

* `tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Expected routes:

* `https://omdalat.com/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`
* `https://omdalat.com/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Expected metadata:

* `title_vi`: `Từ kỹ năng nhỏ đến thu nhập | Ôm Đà Lạt`
* `title_en`: `From one skill to income in Dalat | Om Dalat`
* `description_vi`: `Một kỹ năng nhỏ vẫn có thể thành nguồn thu nếu lặp lại đều, chọn đúng khối việc và duy trì cam kết khách quan.`
* `description_en`: `A focused small skill can turn into stable income with repeated delivery, right client fit, and consistent professional pace.`

Expected featured image:

* `/images/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat-01.webp`

Expected CTA intent:

* `contextual_cta`: `join`
* CTA route on page: `/vi/join` or `/en/join`

Expected locale content rule:

* H1 VI phai la noi dung tieng Viet
* H1 EN phai la noi dung tieng Anh

---

## 5. Staging signoff checklist

QA/SEO danh `PASS` khi:

* canonical trung dung URL o dung locale
* hreflang doi xung VI/EN
* title/meta description dung 100% nhu bang tren
* featured image dung slug + `webp`
* CTA route cuoi bai dung intent cua tung bai
* `pnpm validate:sprint0-launch` pass truoc khi doi chieu staging
