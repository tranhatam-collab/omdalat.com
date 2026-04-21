import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PREVIEW_BASE_URL;

if (!baseURL) {
  throw new Error("Missing PREVIEW_BASE_URL for preview E2E runs.");
}

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
