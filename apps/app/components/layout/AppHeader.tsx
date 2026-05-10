import { getCurrentMember } from "../../lib/auth";
import { formatRoleLabel, formatSessionStatus } from "../../lib/i18n-copy";
import { getLocaleSwitchLinks } from "../../lib/locale";
import { getUnreadNotificationCount } from "../../lib/notifications";
import { buildAppToOmUrl } from "../../../../packages/core";

export async function AppHeader() {
  const { locale, switchLinks } = await getLocaleSwitchLinks();
  const currentMember = await getCurrentMember(locale);
  const unreadNotifications = getUnreadNotificationCount();
  const omDocsHref = buildAppToOmUrl("/docs", locale, "app_header_docs");
  const omHomeHref = buildAppToOmUrl("/", locale, "app_header_home");

  return (
    <header className="app-header">
      <div className="app-brand">
        <p className="app-kicker">{locale === "vi" ? "Member flow + dashboard" : "Member flow + dashboard"}</p>
        <strong>{locale === "vi" ? "Ôm Đà Lạt App" : "Om Dalat App"}</strong>
        <span>
          {currentMember.name} · {formatRoleLabel(currentMember.memberStatus ?? currentMember.role, locale)} ·{" "}
          {formatSessionStatus(currentMember.status, locale)}
        </span>
        <span>
          {locale === "vi"
            ? `${unreadNotifications} thông báo mới trong phiên hiện tại`
            : `${unreadNotifications} new notifications in the current session`}
        </span>
      </div>

      <div className="app-header-tools">
        {switchLinks.map((link) => (
          <a className="app-inline-link" href={link.href} key={link.code} aria-current={link.isActive ? "page" : undefined} title={link.nativeLabel}>
            {link.nativeLabel}
          </a>
        ))}
        <a className="app-inline-link" href={omDocsHref}>
          {locale === "vi" ? "Đọc hướng dẫn" : "Read the guide"}
        </a>
        <a className="app-inline-link" href={omHomeHref}>
          {locale === "vi" ? "Về omdalat.com" : "Back to omdalat.com"}
        </a>
      </div>
    </header>
  );
}
