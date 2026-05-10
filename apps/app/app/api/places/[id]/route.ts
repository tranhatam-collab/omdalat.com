import { cookies } from "next/headers";
export const runtime = "edge";

import { NextResponse } from "next/server";
import { listAllPlaces, upsertPlaceProfile } from "../../../../lib/member-flow";
import { MEMBER_SESSION_COOKIE_NAME, resolveMemberSessionState } from "../../../../lib/member-session";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!["host_partner", "operator", "admin", "internal_member"].includes(session.role)) {
    return NextResponse.json({ error: "host-or-operator-required" }, { status: 403 });
  }

  const { id } = await context.params;
  const current = listAllPlaces().find((place) => place.id === id);

  if (!current) {
    return NextResponse.json({ error: "place-not-found" }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const place = upsertPlaceProfile({
    id,
    ownerId: current.ownerId,
    place_name: String(body.place_name ?? current.place_name),
    area: String(body.area ?? current.area),
    type: (String(body.type ?? current.type) as typeof current.type),
    story_vi: String(body.story_vi ?? current.story_vi),
    story_en: String(body.story_en ?? current.story_en),
    images: Array.isArray(body.images) ? body.images.map((item) => String(item)) : current.images,
    capacity: String(body.capacity ?? current.capacity),
    can_host_stay: body.can_host_stay === undefined ? current.can_host_stay : Boolean(body.can_host_stay),
    can_host_work: body.can_host_work === undefined ? current.can_host_work : Boolean(body.can_host_work),
    can_host_event: body.can_host_event === undefined ? current.can_host_event : Boolean(body.can_host_event),
    legal_notes: String(body.legal_notes ?? current.legal_notes),
    status: (String(body.status ?? current.status) as typeof current.status)
  });

  return NextResponse.json({ ok: true, place });
}
