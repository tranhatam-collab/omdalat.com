import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, localizePath, stripLocaleFromPath } from "../../packages/core";
import {
  MEMBER_SESSION_COOKIE_NAME,
  gatePathForAppRequirement,
  getAppRouteRequirement,
  passesAppRequirement,
  resolveMemberSessionState
} from "./lib/member-session";

const PUBLIC_FILE = /\.[^/]+$/;
const NOINDEX_VALUE = "noindex, nofollow";
const LEGACY_APP_HOSTS = new Set(["www.app.omdalat.com", "ap.omdalat.com", "www.ap.omdalat.com"]);
const CANONICAL_APP_HOST = "app.omdalat.com";

function shouldBypass(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    PUBLIC_FILE.test(pathname)
  );
}

function getSafeOrigin(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = forwardedProto || request.nextUrl.protocol.replace(/:$/, "");

  if (forwardedHost) {
    return `${protocol}://${forwardedHost}`;
  }

  if (process.env.NODE_ENV !== "production" && request.nextUrl.hostname === "localhost") {
    const devPort = request.nextUrl.port ? `:${request.nextUrl.port}` : "";
    return `http://127.0.0.1${devPort}`;
  }

  return request.nextUrl.origin;
}

function buildSafeUrl(request: NextRequest, pathWithQuery: string) {
  return new URL(pathWithQuery, getSafeOrigin(request));
}

function getRequestHost(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim().toLowerCase() ??
    request.headers.get("host")?.split(",")[0]?.trim().toLowerCase() ??
    ""
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const internalLocale = request.headers.get("x-omdalat-locale");
  const requestHost = getRequestHost(request);

  if (LEGACY_APP_HOSTS.has(requestHost)) {
    const redirectUrl = new URL(`https://${CANONICAL_APP_HOST}${pathname}${search || ""}`);
    const response = NextResponse.redirect(redirectUrl, 308);
    response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
    return response;
  }

  if (shouldBypass(pathname)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
    return response;
  }

  const { locale, path } = stripLocaleFromPath(pathname);

  if (!locale) {
    if (internalLocale && (internalLocale === "vi" || internalLocale === "en")) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
      return response;
    }

    const response = NextResponse.redirect(buildSafeUrl(request, `${localizePath(pathname, DEFAULT_LOCALE)}${search || ""}`));
    response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
    return response;
  }

  const rewriteDestination = buildSafeUrl(request, `${path}${search || ""}`);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-omdalat-locale", locale);
  requestHeaders.set("x-omdalat-pathname", pathname);
  const rawSessionCookie = request.cookies.get(MEMBER_SESSION_COOKIE_NAME)?.value;
  const session = resolveMemberSessionState(rawSessionCookie);
  const requirement = getAppRouteRequirement(path);
  const requestPathWithQuery = `${path}${search || ""}`;

  if (requirement && !passesAppRequirement(session, requirement)) {
    const gateUrl = gatePathForAppRequirement(requirement, locale, requestPathWithQuery);
    const response = NextResponse.redirect(buildSafeUrl(request, gateUrl), 302);
    response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
    return response;
  }

  const response = NextResponse.rewrite(rewriteDestination, {
    request: {
      headers: requestHeaders
    }
  });
  response.headers.set("X-Robots-Tag", NOINDEX_VALUE);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
