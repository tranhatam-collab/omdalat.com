import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { getTrustEvents, proofs } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Niềm tin và bằng chứng | Trust and proof",
  description: "Verification, moderation, and trust-proof loops in OMDALAT.",
  path: "/trust"
});

export default async function TrustPage() {
  const locale = await getRequestLocale();
  const trustEvents = getTrustEvents().slice(0, 5);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Trust" : "Trust"}</p>
      <h1>{locale === "vi" ? "Niềm tin phải nhìn thấy được" : "Trust must stay visible"}</h1>
      <p>
        {locale === "vi"
          ? "OMDALAT không dùng trust như khẩu hiệu. Trust được tạo từ proof, moderation và lịch sử hoàn thành có thể kiểm tra."
          : "OMDALAT does not treat trust as a slogan. Trust is built from proof, moderation, and verifiable completion history."}
      </p>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Nguồn tín hiệu trust" : "Trust signal sources"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? `Proof records đang hiển thị: ${proofs.length}` : `Visible proof records: ${proofs.length}`}</li>
            <li>{locale === "vi" ? "Host verification và trạng thái moderation" : "Host verification and moderation states"}</li>
            <li>{locale === "vi" ? "Repeat collaboration được ghi thành trust events" : "Repeat collaboration captured as trust events"}</li>
          </ul>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Luồng quản trị" : "Governance flow"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Proof submission" : "Proof submission"}</li>
            <li>{locale === "vi" ? "Moderation review" : "Moderation review"}</li>
            <li>{locale === "vi" ? "Accepted / flagged / rejected" : "Accepted / flagged / rejected"}</li>
            <li>{locale === "vi" ? "Trust timeline cập nhật theo sự kiện" : "Trust timeline updates by event"}</li>
          </ul>
        </section>
      </div>

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Sự kiện trust gần nhất" : "Recent trust events"}</h2>
        <ul className="runtime-list">
          {trustEvents.map((event) => (
            <li key={event.id}>{event.detail}</li>
          ))}
        </ul>
      </section>

      <div className="runtime-actions">
        <a className="runtime-button secondary" href={localizePath("/requests", locale)}>
          {locale === "vi" ? "Xem nhu cầu đang mở" : "View open requests"}
        </a>
        <a className="runtime-button secondary" href={localizePath("/proofs", locale)}>
          {locale === "vi" ? "Xem proof ledger" : "View proof ledger"}
        </a>
        <a className="runtime-button primary" href={localizePath("/join", locale)}>
          {locale === "vi" ? "Tham gia như node tin cậy" : "Join as a trusted node"}
        </a>
      </div>
    </article>
  );
}
