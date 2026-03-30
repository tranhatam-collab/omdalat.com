import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tham gia OMDALAT | Join OMDALAT",
  description: "Lối vào cho con người, địa điểm và cộng đồng tham gia OMDALAT.",
  path: "/join"
});

export default async function JoinPage() {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Tham gia" : "Join"}</p>
      <h1>{locale === "vi" ? "Bắt đầu tham gia OMDALAT" : "Start participating in OMDALAT"}</h1>
      <p>
        {locale === "vi"
          ? "Chúng tôi ưu tiên các tham gia có bối cảnh địa phương rõ, cam kết rõ và khả năng tạo giá trị lặp lại."
          : "We prioritize participation with clear local context, clear commitment, and repeatable value creation."}
      </p>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ai phù hợp" : "Who fits"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Host và điều phối viên địa phương." : "Local hosts and operators."}</li>
            <li>
              {locale === "vi"
                ? "Địa điểm có thể trở thành node hoạt động đáng tin cậy."
                : "Places that can become trusted activity nodes."}
            </li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bước tiếp theo" : "Next step"}</h2>
          <ul className="runtime-list">
            <li>
              {locale === "vi"
                ? "Gửi bối cảnh tham gia qua form liên hệ."
                : "Submit your participation context through contact."}
            </li>
            <li>
              {locale === "vi"
                ? "Hệ thống sẽ điều phối về node phù hợp."
                : "The system routes you to the most relevant node."}
            </li>
          </ul>
        </section>
      </div>
      <div className="runtime-actions">
        <a className="runtime-button primary" href={localizePath("/contact", locale)}>
          {locale === "vi" ? "Gửi nguyện vọng tham gia" : "Submit participation intent"}
        </a>
      </div>
    </article>
  );
}
