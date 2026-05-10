import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { SessionSwitcher } from "../../../components/SessionSwitcher";
import { getAuthFixtures, getCurrentMember } from "../../../lib/auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../../lib/metadata";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Đăng nhập thành viên",
      en: "Member sign in"
    },
    description: {
      vi: "Đăng nhập để đi vào đúng lớp thành viên, contributor, host hoặc vận hành.",
      en: "Sign in to enter the right member, contributor, host, or operating layer."
    },
    path: "/member/login"
  });
}

export default async function MemberLoginPage({ searchParams }: LoginPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const fixtures = getAuthFixtures(locale);
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const next = readSearchParamValue(resolvedSearchParams.next) || localizePath("/dashboard", locale);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Đăng nhập và đổi phiên" : "Sign in and switch session"}</p>
      <h1>{isVi ? "Đi vào đúng lớp của bạn" : "Enter the layer that matches you"}</h1>
      <p>
        {isVi
          ? "Trong bản build này, đăng nhập đang đi qua các phiên fixture để team DEV kiểm tra đủ các trạng thái từ đăng ký tới contributor, host và operator."
          : "In this build, sign-in moves through fixture sessions so the team can inspect the full range from registration to contributor, host, and operator."}
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Bạn đang dùng" : "You are currently using"}</p>
          <h2>{currentMember.name}</h2>
          <ul className="app-list">
            <li>{currentMember.email || (isVi ? "Chưa có email" : "No email yet")}</li>
            <li>{currentMember.role}</li>
            <li>{currentMember.zone}</li>
          </ul>
          <div className="app-inline-actions">
            <a className="app-button app-button-secondary" href={localizePath("/member/register", locale)}>
              {isVi ? "Tạo tài khoản mới" : "Create a new account"}
            </a>
          </div>
        </section>

        <SessionSwitcher currentSession={currentMember} fixtures={fixtures} redirectTo={next} />
      </div>
    </section>
  );
}
