-- Seed data for Vườn Hồng 3 (vuonhong3.omdalat.com)
-- This is based on BRAND_SITE_VUONHONG3_BUILD_SPEC_2026.md
-- Note: {{TOKEN}} fields are placeholders that need to be filled by field team

-- Insert owner record
INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
VALUES ('own_vuonhong3', '{{OWNER_NAME}}', '{{OWNER_CONTACT}}', 'pending', NULL,
        'Homestay Vườn Hồng 3, Lạc Dương', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert place record
INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng,
                    address_vi, address_en, administrative_area, maps_status,
                    verification_status, created_at, updated_at)
VALUES ('plc_vuonhong3', 'own_vuonhong3',
        'https://maps.app.goo.gl/t6oJQBvEt8JTH4Lc9', '{{PLACE_ID}}',
        12.0985412, 108.5428796, '{{ADDRESS_VI}}', '{{ADDRESS_EN}}',
        'Lạc Dương, Lâm Đồng', 'named_place', 'pending',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert brand record
INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_vuonhong3', 'plc_vuonhong3', 'own_vuonhong3',
        'Homestay Vườn Hồng 3', 'Vuon Hong 3 Homestay', 'vuonhong3',
        'vuonhong3.omdalat.com', 'homestay',
        1, 1, 0, 0, 'private_preview', '{{AP_PLACE_SLUG}}',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert compliance checklist
INSERT INTO compliance_checklists (id, brand_id, business_registration,
                                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_vuonhong3', 'brnd_vuonhong3', 'unknown', 'unknown',
        'not_applicable', 'unknown', 'not_applicable', '2026-06-17T00:00:00Z');

-- Insert initial content blocks (Vietnamese - source language)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_vuonhong3_hero_vi', 'brnd_vuonhong3', 'vi', 'hero',
   '{"title": "Homestay Vườn Hồng 3", "subtitle": "Một homestay giữa vùng cao Lạc Dương, trong hệ Ôm Đà Lạt."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_vuonhong3_story_vi', 'brnd_vuonhong3', 'vi', 'story',
   '{"content": "Vườn Hồng 3 nằm ở vùng cao Lạc Dương, nơi khí hậu mát quanh năm và nhịp sống gắn với vườn. Đây là một nơi chốn thật mà Ôm Đà Lạt đang ghi lại một cách chậm rãi: con người, không gian và cách họ giữ đất, làm vườn và sống với thiên nhiên."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_vuonhong3_contact_vi', 'brnd_vuonhong3', 'vi', 'contact',
   '{"email": "contact@vuonhong3.omdalat.com", "phone": "{{OWNER_CONTACT}}", "address": "{{ADDRESS_VI}}"}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert initial content blocks (English - adaptation, marked as in_progress)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_vuonhong3_hero_en', 'brnd_vuonhong3', 'en', 'hero',
   '{"title": "Vuon Hong 3 Homestay", "subtitle": "A homestay in the Lac Duong highlands, within the Om Dalat network."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_vuonhong3_story_en', 'brnd_vuonhong3', 'en', 'story',
   '{"content": "Vuon Hong 3 is located in the Lac Duong highlands, where the climate is cool year-round and life is connected to the garden. This is a real place that Om Dalat is recording slowly: the people, the space, and how they care for the land, tend the garden, and live with nature."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_vuonhong3_contact_en', 'brnd_vuonhong3', 'en', 'contact',
   '{"email": "contact@vuonhong3.omdalat.com", "phone": "{{OWNER_CONTACT}}", "address": "{{ADDRESS_EN}}"}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');
