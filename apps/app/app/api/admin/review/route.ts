export const runtime = "edge";

import { NextResponse } from "next/server";
import { listAdminReviewItems } from "../../../../lib/member-flow";

export async function GET() {
  return NextResponse.json({ items: listAdminReviewItems() });
}
