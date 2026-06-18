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
