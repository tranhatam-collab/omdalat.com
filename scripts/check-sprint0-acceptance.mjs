import { access, readFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();

const matrixPath = path.resolve(cwd, "docs", "SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md");
const packetPath = path.resolve(cwd, "docs", "SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md");
const reportsRoot = path.resolve(cwd, "reports", "sprint0");

const requiredScaffoldFiles = [
  path.join(reportsRoot, "README.md"),
  path.join(reportsRoot, "visual", "song-o-da-lat-la-gi", "README.md"),
  path.join(reportsRoot, "visual", "lam-viec-o-da-lat-co-thuc-te-khong", "README.md"),
  path.join(reportsRoot, "visual", "tu-mot-ky-nang-den-thu-nhap-o-da-lat", "README.md"),
  path.join(reportsRoot, "staging", "song-o-da-lat-la-gi", "vi.md"),
  path.join(reportsRoot, "staging", "song-o-da-lat-la-gi", "en.md"),
  path.join(reportsRoot, "staging", "lam-viec-o-da-lat-co-thuc-te-khong", "vi.md"),
  path.join(reportsRoot, "staging", "lam-viec-o-da-lat-co-thuc-te-khong", "en.md"),
  path.join(reportsRoot, "staging", "tu-mot-ky-nang-den-thu-nhap-o-da-lat", "vi.md"),
  path.join(reportsRoot, "staging", "tu-mot-ky-nang-den-thu-nhap-o-da-lat", "en.md")
];

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

function summarizeRows(rows, kind) {
  const pending = [];
  const passed = [];
  const failed = [];

  for (const cells of rows) {
    const route = cells[0];
    const status = cells[cells.length - 2];

    if (status === "PASS") {
      passed.push(route);
      continue;
    }

    if (status === "FAIL") {
      failed.push(route);
      continue;
    }

    pending.push(route);
  }

  return {
    kind,
    total: rows.length,
    passed,
    failed,
    pending
  };
}

function extractPacketState(markdown) {
  return {
    visualReviewPending: markdown.includes("PENDING_VISUAL_REVIEW"),
    stagingReviewPending: markdown.includes("PENDING_STAGING_REVIEW"),
    decisionPending: markdown.includes("PENDING_STAGING_SIGNOFF"),
    deployBlocked: markdown.includes("FRESH_DEPLOY_BLOCKED_BY_WRANGLER_AUTH"),
    localBuildTraceBlocked: markdown.includes("Collecting build traces")
  };
}

function printSummary(summary) {
  console.log(`${summary.kind}_total=${summary.total}`);
  console.log(`${summary.kind}_passed=${summary.passed.length}`);
  console.log(`${summary.kind}_failed=${summary.failed.length}`);
  console.log(`${summary.kind}_pending=${summary.pending.length}`);

  for (const route of summary.failed) {
    console.log(`${summary.kind}_route_fail=${route}`);
  }

  for (const route of summary.pending) {
    console.log(`${summary.kind}_route_pending=${route}`);
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function countVisualEvidenceFiles(rows) {
  let existing = 0;
  const missing = [];

  for (const cells of rows) {
    const route = cells[0];
    const desktopPath = path.resolve(cwd, cells[4]);
    const mobilePath = path.resolve(cwd, cells[5]);

    // eslint-disable-next-line no-await-in-loop
    const desktopExists = await fileExists(desktopPath);
    // eslint-disable-next-line no-await-in-loop
    const mobileExists = await fileExists(mobilePath);

    if (desktopExists) {
      existing += 1;
    } else {
      missing.push(`${route} desktop -> ${desktopPath}`);
    }

    if (mobileExists) {
      existing += 1;
    } else {
      missing.push(`${route} mobile -> ${mobilePath}`);
    }
  }

  return { existing, missing, expected: rows.length * 2 };
}

async function summarizeStagingProofFiles(rows) {
  let substantive = 0;
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
      pending.push(`${route} -> ${proofPath}`);
      continue;
    }

    substantive += 1;
  }

  return { substantive, pending, expected: rows.length };
}

async function main() {
  const [matrix, packet] = await Promise.all([
    readFile(matrixPath, "utf8"),
    readFile(packetPath, "utf8")
  ]);

  const visualRows = extractTableRows(matrix, "2. Team 2 visual evidence");
  const stagingRows = extractTableRows(matrix, "3. QA / SEO staging evidence");
  const packetState = extractPacketState(packet);

  if (visualRows.length !== 6) {
    throw new Error(`Expected 6 visual evidence rows. Found ${visualRows.length}.`);
  }

  if (stagingRows.length !== 6) {
    throw new Error(`Expected 6 staging evidence rows. Found ${stagingRows.length}.`);
  }

  const visualSummary = summarizeRows(visualRows, "visual");
  const stagingSummary = summarizeRows(stagingRows, "staging");
  const scaffoldChecks = await Promise.all(requiredScaffoldFiles.map((filePath) => fileExists(filePath)));
  const missingScaffoldFiles = requiredScaffoldFiles.filter((_, index) => !scaffoldChecks[index]);
  const visualArtifacts = await countVisualEvidenceFiles(visualRows);
  const stagingArtifacts = await summarizeStagingProofFiles(stagingRows);

  console.log("SPRINT0_ACCEPTANCE_CHECK");
  console.log(`matrix=${matrixPath}`);
  console.log(`packet=${packetPath}`);
  console.log(`reports_root=${reportsRoot}`);
  printSummary(visualSummary);
  printSummary(stagingSummary);
  console.log(`artifact_scaffold_ready=${missingScaffoldFiles.length === 0 ? "YES" : "NO"}`);
  console.log(`artifact_scaffold_missing=${missingScaffoldFiles.length}`);
  for (const filePath of missingScaffoldFiles) {
    console.log(`artifact_scaffold_missing_file=${filePath}`);
  }
  console.log(`visual_artifact_files=${visualArtifacts.existing}/${visualArtifacts.expected}`);
  for (const item of visualArtifacts.missing) {
    console.log(`visual_artifact_missing=${item}`);
  }
  console.log(`staging_proof_files_substantive=${stagingArtifacts.substantive}/${stagingArtifacts.expected}`);
  for (const item of stagingArtifacts.pending) {
    console.log(`staging_proof_template_pending=${item}`);
  }
  console.log(`packet_visual_pending=${packetState.visualReviewPending ? "YES" : "NO"}`);
  console.log(`packet_staging_pending=${packetState.stagingReviewPending ? "YES" : "NO"}`);
  console.log(`packet_signoff_pending=${packetState.decisionPending ? "YES" : "NO"}`);
  console.log(`packet_deploy_blocked=${packetState.deployBlocked ? "YES" : "NO"}`);
  console.log(`packet_build_trace_blocked=${packetState.localBuildTraceBlocked ? "YES" : "NO"}`);

  const overallReady =
    visualSummary.pending.length === 0 &&
    visualSummary.failed.length === 0 &&
    stagingSummary.pending.length === 0 &&
    stagingSummary.failed.length === 0 &&
    !packetState.visualReviewPending &&
    !packetState.stagingReviewPending &&
    !packetState.decisionPending;

  console.log(`sprint0_acceptance=${overallReady ? "READY_TO_CLOSE" : "PENDING"}`);
}

main().catch((error) => {
  console.error("FAIL - sprint0 acceptance check");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
