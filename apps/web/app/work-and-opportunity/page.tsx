import type { Metadata } from "next";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { requests } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Việc làm và cơ hội | Work and opportunity",
  description: "Live requests and local opportunity pathways surfaced in OMDALAT.",
  path: "/work-and-opportunity"
});

export default async function WorkAndOpportunityPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Cơ hội" : "Opportunity"}</p>
      <h1>{locale === "vi" ? "Việc làm và cơ hội địa phương" : "Local work and opportunity"}</h1>
      <p>
        {locale === "vi"
          ? "OMDALAT làm lộ diện nhu cầu thật để người phù hợp có thể tham gia nhanh hơn."
          : "OMDALAT surfaces real requests so the right people can engage faster."}
      </p>

      <div className="runtime-card-grid">
        {requests.map((request) => (
          <section className="runtime-panel" key={request.id}>
            <h2>{request.title}</h2>
            <p className="runtime-meta">
              {request.status} · {request.priority} · {request.lane}
            </p>
            <p>{request.need}</p>
            <p className="runtime-meta">
              {locale === "vi" ? "Khu vực" : "Area"}: {request.area}
            </p>
            <p className="runtime-meta">
              {locale === "vi" ? "Mốc thời gian" : "Time window"}: {request.window}
            </p>
            <p className="runtime-meta">
              {locale === "vi" ? "Điều phối" : "Owner"}: {request.owner}
            </p>
          </section>
        ))}
      </div>
      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Tiêu chí ưu tiên ghép nối" : "Match priority criteria"}</h2>
        <ul className="runtime-list">
          <li>{locale === "vi" ? "Độ phù hợp locality" : "Locality fit"}</li>
          <li>{locale === "vi" ? "Trust history" : "Trust history"}</li>
          <li>{locale === "vi" ? "Khả năng đáp ứng đúng thời điểm" : "Availability timing"}</li>
          <li>{locale === "vi" ? "Bằng chứng hoàn thành trước đó" : "Previous completion proof"}</li>
        </ul>
      </section>
    </article>
  );
}
