import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { resolveBuildEnv, resolveNextBin, resolveRepoRoot, runWithRetries } from "./build-cf.mjs";

async function main() {
  const appCwd = process.cwd();
  const repoRoot = resolveRepoRoot(appCwd);
  const nextBin = resolveNextBin(appCwd, repoRoot);

  if (!nextBin) {
    throw new Error(`Unable to resolve a healthy Next.js build binary for ${appCwd}`);
  }

  await runWithRetries("node", [nextBin, "build"], appCwd, resolveBuildEnv(), {
    attempts: 3,
    delayMs: 1500
  });
}

const entrypoint = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;

if (entrypoint === import.meta.url) {
  await main();
}
