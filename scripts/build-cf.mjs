import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

function run(command, args, cwd, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
      shell: false
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

export function resolveRepoRoot(appCwd) {
  return path.resolve(appCwd, "..", "..");
}

export function findFirstExisting(paths) {
  return paths.find((candidate) => existsSync(candidate)) ?? null;
}

export function findPackageBinaryInPnpmStore(repoRoot, prefix, relativePath) {
  const pnpmDir = path.join(repoRoot, "node_modules", ".pnpm");
  if (!existsSync(pnpmDir)) {
    return null;
  }

  const entries = readdirSync(pnpmDir)
    .filter((entry) => entry.startsWith(prefix))
    .sort();

  for (const entry of entries) {
    const candidate = path.join(pnpmDir, entry, "node_modules", ...relativePath);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function resolveNextBin(appCwd, repoRoot) {
  return (
    findFirstExisting([
      path.join(appCwd, "node_modules", "next", "dist", "bin", "next"),
      path.join(repoRoot, "node_modules", "next", "dist", "bin", "next")
    ]) ??
    findPackageBinaryInPnpmStore(repoRoot, "next@", ["next", "dist", "bin", "next"])
  );
}

export function resolveNextOnPagesBin(appCwd, repoRoot) {
  return (
    findFirstExisting([
      path.join(appCwd, "node_modules", ".bin", "next-on-pages"),
      path.join(repoRoot, "node_modules", ".bin", "next-on-pages"),
      path.join(appCwd, "node_modules", "@cloudflare", "next-on-pages", "dist", "index.js"),
      path.join(repoRoot, "node_modules", "@cloudflare", "next-on-pages", "dist", "index.js")
    ]) ??
    findPackageBinaryInPnpmStore(repoRoot, "@cloudflare+next-on-pages@", [
      "@cloudflare",
      "next-on-pages",
      "dist",
      "index.js"
    ])
  );
}

async function main() {
  const appCwd = process.cwd();
  const repoRoot = resolveRepoRoot(appCwd);
  const nextBin = resolveNextBin(appCwd, repoRoot);
  const nextOnPagesBin = resolveNextOnPagesBin(appCwd, repoRoot);

  if (!nextBin) {
    throw new Error(`Unable to resolve Next.js build binary for ${appCwd}`);
  }

  if (!nextOnPagesBin) {
    throw new Error(`Unable to resolve @cloudflare/next-on-pages binary for ${appCwd}`);
  }

  await run("node", [nextBin, "build"], appCwd, {
    NEXT_DISABLE_BUILD_WORKER: "1"
  });

  await run("node", [nextOnPagesBin], appCwd, {
    NEXT_DISABLE_BUILD_WORKER: "1"
  });
}

const entrypoint = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;

if (entrypoint === import.meta.url) {
  await main();
}
