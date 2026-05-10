import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const matrixPath = path.resolve(cwd, "docs", "SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md");
const packetPath = path.resolve(cwd, "docs", "SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md");
const outputPath = path.resolve(cwd, "reports", "sprint0", "MISSING_EVIDENCE.md");

function extractTableRows(markdown, heading) {
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);

  if (start === -1) {
    return [];
  }

  const after = markdown.slice(start + marker.length);
  const nextHeadingIndex = after.search(/\n##\s+/);
  const section = nextHeadingIndex === -1 ? after : after.slice(0, nextHeadingIndex);

  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\|\s*`?\/.+\|/.test(line))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim().replace(/^`|`$/g, ""))
    );
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectVisualMissing(rows) {
  const missing = [];

  for (const cells of rows) {
    const route = cells[0];
    const desktopPath = path.resolve(cwd, cells[4]);
    const mobilePath = path.resolve(cwd, cells[5]);

    // eslint-disable-next-line no-await-in-loop
    const desktopExists = await fileExists(desktopPath);
    // eslint-disable-next-line no-await-in-loop
    const mobileExists = await fileExists(mobilePath);

    if (!desktopExists) {
      missing.push(`- ${route} desktop: \`${desktopPath}\``);
    }

    if (!mobileExists) {
      missing.push(`- ${route} mobile: \`${mobilePath}\``);
    }
  }

  return missing;
}

async function collectStagingPending(rows) {
  const pending = [];

  for (const cells of rows) {
    const route = cells[0];
    const proofPath = path.resolve(cwd, cells[1]);
    // eslint-disable-next-line no-await-in-loop
    const content = await readFile(proofPath, "utf8");
    const isTemplateOnly =
      content.includes("- PASS|FAIL:") &&
      content.includes("- Reviewer:") &&
      content.includes("- Date:") &&
      content.includes("- Base URL:");

    if (isTemplateOnly) {
      pending.push(`- ${route}: \`${proofPath}\``);
    }
  }

  return pending;
}

function packetFlags(packet) {
  return [
    `- packet visual pending: \`${packet.includes("PENDING_VISUAL_REVIEW") ? "YES" : "NO"}\``,
    `- packet staging pending: \`${packet.includes("PENDING_STAGING_REVIEW") ? "YES" : "NO"}\``,
    `- packet signoff pending: \`${packet.includes("PENDING_STAGING_SIGNOFF") ? "YES" : "NO"}\``,
    `- deploy blocked by wrangler auth: \`${packet.includes("FRESH_DEPLOY_BLOCKED_BY_WRANGLER_AUTH") ? "YES" : "NO"}\``,
    `- local build trace blocked: \`${packet.includes("Collecting build traces") ? "YES" : "NO"}\``
  ];
}

async function main() {
  const [matrix, packet] = await Promise.all([
    readFile(matrixPath, "utf8"),
    readFile(packetPath, "utf8")
  ]);

  const visualRows = extractTableRows(matrix, "2. Team 2 visual evidence");
  const stagingRows = extractTableRows(matrix, "3. QA / SEO staging evidence");
  const visualMissing = await collectVisualMissing(visualRows);
  const stagingPending = await collectStagingPending(stagingRows);
  const lines = [
    "# Sprint 0 Missing Evidence",
    "",
    `Generated from: \`${matrixPath}\``,
    `Packet snapshot: \`${packetPath}\``,
    "",
    "## Summary",
    "",
    `- visual missing files: \`${visualMissing.length}/12\``,
    `- staging proof files still template-only: \`${stagingPending.length}/6\``,
    ...packetFlags(packet),
    "",
    "## Missing visual files",
    "",
    ...(visualMissing.length > 0 ? visualMissing : ["- none"]),
    "",
    "## Staging proof files still pending",
    "",
    ...(stagingPending.length > 0 ? stagingPending : ["- none"]),
    ""
  ];

  await writeFile(outputPath, `${lines.join("\n")}`, "utf8");
  console.log(`Sprint 0 missing evidence report written to ${outputPath}`);
}

main().catch((error) => {
  console.error("FAIL - sprint0 missing evidence report");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
