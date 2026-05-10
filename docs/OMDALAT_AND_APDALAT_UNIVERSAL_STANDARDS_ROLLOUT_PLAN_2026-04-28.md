Ôm Đà Lạt / Om Dalat
Ấp Đà Lạt / Ap Dalat

Universal Standards Rollout Plan

Version: 1.0
Status: ACTIVE
Date: 2026-04-28
Owner: Team 1
Scope: rollout thực thi cho `omdalat.com`, `app.omdalat.com`, `ap.omdalat.com`

⸻

0. Mục tiêu

File này biến bộ chuẩn vừa kích hoạt thành kế hoạch triển khai thực tế cho các team.

Nó trả lời 4 câu hỏi:

* việc nào phải làm ngay
* team nào chịu trách nhiệm
* đâu là gate trước live
* đâu là việc phase sau

⸻

1. Quy tắc điều hành rollout

1. Không làm đồng loạt vô tổ chức.
2. Ưu tiên route public, metadata, language, release evidence trước.
3. Không đụng lại những phần đã đúng chỉ để “đẹp hơn”.
4. Mọi claim done phải đi kèm bằng chứng.
5. Team 1 giữ source of truth cho meaning; team khác build trong ranh giới của mình.

⸻

2. P0 — Bắt buộc ngay

2.1 Om Dalat public web

Owner:
* Team 1 + Team 2 + SEO/Content + QA

Phải hoàn thành:

* inventory toàn bộ route public `vi/en`
* audit matrix cho title / meta / H1 / canonical / hreflang / alt text
* xác nhận menu / footer / CTA / form / empty state không trộn ngôn ngữ
* xác nhận page purpose từng route không lệch khỏi Om role
* xác nhận link sang Ap đúng chỗ, không phá flow tham gia

Gate:

* không còn metadata dùng chung cho VI/EN
* không còn alt text sai ngôn ngữ
* không còn từ tiếng Anh rơi lẻ vào bản Việt nếu không có lý do rõ
* có report pre-live song ngữ

2.2 App Om Dalat

Owner:
* Team 1 + Team 3 + QA/DevOps

Phải hoàn thành:

* member flow + dashboard giữ đúng role/status wording
* gate copy / status copy / dashboard labels theo codex
* app metadata/noindex chuẩn
* artifact build/deploy lane sạch
* smoke app runtime sau deploy

Gate:

* `build` pass
* `build:cf` hoặc artifact deploy lane pass
* smoke app/member route pass
* không còn wording lộ role nội bộ sai nghĩa

2.3 Ap Dalat

Owner:
* Ap Team + Team 1 + SEO/Content + QA

Phải hoàn thành:

* route inventory editorial
* metadata VI/EN riêng
* image alt / caption / filename policy rà lại
* sitemap / robots / canonical / hreflang chuẩn
* xác nhận không trùng role với Om Dalat

Gate:

* mỗi route public của Ap có page purpose rõ
* không có bài/route trùng intent chính với Om
* bridge Om <-> Ap đúng ngữ cảnh

⸻

3. P1 — Sau khi P0 xanh

3.1 Content source hardening

* gom các public text source về nơi kiểm soát rõ
* giảm hard-code text rải rác
* chuẩn hóa registry cho CTA / form / empty state / support text

3.2 Frontend system hardening

* khóa token / spacing / typography / image behavior
* rà motion / accessibility / responsive sâu hơn

3.3 QA / release system hardening

* chuẩn hóa report template cho Om, App, Ap
* gắn release evidence packet theo surface
* chuẩn hóa rollback note

⸻

4. P2 — Phase sau

4.1 Trust governance reuse

* dùng trust ecosystem plan ở lớp governance sâu hơn nếu Founder yêu cầu
* chưa tự động biến Om/Ap thành trust-core product line

4.2 AI orchestration automation sâu hơn

* agent registry
* task routing board
* usage report theo lane model

4.3 CMS governance mạnh hơn

* chặn publish nếu thiếu VI/EN/metadata/alt text
* lock editorial QA trong CMS workflow

⸻

5. Phân việc cụ thể theo team

5.1 Team 1

Phải làm:

* giữ file precedence
* chốt page purpose map
* chốt language/SEO decisions
* review report từ Team 2 / Team 3 / Ap Team
* ghi rõ blocker nào là content, blocker nào là toolchain, blocker nào là governance

Không làm:

* không tự build thay toàn bộ frontend chi tiết của Team 2
* không tự đổi role semantics thay Team 3

5.2 Team 2

Phải làm:

* public UI compliance
* language switch behavior
* responsive/accessibility compliance
* remove hard-coded public text sai luồng nếu thuộc frontend surface

5.3 Team 3

Phải làm:

* app/member runtime compliance
* packaging/deploy lane cho app
* metadata/noindex/gating compliance
* app smoke evidence

5.4 SEO / Content

Phải làm:

* URL inventory
* rewrite matrix
* metadata table
* alt text review
* internal link review

5.5 QA / DevOps

Phải làm:

* smoke checklist theo surface
* release evidence packet
* rollback note
* bilingual QA evidence

5.6 Ap Team

Phải làm:

* editorial route review
* image/gallery semantics
* Om/Ap boundary check
* Ap-side language/SEO compliance

⸻

6. Ngưỡng nghiệm thu mới

Không team nào được dùng tiêu chuẩn “chạy được là xong”.

Ngưỡng mới là:

* đúng vai trò page
* đúng ngôn ngữ
* đúng metadata
* đúng accessibility tối thiểu
* đúng responsive
* có evidence
* có rollback note nếu chạm release

⸻

7. Bước tiếp theo ngay sau file này

Step 1
Team 1 mở một audit board 3 cột:

* Om public
* App member runtime
* Ap editorial

Step 2
Team 2, Team 3, Ap Team nộp report theo format mới.

Artifacts cho bước này:

* `docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md`
* `docs/OMDALAT_3_LANE_REPORT_REQUEST_2026-04-28.md`

Step 3
Team 1 chốt:

* P0 done
* P0 blocked
* P1 queue

⸻

8. Câu chốt

Bộ chuẩn mới chỉ có giá trị khi nó đi vào nhịp làm việc hằng ngày.
File này là cầu nối để chuyện đó xảy ra.
