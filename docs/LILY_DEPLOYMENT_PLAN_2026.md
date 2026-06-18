# LILY BRAND FACTORY - COMPREHENSIVE DEPLOYMENT PLAN 2026

## Overview
Complete deployment plan for Lily multi-line brand (homestay + café) following 3-layer model.

## Team Responsibilities

### Team 1: Foundation & QA
**Responsibilities:**
- Review all code changes for consistency
- Run comprehensive local testing
- Verify compliance gates enforcement
- Test all API endpoints
- Verify brand-renderer functionality
- Production deployment oversight
- Final QA verification

### Team 2: DEV (Implementation)
**Responsibilities:**
- Code implementation and fixes
- Database migrations
- Worker deployment
- DNS configuration
- Production monitoring
- Hotfix deployment if needed

### Team 3: Field/Content
**Responsibilities:**
- Owner verification and consent
- Image shooting and rights verification
- Address and coordinate resolution
- Compliance documentation
- Content finalization
- Real-world testing

## Deployment Phases

### Phase 1: Pre-Deployment Verification (Local)
**Status**: Ready to start
**Duration**: 2-3 hours

**Tasks:**
1. ✅ Database schema verification
2. ✅ API routes testing
3. ✅ Brand-renderer testing
4. ✅ CORS configuration testing
5. ✅ Compliance gates testing
6. ✅ Business lines functionality testing
7. ✅ Content blocks verification
8. ✅ SEO metadata verification

**Acceptance Criteria:**
- All migrations apply successfully
- All API endpoints return correct responses
- Brand-renderer displays correct content
- Compliance gates block publish when not met
- Business lines display correctly
- SEO metadata is complete

### Phase 2: Production Deployment
**Status**: Pending Phase 1 completion
**Duration**: 1-2 hours

**Tasks:**
1. D1 migrations to production
2. API worker deployment
3. Brand-renderer worker deployment
4. DNS configuration for lily.omdalat.com
5. Environment variables verification
6. CORS origins update

**Rollback Plan:**
- Keep previous worker versions
- Database backup before migrations
- DNS can be reverted quickly
- Feature flags for gradual rollout

### Phase 3: Production Testing
**Status**: Pending Phase 2 completion
**Duration**: 1-2 hours

**Tasks:**
1. API endpoint testing in production
2. Brand-renderer testing in production
3. DNS resolution testing
4. SSL certificate verification
5. Performance testing
6. Cross-browser testing
7. Mobile responsiveness testing

**Acceptance Criteria:**
- All endpoints respond correctly
- Brand site loads within 3 seconds
- SSL certificate is valid
- Mobile display is correct
- No console errors

### Phase 4: Field Verification
**Status**: Pending Phase 3 completion
**Duration**: 1-2 weeks

**Tasks:**
1. Owner contact and consent
2. Real address verification
3. Image shooting and upload
4. Compliance documentation
5. Real-world inquiry testing
6. User feedback collection

**Acceptance Criteria:**
- Owner consent obtained
- Address verified
- Images uploaded with rights
- Compliance documentation complete
- Real inquiries work correctly

## Testing Checklist

### Local Testing
- [ ] D1 migrations apply successfully
- [ ] Brand record created correctly
- [ ] Business lines inserted correctly
- [ ] Content blocks display correctly
- [ ] API preview endpoint works
- [ ] API inquiry endpoint works
- [ ] API publish endpoint enforces gates
- [ ] Brand-renderer shows holding page for private_preview
- [ ] Brand-renderer shows full site for published
- [ ] Navigation links work correctly
- [ ] Business section displays correctly
- [ ] Contact form submits correctly
- [ ] CORS allows lily.omdalat.com
- [ ] SEO metadata is complete

### Production Testing
- [ ] DNS resolves lily.omdalat.com
- [ ] SSL certificate is valid
- [ ] Brand site loads from production
- [ ] API endpoints respond correctly
- [ ] Database queries work in production
- [ ] Error monitoring is active
- [ ] Logging is configured
- [ ] Performance is acceptable
- [ ] Mobile display is correct

## Risk Assessment

### High Risk
- **DNS configuration failure**: Mitigation - have backup DNS ready
- **Database migration failure**: Mitigation - backup before migration, rollback plan
- **CORS issues in production**: Mitigation - test CORS thoroughly locally

### Medium Risk
- **Performance issues**: Mitigation - monitor performance, optimize if needed
- **Mobile display issues**: Mitigation - test on multiple devices
- **SSL certificate delay**: Mitigation - request certificate early

### Low Risk
- **Content typos**: Mitigation - thorough content review
- **Image loading issues**: Mitigation - use placeholder images initially
- **SEO metadata issues**: Mitigation - use SEO tools to verify

## Monitoring Plan

### Key Metrics
- API response time
- Brand site load time
- Error rates
- Inquiry submission rate
- User engagement metrics

### Alerts
- API error rate > 5%
- Brand site load time > 5 seconds
- Database query failures
- SSL certificate expiration
- DNS resolution failures

## Success Criteria

### Technical Success
- All deployments complete without errors
- All tests pass
- Performance meets requirements
- No critical bugs in production

### Business Success
- Lily brand site is accessible
- Inquiries can be submitted
- Business lines are displayed correctly
- Compliance gates work as expected
- Field team can verify owner and content

### Timeline Success
- Phase 1: Complete within 3 hours
- Phase 2: Complete within 2 hours
- Phase 3: Complete within 2 hours
- Phase 4: Complete within 2 weeks

## Communication Plan

### Pre-Deployment
- Notify all teams of deployment schedule
- Share deployment plan
- Assign responsibilities
- Set up communication channels

### During Deployment
- Real-time status updates
- Immediate issue reporting
- Quick decision-making
- Rollback communication if needed

### Post-Deployment
- Deployment summary
- Issue documentation
- Next steps for field team
- Monitoring setup confirmation

## Next Steps

1. **Immediate**: Start Phase 1 local testing
2. **After Phase 1**: Deploy to production (Phase 2)
3. **After Phase 2**: Production testing (Phase 3)
4. **After Phase 3**: Field verification (Phase 4)
5. **Ongoing**: Monitor and optimize

## Contact Information

**Technical Lead**: [To be assigned]
**Field Lead**: [To be assigned]
**QA Lead**: [To be assigned]
**Deployment Coordinator**: [To be assigned]

## Appendix

### Files Changed
- `workers/api/migrations/0006_media_assets.sql`
- `workers/api/migrations/0007_business_lines.sql`
- `workers/api/migrations/seed_lily.sql`
- `workers/api/src/lib/cors.ts`
- `workers/api/src/routes/` (brand routes)
- `workers/brand-renderer/` (complete worker)
- `ap.omdalat.com/content/cms/place-lily-lac-duong.json`

### Database Schema Changes
- New table: `media_assets`
- New table: `business_lines`
- Updated: `brands` (brand_type field)
- New records: Lily brand, content blocks, business lines

### API Endpoints
- `GET /api/omdalat/brands/brnd_lily/preview`
- `POST /api/omdalat/brands/brnd_lily/inquiry`
- `POST /api/omdalat/brands/brnd_lily/publish`
- `POST /api/omdalat/brands/brnd_lily/approve`

### DNS Configuration
- New subdomain: `lily.omdalat.com`
- Target: brand-renderer worker
- SSL: Required
