import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const host = "127.0.0.1";
const webPort = Number(process.env.SMOKE_WEB_PORT ?? 4211);
const appPort = Number(process.env.SMOKE_APP_PORT ?? 4212);
const runtimeTarget = process.env.SMOKE_RUNTIME_TARGET?.trim().toLowerCase() === "live" ? "live" : "local";
const isLiveTarget = runtimeTarget === "live";
const requireOutboxAssertions = process.env.SMOKE_REQUIRE_OUTBOX === "1";
const allowLiveOutboxAssertions = process.env.SMOKE_ALLOW_LIVE_OUTBOX === "1";
const useOutboxAssertions = !isLiveTarget || requireOutboxAssertions;
const MEMBER_VERIFY_CODE_COOKIE_NAME = "omdalat-member-verify-code";

const webOrigin = isLiveTarget
  ? String(process.env.SMOKE_WEB_ORIGIN ?? "").trim().replace(/\/+$/, "")
  : `http://${host}:${webPort}`;
const appOrigin = isLiveTarget
  ? String(process.env.SMOKE_APP_ORIGIN ?? "").trim().replace(/\/+$/, "")
  : `http://${host}:${appPort}`;
const mailApiUrl = String(process.env.SMOKE_MAIL_API_URL ?? `${webOrigin}/api/mail-smoke`).trim().replace(/\/+$/, "");
const reportBaseDir = process.env.SMOKE_REPORT_BASE_DIR?.trim()
  ? path.resolve(process.env.SMOKE_REPORT_BASE_DIR)
  : path.resolve(process.cwd(), "reports", "email-smoke");

const startedAt = new Date().toISOString();
const stamp = startedAt.replaceAll(":", "-").replaceAll(".", "-");
const reportDir = path.resolve(reportBaseDir, stamp);

const processLogs = {
  web: [],
  app: []
};

const children = [];

function toRecipients(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).toLowerCase());
  return [String(value ?? "").toLowerCase()];
}

function includesRecipient(payload, email) {
  return toRecipients(payload.to).includes(email.toLowerCase());
}

function extractFirstUrl(input) {
  if (!input) return "";
  const match = input.match(/https?:\/\/[^\s"'<>]+/);
  return match ? match[0] : "";
}

function parseSetCookieHeader(rawValue) {
  const values = [];
  let current = "";
  let inExpires = false;
  for (let index = 0; index < rawValue.length; index += 1) {
    const char = rawValue[index];
    current += char;

    const recent = current.slice(-8).toLowerCase();
    if (recent === "expires=") {
      inExpires = true;
      continue;
    }

    if (inExpires && char === ";") {
      inExpires = false;
      continue;
    }

    if (!inExpires && char === ",") {
      current = current.slice(0, -1).trim();
      if (current) {
        values.push(current);
      }
      current = "";
    }
  }

  if (current.trim()) {
    values.push(current.trim());
  }

  return values;
}

function getSetCookieValues(response) {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers.getSetCookie();
  }

  const rawSetCookie = response.headers.get("set-cookie");
  if (!rawSetCookie) {
    return [];
  }

  return parseSetCookieHeader(rawSetCookie);
}

function mergeCookieJar(cookieJar, response) {
  const setCookies = getSetCookieValues(response);
  for (const cookie of setCookies) {
    const [pair] = cookie.split(";");
    const separator = pair.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const name = pair.slice(0, separator).trim();
    const value = pair.slice(separator + 1).trim();
    if (name) {
      cookieJar.set(name, value);
    }
  }
}

function serializeCookieJar(cookieJar) {
  if (!cookieJar.size) {
    return "";
  }

  return Array.from(cookieJar.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractForms(html) {
  return Array.from(html.matchAll(/<form[\s\S]*?<\/form>/g), (match) => match[0]);
}

function extractActionId(formHtml) {
  const actionMatch = formHtml.match(/name="(\$ACTION_ID_[^"]+)"/);
  return actionMatch ? actionMatch[1] : "";
}

function hasField(formHtml, fieldName) {
  const fieldPattern = new RegExp(`name="${escapeRegExp(fieldName)}"`);
  return fieldPattern.test(formHtml);
}

function findForm(html, predicate) {
  const forms = extractForms(html);
  if (!forms.length) {
    return "";
  }

  return forms.find((form) => predicate(form)) ?? "";
}

function extractHiddenValue(formHtml, fieldName) {
  const hiddenPattern = new RegExp(
    `<input[^>]*type="hidden"[^>]*name="${escapeRegExp(fieldName)}"[^>]*value="([^"]*)"`
  );
  const match = formHtml.match(hiddenPattern);
  return match ? match[1] : "";
}

function buildFormData(formHtml, fields) {
  const actionId = extractActionId(formHtml);
  if (!actionId) {
    throw new Error("Unable to resolve action id from form.");
  }

  const formData = new FormData();
  formData.append(actionId, "");

  for (const hiddenField of ["locale", "next", "token"]) {
    const hiddenValue = extractHiddenValue(formHtml, hiddenField);
    if (hiddenValue !== "") {
      formData.append(hiddenField, hiddenValue);
    }
  }

  for (const [name, value] of Object.entries(fields)) {
    if (value == null) {
      continue;
    }
    formData.append(name, String(value));
  }

  return formData;
}

async function fetchWithCookies(url, cookieJar, init = {}, timeoutMs = 8000) {
  const headers = new Headers(init.headers ?? {});
  const cookieHeader = serializeCookieJar(cookieJar);
  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  const response = await fetchWithTimeout(
    url,
    {
      ...init,
      headers,
      redirect: "manual"
    },
    timeoutMs
  );

  mergeCookieJar(cookieJar, response);
  return response;
}

function resolveRedirect(baseUrl, response) {
  const location = response.headers.get("location");
  if (!location) {
    return "";
  }

  return new URL(location, baseUrl).toString();
}

function extractVerificationCodeFromCookieJar(cookieJar, email) {
  const encodedCookie = cookieJar.get(MEMBER_VERIFY_CODE_COOKIE_NAME);
  if (!encodedCookie) {
    return "";
  }

  try {
    const decodedValue = decodeURIComponent(encodedCookie);
    const [decodedEmail, code] = decodedValue.split(":");
    if (!decodedEmail || !code) {
      return "";
    }

    let normalizedEmail = decodedEmail;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (!normalizedEmail.includes("%")) {
        break;
      }
      normalizedEmail = decodeURIComponent(normalizedEmail);
    }

    if (normalizedEmail.toLowerCase() !== email.toLowerCase()) {
      return "";
    }

    return code.trim();
  } catch {
    return "";
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, init = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function readOutbox() {
  const response = await fetchWithTimeout(`${mailApiUrl}/outbox`, { method: "GET" }, 45000);
  if (!response.ok) {
    throw new Error(`Unable to read smoke outbox: ${response.status}`);
  }
  const payload = await response.json();
  return Array.isArray(payload?.outbox) ? payload.outbox : [];
}

async function clearOutbox() {
  const response = await fetchWithTimeout(`${mailApiUrl}/outbox`, { method: "DELETE" }, 45000);
  if (!response.ok) {
    throw new Error(`Unable to clear smoke outbox: ${response.status}`);
  }
}

async function waitForOutboxSize(minSize, timeoutMs, label) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const messages = await readOutbox();
    if (messages.length >= minSize) {
      return messages;
    }
    await delay(300);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function waitForServer(url, timeoutMs, label) {
  const started = Date.now();
  let lastError = "";
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetchWithTimeout(url, { redirect: "manual" }, 45000);
      if (response.status < 500) {
        return;
      }
      lastError = `status ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await delay(500);
  }
  throw new Error(`Timed out waiting for ${label}: ${lastError || "no response"}`);
}

function recordLog(bucket, chunk) {
  const lines = chunk
    .toString()
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
  if (lines.length === 0) return;
  bucket.push(...lines);
}

function startRuntime(name, command, args, runtimeCwd, extraEnv) {
  const child = spawn(command, args, {
    cwd: runtimeCwd,
    env: { ...process.env, ...extraEnv },
    stdio: ["ignore", "pipe", "pipe"]
  });
  children.push(child);

  child.stdout.on("data", (chunk) => recordLog(processLogs[name], chunk));
  child.stderr.on("data", (chunk) => recordLog(processLogs[name], chunk));

  child.on("exit", (code, signal) => {
    processLogs[name].push(`process_exit code=${code ?? "null"} signal=${signal ?? "null"}`);
  });
  child.on("error", (error) => {
    processLogs[name].push(`process_error ${(error instanceof Error ? error.message : String(error))}`);
  });

  return child;
}

async function stopChild(child) {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
  try {
    await Promise.race([once(child, "exit"), delay(4000)]);
  } catch {
    // no-op
  }
  if (!child.killed) {
    child.kill("SIGKILL");
  }
}

async function main() {
  const flows = [];

  try {
    if (isLiveTarget && requireOutboxAssertions && !allowLiveOutboxAssertions) {
      throw new Error(
        "SMOKE_REQUIRE_OUTBOX=1 on live requires SMOKE_ALLOW_LIVE_OUTBOX=1 to avoid accidental strict production runs."
      );
    }

    if (!webOrigin || !appOrigin) {
      throw new Error(
        "Missing live origins. Set SMOKE_WEB_ORIGIN and SMOKE_APP_ORIGIN when SMOKE_RUNTIME_TARGET=live."
      );
    }

    if (!isLiveTarget) {
      startRuntime(
        "web",
        "npm",
        ["--prefix", "apps/web", "run", "dev", "--", "--hostname", host, "--port", String(webPort)],
        process.cwd(),
        {
          MAIL_API_URL: mailApiUrl,
          MAIL_API_KEY: "smoke-mail-api-key",
          MAIL_SMOKE_MODE: "1",
          MEMBER_MAGIC_LINK_SECRET: "smoke-member-magic-link-secret",
          NEXT_PUBLIC_WEB_ORIGIN: webOrigin,
          NEXT_PUBLIC_APP_ORIGIN: appOrigin
        }
      );

      startRuntime(
        "app",
        "npm",
        ["--prefix", "apps/app", "run", "dev", "--", "--hostname", host, "--port", String(appPort)],
        process.cwd(),
        {
          MAIL_API_URL: mailApiUrl,
          MAIL_API_KEY: "smoke-mail-api-key",
          NEXT_PUBLIC_WEB_ORIGIN: webOrigin,
          NEXT_PUBLIC_APP_ORIGIN: appOrigin
        }
      );
    }

    await waitForServer(`${webOrigin}/`, isLiveTarget ? 60000 : 180000, "web runtime");
    await waitForServer(`${appOrigin}/`, isLiveTarget ? 60000 : 180000, "app runtime");
    if (useOutboxAssertions) {
      await clearOutbox();
    }

    const contactBefore = useOutboxAssertions ? (await readOutbox()).length : 0;
    const contactEmail = "contact-smoke@omdalat.com";
    const contactResponse = await fetchWithTimeout(`${webOrigin}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Smoke Contact",
        email: contactEmail,
        organization: "OMDALAT QA",
        topic: "support",
        message: "Smoke flow contact message.",
        source: "mail-smoke-e2e"
      })
    }, 45000);
    const contactJson = await contactResponse.json().catch(() => ({}));
    const contactOutbox = useOutboxAssertions
      ? await waitForOutboxSize(contactBefore + 2, 20000, "contact emails")
      : [];
    flows.push({
      flow: "contact",
      ok: contactResponse.ok && contactJson.ok === true,
      status: contactResponse.status,
      emittedEmails: useOutboxAssertions ? contactOutbox.length - contactBefore : null
    });

    const supportBefore = useOutboxAssertions ? (await readOutbox()).length : 0;
    const supportResponse = await fetchWithTimeout(`${appOrigin}/api/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Smoke support check",
        message: "Support smoke message.",
        route: "/settings"
      })
    }, 45000);
    const supportJson = await supportResponse.json().catch(() => ({}));
    const supportOutbox = useOutboxAssertions
      ? await waitForOutboxSize(supportBefore + 2, 20000, "support emails")
      : [];
    flows.push({
      flow: "support",
      ok: supportResponse.ok && supportJson.ok === true,
      status: supportResponse.status,
      emittedEmails: useOutboxAssertions ? supportOutbox.length - supportBefore : null
    });

    const registerJar = new Map();
    const registerEmail = "register-smoke@omdalat.com";
    const registerUrl = `${webOrigin}/vi/member/register?next=%2Fmember%2Fwelcome`;
    const registerPageResponse = await fetchWithCookies(registerUrl, registerJar, { method: "GET" }, 45000);
    if (!registerPageResponse.ok) {
      throw new Error(`Unable to load register page: ${registerPageResponse.status}`);
    }
    const registerHtml = await registerPageResponse.text();
    const registerForm = findForm(
      registerHtml,
      (form) => hasField(form, "name") && hasField(form, "email") && hasField(form, "password")
    );
    if (!registerForm) {
      throw new Error("Unable to locate register form in live HTML.");
    }

    const registerBefore = useOutboxAssertions ? (await readOutbox()).length : 0;
    const registerSubmitResponse = await fetchWithCookies(
      registerUrl,
      registerJar,
      {
        method: "POST",
        body: buildFormData(registerForm, {
          name: "Smoke Register",
          email: registerEmail,
          password: "Smoke123!",
          agree: "true"
        })
      },
      45000
    );
    const registerRedirect = resolveRedirect(registerUrl, registerSubmitResponse);
    if (registerRedirect) {
      await fetchWithCookies(registerRedirect, registerJar, { method: "GET" }, 45000).catch(() => undefined);
    }
    const registerOutbox = useOutboxAssertions
      ? await waitForOutboxSize(registerBefore + 3, 25000, "register emails")
      : [];
    flows.push({
      flow: "join",
      ok: registerRedirect.includes("/vi/member/verify"),
      url: registerRedirect || registerUrl,
      emittedEmails: useOutboxAssertions ? registerOutbox.length - registerBefore : null
    });

    if (useOutboxAssertions) {
      const magicJar = new Map();
      const magicEmail = "magic-smoke@omdalat.com";
      const magicBefore = (await readOutbox()).length;
      const loginUrl = `${webOrigin}/vi/member/login?next=%2Fmember%2Fwelcome`;
      const loginResponse = await fetchWithCookies(loginUrl, magicJar, { method: "GET" }, 45000);
      if (!loginResponse.ok) {
        throw new Error(`Unable to load login page: ${loginResponse.status}`);
      }
      const loginHtml = await loginResponse.text();
      const magicForm = findForm(loginHtml, (form) => hasField(form, "email") && !hasField(form, "password"));
      if (!magicForm) {
        throw new Error("Unable to locate magic link form in login page.");
      }
      const magicSubmitResponse = await fetchWithCookies(
        loginUrl,
        magicJar,
        {
          method: "POST",
          body: buildFormData(magicForm, { email: magicEmail })
        },
        45000
      );
      const magicRedirect = resolveRedirect(loginUrl, magicSubmitResponse);
      if (magicRedirect) {
        await fetchWithCookies(magicRedirect, magicJar, { method: "GET" }, 45000).catch(() => undefined);
      }
      const magicOutbox = await waitForOutboxSize(magicBefore + 2, 25000, "magic emails");

      const magicFlowEmails = magicOutbox.slice(magicBefore);
      const magicLinkMail = magicFlowEmails.find(
        (item) =>
          includesRecipient(item, magicEmail) &&
          /sign-in link|Link đăng nhập/i.test(String(item.subject ?? ""))
      );
      const magicLink =
        extractFirstUrl(String(magicLinkMail?.text ?? "")) || extractFirstUrl(String(magicLinkMail?.html ?? ""));
      if (!magicLink) {
        throw new Error("Unable to extract magic link from emitted emails.");
      }

      const magicUrl = new URL(magicLink);
      const verifyCode = magicUrl.searchParams.get("code") ?? "";
      if (!verifyCode) {
        throw new Error("Magic link does not contain verification code.");
      }

      flows.push({
        flow: "magic_link",
        ok: magicRedirect.includes("magic=sent"),
        emittedEmails: magicOutbox.length - magicBefore
      });

      const verifyBefore = (await readOutbox()).length;
      let verifyPageUrl = magicLink;
      let verifyPageHtml = "";
      for (let attempt = 0; attempt < 4; attempt += 1) {
        const verifyPageResponse = await fetchWithCookies(verifyPageUrl, magicJar, { method: "GET" }, 45000);
        const followRedirect = resolveRedirect(verifyPageUrl, verifyPageResponse);
        if (followRedirect) {
          verifyPageUrl = followRedirect;
          continue;
        }

        verifyPageHtml = await verifyPageResponse.text();
        break;
      }

      if (!verifyPageHtml) {
        throw new Error("Unable to load verification form from magic link.");
      }

      const verifyForm = findForm(verifyPageHtml, (form) => hasField(form, "code"));
      if (!verifyForm) {
        throw new Error("Unable to locate verification form after magic link redirect.");
      }

      const verifySubmitResponse = await fetchWithCookies(
        verifyPageUrl,
        magicJar,
        {
          method: "POST",
          body: buildFormData(verifyForm, { code: verifyCode })
        },
        45000
      );
      const verifyRedirect = resolveRedirect(verifyPageUrl, verifySubmitResponse);
      if (verifyRedirect) {
        await fetchWithCookies(verifyRedirect, magicJar, { method: "GET" }, 45000).catch(() => undefined);
      }
      const verifyOutbox = await waitForOutboxSize(verifyBefore + 1, 25000, "verification success email");

      flows.push({
        flow: "email_verification",
        ok: verifyRedirect.includes("/vi/member/welcome"),
        url: verifyRedirect || verifyPageUrl,
        emittedEmails: verifyOutbox.length - verifyBefore
      });
    } else {
      const loginProbeResponse = await fetchWithCookies(
        `${webOrigin}/vi/member/login?next=%2Fmember%2Fwelcome`,
        new Map(),
        { method: "GET" },
        45000
      );
      const loginProbeHtml = await loginProbeResponse.text();
      const loginForms = extractForms(loginProbeHtml).length;
      flows.push({
        flow: "magic_link",
        ok: loginForms >= 2,
        emittedEmails: null
      });

      const verifyCode = extractVerificationCodeFromCookieJar(registerJar, registerEmail);
      if (!verifyCode) {
        throw new Error("Unable to extract verification code from member cookie.");
      }

      const verifyUrl = `${webOrigin}/vi/member/verify?next=%2Fmember%2Fwelcome`;
      const verifyPageResponse = await fetchWithCookies(verifyUrl, registerJar, { method: "GET" }, 45000);
      if (!verifyPageResponse.ok) {
        throw new Error(`Unable to load verification page: ${verifyPageResponse.status}`);
      }
      const verifyPageHtml = await verifyPageResponse.text();
      const verifyForm = findForm(verifyPageHtml, (form) => hasField(form, "code"));
      if (!verifyForm) {
        throw new Error("Unable to locate verification form.");
      }

      const verifySubmitResponse = await fetchWithCookies(
        verifyUrl,
        registerJar,
        {
          method: "POST",
          body: buildFormData(verifyForm, { code: verifyCode })
        },
        45000
      );
      const verifyRedirect = resolveRedirect(verifyUrl, verifySubmitResponse);
      if (verifyRedirect) {
        await fetchWithCookies(verifyRedirect, registerJar, { method: "GET" }, 45000).catch(() => undefined);
      }

      flows.push({
        flow: "email_verification",
        ok: verifyRedirect.includes("/vi/member/welcome"),
        url: verifyRedirect || verifyUrl,
        emittedEmails: null
      });
    }

    const finalOutbox = useOutboxAssertions ? await readOutbox() : [];
    const success = flows.every((item) => item.ok);
    const summary = {
      startedAt,
      finishedAt: new Date().toISOString(),
      success,
      runtimeTarget,
      assertionMode: useOutboxAssertions ? "outbox" : "runtime",
      origins: { mailApiUrl, webOrigin, appOrigin },
      totals: {
        emailsCaptured: useOutboxAssertions ? finalOutbox.length : null
      },
      flows
    };

    await mkdir(reportDir, { recursive: true });
    await writeFile(path.join(reportDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
    await writeFile(path.join(reportDir, "outbox.json"), `${JSON.stringify(finalOutbox, null, 2)}\n`, "utf8");
    await writeFile(path.join(reportDir, "web.log"), `${processLogs.web.join("\n")}\n`, "utf8");
    await writeFile(path.join(reportDir, "app.log"), `${processLogs.app.join("\n")}\n`, "utf8");

    console.log(`[mail-smoke-e2e] report: ${reportDir}`);
    console.log(`[mail-smoke-e2e] success=${success} emails=${finalOutbox.length}`);

    if (!success) {
      process.exitCode = 1;
    }
  } catch (error) {
    const capturedOutbox = useOutboxAssertions ? await readOutbox().catch(() => []) : [];
    await mkdir(reportDir, { recursive: true });
    await writeFile(
      path.join(reportDir, "error.txt"),
      `${error instanceof Error ? error.stack ?? error.message : String(error)}\n`,
      "utf8"
    );
    await writeFile(path.join(reportDir, "outbox.json"), `${JSON.stringify(capturedOutbox, null, 2)}\n`, "utf8");
    await writeFile(path.join(reportDir, "web.log"), `${processLogs.web.join("\n")}\n`, "utf8");
    await writeFile(path.join(reportDir, "app.log"), `${processLogs.app.join("\n")}\n`, "utf8");
    console.error(`[mail-smoke-e2e] failed. report: ${reportDir}`);
    console.error(error);
    process.exitCode = 1;
  } finally {
    for (const child of children) {
      await stopChild(child);
    }
  }
}

await main();
