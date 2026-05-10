import type { OmdalatLocale } from "../../../packages/core";
import type {
  ArticleImageSeedRecord,
  ArticleSeedRecord,
  ContentAccessLevel,
  ContentPillarKey,
  ContentStatus,
  HandbookSectionSeedRecord,
  MemberResourceSeedRecord
} from "../../../packages/types";
import articleSeedData from "../../../data/seed/articles.seed.json";
import articleImageSeedData from "../../../data/seed/article-images.seed.json";
import handbookSeedData from "../../../data/seed/handbook-sections.seed.json";
import memberResourceSeedData from "../../../data/seed/member-resources.seed.json";

const articles = [...(articleSeedData as ArticleSeedRecord[])].sort((first, second) => first.order - second.order);
const articleImages = [...(articleImageSeedData as ArticleImageSeedRecord[])];
const handbookSections = [...(handbookSeedData as HandbookSectionSeedRecord[])].sort((first, second) => first.order - second.order);
const memberResources = [...(memberResourceSeedData as MemberResourceSeedRecord[])].sort((first, second) => first.order - second.order);
const articleImageBySlug = new Map(articleImages.map((image) => [image.article_slug, image] as const));

const CONTENT_ACCESS_LEVELS = ["guest", "registered", "reviewed", "internal", "admin"] as const satisfies readonly ContentAccessLevel[];
const CONTENT_PILLARS = ["song", "work", "xay-cuoc-doi"] as const satisfies readonly ContentPillarKey[];
const CONTENT_STATUSES = ["draft", "published"] as const satisfies readonly ContentStatus[];

type LocalizedText = {
  vi: string;
  en: string;
};

type ContextualCtaPayload = string | {
  vi?: {
    route?: string;
    title?: string;
    body?: string;
    cta?: string;
    label?: string;
  };
  en?: {
    route?: string;
    title?: string;
    body?: string;
    cta?: string;
    label?: string;
  };
  route?: string;
  label?: string;
};

type SeedArticleRecord = Omit<ArticleSeedRecord, "contextual_cta"> & {
  meta_title_vi?: string;
  meta_title_en?: string;
  meta_description_vi?: string;
  meta_description_en?: string;
  contextual_cta?: ContextualCtaPayload;
  pillar_target_routes?: string[];
  internal_links_vi?: string[];
  internal_links_en?: string[];
  internal_links?: Array<{
    href: string;
    type: "pillar" | "related" | "cta";
    title_vi: string;
    title_en: string;
    body_vi: string;
    body_en: string;
  }>;
  hero_image_id?: string;
  featured_image?: string;
  locales?: {
    vi: {
      title: string;
      excerpt: string;
      content: string;
      meta_title?: string;
      meta_description?: string;
    };
    en: {
      title: string;
      excerpt: string;
      content: string;
      meta_title?: string;
      meta_description?: string;
    };
  };
};

type PublicOmdalatLocale = "vi" | "en";

const DEFAULT_CONTEXTUAL_CTA = {
  vi: {
    route: "/join",
    title: "Đọc tiếp để đi tiếp",
    body: "Tiếp tục với flow phù hợp sau khi nắm xong bài này.",
    cta: "Xem cách tham gia"
  },
  en: {
    route: "/join",
    title: "Continue after this read",
    body: "Move to the next practical path after finishing this article.",
    cta: "See how to join"
  }
} as const;

const LEGACY_CONTEXTUAL_CTA_BY_KEY = {
  stay: {
    vi: {
      route: "/stay",
      title: "Bạn đã rõ nhịp sống chưa?",
      body: "Nếu cảm giác phù hợp thực sự, xem cách ở lại để kiểm tra chi tiết.",
      cta: "Xem cách ở lại"
    },
    en: {
      route: "/stay",
      title: "Is this rhythm real?",
      body: "If it feels right, review stay setup before you decide.",
      cta: "See stay options"
    }
  },
  work: {
    vi: {
      route: "/work",
      title: "Làm việc có giữ được ổn định không?",
      body: "Di chuyển sang page công việc để thấy điều kiện vận hành sau bài đọc này.",
      cta: "Xem công việc"
    },
    en: {
      route: "/work",
      title: "Can you stay productive?",
      body: "Move to work page to verify operational expectations before committing.",
      cta: "Explore work"
    }
  },
  join: {
    vi: {
      route: "/join",
      title: "Bạn đã có kỹ năng lõi chưa?",
      body: "Nếu sẵn sàng nhận việc theo chu kỳ, xem phần tham gia để tiếp tục.",
      cta: "Gửi hồ sơ tham gia"
    },
    en: {
      route: "/join",
      title: "Do you have a core skill ready?",
      body: "If yes, check join path to continue with practical next steps.",
      cta: "Apply to join"
    }
  }
} as const;

function resolvePublicLocale(locale: OmdalatLocale): PublicOmdalatLocale {
  return locale === "vi" ? "vi" : "en";
}

function asLocalizedText(value: string | undefined, fallback: string, locale: PublicOmdalatLocale) {
  return locale === "vi" ? value ?? fallback : value ?? fallback;
}

function normalizeContextualCta(locale: OmdalatLocale, article: SeedArticleRecord) {
  const publicLocale = resolvePublicLocale(locale);
  const cta = article.contextual_cta;

  if (typeof cta === "string") {
    const normalized = cta.trim().toLowerCase();
    const fallback = LEGACY_CONTEXTUAL_CTA_BY_KEY[normalized as keyof typeof LEGACY_CONTEXTUAL_CTA_BY_KEY];
    return fallback ? fallback[publicLocale] : DEFAULT_CONTEXTUAL_CTA[publicLocale];
  }

  if (typeof cta === "object" && cta !== null) {
    const localePayload = publicLocale === "vi" ? cta.vi ?? {} : cta.en ?? {};
    const route = localePayload.route ?? cta.route ?? DEFAULT_CONTEXTUAL_CTA[publicLocale].route;
    const title = asLocalizedText(localePayload.title, DEFAULT_CONTEXTUAL_CTA[publicLocale].title, publicLocale);
    const body = asLocalizedText(localePayload.body, DEFAULT_CONTEXTUAL_CTA[publicLocale].body, publicLocale);
    const ctaLabel = asLocalizedText(
      localePayload.cta ?? localePayload.label,
      DEFAULT_CONTEXTUAL_CTA[publicLocale].cta,
      publicLocale
    );
    return {
      route,
      title,
      body,
      cta: ctaLabel
    };
  }

  return DEFAULT_CONTEXTUAL_CTA[publicLocale];
}

type ContentOpsBlocker =
  | "public-article-wave-empty"
  | "registered-member-wave-empty"
  | "reviewed-layer-empty";

function byLocale<T extends { vi: string; en: string }>(locale: OmdalatLocale, value: T) {
  return locale === "vi" ? value.vi : value.en;
}

function byPublicLocale<T extends { vi: string; en: string }>(locale: PublicOmdalatLocale, value: T) {
  return locale === "vi" ? value.vi : value.en;
}

function articleLocalePayload(article: SeedArticleRecord, locale: PublicOmdalatLocale) {
  return article.locales?.[locale] ?? null;
}

function articleText(article: SeedArticleRecord, locale: PublicOmdalatLocale, field: "title" | "excerpt" | "content") {
  const localizedPayload = articleLocalePayload(article, locale);

  if (localizedPayload?.[field]) {
    return localizedPayload[field];
  }

  if (field === "title") {
    return byPublicLocale(locale, { vi: article.title_vi, en: article.title_en });
  }

  if (field === "excerpt") {
    return byPublicLocale(locale, { vi: article.excerpt_vi, en: article.excerpt_en });
  }

  return byPublicLocale(locale, { vi: article.content_vi, en: article.content_en });
}

function articleMetaText(
  article: SeedArticleRecord,
  locale: PublicOmdalatLocale,
  field: "meta_title" | "meta_description",
  fallback: string
) {
  const localizedPayload = articleLocalePayload(article, locale);

  if (localizedPayload?.[field]) {
    return localizedPayload[field];
  }

  if (field === "meta_title") {
    return byPublicLocale(locale, {
      vi: article.meta_title_vi ?? fallback,
      en: article.meta_title_en ?? fallback
    });
  }

  return byPublicLocale(locale, {
    vi: article.meta_description_vi ?? fallback,
    en: article.meta_description_en ?? fallback
  });
}

function mapInternalLinks(article: SeedArticleRecord, locale: PublicOmdalatLocale) {
  return (article.internal_links ?? []).map((link) => ({
    href: link.href,
    type: link.type,
    title: byPublicLocale(locale, { vi: link.title_vi, en: link.title_en }),
    body: byPublicLocale(locale, { vi: link.body_vi, en: link.body_en })
  }));
}

function normalizePillarKey(value: string): ContentPillarKey {
  if (value === "life") return "song";
  if (value === "earning") return "xay-cuoc-doi";
  if (value === "song" || value === "work" || value === "xay-cuoc-doi") return value;
  return "work";
}

function makeCounter<Key extends string>(keys: readonly Key[]) {
  return Object.fromEntries(keys.map((key) => [key, 0])) as Record<Key, number>;
}

function countByStatus(records: Array<{ status: ContentStatus }>) {
  const counter = makeCounter(CONTENT_STATUSES);
  records.forEach((record) => {
    counter[record.status] += 1;
  });
  return counter;
}

function countByAccessLevel(records: Array<{ access_level: ContentAccessLevel }>) {
  const counter = makeCounter(CONTENT_ACCESS_LEVELS);
  records.forEach((record) => {
    counter[record.access_level] += 1;
  });
  return counter;
}

function countByPillar(records: Array<{ pillar_key: ContentPillarKey }>) {
  const counter = makeCounter(CONTENT_PILLARS);
  records.forEach((record) => {
    counter[normalizePillarKey(record.pillar_key)] += 1;
  });
  return counter;
}

function getPublishedArticles() {
  return articles.filter((article) => article.status === "published");
}

function mapArticleForLocale(locale: OmdalatLocale, article: SeedArticleRecord) {
  const publicLocale = resolvePublicLocale(locale);
  const heroImage = articleImageBySlug.get(article.slug) ?? null;
  const normalizedPillarKey = normalizePillarKey(article.pillar_key);
  const contextualCta = normalizeContextualCta(locale, article);
  const title = articleText(article, publicLocale, "title");
  const excerpt = articleText(article, publicLocale, "excerpt");
  const contextualCtaByLocale = {
    route: contextualCta.route,
    title: contextualCta.title,
    body: contextualCta.body,
    cta: contextualCta.cta
  };
  const metaTitle = articleMetaText(article, publicLocale, "meta_title", title);
  const metaDescription = articleMetaText(article, publicLocale, "meta_description", excerpt);

  return {
    id: article.id,
    slug: article.slug,
    order: article.order,
    href: `/articles/${article.slug}`,
    title,
    excerpt,
    content: articleText(article, publicLocale, "content"),
    metaTitle,
    metaDescription,
    pillar: byPublicLocale(publicLocale, { vi: article.pillar_vi, en: article.pillar_en }),
    pillarKey: normalizedPillarKey,
    tags: article.tags,
    accessLevel: article.access_level,
    status: article.status,
    heroImage,
    contextualCta: contextualCtaByLocale,
    featuredImage: article.featured_image ?? null,
    internalLinks: mapInternalLinks(article, publicLocale)
  };
}

export function getFeaturedArticles(locale: OmdalatLocale, limit = 3) {
  return getPublishedArticles().slice(0, limit).map((article) => mapArticleForLocale(locale, article));
}

export function getArticlesBySlugs(locale: OmdalatLocale, slugs: readonly string[]) {
  const publishedArticles = getPublishedArticles();

  return slugs
    .map((slug) => publishedArticles.find((article) => article.slug === slug))
    .filter((article): article is ArticleSeedRecord => Boolean(article))
    .map((article) => mapArticleForLocale(locale, article));
}

export function getAllArticles(locale: OmdalatLocale) {
  return getPublishedArticles().map((article) => mapArticleForLocale(locale, article));
}

export function getPublishedArticleSlugs() {
  return getPublishedArticles().map((article) => article.slug);
}

export function getPublishedArticleBySlug(locale: OmdalatLocale, slug: string) {
  const article = getPublishedArticles().find((candidate) => candidate.slug === slug);

  if (!article) {
    return null;
  }

  return mapArticleForLocale(locale, article);
}

export function getRelatedPublishedArticles(locale: OmdalatLocale, slug: string, limit = 3) {
  const publishedArticles = getPublishedArticles();
  const currentArticle = publishedArticles.find((article) => article.slug === slug);

  if (!currentArticle) {
    return [];
  }

  const samePillar = publishedArticles.filter(
    (article) =>
      article.slug !== slug && normalizePillarKey(article.pillar_key) === normalizePillarKey(currentArticle.pillar_key)
  );
  const otherPillars = publishedArticles.filter(
    (article) =>
      article.slug !== slug && normalizePillarKey(article.pillar_key) !== normalizePillarKey(currentArticle.pillar_key)
  );

  return [...samePillar, ...otherPillars].slice(0, limit).map((article) => mapArticleForLocale(locale, article));
}

export function getMemberResources(locale: OmdalatLocale) {
  return memberResources.map((resource) => ({
    id: resource.id,
    slug: resource.slug,
    order: resource.order,
    title: byLocale(locale, { vi: resource.title_vi, en: resource.title_en }),
    excerpt: byLocale(locale, { vi: resource.excerpt_vi, en: resource.excerpt_en }),
    content: byLocale(locale, { vi: resource.content_vi, en: resource.content_en }),
    accessLevel: resource.access_level,
    resourceType: resource.resource_type,
    status: resource.status
  }));
}

export function getHandbookSections(locale: OmdalatLocale) {
  return handbookSections.map((section) => ({
    id: section.id,
    slug: section.slug,
    order: section.order,
    title: byLocale(locale, { vi: section.title_vi, en: section.title_en }),
    summary: byLocale(locale, { vi: section.summary_vi, en: section.summary_en }),
    content: byLocale(locale, { vi: section.content_vi, en: section.content_en }),
    accessLevel: section.access_level,
    status: section.status
  }));
}

export function getContentOpsSnapshot() {
  const publishedArticles = getPublishedArticles();
  const publishedMemberResources = memberResources.filter((resource) => resource.status === "published");
  const publishedHandbookSections = handbookSections.filter((section) => section.status === "published");
  const publishedRegisteredWaveCount =
    publishedMemberResources.filter((resource) => resource.access_level === "registered").length +
    publishedHandbookSections.filter((section) => section.access_level === "registered").length;
  const publishedReviewedWaveCount =
    publishedMemberResources.filter((resource) => resource.access_level === "reviewed").length +
    publishedHandbookSections.filter((section) => section.access_level === "reviewed").length;
  const blockers: ContentOpsBlocker[] = [];

  if (publishedArticles.length === 0) {
    blockers.push("public-article-wave-empty");
  }

  if (publishedRegisteredWaveCount === 0) {
    blockers.push("registered-member-wave-empty");
  }

  if (publishedReviewedWaveCount === 0) {
    blockers.push("reviewed-layer-empty");
  }

  return {
    articles: {
      total: articles.length,
      byStatus: countByStatus(articles),
      byPillar: countByPillar(articles),
      publishedByPillar: countByPillar(publishedArticles),
      draftByPillar: countByPillar(articles.filter((article) => article.status === "draft"))
    },
    memberResources: {
      total: memberResources.length,
      byStatus: countByStatus(memberResources),
      byAccessLevel: countByAccessLevel(memberResources),
      publishedByAccessLevel: countByAccessLevel(publishedMemberResources)
    },
    handbookSections: {
      total: handbookSections.length,
      byStatus: countByStatus(handbookSections),
      byAccessLevel: countByAccessLevel(handbookSections),
      publishedByAccessLevel: countByAccessLevel(publishedHandbookSections)
    },
    blockers
  };
}
