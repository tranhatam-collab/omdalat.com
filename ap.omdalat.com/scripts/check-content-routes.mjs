import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const readText = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const vi = readJson("content/vi.json");
const en = readJson("content/en.json");
const robots = readText("robots.txt");
const sitemapIndex = readText("sitemap.xml");

const SITEMAP_FILES = [
  "sitemap-pages.xml",
  "sitemap-stories.xml",
  "sitemap-images.xml",
  "sitemap-vi.xml",
  "sitemap-en.xml"
];

const sitemaps = Object.fromEntries(
  SITEMAP_FILES.map((rel) => [rel, readText(rel)])
);

const VI_SECTION_PATHS = {
  stories: "cau-chuyen",
  work: "lam-viec",
  rhythms: "nhip-song"
};

function toLocFromRouteFile(rel) {
  return `<loc>https://ap.omdalat.com/${rel.replace(/index\.html$/, "")}</loc>`;
}

function collectExpectedRoutes() {
  const expected = [];

  vi.stories.forEach((story) => {
    const base = VI_SECTION_PATHS[story.section];
    expected.push(`${base}/${story.slug}/index.html`);
    expected.push(`en/${story.section}/${story.slug}/index.html`);
  });

  vi.people.forEach((person) => {
    expected.push(`con-nguoi/${person.slug}/index.html`);
    expected.push(`en/people/${person.slug}/index.html`);
  });

  vi.places.forEach((place) => {
    expected.push(`noi-chon/${place.slug}/index.html`);
    expected.push(`en/places/${place.slug}/index.html`);
  });

  vi.imageEssays.forEach((essay) => {
    expected.push(`hinh-anh/${essay.slug}/index.html`);
    expected.push(`en/images/${essay.slug}/index.html`);
  });

  return expected;
}

function checkFiles(expected) {
  return expected.filter((rel) => !fs.existsSync(path.join(root, rel)));
}

function checkSitemapIndex() {
  return SITEMAP_FILES.filter((rel) => {
    const loc = `<loc>https://ap.omdalat.com/${rel}</loc>`;
    return !sitemapIndex.includes(loc);
  });
}

function checkSitemapCoverage(expected) {
  return expected.filter((rel) => {
    const loc = toLocFromRouteFile(rel);
    return !SITEMAP_FILES.some((file) => sitemaps[file].includes(loc));
  });
}

function checkLocaleSitemapCoverage(expected) {
  return expected.filter((rel) => {
    const loc = toLocFromRouteFile(rel);
    if (rel.startsWith("en/")) {
      return !sitemaps["sitemap-en.xml"].includes(loc);
    }
    return !sitemaps["sitemap-vi.xml"].includes(loc);
  });
}

function checkRobots() {
  const required = [
    "Disallow: /assets/",
    "Disallow: /content/",
    "Disallow: /docs/",
    "Disallow: /images/excluded/",
    "Disallow: /tim-kiem/",
    "Disallow: /en/search/",
    "Sitemap: https://ap.omdalat.com/sitemap.xml",
    "Sitemap: https://ap.omdalat.com/sitemap-pages.xml",
    "Sitemap: https://ap.omdalat.com/sitemap-stories.xml",
    "Sitemap: https://ap.omdalat.com/sitemap-images.xml",
    "Sitemap: https://ap.omdalat.com/sitemap-vi.xml",
    "Sitemap: https://ap.omdalat.com/sitemap-en.xml"
  ];
  return required.filter((line) => !robots.includes(line));
}

function checkLocaleCounts() {
  const mismatches = [];
  if (vi.stories.length !== en.stories.length) mismatches.push("stories");
  if (vi.people.length !== en.people.length) mismatches.push("people");
  if (vi.places.length !== en.places.length) mismatches.push("places");
  if (vi.imageEssays.length !== en.imageEssays.length) mismatches.push("imageEssays");
  return mismatches;
}

const expectedRoutes = collectExpectedRoutes();
const missingFiles = checkFiles(expectedRoutes);
const missingSitemapIndexRefs = checkSitemapIndex();
const missingSitemapLocs = checkSitemapCoverage(expectedRoutes);
const missingLocaleSitemapLocs = checkLocaleSitemapCoverage(expectedRoutes);
const localeMismatches = checkLocaleCounts();
const robotsGaps = checkRobots();

if (
  missingFiles.length === 0 &&
  missingSitemapIndexRefs.length === 0 &&
  missingSitemapLocs.length === 0 &&
  missingLocaleSitemapLocs.length === 0 &&
  localeMismatches.length === 0 &&
  robotsGaps.length === 0
) {
  console.log("PASS: content routes, phase-2 sitemap set, and robots policy are consistent.");
  console.log(
    `Counts => stories: ${vi.stories.length}, people: ${vi.people.length}, places: ${vi.places.length}, imageEssays: ${vi.imageEssays.length}`
  );
  process.exit(0);
}

console.error("FAIL: content route consistency check failed.");
if (localeMismatches.length) {
  console.error(`Locale count mismatches: ${localeMismatches.join(", ")}`);
}
if (missingFiles.length) {
  console.error("Missing route files:");
  missingFiles.forEach((rel) => console.error(`- ${rel}`));
}
if (missingSitemapIndexRefs.length) {
  console.error("Missing sitemap index refs:");
  missingSitemapIndexRefs.forEach((rel) => console.error(`- https://ap.omdalat.com/${rel}`));
}
if (missingSitemapLocs.length) {
  console.error("Missing sitemap locs across phase-2 set:");
  missingSitemapLocs.forEach((rel) => console.error(`- https://ap.omdalat.com/${rel.replace(/index\.html$/, "")}`));
}
if (missingLocaleSitemapLocs.length) {
  console.error("Missing locale-specific sitemap locs:");
  missingLocaleSitemapLocs.forEach((rel) =>
    console.error(`- https://ap.omdalat.com/${rel.replace(/index\.html$/, "")}`)
  );
}
if (robotsGaps.length) {
  console.error("Missing robots rules:");
  robotsGaps.forEach((line) => console.error(`- ${line}`));
}
process.exit(1);
