export const runtime = "edge";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "vi";
  const next = url.searchParams.get("next") || `/${locale}/dashboard`;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const siteOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN || "https://app.omdalat.com";

  if (!clientId) {
    return NextResponse.json({ error: "Google OAuth not configured" }, { status: 503 });
  }

  const redirectUri = `${siteOrigin}/api/auth/google/callback`;

  // Build state: encode locale + next URL
  const state = Buffer.from(JSON.stringify({ locale, next })).toString("base64url");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    hl: locale === "vi" ? "vi" : "en",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    { status: 302 }
  );
}
