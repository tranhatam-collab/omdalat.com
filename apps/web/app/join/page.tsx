import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { ContextHelpSection } from "../../components/shared/ContextHelpSection";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";
import { getPublicDocsContext } from "../../lib/public-docs";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Tham gia Ôm Đà Lạt",
      en: "Join Om Dalat"
    },
    description: {
      vi: "Đọc kỹ, gửi hồ sơ cơ bản và bắt đầu thời gian thử nếu có độ phù hợp.",
      en: "Read carefully, submit a basic profile, and begin a trial period if there is a fit."
    },
    path: "/join"
  });
}

export default async function JoinPage() {
  const locale = await getRequestLocale();
  const docsContext = getPublicDocsContext("/join");

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Tham gia" : "Join"}</p>
      <h1>{locale === "vi" ? "Tham gia theo cách rõ ràng" : "Join in a clear way"}</h1>
      <p>
        {locale === "vi"
          ? "Bạn không cần nói hay. Bạn chỉ cần nói thật: bạn đang ở đâu, bạn muốn gì, bạn có thể làm gì và bạn dự định ở bao lâu."
          : "You do not need polished language. You only need to speak clearly: where you are, what you want, what you can do, and how long you plan to stay."}
      </p>

      <div className="runtime-actions">
        <a className="runtime-button primary" href={localizePath("/member", locale)}>
          {locale === "vi" ? "Đăng ký thành viên" : "Register as a member"}
        </a>
        <a className="runtime-button secondary" href={localizePath("/docs/getting-started", locale)}>
          {locale === "vi" ? "Đọc hướng dẫn trước" : "Read the guide first"}
        </a>
      </div>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ba bước cơ bản" : "Three core steps"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Đọc để hiểu đúng bản chất của hệ." : "Read to understand the system clearly."}</li>
            <li>{locale === "vi" ? "Tạo hồ sơ cơ bản trong khu thành viên." : "Create a basic profile in the member area."}</li>
            <li>{locale === "vi" ? "Chờ được xem xét và bắt đầu thời gian thử nếu phù hợp." : "Wait for review and begin a trial period if there is a fit."}</li>
          </ul>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Điều cần nói rõ" : "What you should explain clearly"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Bạn đang ở đâu và đang ở giai đoạn nào." : "Where you are and what stage you are in."}</li>
            <li>{locale === "vi" ? "Bạn muốn gì khi đến Đà Lạt." : "What you want when coming to Dalat."}</li>
            <li>{locale === "vi" ? "Bạn có thể làm gì cho công việc và cộng đồng." : "What you can contribute to work and community."}</li>
            <li>{locale === "vi" ? "Bạn dự định ở bao lâu." : "How long you plan to stay."}</li>
          </ul>
        </section>
      </div>

      <ContextHelpSection context={docsContext} />
    </article>
  );
}
