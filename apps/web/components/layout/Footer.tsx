import { ANGEL_EDU_TAM_FOUNDATION, OMDALAT_INBOXES, localizePath } from "../../../../packages/core";
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

  return (
    <footer className="runtime-footer">
      <div>
        <p>
          {locale === "vi" ? "Khung runtime OMDALAT cho `apps/web`." : "OMDALAT runtime scaffold for `apps/web`."}
        </p>
        <p>
          {locale === "vi"
            ? "Static route hiện tại vẫn hoạt động đến khi runtime này được gắn vào deployment."
            : "The static route remains active until this runtime is wired into deployment."}
        </p>
        <p>
          {locale === "vi" ? "Hộp thư công khai:" : "Public inboxes:"}{" "}
          <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a> ·{" "}
          <a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a>
        </p>
        <p>
          {locale === "vi" ? "Pháp nhân tài trợ:" : "Sponsoring legal entity:"}{" "}
          <strong>{ANGEL_EDU_TAM_FOUNDATION.legalName}</strong>
        </p>
        <p style={{ whiteSpace: "pre-line", margin: 0 }}>
          {ANGEL_EDU_TAM_FOUNDATION.addressLines.join("\n")}
        </p>
        <p>
          <a href={`mailto:${ANGEL_EDU_TAM_FOUNDATION.email}`}>{ANGEL_EDU_TAM_FOUNDATION.email}</a>
          {" · "}
          <a href="https://docs.iai.one/legal/">docs.iai.one/legal</a>
        </p>
        <p>
          {locale === "vi"
            ? "Ba trang omdalat.com, omdala.com và *.iai.one là bề mặt chính thức trong cùng khuôn khổ tài trợ; công nghệ cho omdalat.com được hỗ trợ hoàn toàn miễn phí."
            : "omdalat.com, omdala.com, and *.iai.one are official surfaces under the same sponsorship; technology for omdalat.com is fully sponsored at no charge."}
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
