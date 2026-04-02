export const SUPPORTED_LOCALES = ["vi", "en"] as const;

export type OmdalatLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: OmdalatLocale = "vi";

const localeSet = new Set<string>(SUPPORTED_LOCALES);

function normalizePath(path: string) {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function isSupportedLocale(value: string): value is OmdalatLocale {
  return localeSet.has(value);
}

export function stripLocaleFromPath(path: string): { locale: OmdalatLocale | null; path: string } {
  const normalizedPath = normalizePath(path);
  const [_, maybeLocale, ...rest] = normalizedPath.split("/");

  if (maybeLocale && isSupportedLocale(maybeLocale)) {
    const unlocalizedPath = rest.length > 0 ? `/${rest.join("/")}` : "/";
    return { locale: maybeLocale, path: normalizePath(unlocalizedPath) };
  }

  return { locale: null, path: normalizedPath };
}

export function localizePath(path: string, locale: OmdalatLocale = DEFAULT_LOCALE) {
  const { path: unlocalizedPath } = stripLocaleFromPath(path);
  return unlocalizedPath === "/" ? `/${locale}` : `/${locale}${unlocalizedPath}`;
}

export function switchLocale(path: string, locale: OmdalatLocale) {
  const { path: unlocalizedPath } = stripLocaleFromPath(path);
  return localizePath(unlocalizedPath, locale);
}
