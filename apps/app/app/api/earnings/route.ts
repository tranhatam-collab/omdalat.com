import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { listEarningsForMember } from "../../../lib/member-flow";
import { MEMBER_SESSION_COOKIE_NAME, resolveMemberSessionState } from "../../../lib/member-session";

export async function GET() {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  return NextResponse.json({
    items: listEarningsForMember(session.id)
  });
}
