import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viPath = path.join(repoRoot, "apps", "web", "assets", "i18n", "vi.json");
const enPath = path.join(repoRoot, "apps", "web", "assets", "i18n", "en.json");

const PLACEHOLDER_MARKERS = [/\blorem ipsum\b/i, /\bplaceholder\b/i, /\btodo\b/i, /\bdraft\b/i];
const BANNED_VI = [
  "Đăng ký ngay",
  "Mở khóa ngay",
  "Khám phá ngay hôm nay",
  "Nhận ngay",
  "Tham gia ngay để không bỏ lỡ"
];
const BANNED_EN = ["Join now", "Unlock now", "Discover now", "Claim now", "Don’t miss out", "Don't miss out"];

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function flattenObject(source, prefix = "", output = {}) {
  for (const [key, value] of Object.entries(source)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (isObject(value)) {
      flattenObject(value, fullKey, output);
      continue;
    }
    output[fullKey] = value;
  }
  return output;
}

function validateLocaleMap(locale, values, errors) {
  for (const [key, value] of Object.entries(values)) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`[${locale}] ${key} must be a non-empty string.`);
      continue;
    }
    for (const marker of PLACEHOLDER_MARKERS) {
      if (marker.test(value)) {
        errors.push(`[${locale}] ${key} contains placeholder marker "${marker}".`);
        break;
      }
    }

    const banned = locale === "vi" ? BANNED_VI : BANNED_EN;
    for (const token of banned) {
      if (value.includes(token)) {
        errors.push(`[${locale}] ${key} contains banned marketing phrase: "${token}".`);
      }
    }
  }
}

async function main() {
  const [viRaw, enRaw] = await Promise.all([readFile(viPath, "utf8"), readFile(enPath, "utf8")]);
  const viPayload = JSON.parse(viRaw);
  const enPayload = JSON.parse(enRaw);

  const viFlat = flattenObject(viPayload);
  const enFlat = flattenObject(enPayload);

  const errors = [];
  validateLocaleMap("vi", viFlat, errors);
  validateLocaleMap("en", enFlat, errors);

  const missingInEn = Object.keys(viFlat).filter((key) => !(key in enFlat));
  const missingInVi = Object.keys(enFlat).filter((key) => !(key in viFlat));

  if (missingInEn.length > 0) {
    missingInEn.forEach((key) => errors.push(`[en] missing key: ${key}`));
  }

  if (missingInVi.length > 0) {
    missingInVi.forEach((key) => errors.push(`[vi] missing key: ${key}`));
  }

  if (errors.length > 0) {
    console.error("web locale validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`web locale validation passed. keys=${Object.keys(viFlat).length}`);
}

main().catch((error) => {
  console.error("web locale validation crashed:", error);
  process.exitCode = 1;
});
