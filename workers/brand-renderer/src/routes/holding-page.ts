import type { Env } from '../index';

export const handleHoldingPage = async (
  request: Request,
  env: Env
): Promise<Response> => {
  // This is handled within brand-site.ts for now
  // Kept for future separation if needed
  return new Response('Not Found', { status: 404 });
};
