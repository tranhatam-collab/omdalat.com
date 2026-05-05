# OMDALAT_CONTENT_SYSTEM_SOP

Status: LOCKED SOP  
Owner: Team 1 / Content / SEO / Dev / QA  
Scope: toàn bộ bài viết public của `omdalat.com`, dữ liệu CMS/seed, ảnh bài viết, metadata, internal link, QA và sprint xuất bản

---

## 0. Mục đích

File này là chuẩn vận hành nội dung chính thức cho Ôm Đà Lạt.

Từ thời điểm khóa, mọi bài viết public phải đi qua cùng một bộ lọc tinh thần, cùng cấu trúc bài, cùng tiêu chuẩn kỹ thuật, cùng schema bàn giao và cùng nhịp QA.

Nếu một bài viết đúng SEO nhưng làm người đọc hiểu Ôm Đà Lạt như một nơi đi chill, nghỉ dưỡng, trốn chạy hoặc chữa lành mơ hồ, bài đó không đạt.

---

## 1. Bộ lọc tinh thần

Tất cả bài viết trước khi đưa vào hệ thống phải đi qua bộ lọc 4 KHÔNG / 4 CÓ này. Trật một tiêu chí thì trả về viết lại.

| Tiêu chí | Không được phép | Bắt buộc phải có |
|---|---|---|
| Góc nhìn | Lãng mạn hóa, mơ mộng bỏ phố về rừng, trốn chạy áp lực, chill, chữa lành. | Thực tế, kỷ luật, tự quản lý, công việc thật, giá trị tạo ra, nhịp sống rõ ràng. |
| Cấu trúc | Viết lê thê, dài dòng, cảm xúc cá nhân, chia đoạn kiểu mạng xã hội. | Đoạn ngắn 4-6 dòng, trực diện, logic rõ: vấn đề -> sự thật -> giải pháp. |
| Định vị | Viết như trang du lịch review quán xá, homestay, cảnh đẹp. | Viết như một hệ điều hành cuộc sống: Stay + Work + Join. |
| Ngôn ngữ | Trộn tiếng Việt và tiếng Anh trong cùng một bài hoặc cùng một visible page. | Tách bạch 100% hai phiên bản nội dung: `content_vi`/`content_en` hiện tại, hoặc `locales.vi`/`locales.en` khi lên schema v2. |

---

## 2. Cấu trúc một bài viết chuẩn

Team Content chỉ được viết theo template này.

### 2.1 Title

- Trực diện.
- Giải quyết một câu hỏi hoặc một nỗi đau.
- Không đặt title kiểu cảm hứng mơ hồ.

### 2.2 Excerpt

- 2-3 câu tóm tắt giá trị lõi nhất của bài.
- Không vòng vo.
- Không hứa hẹn thay đổi cuộc đời.

### 2.3 Body

Bài viết phải có đủ ba lớp:

1. Mở vấn đề: nêu thực trạng hoặc ảo tưởng phổ biến.
2. Bóc tách sự thật: đưa góc nhìn thực tế của Ôm Đà Lạt, gồm kỷ luật, kỹ năng, sự cố gắng, nhịp sống.
3. Giải pháp hoặc hệ thống: hướng dẫn cách làm đúng, ví dụ cần thu nhập bao nhiêu, kỹ năng gì, nhịp sống ra sao, đi tiếp vào đâu.

### 2.4 Contextual CTA

Không dùng CTA chung chung như "Hãy đến Đà Lạt".

CTA phải theo intent:

- Bài nói về việc làm: dẫn về `/vi/work` hoặc bài liên quan về kỹ năng và thu nhập.
- Bài nói về nơi ở: dẫn về `/vi/stay` hoặc bài liên quan về ở lâu dài.
- Bài nói về sự cô đơn, cộng đồng, fit: dẫn về `/vi/join`.
- Bài tiếng Anh dùng route tương ứng `/en/work`, `/en/stay`, `/en/join`.

---

## 3. Tiêu chuẩn kỹ thuật

Đây là luật bắt buộc cho Dev, SEO và Visual.

### 3.1 Hình ảnh

- Định dạng chuẩn đích: chỉ dùng `WebP` hoặc `AVIF`.
- Không đưa thêm PNG/JPG nặng vào bài mới.
- Tên file phải bám slug bài viết, ví dụ `lam-viec-o-da-lat-co-thuc-te-khong-01.webp`.
- Mỗi bài chỉ có một hero image chính.
- Ảnh trong bài, nếu có, phải minh họa đời sống hoặc công việc thật.
- Không dùng ảnh stock bóng bẩy, ảnh du lịch hóa, ảnh nghỉ dưỡng hóa.
- Alt text không được trống.
- Dev phải ưu tiên cơ chế lấy alt theo ngôn ngữ đang hiển thị; nếu thiếu alt riêng, fallback cuối cùng là title đúng locale.
- Chuẩn ảnh thực tế vẫn phải tuân thủ `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`.

Ghi chú migration: ảnh JPG đã có source log chỉ được xem là trạng thái chuyển tiếp. Khi đóng gói batch mới, team phải chuyển sang `WebP` hoặc `AVIF` và đổi tên theo slug.

### 3.2 SEO metadata

- Slug dùng tiếng Việt không dấu, chữ thường, nối bằng gạch ngang.
- Không đổi slug sau khi đã publish, trừ khi có redirect plan và approval.
- Meta title tối đa 60 ký tự, có keyword chính.
- Meta description tối đa 155 ký tự, có keyword và tóm tắt đúng tinh thần bài.
- Metadata phải có đủ VI/EN riêng, không dịch máy, không dùng chung một câu cho cả hai locale.

Ví dụ meta title:

`Làm việc ở Đà Lạt có thực tế không? | Ôm Đà Lạt`

### 3.3 Internal link

Mỗi bài viết chỉ được có tối đa 3-4 internal link chính:

- 1 link về trang pillar: `/vi/work`, `/vi/stay`, hoặc `/vi/life`.
- 1-2 link ngang sang bài cùng chủ đề.
- 1 link CTA cuối về `/vi/join` nếu intent đã đủ chín.

Không nhồi link. Không đặt link chỉ để SEO nếu không giúp người đọc đi tiếp đúng hướng.

---

## 4. Schema bàn giao cho Dev

Team Content / Data Entry sau khi duyệt nội dung sẽ bàn giao cho Dev theo schema v2 này.

Dev có thể inject vào DB/CMS mà không cần hỏi lại nếu payload pass validation.

```jsonc
{
  "slug": "slug-bai-viet-viet-thuong-khong-dau",
  "pillar_key": "work",
  "status": "published",
  "access_level": "public",
  "tags": ["tag1", "tag2"],
  "locales": {
    "vi": {
      "title": "Tiêu đề tiếng Việt",
      "excerpt": "Sapo tiếng Việt ngắn gọn...",
      "content": "<p>Nội dung HTML/Markdown tiếng Việt...</p>",
      "meta_title": "SEO Title VI tối đa 60 ký tự",
      "meta_description": "SEO Description VI tối đa 155 ký tự"
    },
    "en": {
      "title": "English Title",
      "excerpt": "Short English excerpt...",
      "content": "<p>English HTML/Markdown content...</p>",
      "meta_title": "SEO Title EN",
      "meta_description": "SEO Description EN"
    }
  },
  "featured_image": "/images/articles/slug-bai-viet-cover.webp"
}
```

Giá trị cho phép:

- `pillar_key`: `work`, `stay`, `life`, `system`
- `status`: `draft`, `published`, `archived`
- `access_level`: `public`, `members_only`

Ghi chú cho Dev:

- Schema v2 gom `vi` và `en` vào object `locales` để query i18n sạch hơn.
- Runtime hiện tại còn dùng seed dạng `title_vi`, `title_en`, `content_vi`, `content_en`; đây là adapter hiện tại, không phải schema đích dài hạn.
- Khi chuyển CMS thật, `locales` là schema canonical.

---

## 5. Sprint 10 bài mỗi tuần

Áp dụng quy trình 4 bước để làm 10 bài/tuần mà không lệch tinh thần.

### Thứ 2: Outline

Content chọn 10 chủ đề từ roadmap.

Mỗi outline phải có:

- H1
- excerpt nháp
- H2/H3 chính
- intent
- pillar link dự kiến
- CTA dự kiến
- loại ảnh cần dùng

### Thứ 3: Viết và dịch

- Viết bản tiếng Việt trước.
- Chốt tinh thần trước khi dịch.
- Bản tiếng Anh là bản chuyển ngữ tự nhiên, không dịch máy, không đổi ý.

### Thứ 4: QA lần 1

Editor đọc lại theo bộ lọc tinh thần.

Nếu có câu chữ kiểu mơ mộng, chill, chữa lành, bỏ phố trốn áp lực thì gạch bỏ và sửa thành ngôn ngữ thực tế, kỷ luật, hệ thống.

### Thứ 5: Format và Visual

SEO / Design / Content đóng gói:

- ảnh `WebP` hoặc `AVIF`
- tên file theo slug
- meta title
- meta description
- internal link
- source/license log ảnh
- payload JSON theo schema v2

### Thứ 6: QA lần 2 và deploy

Dev / QA nhận JSON và kiểm:

- schema hợp lệ
- route `/vi` và `/en` không lỗi
- hreflang đúng
- metadata đúng
- ảnh render đúng, không vỡ layout
- internal link đúng

Chỉ deploy khi pass đủ.

---

## 6. Kiểm soát sau mỗi batch

Sau mỗi đợt 10 bài, QA tự hỏi ba câu:

1. Đọc bài này xong, người ta có muốn xách balo lên đi chill không? Nếu có, bài thất bại.
2. Đọc bài này xong, người ta có thấy Đà Lạt là nơi cần nỗ lực, kỹ năng và hệ thống không? Nếu có, bài đạt.
3. Chuyển ngôn ngữ VI/EN có lỗi 404 không, layout có vỡ không? Nếu không, kỹ thuật đạt.

---

## 7. Definition of Done

Một batch nội dung chỉ được xem là xong khi:

- 10 bài có outline, bản VI, bản EN.
- Mỗi bài pass bộ lọc tinh thần.
- Mỗi bài có metadata VI/EN.
- Mỗi bài có internal link đúng silo.
- Mỗi bài có ảnh đúng chuẩn thực tế, source/license log, định dạng `WebP` hoặc `AVIF`.
- Mỗi bài có route VI/EN không lỗi.
- `validate:content-seed` hoặc validator CMS tương ứng pass.
- QA xác nhận không có copy du lịch hóa, chill hóa, chữa lành hóa.

---

## 8. Dẫn chiếu bắt buộc

- `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`
- `docs/OMDALAT_HUMAN_TEXT_GATE_URL_INVENTORY_2026-05-05.md`
- `docs/OMDALAT_CONTENT_OPERATING_SYSTEM_AND_100_SEO_ROADMAP_2026-05-03.md`
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`
- `docs/OMDALAT_CONTENT_SYSTEM_AND_EDITORIAL_PLAN_2026.md`
- `docs/OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md`
- `docs/OMDALAT_CONTENT_SEO_30_ARTICLES_2026.md`
- `docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md`
- `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
- `docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md`
- `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`
- `docs/OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md`
- `docs/DEV_TEAM_1_PLAN_OMDALAT.md`
- `docs/DEV_TEAM_2_PLAN_OMDALAT.md`
- `docs/DEV_TEAM_3_PLAN_OMDALAT.md`

---

## 9. Câu chốt

Content của Ôm Đà Lạt không dùng để bán một giấc mơ Đà Lạt.

Content phải giúp người đọc hiểu rõ: nếu muốn ở lại, họ cần kỹ năng, kỷ luật, công việc thật, cộng đồng đúng nhịp và một hệ thống đủ rõ để không trôi.
