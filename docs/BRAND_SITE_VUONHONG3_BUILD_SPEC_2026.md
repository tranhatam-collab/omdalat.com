# BRAND_SITE_VUONHONG3_BUILD_SPEC_2026

Homestay Vườn Hồng 3 — `vuonhong3.omdalat.com`
Worked example: one complete, build-ready L3 brand microsite

Version: 1.0 — build-ready
Status: **PRIVATE_PREVIEW** (not public; see §0 blockers)
Layer: **L3 brand microsite** + **L2 editorial place ref**
Depends on: `APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17.md`,
`OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026.md`,
`OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

> Goal of this file: a dev/agent can build the entire site from this document
> alone, with **zero open questions**. Every fact that is not yet verified is a
> labeled `{{TOKEN}}` with who fills it and the gate it unblocks. Anything not in
> `{{}}` is final.
>
> ⚠️ Domain note: the brand is `vuonhong3.omdalat.com`, **not** `omdala.com`.
> `omdala.com` is the retired system and must never be used (presence rules P0).

---

## 0. Publish status & blockers (read first)

- **Current state:** `private_preview`. The host resolves only to a holding page
  until `publication_status = 'published'` in D1 and an `Admin` `approve_publish` row
  exists (audit §5a-2).
- **Type:** `homestay` → `can_host_stay = true` → **lodging compliance gate is ON**
  (§8). No stay CTA, no price, no "Đặt phòng/Book now" may render until that gate and
  owner consent pass.
- **Hard blockers to public launch** (all must clear — §10):
  1. `owners.consent_status = 'approved'`
  2. ≥1 real, rights-cleared hero image (`media_asset.consent_verified = 1`)
  3. lodging compliance fields ≠ `unknown`
  4. `qa_passed = 1` and Admin `approve_publish`
- Until then the page shows the **building-in-progress** state (§5 Hero variant B)
  with a single CTA: *Gửi yêu cầu tìm hiểu / Send an inquiry*.

---

## 1. Identity & resolved facts

| Field | Value | Source |
| --- | --- | --- |
| `brand_id` | `brnd_vuonhong3` | assigned |
| Brand name (VI) | Homestay Vườn Hồng 3 | Google Maps (named place) |
| Brand name (EN) | Vuon Hong 3 Homestay | adaptation |
| Network | Ôm Đà Lạt / Ấp Đà Lạt | locked |
| `slug` / `subdomain` | `vuonhong3` / `vuonhong3.omdalat.com` | assigned |
| `brand_type` | `homestay` | from Maps category |
| `lat`, `lng` | `12.0985412`, `108.5428796` | resolved from Maps link |
| `maps_url` | `https://maps.app.goo.gl/t6oJQBvEt8JTH4Lc9` | given |
| Google CID | `0xd5cde5dff8d7577e` (feature `/g/11t4__h749`) | resolved |
| `google_place_id` | `{{PLACE_ID: resolve CID→PlaceID via Places API, Team2}}` | — |
| `administrative_area` | Lạc Dương / Đà Lạt, Lâm Đồng | coords (confirm exact thôn/xã — Field) |
| `address_vi` / `address_en` | `{{ADDRESS: Field}}` | not in Maps link |
| `maps_status` | `named_place` | resolved |
| `verification_status` | `pending` | no owner consent yet |
| `publication_status` | `private_preview` | §0 |

Owner record:

| Field | Value |
| --- | --- |
| `owners.name` | `{{OWNER_NAME: Field}}` |
| `owners.contact` | `{{OWNER_PHONE/ZALO: Field}}` |
| `owners.consent_status` | `pending` → `approved` after signed consent (§11) |

---

## 2. Layer placement

- **L3 microsite** `vuonhong3.omdalat.com` — this spec. Story + stay + experiences +
  inquiry. Commerce/lead lives here; booking/payment (if ever) delegates to L1.
- **L2 editorial ref** on `ap.omdalat.com` — a `place`/`profile` entry written in the
  editorial voice (no `homestay/booking` words — ap keyword blocker). The microsite
  links to it as *"Xem hồ sơ trên Ấp Đà Lạt"*; ap links back softly. **No content
  mirroring** (presence rules). `brands.ap_place_ref = {{AP_PLACE_SLUG: Content}}`.
- **L1** processes inquiries via `api.omdalat.com` (§9).

---

## 3. Domain, DNS, routing, CORS (concrete)

- **DNS:** no per-brand record. Covered by the single wildcard
  `*.omdalat.com` (audit §5a-3). Adding this brand = the D1 rows in §4 only.
- **Renderer:** the L3 subdomain renderer (Worker/Pages) reads the `Host` header:
  ```
  Host = "vuonhong3.omdalat.com"
    → strip ".omdalat.com" → slug "vuonhong3"
    → SELECT * FROM brands WHERE slug='vuonhong3'
    → if row.publication_status='published' → render site
       else → holding page (200) for private_preview, 404 for unknown slug
  ```
- **CORS (api.omdalat.com):** allow origin iff it matches `*.omdalat.com` **AND** the
  brand is `published` in D1. Do not add `vuonhong3.omdalat.com` to the static
  `CORS_ORIGINS` string — it is granted dynamically by the published-allowlist check.
- **Cookies:** inherit `COOKIE_DOMAIN=.omdalat.com` (already set) — shared session
  with L1, no extra config.
- **TLS:** covered by the `*.omdalat.com` wildcard cert. No per-brand cert.

---

## 4. D1 records (omdalat-core) — exact inserts

Migrations from `OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026 §4` must exist first.
`{{}}` = fill before the gate it feeds; everything else is final. Timestamps ISO-8601.

```sql
INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
VALUES ('own_vuonhong3', '{{OWNER_NAME}}', '{{OWNER_CONTACT}}', 'pending', NULL,
        'Homestay Vườn Hồng 3, Lạc Dương', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng,
                    address_vi, address_en, administrative_area, maps_status,
                    verification_status, created_at, updated_at)
VALUES ('plc_vuonhong3', 'own_vuonhong3',
        'https://maps.app.goo.gl/t6oJQBvEt8JTH4Lc9', '{{PLACE_ID}}',
        12.0985412, 108.5428796, '{{ADDRESS_VI}}', '{{ADDRESS_EN}}',
        'Lạc Dương, Lâm Đồng', 'named_place', 'pending',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_vuonhong3', 'plc_vuonhong3', 'own_vuonhong3',
        'Homestay Vườn Hồng 3', 'Vuon Hong 3 Homestay', 'vuonhong3',
        'vuonhong3.omdalat.com', 'homestay',
        1, 1, 0, 0, 'private_preview', '{{AP_PLACE_SLUG}}',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

INSERT INTO compliance_checklists (id, brand_id, business_registration,
                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_vuonhong3', 'brnd_vuonhong3', 'unknown', 'unknown',
        'not_applicable', 'unknown', 'not_applicable', '2026-06-17T00:00:00Z');
```

`content_blocks`, `media_asset` rows, and the `inquiry` flow follow §5/§7/§9.

---

## 5. Page structure & bilingual copy (VI source, EN adaptation)

Single-page, anchored sections + sticky nav. **VI is the source of truth;** EN is a
reviewed adaptation, not machine translation, and `/en` only renders when
`content_blocks.translation_status='ready'`. `{{}}` copy is gated on a verified fact.

### Nav
- VI: Trang chủ · Câu chuyện · Lưu trú · Trải nghiệm · Hình ảnh · Vị trí · Liên hệ
- EN: Home · Story · Stay · Experiences · Images · Location · Contact

### Section 1 — Hero
Two variants; the renderer picks by `publication_status`.

**Variant A — published** (only after §0 blockers clear):
- VI H1: `Homestay Vườn Hồng 3`
- VI sub: `Một homestay giữa vùng cao Lạc Dương, trong hệ Ôm Đà Lạt.`
- EN H1: `Vuon Hong 3 Homestay`
- EN sub: `A homestay in the Lac Duong highlands, within the Om Dalat network.`
- CTA: *Gửi yêu cầu tìm hiểu* / *Send an inquiry* (no "Đặt phòng" until booking is legally enabled)

**Variant B — private_preview (current):**
- VI H1: `Homestay Vườn Hồng 3`
- VI sub: `Một hồ sơ đang được xây dựng trong hệ Ấp Đà Lạt. Chúng tôi đang hoàn thiện
  thông tin, hình ảnh và câu chuyện cùng chủ nhà trước khi mở rộng kết nối.`
- EN sub: `A profile being built within the Ap Dalat system. We are finalizing the
  information, images, and story together with the host before opening connections.`
- CTA: *Gửi yêu cầu tìm hiểu* / *Send an inquiry*

### Section 2 — Câu chuyện / Story
Evergreen-safe copy (true regardless of verification):
- VI: `Vườn Hồng 3 nằm ở vùng cao Lạc Dương, nơi khí hậu mát quanh năm và nhịp sống
  gắn với vườn. Đây là một nơi chốn thật mà Ôm Đà Lạt đang ghi lại một cách chậm rãi:
  con người, không gian và cách họ giữ đất, làm vườn và đón những người muốn ở lại
  lâu hơn một chuyến đi.`
- EN: `Vuon Hong 3 sits in the Lac Duong highlands, where the air stays cool through
  the year and daily life moves with the garden. It is a real place that Om Dalat is
  documenting slowly: the people, the space, and how they keep the land, tend the
  garden, and welcome those who want to stay longer than a trip.`
- Owner note (gated): `{{OWNER_STORY: 2–4 câu chủ nhà tự kể, Field/Content}}`

### Section 3 — Lưu trú / Stay  *(renders only if compliance gate §8 passes)*
- VI intro: `Không gian lưu trú tại Vườn Hồng 3 đang được hoàn thiện hồ sơ.`
- Room cards: `{{ROOMS: số phòng, loại phòng, sức chứa, tiện nghi — Field}}`
- Price: `{{PRICE: chỉ hiển thị khi có pháp lý lưu trú — Field/Admin}}`
- If gate not passed → this section is hidden entirely (not shown empty).

### Section 4 — Trải nghiệm / Experiences  *(optional)*
- `{{EXPERIENCES: làm vườn, hái hồng, tuyến đi bộ… nếu có thật và an toàn — Field}}`
- Each experience needs: capacity, duration, safety note (validator §10).

### Section 5 — Hình ảnh / Images
- Gallery from `media_asset` (§7). Until ≥1 rights-cleared image exists, show a single
  neutral placeholder, never stock or scraped Maps photos.

### Section 6 — Vị trí / Location
- Map embed centered on `12.0985412, 108.5428796` (Google Maps embed allowed; no
  scraping of reviews/photos).
- VI: `Vùng cao Lạc Dương, Lâm Đồng. Địa chỉ chi tiết sẽ được cập nhật cùng chủ nhà.`
- EN: `Lac Duong highlands, Lam Dong. The detailed address will be updated with the host.`

### Section 7 — Liên hệ / Contact (inquiry form §9)
- VI title: `Liên hệ Vườn Hồng 3` · EN: `Contact Vuon Hong 3`
- Fields: name, contact (phone/email/Zalo), message, consent checkbox (§9).
- Footer cross-links: *Xem hồ sơ trên Ấp Đà Lạt* (L2) · *Về Ôm Đà Lạt* (L1).

### Forbidden copy (hard validator §10, all sections)
`nổi tiếng`, `tốt nhất`, `đạt chuẩn`, `organic` (no cert), `đã mở cửa đón khách`
(unless `can_host_visit=verified`), `đặt ngay`/`book now` (unless booking legally
enabled), and any amenity/price not backed by a `{{}}`-verified field.

---

## 6. SEO

- **Title (VI):** `Homestay Vườn Hồng 3, Ôm Đà Lạt` (matches founder's locked SEO line)
- **Title (EN):** `Vuon Hong 3 Homestay — Om Dalat`
- **Meta description (VI):** `Homestay Vườn Hồng 3 ở vùng cao Lạc Dương, trong hệ Ôm
  Đà Lạt. Hồ sơ địa phương thật: con người, không gian và cách liên hệ.` (≤160 chars)
- **Meta description (EN):** `Vuon Hong 3 Homestay in the Lac Duong highlands, part of
  the Om Dalat network. A real local profile: people, space, and how to get in touch.`
- **Canonical:** `https://vuonhong3.omdalat.com/` (self; never canonical to ap or om)
- **hreflang:** `vi-VN` → `/`, `en` → `/en`, `x-default` → `/`
- **OG:** og:title = VI title, og:type = `website`, og:image = published hero
  (`media_asset` 1200×630 variant), og:url = canonical.
- **robots:** `noindex` while `private_preview`; `index,follow` flips on publish.
- **JSON-LD** (inject on publish only; placeholders filled by then):

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Homestay Vườn Hồng 3",
  "url": "https://vuonhong3.omdalat.com/",
  "geo": { "@type": "GeoCoordinates", "latitude": 12.0985412, "longitude": 108.5428796 },
  "address": { "@type": "PostalAddress", "addressRegion": "Lâm Đồng",
               "addressLocality": "Lạc Dương", "addressCountry": "VN",
               "streetAddress": "{{ADDRESS_VI}}" },
  "telephone": "{{OWNER_PHONE}}",
  "parentOrganization": { "@type": "Organization", "name": "Ôm Đà Lạt", "url": "https://omdalat.com" }
}
```
> Omit `telephone`/`streetAddress` keys entirely if unverified — never emit empty/fake.
> Do **not** add `aggregateRating` (no rights to Google reviews).

---

## 7. Images (reuse `media_asset` — no parallel model)

Shot list (Field/Content to capture or receive with rights):

| key | role | required for | status |
| --- | --- | --- | --- |
| `cong-loi-vao` | hero / og | publish | `{{capture}}` |
| `vuon-hong` | gallery | publish | `{{capture}}` |
| `khong-gian-chung` | card | publish | `{{capture}}` |
| `phong-luu-tru` | stay section | stay section | `{{capture, only if compliance ok}}` |
| `goc-don-khach` | gallery | optional | `{{capture}}` |

Each `media_asset` row must have: `alt_vi`, `credit_name`, `license_type`,
`source_type` (`in_house`/`commissioned`/`contributor`), `consent_required`,
`consent_verified`. Variants: `mobile_720`, `tablet_1200`, `desktop_1800` (+ `og_1200x630`).
Store in R2 `omdalat-assets`. **No scraped Google/Booking/Facebook photos.**

---

## 8. Compliance gate (lodging — homestay)

Because `can_host_stay = 1`, before any stay CTA / price / room detail renders:

| `compliance_checklists` field | must be | who |
| --- | --- | --- |
| `business_registration` | not `unknown` | Field/Admin |
| `lodging_compliance` | not `unknown` | Field/Admin |
| `pccc` | not `unknown` | Field/Admin |
| `food_safety` | `not_applicable` unless meals served | Field |

Legal anchors: NĐ 96/2016 (an ninh trật tự / lưu trú), NĐ 13/2023 (dữ liệu cá nhân),
ATTP if meals are served. The site **states status + checklist only**; it is not legal
advice. If the gate is not met → Stay section hidden, CTA stays at "Gửi yêu cầu tìm hiểu".

---

## 9. Inquiry form + API (L3 → L1)

- **Form fields:** `name` (req), `contact` (req, phone/email/Zalo), `message` (opt),
  `consent` checkbox (req).
- **Consent text (NĐ 13/2023):** VI `Tôi đồng ý để Ôm Đà Lạt lưu thông tin liên hệ này
  nhằm phản hồi yêu cầu của tôi.` / EN `I agree to let Om Dalat store this contact
  information to respond to my request.`
- **Endpoint:** `POST https://api.omdalat.com/api/omdalat/brands/brnd_vuonhong3/inquiry`
  ```json
  { "contact": "...", "name": "...", "message": "...",
    "locale": "vi", "source": "vuonhong3.omdalat.com", "consent": true }
  ```
- **Server:** insert into `inquiries`; notify owner + Admin via `mail.iai.one`;
  Turnstile-protect; rate-limit. **No payment, no booking** in this lane (homestay
  booking, if ever enabled, is a separate L1 flow gated on §8 + legal sign-off).

---

## 10. Validators / publish gate (exact booleans)

`POST /api/omdalat/brands/brnd_vuonhong3/publish` succeeds **only if all true**:

```
owner_consent       = (owners.consent_status = 'approved')
image_approved      = (≥1 media_asset hero with consent_verified=1 and license_type set)
content_approved    = (Admin approve_content) AND (no forbidden copy §5) AND (no overclaim)
compliance_reviewed = (lodging fields §8 ≠ 'unknown')
qa_passed           = (VI present; EN either absent or translation_status='ready';
                       SEO §6 complete; canonical=self; robots flips to index;
                       internal links to L2/L1 present)
admin_publish       = (approvals row: action='approve_publish', approved_by=Admin)
```

On publish: `publication_status='published'`, robots → `index,follow`, JSON-LD injected,
CORS allowlist now grants the origin. Revoked consent → auto `suspended` + holding page.

---

## 11. Human worklist (the 10–20% — what unblocks public launch)

Ordered; each maps to a `{{}}` above:

1. **Field** visits / contacts owner → signed **owner consent** + name + phone/Zalo
   → `owners.consent_status='approved'`.
2. **Field** captures ≥3 real photos with rights → `media_asset` rows + R2 upload.
3. **Field/Admin** confirms lodging legal status → fill compliance §8.
4. **Field** confirms exact address/thôn-xã, room/price/amenity facts → fill `{{ROOMS/PRICE/ADDRESS}}`.
5. **Team2** resolves CID `0xd5cde5dff8d7577e` → `google_place_id` via Places API.
6. **Content** writes the L2 ap editorial entry (no booking words) → `ap_place_ref`.
7. **Content** writes EN adaptation → `translation_status='ready'`.
8. **Admin** runs QA, approves content/images/compliance/publish.

Until step 8, the site stays at Hero Variant B with the inquiry CTA only.

---

## 12. Definition of Done

- [ ] D1 rows (§4) inserted; renderer serves `vuonhong3.omdalat.com` per §3.
- [ ] Private-preview page renders Hero Variant B + working inquiry form (§9).
- [ ] All `{{}}` either filled with verified facts or their section correctly hidden.
- [ ] Publish gate (§10) enforced server-side; no path bypasses Admin approval.
- [ ] No forbidden/overclaim copy; no scraped media; no "Đặt phòng" pre-legal.
- [ ] SEO/JSON-LD correct and gated on publish; canonical = self.
- [ ] On Admin publish, site flips to Variant A, indexable, CORS-granted; revoke → suspend.

This single file is sufficient to build `vuonhong3.omdalat.com` end-to-end with no
further questions; every remaining unknown is an explicit, owned `{{TOKEN}}`.
