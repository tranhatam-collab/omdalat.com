import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { submitBasicApplication } from "../../../../lib/member-flow";
import {
  MEMBER_SESSION_COOKIE_NAME,
  MEMBER_SESSION_MAX_AGE_SECONDS,
  resolveMemberSessionState,
  serializeMemberSession
} from "../../../../lib/member-session";

function splitSkills(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (session.memberStatus === "guest") {
    return NextResponse.json({ error: "sign-in-required" }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const profile = submitBasicApplication(session.id, {
    full_name: String(body.full_name ?? session.name),
    email: String(body.email ?? session.email),
    phone_or_contact: String(body.phone_or_contact ?? ""),
    current_location: String(body.current_location ?? ""),
    why_dalat: String(body.why_dalat ?? ""),
    what_are_you_looking_for: String(body.what_are_you_looking_for ?? ""),
    what_can_you_do: String(body.what_can_you_do ?? ""),
    skills: splitSkills(body.skills),
    work_status: String(body.work_status ?? ""),
    planned_stay_length: String(body.planned_stay_length ?? ""),
    portfolio_or_intro_link: String(body.portfolio_or_intro_link ?? ""),
    notes: String(body.notes ?? "")
  });

  cookieStore.set(
    MEMBER_SESSION_COOKIE_NAME,
    serializeMemberSession({
      ...session,
      email: profile.email,
      name: profile.full_name,
      role: profile.memberStatus,
      memberStatus: profile.memberStatus,
      profileComplete: profile.memberStatus !== "registered",
      emailVerified: true
    }),
    {
      path: "/",
      maxAge: MEMBER_SESSION_MAX_AGE_SECONDS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  );

  return NextResponse.json({ ok: true, profile });
}
