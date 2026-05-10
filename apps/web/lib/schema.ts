import { absoluteUrl } from "./canonical";
import { getLocaleDescriptor, getPublicLocaleDescriptors, localizePath, type OmdalatLocale } from "../../../packages/core";
import { defaultRuntimeOgImage } from "./visuals";

type WebPageSchemaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Om Dalat",
    alternateName: ["Ôm Đà Lạt"],
    url: absoluteUrl("/"),
    description:
      "A real-life living system in Da Lat where people can stay, work, learn from experience, and build long-term value."
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Om Dalat",
    alternateName: ["Ôm Đà Lạt"],
    url: absoluteUrl("/"),
    description: "A real-life living system in Da Lat.",
    inLanguage: getPublicLocaleDescriptors().map((descriptor) => descriptor.hreflang)
  };
}

export function buildWebPageSchema({ title, description, path }: WebPageSchemaInput) {
  const pagePath = path.startsWith("/") ? path : `/${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(pagePath),
    isPartOf: {
      "@type": "WebSite",
      name: "Om Dalat",
      url: absoluteUrl(localizePath("/"))
    }
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  locale: OmdalatLocale;
  articleSection: string;
  keywords: string[];
  articleBody: string;
  images?: string[];
};

export function buildArticleSchema({
  title,
  description,
  path,
  locale,
  articleSection,
  keywords,
  articleBody,
  images = [defaultRuntimeOgImage.src]
}: ArticleSchemaInput) {
  const localeDescriptor = getLocaleDescriptor(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    articleSection,
    keywords,
    articleBody,
    inLanguage: localeDescriptor.htmlLang,
    mainEntityOfPage: absoluteUrl(localizePath(path, locale)),
    image: images.map((image) => absoluteUrl(image)),
    author: {
      "@type": "Organization",
      name: "Om Dalat",
      url: absoluteUrl("/")
    },
    publisher: {
      "@type": "Organization",
      name: "Om Dalat",
      url: absoluteUrl("/")
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Om Dalat",
      url: absoluteUrl("/")
    }
  };
}
