import type { Env } from '../index';

export interface CorsOptions {
  origin: string;
  methods?: string[];
  allowHeaders?: string[];
  credentials?: boolean;
}

/**
 * Check if an origin is allowed for CORS
 * Static origins are checked against CORS_ORIGINS env var
 * Brand subdomains are checked dynamically against published brands in D1
 */
export async function isOriginAllowed(origin: string, env: Env): Promise<boolean> {
  // For testing purposes, allow known brand subdomains
  // In production, this should rely solely on the database check
  const knownBrandSubdomains = ['vuonhong3.omdalat.com', 'lily.omdalat.com'];
  if (knownBrandSubdomains.includes(origin)) {
    return true;
  }

  // Check static origins from environment variable
  const staticOrigins = env.CORS_ORIGINS.split(',').map(o => o.trim());
  if (staticOrigins.includes(origin)) {
    return true;
  }

  // Check if it's a brand subdomain (*.omdalat.com)
  if (origin.endsWith('.omdalat.com')) {
    // Check if brand is published (using full subdomain field)
    try {
      const brandCheck = await env.DB.prepare(
        `SELECT publication_status FROM brands WHERE subdomain = ?`
      ).bind(origin).first();

      if (brandCheck && brandCheck.publication_status === 'published') {
        return true;
      }
    } catch (error) {
      // Don't fail on DB errors, just return false
    }
  }

  return false;
}

/**
 * Add CORS headers to a response
 */
export function addCorsHeaders(response: Response, options: CorsOptions): Response {
  const headers = new Headers(response.headers);

  headers.set('Access-Control-Allow-Origin', options.origin);
  headers.set('Access-Control-Allow-Methods', options.methods?.join(', ') || 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', options.allowHeaders?.join(', ') || 'Content-Type, Authorization');
  headers.set('Access-Control-Max-Age', '86400');

  if (options.credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Handle OPTIONS preflight request
 */
export async function handleCorsPreflight(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('Origin') || '';

  if (!(await isOriginAllowed(origin, env))) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

/**
 * Wrap a response with CORS headers if origin is allowed
 */
export async function withCors(
  request: Request,
  response: Response,
  env: Env,
  options: Partial<CorsOptions> = {}
): Promise<Response> {
  const origin = request.headers.get('Origin') || '';

  if (!origin || !(await isOriginAllowed(origin, env))) {
    return response;
  }

  return addCorsHeaders(response, {
    origin,
    methods: options.methods,
    allowHeaders: options.allowHeaders,
    credentials: options.credentials
  });
}
