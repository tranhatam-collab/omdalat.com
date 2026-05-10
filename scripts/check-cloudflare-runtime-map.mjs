import { spawn } from "node:child_process";
import process from "node:process";

const WEB_ACCOUNT_ID = process.env.WEB_CF_ACCOUNT_ID ?? "f3f9e76222dcb488d5e303e29e8ba192";
const APP_ACCOUNT_ID = process.env.APP_CF_ACCOUNT_ID ?? "93112cc89181e75335cbd7ef7e392ba3";
const REQUIRE_WWW_APP_DNS = process.env.CF_RUNTIME_REQUIRE_WWW_APP_DNS !== "0";
const REQUIRE_CLOUDFLARE_AUTH = process.env.CF_RUNTIME_REQUIRE_CLOUDFLARE_AUTH === "1";
const REQUIRE_AP_CANONICAL_REDIRECT = process.env.CF_RUNTIME_REQUIRE_AP_CANONICAL_REDIRECT === "1";

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: { ...process.env, ...extraEnv },
      stdio: ["ignore", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed (${code ?? "unknown"}): ${stderr || stdout}`));
    });
  });
}

function parseDomains(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function findProject(projects, name) {
  return projects.find((item) => item["Project Name"] === name) ?? null;
}

function stripAnsi(value) {
  return String(value ?? "").replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");
}

function parseHttpStatus(value) {
  const matches = [...String(value ?? "").matchAll(/HTTP\/\d(?:\.\d)?\s+(\d{3})/g)];
  const status = matches.length ? Number(matches[matches.length - 1][1]) : null;
  return Number.isFinite(status) ? status : null;
}

function parseHeader(value, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escapedName}:\\s*(.+)$`, "gim");
  const matches = [...String(value ?? "").matchAll(regex)];
  return matches.length ? matches[matches.length - 1][1].trim() : null;
}

async function listProjects(accountId) {
  const { stdout } = await run("wrangler", ["pages", "project", "list", "--json"], {
    CLOUDFLARE_ACCOUNT_ID: accountId
  });
  return JSON.parse(stdout);
}

async function listProjectsSafe(accountId, label, checks) {
  try {
    return await listProjects(accountId);
  } catch (error) {
    const detail = stripAnsi(error instanceof Error ? error.message : String(error)).trim();
    checks.push({
      name: `${label} account auth`,
      ok: !REQUIRE_CLOUDFLARE_AUTH,
      detail: REQUIRE_CLOUDFLARE_AUTH
        ? detail || "wrangler account auth failed"
        : `${detail || "wrangler account auth failed"} (runtime-only mode: allowed)`
    });
    return null;
  }
}

async function probeHead(url) {
  const { stdout } = await run("curl", ["-sSI", url]);
  const status = parseHttpStatus(stdout);
  const location = parseHeader(stdout, "location");
  const robots = parseHeader(stdout, "x-robots-tag");
  return { status, location, robots, raw: stdout };
}

async function main() {
  const checks = [];
  let failed = false;

  const [webProjects, appProjects] = await Promise.all([
    listProjectsSafe(WEB_ACCOUNT_ID, "web", checks),
    listProjectsSafe(APP_ACCOUNT_ID, "app", checks)
  ]);

  if (webProjects && appProjects) {
    const webRuntime = findProject(webProjects, "omdalat-web");
    const appRuntime = findProject(appProjects, "omdalat-app");
    const webShadowApp = findProject(webProjects, "omdalat-app");
    const appShadowWeb = findProject(appProjects, "omdalat-web");

    checks.push({
      name: "web runtime account",
      ok: Boolean(webRuntime),
      detail: webRuntime ? `project found in ${WEB_ACCOUNT_ID}` : `missing omdalat-web in ${WEB_ACCOUNT_ID}`
    });

    checks.push({
      name: "app runtime account",
      ok: Boolean(appRuntime),
      detail: appRuntime ? `project found in ${APP_ACCOUNT_ID}` : `missing omdalat-app in ${APP_ACCOUNT_ID}`
    });

    if (webRuntime) {
      const domains = parseDomains(webRuntime["Project Domains"]);
      checks.push({
        name: "web canonical domain",
        ok: domains.includes("omdalat.com"),
        detail: `domains: ${domains.join(", ")}`
      });
    }

    if (appRuntime) {
      const domains = parseDomains(appRuntime["Project Domains"]);
      checks.push({
        name: "app canonical domain",
        ok: domains.includes("app.omdalat.com"),
        detail: `domains: ${domains.join(", ")}`
      });
    }

    if (webShadowApp) {
      const domains = parseDomains(webShadowApp["Project Domains"]);
      checks.push({
        name: "no app domain on web account shadow project",
        ok: !domains.includes("app.omdalat.com"),
        detail: `domains: ${domains.join(", ")}`
      });
    }

    if (appShadowWeb) {
      const domains = parseDomains(appShadowWeb["Project Domains"]);
      checks.push({
        name: "no root web domain on app account shadow project",
        ok: !domains.includes("omdalat.com"),
        detail: `domains: ${domains.join(", ")}`
      });
    }
  } else if (REQUIRE_CLOUDFLARE_AUTH) {
    failed = true;
  }

  const { stdout: appWwwDns } = await run("dig", ["+short", "www.app.omdalat.com"]);
  const hasWwwAppDns = Boolean(appWwwDns.trim());
  checks.push({
    name: "www.app.omdalat.com DNS resolves",
    ok: REQUIRE_WWW_APP_DNS ? hasWwwAppDns : true,
    detail: hasWwwAppDns ? appWwwDns.trim().replace(/\s+/g, ", ") : "no answer"
  });

  const webRoot = await probeHead("https://omdalat.com/");
  checks.push({
    name: "web root redirects to /vi",
    ok: webRoot.status === 308 && webRoot.location === "https://omdalat.com/vi",
    detail: `status=${webRoot.status ?? "n/a"}, location=${webRoot.location ?? "n/a"}`
  });

  const appLogin = await probeHead("https://app.omdalat.com/member/login");
  checks.push({
    name: "app member login locale redirect",
    ok: (appLogin.status === 307 || appLogin.status === 308) && appLogin.location === "https://app.omdalat.com/vi/member/login",
    detail: `status=${appLogin.status ?? "n/a"}, location=${appLogin.location ?? "n/a"}`
  });

  const appLocaleLogin = await probeHead("https://app.omdalat.com/vi/member/login");
  checks.push({
    name: "app localized login robots noindex",
    ok: appLocaleLogin.status === 200 && String(appLocaleLogin.robots ?? "").toLowerCase().includes("noindex"),
    detail: `status=${appLocaleLogin.status ?? "n/a"}, x-robots-tag=${appLocaleLogin.robots ?? "n/a"}`
  });

  const appLocaleRegister = await probeHead("https://app.omdalat.com/vi/member/register");
  checks.push({
    name: "app localized register route",
    ok: appLocaleRegister.status === 200,
    detail: `status=${appLocaleRegister.status ?? "n/a"}, location=${appLocaleRegister.location ?? "n/a"}`
  });

  const appLocaleOperations = await probeHead("https://app.omdalat.com/vi/member/operations");
  checks.push({
    name: "app localized operations reviewed gate",
    ok:
      (appLocaleOperations.status === 302 || appLocaleOperations.status === 307 || appLocaleOperations.status === 308) &&
      String(appLocaleOperations.location ?? "").includes("/vi/member/application-status?required=reviewed-member"),
    detail: `status=${appLocaleOperations.status ?? "n/a"}, location=${appLocaleOperations.location ?? "n/a"}`
  });

  const wwwAppLogin = await probeHead("https://www.app.omdalat.com/member/login");
  checks.push({
    name: "www.app canonical redirect",
    ok: (wwwAppLogin.status === 307 || wwwAppLogin.status === 308) && String(wwwAppLogin.location ?? "").startsWith("https://app.omdalat.com/"),
    detail: `status=${wwwAppLogin.status ?? "n/a"}, location=${wwwAppLogin.location ?? "n/a"}`
  });

  const apHost = await probeHead("https://ap.omdalat.com/");
  const apRedirectsToApp =
    (apHost.status === 307 || apHost.status === 308) && String(apHost.location ?? "").startsWith("https://app.omdalat.com/");
  checks.push({
    name: "ap host canonical cleanup",
    ok: REQUIRE_AP_CANONICAL_REDIRECT ? apRedirectsToApp : true,
    detail: apRedirectsToApp
      ? `status=${apHost.status ?? "n/a"}, location=${apHost.location ?? "n/a"}`
      : REQUIRE_AP_CANONICAL_REDIRECT
        ? `status=${apHost.status ?? "n/a"}, location=${apHost.location ?? "n/a"}`
        : `status=${apHost.status ?? "n/a"}, location=${apHost.location ?? "n/a"} (warning: set CF_RUNTIME_REQUIRE_AP_CANONICAL_REDIRECT=1 to enforce)`
  });

  const memberOperations = await probeHead("https://omdalat.com/vi/member/operations");
  checks.push({
    name: "web member operations reviewed gate",
    ok:
      (memberOperations.status === 307 || memberOperations.status === 308) &&
      String(memberOperations.location ?? "").includes("/vi/member/application-status?required=reviewed-member"),
    detail: `status=${memberOperations.status ?? "n/a"}, location=${memberOperations.location ?? "n/a"}`
  });

  const { stdout: supportResponse } = await run("curl", [
    "-sS",
    "-X",
    "POST",
    "https://app.omdalat.com/api/support",
    "-H",
    "Content-Type: application/json",
    "--data",
    '{"subject":"runtime-map check","message":"support lane probe","route":"/settings"}'
  ]);
  checks.push({
    name: "app support API lane",
    ok: supportResponse.includes('"ok":true'),
    detail: supportResponse.trim() || "empty response"
  });

  for (const check of checks) {
    const prefix = check.ok ? "PASS" : "FAIL";
    console.log(`${prefix} - ${check.name}: ${check.detail}`);
    if (!check.ok) {
      failed = true;
    }
  }

  if (failed) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
