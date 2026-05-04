import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const webOut = path.join(rootDir, "apps", "web", ".static-pages");
const appOut = path.join(rootDir, "apps", "app", ".static-pages");
const articleSeedPath = path.join(rootDir, "data", "seed", "articles.seed.json");
const articleImageSeedPath = path.join(rootDir, "data", "seed", "article-images.seed.json");

const webOrigin = "https://omdalat.com";
const appOrigin = "https://app.omdalat.com";

const visuals = {
  mist: {
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1800",
    width: 1800,
    height: 1200,
    vi: "Đà Lạt trong sương sớm",
    en: "Dalat in the early mist",
    credit: "Khanh Tran"
  },
  lake: {
    src: "https://images.unsplash.com/photo-1741524427564-0173c980c432?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=di-p-zader-i29Z07meKds-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    vi: "Mặt hồ và rừng thông",
    en: "Lake edge and pine forest",
    credit: "Diep Zader"
  },
  road: {
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    vi: "Đường rừng vùng ven",
    en: "The forest edge road",
    credit: "Van Space"
  },
  station: {
    src: "https://images.unsplash.com/photo-1562865828-63b04eb687a5?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=vicky-HXC2QFlxG3E-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    vi: "Ga Đà Lạt",
    en: "Dalat Station",
    credit: "Vicky"
  },
  waterfall: {
    src: "https://images.unsplash.com/photo-1756714656046-41f3bf6bfe88?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=gvz-42-OpFtIP6ndrQ-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    vi: "Thác Datanla",
    en: "Datanla Waterfall",
    credit: "GVZ 42"
  },
  marketFruit: {
    src: "https://images.unsplash.com/photo-1771581254097-7a186bd064bf?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=annie-hatuanh-R_wHZ6Xp6eU-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    vi: "Quầy trái cây chợ Đà Lạt",
    en: "Dalat Market fruit stall",
    credit: "ANNIE HATUANH"
  },
  marketExterior: {
    src: "https://images.unsplash.com/photo-1739286869328-13691f7001ec?ixlib=rb-4.1.0&q=85&fm=webp&crop=entropy&cs=srgb&dl=van-tien-le-KL-_dlddu58-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    vi: "Mặt trước chợ Đà Lạt",
    en: "Dalat Market exterior",
    credit: "Van Tien Le"
  }
};

const visualList = Object.values(visuals);
const pillarVisuals = {
  song: [visuals.mist, visuals.lake, visuals.marketFruit],
  work: [visuals.road, visuals.station, visuals.lake],
  "xay-cuoc-doi": [visuals.marketExterior, visuals.waterfall, visuals.road]
};
const articleVisualMap = {
  "song-o-da-lat-la-gi": [visuals.mist, visuals.lake, visuals.marketExterior],
  "chi-phi-song-da-lat-2026": [visuals.marketFruit, visuals.marketExterior, visuals.station],
  "lam-viec-o-da-lat-co-thuc-te-khong": [visuals.road, visuals.lake, visuals.station],
  "remote-work-da-lat": [visuals.road, visuals.lake, visuals.mist],
  "song-cham-khong-phai-luoi": [visuals.waterfall, visuals.lake, visuals.station],
  "ban-khong-can-chay-nhanh": [visuals.road, visuals.mist, visuals.waterfall]
};

const contentPages = [
  {
    path: "/life",
    key: "life",
    visuals: [visuals.lake, visuals.marketFruit],
    title: { vi: "Sống tại Ôm Đà Lạt", en: "Life in Om Dalat" },
    h1: { vi: "Một nền sống đủ vững để ở lại", en: "A living base steady enough to stay" },
    desc: {
      vi: "Nơi ở, nhịp sống, sức khỏe và cách giữ một nền sống đủ ổn định để ở lại lâu hơn.",
      en: "Living space, rhythm, health, and the base needed to stay longer with stability."
    },
    points: {
      vi: ["Chỗ ở rõ ràng, yên và dùng được mỗi ngày.", "Nhịp đều giúp công việc và học tập không bị đứt đoạn.", "Không gian chung chỉ bền khi mọi người giữ trách nhiệm."],
      en: ["A clear, quiet, usable living base.", "Steady rhythm protects work and learning.", "Shared life lasts when people hold responsibility."]
    }
  },
  {
    path: "/work",
    key: "work",
    visuals: [visuals.road, visuals.station],
    title: { vi: "Làm việc tại Ôm Đà Lạt", en: "Work in Om Dalat" },
    h1: { vi: "Công việc thật trong một nhịp sống thật", en: "Real work inside a real rhythm of life" },
    desc: {
      vi: "Công việc thật, dự án thật và cách giữ thu nhập đủ thực để ở lại dài hơn tại Đà Lạt.",
      en: "Real work, real projects, and a practical income rhythm for staying longer in Dalat."
    },
    points: {
      vi: ["Làm từ xa, freelance, dự án nhỏ và việc nội bộ theo nhu cầu.", "Mốc thời gian rõ, ít hứa hẹn hơn và nhiều việc làm ra hơn.", "Nhịp chậm chỉ hữu ích khi output vẫn đều."],
      en: ["Remote work, freelance, small projects, and internal work.", "Clear deadlines, less promise, more output.", "A slower pace works only when output stays steady."]
    }
  },
  {
    path: "/learning",
    key: "learning",
    visuals: [visuals.station, visuals.waterfall],
    title: { vi: "Học tại Ôm Đà Lạt", en: "Learning in Om Dalat" },
    h1: { vi: "Học bằng cách tham gia vào đời sống thật", en: "Learn by entering real life" },
    desc: {
      vi: "Học từ trải nghiệm, từ công việc và từ cách sống cùng người khác trong đời sống thật ở Đà Lạt.",
      en: "Learning through experience, work, and shared living in real life in Dalat."
    },
    points: {
      vi: ["Học gắn với việc đang diễn ra quanh bạn.", "Bài viết, dự án nhỏ hoặc quy trình đều có thể là output.", "Điều làm ra giúp việc học nhìn thấy và sửa được."],
      en: ["Learning stays tied to what is happening around you.", "Articles, small projects, and processes can be output.", "Output makes learning visible and correctable."]
    }
  },
  {
    path: "/community",
    key: "community",
    visuals: [visuals.marketFruit, visuals.marketExterior],
    title: { vi: "Cộng đồng tại Ôm Đà Lạt", en: "Community in Om Dalat" },
    h1: { vi: "Cộng đồng chỉ bền khi mọi người giữ phần của mình", en: "Community lasts only when people keep their part" },
    desc: {
      vi: "Sống chung, chia sẻ, giữ kỷ luật và xây một cộng đồng có trách nhiệm tại Đà Lạt.",
      en: "Shared living, discipline, contribution, and a responsible community in Dalat."
    },
    points: {
      vi: ["Không gắn kết giả và không gây ồn ào vô ích.", "Ăn chung, làm việc cùng, chia sẻ và nhìn lại định kỳ.", "Mỗi người cần biết phần của mình trong nhịp chung."],
      en: ["No false closeness and no useless drama.", "Shared meals, work blocks, reflection, and review.", "Each person needs to know their part in the shared rhythm."]
    }
  },
  {
    path: "/stay",
    key: "stay",
    visuals: [visuals.lake, visuals.station],
    title: { vi: "Ở lại tại Ôm Đà Lạt", en: "Stay in Om Dalat" },
    h1: { vi: "Ở lại theo cách có thể duy trì", en: "Stay in a way that can be sustained" },
    desc: {
      vi: "Loại chỗ ở, giá dự kiến, điều kiện và mức phù hợp để ở lại theo cách có thể duy trì.",
      en: "Stay options, expected pricing, conditions, and fit for longer-term living in Dalat."
    },
    points: {
      vi: ["Phòng chung cho chi phí thấp và nhịp sống chung.", "Phòng riêng cho người cần riêng tư và tập trung dài hơn.", "Ở lâu chỉ có ý nghĩa khi bạn tự quản lý được mình."],
      en: ["Shared rooms for lower cost and shared rhythm.", "Private rooms for privacy and longer focus.", "Longer stay matters only when you can manage yourself."]
    }
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absolute(origin, route) {
  return new URL(route, origin).toString();
}

function localize(route, locale) {
  const cleanRoute = route === "/" ? "" : route.replace(/^\/+/, "");
  return `/${locale}/${cleanRoute}`.replace(/\/$/, "") || `/${locale}`;
}

function imageStrip(images, locale, label) {
  return `<section class="visual-strip reveal" aria-label="${escapeHtml(label)}">${images
    .map(
      (image, index) => `<figure class="visual-card${index === 0 ? " visual-card-featured" : ""}">
        <img src="${image.src}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image[locale])}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
        <figcaption><span>${escapeHtml(image[locale])}</span><small>${escapeHtml(image.credit)}</small></figcaption>
      </figure>`
    )
    .join("")}</section>`;
}

function webShell({ locale, route, title, description, body, image = visuals.mist }) {
  const canonical = absolute(webOrigin, localize(route, locale));
  const altLocale = locale === "vi" ? "en" : "vi";
  const lang = locale === "vi" ? "vi-VN" : "en";
  const nav = [
    ["/life", locale === "vi" ? "Sống" : "Life"],
    ["/work", locale === "vi" ? "Làm" : "Work"],
    ["/learning", locale === "vi" ? "Học" : "Learning"],
    ["/community", locale === "vi" ? "Cộng đồng" : "Community"],
    ["/stay", locale === "vi" ? "Ở lại" : "Stay"],
    ["/articles", locale === "vi" ? "Bài viết" : "Articles"]
  ];

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="vi-VN" href="${absolute(webOrigin, localize(route, "vi"))}">
  <link rel="alternate" hreflang="en" href="${absolute(webOrigin, localize(route, "en"))}">
  <link rel="alternate" hreflang="x-default" href="${absolute(webOrigin, localize(route, "vi"))}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image.src}">
  <meta property="og:image:width" content="${image.width}">
  <meta property="og:image:height" content="${image.height}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${image.src}">
  <meta name="theme-color" content="#0f3d2e">
  <link rel="stylesheet" href="/assets/site.css">
  <script defer src="/assets/site.js"></script>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Om Dalat", url: webOrigin }
  })}</script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/${locale}/"><strong>${locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</strong><span>${locale === "vi" ? "Sống, làm, học và ở lại tại Đà Lạt" : "Live, work, learn, and stay in Dalat"}</span></a>
    <nav>${nav.map(([href, label]) => `<a href="${localize(href, locale)}/">${label}</a>`).join("")}</nav>
    <div class="tools"><a href="${localize(route, altLocale)}/">${altLocale.toUpperCase()}</a><a class="button small" href="https://app.omdalat.com/${locale}/member/login/">App</a></div>
  </header>
  <main>${body}</main>
  <footer class="site-footer">
    <strong>${locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</strong>
    <p>${locale === "vi" ? "Một hệ sống thực địa tại Đà Lạt, nơi người phù hợp có thể ở lại và làm ra giá trị thật." : "A real-life system in Dalat where aligned people can stay and create real value."}</p>
  </footer>
</body>
</html>`;
}

function appShell({ locale, route, title, description, body, image = visuals.mist }) {
  const canonical = absolute(appOrigin, localize(route, locale));
  const lang = locale === "vi" ? "vi-VN" : "en";
  const nav = ["dashboard", "stay", "work", "learning", "places", "hosts", "experts", "communities", "events", "proofs", "profile"];

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="noindex,nofollow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${image.src}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${image.src}">
  <meta name="theme-color" content="#0f3d2e">
  <link rel="stylesheet" href="/assets/app.css">
  <script defer src="/assets/app.js"></script>
</head>
<body>
  <header class="app-header">
    <a class="brand" href="/${locale}/"><strong>${locale === "vi" ? "Ôm Đà Lạt App" : "Om Dalat App"}</strong><span data-session-label>${locale === "vi" ? "Phiên khách" : "Guest session"}</span></a>
    <div class="tools"><a href="https://omdalat.com/${locale}/docs/">Guide</a><a href="/${locale === "vi" ? "en" : "vi"}/">${locale === "vi" ? "EN" : "VI"}</a></div>
  </header>
  <div class="app-layout">
    <nav class="app-nav">${nav.map((item) => `<a href="/${locale}/${item}/">${item}</a>`).join("")}</nav>
    <main>${body}</main>
  </div>
</body>
</html>`;
}

async function writeRoute(outDir, route, html) {
  const cleanRoute = route.replace(/^\/+|\/+$/g, "");
  const targetDir = cleanRoute ? path.join(outDir, cleanRoute) : outDir;
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, "index.html"), html);
}

function articleImages(article, count, imageBySlug) {
  const seedImage = imageBySlug.get(article.slug);
  const seedVisuals = seedImage ? [seedImage] : [];
  const base = articleVisualMap[article.slug] ?? pillarVisuals[article.pillar_key] ?? visualList;
  return [...new Set([...seedVisuals, ...base, ...visualList])].slice(0, count);
}

function articleCard(article, locale, imageBySlug) {
  const image = articleImages(article, 1, imageBySlug)[0];
  const title = article[`title_${locale}`];
  const excerpt = article[`excerpt_${locale}`];
  return `<a class="article-card reveal" data-pillar="${article.pillar_key}" href="${localize(`/articles/${article.slug}`, locale)}/">
    <img src="${image.src}" alt="${escapeHtml(image[locale])}" loading="lazy" decoding="async">
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(excerpt)}</span>
    <small>${escapeHtml(article[`pillar_${locale}`])}</small>
  </a>`;
}

function contentBody(page, locale) {
  return `<article class="page">
    <p class="kicker">${escapeHtml(page.title[locale])}</p>
    <h1>${escapeHtml(page.h1[locale])}</h1>
    <p class="lead">${escapeHtml(page.desc[locale])}</p>
    ${imageStrip(page.visuals, locale, page.title[locale])}
    <section class="panel-grid">${page.points[locale].map((point) => `<div class="panel reveal"><strong>${escapeHtml(point)}</strong><p>${locale === "vi" ? "Nội dung này được minh họa bằng ảnh thật Đà Lạt để người đọc hiểu đúng bối cảnh, không chỉ đọc mô tả." : "This section uses real Dalat visuals so readers understand context, not only copy."}</p></div>`).join("")}</section>
  </article>`;
}

async function buildWeb(articles, imageBySlug) {
  await rm(webOut, { recursive: true, force: true });
  await mkdir(path.join(webOut, "assets"), { recursive: true });
  const published = articles.filter((article) => article.status === "published");

  for (const locale of ["vi", "en"]) {
    const homeBody = `<article class="home">
      <section class="hero">
        <div class="hero-copy reveal">
          <p class="kicker">${locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</p>
          <h1>${locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</h1>
          <p>${locale === "vi" ? "Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật." : "A place to live, work, learn, and build a real life in Dalat."}</p>
          <div class="actions"><a class="button" href="${localize("/join", locale)}/">${locale === "vi" ? "Bắt đầu từ đây" : "Start here"}</a><a class="button ghost" href="${localize("/articles", locale)}/">${locale === "vi" ? "Đọc bài nền" : "Read articles"}</a></div>
        </div>
        ${imageStrip([visuals.mist, visuals.lake, visuals.road], locale, locale === "vi" ? "Đà Lạt" : "Dalat")}
      </section>
      <section class="panel-grid">${contentPages.map((page) => `<a class="panel reveal" href="${localize(page.path, locale)}/"><strong>${escapeHtml(page.title[locale])}</strong><span>${escapeHtml(page.desc[locale])}</span></a>`).join("")}</section>
      <section class="page"><p class="kicker">${locale === "vi" ? "Bài viết" : "Articles"}</p><h2>${locale === "vi" ? "Bài nền đang mở" : "Open foundational articles"}</h2><div class="article-grid">${published.map((article) => articleCard(article, locale, imageBySlug)).join("")}</div></section>
    </article>`;
    await writeRoute(webOut, `/${locale}`, webShell({
      locale,
      route: "/",
      title: locale === "vi" ? "Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt" : "Om Dalat | Live and work in Dalat",
      description: locale === "vi" ? "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt với ảnh, bài viết và hướng dẫn để hiểu đúng trước khi ở lại." : "Om Dalat is a real-life living system in Dalat with visuals, articles, and guidance before staying.",
      body: homeBody
    }));

    for (const page of contentPages) {
      await writeRoute(webOut, localize(page.path, locale), webShell({
        locale,
        route: page.path,
        title: page.title[locale],
        description: page.desc[locale],
        image: page.visuals[0],
        body: contentBody(page, locale)
      }));
    }

    await writeRoute(webOut, localize("/articles", locale), webShell({
      locale,
      route: "/articles",
      title: locale === "vi" ? "Bài viết Ôm Đà Lạt" : "Om Dalat Articles",
      description: locale === "vi" ? "Tất cả bài public đang mở đều có hình minh họa đúng nội dung." : "Every public article now includes relevant visuals.",
      image: visuals.marketExterior,
      body: `<article class="page"><p class="kicker">${locale === "vi" ? "Bài viết" : "Articles"}</p><h1>${locale === "vi" ? "Bài viết mở nền cho Ôm Đà Lạt" : "Foundational articles for Om Dalat"}</h1><div class="filters"><button data-filter="all">All</button><button data-filter="song">Life</button><button data-filter="work">Work</button><button data-filter="xay-cuoc-doi">Build</button></div><div class="article-grid">${published.map((article) => articleCard(article, locale, imageBySlug)).join("")}</div></article>`
    }));

    for (const article of published) {
      const images = articleImages(article, article[`content_${locale}`].length > 700 ? 3 : 2, imageBySlug);
      const title = article[`title_${locale}`];
      const description = article[`excerpt_${locale}`];
      const paragraphs = article[`content_${locale}`].split(/\n{2,}/).filter(Boolean);
      await writeRoute(webOut, localize(`/articles/${article.slug}`, locale), webShell({
        locale,
        route: `/articles/${article.slug}`,
        title,
        description,
        image: images[0],
        body: `<article class="page article-detail"><p class="kicker">${escapeHtml(article[`pillar_${locale}`])}</p><h1>${escapeHtml(title)}</h1><p class="lead">${escapeHtml(description)}</p>${imageStrip(images, locale, title)}<section class="panel article-body">${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section><section class="panel"><strong>${locale === "vi" ? "Đi tiếp" : "Next step"}</strong><p>${locale === "vi" ? "Khi đã hiểu rõ hơn, hãy xem cách tham gia hoặc đọc thêm các bài nền khác." : "Once the context is clearer, continue to joining or read more foundational articles."}</p><div class="actions"><a class="button" href="${localize("/join", locale)}/">${locale === "vi" ? "Xem cách tham gia" : "See how to join"}</a></div></section></article>`
      }));
    }

    await writeRoute(webOut, localize("/join", locale), webShell({
      locale,
      route: "/join",
      title: locale === "vi" ? "Tham gia Ôm Đà Lạt" : "Join Om Dalat",
      description: locale === "vi" ? "Gửi nhu cầu và bắt đầu đi vào luồng thành viên." : "Send your need and enter the member flow.",
      image: visuals.road,
      body: `<article class="page"><p class="kicker">${locale === "vi" ? "Tham gia" : "Join"}</p><h1>${locale === "vi" ? "Bắt đầu bằng một nhu cầu rõ" : "Start with a clear need"}</h1>${imageStrip([visuals.road, visuals.lake], locale, "Join")}<form class="panel form" data-static-form><input placeholder="${locale === "vi" ? "Tên của bạn" : "Your name"}"><input placeholder="Email"><textarea placeholder="${locale === "vi" ? "Bạn muốn ở lại, làm việc hay học điều gì?" : "What do you want to stay, work, or learn?"}"></textarea><button class="button" type="submit">${locale === "vi" ? "Gửi bản nháp" : "Send draft"}</button><p class="form-status"></p></form></article>`
    }));

    await writeRoute(webOut, localize("/docs", locale), webShell({
      locale,
      route: "/docs",
      title: locale === "vi" ? "Hướng dẫn Ôm Đà Lạt" : "Om Dalat Guides",
      description: locale === "vi" ? "Hướng dẫn bắt đầu, cách hoạt động và quy tắc cộng đồng." : "Getting started, how it works, and community rules.",
      body: contentBody({
        title: { vi: "Hướng dẫn", en: "Guides" },
        h1: { vi: "Đọc trước khi quyết định ở lại", en: "Read before deciding to stay" },
        desc: { vi: "Các hướng dẫn public giúp bạn hiểu hệ trước khi đi vào app.", en: "Public guides help you understand the system before entering the app." },
        visuals: [visuals.mist, visuals.station],
        points: {
          vi: ["Bắt đầu", "Cách hoạt động", "Quy tắc cộng đồng"],
          en: ["Getting started", "How it works", "Community rules"]
        }
      }, locale)
    }));
  }

  const sitemapRoutes = ["/", "/articles", "/join", "/docs", ...contentPages.map((page) => page.path), ...published.map((article) => `/articles/${article.slug}`)];
  await writeFile(path.join(webOut, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapRoutes.flatMap((route) => ["vi", "en"].map((locale) => `<url><loc>${absolute(webOrigin, localize(route, locale))}</loc></url>`)).join("")}</urlset>`);
  await writeFile(path.join(webOut, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://omdalat.com/sitemap.xml\n");
  await writeFile(path.join(webOut, "_redirects"), "/ /vi/ 308\n/vi /vi/ 308\n/en /en/ 308\n/* /vi/ 404\n");
  await writeFile(path.join(webOut, "_headers"), "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n");
  await writeFile(path.join(webOut, "assets", "site.css"), webCss);
  await writeFile(path.join(webOut, "assets", "site.js"), webJs);
}

async function buildApp() {
  await rm(appOut, { recursive: true, force: true });
  await mkdir(path.join(appOut, "assets"), { recursive: true });
  const pages = [
    ["dashboard", { vi: "Bảng điều khiển thành viên", en: "Member dashboard" }],
    ["stay", { vi: "Nhu cầu ở lại", en: "Stay requests" }],
    ["work", { vi: "Công việc đang mở", en: "Open work" }],
    ["learning", { vi: "Chương trình học", en: "Learning programs" }],
    ["places", { vi: "Địa điểm", en: "Places" }],
    ["hosts", { vi: "Host", en: "Hosts" }],
    ["experts", { vi: "Chuyên gia", en: "Experts" }],
    ["communities", { vi: "Cộng đồng", en: "Communities" }],
    ["events", { vi: "Sự kiện", en: "Events" }],
    ["proofs", { vi: "Bằng chứng", en: "Proofs" }],
    ["profile", { vi: "Hồ sơ", en: "Profile" }]
  ];

  for (const locale of ["vi", "en"]) {
    const dashboardBody = `<article class="app-page"><p class="kicker">${locale === "vi" ? "Dashboard" : "Dashboard"}</p><h1>${locale === "vi" ? "Bạn đang ở đâu trong hành trình này" : "See where you are in this journey"}</h1><p>${locale === "vi" ? "Không gian thành viên để nhìn rõ bước tiếp theo, tài nguyên đã mở và việc có thể làm." : "A member workspace for next steps, open resources, and possible work."}</p>${imageStrip([visuals.mist, visuals.road, visuals.marketFruit], locale, "App visuals")}<section class="meter"><span><strong>6</strong>${locale === "vi" ? "tài nguyên" : "resources"}</span><span><strong>3</strong>${locale === "vi" ? "việc mở" : "open work"}</span><span><strong>3</strong>${locale === "vi" ? "lựa chọn ở" : "stay options"}</span></section><section class="panel-grid">${pages.slice(1, 7).map(([slug, label]) => `<a class="panel reveal" href="/${locale}/${slug}/"><strong>${label[locale]}</strong><span>${locale === "vi" ? "Mở lớp vận hành tương ứng trong app." : "Open this operating layer in the app."}</span></a>`).join("")}</section></article>`;
    await writeRoute(appOut, `/${locale}`, appShell({
      locale,
      route: "/",
      title: locale === "vi" ? "Không gian thành viên | Om Dalat App" : "Member Workspace | Om Dalat App",
      description: locale === "vi" ? "Không gian thành viên và vận hành của Ôm Đà Lạt." : "Om Dalat member and operations workspace.",
      body: dashboardBody
    }));
    await writeRoute(appOut, `/${locale}/member/login`, appShell({
      locale,
      route: "/member/login",
      title: locale === "vi" ? "Đăng nhập thành viên | Om Dalat App" : "Member login | Om Dalat App",
      description: locale === "vi" ? "Chọn phiên demo để xem dashboard thành viên." : "Choose a demo session to inspect the member dashboard.",
      body: `<article class="app-page"><p class="kicker">${locale === "vi" ? "Đăng nhập" : "Login"}</p><h1>${locale === "vi" ? "Chọn phiên để vào app" : "Choose a session to enter"}</h1>${imageStrip([visuals.road, visuals.marketFruit], locale, "Login visuals")}<section class="panel-grid">${["guest", "registered", "reviewed", "contributor"].map((role) => `<button class="panel role-card" data-role="${role}"><strong>${role}</strong><span>${locale === "vi" ? "Dùng phiên này" : "Use this session"}</span></button>`).join("")}</section><div class="actions"><a class="button" href="/${locale}/dashboard/">${locale === "vi" ? "Vào dashboard" : "Open dashboard"}</a></div></article>`
    }));

    for (const [slug, label] of pages) {
      if (slug === "dashboard") continue;
      await writeRoute(appOut, `/${locale}/${slug}`, appShell({
        locale,
        route: `/${slug}`,
        title: `${label[locale]} | Om Dalat App`,
        description: locale === "vi" ? `Lớp ${label.vi.toLowerCase()} trong app Ôm Đà Lạt.` : `${label.en} layer in Om Dalat App.`,
        image: visuals.road,
        body: `<article class="app-page"><p class="kicker">${escapeHtml(label[locale])}</p><h1>${escapeHtml(label[locale])}</h1><p>${locale === "vi" ? "Màn hình static fallback này giữ giao diện, hình ảnh và SEO/noindex trong lúc build Next đang cần xử lý dependency." : "This static fallback keeps the interface, visuals, and noindex metadata while the Next build dependency issue is handled."}</p>${imageStrip([visuals.road, visuals.lake], locale, label[locale])}<section class="panel-grid"><div class="panel reveal"><strong>${locale === "vi" ? "Trạng thái" : "Status"}</strong><span>${locale === "vi" ? "Đã sẵn sàng để team kiểm tra UI." : "Ready for UI review."}</span></div><div class="panel reveal"><strong>${locale === "vi" ? "Bước tiếp theo" : "Next step"}</strong><span>${locale === "vi" ? "Kết nối lại runtime Next khi build tool ổn định." : "Reconnect the Next runtime once the build tool is stable."}</span></div></section></article>`
      }));
    }
  }

  await writeFile(path.join(appOut, "robots.txt"), "User-agent: *\nDisallow: /\n");
  await writeFile(path.join(appOut, "_redirects"), "/ /vi/member/login/ 307\n/vi /vi/ 307\n/en /en/ 307\n/* /vi/ 404\n");
  await writeFile(path.join(appOut, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n");
  await writeFile(path.join(appOut, "assets", "app.css"), appCss);
  await writeFile(path.join(appOut, "assets", "app.js"), appJs);
}

const webCss = `
:root{--bg:#eef4ef;--deep:#0f3d2e;--text:#153126;--muted:#4f675d;--line:rgba(21,49,38,.14);--surface:rgba(255,255,255,.84);--earth:#8b6b4f}*{box-sizing:border-box}body{margin:0;color:var(--text);background:linear-gradient(135deg,rgba(139,107,79,.13),transparent 28rem),linear-gradient(180deg,var(--bg),#dce8df);font-family:Avenir Next,Helvetica Neue,Segoe UI,sans-serif}a{color:inherit}.site-header,.site-footer,.page,.panel,.article-card{border:1px solid var(--line);background:var(--surface);box-shadow:0 20px 50px rgba(15,61,46,.12);backdrop-filter:blur(12px);border-radius:8px}.site-header{position:sticky;top:0;z-index:10;width:min(1180px,calc(100% - 2rem));margin:1rem auto 0;padding:1rem;display:flex;gap:1rem;align-items:center;justify-content:space-between}.brand{display:grid;text-decoration:none}.brand strong,h1,h2{font-family:Iowan Old Style,Palatino Linotype,serif}.brand span,.lead,p,span,small{line-height:1.65}.site-header nav,.tools,.actions,.filters{display:flex;gap:.6rem;flex-wrap:wrap}.site-header nav a,.tools a,.button,.filters button{border:1px solid var(--line);border-radius:6px;padding:.68rem .9rem;text-decoration:none;background:rgba(255,255,255,.72);font:inherit}.button,.filters button:hover{background:linear-gradient(135deg,#1e7a5b,#4fc38a);color:#07150f;font-weight:700}.button.ghost{background:rgba(255,255,255,.72);color:var(--text)}main{width:min(1180px,calc(100% - 2rem));margin:1rem auto 0}.hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:1rem;align-items:stretch}.hero-copy{display:grid;align-content:end;gap:1rem;min-height:34rem;padding:2rem;border-radius:8px;background:linear-gradient(180deg,rgba(13,21,18,.2),rgba(13,21,18,.92));color:#f5fbf7}.kicker{margin:0 0 .75rem;color:#1e7a5b;text-transform:uppercase;letter-spacing:0}.hero .kicker{color:#b7f3cf}h1{font-size:clamp(2.8rem,7vw,5.8rem);line-height:1;margin:0}h2{font-size:clamp(1.7rem,4vw,2.6rem);line-height:1.08}.page{padding:2rem;display:grid;gap:1rem}.lead{max-width:64ch;color:var(--muted)}.panel-grid,.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.panel{display:grid;gap:.55rem;padding:1rem;text-decoration:none}.panel span,.panel p,.article-card span,.article-card small,.site-footer p{color:var(--muted)}.visual-strip{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:1rem}.visual-card{position:relative;min-height:16rem;margin:0;overflow:hidden;border-radius:8px;background:#0d1512}.visual-card-featured{grid-row:span 2;min-height:26rem}.visual-card img,.article-card img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.visual-card:hover img,.article-card:hover img{transform:scale(1.055)}.visual-card figcaption{position:absolute;left:0;right:0;bottom:0;padding:2rem .9rem .85rem;color:#f5fbf7;background:linear-gradient(180deg,transparent,rgba(13,21,18,.84));display:grid}.article-card{display:grid;overflow:hidden;text-decoration:none;transition:transform .18s ease}.article-card:hover,.panel:hover{transform:translateY(-2px)}.article-card strong,.article-card span,.article-card small{padding:0 .9rem}.article-card small{padding-bottom:.9rem;color:#1e7a5b}.article-card img{aspect-ratio:16/10}.article-body{font-size:1.08rem}.form{display:grid;gap:.8rem}.form input,.form textarea{width:100%;padding:.9rem 1rem;border:1px solid var(--line);border-radius:6px;font:inherit}.form textarea{min-height:9rem}.site-footer{width:min(1180px,calc(100% - 2rem));margin:1rem auto 2rem;padding:1.2rem}@media(max-width:860px){.site-header,.hero{grid-template-columns:1fr;display:grid}.panel-grid,.article-grid,.visual-strip{grid-template-columns:1fr}.hero-copy,.visual-card,.visual-card-featured{min-height:18rem}.page{padding:1.35rem}}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

const webJs = `
document.querySelectorAll('[data-static-form]').forEach((form)=>form.addEventListener('submit',(event)=>{event.preventDefault();const status=form.querySelector('.form-status');if(status)status.textContent='Draft saved locally for team review.';}));
document.querySelectorAll('[data-filter]').forEach((button)=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-pillar]').forEach((card)=>{card.hidden=filter!=='all'&&card.dataset.pillar!==filter;});}));
const observer='IntersectionObserver'in window?new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.15}):null;document.querySelectorAll('.reveal').forEach((node)=>observer?observer.observe(node):node.classList.add('is-visible'));
`;

const appCss = `
:root{--bg:#10251d;--deep:#0b1713;--text:#eefcf4;--muted:#a9c7b8;--line:rgba(183,243,207,.18);--surface:rgba(255,255,255,.06)}*{box-sizing:border-box}body{margin:0;color:var(--text);background:linear-gradient(135deg,rgba(139,107,79,.24),transparent 28rem),linear-gradient(180deg,#0f3d2e,var(--deep));font-family:Avenir Next,Helvetica Neue,Segoe UI,sans-serif}a{color:inherit}.app-header,.app-page,.panel,.app-nav a{border:1px solid var(--line);background:var(--surface);box-shadow:0 24px 56px rgba(4,17,12,.35);backdrop-filter:blur(14px);border-radius:8px}.app-header{width:min(1280px,calc(100% - 2rem));margin:1rem auto 0;padding:1rem;display:flex;justify-content:space-between;gap:1rem}.brand{display:grid;text-decoration:none}.brand strong,h1{font-family:Iowan Old Style,Palatino Linotype,serif}.brand span,p,span{color:var(--muted);line-height:1.65}.tools,.actions{display:flex;gap:.7rem;flex-wrap:wrap}.tools a,.button{border:1px solid var(--line);border-radius:8px;padding:.75rem 1rem;text-decoration:none;background:rgba(255,255,255,.08)}.button{background:linear-gradient(135deg,#1e7a5b,#4fc38a);color:#07150f;font-weight:800}.app-layout{width:min(1280px,calc(100% - 2rem));margin:1rem auto 3rem;display:grid;grid-template-columns:250px minmax(0,1fr);gap:1rem}.app-nav{display:grid;align-content:start;gap:.55rem;position:sticky;top:1rem}.app-nav a{text-decoration:none;padding:.8rem .9rem}.app-page{padding:2rem;display:grid;gap:1rem}.kicker{margin:0;color:#b7f3cf;text-transform:uppercase;letter-spacing:0}h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.05;margin:0}.panel-grid,.meter{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.panel{padding:1rem;text-decoration:none;display:grid;gap:.45rem;color:var(--text)}button.panel{text-align:left;font:inherit;cursor:pointer}.meter span{display:grid;gap:.1rem;padding:1rem;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.05)}.meter strong{font-size:1.8rem;color:#d9ffee}.visual-strip{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:.8rem}.visual-card{position:relative;min-height:12rem;margin:0;overflow:hidden;border:1px solid var(--line);border-radius:8px;background:#08120e}.visual-card-featured{grid-row:span 2;min-height:24rem}.visual-card img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.visual-card:hover img{transform:scale(1.055)}.visual-card figcaption{position:absolute;left:.75rem;bottom:.75rem;padding:.35rem .55rem;border-radius:8px;background:rgba(8,18,14,.74);color:#eefcf4}.role-card.is-active{border-color:#4fc38a;background:rgba(79,195,138,.18)}@media(max-width:860px){.app-header,.app-layout{grid-template-columns:1fr;display:grid}.app-nav{position:static;grid-auto-flow:column;grid-auto-columns:max-content;overflow:auto}.panel-grid,.meter,.visual-strip{grid-template-columns:1fr}.visual-card,.visual-card-featured{min-height:16rem}.app-page{padding:1.35rem}}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

const appJs = `
const label=document.querySelector('[data-session-label]');const current=localStorage.getItem('omdalat-role')||'guest';if(label)label.textContent=current+' session';document.querySelectorAll('[data-role]').forEach((button)=>{if(button.dataset.role===current)button.classList.add('is-active');button.addEventListener('click',()=>{localStorage.setItem('omdalat-role',button.dataset.role);document.querySelectorAll('[data-role]').forEach((item)=>item.classList.remove('is-active'));button.classList.add('is-active');if(label)label.textContent=button.dataset.role+' session';});});
`;

const articles = JSON.parse(await readFile(articleSeedPath, "utf8"));
const articleImageRecords = JSON.parse(await readFile(articleImageSeedPath, "utf8"));
const articleImageBySlug = new Map(
  articleImageRecords.map((record) => [
    record.article_slug,
    {
      src: record.src,
      width: record.width,
      height: record.height,
      vi: record.alt_vi,
      en: record.alt_en,
      credit: record.photographer_or_owner
    }
  ])
);
await buildWeb(articles, articleImageBySlug);
await buildApp();
console.log(`Static Pages fallback built:\n- ${webOut}\n- ${appOut}`);
