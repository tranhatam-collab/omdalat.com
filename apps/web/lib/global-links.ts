import { DEFAULT_LOCALE, localizePath, type OmdalatLocale } from "../../../packages/core";

export function getDocsHomeUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/docs", locale);
}

export function getDocsGettingStartedUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/docs/getting-started", locale);
}

export function getDocsMembersUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/member/welcome", locale);
}

export function getDocsPackagesUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/stay", locale);
}

export function getAppDashboardUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/member", locale);
}

export function getAppProofsUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/articles", locale);
}

export function getFreeMemberEntryUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/member", locale);
}

export function getPackageOverviewUrl(locale: OmdalatLocale = DEFAULT_LOCALE) {
  return localizePath("/stay", locale);
}
