import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { loginMemberAction, requestMagicLinkAction } from "../actions";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { buildRelativeReturnPath } from "../../../lib/member-auth";

type SearchParams = {
  next?: string;
  error?: string;
  magic?: string;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Sign In | Om Dalat",
  description: "Đăng nhập để tiếp tục truy cập khu vực thành viên Om Dalat.",
  path: "/member/login",
  noindex: true
});

function buildErrorMessage(locale: "vi" | "en", error?: string) {
  if (!error) {
    return null;
  }

  if (locale === "vi") {
    if (error === "invalid-email") {
      return "Email không đúng định dạng.";
    }

    if (error === "missing-password") {
      return "Nhập mật khẩu để tiếp tục.";
    }

    return "Đăng nhập thất bại. Vui lòng thử lại.";
  }

  if (error === "invalid-email") {
    return "The email format is not valid.";
  }

  if (error === "missing-password") {
    return "Please enter your password.";
  }

  return "Login failed. Please try again.";
}

function buildMagicMessage(locale: "vi" | "en", magic?: string) {
  if (!magic) {
    return null;
  }

  if (magic === "sent") {
    return locale === "vi"
      ? "Link đăng nhập và mã xác thực đã được gửi tới email của bạn."
      : "A sign-in link and verification code were sent to your email.";
  }

  if (magic === "failed") {
    return locale === "vi"
      ? "Không gửi được magic link. Vui lòng thử lại sau."
      : "Failed to send the magic link. Please try again.";
  }

  return null;
}

export default async function MemberLoginPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { next, error, magic } = await searchParams;
  const nextPath = buildRelativeReturnPath(next, "/member/welcome");
  const message = buildErrorMessage(locale, error);
  const magicMessage = buildMagicMessage(locale, magic);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Đăng nhập" : "Sign in"}</p>
      <h1>{locale === "vi" ? "Đăng nhập thành viên" : "Member sign in"}</h1>
      <p className="runtime-note">{locale === "vi" ? "Bạn đã có tài khoản, hãy vào tiếp luồng thành viên." : "Use your account to continue the member path."}</p>

      {message ? <p className="runtime-status runtime-status--error">{message}</p> : null}
      {magicMessage ? <p className={magic === "failed" ? "runtime-status runtime-status--error" : "runtime-status"}>{magicMessage}</p> : null}

      <form action={loginMemberAction} className="runtime-form">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />

        <label className="runtime-field">
          <span>{locale === "vi" ? "Email" : "Email"}</span>
          <input className="runtime-input" type="email" name="email" required placeholder={locale === "vi" ? "ban@example.com" : "you@example.com"} />
        </label>

        <label className="runtime-field">
          <span>{locale === "vi" ? "Mật khẩu" : "Password"}</span>
          <input className="runtime-input" type="password" name="password" required minLength={6} />
        </label>

        <button className="runtime-button primary" type="submit">
          {locale === "vi" ? "Đăng nhập" : "Sign in"}
        </button>
      </form>

      <form action={requestMagicLinkAction} className="runtime-form">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />

        <label className="runtime-field">
          <span>{locale === "vi" ? "Email nhận magic link" : "Email for magic link"}</span>
          <input className="runtime-input" type="email" name="email" required placeholder={locale === "vi" ? "ban@example.com" : "you@example.com"} />
        </label>

        <button className="runtime-button secondary" type="submit">
          {locale === "vi" ? "Gửi magic link" : "Send magic link"}
        </button>
      </form>

      <p className="runtime-note">
        {locale === "vi" ? "Chưa có tài khoản?" : "No account yet?"}{" "}
        <a href={localizePath(`/member/register?next=${encodeURIComponent(nextPath)}`, locale)}>
          {locale === "vi" ? "Đăng ký tại đây" : "Create one here"}
        </a>
      </p>
    </article>
  );
}
