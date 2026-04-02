import {
  ANGEL_EDU_TAM_FOUNDATION,
  OMDALAT_INBOXES,
  OMDALAT_OPERATING_ENTITY,
  OMDALAT_SITE_BRAND
} from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";

export async function AppFooter() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const operatorName = isVi ? OMDALAT_OPERATING_ENTITY.legalNameVi : OMDALAT_OPERATING_ENTITY.legalNameEn;

  return (
    <footer className="app-footer">
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
          <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.hello}`}>
            {OMDALAT_INBOXES.hello}
          </a>
          {" · "}
          <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.join}`}>
            {OMDALAT_INBOXES.join}
          </a>
        </p>
      </div>
    </footer>
  );
}
