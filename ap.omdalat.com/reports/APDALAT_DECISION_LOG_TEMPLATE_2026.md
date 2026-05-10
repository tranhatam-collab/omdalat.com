# APDALAT_DECISION_LOG_TEMPLATE_2026
## Version: LOCKED
## Status: Production-ready
## Scope: ap.omdalat.com
## Required by: Founder / PM / Product / Dev / Design / Content / SEO / QA / AI / Codex
## Purpose: Create one structured decision log so meaningful project decisions do not remain scattered in chat memory or get relitigated repeatedly
---
# 0. MỤC TIÊU
Decision log dùng để ghi lại các quyết định thật sự quan trọng của dự án.
Nó phải giúp team trả lời nhanh:
* đã chốt gì rồi
* vì sao chốt như vậy
* ai chốt
* ảnh hưởng đến file, route, CMS, content, SEO, release như thế nào
* quyết định nào thay thế quyết định cũ
Không phải mọi ý kiến đều cần vào log.
Chỉ những gì làm đổi hướng, đổi cấu trúc, đổi luật, đổi phạm vi, hoặc đổi thứ tự ưu tiên.
---
# 1. FILE LOCATION
Recommended:
`/reports/DECISION_LOG.md`
If versioned:
`/reports/DECISION_LOG_2026.md`
Recommended live approach:
Use one rolling file with newest entries first.
---
# 2. WHEN TO ADD A DECISION
Add a decision entry when any of these happen:
* project role changes
* information architecture changes
* route naming changes
* category structure changes
* language rules change
* bridge logic changes
* CMS schema changes
* SEO strategy changes
* release order changes
* major feature is deferred or removed
* brand distinction with omdalat.com is clarified further
If it changes how the team works or builds, log it.
---
# 3. WHEN NOT TO ADD A DECISION
Do not log:
* small typo fixes
* visual polish micro-adjustments
* copy edits that do not change meaning
* task-level implementation detail with no wider consequence
* temporary experiments that were not adopted
---
# 4. DECISION ENTRY FORMAT
Every decision entry must include:
* Date
* Decision ID
* Decision
* Why
* Who made it
* Impact
* Files affected
* Status
* Replaces / Related decisions
* Notes
---
# 5. DECISION STATUS VALUES
Use only:
* Proposed
* Approved
* Applied
* Replaced
* Rejected
* Archived
Definitions:
Proposed:
Idea exists but not yet locked
Approved:
Decision is accepted and should guide work
Applied:
Decision has already been reflected in docs/code
Replaced:
A newer decision superseded it
Rejected:
Considered but not adopted
Archived:
No longer active but kept for history
---
# 6. DECISION LOG TEMPLATE
## DECISION LOG
### Entry
* Date:
* Decision ID:
* Decision:
* Why:
* Who made it:
* Impact:
* Files affected:
* Status:
* Replaces / Related:
* Notes:
---
# 7. ID NAMING RULE
Recommended pattern:
`APDALAT_DEC_YYYY_MM_DD_01`
Examples:
* APDALAT_DEC_2026_04_19_01
* APDALAT_DEC_2026_04_19_02
If many decisions on same day, increment last number.
Do not use vague IDs like:
* new-decision
* final-change
* update-2
---
# 8. GOOD DECISION EXAMPLES
## Example 1
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_01
* Decision: Khóa Ấp Đà Lạt là lớp editorial và place identity layer, không phải bản sao của omdalat.com
* Why: Cần tránh trùng brand, trùng SEO, trùng role
* Who made it: Founder
* Impact: ảnh hưởng toàn bộ brand, IA, SEO, linking, homepage copy
* Files affected:
  - APDALAT_BRAND_AND_CONTENT_BUILD_MASTER_2026.md
  - APDALAT_INFORMATION_ARCHITECTURE_2026.md
  - APDALAT_SEO_MASTER_PLAN_2026.md
* Status: Approved
* Replaces / Related: none
* Notes: Đây là quyết định gốc để phân biệt ap với om
## Example 2
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_02
* Decision: Search page chuyển từ phase foundation sang R3
* Why: Không critical cho release foundation
* Who made it: PM / Founder
* Impact: giảm scope R1, giúp build foundation gọn hơn
* Files affected:
  - APDALAT_INFORMATION_ARCHITECTURE_2026.md
  - APDALAT_RELEASE_PROTOCOL_2026.md
* Status: Approved
* Replaces / Related: related to R1 scope
* Notes: ưu tiên route, template, homepage trước
---
# 9. BAD DECISION EXAMPLES
Không nên log kiểu:
* “Sửa một vài text”
* “Có lẽ màu này đẹp hơn”
* “Tạm thay ảnh hero”
* “Có thể sẽ thêm topic page”
Lý do:
* không đủ mức hệ thống
* mơ hồ
* không tạo giá trị cho decision history
---
# 10. DECISION CATEGORIES
For easier filtering, each decision may optionally have a category:
* Brand
* IA
* Route
* SEO
* CMS
* UX/UI
* Content
* Image
* Linking
* Release
* Workflow
* Priority
Example:
* Category: IA
* Category: CMS
---
# 11. FILES AFFECTED RULE
Do not write:
* many files
* homepage things
* CMS stuff
Write exact filenames if known.
Example:
* APDALAT_HOMEPAGE_COPY_MASTER_2026.md
* APDALAT_CMS_SCHEMA_2026.md
* /content/vi.json
* /src/routes/vi/noi-chon/[slug]
This reduces future confusion.
---
# 12. WHO MADE IT RULE
Use one of:
* Founder
* PM
* Founder + PM
* Dev Lead
* Content Lead
* SEO Lead
* Design Lead
* QA Lead
* Founder-approved proposal
If AI proposed something but a human approved it, log the human approval authority, not AI as final authority.
---
# 13. IMPACT RULE
Impact should explain what changes because of the decision.
Examples:
* changes homepage structure
* changes route system
* reduces release scope
* affects bilingual logic
* affects CMS collections
* affects cross-linking to Om Dalat
Keep it concrete.
---
# 14. REPLACED DECISIONS RULE
If a new decision overrides an old one:
* update old decision status to Replaced
* point to new decision ID
* do not silently overwrite history
This prevents reliving the same confusion later.
---
# 15. WORKFLOW FOR NEW DECISIONS
1. Detect a real decision
2. Write proposal briefly
3. Confirm approval authority
4. Add log entry
5. Update affected docs
6. Mention in weekly status if impactful
7. Reflect in build / release plan
No decision should stay only in chat if it changes execution.
---
# 16. DECISION REVIEW RHYTHM
Review decision log:
* weekly during active build
* before any release milestone
* when onboarding new team members
* when conflict appears between teams or files
This supports document-first coordination and prevents repeated Founder explanation.
---
# 17. DECISION LOG QUICK TABLE FORMAT
Optional summary table at top of file:
| Date | ID | Category | Decision | Status |
|------|----|----------|----------|--------|
| 2026-04-19 | APDALAT_DEC_2026_04_19_01 | Brand | Ap is editorial layer, not Om copy | Approved |
| 2026-04-19 | APDALAT_DEC_2026_04_19_02 | Release | Search deferred to R3 | Approved |
Use the full entry format below the table.
---
# 18. STARTER DECISIONS TO LOG IMMEDIATELY
These should exist in the first live decision log:
1. Ấp Đà Lạt là editorial + place identity layer
2. Ôm Đà Lạt là participation + stay/work/learn layer
3. Vietnamese is source-of-truth language
4. Categories locked to People / Places / Rhythms / Work / Stories / Images
5. ap.omdalat.com does not use booking or hotel logic
6. Bridge to Om Dalat is soft, contextual, not spam
7. Search deferred if not needed for R1
8. Image quality and license hygiene are first-class requirements
---
# 19. DECISION LOG TEMPLATE FILE STARTER
## DECISION LOG
### Entry
* Date: 2026-04-19
* Decision ID: APDALAT_DEC_2026_04_19_01
* Category: Brand
* Decision: Ấp Đà Lạt được khóa là lớp editorial, bản sắc sống, con người, nơi chốn, nhịp sống và hình ảnh của Đà Lạt hôm nay
* Why: Cần phân biệt rõ với omdalat.com để tránh trùng role, trùng brand, trùng SEO
* Who made it: Founder
* Impact: ảnh hưởng toàn bộ brand system, IA, SEO, CMS, linking, homepage copy
* Files affected:
  - APDALAT_BRAND_AND_CONTENT_BUILD_MASTER_2026.md
  - APDALAT_INFORMATION_ARCHITECTURE_2026.md
  - APDALAT_SEO_MASTER_PLAN_2026.md
  - APDALAT_TO_OMDALAT_LINKING_RULES_2026.md
* Status: Approved
* Replaces / Related: none
* Notes: Đây là decision gốc của toàn dự án
---
# 20. DECISION QA CHECKLIST
Before saving a decision entry, verify:
1. Đây có thật sự là decision cấp hệ thống không
2. Decision có được viết rõ, không mơ hồ không
3. Why có đủ cụ thể không
4. Files affected có rõ không
5. Approval authority có rõ không
6. Status có đúng không
7. Có cần update docs khác không
8. Có cần nhắc trong weekly status không
---
# 21. DEFINITION OF DONE
Decision log template được xem là hoàn thiện khi:
* team có format thống nhất để ghi quyết định
* các quyết định quan trọng không còn nằm rải rác trong chat
* quyết định mới có thể trace ngược ảnh hưởng
* conflict giữa team/file dễ resolve hơn
---
# 22. CÂU CHỐT
Một hệ không ghi lại quyết định sẽ phải trả giá bằng việc tranh luận lại những điều đã từng chốt.
