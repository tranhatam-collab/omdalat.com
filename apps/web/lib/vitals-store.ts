export type MetricName = "CLS" | "FCP" | "INP" | "LCP" | "TTFB";

export type VitalsEvent = {
  id: string;
  name: MetricName;
  value: number;
  rating: string;
  delta: number;
  navigationType: string;
  path: string;
  ts: string;
};

type RouteSummary = {
  day: string;
  path: string;
  sampleCount: number;
  p75LCP: number | null;
  p75INP: number | null;
  p75CLS: number | null;
};

type DashboardSummary = {
  generatedAt: string;
  days: number;
  totalSamples: number;
  rows: RouteSummary[];
};

type GlobalWithVitals = typeof globalThis & {
  __OMDALAT_VITALS_EVENTS__?: VitalsEvent[];
};

const METRICS: MetricName[] = ["CLS", "FCP", "INP", "LCP", "TTFB"];
const MAX_EVENTS = 5000;
const RETENTION_DAYS = 14;

function getStore() {
  const g = globalThis as GlobalWithVitals;
  if (!g.__OMDALAT_VITALS_EVENTS__) {
    g.__OMDALAT_VITALS_EVENTS__ = [];
  }
  return g.__OMDALAT_VITALS_EVENTS__;
}

function sanitizePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/vi" || normalized === "/en") {
    return "/";
  }
  if (normalized.startsWith("/vi/")) {
    return normalized.slice(3);
  }
  if (normalized.startsWith("/en/")) {
    return normalized.slice(3);
  }
  return normalized;
}

function p75(values: number[]) {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(0.75 * sorted.length) - 1;
  const picked = sorted[Math.max(index, 0)];
  return Number(picked.toFixed(2));
}

export function recordVitalsEvent(event: VitalsEvent) {
  const store = getStore();
  store.push({
    ...event,
    path: sanitizePath(event.path)
  });

  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
  const filtered = store.filter((item) => Date.parse(item.ts) >= cutoff);

  if (filtered.length > MAX_EVENTS) {
    filtered.splice(0, filtered.length - MAX_EVENTS);
  }

  const g = globalThis as GlobalWithVitals;
  g.__OMDALAT_VITALS_EVENTS__ = filtered;
}

export function getVitalsSummary(days = 7): DashboardSummary {
  const now = Date.now();
  const since = now - days * 24 * 60 * 60 * 1000;
  const events = getStore().filter((item) => Date.parse(item.ts) >= since);

  const grouped = new Map<string, { path: string; day: string; metrics: Record<MetricName, number[]> }>();

  for (const event of events) {
    if (!METRICS.includes(event.name)) {
      continue;
    }

    const day = event.ts.slice(0, 10);
    const key = `${day}::${event.path}`;
    const existing = grouped.get(key) ?? {
      day,
      path: event.path,
      metrics: {
        CLS: [],
        FCP: [],
        INP: [],
        LCP: [],
        TTFB: []
      }
    };

    existing.metrics[event.name].push(event.value);
    grouped.set(key, existing);
  }

  const rows = [...grouped.values()]
    .map((item) => {
      const sampleCount = item.metrics.CLS.length + item.metrics.FCP.length + item.metrics.INP.length + item.metrics.LCP.length + item.metrics.TTFB.length;
      return {
        day: item.day,
        path: item.path,
        sampleCount,
        p75LCP: p75(item.metrics.LCP),
        p75INP: p75(item.metrics.INP),
        p75CLS: p75(item.metrics.CLS)
      };
    })
    .sort((a, b) => {
      if (a.day === b.day) {
        return a.path.localeCompare(b.path);
      }
      return b.day.localeCompare(a.day);
    });

  return {
    generatedAt: new Date().toISOString(),
    days,
    totalSamples: events.length,
    rows
  };
}
