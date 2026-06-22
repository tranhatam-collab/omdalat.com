-- Migration: 0010_lily_compliance_evidence.sql
-- Description: Record Lily legal compliance evidence for audit trail
-- Created: 2026-06-18
-- Evidence provided by: Nguyen Van Dien (owner, CCCD: 052074016311)

-- Create compliance evidence table if not exists
CREATE TABLE IF NOT EXISTS compliance_evidence (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  evidence_type TEXT NOT NULL, -- business_registration, pccc, security_license, food_safety, tourism_license
  reference_number TEXT NOT NULL,
  issue_date TEXT,
  issuing_authority TEXT,
  evidence_url TEXT,
  verified_by TEXT NOT NULL,
  verified_at TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Create brand approvals table if not exists
CREATE TABLE IF NOT EXISTS brand_approvals (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  action TEXT NOT NULL, -- approve_publish, revoke_publish, update_compliance, etc.
  actor TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_compliance_evidence_brand ON compliance_evidence(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_approvals_brand ON brand_approvals(brand_id);

-- Insert compliance evidence records
INSERT INTO compliance_evidence (id, brand_id, evidence_type, reference_number, 
                                 issue_date, issuing_authority, evidence_url,
                                 verified_by, verified_at, notes, created_at)
VALUES
  ('ev_lily_biz_001', 'brnd_lily', 'business_registration', '42C8002522',
   '2024-12-04', 'Phong Tai chinh - Ke hoach huyen Lac Duong', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Ho kinh doanh Homestay Lily 1. Chu: Nguyen Van Dien. Dia chi: Thon Da Tro, Xa Da Nhim. Von: 950.000.000d. Nganh: Co so luu tru khac (5590)',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_pccc_001', 'brnd_lily', 'pccc', 'BBKT-17022022',
   '2022-02-17', 'Phong Canh sat PCCC&CNCH Cong an tinh Lam Dong', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Bien ban kiem tra an toan PCCC tai Ho kinh doanh Homestay Lily. Dia chi: Thon Da Tro, xa Da Nhim. Ket luan: dam bao dieu kien PCCC.',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_pccc_002', 'brnd_lily', 'pccc', 'HS-TD-2022',
   '2022-01-01', 'Cong an tinh Lam Dong', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Ho so theo doi cong tac phong chay chua chay va cuu nan cuu ho nam 2022. Ten co so: Ho kinh doanh Homestay Lily.',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_antt_001', 'brnd_lily', 'security_license', '62/GCN',
   '2022-03-04', 'Cong an huyen Lac Duong', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Giay chung nhan du dieu kien ve an ninh, trat tu theo Nghi dinh 96/2016/ND-CP. Co so: Ho kinh doanh Homestay Lily. Nganh: Dich vu luu tru.',
   '2026-06-18T00:00:00Z');

-- IMPORTANT: Compliance fields are NOT updated here.
-- Per AGENTS.md, compliance fields (business_registration, lodging_compliance, pccc)
-- are LEGAL ASSERTIONS and MUST be set through POST /api/omdalat/brands/:id/compliance
-- route with evidence_map referencing the evidence rows above.
-- Direct SQL UPDATE to compliance fields is PROHIBITED.
--
-- The evidence rows above are recorded for reference. To activate them:
-- 1. Call POST /api/omdalat/brands/brnd_lily/compliance with super admin auth
-- 2. Include evidence_map: { business_registration: ev_lily_biz_001, pccc: ev_lily_pccc_001, ... }
-- 3. Include reason (min 20 chars)
-- 4. Route writes audit trail to brand_approvals + audit_logs
--
-- The brand_approvals row below is a REFERENCE record only, not an active approval.
-- The publish gate checks actual compliance_checklists values, not this table.

-- Record reference approval audit event (NOT an active approval — for audit trail only)
INSERT INTO brand_approvals (id, brand_id, action, actor, reason, created_at)
VALUES ('apr_lily_evidence_ref_001', 'brnd_lily', 'evidence_recorded', 'devin_audit',
        'Evidence recorded for future compliance verification: business registration 42C8002522, PCCC cert 17/02/2022 + monitoring file 2022, ANTT cert 62/GCN per ND 96/2016. Owner consent: Nguyen Van Dien (CCCD: 052074016311). Compliance fields remain unknown until verified via audited route.',
        '2026-06-18T00:00:00Z');

-- NOTE: brand publication_status is NOT updated here.
-- It remains 'private_preview' as set in seed_lily.sql.
-- Publication requires compliance_reviewed=true which requires all compliance
-- fields to be in the OK set (verified/approved/not_applicable).
-- This can only happen through the audited compliance-update route.
