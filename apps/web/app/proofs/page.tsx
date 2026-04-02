import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { proofs } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Bằng chứng trong OMDALAT | Proofs in OMDALAT",
  description: "Hoạt động có bằng chứng và dữ liệu hiển thị tại Da Lat.",
  path: "/proofs"
});

export default async function ProofsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Sổ bằng chứng" : "Proof ledger"}</p>
      <h1>{locale === "vi" ? "Bằng chứng trong OMDALAT" : "Proofs in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Hoạt động có bằng chứng và dữ liệu xác thực hiển thị trực tiếp từ nguồn."
          : "Evidence-backed activity rendered directly from source records."}
      </p>

      <div className="runtime-card-grid">
        {proofs.map((proof) => (
          <section className="runtime-panel" key={proof.id}>
            <h2>{proof.title}</h2>
            <p>{pickLocalized(locale, proof.outcome)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, proof.kind)} · {pickLocalized(locale, proof.date)}
            </p>
            <p className="runtime-meta">{pickLocalized(locale, proof.evidence)}</p>
            <a className="runtime-button secondary" href={localizePath(`/proofs/${proof.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
