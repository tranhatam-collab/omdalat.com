-- Seed data for Những Khu Vườn Tâm / Tam Farm (tamfarms.omdalat.com)
-- Per ADR-001: Tam Farm enters Brand Factory Pipeline (D1 + brand-renderer)
-- Per Local Brand Standard v1.1: publication_status=draft, operational_status=not_open
-- Compliance values = unknown (no evidence yet — Phase 0.7 will collect real evidence)
-- Owner consent = approved (Founder Lock APPROVED 2026-06-30)
--
-- AGENTS.md exception: This seed creates brand record with compliance=unknown.
--   This is ALLOWED because:
--   1. publication_status=draft (not published)
--   2. No compliance field is set to verified/approved (only unknown)
--   3. Owner consent is approved (founder is owner)
--   4. Future compliance updates MUST go through /api/omdalat/brands/:id/compliance POST

-- Insert owner record (founder is owner)
INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
VALUES ('own_tamfarms', 'Trần Hà Tâm', 'whatsapp:+84849153426', 'approved', '2026-06-30T00:00:00Z',
        'Founder & owner of Những Khu Vườn Tâm / Tam Farm. Founder Lock APPROVED 2026-06-30.',
        '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert place record (location TBD — due diligence pending per charter)
INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng,
                    address_vi, address_en, administrative_area, maps_status,
                    verification_status, created_at, updated_at)
VALUES ('plc_tamfarms', 'own_tamfarms',
        NULL, NULL, 0, 0,
        'Lạc Dương, Lâm Đồng (pending due diligence)', 'Lac Duong, Lam Dong (pending due diligence)',
        'Lạc Dương, Lâm Đồng', 'pending', 'pending',
        '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert brand record
-- publication_status=draft: not published yet (per ADR-001 Phase 0.5)
-- can_host_stay=1: Tam Farm does have lodging (1 week - 3 months) but NOT operational yet
-- can_host_work=1: work-live-learn programs
-- can_host_visit=1: visits possible
-- can_sell_product=0: no products yet
INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_tamfarms', 'plc_tamfarms', 'own_tamfarms',
        'Những Khu Vườn Tâm', 'Tam Farm', 'tamfarms',
        'tamfarms.omdalat.com', 'experiential_education',
        1, 1, 0, 1, 'draft', NULL,
        '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert compliance checklist (all unknown — no evidence yet)
-- Per v1.1: unknown is allowed at FOUNDATION, but blocks CERTIFIED OPERATIONAL
INSERT INTO compliance_checklists (id, brand_id, business_registration,
                                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_tamfarms', 'brnd_tamfarms', 'unknown', 'unknown',
        'unknown', 'unknown', 'unknown', '2026-07-01T00:00:00Z');

-- Insert content blocks (Vietnamese — source language)
-- Content imported from static Pages site (tamfarms.omdalat.com/)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_tamfarms_hero_vi', 'brnd_tamfarms', 'vi', 'hero',
   '{"title": "Những Khu Vườn Tâm", "subtitle": "Tam Farm", "slogan": "Sống thật. Làm thật. Lớn lên từ trải nghiệm.", "description": "Không gian trải nghiệm sống và làm việc tại Đà Lạt, dành cho 01–03 người mỗi tháng, lưu trú từ 1 tuần đến 3 tháng."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_about_vi', 'brnd_tamfarms', 'vi', 'about',
   '{"title": "Tam Farm là gì", "content": "Những Khu Vườn Tâm là mạng lưới các khu vườn có chỗ ở, bếp, không gian làm việc, khu học tập, cây trái, dược liệu, thực phẩm và các hoạt động thực tế để con người sống, làm, học, trải nghiệm, phát triển project và nhìn rõ hướng đi của mình."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_story_vi', 'brnd_tamfarms', 'vi', 'story',
   '{"title": "Câu chuyện", "content": "Sống thật. Làm thật. Lớn lên từ trải nghiệm. Không gian trải nghiệm sống và làm việc tại Đà Lạt."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_contact_vi', 'brnd_tamfarms', 'vi', 'contact',
   '{"whatsapp": "+84849153426", "whatsapp_link": "https://wa.me/84849153426", "messenger": "https://m.me/thtltdl", "note": "Chỉ xác nhận lịch sau khi đã trao đổi về nhu cầu, thời gian, mức độ phù hợp và tình trạng chỗ ở."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_location_vi', 'brnd_tamfarms', 'vi', 'location',
   '{"area": "Lạc Dương, Lâm Đồng", "status": "pending_due_diligence", "note": "Địa điểm chưa được công bố — đang trong quá trình due diligence."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert content blocks (English — adaptation)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_tamfarms_hero_en', 'brnd_tamfarms', 'en', 'hero',
   '{"title": "Tam Farm", "subtitle": "Những Khu Vườn Tâm", "slogan": "Live fully. Work with purpose. Grow through experience.", "description": "A living and working experience space in Da Lat, for 01–03 people per month, stays from 1 week to 3 months."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_about_en', 'brnd_tamfarms', 'en', 'about',
   '{"title": "What is Tam Farm", "content": "Tam Farm is a network of gardens with accommodation, kitchen, workspace, learning area, plants, herbs, food and hands-on activities for people to live, work, learn, experience, develop projects and see their path clearly."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_story_en', 'brnd_tamfarms', 'en', 'story',
   '{"title": "Story", "content": "Live fully. Work with purpose. Grow through experience. A living and working experience space in Da Lat."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_contact_en', 'brnd_tamfarms', 'en', 'contact',
   '{"whatsapp": "+84849153426", "whatsapp_link": "https://wa.me/84849153426", "messenger": "https://m.me/thtltdl", "note": "Schedule confirmed only after discussing needs, timing, fit and accommodation availability."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_location_en', 'brnd_tamfarms', 'en', 'location',
   '{"area": "Lac Duong, Lam Dong", "status": "pending_due_diligence", "note": "Location not yet announced — undergoing due diligence."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');
