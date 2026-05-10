import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localizePath } from "../../../../../packages/core";
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

const ARTICLE_NEXT_LINKS_BY_PILLAR = {
  song: [
    {
      href: "/life",
      vi: {
        title: "Đọc trục sống",
        body: "Đi tiếp sang phần nhịp sống, điều kiện ở lại và ổn định dài hạn."
      },
      en: {
        title: "Read the life track",
        body: "Continue into rhythm, fit, and long-term stability."
      }
    },
    {
      href: "/stay",
      vi: {
        title: "Tìm nơi ở",
        body: "Xem các lựa chọn ở lại và điều kiện để giữ nhịp đều."
      },
      en: {
        title: "Find a place to stay",
        body: "See stay options and conditions for a steady rhythm."
      }
    }
  ],
  work: [
    {
      href: "/work",
      vi: {
        title: "Xem công việc",
        body: "Đi tiếp sang cụm công việc, kỹ năng và cơ hội đang mở."
      },
      en: {
        title: "Explore work",
        body: "Continue into work, skills, and open opportunities."
      }
    },
    {
      href: "/articles",
      vi: {
        title: "Xem thêm bài cùng cụm",
        body: "Đọc thêm các bài liên quan để giữ mạch tìm hiểu trước khi tham gia."
      },
      en: {
        title: "Read related articles",
        body: "Keep the thread with related pieces before joining."
      }
    }
  ],
  "xay-cuoc-doi": [
    {
      href: "/community",
      vi: {
        title: "Xem trục cộng đồng",
        body: "Đi tiếp sang cách sống cùng người khác và giữ kỷ luật chung."
      },
      en: {
        title: "Explore community",
        body: "Continue into shared living and collective discipline."
      }
    },
    {
      href: "/learning",
      vi: {
        title: "Xem trục học",
        body: "Đọc lớp học từ trải nghiệm và nhịp làm việc thực tế."
      },
      en: {
        title: "Explore learning",
        body: "Read the layer of learning through lived work."
      }
    }
  ]
} as const;

const TAG_LABELS = {
  "lam-viec-tu-xa": { vi: "Làm việc từ xa", en: "Remote work" },
  remote: { vi: "Làm việc từ xa", en: "Remote work" },
  freelance: { vi: "Làm việc tự do", en: "Freelance work" },
  "lam-viec-tu-do": { vi: "Làm việc tự do", en: "Freelance work" },
  work: { vi: "Làm việc", en: "Work" },
  system: { vi: "Hệ vận hành", en: "Operating system" },
  va: { vi: "Trợ lý từ xa", en: "Remote assistant" },
  "tro-ly-tu-xa": { vi: "Trợ lý từ xa", en: "Remote assistant" }
} as const;

function normalizePillarKey(value: string) {
  if (value === "life") return "song";
  if (value === "earning") return "xay-cuoc-doi";
  if (value === "song" || value === "work" || value === "xay-cuoc-doi") return value;
  return "work";
}

function displayTag(tag: string, locale: string) {
  const normalized = tag.toLowerCase();
  const direct = TAG_LABELS[normalized as keyof typeof TAG_LABELS];
  if (direct) {
    return locale === "vi" ? direct.vi : direct.en;
  }

  return tag.replaceAll("-", " ");
}

function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mergeUniqueLinks(
  ...groups: Array<Array<{ href: string; title: string; body: string }>>
) {
  const seen = new Set<string>();

  return groups.flat().filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  });
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
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
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
  const contextualCta = article.contextualCta;
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
  const contextualKey = normalizePillarKey(article.pillarKey) as keyof typeof ARTICLE_NEXT_LINKS_BY_PILLAR;
  const payloadLinks = article.internalLinks.filter((link) => link.type !== "cta").slice(0, 3);
  const fallbackContextualLinks = ARTICLE_NEXT_LINKS_BY_PILLAR[contextualKey].slice(0, 1).map((nextLink) => {
    const copy = locale === "vi" ? nextLink.vi : nextLink.en;

    return {
      href: nextLink.href,
      title: copy.title,
      body: copy.body
    };
  });
  const fallbackRelatedLinks = relatedArticles.map((relatedArticle) => ({
    href: relatedArticle.href,
    title: relatedArticle.title,
    body: relatedArticle.excerpt
  }));
  const contextualLinks = mergeUniqueLinks(payloadLinks, fallbackContextualLinks, fallbackRelatedLinks).slice(0, 3);
  const payloadCta = article.internalLinks.find((link) => link.type === "cta") ?? null;
  const finalCta = payloadCta
    ? {
        route: payloadCta.href,
        title: payloadCta.title,
        body: payloadCta.body,
        cta: contextualCta.cta
      }
    : contextualCta;

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
              {displayTag(tag, locale)}
            </span>
          ))}
        </div>

        <VisualNarrative
          images={articleVisuals}
          locale={locale}
          label={locale === "vi" ? `Hình minh họa cho ${article.title}` : `Article visuals for ${article.title}`}
          altOverride={article.title}
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
            {contextualLinks.map((nextLink) => {
              return (
                <a className="runtime-link-card" href={localizePath(nextLink.href, locale)} key={nextLink.href}>
                  <strong>{nextLink.title}</strong>
                  <span>{nextLink.body}</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="runtime-panel runtime-article-bridge">
          <p className="runtime-kicker">{locale === "vi" ? "Đi tiếp" : "Next step"}</p>
          <h2>{finalCta.title}</h2>
          <p>{finalCta.body}</p>
          <div className="runtime-actions">
            <a className="runtime-button primary" href={localizePath(finalCta.route, locale)}>
              {finalCta.cta}
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
