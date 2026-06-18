# LILY BRAND FACTORY - PRODUCTION DEPLOYMENT GUIDE

## Prerequisites

### Required Tools
- Node.js (v18+)
- Wrangler CLI (v4+)
- Git
- Cloudflare account with appropriate permissions

### Required Access
- Cloudflare Workers access
- D1 database access
- DNS configuration access
- R2 bucket access

## Pre-Deployment Checklist

### 1. Code Verification
- [ ] All migrations tested locally
- [ ] API routes tested locally
- [ ] Brand-renderer tested locally
- [ ] CORS configuration verified
- [ ] Compliance gates tested
- [ ] Content blocks verified

### 2. Database Preparation
- [ ] Backup existing production database
- [ ] Review migration files
- [ ] Verify seed data correctness
- [ ] Test rollback plan

### 3. Environment Configuration
- [ ] Verify environment variables
- [ ] Check CORS origins configuration
- [ ] Verify database bindings
- [ ] Check R2 bucket bindings

### 4. DNS Preparation
- [ ] Plan DNS record for lily.omdalat.com
- [ ] Prepare SSL certificate request
- [ ] Plan DNS propagation time
- [ ] Prepare rollback DNS plan

## Deployment Steps

### Phase 1: Database Migration

```bash
# Navigate to API worker directory
cd workers/api

# Apply migrations to production
wrangler d1 migrations apply omdalat-core --remote

# Verify migration success
wrangler d1 execute omdalat-core --remote --command "SELECT name FROM sqlite_master WHERE type='table'"

# Verify Lily data
wrangler d1 execute omdalat-core --remote --command "SELECT * FROM brands WHERE slug='lily'"
```

### Phase 2: API Worker Deployment

```bash
# Navigate to API worker directory
cd workers/api

# Deploy to production
wrangler deploy --env production

# Verify deployment
curl -I https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview
```

### Phase 3: Brand Renderer Deployment

```bash
# Navigate to brand-renderer directory
cd workers/brand-renderer

# Deploy to production
wrangler deploy --env production

# Verify deployment
curl -I https://brand.omdalat.com
```

### Phase 4: DNS Configuration

**Manual Steps Required:**

1. Log in to Cloudflare Dashboard
2. Navigate to DNS > omdalat.com
3. Add CNAME record:
   - Name: `lily`
   - Target: Brand renderer worker domain
   - Proxy status: Proxied (orange cloud)
4. Wait for SSL certificate provisioning
5. Wait for DNS propagation (up to 24 hours)

### Phase 5: Production Testing

```bash
# Run production QA tests
./scripts/test-lily-production.sh
```

## Verification Steps

### 1. API Verification
```bash
# Test brand preview
curl https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview

# Test inquiry endpoint
curl -X POST https://api.omdalat.com/api/omdalat/brands/brnd_lily/inquiry \
  -H "Content-Type: application/json" \
  -d '{"contact":"test@example.com","message":"Test","locale":"vi"}'

# Test compliance gates
curl -X POST https://api.omdalat.com/api/omdalat/brands/brnd_lily/publish \
  -H "Content-Type: application/json"
```

### 2. Brand Site Verification
```bash
# Test brand site loads
curl -I https://lily.omdalat.com

# Test content is correct
curl https://lily.omdalat.com | grep "Homestay Lily"

# Test business section
curl https://lily.omdalat.com | grep "Dòng kinh doanh"
```

### 3. SSL Verification
```bash
# Check SSL certificate
curl -I https://lily.omdalat.com

# Check HTTPS redirect
curl -I http://lily.omdalat.com
```

## Rollback Plan

### Database Rollback
```bash
# If migration fails, restore from backup
wrangler d1 execute omdalat-core --remote --file backup.sql
```

### Worker Rollback
```bash
# Rollback API worker to previous version
cd workers/api
wrangler rollback --env production

# Rollback brand-renderer to previous version
cd workers/brand-renderer
wrangler rollback --env production
```

### DNS Rollback
- Remove CNAME record for lily.omdalat.com
- DNS propagation may take up to 24 hours

## Monitoring

### Key Metrics to Monitor
- API response time
- Brand site load time
- Error rates
- Inquiry submission rate
- Database query performance

### Monitoring Tools
- Cloudflare Analytics
- Worker Logs
- D1 Query Analytics
- R2 Usage Analytics

## Troubleshooting

### Common Issues

#### 1. Migration Fails
**Symptoms:** Migration command fails with error
**Solutions:**
- Check database connection
- Verify migration file syntax
- Check for foreign key constraints
- Review database backup

#### 2. Worker Deployment Fails
**Symptoms:** wrangler deploy fails
**Solutions:**
- Check wrangler authentication
- Verify environment variables
- Review worker logs
- Check resource limits

#### 3. DNS Not Resolving
**Symptoms:** lily.omdalat.com not accessible
**Solutions:**
- Check DNS record configuration
- Verify SSL certificate status
- Check worker routing
- Wait for DNS propagation

#### 4. CORS Errors
**Symptoms:** API calls blocked by CORS
**Solutions:**
- Verify CORS configuration
- Check origin headers
- Review CORS middleware
- Test with different origins

## Post-Deployment Tasks

### 1. Field Team Preparation
- [ ] Contact owner for verification
- [ ] Schedule image shooting
- [ ] Prepare compliance documentation
- [ ] Plan real-world testing

### 2. Content Finalization
- [ ] Replace placeholder images
- [ ] Update address information
- [ ] Verify contact details
- [ ] Finalize business descriptions

### 3. Compliance Completion
- [ ] Obtain owner consent
- [ ] Complete compliance review
- [ ] Verify image rights
- [ ] Run QA agent

### 4. Public Launch Preparation
- [ ] Set publication status to published
- [ ] Enable public access
- [ ] Monitor initial traffic
- [ ] Collect user feedback

## Support Contacts

### Technical Support
- Cloudflare Support: https://support.cloudflare.com
- Wrangler Documentation: https://developers.cloudflare.com/workers/wrangler/

### Internal Support
- Technical Lead: [To be assigned]
- Database Administrator: [To be assigned]
- DevOps Engineer: [To be assigned]

## Documentation

### Related Documents
- Deployment Plan: `docs/LILY_DEPLOYMENT_PLAN_2026.md`
- API Documentation: `docs/API_DOCUMENTATION.md`
- Database Schema: `docs/DATABASE_SCHEMA.md`
- Brand Factory Spec: `docs/BRAND_FACTORY_SPEC.md`

### Scripts
- Deployment Script: `scripts/deploy-lily-production.sh`
- QA Test Script: `scripts/test-lily-production.sh`
- Backup Script: `scripts/backup-database.sh`

## Change Log

### 2026-06-17
- Initial deployment guide created
- Multi-line brand support added
- Business lines table created
- Media assets table created
- Compliance gates implemented

## Appendix

### Environment Variables
```
APP_NAME=omdalat-platforms
APP_ENV=production
SESSION_COOKIE=omd_session
COOKIE_DOMAIN=.omdalat.com
CORS_ORIGINS=https://omdalat.com,https://www.omdalat.com,https://app.omdalat.com,https://ap.omdalat.com,https://lily.omdalat.com
```

### Database Tables
- `brands` - Brand information
- `business_lines` - Business line information
- `content_blocks` - Content blocks for brands
- `media_assets` - Image and media assets
- `compliance_checklists` - Compliance tracking
- `inquiries` - Customer inquiries

### API Endpoints
- `GET /api/omdalat/brands/brnd_lily/preview` - Brand preview
- `POST /api/omdalat/brands/brnd_lily/inquiry` - Submit inquiry
- `POST /api/omdalat/brands/brnd_lily/publish` - Publish brand
- `POST /api/omdalat/brands/brnd_lily/approve` - Approve brand

### DNS Records
- `lily.omdalat.com` CNAME -> Brand renderer worker
- `api.omdalat.com` CNAME -> API worker
- `ap.omdalat.com` CNAME -> Editorial site
