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
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#1e7a5b">OMDALAT</p>
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
    subject: `[OMDALAT Contact] ${input.name} · ${input.topic}`,
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
    subject: "OMDALAT received your message / OMDALAT đã nhận liên hệ của bạn",
    html: frameEmail(
      "We received your message / Chúng tôi đã nhận tin nhắn của bạn",
      `
        <p>Xin chào ${escapeHtml(input.name)},</p>
        <p>OMDALAT đã nhận liên hệ của bạn và sẽ phản hồi từ <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong> hoặc <strong>${escapeHtml(OMDALAT_INBOXES.hello)}</strong>.</p>
        <p>Hello ${escapeHtml(input.name)},</p>
        <p>OMDALAT received your message and will reply from <strong>${escapeHtml(OMDALAT_INBOXES.support)}</strong> or <strong>${escapeHtml(OMDALAT_INBOXES.hello)}</strong>.</p>
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
    subject: `[OMDALAT App Support] ${input.subject}`,
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
    subject: "OMDALAT support request received / OMDALAT đã nhận yêu cầu hỗ trợ",
    html: frameEmail(
      "Support request received / Đã nhận yêu cầu hỗ trợ",
      `
        <p>Chúng tôi đã nhận yêu cầu hỗ trợ của bạn với chủ đề <strong>${escapeHtml(input.subject)}</strong>.</p>
        <p>We received your support request with the subject <strong>${escapeHtml(input.subject)}</strong>.</p>
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

export async function sendPublicContactIntake(input: ContactInput) {
  await Promise.all([sendMail(buildContactInternalEmail(input)), sendMail(buildContactAckEmail(input))]);
}

export async function sendMemberSupportRequest(input: SupportInput) {
  await Promise.all([sendMail(buildSupportInternalEmail(input)), sendMail(buildSupportAckEmail(input))]);
}
