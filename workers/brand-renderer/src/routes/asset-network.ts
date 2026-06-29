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

const COMMON_HEAD = (title: string, description: string, ogImage: string) => `<!DOCTYPE html>
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
        'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg') +
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
  const result = await env.DB.prepare(
    `SELECT ml.id, ml.listing_type, ml.title_vi, ml.title_en, ml.description_vi, ml.description_en,
            ml.asking_price_vnd, ml.asking_price_usd, ml.currency,
            ap.public_id, ap.slug, ap.name_vi, ap.name_en, ap.asset_level, ap.summary_vi, ap.summary_en
     FROM marketplace_listings ml
     JOIN asset_packages ap ON ml.package_id = ap.id
     WHERE ml.status = 'live'
       AND ap.publication_status = 'published'
       AND ap.market_status IN ('request_access_only', 'private_tease', 'open_listing')
     ORDER BY ml.updated_at DESC`
  ).all() as any;

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

  const html = COMMON_HEAD(
    isEn ? 'Om Dalat Market — Brand Asset Marketplace' : 'Om Dalat Market — Thị Trường Tài Sản Thương Hiệu',
    isEn ? 'Curated brand asset packages. Request access to view details.' : 'Gói tài sản thương hiệu được tuyển chọn. Yêu cầu truy cập để xem chi tiết.',
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
      <h2 style="color:var(--green);margin:24px 0 12px">${isEn ? 'Curated Listings' : 'Listing Tuyển Chọn'}</h2>
      <div class="grid">
        ${cards || `<p style="color:var(--muted)">${isEn ? 'No live listings yet.' : 'Chưa có listing nào.'}</p>`}
      </div>
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
        'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg') +
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg'
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
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
