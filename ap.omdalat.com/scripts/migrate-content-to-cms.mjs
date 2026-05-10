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

const vi = readJson("content/vi.json");
const en = readJson("content/en.json");

const nowDate = "2026-04-19";
const nowIso = "2026-04-19T00:00:00.000Z";

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

const IMAGE_VARIANTS = {
  hero: {
    file_name: "dalat-city-panorama-2020.jpg",
    hero: "images/ready/hero/dalat-city-panorama-2020.jpg",
    card: "images/ready/card/dalat-city-panorama-2020.jpg",
    og: "images/ready/og/dalat-city-panorama-2020.jpg",
  },
  farms: {
    file_name: "dalat-farmland-highland-patterns-2010.jpg",
    hero: "images/ready/hero/dalat-farmland-highland-patterns-2010.jpg",
    card: "images/ready/card/dalat-farmland-highland-patterns-2010.jpg",
    og: "images/ready/og/dalat-farmland-highland-patterns-2010.jpg",
  },
  panorama: {
    file_name: "dalat-city-panorama-2014.jpg",
    hero: "images/ready/hero/dalat-city-panorama-2014.jpg",
    card: "images/ready/card/dalat-city-panorama-2014.jpg",
    og: "images/ready/og/dalat-city-panorama-2014.jpg",
  },
  view: {
    file_name: "dalat-view-ngoc-lan-2011.jpg",
    hero: "images/ready/hero/dalat-view-ngoc-lan-2011.jpg",
    card: "images/ready/card/dalat-view-ngoc-lan-2011.jpg",
    og: "images/ready/og/dalat-view-ngoc-lan-2011.jpg",
  },
  valley: {
    file_name: "dalat-valley-houses-january-2012.jpg",
    hero: "images/ready/hero/dalat-valley-houses-january-2012.jpg",
    card: "images/ready/card/dalat-valley-houses-january-2012.jpg",
    og: "images/ready/og/dalat-valley-houses-january-2012.jpg",
  },
  slope: {
    file_name: "dalat-slope-and-hillside-homes-2012.jpg",
    hero: "images/ready/hero/dalat-slope-and-hillside-homes-2012.jpg",
    card: "images/ready/card/dalat-slope-and-hillside-homes-2012.jpg",
    og: "images/ready/og/dalat-slope-and-hillside-homes-2012.jpg",
  },
  rooftops: {
    file_name: "dalat-rooftops-and-valley-2012.jpg",
    hero: "images/ready/hero/dalat-rooftops-and-valley-2012.jpg",
    card: "images/ready/card/dalat-rooftops-and-valley-2012.jpg",
    og: "images/ready/og/dalat-rooftops-and-valley-2012.jpg",
  },
  slopesWide: {
    file_name: "dalat-city-slopes-january-2012.jpg",
    hero: "images/ready/hero/dalat-city-slopes-january-2012.jpg",
    card: "images/ready/card/dalat-city-slopes-january-2012.jpg",
    og: "images/ready/og/dalat-city-slopes-january-2012.jpg",
  },
};

function keywordFromSlug(slug) {
  return slug.replace(/-/g, " ");
}

function storyTypeFromStory(story) {
  if (
    story.slug === "da-lat-khong-chi-de-ghe-qua" ||
    story.slug === "lam-viec-tu-da-lat-khong-chi-la-mang-laptop-len-nui"
  ) {
    return "pillar";
  }
  if (story.section === "rhythms") return "short-note";
  if (story.section === "work") return "essay";
  return "signature";
}

function bridgeReasonFromStory(story) {
  if (story.section === "work") return "work";
  if (story.slug.includes("o-lai")) return "stay";
  return "none";
}

function storyBridgeEnabled(story) {
  return story.section === "work";
}

const sectionLocaleMap = {
  vi: vi.locales.vi,
  en: en.locales.en,
};

const siteSettings = {
  site_name_vi: "Ấp Đà Lạt",
  site_name_en: "Ap Dalat",
  brand_phrase_vi: "Ôm Ấp Đà Lạt",
  brand_phrase_en: "Om Ap Dalat",
  site_url: "https://ap.omdalat.com",
  default_locale: "vi",
  supported_locales: ["vi", "en"],
  omdalat_url: "https://omdalat.com",
  default_meta_title_vi: vi.locales.vi.homeTitle,
  default_meta_title_en: en.locales.en.homeTitle,
  default_meta_description_vi: vi.locales.vi.homeDescription,
  default_meta_description_en: en.locales.en.homeDescription,
  default_og_image: IMAGE_VARIANTS.hero.og,
  organization_schema_name: "Ap Dalat",
  organization_schema_alt_name: "Ấp Đà Lạt",
  status: "active",
};

const navigation = [
  {
    locale: "vi",
    header_items: vi.locales.vi.nav.map((item) => ({
      label: item.label,
      url: item.href,
      target: "_self",
    })),
    footer_groups: [
      {
        group_label: "Khám phá",
        items: vi.locales.vi.footerLinks.map((item) => ({
          label: item.label,
          url: item.href,
          target: "_self",
        })),
      },
    ],
    utility_items: vi.locales.vi.utilityLinks.map((item) => ({
      label: item.label,
      url: item.href,
      target: "_self",
    })),
    status: "active",
  },
  {
    locale: "en",
    header_items: en.locales.en.nav.map((item) => ({
      label: item.label,
      url: item.href,
      target: "_self",
    })),
    footer_groups: [
      {
        group_label: "Explore",
        items: en.locales.en.footerLinks.map((item) => ({
          label: item.label,
          url: item.href,
          target: "_self",
        })),
      },
    ],
    utility_items: en.locales.en.utilityLinks.map((item) => ({
      label: item.label,
      url: item.href,
      target: "_self",
    })),
    status: "active",
  },
];

const categories = Object.keys(vi.sections).map((key) => ({
  key,
  title_vi: vi.sections[key].vi.title,
  title_en: en.sections[key].en.title,
  slug_vi: VI_SECTION_SLUG[key],
  slug_en: EN_SECTION_SLUG[key],
  description_vi: vi.sections[key].vi.thesis,
  description_en: en.sections[key].en.thesis,
  hero_image: vi.sections[key].image,
  meta_title_vi: `${vi.sections[key].vi.title} | Ấp Đà Lạt`,
  meta_title_en: `${en.sections[key].en.title} | Ap Dalat`,
  meta_description_vi: vi.sections[key].vi.thesis,
  meta_description_en: en.sections[key].en.thesis,
  status: "active",
}));

const tags = [
  {
    name_vi: "Buổi sáng",
    name_en: "Morning",
    slug: "buoi-sang",
    tag_group: "rhythm",
    description_vi: "Nhịp sáng ở Đà Lạt.",
    description_en: "Morning rhythm in Dalat.",
    status: "active",
  },
  {
    name_vi: "Mưa",
    name_en: "Rain",
    slug: "mua",
    tag_group: "rhythm",
    description_vi: "Nhịp mưa và đời sống.",
    description_en: "Rain rhythm and daily life.",
    status: "active",
  },
  {
    name_vi: "Nhịp sống",
    name_en: "Rhythms",
    slug: "rhythms",
    tag_group: "rhythm",
    description_vi: "Nhịp sống hàng ngày của Đà Lạt.",
    description_en: "Daily rhythms in Dalat.",
    status: "active",
  },
  {
    name_vi: "Work",
    name_en: "Work",
    slug: "work",
    tag_group: "work",
    description_vi: "Lớp nội dung về công việc.",
    description_en: "Work-oriented content layer.",
    status: "active",
  },
  {
    name_vi: "Stories",
    name_en: "Stories",
    slug: "stories",
    tag_group: "format",
    description_vi: "Lớp kể chuyện editorial.",
    description_en: "Editorial story layer.",
    status: "active",
  },
  {
    name_vi: "Làm việc",
    name_en: "Work",
    slug: "lam-viec",
    tag_group: "work",
    description_vi: "Công việc diễn ra ở Đà Lạt.",
    description_en: "How work happens in Dalat.",
    status: "active",
  },
  {
    name_vi: "Nơi chốn",
    name_en: "Places",
    slug: "noi-chon",
    tag_group: "place",
    description_vi: "Nơi sống và nơi làm việc.",
    description_en: "Places to live and work.",
    status: "active",
  },
  {
    name_vi: "Con người",
    name_en: "People",
    slug: "con-nguoi",
    tag_group: "person",
    description_vi: "Những người làm nên Đà Lạt hôm nay.",
    description_en: "People shaping Dalat today.",
    status: "active",
  },
  {
    name_vi: "Photo essay",
    name_en: "Photo essay",
    slug: "photo-essay",
    tag_group: "format",
    description_vi: "Chuỗi kể chuyện bằng hình ảnh.",
    description_en: "Visual storytelling format.",
    status: "active",
  },
];

const authors = [
  {
    name_vi: "Ban biên tập Ấp Đà Lạt",
    name_en: "Ap Dalat Editorial Desk",
    slug: "ap-dalat-editorial-desk",
    role_vi: "Biên tập",
    role_en: "Editorial",
    bio_vi: "Nhóm biên tập phát triển lớp nội dung nền cho Ấp Đà Lạt.",
    bio_en: "Editorial team shaping Ap Dalat's foundational stories.",
    avatar_image: "hero",
    status: "published",
  },
];

const stories = vi.stories.map((story) => {
  const matchEn = en.stories.find((item) => item.slug === story.slug);
  const reason = bridgeReasonFromStory(story);
  return {
    title_vi: story.vi.title,
    title_en: matchEn.en.title,
    slug_vi: story.slug,
    slug_en: story.slug,
    category_key: story.section,
    story_type: storyTypeFromStory(story),
    excerpt_vi: story.vi.excerpt,
    excerpt_en: matchEn.en.excerpt,
    standfirst_vi: story.vi.standfirst,
    standfirst_en: matchEn.en.standfirst,
    content_vi: story.vi.body.join("\n\n"),
    content_en: matchEn.en.body.join("\n\n"),
    hero_image: story.image,
    gallery_ids: [],
    author_ids: ["ap-dalat-editorial-desk"],
    tag_ids: [story.section === "stories" ? "con-nguoi" : story.section],
    related_story_ids: [],
    related_people_ids: [],
    related_place_ids: [],
    related_image_essay_ids: [],
    seo: {
      focus_keyword_vi: keywordFromSlug(story.slug),
      focus_keyword_en: keywordFromSlug(story.slug),
      meta_title_vi: story.vi.title,
      meta_title_en: matchEn.en.title,
      meta_description_vi: story.vi.excerpt,
      meta_description_en: matchEn.en.excerpt,
      og_image: story.image,
      canonical_url_vi: `/vi/${VI_SECTION_SLUG[story.section]}/${story.slug}`,
      canonical_url_en: `/en/${EN_SECTION_SLUG[story.section]}/${story.slug}`,
      noindex_vi: false,
      noindex_en: false,
    },
    bridge_to_omdalat: {
      enabled: storyBridgeEnabled(story),
      bridge_block_id: storyBridgeEnabled(story) ? "bridge-work-vi-en" : "",
      reason,
    },
    status: "Released",
    published_at: nowDate,
    updated_at: nowIso,
  };
});

const people = vi.people.map((person) => {
  const matchEn = en.people.find((item) => item.slug === person.slug);
  return {
    name_vi: person.vi.name,
    name_en: matchEn.en.name,
    slug_vi: person.slug,
    slug_en: person.slug,
    role_vi: person.vi.role,
    role_en: matchEn.en.role,
    excerpt_vi: person.vi.excerpt,
    excerpt_en: matchEn.en.excerpt,
    standfirst_vi: person.vi.role,
    standfirst_en: matchEn.en.role,
    content_vi: person.vi.story.join("\n\n"),
    content_en: matchEn.en.story.join("\n\n"),
    hero_image: person.image,
    gallery_ids: [],
    tag_ids: ["con-nguoi"],
    related_story_ids: [],
    related_place_ids: [],
    seo: {
      meta_title_vi: person.vi.name,
      meta_title_en: matchEn.en.name,
      meta_description_vi: person.vi.excerpt,
      meta_description_en: matchEn.en.excerpt,
      og_image: person.image,
    },
    bridge_to_omdalat: {
      enabled: false,
      bridge_block_id: "",
    },
    status: "Released",
    published_at: nowDate,
    updated_at: nowIso,
  };
});

const places = vi.places.map((place) => {
  const matchEn = en.places.find((item) => item.slug === place.slug);
  return {
    title_vi: place.vi.title,
    title_en: matchEn.en.title,
    slug_vi: place.slug,
    slug_en: place.slug,
    place_type: place.vi.type
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-") || "other",
    area_vi: place.vi.area,
    area_en: matchEn.en.area,
    excerpt_vi: place.vi.excerpt,
    excerpt_en: matchEn.en.excerpt,
    standfirst_vi: `${place.vi.type} • ${place.vi.area}`,
    standfirst_en: `${matchEn.en.type} • ${matchEn.en.area}`,
    content_vi: place.vi.body.join("\n\n"),
    content_en: matchEn.en.body.join("\n\n"),
    hero_image: place.image,
    gallery_ids: [],
    tag_ids: ["noi-chon"],
    related_story_ids: [],
    related_people_ids: [],
    seo: {
      meta_title_vi: place.vi.title,
      meta_title_en: matchEn.en.title,
      meta_description_vi: place.vi.excerpt,
      meta_description_en: matchEn.en.excerpt,
      og_image: place.image,
    },
    bridge_to_omdalat: {
      enabled: false,
      bridge_block_id: "",
    },
    status: "Released",
    published_at: nowDate,
    updated_at: nowIso,
  };
});

const imageEssays = vi.imageEssays.map((essay) => {
  const matchEn = en.imageEssays.find((item) => item.slug === essay.slug);
  return {
    title_vi: essay.vi.title,
    title_en: matchEn.en.title,
    slug_vi: essay.slug,
    slug_en: essay.slug,
    theme_vi: essay.vi.title,
    theme_en: matchEn.en.title,
    intro_vi: essay.vi.intro,
    intro_en: matchEn.en.intro,
    closing_line_vi: essay.vi.captions[essay.vi.captions.length - 1] || "",
    closing_line_en: matchEn.en.captions[matchEn.en.captions.length - 1] || "",
    hero_image: essay.image,
    image_asset_ids: [essay.image],
    captions_vi: essay.vi.captions,
    captions_en: matchEn.en.captions,
    tag_ids: ["photo-essay"],
    related_story_ids: [],
    related_place_ids: [],
    seo: {
      meta_title_vi: essay.vi.title,
      meta_title_en: matchEn.en.title,
      meta_description_vi: essay.vi.intro,
      meta_description_en: matchEn.en.intro,
      og_image: essay.image,
    },
    bridge_to_omdalat: {
      enabled: false,
      bridge_block_id: "",
    },
    status: "Released",
    published_at: nowDate,
    updated_at: nowIso,
  };
});

const imageAssets = Object.entries(IMAGE_VARIANTS).map(([assetId, value]) => ({
  asset_id: assetId,
  title_vi: assetId,
  title_en: assetId,
  alt_vi: `Ảnh ${assetId} của Đà Lạt`,
  alt_en: `Dalat image asset ${assetId}`,
  caption_vi: "",
  caption_en: "",
  photographer: "Unknown",
  source: "Original archive",
  license_note: "Editorial internal usage",
  credit_required: false,
  credit_text: "",
  usage_type: "editorial",
  file_name: value.file_name,
  mime_type: "image/jpeg",
  width: 2400,
  height: 1350,
  variants: {
    hero: value.hero,
    card: value.card,
    og: value.og,
  },
  status: "approved",
}));

const bridgeBlocks = [
  {
    block_id: "bridge-standard-vi-en",
    name: "Standard Editorial Bridge",
    placement_type: "article_end",
    copy_vi:
      "Nếu bạn không chỉ muốn đọc về Đà Lạt, mà đang tìm một nơi để ở lại, làm việc và tham gia sâu hơn, hãy đi tới Ôm Đà Lạt.",
    copy_en:
      "If you are not only reading about Dalat, but looking for a place to stay, work, and join more deeply, continue to Om Dalat.",
    cta_label_vi: "Tới Ôm Đà Lạt",
    cta_label_en: "Go to Om Dalat",
    cta_url: "https://omdalat.com",
    status: "active",
  },
  {
    block_id: "bridge-work-vi-en",
    name: "Work Context Bridge",
    placement_type: "article_end",
    copy_vi:
      "Nếu bạn đang nghĩ nghiêm túc hơn về việc làm việc từ Đà Lạt, Ôm Đà Lạt là nơi đi tiếp cho lớp thực tế hơn.",
    copy_en:
      "If you are thinking more seriously about working from Dalat, Om Dalat is the next practical layer.",
    cta_label_vi: "Đi tiếp với Ôm Đà Lạt",
    cta_label_en: "Continue with Om Dalat",
    cta_url: "https://omdalat.com",
    status: "active",
  },
];

const faqItems = vi.supportPages.faq.vi.body.map((item, index) => {
  const enItem = en.supportPages.faq.en.body[index];
  return {
    question_vi: item.heading,
    question_en: enItem.heading,
    answer_vi: item.text,
    answer_en: enItem.text,
    locale_visibility: ["vi", "en"],
    page_assignment: "faq",
    status: "published",
  };
});

const seoOverrides = [
  {
    page_key: "home",
    locale: "vi",
    meta_title: vi.locales.vi.homeTitle,
    meta_description: vi.locales.vi.homeDescription,
    canonical_url: "https://ap.omdalat.com/",
    og_image: IMAGE_VARIANTS.hero.og,
    noindex: false,
    schema_type: "WebPage",
    status: "active",
  },
  {
    page_key: "home",
    locale: "en",
    meta_title: en.locales.en.homeTitle,
    meta_description: en.locales.en.homeDescription,
    canonical_url: "https://ap.omdalat.com/en/",
    og_image: IMAGE_VARIANTS.hero.og,
    noindex: false,
    schema_type: "WebPage",
    status: "active",
  },
];

const localeConfigs = ["vi", "en"].map((locale) => {
  const current = sectionLocaleMap[locale];
  return {
    locale,
    siteTitle: current.siteTitle,
    homeTitle: current.homeTitle,
    homeDescription: current.homeDescription,
    footerNote: current.footerNote,
    bridge: current.bridge,
    home: current.home,
    ui: current.ui,
  };
});

const sections = Object.keys(vi.sections).map((key) => ({
  key,
  image: vi.sections[key].image,
  title_vi: vi.sections[key].vi.title,
  title_en: en.sections[key].en.title,
  thesis_vi: vi.sections[key].vi.thesis,
  thesis_en: en.sections[key].en.thesis,
}));

const staticPages = ["about", "om"].map((key) => ({
  key,
  eyebrow_vi: vi.staticPages[key].eyebrow,
  eyebrow_en: en.staticPages[key].eyebrow,
  title_vi: vi.staticPages[key].title,
  title_en: en.staticPages[key].title,
  meta_title_vi: vi.staticPages[key].metaTitle,
  meta_title_en: en.staticPages[key].metaTitle,
  meta_description_vi: vi.staticPages[key].metaDescription,
  meta_description_en: en.staticPages[key].metaDescription,
  body_vi: vi.staticPages[key].body,
  body_en: en.staticPages[key].body,
  link_label_vi: vi.staticPages[key].linkLabel || "",
  link_label_en: en.staticPages[key].linkLabel || "",
}));

const supportPages = ["contact", "topics", "search", "faq"].map((key) => ({
  key,
  vi: vi.supportPages[key].vi,
  en: en.supportPages[key].en,
}));

writeJson("content/cms/site-settings.json", siteSettings);
writeJson("content/cms/navigation.json", navigation);
writeJson("content/cms/categories.json", categories);
writeJson("content/cms/tags.json", tags);
writeJson("content/cms/authors.json", authors);
writeJson("content/cms/stories.json", stories);
writeJson("content/cms/people.json", people);
writeJson("content/cms/places.json", places);
writeJson("content/cms/image-essays.json", imageEssays);
writeJson("content/cms/image-assets.json", imageAssets);
writeJson("content/cms/bridge-blocks.json", bridgeBlocks);
writeJson("content/cms/redirects.json", []);
writeJson("content/cms/seo-overrides.json", seoOverrides);
writeJson("content/cms/faq-items.json", faqItems);
writeJson("content/cms/contacts.json", []);
writeJson("content/cms/locale-configs.json", localeConfigs);
writeJson("content/cms/sections.json", sections);
writeJson("content/cms/static-pages.json", staticPages);
writeJson("content/cms/support-pages.json", supportPages);

console.log("CMS migration files created in content/cms/");
