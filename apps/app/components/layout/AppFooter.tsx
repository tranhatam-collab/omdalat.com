import { ANGEL_EDU_TAM_FOUNDATION, OMDALAT_INBOXES } from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";

export async function AppFooter() {
  const locale = await getRequestLocale();

  return (
    <footer className="app-footer">
      <p>
        {locale === "vi"
          ? "App runtime dùng fixture cho `app.omdalat.com`."
          : "Fixture-backed app runtime for `app.omdalat.com`."}
      </p>
      <p>
        {locale === "vi" ? "Mail hỗ trợ:" : "Support mail:"}{" "}
        <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a> ·{" "}
        {locale === "vi" ? "Mail ứng dụng:" : "App mail:"}{" "}
        <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.app}`}>{OMDALAT_INBOXES.app}</a>
      </p>
      <p>
        {locale === "vi" ? "Pháp nhân tài trợ:" : "Sponsor:"}{" "}
        {ANGEL_EDU_TAM_FOUNDATION.legalName} ·{" "}
        <a className="app-inline-link" href={`mailto:${ANGEL_EDU_TAM_FOUNDATION.email}`}>
          {ANGEL_EDU_TAM_FOUNDATION.email}
        </a>
      </p>
    </footer>
  );
}
