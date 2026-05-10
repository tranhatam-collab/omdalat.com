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
