import { accountRoutes, appRoutes } from "../../lib/routes";
import { getRequestLocale } from "../../lib/locale";
import { localizePath } from "../../../../packages/core";

const appRouteLabels: Record<string, { vi: string; en: string }> = {
  "/dashboard": { vi: "Bảng điều khiển", en: "Dashboard" },
  "/places": { vi: "Địa điểm", en: "Places" },
  "/hosts": { vi: "Host", en: "Hosts" },
  "/experts": { vi: "Chuyên gia", en: "Experts" },
  "/communities": { vi: "Cộng đồng", en: "Communities" },
  "/events": { vi: "Sự kiện", en: "Events" },
  "/proofs": { vi: "Bằng chứng", en: "Proofs" },
  "/profile": { vi: "Hồ sơ", en: "Profile" },
  "/settings": { vi: "Cài đặt", en: "Settings" }
};

export async function AppNav() {
  const locale = await getRequestLocale();

  return (
    <div className="app-nav-wrap">
      <nav className="app-nav" aria-label={locale === "vi" ? "Điều hướng chính của ứng dụng" : "Primary app navigation"}>
        {appRoutes.map((route) => (
          <a href={localizePath(route.href, locale)} key={route.href}>
            {appRouteLabels[route.href]?.[locale] ?? route.label}
          </a>
        ))}
      </nav>
      <nav className="app-nav app-nav-secondary" aria-label={locale === "vi" ? "Điều hướng tài khoản" : "Account navigation"}>
        {accountRoutes.map((route) => (
          <a href={localizePath(route.href, locale)} key={route.href}>
            {appRouteLabels[route.href]?.[locale] ?? route.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
