export const runtime = "edge";

import { NextResponse } from "next/server";
import { reviewMemberApplication, type ReviewAction } from "../../../../../../lib/member-flow";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = (await request.json()) as { action?: ReviewAction; note?: string };

  if (!body.action) {
    return NextResponse.json({ error: "missing-review-action" }, { status: 400 });
  }

  const updated = reviewMemberApplication(id, body.action, body.note ?? "");

  if (!updated) {
    return NextResponse.json({ error: "member-not-found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, profile: updated });
}
