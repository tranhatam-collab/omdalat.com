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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return router.handle(request, env).catch((err) => {
      console.error('Router error:', err);
      return new Response('Internal Server Error', { status: 500 });
    });
  }
};
