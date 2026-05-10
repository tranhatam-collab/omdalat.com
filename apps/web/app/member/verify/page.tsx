import type { Metadata } from "next";
import { verifyMemberAction } from "../actions";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { buildRelativeReturnPath, localizeMemberPath } from "../../../lib/member-auth";

type SearchParams = {
  next?: string;
  error?: string;
  sent?: string;
  code?: string;
  token?: string;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Verify Email | Om Dalat",
  description: "Xác minh email để mở tiếp các bước hồ sơ thành viên.",
  path: "/member/verify",
  noindex: true
});

function buildErrorMessage(locale: "vi" | "en", error?: string) {
  if (!error) {
    return null;
  }

  if (locale === "vi") {
    if (error === "invalid-code") {
      return "Mã xác thực chưa hợp lệ hoặc quá ngắn.";
    }

    return "Xác thực không thành công. Vui lòng thử lại.";
  }

  if (error === "invalid-code") {
    return "The verification code is invalid or too short.";
  }

  return "Verification failed. Please try again.";
}

function buildNextLink(locale: "vi" | "en") {
  return localizeMemberPath("/contact", locale);
}

export default async function MemberVerifyPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { next, error, sent, code, token } = await searchParams;
  const nextPath = buildRelativeReturnPath(next, "/member/profile");
  const message = buildErrorMessage(locale, error);
  const prefilledCode = (code ?? "").trim().slice(0, 12);
  const tokenValue = (token ?? "").trim();
  const sentMessage =
    sent === "1"
      ? locale === "vi"
        ? "Mã xác thực đã được gửi tới email của bạn."
        : "A verification code has been sent to your email."
      : null;

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Xác thực email" : "Email verification"}</p>
      <h1>{locale === "vi" ? "Nhập mã xác thực" : "Enter verification code"}</h1>
      <p className="runtime-note">
        {locale === "vi"
          ? "Nhập mã bạn nhận được trên email. Sau khi xác thực, bạn sẽ được chuyển sang hoàn thiện hồ sơ."
          : "Enter the code sent to your email. After verification, you can complete your profile."}
      </p>

      {message ? <p className="runtime-status runtime-status--error">{message}</p> : null}
      {sentMessage ? <p className="runtime-status">{sentMessage}</p> : null}

      <form action={verifyMemberAction} className="runtime-form">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />
        <input type="hidden" name="token" value={tokenValue} />

        <label className="runtime-field">
          <span>{locale === "vi" ? "Mã xác thực" : "Verification code"}</span>
          <input className="runtime-input" type="text" name="code" required minLength={4} defaultValue={prefilledCode} />
        </label>

        <button className="runtime-button primary" type="submit">
          {locale === "vi" ? "Xác thực" : "Verify"}
        </button>
      </form>

      <p className="runtime-note">
        {locale === "vi" ? "Chưa nhận được mã?" : "Didn't receive the code?"}{" "}
        <a href={buildNextLink(locale)}> {locale === "vi" ? "Liên hệ hỗ trợ" : "Contact support"}</a>
      </p>
    </article>
  );
}
