import process from "node:process";

const mode = (process.argv[2] ?? "live").trim().toLowerCase();

if (!process.env.SMOKE_RUNTIME_TARGET) {
  process.env.SMOKE_RUNTIME_TARGET = "live";
}

if (!process.env.SMOKE_WEB_ORIGIN) {
  process.env.SMOKE_WEB_ORIGIN = "https://omdalat.com";
}

if (!process.env.SMOKE_APP_ORIGIN) {
  process.env.SMOKE_APP_ORIGIN = "https://app.omdalat.com";
}

if (mode === "live-strict") {
  process.env.SMOKE_REQUIRE_OUTBOX = "1";
  process.env.SMOKE_ALLOW_LIVE_OUTBOX = "1";
}

if (mode === "live-runtime") {
  process.env.SMOKE_REQUIRE_OUTBOX = "0";
}

await import("./mail-smoke-e2e.mjs");
