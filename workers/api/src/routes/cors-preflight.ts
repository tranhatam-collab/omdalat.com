import type { Env } from '../index';
import { handleCorsPreflight } from '../lib/cors';

export const handleCorsPreflightRoute = async (
  request: Request,
  env: Env
): Promise<Response> => {
  return handleCorsPreflight(request, env);
};
