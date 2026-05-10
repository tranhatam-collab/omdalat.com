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
const hasFlag = (name) => args.includes(`--${name}`);

const runsRoot = getArg("runs-root", "reports/visual-qa");
const baselineDir = getArg("baseline-dir", "reports/visual-baseline/full-site");
const rulesFile = getArg("rules-file", "scripts/visual-diff-threshold-rules.json");
const modes = getArg("modes", "core,full-detail,full-site,foundation")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const minSamples = Number(getArg("min-samples", "10"));
const buffer = Number(getArg("buffer", "0.002"));
const minCoverage = Number(getArg("min-coverage", "0.9"));
const maxGrowthFactor = Number(getArg("max-growth-factor", "1.25"));
const outputReport = getArg("output", "reports/visual-qa/threshold-calibration-round2.json");
const apply = hasFlag("apply");

if (!Number.isFinite(minSamples) || minSamples <= 0) {
  throw new Error(`Invalid --min-samples value: ${minSamples}`);
}
if (!Number.isFinite(buffer) || buffer < 0) {
  throw new Error(`Invalid --buffer value: ${buffer}`);
}
if (!Number.isFinite(minCoverage) || minCoverage <= 0 || minCoverage > 1) {
  throw new Error(`Invalid --min-coverage value: ${minCoverage}`);
}
if (!Number.isFinite(maxGrowthFactor) || maxGrowthFactor < 1) {
  throw new Error(`Invalid --max-growth-factor value: ${maxGrowthFactor}`);
}

const floorByProfile = {
  "landing-core": 0.01,
  "pillar-detail": 0.012,
  "support-pages": 0.018,
  default: 0.025,
};

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
  return files;
}

function buildByFilenameMap(dirAbs) {
  const entries = collectPngFiles(dirAbs);
  const map = new Map();
  entries.forEach((rel) => {
    const name = path.basename(rel);
    if (!map.has(name)) {
      map.set(name, path.join(dirAbs, rel));
    }
  });
  return map;
}

function findRunDirectories(rootAbs) {
  const runsAbs = path.join(root, rootAbs);
  if (!fs.existsSync(runsAbs)) {
    throw new Error(`Runs root not found: ${rootAbs}`);
  }
  const found = [];
  fs.readdirSync(runsAbs, { withFileTypes: true }).forEach((dayDir) => {
    if (!dayDir.isDirectory()) return;
    const dayAbs = path.join(runsAbs, dayDir.name);
    fs.readdirSync(dayAbs, { withFileTypes: true }).forEach((modeDir) => {
      if (!modeDir.isDirectory()) return;
      if (!modes.includes(modeDir.name)) return;
      const modeAbs = path.join(dayAbs, modeDir.name);
      const pngCount = collectPngFiles(modeAbs).length;
      if (pngCount > 0) {
        found.push({
          key: `${dayDir.name}/${modeDir.name}`,
          abs: modeAbs,
          day: dayDir.name,
          mode: modeDir.name,
        });
      }
    });
  });
  return found;
}

function readRules(rulesRel) {
  const rulesAbs = path.join(root, rulesRel);
  if (!fs.existsSync(rulesAbs)) {
    throw new Error(`Rules file not found: ${rulesRel}`);
  }
  const parsed = JSON.parse(fs.readFileSync(rulesAbs, "utf8"));
  if (!parsed || !Array.isArray(parsed.rules)) {
    throw new Error(`Invalid rules file format: ${rulesRel}`);
  }
  const compiled = {
    defaultMaxDiff: Number(parsed.defaultMaxDiff),
    rules: parsed.rules.map((rule) => ({
      ...rule,
      exactSet: new Set(Array.isArray(rule.exact) ? rule.exact : []),
      regexList: (Array.isArray(rule.regex) ? rule.regex : []).map((item) => new RegExp(item)),
    })),
  };
  if (!Number.isFinite(compiled.defaultMaxDiff) || compiled.defaultMaxDiff <= 0) {
    throw new Error(`Invalid defaultMaxDiff in ${rulesRel}`);
  }
  return { parsed, compiled };
}

function resolveProfile(filename, compiledRules) {
  for (const rule of compiledRules.rules) {
    if (rule.exactSet.has(filename)) {
      return { name: rule.name, maxDiff: Number(rule.maxDiff) };
    }
    if (rule.regexList.some((rx) => rx.test(filename))) {
      return { name: rule.name, maxDiff: Number(rule.maxDiff) };
    }
  }
  return { name: "default", maxDiff: compiledRules.defaultMaxDiff };
}

function readPng(absPath) {
  return PNG.sync.read(fs.readFileSync(absPath));
}

function diffRatio(baseAbs, candidateAbs) {
  const base = readPng(baseAbs);
  const next = readPng(candidateAbs);
  if (base.width !== next.width || base.height !== next.height) {
    return 1;
  }
  const mismatched = pixelmatch(base.data, next.data, null, base.width, base.height, {
    threshold: 0.1,
    includeAA: true,
    alpha: 0.1,
  });
  return mismatched / (base.width * base.height);
}

function percentile(values, p) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.ceil(sorted.length * p) - 1);
  return sorted[idx];
}

function round4(value) {
  return Math.round(value * 10000) / 10000;
}

function main() {
  const baselineAbs = path.join(root, baselineDir);
  if (!fs.existsSync(baselineAbs)) {
    throw new Error(`Baseline directory not found: ${baselineDir}`);
  }

  const baselineMap = buildByFilenameMap(baselineAbs);
  if (baselineMap.size === 0) {
    throw new Error(`No PNG files found in baseline: ${baselineDir}`);
  }

  const runDirs = findRunDirectories(runsRoot);
  if (runDirs.length === 0) {
    throw new Error(`No candidate run directories found under: ${runsRoot}`);
  }

  const { parsed: originalRules, compiled: compiledRules } = readRules(rulesFile);
  const byProfile = new Map();
  const runStats = [];

  runDirs.forEach((run) => {
    const candidateMap = buildByFilenameMap(run.abs);
    let matched = 0;
    let compared = 0;
    const runRatios = [];
    baselineMap.forEach((baselinePath, filename) => {
      const candidatePath = candidateMap.get(filename);
      if (!candidatePath) return;
      matched += 1;
      const ratio = diffRatio(baselinePath, candidatePath);
      runRatios.push({ filename, ratio });
      compared += 1;
    });
    const coverage = baselineMap.size > 0 ? matched / baselineMap.size : 0;
    const include = coverage >= minCoverage;
    if (include) {
      runRatios.forEach(({ filename, ratio }) => {
        const profile = resolveProfile(filename, compiledRules);
        if (!byProfile.has(profile.name)) {
          byProfile.set(profile.name, []);
        }
        byProfile.get(profile.name).push(ratio);
      });
    }
    runStats.push({
      run: run.key,
      mode: run.mode,
      matched,
      compared,
      totalCandidateFiles: candidateMap.size,
      coverage: round4(coverage),
      includedForCalibration: include,
    });
  });

  const suggestionRows = [];
  const nextRules = JSON.parse(JSON.stringify(originalRules));
  const ruleIndex = new Map(nextRules.rules.map((rule, idx) => [rule.name, idx]));

  const allProfiles = new Set(["default", ...nextRules.rules.map((rule) => rule.name)]);
  allProfiles.forEach((profileName) => {
    const samples = byProfile.get(profileName) || [];
    const p95 = percentile(samples, 0.95);
    const current =
      profileName === "default"
        ? Number(nextRules.defaultMaxDiff)
        : Number(nextRules.rules[ruleIndex.get(profileName)]?.maxDiff);
    const floor = floorByProfile[profileName] ?? floorByProfile.default;
    const rawSuggested = Math.max(floor, p95 + buffer);
    const cappedSuggested = Math.min(rawSuggested, current * maxGrowthFactor);
    const suggested = round4(cappedSuggested);
    const enoughSamples = samples.length >= minSamples;
    const finalValue = enoughSamples ? suggested : current;

    suggestionRows.push({
      profile: profileName,
      samples: samples.length,
      current,
      p95: round4(p95),
      buffer: round4(buffer),
      floor,
      suggested: round4(rawSuggested),
      suggestedAfterGrowthCap: suggested,
      growthCap: round4(current * maxGrowthFactor),
      applied: enoughSamples ? finalValue : null,
      keptReason: enoughSamples ? null : `insufficient-samples (<${minSamples})`,
    });

    if (!apply || !enoughSamples) return;
    if (profileName === "default") {
      nextRules.defaultMaxDiff = finalValue;
      return;
    }
    const idx = ruleIndex.get(profileName);
    if (idx === undefined) return;
    nextRules.rules[idx].maxDiff = finalValue;
  });

  const report = {
    generatedAt: new Date().toISOString(),
    baselineDir,
    runsRoot,
    modes,
    minSamples,
    buffer,
    minCoverage,
    maxGrowthFactor,
    apply,
    runStats,
    suggestions: suggestionRows,
  };

  const reportAbs = path.join(root, outputReport);
  fs.mkdirSync(path.dirname(reportAbs), { recursive: true });
  fs.writeFileSync(reportAbs, JSON.stringify(report, null, 2));

  if (apply) {
    const rulesAbs = path.join(root, rulesFile);
    fs.writeFileSync(rulesAbs, `${JSON.stringify(nextRules, null, 2)}\n`);
  }

  console.log(`Calibration report: ${outputReport}`);
  suggestionRows.forEach((row) => {
    const status = row.applied === null ? "KEEP" : "APPLY";
    const target = row.applied === null ? row.current : row.applied;
    console.log(
      `[${status}] ${row.profile} samples=${row.samples} current=${(row.current * 100).toFixed(2)}% p95=${(row.p95 * 100).toFixed(2)}% target=${(target * 100).toFixed(2)}%`
    );
  });
}

main();
