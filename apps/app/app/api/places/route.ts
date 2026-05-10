import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { listAllPlaces, upsertPlaceProfile } from "../../../lib/member-flow";
import { MEMBER_SESSION_COOKIE_NAME, resolveMemberSessionState } from "../../../lib/member-session";

export async function GET() {
  return NextResponse.json({ items: listAllPlaces() });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!["host_partner", "operator", "admin", "internal_member"].includes(session.role)) {
    return NextResponse.json({ error: "host-or-operator-required" }, { status: 403 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const place = upsertPlaceProfile({
    ownerId: session.id,
    place_name: String(body.place_name ?? ""),
    area: String(body.area ?? ""),
    type: (String(body.type ?? "house") as "house" | "garden" | "studio" | "cafe" | "farm" | "work_corner" | "community_space"),
    story_vi: String(body.story_vi ?? ""),
    story_en: String(body.story_en ?? ""),
    images: Array.isArray(body.images) ? body.images.map((item) => String(item)) : [],
    capacity: String(body.capacity ?? ""),
    can_host_stay: Boolean(body.can_host_stay),
    can_host_work: Boolean(body.can_host_work),
    can_host_event: Boolean(body.can_host_event),
    legal_notes: String(body.legal_notes ?? ""),
    status: (String(body.status ?? "draft") as "draft" | "under_review" | "published")
  });

  return NextResponse.json({ ok: true, place });
}
