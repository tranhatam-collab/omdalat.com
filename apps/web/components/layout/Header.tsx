import { buildOmToAppUrl, localizePath } from "../../../../packages/core";
import { Nav } from "./Nav";
import { getLocaleSwitchLinks } from "../../lib/locale";
import {
  canAccessSignedIn,
  MEMBER_SESSION_COOKIE_NAME,
  parseMemberSession
} from "../../lib/member-auth";
import { logoutMemberAction } from "../../app/member/logout-action";
import { cookies } from "next/headers";

export async function Header() {
  const { locale, switchLinks } = await getLocaleSwitchLinks();
  const cookieStore = await cookies();
  const session = parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);
  const isMemberSignedIn = canAccessSignedIn(session);
  const memberName = locale === "vi" ? `Xin chào, ${session.name}` : `Hi, ${session.name}`;
  const appSignInHref = buildOmToAppUrl("/member/login", locale, "header_signin");
  const appDashboardHref = buildOmToAppUrl("/dashboard", locale, "header_dashboard");
  const appMemberAreaHref = buildOmToAppUrl("/member/login?next=%2Fdashboard", locale, "header_member_area");
  const toolsAriaLabel = locale === "vi" ? "Ngôn ngữ và tài khoản" : "Language and member tools";
  const mobileMenuLabel = locale === "vi" ? "Mở menu điều hướng" : "Open navigation menu";

  function renderHeaderTools(className = "runtime-header-tools") {
    return (
      <div className={className} aria-label={toolsAriaLabel}>
        {switchLinks.map((link) => (
          <a href={link.href} aria-current={link.isActive ? "page" : undefined} key={link.code} title={link.nativeLabel}>
            {link.code.toUpperCase()}
          </a>
        ))}
        {isMemberSignedIn ? (
          <>
            <a href={appDashboardHref}>{memberName}</a>
            <form action={logoutMemberAction}>
              <input type="hidden" name="locale" value={locale} />
              <button type="submit" className="runtime-button secondary">
                {locale === "vi" ? "Đăng xuất" : "Sign out"}
              </button>
            </form>
          </>
        ) : (
          <a href={appSignInHref}>{locale === "vi" ? "Đăng nhập" : "Sign in"}</a>
        )}
        <a href={appMemberAreaHref}>{locale === "vi" ? "Thành viên" : "Member"}</a>
        <a className="runtime-button primary" href={localizePath("/join", locale)}>
          {locale === "vi" ? "Bắt đầu từ đây" : "Start here"}
        </a>
      </div>
    );
  }

  return (
    <header className="runtime-header">
      <div className="runtime-brand">
        <a href={localizePath("/", locale)} className="runtime-brand-link">
          <strong>{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</strong>
        </a>
        <span>
          {locale === "vi"
            ? "Sống. Làm. Học. Xây dựng tại Đà Lạt."
            : "Live. Work. Learn. Build in Dalat."}
        </span>
      </div>

      <div className="runtime-header-right">
        <Nav />
        {renderHeaderTools()}
      </div>

      <details className="runtime-mobile-menu">
        <summary className="runtime-mobile-menu-toggle" aria-label={mobileMenuLabel}>
          <span className="runtime-mobile-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="runtime-visually-hidden">{mobileMenuLabel}</span>
        </summary>
        <div className="runtime-mobile-menu-panel">
          <Nav />
          {renderHeaderTools("runtime-header-tools runtime-header-tools-mobile")}
        </div>
      </details>
    </header>
  );
}
