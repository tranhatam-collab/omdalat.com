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

function resolveHeaderPathname(value: string | null) {
  if (!value) {
    return "/";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      return new URL(value).pathname;
    } catch {
      return "/";
    }
  }

  return value;
}

export async function getRequestLocale() {
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-omdalat-locale");
  if (localeHeader && isSupportedLocale(localeHeader)) {
    return localeHeader;
  }

  const pathname = resolveHeaderPathname(
    requestHeaders.get("x-omdalat-pathname") ?? requestHeaders.get("next-url")
  );
  const detectedLocale = stripLocaleFromPath(pathname).locale;
  return detectedLocale ?? DEFAULT_LOCALE;
}

export async function getLocaleSwitchLinks() {
  const requestHeaders = await headers();
  const pathname = resolveHeaderPathname(
    requestHeaders.get("x-omdalat-pathname") ?? requestHeaders.get("next-url")
  );
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

export async function getCurrentLocalizedPathname() {
  const requestHeaders = await headers();
  const pathname = resolveHeaderPathname(
    requestHeaders.get("x-omdalat-pathname") ?? requestHeaders.get("next-url")
  );
  return pathname;
}
