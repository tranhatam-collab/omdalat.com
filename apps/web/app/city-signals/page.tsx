import type { Metadata } from "next";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { communities, events, hosts, places, proofs, requests } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Tín hiệu thành phố | City signals",
  description: "Operational city signals from places, hosts, requests, events, and proofs.",
  path: "/city-signals"
});

export default async function CitySignalsPage() {
  const locale = await getRequestLocale();
  const openRequests = requests.filter((request) => request.status.toLowerCase() === "open").length;

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Tín hiệu" : "Signals"}</p>
      <h1>{locale === "vi" ? "Tín hiệu vận hành thành phố" : "City operating signals"}</h1>
      <p>
        {locale === "vi"
          ? "Mỗi tín hiệu cho biết mức độ hoạt động thật, không phải chỉ số truyền thông."
          : "Each signal reflects real operating activity, not vanity traffic."}
      </p>

      <div className="runtime-card-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Địa điểm hoạt động" : "Active places"}</h2>
          <p>{places.length}</p>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Host xác minh" : "Verified hosts"}</h2>
          <p>{hosts.filter((host) => host.verified).length}</p>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Nhu cầu mở" : "Open requests"}</h2>
          <p>{openRequests}</p>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Proof đã ghi" : "Recorded proofs"}</h2>
          <p>{proofs.length}</p>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Sự kiện" : "Events"}</h2>
          <p>{events.length}</p>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Cộng đồng" : "Communities"}</h2>
          <p>{communities.length}</p>
        </section>
      </div>
    </article>
  );
}
