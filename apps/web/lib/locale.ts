import { DEFAULT_LOCALE, isSupportedLocale, stripLocaleFromPath, switchLocale, type OmdalatLocale } from "../../../packages/core";
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
  const locale: OmdalatLocale = detectedLocale ?? DEFAULT_LOCALE;

  return {
    locale,
    viHref: switchLocale(pathname, "vi"),
    enHref: switchLocale(pathname, "en")
  };
}

export async function getCurrentLocalizedPathname() {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-omdalat-pathname") ?? "/";
  return pathname;
}
