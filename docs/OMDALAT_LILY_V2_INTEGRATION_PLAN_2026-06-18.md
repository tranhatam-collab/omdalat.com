# OMDALAT LILY V2 INTEGRATION PLAN 2026-06-18

**Date:** 2026-06-18  
**Purpose:** Integrate Lily V2 Implementation Master Pack into Om Dalat system  
**Source:** docs/LILY_V2_IMPLEMENTATION_MASTER_PACK_2026/  
**Status:** PENDING IMPLEMENTATION

---

## 1. DOMAIN ARCHITECTURE LOCK

| Domain | Responsibility | Status |
|--------|---------------|--------|
| lily.omdalat.com | Public Lily brand, V2 routes, application entry | ✅ Phase 2 COMPLETED |
| app.omdalat.com/lily/* | Operating workspace, resident dashboard, admin | ❌ Phase 3 PENDING |
| brand.omdalat.com | Om Dalat Brand System Portal; Lily case study only | ✅ Phase 1 COMPLETED |
| api.omdalat.com/api/lily/* | Shared API, state transitions, audit events | ❌ Phase 3 PENDING |
| pay.iai.one | Payment authority (when enabled) | ⏸️ NOT ENABLED |

---

## 2. LILY V2 MASTER PACK INTEGRATION

### 2.1 Pack Structure

The LILY_V2_IMPLEMENTATION_MASTER_PACK_2026 contains 20 files:

1. `00_README_AND_MANIFEST.md` — Pack overview and reading order
2. `01_LILY_FOUNDER_LOCK_MASTER_SPEC_2026.md` — Founder truth and boundaries
3. `02_LILY_INFORMATION_ARCHITECTURE_AND_BILINGUAL_COPY_2026.md` — Public site, routes, bilingual copy
4. `03_LILY_WEEKLY_MONTHLY_RESIDENCY_SYSTEM_2026.md` — Residency products and workflows
5. `04_LILY_WORKSPACE_AND_REMOTE_WORK_OS_2026.md` — Workspace and proof-of-work
6. `05_LILY_LEARNING_AND_TRAINING_SYSTEM_2026.md` — Learning tracks
7. `06_LILY_JOB_BOARD_AND_PROJECT_SYSTEM_2026.md` — Job board and project delivery
8. `07_LILY_FOREIGN_RESIDENT_AND_GLOBAL_SUPPORT_STANDARD_2026.md` — Foreign resident support
9. `08_LILY_ROOMS_SPACES_AND_GARDEN_CMS_SCHEMA_2026.md` — Physical inventory and CMS
10. `09_LILY_APP_OMDALAT_WORKSPACE_SPEC_2026.md` — App workspace and roles
11. `10_LILY_BRAND_PORTAL_CASE_STUDY_SPEC_2026.md` — Brand Portal case study
12. `11_LILY_CONTENT_AND_SEO_MASTER_PLAN_2026.md` — Content and SEO
13. `12_LILY_IMAGE_REALITY_STANDARD_2026.md` — Image reality
14. `13_LILY_PRIVACY_TERMS_COMPLIANCE_STANDARD_2026.md` — Privacy, terms, compliance
15. `14_LILY_QA_RELEASE_GATES_AND_EVIDENCE_PACKET_2026.md` — QA, gates, evidence
16. `15_LILY_IMPLEMENTATION_BACKLOG_2026.csv` — Build backlog
17. `16_LILY_DB_SCHEMA_V1.sql` — Database schema
18. `17_LILY_API_CONTRACT_OPENAPI_V1.yaml` — API contract
19. `18_LILY_PUBLIC_CONTENT_JSON_SCHEMA_2026.json` — Public content schema
20. `19_LILY_ROLE_AND_PERMISSION_MATRIX_2026.csv` — Roles and permissions
21. `20_LILY_SOURCE_ASSUMPTION_AND_VERIFICATION_REGISTER_2026.md` — Source assumptions
22. `MANIFEST.json` — Pack manifest

### 2.2 Integration Priority

| Priority | File | Integration Point |
|----------|------|-------------------|
| P0 | 01 | Founder lock — must be reflected in all content |
| P0 | 02 | Public site routes — lily.omdalat.com |
| P0 | 09 | App workspace — app.omdalat.com/lily/* |
| P0 | 16 | DB schema — migrations |
| P0 | 17 | API contract — api.omdalat.com/api/lily/* |
| P1 | 03 | Residency system — app workspace |
| P1 | 08 | CMS schema — content_blocks extension |
| P1 | 19 | Roles — auth system |
| P2 | 04 | Workspace OS — app workspace |
| P2 | 05 | Learning system — app workspace |
| P2 | 06 | Job board — app workspace |
| P2 | 07 | Foreign resident support — app workspace |
| P2 | 10 | Brand Portal case study — brand.omdalat.com |
| P2 | 11 | Content/SEO — lily.omdalat.com |
| P2 | 12 | Image reality — R2 + CMS |
| P2 | 13 | Privacy/terms — legal pages |
| P2 | 14 | QA gates — release process |
| P3 | 15 | Backlog — project management |
| P3 | 18 | Content schema — validation |
| P3 | 20 | Source register — documentation |

---

## 3. OMDALAT SYSTEM UPDATES

### 3.1 Database Migrations

From `16_LILY_DB_SCHEMA_V1.sql`, need to add:

```sql
-- Lily-specific tables
CREATE TABLE lily_spaces (...);
CREATE TABLE lily_rooms (...);
CREATE TABLE lily_programs (...);
CREATE TABLE lily_jobs (...);
CREATE TABLE lily_residents (...);
CREATE TABLE lily_applications (...);
CREATE TABLE lily_tasks (...);
CREATE TABLE lily_training_modules (...);
CREATE TABLE lily_legal_cases (...);
CREATE TABLE lily_incidents (...);
```

Migration file: `workers/api/migrations/0005_lily_v2_schema.sql`

### 3.2 API Routes

From `17_LILY_API_CONTRACT_OPENAPI_V1.yaml`, need to add:

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

Implementation: `workers/api/src/routes/lily-*.ts`

### 3.3 App Workspace Routes

From `09_LILY_APP_OMDALAT_WORKSPACE_SPEC_2026.md`, need to add:

```
/lily
/lily/dashboard
/lily/applications
/lily/calendar
/lily/house-rules
/lily/support
/lily/stay
/lily/rooms
/lily/programmes
/lily/training
/lily/projects
/lily/jobs
/lily/tasks
/lily/portfolio
/lily/international
/lily/documents
/lily/admin
/lily/admin/applications
/lily/admin/rooms
/lily/admin/residents
/lily/admin/programmes
/lily/admin/tasks
/lily/admin/legal-cases
/lily/admin/incidents
/lily/admin/release
```

Implementation: `apps/app/app/lily/page.tsx` (Next.js app router)

### 3.4 Brand Portal Case Study

From `10_LILY_BRAND_PORTAL_CASE_STUDY_SPEC_2026.md`, need to add:

```
/brand.omdalat.com/case-studies/lily
```

Implementation: Update brand-renderer to support case study routes

---

## 4. CURRENT STATUS

### 4.1 Completed

- ✅ Phase 1: Brand Portal Cleanup (brand.omdalat.com correct)
- ✅ Phase 2: Lily V2 Public Site (lily.omdalat.com V2 routes)
  - Homepage updated to V2 positioning
  - 8 V2 routes created (/stay, /workspace, /programs, /jobs, /training, /international, /visa-support, /apply)
  - Content blocks updated (hero, story, space, what, why)
  - Navigation and language switcher on each page

### 4.2 Pending

- ❌ Phase 3: Lily App Workspace (app.omdalat.com/lily/*)
  - DB schema migrations
  - API routes
  - App workspace routes
  - Role-based access control
- ❌ Phase 4: Brand Portal Case Study
- ❌ Phase 5: Compliance & Operations
- ❌ Phase 6: Content & SEO

---

## 5. NEXT STEPS

### 5.1 Immediate (P0)

1. **DB Schema Migration**
   - Create `0005_lily_v2_schema.sql` from `16_LILY_DB_SCHEMA_V1.sql`
   - Run migration on remote D1

2. **API Routes**
   - Create `workers/api/src/routes/lily-apply.ts`
   - Create `workers/api/src/routes/lily-programs.ts`
   - Create `workers/api/src/routes/lily-jobs.ts`
   - Create `workers/api/src/routes/lily-rooms.ts`
   - Create `workers/api/src/routes/lily-admin.ts`
   - Update `workers/api/src/index.ts` to register routes

3. **App Workspace**
   - Create `apps/app/app/lily/page.tsx` (dashboard)
   - Create `apps/app/app/lily/applications/page.tsx`
   - Create `apps/app/app/lily/stay/page.tsx`
   - Create `apps/app/app/lily/rooms/page.tsx`
   - Create `apps/app/app/lily/programmes/page.tsx`
   - Create `apps/app/app/lily/training/page.tsx`
   - Create `apps/app/app/lily/projects/page.tsx`
   - Create `apps/app/app/lily/jobs/page.tsx`
   - Create `apps/app/app/lily/tasks/page.tsx`
   - Create `apps/app/app/lily/admin/page.tsx`

### 5.2 Short-term (P1)

4. **Residency System**
   - Implement application workflow
   - Implement resident workflow
   - Implement room assignment
   - Implement programme assignment

5. **CMS Extension**
   - Extend content_blocks for Lily-specific blocks
   - Add lily_spaces, lily_rooms CMS UI

6. **Roles & Permissions**
   - Implement Lily-specific roles from `19_LILY_ROLE_AND_PERMISSION_MATRIX_2026.csv`
   - Integrate with existing auth system

### 5.3 Medium-term (P2)

7. **Workspace OS**
   - Implement task system
   - Implement portfolio system
   - Implement learning modules

8. **Job Board**
   - Implement job posting
   - Implement job application
   - Implement task assignment

9. **Foreign Resident Support**
   - Implement visa/legal info workflow
   - Implement temporary residence tracking
   - Implement legal case management

10. **Brand Portal Case Study**
    - Create case study page
    - Link to lily.omdalat.com
    - Add status badge

11. **Content & SEO**
    - Create 10 SEO articles from `11_LILY_CONTENT_AND_SEO_MASTER_PLAN_2026.md`
    - Implement image alt/caption from `12_LILY_IMAGE_REALITY_STANDARD_2026.md`

12. **Privacy & Terms**
    - Create privacy policy from `13_LILY_PRIVACY_TERMS_COMPLIANCE_STANDARD_2026.md`
    - Create terms of service
    - Create data retention policy

### 5.4 Long-term (P3)

13. **QA Gates**
    - Implement release gates from `14_LILY_QA_RELEASE_GATES_AND_EVIDENCE_PACKET_2026.md`
    - Implement audit logging
    - Implement rollback mechanism

14. **Backlog Integration**
    - Import `15_LILY_IMPLEMENTATION_BACKLOG_2026.csv` into project management
    - Track progress

15. **Documentation**
    - Update source register from `20_LILY_SOURCE_ASSUMPTION_AND_VERIFICATION_REGISTER_2026.md`
    - Create technical documentation

---

## 6. DEFINITION OF DONE

Lily V2 Integration complete when:

- [ ] All 20 files from Master Pack are integrated
- [ ] DB schema migrated
- [ ] API routes implemented
- [ ] App workspace routes implemented
- [ ] Roles & permissions integrated
- [ ] Residency system working
- [ ] Job board working
- [ ] Foreign resident support working
- [ ] Brand Portal case study live
- [ ] Privacy/terms pages live
- [ ] QA gates implemented
- [ ] All content blocks updated to V2
- [ ] All images verified and uploaded
- [ ] Audit logging working
- [ ] Rollback mechanism working

---

## 7. RISKS & MITIGATION

| Risk | Mitigation |
|------|------------|
| API 1101 error (current) | Debug Cloudflare Workers runtime, fix binding issues |
| App workspace complexity | Start with basic dashboard, add features incrementally |
| Role-based access | Test thoroughly with different roles before launch |
| Foreign resident legal issues | Strict information-only approach, no guarantees |
| Content volume | Prioritize critical pages first, expand gradually |

---

**Integration Plan Created:** 2026-06-18  
**Next Action:** Start Phase 3 (DB Schema Migration)
