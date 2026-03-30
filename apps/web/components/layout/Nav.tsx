import { primaryRoutes } from "../../lib/routes";
import { getRequestLocale } from "../../lib/locale";
import { localizePath } from "../../../../packages/core";

const routeLabels: Record<string, { vi: string; en: string }> = {
  "/": { vi: "Trang chủ", en: "Home" },
  "/places": { vi: "Địa điểm", en: "Places" },
  "/hosts": { vi: "Host", en: "Hosts" },
  "/experts": { vi: "Chuyên gia", en: "Experts" },
  "/communities": { vi: "Cộng đồng", en: "Communities" },
  "/events": { vi: "Sự kiện", en: "Events" },
  "/proofs": { vi: "Bằng chứng", en: "Proofs" },
  "/join": { vi: "Tham gia", en: "Join" }
};

export async function Nav() {
  const locale = await getRequestLocale();

  return (
    <nav className="runtime-nav" aria-label="Primary">
      {primaryRoutes.map((route) => (
        <a href={localizePath(route.href, locale)} key={route.href}>
          {(routeLabels[route.href]?.[locale] ?? route.label)}
        </a>
      ))}
    </nav>
  );
}
