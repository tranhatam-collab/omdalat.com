import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { getAllArticles } from "../../lib/content-seed";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Bài viết Ôm Đà Lạt",
      en: "Om Dalat Articles"
    },
    description: {
      vi: "Bài viết công khai về sống, làm việc và xây cuộc đời tại Đà Lạt.",
      en: "Foundational public articles about living, working, and building a life in Dalat."
    },
    path: "/articles"
  });
}

export default async function ArticlesPage() {
  const locale = await getRequestLocale();
  const articles = getAllArticles(locale);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{locale === "vi" ? "Bài viết" : "Articles"}</p>
      <h1>{locale === "vi" ? "Bài viết mở nền cho Ôm Đà Lạt" : "Foundational articles for Om Dalat"}</h1>
      <p>
        {locale === "vi"
          ? `Hiện đang mở công khai ${articles.length} bài nền. Các bài tiếp theo sẽ được đưa lên theo từng đợt biên tập.`
          : `${articles.length} foundational public articles are open now. More pieces will be released in later editorial batches.`}
      </p>

      {articles.length > 0 ? (
        <div className="runtime-card-grid" style={{ marginTop: "1rem" }}>
          {articles.map((article) => (
            <a className="runtime-link-card" href={localizePath(article.href, locale)} id={article.slug} key={article.id}>
              <strong>{article.title}</strong>
              <span>{article.excerpt}</span>
              <span>{article.pillar}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="runtime-status runtime-status--info" style={{ marginTop: "1rem" }}>
          {locale === "vi"
            ? "Đợt bài public đầu tiên đang ở vòng biên tập cuối."
            : "The first public article wave is in its final editorial pass."}
        </p>
      )}
    </article>
  );
}
