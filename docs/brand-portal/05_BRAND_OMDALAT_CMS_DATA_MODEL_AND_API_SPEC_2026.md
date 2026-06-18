# 05 — BRAND OMDALAT CMS DATA MODEL AND API SPEC 2026

**Status:** LOCKED  
**Date:** 2026-06-18  

---

## 1. Database Schema

### brands

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | brnd_{slug} |
| name_vi | TEXT | Vietnamese brand name |
| name_en | TEXT | English brand name |
| slug | TEXT UNIQUE | URL slug (lily, tamfarm) |
| subdomain | TEXT UNIQUE | lily.omdalat.com |
| brand_type | TEXT | homestay, farm, cafe, product, etc. |
| place_id | TEXT FK | Reference to places |
| owner_id | TEXT FK | Reference to owners |
| can_host_stay | BOOLEAN | Can host guests |
| can_host_visit | BOOLEAN | Can host visitors |
| can_sell_product | BOOLEAN | Can sell products |
| can_host_work | BOOLEAN | Can host workspace |
| publication_status | TEXT | draft, private_preview, published |
| ap_place_ref | TEXT | Reference to ap.omdalat.com place |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update |

### places

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | plc_{slug} |
| name | TEXT | Place name |
| lat | REAL | Latitude |
| lng | REAL | Longitude |
| address_vi | TEXT | Vietnamese address |
| address_en | TEXT | English address |
| administrative_area | TEXT | Province/district |
| google_place_id | TEXT | Google Maps Place ID |
| created_at | DATETIME | |

### owners

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | own_{slug} |
| name | TEXT | Owner display name |
| contact | TEXT | Phone/Zalo/Email |
| consent_status | TEXT | pending, signed, revoked |
| consent_date | DATETIME | |
| created_at | DATETIME | |

### content_blocks

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | cb_{brand}_{type}_{locale} |
| brand_id | TEXT FK | |
| locale | TEXT | vi, en |
| block_type | TEXT | hero, story, what, why, space, location, business, products, experiences, reviews, highlights, contact |
| payload | TEXT | JSON content |
| status | TEXT | draft, review, published |
| created_at | DATETIME | |
| updated_at | DATETIME | |

### media_assets

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | media_{uuid} |
| brand_id | TEXT FK | |
| asset_type | TEXT | photo, logo, video, document |
| url | TEXT | R2 URL |
| alt_vi | TEXT | Vietnamese alt text |
| alt_en | TEXT | English alt text |
| rights_status | TEXT | pending, cleared, disputed |
| created_at | DATETIME | |

### approvals

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | appr_{uuid} |
| brand_id | TEXT FK | |
| stage | TEXT | owner_review, compliance, admin |
| approver | TEXT | Who approved |
| status | TEXT | approved, rejected, pending |
| notes | TEXT | |
| created_at | DATETIME | |

---

## 2. API Endpoints

### Brand Intake

```
POST /api/omdalat/brands/intake
Content-Type: application/json

{
  "name_vi": "string",
  "name_en": "string",
  "brand_type": "string",
  "google_maps_url": "string",
  "owner_name": "string",
  "owner_contact": "string",
  "description": "string",
  "photos": ["url1", "url2"],
  "business_types": ["stay", "visit", "product", "work"]
}

Response 201:
{
  "brand_id": "brnd_lily",
  "status": "draft",
  "preview_url": "https://brand.omdalat.com/preview/brnd_lily"
}
```

### Owner Verification

```
POST /api/omdalat/brands/{brand_id}/owner-verify
Content-Type: application/json

{
  "consent_signed": true,
  "identity_verified": true,
  "contact_confirmed": true
}

Response 200:
{
  "status": "verified",
  "next_stage": "content_draft"
}
```

### Publish Request

```
POST /api/omdalat/brands/{brand_id}/publish-request
Headers: Authorization: Bearer {admin_token}

Response 200:
{
  "status": "published",
  "live_url": "https://lily.omdalat.com",
  "evidence_packet_id": "ep_xxx"
}
```

### Get Brand

```
GET /api/omdalat/brands/{slug}

Response 200:
{
  "id": "brnd_lily",
  "name_vi": "Lily",
  "name_en": "Lily",
  "slug": "lily",
  "subdomain": "lily.omdalat.com",
  "status": "published",
  "content_blocks": [...],
  "place": {...},
  "owner": {...}
}
```

### List Brands

```
GET /api/omdalat/brands?status=published&limit=50&offset=0

Response 200:
{
  "brands": [...],
  "total": 50,
  "page": 1
}
```

### Update Content Block

```
PUT /api/omdalat/brands/{brand_id}/content/{block_id}
Headers: Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "payload": "{\"title\": \"...\"}",
  "status": "published"
}
```

---

## 3. R2 Asset Structure

```
omdalat-assets/
├── brands/
│   ├── {brand_id}/
│   │   ├── photos/
│   │   ├── logo/
│   │   └── documents/
│   └── shared/
│       ├── og-images/
│       └── icons/
```

---

## 4. D1 Migration History

| Migration | Description |
|-----------|-------------|
| 0001_init.sql | Initial schema |
| 0002_brand_factory.sql | Brand content blocks |
| 0003_brand_content.sql | Lily seed data |
| 0004_brand_portal.sql | Portal-specific tables (pending) |
