export const runtime = "edge";

import { NextResponse } from "next/server";

// Inline constants to avoid importing from member-session.ts (which uses next/headers)
const MEMBER_SESSION_COOKIE_NAME = "omdalat-member-session";
const MEMBER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type MemberSessionState = {
  id: string;
  email: string;
  name: string;
  role: string;
  memberStatus: string;
  profileComplete: boolean;
  emailVerified: boolean;
};

function serializeMemberSession(session: MemberSessionState): string {
  return JSON.stringify(session);
}

function buildMemberIdFromEmail(email: string) {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function exchangeCode(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
) {
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!resp.ok) throw new Error(`Token exchange failed: ${resp.status}`);
  return resp.json() as Promise<{ access_token: string }>;
}

async function getUserInfo(accessToken: string) {
  const resp = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) throw new Error(`Userinfo failed: ${resp.status}`);
  return resp.json() as Promise<{ sub: string; email: string; name?: string }>;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const siteOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN || "https://app.omdalat.com";

  if (error || !code) {
    return NextResponse.redirect(`${siteOrigin}/vi/member/register?error=oauth_cancelled`, {
      status: 302,
    });
  }

  // Decode state
  let locale = "vi";
  let next = "/vi/dashboard";
  try {
    if (state) {
      const decoded = JSON.parse(
        Buffer.from(state, "base64url").toString("utf-8")
      ) as { locale?: string; next?: string };
      locale = decoded.locale || "vi";
      next = decoded.next || `/${locale}/dashboard`;
    }
  } catch {
    // ignore
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${siteOrigin}/${locale}/member/register?error=oauth_config`,
      { status: 302 }
    );
  }

  const redirectUri = `${siteOrigin}/api/auth/google/callback`;

  try {
    const tokens = await exchangeCode(code, clientId, clientSecret, redirectUri);
    const userInfo = await getUserInfo(tokens.access_token);

    const memberId = buildMemberIdFromEmail(userInfo.email) || `google-${userInfo.sub}`;

    const session: MemberSessionState = {
      id: memberId,
      email: userInfo.email,
      name: userInfo.name || userInfo.email.split("@")[0],
      role: "registered",
      memberStatus: "registered",
      profileComplete: false,
      emailVerified: true,
    };

    const cookieValue = serializeMemberSession(session);
    const redirectTarget = next.startsWith("/") ? `${siteOrigin}${next}` : next;

    const response = NextResponse.redirect(redirectTarget, { status: 302 });
    response.cookies.set(MEMBER_SESSION_COOKIE_NAME, cookieValue, {
      path: "/",
      maxAge: MEMBER_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });

    return response;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(
      `${siteOrigin}/${locale}/member/register?error=oauth_failed`,
      { status: 302 }
    );
  }
}
