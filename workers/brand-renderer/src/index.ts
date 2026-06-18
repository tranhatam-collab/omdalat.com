import { Router } from 'itty-router';
import { handleBrandSite } from './routes/brand-site';

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  APP_NAME: string;
  APP_ENV: string;
  COOKIE_DOMAIN: string;
}

const router = Router<Request, [Env]>();

// Brand site renderer (catches all subdomains)
router.get('*', handleBrandSite);

async function serveBrandImage(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const host = request.headers.get('Host') || url.hostname;
  const hostParts = host.split('.');
  const brandSlug = hostParts[0];
  const imagePath = url.pathname.replace('/images/', '');
  const r2Key = `brands/${brandSlug}/images/${imagePath}`;
  const object = await env.ASSETS.get(r2Key);
  if (!object) {
    return new Response('Not found', { status: 404 });
  }
  const headers = new Headers();
  const ext = imagePath.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp', svg: 'image/svg+xml', gif: 'image/gif', avif: 'image/avif'
  };
  headers.set('Content-Type', mimeTypes[ext] || 'image/jpeg');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(object.body, { headers });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/images/')) {
      return serveBrandImage(request, env);
    }
    return router.handle(request, env).catch((err) => {
      console.error('Router error:', err);
      return new Response('Internal Server Error', { status: 500 });
    });
  }
};
