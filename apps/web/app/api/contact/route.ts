export const runtime = "edge";

import { NextResponse } from "next/server";
import { sendPublicContactIntake } from "../../../../../services/notifications/mail";

type ContactBody = {
  name?: string;
  email?: string;
  organization?: string;
  topic?: string;
  message?: string;
};

function normalizeEmail(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactBody | null;
  if (!body) {
    return NextResponse.json(
      { ok: false, error: { code: "invalid_json", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const payload = {
    name: body.name?.trim() ?? "",
    email: normalizeEmail(body.email),
    organization: body.organization?.trim() ?? "",
    topic: body.topic?.trim() ?? "general",
    message: body.message?.trim() ?? "",
    source: "omdalat-web"
  };

  if (!payload.name || !payload.message || !isEmail(payload.email)) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "invalid_contact_request",
          message: "Name, valid email, and message are required."
        }
      },
      { status: 422 }
    );
  }

  try {
    await sendPublicContactIntake(payload);
    return NextResponse.json({
      ok: true,
      data: {
        received: true,
        source: payload.source
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "mail_delivery_failed",
          message: error instanceof Error ? error.message : "Unable to send OMDALAT contact email."
        }
      },
      { status: 502 }
    );
  }
}
