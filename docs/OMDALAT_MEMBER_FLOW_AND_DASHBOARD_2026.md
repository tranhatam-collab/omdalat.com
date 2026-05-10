Ôm Đà Lạt / Om Dalat

Member Flow + Dashboard System

Version: LOCKED

Status: Ready for DEV

⸻

0. Mục tiêu

Sau khi người dùng bấm “Tham gia”, hệ không được chỉ đưa họ vào một form rồi kết thúc.

Hệ phải dẫn họ đi qua một hành trình rõ:

Đọc → Đăng ký → Gửi hồ sơ → Được xem xét → Thử 7 ngày → Ở lại / Không phù hợp → Tiếp tục tạo giá trị

Dashboard phải giúp mỗi người biết:

* mình đang ở bước nào
* cần làm gì tiếp theo
* có thể ở đâu
* có thể làm việc gì
* có thể học gì
* có thể đóng góp gì
* tài liệu nào đã mở
* thu nhập hoặc cơ hội nào đang có

⸻

1. Các trạng thái thành viên

guest
registered
profile_pending
under_review
trial
active_member
contributor
host_partner
operator
admin

Ý nghĩa

guest
Người chưa đăng ký.

registered
Người đã tạo tài khoản.

profile_pending
Đã đăng ký nhưng chưa hoàn tất hồ sơ.

under_review
Đã gửi hồ sơ, đang được xem xét.

trial
Được thử 7 ngày.

active_member
Được ở lại hoặc tham gia thường xuyên.

contributor
Có thể nhận task, viết bài, chụp ảnh, làm nội dung, làm dự án.

host_partner
Chủ nhà, chủ Ấp, chủ không gian.

operator
Người vận hành hệ.

admin
Quản trị toàn quyền.

⸻

2. Luồng tham gia

Step 1: User bấm “Tham gia”

Route:

/vi/join
/en/join

Nội dung phải nói rõ:

* đây không phải form booking
* đây là bước đầu để hiểu người tham gia
* không phải ai cũng phù hợp
* hồ sơ sẽ được đọc kỹ

CTA:

Gửi hồ sơ cơ bản
Send a basic application

⸻

3. Form hồ sơ cơ bản

Route:

/app/apply

Fields bắt buộc

{
  "full_name": "",
  "email": "",
  "phone_or_contact": "",
  "current_location": "",
  "why_dalat": "",
  "what_are_you_looking_for": "",
  "what_can_you_do": "",
  "skills": [],
  "work_status": "",
  "planned_stay_length": "",
  "portfolio_or_intro_link": "",
  "notes": ""
}

Copy submit thành công

VI:
Hồ sơ của bạn đã được ghi nhận. Chúng tôi sẽ đọc kỹ trước khi phản hồi.

EN:
Your application has been received. We will read it carefully before responding.

⸻

4. Dashboard chính

Route:

/app/dashboard

Dashboard gồm 7 khối.

⸻

4.1 Khối 1: Trạng thái hồ sơ

UI label

VI: Trạng thái của bạn
EN: Your status

Status cards

Hồ sơ mới tạo
Chưa hoàn tất hồ sơ
Đang được xem xét
Đang trong thời gian thử
Đã là thành viên
Có thể nhận việc
Đối tác không gian

⸻

4.2 Khối 2: Bước tiếp theo

Logic

Mỗi trạng thái chỉ hiển thị 1 hành động chính.

{
  "registered": "Hoàn tất hồ sơ",
  "profile_pending": "Gửi hồ sơ để được xem xét",
  "under_review": "Đọc hướng dẫn trong lúc chờ",
  "trial": "Xem lịch thử 7 ngày",
  "active_member": "Xem cơ hội đang mở",
  "contributor": "Nhận task phù hợp",
  "host_partner": "Cập nhật hồ sơ Ấp"
}

⸻

4.3 Khối 3: Nơi ở

Route:

/app/stay

Hiển thị:

* loại chỗ ở
* khu vực
* mức giá
* còn chỗ hay không
* điều kiện
* ghi chú

Fields

{
  "space_name": "",
  "type": "dorm|private|shared_house|studio|ap_node",
  "area": "",
  "monthly_price": "",
  "capacity": "",
  "available_from": "",
  "house_rules": "",
  "status": "available|waiting|full"
}

CTA:

Gửi nhu cầu ở lại
Send stay request

⸻

4.4 Khối 4: Công việc và cơ hội

Route:

/app/work

Hiển thị:

* task nội bộ
* việc freelance
* việc online
* dự án cộng tác
* việc từ các Ấp thật

Work item schema

{
  "title": "",
  "type": "internal_task|freelance|remote|local_partner|content",
  "skills_required": [],
  "pay_type": "fixed|hourly|revenue_share|volunteer",
  "pay_range": "",
  "deadline": "",
  "owner": "",
  "status": "open|in_review|assigned|closed"
}

CTA:

Xem việc phù hợp
Apply for this work

⸻

4.5 Khối 5: Học từ thực tế

Route:

/app/learning

Không gọi là “khóa học” theo kiểu cũ.

Gọi là:

Chương trình thực địa
Real-life learning programs

Hiển thị:

* chương trình 7 ngày
* chương trình 14 ngày
* chương trình 30 ngày
* output cần hoàn thành
* người hướng dẫn
* chi phí nếu có

⸻

4.6 Khối 6: Tài nguyên đã mở

Route:

/app/resources

Theo quyền:

registered → hướng dẫn cơ bản
trial → trial guide
active_member → member handbook
contributor → contributor guide
host_partner → host guide
operator → ops handbook

⸻

4.7 Khối 7: Thu nhập và đóng góp

Route:

/app/earnings

Mục tiêu: giúp người dùng thấy mình đã tạo giá trị gì.

Hiển thị:

* task đã làm
* khoản đang chờ thanh toán
* khoản đã thanh toán
* đóng góp nội dung
* dự án tham gia
* review chất lượng

Earnings schema

{
  "member_id": "",
  "source": "task|content|work|program|place|product",
  "amount": 0,
  "currency": "VND",
  "status": "pending|approved|paid",
  "paid_at": "",
  "note": ""
}

⸻

5. Dashboard cho chủ Ấp / chủ không gian

Route:

/app/places

Chức năng

* tạo hồ sơ Ấp
* cập nhật ảnh
* thêm mô tả
* thêm loại không gian
* thêm giá tham khảo
* thêm quy tắc
* nhận inquiry
* xem trạng thái duyệt

Ap profile schema

{
  "place_name": "",
  "area": "",
  "type": "house|garden|studio|cafe|farm|work_corner|community_space",
  "story_vi": "",
  "story_en": "",
  "images": [],
  "capacity": "",
  "can_host_stay": true,
  "can_host_work": true,
  "can_host_event": false,
  "legal_notes": "",
  "status": "draft|under_review|published"
}

⸻

6. Dashboard cho contributor

Route:

/app/contributor

Dành cho:

* writer
* photographer
* video editor
* translator
* local researcher
* social content creator

Chức năng

* nhận bài
* upload bản nháp
* upload ảnh
* xem feedback
* xem nhuận bút
* xem trạng thái publish

⸻

7. Admin review flow

Route:

/admin/review

Admin có thể:

* xem hồ sơ mới
* chuyển status
* ghi note
* mở quyền member
* gán trial
* gán contributor
* gán host partner
* từ chối lịch sự

Review actions

Approve for trial
Request more info
Mark not suitable
Promote to active member
Promote to contributor
Promote to host partner

⸻

8. Access control

Public

/vi
/en
/vi/join
/vi/articles
/ap link

Login required

/app/dashboard
/app/profile
/app/resources
/app/work
/app/stay

Role required

/app/contributor
/app/places
/app/earnings
/admin

⸻

9. Member dashboard UI layout

Desktop

Left sidebar:
- Tổng quan
- Hồ sơ
- Nơi ở
- Công việc
- Học thực địa
- Tài nguyên
- Thu nhập
- Hỗ trợ
Main:
- status card
- next step card
- recommended actions
- latest resources

Mobile

Top status card
Next step button
Tabs:
- Hồ sơ
- Việc
- Ở
- Học
- Tài nguyên

⸻

10. UI microcopy

Empty work state

VI:
Chưa có việc phù hợp với hồ sơ của bạn lúc này.

EN:
There is no work matching your profile at the moment.

Waiting review

VI:
Hồ sơ của bạn đang được xem xét. Trong lúc chờ, bạn có thể đọc hướng dẫn cơ bản.

EN:
Your profile is under review. While waiting, you can read the basic guide.

Trial status

VI:
Bạn đang trong thời gian thử 7 ngày. Hãy giữ nhịp, quan sát và hoàn thành những việc nhỏ đã được giao.

EN:
You are in a 7-day trial period. Keep the rhythm, observe, and complete the small tasks assigned to you.

⸻

11. Database tables gợi ý

users
member_profiles
member_status_logs
stay_requests
work_items
work_applications
learning_programs
program_enrollments
resources
resource_access
earnings
places
place_inquiries
contributor_assignments
admin_notes

⸻

12. API endpoints gợi ý

POST /api/auth/register
POST /api/member/apply
GET  /api/member/me
PATCH /api/member/profile
GET  /api/work
POST /api/work/apply
GET  /api/stay
POST /api/stay/request
GET  /api/resources
GET  /api/earnings
POST /api/places
PATCH /api/places/:id
GET  /api/admin/review
POST /api/admin/review/:id/action

⸻

13. Metrics cần đo

* số người đăng ký
* số hồ sơ hoàn tất
* số hồ sơ được duyệt
* số người trial
* số người active
* số task được tạo
* số task hoàn thành
* tổng thu nhập tạo ra
* số Ấp được publish
* số inquiry từ Ap sang Om

⸻

14. Definition of done

Member flow + dashboard hoàn thành khi:

* user đăng ký được
* gửi hồ sơ được
* thấy trạng thái rõ
* admin review được
* member thấy bước tiếp theo
* work/stay/resources hiện theo quyền
* contributor có luồng riêng
* host có luồng riêng
* earnings có tracking cơ bản
* mobile dùng được tốt
* không có text vô cảm hoặc sai codex

⸻

15. Câu chốt

Dashboard không phải nơi trưng bày tính năng.

Dashboard là nơi một người nhìn thấy mình đang ở đâu, cần làm gì tiếp, và có thể tạo giá trị thật bằng cách nào.
