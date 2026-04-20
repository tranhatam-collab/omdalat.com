import { NextRequest, NextResponse } from "next/server";

const LOCALES = new Set(["vi", "en"]);

const LEGACY_ROUTE_MAP: Record<string, string> = {
  "what-is-omdalat": "/about",
  "free-member": "/join",
  packages: "/stay",
  vision: "/about",
  "creative-economy": "/work",
  trust: "/faq",
  proofs: "/community",
  events: "/community",
  places: "/stay",
  hosts: "/community",
  experts: "/learning",
  communities: "/community",
  "work-and-opportunity": "/work"
};

const LEGACY_DETAIL_PREFIX = new Set(["events", "places", "hosts", "experts", "communities", "proofs"]);

function redirectTo(request: NextRequest, location: string) {
  const url = request.nextUrl.clone();
  url.pathname = location;
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
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
    return NextResponse.next();
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|robots.txt|sitemap.xml|api|.*\\.[^/]+$).*)"]
};
