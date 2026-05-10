import { rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const buildArtifacts = [
  path.resolve(process.cwd(), ".vercel", "output"),
  path.resolve(process.cwd(), ".next"),
  path.resolve(process.cwd(), ".open-next")
];
const retryableCodes = new Set(["ENOTEMPTY", "EBUSY", "EPERM"]);

async function removeWithRetry(targetPath) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      await rm(targetPath, { recursive: true, force: true });
      console.log(`[clean-vercel-output] ready: ${targetPath}`);
      return;
    } catch (error) {
      const code = error && typeof error === "object" ? error.code : undefined;
      if (!retryableCodes.has(code) || attempt === 5) {
        throw error;
      }
      await delay(250 * attempt);
    }
  }
}

for (const artifact of buildArtifacts) {
  await removeWithRetry(artifact);
}
