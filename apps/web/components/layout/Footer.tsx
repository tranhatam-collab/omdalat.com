import {
  ANGEL_EDU_TAM_FOUNDATION,
  OMDALAT_INBOXES,
  OMDALAT_OPERATING_ENTITY,
  OMDALAT_SITE_BRAND,
  localizePath
} from "../../../../packages/core";
import { contextRoutes } from "../../lib/routes";
import { getRequestLocale } from "../../lib/locale";

const secondaryLabels: Record<string, { vi: string; en: string }> = {
  "/about": { vi: "Giới thiệu", en: "About" },
  "/vision": { vi: "Tầm nhìn", en: "Vision" },
  "/trust": { vi: "Niềm tin", en: "Trust" },
  "/faq": { vi: "Câu hỏi thường gặp", en: "FAQ" },
  "/privacy": { vi: "Quyền riêng tư", en: "Privacy" },
  "/terms": { vi: "Điều khoản", en: "Terms" },
  "/contact": { vi: "Liên hệ", en: "Contact" }
};

export async function Footer() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const operatorName = isVi ? OMDALAT_OPERATING_ENTITY.legalNameVi : OMDALAT_OPERATING_ENTITY.legalNameEn;

  return (
    <footer className="runtime-footer">
      <div>
        <p>
          <strong>{OMDALAT_SITE_BRAND}</strong>
        </p>
        <p>
          {isVi ? "Tài trợ công nghệ và thiết kế ứng dụng:" : "Technology and application design sponsorship:"}{" "}
          {ANGEL_EDU_TAM_FOUNDATION.legalName}
        </p>
        <p>
          {isVi ? "Đơn vị QUẢN LÝ VẬN HÀNH:" : "Operating entity:"} {operatorName}
        </p>
        <p style={{ whiteSpace: "pre-line", margin: 0 }}>{OMDALAT_OPERATING_ENTITY.addressLines.join("\n")}</p>
        <p>
          <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a>
          {" · "}
          <a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a>
        </p>
      </div>
      <nav className="runtime-footer-links" aria-label="Secondary">
        {contextRoutes.map((route) => (
          <a href={localizePath(route.href, locale)} key={route.href}>
            {secondaryLabels[route.href]?.[locale] ?? route.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
