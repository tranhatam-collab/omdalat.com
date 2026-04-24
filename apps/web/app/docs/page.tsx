import type { Metadata } from "next";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";
import {
  pickDocsText,
  publicDocsSections,
  resolveDocsHref
} from "../../lib/public-docs";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Hướng dẫn Ôm Đà Lạt",
      en: "Om Dalat Guides"
    },
    description: {
      vi: "Điểm bắt đầu để hiểu hệ, cách tham gia và các quy tắc nền của Ôm Đà Lạt.",
      en: "The starting point for understanding the system, how to join, and the ground rules of Om Dalat."
    },
    path: "/docs"
  });
}

export default async function DocsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Hướng dẫn" : "Guides"}</p>
      <h1>{locale === "vi" ? "Trung tâm hướng dẫn" : "Guide center"}</h1>
      <p>
        {locale === "vi"
          ? "Toàn bộ hướng dẫn công khai và lối vào khu thành viên đều nằm trên cùng hệ omdalat.com."
          : "All public guides and the entry into the member area now live on the same omdalat.com system."}
      </p>

      <div className="runtime-page-grid">
        {publicDocsSections.map((section) => (
          <section className="runtime-panel" key={pickDocsText(locale, section.title)}>
            <h2>{pickDocsText(locale, section.title)}</h2>
            <div className="runtime-docs-list">
              {section.links.map((link) => (
                <a className="runtime-link-card" href={resolveDocsHref(locale, link.href)} key={link.href}>
                  <strong>{pickDocsText(locale, link.label)}</strong>
                  <span>{pickDocsText(locale, link.summary)}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
