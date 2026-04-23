# OMDALAT EXTERNAL MAIL + PAYMENT ACTIVATION STATUS — 2026-04-23

Version: v1.0.0  
Status: ACTIVE  
Owner: Team 1  
Source lane: Team Email SMTP / Team D  
Scope: đối chiếu mail sender/relay proof và payment-live claim cho `omdalat.com`

---

## 0) Kết luận Team 1

Mail sender/relay cho `omdalat.com` đã xanh ở lớp mailbox, alias, inbound route và outbound relay.

Payment live **chưa được claim**.

Không được dùng proof mail để nói payment đã live.

---

## 1) Proof đã đọc

Proof external:

```text
/Users/tranhatam/Documents/Devnewproject/iai-platform-worktree/docs/iai-mail-platform/OMDALAT_COM_TEAM_EMAIL_SMTP_MAILBOX_INBOUND_PROOF_2026-04-23.md
```

Team D checker được báo cáo đã pass:

```bash
node scripts/pay-team-d-omdalat-evidence-check.mjs --date=2026-04-23
```

Ghi chú Team 1: khi chạy lại checker từ sandbox hiện tại, script bị chặn ghi file status vào `iai-platform-worktree` với lỗi `EPERM`. Đây là giới hạn sandbox trong phiên này, không phải bằng chứng fail của checker. Team 1 đã đọc được proof markdown và đối chiếu nội dung chính.

---

## 2) Mail domain baseline

Domain: `omdalat.com`

Mail DNS baseline:

- `MX omdalat.com = 10 mail.iai.one.`
- SPF có `v=spf1 mx a:mail.iai.one ~all`
- DMARC có `p=quarantine`, `adkim=s`, `aspf=s`, `pct=100`
- DKIM `mail._domainkey.omdalat.com` chưa có TXT trong proof này

Kết luận:

- Inbound MX đã trỏ về `mail.iai.one`.
- SPF/DMARC baseline có.
- DKIM/domain-auth outbound cho payment sender vẫn cần proof riêng trước khi claim payment live.

---

## 3) Mailbox và alias

Mailbox thật:

- `support@omdalat.com`
- `noreply@omdalat.com`
- `hello@omdalat.com`
- `app@omdalat.com`

Alias active:

- `pay@omdalat.com` -> `support@omdalat.com`
- `billing@omdalat.com` -> `support@omdalat.com`

Operational lock:

- `pay@omdalat.com` và `billing@omdalat.com` là sender/alias hợp lệ cho lane payment mail.
- `support@omdalat.com` là mailbox reply-to/support owner.
- `noreply@omdalat.com` là mailbox thật nhưng không dùng làm payment sender.

---

## 4) Inbound route proof

Route proof message:

```text
<omdalat-mailbox-route-proof-1776924190-19599@mail.iai.one>
```

Kết quả proof:

- `pay@omdalat.com` route vào `support@omdalat.com`
- `billing@omdalat.com` route vào `support@omdalat.com`
- `support@omdalat.com` nhận trực tiếp
- `noreply@omdalat.com` nhận trực tiếp
- Dovecot search có match ở `support@omdalat.com` và `noreply@omdalat.com`

Status: `PASS`

---

## 5) Outbound relay proof

Relay:

- Mailcow relay qua `smtp.sendgrid.net:587`
- TLS enabled
- Queue rỗng sau test

Smoke thật đã gửi từ 4 sender:

- `pay@omdalat.com`
- `billing@omdalat.com`
- `support@omdalat.com`
- `noreply@omdalat.com`

Tới 2 Gmail:

- `tranhatam66@gmail.com`
- `tranhatam@gmail.com`

Kết quả:

- 8/8 email được provider nhận `250 Ok`
- Postfix queue rỗng

Status: `PASS_PROVIDER_ACCEPTANCE`

Ghi chú:

- Đây là provider acceptance proof.
- Vẫn cần human inbox proof ở hai Gmail nếu dùng làm payment-live proof packet.

---

## 6) Payment-live blockers còn mở

Status: `LOCK_RETAINED_WITH_REASON`

Payment live chưa được claim vì còn thiếu:

- `MAIL_API_BASE_URL` runtime binding trên pay worker
- `MAIL_API_KEY` secure binding
- `MAIL_API_WORKSPACE_ID` binding được phép gửi cho `omdalat.com`
- `PAY_EMAIL_ADAPTER_INTERNAL_KEY` binding
- `/v1/send` accepted proof cho `pay@omdalat.com` hoặc `billing@omdalat.com`
- provider ref từ real hoặc true sandbox payment action
- mail `messageId`
- D1/canonical evidence row
- external inbox proof cho payment mail trong cả hai Gmail inbox
- pay gate unlock khỏi `LOCK_RETAINED_WITH_REASON`

`BCC` vẫn `OFF`.

---

## 7) Team 1 release interpretation

Đối với repo `omdalat.com` hiện tại:

- Mail sender/relay external: `PASS`
- Email smoke web/app runtime: `PASS`
- Payment UI/checkout trong release web hiện tại: `PHASE_2_NOT_IN_SCOPE`
- Payment activation external: `NOT LIVE`, `LOCK_RETAINED_WITH_REASON`

Quy tắc:

- Không block live web hiện tại chỉ vì payment activation external chưa live nếu payment đã được khóa Phase 2.
- Không được ghi “payment live” ở bất kỳ release note nào cho tới khi đủ proof ở mục 6.
- Nếu Founder đưa payment trở lại scope live đồng bộ, Team D/Team 3 phải đóng toàn bộ blocker ở mục 6 trước khi Team 1 đổi trạng thái.

