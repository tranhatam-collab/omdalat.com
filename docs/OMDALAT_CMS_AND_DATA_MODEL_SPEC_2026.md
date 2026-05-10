# OMDALAT CMS AND DATA MODEL SPEC 2026

Version: LOCKED  
Status: CMS and content structure source of truth

---

## 0. Collections Bat Buoc

### Spaces

```json
{
  "name": "",
  "slug": "",
  "type": "",
  "capacity": "",
  "price_monthly": "",
  "location_area": "",
  "description_vi": "",
  "description_en": "",
  "images": [],
  "status": "draft"
}
```

### Work

```json
{
  "title": "",
  "slug": "",
  "type": "",
  "income_range": "",
  "skills_required": [],
  "time_commitment": "",
  "description_vi": "",
  "description_en": "",
  "status": "draft"
}
```

### LearningPrograms

```json
{
  "title": "",
  "slug": "",
  "duration": "",
  "format": "",
  "price": "",
  "output": "",
  "description_vi": "",
  "description_en": "",
  "status": "draft"
}
```

### CommunityActivities

```json
{
  "title": "",
  "slug": "",
  "type": "",
  "schedule": "",
  "capacity": "",
  "description_vi": "",
  "description_en": "",
  "status": "draft"
}
```

### Articles

Current seed adapter:

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "category": "",
  "tags": [],
  "hero_image_id": "",
  "og_image_id": "",
  "inline_image_ids": [],
  "image_meta": {
    "alt_vi": "",
    "alt_en": "",
    "caption_vi": "",
    "caption_en": ""
  },
  "status": "draft"
}
```

Canonical CMS v2 schema for new content batches:

```json
{
  "slug": "slug-bai-viet-viet-thuong-khong-dau",
  "pillar_key": "work|stay|life|system",
  "status": "draft|published|archived",
  "access_level": "public|members_only",
  "tags": [],
  "locales": {
    "vi": {
      "title": "",
      "excerpt": "",
      "content": "",
      "meta_title": "",
      "meta_description": ""
    },
    "en": {
      "title": "",
      "excerpt": "",
      "content": "",
      "meta_title": "",
      "meta_description": ""
    }
  },
  "featured_image": "/images/articles/slug-bai-viet-cover.webp"
}
```

### ImageAssets

```json
{
  "image_id": "",
  "file_name": "",
  "source": "",
  "license": "",
  "photographer_or_owner": "",
  "approved_by": "",
  "approved_at": "",
  "used_routes": [],
  "usage_type": "hero|card|social|inline|bridge|gallery|profile",
  "desktop_crop_status": "approved|needs_review",
  "mobile_crop_status": "approved|needs_review",
  "alt_vi": "",
  "alt_en": "",
  "caption_vi": "",
  "caption_en": "",
  "notes": ""
}
```

### PeopleStories

```json
{
  "name_or_alias": "",
  "slug": "",
  "role": "",
  "stay_length": "",
  "story_vi": "",
  "story_en": "",
  "status": "draft"
}
```

### MemberResources

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "access_level": "guest|registered|reviewed|internal|admin",
  "category": "investor|operations|program|resource|guide",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft"
}
```

### InvestorResources

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "access_level": "registered|reviewed|internal|admin",
  "document_type": "overview|deck|appendix|financial",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft"
}
```

### HandbookSections

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "access_level": "guest|registered|reviewed|internal|admin",
  "section_type": "living|work|community|onboarding|operations",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft"
}
```

---

## 1. CMS Rule

Tất cả collection phải có:

- VI trước
- EN sau
- slug sạch
- no dummy data trên production
- mọi tài nguyên có gating phải có `access_level`

---

## 2. Publishing Rule

- `draft` chỉ dành cho nội bộ
- `published` mới được vào sitemap và internal linking chính
- không đẩy dữ liệu giả lên production để lấp UI
- protected resources không được đi vào public sitemap

---

## 3. Modeling Rule

- collection phải phản ánh 4 trục hệ thống
- tên field phải đủ rõ để team content và team dev đọc chung
- không dùng model cũ kiểu `proof`, `host`, `expert` làm trung tâm public IA nếu không còn phù hợp với định vị mới
- member resources, investor resources, handbook sections phải tách rõ khỏi public articles

---

## 4. Image Publishing Gate

Chuẩn khóa áp dụng: `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`.
Chuẩn SOP áp dụng: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`.

Không được publish khi thiếu một trong các điều kiện:

- thiếu `source` hoặc `license`
- thiếu `alt_vi` hoặc `alt_en`
- ảnh cần caption mà thiếu `caption_vi` hoặc `caption_en`
- `desktop_crop_status` chưa `approved`
- `mobile_crop_status` chưa `approved`
- ảnh bị dùng lại sai ngữ cảnh với `used_routes`
- ảnh batch mới không phải `WebP` hoặc `AVIF`
- tên file ảnh không bám slug bài viết

---

## 5. Cross Reference

- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
- `docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md`
- `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`
