import { getCurrentMember } from "../../lib/auth";
import { formatRoleLabel } from "../../lib/i18n-copy";
import { getLocaleSwitchLinks } from "../../lib/locale";
import { getUnreadNotificationCount } from "../../lib/notifications";
import { AppNav } from "./AppNav";

export async function AppHeader() {
  const { locale, viHref, enHref } = await getLocaleSwitchLinks();
  const currentMember = getCurrentMember(locale);
  const unreadNotifications = getUnreadNotificationCount();

  return (
    <header className="app-header">
      <div className="app-brand">
        <p className="app-kicker">{locale === "vi" ? "Tầng vận hành nội bộ" : "Local operating layer"}</p>
        <strong>OMDALAT App Runtime</strong>
        <span>
          {currentMember.name} · {formatRoleLabel(currentMember.role, locale)} · {currentMember.status}
        </span>
        <span>
          {locale === "vi"
            ? `${unreadNotifications} thông báo chưa đọc trong phiên demo hiện tại`
            : `${unreadNotifications} unread notifications in the current demo session`}
        </span>
        <span>
          <a className="app-inline-link" href={viHref} aria-current={locale === "vi" ? "page" : undefined}>
            Tiếng Việt
          </a>{" "}
          ·{" "}
          <a className="app-inline-link" href={enHref} aria-current={locale === "en" ? "page" : undefined}>
            English
          </a>
        </span>
      </div>
      <AppNav />
    </header>
  );
}
