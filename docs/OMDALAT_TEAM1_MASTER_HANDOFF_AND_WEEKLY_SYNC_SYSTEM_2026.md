# OMDALAT_TEAM1_MASTER_HANDOFF_AND_WEEKLY_SYNC_SYSTEM_2026

## Om Dalat / Ôm Đà Lạt

Team 1 Master Handoff and Weekly Sync System

Version: LOCKED  
Status: Production-ready  
Date updated: 2026-04-17  
Owner: Team 1  
Scope: Team 1 coordination, handoff, review, change control, weekly sync, dependency tracking

---

## 0. Muc dich cua file nay

Team 1 khong phai team "lam tat ca".  
Team 1 la team giu logic nen, ngon ngu, kien truc, noi dung, SEO va dinh huong san pham cho toan he Om Dalat.

File nay dung de:

- giao viec dung cho Team 2 va Team 3
- kiem soat thay doi
- tranh lech brand, lech route, lech access model
- tao nhip bao cao deu
- xu ly blocker cheo giua 3 team
- giu mot nguon chan ly duy nhat

---

## 1. Vai tro chinh thuc cua Team 1

Team 1 chiu trach nhiem cho:

- dinh vi he
- language codex
- information architecture
- homepage logic
- content system
- SEO structure
- Content SOP gate
- Image Reality gate
- membership access logic o cap san pham
- handbook access logic
- UX copy
- QA ngon ngu va logic

Team 1 khong truc tiep chiu trach nhiem cho:

- frontend implementation chi tiet
- animation
- component library implementation
- backend auth implementation
- middleware implementation
- database migrations
- internal tooling code

Team 1 co quyen chot o cac lop sau:

- brand wording
- page purpose
- route meaning
- CTA wording
- role naming
- access level meaning
- SEO title/meta standards
- public/member/internal boundary

---

## 2. Team map tong the

### Team 1

Foundation, Content, SEO, Product Logic

### Team 2

Design, Frontend, Public Web

### Team 3

CMS, Member System, Backend, Ops Tools

---

## 3. Nguyen tac phoi hop bat buoc

### 3.1 Mot nguon chan ly

Moi quyet dinh nen phai bam vao:

- file master
- language codex
- access model
- routing spec
- UX/UI screen spec
- editorial master
- Content SOP: `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- Team change notice: `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`

Khong co "ban rieng" cua tung team.

### 3.2 Khong doi nghia khi handoff

Team 2 va Team 3 co the:

- toi uu cach build
- de xuat cai thien flow
- phan bien neu spec khong thuc te

Nhung khong duoc tu y:

- doi brand wording
- doi role name
- doi CTA chinh
- doi phan lop access
- doi muc dich page

### 3.3 Moi thay doi phai duoc log

Khong chot mieng.  
Khong sua am tham.  
Khong day thay doi ma Team 1 khong biet neu thay doi do anh huong:

- public copy
- access logic
- route logic
- SEO
- Content SOP
- image reality
- member gating
- user flow

---

## 4. Team 1 handoff system

### 4.1 Handoff la gi

Handoff la tai lieu hoac quyet dinh Team 1 ban giao cho Team 2 hoac Team 3 de build, voi muc tieu:

- du ro de code
- du khoa de khong lech
- du thuc de khong gay tac nghen

### 4.2 Mot handoff hoan chinh phai co

- ten deliverable
- muc tieu
- pham vi
- phan bat buoc
- phan co the linh hoat
- dependencies
- acceptance criteria
- owner phia Team 1
- owner nhan phia Team 2 hoac Team 3
- deadline review
- version

### 4.3 Handoff levels

#### Level A - Locked

Khong duoc doi logic, chi duoc build dung.

#### Level B - Guided

Giu logic, co the de xuat toi uu implementation.

#### Level C - Exploratory

Cho phep team nhan de xuat them truoc khi build.

### 4.4 Quy tac dung level

- brand, IA, access, CTA, route = Level A
- UX layout, CMS mapping, screen logic = Level B
- tien ich phu, micro-interactions, dashboard enhancements = Level C

---

## 5. Form giao viec chuan cua Team 1

`TEAM1_HANDOFF_FORM`

1. Ten handoff  
Vi du: Homepage Hero Rewrite v1

2. Team nhan  
Team 2 / Team 3 / Both

3. Owner Team 1  
Ten nguoi phu trach logic

4. Loai handoff  
Locked / Guided / Exploratory

5. Muc tieu  
Mo ta 2-4 cau ngan

6. Vi sao viec nay quan trong  
Anh huong toi:

- brand
- UX
- SEO
- access
- onboarding
- conversion

7. Pham vi phai lam  
Liet ke ro nhung gi nam trong scope

8. Ngoai pham vi  
Liet ke ro nhung gi khong lam trong ticket nay

9. Inputs bat buoc  
Các file hoac quyet dinh nen phai doc truoc

10. Output mong muon  
Vi du:

- page HTML/React implementation
- CMS schema
- member gate screen
- locale JSON keys

11. Nhung phan khong duoc thay doi  
Vi du:

- H1
- CTA wording
- role names
- access levels

12. Nhung phan co the linh hoat  
Vi du:

- spacing
- component structure
- field grouping
- internal naming in code

13. Acceptance criteria  
Checklist pass/fail

14. Dependencies  
Can team nao ban giao truoc

15. Deadline build  
Ngay build xong

16. Deadline review Team 1  
Ngay Team 1 review

17. Ghi chu rui ro  
Noi ro neu build sai se lech gi

---

## 6. Form review cua Team 1

`TEAM1_REVIEW_FORM`

1. Ten deliverable duoc review

2. Team gui review

3. Reviewer Team 1

4. Ket qua review

- Pass
- Pass with fixes
- Needs revision
- Rejected

5. Review theo 5 lop

### A. Brand & language

- dung codex khong
- co lech giong khong
- co dung tu cam khong

### B. Structure & IA

- page dung muc tieu khong
- route dung khong
- CTA dung vi tri khong

### C. UX logic

- flow co ro khong
- co du buoc khong
- co gay hieu sai khong

### D. SEO/content logic

- H1 dung chua
- meta dung chua
- internal links co hop ly khong
- canonical/hreflang co bi quen khong

### E. Access / visibility

- public/member/internal co bi lan khong
- gate copy dung chua
- noindex co can ap khong

6. Nhung gi pass

7. Nhung gi can sua

8. Muc do uu tien cua phan sua

- P0
- P1
- P2

9. Co can sync cheo voi team khac khong

- Yes / No

10. Quyet dinh cuoi

- Merge
- Fix then merge
- Rework

---

## 7. Form chot thay doi

`TEAM1_CHANGE_CONTROL_FORM`

Dung khi co thay doi anh huong mot trong cac lop:

- brand
- route
- access
- CTA
- metadata
- member progression
- CMS schema co tac dong UI/content

1. Ten thay doi

2. Nguoi de xuat

- Team 1 / Team 2 / Team 3

3. Ly do thay doi

4. Hien trang dang dung

5. De xuat moi

6. Anh huong toi

- Public web
- Member area
- CMS
- SEO
- i18n
- reporting
- QA

7. Team nao bi anh huong

- Team 1
- Team 2
- Team 3

8. Co pha backward compatibility khong

- Yes / No

9. Neu khong doi thi rui ro gi

10. Neu doi thi can lam gi

- copy updates
- route redirects
- CMS migration
- component update
- locale key update
- QA retest

11. Quyet dinh

- Approved
- Approved with conditions
- Deferred
- Rejected

12. Nguoi chot

- Team 1 lead
- hoac quyet dinh chung trong weekly sync

---

## 8. Form bao cao tuan cua Team 1

`TEAM1_WEEKLY_REPORT_FORM`

Tuan:  
Ngay bao cao:  
Owner:

1. Nhung gi Team 1 da hoan thanh tuan nay

- file nao da khoa
- spec nao da chot
- copy nao da pass
- review nao da xong

2. Nhung gi Team 1 dang lam

- cac file dang soan
- phan nao dang cho input
- phan nao dang sua theo feedback

3. Nhung blocker hien tai

- blocker tu Team 2
- blocker tu Team 3
- blocker tu decision chua chot

4. Nhung thay doi can chot trong tuan

- route
- CTA
- access
- CMS fields
- member copy
- SEO title/meta

5. Nhung rui ro neu khong xu ly

- lech brand
- lech flow
- SEO loi
- content publish sai
- member gating lan lop

6. Phan Team 1 ban giao tuan nay

- handoff nao cho Team 2
- handoff nao cho Team 3

7. Nhung phan Team 1 dang cho team khac

- tu Team 2
- tu Team 3

8. Trang thai tong quat

- Green
- Yellow
- Red

9. De xuat cho weekly sync

- muc nao can uu tien chot ngay
- muc nao co the de sprint sau

---

## 9. Weekly sync system

### 9.1 Muc tieu cua weekly sync

- khong phai de doc lai status
- khong phai de bao cao hinh thuc
- la de chot cac diem co anh huong cheo

### 9.2 Tan suat

- 1 buoi/tuan
- 45-60 phut
- dung gio, dung agenda

### 9.3 Thanh phan

- Team 1 lead
- Team 2 lead
- Team 3 lead
- co the them owner cua ticket blocker neu can

### 9.4 Agenda chuan

#### Phan 1 - Team 1

- nhung gi da khoa moi
- co thay doi nen nao khong
- co thay doi codex/IA/access khong

#### Phan 2 - Team 2

- demo public pages / UI states
- blocker tu copy hoac logic
- diem nao can Team 1 chot

#### Phan 3 - Team 3

- demo member/app/access states
- blocker tu role/access/CMS
- diem nao can Team 1 chot

#### Phan 4 - Quyet dinh tuan

- chot cac change requests
- xac dinh P0/P1/P2 cho tuan sau
- xac nhan dependencies

#### Phan 5 - Handoff tuan sau

- Team 1 se ban giao gi
- Team 2 can gi
- Team 3 can gi

---

## 10. Weekly sync minutes template

`WEEKLY_SYNC_MINUTES`

Tuan:  
Ngay:  
Thoi luong:  
Thanh phan tham gia:

1. Nhung gi da xong tu tuan truoc

- ...

2. Nhung gi chua xong

- ...

3. Van de cheo giua cac team

- ...

4. Quyet dinh da chot

- ...

5. Viec chuyen sang tuan toi

- ...

6. Owner cua tung viec

- Team 1:
- Team 2:
- Team 3:

7. Risk notes

- ...

---

## 11. Ma tran phu thuoc giua 3 team

### 11.1 Team 2 phu thuoc Team 1 o dau

- homepage copy
- page structure
- CTA wording
- SEO meta standards
- locale content keys
- route naming
- article editorial logic

### 11.2 Team 3 phu thuoc Team 1 o dau

- access levels
- role names
- gate screen copy
- member resource boundaries
- handbook layer rules
- noindex/index logic

### 11.3 Team 1 phu thuoc Team 2 o dau

- biet gioi han UI thuc te
- phan hoi khi spec qua nang
- phat hien van de mobile/responsive
- xac nhan implementation co giu duoc meaning khong

### 11.4 Team 1 phu thuoc Team 3 o dau

- phan hoi khi access model kho build
- bao cac edge cases cua auth/roles
- canh bao neu CMS schema chua du
- xac nhan route protection thuc te

### 11.5 Team 2 phu thuoc Team 3 o dau

- member state rendering
- logged-in vs guest state
- dashboard states
- gated resource cards

### 11.6 Team 3 phu thuoc Team 2 o dau

- UI components
- gate screen layouts
- dashboard shell
- form UI patterns

---

## 12. Dependency matrix

| Deliverable | Team 1 | Team 2 | Team 3 | Ghi chu |
| --- | --- | --- | --- | --- |
| Homepage rewrite | Owner | Build | Aware | Team 2 khong doi wording |
| Public pages | Review | Owner | Aware | Team 3 can biet CTA sang member |
| 30 articles | Owner | Render/UI | CMS feed | CMS phai ho tro slug/meta |
| Member access model | Owner | UI states | Owner build logic | Joint review |
| Member dashboard | Review | UI support | Owner | Team 1 review copy |
| Handbook access | Owner | UI states | Owner build logic | Noindex bat buoc |
| i18n/hreflang | Owner | UI locale | Locale routing/data | Joint QA |

---

## 13. Escalation rules

### Khi nao phai escalate len Team 1 lead

- wording public bi doi nghia
- CTA bi thay trai spec
- route bi doi ma khong co redirect logic
- role/access bi doi semantic
- SEO title/meta bi thay khong bao
- member/public boundary bi lan

### Khi nao Team 1 phai lang nghe phan bien

- spec khong build duoc
- spec qua nang so voi sprint
- UI thuc te cho thay logic hien tai gay hieu sai
- CMS schema thieu truong can thiet
- access model tao edge case lon

---

## 14. Quy tac versioning

Moi file Team 1 ban giao phai co:

- ten file
- version
- status
- date updated
- owner

### Version rule

- thay chu nho, khong doi logic: tang patch
- thay logic co anh huong build: tang minor
- thay dinh huong lon: tang major

Vi du:

- v1.0.0 = ban khoa dau
- v1.0.1 = sua wording nho
- v1.1.0 = them truong CMS hoac chinh flow
- v2.0.0 = doi route strategy

---

## 15. Handoff acceptance checklist

Team 1 chi xem handoff la "da ban giao xong" khi:

- file da ro
- team nhan xac nhan da doc
- dependencies da neu
- acceptance criteria da co
- owner review da gan
- khong con cho "doan"

---

## 16. Sprint-based Team 1 execution

### Sprint 1

- khoa homepage rewrite
- khoa access model
- khoa i18n/hreflang plan

### Sprint 2

- khoa 30 bai editorial
- khoa UX/UI screen spec
- khoa ops handbook access strategy

### Sprint 3

- review build cua Team 2
- review access logic cua Team 3
- chinh copy va criteria theo thuc te

### Sprint 4

- khoa release QA
- kiem lai consistency toan he
- chuan bi content/member resources mo dau

---

## 17. Team 1 weekly priorities board

### P0

- brand / naming / route / access / SEO critical

### P1

- UX wording
- internal linking
- dashboard labels
- member teaser copy

### P2

- microcopy
- secondary pages
- supporting article updates

---

## 18. Reporting colors

### Green

- khong co blocker cheo
- handoff ro
- build dung huong

### Yellow

- co blocker nhung chua vo sprint
- co change request can chot

### Red

- lech logic nen
- build sai codex
- access/public/member lan lop
- route/SEO breakage risk cao

---

## 19. Team 1 review SLA goi y

- review handoff moi: trong 24-48 gio
- review deliverable build xong: trong 48 gio
- review P0 change request: trong ngay lam viec
- review P2 wording: gom theo weekly sync

---

## 20. Cau chot cua Team 1

Team 1 khong co nhiem vu lam thay Team 2 va Team 3.  
Team 1 co nhiem vu giu cho 3 team cung xay mot he, khong thanh 3 phien ban khac nhau.

---

## 21. Current sprint assignment

Sprint dang chay hien tai la:

`Sprint Public Cleanup + Homepage Live Prep`

### Team 1

- dọn toan bo dau vet he cu tren public live
- rewrite homepage theo brand Om Dalat / Ôm Đà Lạt
- chot lai menu, CTA, metadata, wording va user flow cong khai
- xu ly build blocker P0 anh huong den public surface
- review cac handoff lien quan tu Team 2 va Team 3

### Team 2

- dung skeleton `/member`
- dung login/register/gate state UI shell
- dong bo member teaser, dashboard shell va gate screen voi Team 1
- giu phan public UI tai muc support trong sprint nay, khong doi logic nen

### Team 3

- chot CMS schema, content seed va taxonomy
- chot member resource schema, handbook mapping va access fields
- dong bo role/access contract voi Team 1 va Team 2
- chuan bi data de homepage, articles va member area render dung

### Rule

Current sprint assignment khong thay doi base role ownership.  
No chi xac dinh ai dang dung ten o P0/P1 trong sprint hien tai.

---

## 22. Definition of done

- giao viec ro
- review dung
- chot thay doi co log
- bao cao tuan nhat quan
- quan ly phu thuoc giua 3 team
- tranh lech logic toan he
