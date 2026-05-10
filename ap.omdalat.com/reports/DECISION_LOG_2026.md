# DECISION_LOG_2026

| Date | ID | Category | Decision | Status |
|------|----|----------|----------|--------|
| 2026-04-19 | APDALAT_DEC_2026_04_19_01 | Brand | Ap Dalat is the editorial and place-identity layer, distinct from Om Dalat | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_02 | Language | Living language lock applies to public copy and metadata | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_03 | CMS | Public prototype copy moves into locale JSON source files | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_04 | SEO | Canonical public crawl base is `https://ap.omdalat.com` only | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_05 | Content | Seed batch is expanded with paired VI/EN routes before CMS migration | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_06 | CMS | `content/cms/*` becomes source-of-truth; locale JSON is generated | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_07 | SEO/QA | Dynamic detail routes must include static OG tags and be validated per batch | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_08 | Release | Team 1 release must pass script gate before production deploy | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_09 | SEO/QA | Static pages must ship canonical/OG/hreflang in source HTML and be checked in full-matrix OG extraction | Applied |
| 2026-04-19 | APDALAT_DEC_2026_04_19_10 | Content/QA | Foundation batch expands to 15 stories and requires core visual matrix (mobile+desktop) before next release | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_01 | QA Workflow | Visual QA adds `full-detail` and `print-plan`; release checks include 92-shot detail matrix baseline | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_02 | Release/SEO | Release gate auto-computes visual thresholds by mode and sitemap sync is locked to phase-2 sitemap index set | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_03 | QA Workflow | Team 1 adopts `team1-regression-full-site.sh` as one-command full-site regression (visual + gate) with 128-shot baseline | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_04 | QA Workflow | Full-site regression coverage expands to support routes; baseline moves to 144 shots (72 routes x mobile+desktop) | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_05 | QA Workflow | Release gate now enforces visual diff thresholds against baseline (default 3%, critical 1.5%) with report output | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_06 | QA Workflow | Visual diff thresholds move to route-intent rules file (landing-core/pillar-detail/support/default) and are enforced in release gate | Applied |
| 2026-04-21 | APDALAT_DEC_2026_04_21_07 | QA Workflow | Round 2 calibration applied on full-site history with safety guards; thresholds tightened to 1.0% / 1.2% / 1.8% / 2.5% | Applied |

## DECISION LOG
### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_01
* Category: Brand
* Decision: Ấp Đà Lạt được khóa là lớp editorial, bản sắc sống, con người, nơi chốn, nhịp sống và hình ảnh của Đà Lạt hôm nay; Ôm Đà Lạt giữ lớp ở lại, làm, học và tham gia.
* Why: Cần tránh trùng role, trùng brand, trùng SEO, và giữ rõ intent giữa hai site trong cùng hệ.
* Who made it: Founder
* Impact: ảnh hưởng homepage copy, IA, route system, SEO map, CMS collections, bridge logic, và image policy.
* Files affected:
  - docs/APDALAT_BRAND_AND_CONTENT_BUILD_MASTER_2026.md
  - docs/APDALAT_INFORMATION_ARCHITECTURE_2026.md
  - docs/APDALAT_SEO_MASTER_PLAN_2026.md
  - docs/APDALAT_TO_OMDALAT_LINKING_RULES_2026.md
  - docs/OMDALAT_TO_APDALAT_PRESENCE_AND_LINKING_RULES_2026.md
* Status: Applied
* Replaces / Related: none
* Notes: Đây là decision gốc để phân ranh giữa Ap Dalat và Om Dalat.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_02
* Category: Language
* Decision: Toàn bộ copy public và metadata của Ap Dalat phải bám living language system: ấm, rõ, sống, có hơi người, nhưng không dùng giọng quảng cáo, startup hype, hoặc travel brochure.
* Why: Ngôn ngữ là lớp giữ brand sống, và nếu lệch giọng thì toàn bộ UI, SEO, editorial surface sẽ bị phẳng đi rất nhanh.
* Who made it: Founder
* Impact: ảnh hưởng locale files, hero copy, button labels, metadata, support pages, và future CMS text fields.
* Files affected:
  - docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md
  - content/vi.json
  - content/en.json
  - README.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_01
* Notes: VI giữ vai trò source-of-truth, EN là adaptation.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_03
* Category: CMS
* Decision: Prototype public copy không còn nằm trong hardcoded JS blocks; nó phải đi qua `content/vi.json` và `content/en.json`, còn `assets/content.js` chỉ giữ static image assets.
* Why: Cần đưa prototype sang mặt bằng repo đúng master index, giảm hardcoded copy chaos, và mở đường cho CMS mapping sau này.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng rendering layer, content ownership, localization flow, và onboarding của Dev / Content / SEO.
* Files affected:
  - assets/app.js
  - assets/content.js
  - content/vi.json
  - content/en.json
  - docs/APDALAT_CMS_SCHEMA_2026.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_02
* Notes: Đây là decision giúp prototype thôi là “single file demo” và bắt đầu giống repo thật.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_04
* Category: SEO
* Decision: Canonical public crawl base của Ap Dalat là `https://ap.omdalat.com`; preview alias chỉ dùng cho verification, không được đưa vào sitemap hoặc canonical strategy.
* Why: Nếu preview alias lọt vào index hoặc canonical output, authority sẽ bị loãng và cross-domain signals sẽ lệch.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng `robots.txt`, `sitemap.xml`, canonical output, hreflang output, và release QA.
* Files affected:
  - robots.txt
  - sitemap.xml
  - docs/APDALAT_ROBOTS_AND_SITEMAP_POLICY_2026.md
  - assets/app.js
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_01
* Notes: DNS verification vẫn cần tiếp tục, nhưng canonical rule đã được khóa trước để tránh drift.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_05
* Category: Content
* Decision: Trước khi map CMS thật, content seed của prototype phải được mở rộng có chủ đích (stories 5, people 3, places 3, image essays 2) và mỗi object phải có route VI/EN tương ứng.
* Why: Tránh để prototype quá mỏng, giảm rủi ro link chết, và tạo mặt bằng gần thực tế hơn cho QA/SEO trước khi chuyển hẳn sang CMS.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng `content/vi.json`, `content/en.json`, route files VI/EN, `sitemap.xml`, và nhịp QA của Team 1.
* Files affected:
  - content/vi.json
  - content/en.json
  - nhip-song/mua-o-da-lat-lam-cham-moi-thu-ra-sao/index.html
  - lam-viec/mot-quan-yen-khong-de-tron-ma-de-lam-viec/index.html
  - con-nguoi/nguoi-mo-quan-nho-va-giu-nhip-song-khac/index.html
  - noi-chon/mot-studio-nho-tren-doc/index.html
  - hinh-anh/mua-tren-mai-nha-kinh/index.html
  - en/rhythms/mua-o-da-lat-lam-cham-moi-thu-ra-sao/index.html
  - en/work/mot-quan-yen-khong-de-tron-ma-de-lam-viec/index.html
  - en/people/nguoi-mo-quan-nho-va-giu-nhip-song-khac/index.html
  - en/places/mot-studio-nho-tren-doc/index.html
  - en/images/mua-tren-mai-nha-kinh/index.html
  - sitemap.xml
  - scripts/check-content-routes.mjs
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_03
* Notes: Đây là bước đệm để chuyển sang CMS mà không phá flow đang live.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_06
* Category: CMS
* Decision: `content/cms/*` trở thành source-of-truth của Team 1; `content/vi.json` và `content/en.json` chỉ là output được generate từ CMS collections.
* Why: Giảm rủi ro chỉnh tay lệch locale, bám schema khóa, và chuẩn hóa flow Dev/Content/SEO trước release.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng quy trình seed dữ liệu, QA consistency, handoff cho Dev/Content, và khả năng scale collections.
* Files affected:
  - content/cms/site-settings.json
  - content/cms/navigation.json
  - content/cms/categories.json
  - content/cms/stories.json
  - content/cms/people.json
  - content/cms/places.json
  - content/cms/image-essays.json
  - scripts/migrate-content-to-cms.mjs
  - scripts/build-content-from-cms.mjs
  - content/vi.json
  - content/en.json
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_03
* Notes: Đã migrate và build thành công, hiện đạt stories 15/15.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_07
* Category: SEO / QA
* Decision: Route detail động (story/person/place/image essay) phải có static OG metadata trong HTML source và phải qua vòng OG extraction check theo batch trước release.
* Why: Bot OG không chờ JS hydrate; nếu meta chỉ set runtime thì social share và external extract sẽ không ổn định.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng template route files, sitemap sync, release QA gate, và chất lượng preview social.
* Files affected:
  - scripts/sync-routes-sitemap.mjs
  - scripts/check-og-extraction.mjs
  - cau-chuyen/*/index.html
  - nhip-song/*/index.html
  - lam-viec/*/index.html
  - con-nguoi/*/index.html
  - noi-chon/*/index.html
  - hinh-anh/*/index.html
  - en/stories/*/index.html
  - en/rhythms/*/index.html
  - en/work/*/index.html
  - en/people/*/index.html
  - en/places/*/index.html
  - en/images/*/index.html
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_04
* Notes: Batch foundation stories mới đã pass OG check + mobile visual snapshots.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_08
* Category: Release
* Decision: Trước mỗi production deploy của Team 1, phải chạy gate script hợp nhất: content build, route sync, route/sitemap/robots check, OG extraction check, và visual artifact threshold check.
* Why: Giảm sai sót thao tác tay giữa các vòng release, giữ handoff rõ và lặp lại được cho Dev/QA.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng quy trình release, QA timing, và độ tin cậy của batch deploy.
* Files affected:
  - scripts/release-gate-team1.mjs
  - scripts/run-visual-qa-matrix.mjs
  - README.md
  - reports/WEEKLY_STATUS_2026_04_19.md
  - docs/APDALAT_LIVE_DEPLOY_HANDOFF_2026-04-19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_07
* Notes: Lần deploy `dpl_CUrEVk9Ra8P2UmbvyGA45Dc6Scrk` đã đi qua gate này.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_09
* Category: SEO / QA
* Decision: Các static routes (home, hubs, about/om, support pages) phải có canonical + OG + hreflang ngay trong source HTML và được kiểm cùng dynamic routes trong OG extraction matrix.
* Why: Tránh blind spot khi chỉ kiểm detail pages; static pages vẫn là landing points quan trọng cho crawl/share nên phải có metadata đồng bộ.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng static route head generation, release gate flow, và chất lượng metadata toàn site.
* Files affected:
  - scripts/sync-static-routes-meta.mjs
  - scripts/check-og-extraction.mjs
  - scripts/release-gate-team1.mjs
  - index.html
  - en/index.html
  - con-nguoi/index.html
  - noi-chon/index.html
  - nhip-song/index.html
  - lam-viec/index.html
  - cau-chuyen/index.html
  - hinh-anh/index.html
  - ve-ap-da-lat/index.html
  - om-ap-da-lat/index.html
  - lien-he/index.html
  - chu-de/index.html
  - tim-kiem/index.html
  - faq/index.html
  - en/people/index.html
  - en/places/index.html
  - en/rhythms/index.html
  - en/work/index.html
  - en/stories/index.html
  - en/images/index.html
  - en/about/index.html
  - en/om-ap-dalat/index.html
  - en/contact/index.html
  - en/topics/index.html
  - en/search/index.html
  - en/faq/index.html
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_07, APDALAT_DEC_2026_04_19_08
* Notes: Đã verify pass qua `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19 --expected-visual-min=10` trước deploy `dpl_Mgd5F3UnCYQfw8Z1uUv6eVEuQogL`.

### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_10
* Category: Content / QA
* Decision: Foundation editorial seed của Team 1 tăng từ 10 lên 15 stories và trước vòng release tiếp theo phải có core visual matrix mobile+desktop.
* Why: Đảm bảo độ dày nội dung trước launch vòng mới và giảm rủi ro UI drift trên hubs/static pages qua kiểm tra ảnh đa viewport.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng content seed scope, route generation, sitemap breadth, visual QA workload và release confidence.
* Files affected:
  - content/cms/stories.json
  - content/vi.json
  - content/en.json
  - sitemap.xml
  - scripts/run-visual-qa-matrix.mjs
  - reports/visual-qa/2026-04-19/core/*
  - reports/WEEKLY_STATUS_2026_04_19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_05, APDALAT_DEC_2026_04_19_08
* Notes: Đã pass `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19/core --expected-visual-min=56` trước deploy `dpl_8UV9z3rHJimSZRxYwcWiJEKYfh5g`.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_01
* Category: QA Workflow
* Decision: Bổ sung `--mode=full-detail` và `--print-plan` cho script visual QA, đồng thời lấy mốc 92 screenshots (46 routes x mobile+desktop) làm baseline kiểm thử detail batch hiện tại.
* Why: Đóng khoảng trống QA ngoài core bundle, giúp team chạy regression detail routes nhanh và có số lượng kiểm thử rõ ràng theo batch.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng quy trình QA trước release, README runbook, weekly reporting và baseline artifact count.
* Files affected:
  - scripts/run-visual-qa-matrix.mjs
  - README.md
  - reports/WEEKLY_STATUS_2026_04_19.md
  - reports/visual-qa/2026-04-21/full-detail/*
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_08, APDALAT_DEC_2026_04_19_10
* Notes: Đã pass `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-21/full-detail --visual-mode=full-detail --visual-include-desktop`.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_02
* Category: Release / SEO
* Decision: `release-gate-team1` tự tính expected visual count theo `visual-mode` + `visual-include-desktop`; `sync-routes-sitemap` được khóa lại theo phase-2 sitemap index (`sitemap.xml` + 5 sitemap con) để không lệch checker.
* Why: Giảm thao tác tay khi đổi batch QA và tránh regression khi sitemap index bị ghi đè sai định dạng.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng release reliability, QA ergonomics, và tính nhất quán SEO crawl set.
* Files affected:
  - scripts/release-gate-team1.mjs
  - scripts/visual-qa-routes.mjs
  - scripts/run-visual-qa-matrix.mjs
  - scripts/sync-routes-sitemap.mjs
  - README.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_19_08, APDALAT_DEC_2026_04_21_01
* Notes: Đã verify pass với `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-21/full-detail --visual-mode=full-detail --visual-include-desktop`.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_03
* Category: QA Workflow
* Decision: Team 1 dùng `scripts/team1-regression-full-site.sh` làm preset regression chuẩn để chạy visual QA full-site và release gate trong cùng một command.
* Why: Giảm thao tác nhiều lệnh, tránh sót bước trước release, và khóa baseline rõ cho regression diện rộng.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng runbook QA, tốc độ verify trước release, và tính lặp lại của handoff Team 1.
* Files affected:
  - scripts/team1-regression-full-site.sh
  - README.md
  - reports/WEEKLY_STATUS_2026_04_19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_21_01, APDALAT_DEC_2026_04_21_02; replaced by APDALAT_DEC_2026_04_21_04
* Notes: Đã chạy pass với `bash scripts/team1-regression-full-site.sh` và baseline ban đầu 128 artifacts (64 routes x mobile+desktop).

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_04
* Category: QA Workflow
* Decision: Mở rộng `full-site` visual regression để bao phủ cả support routes (`lien-he/chu-de/tim-kiem/faq` + EN), và nâng baseline artifacts lên 144.
* Why: Đảm bảo regression không bỏ sót các route support quan trọng trước release.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng visual QA coverage, release gate expectation, và weekly QA snapshot.
* Files affected:
  - scripts/visual-qa-routes.mjs
  - scripts/team1-regression-full-site.sh
  - reports/WEEKLY_STATUS_2026_04_19.md
  - reports/visual-qa/2026-04-21/full-site/*
* Status: Applied
* Replaces / Related: replaces APDALAT_DEC_2026_04_21_03; related to APDALAT_DEC_2026_04_21_01, APDALAT_DEC_2026_04_21_02
* Notes: Đã verify pass bằng `bash scripts/team1-regression-full-site.sh` với kết quả 144 artifacts (72 routes x mobile+desktop), sau đó deploy production `dpl_Ai7fSCEhy5hie4of7ErKMkmHrHBm`.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_05
* Category: QA Workflow
* Decision: Team 1 release gate phải chạy thêm visual diff threshold check theo baseline và xuất report JSON cho mỗi batch full-site.
* Why: Chặn visual regression theo pixel-level thay vì chỉ kiểm số lượng artifacts.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng release policy, full-site preset flow, baseline hygiene, và độ tin cậy QA trước deploy.
* Files affected:
  - scripts/check-visual-diff-threshold.mjs
  - scripts/release-gate-team1.mjs
  - scripts/team1-regression-full-site.sh
  - README.md
  - reports/visual-baseline/full-site/*
  - reports/visual-qa/2026-04-21/full-site/visual-diff-report.json
  - reports/WEEKLY_STATUS_2026_04_19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_21_04
* Notes: Đã init baseline 144 screenshots và verify pass bằng `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-21/full-site --visual-mode=full-site --visual-include-desktop --visual-baseline-dir=reports/visual-baseline/full-site --visual-diff-default-max=0.03 --visual-diff-critical-max=0.015`.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_06
* Category: QA Workflow
* Decision: Chuyển visual diff threshold từ config cứng trong code sang rules file theo route intent (`landing-core=1.2%`, `pillar-detail=1.5%`, `support-pages=2.0%`, `default=3.0%`).
* Why: Cho phép tinh chỉnh policy nhanh theo nhóm page mà không phải sửa logic script mỗi lần.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng release gate args, full-site regression preset, QA runbook và vòng calibrate threshold.
* Files affected:
  - scripts/visual-diff-threshold-rules.json
  - scripts/check-visual-diff-threshold.mjs
  - scripts/release-gate-team1.mjs
  - scripts/team1-regression-full-site.sh
  - README.md
  - reports/WEEKLY_STATUS_2026_04_19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_21_05
* Notes: Đã verify pass với gate command có `--visual-diff-rules-file=scripts/visual-diff-threshold-rules.json`, kết quả `failed=0` trên 144 screenshots.

### Entry
* Date: 2026-04-21
* Decision ID: APDALAT_DEC_2026_04_21_07
* Category: QA Workflow
* Decision: Thêm workflow calibration round 2 dựa trên lịch sử full-site runs, có guard `minCoverage` và `maxGrowthFactor`, rồi áp threshold mới.
* Why: Cần siết threshold dựa trên dữ liệu thực tế nhưng tránh nới ngưỡng quá tay khi dataset không tương thích.
* Who made it: Founder-approved proposal
* Impact: ảnh hưởng rules tuning lifecycle, quality gate sensitivity, và độ tin cậy khi scale batch content mới.
* Files affected:
  - scripts/calibrate-visual-diff-thresholds.mjs
  - scripts/visual-diff-threshold-rules.json
  - package.json
  - reports/visual-qa/threshold-calibration-round2.json
  - reports/WEEKLY_STATUS_2026_04_19.md
* Status: Applied
* Replaces / Related: related to APDALAT_DEC_2026_04_21_06
* Notes: Đã chạy `npm run qa:visual:calibrate:round2` và apply ngưỡng mới: `landing-core=1.0%`, `pillar-detail=1.2%`, `support-pages=1.8%`, `default=2.5%`; sau đó gate pass.
