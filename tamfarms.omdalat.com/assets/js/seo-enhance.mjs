#!/usr/bin/env node
/**
 * SEO enhancement script for Tam Farms static pages.
 * Adds: hreflang, schema.org JSON-LD, OG image, Twitter cards.
 *
 * Usage: node assets/js/seo-enhance.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative, basename } from 'path';

const ROOT = join(import.meta.dirname, '../..');
const BASE_URL = 'https://tamfarms.omdalat.com';

// VI → EN path mapping
const VI_TO_EN = {
  '/vi/': '/en/',
  '/vi/tam-farms-la-gi/': '/en/tam-farm-is/',
  '/vi/hanh-trinh/': '/en/journey/',
  '/vi/song-thu-va-lam-viec/': '/en/live-and-work/',
  '/vi/dinh-huong-cong-viec/': '/en/career-orientation/',
  '/vi/tu-do-va-song-co-muc-dich/': '/en/freedom-and-purposeful-living/',
  '/vi/nong-nghiep-va-khu-vuon/': '/en/agriculture-and-gardens/',
  '/vi/cong-nghe-va-du-an/': '/en/technology-and-projects/',
  '/vi/dia-diem/': '/en/locations/',
  '/vi/lien-he/': '/en/contact/',
  '/vi/dang-ky/': '/en/register/',
  '/vi/danh-cho-chuyen-gia/': '/en/for-experts/',
  '/vi/danh-cho-doanh-nghiep/': '/en/for-businesses/',
  '/vi/noi-quy/': '/en/house-rules/',
  '/vi/an-toan/': '/en/safety/',
  '/vi/dieu-khoan/': '/en/terms/',
  '/vi/quyen-rieng-tu/': '/en/privacy/',
  '/vi/cau-hoi-thuong-gap/': '/en/faq/',
  // Articles
  '/vi/bai-viet/': '/en/articles/',
  '/vi/bai-viet/song-thu-va-lam-viec-tai-da-lat/': '/en/articles/live-and-work-in-da-lat/',
  '/vi/bai-viet/dinh-huong-cong-viec-va-huong-di-cuoc-doi/': '/en/articles/career-orientation-and-life-direction/',
  '/vi/bai-viet/tu-do-va-song-co-muc-dich/': '/en/articles/freedom-and-purposeful-living/',
  '/vi/bai-viet/khong-gian-song-lam-viec-giua-vuon-duoc-lieu/': '/en/articles/living-and-working-among-herbal-gardens/',
  '/vi/bai-viet/nguoi-can-tam-dung-sau-kiet-suc-va-ap-luc-keo-dai/': '/en/articles/need-to-pause-after-burnout/',
  '/vi/bai-viet/nguoi-lam-viec-tu-xa-sang-tao-noi-dung-va-cong-nghe/': '/en/articles/remote-workers-creators-and-tech/',
  '/vi/bai-viet/sinh-vien-moi-tot-nghiep-trai-nghiem-nghe-nghiep-thuc-te/': '/en/articles/students-and-graduates-real-career-experience/',
  '/vi/bai-viet/thanh-cong-nhung-trong-rong-tim-lai-muc-dich-song/': '/en/articles/successful-but-empty-finding-purpose-again/',
  '/vi/bai-viet/doanh-nhan-thu-nghiem-y-tuong-va-du-an-moi/': '/en/articles/entrepreneurs-testing-new-ideas/',
  '/vi/bai-viet/chuyen-gia-nha-nghien-cuu-can-khong-gian-tap-trung/': '/en/articles/experts-and-researchers-need-focused-space/',
};

const EN_TO_VI = Object.fromEntries(
  Object.entries(VI_TO_EN).map(([vi, en]) => [en, vi])
);

// Schema.org templates
function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Những Khu Vườn Tâm",
    "alternateName": "Tam Farms",
    "url": BASE_URL,
    "description": "Mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia.",
    "slogan": "Sống thật. Làm thật. Lớn lên từ trải nghiệm.",
    "founder": { "@type": "Person", "name": "Trần Hà Tâm" },
    "areaServed": ["Vietnam"],
    "sameAs": ["https://wa.me/84849153426"]
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Những Khu Vườn Tâm — Tam Farms",
    "url": BASE_URL,
    "inLanguage": ["vi", "en"]
  };
}

function articleSchema(title, description, url, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "inLanguage": locale,
    "author": { "@type": "Person", "name": "Trần Hà Tâm" },
    "publisher": { "@type": "Organization", "name": "Những Khu Vườn Tâm" }
  };
}

function breadcrumbSchema(name, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": BASE_URL + "/vi/" },
      { "@type": "ListItem", "position": 2, "name": name, "item": url }
    ]
  };
}

// Get page path from file path
function getPathFromFile(filePath) {
  const rel = relative(ROOT, filePath).replace(/index\.html$/, '').replace(/\/$/, '');
  if (rel === '.' || rel === '') return '/';
  return '/' + rel + '/';
}

// Get locale from path
function getLocale(path) {
  if (path.startsWith('/vi/') || path === '/') return 'vi';
  if (path.startsWith('/en/')) return 'en';
  return null;
}

// Find equivalent path in other locale
function getAltPath(path, locale) {
  if (locale === 'vi') {
    const normalized = path === '/' ? '/vi/' : path;
    return VI_TO_EN[normalized] || null;
  } else if (locale === 'en') {
    return EN_TO_VI[path] || null;
  }
  return null;
}

// Extract title from HTML
function getTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1] : '';
}

// Extract description from HTML
function getDescription(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  return m ? m[1] : '';
}

// Check if a tag already exists
function hasTag(html, pattern) {
  return html.includes(pattern);
}

// Build hreflang tags
function buildHreflangTags(path, locale) {
  const altPath = getAltPath(path, locale);
  if (!altPath) return '';

  const tags = [];
  if (locale === 'vi') {
    tags.push(`<link rel="alternate" hreflang="vi" href="${BASE_URL}${path}">`);
    tags.push(`<link rel="alternate" hreflang="en" href="${BASE_URL}${altPath}">`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}">`);
  } else {
    tags.push(`<link rel="alternate" hreflang="en" href="${BASE_URL}${path}">`);
    tags.push(`<link rel="alternate" hreflang="vi" href="${BASE_URL}${altPath}">`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}${altPath}">`);
  }
  return tags.join('\n  ');
}

// Build OG image + Twitter card tags
function buildSocialTags(title, description, url, locale) {
  const ogImage = `${BASE_URL}/assets/images/og-tamfarms.jpg`;
  const localeTag = locale === 'vi' ? 'vi_VN' : 'en_US';
  const altLocale = locale === 'vi' ? 'en_US' : 'vi_VN';

  return [
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${localeTag}">`,
    `<meta property="og:locale:alternate" content="${altLocale}">`,
    `<meta property="og:site_name" content="Những Khu Vườn Tâm — Tam Farms">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${ogImage}">`
  ].join('\n  ');
}

// Build schema.org JSON-LD
function buildSchema(path, locale, title, description) {
  const url = BASE_URL + path;
  const isArticle = path.includes('/bai-viet/') || path.includes('/articles/');
  const isHomepage = path === '/vi/' || path === '/en/' || path === '/';

  const schemas = [];

  if (isHomepage) {
    schemas.push(orgSchema());
    schemas.push(websiteSchema());
  } else if (isArticle) {
    schemas.push(articleSchema(title, description, url, locale));
  }

  // Always add breadcrumb for non-homepage
  if (!isHomepage && path !== '/404.html') {
    schemas.push(breadcrumbSchema(title, url));
  }

  if (schemas.length === 0) return '';

  return schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n  ');
}

// Process a single HTML file
function processFile(filePath) {
  const path = getPathFromFile(filePath);
  const locale = getLocale(path);

  // Skip root index.html (redirect page) and 404
  if (path === '/' || path === '/404.html' || !locale) return false;

  let html = readFileSync(filePath, 'utf-8');
  const title = getTitle(html);
  const description = getDescription(html);
  const url = BASE_URL + path;

  let modified = false;
  const inserts = [];

  // Check for hreflang
  if (!hasTag(html, 'rel="alternate" hreflang')) {
    const hreflang = buildHreflangTags(path, locale);
    if (hreflang) inserts.push(hreflang);
  }

  // Check for OG image
  if (!hasTag(html, 'property="og:image"')) {
    inserts.push(buildSocialTags(title, description, url, locale));
  }

  // Check for schema.org
  if (!hasTag(html, 'application/ld+json')) {
    const schema = buildSchema(path, locale, title, description);
    if (schema) inserts.push(schema);
  }

  if (inserts.length === 0) return false;

  // Insert before </head>
  const insertBlock = inserts.join('\n  ');
  html = html.replace('</head>', `  ${insertBlock}\n</head>`);
  writeFileSync(filePath, html, 'utf-8');
  return true;
}

// Walk directory for HTML files
function walkHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && entry !== 'node_modules' && entry !== '.git' && entry !== 'assets') {
      results.push(...walkHtml(fullPath));
    } else if (entry === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

// Main
const htmlFiles = walkHtml(ROOT).concat(join(ROOT, '404.html'));
let modified = 0;
let skipped = 0;

for (const file of htmlFiles) {
  try {
    if (processFile(file)) {
      modified++;
      console.log(`  ✅ ${relative(ROOT, file)}`);
    } else {
      skipped++;
    }
  } catch (e) {
    console.error(`  ❌ ${relative(ROOT, file)}: ${e.message}`);
  }
}

console.log(`\nDone: ${modified} modified, ${skipped} skipped (already had tags or no locale).`);
