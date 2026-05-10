import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);

const getArgValue = (flag, fallback) => {
  const index = args.indexOf(flag);

  if (index === -1 || index === args.length - 1) {
    return fallback;
  }

  return args[index + 1];
};

const port = Number.parseInt(getArgValue("--port", "4173"), 10);
const host = getArgValue("--host", "127.0.0.1");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"]
]);

const routeAliases = new Map([
  ["/", "apps/web/index.html"],
  ["/index.html", "apps/web/index.html"]
]);

const staticWebShellRoutes = new Set([
  "/",
  "/about",
  "/articles",
  "/communities",
  "/community",
  "/contact",
  "/docs",
  "/docs/community-rules",
  "/docs/faq",
  "/docs/getting-started",
  "/docs/how-it-works",
  "/docs/stay-guide",
  "/docs/work-guide",
  "/events",
  "/experts",
  "/faq",
  "/hosts",
  "/join",
  "/learning",
  "/life",
  "/member",
  "/member/application-status",
  "/member/handbook",
  "/member/investor-overview",
  "/member/login",
  "/member/node-model",
  "/member/operations",
  "/member/profile",
  "/member/programs",
  "/member/register",
  "/member/resources",
  "/member/verify",
  "/member/welcome",
  "/places",
  "/privacy",
  "/proofs",
  "/stay",
  "/terms",
  "/trust",
  "/vision",
  "/work",
  "/what-is-omdalat",
  "/how-it-works",
  "/work-and-opportunity",
  "/creative-economy"
]);

const localizedShellRoutes = new Set(
  Array.from(staticWebShellRoutes).flatMap((route) => [`/vi${route === "/" ? "" : route}`, `/en${route === "/" ? "" : route}`])
);

const resolveFilePath = async (pathname) => {
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";

  if (staticWebShellRoutes.has(normalizedPathname) || localizedShellRoutes.has(normalizedPathname)) {
    return path.resolve(rootDir, "apps/web/index.html");
  }

  if (routeAliases.has(pathname)) {
    return path.resolve(rootDir, routeAliases.get(pathname));
  }

  const safePathname = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidatePath = path.resolve(rootDir, safePathname || "index.html");

  if (!candidatePath.startsWith(rootDir)) {
    return null;
  }

  try {
    const fileStat = await stat(candidatePath);

    if (fileStat.isDirectory()) {
      const indexPath = path.join(candidatePath, "index.html");
      await stat(indexPath);
      return indexPath;
    }

    return candidatePath;
  } catch {
    if (safePathname === "") {
      return null;
    }

    const fallbackPath = path.resolve(rootDir, safePathname, "index.html");

    if (!fallbackPath.startsWith(rootDir)) {
      return null;
    }

    try {
      await stat(fallbackPath);
      return fallbackPath;
    } catch {
      return null;
    }
  }
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${host}:${port}`);
  const filePath = await resolveFilePath(requestUrl.pathname);

  if (!filePath) {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end("Not found");
    return;
  }

  try {
    const fileBuffer = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    response.writeHead(200, {
      "Content-Type": contentTypes.get(extension) || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(fileBuffer);
  } catch (error) {
    response.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(`Unable to read ${path.relative(rootDir, filePath)}\n${error}`);
  }
});

server.listen(port, host, () => {
  console.log(`Om Dalat dev server running at http://${host}:${port}/`);
});

server.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});
