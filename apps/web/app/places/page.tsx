import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { places } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Địa điểm trong OMDALAT | Places in OMDALAT",
  description: "Không gian đáng tin cậy và các địa điểm địa phương tại Da Lat.",
  path: "/places"
});

export default async function PlacesPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Danh sách địa điểm" : "Place directory"}</p>
      <h1>{locale === "vi" ? "Địa điểm trong OMDALAT" : "Places in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Các không gian đáng tin cậy trong city-layer, cập nhật trực tiếp từ nguồn dữ liệu dùng chung."
          : "Trusted city-layer spaces rendered directly from the shared data source."}
      </p>

      <div className="runtime-card-grid">
        {places.map((place) => (
          <section className="runtime-panel" key={place.id}>
            <h2>{place.name}</h2>
            <p>{pickLocalized(locale, place.activity)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, place.area)} · {pickLocalized(locale, place.type)} · {pickLocalized(locale, place.mode)}
            </p>
            <p className="runtime-meta">
              {locale === "vi" ? "Nhịp độ" : "Cadence"}: {pickLocalized(locale, place.cadence)} · {place.hostCount}{" "}
              {locale === "vi" ? "host" : "hosts"}
            </p>
            <p className="runtime-meta">{pickLocalized(locale, place.signal)}</p>
            <a className="runtime-button secondary" href={localizePath(`/places/${place.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
