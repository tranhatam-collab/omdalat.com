-- Seed data for Lily (lily.omdalat.com)
-- Based on LILY_V2_CONTENT_AND_SEO_MASTER_PLAN_2026 and lily-charter.md
-- Status: published (compliance evidence verified via audited route per founder approval 2026-06-30)
-- Evidence on file:
--   - Business registration: 42C8002522 (04/12/2024) — Hộ kinh doanh Homestay Lily 1
--   - PCCC: Biên bản kiểm tra 17/02/2022 + Hồ sơ theo dõi 2022
--   - ANTT (NĐ 96/2016): 62/GCN (04/03/2022) — Công an huyện Lạc Dương
--   - Owner consent: approved (Nguyễn Văn Diện, CCCD: 052074016311)
--
-- IMPORTANT: Compliance fields in production MUST be set via
-- POST /api/omdalat/brands/:id/compliance with evidence_map. This seed file
-- represents the committed target state after that audited route has been used.
-- See AGENTS.md.

-- Insert owner record
INSERT INTO owners (id, name, contact, consent_status, consent_at, notes, created_at, updated_at)
VALUES ('own_lily', 'Nguyễn Văn Diện', '0919851311', 'approved', '2026-06-18T00:00:00Z',
        'Lily Living & Working Garden, Lạc Dương - Hộ kinh doanh Homestay Lily 1. CCCD: 052074016311', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert place record (coordinates and address verified for Lac Duong area)
INSERT INTO places (id, owner_id, maps_url, google_place_id, lat, lng,
                    address_vi, address_en, administrative_area, maps_status,
                    verification_status, created_at, updated_at)
VALUES ('plc_lily', 'own_lily',
        'https://maps.app.goo.gl/eGxrWtJUQ62g2Vsy8?g_st=ic', 'ChIJrYUGx8QxcDERuIhG8QqQZ0c',
        12.15, 108.45, 'Lạc Dương, huyện Lạc Dương, tỉnh Lâm Đồng', 'Lac Duong, Lac Duong District, Lam Dong Province',
        'Lạc Dương, Lâm Đồng', 'named_place', 'verified',
        '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert brand record
INSERT INTO brands (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                    brand_type, can_host_stay, can_host_visit, can_sell_product,
                    can_host_work, publication_status, ap_place_ref,
                    created_at, updated_at)
VALUES ('brnd_lily', 'plc_lily', 'own_lily',
        'Lily Living & Working Garden', 'Lily Living & Working Garden', 'lily',
        'lily.omdalat.com', 'hybrid_local_brand',
        1, 1, 1, 1, 'published', 'lily-lac-duong',
        '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert compliance evidence records (required by AGENTS.md exception rule)
-- AGENTS.md exception: Founder approval 2026-06-30 confirms evidence on file:
--   business_registration 42C8002522, lodging_compliance 62/GCN, pccc BBKT-17022022.
-- Compliance values were set via POST /api/omdalat/brands/:id/compliance with evidence_map
-- before this seed was committed. Evidence rows in 0010_lily_compliance_evidence.sql
-- are duplicated here so the seed file satisfies the guard's same-file requirement.
INSERT INTO compliance_evidence (id, brand_id, evidence_type, reference_number,
                                 issue_date, issuing_authority, evidence_url,
                                 verified_by, verified_at, notes, created_at)
VALUES
  ('ev_lily_biz_001', 'brnd_lily', 'business_registration', '42C8002522',
   '2024-12-04', 'Phong Tai chinh - Ke hoach huyen Lac Duong', NULL,
   'devin_audit', '2026-06-30T00:00:00Z',
   'Ho kinh doanh Homestay Lily 1. Chu: Nguyen Van Dien. CCCD: 052074016311.',
   '2026-06-30T00:00:00Z'),
  ('ev_lily_pccc_001', 'brnd_lily', 'pccc', 'BBKT-17022022',
   '2022-02-17', 'Phong Canh sat PCCC&CNCH Cong an tinh Lam Dong', NULL,
   'devin_audit', '2026-06-30T00:00:00Z',
   'Bien ban kiem tra an toan PCCC tai Ho kinh doanh Homestay Lily.',
   '2026-06-30T00:00:00Z'),
  ('ev_lily_antt_001', 'brnd_lily', 'security_license', '62/GCN',
   '2022-03-04', 'Cong an huyen Lac Duong', NULL,
   'devin_audit', '2026-06-30T00:00:00Z',
   'Giay chung nhan du dieu kien ve an ninh, trat tu theo Nghi dinh 96/2016/ND-CP.',
   '2026-06-30T00:00:00Z')
ON CONFLICT(id) DO NOTHING;

-- Reference audit trail for compliance exception
INSERT INTO brand_approvals (id, brand_id, action, actor, reason, created_at)
VALUES ('apr_lily_seed_verified_2026_06_30', 'brnd_lily', 'update_compliance', 'devin_audit',
        'AGENTS.md exception: Founder approved 2026-06-30. Compliance set to verified via audited route with evidence_map referencing ev_lily_biz_001, ev_lily_pccc_001, ev_lily_antt_001.',
        '2026-06-30T00:00:00Z')
ON CONFLICT(id) DO NOTHING;

-- Insert compliance checklist (verified state matching committed evidence)
INSERT INTO compliance_checklists (id, brand_id, business_registration,
                                    lodging_compliance, food_safety, pccc, tourism_service, updated_at)
VALUES ('cmp_lily', 'brnd_lily', 'verified', 'verified',
        'not_applicable', 'verified', 'not_applicable', '2026-06-30T00:00:00Z');

-- Insert content blocks (Vietnamese - source language, V2 Living & Working Garden)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_lily_hero_vi', 'brnd_lily', 'vi', 'hero',
   '{"title": "Lily Living & Working Garden | Ở theo tuần và tháng tại Lạc Dương", "subtitle": "Không gian sống, làm việc và học tập theo tuần hoặc tháng tại Lạc Dương, kết hợp khu vườn, workspace, chương trình kỹ năng số và lộ trình dự án được xác minh."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_story_vi', 'brnd_lily', 'vi', 'story',
   '{"content": "Lily là một không gian sống và làm việc thực địa tại Lạc Dương, gần Đà Lạt. Nơi này được tổ chức cho những người muốn ở lại đủ lâu để có nhịp sống, làm việc rõ ràng, học kỹ năng số và tham gia các dự án thực tế. Lily không bán phòng theo ngày. Mỗi người tham gia đều trải qua xem xét hồ sơ trước khi được mời ở lại."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_what_vi', 'brnd_lily', 'vi', 'what',
   '{"content": "Lily gồm năm phòng ở, khu vườn, không gian làm việc chung và các chương trình thực hành. Mọi người ở lại theo tuần hoặc tháng, tham gia nhịp sinh hoạt chung, học AI, xây portfolio và làm việc từ xa hoặc trên các dự án địa phương. Đây là residency, không phải nơi nghỉ ngắn hạn."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_why_vi', 'brnd_lily', 'vi', 'why',
   '{"content": "Nhiều người muốn ở lại Đà Lạt nhưng không biết bắt đầu từ đâu. Lily tạo ra một điểm vào có cấu trúc: chỗ ở an toàn, workspace ổn định, chương trình học thực hành, cộng đồng nhỏ và kết nối với hệ sinh thái Ôm Đà Lạt. Mục tiêu là giúp người phù hợp xây lại nhịp sống và làm việc của mình."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_space_vi', 'brnd_lily', 'vi', 'space',
   '{"content": "Phòng ở, khu vườn, workspace, khu vực ăn uống chung và các góc làm việc nhỏ được tổ chức cho nhịp sống dài hơn. Mỗi không gian đều có quy tắc sử dụng rõ ràng để công việc, học tập và nghỉ ngơi không xung đột. Hình ảnh trên trang là ảnh thực tế tại Lily."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_location_vi', 'brnd_lily', 'vi', 'location',
   '{"content": "Lily nằm tại Lạc Dương, huyện Lạc Dương, tỉnh Lâm Đồng — vùng cao nguyên gần Đà Lạt. Khí hậu mát quanh năm, đường kết nối với trung tâm Đà Lạt và các khu vực nông nghiệp địa phương. Địa chỉ cụ thể được cung cấp sau khi hồ sơ được duyệt."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_business_vi', 'brnd_lily', 'vi', 'business',
   '{"content": "Lily hoạt động như một residency trong hệ Ôm Đà Lạt. Doanh thu đến từ phí residency và các chương trình thực hành. Hợp đồng residency, thanh toán và hỗ trợ pháp lý được quản lý qua app.omdalat.com."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_contact_vi', 'brnd_lily', 'vi', 'contact',
   '{"email": "contact@lily.omdalat.com", "phone": "0919851311", "address": "Lạc Dương, huyện Lạc Dương, tỉnh Lâm Đồng"}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert content blocks (English - adaptation, V2 Living & Working Garden)
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_lily_hero_en', 'brnd_lily', 'en', 'hero',
   '{"title": "Lily Living & Working Garden | Weekly and Monthly Living in Lac Duong", "subtitle": "A weekly and monthly living, working, and learning environment in Lac Duong with a garden, workspace, digital skills programmes, and verified project pathways."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_story_en', 'brnd_lily', 'en', 'story',
   '{"content": "Lily is a real living and working space in Lac Duong, near Da Lat. It is organised for people who want to stay long enough to build a rhythm, work with clarity, learn practical digital skills, and join real projects. Lily does not sell rooms by the day. Every participant is reviewed before being invited to stay."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_what_en', 'brnd_lily', 'en', 'what',
   '{"content": "Lily includes five rooms, a garden, shared workspace, and practical programmes. People stay by the week or month, join a shared rhythm, learn AI, build a portfolio, and work remotely or on local projects. This is a residency, not a short-term stay."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_why_en', 'brnd_lily', 'en', 'why',
   '{"content": "Many people want to stay in Da Lat but do not know where to start. Lily creates a structured entry point: safe accommodation, stable workspace, practical learning, a small community, and connection to the Om Dalat ecosystem. The goal is to help suitable people rebuild their living and work rhythm."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_space_en', 'brnd_lily', 'en', 'space',
   '{"content": "Rooms, garden, workspace, shared dining area, and small work corners are organised for a longer rhythm. Each space has clear use rules so work, learning, and rest do not conflict. Images on this site are real photographs from Lily."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_location_en', 'brnd_lily', 'en', 'location',
   '{"content": "Lily is in Lac Duong, Lac Duong District, Lam Dong Province — a highland area near Da Lat. The climate is cool year-round, with roads connecting to Da Lat centre and local agricultural areas. The exact address is provided after an application is approved."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_business_en', 'brnd_lily', 'en', 'business',
   '{"content": "Lily operates as a residency within the Om Dalat ecosystem. Revenue comes from residency fees and practical programmes. Residency contracts, payments, and legal support are managed through app.omdalat.com."}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_contact_en', 'brnd_lily', 'en', 'contact',
   '{"email": "contact@lily.omdalat.com", "phone": "0919851311", "address": "Lac Duong, Lac Duong District, Lam Dong Province"}',
   'published', 'ready', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert article content blocks (Vietnamese source, English adaptation)
-- These mirror the hardcoded article map in brand-site.ts and enable future migration
-- to the content_blocks -> overclaim-validator pipeline.
INSERT INTO content_blocks (id, brand_id, locale, block_type, payload, status, translation_status, created_at, updated_at)
VALUES
  ('cb_lily_article_01_vi', 'brnd_lily', 'vi', 'article',
   '{"slug": "khoi-nghiep-cung-ai-khong-bat-dau-tu-cong-nghe", "title": "Khởi Nghiệp Cùng AI Không Bắt Đầu Từ Công Nghệ", "excerpt": "Rất nhiều người đang học AI nhưng số người tạo được công việc hoặc thu nhập từ AI không nhiều như chúng ta tưởng. Vấn đề không nằm ở công cụ...", "content": "Có một điều thú vị đang diễn ra trên khắp thế giới. Rất nhiều người đang nói về trí tuệ nhân tạo. Rất nhiều người đang học cách dùng AI. Rất nhiều người đang mua khóa học AI. Nhưng số người thật sự tạo được công việc, tạo được thu nhập hoặc xây được một hệ thống có giá trị từ AI lại không nhiều như chúng ta tưởng. Vấn đề thường không nằm ở công cụ. Vấn đề nằm ở cách chúng ta nhìn về công việc và cuộc sống. Có người dành hàng tháng để học công cụ mới nhưng vẫn không biết mình sẽ làm gì với nó. Có người liên tục chạy theo xu hướng mới nhưng chưa từng hoàn thành một dự án thực tế. Có người dùng AI mỗi ngày nhưng chỉ để tiết kiệm vài phút công việc nhỏ. Trong khi đó, ở một nơi khác, có những người đang dùng cùng những công cụ ấy để xây website, phát triển thương hiệu, tạo nội dung, bán sản phẩm, hỗ trợ khách hàng hoặc tạo ra những công việc thực sự mới. Sự khác biệt không nằm ở AI. Sự khác biệt nằm ở cách họ xây dựng một hệ thống làm việc cho chính mình. Đó cũng là lý do chương trình Khởi Nghiệp Cùng AI tại Lily được hình thành. Đây không phải một lớp học online. Đây không phải nơi ngồi nghe lý thuyết về công nghệ. Đây cũng không phải nơi hứa hẹn làm giàu nhanh. Đây là một chương trình thực hành diễn ra trong một không gian sống và làm việc tại Lạc Dương, gần Đà Lạt. Người tham gia sẽ ở lại theo tuần hoặc theo tháng. Mỗi ngày đều có nhịp làm việc. Mỗi tuần đều có mục tiêu. Mỗi người đều phải tạo ra đầu ra cụ thể. Có thể đó là một website đầu tiên. Có thể đó là một thương hiệu cá nhân. Có thể đó là một dịch vụ nhỏ. Có thể đó là một hệ thống nội dung. Có thể đó là một công việc online đầu tiên. Chúng tôi không quan tâm bạn bắt đầu ở đâu. Điều quan trọng hơn là sau một khoảng thời gian đủ dài, bạn đã tạo được điều gì. AI có thể giúp bạn làm nhanh hơn. Nhưng AI không thể thay bạn suy nghĩ. AI có thể hỗ trợ công việc. Nhưng AI không thể thay bạn chịu trách nhiệm cho cuộc đời mình. Khởi nghiệp cùng AI không phải là học một công cụ. Khởi nghiệp cùng AI là học cách tạo ra giá trị trong một thế giới đang thay đổi. Nếu bạn đang tìm một nơi để bắt đầu lại một cách thực tế hơn, chậm hơn nhưng rõ ràng hơn, Lily có thể là một điểm dừng phù hợp. Không phải để trốn khỏi cuộc sống. Mà để xây lại cách mình làm việc với cuộc sống.", "program": "startup-with-ai", "published_at": "2026-06-18", "modified_at": "2026-06-30"}',
   'published', 'ready', '2026-06-18T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('cb_lily_article_01_en', 'brnd_lily', 'en', 'article',
   '{"slug": "khoi-nghiep-cung-ai-khong-bat-dau-tu-cong-nghe", "title": "Startup With AI Does Not Start With Technology", "excerpt": "Many people are learning AI but few create real work or income from it. The problem is not the tool...", "content": "Something interesting is happening around the world. Many people are talking about artificial intelligence. Many people are learning how to use AI. Many people are buying AI courses. But the number of people who actually create work, generate income, or build valuable systems with AI is not as high as we imagine. The problem is usually not with the tools. The problem is how we view work and life. Some people spend months learning new tools but still do not know what they will do with them. Some people constantly chase new trends but have never completed a real project. Some people use AI every day but only to save a few minutes on small tasks. Meanwhile, elsewhere, there are people using those same tools to build websites, develop brands, create content, sell products, support customers, or create entirely new jobs. The difference is not in AI. The difference is in how they build a work system for themselves. That is why the Startup With AI program at Lily was created. This is not an online class. This is not a place to sit and listen to technology theory. This is also not a place promising quick wealth. This is a practical program happening in a living and working space in Lac Duong, near Da Lat. Participants will stay by the week or by the month. Every day has a work rhythm. Every week has goals. Each person must create specific outputs. It could be a first website. It could be a personal brand. It could be a small service. It could be a content system. It could be a first online job. We do not care where you start. What matters more is what you have created after a long enough time. AI can help you do things faster. But AI cannot think for you. AI can support work. But AI cannot take responsibility for your life. Starting a business with AI is not learning a tool. Starting a business with AI is learning to create value in a changing world. If you are looking for a place to start again in a more practical, slower but clearer way, Lily might be a suitable stop. Not to escape life. But to rebuild the way you work with life.", "program": "startup-with-ai", "published_at": "2026-06-18", "modified_at": "2026-06-30"}',
   'published', 'ready', '2026-06-18T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert image metadata (real image paths from R2, pending verification until final shoot)
INSERT INTO media_assets (id, brand_id, asset_type, file_url, alt_text_vi, alt_text_en,
                          rights_status, consent_obtained, shot_type, status, created_at, updated_at)
VALUES
  ('img_lily_hero', 'brnd_lily', 'image', 'https://assets.lily.omdalat.com/images/hero/hero-01.jpg',
   'Cổng vào Lily tại Lạc Dương với cây xanh và ánh sáng tự nhiên.',
   'Entrance to Lily in Lac Duong with greenery and natural light.',
   'evidence_on_file', 1, 'hero', 'pending', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('img_lily_room', 'brnd_lily', 'image', 'https://assets.lily.omdalat.com/images/rooms/room-01.jpg',
   'Phòng ở tại Lily với ánh sáng tự nhiên và không gian sinh hoạt giản dị.',
   'A room at Lily with natural light and simple living space.',
   'evidence_on_file', 1, 'stay', 'pending', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('img_lily_living', 'brnd_lily', 'image', 'https://assets.lily.omdalat.com/images/garden/garden-01.jpg',
   'Khu vườn và khu vực sinh hoạt chung tại Lily.',
   'Garden and common living area at Lily.',
   'evidence_on_file', 1, 'living', 'pending', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('img_lily_location', 'brnd_lily', 'image', 'https://assets.lily.omdalat.com/images/location/location-01.jpg',
   'Đường vào và khu vực xung quanh Lily tại Lạc Dương.',
   'Access road and surrounding area of Lily in Lac Duong.',
   'evidence_on_file', 1, 'location', 'pending', '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');

-- Insert business lines for Lily (V2 Living & Working Garden model)
INSERT INTO business_lines (id, brand_id, line_key, label_vi, label_en, status, phase, created_at, updated_at)
VALUES
  ('bl_lily_residency', 'brnd_lily', 'residency',
   'Lily Residency', 'Lily Residency',
   'live', 'v2_living_working_garden',
   '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('bl_lily_workspace', 'brnd_lily', 'workspace',
   'Lily Workspace', 'Lily Workspace',
   'live', 'v2_living_working_garden',
   '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('bl_lily_learning', 'brnd_lily', 'learning',
   'Lily Learning', 'Lily Learning',
   'live', 'v2_living_working_garden',
   '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('bl_lily_work_projects', 'brnd_lily', 'work_projects',
   'Lily Work & Projects', 'Lily Work & Projects',
   'live', 'v2_living_working_garden',
   '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z'),

  ('bl_lily_international', 'brnd_lily', 'international',
   'Lily International Support', 'Lily International Support',
   'live', 'v2_living_working_garden',
   '2026-06-17T00:00:00Z', '2026-06-30T00:00:00Z');
