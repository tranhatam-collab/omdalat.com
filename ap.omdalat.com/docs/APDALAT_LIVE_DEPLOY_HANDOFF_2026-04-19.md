# APDALAT_LIVE_DEPLOY_HANDOFF_2026-04-19

## Status
Production deploy is live on Vercel.
Custom domain is aliased and currently resolving to production.

## Live URLs
- Production alias: [https://apomdalatcom.vercel.app](https://apomdalatcom.vercel.app)
- Deployment URL: [https://apomdalat-g0gedyzen-tranhatam-6714s-projects.vercel.app](https://apomdalat-g0gedyzen-tranhatam-6714s-projects.vercel.app)
- Inspector: [https://vercel.com/tranhatam-6714s-projects/ap.omdalat.com/8UV9z3rHJimSZRxYwcWiJEKYfh5g](https://vercel.com/tranhatam-6714s-projects/ap.omdalat.com/8UV9z3rHJimSZRxYwcWiJEKYfh5g)

## Domain status
- Custom domain added in Vercel: `ap.omdalat.com`
- Vercel has accepted and aliased the domain to the project.
- Local DNS resolution from this machine is now returning HTTP 200 on `https://ap.omdalat.com`.
- Vercel preview deployment URL returns HTTP 401 due deployment protection, so QA should verify via custom domain.

## DNS target
The required DNS record for `ap.omdalat.com` remains:

```txt
Type: A
Name: ap
Value: 76.76.21.21
TTL: Auto
```

## Current nameserver state reported by Vercel
- Current nameservers:
  - `davina.ns.cloudflare.com`
  - `justin.ns.cloudflare.com`
- Because the domain keeps Cloudflare nameservers, only the `A` record above is needed.
- No nameserver migration to Vercel is required.

## Recommended check after DNS update / propagation
1. Run `dig +short ap.omdalat.com`
2. Confirm it returns `76.76.21.21`
3. Open [https://ap.omdalat.com](https://ap.omdalat.com)
4. Check:
   - homepage loads
   - `/en` loads
   - one people page loads
   - one place page loads
   - one story page loads
   - images render correctly

## Notes
- Vercel project name: `ap.omdalat.com`
- Current deploy is static and already usable for team review.
- Latest production deploy reached `Ready` state on 2026-04-19 at approximately 23:15 ICT.
- Deployment ID: `dpl_8UV9z3rHJimSZRxYwcWiJEKYfh5g`
- Team 1 release gate is now script-backed and passed on this deploy:
  - `node scripts/release-gate-team1.mjs --visual-dir=reports/visual-qa/2026-04-19/core --expected-visual-min=56`
- Release gate now includes:
  - static route head sync (`scripts/sync-static-routes-meta.mjs`)
  - OG extraction check for static + dynamic VI/EN routes
- Foundation content seed is now 15 stories (VI/EN paired).
- Core visual matrix for this deploy: 56 screenshots (28 mobile + 28 desktop).
- Custom domain currently resolves to the latest production deployment and should be used as the primary QA endpoint.
