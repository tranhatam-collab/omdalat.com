Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Audit Board

Version: v1.0.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 1

Scope: audit điều phối cho `omdalat.com`, `app.omdalat.com`, `ap.omdalat.com`

---

## 0. Mục đích

File này là board audit chính thức để Team 1 điều phối 3 lane đang chạy song song:

* Om public
* App member runtime
* Ap editorial

Team 1 dùng board này để:

* nhìn chung trạng thái P0 giữa 3 lane
* buộc report theo cùng một format
* phân biệt rõ done, blocked, queue
* tránh việc mỗi team claim theo tiêu chuẩn riêng

---

## 1. Quy ước trạng thái

`DONE`

Đã có bằng chứng phù hợp với lane đó.

`BLOCKED`

Chưa thể coi là xong vì thiếu artifact, thiếu smoke, thiếu report, hoặc đang kẹt toolchain / infra / owner khác.

`QUEUE`

Không chặn P0 hiện tại, nhưng đã nằm trong hàng việc tiếp theo.

---

## 2. Lane A — Om Public

Owner chính: Team 2  
Reviewer: Team 1  
Support: SEO / Content / QA

### 2.1 Scope

* homepage
* public routes
* docs public surface
* contact
* metadata / canonical / hreflang / sitemap / alt text
* bridge Om -> Ap

Report file:

* `docs/TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md`

### 2.2 P0 done

* `DONE` Kích hoạt bộ chuẩn universal cho Om trong docs điều phối.
* `DONE` Contact VI/EN đã tách ngôn ngữ và có metadata theo locale.
* `DONE` Sitemap public đã được mở rộng và chuẩn hóa locale/hreflang trong release trước.
* `DONE` Homepage public version mới đã được publish và có smoke evidence.
* `DONE` Mobile menu hamburger đã được chỉnh lại cho public surface.
* `DONE` Public smoke trước đó đã có evidence pass ở các lane acceptance chính.

### 2.3 P0 blocked

* `BLOCKED` Team 2 đã nộp report + matrix + evidence packet và Team 1 đã review, nhưng chưa thể đóng P0.
* `BLOCKED` Alt text audit lane Om public vẫn còn `PENDING_AUDIT` ở nhiều dòng route.
* `BLOCKED` Team 1 live probe ngày `2026-04-29` ghi nhận route gap trên canonical (`/vi/contact`, `/en/contact`, `/vi/about` trả `404`), cần Team 2 + Team 3 xác minh runtime mapping/deploy parity.
* `BLOCKED` Metadata matrix mới có extract cho một phần route, chưa đủ coverage cho toàn bộ route P0.

### 2.4 P1 queue

* `QUEUE` Rà sâu lại docs public surface theo language/SEO rules mới.
* `QUEUE` Bổ sung blacklist regression cho từ tiếng Anh không được lộ trên bản Việt.
* `QUEUE` Chuẩn hóa thêm image alt/caption audit toàn site.

### 2.5 Team 1 kết luận hiện tại

Om public không còn ở trạng thái xây nền. Lane này đang ở trạng thái:

`reviewed, P0 blocked pending text-level metadata extract, alt audit, and evidence packet completion`

---

## 3. Lane B — App Member Runtime

Owner chính: Team 3  
Reviewer: Team 1  
Support: QA / DevOps

### 3.1 Scope

* register
* apply
* dashboard
* stay
* work
* learning
* resources
* earnings
* contributor
* places
* admin review
* role/status model
* gate copy / noindex / runtime smoke

Report file:

* `docs/TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md`

### 3.2 P0 done

* `DONE` Bộ chuẩn universal đã được áp vào lane app/member runtime ở mức governance.
* `DONE` Team 3 closure trước đó đã có evidence cho runtime base: `build:cf`, runtime map, member gate, email live smoke.
* `DONE` Member flow + dashboard spec đã được khóa trong file riêng.
* `DONE` Code scope chính cho member flow/dashboard đã được dựng ở repo: status model, next-step logic, route shell, role surfaces.

### 3.3 P0 blocked

* `BLOCKED` Team 3 đã nộp report + matrix và đã phân loại blocker `code/toolchain/infra`, nhưng runtime hiện đang drift.
* `BLOCKED` Live probes mới cho thấy lane member/app chưa ổn định: `404` ở route onboarding/gate, `502` ở `/api/support`, `405` ở `/api/contact`.
* `BLOCKED` Mail smoke live hiện fail theo evidence mới do runtime/API lane chưa đạt.
* `BLOCKED` Chưa có evidence packet mới gom riêng cho metadata/noindex/access surfaces của lane app/member runtime.

### 3.4 P1 queue

* `QUEUE` Gắn dữ liệu thật / persistence sâu hơn cho work, stay, resources, earnings, places, contributor.
* `QUEUE` Mở rộng admin review flow từ shell logic sang lane vận hành đầy đủ hơn.
* `QUEUE` Thêm evidence packet riêng cho app bilingual metadata/noindex/access matrix.

### 3.5 Team 1 kết luận hiện tại

App member runtime không còn ở giai đoạn ý tưởng. Lane này đang ở trạng thái:

`reviewed, implementation present but runtime drifted, P0 blocked until runtime mapping/API/smoke are stable`

---

## 4. Lane C — Ap Editorial

Owner chính: Ap Team  
Reviewer: Team 1  
Support: SEO / Content / QA

### 4.1 Scope

* homepage editorial
* people / places / rhythms / work / stories / images
* metadata / sitemap / robots / canonical / hreflang
* alt text / captions / image policy
* Om <-> Ap linking rules

Report file:

* `ap.omdalat.com/docs/APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md`

### 4.2 P0 done

* `DONE` Bộ chuẩn universal đã được kích hoạt cho `ap.omdalat.com` trong docs.
* `DONE` Role boundary với Om đã được khóa: Ap là lớp editorial độc lập.
* `DONE` Các file nền đã hiện diện trong repo docs: language codex, SEO master plan, robots/sitemap policy, image policy, QA checklist, release protocol.

### 4.3 P0 blocked

* `BLOCKED` Chưa có report audit lane Ap theo format mới.
* `BLOCKED` Chưa có route inventory current-state cho toàn bộ bề mặt editorial.
* `BLOCKED` Chưa có evidence packet current-state cho bilingual metadata, alt text, sitemap, canonical, image system, QA smoke.
* `BLOCKED` Chưa có board current live/build status sau khi kích hoạt bộ chuẩn universal.
* `BLOCKED` Team 1 đã prefill baseline docs cho lane Ap, nhưng chưa có xác nhận và evidence thật từ owner Ap Team.

### 4.4 P1 queue

* `QUEUE` Chuẩn hóa publish gate song ngữ cho editorial content.
* `QUEUE` Mở rộng regression cho title/meta/alt text/caption theo locale.
* `QUEUE` Gom release evidence packet riêng cho Ap editorial.

### 4.5 Team 1 kết luận hiện tại

Ap editorial đã có đầy đủ khung chuẩn ở lớp tài liệu, nhưng chưa có report audit vận hành theo format mới. Lane này đang ở trạng thái:

`standards activated, waiting for first full audit report`

---

## 5. Tổng hợp nhanh

### 5.1 P0 done toàn cục

* Bộ chuẩn universal đã được kích hoạt cho Om và Ap.
* Ranh giới Om / App / Ap đã được khóa lại bằng văn bản.
* Om public đã có nền release evidence mạnh từ các đợt live trước.
* App runtime đã có baseline evidence và spec member flow/dashboard đã khóa.

### 5.2 P0 blocked toàn cục

* Team 2 report đã review và còn mở blocker alt audit + route gap trên canonical.
* Team 3 report đã review và còn mở blocker runtime drift + API lane + smoke fail.
* Thiếu report standardized mới từ Ap Team.
* Thiếu một lớp evidence packet mới gom theo 3 lane sau activation 2026-04-28.

### 5.3 P1 queue toàn cục

* route inventory matrix đầy đủ cho cả 3 lane
* bilingual metadata matrix đầy đủ
* alt text / image audit matrix
* release evidence packet theo surface

---

## 6. Điều Team 1 yêu cầu ngay

* Team 2 nộp text-level extract cho `title/meta/canonical/hreflang` + alt text audit + evidence packet Om public để Team 1 chốt review.
* Team 3 chốt runtime mapping chuẩn, phục hồi các route/API đang drift, sau đó nộp fresh smoke pass + evidence packet metadata/noindex/access.
* Ap Team nộp report lane Ap editorial theo format mới.

Không team nào được tự đổi trạng thái `DONE` trong board này nếu chưa attach evidence phù hợp.

---

## 7. Definition of done cho board này

Board chỉ được xem là xanh khi:

* cả 3 lane đều có report current-state theo format mới
* Team 1 đã review và chốt lại `P0 done / P0 blocked / P1 queue`
* mỗi lane đều có evidence path rõ
* không còn lane nào claim done bằng miệng
