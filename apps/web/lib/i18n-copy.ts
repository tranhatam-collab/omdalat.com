import type { OmdalatLocale } from "../../../packages/core";

export type LocalizedText = {
  vi: string;
  en: string;
};

export function pickLocalized(locale: OmdalatLocale, value: LocalizedText | string) {
  if (typeof value === "string") {
    return value;
  }

  return locale === "vi" ? value.vi : value.en;
}
