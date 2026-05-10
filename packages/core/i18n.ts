export const PUBLIC_LOCALES = ["vi", "en"] as const;
export const PLANNED_LOCALES = ["fr", "de", "ja", "ko", "zh-cn", "zh-tw", "es", "ru"] as const;
export const SUPPORTED_LOCALES = PUBLIC_LOCALES;
export const ALL_LOCALES = [...PUBLIC_LOCALES, ...PLANNED_LOCALES] as const;

export type PublicOmdalatLocale = (typeof PUBLIC_LOCALES)[number];
export type PlannedOmdalatLocale = (typeof PLANNED_LOCALES)[number];
export type OmdalatLocale = (typeof ALL_LOCALES)[number];

export type OmdalatLocaleDescriptor = {
  code: OmdalatLocale;
  label: string;
  nativeLabel: string;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  isPublic: boolean;
  isSource: boolean;
  fallback: PublicOmdalatLocale;
};

export const DEFAULT_LOCALE: PublicOmdalatLocale = "vi";

export const LOCALE_DESCRIPTORS: readonly OmdalatLocaleDescriptor[] = [
  {
    code: "vi",
    label: "Vietnamese",
    nativeLabel: "Tiếng Việt",
    htmlLang: "vi",
    hreflang: "vi-VN",
    ogLocale: "vi_VN",
    isPublic: true,
    isSource: true,
    fallback: "vi"
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_US",
    isPublic: true,
    isSource: false,
    fallback: "en"
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    htmlLang: "fr",
    hreflang: "fr",
    ogLocale: "fr_FR",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    htmlLang: "de",
    hreflang: "de",
    ogLocale: "de_DE",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "ja",
    label: "Japanese",
    nativeLabel: "日本語",
    htmlLang: "ja",
    hreflang: "ja",
    ogLocale: "ja_JP",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "ko",
    label: "Korean",
    nativeLabel: "한국어",
    htmlLang: "ko",
    hreflang: "ko",
    ogLocale: "ko_KR",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "zh-cn",
    label: "Simplified Chinese",
    nativeLabel: "简体中文",
    htmlLang: "zh-CN",
    hreflang: "zh-CN",
    ogLocale: "zh_CN",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "zh-tw",
    label: "Traditional Chinese",
    nativeLabel: "繁體中文",
    htmlLang: "zh-TW",
    hreflang: "zh-TW",
    ogLocale: "zh_TW",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    htmlLang: "es",
    hreflang: "es",
    ogLocale: "es_ES",
    isPublic: false,
    isSource: false,
    fallback: "en"
  },
  {
    code: "ru",
    label: "Russian",
    nativeLabel: "Русский",
    htmlLang: "ru",
    hreflang: "ru",
    ogLocale: "ru_RU",
    isPublic: false,
    isSource: false,
    fallback: "en"
  }
] as const;

const publicLocaleSet = new Set<string>(PUBLIC_LOCALES);
const knownLocaleSet = new Set<string>(ALL_LOCALES);
const localeDescriptorMap = new Map<OmdalatLocale, OmdalatLocaleDescriptor>(
  LOCALE_DESCRIPTORS.map((descriptor) => [descriptor.code, descriptor])
);

function normalizePath(path: string) {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

function splitPathSuffix(path: string) {
  const queryIndex = path.indexOf("?");
  const hashIndex = path.indexOf("#");
  const cutIndex =
    queryIndex === -1
      ? hashIndex
      : hashIndex === -1
        ? queryIndex
        : Math.min(queryIndex, hashIndex);

  if (cutIndex === -1) {
    return { pathname: path, suffix: "" };
  }

  return {
    pathname: path.slice(0, cutIndex),
    suffix: path.slice(cutIndex)
  };
}

export function isSupportedLocale(value: string): value is PublicOmdalatLocale {
  return publicLocaleSet.has(value);
}

export function isKnownLocale(value: string): value is OmdalatLocale {
  return knownLocaleSet.has(value);
}

export function getLocaleDescriptor(locale: OmdalatLocale) {
  const descriptor = localeDescriptorMap.get(locale);

  if (!descriptor) {
    throw new Error(`Unknown Om Dalat locale: ${locale}`);
  }

  return descriptor;
}

export function getPublicLocaleDescriptors() {
  return LOCALE_DESCRIPTORS.filter(
    (descriptor): descriptor is OmdalatLocaleDescriptor & { code: PublicOmdalatLocale } => descriptor.isPublic
  );
}

export function getPlannedLocaleDescriptors() {
  return LOCALE_DESCRIPTORS.filter(
    (descriptor): descriptor is OmdalatLocaleDescriptor & { code: PlannedOmdalatLocale } => !descriptor.isPublic
  );
}

export function resolveLocaleFallback(locale: OmdalatLocale): PublicOmdalatLocale {
  return getLocaleDescriptor(locale).fallback;
}

export function stripLocaleFromPath(path: string): { locale: PublicOmdalatLocale | null; path: string } {
  const normalizedPath = normalizePath(path);
  const [_, maybeLocale, ...rest] = normalizedPath.split("/");

  if (maybeLocale && isSupportedLocale(maybeLocale)) {
    const unlocalizedPath = rest.length > 0 ? `/${rest.join("/")}` : "/";
    return { locale: maybeLocale, path: normalizePath(unlocalizedPath) };
  }

  return { locale: null, path: normalizedPath };
}

export function localizePath(path: string, locale: OmdalatLocale = DEFAULT_LOCALE) {
  const { pathname, suffix } = splitPathSuffix(path);
  const { path: unlocalizedPath } = stripLocaleFromPath(pathname || "/");
  const localized = unlocalizedPath === "/" ? `/${locale}` : `/${locale}${unlocalizedPath}`;
  return `${localized}${suffix}`;
}

export function switchLocale(path: string, locale: OmdalatLocale) {
  const { pathname, suffix } = splitPathSuffix(path);
  const { path: unlocalizedPath } = stripLocaleFromPath(pathname || "/");
  return `${localizePath(unlocalizedPath, locale)}${suffix}`;
}
