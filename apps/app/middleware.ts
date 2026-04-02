import { DEFAULT_LOCALE, localizePath, stripLocaleFromPath } from "../../packages/core";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.[^/]+$/;

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    PUBLIC_FILE.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const internalLocale = request.headers.get("x-omdalat-locale");

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const { locale, path } = stripLocaleFromPath(pathname);

  if (!locale) {
    if (internalLocale && (internalLocale === "vi" || internalLocale === "en")) {
      return NextResponse.next();
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(pathname, DEFAULT_LOCALE);
    return NextResponse.redirect(redirectUrl);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = path;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-omdalat-locale", locale);
  requestHeaders.set("x-omdalat-pathname", pathname);

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
