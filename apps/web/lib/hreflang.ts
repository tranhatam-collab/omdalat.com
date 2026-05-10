import { absoluteUrl } from "./canonical";
import { DEFAULT_LOCALE, getPublicLocaleDescriptors, localizePath } from "../../../packages/core";

export function buildHreflangScaffold(path: string) {
  const localizedEntries = Object.fromEntries(
    getPublicLocaleDescriptors().map((descriptor) => [
      descriptor.hreflang,
      absoluteUrl(localizePath(path, descriptor.code))
    ])
  );

  return {
    ...localizedEntries,
    "x-default": absoluteUrl(localizePath(path, DEFAULT_LOCALE)),
  };
}
