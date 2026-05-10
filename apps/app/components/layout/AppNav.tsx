import { headers } from "next/headers";
import { localizePath } from "../../../../packages/core";
import { appRoutes, supportRoutes } from "../../lib/routes";
import { getCurrentMember } from "../../lib/auth";
import { getRequestLocale } from "../../lib/locale";
import { canAccessContributor, canAccessEarnings, canAccessHost, canAccessOperator } from "../../lib/member-flow";

export async function AppNav() {
  const locale = await getRequestLocale();
  const currentMember = await getCurrentMember(locale);
  const headerStore = await headers();
  const currentPathname = headerStore.get("x-omdalat-pathname") ?? localizePath("/dashboard", locale);
  const status = currentMember.memberStatus ?? "guest";

  const visibleMainRoutes = appRoutes.filter((route) => {
    if (route.href === "/earnings") return canAccessEarnings(status);
    if (route.href === "/contributor") return canAccessContributor(status);
    if (route.href === "/places") return canAccessHost(status);
    if (route.href === "/admin/review") return canAccessOperator(status);
    return true;
  });

  const visibleSupportRoutes = supportRoutes.filter((route) => {
    if (route.href === "/apply") {
      return status !== "guest";
    }
    return true;
  });

  const statusLabel =
    locale === "vi"
      ? currentMember.status === "guest"
        ? "Khách"
        : currentMember.status.replaceAll("_", " ")
      : currentMember.status.replaceAll("_", " ");

  return (
    <aside className="app-sidebar">
      <section className="app-panel app-sidebar-panel">
        <p className="app-kicker">{locale === "vi" ? "Điều hướng dashboard" : "Dashboard navigation"}</p>
        <h2>{locale === "vi" ? "Không gian của bạn" : "Your workspace"}</h2>
        <p>
          {locale === "vi"
            ? "Mỗi mục mở ra theo đúng trạng thái và vai trò hiện tại."
            : "Each section opens according to your current state and role."}
        </p>
        <p className="app-sidebar-status">
          {locale === "vi" ? "Trạng thái hiện tại" : "Current status"}: <strong>{statusLabel}</strong>
        </p>
      </section>

      <nav className="app-nav app-nav-main" aria-label={locale === "vi" ? "Điều hướng chính của dashboard" : "Primary dashboard navigation"}>
        {visibleMainRoutes.map((route) => {
          const href = localizePath(route.href, locale);
          const isActive =
            currentPathname === href || currentPathname === route.href || currentPathname.startsWith(`${href}/`) || currentPathname.startsWith(`${route.href}/`);

          return (
            <a href={href} key={route.href} aria-current={isActive ? "page" : undefined}>
              {locale === "vi" ? route.vi : route.en}
            </a>
          );
        })}
      </nav>

      <nav className="app-nav app-nav-secondary" aria-label={locale === "vi" ? "Điều hướng hỗ trợ" : "Support navigation"}>
        {visibleSupportRoutes.map((route) => {
          const href = localizePath(route.href, locale);
          const isActive = currentPathname === href || currentPathname === route.href;

          return (
            <a href={href} key={route.href} aria-current={isActive ? "page" : undefined}>
              {locale === "vi" ? route.vi : route.en}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
