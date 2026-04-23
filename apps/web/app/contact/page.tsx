import { localizePath } from "../../../../packages/core";
import {
  ANGEL_EDU_TAM_FOUNDATION,
  OMDALAT_INBOXES,
  OMDALAT_OPERATING_ENTITY
} from "../../../../packages/core";
import { ContextHelpSection } from "../../components/shared/ContextHelpSection";
import { getDocsContext, pickDocsText } from "../../lib/docs-map";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";
import { resolveDocsHref } from "../../lib/public-docs";
import { ContactForm } from "./ContactForm";

export async function generateMetadata() {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Liên hệ Ôm Đà Lạt",
      en: "Contact Om Dalat"
    },
    description: {
      vi: "Kênh liên hệ chính thức của Ôm Đà Lạt cho hỗ trợ, hợp tác, tham gia và các câu hỏi vận hành.",
      en: "The official contact channel for Om Dalat support, partnerships, participation, and operations questions."
    },
    path: "/contact"
  });
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const docsContext = getDocsContext("/contact");

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Liên hệ" : "Contact"}</p>
      <h1>{locale === "vi" ? "Liên hệ Ôm Đà Lạt" : "Contact Om Dalat"}</h1>
      <p>
        {locale === "vi"
          ? "Đây là kênh liên hệ chính thức cho hỗ trợ, hợp tác, tham gia và các câu hỏi pháp lý của Ôm Đà Lạt."
          : "This is the official contact channel for support, partnerships, participation, and legal questions for Om Dalat."}
      </p>
      <div className="runtime-actions">
        <a className="runtime-button secondary" href={resolveDocsHref(locale, docsContext.primary.href)}>
          {pickDocsText(locale, docsContext.primary.label)}
        </a>
        <a className="runtime-button secondary" href={localizePath("/stay", locale)}>
          {locale === "vi" ? "Xem cách ở lại" : "See stay options"}
        </a>
      </div>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Biểu mẫu liên hệ" : "Contact form"}</h2>
          <p className="runtime-note">
            {locale === "vi"
              ? "Dùng biểu mẫu này khi bạn muốn tham gia, hỏi thông tin, hợp tác hoặc cần hỗ trợ."
              : "Use this form if you want to join, ask a question, explore a partnership, or request support."}
          </p>
          <ContactForm locale={locale} />
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Hộp thư chính thức" : "Official inboxes"}</h2>
          <ul className="runtime-list">
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a> —{" "}
              {locale === "vi" ? "tiếp nhận công khai" : "public intake"}
            </li>
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a> —{" "}
              {locale === "vi" ? "onboarding và tham gia" : "onboarding and participation"}
            </li>
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a> —{" "}
              {locale === "vi" ? "hỗ trợ và vận hành" : "support and operations"}
            </li>
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.app}`}>{OMDALAT_INBOXES.app}</a> —{" "}
              {locale === "vi" ? "luồng app và thông báo" : "app workflow and notifications"}
            </li>
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.partnerships}`}>{OMDALAT_INBOXES.partnerships}</a> —{" "}
              {locale === "vi" ? "hợp tác" : "partnerships"}
            </li>
            <li>
              <a href={`mailto:${OMDALAT_INBOXES.trust}`}>{OMDALAT_INBOXES.trust}</a> —{" "}
              {locale === "vi" ? "luồng trust và bằng chứng" : "trust and proof routing"}
            </li>
          </ul>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Pháp lý và vận hành" : "Legal and operations"}</h2>
          <p>
            {locale === "vi"
              ? "Đơn vị quản lý vận hành website omdalat.com: CÔNG TNHH THÁI LÂM (ĐÀ LẠT). Tài trợ công nghệ và thiết kế ứng dụng: Angel Edu Tam Foundation Inc."
              : "Operating entity for omdalat.com: THAI LAM CO., LTD (DA LAT). Technology and application design sponsorship: Angel Edu Tam Foundation Inc."}
          </p>
          <p style={{ whiteSpace: "pre-line" }}>{OMDALAT_OPERATING_ENTITY.addressLines.join("\n")}</p>
          <p>
            <strong>{ANGEL_EDU_TAM_FOUNDATION.legalName}</strong>
          </p>
          <p>
            <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a>
            {" · "}
            <a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a>
          </p>
        </section>
      </div>
      <ContextHelpSection context={docsContext} />
    </article>
  );
}
