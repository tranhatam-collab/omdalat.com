import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";
import { hosts } from "../../lib/public-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Host trong OMDALAT | Hosts in OMDALAT",
  description: "Host địa phương đã xác minh và điều phối viên tại Da Lat.",
  path: "/hosts"
});

export default async function HostsPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Danh sách host" : "Host directory"}</p>
      <h1>{locale === "vi" ? "Host trong OMDALAT" : "Hosts in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Các host và điều phối viên địa phương đã xác minh, đồng bộ trực tiếp từ nguồn dữ liệu."
          : "Verified local hosts and coordinators synchronized directly from source data."}
      </p>

      <div className="runtime-card-grid">
        {hosts.map((host) => (
          <section className="runtime-panel" key={host.id}>
            <h2>{host.name}</h2>
            <p>{pickLocalized(locale, host.focus)}</p>
            <p className="runtime-meta">
              {pickLocalized(locale, host.role)} · {pickLocalized(locale, host.zone)}
            </p>
            <p className="runtime-meta">
              {locale === "vi" ? "Trạng thái xác minh" : "Verification"}:{" "}
              {host.verified ? (locale === "vi" ? "Đã xác minh" : "Verified") : locale === "vi" ? "Đang rà soát" : "In review"}
            </p>
            <p className="runtime-meta">{pickLocalized(locale, host.availability)}</p>
            <p className="runtime-meta">{pickLocalized(locale, host.trust)}</p>
            <a className="runtime-button secondary" href={localizePath(`/hosts/${host.slug}`, locale)}>
              {locale === "vi" ? "Xem chi tiết" : "View details"}
            </a>
          </section>
        ))}
      </div>
    </article>
  );
}
