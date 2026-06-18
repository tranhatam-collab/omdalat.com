# LILY BRAND FACTORY - DNS CONFIGURATION INSTRUCTIONS 2026

## Current Status
- ✅ API Worker deployed: api.omdalat.com
- ✅ Brand Renderer deployed: brand.omdalat.com
- ✅ Database migrations applied to production
- ✅ Lily brand data seeded in database
- ❌ DNS Configuration: lily.omdalat.com (NOT CONFIGURED)

## DNS Configuration Required

### Target Configuration
- **Record Type:** CNAME
- **Name:** lily
- **Target:** brand.omdalat.com
- **Proxy Status:** Proxied (Orange cloud)
- **TTL:** Auto

## Configuration Methods

### Method 1: Cloudflare Dashboard (Recommended)

#### Step 1: Access Cloudflare Dashboard
1. Log in to Cloudflare Dashboard: https://dash.cloudflare.com
2. Select the omdalat.com zone
3. Navigate to DNS > Records

#### Step 2: Add CNAME Record
1. Click "Add Record"
2. Configure as follows:
   - **Type:** CNAME
   - **Name:** lily
   - **Target:** brand.omdalat.com
   - **Proxy Status:** Proxied (Orange cloud)
   - **TTL:** Auto
3. Click "Save"

#### Step 3: Verify Configuration
After adding the record, verify:
```bash
# Check DNS resolution
dig lily.omdalat.com

# Check with specific DNS server
nslookup lily.omdalat.com 8.8.8.8
```

### Method 2: Cloudflare API (Automated)

#### Prerequisites
- Cloudflare API Token with Zone:DNS:Edit permissions
- Zone ID for omdalat.com

#### Get Your Credentials

**Get API Token:**
1. Go to Cloudflare Dashboard > My Profile > API Tokens
2. Create token with permissions:
   - Zone - DNS - Edit
   - Zone - Zone - Read
3. Copy the token

**Get Zone ID:**
1. Go to Cloudflare Dashboard > omdalat.com
2. Look at the URL: https://dash.cloudflare.com/{ZONE_ID}/dns
3. Copy the ZONE_ID

#### Run Configuration Script
```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN=your_api_token_here
export ZONE_ID=your_zone_id_here

# Run the script
cd /Users/tranhatam/Documents/Devnewproject/omdalat.com
./scripts/configure-lily-dns.sh
```

## Verification Steps

### 1. DNS Resolution
```bash
# Should resolve to Cloudflare IPs
dig lily.omdalat.com +short
```

### 2. HTTP Access
```bash
# Should return HTTP 301 redirect to HTTPS
curl -I http://lily.omdalat.com
```

### 3. HTTPS Access
```bash
# Should return HTTP 200 with valid SSL
curl -I https://lily.omdalat.com
```

### 4. SSL Certificate
```bash
# Should show valid certificate
openssl s_client -connect lily.omdalat.com:443 -servername lily.omdalat.com
```

## Timeline

- **DNS Configuration:** 15 minutes
- **SSL Certificate:** 15-30 minutes (automatic)
- **DNS Propagation:** 1-2 hours (up to 24 hours)
- **Total Time:** 2-3 hours typically

## Troubleshooting

### DNS Not Resolving
- Check DNS record is correctly configured
- Verify DNS propagation (use dig with different DNS servers)
- Check for conflicting records

### SSL Certificate Issues
- Wait 15-30 minutes for certificate provisioning
- Check SSL/TLS settings in Cloudflare
- Verify CNAME flattening is enabled

### Worker Not Responding
- Verify brand-renderer worker is deployed
- Check worker logs in Cloudflare Dashboard
- Verify routing configuration

## Post-Configuration Testing

After DNS is configured, test:
1. Access https://lily.omdalat.com in browser
2. Verify SSL certificate is valid
3. Test brand site loads correctly
4. Test inquiry form works
5. Test bilingual functionality

## Next Steps After DNS Configuration

1. **Immediate (After DNS Propagation)**
   - Test lily.omdalat.com in browser
   - Verify SSL certificate
   - Test all functionality

2. **Content Completion**
   - Upload real images to R2 bucket
   - Verify address and coordinates
   - Complete compliance documentation
   - Obtain owner consent

3. **Public Launch**
   - Change brand status from private_preview to published
   - Monitor performance
   - Handle user inquiries
   - Collect feedback

## Current Lily Brand Status

### Brand Identity
- **ID:** brnd_lily
- **Name:** Lily / Homestay Lily Lạc Dương Đà Lạt
- **Type:** hybrid_local_brand
- **Status:** private_preview
- **Subdomain:** lily.omdalat.com

### Business Lines
1. **Homestay Lily** - phase_1_public_after_compliance
2. **Lily Café** - phase_1_public_after_owner_confirmation
3. **Bất động sản Lily** - roadmap_private_noindex
4. **Nhà hàng và quán ăn Lily** - roadmap_private_noindex
5. **Trải nghiệm địa phương Lily** - roadmap_private_noindex

### Content Status
- **Vietnamese:** 8 content blocks (published)
- **English:** 8 content blocks (published)
- **Translation Status:** ready
- **SEO:** Complete with meta tags and descriptions

### Compliance Gates
- **Owner Consent:** pending
- **Content Approval:** pending
- **Images Approval:** pending
- **Compliance Review:** pending
- **QA Passed:** pending

## Contact Information

For DNS configuration issues:
- Cloudflare Support: https://support.cloudflare.com
- Internal DevOps: [To be assigned]

## Documentation

Related documentation:
- Deployment Guide: `docs/LILY_DEPLOYMENT_GUIDE_2026.md`
- Deployment Plan: `docs/LILY_DEPLOYMENT_PLAN_2026.md`
- Production Summary: `docs/LILY_PRODUCTION_DEPLOYMENT_SUMMARY_2026.md`
- DNS Configuration Script: `scripts/configure-lily-dns.sh`