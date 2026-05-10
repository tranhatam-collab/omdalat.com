export const runtime = "edge";

import { NextResponse } from "next/server";
import { getVitalsSummary, recordVitalsEvent, type MetricName, type VitalsEvent } from "../../../lib/vitals-store";

type VitalsPayload = {
  id?: string;
  name?: string;
  value?: number;
  rating?: string;
  delta?: number;
  navigationType?: string;
  path?: string;
};

function isMetricName(name: string): name is MetricName {
  return name === "CLS" || name === "FCP" || name === "INP" || name === "LCP" || name === "TTFB";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as VitalsPayload | null;

  if (!body || typeof body.name !== "string" || !isMetricName(body.name)) {
    return NextResponse.json({ ok: false, error: "invalid_metric" }, { status: 400 });
  }

  const event: VitalsEvent = {
    id: typeof body.id === "string" ? body.id : "unknown",
    name: body.name,
    value: typeof body.value === "number" ? body.value : 0,
    rating: typeof body.rating === "string" ? body.rating : "unknown",
    delta: typeof body.delta === "number" ? body.delta : 0,
    navigationType: typeof body.navigationType === "string" ? body.navigationType : "unknown",
    path: typeof body.path === "string" ? body.path : "unknown",
    ts: new Date().toISOString()
  };

  recordVitalsEvent(event);
  console.log("[web-vitals]", JSON.stringify(event));

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const expected = process.env.WEB_VITALS_DASHBOARD_TOKEN ?? "";

  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const daysParam = Number(url.searchParams.get("days") ?? "7");
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(daysParam, 1), 30) : 7;

  return NextResponse.json({ ok: true, data: getVitalsSummary(days) });
}
