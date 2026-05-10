import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredMeta = [
  'meta property="og:title"',
  'meta property="og:description"',
  'meta property="og:image"',
  'meta property="og:url"',
  'meta name="twitter:card"',
  'link rel="canonical"',
];

const VI_MAP = {
  stories: "cau-chuyen",
  work: "lam-viec",
  rhythms: "nhip-song",
  people: "con-nguoi",
  places: "noi-chon",
  images: "hinh-anh",
};

const EN_MAP = {
  stories: "stories",
  work: "work",
  rhythms: "rhythms",
  people: "people",
  places: "places",
  images: "images",
};

const VI_SUPPORT = {
  contact: "lien-he",
  topics: "chu-de",
  search: "tim-kiem",
  faq: "faq",
};

const EN_SUPPORT = {
  contact: "contact",
  topics: "topics",
  search: "search",
  faq: "faq",
};

const readJson = (rel) =>
  JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

const vi = readJson("content/vi.json");
const en = readJson("content/en.json");

const failures = [];
const checked = [];

function canonicalOf(rel) {
  return `https://ap.omdalat.com/${rel.replace(/index\.html$/, "")}`;
}

function checkFile(rel, expectedCanonical, extra = {}) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    failures.push({ rel, issue: "Route file is missing" });
    return;
  }
  const content = fs.readFileSync(full, "utf8");
  const missing = requiredMeta.filter((token) => !content.includes(token));
  if (missing.length > 0) {
    failures.push({ rel, issue: `Missing meta tags: ${missing.join(", ")}` });
    return;
  }
  if (!content.includes(`href="${expectedCanonical}"`)) {
    failures.push({ rel, issue: `Canonical mismatch: expected ${expectedCanonical}` });
    return;
  }
  if (!content.includes(`content="${expectedCanonical}"`)) {
    failures.push({ rel, issue: `OG url mismatch: expected ${expectedCanonical}` });
    return;
  }
  if (extra.altCanonical && !content.includes(`href="${extra.altCanonical}"`)) {
    failures.push({ rel, issue: `Alternate hreflang mismatch: expected ${extra.altCanonical}` });
    return;
  }
  if (extra.noindex && !content.includes('meta name="robots" content="noindex, follow"')) {
    failures.push({ rel, issue: "Robots mismatch: expected noindex, follow" });
    return;
  }
  checked.push(rel);
}

function checkStaticMatrix() {
  const staticPairs = [
    { viRel: "index.html", enRel: "en/index.html" },
    { viRel: "ve-ap-da-lat/index.html", enRel: "en/about/index.html" },
    { viRel: "om-ap-da-lat/index.html", enRel: "en/om-ap-dalat/index.html" },
    ...Object.keys(vi.sections).map((section) => ({
      viRel: `${VI_MAP[section]}/index.html`,
      enRel: `en/${EN_MAP[section]}/index.html`,
    })),
    ...Object.keys(vi.supportPages).map((key) => ({
      viRel: `${VI_SUPPORT[key]}/index.html`,
      enRel: `en/${EN_SUPPORT[key]}/index.html`,
      noindex: key === "search",
    })),
  ];

  staticPairs.forEach((pair) => {
    checkFile(pair.viRel, canonicalOf(pair.viRel), {
      altCanonical: canonicalOf(pair.enRel),
      noindex: pair.noindex === true,
    });
    checkFile(pair.enRel, canonicalOf(pair.enRel), {
      altCanonical: canonicalOf(pair.viRel),
      noindex: pair.noindex === true,
    });
  });
}

function checkDynamicMatrix() {
  vi.stories.forEach((story) => {
    const viRel = `${VI_MAP[story.section]}/${story.slug}/index.html`;
    const enRel = `en/${EN_MAP[story.section]}/${story.slug}/index.html`;
    checkFile(viRel, canonicalOf(viRel), { altCanonical: canonicalOf(enRel) });
    checkFile(enRel, canonicalOf(enRel), { altCanonical: canonicalOf(viRel) });
  });

  vi.people.forEach((person) => {
    const viRel = `con-nguoi/${person.slug}/index.html`;
    const enRel = `en/people/${person.slug}/index.html`;
    checkFile(viRel, canonicalOf(viRel), { altCanonical: canonicalOf(enRel) });
    checkFile(enRel, canonicalOf(enRel), { altCanonical: canonicalOf(viRel) });
  });

  vi.places.forEach((place) => {
    const viRel = `noi-chon/${place.slug}/index.html`;
    const enRel = `en/places/${place.slug}/index.html`;
    checkFile(viRel, canonicalOf(viRel), { altCanonical: canonicalOf(enRel) });
    checkFile(enRel, canonicalOf(enRel), { altCanonical: canonicalOf(viRel) });
  });

  vi.imageEssays.forEach((essay) => {
    const viRel = `hinh-anh/${essay.slug}/index.html`;
    const enRel = `en/images/${essay.slug}/index.html`;
    checkFile(viRel, canonicalOf(viRel), { altCanonical: canonicalOf(enRel) });
    checkFile(enRel, canonicalOf(enRel), { altCanonical: canonicalOf(viRel) });
  });
}

checkStaticMatrix();
checkDynamicMatrix();

if (failures.length > 0) {
  console.error("FAIL: OG extraction checks failed.");
  failures.forEach((failure) => {
    console.error(`- ${failure.rel}: ${failure.issue}`);
  });
  process.exit(1);
}

console.log("PASS: OG extraction checks passed for static + dynamic routes.");
checked.forEach((item) => console.log(`- ${item}`));
