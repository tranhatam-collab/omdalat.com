# OMDALAT APDALAT TEAM EXECUTION SPLIT 2026

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Team Execution Split

Version: LOCKED  
Status: Production-ready  
Scope: Team 1, Team 2, Team 3 execution ownership for the Om Dalat ↔ Ap Dalat rollout

## 0. Mục tiêu

File này tách checklist triển khai thành việc cụ thể cho 3 team để:

- không chồng chéo
- không bỏ sót
- không ai tự đổi vai trò của 2 site
- có thể review và báo cáo theo cùng một cấu trúc

## 1. Câu khóa cho cả 3 team

- `omdalat.com` là nơi tham gia hệ
- `ap.omdalat.com` là nơi cảm được Đà Lạt

Không team nào được làm mờ đường ranh này.

## 2. Team 1

### 2.1 Vai trò

Team 1 giữ:

- brand logic
- language codex
- SEO boundary
- content boundary
- linking rules
- release gate

### 2.2 Việc phải làm

1. Khóa copy bridge block trên homepage:
   - `Ấp Đà Lạt`
   - `Những con người, nơi chốn và nhịp sống làm nên Đà Lạt hôm nay.`
   - `Mở Ấp Đà Lạt`

2. Khóa copy footer:
   - `Ấp Đà Lạt / Ap Dalat`

3. Khóa rule contextual CTA:
   - page nào được dẫn sang `ap`
   - page nào không được dẫn sang `ap`

4. Khóa SEO boundary:
   - keyword của `om`
   - keyword của `ap`
   - title / canonical / intent không trùng

5. Review toàn bộ text public trước deploy

6. Chốt release gate cuối:
   - cleanup legacy
   - bridge block
   - footer
   - contextual linking
   - QA pass

### 2.3 Deliverables

- `OMDALAT_TO_APDALAT_PRESENCE_AND_LINKING_RULES_2026.md`
- `OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`
- file review cuối cho launch

## 3. Team 2

### 3.1 Vai trò

Team 2 giữ:

- UI public
- homepage implementation
- footer implementation
- contextual linking UI
- responsive QA

### 3.2 Việc phải làm

1. Dọn bề mặt homepage hiện tại:
   - bỏ CTA `OMDALA`
   - bỏ block `Docs / Help`
   - bỏ link `docs.omdala.com`
   - bỏ link `app.omdala.com`

2. Thêm bridge block `Ấp Đà Lạt` trên homepage

3. Thêm footer link `Ấp Đà Lạt / Ap Dalat`

4. Không đưa `ap` vào menu chính nếu menu chưa rebuild xong

5. Thêm CTA contextual ở các page phù hợp:
   - nhịp sống
   - nơi chốn
   - cảm hứng sống
   - câu chuyện

6. Không thêm CTA `ap` ở:
   - hero
   - join flow
   - member flow
   - dashboard

7. QA desktop và mobile:
   - block không lạc vai trò
   - CTA không chen luồng tham gia
   - footer không quá nặng

### 3.3 Deliverables

- homepage updated
- footer updated
- contextual CTA components
- UI QA note

## 4. Team 3

### 4.1 Vai trò

Team 3 giữ:

- config domain
- environment
- build and deploy
- SEO runtime config
- analytics and tracking
- post-launch monitoring

### 4.2 Việc phải làm

1. Khóa config domain:
   - `https://omdalat.com`
   - `https://ap.omdalat.com`

2. Tạo constants dùng chung:

```ts
const AP_DALAT_URL = "https://ap.omdalat.com";
const OM_DALAT_URL = "https://omdalat.com";
```

3. Kiểm canonical:
   - `om` canonical riêng
   - `ap` canonical riêng
   - không canonical chéo

4. Kiểm robots và sitemap:
   - page public index
   - page protected noindex
   - sitemap tách rõ nếu cần

5. Gắn tracking:
   - click `om -> ap`
   - click `ap -> om`
   - click bridge block
   - click footer
   - click contextual CTA

6. Chốt lệnh build và deploy

7. Chuẩn bị rollback plan

8. Chuẩn bị post-launch check 24 giờ và 72 giờ

### 4.3 Deliverables

- config domain
- SEO runtime check
- tracking events
- deploy runbook
- rollback note

## 5. Thứ tự làm chuẩn

### Giai đoạn 1

Team 2:

- cleanup homepage
- cleanup footer

Team 1:

- review cleanup pass / fail

Team 3:

- verify config và SEO runtime không còn link cũ

### Giai đoạn 2

Team 2:

- build bridge block
- build footer link

Team 1:

- review wording
- review role clarity

Team 3:

- gắn tracking

### Giai đoạn 3

Team 2:

- build contextual CTA

Team 1:

- approve page list được phép cross-link

Team 3:

- verify analytics events

### Giai đoạn 4

Team 3:

- build and deploy
- launch smoke

Team 1:

- final release gate

Team 2:

- UI smoke

## 6. Cách báo cáo của mỗi team

### Team 1 báo cáo

- đã khóa file nào
- đã review phần nào
- phần nào chưa pass

### Team 2 báo cáo

- page nào đã cleanup
- block nào đã gắn
- CTA nào đã thêm
- UI nào còn lệch

### Team 3 báo cáo

- domain/config đã sẵn chưa
- build pass chưa
- tracking pass chưa
- deploy blocker là gì

## 7. Definition of done

Execution split được xem là hoàn chỉnh khi:

- mỗi team có scope rõ
- không có 2 team cùng làm một logic nền
- việc deploy có owner rõ
- review có owner rõ
- launch có thứ tự rõ

## 8. Câu chốt

Team 1 giữ nghĩa.  
Team 2 giữ bề mặt.  
Team 3 giữ hạ tầng.  

Nếu cả 3 cùng giữ đúng vai trò, `omdalat.com` và `ap.omdalat.com` sẽ hỗ trợ nhau thay vì làm loãng nhau.
