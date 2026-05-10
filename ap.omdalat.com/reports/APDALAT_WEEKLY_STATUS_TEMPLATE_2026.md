# APDALAT_WEEKLY_STATUS_TEMPLATE_2026
## Version: LOCKED
## Status: Production-ready
## Scope: ap.omdalat.com weekly reporting
## Required by: Founder / PM / Dev / Design / Content / SEO / QA / AI / Codex
## Purpose: Create one weekly reporting format so the whole team reports progress honestly, briefly, and in the same structure
---
# 0. MỤC TIÊU
File này dùng để báo cáo tuần.
Nó phải giúp Founder và team thấy rõ:
* tuần này cái gì đã thật sự xong
* cái gì đang làm dở
* cái gì bị chặn
* cái gì đã thay đổi
* tuần tới ưu tiên gì
* có quyết định nào cần chốt không
Không dùng file này để kể chuyện dài.
Không dùng để “trông có vẻ đang tiến triển”.
Chỉ dùng để báo cáo sự thật.
Điều này bám reporting protocol gốc: completed, in progress, blocked, changed, next, decisions needed.
---
# 1. FILE NAMING
Recommended file location:
`/reports/WEEKLY_STATUS.md`
If versioned weekly:
`/reports/WEEKLY_STATUS_YYYY_MM_DD.md`
Example:
`/reports/WEEKLY_STATUS_2026_04_19.md`
---
# 2. STATUS VALUES ĐƯỢC PHÉP
Use only approved states:
* Planned
* In Progress
* In Review
* Blocked
* Ready for QA
* Ready for Release
* Released
* Archived
No custom labels.
---
# 3. WEEKLY STATUS TEMPLATE
## WEEKLY STATUS
### 1. Summary
Tuần này dự án đang ở trạng thái:
[Planning / Building / In Review / Live / Stabilizing]
Tóm tắt ngắn 3-6 dòng:
* điều gì đã tiến lên thật
* milestone nào đang active
* đâu là trạng thái chung
---
### 2. Completed
Chỉ liệt kê những thứ hoàn thành thật.
* [ ] Item 1
* [ ] Item 2
* [ ] Item 3
Ví dụ:
* [ ] Khóa xong APDALAT_INFORMATION_ARCHITECTURE_2026.md
* [ ] Khóa xong APDALAT_SEO_MASTER_PLAN_2026.md
* [ ] Khóa xong APDALAT_CMS_SCHEMA_2026.md
Không ghi:
* “nghiên cứu thêm”
* “đã thảo luận”
* “có ý tưởng tốt”
---
### 3. In Progress
Những gì đang làm nhưng chưa hoàn tất.
* [ ] Item 1 — trạng thái ngắn
* [ ] Item 2 — trạng thái ngắn
Ví dụ:
* [ ] Homepage VI shell — đang map UI copy registry vào component
* [ ] Article template — đang kiểm mobile spacing
* [ ] Content seed batch 1 — đã có 4/10 bài
---
### 4. Blockers
Chỉ ghi blocker thật.
* [ ] Blocker 1
* [ ] Blocker 2
Mỗi blocker nên có:
* issue là gì
* đang kẹt ở đâu
* ai/điều gì cần giải quyết
Ví dụ:
* [ ] Chưa chốt image asset storage path cho CMS
* [ ] Chưa có owner phụ trách EN adaptation
* [ ] Chưa map xong bridge block logic vào template article
Không dùng blocker giả để giải thích chậm.
---
### 5. What Changed
Ghi rõ những gì đã thay đổi trong tuần về:
* scope
* naming
* logic
* structure
* route
* CMS
* release order
* priorities
Ví dụ:
* Quyết định dùng /vi/about thay vì /vi/ve-ap-da-lat để giữ route parity đơn giản
* Chuyển search từ phase R1 sang R3
* Category “Stories” giữ riêng, không gộp vào Rhythms/Work
If nothing changed, write:
* No structural change this week
---
### 6. QA Snapshot
Report fast truth only.
* Homepage: pass / fail / not tested
* Nav + routing: pass / fail / partial
* Locale switching: pass / fail / partial
* Article template: pass / fail / partial
* SEO metadata: pass / fail / partial
* Bridge to Om Dalat: pass / fail / partial
* Mobile: pass / fail / partial
* Image loading: pass / fail / partial
Optional note:
* top 3 QA issues this week
---
### 7. Risks
Top current risks only.
* [ ] Risk 1 — severity / owner
* [ ] Risk 2 — severity / owner
* [ ] Risk 3 — severity / owner
Ví dụ:
* [ ] Brand drift toward travel tone — High — Content lead
* [ ] Generic stock imagery risk — High — Design / Content
* [ ] English adaptation quality inconsistency — Medium — Translation owner
---
### 8. Next Week
Chỉ ghi 1-5 ưu tiên, theo thứ tự.
1. ...
2. ...
3. ...
4. ...
5. ...
Ví dụ:
1. Build homepage VI production shell
2. Build category hub template
3. Seed 10 content objects into CMS
4. Run QA on routing + locale
5. Prepare R1 release pack
---
### 9. Decisions Needed
Chỉ ghi nếu thực sự cần quyết định.
Format:
* Decision:
* Why:
* Options:
* Recommendation:
* Consequence if delayed:
Ví dụ:
* Decision: Search page đưa vào R1 hay R3
* Why: Ảnh hưởng scope release foundation
* Options: include now / defer
* Recommendation: defer to R3
* Consequence if delayed: none critical
If no decision needed:
* No founder decision needed this week
---
# 4. TEAM-SPECIFIC ADD-ON BLOCKS
Use only if the project is active enough to need sub-team reporting.
## Dev
* Completed
* In Progress
* Blockers
* Next
## Content
* Completed
* In Progress
* Blockers
* Next
## SEO
* Completed
* In Progress
* Blockers
* Next
## Design
* Completed
* In Progress
* Blockers
* Next
## QA
* Completed
* In Progress
* Blockers
* Next
Keep each section short.
---
# 5. AI / CODEX WEEKLY REPORT RULE
If AI or Codex contributes that week, add:
## AI Contribution This Week
* files created or updated
* assumptions made
* what still needs human verification
This keeps AI work visible and assumption-aware.
---
# 6. GOOD VS BAD WEEKLY STATUS
## Good
* cụ thể
* ngắn
* thật
* có blocker rõ
* có next steps rõ
* có change log rõ
## Bad
* “đang tiến triển tốt”
* “gần xong”
* “đã xử lý nhiều thứ”
* “sẽ tiếp tục hoàn thiện”
* không nói rõ cái gì thật sự done
---
# 7. WEEKLY STATUS CHECKLIST
Before sending / saving the weekly report, verify:
1. Completed có thật sự done không
2. In Progress có nói rõ mức độ không
3. Blockers có thật không
4. Changes có ghi các thay đổi thật không
5. Next Week có theo thứ tự không
6. Decision Needed có thật sự cần quyết định không
7. Có gì bị giấu dưới chữ “đang làm” không
---
# 8. SAMPLE SHORT WEEKLY STATUS
## WEEKLY STATUS
### 1. Summary
Tuần này dự án ở trạng thái Building.
Đã khóa xong lớp docs nền cho brand, IA, SEO, CMS, linking, QA, release, UI copy.
Chưa bắt đầu code production shell, nhưng đã đủ doc để Dev/Content/SEO chia việc rõ.
### 2. Completed
* [ ] APDALAT_INFORMATION_ARCHITECTURE_2026.md
* [ ] APDALAT_SEO_MASTER_PLAN_2026.md
* [ ] APDALAT_CMS_SCHEMA_2026.md
* [ ] APDALAT_QA_CHECKLIST_2026.md
* [ ] APDALAT_RELEASE_PROTOCOL_2026.md
* [ ] APDALAT_UI_COPY_REGISTRY_2026.md
### 3. In Progress
* [ ] Repo doc structuring — đang chờ team đưa file vào /docs
* [ ] R1 build planning — đang gom task order cho Dev / Content / QA
### 4. Blockers
* [ ] Chưa gán owner build shell homepage
* [ ] Chưa có quyết định asset storage pipeline cho ảnh
### 5. What Changed
* No structural change this week
### 6. QA Snapshot
* Docs quality: pass
* Build QA: not tested
### 7. Risks
* [ ] Build delay because docs not yet translated into tasks — Medium — PM
* [ ] Image pipeline uncertainty — High — Dev/Design
### 8. Next Week
1. Move locked docs into repo
2. Build homepage shell
3. Build category hub template
4. Seed initial content
5. Prepare R1 release scope
### 9. Decisions Needed
* No founder decision needed this week
---
# 9. DEFINITION OF DONE
Weekly status template được xem là hoàn thành khi:
* team nào cũng có thể dùng cùng format
* Founder nhìn một file là hiểu tuần đó có gì thật
* không còn update kiểu mơ hồ
* blockers và next steps đủ rõ để điều phối
---
# 10. CÂU CHỐT
Nếu weekly status không đủ rõ để người không trực tiếp làm vẫn hiểu tình hình trong 2 phút, thì báo cáo đó chưa đạt.
