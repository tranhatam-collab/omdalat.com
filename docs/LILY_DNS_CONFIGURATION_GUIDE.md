# Lily Brand Factory - DNS Configuration Guide

## DNS Configuration for lily.omdalat.com

### Current Status
- ✅ API Worker deployed: api.omdalat.com
- ✅ Brand Renderer deployed: brand.omdalat.com
- ⏳ DNS Configuration: lily.omdalat.com (Manual Step Required)

### DNS Configuration Steps

#### Step 1: Access Cloudflare Dashboard
1. Log in to Cloudflare Dashboard
2. Select the omdalat.com zone
3. Navigate to DNS > Records

#### Step 2: Add CNAME Record for lily.omdalat.com
**Record Type:** CNAME
**Name:** lily
**Target:** brand.omdalat.com
**Proxy Status:** Proxied (Orange cloud)
**TTL:** Auto

#### Step 3: Verify DNS Configuration
After adding the record, verify:
```bash
# Check DNS resolution
dig lily.omdalat.com

# Check with specific DNS server
nslookup lily.omdalat.com 8.8.8.8
```

#### Step 4: SSL Certificate
Cloudflare will automatically provision SSL certificate for:
- lily.omdalat.com
- www.lily.omdalat.com (if needed)

SSL certificate provisioning typically takes 5-15 minutes.

#### Step 5: DNS Propagation
DNS propagation can take up to 24 hours, but typically completes within 1-2 hours.

### Alternative DNS Configuration

If you prefer to point directly to the worker:
**Record Type:** CNAME
**Name:** lily
**Target:** [Worker-specific domain from Cloudflare]
**Proxy Status:** Proxied (Orange cloud)

### Verification Steps

#### 1. DNS Resolution
```bash
# Should resolve to Cloudflare IPs
dig lily.omdalat.com +short
```

#### 2. HTTP Access
```bash
# Should return HTTP 301 redirect to HTTPS
curl -I http://lily.omdalat.com
```

#### 3. HTTPS Access
```bash
# Should return HTTP 200 with valid SSL
curl -I https://lily.omdalat.com
```

#### 4. SSL Certificate
```bash
# Should show valid certificate
openssl s_client -connect lily.omdalat.com:443 -servername lily.omdalat.com
```

### Troubleshooting

#### DNS Not Resolving
- Check DNS record is correctly configured
- Verify DNS propagation (use dig with different DNS servers)
- Check for conflicting records

#### SSL Certificate Issues
- Wait 15-30 minutes for certificate provisioning
- Check SSL/TLS settings in Cloudflare
- Verify CNAME flattening is enabled

#### Worker Not Responding
- Verify brand-renderer worker is deployed
- Check worker logs in Cloudflare Dashboard
- Verify routing configuration

### Rollback Plan

If DNS configuration causes issues:
1. Remove CNAME record for lily.omdalat.com
2. DNS will revert to previous state
3. Propagation may take up to 24 hours

### Post-Configuration Testing

After DNS is configured, test:
1. Access https://lily.omdalat.com in browser
2. Verify SSL certificate is valid
3. Test brand site loads correctly
4. Test inquiry form works
5. Test bilingual functionality

### Next Steps

After DNS configuration is complete:
1. Run production QA tests
2. Monitor logs and performance
3. Begin field verification process
4. Plan public launch

### Contact Information

For DNS configuration issues:
- Cloudflare Support: https://support.cloudflare.com
- Internal DevOps: [To be assigned]

### Documentation

Related documentation:
- Deployment Guide: `docs/LILY_DEPLOYMENT_GUIDE_2026.md`
- Deployment Plan: `docs/LILY_DEPLOYMENT_PLAN_2026.md`
- Production Test Script: `scripts/test-lily-production.sh`

### Timeline

- DNS Configuration: 15 minutes
- SSL Certificate: 15-30 minutes
- DNS Propagation: 1-2 hours (up to 24 hours)
- Total Time: 2-3 hours typically

### Notes

- DNS configuration is a manual step requiring Cloudflare dashboard access
- SSL certificate provisioning is automatic
- DNS propagation time varies by location
- Monitor DNS propagation using online tools like whatsmydns.net
