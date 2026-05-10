import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { applyForWork } from "../../../../lib/member-flow";
import { MEMBER_SESSION_COOKIE_NAME, resolveMemberSessionState } from "../../../../lib/member-session";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (session.memberStatus === "guest") {
    return NextResponse.json({ error: "sign-in-required" }, { status: 401 });
  }

  const body = (await request.json()) as { work_item_id?: string; note?: string };
  if (!body.work_item_id) {
    return NextResponse.json({ error: "missing-work-item-id" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    application: applyForWork(session.id, body.work_item_id, body.note ?? "")
  });
}
