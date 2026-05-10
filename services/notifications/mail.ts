import { OMDALAT_INBOXES, OMDALAT_MAIL_API_ORIGIN } from "../../packages/core";

type MailPayload = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

type ContactInput = {
  name: string;
  email: string;
  organization?: string;
  topic: string;
  message: string;
  source: string;
};

type SupportInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  route: string;
  role: string;
  zone: string;
};

type JoinInput = {
  name: string;
  email: string;
  source: string;
  nextPath: string;
  locale: string;
};

type VerificationCodeInput = {
  name: string;
  email: string;
  code: string;
  verifyLink: string;
  expiresInMinutes: number;
};

type MagicLinkInput = {
  name: string;
  email: string;
  magicLink: string;
  expiresInMinutes: number;
};

type VerificationSuccessInput = {
  name: string;
  email: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getMailEnvironment() {
  const mailApiUrl = (process.env.MAIL_API_URL ?? OMDALAT_MAIL_API_ORIGIN).replace(/\/+$/g, "");
  const mailApiKey = process.env.MAIL_API_KEY ?? "";

  if (!mailApiKey) {
    throw new Error("MAIL_API_KEY is not configured for OMDALAT.");
  }

  return { mailApiKey, mailApiUrl };
}

async function sendMail(payload: MailPayload) {
  const { mailApiKey, mailApiUrl } = getMailEnvironment();
  const response = await fetch(`${mailApiUrl}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mailApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Mail API returned ${response.status}: ${detail}`);
  }
}

function frameEmail(title: string, body: string) {
  return `
    <div style="background:#eef4ef;padding:24px;font-family:'Avenir Next','Helvetica Neue','Segoe UI',sans-serif;color:#153126">
      <div style="max-width:640px;margin:0 auto;background:rgba(255,255,255,0.92);border:1px solid rgba(21,49,38,0.12);border-radius:24px;padding:28px">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#1e7a5b">Ôm Đà Lạt · Om Dalat</p>
        <h1 style="margin:0 0 16px;font-family:'Iowan Old Style','Palatino Linotype','Book Antiqua',serif;font-size:30px;line-height:1.1">${escapeHtml(title)}</h1>
        <div style="color:#4f675d;line-height:1.7;font-size:15px">${body}</div>
      </div>
    </div>
  `;
}

function buildContactInternalEmail(input: ContactInput): MailPayload {
  return {
    from: `OMDALAT Contact <${OMDALAT_INBOXES.hello}>`,
    to: OMDALAT_INBOXES.hello,
    reply_to: input.email,
    subject: `[Ôm Đà Lạt Contact] ${input.name} · ${input.topic}`,
    html: frameEmail(
      "New public contact / Liên hệ công khai mới",
      `
        <p><strong>Tên / Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Tổ chức / Organization:</strong> ${escapeHtml(input.organization || "N/A")}</p>
        <p><strong>Chủ đề / Topic:</strong> ${escapeHtml(input.topic)}</p>
        <p><strong>Nguồn / Source:</strong> ${escapeHtml(input.source)}</p>
        <p><strong>Nội dung / Message:</strong></p>
        <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
      `
    ),
    text: [
      "New public contact / Liên hệ công khai mới",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Organization: ${input.organization || "N/A"}`,
      `Topic: ${input.topic}`,
      `Source: ${input.source}`,
      "",
      input.message
    ].join("\n")
  };
}

function buildContactAckEmail(input: ContactInput): MailPayload {
  return {
    from: `OMDALAT <${OMDALAT_INBOXES.hello}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.support,
    subject: "Ôm Đà Lạt đã nhận tin của bạn | Om Dalat received your message",
    html: frameEmail(
      "Chúng tôi đã nhận tin của bạn | We received your message",
      `
        <p>Xin chào ${escapeHtml(input.name)},</p>
        <p>Ôm Đà Lạt đã ghi nhận liên hệ của bạn. Đội ngũ sẽ phản hồi từ <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong> hoặc <strong>${escapeHtml(OMDALAT_INBOXES.hello)}</strong> theo cách gọn và rõ.</p>
        <p>Hello ${escapeHtml(input.name)},</p>
        <p>Om Dalat has noted your message. The team will reply from <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong> or <strong>${escapeHtml(OMDALAT_INBOXES.hello)}</strong> in a clear and calm way.</p>
      `
    ),
    text: [
      "OMDALAT received your message / OMDALAT đã nhận liên hệ của bạn",
      `Reply from: ${OMDALAT_INBOXES.support}`
    ].join("\n")
  };
}

function buildSupportInternalEmail(input: SupportInput): MailPayload {
  return {
    from: `OMDALAT App <${OMDALAT_INBOXES.app}>`,
    to: OMDALAT_INBOXES.support,
    reply_to: input.email,
    subject: `[Ôm Đà Lạt Support] ${input.subject}`,
    html: frameEmail(
      "New app support request / Yêu cầu hỗ trợ app mới",
      `
        <p><strong>Người gửi / Sender:</strong> ${escapeHtml(input.name)} (${escapeHtml(input.email)})</p>
        <p><strong>Vai trò / Role:</strong> ${escapeHtml(input.role)}</p>
        <p><strong>Khu vực / Zone:</strong> ${escapeHtml(input.zone)}</p>
        <p><strong>Route:</strong> ${escapeHtml(input.route)}</p>
        <p><strong>Chủ đề / Subject:</strong> ${escapeHtml(input.subject)}</p>
        <p><strong>Nội dung / Message:</strong></p>
        <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
      `
    ),
    text: [
      "New app support request / Yêu cầu hỗ trợ app mới",
      `Sender: ${input.name} <${input.email}>`,
      `Role: ${input.role}`,
      `Zone: ${input.zone}`,
      `Route: ${input.route}`,
      `Subject: ${input.subject}`,
      "",
      input.message
    ].join("\n")
  };
}

function buildSupportAckEmail(input: SupportInput): MailPayload {
  return {
    from: `OMDALAT App <${OMDALAT_INBOXES.app}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.support,
    subject: "Ôm Đà Lạt đã nhận yêu cầu hỗ trợ | Om Dalat support request received",
    html: frameEmail(
      "Yêu cầu hỗ trợ đã được ghi nhận | Support request received",
      `
        <p>Yêu cầu hỗ trợ của bạn với chủ đề <strong>${escapeHtml(input.subject)}</strong> đã được ghi nhận.</p>
        <p>Your support request with subject <strong>${escapeHtml(input.subject)}</strong> has been noted.</p>
        <p>Đội ngũ sẽ phản hồi từ <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong>.</p>
        <p>The team will reply from <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong>.</p>
      `
    ),
    text: [
      "Support request received / Đã nhận yêu cầu hỗ trợ",
      `Subject: ${input.subject}`,
      `Reply from: ${OMDALAT_INBOXES.support}`
    ].join("\n")
  };
}

function buildJoinInternalEmail(input: JoinInput): MailPayload {
  return {
    from: `OMDALAT Join <${OMDALAT_INBOXES.join}>`,
    to: OMDALAT_INBOXES.join,
    reply_to: input.email,
    subject: `[Ôm Đà Lạt Join] ${input.name} · ${input.locale.toUpperCase()}`,
    html: frameEmail(
      "New member join intake / Đơn tham gia mới",
      `
        <p><strong>Tên / Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Nguồn / Source:</strong> ${escapeHtml(input.source)}</p>
        <p><strong>Luồng tiếp theo / Next path:</strong> ${escapeHtml(input.nextPath)}</p>
        <p><strong>Ngôn ngữ / Locale:</strong> ${escapeHtml(input.locale)}</p>
      `
    ),
    text: [
      "New member join intake / Đơn tham gia mới",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Source: ${input.source}`,
      `Next path: ${input.nextPath}`,
      `Locale: ${input.locale}`
    ].join("\n")
  };
}

function buildJoinAckEmail(input: JoinInput): MailPayload {
  return {
    from: `OMDALAT Join <${OMDALAT_INBOXES.join}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.join,
    subject: "Chúng tôi đã ghi nhận bạn ở đây | We have noted your presence here",
    html: frameEmail(
      "Đã ghi nhận yêu cầu tham gia | Join request noted",
      `
        <p>Chào ${escapeHtml(input.name)}, chúng tôi đã ghi nhận bạn ở đây.</p>
        <p>Từ giờ, khi có điều phù hợp, đội ngũ sẽ gửi tới bạn theo cách gọn và rõ.</p>
        <p>Hello ${escapeHtml(input.name)}, we have noted your presence here.</p>
        <p>When something fits, the team will send it your way in a clear and quiet manner.</p>
        <p>Địa chỉ phản hồi chính / Primary reply mailbox: <strong>${escapeHtml(OMDALAT_INBOXES.join)}</strong></p>
      `
    ),
    text: [
      "Join request received / Đã nhận yêu cầu tham gia",
      `Reply from: ${OMDALAT_INBOXES.join}`
    ].join("\n")
  };
}

function buildVerificationCodeEmail(input: VerificationCodeInput): MailPayload {
  return {
    from: `OMDALAT Verify <${OMDALAT_INBOXES.noreply}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.support,
    subject: "Mã xác thực Ôm Đà Lạt | Om Dalat verification code",
    html: frameEmail(
      "Mã xác thực của bạn | Your verification code",
      `
        <p>Chào ${escapeHtml(input.name)}, mã xác thực của bạn là:</p>
        <p style="font-size:28px;letter-spacing:0.2em;font-weight:700">${escapeHtml(input.code)}</p>
        <p>Mã sẽ hết hạn sau <strong>${input.expiresInMinutes} phút</strong>.</p>
        <p>Hello ${escapeHtml(input.name)}, your verification code is:</p>
        <p style="font-size:28px;letter-spacing:0.2em;font-weight:700">${escapeHtml(input.code)}</p>
        <p>The code expires in <strong>${input.expiresInMinutes} minutes</strong>.</p>
        <p><a href="${escapeHtml(input.verifyLink)}">Mở trang xác thực / Open verify page</a></p>
      `
    ),
    text: [
      "Verification code / Mã xác thực",
      `Code: ${input.code}`,
      `Expires in: ${input.expiresInMinutes} minutes`,
      `Verify link: ${input.verifyLink}`
    ].join("\n")
  };
}

function buildMagicLinkEmail(input: MagicLinkInput): MailPayload {
  return {
    from: `OMDALAT Sign In <${OMDALAT_INBOXES.noreply}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.support,
    subject: "Link đăng nhập Ôm Đà Lạt | Om Dalat sign-in link",
    html: frameEmail(
      "Link đăng nhập của bạn | Your sign-in link",
      `
        <p>Chào ${escapeHtml(input.name)}, bạn vừa yêu cầu link đăng nhập vào Ôm Đà Lạt.</p>
        <p>Hello ${escapeHtml(input.name)}, you requested a sign-in link for Om Dalat.</p>
        <p><a href="${escapeHtml(input.magicLink)}">Mở link đăng nhập / Open sign-in link</a></p>
        <p>Link sẽ hết hạn sau <strong>${input.expiresInMinutes} phút</strong>.</p>
        <p>This link expires in <strong>${input.expiresInMinutes} minutes</strong>.</p>
      `
    ),
    text: [
      "Magic sign-in link / Link đăng nhập",
      `Link: ${input.magicLink}`,
      `Expires in: ${input.expiresInMinutes} minutes`
    ].join("\n")
  };
}

function buildVerificationSuccessEmail(input: VerificationSuccessInput): MailPayload {
  return {
    from: `OMDALAT <${OMDALAT_INBOXES.noreply}>`,
    to: input.email,
    reply_to: OMDALAT_INBOXES.support,
    subject: "Bước tiếp theo đã mở ra | Your next step is now open",
    html: frameEmail(
      "Đã xác thực email | Email verified",
      `
        <p>Hồ sơ của bạn đã được xem và email đã xác thực.</p>
        <p>Bước tiếp theo dành cho bạn hiện đã mở ra.</p>
        <p>Your profile has been reviewed and your email is verified.</p>
        <p>The next step for you is now open.</p>
        <p>Nếu cần hỗ trợ, liên hệ <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong>.</p>
        <p>If you need help, contact <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong>.</p>
      `
    ),
    text: [
      "Email verified / Đã xác thực email",
      `Support: ${OMDALAT_INBOXES.support}`
    ].join("\n")
  };
}

export async function sendPublicContactIntake(input: ContactInput) {
  await Promise.all([sendMail(buildContactInternalEmail(input)), sendMail(buildContactAckEmail(input))]);
}

export async function sendMemberSupportRequest(input: SupportInput) {
  await Promise.all([sendMail(buildSupportInternalEmail(input)), sendMail(buildSupportAckEmail(input))]);
}

export async function sendMemberJoinIntake(input: JoinInput) {
  await Promise.all([sendMail(buildJoinInternalEmail(input)), sendMail(buildJoinAckEmail(input))]);
}

export async function sendMemberVerificationCode(input: VerificationCodeInput) {
  await sendMail(buildVerificationCodeEmail(input));
}

export async function sendMemberMagicLink(input: MagicLinkInput) {
  await sendMail(buildMagicLinkEmail(input));
}

export async function sendMemberVerificationSuccess(input: VerificationSuccessInput) {
  await sendMail(buildVerificationSuccessEmail(input));
}
