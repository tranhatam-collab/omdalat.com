# OMDALAT_3_TEAM_EXECUTION_AND_SYNC_MODEL_2026

## Om Dalat / Ôm Đà Lạt

3 Team Execution and Sync Model

Version: LOCKED  
Status: Production-ready  
Scope: 3-team delivery model for one shared system

---

## 0. Nguyên tắc chung

Có 3 team, nhưng chỉ có 1 hệ.  
Không được làm theo kiểu 3 nhánh tư duy khác nhau.

Câu khóa:

- Một định vị
- Một codex ngôn ngữ
- Một kiến trúc thông tin
- Một nhịp báo cáo
- Một nguồn chân lý

---

## 1. Vai trò 3 team

### Team 1 - Foundation, Content, SEO, Product logic

Đây là team giữ logic nền của toàn hệ.  
Trong kế hoạch này, Codex giữ vai trò Team 1.

Phụ trách:

- positioning
- language codex
- homepage logic
- content architecture
- SEO structure
- membership logic
- docs logic
- UX copy
- acceptance criteria

Output của Team 1:

- toàn bộ file spec
- copy hệ thống
- content plan
- routing logic
- access model
- QA chuẩn nội dung

### Team 2 - Design, Frontend, Public Web

Phụ trách:

- design system
- Figma implementation
- public pages
- article pages
- responsive behavior
- locale UI
- homepage, stay, work, learning, community, join
- public docs UI

Output của Team 2:

- design screens
- frontend components
- public rendering
- mobile QA
- accessibility QA

### Team 3 - CMS, Member, Backend, Ops Tools

Phụ trách:

- CMS collections
- member access control
- login/register
- dashboard
- gating middleware
- member resources
- internal ops structure
- data model
- notification basics

Output của Team 3:

- auth flow
- role logic
- CMS schemas
- member pages
- internal docs access
- app state and dashboards

---

## 2. Cách 3 team liên kết với nhau

### Team 1 -> Team 2

Team 1 đưa:

- copy chuẩn
- page structure
- UX logic
- SEO metadata
- text keys

Team 2 không tự đổi nghĩa.

### Team 1 -> Team 3

Team 1 đưa:

- access model
- resource levels
- CMS schema requirements
- gating copy
- role meanings

Team 3 không tự đổi role semantics.

### Team 2 <-> Team 3

Team 2 và Team 3 phối hợp để:

- UI của member area đúng với role logic
- public teaser đúng với CMS/resource schema
- dashboard hiển thị đúng state

---

## 3. Cơ chế báo cáo và cập nhật

### Daily async update

Mỗi team gửi 1 update ngắn theo mẫu:

- Hôm nay đã làm gì
- Đang chờ gì
- Có gì block
- Có gì ảnh hưởng team khác

### Weekly sync

1 buổi/tuần, 45-60 phút:

- Team 1 chốt logic không đổi
- Team 2 demo screens/public pages
- Team 3 demo member/CMS/backend logic
- chốt những điểm phải sửa chéo

### Single source of truth

Tất cả file spec nằm trong 1 thư mục docs chuẩn.  
Không ai dùng bản riêng ngoài luồng.

---

## 4. Thứ tự build chuẩn

### Giai đoạn 1: nền

Team 1:

- khóa spec
- khóa copy
- khóa routes
- khóa access model

Team 2:

- dựng design system
- dựng homepage + public pages

Team 3:

- dựng CMS schema
- dựng auth + roles

### Giai đoạn 2: public launch

Team 2:

- article pages
- FAQ
- join flow UI

Team 3:

- register/login
- member gating
- member dashboard v1

Team 1:

- nạp 30 bài content
- kiểm QA ngôn ngữ, SEO, CTA

### Giai đoạn 3: member layer

Team 3:

- member resources
- reviewed access
- internal docs structure

Team 2:

- member UI
- gate screens
- dashboard screens

Team 1:

- investor overview summary
- handbook summary
- member copy

---

## 5. Quy tắc không được phá

- Team 2 không tự đổi ngôn ngữ để `hay hơn`
- Team 3 không tự đổi role để `dễ code hơn`
- Team 1 không viết spec lệch khỏi thực tế build
- Không team nào tự thêm định vị mới
- Không team nào nhắc lại hệ cũ

---

## 6. Deliverables đầu tiên cho từng team

### Team 1

- `OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md`
- `OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md`
- `OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md`
- `OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md`
- `OMDALAT_UX_UI_SCREEN_SPEC_2026.md`
- `OMDALAT_OPERATIONS_HANDBOOK_ACCESS_STRATEGY_2026.md`

### Team 2

- design system v1
- homepage screens
- article screen
- stay/work/community/join screens
- member gate screen
- responsive QA pass

### Team 3

- CMS collections
- auth/register/login
- access middleware
- member dashboard v1
- member resources schema
- noindex rules

---

## 7. Báo cáo mẫu hằng tuần

### Team 1 report

- file spec nào đã khóa
- content nào đã sẵn sàng
- phần nào còn chờ Team 2 hoặc Team 3

### Team 2 report

- màn nào đã dựng
- màn nào còn thiếu copy hoặc logic
- bug UI nào ảnh hưởng Team 3

### Team 3 report

- auth/membership đã tới đâu
- CMS schema đã xong chưa
- route nào đã được guard
- member resources nào đã render được

---

## 8. Definition of done cho mô hình 3 team

Mô hình 3 team được xem là chạy đúng khi:

- Team 1 giữ đúng vai trò khóa logic
- Team 2 build public UI không lệch codex
- Team 3 build member/backend không lệch access model
- báo cáo tuần đều
- không có 2 nguồn chân lý khác nhau
- không có text public đi ngoài locale system
- không còn dấu vết hệ cũ

---

## 9. Trung tâm điều phối và sprint hiện tại

File điều phối vận hành chính của Team 1 là:

- `OMDALAT_TEAM1_MASTER_HANDOFF_AND_WEEKLY_SYNC_SYSTEM_2026.md`

Current sprint assignment:

### Team 1

- public cleanup trên code live
- homepage rewrite
- build blocker P0 ảnh hưởng public surface
- review và change control cho Team 2, Team 3

### Team 2

- skeleton `/member`
- gate screen và dashboard shell UI
- hỗ trợ các UI state cần cho member flow

### Team 3

- CMS schema
- content seed
- handbook/resource mapping
- access/data contracts cho member flow

Rule:

Current sprint assignment không thay đổi base role ownership đã khóa ở trên.  
Nó chỉ xác định ai đang giữ mũi triển khai chính trong sprint hiện tại.
