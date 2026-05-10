# OMDALAT_3_TEAM_SYNC_MASTER_2026

## Om Dalat / Ôm Đà Lạt

3 Team Sync Master

Version: LOCKED  
Status: Production-ready  
Scope: coordination across Team 1, Team 2, Team 3

Canonical note:

- canonical execution model: [OMDALAT_3_TEAM_EXECUTION_AND_SYNC_MODEL_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_3_TEAM_EXECUTION_AND_SYNC_MODEL_2026.md)
- canonical Team 1 coordination file: [OMDALAT_TEAM1_MASTER_HANDOFF_AND_WEEKLY_SYNC_SYSTEM_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_TEAM1_MASTER_HANDOFF_AND_WEEKLY_SYNC_SYSTEM_2026.md)

File này được giữ lại như sync brief ngắn. Nếu có điểm nào mâu thuẫn, hai file canonical ở trên thắng.

---

## 0. Mục tiêu

Ôm Đà Lạt có 3 team dev cùng làm, nhưng phải vận hành như một team hoàn chỉnh.

Không chia theo kiểu:

- mỗi team tự hiểu một spec
- mỗi team tự đổi contract
- mỗi team chờ team khác xong mới làm

Phải chạy theo kiểu:

- ownership rõ
- contract rõ
- sync thường xuyên
- báo cáo ngắn nhưng đủ
- block được nêu sớm

---

## 1. Vai trò 3 team

### Team 1

Public experience, homepage, docs public-facing, SEO surface, i18n-facing UX.

### Team 2

Member platform, gating, profile, review flow, dashboard, app runtime.

### Team 3

CMS, content operations, handbook structures, QA, release readiness.

---

## 2. Team 1 là ai

Team 1 là team đang đứng ra khóa spec public và điều phối vòng đầu của toàn hệ.

Trong đợt này:

- Codex giữ vai trò Team 1
- Team 1 chịu trách nhiệm chốt mặt ngoài và contract public

---

## 3. Shared contracts không team nào được tự đổi một mình

- brand names
- role names
- access level names
- route names
- locale keys
- CTA labels
- CMS field names
- slug rules
- gating copy
- Content SOP rules
- Image Reality rules

Nếu đổi một trong các điểm trên:

1. báo cả 3 team
2. cập nhật file canonical liên quan
3. cập nhật file team plan liên quan nếu cần

Content SOP active notice:

- `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`

Mọi sync report sau cập nhật này phải có dòng `Content SOP impact` nếu task chạm bài viết, CMS content, metadata, internal link, ảnh hoặc QA deploy content.

---

## 4. Ownership matrix

| Area | Team 1 | Team 2 | Team 3 |
| --- | --- | --- | --- |
| Homepage | owner | consult | consult |
| Public pages | owner | consult | consult |
| `/docs` public guides | owner | consult | support |
| `/member` routes | consult | owner | support |
| `/app` runtime | consult | owner | consult |
| CMS schemas | consult | consult | owner |
| 30 bài đầu | consult | consult | owner |
| Handbook access | consult | consult | owner |
| Gate screens | consult | owner | consult |
| QA release gate | consult | consult | owner |

---

## 5. Sync cadence

### Daily async update

Mỗi team gửi 1 bản ngắn:

- Hôm nay đã làm gì
- Hôm nay sẽ làm gì
- Đang block ở đâu
- Cần team nào phản hồi

### Weekly sync

Mỗi tuần phải chốt:

- route changes
- contract changes
- access changes
- schema changes
- release risk

---

## 6. Weekly report format thống nhất

```text
Team:
Week:

Shipped:
- 

Changed contracts:
- 

Dependencies for other teams:
- 

Current blockers:
- 

Need decision from founder/team lead:
- 
```

---

## 7. Handoff rule

Một việc chỉ được bàn giao khi đủ 3 phần:

1. spec đã rõ
2. API/schema/route contract đã rõ
3. QA expectation đã rõ

Không bàn giao kiểu:

- “cứ làm trước đi”
- “chắc team kia tự hiểu”

---

## 8. Thứ tự triển khai song song

### Wave 1

- Team 1: cleanup public surface + homepage rewrite
- Team 2: auth/register/profile/review flow skeleton
- Team 3: CMS fields + article + handbook schema

### Wave 2

- Team 1: docs public + locale switcher + article render
- Team 2: member routes + dashboard + gate screens
- Team 3: content input + handbook mapping + QA matrix

### Wave 3

- Team 1: SEO polish + final public QA
- Team 2: role-based visibility + notifications
- Team 3: beta release readiness + acceptance pass

---

## 9. Escalation rule

Nếu một block chạm shared contract quá 24 giờ:

1. báo trong sync file
2. gắn rõ team owner
3. nếu chưa giải xong, escalate lên founder/team lead

---

## 10. Final rule

Ba team phải làm việc như một hệ thống duy nhất.

Không có Team 1, 2, 3 nào được thắng một mình nếu toàn hệ bị lệch.
