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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runWithRetries(command, args, cwd, extraEnv, options = {}) {
  const attempts = Number(options.attempts ?? 1);
  const delayMs = Number(options.delayMs ?? 0);

  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await run(command, args, cwd, extraEnv);
      return;
    } catch (error) {
      lastError = error;
      if (attempt >= attempts) {
        break;
      }
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `[build-cf] Attempt ${attempt}/${attempts} failed for ${command} ${args.join(" ")}; retrying in ${delayMs}ms. ${message}`
      );
      if (delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
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
      path.join(appCwd, "node_modules", "@cloudflare", "next-on-pages", "bin", "index.js"),
      path.join(repoRoot, "node_modules", "@cloudflare", "next-on-pages", "bin", "index.js"),
      path.join(appCwd, "node_modules", "@cloudflare", "next-on-pages", "dist", "index.js"),
      path.join(repoRoot, "node_modules", "@cloudflare", "next-on-pages", "dist", "index.js"),
      path.join(appCwd, "node_modules", ".bin", "next-on-pages"),
      path.join(repoRoot, "node_modules", ".bin", "next-on-pages")
    ]) ??
    findPackageBinaryInPnpmStore(repoRoot, "@cloudflare+next-on-pages@", [
      "@cloudflare",
      "next-on-pages",
      "bin",
      "index.js"
    ]) ??
    findPackageBinaryInPnpmStore(repoRoot, "@cloudflare+next-on-pages@", [
      "@cloudflare",
      "next-on-pages",
      "dist",
      "index.js"
    ])
  );
}

function resolveBuildEnv() {
  return {
    NEXT_DISABLE_BUILD_WORKER: "1",
    NEXT_PRIVATE_BUILD_WORKER: "0",
    CI: "0"
  };
}

function shouldExecuteViaNode(filePath) {
  return /\.(?:[cm]?js)$/i.test(filePath);
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

  const buildEnv = resolveBuildEnv();

  await runWithRetries("node", [nextBin, "build"], appCwd, buildEnv, {
    attempts: 3,
    delayMs: 1500
  });

  if (shouldExecuteViaNode(nextOnPagesBin)) {
    await run("node", [nextOnPagesBin], appCwd, buildEnv);
    return;
  }

  await run(nextOnPagesBin, [], appCwd, buildEnv);
}

const entrypoint = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;

if (entrypoint === import.meta.url) {
  await main();
}
