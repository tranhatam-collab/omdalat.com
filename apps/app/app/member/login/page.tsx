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

  const googleHref = `/api/auth/google/start?locale=${locale}&next=${encodeURIComponent(next)}`;

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Đăng nhập và đổi phiên" : "Sign in and switch session"}</p>
      <h1>{isVi ? "Đi vào đúng lớp của bạn" : "Enter the layer that matches you"}</h1>
      <p>
        {isVi
          ? "Trong bản build này, đăng nhập đang đi qua các phiên fixture để team DEV kiểm tra đủ các trạng thái từ đăng ký tới contributor, host và operator."
          : "In this build, sign-in moves through fixture sessions so the team can inspect the full range from registration to contributor, host, and operator."}
      </p>

      <div className="app-panel" style={{ marginBottom: "0.5rem" }}>
        <a
          href={googleHref}
          className="app-button"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
          </svg>
          {isVi ? "Đăng nhập bằng Google" : "Sign in with Google"}
        </a>
        <p className="app-note" style={{ marginTop: "8px", fontSize: "12px", opacity: 0.65 }}>
          {isVi ? "Hoặc chọn phiên dev bên dưới" : "Or select a dev session below"}
        </p>
      </div>

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
