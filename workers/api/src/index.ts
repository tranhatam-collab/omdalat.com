import { Router } from 'itty-router';
import { handlePaymentCheckoutSession } from './routes/payment-checkout-session';
import { handlePaymentWebhook } from './routes/payment-webhook';
import { handlePaymentProviders } from './routes/payment-providers';
import { handleHealthCheck } from './routes/health';
import { handleBrandIntake } from './routes/brand-intake';
import { handleAgentRuns } from './routes/agent-runs';
import { handleBrandPreview } from './routes/brand-preview';
import { handleBrandApproval } from './routes/brand-approval';
import { handleBrandPublish } from './routes/brand-publish';
import { handleBrandInquiry } from './routes/brand-inquiry';
import { handleCorsPreflightRoute } from './routes/cors-preflight';

export interface Env {
  DB: D1Database;
  ASSETS: R2Bucket;
  AUTOMATION_QUEUE: Queue;
  TURNSTILE_SECRET_KEY?: string;
  PAYMENT_WEBHOOK_SECRET: string;
  PAY_IAI_ONE_API_KEY: string;
  MAIL_API_KEY: string;
  PAY_IAI_ONE_BASE_URL: string;
  PAY_IAI_ONE_TENANT_CODE: string;
  PAY_IAI_ONE_SITE_CODE: string;
  PAY_IAI_ONE_PROVIDER: string;
  PAY_IAI_ONE_CALLBACK_BASE_URL: string;
  MAIL_API_BASE_URL: string;
  EMAIL_FROM: string;
  EMAIL_FROM_AUTOREPLY: string;
  SUPPORT_EMAIL: string;
  BILLING_EMAIL: string;
  CONTACT_EMAIL: string;
  CORS_ORIGINS: string;
  APP_NAME: string;
  APP_ENV: string;
  SESSION_COOKIE: string;
  COOKIE_DOMAIN: string;
  GATEWAY_PRICE_VND: string;
  GATEWAY_SUCCESS_URL: string;
}

const router = Router<Request, [Env]>();

// CORS preflight handler for all routes
router.options('*', handleCorsPreflightRoute);

// Health check
router.get('/health', handleHealthCheck);

// Payment routes
router.post('/api/pay/checkout-session', handlePaymentCheckoutSession);
router.post('/api/pay/webhook', handlePaymentWebhook);
router.get('/api/payments/providers', handlePaymentProviders);

// Brand Factory routes
router.post('/api/omdalat/brand-intake', handleBrandIntake);
router.post('/api/omdalat/agent-runs', handleAgentRuns);
router.get('/api/omdalat/brands/:id/preview', handleBrandPreview);
router.post('/api/omdalat/brands/:id/approve', handleBrandApproval);
router.post('/api/omdalat/brands/:id/publish', handleBrandPublish);
router.post('/api/omdalat/brands/:id/inquiry', handleBrandInquiry);

// 404 handler
router.all('*', () => new Response('Not Found', { status: 404 }));

export default router;
