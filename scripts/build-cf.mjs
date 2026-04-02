import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(repoRoot, "apps", "web");

function runCommand(cwd, args) {
  const child = spawn(process.platform === "win32" ? "pnpm.cmd" : "pnpm", args, {
    cwd,
    stdio: "inherit",
    env: process.env
  });

  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`pnpm ${args.join(" ")} exited with signal ${signal}`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

function runNodeScript(cwd, scriptPath, scriptArgs = []) {
  const child = spawn(process.execPath, [scriptPath, ...scriptArgs], {
    cwd,
    stdio: "inherit",
    env: process.env
  });

  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`node ${scriptPath} exited with signal ${signal}`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

let tempRoot;

async function buildInPlace() {
  const nextOnPagesBin = path.join(appDir, "node_modules", "@cloudflare", "next-on-pages", "bin", "index.js");
  const code = await runNodeScript(appDir, nextOnPagesBin);
  if (code !== 0) {
    process.exitCode = code;
  }
}

async function buildFromCleanCopy() {
  tempRoot = await mkdtemp(path.join(tmpdir(), "omdalat-cf-copy-"));
  const tempRepo = path.join(tempRoot, "repo");

  process.stdout.write(`Creating no-space build copy: ${tempRepo}\n`);
  await mkdir(tempRepo, { recursive: true });

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

  const rootDirs = ["apps/web", "packages", "services", "data", "scripts"];
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

  const installCode = await runCommand(tempRepo, ["install", "--frozen-lockfile"]);
  if (installCode !== 0) {
    process.exitCode = installCode;
    return;
  }

  const tempAppDir = path.join(tempRepo, "apps", "web");
  const nextOnPagesBin = path.join(tempAppDir, "node_modules", "@cloudflare", "next-on-pages", "bin", "index.js");
  const buildCode = await runNodeScript(tempAppDir, nextOnPagesBin);
  if (buildCode !== 0) {
    process.exitCode = buildCode;
    return;
  }

  process.stdout.write("Syncing Cloudflare build artifacts back to workspace\n");
  await rm(path.join(appDir, ".vercel", "output"), { recursive: true, force: true });
  await cp(path.join(tempAppDir, ".vercel", "output"), path.join(appDir, ".vercel", "output"), {
    recursive: true
  });
}

try {
  if (appDir.includes(" ")) {
    await buildFromCleanCopy();
  } else {
    await buildInPlace();
  }
} finally {
  if (tempRoot) {
    await rm(tempRoot, { recursive: true, force: true });
  }
}
