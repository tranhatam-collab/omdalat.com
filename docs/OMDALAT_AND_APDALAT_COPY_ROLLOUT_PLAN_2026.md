# OMDALAT AND APDALAT COPY ROLLOUT PLAN 2026

Om Dalat / Ôm Đà Lạt  
Ap Dalat / Ấp Đà Lạt  
Copy Rollout Plan

Version: LOCKED  
Status: Execution-ready  
Owner: Team 1  
Scope: áp dụng đồng bộ SEO copy + UI microcopy cho Team 2 và Team 3

---

## 0. Mục tiêu triển khai

Kế hoạch này đảm bảo 3 việc:

1. Quy tắc copy mới không nằm trên docs mà đi vào code.
2. Cả `omdalat.com` và `ap.omdalat.com` giữ đúng ranh giới intent.
3. Team 2 và Team 3 có cùng checklist review trước khi merge.

Nguồn chuẩn bắt buộc:

- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`

---

## 1. Phân công theo team

### Team 1 (Owner logic + review)

- khóa wording nền, title/meta chuẩn, bridge copy chuẩn
- review PR copy của Team 2 và Team 3
- chốt pass/fail theo checklist ngôn ngữ

### Team 2 (UI + public content surface)

- áp dụng microcopy cho header/footer/button/form/empty state
- cập nhật H1 + intro + CTA cho page public
- cập nhật copy bridge Om ↔ Ap đúng ngữ cảnh

### Team 3 (SEO + member/runtime behavior)

- áp dụng title/meta/canonical/hreflang theo rule mới
- cập nhật gate screen/member states/notification copy
- bảo đảm không index nhầm member/internal copy

---

## 2. Backlog triển khai

## P0 (phải xong trước deploy production)

1. Homepage title + meta + intro (VI/EN)
2. Footer microcopy (VI/EN) theo lock mới
3. Header CTA + utility labels
4. Bridge copy Om → Ap, Ap → Om ở các khối chính
5. Member gate copy cho guest/registered/reviewed

## P1 (xong trong sprint kế tiếp)

1. Stay/Work/Learning/Community intro rewrite
2. FAQ rewrite theo câu hỏi thật
3. Join form labels + helper + success/error states
4. Dashboard labels + status copy

## P2 (tối ưu chiều sâu)

1. Article template intro + ending CTA
2. Search empty state + suggestion copy
3. Archive pages + author bio copy

---

## 3. Definition of done theo hạng mục

### 3.1 SEO copy

- title 50–60 ký tự (ưu tiên tự nhiên hơn công thức)
- meta 140–160 ký tự (không giật gân)
- mỗi page 1 H1
- intro không lặp máy móc title

### 3.2 UI microcopy

- ngắn, rõ, không lạnh
- không dùng wording thúc ép (join now, unlock now, ...)
- không dùng giọng sale/startup hype
- VI có dấu đầy đủ, EN đúng nghĩa kỹ thuật

### 3.3 Bridge copy

- Om → Ap: hướng vào “con người, nơi chốn, nhịp sống”
- Ap → Om: hướng vào “ở lại, tham gia, đi tiếp”
- không dùng wording kỹ thuật như “media layer”

---

## 4. Quy trình review bắt buộc

1. Team làm xong tự check checklist trước PR.
2. Team 1 review theo 3 lớp:
   - giọng điệu
   - intent SEO
   - vai trò page
3. Nếu fail 1 lớp: PR không merge.

Mẫu nhãn review:

- PASS
- PASS WITH FIXES
- NEEDS REVISION
- REJECTED

---

## 5. Checklist merge cho Team 2 và Team 3

- [ ] Không có câu sale/hype
- [ ] Không có câu khô kiểu hệ thống máy
- [ ] CTA đúng danh sách approved
- [ ] Title/meta giữ tinh thần sống
- [ ] Copy VI/EN cùng tinh thần, không dịch thô
- [ ] Bridge copy đúng hướng Om ↔ Ap

---

## 6. Cổng chặn release

Không được chốt Go production nếu còn:

- title/meta kiểu máy trên page chính
- CTA cũ trái rule
- gate copy lạnh hoặc kiểu upsell
- bridge copy sai vai trò hai site

---

## 7. Báo cáo hàng tuần

Mỗi team báo cáo theo format:

1. Đã rewrite page nào
2. Page nào còn giữ copy cũ
3. Rủi ro ảnh hưởng SEO/UX
4. Cần Team 1 chốt câu nào

---

## 8. Câu chốt

Copy không phải phần trang trí sau cùng.  
Copy là một phần của sản phẩm.  
Nếu copy sai giọng, cả hệ sai giọng.

