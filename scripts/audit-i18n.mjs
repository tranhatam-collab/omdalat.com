import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { globSync } from "glob";

const workDir = process.cwd();
const files = globSync("apps/web/app/**/*.{tsx,ts}", { cwd: workDir });

let totalMatches = 0;
const results = [];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("vi:") || lines[i].includes("vi :")) {
      totalMatches++;
      results.push(`${file}:${i + 1}: ${lines[i].trim()}`);
    }
  }
}

writeFileSync("i18n-audit-report.txt", `Found ${totalMatches} instances of 'vi:' in the app directory.\n\n${results.join("\n")}`);
console.log(`Audit complete. Found ${totalMatches} instances.`);
