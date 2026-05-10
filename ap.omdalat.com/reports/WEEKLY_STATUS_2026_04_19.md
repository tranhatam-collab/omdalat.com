# WEEKLY_STATUS_2026_04_19
## Status: Active
## Scope: ap.omdalat.com

## WEEKLY STATUS
### 1. Summary
Tuần này dự án ở trạng thái Building.
Prototype public đã live trên Vercel với homepage, hubs, detail pages, support pages, VI/EN shell, và image pack cục bộ.
Copy public đã được đưa ra khỏi hardcoded prototype để đi qua `content/vi.json` và `content/en.json`.
Living language lock đã được áp vào nội dung locale, và lớp crawl public đã có `robots.txt` + `sitemap.xml`.
Content seed foundation đã mở rộng lên stories 15, people 3, places 3, image essays 2 với route VI/EN đầy đủ.
Source dữ liệu đã chuyển sang CMS collections (`content/cms/*`) và locale JSON được generate lại từ CMS.
Đã chạy QA mobile/desktop cho nhiều lớp route và pass vòng kiểm OG extraction full matrix (static + dynamic, VI/EN).
Đã khóa preset regression `full-site` gồm detail + hubs + support routes (72 routes x 2 viewport = 144 screenshots) và pass Team 1 release gate.
Đã thêm visual diff threshold policy theo route intent (landing-core / pillar-detail / support-pages / default), init baseline 144 ảnh, pass visual diff gate, và chạy calibration round 2.
Custom domain `ap.omdalat.com` đã resolve HTTP 200; preview deployment URL hiện trả 401 do deployment protection.

### 2. Completed
* [ ] Đưa bộ docs khóa chính vào `/docs`
* [ ] Tạo `content/vi.json` và `content/en.json` làm source cho copy public
* [ ] Hoàn thiện static shell cho homepage, category hubs, detail pages, About, Om Ap Dalat, FAQ, Contact, Topics, Search
* [ ] Chuẩn hóa image pack, image manifest, và asset naming cho prototype hiện tại
* [ ] Áp living language system vào locale copy public
* [ ] Thêm `robots.txt`, `sitemap.xml`, và policy note cho crawl public
* [ ] Deploy prototype public lên Vercel với preview alias hoạt động
* [ ] Mở rộng content seed foundation lên stories 15, people 3, places 3, image essays 2
* [ ] Chuyển source dữ liệu sang CMS collections và generate lại `content/vi.json`, `content/en.json`
* [ ] Tạo route files mới tương ứng cho cả VI/EN và cập nhật sitemap theo batch 10 stories
* [ ] Thêm script QA `scripts/check-content-routes.mjs` để kiểm route + sitemap + robots
* [ ] Thêm script `scripts/check-og-extraction.mjs` để kiểm OG metadata trên source HTML
* [ ] Thêm script `scripts/run-visual-qa-matrix.mjs` cho mobile/desktop matrix theo mode
* [ ] Thêm script `scripts/release-gate-team1.mjs` để khóa release checks thành một lệnh
* [ ] Chạy visual QA mobile + desktop snapshot cho batch stories mới
* [ ] Deploy production mới với Team 1 gate pass (`dpl_CUrEVk9Ra8P2UmbvyGA45Dc6Scrk`)
* [ ] Thêm script `scripts/sync-static-routes-meta.mjs` để đồng bộ canonical/OG/hreflang cho static pages
* [ ] Mở rộng `scripts/check-og-extraction.mjs` sang full matrix static + dynamic VI/EN
* [ ] Nâng `scripts/release-gate-team1.mjs` để include static sync và recursive visual artifact counting
* [ ] Chạy lại visual QA mobile foundation batch sau hardening metadata
* [ ] Redeploy production với gate mới pass (`dpl_Mgd5F3UnCYQfw8Z1uUv6eVEuQogL`)
* [ ] Seed thêm 5 stories mới từ CMS (tổng 15 stories) và regenerate routes/sitemap
* [ ] Chạy visual QA core matrix (mobile + desktop, 56 screenshots) cho hubs/static/foundation
* [ ] Redeploy production sau seed 15 stories + core matrix pass (`dpl_8UV9z3rHJimSZRxYwcWiJEKYfh5g`)
* [ ] Mở thêm mode `full-detail` + `print-plan` trong `scripts/run-visual-qa-matrix.mjs`
* [ ] Chạy visual QA full-detail matrix (mobile + desktop, 92 screenshots) cho toàn bộ detail routes
* [ ] Thêm preset `scripts/team1-regression-full-site.sh` để chạy visual+gate theo một lệnh
* [ ] Mở rộng `full-site` coverage sang support routes (`lien-he/chu-de/tim-kiem/faq` + EN)
* [ ] Chạy full-site regression matrix (mobile + desktop, 144 screenshots) và pass Team 1 release gate
* [ ] Redeploy production sau full-site support regression pass (`dpl_Ai7fSCEhy5hie4of7ErKMkmHrHBm`)
* [ ] Thêm script `scripts/check-visual-diff-threshold.mjs` để kiểm pixel-diff theo threshold
* [ ] Thêm rules file `scripts/visual-diff-threshold-rules.json` theo nhóm intent
* [ ] Nâng `scripts/release-gate-team1.mjs` để quản lý visual baseline + visual diff report + rules file
* [ ] Init baseline tại `reports/visual-baseline/full-site` và pass visual diff check (0 failures)
* [ ] Thêm script `scripts/calibrate-visual-diff-thresholds.mjs` để calibrate threshold theo lịch sử run
* [ ] Chạy calibration round 2 và áp ngưỡng mới (`1.0% / 1.2% / 1.8% / 2.5%`)

### 3. In Progress
* [ ] Production editorial batch 1 — đã đạt 15 stories, đang chuẩn bị vòng seed tiếp theo
* [ ] Handoff chia 2 team dev — Team 1 repo/build state, Team 2 public SEO infra

### 4. Blockers
* [ ] Chưa có production content batch đủ sâu để thay toàn bộ sample objects
* [ ] Preview deployment URL đang bị protection 401 nên external QA phải dùng custom domain

### 5. What Changed
* Public copy được chuyển từ hardcoded JS sang `content/vi.json` và `content/en.json`
* Living language lock trở thành chuẩn copy mới cho cả Om Dalat và Ap Dalat surfaces
* Public crawl policy được khóa theo canonical domain `https://ap.omdalat.com`
* Search pages được giữ ở public surface nhưng bị chặn crawl ở `robots.txt`
* Content source được migrate sang `content/cms/*`, locale JSON chuyển thành generated artifact
* Content object routes được mở rộng và sync lại vào `sitemap.xml` cho foundation stories 15/15
* QA có thêm script check tự động cho route consistency
* QA có thêm script check OG extraction full matrix (static + dynamic)
* Static routes được sync metadata bởi script riêng và nối vào release gate
* Visual QA core matrix đã được chạy với cả mobile và desktop
* Visual QA script có thêm preset `full-detail` và `print-plan` để team chạy regression detail nhanh hơn
* Visual QA full-detail matrix đã chạy đủ mobile + desktop cho toàn bộ detail routes hiện có
* Có thêm preset `team1-regression-full-site.sh` để chạy full-site regression theo một command
* Full-site visual matrix đã pass với baseline 144 artifacts (72 routes x mobile+desktop)
* Production đã cập nhật theo batch full-site mới và alias `ap.omdalat.com` đang trả 200
* Team 1 release gate có thêm visual diff threshold policy theo intent
* Đã siết ngưỡng sau calibration round 2 thành `1.0% / 1.2% / 1.8% / 2.5%`
* Full-site runbook có thêm flow `--refresh-baseline` sau các thay đổi visual chủ đích

### 6. QA Snapshot
* Homepage: pass
* Nav + routing: pass
* Locale switching: pass
* Article template: pass
* SEO metadata: pass
* Bridge to Om Dalat: pass
* Mobile: pass (foundation + core + full-detail + full-site matrix)
* Image loading: pass
* Team 1 release gate: pass

Top 3 QA issues this week:
* preview deployment URL bị protection 401 nên không dùng làm endpoint QA công khai
* regression vẫn đang chạy thủ công, chưa có lịch automation định kỳ
* cần thêm ít nhất 2 vòng full-site run mới để calibration round 3 có ý nghĩa thống kê tốt hơn

### 7. Risks
* [ ] Brand drift nếu sample content kéo dài quá lâu — High — Content
* [ ] QA nhầm endpoint do preview URL bị protection — Medium — Dev / QA
* [ ] CMS flattening nếu seed phase 2 không giữ object types riêng — Medium — Dev / Content

### 8. Next Week
1. Seed tiếp production content batch sau mốc 15 stories foundation
2. Theo dõi false-positive/false-negative với ngưỡng round 2 sau batch content mới
3. Thiết lập nhịp regression định kỳ từ preset full-site cho mỗi release candidate
4. Chuẩn hóa handoff Team 1 cho Team 2 theo deploy mới
5. Chuẩn bị R1 foundation release pack

### 9. Decisions Needed
* No founder decision needed this week

## AI Contribution This Week
* created or updated: static route metadata sync script, full-matrix OG extraction check, release gate hardening (auto visual threshold + intent-based visual diff threshold), `full-detail` + `full-site` visual QA presets, visual QA snapshots, production redeploy, calibration round 2 script
* assumptions made: custom domain là endpoint QA chính; preview URL có thể bị protection tùy project setting
* still needs human verification: production content quality round tiếp theo, behavior của round 2 thresholds sau 2 vòng release mới, preview-protection policy nếu cần mở QA ngoài team
