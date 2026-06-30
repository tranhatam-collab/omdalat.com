import type { Env } from '../index';

export const handleHealthCheck = async (request: Request, env: Env): Promise<Response> => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.APP_ENV,
    app: env.APP_NAME
  };

  return new Response(JSON.stringify(health), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

/**
 * /version endpoint — returns build provenance for production verification.
 *
 * BUILD_COMMIT_SHA and BUILD_TIMESTAMP are injected by scripts/deploy-with-sha.sh
 * (or CI) before `wrangler deploy`. They MUST NOT be hand-edited.
 *
 * Verification protocol:
 * 1. Run `git rev-parse HEAD` locally → get audited SHA
 * 2. GET https://api.omdalat.com/version → get deployed SHA
 * 3. The two MUST match for "prod == repo" to be true
 *
 * If BUILD_COMMIT_SHA is not set (e.g., dev deploy without the script),
 * returns "unknown" so the mismatch is obvious.
 */
export const handleVersionCheck = async (request: Request, env: Env): Promise<Response> => {
  const version = {
    app: env.APP_NAME,
    environment: env.APP_ENV,
    build_commit_sha: (env as any).BUILD_COMMIT_SHA || 'unknown',
    build_timestamp: (env as any).BUILD_TIMESTAMP || 'unknown',
    runtime_timestamp: new Date().toISOString(),
    wrangler_deployment_id: request.headers.get('cf-deployment-id') || 'not-exposed',
    // Note: Cloudflare does not expose the deployment ID at runtime via env.
    // The dashboard shows it; /version surfaces the git SHA instead.
    verification_url: 'https://docs.omdalat.com/runbook/version-verification',
  };

  return new Response(JSON.stringify(version, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    }
  });
};
