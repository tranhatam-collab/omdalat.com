# OMDALAT_TO_APDALAT_PRESENCE_AND_LINKING_RULES_2026

Om Dalat / Ôm Đà Lạt ↔ Ấp Đà Lạt / Ap Dalat

Presence & Linking Rules

Version: LOCKED

Status: Production-ready

Scope: navigation, linking, SEO, UX, content boundaries, implementation rules

---

## 0. TUYÊN BỐ KHÓA

`omdalat.com` và `ap.omdalat.com` là hai lớp khác nhau trong cùng một hệ.

- `omdalat.com` = hệ sống (tham gia, ở lại, làm, học, cộng đồng)
- `ap.omdalat.com` = lớp editorial (con người, nơi chốn, nhịp sống, hình ảnh, câu chuyện)

👉 Không được trùng vai trò  
👉 Không được trùng nội dung  
👉 Không được cạnh tranh SEO với nhau

---

## 1. VẤN ĐỀ HIỆN TẠI (PHẢI XỬ LÝ TRƯỚC)

Trước khi nối `ap.omdalat.com`, team bắt buộc phải dọn:

### 1.1 Gỡ hoàn toàn

- `docs.omdala.com`
- `app.omdala.com`
- mọi CTA liên quan `OMDALA`
- block `Docs / Help` cũ

### 1.2 Lý do

Nếu không dọn:

- hệ sẽ có 3 hướng (`OMDALAT` / `OMDALA` / `APDALAT`)
- user không hiểu mình đang ở đâu
- SEO bị phân tán
- brand không còn nhất quán

👉 Đây là P0, phải làm trước khi deploy `ap.omdalat.com`.

---

## 2. VAI TRÒ RÕ RÀNG CỦA 2 SITE

### 2.1 omdalat.com

Làm:

- giải thích hệ sống
- cung cấp nơi ở
- cung cấp công việc
- cung cấp chương trình
- cho người dùng tham gia
- member system

Không làm:

- kể chuyện dài
- làm tạp chí
- làm gallery lớn
- làm lớp cảm xúc chính

### 2.2 ap.omdalat.com

Làm:

- kể chuyện
- hiển thị con người
- hiển thị nơi chốn
- hiển thị nhịp sống
- hiển thị hình ảnh
- kéo SEO rộng
- tạo cảm xúc đúng

Không làm:

- form tham gia chính
- dashboard
- program pages
- selling living/work system

---

## 3. NGUYÊN TẮC LINKING

### 3.1 Quy tắc cốt lõi

- Link phải có lý do
- Link phải đúng ngữ cảnh
- Link phải không phá flow

### 3.2 Không được làm

❌ Đặt link `ap.omdalat.com` khắp nơi vô nghĩa  
❌ Nhồi link trong mọi paragraph  
❌ Thay CTA chính bằng link sang ap  
❌ Dùng wording kỹ thuật kiểu `go to media layer`  
❌ Mirror nội dung giữa 2 site rồi cross-link

---

## 4. CÁCH HIỆN DIỆN CỦA APDALAT TRÊN OMDALAT

### 4.1 Homepage (bắt buộc có 1 block)

Vị trí:

Sau section giới thiệu hệ hoặc gần section bài viết

Copy chuẩn (VI):

- H2: `Ấp Đà Lạt`
- Text: `Những con người, nơi chốn và nhịp sống làm nên Đà Lạt hôm nay.`
- CTA: `Mở Ấp Đà Lạt`

Copy chuẩn (EN):

- H2: `Ap Dalat`
- Text: `People, places, and rhythms shaping Dalat today.`
- CTA: `Explore Ap Dalat`

### 4.2 Footer (bắt buộc)

Thêm:

- VI: `Ấp Đà Lạt`
- EN: `Ap Dalat`

👉 Không thêm mô tả dài  
👉 Không dùng icon lạ  
👉 Không làm nổi hơn các link khác

### 4.3 Article pages (conditional linking)

Chỉ link khi bài thuộc:

- nhịp sống
- cảm nhận sống
- nơi chốn
- hình ảnh
- câu chuyện

CTA mẫu VI:

- `Đọc thêm về những câu chuyện Đà Lạt tại Ấp Đà Lạt`
- `Xem thêm những nơi chốn tương tự tại Ấp Đà Lạt`

CTA mẫu EN:

- `Read more stories at Ap Dalat`
- `Explore more places on Ap Dalat`

### 4.4 Stay / Work / Community pages

Không đặt link ở đầu.

Chỉ đặt ở cuối:

VI:

`Nếu bạn muốn hiểu Đà Lạt sâu hơn trước khi ở lại, hãy đọc Ấp Đà Lạt.`

EN:

`If you want to understand Dalat more deeply before staying, explore Ap Dalat.`

---

## 5. CÁCH APDALAT LINK NGƯỢC VỀ OMDALAT

### 5.1 Rule

`ap` chỉ link về `om` khi:

- user có intent tham gia
- user đang đọc về ở lại / làm việc / sống lâu

### 5.2 Placement

Homepage ap:

Section cuối:

- VI: `Tới Ôm Đà Lạt`
- EN: `Continue to Om Dalat`

### 5.3 Article CTA

VI:

`Nếu bạn không chỉ muốn đọc, mà muốn ở lại và sống tại đây, hãy tới Ôm Đà Lạt.`

EN:

`If you are not only reading but considering staying, continue to Om Dalat.`

---

## 6. SEO RULES

### 6.1 Không trùng keyword chính

| Intent | omdalat | apdalat |
|---|---|---|
| sống ở Đà Lạt | ✔ | ❌ |
| nhịp sống Đà Lạt | ❌ | ✔ |
| ở lại Đà Lạt | ✔ | ❌ |
| câu chuyện Đà Lạt | ❌ | ✔ |

### 6.2 Canonical

- `omdalat.com` canonical riêng
- `ap.omdalat.com` canonical riêng

👉 Không canonical chéo

### 6.3 Internal link ratio

- 70% nội bộ site
- 30% cross-site

### 6.4 Anchor text

Không dùng:

- `click here`
- `đọc thêm`

Dùng:

- `Ấp Đà Lạt`
- `câu chuyện Đà Lạt`
- `nơi chốn tại Đà Lạt`
- `Om Dalat / Ôm Đà Lạt`

---

## 7. DEV IMPLEMENTATION RULES

### 7.1 Config constants

```ts
const AP_DALAT_URL = "https://ap.omdalat.com";
const OM_DALAT_URL = "https://omdalat.com";
```

### 7.2 Link component rule

- luôn dùng internal link component
- không hardcode link rải rác
- có thể track click events

### 7.3 Tracking

Track:

- click từ om → ap
- click từ ap → om

Metrics:

- CTR
- bounce
- session continuation

### 7.4 Noindex rules

- ap editorial pages → index
- om member/app pages → noindex

---

## 8. UX RULES

### 8.1 Không phá flow

User đang:

- tìm chỗ ở → không ép đọc editorial
- đọc story → không ép tham gia ngay

### 8.2 Link phải tự nhiên

Link phải:

- đọc xong thấy hợp lý
- không bị quảng cáo
- không bị chen ngang

---

## 9. QA CHECKLIST

PASS khi:

- không còn link `docs.omdala.com`
- không còn link `app.omdala.com`
- homepage có block `Ấp Đà Lạt`
- footer có link `Ấp Đà Lạt`
- article có contextual links
- SEO không trùng keyword
- canonical đúng
- user flow không bị đứt

---

## 10. SAI LẦM NGHIÊM TRỌNG (CẤM)

- biến ap thành blog phụ của om
- biến om thành portal editorial
- copy nội dung giữa 2 site
- dùng cùng title SEO
- đặt link sai context
- dùng ngôn ngữ khác nhau giữa 2 site
- không dọn hệ cũ trước khi nối hệ mới

---

## 11. CÂU CHỐT

👉 `ap.omdalat.com` tạo cảm giác  
👉 `omdalat.com` tạo quyết định

👉 ap giúp người ta muốn ở lại  
👉 om giúp người ta thực sự ở lại

---

## 12. DEFINITION OF DONE

Hệ linking được xem là hoàn chỉnh khi:

- 2 site rõ vai trò
- không trùng nội dung
- link đúng chỗ
- SEO không xung đột
- user flow tự nhiên
- brand thống nhất

---

## 13. NEXT STEP

Sau file này, bước tiếp theo đúng nhất:

👉 `OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`

Bao gồm:

- checklist deploy toàn bộ hệ
- từ code → content → SEO → tracking → QA → launch
