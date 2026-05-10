import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolveVisualQaPaths } from "./visual-qa-routes.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const prefix = `--${name}=`;
  const found = args.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};
const hasFlag = (name) => args.includes(`--${name}`);

const visualDir = getArg("visual-dir", "reports/visual-qa/2026-04-19");
const expectedVisualMinArg = getArg("expected-visual-min", "");
const visualMode = getArg("visual-mode", "");
const visualIncludeDesktop = hasFlag("visual-include-desktop");
const visualBaselineDir = getArg("visual-baseline-dir", "");
const visualDiffRulesFile = getArg("visual-diff-rules-file", "scripts/visual-diff-threshold-rules.json");
const visualDiffDefaultMax = getArg("visual-diff-default-max", "0.03");
const visualDiffCriticalMax = getArg("visual-diff-critical-max", "0.015");
const refreshVisualBaseline = hasFlag("refresh-visual-baseline");

function resolveExpectedVisualMin() {
  if (expectedVisualMinArg.length > 0) {
    const parsed = Number(expectedVisualMinArg);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      throw new Error(`Invalid --expected-visual-min value: ${expectedVisualMinArg}`);
    }
    return parsed;
  }

  if (visualMode.length > 0) {
    const routeCount = resolveVisualQaPaths({ root, mode: visualMode }).length;
    return routeCount * (visualIncludeDesktop ? 2 : 1);
  }

  return 10;
}

const expectedVisualMin = resolveExpectedVisualMin();

function runNodeScript(scriptRel) {
  const scriptAbs = path.join(root, scriptRel);
  execFileSync("node", [scriptAbs], { stdio: "inherit" });
}

function runNodeScriptWithArgs(scriptRel, scriptArgs) {
  const scriptAbs = path.join(root, scriptRel);
  execFileSync("node", [scriptAbs, ...scriptArgs], { stdio: "inherit" });
}

function assertStoriesFoundation() {
  const vi = JSON.parse(fs.readFileSync(path.join(root, "content/vi.json"), "utf8"));
  if ((vi.stories || []).length < 10) {
    throw new Error(`Foundation stories below target: ${(vi.stories || []).length}/10`);
  }
}

function assertVisualArtifacts() {
  const dir = path.join(root, visualDir);
  if (!fs.existsSync(dir)) {
    throw new Error(`Visual QA directory not found: ${visualDir}`);
  }
  const stack = [dir];
  let pngCount = 0;
  while (stack.length > 0) {
    const current = stack.pop();
    fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.endsWith(".png")) {
        pngCount += 1;
      }
    });
  }
  if (pngCount < expectedVisualMin) {
    throw new Error(`Visual artifacts too low: ${pngCount} < ${expectedVisualMin}`);
  }
  console.log(`Visual artifacts: ${pngCount} files (expected minimum: ${expectedVisualMin}).`);
}

function ensureFreshCopyDir(fromAbs, toAbs) {
  fs.rmSync(toAbs, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(toAbs), { recursive: true });
  fs.cpSync(fromAbs, toAbs, { recursive: true });
}

function assertVisualDiffThreshold() {
  if (!visualBaselineDir) return;

  const baselineAbs = path.join(root, visualBaselineDir);
  const candidateAbs = path.join(root, visualDir);

  if (!fs.existsSync(candidateAbs)) {
    throw new Error(`Visual candidate directory not found: ${visualDir}`);
  }

  if (!fs.existsSync(baselineAbs)) {
    ensureFreshCopyDir(candidateAbs, baselineAbs);
    console.log(`Initialized visual baseline from candidate: ${visualBaselineDir}`);
    return;
  }

  const reportRel = path.join(visualDir, "visual-diff-report.json");
  runNodeScriptWithArgs("scripts/check-visual-diff-threshold.mjs", [
    `--baseline-dir=${visualBaselineDir}`,
    `--candidate-dir=${visualDir}`,
    `--rules-file=${visualDiffRulesFile}`,
    `--default-max-diff=${visualDiffDefaultMax}`,
    `--critical-max-diff=${visualDiffCriticalMax}`,
    `--report-file=${reportRel}`,
  ]);

  if (refreshVisualBaseline) {
    ensureFreshCopyDir(candidateAbs, baselineAbs);
    console.log(`Refreshed visual baseline from candidate: ${visualBaselineDir}`);
  }
}

function main() {
  runNodeScript("scripts/build-content-from-cms.mjs");
  runNodeScript("scripts/sync-routes-sitemap.mjs");
  runNodeScript("scripts/sync-static-routes-meta.mjs");
  runNodeScript("scripts/check-content-routes.mjs");
  runNodeScript("scripts/check-og-extraction.mjs");
  assertStoriesFoundation();
  assertVisualArtifacts();
  assertVisualDiffThreshold();
  if (visualMode.length > 0) {
    console.log(
      `Release gate visual baseline was auto-calculated from mode=${visualMode}, includeDesktop=${visualIncludeDesktop}.`
    );
  }
  console.log("PASS: Team 1 release gate is ready.");
}

main();
