import { primaryRoutes } from "../../lib/routes";
import { getRequestLocale } from "../../lib/locale";
import { localizePath } from "../../../../packages/core";

const routeLabels: Record<string, { vi: string; en: string }> = {
  "/": { vi: "Trang chủ", en: "Home" },
  "/life": { vi: "Sống", en: "Life" },
  "/work": { vi: "Làm", en: "Work" },
  "/learning": { vi: "Học", en: "Learning" },
  "/community": { vi: "Cộng đồng", en: "Community" },
  "/stay": { vi: "Ở lại", en: "Stay" },
  "/articles": { vi: "Bài viết", en: "Articles" },
  "/join": { vi: "Tham gia", en: "Join" }
};

export async function Nav() {
  const locale = await getRequestLocale();

  return (
    <nav className="runtime-nav" aria-label={locale === "vi" ? "Điều hướng chính" : "Primary"}>
      {primaryRoutes.map((route) => (
        <a href={localizePath(route.href, locale)} key={route.href}>
          {(routeLabels[route.href]?.[locale] ?? route.label)}
        </a>
      ))}
    </nav>
  );
}
