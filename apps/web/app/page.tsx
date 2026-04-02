import type { Metadata } from "next";
import { localizePath } from "../../../packages/core";
import { pickLocalized } from "../lib/i18n-copy";
import { homepageContent } from "../lib/homepage-content";
import { getRequestLocale } from "../lib/locale";
import { buildPageMetadata } from "../lib/metadata";
import { communities, events, experts, hosts, places, proofs, requests } from "../lib/public-data";
import { buildOrganizationSchema, buildWebSiteSchema } from "../lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT - Living technology city layer for trusted work, places, and proof",
  description:
    "OMDALAT coordinates places, hosts, experts, communities, requests, and proof to create trusted local opportunity in Da Lat.",
  path: "/"
});

export default async function HomePage() {
  const locale = await getRequestLocale();
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
  const liveSignalCards = [
    {
      label: locale === "vi" ? "Địa điểm đang mở" : "Active places",
      value: `${places.length}`,
      note: locale === "vi" ? "Không gian có thể vận hành ngay" : "Spaces that can host activity now"
    },
    {
      label: locale === "vi" ? "Host đã xác minh" : "Verified hosts",
      value: `${hosts.filter((host) => host.verified).length}`,
      note: locale === "vi" ? "Điều phối viên địa phương đáng tin cậy" : "Trusted local operators"
    },
    {
      label: locale === "vi" ? "Nhu cầu đang mở" : "Open requests",
      value: `${requests.filter((request) => request.status.toLowerCase() === "open").length}`,
      note: locale === "vi" ? "Yêu cầu có thể ghép nối ngay" : "Requests ready for matching"
    },
    {
      label: locale === "vi" ? "Proof đang hiển thị" : "Visible proofs",
      value: `${proofs.length}`,
      note: locale === "vi" ? "Bằng chứng tích lũy từ hoạt động thật" : "Proof generated from real activity"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <article className="runtime-page runtime-homepage">
        <p className="runtime-kicker">{pickLocalized(locale, homepageContent.eyebrow)}</p>
        <h1>{pickLocalized(locale, homepageContent.title)}</h1>
        <p>{pickLocalized(locale, homepageContent.intro)}</p>

        <div className="runtime-actions">
          <a className="runtime-button primary" href={localizePath("/what-is-omdalat", locale)}>
            {pickLocalized(locale, homepageContent.ctaSystem)}
          </a>
          <a className="runtime-button secondary" href={localizePath("/work-and-opportunity", locale)}>
            {pickLocalized(locale, homepageContent.ctaOpportunity)}
          </a>
          <a className="runtime-button secondary" href={localizePath("/join", locale)}>
            {pickLocalized(locale, homepageContent.ctaJoin)}
          </a>
        </div>

        <section className="runtime-section runtime-section-wide">
          <p className="runtime-kicker">{pickLocalized(locale, homepageContent.signalSectionKicker)}</p>
          <h2>{pickLocalized(locale, homepageContent.signalSectionTitle)}</h2>
          <div className="runtime-signal-grid">
            {liveSignalCards.map((card) => (
              <section className="runtime-panel" key={card.label}>
                <p className="runtime-meta">{card.label}</p>
                <p className="runtime-stat">{card.value}</p>
                <p>{card.note}</p>
              </section>
            ))}
          </div>
        </section>

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>{pickLocalized(locale, homepageContent.enginesTitle)}</h2>
            <ul className="runtime-list">
              {homepageContent.engines.map((item) => (
                <li key={item.en}>{pickLocalized(locale, item)}</li>
              ))}
            </ul>
          </section>
          <section className="runtime-panel">
            <h2>{pickLocalized(locale, homepageContent.servesTitle)}</h2>
            <ul className="runtime-list">
              {homepageContent.serves.map((item) => (
                <li key={item.en}>{pickLocalized(locale, item)}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="runtime-section runtime-section-wide">
          <p className="runtime-kicker">{pickLocalized(locale, homepageContent.seedKicker)}</p>
          <h2>{pickLocalized(locale, homepageContent.seedTitle)}</h2>
          <div className="runtime-card-grid">
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Địa điểm" : "Places"}</h3>
              <p>{places[0]?.name}</p>
              <p className="runtime-meta">{places[0] ? pickLocalized(locale, places[0].signal) : ""}</p>
            </section>
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Host" : "Hosts"}</h3>
              <p>{hosts[0]?.name}</p>
              <p className="runtime-meta">{hosts[0] ? pickLocalized(locale, hosts[0].focus) : ""}</p>
            </section>
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Experts" : "Experts"}</h3>
              <p>{experts[0]?.name}</p>
              <p className="runtime-meta">{experts[0] ? pickLocalized(locale, experts[0].specialty) : ""}</p>
            </section>
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Communities" : "Communities"}</h3>
              <p>{communities[0]?.name}</p>
              <p className="runtime-meta">{communities[0] ? pickLocalized(locale, communities[0].signal) : ""}</p>
            </section>
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Sự kiện" : "Events"}</h3>
              <p>{events[0]?.title}</p>
              <p className="runtime-meta">{events[0] ? pickLocalized(locale, events[0].date) : ""}</p>
            </section>
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Proof" : "Proofs"}</h3>
              <p>{proofs[0]?.title}</p>
              <p className="runtime-meta">{proofs[0] ? pickLocalized(locale, proofs[0].kind) : ""}</p>
            </section>
          </div>
        </section>

        <section className="runtime-section runtime-section-wide">
          <p className="runtime-kicker">{pickLocalized(locale, homepageContent.pagesKicker)}</p>
          <h2>{pickLocalized(locale, homepageContent.pagesTitle)}</h2>
          <div className="runtime-link-grid">
            {homepageContent.pageLinks.map((item) => (
              <a className="runtime-link-card" key={item.href} href={localizePath(item.href, locale)}>
                {pickLocalized(locale, item.label)}
              </a>
            ))}
          </div>
        </section>

        <section className="runtime-section runtime-section-wide">
          <p className="runtime-kicker">{pickLocalized(locale, homepageContent.roadmapKicker)}</p>
          <h2>{pickLocalized(locale, homepageContent.roadmapTitle)}</h2>
          <ul className="runtime-list">
            {homepageContent.roadmap.map((item) => (
              <li key={item.en}>{pickLocalized(locale, item)}</li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
