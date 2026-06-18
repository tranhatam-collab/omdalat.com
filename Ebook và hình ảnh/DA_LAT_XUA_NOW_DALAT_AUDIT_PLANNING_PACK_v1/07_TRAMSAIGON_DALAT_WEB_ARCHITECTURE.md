# 07_TRAMSAIGON_DALAT_WEB_ARCHITECTURE.md

# KIẾN TRÚC WEB CHO NHÁNH ĐÀ LẠT TRÊN TRAMSAIGON.COM

## 1. Vai trò

Nhánh Đà Lạt không phải là chuyên mục phụ để đăng bài du lịch. Nó là một hệ xuất bản hỗ trợ bộ sách, kho tư liệu, SEO dài hạn, cộng đồng góp ký ức, bán sách và chuẩn bị chuyển ngữ sau khi bản tiếng Việt được khóa.

## 2. URL Architecture

| URL | Vai trò | Trạng thái nội dung |
|---|---|---|
| /dalat | Landing page tổng của bộ Đà Lạt | Public |
| /dalat/books/da-lat-xua | Trang sách Đà Lạt Xưa | Public + preorder khi có ISBN |
| /dalat/books/now-dalat | Trang sách Now Dalat | Public + preorder khi có ISBN |
| /dalat/archive | Kho ký ức Đà Lạt xưa | Public tuyển chọn, full archive internal |
| /dalat/oral-history | Gọi nhân chứng kể chuyện | Public form + consent |
| /dalat/map | Bản đồ câu chuyện theo tuyến | Public interactive |
| /dalat/people | Chân dung cư dân | Public đã được đồng ý |
| /dalat/food | Ẩm thực, chợ, cà phê, món lạnh | Public |
| /dalat/farms | Rau, hoa, trà, cà phê, farmstay | Public |
| /dalat/music | Thành phố âm nhạc và sáng tạo | Public |
| /dalat/now | Hiện tại, du lịch, đời sống mới | Public |
| /dalat/future | Đô thị cao nguyên đáng sống | Public |
| /dalat/shop | Bán sách, bundle, ebook | Public sau gate xuất bản |
| /dalat/languages | Các bản chuyển ngữ | Locked until Vietnamese edition final |

## 3. Content model

Mỗi bài/tư liệu phải có: title, slug, type, related_book, related_chapter, district/area, coordinates nếu có, period, source_type, consent_status, source_url, interview_id, photo_rights_status, fact_status, public_status, language.

## 4. SEO Pillars

1. Đà Lạt xưa.
2. Lịch sử Đà Lạt.
3. Người Đà Lạt.
4. Kiến trúc Đà Lạt.
5. Hồ Xuân Hương và trung tâm Đà Lạt.
6. Chợ Đà Lạt và ẩm thực.
7. Cà phê, trà, rau, hoa Đà Lạt.
8. Đà Lạt UNESCO City of Music.
9. Now Dalat.
10. Đà Lạt đáng sống.

## 5. Publishing gates for web

Draft -> Fact Checked -> Consent Cleared -> Photo Rights Cleared -> Editorial Approved -> SEO Approved -> Public.

Không bài nào có nhân vật thật được public nếu thiếu Consent Cleared. Không bài nào có ảnh người rõ mặt được public nếu thiếu Photo Rights Cleared. Không claim lịch sử nào được public nếu thiếu Fact Checked.

## 6. Monetization, sau khi xuất bản

Không bán sách trước khi bản quyền, ISBN, file print-ready và trang pháp lý hoàn thiện. Sau khi có sách: bán bản in, ebook, bundle hai cuốn, bản audio, bản tiếng Anh, bản collector, membership đọc archive. Không hứa hẹn giá trị đầu tư; đây là tài sản xuất bản và văn hóa.
