#!/usr/bin/env node
/**
 * CI Guard: Detect SQL files that set compliance fields to verified/approved
 * without corresponding compliance_evidence INSERT in the same file.
 *
 * Per AGENTS.md, compliance fields (business_registration, lodging_compliance,
 * pccc, tourism_service, food_safety) are LEGAL ASSERTIONS and MUST be set
 * through POST /api/omdalat/brands/:id/compliance route, NOT via direct SQL.
 *
 * This script scans all .sql files in workers/api/migrations/ and rejects:
 *   1. INSERT INTO compliance_checklists with 'verified' or 'approved' values
 *   2. UPDATE compliance_checklists SET ... = 'verified' or 'approved'
 *   3. UPDATE brands SET publication_status = 'published' in same file as
 *      compliance UPDATE/INSERT with verified/approved
 *
 * Exceptions allowed only if the file also contains
 *   INSERT INTO compliance_evidence
 * AND a comment containing "AGENTS.md exception:" explaining why.
 *
 * Exit code: 0 = pass, 1 = violation found
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = join(process.cwd(), "workers", "api", "migrations");
const COMPLIANCE_FIELDS = [
  "business_registration",
  "lodging_compliance",
  "pccc",
  "tourism_service",
  "food_safety",
];
const FORBIDDEN_VALUES = ["verified", "approved"];
const OK_VALUES = ["verified", "approved", "not_applicable", "unknown", "pending"];

function findSqlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findSqlFiles(fullPath));
    } else if (entry.endsWith(".sql")) {
      results.push(fullPath);
    }
  }
  return results;
}

function checkFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations = [];

  const hasEvidenceInsert = /INSERT\s+INTO\s+compliance_evidence/i.test(content);
  const hasExceptionComment = /AGENTS\.md\s+exception:/i.test(content);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Check INSERT INTO compliance_checklists with verified/approved
    if (/INSERT\s+INTO\s+compliance_checklists/i.test(line)) {
      for (const field of COMPLIANCE_FIELDS) {
        for (const val of FORBIDDEN_VALUES) {
          // Look for the value in the VALUES clause (next few lines)
          const context = lines.slice(i, Math.min(i + 5, lines.length)).join(" ");
          if (context.includes(`'${val}'`)) {
            violations.push({
              file: filePath,
              line: lineNum,
              type: "INSERT compliance_checklists with forbidden value",
              detail: `Found '${val}' in INSERT context for compliance fields`,
            });
          }
        }
      }
    }

    // Check UPDATE compliance_checklists SET ... = 'verified' or 'approved'
    if (/UPDATE\s+compliance_checklists\s+SET/i.test(line)) {
      const context = lines.slice(i, Math.min(i + 8, lines.length)).join(" ");
      for (const val of FORBIDDEN_VALUES) {
        if (context.includes(`'${val}'`)) {
          violations.push({
            file: filePath,
            line: lineNum,
            type: "UPDATE compliance_checklists with forbidden value",
            detail: `Found '${val}' in UPDATE context for compliance fields`,
          });
        }
      }
    }

    // Check UPDATE brands SET publication_status = 'published'
    // Only flag if in same file as compliance verified/approved
    if (/UPDATE\s+brands\s+SET/i.test(line)) {
      const context = lines.slice(i, Math.min(i + 8, lines.length)).join(" ");
      if (/publication_status\s*=\s*'published'/i.test(context)) {
        violations.push({
          file: filePath,
          line: lineNum,
          type: "UPDATE brands publication_status to published",
          detail: "Direct SQL set publication_status=published bypasses publish gate",
        });
      }
    }
  }

  // Filter: allow if has evidence INSERT + exception comment
  if (violations.length > 0 && hasEvidenceInsert && hasExceptionComment) {
    return [];
  }

  return violations;
}

function main() {
  console.log("CI Guard: Scanning SQL files for compliance bypass...\n");

  let sqlFiles;
  try {
    sqlFiles = findSqlFiles(MIGRATIONS_DIR);
  } catch (err) {
    console.error(`Error reading migrations dir: ${err.message}`);
    process.exit(1);
  }

  if (sqlFiles.length === 0) {
    console.log("No SQL files found. Pass.");
    process.exit(0);
  }

  console.log(`Found ${sqlFiles.length} SQL files:\n`);
  for (const f of sqlFiles) {
    console.log(`  - ${f.replace(process.cwd() + "/", "")}`);
  }
  console.log("");

  let allViolations = [];
  for (const file of sqlFiles) {
    const violations = checkFile(file);
    allViolations.push(...violations);
  }

  if (allViolations.length === 0) {
    console.log("PASS: No compliance bypass violations found.\n");
    console.log("All SQL files comply with AGENTS.md rule:");
    console.log("  - No INSERT/UPDATE compliance_checklists with verified/approved");
    console.log("  - No UPDATE brands SET publication_status=published");
    console.log("  - Exceptions allowed only with evidence INSERT + AGENTS.md exception comment");
    process.exit(0);
  }

  console.log(`FAIL: ${allViolations.length} violation(s) found:\n`);
  for (const v of allViolations) {
    console.log(`  FILE: ${v.file.replace(process.cwd() + "/", "")}:${v.line}`);
    console.log(`  TYPE: ${v.type}`);
    console.log(`  DETAIL: ${v.detail}`);
    console.log("");
  }
  console.log("To fix:");
  console.log("  1. Change compliance values to 'unknown' or 'pending'");
  console.log("  2. Change publication_status to 'private_preview'");
  console.log("  3. Use POST /api/omdalat/brands/:id/compliance route to set verified");
  console.log("  4. If exception needed, add 'AGENTS.md exception:' comment + evidence INSERT");
  process.exit(1);
}

main();
