import { access } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const requiredPaths = [
  "apps/app/index.html",
  "apps/app/app/dashboard/page.tsx",
  "apps/app/app/places/page.tsx",
  "apps/app/app/hosts/page.tsx",
  "apps/app/app/experts/page.tsx",
  "apps/app/app/communities/page.tsx",
  "apps/app/app/events/page.tsx",
  "apps/app/app/proofs/page.tsx",
  "apps/app/app/profile/page.tsx",
  "apps/app/app/settings/page.tsx",
  "apps/web/app/layout.tsx",
  "apps/web/app/page.tsx",
  "apps/web/app/about/page.tsx",
  "apps/web/app/contact/page.tsx",
  "apps/web/app/events/page.tsx",
  "apps/web/app/events/[slug]/page.tsx",
  "apps/web/app/experts/page.tsx",
  "apps/web/app/experts/[slug]/page.tsx",
  "apps/web/app/faq/page.tsx",
  "apps/web/app/hosts/page.tsx",
  "apps/web/app/hosts/[slug]/page.tsx",
  "apps/web/app/join/page.tsx",
  "apps/web/app/places/page.tsx",
  "apps/web/app/places/[slug]/page.tsx",
  "apps/web/app/privacy/page.tsx",
  "apps/web/app/proofs/page.tsx",
  "apps/web/app/proofs/[slug]/page.tsx",
  "apps/web/app/terms/page.tsx",
  "apps/web/app/trust/page.tsx",
  "apps/web/app/vision/page.tsx",
  "apps/web/app/communities/[slug]/page.tsx",
  "apps/web/index.html",
  "apps/web/next.config.js",
  "apps/web/package.json",
  "apps/web/tsconfig.json",
  "data/communities.json",
  "data/experts.json",
  "docs/REPO_BUILD_ORDER_OMDALAT.md",
  "docs/FILE_TREE_OMDALAT_V1.md",
  "packages/core/index.ts",
  "packages/types/index.ts",
  "packages/ui/index.ts",
  "services/api/index.ts",
  "services/trust/index.ts",
  "services/matching/index.ts",
  "package.json"
];

for (const relativePath of requiredPaths) {
  await access(path.join(rootDir, relativePath));
}

console.log("Build preflight passed.");
