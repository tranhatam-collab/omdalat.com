# OMDALAT MEMBERSHIP GATING FLOW SPEC 2026

Version: LOCKED  
Status: DEV and product implementation spec for membership access

---

## 0. Mục Tiêu

Xây gating rõ ràng để public hiểu đúng, member đi sâu đúng mức, và internal giữ được tài liệu nhạy cảm.

---

## 1. Membership Levels

1. `guest`
2. `registered_member`
3. `reviewed_member`
4. `internal_member`
5. `admin`

---

## 2. Standard Flow

`Visit -> Read -> Register -> Verify email -> Fill profile -> Wait review -> Unlock member resources`

---

## 3. Route-Level Gating

### Public

- `/vi`
- `/en`
- `/vi/*`
- `/en/*`
- `/docs/*`

### Registered Member

- `/member`
- `/member/resources`
- `/member/investor-overview`
- `/member/operations`
- `/member/handbook`
- `/app/profile`
- `/app/membership`

### Reviewed Member

- `/member/node-model`
- reviewed-only investor sections
- reviewed-only handbook sections
- deeper operations resources

### Internal / Admin

- internal dashboards
- review tools
- admin resources
- sensitive internal records

---

## 4. UI States

### Guest State

- sees public content
- sees teaser cards for locked resources
- sees CTA `Đăng ký để xem chi tiết`

### Registered State

- sees member landing
- sees unlocked registered resources
- sees prompt to complete profile if incomplete

### Reviewed State

- sees reviewed resources
- sees next-step actions for deeper participation

### Internal State

- sees internal ops tools and internal docs

---

## 5. Required Screens

### Register

- email
- password or magic link
- consent checkbox
- locale preference

### Verify Email

- success state
- resend action
- next step prompt

### Profile Completion

- full name
- current location
- what the person is looking for
- what the person can contribute
- expected stay length
- introduction link

### Pending Review

- clear status
- what happens next
- estimated response time

### Unlock State

- list of newly opened resources
- next recommended page
- join/apply actions

---

## 6. Middleware / Access Logic

- unauthenticated user hitting `/member/*` goes to login or register
- authenticated but incomplete profile user is routed to `/app/profile`
- registered but not reviewed user can read registered content only
- reviewed member gains reviewed resource visibility
- internal/admin bypass content gating by role

---

## 7. Data Model Requirement

Every protected resource must include:

```json
{
  "access_level": "registered|reviewed|internal",
  "teaser_enabled": true,
  "teaser_title_vi": "",
  "teaser_title_en": "",
  "teaser_excerpt_vi": "",
  "teaser_excerpt_en": ""
}
```

---

## 8. Copy Rule For Gating

Use:

- `Dành cho thành viên đã đăng ký`
- `Nội dung này mở sau khi hoàn tất hồ sơ cơ bản`
- `Một số tài liệu chỉ dành cho thành viên phù hợp`

Do not use:

- `unlock premium`
- `VIP access`
- `exclusive offer`

---

## 9. QA Gate

Pass only when:

- public user cannot access protected content body
- teaser cards still render correctly
- login and register flow are clear on mobile
- profile completion is saved
- reviewed role changes visibility immediately
