import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = process.cwd();
const args = process.argv.slice(2);

const getArg = (name, fallback) => {
  const prefix = `--${name}=`;
  const found = args.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};

const baselineDir = getArg("baseline-dir", "reports/visual-baseline/full-site");
const candidateDir = getArg("candidate-dir", "reports/visual-qa");
const rulesFile = getArg("rules-file", "");
const defaultMaxDiff = Number(getArg("default-max-diff", "0.03"));
const criticalMaxDiff = Number(getArg("critical-max-diff", "0.015"));
const printTop = Number(getArg("print-top", "20"));
const reportFile = getArg("report-file", "");

if (
  !Number.isFinite(defaultMaxDiff) ||
  !Number.isFinite(criticalMaxDiff) ||
  defaultMaxDiff <= 0 ||
  criticalMaxDiff <= 0
) {
  throw new Error("Invalid visual diff thresholds.");
}

function collectPngFiles(dirAbs, relBase = "") {
  const files = [];
  fs.readdirSync(dirAbs, { withFileTypes: true }).forEach((entry) => {
    const nextRel = relBase ? path.join(relBase, entry.name) : entry.name;
    const nextAbs = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectPngFiles(nextAbs, nextRel));
      return;
    }
    if (entry.isFile() && entry.name.endsWith(".png")) {
      files.push(nextRel);
    }
  });
  return files.sort();
}

function readPng(absPath) {
  return PNG.sync.read(fs.readFileSync(absPath));
}

function asPct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function getFallbackRules() {
  return {
    defaultMaxDiff,
    profiles: [
      {
        name: "critical",
        maxDiff: criticalMaxDiff,
        exact: new Set([
          "mobile-home.png",
          "desktop-home.png",
          "mobile-con-nguoi.png",
          "desktop-con-nguoi.png",
          "mobile-noi-chon.png",
          "desktop-noi-chon.png",
          "mobile-nhip-song.png",
          "desktop-nhip-song.png",
          "mobile-lam-viec.png",
          "desktop-lam-viec.png",
          "mobile-cau-chuyen.png",
          "desktop-cau-chuyen.png",
          "mobile-hinh-anh.png",
          "desktop-hinh-anh.png",
          "mobile-en.png",
          "desktop-en.png",
          "mobile-en__people.png",
          "desktop-en__people.png",
          "mobile-en__places.png",
          "desktop-en__places.png",
          "mobile-en__rhythms.png",
          "desktop-en__rhythms.png",
          "mobile-en__work.png",
          "desktop-en__work.png",
          "mobile-en__stories.png",
          "desktop-en__stories.png",
          "mobile-en__images.png",
          "desktop-en__images.png",
        ]),
        regex: [
          /^(mobile|desktop)-(cau-chuyen__da-lat-khong-chi-de-ghe-qua|en__stories__da-lat-khong-chi-de-ghe-qua)\.png$/,
          /^(mobile|desktop)-(lam-viec__lam-viec-tu-da-lat-khong-chi-la-mang-laptop-len-nui|en__work__lam-viec-tu-da-lat-khong-chi-la-mang-laptop-len-nui)\.png$/,
          /^(mobile|desktop)-(nhip-song__mot-ngay-da-lat-bat-dau-nhu-the-nao|en__rhythms__mot-ngay-da-lat-bat-dau-nhu-the-nao)\.png$/,
        ],
      },
    ],
  };
}

function loadRuleset() {
  if (!rulesFile) return getFallbackRules();
  const rulesAbs = path.join(root, rulesFile);
  if (!fs.existsSync(rulesAbs)) {
    throw new Error(`Rules file not found: ${rulesFile}`);
  }
  const raw = JSON.parse(fs.readFileSync(rulesAbs, "utf8"));
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.rules)) {
    throw new Error(`Invalid rules file format: ${rulesFile}`);
  }
  const parsedDefault = Number(raw.defaultMaxDiff);
  const effectiveDefault =
    Number.isFinite(parsedDefault) && parsedDefault > 0 ? parsedDefault : defaultMaxDiff;
  const profiles = raw.rules.map((rule, idx) => {
    const maxDiff = Number(rule.maxDiff);
    if (!rule.name || !Number.isFinite(maxDiff) || maxDiff <= 0) {
      throw new Error(`Invalid rule at index ${idx} in ${rulesFile}`);
    }
    const exact = new Set(Array.isArray(rule.exact) ? rule.exact : []);
    const regex = (Array.isArray(rule.regex) ? rule.regex : []).map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch {
        throw new Error(`Invalid regex "${pattern}" in ${rulesFile}`);
      }
    });
    return {
      name: rule.name,
      maxDiff,
      exact,
      regex,
    };
  });
  return {
    defaultMaxDiff: effectiveDefault,
    profiles,
  };
}

function resolveProfile(relPath, ruleset) {
  const filename = path.basename(relPath);
  for (const profile of ruleset.profiles) {
    if (profile.exact.has(filename)) {
      return profile;
    }
    if (profile.regex.some((rx) => rx.test(filename))) {
      return profile;
    }
  }
  return {
    name: "default",
    maxDiff: ruleset.defaultMaxDiff,
    exact: new Set(),
    regex: [],
  };
}

function main() {
  const baselineAbs = path.join(root, baselineDir);
  const candidateAbs = path.join(root, candidateDir);
  const ruleset = loadRuleset();

  if (!fs.existsSync(baselineAbs)) {
    throw new Error(`Baseline directory not found: ${baselineDir}`);
  }
  if (!fs.existsSync(candidateAbs)) {
    throw new Error(`Candidate directory not found: ${candidateDir}`);
  }

  const baselineFiles = collectPngFiles(baselineAbs);
  const candidateFiles = collectPngFiles(candidateAbs);

  if (baselineFiles.length === 0) {
    throw new Error(`No PNG files found in baseline: ${baselineDir}`);
  }
  if (candidateFiles.length === 0) {
    throw new Error(`No PNG files found in candidate: ${candidateDir}`);
  }

  const baselineSet = new Set(baselineFiles);
  const candidateSet = new Set(candidateFiles);

  const missingInBaseline = candidateFiles.filter((rel) => !baselineSet.has(rel));
  const missingInCandidate = baselineFiles.filter((rel) => !candidateSet.has(rel));

  if (missingInBaseline.length > 0 || missingInCandidate.length > 0) {
    throw new Error(
      [
        "Visual set drift detected.",
        missingInBaseline.length > 0 ? `Missing in baseline: ${missingInBaseline.length}` : "",
        missingInCandidate.length > 0 ? `Missing in candidate: ${missingInCandidate.length}` : "",
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  const results = candidateFiles.map((rel) => {
    const base = readPng(path.join(baselineAbs, rel));
    const next = readPng(path.join(candidateAbs, rel));
    const profile = resolveProfile(rel, ruleset);
    const maxAllowed = profile.maxDiff;

    if (base.width !== next.width || base.height !== next.height) {
      return {
        rel,
        profile: profile.name,
        width: next.width,
        height: next.height,
        mismatchedPixels: next.width * next.height,
        diffRatio: 1,
        maxAllowed,
        pass: false,
        reason: "dimension-mismatch",
      };
    }

    const mismatchedPixels = pixelmatch(base.data, next.data, null, base.width, base.height, {
      threshold: 0.1,
      includeAA: true,
      alpha: 0.1,
    });
    const pixels = base.width * base.height;
    const diffRatio = mismatchedPixels / pixels;
    return {
      rel,
      profile: profile.name,
      width: base.width,
      height: base.height,
      mismatchedPixels,
      diffRatio,
      maxAllowed,
      pass: diffRatio <= maxAllowed,
      reason: diffRatio <= maxAllowed ? "ok" : "threshold-exceeded",
    };
  });

  const failures = results.filter((item) => !item.pass);
  const top = [...results].sort((a, b) => b.diffRatio - a.diffRatio).slice(0, printTop);
  const summary = {
    baselineDir,
    candidateDir,
    rulesFile: rulesFile || "inline-fallback",
    checked: results.length,
    failed: failures.length,
    thresholds: {
      defaultMaxDiff: ruleset.defaultMaxDiff,
      fallbackCriticalMaxDiff: criticalMaxDiff,
    },
    profiles: ruleset.profiles.map((profile) => ({
      name: profile.name,
      maxDiff: profile.maxDiff,
    })),
    worstDiffRatio: top[0]?.diffRatio ?? 0,
    worstFile: top[0]?.rel ?? "",
  };

  console.log(
    `Visual diff check: checked=${summary.checked}, failed=${summary.failed}, worst=${asPct(summary.worstDiffRatio)} (${summary.worstFile || "n/a"})`
  );
  top.forEach((item) => {
    const badge = item.pass ? "PASS" : "FAIL";
    console.log(
      `[${badge}] ${item.rel} diff=${asPct(item.diffRatio)} max=${asPct(item.maxAllowed)} (${item.profile})`
    );
  });

  if (reportFile.length > 0) {
    const reportAbs = path.join(root, reportFile);
    fs.mkdirSync(path.dirname(reportAbs), { recursive: true });
    fs.writeFileSync(
      reportAbs,
      JSON.stringify(
        {
          ...summary,
          failures: failures.map((item) => ({
            rel: item.rel,
            diffRatio: item.diffRatio,
            maxAllowed: item.maxAllowed,
            profile: item.profile,
            reason: item.reason,
          })),
        },
        null,
        2
      )
    );
    console.log(`Visual diff report: ${reportFile}`);
  }

  if (failures.length > 0) {
    throw new Error(`Visual diff threshold failed on ${failures.length} screenshots.`);
  }

  console.log("PASS: visual diff threshold check passed.");
}

main();
