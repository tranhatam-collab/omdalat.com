# APDALAT_CMS_SCHEMA_2026
## Version 1.0
## Status: Locked
## Scope: ap.omdalat.com
## Purpose: Khóa schema CMS cho team Dev/Content/SEO vận hành đồng bộ theo IA, SEO và Image policy đã chốt
## Depends on: APDALAT_INFORMATION_ARCHITECTURE_2026, APDALAT_SEO_MASTER_PLAN_2026, APDALAT_IMAGE_AND_GALLERY_POLICY_2026, APDALAT_LANGUAGE_CODEX_2026

---

## 0. CMS Lock Statement
CMS của Ấp Đà Lạt phải phục vụ mô hình editorial-place identity, không phục vụ mô hình listing/booking.

Schema phải đảm bảo:
1. Nội dung nhất quán giọng thương hiệu
2. SEO sạch từ đầu
3. i18n Vietnamese-first
4. Kiểm soát bridge sang omdalat.com đúng ngữ cảnh
5. Ảnh có metadata/rights đầy đủ

---

## 1. Global Modeling Rules

### 1.1 Vietnamese-first
- `vi` là bản gốc bắt buộc cho mọi content public
- `en` là adaptation có kiểm duyệt, không phải dịch máy tự động

### 1.2 ID and slug
- Mỗi document có `id` duy nhất (UUID hoặc CUID)
- `slug_vi` bắt buộc
- `slug_en` chỉ bắt buộc nếu publish EN
- Slug phải unique theo `content_type + locale`

### 1.3 Status lifecycle
- `draft`
- `in_review`
- `scheduled`
- `published`
- `archived`

### 1.4 Timestamp fields
- `created_at`
- `updated_at`
- `published_at`
- `last_reviewed_at`

---

## 2. Core Content Types

### 2.1 `page`
Dùng cho static pages: home/about/transition/editorial standards.

Required fields:
- `id`
- `type = page`
- `page_key` (`home`, `about`, `continue`, `editorial_standards`, ...)
- `locale` (`vi`, `en`)
- `title`
- `seo_title`
- `seo_description`
- `slug`
- `status`

Optional:
- `hero`
- `sections[]`
- `bridge_module`
- `og_image`

### 2.2 `article`
Bài viết dài theo pillar.

Required:
- `id`
- `type = article`
- `locale`
- `title`
- `slug`
- `standfirst`
- `body_richtext`
- `pillar`
- `primary_intent`
- `seo_title`
- `seo_description`
- `hero_image_id`
- `status`

Optional:
- `related_ids[]`
- `bridge_module`
- `reading_time_minutes`
- `location_context`
- `author_id`

### 2.3 `profile`
Chân dung con người.

Required:
- `id`
- `type = profile`
- `locale`
- `title`
- `slug`
- `person_name`
- `role_descriptor`
- `standfirst`
- `body_richtext`
- `seo_title`
- `seo_description`
- `hero_image_id`
- `status`

### 2.4 `place`
Nơi chốn và living map narratives.

Required:
- `id`
- `type = place`
- `locale`
- `title`
- `slug`
- `place_thesis`
- `living_qualities[]`
- `work_qualities[]`
- `sensory_notes`
- `seo_title`
- `seo_description`
- `hero_image_id`
- `status`

Optional:
- `district`
- `geo_hint`
- `place_gallery_ids[]`
- `tradeoffs`

### 2.5 `photo_essay`
Bộ ảnh kể chuyện.

Required:
- `id`
- `type = photo_essay`
- `locale`
- `title`
- `slug`
- `intro`
- `frames[]` (tối thiểu 6)
- `seo_title`
- `seo_description`
- `status`

`frames[]` item required fields:
- `image_id`
- `caption`
- `sequence`

### 2.6 `series`
Chuỗi chuyên đề.

Required:
- `id`
- `type = series`
- `locale`
- `title`
- `slug`
- `thesis`
- `status`

Optional:
- `cover_image_id`
- `child_content_ids[]`

### 2.7 `report`
Báo cáo theo mùa/chủ đề.

Required:
- `id`
- `type = report`
- `locale`
- `title`
- `slug`
- `report_period`
- `body_richtext`
- `seo_title`
- `seo_description`
- `status`

---

## 3. Shared Field Definitions

### 3.1 `pillar` enum
- `cach-song`
- `lam-viec`
- `con-nguoi`
- `noi-chon`
- `sinh-ke`
- `van-hoa-doi-thuong`
- `tuong-lai-vung-nho`
- `da-lat-va-the-gioi`

### 3.2 `primary_intent` enum
- `living`
- `working`
- `belonging`
- `livelihood`
- `culture`
- `future-model`

### 3.3 `bridge_module`
Object:
- `enabled` (boolean)
- `bridge_type` (`soft`, `contextual`, `transition_page`)
- `target_url` (default: `https://omdalat.com` hoặc route chỉ định)
- `cta_vi`
- `cta_en`
- `placement` (`sidebar`, `inline_after_section`, `article_end`, `footer_band`)

`bridge_module.enabled = true` chỉ cho phép khi intent thuộc nhóm transition.

### 3.4 `related_ids[]`
- 3-6 references
- tối thiểu 2 cùng pillar

---

## 4. Taxonomy Collections

### 4.1 `topic`
Fields:
- `id`
- `slug`
- `name_vi`
- `name_en`
- `description_vi`
- `description_en`
- `active`

### 4.2 `tag`
Fields:
- `id`
- `slug`
- `label_vi`
- `label_en`
- `tag_group` (`weather`, `work_mode`, `household`, `livelihood`, `neighborhood`, ...)
- `active`

Rule:
- Tag mới phải qua editorial approval
- Không tạo tag đồng nghĩa trùng nghĩa

---

## 5. Media Schema

### 5.1 `media_asset`
Required:
- `id`
- `file_url`
- `mime_type`
- `width`
- `height`
- `size_bytes`
- `alt_vi`
- `credit_name`
- `license_type`
- `license_scope`
- `source_type` (`in_house`, `commissioned`, `contributor`, `licensed`)
- `consent_required` (boolean)
- `consent_verified` (boolean)

Optional:
- `alt_en`
- `caption_vi`
- `caption_en`
- `location`
- `capture_date`
- `focal_point_x`
- `focal_point_y`
- `variants[]`

### 5.2 `variants[]`
- `mobile_720`
- `tablet_1200`
- `desktop_1800`

Publish blocker nếu thiếu variant mobile cho hero/card.

---

## 6. SEO Schema Block (per content)

Required `seo` object:
- `seo_title`
- `seo_description`
- `canonical_url`
- `og_title`
- `og_description`
- `og_image_id`
- `twitter_card_type` (`summary_large_image` default)
- `indexable` (boolean)

Optional:
- `focus_keyword_vi`
- `focus_keyword_en`
- `seo_notes`

Validation:
- `seo_title` 50-65 chars target
- `seo_description` 140-160 chars target
- không chứa forbidden travel/hotel phrases

---

## 7. Localization Schema

### 7.1 `translation_group_id`
Dùng để nhóm các version VI/EN cùng 1 nội dung.

### 7.2 `localized_version`
- `translation_group_id`
- `locale`
- `source_locale` (default `vi`)
- `translation_status` (`not_started`, `in_progress`, `ready`, `published`)
- `adaptation_notes`

Rule:
- Không publish EN nếu `translation_status != ready`
- Không hiển thị route EN khi chưa có adaptation đạt chuẩn

---

## 8. Editorial Workflow Schema

### 8.1 `workflow_meta`
- `owner_team` (`content`, `brand`, `seo`, `design`)
- `writer_id`
- `editor_id`
- `seo_reviewer_id`
- `brand_reviewer_id`
- `fact_check_status` (`pending`, `done`)
- `language_check_status` (`pending`, `done`)
- `image_rights_check_status` (`pending`, `done`)

### 8.2 Publish gate (all must pass)
1. language codex pass
2. SEO pass
3. image rights pass
4. internal links pass
5. bridge logic pass (nếu enabled)

---

## 9. Internal Linking Schema

### 9.1 `link_graph`
Per content:
- `must_link_to_ids[]` (min 3)
- `optional_link_to_ids[]`
- `linked_from_ids[]` (computed)

### 9.2 Required rule
- Bài mới phải link tới ít nhất 1 bài nền pillar tương ứng
- Bài transition intent phải có đúng 1 soft bridge module

---

## 10. API Contract (Headless CMS to Frontend)

### 10.1 Read endpoints (conceptual)
- `GET /content/pages/{slug}?locale=vi`
- `GET /content/articles/{slug}?locale=vi`
- `GET /content/hub/{pillar}?locale=vi`
- `GET /content/photo-essays/{slug}?locale=vi`

### 10.2 List endpoints
- `GET /content/articles?pillar=lam-viec&locale=vi&limit=12`
- `GET /content/search?q=...&locale=vi`

### 10.3 Response envelope
- `data`
- `seo`
- `links`
- `localizations`
- `meta`

---

## 11. Validation Rules (Critical)

### 11.1 Travel/hotel intent blocker
Từ khóa sau xuất hiện trong title/meta/H1 sẽ warning đỏ hoặc block tùy context:
- hotel, homestay, resort, booking, tour, must-visit, hidden gem, luxury escape

### 11.2 Structural blocker
Không publish nếu thiếu:
- H1/title
- standfirst (đối với article/profile/place)
- hero image có alt + credit + license
- seo block đầy đủ
- min internal links

### 11.3 Locale blocker
- Không publish EN nếu không có VI source cùng translation group

---

## 12. Example JSON: `article` (VI)

```json
{
  "id": "art_01J...",
  "type": "article",
  "translation_group_id": "tg_01J...",
  "locale": "vi",
  "title": "Sống Ở Đà Lạt Lâu Dài Có Dễ Không",
  "slug": "song-o-da-lat-lau-dai-co-de-khong",
  "standfirst": "Những tradeoff thật khi ở lại Đà Lạt quá một mùa.",
  "pillar": "cach-song",
  "primary_intent": "living",
  "body_richtext": "...",
  "hero_image_id": "img_01J...",
  "related_ids": ["art_01A", "art_01B", "place_01C"],
  "bridge_module": {
    "enabled": true,
    "bridge_type": "soft",
    "target_url": "https://omdalat.com",
    "cta_vi": "Nếu bạn muốn đi tiếp theo hướng ở lại rõ hơn, hãy tới Ôm Đà Lạt.",
    "placement": "article_end"
  },
  "seo": {
    "seo_title": "Sống Ở Đà Lạt Lâu Dài Có Dễ Không?",
    "seo_description": "Một góc nhìn thực tế về nhịp sống, công việc và những tradeoff khi ở lại Đà Lạt lâu dài.",
    "canonical_url": "https://ap.omdalat.com/bai-viet/song-o-da-lat-lau-dai-co-de-khong",
    "og_image_id": "img_01J...",
    "indexable": true
  },
  "status": "in_review"
}
```

---

## 13. Migration Plan (from zero to production)

### Phase 0
- Tạo collections/types theo file này
- Tạo enums và validators

### Phase 1
- Seed pages nền: home/about/hubs/transition/editorial-standards
- Seed taxonomy controlled list

### Phase 2
- Nhập 30 bài nền tảng đầu
- Bật publish workflow đầy đủ

### Phase 3
- Mở EN layer có chọn lọc
- Bật dashboard quality/index/bridge CTR

---

## 14. Ownership Matrix
- Content: title, body, related links, intent tagging
- Brand: tone/language lock approval
- SEO: seo object + indexation checks
- Design: image quality + caption fit
- Frontend: render templates, schema output, hreflang
- Engineering: validators, workflows, API envelope

---

## 15. Definition of Done
CMS schema được xem là hoàn chỉnh khi:
1. Team dev dựng được data model + validators không cần đoán thêm
2. Team content có form nhập liệu đúng intent và đủ trường bắt buộc
3. Team SEO có thể kiểm soát metadata/indexation/anti-drift ngay trong CMS
4. Team design/image có pipeline rights + alt + variants rõ ràng
5. Mọi nội dung publish ra `ap.omdalat.com` giữ đúng bản sắc Ấp Đà Lạt và phân biệt rõ với `omdalat.com`
