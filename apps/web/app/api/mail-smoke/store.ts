type SmokeMailPayload = {
  from?: string;
  to?: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string;
};

export type SmokeOutboxItem = SmokeMailPayload & {
  id: string;
  receivedAt: string;
};

const OUTBOX_CACHE_URL = "https://omdalat.com/__mail-smoke-outbox";
const OUTBOX_CACHE_NAME = "omdalat-mail-smoke-outbox";
const CACHE_HEADERS = {
  "cache-control": "no-store",
  "content-type": "application/json"
};

function fallbackOutbox() {
  const scope = globalThis as typeof globalThis & {
    __OMDALAT_SMOKE_OUTBOX__?: SmokeOutboxItem[];
  };
  if (!Array.isArray(scope.__OMDALAT_SMOKE_OUTBOX__)) {
    scope.__OMDALAT_SMOKE_OUTBOX__ = [];
  }
  return scope.__OMDALAT_SMOKE_OUTBOX__;
}

async function getOutboxCache() {
  if (typeof caches === "undefined" || typeof caches.open !== "function") {
    return null;
  }
  return caches.open(OUTBOX_CACHE_NAME);
}

async function readOutboxFromCache() {
  const cache = await getOutboxCache();
  if (!cache) {
    return [];
  }

  const response = await cache.match(OUTBOX_CACHE_URL);
  if (!response) {
    return [];
  }

  const payload = (await response.json().catch(() => null)) as { outbox?: SmokeOutboxItem[] } | null;
  return Array.isArray(payload?.outbox) ? payload.outbox : [];
}

async function writeOutboxToCache(outbox: SmokeOutboxItem[]) {
  const cache = await getOutboxCache();
  if (!cache) {
    return;
  }

  const payload = JSON.stringify({ outbox });
  await cache.put(
    OUTBOX_CACHE_URL,
    new Response(payload, {
      headers: CACHE_HEADERS
    })
  );
}

function buildOutboxId() {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `mail_${Date.now()}_${randomPart}`;
}

export async function appendToOutbox(payload: SmokeMailPayload) {
  const item: SmokeOutboxItem = {
    id: buildOutboxId(),
    receivedAt: new Date().toISOString(),
    ...payload
  };

  if (typeof caches !== "undefined") {
    const outbox = await readOutboxFromCache();
    outbox.push(item);
    await writeOutboxToCache(outbox);
    return item;
  }

  const outbox = fallbackOutbox();
  outbox.push(item);
  return item;
}

export async function listOutbox() {
  if (typeof caches !== "undefined") {
    return readOutboxFromCache();
  }
  return fallbackOutbox();
}

export async function clearOutbox() {
  if (typeof caches !== "undefined") {
    await writeOutboxToCache([]);
    return [];
  }
  const outbox = fallbackOutbox();
  outbox.splice(0, outbox.length);
  return outbox;
}
