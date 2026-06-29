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
import { handleComplianceUpdate } from './routes/compliance-update';
import { handleBrandInquiry } from './routes/brand-inquiry';
import { handleBrandList } from './routes/brand-list';
import { handleBrandDelete } from './routes/brand-delete';
import { handleCorsPreflightRoute } from './routes/cors-preflight';
import { handleBrandAdminLogin } from './routes/brand-admin-login';
import { handleLilyPublic } from './routes/lily-public';
import { handleAssetPackageCreate, handleAssetPackageGet, handleAssetPackageList } from './routes/asset-package';
import { handleRegistryGet, handleRegistryEventAdd } from './routes/registry';
import { handleMarketplaceRequestAccess, handleMarketplaceListings, handleMarketplaceListingCreate } from './routes/marketplace';
import { handleVerificationCaseCreate, handleVerificationTaskAdd, handleVerificationCaseComplete } from './routes/verification';
import { handleEvidenceSubmit, handleEvidenceVerify, handleTransferCreate } from './routes/evidence-transfer';
import {
  handleOfferCreate, handleOfferList, handleOfferRespond,
  handleBuyerQualify, handleBuyerRequestList,
  handleListingApprove
} from './routes/offers-admin';
import {
  handleDataRoomCreate, handleDataRoomGet, handleDataRoomRequestAccess, handleDataRoomGrantApprove,
  handleTransferGet, handleTransferUpdateStep
} from './routes/data-room-transfer';

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

// Lily V2 routes (public) — must be before brand routes to avoid :id collision
router.get('/api/lily/public', handleLilyPublic);
router.get('/api/lily/stay-plans', handleLilyPublic);
router.post('/api/lily/applications', handleLilyPublic);

// Brand Factory routes
router.post('/api/omdalat/brand-intake', handleBrandIntake);
router.post('/api/omdalat/agent-runs', handleAgentRuns);
router.get('/api/omdalat/brands', handleBrandList);
router.get('/api/omdalat/brands/:id/preview', handleBrandPreview);
router.post('/api/omdalat/brands/:id/approve', handleBrandApproval);
router.post('/api/omdalat/brands/:id/publish', handleBrandPublish);
router.post('/api/omdalat/brands/:id/compliance', handleComplianceUpdate);
router.post('/api/omdalat/brands/:id/inquiry', handleBrandInquiry);
router.delete('/api/omdalat/brands/:id', handleBrandDelete);

// Brand admin authentication
router.post('/api/omdalat/admin/login', handleBrandAdminLogin);

// Brand Asset Network — asset packages
router.post('/api/omdalat/asset-packages', handleAssetPackageCreate);
router.get('/api/omdalat/asset-packages', handleAssetPackageList);
router.get('/api/omdalat/asset-packages/:id', handleAssetPackageGet);

// Brand Asset Network — registry (public provenance)
router.get('/api/omdalat/registry/:public_id', handleRegistryGet);
router.post('/api/omdalat/registry/:public_id/events', handleRegistryEventAdd);

// Brand Asset Network — marketplace
router.get('/api/omdalat/marketplace/listings', handleMarketplaceListings);
router.post('/api/omdalat/marketplace/listings', handleMarketplaceListingCreate);
router.post('/api/omdalat/marketplace/request-access', handleMarketplaceRequestAccess);

// Brand Asset Network — verification workflow
router.post('/api/omdalat/verification/cases', handleVerificationCaseCreate);
router.post('/api/omdalat/verification/cases/:id/tasks', handleVerificationTaskAdd);
router.post('/api/omdalat/verification/cases/:id/complete', handleVerificationCaseComplete);

// Brand Asset Network — evidence and transfer
router.post('/api/omdalat/evidence', handleEvidenceSubmit);
router.post('/api/omdalat/evidence/:id/verify', handleEvidenceVerify);
router.post('/api/omdalat/transfers', handleTransferCreate);
router.get('/api/omdalat/transfers/:id', handleTransferGet);
router.post('/api/omdalat/transfers/:id/update-step', handleTransferUpdateStep);

// Brand Asset Network — offers, buyer qualification, listing approval
router.post('/api/omdalat/offers', handleOfferCreate);
router.get('/api/omdalat/offers/:package_id', handleOfferList);
router.post('/api/omdalat/offers/:id/accept', handleOfferRespond);
router.post('/api/omdalat/offers/:id/reject', handleOfferRespond);
router.post('/api/omdalat/buyer-requests/:id/qualify', handleBuyerQualify);
router.get('/api/omdalat/buyer-requests', handleBuyerRequestList);
router.post('/api/omdalat/listings/:id/approve', handleListingApprove);
router.post('/api/omdalat/listings/:id/suspend', handleListingApprove);

// Brand Asset Network — data rooms
router.post('/api/omdalat/data-rooms', handleDataRoomCreate);
router.get('/api/omdalat/data-rooms/:id', handleDataRoomGet);
router.post('/api/omdalat/data-rooms/:id/request-access', handleDataRoomRequestAccess);
router.post('/api/omdalat/data-rooms/:id/grants/:grant_id/approve', handleDataRoomGrantApprove);

// 404 handler
router.all('*', () => new Response('Not Found', { status: 404 }));

export default router;
