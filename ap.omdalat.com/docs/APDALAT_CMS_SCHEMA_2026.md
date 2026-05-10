# APDALAT_CMS_SCHEMA_2026
## Version: LOCKED
## Status: Production-ready
## Scope: CMS collections, fields, locale logic, workflow states, SEO fields, image metadata, bridge controls
## Required by: Founder / Dev / CMS / Content / SEO / QA / AI / Codex
## System lock reference: `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

---

# 0. TUYÊN BỐ KHÓA

CMS của Ấp Đà Lạt không được là một "blog CMS" chung chung.
Nó phải hỗ trợ đúng 6 lớp nội dung:

- Con người
- Nơi chốn
- Nhịp sống
- Làm việc
- Câu chuyện
- Hình ảnh

Ngoài ra phải khóa được:

- song ngữ VI -> EN
- metadata
- internal links
- image license hygiene
- bridge sang Ôm Đà Lạt
- publishing workflow

---

# 1. NGUYÊN TẮC CMS

1. VI là source of truth
2. EN là adapted locale
3. Không hardcode copy public nếu có thể đi qua content source
4. Không gom mọi thứ thành một post type
5. Mỗi object phải có SEO fields
6. Mỗi image phải có metadata và source log
7. Bridge sang omdalat.com phải là controlled block

---

# 2. COLLECTIONS BẮT BUỘC

1. SiteSettings
2. Navigation
3. Categories
4. Tags
5. Authors
6. Stories
7. People
8. Places
9. ImageEssays
10. BridgeBlocks
11. Redirects
12. SEOOverrides
13. FAQItems
14. Contacts / EditorialInbox

---

# 3. SITE SETTINGS

```json
{
  "site_name_vi": "Ấp Đà Lạt",
  "site_name_en": "Ap Dalat",
  "brand_phrase_vi": "Ôm Ấp Đà Lạt",
  "brand_phrase_en": "Om Ap Dalat",
  "site_url": "https://ap.omdalat.com",
  "default_locale": "vi",
  "supported_locales": ["vi", "en"],
  "omdalat_url": "https://omdalat.com",
  "default_meta_title_vi": "",
  "default_meta_title_en": "",
  "default_meta_description_vi": "",
  "default_meta_description_en": "",
  "default_og_image": "",
  "organization_schema_name": "Ap Dalat",
  "organization_schema_alt_name": "Ấp Đà Lạt",
  "status": "active"
}
```

---

# 4. NAVIGATION

```json
{
  "locale": "vi|en",
  "header_items": [
    {
      "label": "",
      "url": "",
      "target": "_self"
    }
  ],
  "footer_groups": [
    {
      "group_label": "",
      "items": [
        {
          "label": "",
          "url": "",
          "target": "_self"
        }
      ]
    }
  ],
  "status": "active"
}
```

---

# 5. CATEGORIES

Khóa category cố định, không để team tự thêm lung tung.

```json
{
  "key": "people|places|rhythms|work|stories|images",
  "title_vi": "",
  "title_en": "",
  "slug_vi": "",
  "slug_en": "",
  "description_vi": "",
  "description_en": "",
  "hero_image": "",
  "meta_title_vi": "",
  "meta_title_en": "",
  "meta_description_vi": "",
  "meta_description_en": "",
  "status": "active"
}
```

---

# 6. TAGS

Tags có kiểm soát, không để thành hệ category thứ hai.

```json
{
  "name_vi": "",
  "name_en": "",
  "slug": "",
  "tag_group": "place|rhythm|person|work|season|format",
  "description_vi": "",
  "description_en": "",
  "status": "active|deprecated"
}
```

Tag groups gợi ý:

- place
- rhythm
- work
- season
- format
- locality

---

# 7. AUTHORS

```json
{
  "name_vi": "",
  "name_en": "",
  "slug": "",
  "role_vi": "",
  "role_en": "",
  "bio_vi": "",
  "bio_en": "",
  "avatar_image": "",
  "status": "draft|published"
}
```

---

# 8. STORIES

Đây là collection trung tâm.

```json
{
  "title_vi": "",
  "title_en": "",
  "slug_vi": "",
  "slug_en": "",
  "category_key": "stories|rhythms|work",
  "story_type": "pillar|signature|short-note|essay|journal|feature",
  "excerpt_vi": "",
  "excerpt_en": "",
  "standfirst_vi": "",
  "standfirst_en": "",
  "content_vi": "",
  "content_en": "",
  "hero_image": "",
  "gallery_ids": [],
  "author_ids": [],
  "tag_ids": [],
  "related_story_ids": [],
  "related_people_ids": [],
  "related_place_ids": [],
  "related_image_essay_ids": [],
  "seo": {
    "focus_keyword_vi": "",
    "focus_keyword_en": "",
    "meta_title_vi": "",
    "meta_title_en": "",
    "meta_description_vi": "",
    "meta_description_en": "",
    "og_image": "",
    "canonical_url_vi": "",
    "canonical_url_en": "",
    "noindex_vi": false,
    "noindex_en": false
  },
  "bridge_to_omdalat": {
    "enabled": false,
    "bridge_block_id": "",
    "reason": "stay|work|join|learn|none"
  },
  "status": "Planned|In Progress|In Review|Ready for QA|Ready for Release|Released|Archived",
  "published_at": "",
  "updated_at": ""
}
```

---

# 9. PEOPLE

```json
{
  "name_vi": "",
  "name_en": "",
  "slug_vi": "",
  "slug_en": "",
  "role_vi": "",
  "role_en": "",
  "excerpt_vi": "",
  "excerpt_en": "",
  "standfirst_vi": "",
  "standfirst_en": "",
  "content_vi": "",
  "content_en": "",
  "hero_image": "",
  "gallery_ids": [],
  "tag_ids": [],
  "related_story_ids": [],
  "related_place_ids": [],
  "seo": {
    "meta_title_vi": "",
    "meta_title_en": "",
    "meta_description_vi": "",
    "meta_description_en": "",
    "og_image": ""
  },
  "bridge_to_omdalat": {
    "enabled": false,
    "bridge_block_id": ""
  },
  "status": "Planned|In Progress|In Review|Ready for QA|Ready for Release|Released|Archived",
  "published_at": "",
  "updated_at": ""
}
```

---

# 10. PLACES

```json
{
  "title_vi": "",
  "title_en": "",
  "slug_vi": "",
  "slug_en": "",
  "place_type": "home|work-corner|cafe|garden|studio|slope|edge-zone|neighborhood|other",
  "area_vi": "",
  "area_en": "",
  "excerpt_vi": "",
  "excerpt_en": "",
  "standfirst_vi": "",
  "standfirst_en": "",
  "content_vi": "",
  "content_en": "",
  "hero_image": "",
  "gallery_ids": [],
  "tag_ids": [],
  "related_story_ids": [],
  "related_people_ids": [],
  "seo": {
    "meta_title_vi": "",
    "meta_title_en": "",
    "meta_description_vi": "",
    "meta_description_en": "",
    "og_image": ""
  },
  "bridge_to_omdalat": {
    "enabled": false,
    "bridge_block_id": ""
  },
  "status": "Planned|In Progress|In Review|Ready for QA|Ready for Release|Released|Archived",
  "published_at": "",
  "updated_at": ""
}
```

---

# 11. IMAGE ESSAYS

```json
{
  "title_vi": "",
  "title_en": "",
  "slug_vi": "",
  "slug_en": "",
  "theme_vi": "",
  "theme_en": "",
  "intro_vi": "",
  "intro_en": "",
  "closing_line_vi": "",
  "closing_line_en": "",
  "hero_image": "",
  "image_asset_ids": [],
  "tag_ids": [],
  "related_story_ids": [],
  "related_place_ids": [],
  "seo": {
    "meta_title_vi": "",
    "meta_title_en": "",
    "meta_description_vi": "",
    "meta_description_en": "",
    "og_image": ""
  },
  "bridge_to_omdalat": {
    "enabled": false,
    "bridge_block_id": ""
  },
  "status": "Planned|In Progress|In Review|Ready for QA|Ready for Release|Released|Archived",
  "published_at": "",
  "updated_at": ""
}
```

---

# 12. IMAGE ASSET MODEL

Ảnh phải là first-class object, không chỉ là URL.

```json
{
  "asset_id": "",
  "title_vi": "",
  "title_en": "",
  "alt_vi": "",
  "alt_en": "",
  "caption_vi": "",
  "caption_en": "",
  "photographer": "",
  "source": "",
  "license_note": "",
  "credit_required": false,
  "credit_text": "",
  "usage_type": "hero|editorial|gallery|card",
  "file_name": "",
  "mime_type": "image/jpeg|image/webp|image/avif|image/png",
  "width": 0,
  "height": 0,
  "status": "draft|approved|published|archived"
}
```

---

# 13. BRIDGE BLOCKS

Bridge block không được viết tay ngẫu hứng trong từng bài.

```json
{
  "block_id": "",
  "name": "",
  "placement_type": "article_end|category_footer|homepage|about_page",
  "copy_vi": "",
  "copy_en": "",
  "cta_label_vi": "Tới Ôm Đà Lạt",
  "cta_label_en": "Go to Om Dalat",
  "cta_url": "https://omdalat.com",
  "status": "active"
}
```

---

# 14. REDIRECTS

```json
{
  "from_path": "",
  "to_path": "",
  "locale": "vi|en|all",
  "redirect_type": 301,
  "status": "active"
}
```

---

# 15. SEO OVERRIDES

```json
{
  "page_key": "",
  "locale": "vi|en",
  "meta_title": "",
  "meta_description": "",
  "canonical_url": "",
  "og_image": "",
  "noindex": false,
  "schema_type": "WebPage|CollectionPage|Article|FAQPage",
  "status": "active"
}
```

---

# 16. FAQ ITEMS

```json
{
  "question_vi": "",
  "question_en": "",
  "answer_vi": "",
  "answer_en": "",
  "locale_visibility": ["vi", "en"],
  "page_assignment": "faq|about|om-ap-da-lat",
  "status": "draft|published"
}
```

---

# 17. CONTACT / EDITORIAL INBOX

```json
{
  "name": "",
  "email": "",
  "message": "",
  "message_type": "story-suggestion|partnership|correction|general",
  "status": "new|reviewed|closed",
  "created_at": ""
}
```

---

# 18. WORKFLOW STATES

Dùng đúng 7 trạng thái:

- Planned
- In Progress
- In Review
- Ready for QA
- Ready for Release
- Released
- Archived

Không thêm "Draft-final", "Almost done", "Live maybe".

---

# 19. PUBLISH VALIDATION RULES

Một item chỉ được Released khi:

1. title đủ
2. slug đủ
3. category đúng
4. content VI hoàn tất
5. metadata có
6. hero image có
7. alt text có
8. related links có
9. bridge decision có
10. QA pass

Nếu thiếu, không được coi là complete.

---

# 20. LOCALE RULES

- VI bắt buộc có trước
- EN không được public nếu quá yếu
- canonical mỗi locale về chính nó
- hreflang mapping phải có nếu đã có cặp bài

---

# 21. ROUTE MAPPING CHO DEV

Stories:

- `/vi/cau-chuyen/[slug]`
- `/en/stories/[slug]`

People:

- `/vi/con-nguoi/[slug]`
- `/en/people/[slug]`

Places:

- `/vi/noi-chon/[slug]`
- `/en/places/[slug]`

Image Essays:

- `/vi/hinh-anh/[slug]`
- `/en/images/[slug]`

---

# 22. REQUIRED RELATIONSHIPS

Stories phải liên kết được với:

- 1 category
- 1-3 tags
- 1-3 related items

People phải liên kết được với:

- story
- place hoặc work context

Places phải liên kết được với:

- story
- image essay hoặc people

Image essays phải liên kết được với:

- story hoặc place

---

# 23. CMS PERMISSIONS GỢI Ý

Founder / Admin

- full control

Managing Editor

- create, edit, schedule, release

Writer

- create, edit own drafts

Translator

- edit EN fields only

SEO Editor

- edit metadata, links, slug proposals

QA

- read all, mark QA state

---

# 24. DEV NOTES

Dev phải bảo đảm:

- locale-aware routing
- render type-specific template
- fallback safe for missing EN
- image fields render đúng
- bridge blocks controlled
- no hardcoded nav if CMS-backed
- SEO fields pull đúng vào head tags

---

# 25. QA CHECKLIST CHO CMS

1. Có phân biệt object types rõ không
2. Có hỗ trợ VI/EN đủ không
3. Có SEO fields đủ không
4. Có image metadata log không
5. Có workflow states chuẩn không
6. Có bridge block logic không
7. Có related content logic không
8. Có permissions hợp lý không
9. Có route mapping rõ không
10. Có tránh flatten brand thành blog chung không

---

# 26. DEFINITION OF DONE

CMS schema được xem là khóa chuẩn khi:

- team Dev dựng được collection thật
- team Content không bị viết sai loại bài
- team SEO có đủ trường metadata
- team Design có đủ image data
- team QA có thể duyệt theo trạng thái
- hệ nội dung scale lên 100+ items mà không loạn

---

# 27. CÂU CHỐT

Nếu schema không hiểu sự khác nhau giữa một người, một nơi chốn, một bài kể chuyện và một bộ ảnh, thì brand sẽ bị phẳng đi rất nhanh.
