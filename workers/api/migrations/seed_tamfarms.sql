-- Seed data for Những Khu Vườn Tâm / Tam Farms (tamfarms.omdalat.com)
-- Per ADR-001: Tam Farms enters Brand Factory Pipeline (D1 + brand-renderer)
-- Per ADR-003: Tam Farms is a CHAIN MODEL (brand_type=chain_model), NOT a location.
--   Lily is Reference Location 01. Compliance fields apply to LOCATIONS, not to the chain model.
-- Per Model Standard v1.0: publication_status=draft, operational_status=not_open
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
        'Founder & owner of Những Khu Vườn Tâm / Tam Farms. Founder Lock APPROVED 2026-06-30.',
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
-- brand_type=chain_model: per ADR-003, Tam Farms is a CHAIN MODEL, not a location
-- can_host_stay=0: Tam Farms (chain model) does NOT own lodging — locations do (Lily does)
-- can_host_work=1: work-live-learn programs (model-level)
-- can_host_visit=0: visits are at location level, not model level
-- can_sell_product=0: no products yet
INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_tamfarms', 'plc_tamfarms', 'own_tamfarms',
        'Những Khu Vườn Tâm', 'Tam Farms', 'tamfarms',
        'tamfarms.omdalat.com', 'chain_model',
        0, 0, 0, 1, 'draft', NULL,
        '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert compliance checklist
-- Per ADR-003: Tam Farms is a chain model — compliance fields are NOT APPLICABLE at model level
-- Compliance (lodging, PCCC, business_registration) applies to LOCATIONS (e.g., Lily), not to the chain model
INSERT INTO compliance_checklists (id, brand_id, business_registration,
                                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_tamfarms', 'brnd_tamfarms', 'not_applicable', 'not_applicable',
        'not_applicable', 'not_applicable', 'not_applicable', '2026-07-01T00:00:00Z');

-- Insert content blocks (Vietnamese — source language)
-- Content imported from static Pages site (tamfarms.omdalat.com/)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_tamfarms_hero_vi', 'brnd_tamfarms', 'vi', 'hero',
   '{"title": "Những Khu Vườn Tâm", "subtitle": "Tam Farms", "slogan": "Sống thật. Làm thật. Lớn lên từ trải nghiệm.", "description": "Mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia. Lily là địa điểm tham chiếu đầu tiên — bắt đầu từ Đà Lạt và Lâm Đồng."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_about_vi', 'brnd_tamfarms', 'vi', 'about',
   '{"title": "Tam Farms là gì", "content": "Những Khu Vườn Tâm (Tam Farms) là mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia. Tam Farms sở hữu bộ phương pháp, tiêu chuẩn địa điểm, tiêu chuẩn chuyên gia, tiêu chuẩn chương trình, mô hình doanh thu và hệ thống nhân bản. Lily là địa điểm tham chiếu đầu tiên (Reference Location 01)."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_story_vi', 'brnd_tamfarms', 'vi', 'story',
   '{"title": "Câu chuyện", "content": "Sống thật. Làm thật. Lớn lên từ trải nghiệm. Mô hình chuỗi phát triển các địa điểm trải nghiệm thực tế cùng chuyên gia."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_contact_vi', 'brnd_tamfarms', 'vi', 'contact',
   '{"whatsapp": "+84849153426", "whatsapp_link": "https://wa.me/84849153426", "messenger": "https://m.me/thtltdl", "note": "Thông tin liên lạc chỉ hiển thị sau đăng ký. Chỉ xác nhận lịch sau khi đã trao đổi về nhu cầu, thời gian, mức độ phù hợp và tình trạng chỗ ở."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_location_vi', 'brnd_tamfarms', 'vi', 'location',
   '{"area": "Lily — Lạc Dương, Lâm Đồng (Reference Location 01)", "status": "reference_location", "note": "Lily là địa điểm tham chiếu đầu tiên của Tam Farms. Các địa điểm tương lai sẽ được công bố theo quy trình nhân rộng."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');

-- Insert content blocks (English — adaptation)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_tamfarms_hero_en', 'brnd_tamfarms', 'en', 'hero',
   '{"title": "Tam Farms", "subtitle": "Những Khu Vườn Tâm", "slogan": "Live fully. Work with purpose. Grow through experience.", "description": "A chain model developing locations for living, learning, working and real-world experience with experts. Lily is the first reference location — starting from Da Lat and Lam Dong."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_about_en', 'brnd_tamfarms', 'en', 'about',
   '{"title": "What is Tam Farms", "content": "Tam Farms (Những Khu Vườn Tâm) is a chain model developing locations for living, learning, working and real-world experience with experts. Tam Farms owns the methodology, location standards, expert standards, program standards, revenue model and replication system. Lily is the first reference location (Reference Location 01)."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_story_en', 'brnd_tamfarms', 'en', 'story',
   '{"title": "Story", "content": "Live fully. Work with purpose. Grow through experience. A chain model developing locations for real-world experience with experts."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_contact_en', 'brnd_tamfarms', 'en', 'contact',
   '{"whatsapp": "+84849153426", "whatsapp_link": "https://wa.me/84849153426", "messenger": "https://m.me/thtltdl", "note": "Contact info shown only after registration. Schedule confirmed only after discussing needs, timing, fit and accommodation availability."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z'),

  ('cb_tamfarms_location_en', 'brnd_tamfarms', 'en', 'location',
   '{"area": "Lily — Lac Duong, Lam Dong (Reference Location 01)", "status": "reference_location", "note": "Lily is the first reference location of Tam Farms. Future locations will be announced through the replication process."}',
   'draft', 'ready', '2026-07-01T00:00:00Z', '2026-07-01T00:00:00Z');
