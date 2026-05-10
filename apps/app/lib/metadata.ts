import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getLocaleDescriptor,
  getPublicLocaleDescriptors,
  isSupportedLocale,
  localizePath,
  resolveLocaleFallback,
  siteConfig,
  type OmdalatLocale
} from "../../../packages/core";
import type { LocalizedText } from "./i18n-copy";
import { pickLocalized } from "./i18n-copy";
import { getRequestLocale } from "./locale";
import { appOgImage } from "./visuals";

type AppMetadataInput = {
  title: LocalizedText | string;
  description: LocalizedText | string;
  path: string;
  locale?: OmdalatLocale;
};

function resolveMetadataLocale(locale?: OmdalatLocale) {
  return locale ?? DEFAULT_LOCALE;
}

function resolveCanonicalLocale(locale: OmdalatLocale) {
  return isSupportedLocale(locale) ? locale : resolveLocaleFallback(locale);
}

export function buildAppPageMetadata({ title, description, path, locale }: AppMetadataInput): Metadata {
  const resolvedLocale = resolveMetadataLocale(locale);
  const canonicalLocale = resolveCanonicalLocale(resolvedLocale);
  const canonicalPath = localizePath(path, canonicalLocale);
  const localeDescriptor = getLocaleDescriptor(resolvedLocale);
  const resolvedTitle = pickLocalized(resolvedLocale, title);
  const resolvedDescription = pickLocalized(resolvedLocale, description);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: "Om Dalat App",
    metadataBase: new URL(siteConfig.appOrigin),
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...Object.fromEntries(
          getPublicLocaleDescriptors().map((descriptor) => [descriptor.hreflang, localizePath(path, descriptor.code)])
        ),
        "x-default": localizePath(path, DEFAULT_LOCALE)
      }
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalPath,
      siteName: "Om Dalat App",
      type: "website",
      locale: localeDescriptor.ogLocale,
      alternateLocale: getPublicLocaleDescriptors()
        .filter((descriptor) => descriptor.code !== canonicalLocale)
        .map((descriptor) => descriptor.ogLocale),
      images: [
        {
          url: appOgImage.src,
          width: appOgImage.width,
          height: appOgImage.height,
          alt: pickLocalized(resolvedLocale, appOgImage.alt)
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [appOgImage.src]
    },
    robots: {
      index: false,
      follow: false
    }
  };
}

export async function buildCurrentLocaleAppMetadata(input: Omit<AppMetadataInput, "locale">) {
  const locale = await getRequestLocale();
  return buildAppPageMetadata({ ...input, locale });
}
