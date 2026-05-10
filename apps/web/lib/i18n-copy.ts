import { resolveLocaleFallback, type OmdalatLocale } from "../../../packages/core";

export type LocalizedText = {
  vi: string;
  en: string;
} & Partial<Record<OmdalatLocale, string>>;

export function pickLocalized(locale: OmdalatLocale, value: LocalizedText | string) {
  if (typeof value === "string") {
    return value;
  }

  const directMatch = value[locale];
  if (typeof directMatch === "string" && directMatch.length > 0) {
    return directMatch;
  }

  const fallbackLocale = resolveLocaleFallback(locale);
  const fallbackMatch = value[fallbackLocale];
  if (typeof fallbackMatch === "string" && fallbackMatch.length > 0) {
    return fallbackMatch;
  }

  return value.vi || value.en || "";
}
