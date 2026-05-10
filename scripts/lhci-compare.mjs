import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.LHCI_BASE_URL ?? "https://omdalat.com/vi";
const runs = Number(process.env.LHCI_RUNS ?? "2");

const targets = [base, `${base}/docs`];

function runLighthouse(url) {
  const args = [
    "dlx",
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless=new",
    "--output=json",
    "--output-path=stdout",
    "--only-categories=performance"
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(process.platform === "win32" ? "pnpm.cmd" : "pnpm", args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "inherit"]
    });

    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Lighthouse failed for ${url} with code ${code}`));
        return;
      }
      resolve(output);
    });
  });
}

function summarize(jsonText) {
  const report = JSON.parse(jsonText);
  const audits = report.audits;

  function pickAuditValue(keys, fallback = 0) {
    for (const key of keys) {
      const value = audits[key]?.numericValue;
      if (typeof value === "number") {
        return value;
      }
    }
    return fallback;
  }

  return {
    performance: Number((report.categories.performance.score * 100).toFixed(1)),
    lcp: Number(pickAuditValue(["largest-contentful-paint"]).toFixed(2)),
    inp: Number(pickAuditValue(["interaction-to-next-paint", "experimental-interaction-to-next-paint", "max-potential-fid"]).toFixed(2)),
    cls: Number(pickAuditValue(["cumulative-layout-shift"]).toFixed(4)),
    ttfb: Number(pickAuditValue(["server-response-time", "network-server-latency"]).toFixed(2))
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) {
    return 0;
  }
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  }
  return Number(sorted[mid].toFixed(2));
}

function aggregateRunMetrics(runMetrics) {
  return {
    performance: median(runMetrics.map((item) => item.performance)),
    lcp: median(runMetrics.map((item) => item.lcp)),
    inp: median(runMetrics.map((item) => item.inp)),
    cls: median(runMetrics.map((item) => item.cls)),
    ttfb: median(runMetrics.map((item) => item.ttfb))
  };
}

async function readPrevious(outputPath) {
  try {
    const text = await readFile(outputPath, "utf8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function main() {
  const outputPath = path.join(process.cwd(), "apps", "web", ".vercel", "lighthouse-summary.json");
  const previous = await readPrevious(outputPath);
  const results = [];

  for (const target of targets) {
    const runsData = [];
    for (let run = 1; run <= runs; run += 1) {
      process.stdout.write(`Running Lighthouse for ${target} (run ${run}/${runs})\n`);
      const raw = await runLighthouse(target);
      runsData.push(summarize(raw));
    }

    results.push({
      url: target,
      metrics: aggregateRunMetrics(runsData)
    });
  }

  await writeFile(outputPath, JSON.stringify({ generatedAt: new Date().toISOString(), runs, results }, null, 2));

  process.stdout.write("\nLighthouse summary\n");
  for (const item of results) {
    const prev = previous?.results?.find((entry) => entry.url === item.url);
    const deltaPerf = prev ? Number((item.metrics.performance - prev.metrics.performance).toFixed(1)) : null;
    const deltaLcp = prev ? Number((item.metrics.lcp - prev.metrics.lcp).toFixed(2)) : null;
    const deltaInp = prev ? Number((item.metrics.inp - prev.metrics.inp).toFixed(2)) : null;
    const deltaCls = prev ? Number((item.metrics.cls - prev.metrics.cls).toFixed(4)) : null;

    process.stdout.write(
      `${item.url}\n  perf=${item.metrics.performance}${deltaPerf === null ? "" : ` (${deltaPerf >= 0 ? "+" : ""}${deltaPerf})`}  lcp=${item.metrics.lcp}ms${deltaLcp === null ? "" : ` (${deltaLcp >= 0 ? "+" : ""}${deltaLcp})`}  inp=${item.metrics.inp}ms${deltaInp === null ? "" : ` (${deltaInp >= 0 ? "+" : ""}${deltaInp})`}  cls=${item.metrics.cls}${deltaCls === null ? "" : ` (${deltaCls >= 0 ? "+" : ""}${deltaCls})`}  ttfb=${item.metrics.ttfb}ms\n`
    );
  }
  process.stdout.write(`\nSaved to ${outputPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
