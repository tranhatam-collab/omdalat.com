export const runtime = "edge";

import { NextResponse } from "next/server";
import { listWorkItems } from "../../../lib/member-flow";

export async function GET() {
  return NextResponse.json({ items: listWorkItems() });
}
