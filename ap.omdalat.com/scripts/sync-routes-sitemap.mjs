import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const today = "2026-04-21";

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

const ensureDir = (relDir) => {
  fs.mkdirSync(path.join(root, relDir), { recursive: true });
};

const writeFile = (rel, content) => {
  const full = path.join(root, rel);
  ensureDir(path.dirname(rel));
  fs.writeFileSync(full, content, "utf8");
};

const vi = readJson("content/vi.json");
const en = readJson("content/en.json");

const IMAGE_OG = {
  hero: "images/ready/og/dalat-city-panorama-2020.jpg",
  farms: "images/ready/og/dalat-farmland-highland-patterns-2010.jpg",
  panorama: "images/ready/og/dalat-city-panorama-2014.jpg",
  view: "images/ready/og/dalat-view-ngoc-lan-2011.jpg",
  valley: "images/ready/og/dalat-valley-houses-january-2012.jpg",
  slope: "images/ready/og/dalat-slope-and-hillside-homes-2012.jpg",
  rooftops: "images/ready/og/dalat-rooftops-and-valley-2012.jpg",
  slopesWide: "images/ready/og/dalat-city-slopes-january-2012.jpg"
};

const VI_MAP = {
  stories: "cau-chuyen",
  work: "lam-viec",
  rhythms: "nhip-song",
  people: "con-nguoi",
  places: "noi-chon",
  images: "hinh-anh"
};

const EN_MAP = {
  stories: "stories",
  work: "work",
  rhythms: "rhythms",
  people: "people",
  places: "places",
  images: "images"
};

function renderRouteHtml({
  locale,
  pageType,
  slug,
  title,
  description,
  canonicalPath,
  altPath,
  ogImage
}) {
  const lang = locale === "vi" ? "vi" : "en";
  const isEn = locale === "en";
  const rootPath = isEn ? "../../../" : "../../";
  const canonicalUrl = `https://ap.omdalat.com/${canonicalPath}`;
  const altCanonical = `https://ap.omdalat.com/${altPath.replace(/index\.html$/, "")}`;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title}${isEn ? " | Ap Dalat" : ""}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="https://ap.omdalat.com/${ogImage}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://ap.omdalat.com/${ogImage}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="${isEn ? "vi-VN" : "en"}" href="${altCanonical}" />
    <link rel="alternate" hreflang="x-default" href="https://ap.omdalat.com/" />
    <link rel="stylesheet" href="${rootPath}assets/styles.css" />
  </head>
  <body data-locale="${locale}" data-page="${pageType}" data-slug="${slug}" data-root="${rootPath}" data-alt-path="${altPath}">
    <div id="app"></div>
    <script src="${rootPath}assets/content.js"></script>
    <script src="${rootPath}assets/app.js"></script>
  </body>
</html>
`;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildDynamicStoryRoutes() {
  vi.stories.forEach((story) => {
    const enStory = en.stories.find((item) => item.slug === story.slug);
    const viBase = VI_MAP[story.section];
    const enBase = EN_MAP[story.section];
    const viRel = `${viBase}/${story.slug}/index.html`;
    const enRel = `en/${enBase}/${story.slug}/index.html`;
    const ogImage = IMAGE_OG[story.image] || IMAGE_OG.hero;

    writeFile(
      viRel,
      renderRouteHtml({
        locale: "vi",
        pageType: "story",
        slug: story.slug,
        title: escapeAttribute(story.vi.title),
        description: escapeAttribute(story.vi.excerpt),
        canonicalPath: viRel.replace(/index\.html$/, ""),
        altPath: enRel,
        ogImage
      })
    );

    writeFile(
      enRel,
      renderRouteHtml({
        locale: "en",
        pageType: "story",
        slug: story.slug,
        title: escapeAttribute(enStory.en.title),
        description: escapeAttribute(enStory.en.excerpt),
        canonicalPath: enRel.replace(/index\.html$/, ""),
        altPath: viRel,
        ogImage
      })
    );
  });
}

function buildDynamicEntityRoutes() {
  vi.people.forEach((person) => {
    const enPerson = en.people.find((item) => item.slug === person.slug);
    const viRel = `con-nguoi/${person.slug}/index.html`;
    const enRel = `en/people/${person.slug}/index.html`;
    const ogImage = IMAGE_OG[person.image] || IMAGE_OG.hero;

    writeFile(
      viRel,
      renderRouteHtml({
        locale: "vi",
        pageType: "person",
        slug: person.slug,
        title: escapeAttribute(person.vi.name),
        description: escapeAttribute(person.vi.excerpt),
        canonicalPath: viRel.replace(/index\.html$/, ""),
        altPath: enRel,
        ogImage
      })
    );

    writeFile(
      enRel,
      renderRouteHtml({
        locale: "en",
        pageType: "person",
        slug: person.slug,
        title: escapeAttribute(enPerson.en.name),
        description: escapeAttribute(enPerson.en.excerpt),
        canonicalPath: enRel.replace(/index\.html$/, ""),
        altPath: viRel,
        ogImage
      })
    );
  });

  vi.places.forEach((place) => {
    const enPlace = en.places.find((item) => item.slug === place.slug);
    const viRel = `noi-chon/${place.slug}/index.html`;
    const enRel = `en/places/${place.slug}/index.html`;
    const ogImage = IMAGE_OG[place.image] || IMAGE_OG.hero;

    writeFile(
      viRel,
      renderRouteHtml({
        locale: "vi",
        pageType: "place",
        slug: place.slug,
        title: escapeAttribute(place.vi.title),
        description: escapeAttribute(place.vi.excerpt),
        canonicalPath: viRel.replace(/index\.html$/, ""),
        altPath: enRel,
        ogImage
      })
    );

    writeFile(
      enRel,
      renderRouteHtml({
        locale: "en",
        pageType: "place",
        slug: place.slug,
        title: escapeAttribute(enPlace.en.title),
        description: escapeAttribute(enPlace.en.excerpt),
        canonicalPath: enRel.replace(/index\.html$/, ""),
        altPath: viRel,
        ogImage
      })
    );
  });

  vi.imageEssays.forEach((essay) => {
    const enEssay = en.imageEssays.find((item) => item.slug === essay.slug);
    const viRel = `hinh-anh/${essay.slug}/index.html`;
    const enRel = `en/images/${essay.slug}/index.html`;
    const ogImage = IMAGE_OG[essay.image] || IMAGE_OG.hero;

    writeFile(
      viRel,
      renderRouteHtml({
        locale: "vi",
        pageType: "essay",
        slug: essay.slug,
        title: escapeAttribute(essay.vi.title),
        description: escapeAttribute(essay.vi.intro),
        canonicalPath: viRel.replace(/index\.html$/, ""),
        altPath: enRel,
        ogImage
      })
    );

    writeFile(
      enRel,
      renderRouteHtml({
        locale: "en",
        pageType: "essay",
        slug: essay.slug,
        title: escapeAttribute(enEssay.en.title),
        description: escapeAttribute(enEssay.en.intro),
        canonicalPath: enRel.replace(/index\.html$/, ""),
        altPath: viRel,
        ogImage
      })
    );
  });
}

function dedupe(values) {
  return [...new Set(values)];
}

function toPublicUrl(rel) {
  return `https://ap.omdalat.com/${rel}`;
}

function renderUrlSet(paths) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((rel) => `  <url><loc>${toPublicUrl(rel)}</loc><lastmod>${today}</lastmod></url>`),
    "</urlset>",
    ""
  ].join("\n");
}

function writeUrlSet(rel, paths) {
  writeFile(rel, renderUrlSet(paths));
}

function writeSitemapIndex(entries) {
  const content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.flatMap((entry) => [
      "  <sitemap>",
      `    <loc>${toPublicUrl(entry)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      "  </sitemap>"
    ]),
    "</sitemapindex>",
    ""
  ].join("\n");

  writeFile("sitemap.xml", content);
}

function buildSitemaps() {
  const staticPaths = [
    "",
    "con-nguoi/",
    "noi-chon/",
    "nhip-song/",
    "lam-viec/",
    "cau-chuyen/",
    "hinh-anh/",
    "ve-ap-da-lat/",
    "om-ap-da-lat/",
    "faq/",
    "lien-he/",
    "chu-de/",
    "en/",
    "en/people/",
    "en/places/",
    "en/rhythms/",
    "en/work/",
    "en/stories/",
    "en/images/",
    "en/about/",
    "en/om-ap-dalat/",
    "en/faq/",
    "en/contact/",
    "en/topics/"
  ];

  const storyAndEntityPaths = [];
  vi.stories.forEach((story) => {
    storyAndEntityPaths.push(`${VI_MAP[story.section]}/${story.slug}/`);
    storyAndEntityPaths.push(`en/${EN_MAP[story.section]}/${story.slug}/`);
  });
  vi.people.forEach((person) => {
    storyAndEntityPaths.push(`con-nguoi/${person.slug}/`);
    storyAndEntityPaths.push(`en/people/${person.slug}/`);
  });
  vi.places.forEach((place) => {
    storyAndEntityPaths.push(`noi-chon/${place.slug}/`);
    storyAndEntityPaths.push(`en/places/${place.slug}/`);
  });

  const imagePaths = ["hinh-anh/", "en/images/"];
  vi.imageEssays.forEach((essay) => {
    imagePaths.push(`hinh-anh/${essay.slug}/`);
    imagePaths.push(`en/images/${essay.slug}/`);
  });

  const viPaths = dedupe(
    [...staticPaths, ...storyAndEntityPaths, ...imagePaths].filter((rel) => !rel.startsWith("en/"))
  );
  const enPaths = dedupe(
    [...staticPaths, ...storyAndEntityPaths, ...imagePaths].filter((rel) => rel.startsWith("en/"))
  );

  writeUrlSet("sitemap-pages.xml", dedupe(staticPaths));
  writeUrlSet("sitemap-stories.xml", dedupe(storyAndEntityPaths));
  writeUrlSet("sitemap-images.xml", dedupe(imagePaths));
  writeUrlSet("sitemap-vi.xml", viPaths);
  writeUrlSet("sitemap-en.xml", enPaths);

  writeSitemapIndex([
    "sitemap-pages.xml",
    "sitemap-stories.xml",
    "sitemap-images.xml",
    "sitemap-vi.xml",
    "sitemap-en.xml"
  ]);
}

buildDynamicStoryRoutes();
buildDynamicEntityRoutes();
buildSitemaps();

console.log("Synced dynamic route files and phase-2 sitemap set.");
