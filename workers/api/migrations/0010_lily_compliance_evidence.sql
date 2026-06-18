-- Migration: 0010_lily_compliance_evidence.sql
-- Description: Record Lily legal compliance evidence for audit trail
-- Created: 2026-06-18
-- Evidence provided by: Nguyễn Văn Diện (owner, CCCD: 052074016311)

-- Insert compliance evidence records
INSERT INTO compliance_evidence (id, brand_id, evidence_type, reference_number, 
                                 issue_date, issuing_authority, evidence_url,
                                 verified_by, verified_at, notes, created_at)
VALUES
  ('ev_lily_biz_001', 'brnd_lily', 'business_registration', '42C8002522',
   '2024-12-04', 'Phòng Tài chính - Kế hoạch huyện Lạc Dương', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Hộ kinh doanh Homestay Lily 1. Chủ: Nguyễn Văn Diện. Địa chỉ: Thôn Đa Tro, Xã Đạ Nhim. Vốn: 950.000.000đ. Ngành: Cơ sở lưu trú khác (5590)',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_pccc_001', 'brnd_lily', 'pccc', 'BBKT-17022022',
   '2022-02-17', 'Phòng Cảnh sát PCCC&CNCH Công an tỉnh Lâm Đồng', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Biên bản kiểm tra an toàn PCCC tại Hộ kinh doanh Homestay Lily. Địa chỉ: Thôn Đa Tro, xã Đạ Nhim. Kết luận: đảm bảo điều kiện PCCC.',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_pccc_002', 'brnd_lily', 'pccc', 'HS-TD-2022',
   '2022-01-01', 'Công an tỉnh Lâm Đồng', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Hồ sơ theo dõi công tác phòng cháy chữa cháy và cứu nạn cứu hộ năm 2022. Tên cơ sở: Hộ kinh doanh Homestay Lily.',
   '2026-06-18T00:00:00Z'),

  ('ev_lily_antt_001', 'brnd_lily', 'security_license', '62/GCN',
   '2022-03-04', 'Công an huyện Lạc Dương', NULL,
   'devin_audit', '2026-06-18T00:00:00Z',
   'Giấy chứng nhận đủ điều kiện về an ninh, trật tự theo Nghị định 96/2016/NĐ-CP. Cơ sở: Hộ kinh doanh Homestay Lily. Ngành: Dịch vụ lưu trú.',
   '2026-06-18T00:00:00Z');

-- Update compliance checklist to verified with evidence references
UPDATE compliance_checklists
SET 
  business_registration = 'verified',
  lodging_compliance = 'verified',
  pccc = 'verified',
  updated_at = '2026-06-18T00:00:00Z'
WHERE brand_id = 'brnd_lily';

-- Record approval audit event
INSERT INTO brand_approvals (id, brand_id, action, actor, reason, created_at)
VALUES ('apr_lily_pub_001', 'brnd_lily', 'approve_publish', 'devin_audit',
        'Compliance verified: business registration 42C8002522, PCCC cert 17/02/2022 + monitoring file 2022, ANTT cert 62/GCN per ND 96/2016. Owner consent: Nguyễn Văn Diện (CCCD: 052074016311).',
        '2026-06-18T00:00:00Z');

-- Update brand to published
UPDATE brands
SET 
  publication_status = 'published',
  name_vi = 'Lily Living & Working Garden',
  name_en = 'Lily Living & Working Garden',
  updated_at = '2026-06-18T00:00:00Z'
WHERE id = 'brnd_lily';
