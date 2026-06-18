import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { registerMemberAction } from "../../actions";
import { getRequestLocale } from "../../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../../lib/metadata";

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Đăng ký thành viên",
      en: "Member registration"
    },
    description: {
      vi: "Tạo tài khoản cơ bản để bắt đầu luồng tham gia Ôm Đà Lạt.",
      en: "Create a basic account to begin the Om Dalat member flow."
    },
    path: "/member/register"
  });
}

export default async function MemberRegisterPage({ searchParams }: RegisterPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const next = readSearchParamValue(resolvedSearchParams.next) || localizePath("/apply", locale);
  const error = readSearchParamValue(resolvedSearchParams.error);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Tạo tài khoản" : "Create an account"}</p>
      <h1>{isVi ? "Bắt đầu từ vài điều cơ bản" : "Begin with a few basics"}</h1>
      <p>
        {isVi
          ? "Đây không phải form booking. Đây là bước đầu để hệ biết bạn là ai trước khi đọc hồ sơ kỹ hơn."
          : "This is not a booking form. It is the first step so the system can know who you are before reading the application more carefully."}
      </p>

      {error ? (
        <div className="app-status app-status--error">
          {isVi ? "Bạn vẫn còn để trống vài trường cơ bản." : "A few basic fields are still missing."}
        </div>
      ) : null}

      {/* Google OAuth button */}
      <div className="app-panel" style={{ marginBottom: "0.5rem" }}>
        <a
          href={`/api/auth/google/start?locale=${locale}&next=${encodeURIComponent(next)}`}
          className="app-button"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          {isVi ? "Đăng ký / Đăng nhập bằng Google" : "Sign up / Sign in with Google"}
        </a>
        <p className="app-note" style={{ marginTop: "8px", fontSize: "12px", opacity: 0.65 }}>
          {isVi ? "Hoặc điền form bên dưới" : "Or fill the form below"}
        </p>
      </div>

      <form action={registerMemberAction} className="app-panel app-form app-form-compact">
        <input type="hidden" name="redirectTo" value={next} />
        <label className="app-field">
          <span>{isVi ? "Họ và tên" : "Full name"}</span>
          <input className="app-input" name="fullName" required />
        </label>
        <label className="app-field">
          <span>Email</span>
          <input className="app-input" type="email" name="email" required />
        </label>
        <button className="app-button" type="submit">
          {isVi ? "Tạo tài khoản cơ bản" : "Create a basic account"}
        </button>
      </form>
    </section>
  );
}
