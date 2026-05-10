"use client";

import { useReportWebVitals } from "next/web-vitals";

type Payload = {
  id: string;
  name: string;
  value: number;
  rating?: string;
  delta: number;
  navigationType?: string;
  path: string;
};

const SAMPLE_KEY = "omdalat_vitals_sampled";

function getSampleRate() {
  const raw = process.env.NEXT_PUBLIC_VITALS_SAMPLE_RATE;
  const parsed = raw ? Number(raw) : 0.25;
  if (!Number.isFinite(parsed)) {
    return 0.25;
  }
  return Math.min(Math.max(parsed, 0), 1);
}

function shouldSampleSession() {
  try {
    const existing = window.sessionStorage.getItem(SAMPLE_KEY);
    if (existing === "1") {
      return true;
    }
    if (existing === "0") {
      return false;
    }

    const sampled = Math.random() < getSampleRate();
    window.sessionStorage.setItem(SAMPLE_KEY, sampled ? "1" : "0");
    return sampled;
  } catch {
    return Math.random() < getSampleRate();
  }
}

export function WebVitalsReporter() {
  const isSampled = shouldSampleSession();

  useReportWebVitals((metric) => {
    if (!isSampled) {
      return;
    }

    const payload: Payload = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
      path: window.location.pathname
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("[web-vitals]", payload);
    }

    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", body);
      return;
    }

    fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch(() => {
      return;
    });
  });

  return null;
}
