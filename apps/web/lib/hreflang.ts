import { absoluteUrl } from "./canonical";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, localizePath } from "../../../packages/core";

export function buildHreflangScaffold(path: string) {
  const localizedEntries = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, absoluteUrl(localizePath(path, locale))])
  );

  return {
    ...localizedEntries,
    "x-default": absoluteUrl(localizePath(path, DEFAULT_LOCALE)),
  };
}
