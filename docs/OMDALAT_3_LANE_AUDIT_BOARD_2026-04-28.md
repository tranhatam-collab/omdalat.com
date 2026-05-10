Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

3-Lane Audit Board

Version: v1.2.0

Status: ACTIVE

Date updated: 2026-05-04

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

* `NONE` (đã thoát P0 blocked)
* Team 2 closure state hiện tại: `PASS_WITH_QUEUE`
* Route gap canonical đã đóng sau deploy `f633122e`:
  * `/vi/contact` -> `200`
  * `/en/contact` -> `200`
  * `/vi/about` -> `200`

### 2.4 P1 queue

* `QUEUE` Rà sâu lại docs public surface theo language/SEO rules mới.
* `QUEUE` Bổ sung blacklist regression cho từ tiếng Anh không được lộ trên bản Việt.
* `QUEUE` Chuẩn hóa thêm image alt/caption audit toàn site.

### 2.5 Team 1 kết luận hiện tại

Om public lane đã đạt trạng thái:

`PASS_WITH_QUEUE` (P0 complete, còn queue hardening)

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

* `NONE` (D-014 đã khóa closure; hiện tại đang `DONE_CLOSED` cho cycle).
* `QUEUE` Team 3 tiếp tục hardening riêng:
  * strict outbox / split-account cleanup
  * content-contract evidence cho batch CMS/article mới

### 3.4 P1 queue

* `QUEUE` Gắn dữ liệu thật / persistence sâu hơn cho work, stay, resources, earnings, places, contributor.
* `QUEUE` Mở rộng admin review flow từ shell logic sang lane vận hành đầy đủ hơn.
* `QUEUE` Thêm evidence packet riêng cho app bilingual metadata/noindex/access matrix.

### 3.5 Team 1 kết luận hiện tại

App member runtime không còn ở giai đoạn ý tưởng. Lane này đang ở trạng thái:

`DONE_CLOSED` (P0 đã chốt cho cycle hiện tại)

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
* `DONE` Ap Team đã nộp current-state report + matrix + evidence packet theo format Team 1.
* `DONE` Check nội bộ Ap route/sitemap/robots:
  * `node scripts/check-content-routes.mjs` -> `PASS`

### 4.3 P0 blocked

* `NONE` ở lớp intake submission.
* `NONE` ở lớp review P0 cycle hiện tại.

### 4.4 P1 queue

* `QUEUE` Chuẩn hóa publish gate song ngữ cho editorial content.
* `QUEUE` Mở rộng regression cho title/meta/alt text/caption theo locale.
* `QUEUE` Gom release evidence packet riêng cho Ap editorial.

### 4.5 Team 1 kết luận hiện tại

Ap editorial đã được Team 1 chốt verdict cho cycle hiện tại. Lane này đang ở trạng thái:

`PASS_WITH_QUEUE`

---

## 5. Tổng hợp nhanh

### 5.1 P0 done toàn cục

* Bộ chuẩn universal đã được kích hoạt cho Om và Ap.
* Ranh giới Om / App / Ap đã được khóa lại bằng văn bản.
* Om public đã có nền release evidence mạnh từ các đợt live trước.
* App runtime đã có baseline evidence và spec member flow/dashboard đã khóa.

### 5.2 P0 blocked toàn cục

* `NONE` cho cycle hiện tại.

### 5.3 P1 queue toàn cục

* route inventory matrix đầy đủ cho cả 3 lane
* bilingual metadata matrix đầy đủ
* alt text / image audit matrix
* release evidence packet theo surface

---

## 6. Điều Team 1 yêu cầu ngay

* Ap Team tiếp tục P1 queue: live-domain probe packet + visual evidence packet.
* Team 2 tiếp tục P1 hardening tại lane Om: alt/caption expansion + bilingual/English leakage regression.

Không team nào được tự đổi trạng thái `DONE` trong board này nếu chưa attach evidence phù hợp.

---

## 7. Definition of done cho board này

Board chỉ được xem là xanh khi:

* cả 3 lane đều có report current-state theo format mới
* Team 1 đã review và chốt lại `P0 done / P0 blocked / P1 queue`
* mỗi lane đều có evidence path rõ
* không còn lane nào claim done bằng miệng
