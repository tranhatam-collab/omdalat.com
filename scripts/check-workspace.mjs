import { access } from "node:fs/promises";
import path from "node:path";

const mode = process.argv[2] || "check";
const rootDir = process.cwd();

const expectations = {
  lint: [
    ".editorconfig",
    "apps/web/README.md",
    "apps/web/styles/globals.css",
    "pnpm-workspace.yaml",
    "turbo.json"
  ],
  typecheck: [
    "package.json",
    "apps/app/app.js",
    "apps/web/app.js",
    "apps/app/app/dashboard/page.tsx",
    "apps/app/lib/runtime-data.ts",
    "apps/web/app/layout.tsx",
    "apps/web/app/page.tsx",
    "apps/web/lib/routes.ts",
    "apps/web/package.json",
    "apps/web/tsconfig.json",
    "packages/core/index.ts",
    "packages/types/index.ts",
    "packages/ui/index.ts",
    "services/api/index.ts",
    "services/auth/index.ts",
    "services/trust/index.ts",
    "services/matching/index.ts",
    "services/notifications/index.ts"
  ],
  format: [
    ".editorconfig",
    "README.md",
    "apps/web/README.md"
  ]
};

for (const relativePath of expectations[mode] || []) {
  await access(path.join(rootDir, relativePath));
}

console.log(`Workspace ${mode} preflight passed.`);
