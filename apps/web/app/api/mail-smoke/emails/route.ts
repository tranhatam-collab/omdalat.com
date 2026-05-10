export const runtime = "edge";

import { NextResponse } from "next/server";
import { appendToOutbox } from "../store";

type SmokeMailPayload = {
  from?: string;
  to?: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string;
};

function smokeEnabled() {
  return process.env.MAIL_SMOKE_MODE === "1";
}

export async function POST(request: Request) {
  if (!smokeEnabled()) {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 404 });
  }

  const payload = (await request.json().catch(() => null)) as SmokeMailPayload | null;
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  await appendToOutbox(payload);

  return NextResponse.json({ ok: true, queued: true }, { status: 202 });
}
