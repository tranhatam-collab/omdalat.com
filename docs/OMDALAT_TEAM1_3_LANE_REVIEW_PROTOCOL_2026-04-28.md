Om Dalat / Ôm Đà Lạt

Ap Dalat / Ấp Đà Lạt

Team 1 3-Lane Review Protocol

Version: v1.0.0

Status: ACTIVE

Date updated: 2026-04-28

Owner: Team 1

Scope: review protocol cho Om public, App member runtime, Ap editorial

---

## 0. Mục đích

File này khóa cách Team 1 review report sau khi Team 2, Team 3 và Ap Team nộp current-state audit.

Mục tiêu:

* review theo cùng một chuẩn
* không bỏ sót P0 blocker
* không để lane nào xanh chỉ vì report viết đẹp
* biến report thành quyết định rõ: đi tiếp, sửa tiếp, hay chờ lane khác

---

## 1. Nguyên tắc review

### 1.1 Evidence trước, cảm nhận sau

Team 1 đọc bằng chứng trước, diễn giải sau.

### 1.2 Không gộp blocker

Phải tách:

* blocker code
* blocker toolchain
* blocker infra
* blocker content
* blocker QA

### 1.3 Không đổi nghĩa lane

* Om public không bị trôi sang editorial
* App member runtime không bị trôi sang public marketing
* Ap editorial không bị trôi sang site tham gia hệ

### 1.4 Không claim P0 done nếu chưa có review note

Report được nộp không có nghĩa là đã pass.

---

## 2. Review flow chuẩn

### Step 1

Xác nhận report đã đủ 10 mục.

### Step 2

Đối chiếu scope report với scope lane trong audit board.

### Step 3

Kiểm tra commands và evidence có thực sự khớp với claim hay không.

### Step 4

Đánh dấu:

* `PASS`
* `PASS_WITH_QUEUE`
* `BLOCKED`
* `RETURN_FOR_REVISION`

### Step 5

Cập nhật submission tracker.

### Step 6

Cập nhật lại audit board chính.

### Step 7

Nếu chạm route meaning / CTA meaning / role meaning / access model / Om-Ap boundary, Team 1 phải chốt bằng decision log.

---

## 3. Checklist review theo lane

### 3.1 Om Public

Team 1 phải kiểm:

* route inventory có đủ chưa
* title / meta / canonical / hreflang đã theo locale thật chưa
* alt text có đúng ngôn ngữ không
* CTA / menu / footer / forms có đúng codex không
* docs public surface có trôi khỏi chuẩn language/SEO mới không
* bridge Om -> Ap có đúng vai trò không

### 3.2 App Member Runtime

Team 1 phải kiểm:

* report có tách rõ blocker code và toolchain không
* artifact deploy mới nhất ở đâu
* smoke evidence mới nhất ở đâu
* member flow/dashboard có đúng role/status model không
* gate copy / dashboard labels / noindex có đúng codex không
* có chỗ nào đang là shell mock nhưng bị claim như production không

### 3.3 Ap Editorial

Team 1 phải kiểm:

* route inventory editorial có đủ chưa
* metadata / canonical / sitemap / robots / hreflang có đủ chưa
* image alt / caption / filename có theo chuẩn mới chưa
* Ap có giữ đúng vai trò editorial độc lập không
* Om <-> Ap linking có đúng ngữ cảnh không

---

## 4. Mức quyết định

### PASS

P0 lane đó đủ điều kiện đi tiếp.

### PASS_WITH_QUEUE

P0 đủ, nhưng có P1 rõ cần xếp hàng.

### BLOCKED

P0 chưa qua, phải sửa tiếp trước khi đi tiếp.

### RETURN_FOR_REVISION

Report chưa đủ chuẩn để review, team phải nộp lại.

---

## 5. Khi nào Team 1 phải escalate

* route meaning bị lệch
* CTA meaning bị đổi
* role/access semantics bị đổi
* Om/App/Ap boundary bị lẫn
* claim done không khớp evidence
* blocker toolchain bị dùng để che blocker code

---

## 6. Output bắt buộc của Team 1 sau mỗi review

Sau mỗi lane review, Team 1 phải cập nhật:

* submission tracker
* audit board
* decision log nếu có semantic decision

---

## 7. Definition of done

Protocol này hoàn thành khi Team 1 có thể review 3 lane theo cùng một chuẩn mà không cần tạo thêm luật miệng mới trong lúc review.
