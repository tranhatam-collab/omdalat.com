export const runtime = "edge";

import { NextResponse } from "next/server";
import { getCurrentAuthSession } from "../../../../../services/auth/index";
import { sendMemberSupportRequest } from "../../../../../services/notifications/mail";

type SupportBody = {
  subject?: string;
  message?: string;
  route?: string;
};

function normalizeRoute(value?: string) {
  if (!value || !value.startsWith("/")) {
    return "/settings";
  }

  return value;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SupportBody | null;
  if (!body) {
    return NextResponse.json(
      { ok: false, error: { code: "invalid_json", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!subject || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "invalid_support_request",
          message: "Subject and message are required."
        }
      },
      { status: 422 }
    );
  }

  const session = getCurrentAuthSession();

  try {
    await sendMemberSupportRequest({
      name: session.name,
      email: session.email,
      subject,
      message,
      route: normalizeRoute(body.route),
      role: session.role,
      zone: session.zone
    });

    return NextResponse.json({
      ok: true,
      data: {
        received: true,
        route: normalizeRoute(body.route)
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "mail_delivery_failed",
          message: error instanceof Error ? error.message : "Unable to send OMDALAT support email."
        }
      },
      { status: 502 }
    );
  }
}
