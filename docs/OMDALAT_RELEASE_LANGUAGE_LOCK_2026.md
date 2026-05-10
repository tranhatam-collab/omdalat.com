# OMDALAT RELEASE LANGUAGE LOCK 2026

Phiên bản: LOCKED  
Trạng thái: Bắt buộc cho Team 1, Team 2, Team 3  
Phạm vi: file giao việc, báo cáo, evidence packet, release gate, release note, handoff và status update trong repo

## 0. Liên kết khóa ngôn ngữ nền

Từ ngày 2026-04-19, mọi quy tắc trong file này phải được đọc cùng:

- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_AND_APDALAT_COPY_ROLLOUT_PLAN_2026.md`

Nếu có điểm khác nhau, ưu tiên file living language lock mới nhất cho lớp giọng điệu, copy public, metadata và trải nghiệm song ngữ.

## 1. Mục tiêu

Khóa chuẩn ngôn ngữ phát hành để không còn tình trạng:

- tiếng Việt mất dấu
- tiếng Anh sai nghĩa kỹ thuật
- trộn vai trò ngôn ngữ không nhất quán
- báo cáo và file handoff lệch codex

## 2. Quy tắc bắt buộc

### 2.1 Tiếng Việt

Mọi file nội bộ thuộc các nhóm sau phải dùng tiếng Việt có dấu đầy đủ:

- giao việc
- handoff
- weekly report
- evidence packet
- release gate
- release checklist
- release note
- status report
- founder pack
- QA note

Không đạt review nếu:

- thiếu dấu
- viết tắt khó hiểu
- trộn tiếng Anh vô cớ trong câu tiếng Việt
- dùng giọng marketing

### 2.2 Tiếng Anh

Tiếng Anh chỉ dùng khi:

- là bản copy public cho locale `en`
- là tên trường kỹ thuật quen dùng
- là thuật ngữ chuẩn không nên dịch máy
- là chuỗi code, command, route, key, schema

Tiếng Anh phải:

- đúng nghĩa kỹ thuật
- nhất quán với codex
- không dịch từng chữ kiểu thô
- không hype
- không dùng startup sales language

## 3. Vai trò ngôn ngữ theo lớp

### Public-facing docs và release docs

- tiếng Việt là ngôn ngữ gốc
- tiếng Anh là bản tương ứng khi thật sự cần

### File kỹ thuật

- prose giải thích: tiếng Việt có dấu
- code, key, route, schema: giữ theo chuẩn kỹ thuật

### UI public

- `vi` là nguồn
- `en` là bản quốc tế hóa đầu tiên
- locale tương lai không được public nếu chưa qua biên tập thật

## 4. Những gì không được phép

- viết `toi`, `khong`, `thuc hien`, `ngon ngu` trong file phát hành
- dùng tiếng Anh như filler trong câu tiếng Việt
- dịch `member`, `reviewed`, `internal`, `gate`, `fallback`, `hreflang` theo kiểu sai ngữ cảnh
- dùng các từ hype như `revolutionary`, `life-changing`, `premium`, `exclusive`

## 5. Chuẩn thuật ngữ được phép dùng

- member area
- reviewed member
- internal
- dashboard
- fallback
- canonical
- hreflang
- metadata
- noindex
- evidence packet
- release gate

Các thuật ngữ này phải đứng trong câu tiếng Việt rõ nghĩa, không dùng để thay cho cả phần giải thích.

## 6. Cách review nhanh trước khi merge

Team 1 phải kiểm:

1. File có dấu đầy đủ chưa
2. Có câu nào lẫn giọng marketing không
3. Thuật ngữ tiếng Anh có đúng nghĩa kỹ thuật không
4. Nội dung có đúng codex `rõ - thật - không marketing` không
5. Có đoạn nào khiến người đọc hiểu sai vai trò `public/member/internal` không

## 7. Rule cho cả 3 team

### Team 1

- khóa wording nền
- review file phát hành
- từ chối merge nếu sai chuẩn ngôn ngữ

### Team 2

- không tự viết lại copy public cho “hay hơn”
- không đổi nghĩa CTA
- mọi text public phải bám locale files và codex

### Team 3

- gate screen, member status, email/in-app notification phải đúng giọng
- không dùng copy kiểu SaaS upsell
- không để tiếng Anh sai vai trò trong member flow

## 8. Kết luận

Sai dấu, sai nghĩa hoặc sai vai trò ngôn ngữ thì chưa đạt chuẩn release.

Từ thời điểm này, mọi file phát hành trong repo phải bám file khóa này.
