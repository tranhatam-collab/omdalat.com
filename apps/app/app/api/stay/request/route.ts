import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { requestStay } from "../../../../lib/member-flow";
import { MEMBER_SESSION_COOKIE_NAME, resolveMemberSessionState } from "../../../../lib/member-session";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (session.memberStatus === "guest") {
    return NextResponse.json({ error: "sign-in-required" }, { status: 401 });
  }

  const body = (await request.json()) as { stay_option_id?: string; note?: string };
  if (!body.stay_option_id) {
    return NextResponse.json({ error: "missing-stay-option-id" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    request: requestStay(session.id, body.stay_option_id, body.note ?? "")
  });
}
