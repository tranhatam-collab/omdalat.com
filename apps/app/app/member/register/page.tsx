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
