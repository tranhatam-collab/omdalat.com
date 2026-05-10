export const runtime = "edge";

import { NextResponse } from "next/server";
import { clearOutbox, listOutbox } from "../store";

function smokeEnabled() {
  return process.env.MAIL_SMOKE_MODE === "1";
}

export async function GET() {
  if (!smokeEnabled()) {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const outbox = await listOutbox();
  return NextResponse.json({ ok: true, count: outbox.length, outbox });
}

export async function DELETE() {
  if (!smokeEnabled()) {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  await clearOutbox();
  return NextResponse.json({ ok: true, count: 0 });
}
