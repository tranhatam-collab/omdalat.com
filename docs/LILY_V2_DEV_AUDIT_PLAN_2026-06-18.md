# LILY V2 DEV AUDIT PLAN 2026-06-18

**Date:** 2026-06-18  
**Purpose:** Audit and implementation plan for Lily V2 transformation  
**Status:** PENDING AUDIT

---

## 1. PHÁN QUYẾT KIẾN TRÚC

### 1.1 Domain Layers

| Layer | Domains | Role |
|-------|---------|------|
| Hệ vận hành | omdalat.com, app.omdalat.com, api.omdalat.com | Thành viên, vận hành, inquiry, thanh toán, dashboard |
| Truyền thông địa phương | ap.omdalat.com | Con người, nơi chốn, câu chuyện, bản sắc địa phương |
| Cổng hệ thương hiệu | brand.omdalat.com | Giải thích chiến lược, tiếp nhận thương hiệu, điều phối Brand Factory |
| Microsite từng thương hiệu | {brand}.omdalat.com | Hồ sơ, sản phẩm, trải nghiệm, vị trí, liên hệ riêng |

### 1.2 Domain Assignment

- **lily.omdalat.com** → Lily Living & Working Garden (public brand site)
- **app.omdalat.com/lily** → Lily workspace/dashboard/programs/jobs
- **brand.omdalat.com** → Lily case study only (not Lily's own site)

---

## 2. LILY V2 TRANSFORMATION

### 2.1 From → To

| Aspect | Current (V1) | Target (V2) |
|--------|-------------|-------------|
| Positioning | Homestay bán phòng theo ngày | Living & Working Garden — ở theo tuần/tháng |
| Business model | Daily booking | Weekly/Monthly Stay, Builder Residency |
| Target audience | Tourists ngắn ngày | Remote workers, builders, learners, international residents |
| Content focus | Đặt phòng, giá, review | Programs, jobs, training, workspace, community |
| SEO keywords | homestay Đà Lạt, đặt phòng | ở dài hạn Đà Lạt, living & working, remote work community |

### 2.2 Core Value Proposition

**VI:**
Lily Living & Working Garden là không gian sân vườn có 5 phòng ngủ tại Lạc Dương, Đà Lạt, dành cho người muốn ở lại theo tuần hoặc tháng, làm việc online, học kỹ năng số và tham gia các dự án thật.

**EN:**
Lily Living & Working Garden is a garden-based living and working space with 5 bedrooms in Lac Duong near Dalat, for people who want to stay by the week or month, work online, learn digital skills, and join real projects.

---

## 3. AUDIT CHECKLIST

### 3.1 Current State Audit

#### brand.omdalat.com
- [ ] Check if Lily content exists on brand.omdalat.com
- [ ] Identify all Lily-specific content (H1, reviews, address, phone, CTA, footer, metadata, schema, OG)
- [ ] Verify if brand.omdalat.com redirects to Lily
- [ ] Check if brand.omdalat.com is used as Lily preview

#### lily.omdalat.com
- [ ] Verify lily.omdalat.com resolves correctly
- [ ] Check current positioning (homestay vs living & working garden)
- [ ] Audit existing content blocks (10 blocks)
- [ ] Verify images (20 photos) are correct
- [ ] Check SEO meta (title, description, OG, schema)
- [ ] Verify language switcher works
- [ ] Check inquiry form (currently blocked by 1101 error)

#### app.omdalat.com
- [ ] Check if /lily route exists
- [ ] Verify if Lily workspace is implemented
- [ ] Check if Lily dashboard exists
- [ ] Verify if Lily jobs/tasks are integrated

### 3.2 Compliance Audit

#### Legal/Visa Claims
- [ ] Check for any "visa guarantee" language
- [ ] Check for "work permit guarantee" language
- [ ] Verify all visa-related copy is information-only
- [ ] Check for "easy Vietnam visa" claims
- [ ] Verify disclaimer language exists

#### Business Model Claims
- [ ] Check for daily booking language
- [ ] Check for "book now" CTAs
- [ ] Verify pricing display is not fixed if not confirmed
- [ ] Check for false employment promises
- [ ] Verify no hidden employment claims

#### Data/Privacy
- [ ] Check if consent exists in forms
- [ ] Verify data retention policy exists
- [ ] Check if privacy notice is present
- [ ] Verify GDPR/privacy compliance for international residents

---

## 4. IMPLEMENTATION PHASES

### Phase 1: Brand Portal Cleanup (P0)

**Objective:** Restore brand.omdalat.com to its intended role as Brand System Portal.

**Tasks:**
1. Remove all Lily-specific content from brand.omdalat.com
2. Update metadata to Brand System Portal
3. Create Brand System Portal homepage (VI/EN)
4. Implement brand intake form
5. Add brand case study section (Lily as case study, not main content)
6. Remove any Lily redirects from brand.omdalat.com

**Deliverables:**
- Clean brand.omdalat.com homepage
- Brand intake form
- Lily case study page
- Updated metadata/schema

**Definition of Done:**
- brand.omdalat.com has no Lily H1, reviews, address, phone, CTA, footer
- Metadata reflects Brand System Portal
- Lily appears only in case study section
- No redirects to Lily

### Phase 2: Lily V2 Public Site (P0)

**Objective:** Transform lily.omdalat.com from homestay to Living & Working Garden.

**Tasks:**
1. Update homepage hero to V2 positioning
2. Remove daily booking language
3. Add weekly/monthly stay model
4. Create /stay page
5. Create /workspace page
6. Create /programs page
7. Create /jobs page
8. Create /training page
9. Create /international page
10. Create /visa-support page (legal-safe)
11. Create /apply page
12. Update SEO meta (title, description, OG)
13. Update schema
14. Create sitemap

**Deliverables:**
- Updated homepage (VI/EN)
- 8 new pages (VI/EN)
- Updated SEO meta
- Updated schema
- Sitemap

**Definition of Done:**
- No daily booking language
- Weekly/monthly model clearly explained
- Visa-safe copy on /visa-support
- Apply form with consent
- All pages VI/EN

### Phase 3: Lily App Workspace (P1)

**Objective:** Create Lily workspace on app.omdalat.com.

**Tasks:**
1. Create /lily route group
2. Create resident dashboard
3. Create admin dashboard
4. Create room management
5. Create program management
6. Create job/task board
7. Create visa/support notes
8. Create resident workflow
9. Create job workflow
10. Create visa/legal info workflow

**Deliverables:**
- app.omdalat.com/lily route group
- Resident dashboard
- Admin dashboard
- Room management
- Program management
- Job/task board
- Visa/support notes
- Workflows

**Definition of Done:**
- Residents can view their dashboard
- Admin can manage applications
- Room capacity tracked
- Jobs/tasks assigned
- Visa/support notes recorded

### Phase 4: Brand Portal Connection (P2)

**Objective:** Connect Lily to Brand Portal as case study.

**Tasks:**
1. Create Lily case study on brand.omdalat.com
2. Add status badge (Pilot/Private Preview/Published)
3. Link to lily.omdalat.com
4. Do not mirror Lily content

**Deliverables:**
- Lily case study page
- Status badge
- Link to lily.omdalat.com

**Definition of Done:**
- Lily appears as case study only
- No Lily content mirrored
- Status badge accurate
- Link works

### Phase 5: Compliance & Operations (P3)

**Objective:** Ensure legal and operational compliance.

**Tasks:**
1. Create lodging checklist
2. Create foreigner temporary residence workflow
3. Create task contracts
4. Create privacy/consent policy
5. Create incident log
6. Verify no false visa claims
7. Verify no false employment promises
8. Create payment lane through L1 only

**Deliverables:**
- Lodging checklist
- Temporary residence workflow
- Task contracts
- Privacy/consent policy
- Incident log
- Payment lane

**Definition of Done:**
- All legal checks pass
- No false claims
- Privacy policy exists
- Incident log works
- Payment through L1

### Phase 6: Content & SEO (P4)

**Objective:** Create SEO-optimized content.

**Tasks:**
1. Write 10 SEO articles for Lily V2
2. Review 5 EN pages
3. Add image alt/caption
4. Update schema
5. Create sitemap
6. Submit to Google Search Console

**Deliverables:**
- 10 SEO articles (VI/EN)
- 5 EN pages reviewed
- Image alt/caption
- Updated schema
- Sitemap
- GSC submission

**Definition of Done:**
- 10 articles published
- EN pages reviewed
- All images have alt/caption
- Schema correct
- Sitemap submitted

---

## 5. DATA MODEL UPDATES

### 5.1 New Tables

```sql
-- lily_spaces
CREATE TABLE lily_spaces (
  space_id TEXT PRIMARY KEY,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bedroom', 'garden', 'workspace', 'cafe', 'kitchen', 'outdoor_area')),
  capacity TEXT,
  description_vi TEXT,
  description_en TEXT,
  images TEXT, -- JSON array
  status TEXT NOT NULL CHECK (status IN ('draft', 'verified', 'published')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- lily_rooms
CREATE TABLE lily_rooms (
  room_id TEXT PRIMARY KEY,
  room_name TEXT NOT NULL,
  capacity TEXT,
  bed_type TEXT,
  bathroom TEXT,
  weekly_available BOOLEAN DEFAULT true,
  monthly_available BOOLEAN DEFAULT true,
  images TEXT, -- JSON array
  amenities TEXT, -- JSON array
  status TEXT NOT NULL CHECK (status IN ('available', 'occupied', 'maintenance', 'hidden')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- lily_programs
CREATE TABLE lily_programs (
  program_id TEXT PRIMARY KEY,
  title_vi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('weekly_stay', 'monthly_stay', 'builder_residency', 'training', 'contributor')),
  duration TEXT,
  description_vi TEXT,
  description_en TEXT,
  outputs TEXT, -- JSON array
  visibility TEXT NOT NULL CHECK (visibility IN ('public', 'member', 'admin')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'archived')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- lily_jobs
CREATE TABLE lily_jobs (
  job_id TEXT PRIMARY KEY,
  title_vi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('content', 'translation', 'seo', 'cms', 'research', 'ai_operator', 'support')),
  skills_required TEXT, -- JSON array
  pay_model TEXT NOT NULL CHECK (pay_model IN ('fixed', 'monthly', 'project', 'contribution_credit', 'unpaid_training')),
  description_vi TEXT,
  description_en TEXT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'assigned', 'closed')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- lily_residents
CREATE TABLE lily_residents (
  resident_id TEXT PRIMARY KEY,
  user_id TEXT,
  stay_type TEXT NOT NULL CHECK (stay_type IN ('weekly', 'monthly', 'builder_residency')),
  room_id TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  nationality TEXT,
  visa_status TEXT,
  temporary_residence_status TEXT CHECK (temporary_residence_status IN ('not_required', 'pending', 'submitted', 'confirmed')),
  work_program TEXT,
  status TEXT NOT NULL CHECK (status IN ('applicant', 'approved', 'resident', 'completed', 'declined')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (room_id) REFERENCES lily_rooms(room_id)
);
```

### 5.2 API Routes

```
POST /api/lily/apply
GET  /api/lily/programs
GET  /api/lily/jobs
POST /api/lily/jobs/:id/apply
GET  /api/lily/rooms
POST /api/lily/stay-request
POST /api/lily/visa-support-request
GET  /api/lily/admin/applications
POST /api/lily/admin/applications/:id/review
POST /api/lily/admin/residents/:id/assign-room
POST /api/lily/admin/residents/:id/assign-program
POST /api/lily/admin/tasks
```

---

## 6. SEO CLUSTERS

### 6.1 VI Keywords

- ở dài hạn Đà Lạt
- ở theo tháng Đà Lạt
- homestay Lạc Dương ở theo tháng
- sống và làm việc tại Đà Lạt
- làm việc online tại Đà Lạt
- cộng đồng làm việc từ xa Đà Lạt
- lưu trú dài hạn Lạc Dương
- homestay sân vườn Đà Lạt
- ở Đà Lạt cho người nước ngoài
- hỗ trợ thông tin visa Việt Nam cho người nước ngoài

### 6.2 EN Keywords

- long term stay Dalat
- monthly stay near Dalat
- remote work community Dalat
- living and working in Dalat
- garden homestay Lac Duong
- long term accommodation Lac Duong
- Vietnam remote work stay
- international resident support Vietnam
- work from Dalat
- digital work residency Vietnam

---

## 7. COMPLIANCE GATES

### 7.1 Before Public Launch

Required:
- [ ] Owner consent approved
- [ ] 5-room fact verified
- [ ] Location verified
- [ ] Photo rights verified
- [ ] Lodging compliance reviewed
- [ ] Foreign guest temporary residence process documented
- [ ] No false visa claim
- [ ] Admin approval

### 7.2 Before Accepting Foreigners

Required:
- [ ] Passport collection process defined
- [ ] Privacy notice
- [ ] Temporary residence declaration workflow
- [ ] House rules in EN
- [ ] Emergency contact
- [ ] Visa/legal info disclaimer
- [ ] Referral partner list if needed

### 7.3 Before Offering Work

Required:
- [ ] Define relationship: training/volunteer/freelancer/employee/contractor
- [ ] No hidden employment claim
- [ ] No illegal work promise
- [ ] Contracts or task terms if paid work
- [ ] Payment lane through L1 only

---

## 8. DEFINITION OF DONE

Lily V2 hoàn thành khi:

- [ ] lily.omdalat.com có public site VI/EN
- [ ] Không còn định vị homestay theo ngày
- [ ] Có weekly/monthly model
- [ ] Có 5 phòng được mô tả sau xác minh
- [ ] Có workspace/garden/café copy
- [ ] Có programs/jobs/training/international/visa-support pages
- [ ] Có apply form
- [ ] Có app.omdalat.com/lily
- [ ] Có room dashboard
- [ ] Có resident workflow
- [ ] Có job/task board
- [ ] Có visa-safe support workflow
- [ ] Có Brand Portal case study
- [ ] Có compliance gates
- [ ] Không có claim visa/work permit sai
- [ ] Không có payment trực tiếp trên Lily
- [ ] Tất cả publish qua Admin approval

---

## 9. NEXT STEPS

1. **Audit current state** — Execute checklist in Section 3
2. **Phase 1: Brand Portal Cleanup** — Restore brand.omdalat.com
3. **Phase 2: Lily V2 Public Site** — Transform lily.omdalat.com
4. **Phase 3: Lily App Workspace** — Create app.omdalat.com/lily
5. **Phase 4: Brand Portal Connection** — Connect Lily as case study
6. **Phase 5: Compliance & Operations** — Ensure legal compliance
7. **Phase 6: Content & SEO** — Create SEO-optimized content
8. **Final QA** — Verify all Definition of Done items
9. **Live Test** — Test in production
10. **Fix** — Address any issues found in live test

---

**Approved by:** [PENDING]  
**Audit Date:** 2026-06-18  
**Implementation Start:** [PENDING]
