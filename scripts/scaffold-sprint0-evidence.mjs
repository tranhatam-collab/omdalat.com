import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const reportsRoot = path.resolve(cwd, "reports", "sprint0");

const routes = [
  { slug: "song-o-da-lat-la-gi", locale: "vi", route: "/vi/articles/song-o-da-lat-la-gi", cta: "/vi/stay" },
  { slug: "song-o-da-lat-la-gi", locale: "en", route: "/en/articles/song-o-da-lat-la-gi", cta: "/en/stay" },
  { slug: "lam-viec-o-da-lat-co-thuc-te-khong", locale: "vi", route: "/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong", cta: "/vi/work" },
  { slug: "lam-viec-o-da-lat-co-thuc-te-khong", locale: "en", route: "/en/articles/lam-viec-o-da-lat-co-thuc-te-khong", cta: "/en/work" },
  { slug: "tu-mot-ky-nang-den-thu-nhap-o-da-lat", locale: "vi", route: "/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat", cta: "/vi/join" },
  { slug: "tu-mot-ky-nang-den-thu-nhap-o-da-lat", locale: "en", route: "/en/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat", cta: "/en/join" }
];

function buildStagingTemplate({ route, locale, cta }) {
  return [
    "# Sprint 0 Staging Proof",
    "",
    `- Route: \`${route}\``,
    `- Locale: \`${locale}\``,
    `- Expected CTA: \`${cta}\``,
    "- Reviewer:",
    "- Date:",
    "- Base URL:",
    "",
    "## Canonical",
    "",
    "- Actual:",
    "- PASS|FAIL:",
    "",
    "## Hreflang",
    "",
    "- vi-VN:",
    "- en-US:",
    "- x-default:",
    "- PASS|FAIL:",
    "",
    "## Metadata",
    "",
    "- Title:",
    "- Meta description:",
    "- Featured image:",
    "- PASS|FAIL:",
    "",
    "## Notes",
    "",
    "- "
  ].join("\n");
}

function buildVisualReadme() {
  return [
    "# Sprint 0 Visual Evidence",
    "",
    "Expected naming:",
    "",
    "- `<locale>-desktop.png`",
    "- `<locale>-mobile.png`",
    "",
    "Expected locales per article folder:",
    "",
    "- `vi`",
    "- `en`",
    "",
    "Add a short note in the matching staging markdown file if layout or crop needs review."
  ].join("\n");
}

function buildRootReadme() {
  return [
    "# Sprint 0 Evidence Root",
    "",
    "This folder is the shared drop zone for Sprint 0 article acceptance.",
    "",
    "## Visual evidence",
    "",
    "- `visual/<slug>/vi-desktop.png`",
    "- `visual/<slug>/vi-mobile.png`",
    "- `visual/<slug>/en-desktop.png`",
    "- `visual/<slug>/en-mobile.png`",
    "",
    "Each article folder also contains a `README.md` reminder for naming.",
    "",
    "## Staging evidence",
    "",
    "- `staging/<slug>/vi.md`",
    "- `staging/<slug>/en.md`",
    "",
    "Use the markdown templates to record canonical, hreflang, metadata, and notes.",
    "",
    "## Source docs",
    "",
    "- `docs/SPRINT0_VISUAL_AND_STAGING_EVIDENCE_MATRIX_2026-05-07.md`",
    "- `docs/SPRINT0_ACCEPTANCE_PACKET_CURRENT_STATE_2026-05-07.md`",
    "- `docs/SPRINT0_ARTICLE_METADATA_ROUTE_PROOF_2026-05-07.md`"
  ].join("\n");
}

async function main() {
  await mkdir(path.join(reportsRoot, "visual"), { recursive: true });
  await mkdir(path.join(reportsRoot, "staging"), { recursive: true });
  await writeFile(path.join(reportsRoot, "README.md"), buildRootReadme(), "utf8");

  const slugs = [...new Set(routes.map((entry) => entry.slug))];

  for (const slug of slugs) {
    await mkdir(path.join(reportsRoot, "visual", slug), { recursive: true });
    await mkdir(path.join(reportsRoot, "staging", slug), { recursive: true });
    await writeFile(path.join(reportsRoot, "visual", slug, "README.md"), buildVisualReadme(), "utf8");
  }

  for (const route of routes) {
    const filePath = path.join(reportsRoot, "staging", route.slug, `${route.locale}.md`);
    await writeFile(filePath, buildStagingTemplate(route), "utf8");
  }

  console.log("Sprint 0 evidence scaffold ready.");
  console.log(`Root: ${reportsRoot}`);
  console.log(`Visual folders: ${slugs.length}`);
  console.log(`Staging templates: ${routes.length}`);
}

main().catch((error) => {
  console.error("FAIL - sprint0 evidence scaffold");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
