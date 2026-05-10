import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const readJson = (rel) =>
  JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

const writeFile = (rel, content) => {
  const target = path.join(root, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
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
  slopesWide: "images/ready/og/dalat-city-slopes-january-2012.jpg",
};

const SECTION_PATH = {
  vi: {
    people: "con-nguoi",
    places: "noi-chon",
    rhythms: "nhip-song",
    work: "lam-viec",
    stories: "cau-chuyen",
    images: "hinh-anh",
  },
  en: {
    people: "people",
    places: "places",
    rhythms: "rhythms",
    work: "work",
    stories: "stories",
    images: "images",
  },
};

const SUPPORT_PATH = {
  vi: {
    contact: "lien-he",
    topics: "chu-de",
    search: "tim-kiem",
    faq: "faq",
  },
  en: {
    contact: "contact",
    topics: "topics",
    search: "search",
    faq: "faq",
  },
};

function relFor(locale, pathPart) {
  if (locale === "vi") return `${pathPart}/index.html`;
  return `en/${pathPart}/index.html`;
}

function canonicalFor(rel) {
  return `https://ap.omdalat.com/${rel.replace(/index\.html$/, "")}`;
}

function renderHtml({
  locale,
  title,
  description,
  canonicalRel,
  altRel,
  rootPath,
  dataPage,
  dataSection,
  dataSupport,
  ogImage,
  noindex = false,
}) {
  const lang = locale === "vi" ? "vi" : "en";
  const canonical = canonicalFor(canonicalRel);
  const altCanonical = canonicalFor(altRel);
  const altHreflang = locale === "vi" ? "en" : "vi-VN";
  const robots = noindex ? "noindex, follow" : "index, follow";
  const sectionAttr = dataSection ? ` data-section="${dataSection}"` : "";
  const supportAttr = dataSupport ? ` data-support="${dataSupport}"` : "";
  const escapedTitle = title.replaceAll('"', "&quot;");
  const escapedDesc = description.replaceAll('"', "&quot;");

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapedDesc}" />
    <title>${escapedTitle}</title>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:image" content="https://ap.omdalat.com/${ogImage}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDesc}" />
    <meta name="twitter:image" content="https://ap.omdalat.com/${ogImage}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="${altHreflang}" href="${altCanonical}" />
    <link rel="alternate" hreflang="x-default" href="https://ap.omdalat.com/" />
    <link rel="stylesheet" href="${rootPath}assets/styles.css" />
  </head>
  <body data-locale="${locale}" data-page="${dataPage}"${sectionAttr}${supportAttr} data-root="${rootPath}" data-alt-path="${altRel}">
    <div id="app"></div>
    <script src="${rootPath}assets/content.js"></script>
    <script src="${rootPath}assets/app.js"></script>
  </body>
</html>
`;
}

function staticHome(locale) {
  const source = locale === "vi" ? vi : en;
  const dict = source.locales[locale];
  const rel = locale === "vi" ? "index.html" : "en/index.html";
  const altRel = locale === "vi" ? "en/index.html" : "index.html";
  const rootPath = locale === "vi" ? "" : "../";
  writeFile(
    rel,
    renderHtml({
      locale,
      title: dict.homeTitle,
      description: dict.homeDescription,
      canonicalRel: rel,
      altRel,
      rootPath,
      dataPage: "home",
      ogImage: IMAGE_OG.hero,
    })
  );
}

function staticHubs(locale) {
  const source = locale === "vi" ? vi : en;
  Object.keys(source.sections).forEach((sectionKey) => {
    const sectionObj = source.sections[sectionKey][locale];
    const sectionPath = SECTION_PATH[locale][sectionKey];
    const rel = relFor(locale, sectionPath);
    const altSectionPath =
      locale === "vi" ? SECTION_PATH.en[sectionKey] : SECTION_PATH.vi[sectionKey];
    const altRel = relFor(locale === "vi" ? "en" : "vi", altSectionPath);
    const rootPath = locale === "vi" ? "../" : "../../";
    const siteTitle = source.locales[locale].siteTitle;
    writeFile(
      rel,
      renderHtml({
        locale,
        title: `${sectionObj.title} | ${siteTitle}`,
        description: sectionObj.thesis,
        canonicalRel: rel,
        altRel,
        rootPath,
        dataPage: "hub",
        dataSection: sectionKey,
        ogImage: IMAGE_OG[source.sections[sectionKey].image] || IMAGE_OG.hero,
      })
    );
  });
}

function staticAbout(locale) {
  const source = locale === "vi" ? vi : en;
  const siteTitle = source.locales[locale].siteTitle;
  const aboutRel = locale === "vi" ? "ve-ap-da-lat/index.html" : "en/about/index.html";
  const aboutAltRel = locale === "vi" ? "en/about/index.html" : "ve-ap-da-lat/index.html";
  const omRel = locale === "vi" ? "om-ap-da-lat/index.html" : "en/om-ap-dalat/index.html";
  const omAltRel = locale === "vi" ? "en/om-ap-dalat/index.html" : "om-ap-da-lat/index.html";
  const rootPath = locale === "vi" ? "../" : "../../";
  const aboutData = source.staticPages.about;
  const omData = source.staticPages.om;

  writeFile(
    aboutRel,
    renderHtml({
      locale,
      title:
        locale === "vi"
          ? aboutData.metaTitle
          : `${aboutData.metaTitle} | ${siteTitle}`,
      description: aboutData.metaDescription,
      canonicalRel: aboutRel,
      altRel: aboutAltRel,
      rootPath,
      dataPage: "about",
      ogImage: IMAGE_OG.hero,
    })
  );

  writeFile(
    omRel,
    renderHtml({
      locale,
      title:
        locale === "vi"
          ? omData.metaTitle
          : `${omData.metaTitle} | ${siteTitle}`,
      description: omData.metaDescription,
      canonicalRel: omRel,
      altRel: omAltRel,
      rootPath,
      dataPage: "om",
      ogImage: IMAGE_OG.rooftops,
    })
  );
}

function staticSupport(locale) {
  const source = locale === "vi" ? vi : en;
  const siteTitle = source.locales[locale].siteTitle;
  const rootPath = locale === "vi" ? "../" : "../../";

  Object.keys(source.supportPages).forEach((supportKey) => {
    const pathPart = SUPPORT_PATH[locale][supportKey];
    const altPathPart =
      locale === "vi"
        ? SUPPORT_PATH.en[supportKey]
        : SUPPORT_PATH.vi[supportKey];
    const rel = relFor(locale, pathPart);
    const altRel = relFor(locale === "vi" ? "en" : "vi", altPathPart);
    const supportObj = source.supportPages[supportKey][locale];
    const title =
      locale === "vi"
        ? `${supportObj.title} | ${siteTitle}`
        : `${supportObj.title} | ${siteTitle}`;

    writeFile(
      rel,
      renderHtml({
        locale,
        title,
        description: supportObj.description,
        canonicalRel: rel,
        altRel,
        rootPath,
        dataPage: "support",
        dataSupport: supportKey,
        ogImage: IMAGE_OG.panorama,
        noindex: supportKey === "search",
      })
    );
  });
}

staticHome("vi");
staticHome("en");
staticHubs("vi");
staticHubs("en");
staticAbout("vi");
staticAbout("en");
staticSupport("vi");
staticSupport("en");

console.log("Synced static route heads with canonical/OG metadata.");
