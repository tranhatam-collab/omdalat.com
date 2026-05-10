import {
  ANGEL_EDU_TAM_FOUNDATION,
  buildAppToOmUrl,
  OMDALAT_INBOXES,
  OMDALAT_OPERATING_ENTITY,
  siteConfig
} from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";

export async function AppFooter() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const operatorName = isVi ? OMDALAT_OPERATING_ENTITY.legalNameVi : OMDALAT_OPERATING_ENTITY.legalNameEn;
  const omDocsHref = buildAppToOmUrl("/docs", locale, "app_footer_docs");
  const omHomeHref = buildAppToOmUrl("/", locale, "app_footer_home");

  return (
    <footer className="app-footer">
      <div>
        <p>
          <strong>{isVi ? "Ôm Đà Lạt App" : "Om Dalat App"}</strong>
        </p>
        <p>{isVi ? `Nền tảng hiện tại: ${siteConfig.name}` : `Current platform: ${siteConfig.name}`}</p>
        <p>
          {isVi ? "Tài trợ công nghệ và thiết kế ứng dụng:" : "Technology and application design sponsorship:"}{" "}
          {ANGEL_EDU_TAM_FOUNDATION.legalName}
        </p>
        <p>
          {isVi ? "Đơn vị QUẢN LÝ VẬN HÀNH:" : "Operating entity:"} {operatorName}
        </p>
        <p style={{ whiteSpace: "pre-line", margin: 0 }}>{OMDALAT_OPERATING_ENTITY.addressLines.join("\n")}</p>
        <p>
          <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.hello}`}>
            {OMDALAT_INBOXES.hello}
          </a>
          {" · "}
          <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.join}`}>
            {OMDALAT_INBOXES.join}
          </a>
          {" · "}
          <a className="app-inline-link" href={omDocsHref}>
            {isVi ? "Hướng dẫn Ôm Đà Lạt" : "Om Dalat guide"}
          </a>
          {" · "}
          <a className="app-inline-link" href={omHomeHref}>
            {isVi ? "Trang chủ Ôm Đà Lạt" : "Om Dalat homepage"}
          </a>
        </p>
      </div>
    </footer>
  );
}
