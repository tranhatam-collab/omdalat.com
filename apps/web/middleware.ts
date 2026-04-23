import { NextRequest, NextResponse } from "next/server";

const LOCALES = new Set(["vi", "en"]);
const LEGACY_APP_HOSTS = new Set(["ap.omdalat.com", "www.ap.omdalat.com"]);
const APP_CANONICAL_HOST = "app.omdalat.com";

const LEGACY_ROUTE_MAP: Record<string, string> = {
  "what-is-omdalat": "/about",
  "free-member": "/join",
  packages: "/stay",
  vision: "/about",
  "creative-economy": "/learning",
  trust: "/community",
  proofs: "/articles",
  events: "/community",
  places: "/stay",
  hosts: "/community",
  experts: "/work",
  communities: "/community",
  "work-and-opportunity": "/work",
  "city-signals": "/community",
  requests: "/work",
  help: "/docs",
  vitals: "/about",
  "how-it-works": "/docs/how-it-works",
  faq: "/docs/faq"
};

const LEGACY_DETAIL_PREFIX = new Set(["events", "places", "hosts", "experts", "communities", "proofs"]);

function redirectTo(request: NextRequest, location: string) {
  const url = request.nextUrl.clone();
  url.pathname = location;
  url.search = "";
  return NextResponse.redirect(url, 308);
}

function getRequestHost(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim().toLowerCase() ??
    request.headers.get("host")?.split(",")[0]?.trim().toLowerCase() ??
    ""
  );
}

function redirectLegacyAppHost(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.hostname = APP_CANONICAL_HOST;
  url.protocol = "https:";
  return NextResponse.redirect(url, 308);
}

function continueWithLocaleHeaders(request: NextRequest, locale: "vi" | "en", pathname: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-omdalat-locale", locale);
  requestHeaders.set("x-omdalat-pathname", pathname);
  requestHeaders.delete("x-omdalat-rewritten");
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

function rewriteWithLocaleHeaders(
  request: NextRequest,
  locale: "vi" | "en",
  localizedPathname: string,
  internalPathname: string
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-omdalat-locale", locale);
  requestHeaders.set("x-omdalat-pathname", localizedPathname);
  requestHeaders.set("x-omdalat-rewritten", "1");

  const url = request.nextUrl.clone();
  url.pathname = internalPathname;

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders
    }
  });
}

export function middleware(request: NextRequest) {
  const requestHost = getRequestHost(request);
  if (LEGACY_APP_HOSTS.has(requestHost)) {
    return redirectLegacyAppHost(request);
  }

  const rewrittenFlag = request.headers.get("x-omdalat-rewritten");
  const rewrittenLocale = request.headers.get("x-omdalat-locale");
  const rewrittenPathname = request.headers.get("x-omdalat-pathname");

  if (
    rewrittenFlag === "1" &&
    (rewrittenLocale === "vi" || rewrittenLocale === "en")
  ) {
    return continueWithLocaleHeaders(
      request,
      rewrittenLocale,
      rewrittenPathname && rewrittenPathname.startsWith("/") ? rewrittenPathname : `/${rewrittenLocale}`
    );
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return redirectTo(request, "/vi");
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.has(segments[0]);
  const locale = hasLocale ? segments[0] : "vi";
  const startIndex = hasLocale ? 1 : 0;
  const route = segments[startIndex] ?? "";

  if (!route) {
    if (!hasLocale) {
      return redirectTo(request, `/${locale}`);
    }
    return rewriteWithLocaleHeaders(request, locale as "vi" | "en", pathname, "/");
  }

  const mapped = LEGACY_ROUTE_MAP[route];
  if (mapped) {
    return redirectTo(request, `/${locale}${mapped}`);
  }

  if (segments.length > startIndex + 1 && LEGACY_DETAIL_PREFIX.has(route)) {
    const fallback = LEGACY_ROUTE_MAP[route] ?? "/community";
    return redirectTo(request, `/${locale}${fallback}`);
  }

  if (!hasLocale) {
    return redirectTo(request, `/${locale}/${segments.join("/")}`);
  }

  const internalPath = `/${segments.slice(1).join("/")}`;
  return rewriteWithLocaleHeaders(
    request,
    locale as "vi" | "en",
    pathname,
    internalPath === "/" ? "/" : internalPath.replace(/\/+$/, "")
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|robots.txt|sitemap.xml|api|.*\\.[^/]+$).*)"]
};
