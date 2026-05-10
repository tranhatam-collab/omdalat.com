import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const readJson = (rel) =>
  JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));

const writeJson = (rel, value) => {
  const target = path.join(root, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const VI_SECTION_SLUG = {
  people: "con-nguoi",
  places: "noi-chon",
  rhythms: "nhip-song",
  work: "lam-viec",
  stories: "cau-chuyen",
  images: "hinh-anh",
};

const EN_SECTION_SLUG = {
  people: "people",
  places: "places",
  rhythms: "rhythms",
  work: "work",
  stories: "stories",
  images: "images",
};

const splitParagraphs = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const sectionLocalePath = (section, locale) =>
  locale === "vi" ? VI_SECTION_SLUG[section] : EN_SECTION_SLUG[section];

const getContent = () => ({
  siteSettings: readJson("content/cms/site-settings.json"),
  navigation: readJson("content/cms/navigation.json"),
  localeConfigs: readJson("content/cms/locale-configs.json"),
  sections: readJson("content/cms/sections.json"),
  stories: readJson("content/cms/stories.json"),
  people: readJson("content/cms/people.json"),
  places: readJson("content/cms/places.json"),
  imageEssays: readJson("content/cms/image-essays.json"),
  imageAssets: readJson("content/cms/image-assets.json"),
  staticPages: readJson("content/cms/static-pages.json"),
  supportPages: readJson("content/cms/support-pages.json"),
  bridgeBlocks: readJson("content/cms/bridge-blocks.json"),
});

function compileLocale(content, locale) {
  const navConfig = content.navigation.find((item) => item.locale === locale);
  const localeConfig = content.localeConfigs.find((item) => item.locale === locale);
  const bridgeBlock =
    content.bridgeBlocks.find((item) => item.block_id === "bridge-standard-vi-en") ||
    content.bridgeBlocks[0];

  const locales = {
    [locale]: {
      siteTitle: localeConfig.siteTitle,
      homeTitle: localeConfig.homeTitle,
      homeDescription: localeConfig.homeDescription,
      nav: navConfig.header_items.map((item, index) => ({
        key:
          index === 0
            ? "home"
            : item.url.includes("con-nguoi") || item.url.includes("people")
              ? "people"
              : item.url.includes("noi-chon") || item.url.includes("places")
                ? "places"
                : item.url.includes("nhip-song") || item.url.includes("rhythms")
                  ? "rhythms"
                  : item.url.includes("lam-viec") || item.url.includes("work")
                    ? "work"
                    : item.url.includes("cau-chuyen") || item.url.includes("stories")
                      ? "stories"
                      : item.url.includes("hinh-anh") || item.url.includes("images")
                        ? "images"
                        : item.url.includes("ve-ap-da-lat") || item.url.includes("about")
                          ? "about"
                          : `menu-${index + 1}`,
        label: item.label,
        href: item.url,
      })),
      utilityLinks: (navConfig.utility_items || []).map((item) => ({
        label: item.label,
        href: item.url,
      })),
      footerNote: localeConfig.footerNote,
      footerLinks: (navConfig.footer_groups[0]?.items || []).map((item) => ({
        label: item.label,
        href: item.url,
      })),
      bridge: {
        title: locale === "vi" ? "Khi việc đọc không còn là đủ" : "When reading is no longer enough",
        body: locale === "vi" ? bridgeBlock.copy_vi : bridgeBlock.copy_en,
        cta: locale === "vi" ? bridgeBlock.cta_label_vi : bridgeBlock.cta_label_en,
      },
      home: localeConfig.home,
      ui: localeConfig.ui,
    },
  };

  const sections = content.sections.reduce((acc, section) => {
    acc[section.key] = {
      key: section.key,
      image: section.image,
      [locale]: {
        title: locale === "vi" ? section.title_vi : section.title_en,
        thesis: locale === "vi" ? section.thesis_vi : section.thesis_en,
      },
    };
    return acc;
  }, {});

  const stories = content.stories
    .filter((item) => item.status !== "Archived")
    .map((item) => ({
      slug: locale === "vi" ? item.slug_vi : item.slug_en,
      section: item.category_key,
      image: item.hero_image,
      gallery: item.gallery_ids || [],
      [locale]: {
        title: locale === "vi" ? item.title_vi : item.title_en,
        excerpt: locale === "vi" ? item.excerpt_vi : item.excerpt_en,
        standfirst: locale === "vi" ? item.standfirst_vi : item.standfirst_en,
        body: splitParagraphs(locale === "vi" ? item.content_vi : item.content_en),
      },
    }));

  const people = content.people
    .filter((item) => item.status !== "Archived")
    .map((item) => ({
      slug: locale === "vi" ? item.slug_vi : item.slug_en,
      image: item.hero_image,
      gallery: item.gallery_ids || [],
      [locale]: {
        name: locale === "vi" ? item.name_vi : item.name_en,
        role: locale === "vi" ? item.role_vi : item.role_en,
        excerpt: locale === "vi" ? item.excerpt_vi : item.excerpt_en,
        story: splitParagraphs(locale === "vi" ? item.content_vi : item.content_en),
      },
    }));

  const places = content.places
    .filter((item) => item.status !== "Archived")
    .map((item) => ({
      slug: locale === "vi" ? item.slug_vi : item.slug_en,
      image: item.hero_image,
      gallery: item.gallery_ids || [],
      [locale]: {
        title: locale === "vi" ? item.title_vi : item.title_en,
        type: locale === "vi" ? item.standfirst_vi.split(" • ")[0] : item.standfirst_en.split(" • ")[0],
        area: locale === "vi" ? item.area_vi : item.area_en,
        excerpt: locale === "vi" ? item.excerpt_vi : item.excerpt_en,
        body: splitParagraphs(locale === "vi" ? item.content_vi : item.content_en),
      },
    }));

  const imageEssays = content.imageEssays
    .filter((item) => item.status !== "Archived")
    .map((item) => ({
      slug: locale === "vi" ? item.slug_vi : item.slug_en,
      image: item.hero_image,
      gallery: item.image_asset_ids || item.gallery_ids || [],
      [locale]: {
        title: locale === "vi" ? item.title_vi : item.title_en,
        intro: locale === "vi" ? item.intro_vi : item.intro_en,
        captions: locale === "vi" ? item.captions_vi : item.captions_en,
      },
    }));

  const staticPages = content.staticPages.reduce((acc, item) => {
    acc[item.key] = {
      eyebrow: locale === "vi" ? item.eyebrow_vi : item.eyebrow_en,
      title: locale === "vi" ? item.title_vi : item.title_en,
      metaTitle: locale === "vi" ? item.meta_title_vi : item.meta_title_en,
      metaDescription: locale === "vi" ? item.meta_description_vi : item.meta_description_en,
      body: locale === "vi" ? item.body_vi : item.body_en,
      ...(item.link_label_vi || item.link_label_en
        ? {
            linkLabel: locale === "vi" ? item.link_label_vi : item.link_label_en,
          }
        : {}),
    };
    return acc;
  }, {});

  const supportPages = content.supportPages.reduce((acc, item) => {
    acc[item.key] = {
      [locale]: item[locale],
    };
    return acc;
  }, {});

  return {
    locales,
    sections,
    stories,
    people,
    places,
    imageEssays,
    staticPages,
    supportPages,
  };
}

function main() {
  const content = getContent();
  const viOut = compileLocale(content, "vi");
  const enOut = compileLocale(content, "en");

  writeJson("content/vi.json", viOut);
  writeJson("content/en.json", enOut);

  const counts = {
    stories: viOut.stories.length,
    people: viOut.people.length,
    places: viOut.places.length,
    imageEssays: viOut.imageEssays.length,
  };

  console.log("Built locale content from CMS collections.");
  console.log(
    `Counts => stories: ${counts.stories}, people: ${counts.people}, places: ${counts.places}, imageEssays: ${counts.imageEssays}`
  );
}

main();
