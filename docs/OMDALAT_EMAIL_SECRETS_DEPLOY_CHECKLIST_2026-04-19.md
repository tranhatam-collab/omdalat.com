# OMDALAT EMAIL SECRETS DEPLOY CHECKLIST (2026-04-19)

Mục tiêu: khóa đúng biến runtime để luồng email tự động chạy ổn định cho bề mặt đang live.

## 1) `omdalat-web` (Cloudflare Pages)

### Bắt buộc
- `MAIL_API_KEY`
- `MEMBER_MAGIC_LINK_SECRET`

### Khuyến nghị (đồng bộ runtime hiện tại)
- `MAIL_API_URL=https://mail.iai.one/_mail`
- `NEXT_PUBLIC_WEB_ORIGIN=https://omdalat.com`
- `NEXT_PUBLIC_APP_ORIGIN=https://ap.omdalat.com`
- `OMDALAT_PUBLIC_ORIGIN=https://omdalat.com`
- `OMDALAT_APP_ORIGIN=https://ap.omdalat.com`

### Lệnh set secrets nhanh
```bash
printf '%s' "$MAIL_API_KEY" | wrangler pages secret put MAIL_API_KEY --project-name omdalat-web
printf '%s' "$MEMBER_MAGIC_LINK_SECRET" | wrangler pages secret put MEMBER_MAGIC_LINK_SECRET --project-name omdalat-web
printf '%s' "https://mail.iai.one/_mail" | wrangler pages secret put MAIL_API_URL --project-name omdalat-web
```

Lưu ý:
- Không đưa secret thô vào git.
- Sau khi set secret, bắt buộc redeploy production.

## 2) `ap.omdalat.com` (Vercel, runtime hiện tại)

Trạng thái runtime hiện tại: static editorial site, chưa có server mail sender nội bộ.

### Bắt buộc ngay bây giờ
- Không có secret mail bắt buộc cho bản static hiện tại.

### Nếu bật form/email automation ở bước sau
- `MAIL_API_URL`
- `MAIL_API_KEY`
- `CONTACT_REPLY_TO` (hoặc mailbox vận hành tương đương)

### Lệnh mẫu trên Vercel (chỉ dùng khi bật backend gửi mail)
```bash
vercel env add MAIL_API_URL production
vercel env add MAIL_API_KEY production
vercel env add CONTACT_REPLY_TO production
```

## 3) Checklist verify sau deploy

1. `omdalat-web`:
- POST `https://omdalat.com/api/contact` trả `200` + `ok: true`.
- Register/member verify gửi được:
  - join intake
  - verification code
  - magic link
  - verification success

2. `ap.omdalat.com`:
- Nếu vẫn static: xác nhận không có regression link/contact.
- Nếu đã bật backend form: chạy smoke contact riêng cho domain này.

## 4) Rule bảo mật

- Chỉ dùng secret manager của Cloudflare/Vercel.
- Không paste secret vào docs, commit, issue, hay chat nhóm công khai.
- Khi rotate key: cập nhật runtime trước, test smoke xong mới thu hồi key cũ.
