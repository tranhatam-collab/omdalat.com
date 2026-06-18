import type { Env } from '../index';

export const handlePaymentProviders = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const providers = [
    {
      code: 'payos',
      name: 'PayOS (VietQR)',
      enabled: true,
      mode: env.APP_ENV === 'production' ? 'live' : 'sandbox',
      routing_mode: 'pay_iai_one',
      currencies: ['VND'],
      icon: 'https://payos.vn/favicon.ico',
      description: 'Vietnamese payment via PayOS'
    }
  ];

  return new Response(
    JSON.stringify({ providers }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
