-- Seed data for Lily (lily.omdalat.com)
-- Based on LILY_CMS_JSON_AND_API_PAYLOADS_2026.md
-- Status: private_preview (not public until verified)

-- Insert owner record
INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
VALUES ('own_lily', '{{OWNER_NAME}}', '{{OWNER_CONTACT}}', 'pending', NULL,
        'Lily Homestay, Lạc Dương - Hộ kinh doanh Homestay Lily 1', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert place record (coordinates need to be resolved from Maps URL)
INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng,
                    address_vi, address_en, administrative_area, maps_status,
                    verification_status, created_at, updated_at)
VALUES ('plc_lily', 'own_lily',
        'https://maps.app.goo.gl/eGxrWtJUQ62g2Vsy8?g_st=ic', '{{PLACE_ID}}',
        12.15, 108.45, '{{ADDRESS_VI}}', '{{ADDRESS_EN}}',
        'Lạc Dương, Lâm Đồng', 'named_place', 'pending',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert brand record
INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_lily', 'plc_lily', 'own_lily',
        'Lily', 'Lily', 'lily',
        'lily.omdalat.com', 'stay',
        1, 1, 0, 0, 'private_preview', 'lily-lac-duong',
        '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert compliance checklist
INSERT INTO compliance_checklists (id, brand_id, business_registration,
                                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_lily', 'brnd_lily', 'unknown', 'unknown',
        'not_applicable', 'unknown', 'not_applicable', '2026-06-17T00:00:00Z');

-- Insert initial content blocks (Vietnamese - source language)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_lily_hero_vi', 'brnd_lily', 'vi', 'hero',
   '{"title": "Lily", "subtitle": "Một điểm ở lại nhỏ tại Lạc Dương, đang được xây dựng thành hồ sơ thương hiệu địa phương trong hệ Ôm Đà Lạt."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_story_vi', 'brnd_lily', 'vi', 'story',
   '{"content": "Lily là một không gian lưu trú nhỏ tại khu vực Lạc Dương, Lâm Đồng. Trước khi được đưa vào hệ thương hiệu địa phương của Ôm Đà Lạt, các thông tin về chủ sở hữu, điều kiện ở lại, hình ảnh, pháp lý và khả năng đón khách cần được xác minh đầy đủ. Trang này ở trạng thái preview cho đến khi mọi thông tin cần thiết được xác nhận."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_what_vi', 'brnd_lily', 'vi', 'what',
   '{"content": "Lily là một điểm ở lại nhỏ tại Lạc Dương, được đưa vào hệ Ôm Đà Lạt như một hồ sơ thương hiệu đang xác minh, hướng tới cách ở lại có trách nhiệm, gần đời sống địa phương và đủ rõ để người phù hợp hiểu trước khi ghé."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_why_vi', 'brnd_lily', 'vi', 'why',
   '{"content": "Một nơi ở lại không chỉ cần có phòng. Nó cần có nhịp sống, sự rõ ràng, điều kiện sinh hoạt, sự tôn trọng không gian chung và khả năng giúp người ghé hiểu mình có phù hợp hay không. Nếu Lily đạt đủ điều kiện xác minh, nơi này có thể trở thành một điểm ở lại trong mạng lưới Ôm Đà Lạt: không ồn ào, không du lịch hóa quá mức, mà gần hơn với đời sống thật tại Lạc Dương."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_space_vi', 'brnd_lily', 'vi', 'space',
   '{"content": "Lily không được giới thiệu như một nơi để đi qua cho nhanh. Trang này được tạo để người đọc hiểu rõ hơn về không gian, con người, điều kiện ở lại và nhịp sống thật trước khi gửi yêu cầu tìm hiểu."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_location_vi', 'brnd_lily', 'vi', 'location',
   '{"content": "Lily nằm tại khu vực Lạc Dương, Lâm Đồng, một vùng cao với khí hậu mát quanh năm và nhịp sống gắn với nông nghiệp và thiên nhiên."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_contact_vi', 'brnd_lily', 'vi', 'contact',
   '{"email": "contact@lily.omdalat.com", "phone": "{{OWNER_CONTACT}}", "address": "{{ADDRESS_VI}}"}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert initial content blocks (English - adaptation, marked as in_progress)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_lily_hero_en', 'brnd_lily', 'en', 'hero',
   '{"title": "Lily", "subtitle": "A small place to stay in Lac Duong, being built as a local brand profile within the Om Dalat system."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_story_en', 'brnd_lily', 'en', 'story',
   '{"content": "Lily is a small stay space in the Lac Duong area of Lam Dong. Before being included in the Om Dalat local brand system, its ownership, staying conditions, images, legal status, and hosting capacity must be fully verified. This page remains in preview until the required information is confirmed."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_what_en', 'brnd_lily', 'en', 'what',
   '{"content": "Lily is a small place to stay in Lac Duong, being prepared within the Om Dalat system as a verified local brand profile, oriented toward responsible staying, local life, and clearer expectations before visiting."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_why_en', 'brnd_lily', 'en', 'why',
   '{"content": "A place to stay needs more than rooms. It needs rhythm, clarity, living conditions, respect for shared space, and the ability to help visitors understand whether they fit. If Lily passes verification, it can become a staying point within the Om Dalat network: not noisy, not over-touristic, but closer to real life in Lac Duong."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_space_en', 'brnd_lily', 'en', 'space',
   '{"content": "Lily is not presented as a place to pass through quickly. This page is created so readers can understand the space, the people, the conditions for staying, and the real rhythm before sending an inquiry."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_location_en', 'brnd_lily', 'en', 'location',
   '{"content": "Lily is located in the Lac Duong area of Lam Dong, a highland region with cool year-round climate and a rhythm connected to agriculture and nature."}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('cb_lily_contact_en', 'brnd_lily', 'en', 'contact',
   '{"email": "contact@lily.omdalat.com", "phone": "{{OWNER_CONTACT}}", "address": "{{ADDRESS_EN}}"}',
   'draft', 'in_progress', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');

-- Insert image metadata (placeholder until real images are shot and verified)
INSERT INTO media_assets (id, brand_id, asset_type, file_url, alt_text_vi, alt_text_en,
                          rights_status, consent_obtained, shot_type, status, created_at, updated_at)
VALUES
  ('img_lily_hero', 'brnd_lily', 'image', 'https://omdalat-assets.r2.dev/lily/hero_placeholder.jpg',
   'Cổng hoặc mặt trước địa điểm Lily tại Lạc Dương với ánh sáng tự nhiên.',
   'Gate or front view of Lily location in Lac Duong with natural light.',
   'pending', 0, 'hero', 'pending', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('img_lily_room', 'brnd_lily', 'image', 'https://omdalat-assets.r2.dev/lily/room_placeholder.jpg',
   'Góc phòng nhỏ tại Lily với ánh sáng tự nhiên và không gian sinh hoạt giản dị.',
   'A small room corner at Lily with natural light and simple living space.',
   'pending', 0, 'stay', 'pending', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('img_lily_living', 'brnd_lily', 'image', 'https://omdalat-assets.r2.dev/lily/living_placeholder.jpg',
   'Khu vực sinh hoạt chung tại Lily với không gian mở.',
   'Common living area at Lily with open space.',
   'pending', 0, 'living', 'pending', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z'),

  ('img_lily_location', 'brnd_lily', 'image', 'https://omdalat-assets.r2.dev/lily/location_placeholder.jpg',
   'Đường vào và khu vực xung quanh Lily tại Lạc Dương.',
   'Access road and surrounding area of Lily in Lac Duong.',
   'pending', 0, 'location', 'pending', '2026-06-17T00:00:00Z', '2026-06-17T00:00:00Z');
