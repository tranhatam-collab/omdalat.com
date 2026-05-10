Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Decision Log

Version: v1.2.0

Status: ACTIVE

Date updated: 2026-05-04

Owner: Team 1

Scope: semantic decisions, lane decisions, review decisions

---

## 0. Mục đích

File này là nơi Team 1 ghi lại các quyết định cần khóa để tránh mỗi lane hiểu theo cách riêng.

Chỉ ghi những quyết định có ảnh hưởng tới:

* route meaning
* CTA meaning
* role/access model
* Om/App/Ap boundary
* review outcome của từng lane

---

## 1. Quyết định đã khóa

### D-001

Date: 2026-04-28  
Type: Boundary  
Status: LOCKED

Decision:

* `omdalat.com` là public web và lối vào hệ.
* `app.omdalat.com` là member runtime / app layer cho toàn hệ.
* `ap.omdalat.com` là website editorial độc lập của Ấp Đà Lạt.

Reason:

Giữ rõ vai trò sản phẩm, SEO intent và trách nhiệm từng lane.

Impact:

* Team 2 không được đẩy Om public sang tạp chí/editorial.
* Team 3 không được diễn giải app như public brochure.
* Ap Team không được kéo Ap sang flow tham gia hệ.

### D-002

Date: 2026-04-28  
Type: Governance  
Status: LOCKED

Decision:

Bộ chuẩn universal được áp toàn phần cho Om/App/Ap ở lớp execution, language, SEO, QA, release evidence; trust infrastructure chỉ áp ở lớp governance/ownership/change control cho tới khi có founder directive mở rộng scope.

Reason:

Giữ kỷ luật production mà không làm lệch sản phẩm hiện tại.

Impact:

* Tất cả lane phải có evidence và report chuẩn mới.
* Không lane nào tự diễn giải trust layer thành product scope mới.

### D-003

Date: 2026-04-28  
Type: Runtime Gate  
Status: LOCKED

Decision:

Strict outbox lane được giữ ở mức hardening có điều kiện trong nhịp activation hiện tại; chưa nâng thành mandatory release gate cho tới khi Team 1 mở vòng runtime release gate riêng.

Reason:

Giữ nhịp tiến độ review theo evidence current-state, đồng thời không hạ chuẩn về an toàn release.

Impact:

* Team 3 không cần block toàn bộ current-state report chỉ vì strict outbox fail cũ.
* Team 3 vẫn bắt buộc nộp fresh artifact + fresh smoke batch cho vòng runtime tiếp theo.
* Team 1 vẫn có quyền nâng strict outbox thành gate bắt buộc trong release plan kế tiếp.

### D-004

Date: 2026-04-28  
Type: Om Public Review Baseline  
Status: LOCKED

Decision:

Team 1 chấp nhận pre-fill marker baseline trong matrix Om public của Team 2 (`PRESENT__TEXT_AUDIT_NEXT`, `EXPECTED__LOCALE_WIRED`, `PENDING_AUDIT`) như dữ liệu current-state tạm thời cho review, nhưng không xem đây là trạng thái đóng P0.

Reason:

Giữ nhịp review liên tục theo evidence hiện có, đồng thời bảo toàn chuẩn text-level audit trước khi chốt P0.

Impact:

* Team 2 được ghi nhận `report submitted and reviewed`.
* Lane Om public vẫn `REVIEWED_BLOCKED_P0` cho tới khi có text-level metadata extract, alt text audit, và evidence packet hoàn chỉnh.

### D-005

Date: 2026-04-28  
Type: Ap Editorial Submission Policy  
Status: LOCKED

Decision:

Team 1 được phép prefill baseline cho lane Ap editorial để giảm thời gian khởi động report, nhưng prefill không được coi là submission chính thức từ owner lane.

Reason:

Tăng tốc điều phối mà không làm sai trách nhiệm owner-evidence của Ap Team.

Impact:

* Tracker lane Ap vẫn giữ `PENDING` cho tới khi Ap Team nộp current-state evidence thật.
* Baseline prefill được dùng như khung nộp, không dùng để claim lane done.

### D-006

Date: 2026-04-29  
Type: Runtime Verification  
Status: LOCKED

Decision:

Team 1 áp dụng probe canonical trực tiếp như gate phụ cho lane Om public trong vòng review hiện tại. Nếu probe trên `https://omdalat.com` cho route P0 trả `404`, lane Om public không được chuyển `PASS` dù report nội bộ đã có smoke pass trước đó.

Reason:

Một số route P0 đang có sai khác giữa report smoke trước và bề mặt canonical hiện tại; cần khóa gate theo trạng thái live thật để tránh claim sai readiness.

Impact:

* Team 2 phải nộp lại evidence sau khi xác minh runtime mapping cho các route P0 bị `404`.
* Team 3 phải phối hợp xác minh deploy/runtime parity vì route gap có thể nằm ở hạ tầng mapping, không chỉ ở UI lane.
* Team 1 giữ trạng thái Team 2 ở `REVIEWED_BLOCKED_P0` cho tới khi probe canonical pass lại.

### D-007

Date: 2026-04-29  
Type: Team 2 Closure Gate  
Status: LOCKED

Decision:

Team 1 **không** chấp nhận `PASS_WITH_QUEUE` cho lane Om public khi route contact canonical còn `404`. Lane Team 2 giữ `REVIEWED_BLOCKED_P0` cho tới khi route contact hồi phục và có probe pass mới trên canonical.

Reason:

`/vi/contact` và `/en/contact` là route P0 thuộc surface public và ảnh hưởng trực tiếp tới user flow. Nếu route này fail thì không đạt ngưỡng closure tối thiểu.

Impact:

* Queue còn lại không được dùng để “hợp thức hóa” lỗi route P0.
* Team 2 closure chỉ mở lại sau khi nộp evidence pass cho contact route trên canonical.
* Team 3 phải phối hợp nếu nguyên nhân nằm ở runtime mapping/deploy parity.

### D-008

Date: 2026-04-29  
Type: Team 2 Closure Result  
Status: LOCKED

Decision:

Team 1 chốt lane Om public ở mức `PASS_WITH_QUEUE` sau khi route canonical đã phục hồi và matrix core P0 đã cập nhật đủ bằng chứng.

Evidence checkpoint:

* deploy: `https://f633122e.omdalat-web-ezk.pages.dev`
* canonical probes:
  * `https://omdalat.com/vi/contact` -> `200`
  * `https://omdalat.com/en/contact` -> `200`
  * `https://omdalat.com/vi/about` -> `200`

Reason:

Điều kiện khóa tại `D-007` đã đạt; P0 lane Om public đã sạch. Các việc còn lại thuộc hardening queue P1.

Impact:

* Team 2 không còn là blocker P0 cho global gate.
* Team 1 tập trung closure vào Team 3 + Ap Team.
* Team 2 tiếp tục P1 queue song song, không chặn release gate P0.

### D-009

Date: 2026-04-29  
Type: Runtime Gate Tightening  
Status: LOCKED

Decision:

Team 1 nâng `cf:runtime-map:check` để bắt buộc kiểm tra trực tiếp trên canonical app host:

* `https://app.omdalat.com/vi/member/register` phải `200`
* `https://app.omdalat.com/vi/member/operations` phải redirect đúng reviewed gate

Reason:

Gate cũ có thể pass dù canonical app host vẫn fail localized member routes, gây PASS giả cho Team 3.

Impact:

* Team 3 chỉ được thoát `REVIEWED_BLOCKED_P0` khi hai route localized trên canonical host pass đúng.
* Build/deploy pass ở shadow runtime không đủ để closure nếu canonical parity chưa đạt.

### D-010

Date: 2026-04-29  
Type: Ap Lane Intake  
Status: LOCKED

Decision:

Team 1 chấp nhận intake submission của Ap Team và chuyển lane từ `PENDING_REPORT` sang `REVIEW_READY`.

Reason:

Ap Team đã nộp đủ bộ report + matrix + evidence packet current-state và đã có check nội bộ pass (`check-content-routes`).

Impact:

* Ap lane không còn blocker do thiếu nộp.
* Team 1 thực hiện verdict cuối ở vòng review kế tiếp (`PASS_WITH_QUEUE` hoặc `REVIEWED_BLOCKED_P0` nếu phát hiện gap mới).

### D-011

Date: 2026-04-29  
Type: Ap Lane Verdict  
Status: LOCKED

Decision:

Team 1 chốt lane Ap editorial ở mức `PASS_WITH_QUEUE` cho cycle hiện tại.

Reason:

Ap Team đã nộp đủ report + matrix + evidence packet current-state, và check nội bộ route/sitemap/robots pass (`node scripts/check-content-routes.mjs`).

Impact:

* Ap lane không còn là blocker P0 cho global gate.
* Các phần live-domain probe và visual evidence chuyển về hàng P1 queue.

### D-012

Date: 2026-05-04  
Type: Content Gate  
Status: LOCKED

Decision:

Mọi lane phải gắn bằng chứng `Image Reality` khi nộp `evidence packet` theo lane.

Image reality không chỉ là alt/caption, mà bao gồm:

* đúng vai trò trang và đúng ngữ cảnh nội dung
* đúng nguồn ảnh + license
* không bị du lịch hóa/đi quá mức stage
* có crop desktop + mobile đạt chuẩn
* alt_vi/alt_en và caption_vi/caption_en khi có yêu cầu song ngữ
* tham chiếu `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`

Reason:

Sau khi khóa `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026`, release evidence cần có tính nhất quán giữa chuẩn nội dung và bằng chứng kiểm duyệt ảnh.

Impact:

* Claim `PASS_WITH_QUEUE` không còn chấp nhận nếu thiếu phần bằng chứng hình ảnh theo chuẩn mới.
* `Image reality` trở thành điều kiện hardening bắt buộc cho mọi lane trong chu kỳ tiếp theo.

### D-013

Date: 2026-05-04  
Type: Runtime Hardening  
Status: LOCKED

Decision:

`mail:smoke:e2e` strict (`SMOKE_REQUIRE_OUTBOX=1`) tiếp tục được vận hành ở hardening lane.

Nguyên nhân không chuyển thành blocker:

* thử lệnh với `SMOKE_REQUIRE_OUTBOX=1` + `SMOKE_ALLOW_LIVE_OUTBOX=1` vẫn timeout `waitForServer` do môi trường truy vấn runner;
* bằng chứng P0 hiện tại không phụ thuộc strict lane và đã có đủ `runtime-map` + `mail:smoke:e2e` mặc định.

Impact:

* Team 3 tiếp tục giữ `PASS_WITH_QUEUE` khi `runtime-map` + smoke live pass.
* Team 3 phải có lần strict retry xác thực trên runner ổn định trong chu kỳ hardening tiếp theo.

### D-014

Date: 2026-05-04  
Type: Team 3 Cycle Closure  
Status: LOCKED

Decision:

Team 1 chot lane Team 3 o trang thai `DONE_CLOSED` cho cycle hien tai.

Cac muc con lai (`strict outbox`, `split-account cleanup`, `content-contract follow-up`) duoc chuyen sang hardening backlog hau cycle, khong giu vai tro blocker cho closure cycle.

Reason:

Team 3 da dat du evidence bat buoc cho cycle:

* artifact build/deploy pass
* runtime-map pass
* smoke live pass
* reviewed gate pass tren canonical runtime
* governance hook SOP/Image Reality da duoc khoa trong plan

Impact:

* Team 3 progress duoc chot `100%` cho cycle hien tai.
* Team 1 ngung gan Team 3 la lane dang mo trong cycle nay.
* Batch CMS/article moi cua cycle sau phai nop them validator/content-contract evidence theo SOP.

### D-015

Date: 2026-05-04  
Type: Coordination Broadcast  
Status: LOCKED

Decision:

Team 1 ghi nhận lane Om public đã đáp ứng closure theo `D-008` và đồng thời thông báo trạng thái mới cho Team 2/Team 3/Ap trong các plan/docs vận hành:

* `docs/OMDALAT_TEAM1_ADMIN_NEXT_ACTIONS_2026-04-28.md`
* `docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md`
* `docs/OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md`
* `docs/OMDALAT_3_LANE_GLOBAL_PROGRESS_2026-04-28.md`
* `docs/DEV_TEAM_1_PLAN_OMDALAT.md`
* `docs/DEV_TEAM_2_PLAN_OMDALAT.md`
* `docs/DEV_TEAM_3_PLAN_OMDALAT.md`

Reason:

Sau nhiều vòng closure cũ, các đội cần 1 nguồn trạng thái duy nhất để tránh claim lệch lane-level.

Impact:

* Team 2 lane current-state giữ ở `PASS_WITH_QUEUE` (P0 clear, P1 queue còn lại).
* Team 3 lane giữ `DONE_CLOSED` cho cycle hiện tại.
* Ap lane giữ `PASS_WITH_QUEUE` cho cycle hiện tại.

---

## 2. Khu vực cập nhật review outcome

### R-TEAM2-OM-PUBLIC

Status:

* `PASS_WITH_QUEUE`

Next Team 1 action:

* theo dõi Team 2 queue P1 (alt/caption expansion + regression hardening), không dùng làm blocker P0

### R-TEAM3-APP-RUNTIME

Status:

* `DONE_CLOSED`

Next Team 1 action:

* cycle hien tai da dong.
* neu mo cycle moi co CMS/article seed thay doi, bat buoc nhan validator/content-contract evidence theo SOP.

### R-AP-EDITORIAL

Status:

* `PASS_WITH_QUEUE`

Next Team 1 action:

* theo dõi queue P1 của Ap (live-domain probe + visual evidence), không dùng làm blocker P0

---

## 3. Rule cập nhật

* Mỗi quyết định mới phải có mã riêng.
* Không sửa lại quyết định cũ âm thầm; nếu đổi, thêm một entry mới.
* Khi review một lane xong, phải cập nhật outcome ở mục 2.
