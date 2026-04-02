import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(repoRoot, "data");

const fileRules = {
  "places.json": ["area", "type", "mode", "cadence", "activity", "signal"],
  "hosts.json": ["role", "zone", "focus", "trust", "availability"],
  "experts.json": ["specialty", "zone", "availability", "signal"],
  "communities.json": ["focus", "zone", "cadence", "signal"],
  "activities.json": ["date", "description"],
  "proofs.json": ["kind", "date", "outcome", "evidence"]
};

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocalizedText(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, "vi") && Object.prototype.hasOwnProperty.call(value, "en");
}

function validateLocalizedText(value, valuePath, errors) {
  if (!isObject(value)) {
    errors.push(`${valuePath} must be an object with { vi, en }.`);
    return;
  }

  for (const locale of ["vi", "en"]) {
    if (!Object.prototype.hasOwnProperty.call(value, locale)) {
      errors.push(`${valuePath}.${locale} is missing.`);
      continue;
    }

    const localized = value[locale];
    if (typeof localized !== "string" || localized.trim().length === 0) {
      errors.push(`${valuePath}.${locale} must be a non-empty string.`);
    }
  }
}

function scanForPartialLocaleObjects(value, valuePath, errors) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanForPartialLocaleObjects(item, `${valuePath}[${index}]`, errors));
    return;
  }

  if (!isObject(value)) {
    return;
  }

  const hasVi = Object.prototype.hasOwnProperty.call(value, "vi");
  const hasEn = Object.prototype.hasOwnProperty.call(value, "en");
  if (hasVi || hasEn) {
    validateLocalizedText(value, valuePath, errors);
  }

  for (const [key, nested] of Object.entries(value)) {
    scanForPartialLocaleObjects(nested, `${valuePath}.${key}`, errors);
  }
}

async function validateFile(fileName, requiredFields, errors) {
  const absolutePath = path.join(dataDir, fileName);
  const raw = await readFile(absolutePath, "utf8");
  const payload = JSON.parse(raw);

  if (!Array.isArray(payload)) {
    errors.push(`${fileName} must contain an array.`);
    return;
  }

  payload.forEach((record, index) => {
    if (!isObject(record)) {
      errors.push(`${fileName}[${index}] must be an object.`);
      return;
    }

    for (const field of requiredFields) {
      const fieldPath = `${fileName}[${index}].${field}`;
      if (!Object.prototype.hasOwnProperty.call(record, field)) {
        errors.push(`${fieldPath} is missing.`);
        continue;
      }
      validateLocalizedText(record[field], fieldPath, errors);
    }

    scanForPartialLocaleObjects(record, `${fileName}[${index}]`, errors);
  });
}

const errors = [];

for (const [fileName, requiredFields] of Object.entries(fileRules)) {
  await validateFile(fileName, requiredFields, errors);
}

if (errors.length > 0) {
  console.error("i18n data validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log("i18n data validation passed.");
}
