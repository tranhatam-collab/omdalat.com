import process from "node:process";

const API_BASE = "https://api.cloudflare.com/client/v4";
const accountId = process.env.APP_CF_ACCOUNT_ID ?? "93112cc89181e75335cbd7ef7e392ba3";
const zoneId = process.env.APP_CF_ZONE_ID ?? "48817115d775cd1b80ed451acb336a5c";
const projectName = process.env.APP_CF_PROJECT ?? "omdalat-app";
const domainName = process.env.APP_WWW_DOMAIN ?? "www.app.omdalat.com";
const cnameTarget = process.env.APP_WWW_CNAME_TARGET ?? "omdalat-app.pages.dev";
const apiToken = process.env.CLOUDFLARE_API_TOKEN ?? process.env.CF_API_TOKEN ?? "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cloudflare(method, path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success === false) {
    const details = Array.isArray(payload?.errors)
      ? payload.errors.map((item) => `${item.code}: ${item.message}`).join("; ")
      : response.statusText;
    throw new Error(`${method} ${path} failed: ${details || "unknown error"}`);
  }

  return payload;
}

async function ensurePagesDomain() {
  const list = await cloudflare("GET", `/accounts/${accountId}/pages/projects/${projectName}/domains`);
  const exists = (list.result ?? []).some((domain) => domain?.name === domainName);

  if (!exists) {
    await cloudflare("POST", `/accounts/${accountId}/pages/projects/${projectName}/domains`, {
      name: domainName
    });
    console.log(`added pages domain: ${domainName}`);
  } else {
    console.log(`pages domain exists: ${domainName}`);
  }
}

async function upsertDnsRecord() {
  const lookup = await cloudflare("GET", `/zones/${zoneId}/dns_records?name=${encodeURIComponent(domainName)}`);
  const current = (lookup.result ?? [])[0] ?? null;
  const body = {
    type: "CNAME",
    name: domainName,
    content: cnameTarget,
    proxied: true,
    ttl: 1
  };

  if (current?.id) {
    await cloudflare("PATCH", `/zones/${zoneId}/dns_records/${current.id}`, body);
    console.log(`updated dns record: ${domainName} -> ${cnameTarget}`);
  } else {
    await cloudflare("POST", `/zones/${zoneId}/dns_records`, body);
    console.log(`created dns record: ${domainName} -> ${cnameTarget}`);
  }
}

async function waitForDomainActive() {
  for (let attempt = 1; attempt <= 18; attempt += 1) {
    await cloudflare("PATCH", `/accounts/${accountId}/pages/projects/${projectName}/domains/${domainName}`);
    const status = await cloudflare(
      "GET",
      `/accounts/${accountId}/pages/projects/${projectName}/domains/${domainName}`
    );
    const state = status.result?.status ?? "unknown";
    const detail = status.result?.verification_data?.error_message ?? "";
    console.log(`domain status attempt ${attempt}: ${state}${detail ? ` (${detail})` : ""}`);
    if (state === "active") {
      return;
    }
    await sleep(10000);
  }

  throw new Error(`domain did not become active in time: ${domainName}`);
}

async function main() {
  if (!apiToken) {
    throw new Error("Missing CLOUDFLARE_API_TOKEN (or CF_API_TOKEN).");
  }

  await ensurePagesDomain();
  await upsertDnsRecord();
  await waitForDomainActive();
  console.log("www.app.omdalat.com is active");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
