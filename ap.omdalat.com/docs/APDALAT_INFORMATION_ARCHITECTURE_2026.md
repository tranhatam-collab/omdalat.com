# APDALAT_INFORMATION_ARCHITECTURE_2026

Ấp Đà Lạt / Ap Dalat

Information Architecture

Version: LOCKED

Status: Production-ready

Scope: site map, route system, navigation, content hierarchy, linking rules

## 0. Mục tiêu

Kiến trúc thông tin của `ap.omdalat.com` phải giúp người dùng:

- hiểu ngay Ấp Đà Lạt là gì
- đi đúng lớp nội dung mình cần
- đọc theo chiều sâu mà không bị lạc
- luôn thấy mối liên hệ đúng với `omdalat.com`
- không nhầm site này là du lịch, homestay, hay một app công nghệ

IA của Ấp Đà Lạt phải:

- editorial-first
- image-rich
- SEO-friendly
- human-readable
- nhẹ, rõ, không rối

## 1. Vai trò của site trong toàn hệ

### 1.1 Ấp Đà Lạt là lớp gì

`ap.omdalat.com` là:

- lớp editorial
- lớp kể chuyện
- lớp bản sắc sống
- lớp con người và nơi chốn
- lớp hình ảnh và nhịp sống
- lớp SEO rộng của toàn hệ

### 1.2 Ấp Đà Lạt không làm gì

Không là:

- nơi đăng ký chính để tham gia hệ sống
- member dashboard
- app layer
- docs layer
- nơi nói sâu về vận hành nội bộ
- nơi public investor materials

### 1.3 Cầu nối đúng

`ap.omdalat.com` kéo người đọc vào cảm nhận và hiểu đúng.
`omdalat.com` đón người phù hợp để đi sâu hơn vào sống, ở lại, làm, học, cộng đồng.

## 2. Nguyên tắc IA

### 2.1 Rõ hơn là nhiều

Không mở quá nhiều section nhỏ từ đầu. Ưu tiên ít nhưng sâu.

### 2.2 Người dùng phải hiểu mình đang ở đâu

Mỗi page phải trả lời được:

- đây là section gì
- đang đọc loại nội dung gì
- tiếp theo nên đi đâu

### 2.3 Mỗi route phải có một mục đích rõ

Không có route chỉ để "có thêm page".

### 2.4 Category phải bền

Đặt category để dùng được 2-5 năm, không đặt theo campaign ngắn hạn.

## 3. Route system chuẩn

### 3.1 Root

- `/vi`
- `/en`

### 3.2 Primary sections tiếng Việt

- `/vi/con-nguoi`
- `/vi/noi-chon`
- `/vi/nhip-song`
- `/vi/lam-viec`
- `/vi/cau-chuyen`
- `/vi/hinh-anh`
- `/vi/about`

### 3.3 Primary sections tiếng Anh

- `/en/people`
- `/en/places`
- `/en/rhythms`
- `/en/work`
- `/en/stories`
- `/en/images`
- `/en/about`

### 3.4 Supporting routes

- `/vi/tim-kiem`
- `/vi/chu-de`
- `/vi/om-ap-da-lat`
- `/vi/faq`
- `/vi/lien-he`
- `/en/search`
- `/en/topics`
- `/en/om-ap-dalat`
- `/en/faq`
- `/en/contact`

## 4. Content object routes

### 4.1 Stories

- Vietnamese: `/vi/cau-chuyen/[slug]`
- English: `/en/stories/[slug]`

### 4.2 People profiles

- Vietnamese: `/vi/con-nguoi/[slug]`
- English: `/en/people/[slug]`

### 4.3 Place profiles

- Vietnamese: `/vi/noi-chon/[slug]`
- English: `/en/places/[slug]`

### 4.4 Photo essays

- Vietnamese: `/vi/hinh-anh/[slug]`
- English: `/en/images/[slug]`

## 5. Navigation system

### 5.1 Header nav tiếng Việt

- Trang chủ
- Con người
- Nơi chốn
- Nhịp sống
- Làm việc
- Câu chuyện
- Hình ảnh
- Về Ấp Đà Lạt

### 5.2 Header nav tiếng Anh

- Home
- People
- Places
- Rhythms
- Work
- Stories
- Images
- About

### 5.3 Utility nav

- VI / EN
- tìm kiếm
- tới Ôm Đà Lạt

### 5.4 Không thêm từ đầu

Không thêm ngay:

- Events
- Directory
- Marketplace
- Programs
- Membership
- App
- Docs

## 6. Homepage hierarchy

### 6.1 Thứ tự section chuẩn

1. Hero
2. Đây là gì
3. Con người
4. Nơi chốn
5. Nhịp sống
6. Làm việc từ Đà Lạt
7. Câu chuyện mới
8. Bộ ảnh nổi bật
9. Tới Ôm Đà Lạt
10. Footer

### 6.2 Lý do

Thứ tự đúng về cảm nhận:

- định nghĩa
- ai
- ở đâu
- sống ra sao
- làm việc thế nào
- đọc sâu
- nhìn sâu
- đi tiếp

## 7. Category architecture

### 7.1 Con người

Dùng cho:

- chân dung người
- nghề
- người dân địa phương
- người mới ở lại
- người làm việc online
- người mở nơi chốn

### 7.2 Nơi chốn

Dùng cho:

- góc ở
- góc làm
- xưởng nhỏ
- quán yên
- nhà kính
- vùng ven
- địa điểm giàu cảm giác sống

### 7.3 Nhịp sống

Dùng cho:

- thời tiết
- sáng/chiều/tối
- mưa
- mùa
- nhịp tuần
- nhịp ở lại lâu

### 7.4 Làm việc

Dùng cho:

- làm việc online
- freelance
- xưởng nhỏ
- studio
- công việc yên
- làm việc từ Đà Lạt ra thế giới

### 7.5 Câu chuyện

Dùng cho:

- long-form narrative
- essays
- nhật ký sống
- suy ngẫm giàu chất đọc

### 7.6 Hình ảnh

Dùng cho:

- photo essays
- visual stories
- series ảnh theo chủ đề
- bộ ảnh theo mùa, theo thời gian, theo nơi chốn

## 8. Internal linking logic

### 8.1 Từ homepage

Mỗi block homepage phải link tới:

- 1 category page
- 1 featured item
- 1 CTA chính

### 8.2 Từ article page

Mỗi bài phải link:

- 1 bài cùng category
- 1 bài khác category có liên quan
- 1 link sang `omdalat.com` nếu intent của bài chạm tới ở lại/làm/học/tham gia

### 8.3 Từ category page

Phải có:

- intro
- featured story
- latest items
- link sang section liên quan

### 8.4 Từ ap sang om

Chỉ đặt link sang `omdalat.com` ở các điểm có nghĩa:

- cuối bài về ở lại
- cuối bài về làm việc dài hạn
- block "từ đọc tới ở lại"
- about page

## 9. Search architecture

### 9.1 Search box

Nên có sau relaunch đầu:

- search by title
- category
- people
- place

### 9.2 Search intent

Các truy vấn chính:

- người
- nơi chốn
- ảnh
- Đà Lạt hôm nay
- làm việc
- sống

### 9.3 Search results UI

Hiển thị:

- title
- type
- excerpt
- locale-aware
- thumbnail nếu có

## 10. Tags and topics

### 10.1 Tag system

Cho phép tag nhưng không để tag lấn category.

Ví dụ tag:

- vùng ven
- buổi sáng
- mưa
- quán nhỏ
- góc làm việc
- người trẻ
- nhà kính
- Trại Mát
- studio
- căn nhà nhỏ

### 10.2 Topic pages

Có thể mở sau:

- `/vi/chu-de/trai-mat`
- `/vi/chu-de/goc-lam-viec`
- `/vi/chu-de/mua-o-da-lat`

## 11. Breadcrumb rules

### 11.1 Ví dụ tiếng Việt

- Trang chủ / Câu chuyện / Một ngày làm việc trong sương sớm Đà Lạt
- Trang chủ / Nơi chốn / Một căn nhà nhỏ nhìn ra thung lũng
- Trang chủ / Hình ảnh / Mưa xuống trên mái nhà kính

### 11.2 Ví dụ tiếng Anh

- Home / Stories / A Morning of Work in Dalat Mist
- Home / Places / A Small House Facing the Valley
- Home / Images / Rain Falling on Greenhouse Roofs

## 12. Footer architecture

### 12.1 Footer groups

Giới thiệu:

- đoạn giới thiệu ngắn

Khám phá:

- Con người
- Nơi chốn
- Nhịp sống
- Câu chuyện
- Hình ảnh

Đi tiếp:

- Tới Ôm Đà Lạt
- Về Ấp Đà Lạt
- Liên hệ

Ngôn ngữ:

- VI
- EN

### 12.2 Không đưa vào footer

- links linh tinh ngoài hệ
- social proof giả
- counters vô nghĩa
- menu quá dài

## 13. Route naming rules cho DEV

### 13.1 Rules

- không dấu
- lowercase
- gạch nối
- rõ nghĩa
- ngắn vừa đủ
- route tiếng Việt và tiếng Anh không cần dịch sát chữ, nhưng phải đồng intent

### 13.2 Ví dụ tốt

- `/vi/goc-lam-viec-da-lat`
- `/en/work-corners-in-dalat`

### 13.3 Ví dụ xấu

- `/vi/post-07`
- `/en/dalat-awesome-creative-life`
- `/vi/bat-ngo-lam-viec-o-da-lat`

## 14. Definition of done

IA được xem là hoàn thành khi:

- menu rõ
- routes ổn định
- categories bền
- internal linking logic rõ
- ap và om không trùng vai trò
- team DEV có thể build site map, nav, CMS mapping mà không phải đoán
