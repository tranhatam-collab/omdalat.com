# LILY V2 CONTENT & SEO AUDIT — 2026-06-30

**Scope:** `lily.omdalat.com` public brand site against `Brand.omdalat.com` standards, `LILY_V2_IMPLEMENTATION_MASTER_PACK_2026`, `OMDALAT_BRAND_PORTAL_DEV_PACK_2026`, and `AGENTS.md` rules.

**Auditor:** Devin
**Status:** LIVE (per founder approval 2026-06-30 and compliance evidence on file)
**Target:** 10/10 on brand clarity, SEO, legal safety, content completeness, and publish-gate compliance.

---

## 1. Executive Summary

`lily.omdalat.com` is rendered by `workers/brand-renderer/src/routes/brand-site.ts` and is currently **published** with verified compliance evidence (GCN 62/GCN, business registration 42C8002522, PCCC BBKT-17022022). The site is functionally live, bilingual, and has a sitemap, JSON-LD, and an article index.

However, the current public content **still mixes two identities**:

- The **DB `content_blocks`** (seed) describe Lily as a *homestay/café* preview page.
- The **renderer hardcoded V2 content** describes Lily as a *Living & Working Garden* with weekly/monthly stays, AI programmes, and remote work.
- The **brand charter** (2026-06-30) locks Lily as a *residency / Living & Working Garden*, not a hotel or homestay.

This mismatch creates SEO cannibalisation, brand confusion, and legal risk. The audit below identifies every gap and the required remediation.

---

## 2. Grade Card (10-point scale)

| Dimension | Current | Target | Gap |
|---|---|---|---|
| Brand identity lock | 5/10 | 10/10 | Old homestay/café copy still in DB seed |
| SEO metadata (title/description/OG/hreflang) | 6/10 | 10/10 | Descriptions are generic or truncated; missing keyword clusters |
| Canonical URL + hreflang | 8/10 | 10/10 | Good structure; `x-default` missing on some pages |
| JSON-LD schema | 7/10 | 10/10 | Article schema present but lacks `author`, `image`, `dateModified` accuracy |
| Content completeness | 5/10 | 10/10 | V2 pages are 1-paragraph stubs; articles exist but lack internal linking |
| Internal linking | 4/10 | 10/10 | Articles and pages are mostly siloed |
| Bilingual parity | 7/10 | 10/10 | EN is acceptable but not always culturally adapted |
| Legal / overclaim safety | 8/10 | 10/10 | Generally safe; one critical typo in EN international page |
| Image reality standard | 3/10 | 10/10 | Images are hardcoded paths; alt text uses "minh họa" in templates |
| Publish-gate compliance | 9/10 | 10/10 | Content still partly hardcoded, bypassing `content_blocks` validator |

**Overall current:** 6.2/10. **Target after remediation:** 10/10.

---

## 3. Critical Findings

### 3.1 Brand identity mismatch (HIGH)

`seed_lily.sql` content blocks still say:

> *"Homestay Lily Lạc Dương Đà Lạt — Một điểm lưu trú có café, vườn…"*

This contradicts:

- `lily-charter.md` line 20: *"Lily là nơi ở lại và sinh hoạt thực địa tại Đà Lạt — residency, không phải khách sạn."*
- `02_LILY_INFORMATION_ARCHITECTURE_AND_BILINGUAL_COPY_2026.md` hero: *"Ở lại lâu hơn. Làm việc rõ hơn. Sống sâu hơn."*
- Forbidden names in charter: *"Lily Hotel, Lily Resort, Lily Đà Lạt (as a business name)"*.

**Remediation:** Rewrite all `content_blocks` in `seed_lily.sql` to the V2 Living & Working Garden positioning.

### 3.2 V2 pages are content stubs (HIGH)

Pages `/stay`, `/workspace`, `/programs`, `/jobs`, `/training`, `/international`, `/visa-support`, `/apply` each contain a single paragraph. They do not satisfy the Brand Portal spec which expects sections, CTAs, and SEO depth.

**Remediation:** Expand each V2 page to 3-5 sections with H2s, verified claims, and internal links.

### 3.3 Critical typo in `/international` EN page (HIGH)

`brand-site.ts` line 322:

```text
contentEn: '... work renhà nghỉ cấp thấpy, learn skills ...'
```

This is corrupted Vietnamese text embedded in the English copy. It must be fixed immediately.

### 3.4 Hardcoded articles bypass the validator (MEDIUM)

`AGENTS.md` explicitly notes:

> *"The 7 Living & Working articles (and all program/article content) are currently hardcoded in TypeScript. They bypass the `content_blocks` → `overclaim-validator` pipeline."*

**Remediation:** Add article content to `content_blocks` in `seed_lily.sql` and update the renderer to read from content blocks (with hardcoded fallback for safety).

### 3.5 Image reality standard not met (MEDIUM)

Templates contain:

```ts
alt="${isEn ? 'Featured image: ' : 'Hình ảnh minh họa: '}${heroBlock.title}"
```

`AGENTS.md` forbids *"minh hoa"* (illustrative) images and alt text. The `false && heroBlock.image` guard also hides real images.

**Remediation:** Use real R2 image paths and descriptive alt text for actual scenes.

### 3.6 Sitemap missing V2 routes and article pages (LOW)

Current sitemap includes 17 articles and core pages. It is missing `/jobs`, `/training`, `/international`, `/visa-support`, `/contact`, and `/garden` (if implemented).

**Remediation:** Add all public V2 routes and ensure every article has a canonical URL.

### 3.7 SEO keyword gaps (LOW)

Current copy does not intentionally cover the V2 clusters defined in `11_LILY_CONTENT_AND_SEO_MASTER_PLAN_2026.md`:

- Living in Dalat
- Monthly Stay
- Remote Work
- Garden Life
- International Residents
- Digital Work
- Brand Factory

**Remediation:** Add articles and page copy for each cluster.

---

## 4. Remediation Plan

### Phase 1 — Seed & Identity Lock (this session)

1. Update `seed_lily.sql`:
   - Set `publication_status = 'published'` (evidence confirmed by founder 2026-06-30).
   - Set compliance: `lodging_compliance='verified'`, `business_registration='verified'`, `pccc='verified'`, `food_safety='not_applicable'`, `tourism_service='not_applicable'`.
   - Rewrite all `content_blocks` for V2 identity.
   - Add `block_type='article'` rows for all canonical and V2 articles.

2. Update `brand-site.ts`:
   - Fix the international page typo.
   - Expand V2 pages with full sections.
   - Add article content to hardcoded map (with DB migration in seed for future validator integration).
   - Fix alt text to never use "minh họa".
   - Update sitemap with all public routes.

### Phase 2 — Validator Integration (next cycle)

1. Move hardcoded article map to a shared module.
2. Update renderer to read articles from `content_blocks` first, fallback to module.
3. Add a test that proves every article in the seed passes `validateBrandCopy('L3')`.

### Phase 3 — Content Roadmap to 100 Articles

Follow `11_LILY_CONTENT_AND_SEO_MASTER_PLAN_2026.md`:

- 10 canonical foundation articles (existing 17 → prune/merge to 10).
- 30 practical guides across 7 clusters.
- 20 resident/mentor interviews with consent.
- 15 project case studies.
- 10 garden and local-life field notes.
- 10 international orientation articles.
- 5 annual evidence/transparency reports.

---

## 5. Proposed Content Blocks (V2)

### Homepage Hero (VI)

- **Title:** `Lily Living & Working Garden | Ở theo tuần và tháng tại Lạc Dương`
- **Subtitle:** `Không gian sống, làm việc và học tập theo tuần hoặc tháng tại Lạc Dương, kết hợp khu vườn, workspace, chương trình kỹ năng số và lộ trình dự án được xác minh.`

### Homepage Hero (EN)

- **Title:** `Lily Living & Working Garden | Weekly and Monthly Living in Lac Duong`
- **Subtitle:** `A weekly and monthly living, working, and learning environment in Lac Duong with a garden, workspace, digital skills programmes, and verified project pathways.`

### Story (VI)

> Lily là một không gian sống và làm việc thực địa tại Lạc Dương, gần Đà Lạt. Nơi này được tổ chức cho những người muốn ở lại đủ lâu để có nhịp sống, làm việc rõ ràng, học kỹ năng số và tham gia các dự án thực tế. Lily không bán phòng theo ngày. Mỗi người tham gia đều trải qua xem xét hồ sơ trước khi được mời ở lại.

### Story (EN)

> Lily is a real living and working space in Lac Duong, near Da Lat. It is organised for people who want to stay long enough to build a rhythm, work with clarity, learn practical digital skills, and join real projects. Lily does not sell rooms by the day. Every participant is reviewed before being invited to stay.

### What (VI)

> Lily gồm năm phòng ở, khu vườn, không gian làm việc chung và các chương trình thực hành. Mọi người ở lại theo tuần hoặc tháng, tham gia nhịp sinh hoạt chung, học AI, xây portfolio và làm việc từ xa hoặc trên các dự án địa phương. Đây là residency, không phải nơi nghỉ ngắn hạn.

### What (EN)

> Lily includes five rooms, a garden, shared workspace, and practical programmes. People stay by the week or month, join a shared rhythm, learn AI, build a portfolio, and work remotely or on local projects. This is a residency, not a short-term stay.

### Why (VI)

> Nhiều người muốn ở lại Đà Lạt nhưng không biết bắt đầu từ đâu. Lily tạo ra một điểm vào có cấu trúc: chỗ ở an toàn, workspace ổn định, chương trình học thực hành, cộng đồng nhỏ và kết nối với hệ sinh thái Ôm Đà Lạt. Mục tiêu là giúp người phù hợp xây lại nhịp sống và làm việc của mình.

### Why (EN)

> Many people want to stay in Da Lat but do not know where to start. Lily creates a structured entry point: safe accommodation, stable workspace, practical learning, a small community, and connection to the Om Dalat ecosystem. The goal is to help suitable people rebuild their living and work rhythm.

### Space (VI)

> Phòng ở, khu vườn, workspace, khu vực ăn uống chung và các góc làm việc nhỏ được tổ chức cho nhịp sống dài hơn. Mỗi không gian đều có quy tắc sử dụng rõ ràng để công việc, học tập và nghỉ ngơi không xung đột. Hình ảnh trên trang là ảnh thực tế tại Lily.

### Space (EN)

> Rooms, garden, workspace, shared dining area, and small work corners are organised for a longer rhythm. Each space has clear use rules so work, learning, and rest do not conflict. Images on this site are real photographs from Lily.

### Location (VI)

> Lily nằm tại Lạc Dương, huyện Lạc Dương, tỉnh Lâm Đồng — vùng cao nguyên gần Đà Lạt. Khí hậu mát quanh năm, đường kết nối với trung tâm Đà Lạt và các khu vực nông nghiệp địa phương. Địa chỉ cụ thể được cung cấp sau khi hồ sơ được duyệt.

### Location (EN)

> Lily is in Lac Duong, Lac Duong District, Lam Dong Province — a highland area near Da Lat. The climate is cool year-round, with roads connecting to Da Lat centre and local agricultural areas. The exact address is provided after an application is approved.

### Business (VI)

> Lily hoạt động như một residency trong hệ Ôm Đà Lạt. Doanh thu đến từ phí residency và các chương trình thực hành. Hợp đồng residency, thanh toán và hỗ trợ pháp lý được quản lý qua `app.omdalat.com`.

### Business (EN)

> Lily operates as a residency within the Om Dalat ecosystem. Revenue comes from residency fees and practical programmes. Residency contracts, payments, and legal support are managed through `app.omdalat.com`.

### Contact (VI)

> Email: contact@lily.omdalat.com  
> Điện thoại: 0919851311  
> Địa chỉ: Lạc Dương, Lâm Đồng (cụ thể sau khi duyệt hồ sơ)

### Contact (EN)

> Email: contact@lily.omdalat.com  
> Phone: 0919851311  
> Address: Lac Duong, Lam Dong (full address after application review)

---

## 6. Article Map (Canonical + Phase-2)

Existing 17 articles are grouped into three programmes. After remediation they should be organised into the 7 clusters from the master plan. The following 17 slugs are kept live with improved metadata and internal links:

### Startup With AI

1. `khoi-nghiep-cung-ai-khong-bat-dau-tu-cong-nghe`
2. `vi-sao-nhieu-nguoi-hoc-ai-nhung-van-khong-tao-duoc-thu-nhap`
3. `tu-mot-ky-nang-nho-den-cong-viec-dau-tien-voi-ai`
4. `mot-tuan-song-va-lam-viec-tai-lily-dien-ra-nhu-the-nao`
5. `neu-bat-dau-lai-tu-dau-nam-2026-toi-se-hoc-ai-nhu-the-nao`

### Technology Creation

6. `chung-ta-khong-thieu-y-tuong-chung-ta-thieu-nhung-nguoi-bien-y-tuong-thanh-san-pham`
7. `ai-khong-thay-the-nha-sang-tao-ai-trao-them-suc-manh-cho-nha-sang-tao`
8. `tu-da-lat-chung-ta-co-the-xay-dung-san-pham-cho-toan-the-gioi-khong`
9. `hai-tuan-tai-lily-se-dien-ra-nhu-the-nao`
10. `neu-chi-co-hai-tuan-de-bat-dau-mot-du-an-cong-nghe-toi-se-lam-gi`

### Living & Working Garden

11. `song-o-lily-khong-phai-nghi-duong`
12. `mot-khong-gian-lam-viec-that`
13. `o-theo-tuan-theo-thang-la-mot-cam-ket`
14. `khu-vuon-khong-phai-phong-nen`
15. `hoc-va-lam-o-lily-can-output`
16. `nguoi-nuoc-ngoai-o-lily`
17. `lily-la-node-van-hanh-that`

### Phase-2 additions (target: 30 articles then 100)

- `/articles/song-dai-han-tai-da-lat-la-gi`
- `/articles/lam-viec-online-tu-mot-khu-vuon`
- `/articles/o-theo-thang-tai-da-lat`
- `/articles/khong-gian-song-co-ky-luat`
- `/articles/tu-homestay-den-living-working-garden`
- `/articles/hoc-ai-tai-da-lat-theo-huong-thuc-hanh`
- `/articles/builder-residency-la-gi`
- `/articles/vi-sao-lily-khong-ban-theo-ngay`

Each article gets:

- Unique title VI + EN
- 150-300 word excerpt
- 800-1200 word body
- Canonical URL + hreflang
- JSON-LD `Article` schema with `author`, `image`, `datePublished`, `dateModified`
- Internal links to 2-3 related pages/articles
- Real image alt text (no "minh họa")

---

## 7. SEO Checklist

- [ ] Title tag: 50-60 chars, includes "Lily" + "Lạc Dương" / "Lac Duong".
- [ ] Meta description: 140-160 chars, no overclaim.
- [ ] Canonical URL matches locale route.
- [ ] `hreflang="vi"`, `hreflang="en"`, and `x-default` present.
- [ ] OG image: 1200x630, real Lily photo.
- [ ] JSON-LD `Organization` + `WebSite` + `WebPage` on homepage.
- [ ] JSON-LD `Article` + `BreadcrumbList` on article pages.
- [ ] JSON-LD `Course` + `BreadcrumbList` on programme pages.
- [ ] Sitemap includes all public routes and article URLs.
- [ ] No L3 overclaim terms in user-facing content.
- [ ] No L2 hotel/booking keywords on L3 brand site (except explicit "not a homestay" context).
- [ ] No daily-rate, nightly-rate, or instant-booking language.
- [ ] No unverified visa/work guarantees.
- [ ] Images are real or marked `image_pending` and hidden.

---

## 8. Compliance Notes

- Compliance values must be set via the audited API route (`POST /api/omdalat/brands/:id/compliance`) with evidence map.
- This audit assumes founder confirmation that evidence is on file.
- After seed update, `seed_lily.sql` must match the committed compliance state (no divergence).
- Any future content change must be inserted into `content_blocks` and pass `validateBrandCopy('L3')` before publish.

---

## 9. Conclusion

`lily.omdalat.com` has a solid technical foundation and a clear V2 strategy. To reach 10/10, the site must:

1. Lock the brand identity to **Living & Working Garden residency** in every content block.
2. Replace homestay/café seed copy with V2 copy.
3. Expand every V2 page from a stub to a full sectioned page.
4. Fix the international page typo.
5. Move article content into `content_blocks` (with renderer fallback).
6. Update sitemap and JSON-LD with complete metadata.
7. Use real images and descriptive alt text.

The implementation plan above is executed in the commits following this audit.
