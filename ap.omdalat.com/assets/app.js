(async function () {
  const staticData = window.apDalatData || {};
  const body = document.body;
  const locale = body.dataset.locale || "vi";
  const root = body.dataset.root || "";
  const page = body.dataset.page || "home";
  const section = body.dataset.section || "";
  const slug = body.dataset.slug || "";
  const altPath = body.dataset.altPath || "";
  const supportKey = body.dataset.support || "";
  const app = document.getElementById("app");
  let data;
  let dict;
  const siteRootUrl = new URL(root || ".", window.location.href);
  const localeBaseUrl = new URL(locale === "en" ? "en/" : "", siteRootUrl);
  const publicSiteUrl = new URL("https://ap.omdalat.com/");

  function isExternal(href) {
    return /^(https?:|mailto:|tel:)/.test(href);
  }

  function resolveAsset(href) {
    if (!href) return "";
    if (isExternal(href)) return href;
    return new URL(href, siteRootUrl).href;
  }

  function resolvePage(href) {
    if (!href) return "#";
    if (isExternal(href)) return href;
    return new URL(href, localeBaseUrl).href;
  }

  function absoluteUrl(path) {
    if (!path) return "";
    if (isExternal(path)) return path;
    return new URL(path, siteRootUrl).href;
  }

  function publicUrl(path) {
    if (!path) return publicSiteUrl.href;
    if (isExternal(path)) return path;
    const cleaned = path
      .replace(/^\.\//, "")
      .replace(/index\.html$/, "");
    return new URL(cleaned || "/", publicSiteUrl).href;
  }

  function renderLoadError(message) {
    if (!app) return;
    app.innerHTML = `
      <div class="page-shell">
        <section class="article-page article-page--static">
          <p class="article-page__eyebrow">Ap Dalat</p>
          <h1 class="article-page__title">${message.title}</h1>
          <div class="article-page__body">
            <p>${message.body}</p>
          </div>
        </section>
      </div>
    `;
  }

  async function loadData() {
    const localePath = `content/${locale}.json`;
    const response = await fetch(absoluteUrl(localePath));
    if (!response.ok) {
      throw new Error(`Failed to load ${localePath}: ${response.status}`);
    }
    const localizedData = await response.json();
    return {
      images: staticData.images || {},
      ...localizedData,
    };
  }

  function imageUrl(key, variant = "hero") {
    const asset = data.images[key];
    if (!asset) return "";
    return resolveAsset(asset[variant] || asset.hero);
  }

  function imageAsset(key) {
    return data.images[key] || null;
  }

  function imageText(key, field = "alt") {
    const asset = imageAsset(key);
    if (!asset) return "";
    const value = asset[field];
    if (typeof value === "string") return value;
    return value?.[locale] || value?.vi || value?.en || "";
  }

  function createImage(key, variant = "hero", className = "", loading = "lazy") {
    const asset = imageAsset(key);
    const image = el("img", className);
    image.src = imageUrl(key, variant);
    image.alt = imageText(key, "alt");
    image.loading = loading;
    image.decoding = "async";
    if (asset?.width) image.width = asset.width;
    if (asset?.height) image.height = asset.height;
    return image;
  }

  function createFigure(key, variant = "hero", figureClass = "seo-figure", imageClass = "seo-figure__image") {
    const figure = el("figure", figureClass);
    figure.appendChild(createImage(key, variant, imageClass));
    const captionText = imageText(key, "caption");
    if (captionText) figure.appendChild(el("figcaption", `${figureClass}__caption`, captionText));
    return figure;
  }

  function galleryKeys(item, limit = 3) {
    const keys = [item.image, ...(item.gallery || [])].filter(Boolean);
    return [...new Set(keys)].filter((key) => imageAsset(key)).slice(0, limit);
  }

  function sectionHref(key, itemSlug = "", targetLocale = locale) {
    const sectionMap = targetLocale === "vi"
      ? {
          people: "con-nguoi",
          places: "noi-chon",
          rhythms: "nhip-song",
          work: "lam-viec",
          stories: "cau-chuyen",
          images: "hinh-anh",
          about: "ve-ap-da-lat",
        }
      : {
          people: "people",
          places: "places",
          rhythms: "rhythms",
          work: "work",
          stories: "stories",
          images: "images",
          about: "about",
        };
    const base = sectionMap[key];
    if (!base) return "#";
    return itemSlug ? `${base}/${itemSlug}/index.html` : `${base}/index.html`;
  }

  function storyPath(story, targetLocale = locale) {
    return sectionHref(story.section, story.slug, targetLocale);
  }

  function personPath(personSlug, targetLocale = locale) {
    return sectionHref("people", personSlug, targetLocale);
  }

  function placePath(placeSlug, targetLocale = locale) {
    return sectionHref("places", placeSlug, targetLocale);
  }

  function essayPath(essaySlug, targetLocale = locale) {
    return sectionHref("images", essaySlug, targetLocale);
  }

  function staticPagePath(pageKey, targetLocale = locale) {
    if (pageKey === "about") {
      return targetLocale === "vi" ? "ve-ap-da-lat/index.html" : "en/about/index.html";
    }
    if (pageKey === "om") {
      return targetLocale === "vi" ? "om-ap-da-lat/index.html" : "en/om-ap-dalat/index.html";
    }
    return targetLocale === "vi" ? "index.html" : "en/index.html";
  }

  function supportPath(key, targetLocale = locale) {
    const viMap = {
      contact: "lien-he",
      topics: "chu-de",
      search: "tim-kiem",
      faq: "faq",
    };
    const enMap = {
      contact: "contact",
      topics: "topics",
      search: "search",
      faq: "faq",
    };
    const map = targetLocale === "vi" ? viMap : enMap;
    const base = map[key];
    return targetLocale === "vi" ? `${base}/index.html` : `en/${base}/index.html`;
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function ensureMeta(selector, creator) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = creator();
      document.head.appendChild(node);
    }
    return node;
  }

  function setMeta(title, description, options = {}) {
    document.title = title;
    document.documentElement.lang = locale === "vi" ? "vi-VN" : "en";
    const desc = ensureMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      return meta;
    });
    desc.setAttribute("content", description);
    const ogTitle = ensureMeta('meta[property="og:title"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    });
    ogTitle.setAttribute("content", title);
    const ogDesc = ensureMeta('meta[property="og:description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    });
    ogDesc.setAttribute("content", description);
    const ogType = ensureMeta('meta[property="og:type"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:type");
      return meta;
    });
    ogType.setAttribute("content", options.type || "website");
    if (options.image) {
      const ogImage = ensureMeta('meta[property="og:image"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        return meta;
      });
      ogImage.setAttribute("content", absoluteUrl(options.image));
    }
    if (options.canonical) {
      const canonicalHref = publicUrl(options.canonical);
      const canonical = ensureMeta('link[rel="canonical"]', () => {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        return link;
      });
      canonical.setAttribute("href", canonicalHref);
      const ogUrl = ensureMeta('meta[property="og:url"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:url");
        return meta;
      });
      ogUrl.setAttribute("content", canonicalHref);
    }
    if (options.alternates) {
      Object.entries(options.alternates).forEach(([lang, path]) => {
        const selector = `link[rel="alternate"][hreflang="${lang}"]`;
        const alt = ensureMeta(selector, () => {
          const link = document.createElement("link");
          link.setAttribute("rel", "alternate");
          link.setAttribute("hreflang", lang);
          return link;
        });
        alt.setAttribute("href", publicUrl(path));
      });
    }
    if (options.noindex !== undefined) {
      const robots = ensureMeta('meta[name="robots"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "robots");
        return meta;
      });
      robots.setAttribute("content", options.noindex ? "noindex, follow" : "index, follow");
    }
  }

  function makeLink(item, className) {
    const link = el("a", className || "");
    link.href = resolvePage(item.href);
    link.textContent = item.label;
    return link;
  }

  function renderHeader(current) {
    const header = el("header", "site-header");
    const inner = el("div", "site-header__inner");
    const brand = el("a", "site-brand");
    brand.href = resolvePage(dict.nav[0].href);
    brand.textContent = dict.siteTitle;
    const nav = el("nav", "site-nav");
    dict.nav.forEach((item) => {
      const link = makeLink(item, item.key === current ? "is-active" : "");
      nav.appendChild(link);
    });
    const utilities = el("div", "site-utilities");
    (dict.utilityLinks || []).forEach((item) => utilities.appendChild(makeLink(item)));
    const localeSwitch = el("div", "locale-switch");
    const vi = el("a", locale === "vi" ? "is-active" : "");
    vi.href = locale === "vi" ? "#" : absoluteUrl(altPath || "index.html");
    vi.textContent = "VI";
    const en = el("a", locale === "en" ? "is-active" : "");
    en.href = locale === "en" ? "#" : absoluteUrl(altPath || "en/index.html");
    en.textContent = "EN";
    localeSwitch.append(vi, en);
    const aside = el("div", "site-header__aside");
    aside.append(utilities, localeSwitch);
    inner.append(brand, nav, aside);
    header.appendChild(inner);
    return header;
  }

  function renderFooter(includeOmLink) {
    const footer = el("footer", "site-footer");
    const inner = el("div", "site-footer__inner");
    inner.appendChild(el("p", "site-footer__note", dict.footerNote));
    const links = el("div", "site-footer__links");
    dict.footerLinks.forEach((item) => links.appendChild(makeLink(item)));
    if (includeOmLink) {
      const om = el("a", "site-footer__om");
      om.href = "https://omdalat.com";
      om.textContent = dict.bridge.cta;
      links.appendChild(om);
    }
    inner.appendChild(links);
    footer.appendChild(inner);
    return footer;
  }

  function createCard(item, type) {
    const card = el("article", `story-card story-card--${type}`);
    const image = createImage(item.image, "card", "story-card__image");
    const content = el("div", "story-card__content");
    const text = item[locale];
    const overline = el(
      "p",
      "story-card__eyebrow",
      type === "people"
        ? data.sections.people[locale].title
        : type === "places"
          ? data.sections.places[locale].title
          : type === "images"
            ? data.sections.images[locale].title
            : data.sections[item.section || type][locale].title
    );
    const title = el(
      "h3",
      "story-card__title",
      text.title || text.name
    );
    const excerpt = el(
      "p",
      "story-card__excerpt",
      text.excerpt || text.intro || text.role || ""
    );
    const link = el("a", "story-card__link");
    if (type === "people") link.href = resolvePage(sectionHref("people", item.slug));
    if (type === "places") link.href = resolvePage(sectionHref("places", item.slug));
    if (type === "images") link.href = resolvePage(sectionHref("images", item.slug));
    if (type === "story") link.href = resolvePage(sectionHref(item.section, item.slug));
    link.textContent = dict.ui.readMore;
    content.append(overline, title, excerpt, link);
    card.append(image, content);
    return card;
  }

  function createSectionBlock(title, intro, cards) {
    const sectionNode = el("section", "editorial-band");
    const head = el("div", "section-head");
    head.append(el("h2", "", title), el("p", "", intro));
    const grid = el("div", "card-grid");
    cards.forEach((card) => grid.appendChild(card));
    sectionNode.append(head, grid);
    return sectionNode;
  }

  function renderHome() {
    setMeta(dict.homeTitle, dict.homeDescription, {
      image: data.images.hero.og,
      canonical: locale === "vi" ? "/" : "en/",
      alternates: {
        "vi-VN": "/",
        en: "en/",
        "x-default": "/",
      },
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("home"));

    const hero = el("section", "hero");
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(18, 26, 24, 0.18), rgba(18, 26, 24, 0.56)), url('${imageUrl("hero", "hero")}')`;
    const heroInner = el("div", "hero__inner");
    heroInner.appendChild(el("p", "hero__eyebrow", dict.home.hero.eyebrow));
    heroInner.appendChild(el("h1", "hero__title", dict.home.hero.title));
    heroInner.appendChild(el("p", "hero__body", dict.home.hero.body));
    const actions = el("div", "hero__actions");
    actions.append(
      makeLink(dict.home.hero.primaryCta, "button button--primary"),
      makeLink(dict.home.hero.secondaryCta, "button button--secondary")
    );
    heroInner.appendChild(actions);
    hero.appendChild(heroInner);
    wrapper.appendChild(hero);

    const intro = el("section", "statement-band");
    intro.append(
      el("h2", "", dict.home.intro.title),
      el("p", "", dict.home.intro.body)
    );
    wrapper.appendChild(intro);

    const lenses = el("section", "lenses-band");
    lenses.appendChild(el("h2", "", dict.home.lensesTitle));
    const lensGrid = el("div", "lens-grid");
    (dict.home.lenses || []).forEach((item) => {
      const lens = el("a", "lens-card");
      lens.href = resolvePage(sectionHref(item.key));
      lens.innerHTML = `<h3>${data.sections[item.key][locale].title}</h3><p>${item.body}</p><span>${item.cta}</span>`;
      lensGrid.appendChild(lens);
    });
    lenses.appendChild(lensGrid);
    wrapper.appendChild(lenses);

    wrapper.appendChild(
      createSectionBlock(
        dict.home.peopleTitle,
        dict.home.peopleIntro,
        data.people.map((item) => createCard(item, "people"))
      )
    );
    wrapper.appendChild(
      createSectionBlock(
        dict.home.placesTitle,
        dict.home.placesIntro,
        data.places.map((item) => createCard(item, "places"))
      )
    );
    wrapper.appendChild(
      createSectionBlock(
        dict.home.rhythmsTitle,
        dict.home.rhythmsIntro,
        data.stories
          .filter((item) => item.section === "rhythms" || item.section === "stories")
          .map((item) => createCard(item, "story"))
      )
    );

    const workBand = el("section", "split-band");
    const workText = el("div", "split-band__text");
    workText.append(
      el("h2", "", dict.home.workTitle),
      el("p", "", dict.home.workBody),
      makeLink({ href: sectionHref("work"), label: dict.ui.workCta }, "button button--secondary")
    );
    const workImage = createFigure("farms", "hero", "split-band__figure", "split-band__image");
    workBand.append(workText, workImage);
    wrapper.appendChild(workBand);

    const imagesBand = el("section", "split-band split-band--reverse");
    const imagesText = el("div", "split-band__text");
    imagesText.append(
      el("h2", "", dict.home.imagesTitle),
      el("p", "", dict.home.imagesBody),
      makeLink({ href: sectionHref("images"), label: dict.ui.imagesCta }, "button button--secondary")
    );
    const imagesVisual = el("div", "photo-stack");
    ["view", "rooftops", "slope"].forEach((key) => {
      const tile = createImage(key, "card", "photo-stack__tile");
      imagesVisual.appendChild(tile);
    });
    imagesBand.append(imagesText, imagesVisual);
    wrapper.appendChild(imagesBand);

    const bridge = el("section", "bridge-band");
    bridge.append(
      el("h2", "", dict.bridge.title),
      el("p", "", dict.bridge.body)
    );
    const bridgeLink = el("a", "button button--primary");
    bridgeLink.href = "https://omdalat.com";
    bridgeLink.textContent = dict.bridge.cta;
    bridge.appendChild(bridgeLink);
    wrapper.appendChild(bridge);

    wrapper.appendChild(renderFooter(false));
    app.appendChild(wrapper);
  }

  function renderHub() {
    const sectionData = data.sections[section];
    const hubItems =
      section === "people"
        ? data.people.map((item) => createCard(item, "people"))
        : section === "places"
          ? data.places.map((item) => createCard(item, "places"))
          : section === "images"
            ? data.imageEssays.map((item) => createCard(item, "images"))
            : data.stories
                .filter((item) => item.section === section || (section === "stories" && item.section === "stories"))
                .map((item) => createCard(item, "story"));

    setMeta(`${sectionData[locale].title} | ${dict.siteTitle}`, sectionData[locale].thesis, {
      image: data.images[sectionData.image].og,
      canonical: sectionHref(section, "", locale),
      alternates: {
        "vi-VN": sectionHref(section, "", "vi"),
        en: sectionHref(section, "", "en"),
        "x-default": sectionHref(section, "", "vi"),
      },
    });

    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader(section));
    const hero = el("section", "page-hero");
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(244, 246, 242, 0.55), rgba(244, 246, 242, 0.88)), url('${imageUrl(sectionData.image, "hero")}')`;
    hero.append(
      el("p", "page-hero__eyebrow", dict.siteTitle),
      el("h1", "page-hero__title", sectionData[locale].title),
      el("p", "page-hero__body", sectionData[locale].thesis)
    );
    wrapper.appendChild(hero);
    const grid = el("section", "editorial-band");
    const cards = el("div", "card-grid");
    hubItems.forEach((item) => cards.appendChild(item));
    grid.appendChild(cards);
    wrapper.appendChild(grid);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderInlineGallery(item) {
    const keys = galleryKeys(item, 4);
    if (keys.length <= 1) return el("div");
    const gallery = el("section", "inline-image-gallery");
    keys.forEach((key, index) => {
      gallery.appendChild(
        createFigure(
          key,
          index === 0 ? "hero" : "card",
          "inline-image-gallery__item",
          "inline-image-gallery__image"
        )
      );
    });
    return gallery;
  }

  function renderStoryPage() {
    const story = data.stories.find((item) => item.slug === slug);
    const text = story[locale];
    setMeta(`${text.title} | ${dict.siteTitle}`, text.excerpt, {
      image: data.images[story.image].og,
      canonical: storyPath(story, locale),
      alternates: {
        "vi-VN": storyPath(story, "vi"),
        en: storyPath(story, "en"),
        "x-default": storyPath(story, "vi"),
      },
      type: "article",
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader(story.section));
    const article = el("article", "article-page");
    article.append(
      el("p", "article-page__eyebrow", data.sections[story.section][locale].title),
      el("h1", "article-page__title", text.title),
      el("p", "article-page__standfirst", text.standfirst)
    );
    article.appendChild(createFigure(story.image, "hero", "article-page__hero"));
    const bodyNode = el("div", "article-page__body");
    text.body.forEach((paragraph) => bodyNode.appendChild(el("p", "", paragraph)));
    article.appendChild(bodyNode);
    article.appendChild(renderInlineGallery(story));
    wrapper.appendChild(article);
    wrapper.appendChild(
      createSectionBlock(
        dict.ui.relatedTitle,
        dict.ui.relatedIntro,
        data.stories
          .filter((item) => item.slug !== slug)
          .slice(0, 2)
          .map((item) => createCard(item, "story"))
      )
    );
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderPersonPage() {
    const person = data.people.find((item) => item.slug === slug);
    const text = person[locale];
    setMeta(`${text.name} | ${dict.siteTitle}`, text.excerpt, {
      image: data.images[person.image].og,
      canonical: personPath(slug, locale),
      alternates: {
        "vi-VN": personPath(slug, "vi"),
        en: personPath(slug, "en"),
        "x-default": personPath(slug, "vi"),
      },
      type: "article",
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("people"));
    const article = el("article", "article-page");
    article.append(
      el("p", "article-page__eyebrow", data.sections.people[locale].title),
      el("h1", "article-page__title", text.name),
      el("p", "article-page__standfirst", text.role)
    );
    article.appendChild(createFigure(person.image, "hero", "article-page__hero"));
    const bodyNode = el("div", "article-page__body");
    bodyNode.appendChild(el("p", "", text.excerpt));
    text.story.forEach((paragraph) => bodyNode.appendChild(el("p", "", paragraph)));
    article.appendChild(bodyNode);
    article.appendChild(renderInlineGallery(person));
    wrapper.appendChild(article);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderPlacePage() {
    const place = data.places.find((item) => item.slug === slug);
    const text = place[locale];
    setMeta(`${text.title} | ${dict.siteTitle}`, text.excerpt, {
      image: data.images[place.image].og,
      canonical: placePath(slug, locale),
      alternates: {
        "vi-VN": placePath(slug, "vi"),
        en: placePath(slug, "en"),
        "x-default": placePath(slug, "vi"),
      },
      type: "article",
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("places"));
    const article = el("article", "article-page");
    article.append(
      el("p", "article-page__eyebrow", data.sections.places[locale].title),
      el("h1", "article-page__title", text.title),
      el("p", "article-page__standfirst", `${text.type} • ${text.area}`)
    );
    article.appendChild(createFigure(place.image, "hero", "article-page__hero"));
    const bodyNode = el("div", "article-page__body");
    bodyNode.appendChild(el("p", "", text.excerpt));
    text.body.forEach((paragraph) => bodyNode.appendChild(el("p", "", paragraph)));
    article.appendChild(bodyNode);
    article.appendChild(renderInlineGallery(place));
    wrapper.appendChild(article);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderImageEssay() {
    const essay = data.imageEssays.find((item) => item.slug === slug);
    const text = essay[locale];
    setMeta(`${text.title} | ${dict.siteTitle}`, text.intro, {
      image: data.images[essay.image].og,
      canonical: essayPath(slug, locale),
      alternates: {
        "vi-VN": essayPath(slug, "vi"),
        en: essayPath(slug, "en"),
        "x-default": essayPath(slug, "vi"),
      },
      type: "article",
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("images"));
    const article = el("article", "article-page");
    article.append(
      el("p", "article-page__eyebrow", data.sections.images[locale].title),
      el("h1", "article-page__title", text.title),
      el("p", "article-page__standfirst", text.intro)
    );
    const gallery = el("div", "essay-gallery");
    galleryKeys(essay, 5).forEach((key, index) => {
      const item = el("figure", "essay-gallery__item");
      const image = createImage(key, "hero", "essay-gallery__image", index === 0 ? "eager" : "lazy");
      const caption = el("figcaption", "essay-gallery__caption", text.captions[index] || imageText(key, "caption"));
      item.append(image, caption);
      gallery.appendChild(item);
    });
    article.appendChild(gallery);
    wrapper.appendChild(article);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderAbout() {
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("about"));
    const content = data.staticPages.about;
    setMeta(
      `${content.metaTitle} | ${dict.siteTitle}`,
      content.metaDescription,
      {
        image: data.images.hero.og,
        canonical: staticPagePath("about", locale),
        alternates: {
          "vi-VN": staticPagePath("about", "vi"),
          en: staticPagePath("about", "en"),
          "x-default": staticPagePath("about", "vi"),
        },
      }
    );
    const pageNode = el("section", "article-page article-page--static");
    pageNode.append(
      el("p", "article-page__eyebrow", content.eyebrow),
      el("h1", "article-page__title", content.title)
    );
    const bodyNode = el("div", "article-page__body");
    content.body.forEach((paragraph) => bodyNode.appendChild(el("p", "", paragraph)));
    pageNode.appendChild(bodyNode);
    wrapper.appendChild(pageNode);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderOmPage() {
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader("about"));
    const content = data.staticPages.om;
    setMeta(
      `${content.metaTitle} | ${dict.siteTitle}`,
      content.metaDescription,
      {
        image: data.images.rooftops.og,
        canonical: staticPagePath("om", locale),
        alternates: {
          "vi-VN": staticPagePath("om", "vi"),
          en: staticPagePath("om", "en"),
          "x-default": staticPagePath("om", "vi"),
        },
      }
    );
    const pageNode = el("section", "article-page article-page--static");
    pageNode.append(
      el("p", "article-page__eyebrow", content.eyebrow),
      el("h1", "article-page__title", content.title)
    );
    const bodyNode = el("div", "article-page__body");
    content.body.forEach((paragraph) => bodyNode.appendChild(el("p", "", paragraph)));
    const linkLine = el("p", "");
    const link = el("a", "inline-link", content.linkLabel);
    link.href = "https://omdalat.com";
    linkLine.appendChild(link);
    bodyNode.appendChild(linkLine);
    pageNode.appendChild(bodyNode);
    wrapper.appendChild(pageNode);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  function renderSupportPage() {
    const content = data.supportPages[supportKey][locale];
    setMeta(`${content.title} | ${dict.siteTitle}`, content.description, {
      image: data.images.panorama.og,
      canonical: supportPath(supportKey, locale),
      alternates: {
        "vi-VN": supportPath(supportKey, "vi"),
        en: supportPath(supportKey, "en"),
        "x-default": supportPath(supportKey, "vi"),
      },
      noindex: supportKey === "search",
    });
    const wrapper = el("div", "page-shell");
    wrapper.appendChild(renderHeader(""));
    const pageNode = el("section", "article-page article-page--static");
    pageNode.append(
      el("p", "article-page__eyebrow", dict.siteTitle),
      el("h1", "article-page__title", content.title)
    );
    const bodyNode = el("div", "article-page__body");
    bodyNode.appendChild(el("p", "", content.description));
    content.body.forEach((item) => {
      bodyNode.appendChild(el("h2", "support-heading", item.heading));
      bodyNode.appendChild(el("p", "", item.text));
    });
    pageNode.appendChild(bodyNode);
    wrapper.appendChild(pageNode);
    wrapper.appendChild(renderFooter(true));
    app.appendChild(wrapper);
  }

  try {
    data = await loadData();
    dict = data.locales[locale];
  } catch (error) {
    console.error(error);
    renderLoadError(
      {
        title: locale === "vi" ? "Chưa tải được nội dung" : "Unable to load content",
        body: locale === "vi"
          ? "Nội dung locale chưa sẵn sàng hoặc đường dẫn hiện tại chưa đọc được file JSON."
          : "The locale content is not ready yet or the current path could not read the JSON file."
      }
    );
    return;
  }

  if (page === "home") renderHome();
  if (page === "hub") renderHub();
  if (page === "story") renderStoryPage();
  if (page === "person") renderPersonPage();
  if (page === "place") renderPlacePage();
  if (page === "essay") renderImageEssay();
  if (page === "about") renderAbout();
  if (page === "om") renderOmPage();
  if (page === "support") renderSupportPage();
})();
