import {
  DEFAULT_LOCALE,
  getLocaleDescriptor,
  getPublicLocaleDescriptors,
  isSupportedLocale,
  stripLocaleFromPath,
  switchLocale,
  type PublicOmdalatLocale
} from "../../../packages/core";
import { headers } from "next/headers";

export async function getRequestLocale() {
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-omdalat-locale");
  return localeHeader && isSupportedLocale(localeHeader) ? localeHeader : DEFAULT_LOCALE;
}

export async function getLocaleSwitchLinks() {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-omdalat-pathname") ?? "/";
  const detectedLocale = stripLocaleFromPath(pathname).locale;
  const locale: PublicOmdalatLocale = detectedLocale ?? DEFAULT_LOCALE;
  const switchLinks = getPublicLocaleDescriptors().map((descriptor) => ({
    code: descriptor.code,
    href: switchLocale(pathname, descriptor.code),
    label: descriptor.label,
    nativeLabel: descriptor.nativeLabel,
    hreflang: descriptor.hreflang,
    isActive: descriptor.code === locale
  }));
  const activeDescriptor = getLocaleDescriptor(locale);

  return {
    locale,
    currentLocale: activeDescriptor,
    switchLinks,
    viHref: switchLocale(pathname, "vi"),
    enHref: switchLocale(pathname, "en")
  };
}
