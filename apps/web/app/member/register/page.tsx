import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { registerMemberAction } from "../actions";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { buildRelativeReturnPath } from "../../../lib/member-auth";

type SearchParams = {
  next?: string;
  error?: string;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Register | Om Dalat",
  description: "Tạo tài khoản thành viên Om Dalat và bắt đầu bước đi tiếp theo.",
  path: "/member/register",
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

    if (error === "weak-password") {
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (error === "consent") {
      return "Vui lòng đồng ý điều khoản để tiếp tục.";
    }

    return "Đăng ký chưa thành công. Vui lòng thử lại.";
  }

  if (error === "invalid-email") {
    return "The email format is not valid.";
  }

  if (error === "weak-password") {
    return "Password must be at least 6 characters.";
  }

  if (error === "consent") {
    return "Please accept the terms to continue.";
  }

  return "Registration failed. Please try again.";
}

export default async function MemberRegisterPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { next, error } = await searchParams;
  const nextPath = buildRelativeReturnPath(next, "/member/welcome");
  const message = buildErrorMessage(locale, error);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Đăng ký" : "Register"}</p>
      <h1>{locale === "vi" ? "Đăng ký thành viên" : "Register for member access"}</h1>
      <p className="runtime-note">{locale === "vi" ? "Cài bước đầu để mở đúng luồng thành viên." : "Start with this entry step to unlock your member flow."}</p>

      {message ? <p className="runtime-status runtime-status--error">{message}</p> : null}

      <form action={registerMemberAction} className="runtime-form">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />

        <label className="runtime-field">
          <span>{locale === "vi" ? "Họ tên" : "Full name"}</span>
          <input className="runtime-input" type="text" name="name" required />
        </label>

        <label className="runtime-field">
          <span>{locale === "vi" ? "Email" : "Email"}</span>
          <input className="runtime-input" type="email" name="email" required placeholder={locale === "vi" ? "ban@example.com" : "you@example.com"} />
        </label>

        <label className="runtime-field">
          <span>{locale === "vi" ? "Mật khẩu" : "Password"}</span>
          <input className="runtime-input" type="password" name="password" required minLength={6} />
        </label>

        <label className="runtime-field runtime-inline">
          <input type="checkbox" name="agree" value="true" />
          <span>
            {locale === "vi"
              ? "Tôi đồng ý điều khoản và muốn tiếp tục nhận hướng dẫn thành viên."
              : "I agree to the terms and want to continue with member onboarding."}
          </span>
        </label>

        <button className="runtime-button primary" type="submit">
          {locale === "vi" ? "Tạo tài khoản" : "Create account"}
        </button>
      </form>

      <p className="runtime-note">
        {locale === "vi" ? "Đã có tài khoản?" : "Already have an account?"}{" "}
        <a href={localizePath(`/member/login?next=${encodeURIComponent(nextPath)}`, locale)}>
          {locale === "vi" ? "Đăng nhập ngay" : "Sign in now"}
        </a>
      </p>
    </article>
  );
}
