import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { events } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Sự kiện trong OMDALAT | Events in OMDALAT",
  description: "Hoạt động và các buổi tụ họp thực tế tại Da Lat.",
  path: "/events"
});

export default async function EventsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Lịch sự kiện" : "Event schedule"}</p>
      <h1>{locale === "vi" ? "Sự kiện trong OMDALAT" : "Events in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Hoạt động sắp tới và bối cảnh sự kiện được cập nhật trực tiếp từ lớp dữ liệu hoạt động."
          : "Upcoming moments and event context pulled directly from the activity data layer."}
      </p>

      <div className="runtime-card-grid">
        {events.map((event) => (
          <section className="runtime-panel" key={event.id}>
            <h2>{event.title}</h2>
            <p>{pickLocalized(locale, event.description)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, event.date)} · {event.place}
            </p>
            <p className="runtime-meta">
              {locale === "vi" ? "Host" : "Host"}: {event.host}
            </p>
            <a className="runtime-button secondary" href={localizePath(`/events/${event.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
