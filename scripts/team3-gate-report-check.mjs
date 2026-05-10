import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REQUIRED_SECTIONS = [
  "## 1. Lane + owner",
  "## 2. Scope đã kiểm",
  "## 3. P0 done",
  "## 4. P0 blocked",
  "## 5. P1 queue",
  "## 6. Files / routes / modules liên quan",
  "## 7. Commands đã chạy",
  "## 8. Evidence",
  "## 9. Quyết định cần Team 1 chốt",
  "## 10. Việc tiếp theo + phần trăm còn lại"
];

const REQUIRED_BLOCKER_TAGS = [
  "[code]",
  "[toolchain]"
];

function resolveReportPath(argv) {
  const explicit = argv[2]?.trim();
  if (explicit) {
    return path.resolve(process.cwd(), explicit);
  }
  return path.resolve(process.cwd(), "docs", "TEAM3_APP_MEMBER_RUNTIME_AUDIT_REPORT_2026-04-28.md");
}

function collectMissing(content, requiredList) {
  return requiredList.filter((item) => !content.includes(item));
}

async function main() {
  const reportPath = resolveReportPath(process.argv);
  const content = await readFile(reportPath, "utf8");

  const missingSections = collectMissing(content, REQUIRED_SECTIONS);
  const missingBlockerTags = collectMissing(content, REQUIRED_BLOCKER_TAGS);

  if (missingSections.length || missingBlockerTags.length) {
    console.error(`FAIL - Team3 report format check: ${reportPath}`);
    if (missingSections.length) {
      console.error("Missing sections:");
      for (const item of missingSections) {
        console.error(`- ${item}`);
      }
    }
    if (missingBlockerTags.length) {
      console.error("Missing required blocker tags:");
      for (const item of missingBlockerTags) {
        console.error(`- ${item}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log(`PASS - Team3 report format check: ${reportPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
