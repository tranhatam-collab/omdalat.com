# APDALAT_TEAM1_FOUNDATION_BATCH_HANDOFF_2026-04-19
## HANDOFF

### 1. Scope
- Hoàn tất seed foundation stories lên mốc 10 (VI/EN).
- Chuyển source từ `content/*.json` sang CMS collections theo schema khóa.
- Chạy QA mobile + OG extraction cho batch mới trước vòng release tiếp theo.

### 2. Location
- Repo: `/Users/tranhatam/Documents/Devnewproject/omdalat.com/ap.omdalat.com`
- CMS collections: `/Users/tranhatam/Documents/Devnewproject/omdalat.com/ap.omdalat.com/content/cms`
- Visual QA screenshots: `/Users/tranhatam/Documents/Devnewproject/omdalat.com/ap.omdalat.com/reports/visual-qa/2026-04-19`

### 3. Implementation Summary
- Seed thêm 5 story mới, tổng stories = 10.
- Migrate dữ liệu hiện có sang CMS collections (`content/cms/*`) và chuẩn hóa object types: site settings, navigation, categories, tags, authors, stories, people, places, image essays, bridge blocks, faq items, image assets.
- Thêm pipeline scripts:
  - `scripts/migrate-content-to-cms.mjs`
  - `scripts/build-content-from-cms.mjs`
  - `scripts/sync-routes-sitemap.mjs`
  - `scripts/check-og-extraction.mjs`
- Regenerate toàn bộ route detail động + `sitemap.xml` theo batch dữ liệu mới.
- Inject static OG/Twitter/canonical tags vào source HTML cho route detail động để hỗ trợ OG extraction không phụ thuộc JS runtime.

### 4. Completed
- [x] Stories foundation đạt 10/10.
- [x] Route VI/EN cho 5 stories mới đã được tạo.
- [x] `sitemap.xml` đã sync đủ URL batch mới.
- [x] `content/cms/*` đã tạo và populated.
- [x] `content/vi.json` + `content/en.json` đã generate từ CMS collections.
- [x] QA route/sitemap/robots pass.
- [x] OG extraction check pass cho 10 routes mới (5 VI + 5 EN).
- [x] Mobile visual QA screenshots đã chụp cho 10 routes mới.

### 5. Not Included
- Chưa chạy visual QA full-site matrix cho toàn bộ homepage/hubs/static/support pages.
- Chưa chạy vòng deploy mới sau batch này (mới hoàn tất local QA + artifacts).
- Chưa mở rộng seed people/places/image essays beyond current foundation scope.

### 6. Known Issues
- Local custom-domain DNS verification (`ap.omdalat.com`) còn phụ thuộc môi trường máy chạy.
- Visual QA hiện tập trung batch stories mới; các page type khác cần vòng riêng.

### 7. Test Instructions
1. Build từ CMS:
   - `node scripts/migrate-content-to-cms.mjs`
   - `node scripts/build-content-from-cms.mjs`
   - `node scripts/sync-routes-sitemap.mjs`
2. Kiểm consistency:
   - `node scripts/check-content-routes.mjs`
3. Kiểm OG extraction cho batch:
   - `node scripts/check-og-extraction.mjs`
4. Kiểm visual artifacts:
   - `find reports/visual-qa/2026-04-19/mobile -type f | sort`
   - `wc -c reports/visual-qa/2026-04-19/mobile/*.png`

### 8. Next Steps
1. Deploy batch mới lên preview/prod alias.
2. Chạy visual QA thêm cho homepage/hubs/support/static pages.
3. Seed tiếp phase kế tiếp (people/place/image depth).
4. Chốt release gate R1 với Team 2.
