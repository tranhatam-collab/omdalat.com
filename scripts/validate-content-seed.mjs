import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedDir = path.join(repoRoot, "data", "seed");

const CONTENT_STATUSES = new Set(["draft", "published"]);
const CONTENT_ACCESS_LEVELS = new Set(["guest", "registered", "reviewed", "internal", "admin"]);
const ARTICLE_PILLARS = new Set(["song", "work", "xay-cuoc-doi", "life", "earning"]);
const IMAGE_USAGE_TYPES = new Set(["hero", "card", "social", "inline", "bridge", "gallery", "profile"]);
const IMAGE_CROP_STATUSES = new Set(["approved", "needs_review"]);
const PUBLISHED_COPY_MARKERS = [/this draft/i, /\bbản nháp\b/i, /\blorem ipsum\b/i, /\bplaceholder\b/i];
const VIETNAMESE_VOCAB_RULES = [
  {
    pattern: /\bremote work\b/i,
    preferred: "làm việc từ xa"
  },
  {
    pattern: /\bfreelance\b/i,
    preferred: "làm việc tự do"
  },
  {
    pattern: /\bsystem\b/i,
    preferred: "hệ vận hành"
  },
  {
    pattern: /\bVA\b/,
    preferred: "trợ lý từ xa"
  }
];

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function loadJson(fileName) {
  const absolutePath = path.join(seedDir, fileName);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw);
}

function ensureArray(name, payload, errors) {
  if (!Array.isArray(payload)) {
    errors.push(`${name} must contain an array.`);
    return false;
  }

  return true;
}

function ensureRecord(name, record, index, errors) {
  if (!isObject(record)) {
    errors.push(`${name}[${index}] must be an object.`);
    return false;
  }

  return true;
}

function ensureNonEmptyString(value, label, errors) {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${label} must be a non-empty string.`);
  }
}

function ensureStringArray(value, label, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${label} must be a non-empty array.`);
    return;
  }

  value.forEach((entry, index) => {
    if (typeof entry !== "string" || entry.trim().length === 0) {
      errors.push(`${label}[${index}] must be a non-empty string.`);
    }
  });
}

function ensureUnique(records, key, name, errors) {
  const seen = new Set();

  records.forEach((record, index) => {
    const value = record[key];
    if (typeof value !== "string" && typeof value !== "number") {
      errors.push(`${name}[${index}].${key} must be a string or number.`);
      return;
    }

    if (seen.has(value)) {
      errors.push(`${name}[${index}].${key} duplicates "${value}".`);
      return;
    }

    seen.add(value);
  });
}

function ensureStatus(value, label, errors) {
  if (!CONTENT_STATUSES.has(value)) {
    errors.push(`${label} must be one of: ${Array.from(CONTENT_STATUSES).join(", ")}.`);
  }
}

function ensureAccessLevel(value, label, errors) {
  if (!CONTENT_ACCESS_LEVELS.has(value)) {
    errors.push(`${label} must be one of: ${Array.from(CONTENT_ACCESS_LEVELS).join(", ")}.`);
  }
}

function ensureAllowedValue(value, allowedSet, label, errors) {
  if (!allowedSet.has(value)) {
    errors.push(`${label} must be one of: ${Array.from(allowedSet).join(", ")}.`);
  }
}

function ensurePositiveInteger(value, label, errors) {
  if (!Number.isInteger(value) || value <= 0) {
    errors.push(`${label} must be a positive integer.`);
  }
}

function ensurePublishedCopy(value, label, errors) {
  if (typeof value !== "string") {
    return;
  }

  for (const marker of PUBLISHED_COPY_MARKERS) {
    if (marker.test(value)) {
      errors.push(`${label} contains draft or placeholder language that cannot ship as published.`);
      return;
    }
  }
}

function ensureVietnameseVocabulary(value, label, errors) {
  if (typeof value !== "string") {
    return;
  }

  VIETNAMESE_VOCAB_RULES.forEach((rule) => {
    if (rule.pattern.test(value)) {
      errors.push(`${label} contains "${rule.pattern.source}". Use "${rule.preferred}" in Vietnamese copy.`);
    }
  });
}

function validateArticles(records, errors) {
  ensureUnique(records, "id", "articles.seed.json", errors);
  ensureUnique(records, "slug", "articles.seed.json", errors);
  ensureUnique(records, "order", "articles.seed.json", errors);

  if (records.length !== 30) {
    errors.push(`articles.seed.json must contain exactly 30 records. Found ${records.length}.`);
  }

  records.forEach((record, index) => {
    if (!ensureRecord("articles.seed.json", record, index, errors)) {
      return;
    }

    const basePath = `articles.seed.json[${index}]`;
    ensureNonEmptyString(record.id, `${basePath}.id`, errors);
    ensureNonEmptyString(record.slug, `${basePath}.slug`, errors);
    ensureNonEmptyString(record.title_vi, `${basePath}.title_vi`, errors);
    ensureNonEmptyString(record.title_en, `${basePath}.title_en`, errors);
    ensureNonEmptyString(record.excerpt_vi, `${basePath}.excerpt_vi`, errors);
    ensureNonEmptyString(record.excerpt_en, `${basePath}.excerpt_en`, errors);
    ensureNonEmptyString(record.content_vi, `${basePath}.content_vi`, errors);
    ensureNonEmptyString(record.content_en, `${basePath}.content_en`, errors);
    ensureStringArray(record.tags, `${basePath}.tags`, errors);
    ensureStatus(record.status, `${basePath}.status`, errors);

    if (!Number.isInteger(record.order) || record.order < 1 || record.order > 30) {
      errors.push(`${basePath}.order must be an integer between 1 and 30.`);
    }

    if (!ARTICLE_PILLARS.has(record.pillar_key)) {
      errors.push(`${basePath}.pillar_key must be one of: ${Array.from(ARTICLE_PILLARS).join(", ")}.`);
    }

    if (record.access_level !== "guest") {
      errors.push(`${basePath}.access_level must stay "guest" for public article seeds.`);
    }

    if (record.status === "published") {
      ensurePublishedCopy(record.excerpt_vi, `${basePath}.excerpt_vi`, errors);
      ensurePublishedCopy(record.excerpt_en, `${basePath}.excerpt_en`, errors);
      ensurePublishedCopy(record.content_vi, `${basePath}.content_vi`, errors);
      ensurePublishedCopy(record.content_en, `${basePath}.content_en`, errors);
      ensureVietnameseVocabulary(record.title_vi, `${basePath}.title_vi`, errors);
      ensureVietnameseVocabulary(record.excerpt_vi, `${basePath}.excerpt_vi`, errors);
      ensureVietnameseVocabulary(record.content_vi, `${basePath}.content_vi`, errors);
    }
  });
}

function validateArticleImages(records, articleRecords, errors) {
  ensureUnique(records, "image_id", "article-images.seed.json", errors);
  ensureUnique(records, "article_slug", "article-images.seed.json", errors);

  const articleBySlug = new Map(articleRecords.map((article) => [article.slug, article]));
  const publishedSlugs = articleRecords.filter((article) => article.status === "published").map((article) => article.slug);
  const coveredPublishedSlugs = new Set();

  records.forEach((record, index) => {
    if (!ensureRecord("article-images.seed.json", record, index, errors)) {
      return;
    }

    const basePath = `article-images.seed.json[${index}]`;
    ensureNonEmptyString(record.article_slug, `${basePath}.article_slug`, errors);
    ensureNonEmptyString(record.image_id, `${basePath}.image_id`, errors);
    ensureNonEmptyString(record.file_name, `${basePath}.file_name`, errors);
    ensureNonEmptyString(record.src, `${basePath}.src`, errors);
    ensureNonEmptyString(record.source, `${basePath}.source`, errors);
    ensureNonEmptyString(record.license, `${basePath}.license`, errors);
    ensureNonEmptyString(record.photographer_or_owner, `${basePath}.photographer_or_owner`, errors);
    ensureNonEmptyString(record.approved_by, `${basePath}.approved_by`, errors);
    ensureNonEmptyString(record.approved_at, `${basePath}.approved_at`, errors);
    ensureNonEmptyString(record.alt_vi, `${basePath}.alt_vi`, errors);
    ensureNonEmptyString(record.alt_en, `${basePath}.alt_en`, errors);
    ensureNonEmptyString(record.caption_vi, `${basePath}.caption_vi`, errors);
    ensureNonEmptyString(record.caption_en, `${basePath}.caption_en`, errors);
    ensureNonEmptyString(record.notes, `${basePath}.notes`, errors);
    ensureStringArray(record.used_routes, `${basePath}.used_routes`, errors);
    ensurePositiveInteger(record.width, `${basePath}.width`, errors);
    ensurePositiveInteger(record.height, `${basePath}.height`, errors);
    ensureAllowedValue(record.usage_type, IMAGE_USAGE_TYPES, `${basePath}.usage_type`, errors);
    ensureAllowedValue(record.desktop_crop_status, IMAGE_CROP_STATUSES, `${basePath}.desktop_crop_status`, errors);
    ensureAllowedValue(record.mobile_crop_status, IMAGE_CROP_STATUSES, `${basePath}.mobile_crop_status`, errors);

    if (typeof record.approved_at === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(record.approved_at)) {
      errors.push(`${basePath}.approved_at must use YYYY-MM-DD format.`);
    }

    if (typeof record.src === "string" && !/^https?:\/\//.test(record.src)) {
      errors.push(`${basePath}.src must be an absolute http(s) URL.`);
    }

    if (typeof record.source === "string" && !/^https?:\/\//.test(record.source)) {
      errors.push(`${basePath}.source must be an absolute http(s) URL.`);
    }

    if (record.desktop_crop_status !== "approved" || record.mobile_crop_status !== "approved") {
      errors.push(`${basePath} must be fully approved for both desktop and mobile crops.`);
    }

    const matchedArticle = articleBySlug.get(record.article_slug);

    if (!matchedArticle) {
      errors.push(`${basePath}.article_slug "${record.article_slug}" does not exist in articles.seed.json.`);
      return;
    }

    if (matchedArticle.status !== "published") {
      errors.push(`${basePath}.article_slug "${record.article_slug}" must point to a published article.`);
      return;
    }

    coveredPublishedSlugs.add(record.article_slug);

    if (Array.isArray(record.used_routes)) {
      const requiredLocalizedRoutes = [
        `/vi/articles/${record.article_slug}`,
        `/en/articles/${record.article_slug}`
      ];

      requiredLocalizedRoutes.forEach((route) => {
        if (!record.used_routes.includes(route)) {
          errors.push(`${basePath}.used_routes must include "${route}".`);
        }
      });
    }
  });

  publishedSlugs.forEach((slug) => {
    if (!coveredPublishedSlugs.has(slug)) {
      errors.push(`article-images.seed.json is missing a record for published article "${slug}".`);
    }
  });
}

function validateMemberResources(records, errors) {
  ensureUnique(records, "id", "member-resources.seed.json", errors);
  ensureUnique(records, "slug", "member-resources.seed.json", errors);
  ensureUnique(records, "order", "member-resources.seed.json", errors);

  records.forEach((record, index) => {
    if (!ensureRecord("member-resources.seed.json", record, index, errors)) {
      return;
    }

    const basePath = `member-resources.seed.json[${index}]`;
    ensureNonEmptyString(record.id, `${basePath}.id`, errors);
    ensureNonEmptyString(record.slug, `${basePath}.slug`, errors);
    ensureNonEmptyString(record.title_vi, `${basePath}.title_vi`, errors);
    ensureNonEmptyString(record.title_en, `${basePath}.title_en`, errors);
    ensureNonEmptyString(record.excerpt_vi, `${basePath}.excerpt_vi`, errors);
    ensureNonEmptyString(record.excerpt_en, `${basePath}.excerpt_en`, errors);
    ensureNonEmptyString(record.content_vi, `${basePath}.content_vi`, errors);
    ensureNonEmptyString(record.content_en, `${basePath}.content_en`, errors);
    ensureStatus(record.status, `${basePath}.status`, errors);
    ensureAccessLevel(record.access_level, `${basePath}.access_level`, errors);

    if (!Number.isInteger(record.order) || record.order < 1) {
      errors.push(`${basePath}.order must be a positive integer.`);
    }
  });
}

function validateHandbookSections(records, errors) {
  ensureUnique(records, "id", "handbook-sections.seed.json", errors);
  ensureUnique(records, "slug", "handbook-sections.seed.json", errors);
  ensureUnique(records, "order", "handbook-sections.seed.json", errors);

  records.forEach((record, index) => {
    if (!ensureRecord("handbook-sections.seed.json", record, index, errors)) {
      return;
    }

    const basePath = `handbook-sections.seed.json[${index}]`;
    ensureNonEmptyString(record.id, `${basePath}.id`, errors);
    ensureNonEmptyString(record.slug, `${basePath}.slug`, errors);
    ensureNonEmptyString(record.section_key, `${basePath}.section_key`, errors);
    ensureNonEmptyString(record.title_vi, `${basePath}.title_vi`, errors);
    ensureNonEmptyString(record.title_en, `${basePath}.title_en`, errors);
    ensureNonEmptyString(record.summary_vi, `${basePath}.summary_vi`, errors);
    ensureNonEmptyString(record.summary_en, `${basePath}.summary_en`, errors);
    ensureNonEmptyString(record.content_vi, `${basePath}.content_vi`, errors);
    ensureNonEmptyString(record.content_en, `${basePath}.content_en`, errors);
    ensureStatus(record.status, `${basePath}.status`, errors);
    ensureAccessLevel(record.access_level, `${basePath}.access_level`, errors);

    if (!Number.isInteger(record.order) || record.order < 1) {
      errors.push(`${basePath}.order must be a positive integer.`);
    }
  });
}

const errors = [];
const articles = await loadJson("articles.seed.json");
const articleImages = await loadJson("article-images.seed.json");
const memberResources = await loadJson("member-resources.seed.json");
const handbookSections = await loadJson("handbook-sections.seed.json");

if (ensureArray("articles.seed.json", articles, errors)) {
  validateArticles(articles, errors);
}

if (ensureArray("article-images.seed.json", articleImages, errors) && ensureArray("articles.seed.json", articles, errors)) {
  validateArticleImages(articleImages, articles, errors);
}

if (ensureArray("member-resources.seed.json", memberResources, errors)) {
  validateMemberResources(memberResources, errors);
}

if (ensureArray("handbook-sections.seed.json", handbookSections, errors)) {
  validateHandbookSections(handbookSections, errors);
}

if (errors.length > 0) {
  console.error("content seed validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("content seed validation passed.");
}
