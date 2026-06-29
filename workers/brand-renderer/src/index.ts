import { Router } from 'itty-router';
import { handleBrandSite } from './routes/brand-site';
import {
  handleRegistrySite,
  handleMarketSite,
  handleAuctionSite,
  handleBrandFactoryApply,
  handleMarketAssetDetail,
  handleBrandFactoryVerify,
  handleBrandFactoryCases,
  handleBrandFactoryDashboard,
  handleMarketAdmin,
  handleAuctionRules,
  handleBrandFactoryEvidence,
  handleBrandFactoryIntake,
  handleMarketBuyerDashboard,
  handleRegistrySearch,
  handleAuctionLive,
  handleAuctionHistory
} from './routes/asset-network';

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  APP_NAME: string;
  APP_ENV: string;
  COOKIE_DOMAIN: string;
}

const router = Router<Request, [Env]>();

// Brand Asset Network surfaces — routed by subdomain
// registry.omdalat.com, market.omdalat.com, auction.omdalat.com
// brand.omdalat.com/apply — Brand Factory intake
router.get('*', async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const host = request.headers.get('Host') || url.hostname;
  const hostParts = host.split('.');
  const subdomain = hostParts.length >= 3 && hostParts.slice(-2).join('.') === 'omdalat.com'
    ? hostParts[0] : '';

  if (subdomain === 'registry') {
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.includes('search')) {
      return handleRegistrySearch(request, env);
    }
    return handleRegistrySite(request, env);
  }
  if (subdomain === 'market') {
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.includes('assets')) {
      return handleMarketAssetDetail(request, env);
    }
    if (pathParts.includes('admin')) {
      return handleMarketAdmin(request, env);
    }
    if (pathParts.includes('buyer-dashboard')) {
      return handleMarketBuyerDashboard(request, env);
    }
    return handleMarketSite(request, env);
  }
  if (subdomain === 'auction') {
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.includes('rules')) {
      return handleAuctionRules(request, env);
    }
    if (pathParts.includes('live')) {
      return handleAuctionLive(request, env);
    }
    if (pathParts.includes('history')) {
      return handleAuctionHistory(request, env);
    }
    return handleAuctionSite(request, env);
  }
  if (subdomain === 'brand') {
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.includes('apply')) {
      return handleBrandFactoryApply(request, env);
    }
    if (pathParts.includes('verify')) {
      return handleBrandFactoryVerify(request, env);
    }
    if (pathParts.includes('cases')) {
      return handleBrandFactoryCases(request, env);
    }
    if (pathParts.includes('dashboard')) {
      return handleBrandFactoryDashboard(request, env);
    }
    if (pathParts.includes('evidence')) {
      return handleBrandFactoryEvidence(request, env);
    }
    if (pathParts.includes('intake')) {
      return handleBrandFactoryIntake(request, env);
    }
  }
  return handleBrandSite(request, env);
});

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
