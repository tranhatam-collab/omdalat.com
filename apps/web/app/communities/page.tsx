import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { communities } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Cộng đồng trong OMDALAT | Communities in OMDALAT",
  description: "Cộng đồng và vòng tròn địa phương đáng tin cậy tại Da Lat.",
  path: "/communities"
});

export default async function CommunitiesPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Danh sách cộng đồng" : "Community directory"}</p>
      <h1>{locale === "vi" ? "Cộng đồng trong OMDALAT" : "Communities in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Các cộng đồng địa phương và nhịp hoạt động được hiển thị từ nguồn dữ liệu đồng bộ."
          : "Local community circles and cadence, rendered from synchronized source data."}
      </p>

      <div className="runtime-card-grid">
        {communities.map((community) => (
          <section className="runtime-panel" key={community.id}>
            <h2>{community.name}</h2>
            <p>{pickLocalized(locale, community.focus)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, community.zone)} · {pickLocalized(locale, community.cadence)}
            </p>
            <p className="runtime-meta">{pickLocalized(locale, community.signal)}</p>
            <a className="runtime-button secondary" href={localizePath(`/communities/${community.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
