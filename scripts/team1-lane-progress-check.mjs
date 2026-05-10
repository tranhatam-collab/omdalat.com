import { readFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();

const trackerPath = path.resolve(cwd, "docs", "OMDALAT_3_LANE_SUBMISSION_TRACKER_2026-04-28.md");
const decisionLogPath = path.resolve(cwd, "docs", "OMDALAT_3_LANE_DECISION_LOG_2026-04-28.md");
const progressPath = path.resolve(cwd, "docs", "OMDALAT_3_LANE_GLOBAL_PROGRESS_2026-04-28.md");

const requiredFiles = [
  path.resolve(cwd, "docs", "TEAM2_OM_PUBLIC_AUDIT_REPORT_2026-04-28.md"),
  path.resolve(cwd, "docs", "OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md"),
  path.resolve(cwd, "docs", "OMDALAT_PUBLIC_ROUTE_INVENTORY_MATRIX_2026-04-28.md"),
  path.resolve(cwd, "docs", "OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md"),
  path.resolve(cwd, "docs", "OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md"),
  path.resolve(cwd, "docs", "TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md"),
  path.resolve(cwd, "docs", "APP_MEMBER_RUNTIME_ACCESS_AND_SURFACE_MATRIX_2026-04-28.md"),
  path.resolve(cwd, "docs", "APP_MEMBER_RUNTIME_EVIDENCE_PACKET_2026-04-28.md"),
  path.resolve(cwd, "ap.omdalat.com", "docs", "APTEAM_EDITORIAL_AUDIT_REPORT_2026-04-28.md"),
  path.resolve(cwd, "ap.omdalat.com", "docs", "AP_EDITORIAL_ROUTE_AND_METADATA_MATRIX_2026-04-28.md"),
  path.resolve(cwd, "ap.omdalat.com", "docs", "AP_EDITORIAL_EVIDENCE_PACKET_2026-04-28.md")
];

const laneSpecs = [
  { key: "team2", heading: "1. Team 2 — Om Public", label: "Team 2 — Om Public" },
  { key: "team3", heading: "2. Team 3 — App Member Runtime", label: "Team 3 — App Member Runtime" },
  { key: "ap", heading: "3. Ap Team — Ap Editorial", label: "Ap Team — Ap Editorial" }
];

function extractLaneBlock(content, heading) {
  const needle = `## ${heading}`;
  const start = content.indexOf(needle);
  if (start === -1) return "";

  const after = content.slice(start + needle.length);
  const next = after.search(/\n##\s+\d+\.\s+/);
  if (next === -1) return content.slice(start);
  return content.slice(start, start + needle.length + next);
}

function extractBulletValue(block, label) {
  const labelPattern = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${labelPattern}[\\s\\S]*?\\n\\*\\s+\`([^\\\`]+)\``, "m");
  const match = block.match(pattern);
  return match ? match[1].trim() : "UNKNOWN";
}

function extractDecisionStatus(content, marker) {
  const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`###\\s+${escaped}[\\s\\S]*?Status:[\\s\\S]*?\\n\\*\\s+\`([^\\\`]+)\``, "m");
  const match = content.match(pattern);
  return match ? match[1].trim() : "UNKNOWN";
}

function extractProgressPercent(content, heading) {
  const block = extractLaneBlock(content, heading);
  const match = block.match(/Current-state progress[^\n]*:\s+\`([^`]+)\`/m);
  return match ? match[1].trim() : "UNKNOWN";
}

async function fileExists(filePath) {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const tracker = await readFile(trackerPath, "utf8");
  const decisionLog = await readFile(decisionLogPath, "utf8");
  const progress = await readFile(progressPath, "utf8");

  const output = [];
  output.push("TEAM1_LANE_PROGRESS_CHECK");
  output.push(`tracker=${trackerPath}`);
  output.push(`decision_log=${decisionLogPath}`);
  output.push(`global_progress=${progressPath}`);
  output.push("");

  for (const lane of laneSpecs) {
    const block = extractLaneBlock(tracker, lane.heading);
    const submission = extractBulletValue(block, "Submission status:");
    const review = extractBulletValue(block, "Review status:");
    const evidence = extractBulletValue(block, "Evidence status:");

    let decisionMarker = "";
    if (lane.key === "team2") decisionMarker = "R-TEAM2-OM-PUBLIC";
    if (lane.key === "team3") decisionMarker = "R-TEAM3-APP-RUNTIME";
    if (lane.key === "ap") decisionMarker = "R-AP-EDITORIAL";
    const decision = extractDecisionStatus(decisionLog, decisionMarker);

    let progressHeading = "";
    if (lane.key === "team2") progressHeading = "1.1 Om Public (Team 2)";
    if (lane.key === "team3") progressHeading = "1.2 App Member Runtime (Team 3)";
    if (lane.key === "ap") progressHeading = "1.3 Ap Editorial (Ap Team)";
    const progressPercent = extractProgressPercent(progress, progressHeading);

    output.push(`${lane.label}`);
    output.push(`  submission=${submission}`);
    output.push(`  review=${review}`);
    output.push(`  evidence=${evidence}`);
    output.push(`  decision_log=${decision}`);
    output.push(`  progress=${progressPercent}`);
  }

  output.push("");

  const missing = [];
  for (const filePath of requiredFiles) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await fileExists(filePath);
    if (!exists) missing.push(filePath);
  }

  if (missing.length === 0) {
    output.push("required_files=PASS");
  } else {
    output.push("required_files=FAIL");
    for (const filePath of missing) {
      output.push(`  missing=${filePath}`);
    }
  }

  const goNoGo = progress.includes("NO-GO_FOR_FULL_3_LANE_CLOSURE")
    ? "NO_GO"
    : progress.includes("GO_FOR_FULL_3_LANE_CLOSURE")
      ? "GO"
      : "UNKNOWN";
  output.push(`global_gate=${goNoGo}`);

  console.log(output.join("\n"));
}

main().catch((error) => {
  console.error("FAIL - team1 lane progress check");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
