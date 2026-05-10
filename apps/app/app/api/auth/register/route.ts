import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { registerBasicAccount } from "../../../../lib/member-flow";
import {
  MEMBER_SESSION_COOKIE_NAME,
  MEMBER_SESSION_MAX_AGE_SECONDS,
  serializeMemberSession,
  type MemberSessionState
} from "../../../../lib/member-session";

function buildMemberIdFromEmail(email: string) {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const body = (await request.json()) as { full_name?: string; email?: string };
  const fullName = body.full_name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!fullName || !email) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  }

  const profile = registerBasicAccount({
    id: buildMemberIdFromEmail(email) || `registered-${Date.now()}`,
    fullName,
    email
  });

  const session: MemberSessionState = {
    id: profile.id,
    email: profile.email,
    name: profile.full_name,
    role: profile.memberStatus,
    memberStatus: profile.memberStatus,
    profileComplete: false,
    emailVerified: true
  };

  const cookieStore = await cookies();
  cookieStore.set(MEMBER_SESSION_COOKIE_NAME, serializeMemberSession(session), {
    path: "/",
    maxAge: MEMBER_SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });

  return NextResponse.json({ ok: true, profile });
}
