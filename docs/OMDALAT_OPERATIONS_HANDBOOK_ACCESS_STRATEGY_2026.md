# OMDALAT_OPERATIONS_HANDBOOK_ACCESS_STRATEGY_2026

## Om Dalat / Ôm Đà Lạt

Operations Handbook Access Strategy

Version: LOCKED  
Status: Production-ready  
Scope: public handbook, member handbook, internal operations

---

## 0. Mục tiêu

Sổ tay vận hành không nên công khai toàn bộ.  
Nhưng cũng không nên giấu hết.

Cần chia làm 3 lớp:

- public handbook
- member handbook
- internal handbook

Mục tiêu là:

- người mới hiểu được nguyên tắc
- thành viên hiểu được kỳ vọng
- đội vận hành có SOP thật để làm

---

## 1. Public handbook

### 1.1 Vai trò

Giúp người bên ngoài hiểu:

- nơi này vận hành như thế nào ở mức nền
- cộng đồng có kỷ luật ra sao
- ai phù hợp và không phù hợp

### 1.2 Nội dung public nên có

#### A. Nguyên tắc chung

- không drama
- không toxic
- không giả
- không nói cho vui rồi bỏ đó
- tôn trọng nhịp chung

#### B. Quy tắc sống

- giữ không gian sạch
- đúng giờ ở mức cơ bản
- không ảnh hưởng người khác
- tự quản lý sinh hoạt cá nhân
- tôn trọng sự yên tĩnh khi cần

#### C. Quy tắc làm việc

- có output
- có deadline
- có trách nhiệm
- nói rõ khi không làm được
- không tạo áp lực giả bằng lời nói nhiều

#### D. Quy tắc cộng đồng

- tôn trọng
- không phán xét
- không ép người khác
- không kiểm soát đời sống riêng của người khác
- góp ý đúng lúc, đúng cách

#### E. Quy trình người mới

- gửi hồ sơ
- phỏng vấn hoặc trao đổi cơ bản
- trial 7 ngày nếu phù hợp
- review trước khi ở lại dài hơn

#### F. Lịch hoạt động tuần mẫu

- Thứ 2-6: làm việc
- Thứ 7: chia sẻ, review, dọn lại nhịp
- Chủ nhật: nghỉ, hồi phục, sinh hoạt nhẹ

### 1.3 Format public

- page public trong `/docs`
- hoặc page `/vi/handbook`
- chia thành accordion hoặc section ngắn
- dễ đọc trên mobile

---

## 2. Member handbook

### 2.1 Vai trò

Dành cho người đã đăng ký và đang tiến gần hơn tới việc tham gia thật.

### 2.2 Nội dung member nên có

#### A. Trial 7 ngày

- mục đích trial
- kỳ vọng trong 7 ngày
- những điều được quan sát
- những điều người mới cần tự quan sát về mình

#### B. Checklist từng ngày

Ngày 1:

- làm quen không gian
- hiểu lịch cơ bản
- gặp người phụ trách

Ngày 2-3:

- bắt đầu nhịp làm việc
- quan sát cách cộng đồng hoạt động
- tự sắp góc sống và góc làm

Ngày 4-5:

- có output đầu tiên
- tham gia một buổi chia sẻ hoặc review ngắn

Ngày 6-7:

- tự đánh giá
- nhận phản hồi
- quyết định bước tiếp theo

#### C. Review tuần

- tuần này bạn đã làm gì
- bạn có giữ nhịp được không
- bạn có ảnh hưởng xấu tới người khác không
- bạn có cần điều chỉnh gì không

#### D. Tiêu chuẩn ở lại

- có trách nhiệm
- giữ nhịp
- có đóng góp
- không gây rối
- có thể sống cùng người khác trong tôn trọng

#### E. Red flags

- nói nhiều nhưng không làm
- đẩy cảm xúc sang người khác liên tục
- không chịu trách nhiệm
- gây ảnh hưởng xấu đến nhịp chung
- thiếu trung thực cơ bản

### 2.3 Access

Chỉ mở cho:

- registered member một phần
- reviewed member đầy đủ hơn

---

## 3. Internal handbook

### 3.1 Vai trò

Đây là tài liệu để operator và core team vận hành thật mỗi ngày.

### 3.2 Nội dung internal phải có

#### A. SOP từng ngày

- mở ngày
- check không gian
- check các thành viên mới
- check công việc hôm nay
- check tình hình sinh hoạt
- đóng ngày

#### B. Onboarding script

- chào người mới
- giới thiệu quy tắc
- cách trả lời câu hỏi nhạy cảm
- cách nói khi một người không phù hợp

#### C. Escalation matrix

- vi phạm nhẹ
- vi phạm lặp lại
- hành vi độc hại
- xử lý khi có xung đột
- khi nào phải dừng participation

#### D. Moderation handling

- ghi nhận sự việc
- ai là người xử lý
- thời hạn phản hồi
- cách lưu note nội bộ

#### E. Review templates

- review thành viên tuần đầu
- review hàng tháng
- review khi chuẩn bị ở lại dài hơn
- review khi có dấu hiệu lệch nhịp

#### F. Operator responsibilities

- leader
- ops
- community lead
- content lead
- dev support

### 3.3 Access

Chỉ internal và admin.

---

## 4. Route strategy

### Public

- `/docs/community-rules`
- `/docs/how-it-works`
- `/docs/getting-started`
- `/vi/faq`

### Member

- `/member/handbook`
- `/member/operations`
- `/member/trial-guide`

### Internal

- `/internal/ops-handbook`
- `/internal/onboarding-scripts`
- `/internal/escalation`
- `/internal/review-templates`

---

## 5. CMS schema for handbook

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "access_level": "guest|registered|reviewed|internal|admin",
  "section_type": "rules|trial|review|sop|script|escalation",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "status": "draft|published"
}
```

---

## 6. UI strategy for handbook

### Public handbook UI

- sections ngắn
- dễ đọc
- icon nhẹ nếu cần
- không dùng cảm giác `legal wall`

### Member handbook UI

- card + checklist
- có trạng thái hoàn thành nếu cần
- ngôn ngữ gần hơn nhưng vẫn rõ

### Internal handbook UI

- table of contents
- search
- tags
- versioning
- updated by / last updated

---

## 7. Search and discoverability rules

### Public handbook

- indexable
- nằm trong sitemap nếu public
- internal links từ homepage, join, faq

### Member handbook

- noindex
- searchable sau login

### Internal handbook

- noindex
- không lộ URL trên public UI
- cần guard chặt

---

## 8. Reporting model

### Weekly internal report

Mỗi tuần operator cập nhật:

- số người mới
- số người đang trial
- số người tiếp tục ở lại
- issue phát sinh
- red flags
- đề xuất điều chỉnh

### Monthly synthesis

- nhịp sống có ổn không
- công việc có đi đều không
- cộng đồng có căng không
- cần thay đổi quy tắc nào không

---

## 9. Definition of done

Handbook access strategy được xem là hoàn thành khi:

- public/member/internal chia rõ
- route map rõ
- CMS schema rõ
- operator biết cái gì public, cái gì không
- dev biết cái gì noindex, cái gì index
- UI cho 3 lớp khác nhau đã có logic rõ
