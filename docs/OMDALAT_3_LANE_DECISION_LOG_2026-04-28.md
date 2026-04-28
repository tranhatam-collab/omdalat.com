Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Decision Log

Version: v1.1.0

Status: ACTIVE

Date updated: 2026-04-29

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

---

## 2. Khu vực cập nhật review outcome

### R-TEAM2-OM-PUBLIC

Status:

* `PASS_WITH_QUEUE`

Next Team 1 action:

* theo dõi Team 2 queue P1 (alt/caption expansion + regression hardening), không dùng làm blocker P0

### R-TEAM3-APP-RUNTIME

Status:

* `REVIEWED_BLOCKED_P0`

Next Team 1 action:

* xác nhận runtime evidence mới sau gate tăng cường `D-009`:
  * `docs/TEAM3_RUNTIME_DRIFT_EVIDENCE_2026-04-28.md`
  * `docs/APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md`
* Team 3 phải đóng canonical parity trên `app.omdalat.com` cho:
  * `/vi/member/register` (`200`)
  * `/vi/member/operations` (redirect reviewed gate)
* giữ lại support/contact lane ở trạng thái `PASS` (đã kiểm lại `200`)
* sau khi đủ evidence pass, Team 1 chốt lại verdict lane App member runtime

### R-AP-EDITORIAL

Status:

* `REVIEW_READY`

Next Team 1 action:

* review report/matrix/evidence packet Ap Team đã nộp
* chốt verdict cuối cho lane Ap: `PASS_WITH_QUEUE` hoặc `REVIEWED_BLOCKED_P0`

---

## 3. Rule cập nhật

* Mỗi quyết định mới phải có mã riêng.
* Không sửa lại quyết định cũ âm thầm; nếu đổi, thêm một entry mới.
* Khi review một lane xong, phải cập nhật outcome ở mục 2.
