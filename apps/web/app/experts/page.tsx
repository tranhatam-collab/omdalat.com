import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { experts } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Chuyên gia trong OMDALAT | Experts in OMDALAT",
  description: "Chuyên gia địa phương và mạng lưới năng lực tại Da Lat.",
  path: "/experts"
});

export default async function ExpertsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Danh sách chuyên gia" : "Expert directory"}</p>
      <h1>{locale === "vi" ? "Chuyên gia trong OMDALAT" : "Experts in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Năng lực chuyên môn địa phương được mở ra từ dữ liệu hoạt động thực tế."
          : "Local expert capabilities surfaced from real operating data."}
      </p>

      <div className="runtime-card-grid">
        {experts.map((expert) => (
          <section className="runtime-panel" key={expert.id}>
            <h2>{expert.name}</h2>
            <p>{pickLocalized(locale, expert.specialty)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, expert.zone)} · {pickLocalized(locale, expert.availability)}
            </p>
            <p className="runtime-meta">{pickLocalized(locale, expert.signal)}</p>
            <a className="runtime-button secondary" href={localizePath(`/experts/${expert.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
