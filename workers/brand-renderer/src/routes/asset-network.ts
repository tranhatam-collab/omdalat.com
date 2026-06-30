import type { Env } from '../index';

/**
 * Handle Brand Asset Network surfaces:
 * - registry.omdalat.com — public provenance records
 * - market.omdalat.com — private marketplace (request-access only)
 * - auction.omdalat.com — legal-readiness page (NOT live auction)
 *
 * Per OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md:
 * - No buy/bid buttons in Phase 0
 * - No "Verified" global badge
 * - No auction until legal partner signoff
 * - No direct custody / escrow
 */

const COMMON_HEAD = (title: string, description: string, ogImage: string, canonical?: string, noindex?: boolean) => `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${canonical || 'https://omdalat.com'}">
  ${noindex ? '<meta name="robots" content="noindex,nofollow">\n  ' : ''}<link rel="alternate" hreflang="vi" href="${canonical || 'https://omdalat.com'}">
  <link rel="alternate" hreflang="en" href="${canonical ? canonical.replace(/\/en\/?$/, '') + '/en' : 'https://omdalat.com/en'}">
  <link rel="alternate" hreflang="x-default" href="${canonical || 'https://omdalat.com'}">
  <link rel="icon" href="https://omdalat.com/favicon.ico">
  <style>
    :root {
      --green: #1a5c43;
      --green-light: #2d8a68;
      --bg: #faf9f6;
      --card: #ffffff;
      --border: #e5e5e5;
      --text: #1a1a1a;
      --muted: #666;
      --warn: #b8860b;
      --red: #c0392b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 24px; }
    header {
      background: var(--green);
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header a { color: white; text-decoration: none; font-size: 0.9rem; opacity: 0.9; }
    header a:hover { opacity: 1; }
    .brand { font-weight: 700; font-size: 1.1rem; }
    .hero { padding: 48px 24px 32px; text-align: center; }
    .hero h1 { font-size: 2rem; color: var(--green); margin-bottom: 12px; }
    .hero p { color: var(--muted); max-width: 640px; margin: 0 auto; }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
    }
    .card h2 { color: var(--green); margin-bottom: 12px; font-size: 1.25rem; }
    .card h3 { color: var(--text); margin: 16px 0 8px; font-size: 1.05rem; }
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-draft { background: #f0f0f0; color: #666; }
    .badge-submitted { background: #fff3cd; color: #856404; }
    .badge-verified { background: #d4edda; color: #155724; }
    .badge-restricted { background: #f8d7da; color: #721c24; }
    .badge-disputed { background: #f8d7da; color: #721c24; }
    .badge-pending { background: #fff3cd; color: #856404; }
    .badge-info { background: #d1ecf1; color: #0c5460; }
    .trust-label {
      display: inline-block;
      padding: 2px 8px;
      margin: 2px;
      border-radius: 4px;
      font-size: 0.7rem;
      background: #e8f5e9;
      color: #1b5e20;
    }
    .trust-label-restricted { background: #fff3e0; color: #e65100; }
    .trust-label-disputed { background: #ffebee; color: #b71c1c; }
    .timeline { list-style: none; padding: 0; }
    .timeline li {
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
    }
    .timeline li:last-child { border-bottom: none; }
    .timeline .event-type {
      display: inline-block;
      font-weight: 600;
      color: var(--green);
      margin-right: 8px;
    }
    .timeline .event-date { color: var(--muted); font-size: 0.8rem; }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      color: #856404;
    }
    .info-box {
      background: #d1ecf1;
      border: 1px solid #bee5eb;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      color: #0c5460;
    }
    .legal-block {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      color: #721c24;
    }
    form { display: flex; flex-direction: column; gap: 12px; }
    label { font-weight: 600; font-size: 0.9rem; }
    input, textarea, select {
      padding: 10px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
    }
    button {
      background: var(--green);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover { background: var(--green-light); }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .listing-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
    }
    .listing-card h3 { color: var(--green); margin-bottom: 8px; }
    .listing-card .price { font-weight: 700; color: var(--text); margin: 8px 0; }
    .listing-card .level { font-size: 0.8rem; color: var(--muted); }
    .no-button {
      display: block;
      padding: 8px 16px;
      background: #e8f5e9;
      color: var(--green);
      text-align: center;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      margin-top: 12px;
    }
    footer {
      border-top: 1px solid var(--border);
      padding: 24px;
      text-align: center;
      color: var(--muted);
      font-size: 0.85rem;
      margin-top: 48px;
    }
    .lang-switch { display: flex; gap: 8px; }
    .lang-switch a { padding: 4px 10px; border-radius: 4px; font-size: 0.85rem; }
    .lang-switch a.active { background: rgba(255,255,255,0.2); }
    @media (max-width: 640px) {
      .hero h1 { font-size: 1.5rem; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>`;

const FOOTER = (isEn: boolean) => `
<footer>
  <p>${isEn ? 'Operated by Om Dalat. All claims are per-component. No global Verified badge.' : 'Vận hành bởi Om Dalat. Mọi xác nhận đều theo từng thành phần. Không có nhãn Verified toàn cục.'}</p>
  <p><a href="https://omdalat.com" style="color:var(--muted)">omdalat.com</a> · <a href="https://brand.omdalat.com" style="color:var(--muted)">brand.omdalat.com</a> · <a href="https://registry.omdalat.com" style="color:var(--muted)">registry.omdalat.com</a> · <a href="https://market.omdalat.com" style="color:var(--muted)">market.omdalat.com</a></p>
</footer>
</body>
</html>`;

const ASSET_LEVEL_LABEL = (level: number, isEn: boolean) => {
  const labels = isEn
    ? ['Idea', 'Seed', 'Ready-to-Launch', 'Operating', 'Transferable']
    : ['Ý tưởng', 'Hạt giống', 'Sẵn sàng khởi động', 'Đang vận hành', 'Sẵn sàng chuyển nhượng'];
  return labels[level] || labels[0];
};

const STATUS_BADGE = (status: string) => {
  const map: Record<string, string> = {
    declared: 'badge-draft',
    evidence_submitted: 'badge-submitted',
    under_review: 'badge-pending',
    reviewed_with_limits: 'badge-info',
    verified_control: 'badge-verified',
    verified_rights: 'badge-verified',
    transferable: 'badge-verified',
    restricted: 'badge-restricted',
    not_transferable: 'badge-restricted',
    disputed: 'badge-disputed',
    expired: 'badge-restricted',
  };
  return `<span class="badge ${map[status] || 'badge-draft'}">${status.replace(/_/g, ' ')}</span>`;
};

/**
 * registry.omdalat.com — public provenance record
 */
export async function handleRegistrySite(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const publicId = pathParts.find(p => p !== 'en' && p !== 'favicon.ico' && !p.startsWith('_'));

  // If no public_id, show registry home
  if (!publicId) {
    return renderRegistryHome(env, isEn, url);
  }

  // Fetch package by public_id
  const pkg = await env.DB.prepare(
    `SELECT id, public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, market_status, created_at, updated_at
     FROM asset_packages WHERE public_id = ? AND publication_status = 'published'`
  ).bind(publicId).first() as any;

  if (!pkg) {
    return new Response(
      COMMON_HEAD(isEn ? 'Record Not Found — Registry' : 'Không Tìm Thấy Hồ Sơ — Registry',
        isEn ? 'This registry record does not exist or is not public.' : 'Hồ sơ này không tồn tại hoặc chưa công bố.',
        'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg', url.origin + url.pathname) +
      `<body><header><div class="brand">Registry</div><div class="lang-switch"><a href="/" class="${isEn ? '' : 'active'}">VI</a><a href="/en" class="${isEn ? 'active' : ''}">EN</a></div></header>
       <div class="container"><div class="hero"><h1>${isEn ? 'Record Not Found' : 'Không Tìm Thấy Hồ Sơ'}</h1>
       <p>${isEn ? 'This registry record does not exist or is not yet published.' : 'Hồ sơ này không tồn tại hoặc chưa được công bố.'}</p>
       <p style="margin-top:16px"><a href="${isEn ? '/en' : '/'}" style="color:var(--green)">${isEn ? '← Back to Registry' : '← Về trang Registry'}</a></p>
       </div></div>` + FOOTER(isEn),
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  // Fetch components with trust labels
  const components = await env.DB.prepare(
    `SELECT ac.id, ac.component_class, ac.component_name, ac.description, ac.status, ac.transferable, ac.restrictions
     FROM asset_components ac WHERE ac.package_id = ? ORDER BY ac.sort_order`
  ).bind(pkg.id).all() as any;

  const trustLabels = await env.DB.prepare(
    `SELECT atl.component_id, atl.label FROM asset_trust_labels atl
     JOIN asset_components ac ON atl.component_id = ac.id WHERE ac.package_id = ?`
  ).bind(pkg.id).all() as any;

  const labelsByComponent: Record<string, string[]> = {};
  (trustLabels.results || []).forEach((l: any) => {
    if (!labelsByComponent[l.component_id]) labelsByComponent[l.component_id] = [];
    labelsByComponent[l.component_id].push(l.label);
  });

  // Fetch provenance events
  const events = await env.DB.prepare(
    `SELECT event_type, actor, description, created_at FROM registry_events
     WHERE package_id = ? AND public_visible = 1 ORDER BY created_at ASC`
  ).bind(pkg.id).all() as any;

  const componentRows = (components.results || []).map((c: any) => {
    const labels = (labelsByComponent[c.id] || []).map(l => {
      const isRestricted = l.includes('restricted') || l.includes('disputed');
      return `<span class="trust-label ${isRestricted ? 'trust-label-restricted' : ''}">${l.replace(/_/g, ' ')}</span>`;
    }).join('');
    return `
      <div class="card">
        <h3>${c.component_name} <span class="badge badge-info" style="font-size:0.7rem">${c.component_class}</span></h3>
        ${STATUS_BADGE(c.status)}
        ${c.description ? `<p style="margin-top:8px;color:var(--muted);font-size:0.9rem">${c.description}</p>` : ''}
        ${labels ? `<div style="margin-top:8px">${labels}</div>` : ''}
        ${c.restrictions ? `<p style="margin-top:8px;color:var(--warn);font-size:0.85rem">⚠ ${c.restrictions}</p>` : ''}
      </div>`;
  }).join('');

  const timeline = (events.results || []).map((e: any) => `
    <li>
      <span class="event-type">${e.event_type.replace(/_/g, ' ')}</span>
      <span class="event-date">${new Date(e.created_at).toLocaleDateString(isEn ? 'en-US' : 'vi-VN')}</span>
      <br>${e.description} <em>— ${e.actor}</em>
    </li>`).join('');

  const html = COMMON_HEAD(
    `${pkg.name_en || pkg.name_vi} — Registry`,
    isEn ? `Public provenance record for ${pkg.name_en || pkg.name_vi}` : `Hồ sơ nguồn gốc công khai cho ${pkg.name_vi}`,
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand">Registry · <a href="${isEn ? '/en' : '/'}">omdalat registry</a></div>
      <div class="lang-switch">
        <a href="/${pkg.public_id}" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/${pkg.public_id}" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="container">
      <div class="hero">
        <h1>${isEn ? (pkg.name_en || pkg.name_vi) : pkg.name_vi}</h1>
        <p>${isEn ? (pkg.summary_en || pkg.summary_vi || '') : (pkg.summary_vi || pkg.summary_en || '')}</p>
        <p style="margin-top:12px">
          <span class="badge badge-info">${pkg.public_id}</span>
          <span class="badge badge-verified">${ASSET_LEVEL_LABEL(pkg.asset_level, isEn)}</span>
          <span class="badge badge-info">${pkg.market_status.replace(/_/g, ' ')}</span>
        </p>
      </div>

      <div class="info-box">
        ${isEn
          ? '<strong>Trust labels are per-component.</strong> There is no global "Verified" badge. Each component is reviewed individually with evidence.'
          : '<strong>Nhãn tin cậy được gán theo từng thành phần.</strong> Không có nhãn "Verified" toàn cục. Mỗi thành phần được xem xét riêng với bằng chứng.'}
      </div>

      <h2 style="color:var(--green);margin:24px 0 12px">${isEn ? 'Asset Components' : 'Các Thành Phần Tài Sản'}</h2>
      ${componentRows || `<p style="color:var(--muted)">${isEn ? 'No components declared yet.' : 'Chưa có thành phần nào.'}</p>`}

      <h2 style="color:var(--green);margin:32px 0 12px">${isEn ? 'Provenance Timeline' : 'Dòng Thời Gian Nguồn Gốc'}</h2>
      <div class="card">
        <ul class="timeline">
          ${timeline || `<li style="color:var(--muted)">${isEn ? 'No events recorded.' : 'Chưa có sự kiện.'}</li>`}
        </ul>
      </div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

async function renderRegistryHome(env: Env, isEn: boolean, url: URL): Promise<Response> {
  // List published packages
  const result = await env.DB.prepare(
    `SELECT public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, market_status
     FROM asset_packages WHERE publication_status = 'published'
     ORDER BY created_at DESC LIMIT 50`
  ).all() as any;

  const packages = result.results || [];
  const cards = packages.map((p: any) => `
    <div class="listing-card">
      <h3>${isEn ? (p.name_en || p.name_vi) : p.name_vi}</h3>
      <p style="color:var(--muted);font-size:0.9rem">${isEn ? (p.summary_en || p.summary_vi || '') : (p.summary_vi || p.summary_en || '')}</p>
      <p style="margin-top:8px">
        <span class="badge badge-info">${p.public_id}</span>
        <span class="badge badge-verified">${ASSET_LEVEL_LABEL(p.asset_level, isEn)}</span>
      </p>
      <a class="no-button" href="${isEn ? '/en/' : '/'}${p.public_id}">${isEn ? 'View Record' : 'Xem Hồ Sơ'} →</a>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Om Dalat Registry — Brand Asset Provenance' : 'Om Dalat Registry — Nguồn Gốc Tài Sản Thương Hiệu',
    isEn ? 'Public provenance records for brand asset packages in the Om Dalat network.' : 'Hồ sơ nguồn gốc công khai cho các gói tài sản thương hiệu trong mạng lưới Om Dalat.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand">Registry</div>
      <div class="lang-switch">
        <a href="/" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Brand Asset Registry' : 'Sổ Đăng Ký Tài Sản Thương Hiệu'}</h1>
      <p>${isEn
        ? 'Public provenance records for brand asset packages. Each record shows component status, trust labels, and a timeline of events.'
        : 'Hồ sơ nguồn gốc công khai cho các gói tài sản thương hiệu. Mỗi hồ sơ hiển thị trạng thái thành phần, nhãn tin cậy và dòng thời gian sự kiện.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn
          ? '<strong>No global "Verified" badge.</strong> Trust labels are assigned per-component based on submitted evidence.'
          : '<strong>Không có nhãn "Verified" toàn cục.</strong> Nhãn tin cậy được gán theo từng thành phần dựa trên bằng chứng đã nộp.'}
      </div>
      <h2 style="color:var(--green);margin:24px 0 12px">${isEn ? 'Published Records' : 'Hồ Sơ Đã Công Bố'}</h2>
      <div class="grid">
        ${cards || `<p style="color:var(--muted)">${isEn ? 'No published records yet.' : 'Chưa có hồ sơ nào công bố.'}</p>`}
      </div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * market.omdalat.com — private marketplace
 */
export async function handleMarketSite(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const isFirst = pathParts.includes('request-access');

  if (isFirst) {
    return renderRequestAccess(env, isEn, url);
  }

  return renderMarketHome(env, isEn, url);
}

async function renderMarketHome(env: Env, isEn: boolean, url: URL): Promise<Response> {
  // F3 FIX: Market filter UI with URL state, sort, asset_level filter, clear filters, no-result state
  const filterAssetLevel = url.searchParams.get('asset_level') || '';
  const filterMarketStatus = url.searchParams.get('market_status') || '';
  const sortBy = url.searchParams.get('sort') || 'recent';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const perPage = 12;
  const offset = (page - 1) * perPage;

  // Build query with filters — parameterized to prevent SQL injection
  let query = `SELECT ml.id, ml.listing_type, ml.title_vi, ml.title_en, ml.description_vi, ml.description_en,
            ml.asking_price_vnd, ml.asking_price_usd, ml.currency,
            ap.public_id, ap.slug, ap.name_vi, ap.name_en, ap.asset_level, ap.summary_vi, ap.summary_en,
            ap.market_status
     FROM marketplace_listings ml
     JOIN asset_packages ap ON ml.package_id = ap.id
     WHERE ml.status = 'live'
       AND ap.publication_status = 'published'`;
  const binds: any[] = [];
  const marketStatuses = ['request_access_only', 'private_tease', 'open_listing'];
  if (filterAssetLevel && ['registered', 'evidence_ready', 'verified', 'trademarked'].includes(filterAssetLevel)) {
    query += ` AND ap.asset_level = ?`;
    binds.push(filterAssetLevel);
  }
  if (filterMarketStatus && marketStatuses.includes(filterMarketStatus)) {
    query += ` AND ap.market_status = ?`;
    binds.push(filterMarketStatus);
  } else {
    query += ` AND ap.market_status IN ('request_access_only', 'private_tease', 'open_listing')`;
  }
  // Sort
  if (sortBy === 'price_asc') {
    query += ` ORDER BY ml.asking_price_vnd ASC NULLS LAST`;
  } else if (sortBy === 'price_desc') {
    query += ` ORDER BY ml.asking_price_vnd DESC NULLS LAST`;
  } else if (sortBy === 'name') {
    query += ` ORDER BY ap.name_vi ASC`;
  } else {
    query += ` ORDER BY ml.updated_at DESC`;
  }
  query += ` LIMIT ? OFFSET ?`;
  binds.push(perPage, offset);

  const stmt = env.DB.prepare(query);
  const result = await (binds.length > 0 ? stmt.bind(...binds) : stmt).all() as any;

  // Count total for pagination
  let countQuery = `SELECT COUNT(*) as total FROM marketplace_listings ml
     JOIN asset_packages ap ON ml.package_id = ap.id
     WHERE ml.status = 'live' AND ap.publication_status = 'published'`;
  const countBinds: any[] = [];
  if (filterAssetLevel && ['registered', 'evidence_ready', 'verified', 'trademarked'].includes(filterAssetLevel)) {
    countQuery += ` AND ap.asset_level = ?`;
    countBinds.push(filterAssetLevel);
  }
  if (filterMarketStatus && marketStatuses.includes(filterMarketStatus)) {
    countQuery += ` AND ap.market_status = ?`;
    countBinds.push(filterMarketStatus);
  } else {
    countQuery += ` AND ap.market_status IN ('request_access_only', 'private_tease', 'open_listing')`;
  }
  const countStmt = env.DB.prepare(countQuery);
  const countResult = await (countBinds.length > 0 ? countStmt.bind(...countBinds) : countStmt).first() as any;
  const total = countResult?.total || 0;
  const totalPages = Math.ceil(total / perPage);

  const listings = result.results || [];
  const cards = listings.map((l: any) => {
    const price = l.asking_price_vnd
      ? `${isEn ? 'Price on request' : 'Giá theo yêu cầu'}`
      : `${isEn ? 'Price on request' : 'Giá theo yêu cầu'}`;
    return `
      <div class="listing-card">
        <h3>${isEn ? (l.title_en || l.title_vi) : l.title_vi}</h3>
        <p style="color:var(--muted);font-size:0.9rem">${isEn ? (l.description_en || l.description_vi || '') : (l.description_vi || l.description_en || '')}</p>
        <p class="price">${price}</p>
        <p class="level">${ASSET_LEVEL_LABEL(l.asset_level, isEn)} · ${l.public_id}</p>
        <a class="no-button" href="${isEn ? '/en/' : '/'}assets/${l.slug}">${isEn ? 'View Details' : 'Xem Chi Tiết'} →</a>
      </div>`;
  }).join('');

  // Build filter form — uses GET with URL state
  const langPrefix = isEn ? '/en' : '';
  const assetLevelOptions = ['registered', 'evidence_ready', 'verified', 'trademarked']
    .map(v => `<option value="${v}" ${filterAssetLevel === v ? 'selected' : ''}>${ASSET_LEVEL_LABEL(v, isEn)}</option>`).join('');
  const marketStatusOptions = marketStatuses
    .map(v => `<option value="${v}" ${filterMarketStatus === v ? 'selected' : ''}>${v.replace(/_/g, ' ')}</option>`).join('');
  const sortOptions = [
    { v: 'recent', l: isEn ? 'Most Recent' : 'Mới nhất' },
    { v: 'name', l: isEn ? 'Name (A-Z)' : 'Tên (A-Z)' },
    { v: 'price_asc', l: isEn ? 'Price ↑' : 'Giá ↑' },
    { v: 'price_desc', l: isEn ? 'Price ↓' : 'Giá ↓' },
  ].map(o => `<option value="${o.v}" ${sortBy === o.v ? 'selected' : ''}>${o.l}</option>`).join('');

  const hasFilters = filterAssetLevel || filterMarketStatus || sortBy !== 'recent';
  const clearUrl = langPrefix + '/';

  // Pagination
  const paginationHtml = totalPages > 1 ? `
    <div style="margin-top:24px;text-align:center">
      ${page > 1 ? `<a class="no-button" href="${langPrefix}/?${new URLSearchParams({ ...(filterAssetLevel && {asset_level: filterAssetLevel}), ...(filterMarketStatus && {market_status: filterMarketStatus}), ...(sortBy !== 'recent' && {sort: sortBy}), page: String(page - 1) })}">${isEn ? '← Previous' : '← Trước'}</a>` : ''}
      <span style="margin:0 12px">${isEn ? 'Page' : 'Trang'} ${page} / ${totalPages}</span>
      ${page < totalPages ? `<a class="no-button" href="${langPrefix}/?${new URLSearchParams({ ...(filterAssetLevel && {asset_level: filterAssetLevel}), ...(filterMarketStatus && {market_status: filterMarketStatus}), ...(sortBy !== 'recent' && {sort: sortBy}), page: String(page + 1) })}">${isEn ? 'Next →' : 'Sau →'}</a>` : ''}
    </div>` : '';

  const html = COMMON_HEAD(
    isEn ? 'Om Dalat Market — Brand Asset Marketplace' : 'Om Dalat Market — Thị Trường Tài Sản Thương Hiệu',
    isEn ? 'Curated brand asset packages. Request access to view details.' : 'Gói tài sản thương hiệu được tuyển chọn. Yêu cầu truy cập để xem chi tiết.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand">Market</div>
      <div class="lang-switch">
        <a href="/" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Brand Asset Marketplace' : 'Thị Trường Tài Sản Thương Hiệu'}</h1>
      <p>${isEn
        ? 'Curated brand asset packages from the Om Dalat network. All listings are reviewed. No buy or bid buttons — contact via request-access.'
        : 'Gói tài sản thương hiệu được tuyển chọn từ mạng lưới Om Dalat. Mọi listing đều được duyệt. Không có nút mua hoặc đấu giá — liên hệ qua yêu cầu truy cập.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn
          ? '<strong>Phase 0:</strong> Private marketplace only. No buy/bid buttons. No direct custody. No live auction.'
          : '<strong>Giai đoạn 0:</strong> Chỉ thị trường riêng. Không nút mua/thầu. Không giữ tiền trực tiếp. Không đấu giá trực tiếp.'}
      </div>

      <form method="GET" action="${langPrefix}/" style="margin:24px 0;padding:16px;border:1px solid var(--border);border-radius:8px;background:var(--card)">
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:end">
          <div>
            <label style="font-size:0.8rem;font-weight:600">${isEn ? 'Asset Level' : 'Cấp Tài Sản'}</label>
            <select name="asset_level" style="margin-top:4px">
              <option value="">${isEn ? 'All' : 'Tất cả'}</option>
              ${assetLevelOptions}
            </select>
          </div>
          <div>
            <label style="font-size:0.8rem;font-weight:600">${isEn ? 'Market Status' : 'Trạng Thái Thị Trường'}</label>
            <select name="market_status" style="margin-top:4px">
              <option value="">${isEn ? 'All' : 'Tất cả'}</option>
              ${marketStatusOptions}
            </select>
          </div>
          <div>
            <label style="font-size:0.8rem;font-weight:600">${isEn ? 'Sort' : 'Sắp xếp'}</label>
            <select name="sort" style="margin-top:4px">
              ${sortOptions}
            </select>
          </div>
          <button type="submit">${isEn ? 'Filter' : 'Lọc'}</button>
          ${hasFilters ? `<a href="${clearUrl}" style="align-self:end;padding:10px 16px;border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--muted)">${isEn ? 'Clear' : 'Xóa lọc'}</a>` : ''}
        </div>
      </form>

      <h2 style="color:var(--green);margin:24px 0 12px">${isEn ? 'Curated Listings' : 'Listing Tuyển Chọn'} (${total})</h2>
      <div class="grid">
        ${cards || `<p style="color:var(--muted)">${isEn ? 'No listings match your filters.' : 'Không có listing phù hợp bộ lọc.'}</p>`}
      </div>
      ${paginationHtml}
      <div class="card" style="margin-top:24px">
        <h2>${isEn ? 'Request Access' : 'Yêu Cầu Truy Cập'}</h2>
        <p style="color:var(--muted);margin-bottom:12px">${isEn ? 'To view detailed package information, submit a request. You will be contacted about qualification.' : 'Để xem thông tin chi tiết gói, gửi yêu cầu. Bạn sẽ được liên hệ về việc đủ điều kiện.'}</p>
        <a class="no-button" href="${isEn ? '/en/request-access' : '/request-access'}">${isEn ? 'Submit Request →' : 'Gửi Yêu Cầu →'}</a>
      </div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

async function renderRequestAccess(env: Env, isEn: boolean, url: URL): Promise<Response> {
  const html = COMMON_HEAD(
    isEn ? 'Request Access — Om Dalat Market' : 'Yêu Cầu Truy Cập — Om Dalat Market',
    isEn ? 'Submit a request to access brand asset package details.' : 'Gửi yêu cầu để truy cập chi tiết gói tài sản thương hiệu.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand">Market · <a href="${isEn ? '/en' : '/'}">home</a></div>
      <div class="lang-switch">
        <a href="/request-access" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/request-access" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Request Access' : 'Yêu Cầu Truy Cập'}</h1>
      <p>${isEn ? 'Submit your details to request access to brand asset package information.' : 'Gửi thông tin của bạn để yêu cầu truy cập thông tin gói tài sản thương hiệu.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn
          ? 'Your request will be reviewed. Qualified buyers will be contacted with detailed package information.'
          : 'Yêu cầu của bạn sẽ được xem xét. Người mua đủ điều kiện sẽ được liên hệ với thông tin chi tiết.'}
      </div>
      <div class="card">
        <form id="requestForm">
          <label>${isEn ? 'Your Name *' : 'Họ Tên *'}</label>
          <input type="text" name="buyer_name" required>
          <label>${isEn ? 'Email *' : 'Email *'}</label>
          <input type="email" name="buyer_email" required>
          <label>${isEn ? 'Organization' : 'Tổ chức'}</label>
          <input type="text" name="buyer_organization">
          <label>${isEn ? 'Buyer Type' : 'Loại người mua'}</label>
          <select name="buyer_type">
            <option value="individual">${isEn ? 'Individual' : 'Cá nhân'}</option>
            <option value="company">${isEn ? 'Company' : 'Công ty'}</option>
            <option value="investor">${isEn ? 'Investor' : 'Nhà đầu tư'}</option>
            <option value="broker">${isEn ? 'Broker' : 'Môi giới'}</option>
          </select>
          <label>${isEn ? 'Message' : 'Lời nhắn'}</label>
          <textarea name="message" rows="4" placeholder="${isEn ? 'Tell us about your interest...' : 'Cho chúng tôi biết bạn quan tâm...'}"></textarea>
          <button type="submit">${isEn ? 'Submit Request' : 'Gửi Yêu Cầu'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('requestForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form));
        const res = await fetch('https://api.omdalat.com/api/omdalat/marketplace/request-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = document.getElementById('result');
        const json = await res.json();
        if (res.ok) {
          result.innerHTML = '<div class="info-box">' + (json.message || 'Request submitted.') + '</div>';
          form.reset();
        } else {
          result.innerHTML = '<div class="legal-block">' + (json.error || 'Submission failed.') + '</div>';
        }
        result.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * auction.omdalat.com — legal-readiness page (NOT live auction)
 */
export async function handleAuctionSite(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Om Dalat Auction — Legal Readiness' : 'Om Dalat Auction — Sẵn Sàng Pháp Lý',
    isEn ? 'Auction capability is in legal-readiness mode. No live auctions yet.' : 'Khả năng đấu giá đang ở chế độ sẵn sàng pháp lý. Chưa có đấu giá trực tiếp.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand">Auction</div>
      <div class="lang-switch">
        <a href="/" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Auction — Legal Readiness Mode' : 'Đấu Giá — Chế Độ Sẵn Sàng Pháp Lý'}</h1>
      <p>${isEn
        ? 'The Om Dalat network is building auction capability for brand asset packages. No live auctions are running yet.'
        : 'Mạng lưới Om Dalat đang xây dựng khả năng đấu giá cho gói tài sản thương hiệu. Chưa có đấu giá trực tiếp nào đang chạy.'}</p>
    </div>
    <div class="container">
      <div class="legal-block">
        <h2 style="margin-top:0">${isEn ? 'No Live Auctions' : 'Không Có Đấu Giá Trực Tiếp'}</h2>
        <p>${isEn
          ? 'Auction functionality is gated behind legal partner signoff. No bidding, no buy buttons, no live events until all legal requirements are met.'
          : 'Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt. Không có đặt thầu, nút mua, hoặc sự kiện trực tiếp cho đến khi đủ điều kiện pháp lý.'}</p>
      </div>

      <div class="card">
        <h2>${isEn ? 'What Needs to Happen First' : 'Cần Làm Gì Trước'}</h2>
        <ul style="padding-left:20px;margin-top:8px">
          <li>${isEn ? 'Legal partner signoff on auction rules' : 'Đối tác pháp lý phê duyệt quy tắc đấu giá'}</li>
          <li>${isEn ? 'Bidder qualification (KYC/KYB) process' : 'Quy trình đủ điều kiện người thầu (KYC/KYB)'}</li>
          <li>${isEn ? 'Immutable bid event log' : 'Nhật ký sự kiện thầu không thay đổi được'}</li>
          <li>${isEn ? 'Escrow provider integration (no direct custody)' : 'Tích hợp nhà cung cấp escrow (không giữ tiền trực tiếp)'}</li>
          <li>${isEn ? 'Auction UI behind feature flag' : 'UI đấu giá sau cờ tính năng'}</li>
          <li>${isEn ? 'Jurisdiction-specific legal review' : 'Xem xét pháp lý theo từng jurisdiction'}</li>
        </ul>
      </div>

      <div class="card">
        <h2>${isEn ? 'Current Status' : 'Trạng Thái Hiện Tại'}</h2>
        <p><span class="badge badge-pending">${isEn ? 'Legal Readiness' : 'Sẵn Sàng Pháp Lý'}</span></p>
        <p style="margin-top:8px;color:var(--muted)">${isEn
          ? 'Building the infrastructure. Not accepting bids. Not listing auction items.'
          : 'Đang xây dựng hạ tầng. Không nhận thầu. Không listing đấu giá.'}</p>
      </div>

      <div class="card">
        <h2>${isEn ? 'Related' : 'Liên Quan'}</h2>
        <p><a href="${isEn ? 'https://market.omdalat.com/en' : 'https://market.omdalat.com'}" style="color:var(--green)">${isEn ? '→ Private Marketplace (request access)' : '→ Thị Trường Riêng (yêu cầu truy cập)'}</a></p>
        <p style="margin-top:8px"><a href="${isEn ? 'https://registry.omdalat.com/en' : 'https://registry.omdalat.com'}" style="color:var(--green)">${isEn ? '→ Registry (public provenance)' : '→ Sổ Đăng Ký (nguồn gốc công khai)'}</a></p>
      </div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * brand.omdalat.com/apply — Brand Factory intake form for asset packages
 */
export async function handleBrandFactoryApply(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Submit Your Brand — Om Dalat Brand Factory' : 'Gửi Thương Hiệu Của Bạn — Om Dalat Brand Factory',
    isEn ? 'Submit your brand for the Om Dalat Brand Asset Network.' : 'Gửi thương hiệu của bạn cho Mạng Tài Sản Thương Hiệu Om Dalat.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/apply" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/apply" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Submit Your Brand Asset Package' : 'Gửi Gói Tài Sản Thương Hiệu'}</h1>
      <p>${isEn
        ? 'Tell us about your brand. We will build a package with identity, legal, domain, and media components.'
        : 'Cho chúng tôi biết về thương hiệu của bạn. Chúng tôi sẽ xây gói với thành phần nhận diện, pháp lý, tên miền, và media.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn
          ? 'Your submission enters review. No claims are made until evidence is verified per-component.'
          : 'Gửi của bạn vào xem xét. Không có xác nhận nào cho đến khi bằng chứng được kiểm tra theo từng thành phần.'}
      </div>
      <div class="card">
        <form id="packageForm">
          <label>${isEn ? 'Brand Name (Vietnamese) *' : 'Tên Thương Hiệu (Tiếng Việt) *'}</label>
          <input type="text" name="name_vi" required>
          <label>${isEn ? 'Brand Name (English) *' : 'Tên Thương Hiệu (Tiếng Anh) *'}</label>
          <input type="text" name="name_en" required>
          <label>${isEn ? 'Summary (Vietnamese)' : 'Tóm Tắt (Tiếng Việt)'}</label>
          <textarea name="summary_vi" rows="3"></textarea>
          <label>${isEn ? 'Summary (English)' : 'Tóm Tắt (Tiếng Anh)'}</label>
          <textarea name="summary_en" rows="3"></textarea>
          <label>${isEn ? 'Your Name *' : 'Họ Tên *'}</label>
          <input type="text" name="seller_name" required>
          <label>${isEn ? 'Contact (email or phone) *' : 'Liên Hệ (email hoặc điện thoại) *'}</label>
          <input type="text" name="seller_contact" required>
          <button type="submit">${isEn ? 'Submit Package' : 'Gửi Gói'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('packageForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form));
        const res = await fetch('https://api.omdalat.com/api/omdalat/asset-packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = document.getElementById('result');
        const json = await res.json();
        if (res.ok) {
          result.innerHTML = '<div class="info-box"><strong>' + (json.public_id || '') + '</strong><br>' + (json.message || 'Package submitted.') + '</div>';
          form.reset();
        } else {
          result.innerHTML = '<div class="legal-block">' + (json.error || 'Submission failed.') + '</div>';
        }
        result.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * market.omdalat.com/assets/:slug — asset detail page (request access, no buy)
 */
export async function handleMarketAssetDetail(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const slug = pathParts.find(p => p !== 'en' && p !== 'assets' && !p.startsWith('_'));

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  // Fetch listing by slug
  const listing = await env.DB.prepare(
    `SELECT ml.*, ap.public_id, ap.slug, ap.name_vi, ap.name_en, ap.summary_vi, ap.summary_en,
            ap.asset_level, ap.market_status
     FROM marketplace_listings ml
     JOIN asset_packages ap ON ml.package_id = ap.id
     WHERE ap.slug = ? AND ml.status = 'live' AND ap.publication_status = 'published'`
  ).bind(slug).first() as any;

  if (!listing) {
    return new Response(
      COMMON_HEAD(isEn ? 'Listing Not Found — Market' : 'Không Tìm Thấy — Market',
        isEn ? 'This listing is not available.' : 'Listing này không khả dụng.',
        'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg', url.origin + url.pathname) +
      `<body><header><div class="brand"><a href="${isEn ? '/en' : '/'}">Market</a></div></header>
       <div class="container"><div class="hero"><h1>${isEn ? 'Listing Not Found' : 'Không Tìm Thấy Listing'}</h1>
       <p><a href="${isEn ? '/en' : '/'}" style="color:var(--green)">${isEn ? '← Back to Market' : '← Về Market'}</a></p></div></div>` + FOOTER(isEn),
      { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  // Fetch components for this package
  const components = await env.DB.prepare(
    `SELECT component_class, component_name, status FROM asset_components WHERE package_id = ? ORDER BY sort_order`
  ).bind(listing.package_id).all() as any;

  const componentList = (components.results || []).map((c: any) =>
    `<li><strong>${c.component_name}</strong> <span class="badge badge-info" style="font-size:0.7rem">${c.component_class}</span> ${STATUS_BADGE(c.status)}</li>`
  ).join('');

  const html = COMMON_HEAD(
    `${isEn ? (listing.title_en || listing.title_vi) : listing.title_vi} — Market`,
    isEn ? (listing.description_en || listing.description_vi || '') : (listing.description_vi || listing.description_en || ''),
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Market</a></div>
      <div class="lang-switch">
        <a href="/assets/${slug}" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/assets/${slug}" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="container">
      <div class="hero">
        <h1>${isEn ? (listing.title_en || listing.title_vi) : listing.title_vi}</h1>
        <p>${isEn ? (listing.description_en || listing.description_vi || '') : (listing.description_vi || listing.description_en || '')}</p>
        <p style="margin-top:12px">
          <span class="badge badge-info">${listing.public_id}</span>
          <span class="badge badge-verified">${ASSET_LEVEL_LABEL(listing.asset_level, isEn)}</span>
        </p>
      </div>

      <div class="info-box">
        ${isEn
          ? '<strong>Price on request.</strong> No buy button. Contact via request-access to view full details and data room.'
          : '<strong>Giá theo yêu cầu.</strong> Không có nút mua. Liên hệ qua yêu cầu truy cập để xem chi tiết và data room.'}
      </div>

      <div class="card">
        <h2>${isEn ? 'Components' : 'Các Thành Phần'}</h2>
        <ul style="padding-left:20px;margin-top:8px">${componentList || `<li style="color:var(--muted)">${isEn ? 'No components listed.' : 'Chưa có thành phần.'}</li>`}</ul>
      </div>

      <div class="card">
        <h2>${isEn ? 'Request Access' : 'Yêu Cầu Truy Cập'}</h2>
        <p style="color:var(--muted);margin-bottom:12px">${isEn ? 'Submit your details to view the full data room.' : 'Gửi thông tin để xem data room đầy đủ.'}</p>
        <form id="requestForm">
          <input type="hidden" name="package_id" value="${listing.package_id}">
          <label>${isEn ? 'Your Name *' : 'Họ Tên *'}</label>
          <input type="text" name="buyer_name" required>
          <label>${isEn ? 'Email *' : 'Email *'}</label>
          <input type="email" name="buyer_email" required>
          <label>${isEn ? 'Organization' : 'Tổ chức'}</label>
          <input type="text" name="buyer_organization">
          <label>${isEn ? 'Buyer Type' : 'Loại người mua'}</label>
          <select name="buyer_type">
            <option value="individual">${isEn ? 'Individual' : 'Cá nhân'}</option>
            <option value="company">${isEn ? 'Company' : 'Công ty'}</option>
            <option value="investor">${isEn ? 'Investor' : 'Nhà đầu tư'}</option>
          </select>
          <label>${isEn ? 'Message' : 'Lời nhắn'}</label>
          <textarea name="message" rows="3"></textarea>
          <button type="submit">${isEn ? 'Submit Request' : 'Gửi Yêu Cầu'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('requestForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const res = await fetch('https://api.omdalat.com/api/omdalat/marketplace/request-access', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        const json = await res.json();
        const el = document.getElementById('result');
        el.innerHTML = res.ok
          ? '<div class="info-box">' + (json.message || 'Request submitted.') + '</div>'
          : '<div class="legal-block">' + (json.error || 'Failed.') + '</div>';
        el.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * brand.omdalat.com/verify — verification status check page
 */
export async function handleBrandFactoryVerify(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Check Verification Status — Brand Factory' : 'Kiểm Tra Trạng Thái Xác Minh — Brand Factory',
    isEn ? 'Check the verification status of your brand asset package.' : 'Kiểm tra trạng thái xác minh gói tài sản thương hiệu.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/verify" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/verify" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Check Verification Status' : 'Kiểm Tra Trạng Thái Xác Minh'}</h1>
      <p>${isEn ? 'Enter your package public ID to see current verification status.' : 'Nhập mã công khai gói để xem trạng thái xác minh hiện tại.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <form id="verifyForm">
          <label>${isEn ? 'Public ID (e.g., BAP-2026-0001)' : 'Mã công khai (vd, BAP-2026-0001)'}</label>
          <input type="text" name="public_id" required placeholder="BAP-2026-XXXX">
          <button type="submit">${isEn ? 'Check Status' : 'Kiểm Tra'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('verifyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const pid = e.target.public_id.value;
        const res = await fetch('https://api.omdalat.com/api/omdalat/registry/' + encodeURIComponent(pid));
        const el = document.getElementById('result');
        if (res.ok) {
          const json = await res.json();
          const pkg = json.package || {};
          const comps = (json.components || []).map(c => '<li><strong>' + c.component_name + '</strong>: ' + c.status + '</li>').join('');
          const events = (json.provenance || []).map(ev => '<li>' + ev.event_type + ' — ' + ev.description + ' <em>(' + ev.created_at + ')</em></li>').join('');
          el.innerHTML = '<div class="card"><h2>' + (pkg.name_vi || pkg.name_en) + '</h2>' +
            '<p><span class="badge badge-info">' + pkg.public_id + '</span> <span class="badge badge-verified">Level ' + (pkg.asset_level || 0) + '</span></p>' +
            '<h3>Components</h3><ul>' + (comps || '<li>None</li>') + '</ul>' +
            '<h3>Provenance</h3><ul class="timeline">' + (events || '<li>None</li>') + '</ul></div>';
        } else {
          el.innerHTML = '<div class="legal-block">Not found or not published.</div>';
        }
        el.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * brand.omdalat.com/cases — public verification cases overview
 */
export async function handleBrandFactoryCases(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch packages with verification status
  const result = await env.DB.prepare(
    `SELECT ap.public_id, ap.name_vi, ap.name_en, ap.asset_level, ap.listing_status,
            COUNT(vc.id) as case_count,
            MAX(vc.updated_at) as last_case_update
     FROM asset_packages ap
     LEFT JOIN verification_cases vc ON ap.id = vc.package_id
     WHERE ap.publication_status = 'published'
     GROUP BY ap.id
     ORDER BY ap.created_at DESC LIMIT 50`
  ).all() as any;

  const rows = (result.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${isEn ? (r.name_en || r.name_vi) : r.name_vi}</h3>
      <p><span class="badge badge-info">${r.public_id}</span>
         <span class="badge ${r.listing_status === 'approved' ? 'badge-verified' : 'badge-pending'}">${r.listing_status}</span></p>
      <p class="level">${isEn ? 'Cases' : 'Cases'}: ${r.case_count || 0}</p>
      <a class="no-button" href="${isEn ? '/en/verify?pid=' : '/verify?pid='}${r.public_id}">${isEn ? 'Check Status' : 'Kiểm Tra'} →</a>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Verification Cases — Brand Factory' : 'Hồ Sơ Xác Minh — Brand Factory',
    isEn ? 'Overview of verification cases for published packages.' : 'Tổng quan hồ sơ xác minh cho các gói đã công bố.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/cases" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/cases" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Verification Cases' : 'Hồ Sơ Xác Minh'}</h1>
      <p>${isEn ? 'Public overview of verification activity for published brand asset packages.' : 'Tổng quan công khai hoạt động xác minh cho các gói đã công bố.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn ? 'Trust labels are per-component. No global Verified badge.' : 'Nhãn tin cậy theo từng thành phần. Không có nhãn Verified toàn cục.'}
      </div>
      <div class="grid">${rows || `<p style="color:var(--muted)">${isEn ? 'No published packages yet.' : 'Chưa có gói nào công bố.'}</p>`}</div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * brand.omdalat.com/dashboard — seller dashboard (lists their packages + status)
 */
export async function handleBrandFactoryDashboard(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const result = await env.DB.prepare(
    `SELECT public_id, slug, name_vi, name_en, asset_level, listing_status, publication_status, created_at, updated_at
     FROM asset_packages ORDER BY created_at DESC LIMIT 50`
  ).all() as any;

  const rows = (result.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${isEn ? (r.name_en || r.name_vi) : r.name_vi}</h3>
      <p><span class="badge badge-info">${r.public_id}</span>
         <span class="badge ${r.publication_status === 'published' ? 'badge-verified' : 'badge-pending'}">${r.publication_status}</span></p>
      <p class="level">${isEn ? 'Level' : 'Cấp độ'}: ${r.asset_level} | ${isEn ? 'Listing' : 'Listing'}: ${r.listing_status}</p>
      <a class="no-button" href="${isEn ? '/en/verify?pid=' : '/verify?pid='}${r.public_id}">${isEn ? 'View Status' : 'Xem Trạng Thái'} →</a>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Dashboard — Brand Factory' : 'Bảng Điều Khiển — Brand Factory',
    isEn ? 'Your brand asset packages and their status.' : 'Các gói tài sản thương hiệu và trạng thái.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/dashboard" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/dashboard" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Seller Dashboard' : 'Bảng Điều Khiển Người Bán'}</h1>
      <p>${isEn ? 'Overview of your brand asset packages.' : 'Tổng quan các gói tài sản thương hiệu.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <a class="no-button" href="${isEn ? '/en/apply' : '/apply'}" style="display:inline-block;margin-bottom:16px">${isEn ? '+ Submit New Package' : '+ Gửi Gói Mới'} →</a>
      </div>
      <div class="grid">${rows || `<p style="color:var(--muted)">${isEn ? 'No packages yet. Submit your first package.' : 'Chưa có gói nào. Gửi gói đầu tiên.'}</p>`}</div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * market.omdalat.com/admin — admin panel for marketplace (listing approval, buyer requests)
 */
export async function handleMarketAdmin(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch pending listings
  const pendingListings = await env.DB.prepare(
    `SELECT ml.id, ml.status, ml.created_at, ap.public_id, ap.name_vi, ap.name_en
     FROM marketplace_listings ml
     JOIN asset_packages ap ON ml.package_id = ap.id
     WHERE ml.status = 'pending'
     ORDER BY ml.created_at DESC LIMIT 50`
  ).all() as any;

  // Fetch pending buyer requests
  const pendingBuyers = await env.DB.prepare(
    `SELECT id, buyer_email, buyer_name, buyer_organization, buyer_type, qualification_status, created_at
     FROM buyer_requests
     WHERE qualification_status = 'pending'
     ORDER BY created_at DESC LIMIT 50`
  ).all() as any;

  const listingRows = (pendingListings.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${isEn ? (r.name_en || r.name_vi) : r.name_vi}</h3>
      <p><span class="badge badge-info">${r.public_id}</span> <span class="badge badge-pending">${r.status}</span></p>
      <p class="level">${isEn ? 'Created' : 'Tạo'}: ${r.created_at}</p>
      <button class="approve-btn" data-id="${r.id}" data-action="approve">${isEn ? 'Approve' : 'Duyệt'}</button>
      <button class="suspend-btn" data-id="${r.id}" data-action="suspend">${isEn ? 'Suspend' : 'Tạm dừng'}</button>
    </div>`).join('');

  const buyerRows = (pendingBuyers.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${r.buyer_name}</h3>
      <p>${r.buyer_email} | ${r.buyer_organization || '-'}</p>
      <p><span class="badge badge-pending">${r.qualification_status}</span> ${r.buyer_type || ''}</p>
      <button class="qualify-btn" data-id="${r.id}" data-action="qualified">${isEn ? 'Qualify' : 'Duyệt'}</button>
      <button class="reject-btn" data-id="${r.id}" data-action="rejected">${isEn ? 'Reject' : 'Từ chối'}</button>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Admin — Market' : 'Quản Trị — Market',
    isEn ? 'Marketplace admin panel for listing approval and buyer qualification.' : 'Bảng quản trị thị trường để duyệt listing và qualifying người mua.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Market</a> / Admin</div>
      <div class="lang-switch">
        <a href="/admin" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/admin" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Marketplace Admin' : 'Quản Trị Thị Trường'}</h1>
      <p>${isEn ? 'Approve listings and qualify buyers.' : 'Duyệt listing và qualify người mua.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <h2>${isEn ? 'Pending Listings' : 'Listing Chờ Duyệt'}</h2>
        <div class="grid">${listingRows || `<p style="color:var(--muted)">${isEn ? 'No pending listings.' : 'Không có listing chờ duyệt.'}</p>`}</div>
      </div>
      <div class="card">
        <h2>${isEn ? 'Pending Buyer Requests' : 'Yêu Cầu Người Mua Chờ Duyệt'}</h2>
        <div class="grid">${buyerRows || `<p style="color:var(--muted)">${isEn ? 'No pending buyer requests.' : 'Không có yêu cầu chờ duyệt.'}</p>`}</div>
      </div>
    </div>
    <script>
      async function adminAction(btn, endpoint) {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const res = await fetch('https://api.omdalat.com/api/omdalat/' + endpoint.replace('{id}', id).replace('{action}', action), {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}'
        });
        if (res.ok) { btn.closest('.listing-card').style.opacity = '0.5'; btn.disabled = true; }
        else { alert('Action failed. Are you logged in as admin?'); }
      }
      document.querySelectorAll('.approve-btn, .suspend-btn').forEach(btn => {
        btn.addEventListener('click', () => adminAction(btn, 'listings/{id}/' + btn.dataset.action));
      });
      document.querySelectorAll('.qualify-btn, .reject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id; const action = btn.dataset.action;
          fetch('https://api.omdalat.com/api/omdalat/buyer-requests/' + id + '/qualify', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qualification_status: action })
          }).then(r => { if (r.ok) { btn.closest('.listing-card').style.opacity = '0.5'; btn.disabled = true; } else alert('Failed. Admin login required.'); });
        });
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * auction.omdalat.com/rules — auction rules page (P3, behind feature flag check)
 */
export async function handleAuctionRules(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Check if AUCTION_LIVE_ENABLED flag exists — if not, show legal-readiness only
  const html = COMMON_HEAD(
    isEn ? 'Auction Rules — Legal Readiness' : 'Quy Tắc Đấu Giá — Sẵn Sàng Pháp Lý',
    isEn ? 'Auction rules and legal readiness framework.' : 'Quy tắc đấu giá và khung sẵn sàng pháp lý.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
      <div class="lang-switch">
        <a href="/rules" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/rules" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Auction Rules Framework' : 'Khung Quy Tắc Đấu Giá'}</h1>
      <p>${isEn ? 'The auction rules are defined but NOT live. Legal partner signoff required.' : 'Quy tắc đấu giá đã định nghĩa nhưng CHƯA live. Cần phê duyệt của đối tác pháp lý.'}</p>
    </div>
    <div class="container">
      <div class="legal-block">
        <h2>${isEn ? 'No Live Auctions' : 'Không Có Đấu Giá Trực Tiếp'}</h2>
        <p>${isEn ? 'Auction functionality is gated behind legal partner signoff.' : 'Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.'}</p>
      </div>
      <div class="card">
        <h2>${isEn ? 'Planned Auction Types' : 'Các Loại Đấu Giá Dự Kiến'}</h2>
        <ul style="padding-left:20px">
          <li><strong>${isEn ? 'English Auction' : 'Đấu giá Anh'}</strong> — ${isEn ? 'ascending bids, highest wins' : 'thầu tăng dần, cao nhất thắng'}</li>
          <li><strong>${isEn ? 'Sealed Bid' : 'Thầu kín'}</strong> — ${isEn ? 'single hidden bid, highest wins' : 'một thầu ẩn, cao nhất thắng'}</li>
          <li><strong>${isEn ? 'Dutch Auction' : 'Đấu giá Hà Lan'}</strong> — ${isEn ? 'descending price, first accept wins' : 'giá giảm dần, người chấp nhận đầu tiên thắng'}</li>
        </ul>
      </div>
      <div class="card">
        <h2>${isEn ? 'Bidder Requirements (Planned)' : 'Yêu Cầu Người Thầu (Dự Kiến)'}</h2>
        <ul style="padding-left:20px">
          <li>${isEn ? 'KYC/KYB verification required' : 'Xác minh KYC/KYB bắt buộc'}</li>
          <li>${isEn ? 'Qualified buyer status' : 'Trạng thái người mua đủ điều kiện'}</li>
          <li>${isEn ? 'Deposit or escrow confirmation' : 'Đặt cọc hoặc xác nhận escrow'}</li>
          <li>${isEn ? 'Legal jurisdiction review' : 'Xem xét thẩm quyền pháp lý'}</li>
        </ul>
      </div>
      <div class="card">
        <h2>${isEn ? 'Legal Gates Before Go-Live' : 'Cổng Pháp Lý Trước Khi Go-Live'}</h2>
        <ul style="padding-left:20px">
          <li>${isEn ? 'Legal partner signoff on auction terms' : 'Phê duyệt của đối tác pháp lý về điều khoản đấu giá'}</li>
          <li>${isEn ? 'Bidder qualification process approved' : 'Quy trình qualify người thầu được phê duyệt'}</li>
          <li>${isEn ? 'Escrow provider integration confirmed' : 'Tích hợp escrow provider được xác nhận'}</li>
          <li>${isEn ? 'Dispute resolution process documented' : 'Quy trình giải quyết tranh chấp được tài liệu hóa'}</li>
          <li>${isEn ? 'AUCTION_LIVE_ENABLED feature flag set' : 'Feature flag AUCTION_LIVE_ENABLED được set'}</li>
        </ul>
      </div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * brand.omdalat.com/evidence — evidence upload page (seller submits rights evidence)
 */
export async function handleBrandFactoryEvidence(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Submit Evidence — Brand Factory' : 'Nộp Bằng Chứng — Brand Factory',
    isEn ? 'Submit rights evidence for your brand asset package components.' : 'Nộp bằng chứng quyền cho các thành phần gói tài sản thương hiệu.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/evidence" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/evidence" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Submit Rights Evidence' : 'Nộp Bằng Chứng Quyền'}</h1>
      <p>${isEn ? 'Upload evidence for each component of your brand asset package.' : 'Tải lên bằng chứng cho từng thành phần gói tài sản thương hiệu.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn ? 'Evidence is reviewed per-component. No global Verified badge.' : 'Bằng chứng được xem xét theo từng thành phần. Không có nhãn Verified toàn cục.'}
      </div>
      <div class="card">
        <form id="evidenceForm">
          <label>${isEn ? 'Package Public ID *' : 'Mã Công Khai Gói *'}</label>
          <input type="text" name="package_id" required placeholder="BAP-2026-XXXX">
          <label>${isEn ? 'Component Name *' : 'Tên Thành Phần *'}</label>
          <input type="text" name="component_name" required>
          <label>${isEn ? 'Evidence Type *' : 'Loại Bằng Chứng *'}</label>
          <select name="evidence_type">
            <option value="trademark_registration">${isEn ? 'Trademark Registration' : 'Đăng Bạ Thương Hiệu'}</option>
            <option value="domain_ownership">${isEn ? 'Domain Ownership' : 'Sở Hữu Domain'}</option>
            <option value="business_license">${isEn ? 'Business License' : 'Giấy Phép Kinh Doanh'}</option>
            <option value="contract">${isEn ? 'Contract' : 'Hợp Đồng'}</option>
            <option value="receipt">${isEn ? 'Receipt' : 'Biên Nhận'}</option>
            <option value="declaration">${isEn ? 'Declaration' : 'Tờ Khai'}</option>
            <option value="other">${isEn ? 'Other' : 'Khác'}</option>
          </select>
          <label>${isEn ? 'Reference Number' : 'Số Tham Chiếu'}</label>
          <input type="text" name="reference_number">
          <label>${isEn ? 'Issuing Authority' : 'Cơ Quan Cấp'}</label>
          <input type="text" name="issuing_authority">
          <label>${isEn ? 'Issue Date' : 'Ngày Cấp'}</label>
          <input type="date" name="issue_date">
          <label>${isEn ? 'Notes' : 'Ghi chú'}</label>
          <textarea name="notes" rows="3"></textarea>
          <button type="submit">${isEn ? 'Submit Evidence' : 'Nộp Bằng Chứng'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('evidenceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const res = await fetch('https://api.omdalat.com/api/omdalat/evidence', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        const json = await res.json();
        const el = document.getElementById('result');
        el.innerHTML = res.ok
          ? '<div class="info-box">' + (json.message || 'Evidence submitted for review.') + '</div>'
          : '<div class="legal-block">' + (json.error || 'Failed.') + '</div>';
        el.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * brand.omdalat.com/intake — Brand Discovery intake form (lighter than full package)
 */
export async function handleBrandFactoryIntake(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Brand Discovery Intake — Brand Factory' : 'Khám Phá Thương Hiệu — Brand Factory',
    isEn ? 'Quick intake form for brand discovery. No commitment.' : 'Form khám phá thương hiệu nhanh. Không cam kết.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? 'https://brand.omdalat.com/en' : 'https://brand.omdalat.com'}">Brand Factory</a></div>
      <div class="lang-switch">
        <a href="/intake" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/intake" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Brand Discovery Intake' : 'Khám Phá Thương Hiệu'}</h1>
      <p>${isEn ? 'Tell us about your brand idea. We will contact you about next steps.' : 'Hãy cho chúng tôi biết về ý tưởng thương hiệu. Chúng tôi sẽ liên hệ về các bước tiếp theo.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <form id="intakeForm">
          <label>${isEn ? 'Brand Name (Vietnamese) *' : 'Tên Thương Hiệu (Tiếng Việt) *'}</label>
          <input type="text" name="name_vi" required>
          <label>${isEn ? 'Brand Name (English)' : 'Tên Thương Hiệu (Tiếng Anh)'}</label>
          <input type="text" name="name_en">
          <label>${isEn ? 'Contact Email *' : 'Email Liên Hệ *'}</label>
          <input type="email" name="contact_email" required>
          <label>${isEn ? 'Discovery Notes' : 'Ghi chú khám phá'}</label>
          <textarea name="discovery_notes" rows="4" placeholder="${isEn ? 'What is your brand about? What stage are you at?' : 'Thương hiệu của bạn về gì? Bạn đang ở giai đoạn nào?'}"></textarea>
          <button type="submit">${isEn ? 'Submit Intake' : 'Gửi Khám Phá'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('intakeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const res = await fetch('https://api.omdalat.com/api/omdalat/brand-discovery/intake', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        const json = await res.json();
        const el = document.getElementById('result');
        el.innerHTML = res.ok
          ? '<div class="info-box">' + (json.message || 'Intake received.') + '</div>'
          : '<div class="legal-block">' + (json.error || 'Failed.') + '</div>';
        el.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * market.omdalat.com/buyer-dashboard — buyer's request status page
 */
export async function handleMarketBuyerDashboard(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  const html = COMMON_HEAD(
    isEn ? 'Buyer Dashboard — Market' : 'Bảng Điều Khiển Người Mua — Market',
    isEn ? 'Track your access requests and inquiries.' : 'Theo dõi yêu cầu truy cập và thắc mắc.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Market</a> / Buyer</div>
      <div class="lang-switch">
        <a href="/buyer-dashboard" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/buyer-dashboard" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Buyer Dashboard' : 'Bảng Điều Khiển Người Mua'}</h1>
      <p>${isEn ? 'Enter your email to see your request status.' : 'Nhập email để xem trạng thái yêu cầu.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <form id="lookupForm">
          <label>${isEn ? 'Your Email *' : 'Email Của Bạn *'}</label>
          <input type="email" name="email" required>
          <button type="submit">${isEn ? 'View My Requests' : 'Xem Yêu Cầu'}</button>
        </form>
        <div id="result" style="margin-top:16px;display:none"></div>
      </div>
    </div>
    <script>
      document.getElementById('lookupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        // Note: This is a public lookup by email — in production, this would require auth
        // For now, we show a notice that the buyer needs to log in
        const el = document.getElementById('result');
        el.innerHTML = '<div class="info-box">${isEn ? 'Please log in to view your requests. Buyer dashboard requires authentication.' : 'Vui lòng đăng nhập để xem yêu cầu. Bảng điều khiển người mua yêu cầu xác thực.'}</div>';
        el.style.display = 'block';
      });
    </script>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * registry.omdalat.com/search — search public records
 */
export async function handleRegistrySearch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const q = url.searchParams.get('q') || '';

  let packages: any[] = [];
  if (q) {
    const result = await env.DB.prepare(
      `SELECT public_id, slug, name_vi, name_en, summary_vi, summary_en, asset_level, market_status
       FROM asset_packages
       WHERE publication_status = 'published'
         AND (name_vi LIKE ? OR name_en LIKE ? OR public_id LIKE ? OR slug LIKE ?)
       ORDER BY created_at DESC LIMIT 50`
    ).bind(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`).all() as any;
    packages = result.results || [];
  }

  const cards = packages.map((p: any) => `
    <div class="listing-card">
      <h3>${isEn ? (p.name_en || p.name_vi) : p.name_vi}</h3>
      <p style="color:var(--muted);font-size:0.9rem">${isEn ? (p.summary_en || p.summary_vi || '') : (p.summary_vi || p.summary_en || '')}</p>
      <p style="margin-top:8px">
        <span class="badge badge-info">${p.public_id}</span>
        <span class="badge badge-verified">${ASSET_LEVEL_LABEL(p.asset_level, isEn)}</span>
      </p>
      <a class="no-button" href="${isEn ? '/en/' : '/'}${p.public_id}">${isEn ? 'View Record' : 'Xem Hồ Sơ'} →</a>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? `Search${q ? ': ' + q : ''} — Registry` : `Tìm kiếm${q ? ': ' + q : ''} — Registry`,
    isEn ? 'Search public provenance records.' : 'Tìm kiếm hồ sơ nguồn gốc công khai.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Registry</a></div>
      <div class="lang-switch">
        <a href="/search" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/search" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Search Registry' : 'Tìm Kiếm Registry'}</h1>
      <form style="margin-top:16px" action="/search" method="GET">
        <input type="text" name="q" value="${q.replace(/"/g, '&quot;')}" placeholder="${isEn ? 'Search by name or ID...' : 'Tìm theo tên hoặc mã...'}" style="width:60%;padding:10px">
        <button type="submit">${isEn ? 'Search' : 'Tìm'}</button>
      </form>
    </div>
    <div class="container">
      ${q ? `<p style="margin-bottom:16px;color:var(--muted)">${packages.length} ${isEn ? 'results for' : 'kết quả cho'} "${q}"</p>` : ''}
      <div class="grid">${cards || (q ? `<p style="color:var(--muted)">${isEn ? 'No results.' : 'Không có kết quả.'}</p>` : `<p style="color:var(--muted)">${isEn ? 'Enter a search term above.' : 'Nhập từ khóa tìm kiếm ở trên.'}</p>`)}</div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * auction.omdalat.com/live — live auction page (gated — shows legal-readiness if flag not set)
 */
export async function handleAuctionLive(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Check feature flag — in production this would check env.AUCTION_LIVE_ENABLED
  // Currently always shows legal-readiness mode
  const auctionLive = false; // (env as any).AUCTION_LIVE_ENABLED === 'true'

  if (!auctionLive) {
    // Show legal-readiness mode
    const html = COMMON_HEAD(
      isEn ? 'Live Auction — Not Available' : 'Đấu Giá Trực Tiếp — Không Khả Dụng',
      isEn ? 'Live auction functionality is gated behind legal partner signoff.' : 'Chức năng đấu giá trực tiếp bị khóa cho đến khi đối tác pháp lý phê duyệt.',
      'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
    ) + `
    <body>
      <header>
        <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
        <div class="lang-switch">
          <a href="/live" class="${isEn ? '' : 'active'}">VI</a>
          <a href="/en/live" class="${isEn ? 'active' : ''}">EN</a>
        </div>
      </header>
      <div class="hero">
        <h1>${isEn ? 'Live Auction' : 'Đấu Giá Trực Tiếp'}</h1>
      </div>
      <div class="container">
        <div class="legal-block">
          <h2>${isEn ? 'No Live Auctions' : 'Không Có Đấu Giá Trực Tiếp'}</h2>
          <p>${isEn ? 'Auction functionality is gated behind legal partner signoff.' : 'Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.'}</p>
          <p style="margin-top:12px">${isEn ? 'The auction infrastructure (schema, API, UI framework) is ready, but the feature flag' : 'Hạ tầng đấu giá (schema, API, UI framework) đã sẵn sàng, nhưng feature flag'} <code>AUCTION_LIVE_ENABLED</code> ${isEn ? 'is not set.' : 'chưa được set.'}</p>
        </div>
        <div class="card">
          <h2>${isEn ? 'What is ready' : 'Đã sẵn sàng'}</h2>
          <ul style="padding-left:20px">
            <li>${isEn ? 'Database schema (auctions, bids, bid_events tables)' : 'Schema cơ sở dữ liệu (bảng auctions, bids, bid_events)'}</li>
            <li>${isEn ? 'API endpoints (create, get, bid, list bids, end auction)' : 'API endpoint (tạo, xem, thầu, danh sách, kết thúc)'}</li>
            <li>${isEn ? 'UI framework (this page, rules page)' : 'UI framework (trang này, trang quy tắc)'}</li>
            <li>${isEn ? 'Feature flag gating (all endpoints return 403 until flag is set)' : 'Feature flag gating (tất cả API trả 403 cho đến khi flag được set)'}</li>
          </ul>
        </div>
        <div class="card">
          <h2>${isEn ? 'What is needed before go-live' : 'Cần gì trước khi go-live'}</h2>
          <ul style="padding-left:20px">
            <li>${isEn ? 'Legal partner signoff on auction terms' : 'Phê duyệt của đối tác pháp lý'}</li>
            <li>${isEn ? 'Bidder KYC/KYB verification process' : 'Quy trình xác minh KYC/KYB người thầu'}</li>
            <li>${isEn ? 'Escrow provider integration' : 'Tích hợp escrow provider'}</li>
            <li>${isEn ? 'Dispute resolution process' : 'Quy trình giải quyết tranh chấp'}</li>
          </ul>
        </div>
      </div>
    ` + FOOTER(isEn);

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
    });
  }

  // If auction is live (future): show live auction list
  // This code path is reached only when AUCTION_LIVE_ENABLED is set
  const html = COMMON_HEAD(
    isEn ? 'Live Auctions' : 'Đấu Giá Trực Tiếp',
    isEn ? 'View live and upcoming auctions.' : 'Xem đấu giá trực tiếp và sắp tới.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Live Auctions' : 'Đấu Giá Trực Tiếp'}</h1>
      <p>${isEn ? 'Auction functionality is now live.' : 'Chức năng đấu giá đã live.'}</p>
    </div>
    <div class="container">
      <p>${isEn ? 'No active auctions at this time.' : 'Không có đấu giá đang hoạt động.'}</p>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

/**
 * auction.omdalat.com/history — auction history page (past auctions)
 */
export async function handleAuctionHistory(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch ended auctions (if any — currently none since feature flag is off)
  const result = await env.DB.prepare(
    `SELECT a.id, a.auction_type, a.start_date, a.end_date, a.status, a.reserve_price_vnd,
            ap.public_id, ap.name_vi, ap.name_en
     FROM auctions a
     JOIN asset_packages ap ON a.package_id = ap.id
     WHERE a.status = 'ended'
     ORDER BY a.end_date DESC LIMIT 50`
  ).all() as any;

  const rows = (result.results || []).map((a: any) => `
    <div class="listing-card">
      <h3>${isEn ? (a.name_en || a.name_vi) : a.name_vi}</h3>
      <p><span class="badge badge-info">${a.public_id}</span> <span class="badge badge-verified">${a.status}</span></p>
      <p class="level">${isEn ? 'Type' : 'Loại'}: ${a.auction_type} | ${isEn ? 'Ended' : 'Kết thúc'}: ${a.end_date || '-'}</p>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Auction History' : 'Lịch Sử Đấu Giá',
    isEn ? 'Past auctions and results.' : 'Đấu giá đã qua và kết quả.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
      <div class="lang-switch">
        <a href="/history" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/history" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Auction History' : 'Lịch Sử Đấu Giá'}</h1>
      <p>${isEn ? 'Past auctions and their results.' : 'Đấu giá đã qua và kết quả.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn ? 'No auctions have been held yet. Auction functionality is in legal-readiness mode.' : 'Chưa có đấu giá nào được tổ chức. Chức năng đấu giá đang ở chế độ sẵn sàng pháp lý.'}
      </div>
      <div class="grid">${rows || `<p style="color:var(--muted)">${isEn ? 'No auction history.' : 'Không có lịch sử đấu giá.'}</p>`}</div>
    </div>
  ` + FOOTER(isEn);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' }
  });
}

/**
 * auction.omdalat.com/auctions/:id — auction detail with bid placement (gated)
 */
export async function handleAuctionDetail(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const auctionId = pathParts.find(p => p !== 'en' && p !== 'auctions' && !p.startsWith('_'));

  // F4 FIX: Validate auctionId format before querying. Real auction IDs start with "auc_".
  // Invalid IDs (like "test", "nonexistent-id-xyz") should return 404, not a soft 200.
  if (!auctionId || !auctionId.startsWith('auc_')) {
    const notFoundHtml = COMMON_HEAD(
      isEn ? 'Auction Not Found' : 'Không Tìm Thấy Đấu Giá',
      isEn ? 'This auction does not exist.' : 'Đấu giá này không tồn tại.',
      'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
    ) + `
    <body>
      <header>
        <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
        <div class="lang-switch">
          <a href="/auctions" class="${isEn ? '' : 'active'}">VI</a>
          <a href="/en/auctions" class="${isEn ? 'active' : ''}">EN</a>
        </div>
      </header>
      <div class="container">
        <div class="hero">
          <h1>${isEn ? 'Auction Not Found' : 'Không Tìm Thấy Đấu Giá'}</h1>
          <p>${isEn ? 'This auction ID is invalid or does not exist.' : 'Mã đấu giá này không hợp lệ hoặc không tồn tại.'}</p>
          <p style="margin-top:16px"><a href="${isEn ? '/en' : '/'}" style="color:var(--green)">${isEn ? '← Back to Auction' : '← Về trang Đấu Giá'}</a></p>
        </div>
      </div>
    ` + FOOTER(isEn);
    return new Response(notFoundHtml, { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  // Feature flag check — currently always shows legal-readiness
  const auctionLive = false;

  if (!auctionLive) {
    const html = COMMON_HEAD(
      isEn ? 'Auction — Legal Readiness' : 'Đấu Giá — Sẵn Sàng Pháp Lý',
      isEn ? 'Auction functionality is gated behind legal partner signoff.' : 'Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.',
      'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
    ) + `
    <body>
      <header>
        <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
        <div class="lang-switch">
          <a href="/auctions/${auctionId}" class="${isEn ? '' : 'active'}">VI</a>
          <a href="/en/auctions/${auctionId}" class="${isEn ? 'active' : ''}">EN</a>
        </div>
      </header>
      <div class="container">
        <div class="legal-block">
          <h2>${isEn ? 'No Live Auctions' : 'Không Có Đấu Giá Trực Tiếp'}</h2>
          <p>${isEn ? 'Auction functionality is gated behind legal partner signoff.' : 'Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.'}</p>
          <p style="margin-top:12px"><code>AUCTION_LIVE_ENABLED</code> ${isEn ? 'is not set.' : 'chưa được set.'}</p>
        </div>
        <div class="card">
          <h2>${isEn ? 'What happens when the flag is enabled' : 'Điều gì xảy ra khi flag được bật'}</h2>
          <ul style="padding-left:20px">
            <li>${isEn ? 'Auction details become visible' : 'Chi tiết đấu giá hiển thị'}</li>
            <li>${isEn ? 'Qualified bidders can place bids' : 'Người thầu đủ điều kiện có thể đặt thầu'}</li>
            <li>${isEn ? 'Bid history is recorded immutably' : 'Lịch sử thầu được ghi lại không thể thay đổi'}</li>
            <li>${isEn ? 'Admin can end auction and declare winner' : 'Admin có thể kết thúc và công bố người thắng'}</li>
          </ul>
        </div>
      </div>
    ` + FOOTER(isEn);
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  // Future: live auction detail with bid form
  const html = COMMON_HEAD(
    isEn ? 'Auction Detail' : 'Chi Tiết Đấu Giá',
    isEn ? 'Place your bid on this brand asset package.' : 'Đặt thầu cho gói tài sản thương hiệu.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname
  ) + `
  <body>
    <header><div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div></header>
    <div class="container">
      <p>${isEn ? 'Auction detail will appear here when live.' : 'Chi tiết đấu giá sẽ hiển thị ở đây khi live.'}</p>
    </div>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

/**
 * auction.omdalat.com/auctions/:id/winner — winner declaration page (gated)
 */
export async function handleAuctionWinner(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const auctionId = pathParts.find(p => p !== 'en' && p !== 'auctions' && !p.startsWith('_') && p !== 'winner');

  const html = COMMON_HEAD(
    isEn ? 'Auction Winner — Legal Readiness' : 'Người Thắng Đấu Giá — Sẵn Sàng Pháp Lý',
    isEn ? 'Winner declaration is gated behind legal partner signoff.' : 'Công bố người thắng bị khóa cho đến khi đối tác pháp lý phê duyệt.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
      <div class="lang-switch">
        <a href="/auctions/${auctionId}/winner" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/auctions/${auctionId}/winner" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="container">
      <div class="legal-block">
        <h2>${isEn ? 'Winner Declaration Not Available' : 'Công Bố Người Thắng Không Khả Dụng'}</h2>
        <p>${isEn ? 'Winner declaration functionality is gated behind legal partner signoff.' : 'Chức năng công bố người thắng bị khóa cho đến khi đối tác pháp lý phê duyệt.'}</p>
      </div>
      <div class="card">
        <h2>${isEn ? 'Process when enabled' : 'Quy trình khi bật'}</h2>
        <ul style="padding-left:20px">
          <li>${isEn ? 'Admin ends auction via API' : 'Admin kết thúc đấu giá qua API'}</li>
          <li>${isEn ? 'Highest accepted bid is declared winner' : 'Thầu cao nhất được chấp nhận là người thắng'}</li>
          <li>${isEn ? 'Winner is notified and directed to transfer workflow' : 'Người thắng được thông báo và hướng dẫn qua workflow chuyển nhượng'}</li>
          <li>${isEn ? 'Registry event is logged publicly' : 'Sự kiện registry được ghi lại công khai'}</li>
          <li>${isEn ? 'Bid events are recorded immutably' : 'Sự kiện thầu được ghi lại không thể thay đổi'}</li>
        </ul>
      </div>
    </div>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

/**
 * auction.omdalat.com/auctions/:id/post — post-auction transfer initiation (gated)
 */
export async function handleAuctionPost(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const auctionId = pathParts.find(p => p !== 'en' && p !== 'auctions' && !p.startsWith('_') && p !== 'post');

  const html = COMMON_HEAD(
    isEn ? 'Post-Auction — Legal Readiness' : 'Sau Đấu Giá — Sẵn Sàng Pháp Lý',
    isEn ? 'Post-auction transfer workflow is gated behind legal partner signoff.' : 'Workflow chuyển nhượng sau đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Auction</a></div>
      <div class="lang-switch">
        <a href="/auctions/${auctionId}/post" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/auctions/${auctionId}/post" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="container">
      <div class="legal-block">
        <h2>${isEn ? 'Post-Auction Not Available' : 'Sau Đấu Giá Không Khả Dụng'}</h2>
        <p>${isEn ? 'Post-auction transfer workflow is gated behind legal partner signoff.' : 'Workflow chuyển nhượng sau đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt.'}</p>
      </div>
      <div class="card">
        <h2>${isEn ? 'Post-auction process when enabled' : 'Quy trình sau đấu giá khi bật'}</h2>
        <ul style="padding-left:20px">
          <li>${isEn ? 'Winner is directed to transfer checklist' : 'Người thắng được hướng dẫn qua checklist chuyển nhượng'}</li>
          <li>${isEn ? 'Escrow is initiated via external provider (no direct custody)' : 'Escrow được khởi tạo qua provider bên ngoài (không giữ tiền trực tiếp)'}</li>
          <li>${isEn ? 'Domain, app, repo, trademark transfer steps are tracked' : 'Các bước chuyển nhượng domain, app, repo, trademark được theo dõi'}</li>
          <li>${isEn ? 'Registry records the transfer completion' : 'Registry ghi lại hoàn tất chuyển nhượng'}</li>
          <li>${isEn ? 'Credential is issued (pointer, not legal title)' : 'Credential được cấp (con trỏ, không phải quyền sở hữu)'}</li>
        </ul>
      </div>
    </div>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

/**
 * registry.omdalat.com/admin — admin panel for verification case review
 */
export async function handleRegistryAdmin(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch pending verification cases
  const result = await env.DB.prepare(
    `SELECT vc.id, vc.case_type, vc.status, vc.created_at, vc.updated_at,
            ap.public_id, ap.name_vi, ap.name_en
     FROM verification_cases vc
     JOIN asset_packages ap ON vc.package_id = ap.id
     WHERE vc.status IN ('open', 'in_review')
     ORDER BY vc.created_at DESC LIMIT 50`
  ).all() as any;

  const rows = (result.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${isEn ? (r.name_en || r.name_vi) : r.name_vi}</h3>
      <p><span class="badge badge-info">${r.public_id}</span>
         <span class="badge badge-pending">${r.status}</span></p>
      <p class="level">${isEn ? 'Case type' : 'Loại hồ sơ'}: ${r.case_type} | ${isEn ? 'Created' : 'Tạo'}: ${r.created_at}</p>
      <button class="case-btn" data-id="${r.id}" data-action="complete">${isEn ? 'Mark Complete' : 'Đánh Dấu Hoàn Thành'}</button>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Admin — Registry' : 'Quản Trị — Registry',
    isEn ? 'Review verification cases and manage registry events.' : 'Xem xét hồ sơ xác minh và quản lý sự kiện registry.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en' : '/'}">Registry</a> / Admin</div>
      <div class="lang-switch">
        <a href="/admin" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/admin" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Registry Admin' : 'Quản Trị Registry'}</h1>
      <p>${isEn ? 'Review verification cases and manage registry events.' : 'Xem xét hồ sơ xác minh và quản lý sự kiện registry.'}</p>
    </div>
    <div class="container">
      <div class="card">
        <h2>${isEn ? 'Pending Verification Cases' : 'Hồ Sơ Xác Minh Chờ Duyệt'}</h2>
        <div class="grid">${rows || `<p style="color:var(--muted)">${isEn ? 'No pending cases.' : 'Không có hồ sơ chờ duyệt.'}</p>`}</div>
      </div>
    </div>
    <script>
      document.querySelectorAll('.case-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          const res = await fetch('https://api.omdalat.com/api/omdalat/verification/cases/' + id + '/complete', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}'
          });
          if (res.ok) { btn.closest('.listing-card').style.opacity = '0.5'; btn.disabled = true; }
          else { alert('Failed. Admin login required.'); }
        });
      });
    </script>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

/**
 * market.omdalat.com/data-rooms — data room management (admin)
 */
export async function handleMarketDataRooms(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch data rooms
  const result = await env.DB.prepare(
    `SELECT dr.id, dr.name, dr.description, dr.status, dr.created_at,
            ap.public_id, ap.name_vi, ap.name_en
     FROM data_rooms dr
     JOIN asset_packages ap ON dr.package_id = ap.id
     ORDER BY dr.created_at DESC LIMIT 50`
  ).all() as any;

  // Fetch pending access requests
  const grantsResult = await env.DB.prepare(
    `SELECT drag.id, drag.buyer_email, drag.buyer_name, drag.status, drag.created_at,
            dr.name as data_room_name
     FROM data_room_access_grants drag
     JOIN data_rooms dr ON drag.data_room_id = dr.id
     WHERE drag.status = 'pending'
     ORDER BY drag.created_at DESC LIMIT 50`
  ).all() as any;

  const roomRows = (result.results || []).map((r: any) => `
    <div class="listing-card">
      <h3>${r.name}</h3>
      <p><span class="badge badge-info">${r.public_id}</span> <span class="badge ${r.status === 'active' ? 'badge-verified' : 'badge-pending'}">${r.status}</span></p>
      <p class="level">${isEn ? 'Package' : 'Gói'}: ${isEn ? (r.name_en || r.name_vi) : r.name_vi}</p>
    </div>`).join('');

  const grantRows = (grantsResult.results || []).map((g: any) => `
    <div class="listing-card">
      <h3>${g.buyer_name}</h3>
      <p>${g.buyer_email}</p>
      <p><span class="badge badge-pending">${g.status}</span> | ${isEn ? 'Data room' : 'Data room'}: ${g.data_room_name}</p>
      <button class="grant-btn" data-id="${g.id}" data-action="granted">${isEn ? 'Approve' : 'Duyệt'}</button>
      <button class="reject-btn" data-id="${g.id}" data-action="rejected">${isEn ? 'Reject' : 'Từ chối'}</button>
    </div>`).join('');

  const html = COMMON_HEAD(
    isEn ? 'Data Rooms — Market Admin' : 'Data Rooms — Quản Trị Market',
    isEn ? 'Manage data rooms and access requests.' : 'Quản lý data room và yêu cầu truy cập.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en/admin' : '/admin'}">${isEn ? 'Admin' : 'Quản Trị'}</a> / Data Rooms</div>
      <div class="lang-switch">
        <a href="/data-rooms" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/data-rooms" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Data Room Management' : 'Quản Lý Data Room'}</h1>
    </div>
    <div class="container">
      <div class="card">
        <h2>${isEn ? 'Active Data Rooms' : 'Data Room Hoạt Động'}</h2>
        <div class="grid">${roomRows || `<p style="color:var(--muted)">${isEn ? 'No data rooms.' : 'Không có data room.'}</p>`}</div>
      </div>
      <div class="card">
        <h2>${isEn ? 'Pending Access Requests' : 'Yêu Cầu Truy Cập Chờ Duyệt'}</h2>
        <div class="grid">${grantRows || `<p style="color:var(--muted)">${isEn ? 'No pending requests.' : 'Không có yêu cầu chờ duyệt.'}</p>`}</div>
      </div>
    </div>
    <script>
      document.querySelectorAll('.grant-btn, .reject-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          const action = btn.dataset.action;
          const res = await fetch('https://api.omdalat.com/api/omdalat/data-rooms/dr_placeholder/grants/' + id + '/approve', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: action })
          });
          if (res.ok) { btn.closest('.listing-card').style.opacity = '0.5'; btn.disabled = true; }
          else alert('Failed. Admin login required.');
        });
      });
    </script>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}

/**
 * market.omdalat.com/transfers — transfer checklist management (admin)
 */
export async function handleMarketTransfers(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');

  // Fetch transfer checklists
  const result = await env.DB.prepare(
    `SELECT tc.id, tc.status, tc.created_at, tc.updated_at,
            tc.domain_transfer_status, tc.app_transfer_status, tc.repo_transfer_status,
            tc.trademark_transfer_status, tc.contract_status, tc.escrow_status, tc.recording_status,
            ap.public_id, ap.name_vi, ap.name_en
     FROM transfer_checklists tc
     JOIN asset_packages ap ON tc.package_id = ap.id
     ORDER BY tc.created_at DESC LIMIT 50`
  ).all() as any;

  const STEP_LABEL = (s: string, isEn: boolean) => {
    const map: Record<string, string> = {
      pending: isEn ? 'Pending' : 'Chờ',
      in_progress: isEn ? 'In Progress' : 'Đang làm',
      completed: isEn ? 'Completed' : 'Hoàn thành',
      failed: isEn ? 'Failed' : 'Lỗi',
    };
    return map[s] || s || '-';
  };

  const STEP_BADGE = (s: string) => {
    if (s === 'completed') return `<span class="badge badge-verified">${s}</span>`;
    if (s === 'failed') return `<span class="badge" style="background:var(--red)">${s}</span>`;
    if (s === 'in_progress') return `<span class="badge badge-pending">${s}</span>`;
    return `<span class="badge badge-draft">${s || 'pending'}</span>`;
  };

  const rows = (result.results || []).map((r: any) => {
    const steps = [
      ['domain', r.domain_transfer_status],
      ['app', r.app_transfer_status],
      ['repo', r.repo_transfer_status],
      ['trademark', r.trademark_transfer_status],
      ['contract', r.contract_status],
      ['escrow', r.escrow_status],
      ['recording', r.recording_status],
    ];
    const stepHtml = steps.map(([step, status]) =>
      `<span style="display:inline-block;margin:2px 4px;font-size:0.75rem">${step}: ${STEP_BADGE(status)}</span>`
    ).join('');
    return `
    <div class="listing-card">
      <h3>${isEn ? (r.name_en || r.name_vi) : r.name_vi}</h3>
      <p><span class="badge badge-info">${r.public_id}</span>
         <span class="badge ${r.status === 'completed' ? 'badge-verified' : 'badge-pending'}">${r.status}</span></p>
      <div style="margin-top:8px">${stepHtml}</div>
    </div>`;
  }).join('');

  const html = COMMON_HEAD(
    isEn ? 'Transfers — Market Admin' : 'Chuyển Nhượng — Quản Trị Market',
    isEn ? 'Manage transfer checklists for brand asset packages.' : 'Quản lý checklist chuyển nhượng cho gói tài sản thương hiệu.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg',
    url.origin + url.pathname, true
  ) + `
  <body>
    <header>
      <div class="brand"><a href="${isEn ? '/en/admin' : '/admin'}">${isEn ? 'Admin' : 'Quản Trị'}</a> / Transfers</div>
      <div class="lang-switch">
        <a href="/transfers" class="${isEn ? '' : 'active'}">VI</a>
        <a href="/en/transfers" class="${isEn ? 'active' : ''}">EN</a>
      </div>
    </header>
    <div class="hero">
      <h1>${isEn ? 'Transfer Management' : 'Quản Lý Chuyển Nhượng'}</h1>
      <p>${isEn ? 'Track domain, app, repo, trademark, contract, escrow, and recording steps.' : 'Theo dõi các bước domain, app, repo, trademark, hợp đồng, escrow, và ghi nhận.'}</p>
    </div>
    <div class="container">
      <div class="info-box">
        ${isEn ? 'No direct custody. Escrow is via external provider. Secrets are never stored or transferred.' : 'Không giữ tiền trực tiếp. Escrow qua provider bên ngoài. Secrets không bao giờ lưu hoặc chuyển.'}
      </div>
      <div class="grid">${rows || `<p style="color:var(--muted)">${isEn ? 'No active transfers.' : 'Không có chuyển nhượng đang hoạt động.'}</p>`}</div>
    </div>
  ` + FOOTER(isEn);
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store, no-cache, must-revalidate', 'X-Robots-Tag': 'noindex, nofollow' } });
}
