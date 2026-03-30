import type { Metadata } from "next";
import {
  ANGEL_EDU_TAM_FOUNDATION,
  OMDALAT_INBOXES,
  OMDALAT_OPERATING_ENTITY
} from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact OMDALAT",
  description: "Contact paths, partnership intake, and support routing for OMDALAT.",
  path: "/contact"
});

export default async function ContactPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "runtime liên hệ" : "Contact runtime"}</p>
      <h1>{locale === "vi" ? "Liên hệ OMDALAT" : "Contact OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Liên hệ công khai hiện đã đi vào lớp email vận hành của OMDALAT cho hỗ trợ, hợp tác, onboarding địa điểm và tham gia city-layer."
          : "Public contact now routes into the live OMDALAT email layer for support, partnerships, place onboarding, and city-layer participation."}
      </p>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Biểu mẫu liên hệ" : "Contact form"}</h2>
          <p className="runtime-note">
            {locale === "vi"
              ? "Dùng route này cho hỗ trợ, tham gia, hợp tác địa phương hoặc các câu hỏi về trust."
              : "Use this route for support, participation, local partnerships, or trust questions."}
          </p>
          <ContactForm />
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
    </article>
  );
}
