import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolveVisualQaPaths } from "./visual-qa-routes.mjs";

const root = process.cwd();
const now = new Date();
const y = String(now.getFullYear());
const m = String(now.getMonth() + 1).padStart(2, "0");
const d = String(now.getDate()).padStart(2, "0");
const today = `${y}-${m}-${d}`;

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const prefix = `--${name}=`;
  const found = args.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};
const hasFlag = (name) => args.includes(`--${name}`);

const baseUrl = getArg("base-url", "http://127.0.0.1:4173").replace(/\/$/, "");
const mode = getArg("mode", "foundation");
const outputBase = getArg("output", `reports/visual-qa/${today}`);
const mobileViewport = getArg("mobile-viewport", "390,844");
const desktopViewport = getArg("desktop-viewport", "1440,900");
const waitMs = getArg("wait-ms", "1200");
const includeDesktop = hasFlag("include-desktop");
const browser = getArg("browser", "chromium");
const printPlan = hasFlag("print-plan");

const playwrightBin = path.join(root, "../apps/web/node_modules/.bin/playwright");
if (!printPlan && !fs.existsSync(playwrightBin)) {
  console.error(`Playwright binary not found: ${playwrightBin}`);
  process.exit(1);
}

const paths = resolveVisualQaPaths({ root, mode });

const toName = (route) => {
  const cleaned = route.replace(/^\/|\/$/g, "");
  if (!cleaned) return "home";
  return cleaned.replaceAll("/", "__");
};

function ensureDir(relDir) {
  fs.mkdirSync(path.join(root, relDir), { recursive: true });
}

function runShot({ label, viewport, route, outputDir }) {
  const outputRel = `${outputDir}/${label}-${toName(route)}.png`;
  const outputAbs = path.join(root, outputRel);
  const url = `${baseUrl}${route}`;
  execFileSync(
    playwrightBin,
    [
      "screenshot",
      "-b",
      browser,
      `--viewport-size=${viewport}`,
      "--full-page",
      `--wait-for-timeout=${waitMs}`,
      url,
      outputAbs,
    ],
    { stdio: "inherit" }
  );
  return outputRel;
}

function main() {
  if (printPlan) {
    console.log(`Visual QA plan: mode=${mode}, routes=${paths.length}, includeDesktop=${includeDesktop}`);
    paths.forEach((route) => console.log(`- ${route}`));
    return;
  }

  const mobileDir = `${outputBase}/mobile`;
  const desktopDir = `${outputBase}/desktop`;
  ensureDir(mobileDir);
  if (includeDesktop) ensureDir(desktopDir);

  const created = [];
  paths.forEach((route) => {
    created.push(runShot({
      label: "mobile",
      viewport: mobileViewport,
      route,
      outputDir: mobileDir,
    }));
    if (includeDesktop) {
      created.push(runShot({
        label: "desktop",
        viewport: desktopViewport,
        route,
        outputDir: desktopDir,
      }));
    }
  });

  console.log(
    `Visual QA done. mode=${mode}, mobile=${paths.length}, desktop=${includeDesktop ? paths.length : 0}`
  );
  created.forEach((item) => console.log(`- ${item}`));
}

main();
