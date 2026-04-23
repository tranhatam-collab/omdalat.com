import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(repoRoot, "apps", "web");
const runtimeNodeDir = path.dirname(process.execPath);

function withRuntimeNodeEnv(baseEnv) {
  const currentPath = baseEnv.PATH ?? "";
  return {
    ...baseEnv,
    PATH: `${runtimeNodeDir}${path.delimiter}${currentPath}`
  };
}

function runCommand(cwd, args) {
  const child = spawn(process.platform === "win32" ? "pnpm.cmd" : "pnpm", args, {
    cwd,
    stdio: "inherit",
    env: withRuntimeNodeEnv(process.env)
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
    env: withRuntimeNodeEnv(process.env)
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

function runShellCommand(command, args, cwd) {
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

let tempRoot;

async function buildInPlace() {
  const code = await runCommand(repoRoot, ["--filter", "@omdalat/web", "exec", "next-on-pages"]);
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

  const syncCode = await runShellCommand(
    "sh",
    [
      "-lc",
      `tar -cf - --exclude='apps/web/.next' --exclude='apps/web/.vercel' --exclude='apps/web/node_modules' --exclude='apps/web/test-results' apps/web packages/core packages/types services/api services/notifications data scripts | (cd ${JSON.stringify(tempRepo)} && tar -xf -)`
    ],
    repoRoot
  );

  if (syncCode !== 0) {
    process.exitCode = syncCode;
    return;
  }

  const installCode = await runCommand(tempRepo, ["install", "--frozen-lockfile"]);
  if (installCode !== 0) {
    process.exitCode = installCode;
    return;
  }

  const tempAppDir = path.join(tempRepo, "apps", "web");
  const buildCode = await runCommand(tempRepo, ["--filter", "@omdalat/web", "exec", "next-on-pages"]);
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
  if (process.env.BUILD_CF_FORCE_CLEAN_COPY === "1" || appDir.includes(" ")) {
    await buildFromCleanCopy();
  } else {
    await buildInPlace();
  }
} finally {
  if (tempRoot) {
    await rm(tempRoot, { recursive: true, force: true });
  }
}
