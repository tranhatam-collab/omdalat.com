# OMDALAT_CONTENT_OPERATING_SYSTEM_AND_100_SEO_ROADMAP_2026-05-03

Om Dalat / Ôm Đà Lạt

Content Operating System + SEO Roadmap

Status: ACTIVE FOR DEV, CONTENT, SEO, QA

Scope: `omdalat.com` public content, homepage content blocks, article system, internal linking, member-flow handoff, Ap Dalat bridge

---

## 0. Chốt Hiện Trạng

Ôm Đà Lạt đã có hướng định vị đúng, nhưng để launch mạnh hơn thì site không được chỉ là một homepage đẹp và vài CTA.

Thiếu cần đóng theo thứ tự:

1. Homepage phải có đủ trục sống, làm, nội dung nền, member-flow handoff và bridge sang Ấp Đà Lạt.
2. Bài viết phải trở thành một hệ có pillar, thứ tự xuất bản, link nội bộ và mục tiêu chuyển đổi.
3. Member flow phải rõ: đọc, đăng ký, gửi hồ sơ, được xem xét, thử, rồi đi tiếp vào dashboard.
4. Ấp Đà Lạt phải giữ đúng vai trò editorial độc lập, giúp người đọc cảm được con người, nơi chốn và nhịp sống trước khi quyết định ở lại.

Kết luận: không chỉ viết bài, không chỉ làm web, không chỉ tạo cộng đồng. Hệ phải có nơi ở, công việc, nội dung, dashboard, con người và quy trình vận hành.

---

## 1. Homepage Rollout

Homepage phải có thêm hoặc giữ rõ các block sau:

### 1.1 Làm Việc Từ Đà Lạt

VI:
Từ Đà Lạt, vẫn có thể làm việc với thế giới. Không phải bằng cách chạy theo, mà bằng cách giữ một nhịp làm việc rõ.

EN:
From Dalat, it is still possible to work with the world. Not by chasing everything, but by keeping a clear working rhythm.

CTA:

- VI: Xem công việc
- EN: Explore work

### 1.2 Bài Nền Đang Mở

Hiển thị 3 bài đầu tiên:

1. `tu-da-lat-lam-viec-voi-the-gioi`
2. `lam-viec-o-da-lat-co-thuc-te-khong`
3. `tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Mục tiêu: giúp người đọc đi từ tò mò sang hiểu đúng: có thể làm gì, bắt đầu từ đâu, và làm sao để ở lại bằng công việc thật.

### 1.3 Ấp Đà Lạt Bridge

VI:
Nếu bạn muốn hiểu Đà Lạt sâu hơn trước khi ở lại, hãy bắt đầu từ Ấp Đà Lạt.

EN:
If you want to understand Dalat more deeply before staying, begin with Ap Dalat.

CTA:

- VI: Mở Ấp Đà Lạt
- EN: Explore Ap Dalat

Link target: `siteConfig.apOrigin`, mặc định `https://ap.omdalat.com`.

---

## 2. Bài Đầu Tiên Đã Kích Hoạt Trong Seed

### Bài 1

Slug: `/vi/articles/tu-da-lat-lam-viec-voi-the-gioi`

VI title: Từ Đà Lạt, vẫn có thể làm việc với thế giới

EN title: Working with the world from Dalat

Intent: work from Dalat, real skill, working rhythm, long-term stay.

### Bài 2

Slug: `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`

VI title: Làm việc ở Đà Lạt có thực tế không

EN title: Is working in Dalat realistic

Intent: practical answer, skill, source of work, self-management.

### Bài 3

Slug: `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`

VI title: Từ một kỹ năng nhỏ đến thu nhập tại Đà Lạt

EN title: From one small skill to income in Dalat

Intent: skill-to-income roadmap, small start, repeatable work, staying with rhythm.

---

## 3. Article Runtime Rules

Current implementation uses bilingual content source with locale routes. Do not render both languages inside the same visible article page unless a specific editorial page asks for parallel bilingual reading.

Required source shape remains:

```json
{
  "title_vi": "",
  "title_en": "",
  "slug": "",
  "excerpt_vi": "",
  "excerpt_en": "",
  "content_vi": "",
  "content_en": "",
  "pillar_key": "song|work|xay-cuoc-doi",
  "access_level": "guest",
  "status": "draft|published"
}
```

Rendering rules:

- `/vi/articles/...` renders Vietnamese only.
- `/en/articles/...` renders English only.
- Paragraphs are separated by blank lines in seed content.
- Article body max width: 720px.
- Line height must stay airy enough for long reading.
- Do not write social-style one-line paragraphs unless the article intentionally needs a short beat.
- Every article must link to `/work`, `/stay`, `/join`, and at least two related articles.

---

## 4. Member Flow Handoff

Public content must guide the reader into this path:

Homepage -> Article -> Join -> Form -> Review -> Trial -> Dashboard -> Work / Stay / Learning

Do not use article content only for reading time. Every article must help the right reader decide whether to go deeper.

---

## 5. First 10 Pillar Articles

1. `tu-da-lat-lam-viec-voi-the-gioi` - Từ Đà Lạt, vẫn có thể làm việc với thế giới
2. `lam-viec-o-da-lat-co-thuc-te-khong` - Làm việc ở Đà Lạt có thực tế không
3. `tu-mot-ky-nang-den-thu-nhap-o-da-lat` - Từ một kỹ năng nhỏ đến thu nhập tại Đà Lạt
4. `nhung-cong-viec-co-the-lam-tu-da-lat` - Những công việc có thể làm từ Đà Lạt
5. `cach-giu-nhip-lam-viec-o-da-lat` - Cách giữ nhịp làm việc khi sống ở Đà Lạt
6. `song-o-da-lat-co-gi-kho` - Sống ở Đà Lạt có gì khó mà ít người nói thẳng
7. `cach-o-lau-dai-o-da-lat` - Cách ở lâu dài ở Đà Lạt mà không bị đứt nhịp
8. `nhung-sai-lam-khi-den-da-lat` - Những sai lầm thường gặp khi mới đến Đà Lạt
9. `mot-ngay-lam-viec-o-da-lat` - Một ngày làm việc ở Đà Lạt
10. `tai-sao-nhieu-nguoi-roi-da-lat` - Vì sao nhiều người rời Đà Lạt sau một thời gian

---

## 6. 100 SEO Article Roadmap

### Cụm Sống Ở Đà Lạt

1. `song-o-da-lat-la-gi` - Sống ở Đà Lạt là gì, ngoài chuyện đổi nơi ở
2. `chi-phi-song-o-da-lat-2026` - Chi phí sống ở Đà Lạt năm 2026 có thật sự nhẹ hơn
3. `o-dau-khi-moi-den-da-lat` - Mới đến Đà Lạt nên ở đâu để không lệch nhịp
4. `song-mot-minh-o-da-lat` - Sống một mình ở Đà Lạt có thật sự dễ chịu không
5. `song-o-da-lat-co-gi-kho` - Sống ở Đà Lạt có gì khó mà ít người nói thẳng
6. `cach-o-lau-dai-o-da-lat` - Cách ở lâu dài ở Đà Lạt mà không bị đứt nhịp
7. `nhung-sai-lam-khi-den-da-lat` - Những sai lầm thường gặp khi mới đến Đà Lạt
8. `tai-sao-nhieu-nguoi-roi-da-lat` - Vì sao nhiều người rời Đà Lạt sau một thời gian
9. `nhip-song-da-lat-hop-voi-ai` - Nhịp sống Đà Lạt hợp với ai và không hợp với ai
10. `co-nen-bo-pho-ve-da-lat` - Có nên rời thành phố lớn để về Đà Lạt không

### Cụm Làm Việc Từ Đà Lạt

11. `tu-da-lat-lam-viec-voi-the-gioi` - Từ Đà Lạt, vẫn có thể làm việc với thế giới
12. `lam-viec-o-da-lat-co-thuc-te-khong` - Làm việc ở Đà Lạt có thực tế không
13. `tu-mot-ky-nang-den-thu-nhap-o-da-lat` - Từ một kỹ năng nhỏ đến thu nhập tại Đà Lạt
14. `nhung-cong-viec-co-the-lam-tu-da-lat` - Những công việc có thể làm từ Đà Lạt
15. `cach-giu-nhip-lam-viec-o-da-lat` - Cách giữ nhịp làm việc khi sống ở Đà Lạt
16. `lam-viec-tu-xa-o-da-lat` - Làm việc từ xa ở Đà Lạt cần điều kiện gì
17. `lam-viec-tu-do-o-da-lat` - Làm việc tự do ở Đà Lạt có thể sống ổn không
18. `lam-viec-truc-tuyen-tu-da-lat` - Làm việc trực tuyến từ Đà Lạt bắt đầu thế nào
19. `thu-nhap-can-co-de-song-o-da-lat` - Cần thu nhập bao nhiêu để sống ở Đà Lạt
20. `lam-viec-voi-khach-hang-quoc-te-tu-da-lat` - Làm việc với khách hàng quốc tế từ Đà Lạt

### Cụm Kỹ Năng Và Thu Nhập

21. `ky-nang-so-de-song-o-da-lat` - Những kỹ năng số giúp bạn sống được ở Đà Lạt
22. `viet-noi-dung-kiem-thu-nhap-tu-da-lat` - Viết nội dung để tạo thu nhập từ Đà Lạt
23. `chinh-anh-video-tu-da-lat` - Chỉnh ảnh, dựng video và làm việc từ Đà Lạt
24. `thiet-ke-website-tu-da-lat` - Thiết kế website nhỏ từ Đà Lạt cho khách hàng thật
25. `ai-va-cong-viec-tu-da-lat` - Dùng AI để làm việc tốt hơn từ Đà Lạt
26. `tro-ly-tu-xa-tu-da-lat` - Làm trợ lý từ xa từ Đà Lạt có phù hợp không
27. `dich-thuat-tu-da-lat` - Dịch thuật và công việc ngôn ngữ từ Đà Lạt
28. `seo-content-tu-da-lat` - Làm nội dung SEO từ Đà Lạt cho doanh nghiệp nhỏ
29. `xay-portfolio-khi-song-o-da-lat` - Xây portfolio khi đang sống ở Đà Lạt
30. `nhan-viec-dau-tien-tu-da-lat` - Cách nhận công việc đầu tiên khi ở Đà Lạt

### Cụm Ở Lại Và Không Gian Sống

31. `chon-noi-o-de-lam-viec-o-da-lat` - Chọn nơi ở để có thể làm việc tốt tại Đà Lạt
32. `phong-nho-ban-lam-viec-va-nhip-song` - Một căn phòng nhỏ, một bàn làm việc và một nhịp sống
33. `song-chung-o-da-lat` - Sống chung ở Đà Lạt cần điều gì để không vỡ nhịp
34. `o-thu-hay-o-lau-o-da-lat` - Ở thử hay ở lâu tại Đà Lạt, nên bắt đầu thế nào
35. `noi-o-khong-phai-homestay` - Nơi ở không phải homestay, mà là một phần đời sống
36. `nhip-song-trong-mot-can-nha-o-da-lat` - Nhịp sống trong một căn nhà nhỏ ở Đà Lạt
37. `khong-gian-yen-de-lam-viec` - Một không gian yên có thể thay đổi cách làm việc
38. `giu-ky-luat-khi-song-o-noi-yen` - Giữ kỷ luật khi sống ở một nơi yên hơn
39. `tu-can-phong-den-cong-viec` - Từ căn phòng nhỏ đến một công việc có thể đi xa
40. `o-lai-du-lau-de-hieu-minh` - Ở lại đủ lâu để hiểu mình có thể sống thế nào

### Cụm Học Từ Đời Sống

41. `hoc-tu-doi-song-o-da-lat` - Học từ đời sống ở Đà Lạt nghĩa là gì
42. `hoc-qua-cong-viec-that` - Học qua công việc thật, không chỉ qua lý thuyết
43. `chuong-trinh-7-ngay-o-da-lat` - Chương trình 7 ngày để thử một nhịp sống khác
44. `chuong-trinh-14-ngay-lam-viec-o-da-lat` - 14 ngày làm việc ở Đà Lạt có thể cho bạn thấy gì
45. `30-ngay-xay-nhip-song-o-da-lat` - 30 ngày xây một nhịp sống rõ hơn ở Đà Lạt
46. `hoc-cach-tu-quan-ly` - Học cách tự quản lý trước khi nói về tự do
47. `hoc-tu-mot-cong-viec-nho` - Một công việc nhỏ có thể dạy bạn nhiều điều
48. `hoc-cach-song-cung-nguoi-khac` - Học cách sống cùng người khác mà không làm hỏng nhau
49. `ket-qua-quan-trong-hon-cam-hung` - Kết quả quan trọng hơn cảm hứng
50. `hoc-de-o-lai-lau-hon` - Học để có thể ở lại lâu hơn

### Cụm Cộng Đồng Và Kỷ Luật

51. `cong-dong-khong-phai-noi-nao-nhiet` - Cộng đồng không phải lúc nào cũng là nơi náo nhiệt
52. `song-cung-nhau-can-gi` - Sống cùng nhau cần điều gì ngoài thiện chí
53. `khong-kich-dong-khong-doc-hai` - Không kích động, không độc hại, không làm hỏng nhịp chung
54. `lam-cung-nhau-o-da-lat` - Làm cùng nhau ở Đà Lạt cần một nhịp rõ
55. `cong-dong-co-ky-luat` - Một cộng đồng có kỷ luật không làm con người nhỏ lại
56. `nguoi-phu-hop-voi-om-da-lat` - Người phù hợp với Ôm Đà Lạt là ai
57. `nguoi-khong-phu-hop-voi-om-da-lat` - Ai không phù hợp với Ôm Đà Lạt
58. `thu-7-ngay-o-da-lat` - Thử 7 ngày ở Đà Lạt để thấy mình có hợp không
59. `tai-sao-can-xem-xet-truoc-khi-o-lai` - Vì sao cần xem xét trước khi ở lại lâu hơn
60. `giu-nhip-chung-khi-song-cung-nhau` - Giữ nhịp chung khi sống cùng nhau

### Cụm Ấp Thật Và Nơi Chốn

61. `ap-that-la-gi` - Một Ấp thật là gì trong hệ Ôm Đà Lạt
62. `chu-khong-gian-co-the-tham-gia-the-nao` - Chủ không gian có thể tham gia Ôm Đà Lạt thế nào
63. `tu-can-nha-den-mot-ap` - Từ một căn nhà nhỏ đến một Ấp có nhịp sống
64. `ho-so-so-cho-mot-noi-chon` - Hồ sơ số cho một nơi chốn ở Đà Lạt
65. `cach-mot-ap-tao-gia-tri` - Một Ấp có thể tạo giá trị bằng cách nào
66. `noi-chon-co-the-lam-viec` - Một nơi chốn có thể trở thành nơi làm việc thế nào
67. `chu-nha-chu-vuon-chu-quan-trong-he` - Chủ nhà, chủ vườn, chủ quán trong hệ Ôm Đà Lạt
68. `noi-chon-gan-voi-cong-viec` - Khi nơi chốn gắn với công việc thật
69. `song-va-lam-trong-mot-ap` - Sống và làm trong một Ấp cần điều gì
70. `ap-da-lat-va-om-da-lat-khac-nhau-the-nao` - Ấp Đà Lạt và Ôm Đà Lạt khác nhau thế nào

### Cụm Sản Phẩm, Nội Dung Và Thương Mại Địa Phương

71. `san-pham-dia-phuong-di-vao-moi-truong-so` - Sản phẩm địa phương đi vào môi trường số thế nào
72. `ke-chuyen-cho-mot-san-pham-dia-phuong` - Kể chuyện cho một sản phẩm địa phương
73. `ban-san-pham-nho-tu-da-lat` - Bán một sản phẩm nhỏ từ Đà Lạt ra xa hơn
74. `noi-dung-giup-dia-phuong-duoc-nhin-thay` - Nội dung giúp địa phương được nhìn thấy đúng hơn
75. `anh-va-cau-chuyen-cua-mot-noi-chon` - Hình ảnh và câu chuyện của một nơi chốn
76. `contributor-kiem-thu-nhap-tu-noi-dung` - Contributor có thể tạo thu nhập từ nội dung thế nào
77. `viet-bai-chup-anh-lam-video-tu-da-lat` - Viết bài, chụp ảnh, làm video từ Đà Lạt
78. `thuong-mai-dia-phuong-khong-can-on-ao` - Thương mại địa phương không cần bán hàng ồn ào
79. `tu-cau-chuyen-den-don-hang` - Từ một câu chuyện đúng đến một đơn hàng thật
80. `giu-niem-tin-khi-ban-hang-tu-dia-phuong` - Giữ niềm tin khi bán hàng từ địa phương

### Cụm Hệ Thống, Dashboard Và Tham Gia

81. `sau-khi-bam-tham-gia-se-co-gi` - Sau khi bấm tham gia Ôm Đà Lạt sẽ có gì
82. `dashboard-giup-ban-thay-minh-dang-o-dau` - Dashboard giúp bạn thấy mình đang ở đâu
83. `ho-so-thanh-vien-co-y-nghia-gi` - Hồ sơ thành viên có ý nghĩa gì
84. `bang-viec-giup-tao-viec-that-nhu-the-nao` - Bảng việc giúp tạo việc thật như thế nào
85. `thu-nhap-trong-om-da-lat-la-gi` - Thu nhập trong Ôm Đà Lạt được hiểu thế nào
86. `contributor-flow-trong-om-da-lat` - Contributor flow trong Ôm Đà Lạt
87. `host-partner-flow-trong-om-da-lat` - Host partner flow trong Ôm Đà Lạt
88. `member-review-khong-phai-kiem-soat` - Member review không phải kiểm soát
89. `vi-sao-can-thu-7-ngay` - Vì sao cần thời gian thử 7 ngày
90. `he-song-khong-phai-mang-xa-hoi` - Một hệ sống không phải mạng xã hội

### Cụm Tầm Nhìn Đà Lạt, Lâm Đồng, Việt Nam

91. `da-lat-trong-khong-gian-lam-viec-moi` - Đà Lạt trong một không gian làm việc mới
92. `lam-dong-moi-va-co-hoi-lam-viec-so` - Lâm Đồng mới và cơ hội làm việc số
93. `tu-dia-phuong-den-the-gioi` - Từ địa phương đến thế giới bằng công việc thật
94. `du-lich-chat-luong-va-o-lai-co-gia-tri` - Du lịch chất lượng và việc ở lại có giá trị
95. `da-lat-khong-can-on-ao-de-di-xa` - Đà Lạt không cần ồn ào để đi xa
96. `kinh-te-so-tu-mot-vung-song-nho` - Kinh tế số từ một vùng sống nhỏ
97. `nguoi-tre-lam-viec-tu-dia-phuong` - Người trẻ làm việc từ địa phương ra thế giới
98. `mot-he-song-dung-huong-phat-trien-quoc-gia` - Một hệ sống nhỏ đúng hướng phát triển quốc gia
99. `da-lat-la-noi-de-o-lai-hay-di-qua` - Đà Lạt là nơi để ở lại hay chỉ để đi qua
100. `om-da-lat-la-gi-trong-tuong-lai-lam-viec` - Ôm Đà Lạt là gì trong tương lai làm việc mới

---

## 7. Publishing Cadence

First 30 days:

- Week 1: articles 1, 2, 3, 4
- Week 2: articles 5, 6, 7, 8
- Week 3: articles 9, 10, 11, 12
- Week 4: articles 13, 14, 15, 16

After day 30:

- Publish 3 articles per week.
- Keep each cluster internally linked before opening the next cluster.

---

## 8. QA Gate

Before each publishing wave:

1. `validate:content-seed` must pass.
2. The public sitemap must include each `published` article.
3. `/vi` and `/en` homepage must show the first three foundation articles.
4. Each article must have locale-specific title, excerpt, Open Graph image, canonical and related links.
5. No visible Vietnamese page should rely on casual English terms when a clear Vietnamese phrase is available.

---

## 9. Câu Chốt

100 bài này không phải để lấp web.

Nó là bản đồ nhận thức để người đọc đi từ tò mò, đến hiểu, đến tin, đến tham gia, đến làm, đến ở lại, rồi tạo giá trị.

