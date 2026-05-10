import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(repoRoot, "apps", "app");
const runtimeNodeDir = path.dirname(process.execPath);

function withRuntimeNodeEnv(baseEnv) {
  const currentPath = baseEnv.PATH ?? "";
  return {
    ...baseEnv,
    PATH: `${runtimeNodeDir}${path.delimiter}${currentPath}`
  };
}

function runCommand(cwd, command, args) {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    env: withRuntimeNodeEnv(process.env)
  });

  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} ${args.join(" ")} exited with signal ${signal}`));
        return;
      }

      resolve(code ?? 1);
    });
  });
}

async function copyIntoTempRepo(tempRepo) {
  const rootFiles = [
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "turbo.json",
    ".nvmrc",
    ".editorconfig",
    ".gitignore"
  ];

  for (const file of rootFiles) {
    await cp(path.join(repoRoot, file), path.join(tempRepo, file), { recursive: true });
  }

  const rootDirs = ["apps/app", "packages", "services", "data", "scripts"];
  for (const dir of rootDirs) {
    await cp(path.join(repoRoot, dir), path.join(tempRepo, dir), {
      recursive: true,
      filter: (source) => {
        const relative = path.relative(path.join(repoRoot, dir), source);
        if (!relative) {
          return true;
        }

        const top = relative.split(path.sep)[0];
        if (top === "node_modules" || top === ".next" || top === ".vercel" || top === "test-results") {
          return false;
        }

        return true;
      }
    });
  }
}

async function main() {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "omdalat-app-cf-"));
  const tempRepo = path.join(tempRoot, "repo");
  const tempAppDir = path.join(tempRepo, "apps", "app");

  try {
    console.log(`[build-cf-app-clean] creating clean copy at ${tempRepo}`);
    await mkdir(tempRepo, { recursive: true });
    await copyIntoTempRepo(tempRepo);

    const installCode = await runCommand(tempRepo, process.platform === "win32" ? "pnpm.cmd" : "pnpm", [
      "install",
      "--frozen-lockfile"
    ]);
    if (installCode !== 0) {
      process.exitCode = installCode;
      return;
    }

    const buildCode = await runCommand(tempRepo, process.platform === "win32" ? "pnpm.cmd" : "pnpm", [
      "--filter",
      "@omdalat/app",
      "build:cf"
    ]);
    if (buildCode !== 0) {
      process.exitCode = buildCode;
      return;
    }

    console.log("[build-cf-app-clean] syncing .vercel/output back to workspace");
    await rm(path.join(appDir, ".vercel", "output"), { recursive: true, force: true });
    await cp(path.join(tempAppDir, ".vercel", "output"), path.join(appDir, ".vercel", "output"), {
      recursive: true
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

await main();
