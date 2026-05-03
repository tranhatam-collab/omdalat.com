import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildOmToAppUrl, localizePath } from "../../../../../packages/core";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumb";
import {
  getPublishedArticleBySlug,
  getPublishedArticleSlugs,
  getRelatedPublishedArticles
} from "../../../lib/content-seed";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { buildArticleSchema } from "../../../lib/schema";
import { getArticleVisuals } from "../../../lib/visuals";
import { VisualNarrative } from "../../../components/shared/VisualNarrative";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const ARTICLES_INDEX_LABEL = {
  vi: "Bài viết",
  en: "Articles"
} as const;

const ARTICLE_NEXT_LINKS = [
  {
    href: "/work",
    vi: {
      title: "Xem công việc",
      body: "Đi tiếp sang lớp công việc, kỹ năng và cơ hội đang mở."
    },
    en: {
      title: "Explore work",
      body: "Continue into the layer of work, skills, and open opportunities."
    }
  },
  {
    href: "/stay",
    vi: {
      title: "Tìm nơi ở",
      body: "Đọc phần nơi ở để hiểu điều kiện, nhịp sống và cách bắt đầu."
    },
    en: {
      title: "Find a place to stay",
      body: "Read the stay layer to understand fit, rhythm, and how to begin."
    }
  },
  {
    href: "/join",
    vi: {
      title: "Xem cách tham gia",
      body: "Khi nhu cầu đã rõ hơn, hãy xem bước gửi hồ sơ và thời gian thử."
    },
    en: {
      title: "See how to join",
      body: "When the need is clearer, see the application and trial steps."
    }
  }
] as const;

const JOIN_COPY = {
  vi: {
    title: "Muốn đi từ đọc sang trải nghiệm thật?",
    body: "Khi nhu cầu đã rõ hơn, bạn có thể đi tiếp sang phần tham gia để xem nhịp phù hợp, cách đăng ký và các bước vào hệ.",
    cta: "Xem cách tham gia"
  },
  en: {
    title: "Want to move from reading into lived experience?",
    body: "Once the need is clearer, continue into the joining flow to see the rhythm, fit, and next steps inside the system.",
    cta: "See how to join"
  }
} as const;

function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { slug } = await params;
  const article = getPublishedArticleBySlug(locale, slug);

  if (!article) {
    return buildPageMetadata({
      title: {
        vi: "Bài viết không còn khả dụng",
        en: "Article unavailable"
      },
      description: {
        vi: "Bài viết này hiện không mở công khai.",
        en: "This article is not publicly available right now."
      },
      path: `/articles/${slug}`,
      locale,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    locale,
    image: getArticleVisuals(article, 1)[0]
  });
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const locale = await getRequestLocale();
  const { slug } = await params;
  const article = getPublishedArticleBySlug(locale, slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedPublishedArticles(locale, article.slug, 2);
  const articleVisuals = getArticleVisuals(article);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat", path: "/" },
    { name: ARTICLES_INDEX_LABEL[locale], path: "/articles" },
    { name: article.title, path: article.href }
  ]);
  const articleSchema = buildArticleSchema({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    locale,
    articleSection: article.pillar,
    keywords: article.tags,
    articleBody: article.content,
    images: articleVisuals.map((image) => image.src)
  });
  const joinHref = buildOmToAppUrl("/member/register?next=%2Fmember%2Fwelcome", locale, `article_${article.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="runtime-page runtime-article-page">
        <nav aria-label={locale === "vi" ? "Điều hướng đường dẫn" : "Breadcrumb"} className="runtime-breadcrumb">
          <a href={localizePath("/", locale)}>{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</a>
          <span>/</span>
          <a href={localizePath("/articles", locale)}>{ARTICLES_INDEX_LABEL[locale]}</a>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        <p className="runtime-kicker">{article.pillar}</p>
        <h1>{article.title}</h1>
        <p className="runtime-article-lead">{article.excerpt}</p>

        <div className="runtime-article-meta">
          {article.tags.map((tag) => (
            <span className="runtime-article-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <VisualNarrative
          images={articleVisuals}
          locale={locale}
          label={locale === "vi" ? `Hình minh họa cho ${article.title}` : `Article visuals for ${article.title}`}
          priority
        />

        <div className="runtime-panel runtime-article-body">
          {splitParagraphs(article.content).map((paragraph, index) => (
            <p key={`${article.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <section className="runtime-panel runtime-article-links">
          <p className="runtime-kicker">{locale === "vi" ? "Đi tiếp từ bài này" : "Keep going from here"}</p>
          <div className="runtime-docs-list">
            {ARTICLE_NEXT_LINKS.map((nextLink) => {
              const copy = locale === "vi" ? nextLink.vi : nextLink.en;

              return (
                <a className="runtime-link-card" href={localizePath(nextLink.href, locale)} key={nextLink.href}>
                  <strong>{copy.title}</strong>
                  <span>{copy.body}</span>
                </a>
              );
            })}
            {relatedArticles.map((relatedArticle) => (
              <a className="runtime-link-card" href={localizePath(relatedArticle.href, locale)} key={relatedArticle.id}>
                <strong>{relatedArticle.title}</strong>
                <span>{relatedArticle.excerpt}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="runtime-panel runtime-article-bridge">
          <p className="runtime-kicker">{locale === "vi" ? "Đi tiếp" : "Next step"}</p>
          <h2>{JOIN_COPY[locale].title}</h2>
          <p>{JOIN_COPY[locale].body}</p>
          <div className="runtime-actions">
            <a className="runtime-button primary" href={joinHref}>
              {JOIN_COPY[locale].cta}
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
