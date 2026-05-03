import type { OmdalatLocale } from "../../../packages/core";
import type {
  ArticleSeedRecord,
  ContentAccessLevel,
  ContentPillarKey,
  ContentStatus,
  HandbookSectionSeedRecord,
  MemberResourceSeedRecord
} from "../../../packages/types";
import articleSeedData from "../../../data/seed/articles.seed.json";
import handbookSeedData from "../../../data/seed/handbook-sections.seed.json";
import memberResourceSeedData from "../../../data/seed/member-resources.seed.json";

const articles = [...(articleSeedData as ArticleSeedRecord[])].sort((first, second) => first.order - second.order);
const handbookSections = [...(handbookSeedData as HandbookSectionSeedRecord[])].sort((first, second) => first.order - second.order);
const memberResources = [...(memberResourceSeedData as MemberResourceSeedRecord[])].sort((first, second) => first.order - second.order);

const CONTENT_ACCESS_LEVELS = ["guest", "registered", "reviewed", "internal", "admin"] as const satisfies readonly ContentAccessLevel[];
const CONTENT_PILLARS = ["song", "work", "xay-cuoc-doi"] as const satisfies readonly ContentPillarKey[];
const CONTENT_STATUSES = ["draft", "published"] as const satisfies readonly ContentStatus[];

type ContentOpsBlocker =
  | "public-article-wave-empty"
  | "registered-member-wave-empty"
  | "reviewed-layer-empty";

function byLocale<T extends { vi: string; en: string }>(locale: OmdalatLocale, value: T) {
  return locale === "vi" ? value.vi : value.en;
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
    counter[record.pillar_key] += 1;
  });
  return counter;
}

function getPublishedArticles() {
  return articles.filter((article) => article.status === "published");
}

function mapArticleForLocale(locale: OmdalatLocale, article: ArticleSeedRecord) {
  return {
    id: article.id,
    slug: article.slug,
    order: article.order,
    href: `/articles/${article.slug}`,
    title: byLocale(locale, { vi: article.title_vi, en: article.title_en }),
    excerpt: byLocale(locale, { vi: article.excerpt_vi, en: article.excerpt_en }),
    content: byLocale(locale, { vi: article.content_vi, en: article.content_en }),
    pillar: byLocale(locale, { vi: article.pillar_vi, en: article.pillar_en }),
    pillarKey: article.pillar_key,
    tags: article.tags,
    accessLevel: article.access_level,
    status: article.status
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
    (article) => article.slug !== slug && article.pillar_key === currentArticle.pillar_key
  );
  const otherPillars = publishedArticles.filter(
    (article) => article.slug !== slug && article.pillar_key !== currentArticle.pillar_key
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
