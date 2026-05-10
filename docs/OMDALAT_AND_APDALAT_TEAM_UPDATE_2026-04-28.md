Ôm Đà Lạt / Om Dalat
Ấp Đà Lạt / Ap Dalat

Team Update

Version: 1.0
Status: ACTIVE NOTICE
Date: 2026-04-28
Audience: Team 1 / Team 2 / Team 3 / QA / DevOps / SEO / Content / Ap Team / AI contributors

⸻

0. Mục đích

File này là thông báo vận hành chính thức cho các team sau khi Om Dalat và Ap Dalat kích hoạt bộ chuẩn universal mới.

Từ hôm nay, mọi team phải xem đây là lớp nhắc lại ngắn gọn:

* mình phải làm gì khác trước
* mình không được làm gì nữa
* team nào chốt lớp nào

⸻

1. Những gì toàn bộ team phải biết ngay

1. Không còn coi song ngữ là phần sửa sau.
2. Không còn coi metadata là việc nhỏ.
3. Không còn claim done nếu chưa có evidence.
4. Không còn tự ý đổi wording public.
5. Không còn tự ý mở rộng scope.
6. Không còn để AI session tự chạy lệch vai trò mà không báo cáo.

⸻

2. Team 1 cần biết

Team 1 tiếp tục giữ:

* page purpose
* route meaning
* language codex
* CTA meaning
* access model meaning
* Om / App / Ap boundary

Team 1 phải làm thêm:

* kiểm mọi file spec mới có owner / scope / acceptance / evidence
* khóa các quyết định language + SEO ở lớp hệ thống
* nhắc team dùng đúng format report mới

⸻

3. Team 2 cần biết

Team 2 không được:

* tự đổi wording public cho “hay hơn”
* hard-code text công khai khi đã có nguồn nội dung
* sửa UI làm gãy language switch
* để mobile ổn mà desktop vỡ, hoặc ngược lại

Team 2 bắt buộc:

* bám design system
* bám token / spacing / responsive / accessibility
* kiểm song ngữ ở menu, CTA, form, empty state, footer
* attach evidence trước khi claim ready

⸻

4. Team 3 cần biết

Team 3 không được:

* tự đổi role semantics
* tự đổi gating meaning
* coi app là ngoại lệ không cần language governance

Team 3 bắt buộc:

* giữ metadata/noindex đúng cho app/member surfaces
* giữ status copy / gate copy / dashboard labels đúng codex
* report rõ đâu là blocker code, đâu là blocker toolchain
* không claim live nếu chưa có artifact và smoke evidence

⸻

5. QA / DevOps cần biết

Từ nay mọi release gate phải có:

* commands used
* pages tested
* affected files
* result
* risks
* rollback note
* approval recommendation

Không còn “pass miệng”.

⸻

6. SEO / Content cần biết

Từ nay mọi page public phải có:

* title riêng theo ngôn ngữ
* meta description riêng theo ngôn ngữ
* H1 rõ
* internal links đúng locale
* alt text đúng ngôn ngữ
* nội dung đúng role của site

Riêng Om và Ap:

* Om không được trôi sang editorial trùng vai trò với Ap
* Ap không được trôi sang join/booking/system site

⸻

7. Ap team cần biết

Ap team dùng cùng kỷ luật production như Om team, nhưng giữ role riêng:

* editorial
* hình ảnh
* con người
* nơi chốn
* nhịp sống

Không được dùng hệ chuẩn mới để vô tình kéo Ap thành bản phụ của Om.

⸻

8. AI contributors cần biết

Mỗi task phải có:

* classification
* risk level
* evidence
* context discipline
* escalation nếu chạm payment / auth / deploy / production

Không AI nào được claim done nếu chưa có bằng chứng phù hợp với lane đó.

⸻

9. Khi nào phải escalate ngay

Escalate cho Team 1 hoặc Founder nếu:

* đổi định vị trang
* đổi route meaning
* đổi CTA chính
* đổi role/access meaning
* đụng shared auth / billing / deploy lane lớn
* muốn nhập Om và Ap thành cùng một vai trò
* muốn áp trust-core product scope vào Om/Ap

⸻

10. Câu chốt cho toàn team

Từ nay, Om Dalat và Ap Dalat không chỉ được build đúng.
Chúng phải được điều hành đúng ngay từ lúc đang build.

⸻

11. Cập nhật bổ sung ngày 2026-05-04 — Content SOP

Notice mới:

* `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`

Từ vòng này, mọi team phải xem `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` là gate bắt buộc cho bài viết public, ảnh bài viết, metadata, internal link, CMS handoff và QA deploy content.

Điểm thay đổi chính:

* không trộn VI/EN trong cùng visible article page
* batch ảnh mới dùng `WebP` hoặc `AVIF`
* tên file ảnh bám slug bài viết
* schema CMS v2 hướng về `locales.vi` / `locales.en`
* Content/SEO không nộp bài nếu chưa pass bộ lọc tinh thần
* Team 2 không tự đổi wording để vừa UI
* Team 3 không publish payload sai SOP
* QA không pass nếu thiếu Content SOP QA và Image Reality QA

Mọi report tiếp theo của Team 1 / Team 2 / Team 3 / Ap Team phải có dòng: `Content SOP impact`.
