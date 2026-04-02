import type { Metadata } from "next";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { requests } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Nhu cầu đang mở | Requests",
  description: "Open and in-progress requests in OMDALAT local operating flows.",
  path: "/requests"
});

export default async function RequestsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Requests" : "Requests"}</p>
      <h1>{locale === "vi" ? "Nhu cầu đang mở" : "Open requests"}</h1>
      <p>
        {locale === "vi"
          ? "Danh sách nhu cầu thực tế đang cần ghép nối người phù hợp trong thành phố."
          : "Live local requests currently looking for matched contributors."}
      </p>

      <div className="runtime-card-grid">
        {requests.map((request) => (
          <section className="runtime-panel" key={request.id}>
            <h2>{request.title}</h2>
            <p className="runtime-meta">
              {request.status} · {request.priority}
            </p>
            <p>{request.need}</p>
            <p className="runtime-meta">
              {request.area} · {request.window}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
