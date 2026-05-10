import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getLocaleDescriptor,
  getPublicLocaleDescriptors,
  isSupportedLocale,
  localizePath,
  resolveLocaleFallback,
  type OmdalatLocale
} from "../../../packages/core";
import type { LocalizedText } from "./i18n-copy";
import { pickLocalized } from "./i18n-copy";
import { getRequestLocale } from "./locale";
import { absoluteUrl } from "./canonical";
import { defaultRuntimeOgImage, type RuntimeVisual } from "./visuals";

type MetadataInput = {
  title: LocalizedText | string;
  description: LocalizedText | string;
  path: string;
  noindex?: boolean;
  locale?: OmdalatLocale;
  image?: RuntimeVisual | string;
};

function resolveMetadataLocale(locale?: OmdalatLocale) {
  return locale ?? DEFAULT_LOCALE;
}

function resolveCanonicalLocale(locale?: OmdalatLocale) {
  const resolvedLocale = resolveMetadataLocale(locale);
  return isSupportedLocale(resolvedLocale) ? resolvedLocale : resolveLocaleFallback(resolvedLocale);
}

export function buildPageMetadata({ title, description, path, noindex = false, locale, image }: MetadataInput): Metadata {
  const resolvedLocale = resolveMetadataLocale(locale);
  const canonicalLocale = resolveCanonicalLocale(resolvedLocale);
  const localeDescriptor = getLocaleDescriptor(resolvedLocale);
  const resolvedTitle = pickLocalized(resolvedLocale, title);
  const resolvedDescription = pickLocalized(resolvedLocale, description);
  const canonicalPath = localizePath(path, canonicalLocale);
  const metadataImage = typeof image === "string" ? defaultRuntimeOgImage : image ?? defaultRuntimeOgImage;
  const metadataImageUrl = typeof image === "string" ? image : metadataImage.src;
  const metadataImageAlt =
    typeof image === "string"
      ? pickLocalized(resolvedLocale, { vi: "Ôm Đà Lạt", en: "Om Dalat" })
      : pickLocalized(resolvedLocale, metadataImage.alt);
  const alternates = Object.fromEntries(
    getPublicLocaleDescriptors().map((descriptor) => [
      descriptor.hreflang,
      absoluteUrl(localizePath(path, descriptor.code))
    ])
  );

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: "Om Dalat",
    metadataBase: new URL(absoluteUrl("/")),
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        ...alternates,
        "x-default": absoluteUrl(localizePath(path, DEFAULT_LOCALE))
      }
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: absoluteUrl(canonicalPath),
      siteName: "Om Dalat",
      type: "website",
      locale: localeDescriptor.ogLocale,
      alternateLocale: getPublicLocaleDescriptors()
        .filter((descriptor) => descriptor.code !== canonicalLocale)
        .map((descriptor) => descriptor.ogLocale),
      images: [
        {
          url: absoluteUrl(metadataImageUrl),
          width: typeof image === "string" ? 1200 : metadataImage.width,
          height: typeof image === "string" ? 630 : metadataImage.height,
          alt: metadataImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [absoluteUrl(metadataImageUrl)]
    },
    icons: {
      icon: "/icons/icon.svg"
    },
    robots: noindex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  };
}

export async function buildCurrentLocalePageMetadata(input: Omit<MetadataInput, "locale">) {
  const locale = await getRequestLocale();
  return buildPageMetadata({ ...input, locale });
}

export function buildDefaultWebMetadata(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return buildPageMetadata({
    title: {
      vi: "Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt",
      en: "Om Dalat | Live and work in Dalat"
    },
    description: {
      vi: "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây một nhịp sống có thể đi đường dài.",
      en: "Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build a life that lasts."
    },
    path: "/",
    locale
  });
}
