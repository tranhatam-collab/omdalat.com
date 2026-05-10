# APDALAT_TEAM_SPLIT_EXECUTION_2026-04-19
## Status: Active
## Scope: Team split for current foundation sprint

## TEAM 1
### Scope
Repo governance, locale content source, frontend metadata hardening, live deployment verification, project memory files.

### Location
`/docs`
`/reports`
`/content`
`/assets`

### Implementation Summary
Team 1 giữ lớp repo thật: locked docs, live weekly status, decision log, locale JSON source, metadata output, và trạng thái build/deploy hiện hành.

### Completed
* locked docs được đưa vào `/docs`
* locale content source chạy qua `content/vi.json` và `content/en.json`
* README được cập nhật theo canonical domain + preview alias
* master project index được cập nhật về current truth
* weekly status và decision log live đã được tạo
* frontend metadata được chỉnh để canonical/hreflang bám custom domain
* content seed được mở rộng và có route VI/EN tương ứng
* script QA route consistency được thêm để chạy trước release

### Not Included
* CMS implementation thật
* production editorial batch đầy đủ
* mobile visual QA vòng cuối

### Known Issues
* custom domain vẫn cần verify thêm ở local DNS point
* preview alias vẫn còn dùng cho verification

### Test Instructions
1. Mở preview alias hoặc custom domain khi DNS đã sẵn.
2. Kiểm `view-source` hoặc DevTools head tags cho canonical, hreflang, og:url.
3. Chạy `node scripts/check-content-routes.mjs`.
4. Đọc `reports/WEEKLY_STATUS_2026_04_19.md` để nắm trạng thái hiện tại.

### Next Steps
1. Verify output trên `ap.omdalat.com`
2. Seed production batch đầu tiên
3. Chuẩn bị CMS mapping

## TEAM 2
### Scope
Public SEO infra cho crawl layer.

### Location
`/robots.txt`
`/sitemap.xml`
`/docs/APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026.md`

### Implementation Summary
Team 2 chốt crawl scope công khai cho hiện trạng static routes, giữ canonical base là custom domain và không cho preview alias lọt vào index.

### Completed
* `robots.txt`
* `sitemap.xml`
* robots + sitemap policy note

### Not Included
* server-side sitemap generation
* schema graph output
* search indexing logic

### Known Issues
* route mới sau này phải tự cập nhật lại `sitemap.xml`

### Test Instructions
1. Kiểm `https://ap.omdalat.com/robots.txt`
2. Kiểm `https://ap.omdalat.com/sitemap.xml`
3. Bảo đảm không có preview alias trong crawl files

### Next Steps
1. Giữ sitemap đồng bộ với route changes
2. Nối tiếp với canonical and schema QA
