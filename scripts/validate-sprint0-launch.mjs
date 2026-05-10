import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedDir = path.join(repoRoot, "data", "seed");
const proofDocPath = path.join(repoRoot, "docs", "SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md");

const LAUNCH_SLUGS = [
  "song-o-da-lat-la-gi",
  "lam-viec-o-da-lat-co-thuc-te-khong",
  "tu-mot-ky-nang-den-thu-nhap-o-da-lat"
];

function ensureObjectMap(records, label) {
  const map = new Map();

  for (const record of records) {
    if (!record || typeof record !== "object" || typeof record.slug !== "string") {
      throw new Error(`${label} contains a record without a valid slug.`);
    }

    map.set(record.slug, record);
  }

  return map;
}

async function loadJson(fileName) {
  const raw = await readFile(path.join(seedDir, fileName), "utf8");
  return JSON.parse(raw);
}

async function loadProofDoc() {
  return readFile(proofDocPath, "utf8");
}

function parseProofSection(markdown, slug) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockMatch = markdown.match(
    new RegExp(`Slug:\\n\\n\\* \`${escapedSlug}\`([\\s\\S]*?)(?=\\n---\\n\\n## |$)`)
  );

  if (!blockMatch) {
    throw new Error(`Proof doc is missing a section for slug "${slug}".`);
  }

  const section = blockMatch[0];
  const fields = {
    title_vi: section.match(/\* `title_vi`: `([^`]+)`/)?.[1],
    title_en: section.match(/\* `title_en`: `([^`]+)`/)?.[1],
    description_vi: section.match(/\* `description_vi`: `([^`]+)`/)?.[1],
    description_en: section.match(/\* `description_en`: `([^`]+)`/)?.[1],
    featured_image: section.match(/\* `([^`]+\.webp)`/)?.[1],
    contextual_cta: section.match(/\* `contextual_cta`: `([^`]+)`/)?.[1]
  };

  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      throw new Error(`Proof doc section for "${slug}" is missing ${key}.`);
    }
  }

  return fields;
}

function assertEqual(actual, expected, label, errors) {
  if (actual !== expected) {
    errors.push(`${label} mismatch.\n  expected: ${expected}\n  actual:   ${actual}`);
  }
}

function getImageRecord(imageRecords, slug, errors) {
  const imageRecord = imageRecords.find((record) => record.article_slug === slug);

  if (!imageRecord) {
    errors.push(`article-images.seed.json is missing hero image record for "${slug}".`);
    return null;
  }

  if (typeof imageRecord.src !== "string" || !imageRecord.src.endsWith(".webp")) {
    errors.push(`Image src for "${slug}" must be a .webp asset.`);
  }

  return imageRecord;
}

function buildExpectedPayload(runtimeRecord) {
  return {
    title_vi: runtimeRecord.locales?.vi?.meta_title,
    title_en: runtimeRecord.locales?.en?.meta_title,
    description_vi: runtimeRecord.locales?.vi?.meta_description,
    description_en: runtimeRecord.locales?.en?.meta_description,
    featured_image: runtimeRecord.featured_image,
    contextual_cta: runtimeRecord.contextual_cta
  };
}

function inferCtaIntent(record) {
  if (typeof record.contextual_cta === "string" && record.contextual_cta.length > 0) {
    return record.contextual_cta;
  }

  const ctaLink = Array.isArray(record.internal_links)
    ? record.internal_links.find((link) => link?.type === "cta")
    : null;
  const href = ctaLink?.href;

  if (typeof href !== "string") {
    return undefined;
  }

  if (href.endsWith("/stay")) {
    return "stay";
  }

  if (href.endsWith("/work")) {
    return "work";
  }

  if (href.endsWith("/join")) {
    return "join";
  }

  return undefined;
}

function buildComparablePayload(record) {
  return {
    title_vi: record.meta_title_vi ?? record.locales?.vi?.meta_title,
    title_en: record.meta_title_en ?? record.locales?.en?.meta_title,
    description_vi: record.meta_description_vi ?? record.locales?.vi?.meta_description,
    description_en: record.meta_description_en ?? record.locales?.en?.meta_description,
    featured_image: record.featured_image,
    contextual_cta: inferCtaIntent(record)
  };
}

async function main() {
  const errors = [];
  const [runtimeArticles, launchV2Articles, sprint0Articles, imageRecords, proofMarkdown] = await Promise.all([
    loadJson("articles.seed.json"),
    loadJson("articles.seed.launch-v2.json"),
    loadJson("articles.seed.sprint0-launch.json"),
    loadJson("article-images.seed.json"),
    loadProofDoc()
  ]);

  const runtimeMap = ensureObjectMap(runtimeArticles, "articles.seed.json");
  const launchV2Map = ensureObjectMap(launchV2Articles, "articles.seed.launch-v2.json");
  const sprint0Map = ensureObjectMap(sprint0Articles, "articles.seed.sprint0-launch.json");

  for (const slug of LAUNCH_SLUGS) {
    const runtimeRecord = runtimeMap.get(slug);
    const launchV2Record = launchV2Map.get(slug);
    const sprint0Record = sprint0Map.get(slug);
    const imageRecord = getImageRecord(imageRecords, slug, errors);

    if (!runtimeRecord) {
      errors.push(`articles.seed.json is missing launch slug "${slug}".`);
      continue;
    }

    if (!launchV2Record) {
      errors.push(`articles.seed.launch-v2.json is missing launch slug "${slug}".`);
      continue;
    }

    if (!sprint0Record) {
      errors.push(`articles.seed.sprint0-launch.json is missing launch slug "${slug}".`);
      continue;
    }

    const expected = buildExpectedPayload(runtimeRecord);
    const proof = parseProofSection(proofMarkdown, slug);

    const launchV2Payload = buildComparablePayload(launchV2Record);
    const sprint0Payload = buildComparablePayload(sprint0Record);

    assertEqual(launchV2Payload.title_vi, expected.title_vi, `${slug} launch-v2 meta_title_vi`, errors);
    assertEqual(launchV2Payload.title_en, expected.title_en, `${slug} launch-v2 meta_title_en`, errors);
    assertEqual(launchV2Payload.description_vi, expected.description_vi, `${slug} launch-v2 meta_description_vi`, errors);
    assertEqual(launchV2Payload.description_en, expected.description_en, `${slug} launch-v2 meta_description_en`, errors);
    assertEqual(launchV2Payload.featured_image, expected.featured_image, `${slug} launch-v2 featured_image`, errors);
    assertEqual(launchV2Payload.contextual_cta, expected.contextual_cta, `${slug} launch-v2 contextual_cta`, errors);

    assertEqual(sprint0Payload.title_vi, expected.title_vi, `${slug} sprint0 meta_title_vi`, errors);
    assertEqual(sprint0Payload.title_en, expected.title_en, `${slug} sprint0 meta_title_en`, errors);
    assertEqual(sprint0Payload.description_vi, expected.description_vi, `${slug} sprint0 meta_description_vi`, errors);
    assertEqual(sprint0Payload.description_en, expected.description_en, `${slug} sprint0 meta_description_en`, errors);
    assertEqual(sprint0Payload.featured_image, expected.featured_image, `${slug} sprint0 featured_image`, errors);
    assertEqual(sprint0Payload.contextual_cta, expected.contextual_cta, `${slug} sprint0 contextual_cta`, errors);

    assertEqual(proof.title_vi, expected.title_vi, `${slug} proof title_vi`, errors);
    assertEqual(proof.title_en, expected.title_en, `${slug} proof title_en`, errors);
    assertEqual(proof.description_vi, expected.description_vi, `${slug} proof description_vi`, errors);
    assertEqual(proof.description_en, expected.description_en, `${slug} proof description_en`, errors);
    assertEqual(proof.featured_image, expected.featured_image, `${slug} proof featured_image`, errors);
    assertEqual(proof.contextual_cta, expected.contextual_cta, `${slug} proof contextual_cta`, errors);

    if (imageRecord) {
      assertEqual(imageRecord.src, expected.featured_image, `${slug} article-images src`, errors);
    }
  }

  if (errors.length > 0) {
    console.error("Sprint 0 launch validation failed:\n");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("Sprint 0 launch validation passed.");
  console.log(`Validated ${LAUNCH_SLUGS.length} launch articles across runtime seed, handoff seed, image seed, and proof doc.`);
}

await main();
