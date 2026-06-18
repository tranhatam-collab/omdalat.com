import type { Env } from '../index';

export const handleBrandSite = async (
  request: Request,
  env: Env
): Promise<Response> => {
  try {
    const url = new URL(request.url);
    const host = request.headers.get('Host') || url.hostname;

    // Extract slug from subdomain ONLY (e.g., lily.omdalat.com -> lily)
    // Tenant isolation: Host is the ONLY source of truth. No query/path override.
    let slug: string | undefined;
    const hostParts = host.split('.');
    if (hostParts.length >= 3 && hostParts.slice(-2).join('.') === 'omdalat.com') {
      const subdomain = hostParts[0];
      if (subdomain && subdomain !== 'brand' && subdomain !== 'api' && subdomain !== 'www') {
        slug = subdomain;
      }
    }

    // Reject query param override (tenant leakage protection)
    if (url.searchParams.get('slug')) {
      return new Response('Forbidden: slug override not allowed', { status: 403 });
    }

    // If host is brand.omdalat.com → always render Brand Portal
    const isBrandPortal = hostParts.length >= 3 &&
      hostParts[0] === 'brand' &&
      hostParts.slice(-2).join('.') === 'omdalat.com';

    if (isBrandPortal) {
      return renderBrandPortal(request, env, url);
    }

    if (!slug) {
      return new Response('Brand slug required', { status: 400 });
    }

    // Look up brand by slug
    const brandResult = await env.DB.prepare(
      `SELECT
        b.id, b.name_vi, b.name_en, b.slug, b.subdomain, b.brand_type,
        b.can_host_stay, b.can_host_visit, b.can_sell_product, b.can_host_work,
        b.publication_status, b.ap_place_ref,
        p.lat, p.lng, p.address_vi, p.address_en, p.administrative_area,
        o.name as owner_name, o.consent_status,
        c.lodging_compliance
       FROM brands b
       JOIN places p ON b.place_id = p.id
       JOIN owners o ON b.owner_id = o.id
       LEFT JOIN compliance_checklists c ON b.id = c.brand_id
       WHERE b.slug = ?`
    ).bind(slug).first();

    if (!brandResult) {
      // Unknown brand - return holding page
      console.log(`Brand not found for slug: ${slug}`);
      return renderHoldingPage('unknown', slug);
    }

    const brand = brandResult as any;

    // Check publication status
    if (brand.publication_status === 'published') {
      // Render full brand site
      return renderBrandSite(env, brand, url);
    } else if (brand.publication_status === 'private_preview') {
      // Render private preview holding page
      return renderHoldingPage('private_preview', slug, brand);
    } else {
      // Draft or other status - return holding page
      return renderHoldingPage('draft', slug, brand);
    }
  } catch (error) {
    console.error('Brand site error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

async function renderBrandSite(env: Env, brand: any, url: URL): Promise<Response> {
  try {
    // Fetch content blocks for this brand
    const contentBlocksResult = await env.DB.prepare(
      `SELECT locale, block_type, payload
       FROM content_blocks
       WHERE brand_id = ? AND status = 'published'
       ORDER BY locale, block_type`
    ).bind(brand.id).all();

    const contentBlocks = contentBlocksResult.results || [];

    // Determine locale from URL path or query parameter
    const pathParts = url.pathname.split('/').filter(Boolean);
    const queryLocale = url.searchParams.get('locale');
    const locale = (pathParts.includes('en') || queryLocale === 'en') ? 'en' : 'vi';

    // Check for Lily program routes — must be before general Lily V2 routes
    // Handle both /programs/... and /en/programs/...
    const isProgramsRoute = (pathParts[0] === 'programs') ||
      (pathParts[0] === 'en' && pathParts[1] === 'programs');
    if (isProgramsRoute && brand.slug === 'lily' && brand.publication_status === 'published') {
      const programIdx = pathParts[0] === 'en' ? 2 : 1;
      const program = pathParts[programIdx]; // startup-with-ai or technology-creation
      if (program) {
        const html = generateLilyProgramPage(brand, program, locale, url);
        if (html) {
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300'
            }
          });
        }
      }
    }

    // Check for Lily article routes
    // Handle both /articles/... and /en/articles/...
    const isArticlesRoute = (pathParts[0] === 'articles') ||
      (pathParts[0] === 'en' && pathParts[1] === 'articles');
    if (isArticlesRoute && brand.slug === 'lily' && brand.publication_status === 'published') {
      const articleIdx = pathParts[0] === 'en' ? 2 : 1;
      const article = pathParts[articleIdx]; // article slug
      if (article) {
        const html = generateLilyArticlePage(brand, article, locale, url);
        if (html) {
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300'
            }
          });
        }
      } else {
        // /articles or /en/articles — render article index
        const html = generateLilyArticlesIndexPage(brand, locale, url);
        if (html) {
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=300'
            }
          });
        }
      }
    }

    // Check for specific Lily V2 routes — ONLY if brand is published
    const page = pathParts.find(p => p !== 'en' && p !== 'vi');
    
    if (page && brand.slug === 'lily' && brand.publication_status === 'published') {
      // Gate /stay on lodging_compliance (NĐ 96/2016)
      if (page === 'stay' && brand.lodging_compliance === 'unknown') {
        return new Response('Not Found', { status: 404 });
      }
      // Lily V2 specific pages — only accessible when published
      const html = generateLilyV2Page(brand, page, locale, url);
      if (html) {
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300'
          }
        });
      }
      // Page was specified but no handler matched — return 404
      return new Response('Not Found', { status: 404 });
    }

    // Build HTML response for homepage
    const html = generateBrandSiteHTML(brand, contentBlocks, locale, url);

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    console.error('Render brand site error:', error);
    return new Response('Error rendering site', { status: 500 });
  }
}

function renderHoldingPage(status: string, slug: string, brand?: any): Response {
  const html = generateHoldingPageHTML(status, slug, brand);
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    }
  });
}

function generateLilyV2Page(brand: any, page: string, locale: string, url: URL): string | null {
  const isEn = locale === 'en';
  const brandName = isEn ? brand.name_en : brand.name_vi;
  
  const pages: Record<string, { titleVi: string; titleEn: string; contentVi: string; contentEn: string }> = {
    'stay': {
      titleVi: 'Ở theo tuần / tháng',
      titleEn: 'Weekly / Monthly Stay',
      contentVi: 'Lily không vận hành theo kiểu lưu trú ngắn hạn từng ngày. Người phù hợp với Lily là người muốn ở lại đủ lâu để có nhịp sống, có thời gian làm việc, học kỹ năng, tham gia một dự án và hiểu rõ mình có hợp với Đà Lạt hay không.',
      contentEn: 'Lily does not operate as a daily short-stay accommodation. The right fit for Lily is someone who wants to stay long enough to build a rhythm, work, learn skills, join a project, and understand whether Dalat truly fits them.'
    },
    'workspace': {
      titleVi: 'Không gian làm việc',
      titleEn: 'Workspace',
      contentVi: 'Workspace tại Lily là nơi làm việc thật trong một không gian sân vườn. Không phải coworking ồn ào, không phải café vãng lai, mà là một nơi giữ nhịp cho người ở lại làm việc đều.',
      contentEn: 'The workspace at Lily is a real working area within a garden setting. It is not a noisy coworking space or a public café, but a place that helps residents maintain a steady work rhythm.'
    },
    'programs': {
      titleVi: 'Chương trình',
      titleEn: 'Programs',
      contentVi: 'Lily có hai chương trình chính: Khởi Nghiệp Cùng AI (tạo công việc, thu nhập, hệ thống làm việc) và Sáng Tạo Công Nghệ Cùng AI (xây dựng sản phẩm thật với AI).',
      contentEn: 'Lily offers two main programs: Startup With AI (create work, income, and work systems) and Technology Creation (build real products with AI).'
    },
    'jobs': {
      titleVi: 'Việc làm online',
      titleEn: 'Online Jobs',
      contentVi: 'Lily không hứa có việc cho mọi người. Lily tạo một môi trường để người phù hợp có thể học, thử việc nhỏ, nhận task phù hợp và từng bước tạo thu nhập online từ năng lực thật.',
      contentEn: 'Lily does not promise work for everyone. Lily creates an environment where suitable people can learn, try small tasks, receive relevant work, and gradually build online income from real ability.'
    },
    'training': {
      titleVi: 'Đào tạo',
      titleEn: 'Training',
      contentVi: 'Lily có các module đào tạo: Digital Work Basics, AI Tools for Real Work, Content and SEO, Local Brand Building, Remote Client Communication, Portfolio and Proof of Work, Brand Factory Operations, Long-Term Work Rhythm.',
      contentEn: 'Lily offers training modules: Digital Work Basics, AI Tools for Real Work, Content and SEO, Local Brand Building, Remote Client Communication, Portfolio and Proof of Work, Brand Factory Operations, Long-Term Work Rhythm.'
    },
    'international': {
      titleVi: 'Hỗ trợ quốc tế',
      titleEn: 'International Support',
      contentVi: 'Lily có thể tiếp nhận người nước ngoài muốn ở lại dài hơn tại Lạc Dương, Đà Lạt để làm việc từ xa, học kỹ năng, tham gia dự án và sống trong một môi trường sân vườn có kỷ luật.',
      contentEn: 'Lily can welcome international residents who want to stay longer in Lac Duong near Dalat to work remotely, learn skills, join projects, and live within a disciplined garden-based environment.'
    },
    'visa-support': {
      titleVi: 'Hỗ trợ thông tin về lưu trú, visa và làm việc hợp lệ',
      titleEn: 'Information support for accommodation, visas, and lawful work',
      contentVi: 'Người nước ngoài có thể cần các loại giấy tờ khác nhau tùy mục đích nhập cảnh, thời gian ở lại và hình thức làm việc. Lily không cam kết kết quả visa hoặc giấy phép lao động. Lily chỉ hỗ trợ người tham gia hiểu bước cần chuẩn bị, kết nối đơn vị tư vấn phù hợp và phối hợp với các dự án thuộc hệ Om Dalat khi có nhu cầu hợp lệ.',
      contentEn: 'Foreign residents may need different documents depending on entry purpose, length of stay, and type of work. Lily does not guarantee visa or work permit outcomes. Lily only helps participants understand preparation steps, connect with suitable advisors, and coordinate with Om Dalat projects when there is a lawful need.'
    },
    'apply': {
      titleVi: 'Gửi hồ sơ ở lại',
      titleEn: 'Apply to Stay',
      contentVi: 'Gửi hồ sơ để ở lại tại Lily. Chúng tôi sẽ đọc kỹ trước khi phản hồi. Đây chưa phải xác nhận lưu trú, việc làm hoặc hỗ trợ visa.',
      contentEn: 'Submit an application to stay at Lily. We will review it carefully before responding. This is not a confirmation of accommodation, work, or visa support.'
    }
  };

  const pageData = pages[page];
  if (!pageData) {
    return null;
  }

  const title = isEn ? pageData.titleEn : pageData.titleVi;
  const content = isEn ? pageData.contentEn : pageData.contentVi;
  const pageUrl = `https://${brand.subdomain}${locale === 'en' ? '/en' : ''}/${page}`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${title} - ${brandName}</title>
  <meta name="description" content="${content}">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '/' + page + '">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en/' + page + '">'}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title} - ${brandName}">
  <meta property="og:description" content="${content}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'vi_VN'}">
  <meta property="og:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} - ${brandName}">
  <meta name="twitter:description" content="${content}">
  <meta name="twitter:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 80px 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; opacity: 0.9; max-width: 700px; margin: 0 auto; }
    .section { padding: 60px 0; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; color: #1a5c43; }
    .section p { margin-bottom: 1rem; max-width: 700px; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    .cta-button:hover { background: #0f3d2e; }
    .program-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 30px 0; }
    .program-card { background: #f9f9f9; padding: 30px; border-radius: 8px; }
    .program-card h3 { margin-bottom: 10px; }
    .program-card h3 a { color: #1a5c43; text-decoration: none; }
    .program-card h3 a:hover { text-decoration: underline; }
    .program-card .duration { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
    .program-card .desc { color: #333; margin-bottom: 20px; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${locale === 'en' ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        ${brand.lodging_compliance !== 'unknown' ? `<li><a href="/${locale === 'en' ? 'en/' : ''}stay">${isEn ? 'Stay' : 'Ở lại'}</a></li>` : ''}
        <li><a href="/${locale === 'en' ? 'en/' : ''}workspace">${isEn ? 'Workspace' : 'Không gian làm việc'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}programs">${isEn ? 'Programs' : 'Chương trình'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}jobs">${isEn ? 'Jobs' : 'Việc làm'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}training">${isEn ? 'Training' : 'Đào tạo'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}international">${isEn ? 'International' : 'Quốc tế'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}visa-support">${isEn ? 'Visa Support' : 'Hỗ trợ Visa'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}apply">${isEn ? 'Apply' : 'Gửi hồ sơ'}</a></li>
        <li class="lang-switcher">
          <a href="/${page}" class="${!isEn ? 'active' : ''}">Tiếng Việt</a>
          <a href="/en/${page}" class="${isEn ? 'active' : ''}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="hero">
    <div class="container">
      <h1>${title}</h1>
      <p>${content}</p>
      <a href="/${locale === 'en' ? 'en/' : ''}apply" class="cta-button">${isEn ? 'Apply to Stay' : 'Gửi hồ sơ ở lại'}</a>
    </div>
  </div>

  ${page === 'programs' ? `
  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Our Programs' : 'Chương trình của chúng tôi'}</h2>
      <div class="program-grid">
        <div class="program-card">
          <h3><a href="/${locale === 'en' ? 'en/' : ''}programs/startup-with-ai">${isEn ? 'Startup With AI Residency' : 'Khởi Nghiệp Cùng AI'}</a></h3>
          <p class="duration">${isEn ? '2 weeks' : '2 tuần'}</p>
          <p class="desc">${isEn ? 'Create work, income, and systems with AI. For freelancers, small business owners, and career changers.' : 'Tạo công việc, thu nhập và hệ thống với AI. Dành cho freelancer, người kinh doanh nhỏ và người chuyển đổi nghề nghiệp.'}</p>
          <a href="/${locale === 'en' ? 'en/' : ''}programs/startup-with-ai" class="cta-button">${isEn ? 'Explore Program' : 'Tìm hiểu chương trình'}</a>
        </div>
        <div class="program-card">
          <h3><a href="/${locale === 'en' ? 'en/' : ''}programs/technology-creation">${isEn ? 'Technology Creation Residency' : 'Sáng Tạo Công Nghệ Cùng AI'}</a></h3>
          <p class="duration">${isEn ? '2 weeks' : '2 tuần'}</p>
          <p class="desc">${isEn ? 'Build real products with AI. For developers, creators, and builders who want to make websites, apps, and AI workflows.' : 'Xây dựng sản phẩm thật với AI. Dành cho developer, creator và builder muốn xây website, app và AI workflow.'}</p>
          <a href="/${locale === 'en' ? 'en/' : ''}programs/technology-creation" class="cta-button">${isEn ? 'Explore Program' : 'Tìm hiểu chương trình'}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Related Articles' : 'Bài viết liên quan'}</h2>
      <p>${isEn ? 'Read our articles about AI, work, and building products from Da Lat.' : 'Đọc bài viết của chúng tôi về AI, công việc và xây dựng sản phẩm từ Đà Lạt.'}</p>
      <a href="/${locale === 'en' ? 'en/' : ''}articles" class="cta-button">${isEn ? 'View All Articles' : 'Xem tất cả bài viết'}</a>
    </div>
  </div>
  ` : page === 'apply' ? `
  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Application Form' : 'Mẫu đăng ký'}</h2>
      <form id="applyForm" style="max-width: 600px;">
        <div style="margin-bottom: 20px;">
          <label for="name" style="display: block; margin-bottom: 5px; font-weight: 500;">${isEn ? 'Full Name' : 'Họ và tên'}</label>
          <input type="text" id="name" name="name" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 20px;">
          <label for="email" style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
          <input type="email" id="email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 20px;">
          <label for="program" style="display: block; margin-bottom: 5px; font-weight: 500;">${isEn ? 'Program of Interest' : 'Chương trình quan tâm'}</label>
          <select id="program" name="program" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
            <option value="">${isEn ? 'Select a program' : 'Chọn chương trình'}</option>
            <option value="startup-with-ai">${isEn ? 'Startup With AI Residency' : 'Khởi Nghiệp Cùng AI'}</option>
            <option value="technology-creation">${isEn ? 'Technology Creation Residency' : 'Sáng Tạo Công Nghệ Cùng AI'}</option>
            <option value="stay">${isEn ? 'Stay Only (no program)' : 'Chỉ ở lại (không tham gia chương trình)'}</option>
          </select>
        </div>
        <div style="margin-bottom: 20px;">
          <label for="message" style="display: block; margin-bottom: 5px; font-weight: 500;">${isEn ? 'Why do you want to stay at Lily?' : 'Lý do bạn muốn ở lại tại Lily?'}</label>
          <textarea id="message" name="message" rows="5" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; resize: vertical;"></textarea>
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
            <input type="checkbox" id="consent" name="consent" required style="margin-top: 3px;">
            <span style="font-size: 0.9rem; color: #666;">${isEn ? 'I agree that Lily may store my information to review this application. This is not a confirmation of accommodation, work, or visa support.' : 'Tôi đồng ý Lily có thể lưu trữ thông tin của tôi để xem xét đơn này. Đây chưa phải xác nhận lưu trú, việc làm hoặc hỗ trợ visa.'}</span>
          </label>
        </div>
        <button type="submit" class="cta-button" style="border: none; cursor: pointer; font-size: 1rem;">${isEn ? 'Submit Application' : 'Gửi hồ sơ'}</button>
        <p id="formStatus" style="margin-top: 15px; font-size: 0.9rem;"></p>
      </form>
      <script>
        document.getElementById('applyForm').addEventListener('submit', async function(e) {
          e.preventDefault();
          const status = document.getElementById('formStatus');
          status.textContent = '${isEn ? 'Submitting...' : 'Đang gửi...'}';
          status.style.color = '#333';
          try {
            const response = await fetch('/api/lily/applications', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                purpose: document.getElementById('program').value,
                introduction: document.getElementById('message').value,
                consent: document.getElementById('consent').checked
              })
            });
            const data = await response.json();
            if (response.ok) {
              status.textContent = '${isEn ? 'Application submitted. We will review and respond within 7 days.' : 'Hồ sơ đã gửi. Chúng tôi sẽ xem xét và phản hồi trong vòng 7 ngày.'}';
              status.style.color = '#1a5c43';
              document.getElementById('applyForm').reset();
            } else {
              status.textContent = data.error || '${isEn ? 'Submission failed. Please try again.' : 'Gửi thất bại. Vui lòng thử lại.'}';
              status.style.color = '#c00';
            }
          } catch (err) {
            status.textContent = '${isEn ? 'Network error. Please check your connection.' : 'Lỗi kết nối. Vui lòng kiểm tra kết nối.'}';
            status.style.color = '#c00';
          }
        });
      </script>
    </div>
  </div>
  ` : `
  <div class="section">
    <div class="container">
      <h2>${isEn ? 'More Information' : 'Thông tin thêm'}</h2>
      <p>${isEn ? 'This page is part of Lily Living & Working Garden V2. We are transitioning from a daily homestay model to a weekly/monthly stay model focused on remote work, digital learning, and real project participation.' : 'Trang này là một phần của Lily Living & Working Garden V2. Chúng tôi đang chuyển đổi từ mô hình homestay theo ngày sang mô hình ở lại theo tuần/tháng, tập trung vào làm việc từ xa, học kỹ năng số và tham gia dự án thật.'}</p>
    </div>
  </div>
  `}

  <footer>
    <div class="container">
      <p>&copy; 2026 ${brandName} - ${isEn ? 'Part of' : 'Thuộc hệ'} Ôm Đà Lạt</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function generateLilyProgramPage(brand: any, program: string, locale: string, url: URL): string | null {
  const isEn = locale === 'en';
  const brandName = isEn ? brand.name_en : brand.name_vi;
  
  const programs: Record<string, { titleVi: string; titleEn: string; descriptionVi: string; descriptionEn: string; durationVi: string; durationEn: string; targetVi: string; targetEn: string; outcomeVi: string; outcomeEn: string }> = {
    'startup-with-ai': {
      titleVi: 'Khởi Nghiệp Cùng AI — Lily Intensive',
      titleEn: 'Startup With AI — Lily Intensive',
      descriptionVi: 'Chặng thực hành 2 tuần tại Lily, thuộc lộ trình Khởi Nghiệp Cùng AI. Dành cho người muốn bắt đầu tạo công việc, thu nhập và hệ thống làm việc với AI trong một môi trường có nhịp sống và làm việc thật.',
      descriptionEn: 'A 2-week intensive residency at Lily, part of the Startup With AI journey. For people who want to start creating work, income, and work systems with AI in a real living and working environment.',
      durationVi: '2 tuần (chặng nhập môn của lộ trình 90 ngày)',
      durationEn: '2 weeks (immersion sprint of the 90-day journey)',
      targetVi: 'Freelancer, người kinh doanh nhỏ, người muốn chuyển đổi nghề nghiệp, người muốn xây hệ thống tạo giá trị',
      targetEn: 'Freelancers, small business owners, career changers, value system builders',
      outcomeVi: 'Xây dựng hướng công việc đầu tiên, thử nghiệm thu nhập online, thiết lập hệ thống làm việc cá nhân. Kết quả phụ thuộc vào mức độ tham gia và năng lực của từng người.',
      outcomeEn: 'Build a first work direction, experiment with online income, set up a personal work system. Results depend on individual participation and ability.'
    },
    'technology-creation': {
      titleVi: 'Sáng Tạo Công Nghệ Cùng AI — Lily Intensive',
      titleEn: 'Technology Creation — Lily Intensive',
      descriptionVi: 'Chặng thực hành công nghệ 2 tuần tại Lily. Không phải khóa học lập trình, không lấy chứng chỉ. Mỗi người tham gia phải tạo ra một sản phẩm hoặc hệ thống vận hành được.',
      descriptionEn: 'A 2-week technology building sprint at Lily. Not a coding course, not for certificates. Each participant must create a working product or system.',
      durationVi: '2 tuần (cohort giới hạn số lượng)',
      durationEn: '2 weeks (limited cohort size)',
      targetVi: 'Developer, creator, builder, người muốn xây website, app, AI workflow và sản phẩm số',
      targetEn: 'Developers, creators, builders, people who want to build websites, apps, AI workflows, and digital products',
      outcomeVi: 'MVP hoặc prototype có thể kiểm chứng: website, ứng dụng, AI workflow, AI agent, hệ thống nội dung. Chương trình không bảo đảm sản phẩm đạt thương mại hoặc tạo doanh thu.',
      outcomeEn: 'A verifiable MVP or prototype: website, app, AI workflow, AI agent, content system. The program does not guarantee commercial viability or revenue generation.'
    }
  };

  const programData = programs[program];
  if (!programData) {
    return null;
  }

  const title = isEn ? programData.titleEn : programData.titleVi;
  const description = isEn ? programData.descriptionEn : programData.descriptionVi;
  const duration = isEn ? programData.durationEn : programData.durationVi;
  const target = isEn ? programData.targetEn : programData.targetVi;
  const outcome = isEn ? programData.outcomeEn : programData.outcomeVi;
  const pageUrl = `https://${brand.subdomain}${locale === 'en' ? '/en' : ''}/programs/${program}`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${title} - ${brandName}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '/programs/' + program + '">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en/programs/' + program + '">'}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title} - ${brandName}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'vi_VN'}">
  <meta property="og:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} - ${brandName}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 100px 0; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.3rem; opacity: 0.9; max-width: 700px; margin: 0 auto; }
    .section { padding: 80px 0; }
    .section h2 { font-size: 2.2rem; margin-bottom: 2rem; color: #1a5c43; }
    .section p { margin-bottom: 1.5rem; max-width: 800px; line-height: 1.8; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 40px 0; }
    .info-card { background: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center; }
    .info-card h3 { color: #1a5c43; margin-bottom: 10px; }
    .info-card p { color: #666; font-size: 0.95rem; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; font-size: 1.1rem; }
    .cta-button:hover { background: #0f3d2e; }
    .secondary-button { display: inline-block; background: white; color: #1a5c43; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; margin-left: 10px; font-size: 1.1rem; border: 2px solid #1a5c43; }
    .secondary-button:hover { background: #f0f0f0; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${locale === 'en' ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        ${brand.lodging_compliance !== 'unknown' ? `<li><a href="/${locale === 'en' ? 'en/' : ''}stay">${isEn ? 'Stay' : 'Ở lại'}</a></li>` : ''}
        <li><a href="/${locale === 'en' ? 'en/' : ''}workspace">${isEn ? 'Workspace' : 'Không gian làm việc'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}programs">${isEn ? 'Programs' : 'Chương trình'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}jobs">${isEn ? 'Jobs' : 'Việc làm'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}training">${isEn ? 'Training' : 'Đào tạo'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}international">${isEn ? 'International' : 'Quốc tế'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}visa-support">${isEn ? 'Visa Support' : 'Hỗ trợ Visa'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}apply">${isEn ? 'Apply' : 'Gửi hồ sơ'}</a></li>
        <li class="lang-switcher">
          <a href="/programs/${program}" class="${!isEn ? 'active' : ''}">Tiếng Việt</a>
          <a href="/en/programs/${program}" class="${isEn ? 'active' : ''}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="hero">
    <div class="container">
      <h1>${title}</h1>
      <p>${description}</p>
      <div>
        <a href="/${locale === 'en' ? 'en/' : ''}apply" class="cta-button">${isEn ? 'Apply to Join' : 'Gửi hồ sơ tham gia'}</a>
        <a href="/${locale === 'en' ? 'en/' : ''}" class="secondary-button">${isEn ? 'Back to Home' : 'Về trang chủ'}</a>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Program Details' : 'Thông tin chương trình'}</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3>${isEn ? 'Duration' : 'Thời lượng'}</h3>
          <p>${duration}</p>
        </div>
        <div class="info-card">
          <h3>${isEn ? 'Location' : 'Địa điểm'}</h3>
          <p>Lily Living & Working Garden<br>Lạc Dương – Đà Lạt</p>
        </div>
        <div class="info-card">
          <h3>${isEn ? 'Format' : 'Hình thức'}</h3>
          <p>${isEn ? 'Residency Program' : 'Chương trình lưu trú thực hành'}</p>
        </div>
        <div class="info-card">
          <h3>${isEn ? 'Language' : 'Ngôn ngữ'}</h3>
          <p>${isEn ? 'Vietnamese / English' : 'Tiếng Việt / Tiếng Anh'}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Who This Is For' : 'Dành cho ai'}</h2>
      <p>${target}</p>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'What You Will Build' : 'Bạn sẽ xây dựng gì'}</h2>
      <p>${outcome}</p>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Our Programs' : 'Chương trình của chúng tôi'}</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3><a href="/${locale === 'en' ? 'en/' : ''}programs/startup-with-ai" style="color: #1a5c43; text-decoration: none;">${isEn ? 'Startup With AI' : 'Khởi Nghiệp Cùng AI'}</a></h3>
          <p>${isEn ? 'Create work, income, and systems with AI' : 'Tạo công việc, thu nhập và hệ thống với AI'}</p>
        </div>
        <div class="info-card">
          <h3><a href="/${locale === 'en' ? 'en/' : ''}programs/technology-creation" style="color: #1a5c43; text-decoration: none;">${isEn ? 'Technology Creation' : 'Sáng Tạo Công Nghệ'}</a></h3>
          <p>${isEn ? 'Build real products with AI' : 'Xây dựng sản phẩm thật với AI'}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'How It Works' : 'Cách vận hành'}</h2>
      <p>${isEn ? 'Each 2-week cohort focuses on practical building. Participants live at Lily, work daily, and complete a real product by the end of the program.' : 'Mỗi cohort 2 tuần tập trung vào xây dựng thực hành. Người tham gia ở lại tại Lily, làm việc hàng ngày và hoàn thành một sản phẩm thật vào cuối chương trình.'}</p>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; 2026 ${brandName} - ${isEn ? 'Part of' : 'Thuộc hệ'} Ôm Đà Lạt</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function generateLilyArticlePage(brand: any, article: string, locale: string, url: URL): string | null {
  const isEn = locale === 'en';
  const brandName = isEn ? brand.name_en : brand.name_vi;
  
  const articles: Record<string, { titleVi: string; titleEn: string; contentVi: string; contentEn: string; program: string }> = {
    'khoi-nghiep-cung-ai-khong-bat-dau-tu-cong-nghe': {
      titleVi: 'Khởi Nghiệp Cùng AI Không Bắt Đầu Từ Công Nghệ',
      titleEn: 'Startup With AI Does Not Start With Technology',
      contentVi: `Có một điều thú vị đang diễn ra trên khắp thế giới.

Rất nhiều người đang nói về trí tuệ nhân tạo.

Rất nhiều người đang học cách dùng AI.

Rất nhiều người đang mua khóa học AI.

Nhưng số người thật sự tạo được công việc, tạo được thu nhập hoặc xây được một hệ thống có giá trị từ AI lại không nhiều như chúng ta tưởng.

Vấn đề thường không nằm ở công cụ.

Vấn đề nằm ở cách chúng ta nhìn về công việc và cuộc sống.

Có người dành hàng tháng để học công cụ mới nhưng vẫn không biết mình sẽ làm gì với nó.

Có người liên tục chạy theo xu hướng mới nhưng chưa từng hoàn thành một dự án thực tế.

Có người dùng AI mỗi ngày nhưng chỉ để tiết kiệm vài phút công việc nhỏ.

Trong khi đó, ở một nơi khác, có những người đang dùng cùng những công cụ ấy để xây website, phát triển thương hiệu, tạo nội dung, bán sản phẩm, hỗ trợ khách hàng hoặc tạo ra những công việc hoàn toàn mới.

Sự khác biệt không nằm ở AI.

Sự khác biệt nằm ở cách họ xây dựng một hệ thống làm việc cho chính mình.

Đó cũng là lý do chương trình Khởi Nghiệp Cùng AI tại Lily được hình thành.

Đây không phải một lớp học online.

Đây không phải nơi ngồi nghe lý thuyết về công nghệ.

Đây cũng không phải nơi hứa hẹn làm giàu nhanh.

Đây là một chương trình thực hành diễn ra trong một không gian sống và làm việc tại Lạc Dương, gần Đà Lạt.

Người tham gia sẽ ở lại theo tuần hoặc theo tháng.

Mỗi ngày đều có nhịp làm việc.

Mỗi tuần đều có mục tiêu.

Mỗi người đều phải tạo ra đầu ra cụ thể.

Có thể đó là một website đầu tiên.

Có thể đó là một thương hiệu cá nhân.

Có thể đó là một dịch vụ nhỏ.

Có thể đó là một hệ thống nội dung.

Có thể đó là một công việc online đầu tiên.

Chúng tôi không quan tâm bạn bắt đầu ở đâu.

Điều quan trọng hơn là sau một khoảng thời gian đủ dài, bạn đã tạo được điều gì.

AI có thể giúp bạn làm nhanh hơn.

Nhưng AI không thể thay bạn suy nghĩ.

AI có thể hỗ trợ công việc.

Nhưng AI không thể thay bạn chịu trách nhiệm cho cuộc đời mình.

Khởi nghiệp cùng AI không phải là học một công cụ.

Khởi nghiệp cùng AI là học cách tạo ra giá trị trong một thế giới đang thay đổi.

Nếu bạn đang tìm một nơi để bắt đầu lại một cách thực tế hơn, chậm hơn nhưng rõ ràng hơn, Lily có thể là một điểm dừng phù hợp.

Không phải để trốn khỏi cuộc sống.

Mà để xây lại cách mình làm việc với cuộc sống.`,
      contentEn: `Something interesting is happening around the world.

Many people are talking about artificial intelligence.

Many people are learning how to use AI.

Many people are buying AI courses.

But the number of people who actually create work, generate income, or build valuable systems with AI is not as high as we imagine.

The problem is usually not with the tools.

The problem is how we view work and life.

Some people spend months learning new tools but still don't know what they'll do with them.

Some people constantly chase new trends but have never completed a real project.

Some people use AI every day but only to save a few minutes on small tasks.

Meanwhile, elsewhere, there are people using those same tools to build websites, develop brands, create content, sell products, support customers, or create entirely new jobs.

The difference is not in AI.

The difference is in how they build a work system for themselves.

That's why the Startup With AI program at Lily was created.

This is not an online class.

This is not a place to sit and listen to technology theory.

This is also not a place promising quick wealth.

This is a practical program happening in a living and working space in Lac Duong, near Da Lat.

Participants will stay by the week or by the month.

Every day has a work rhythm.

Every week has goals.

Each person must create specific outputs.

It could be a first website.

It could be a personal brand.

It could be a small service.

It could be a content system.

It could be a first online job.

We don't care where you start.

What matters more is what you've created after a long enough time.

AI can help you do things faster.

But AI cannot think for you.

AI can support work.

But AI cannot take responsibility for your life.

Starting a business with AI is not learning a tool.

Starting a business with AI is learning to create value in a changing world.

If you're looking for a place to start again in a more practical, slower but clearer way, Lily might be a suitable stop.

Not to escape from life.

But to rebuild how you work with life.`,
      program: 'startup-with-ai'
    },
    'vi-sao-nhieu-nguoi-hoc-ai-nhung-van-khong-tao-duoc-thu-nhap': {
      titleVi: 'Vì Sao Nhiều Người Học AI Nhưng Vẫn Không Tạo Được Thu Nhập',
      titleEn: 'Why Many People Learn AI But Still Don\'t Create Income',
      contentVi: `Khoảng cách giữa học và làm.

Hội chứng sưu tầm công cụ.

Thiếu dự án thật.

Thiếu môi trường thực hành.

Đó là những lý do chính khiến nhiều người học AI nhưng không tạo được thu nhập.`,
      contentEn: `The gap between learning and doing.

The tool collection syndrome.

Lack of real projects.

Lack of practice environment.

These are the main reasons why many people learn AI but don't create income.`,
      program: 'startup-with-ai'
    },
    'tu-mot-ky-nang-nho-den-cong-viec-dau-tien-voi-ai': {
      titleVi: 'Từ Một Kỹ Năng Nhỏ Đến Công Việc Đầu Tiên Với AI',
      titleEn: 'From A Small Skill To First Job With AI',
      contentVi: `Viết nội dung.

SEO.

Nghiên cứu.

Trợ lý từ xa.

Quản trị website.

Brand Factory.

Case study thực tế.`,
      contentEn: `Content writing.

SEO.

Research.

Virtual assistant.

Website administration.

Brand Factory.

Real case study.`,
      program: 'startup-with-ai'
    },
    'mot-tuan-song-va-lam-viec-tai-lily-dien-ra-nhu-the-nao': {
      titleVi: 'Một Tuần Sống Và Làm Việc Tại Lily Diễn Ra Như Thế Nào',
      titleEn: 'How A Week Living And Working At Lily Happens',
      contentVi: `Lịch một ngày.

Lịch một tuần.

Làm việc trong vườn.

Workshop.

Review.

Dự án.`,
      contentEn: `Daily schedule.

Weekly schedule.

Working in the garden.

Workshop.

Review.

Project.`,
      program: 'startup-with-ai'
    },
    'neu-bat-dau-lai-tu-dau-nam-2026-toi-se-hoc-ai-nhu-the-nao': {
      titleVi: 'Nếu Bắt Đầu Lại Từ Đầu Năm 2026, Tôi Sẽ Học AI Như Thế Nào',
      titleEn: 'If I Started Again From Early 2026, How Would I Learn AI',
      contentVi: `Không mua 20 khóa học.

Không chạy theo trend.

Chọn một kỹ năng.

Làm dự án thật.

Ở trong môi trường có nhịp làm việc.

Xây portfolio.

Tạo thu nhập đầu tiên.`,
      contentEn: `Don't buy 20 courses.

Don't chase trends.

Choose one skill.

Do real projects.

Live in an environment with work rhythm.

Build portfolio.

Create first income.`,
      program: 'startup-with-ai'
    },
    'chung-ta-khong-thieu-y-tuong-chung-ta-thieu-nhung-nguoi-bien-y-tuong-thanh-san-pham': {
      titleVi: 'Chúng Ta Không Thiếu Ý Tưởng. Chúng Ta Thiếu Những Người Biến Ý Tưởng Thành Sản Phẩm.',
      titleEn: 'We Don\'t Lack Ideas. We Lack People Who Turn Ideas Into Products.',
      contentVi: `Mỗi ngày đều có người nghĩ ra một ý tưởng mới.

Một website mới.

Một ứng dụng mới.

Một cộng đồng mới.

Một dịch vụ mới.

Một dự án mới.

Thế nhưng phần lớn những ý tưởng đó không bao giờ đi xa hơn một cuộc trò chuyện.

Không phải vì ý tưởng không tốt.

Không phải vì công nghệ quá khó.

Mà bởi vì khoảng cách từ một ý tưởng đến một sản phẩm thực tế luôn lớn hơn những gì chúng ta tưởng tượng.

Ngày trước, khoảng cách ấy có thể kéo dài nhiều năm.

Cần đội ngũ kỹ thuật.

Cần vốn đầu tư.

Cần hạ tầng.

Cần rất nhiều nguồn lực.

Ngày nay, điều đó đang thay đổi nhanh chóng.

Một người với máy tính cá nhân, kết nối Internet và khả năng học hỏi có thể tạo ra những sản phẩm mà trước đây chỉ doanh nghiệp lớn mới làm được.

Website.

Hệ thống nội dung.

Ứng dụng nội bộ.

AI workflow.

Agent hỗ trợ công việc.

Công cụ tự động hóa.

Thậm chí cả những nền tảng phục vụ hàng nghìn người dùng.

Nhưng công nghệ không phải là điểm bắt đầu.

Điểm bắt đầu là khả năng nhìn thấy một vấn đề thật.

Sau đó kiên nhẫn xây một giải pháp thật.

Chương trình Sáng Tạo Công Nghệ Cùng AI tại Lily không được tạo ra để dạy mọi người chạy theo công nghệ mới nhất.

Chúng tôi quan tâm nhiều hơn tới một câu hỏi khác:

Làm sao để một người bình thường có thể biến một ý tưởng thành một sản phẩm có ích cho cuộc sống?

Trong hai tuần, người tham gia sẽ không chỉ học.

Mỗi người phải xây.

Phải thử.

Phải sai.

Phải sửa.

Và phải hoàn thành.

Kết quả cuối cùng không phải là một tờ chứng nhận.

Kết quả cuối cùng là một sản phẩm đầu tiên có thể hoạt động.

Có thể nhỏ.

Nhưng là thật.

Đó là nơi hành trình công nghệ nên bắt đầu.`,
      contentEn: `Every day, someone comes up with a new idea.

A new website.

A new app.

A new community.

A new service.

A new project.

But most of those ideas never go beyond a conversation.

Not because the idea isn't good.

Not because the technology is too hard.

But because the distance from an idea to a real product is always greater than we imagine.

In the past, that distance could take many years.

Needed a technical team.

Needed capital investment.

Needed infrastructure.

Needed many resources.

Today, that is changing rapidly.

One person with a personal computer, Internet connection, and learning ability can create products that only large enterprises could do before.

Website.

Content system.

Internal app.

AI workflow.

Work support agent.

Automation tool.

Even platforms serving thousands of users.

But technology is not the starting point.

The starting point is the ability to see a real problem.

Then patiently build a real solution.

The Technology Creation with AI program at Lily was not created to teach everyone to chase the latest technology.

We care more about another question:

How can an ordinary person turn an idea into a product useful for life?

In two weeks, participants will not just learn.

Each person must build.

Must try.

Must fail.

Must fix.

And must complete.

The final result is not a certificate.

The final result is a first product that can work.

Maybe small.

But real.

That's where the technology journey should start.`,
      program: 'technology-creation'
    },
    'ai-khong-thay-the-nha-sang-tao-ai-trao-them-suc-manh-cho-nha-sang-tao': {
      titleVi: 'AI Không Thay Thế Nhà Sáng Tạo. AI Trao Thêm Sức Mạnh Cho Nhà Sáng Tạo.',
      titleEn: 'AI Does Not Replace Creators. AI Gives More Power To Creators.',
      contentVi: `Nỗi sợ lớn nhất của nhiều người hiện nay là công nghệ sẽ thay thế họ.

Điều đó có thể đúng với những công việc lặp lại.

Nhưng lại không đúng với những người biết tạo ra giá trị.

AI không có giấc mơ.

AI không có tầm nhìn.

AI không có trách nhiệm.

AI không có khả năng quyết định điều gì nên được xây dựng.

Những điều đó vẫn thuộc về con người.

Điều AI làm được là giúp một người sáng tạo đi nhanh hơn.

Một người viết có thể xuất bản nhiều hơn.

Một người thiết kế có thể thử nghiệm nhiều hơn.

Một người kinh doanh có thể kiểm chứng ý tưởng nhanh hơn.

Một người lập trình có thể tạo ra hệ thống nhanh hơn.

Trong chương trình Sáng Tạo Công Nghệ Cùng AI, người tham gia sẽ học cách sử dụng AI như một cộng sự.

Không phải để phụ thuộc.

Mà để mở rộng khả năng sáng tạo của chính mình.

Mỗi người sẽ chọn một dự án.

Một sản phẩm.

Một hệ thống.

Một công cụ.

Và dùng AI để rút ngắn khoảng cách từ ý tưởng tới hiện thực.

Công nghệ chỉ thật sự có giá trị khi nó giúp con người tạo ra nhiều giá trị hơn cho cuộc sống.

Đó là triết lý cốt lõi của chương trình này.`,
      contentEn: `The biggest fear of many people today is that technology will replace them.

That may be true for repetitive jobs.

But not true for those who know how to create value.

AI has no dreams.

AI has no vision.

AI has no responsibility.

AI has no ability to decide what should be built.

Those things still belong to humans.

What AI can do is help a creator go faster.

A writer can publish more.

A designer can experiment more.

A business person can validate ideas faster.

A programmer can create systems faster.

In the Technology Creation with AI program, participants will learn to use AI as a collaborator.

Not to depend on.

But to expand their own creative ability.

Each person will choose a project.

A product.

A system.

A tool.

And use AI to shorten the distance from idea to reality.

Technology is only truly valuable when it helps humans create more value for life.

That is the core philosophy of this program.`,
      program: 'technology-creation'
    },
    'tu-da-lat-chung-ta-co-the-xay-dung-san-pham-cho-toan-the-gioi-khong': {
      titleVi: 'Từ Đà Lạt, Chúng Ta Có Thể Xây Dựng Sản Phẩm Cho Toàn Thế Giới Không?',
      titleEn: 'From Da Lat, Can We Build Products For The World?',
      contentVi: `Câu trả lời là có.

Nhưng không theo cách nhiều người vẫn nghĩ.

Không phải bằng những văn phòng lớn.

Không phải bằng những chiến dịch hào nhoáng.

Không phải bằng những khẩu hiệu công nghệ.

Mà bằng những nhóm nhỏ biết tạo ra sản phẩm giải quyết vấn đề thật.

Một website hữu ích.

Một ứng dụng đơn giản.

Một hệ thống quản lý.

Một cộng đồng vận hành tốt.

Một công cụ hỗ trợ công việc.

Một AI Agent giải quyết được một nhiệm vụ cụ thể.

Tất cả đều có thể bắt đầu từ một khu vườn nhỏ.

Từ một căn phòng làm việc.

Từ một nhóm người cùng học và cùng xây dựng.

Đó là lý do Lily chọn mô hình Living & Working Garden.

Con người không chỉ học công nghệ.

Con người sống cùng công nghệ.

Làm việc cùng công nghệ.

Và từng bước tạo ra những sản phẩm có thể phục vụ người khác.

Thế giới ngày càng kết nối.

Địa điểm không còn là rào cản lớn nhất.

Điều quan trọng là khả năng tạo ra giá trị.

Đà Lạt hoàn toàn có thể trở thành nơi khởi đầu của những sản phẩm phục vụ toàn cầu.

Nhưng điều đó chỉ xảy ra khi chúng ta bắt đầu xây dựng.`,
      contentEn: `The answer is yes.

But not in the way many people think.

Not with large offices.

Not with flashy campaigns.

Not with technology slogans.

But with small groups that know how to create products that solve real problems.

A useful website.

A simple app.

A management system.

A well-operating community.

A work support tool.

An AI Agent that can solve a specific task.

All can start from a small garden.

From a workspace.

From a group of people learning and building together.

That's why Lily chose the Living & Working Garden model.

People don't just learn technology.

People live with technology.

Work with technology.

And step by step create products that can serve others.

The world is increasingly connected.

Location is no longer the biggest barrier.

What matters is the ability to create value.

Da Lat can completely become the starting place for products serving the globe.

But that only happens when we start building.`,
      program: 'technology-creation'
    },
    'hai-tuan-tai-lily-se-dien-ra-nhu-the-nao': {
      titleVi: 'Hai Tuần Tại Lily Sẽ Diễn Ra Như Thế Nào?',
      titleEn: 'How Two Weeks At Lily Will Happen?',
      contentVi: `Ngày 1–2: xác định ý tưởng

Ngày 3–4: nghiên cứu người dùng

Ngày 5–7: thiết kế giải pháp

Ngày 8–10: build sản phẩm

Ngày 11–12: kiểm thử

Ngày 13: hoàn thiện

Ngày 14: demo day

Kết quả:

website

app

AI workflow

AI agent

hệ thống nội dung

thương hiệu số`,
      contentEn: `Day 1–2: define idea

Day 3–4: user research

Day 5–7: design solution

Day 8–10: build product

Day 11–12: testing

Day 13: refinement

Day 14: demo day

Results:

website

app

AI workflow

AI agent

content system

digital brand`,
      program: 'technology-creation'
    },
    'neu-chi-co-hai-tuan-de-bat-dau-mot-du-an-cong-nghe-toi-se-lam-gi': {
      titleVi: 'Nếu Chỉ Có Hai Tuần Để Bắt Đầu Một Dự Án Công Nghệ, Tôi Sẽ Làm Gì?',
      titleEn: 'If I Only Have Two Weeks To Start A Technology Project, What Will I Do?',
      contentVi: `Bỏ bớt học lan man.

Chọn một vấn đề.

Chọn một người dùng.

Chọn một giải pháp.

Xây MVP.

Đưa cho người thật dùng thử.

Nhận phản hồi.

Tiếp tục cải tiến.

Kết thúc bằng lời mời:

Hai tuần không đủ để xây một công ty.

Nhưng hai tuần đủ để bắt đầu một sản phẩm.

Và đôi khi, một sản phẩm nhỏ là điểm khởi đầu cho những điều lớn hơn rất nhiều.`,
      contentEn: `Cut down scattered learning.

Choose a problem.

Choose a user.

Choose a solution.

Build MVP.

Give to real users to try.

Get feedback.

Continue improving.

End with invitation:

Two weeks is not enough to build a company.

But two weeks is enough to start a product.

And sometimes, a small product is the starting point for much bigger things.`,
      program: 'technology-creation'
    }
  };

  const articleData = articles[article];
  if (!articleData) {
    return null;
  }

  const title = isEn ? articleData.titleEn : articleData.titleVi;
  const content = isEn ? articleData.contentEn : articleData.contentVi;
  const program = articleData.program;
  const pageUrl = `https://${brand.subdomain}${locale === 'en' ? '/en' : ''}/articles/${article}`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${title} - ${brandName}</title>
  <meta name="description" content="${content.substring(0, 150)}...">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '/articles/' + article + '">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en/articles/' + article + '">'}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title} - ${brandName}">
  <meta property="og:description" content="${content.substring(0, 150)}...">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'vi_VN'}">
  <meta property="og:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} - ${brandName}">
  <meta name="twitter:description" content="${content.substring(0, 150)}...">
  <meta name="twitter:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 60px 0; text-align: center; }
    .hero h1 { font-size: 2.2rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.1rem; opacity: 0.9; }
    .article { padding: 60px 0; }
    .article p { margin-bottom: 1.5rem; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
    .cta-button:hover { background: #0f3d2e; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${locale === 'en' ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}programs">${isEn ? 'Programs' : 'Chương trình'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}programs/${program}">${isEn ? 'Program' : 'Chương trình'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}apply">${isEn ? 'Apply' : 'Gửi hồ sơ'}</a></li>
        <li class="lang-switcher">
          <a href="/articles/${article}" class="${!isEn ? 'active' : ''}">Tiếng Việt</a>
          <a href="/en/articles/${article}" class="${isEn ? 'active' : ''}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="hero">
    <div class="container">
      <h1>${title}</h1>
    </div>
  </div>

  <div class="article">
    <div class="container">
      ${content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
      
      <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #eee;">
        <a href="/${locale === 'en' ? 'en/' : ''}programs/${program}" class="cta-button">${isEn ? 'Explore the Program' : 'Tìm hiểu chương trình'}</a>
        <a href="/${locale === 'en' ? 'en/' : ''}apply" class="cta-button">${isEn ? 'Apply to Join' : 'Gửi hồ sơ tham gia'}</a>
      </div>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; 2026 ${brandName} - ${isEn ? 'Part of' : 'Thuộc hệ'} Ôm Đà Lạt</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function generateLilyArticlesIndexPage(brand: any, locale: string, url: URL): string | null {
  const isEn = locale === 'en';
  const brandName = isEn ? brand.name_en : brand.name_vi;

  // Article data: slug → { titleVi, titleEn, excerptVi, excerptEn, program }
  const articles: Record<string, { titleVi: string; titleEn: string; excerptVi: string; excerptEn: string; program: string }> = {
    'khoi-nghiep-cung-ai-khong-bat-dau-tu-cong-nghe': {
      titleVi: 'Khởi Nghiệp Cùng AI Không Bắt Đầu Từ Công Nghệ',
      titleEn: 'Startup With AI Does Not Start With Technology',
      excerptVi: 'Rất nhiều người đang học AI nhưng số người tạo được công việc hoặc thu nhập từ AI không nhiều như chúng ta tưởng. Vấn đề không nằm ở công cụ...',
      excerptEn: 'Many people are learning AI but few create real work or income from it. The problem is not the tool...',
      program: 'startup-with-ai'
    },
    'vi-sao-nhieu-nguoi-hoc-ai-nhung-van-khong-tao-duoc-thu-nhap': {
      titleVi: 'Vì Sao Nhiều Người Học AI Nhưng Vẫn Không Tạo Được Thu Nhập',
      titleEn: 'Why Many People Learn AI But Still Don\'t Create Income',
      excerptVi: 'Khoảng cách giữa học và làm. Hội chứng sưu tầm công cụ. Thiếu dự án thật. Thiếu môi trường thực hành...',
      excerptEn: 'The gap between learning and doing. Tool collection syndrome. Lack of real projects...',
      program: 'startup-with-ai'
    },
    'tu-mot-ky-nang-nho-den-cong-viec-dau-tien-voi-ai': {
      titleVi: 'Từ Một Kỹ Năng Nhỏ Đến Công Việc Đầu Tiên Với AI',
      titleEn: 'From A Small Skill To First Job With AI',
      excerptVi: 'Viết nội dung, SEO, nghiên cứu, trợ lý từ xa, quản trị website, Brand Factory, case study thực tế...',
      excerptEn: 'Content writing, SEO, research, virtual assistant, website administration, Brand Factory...',
      program: 'startup-with-ai'
    },
    'mot-tuan-song-va-lam-viec-tai-lily-dien-ra-nhu-the-nao': {
      titleVi: 'Một Tuần Sống Và Làm Việc Tại Lily Diễn Ra Như Thế Nào',
      titleEn: 'How A Week Living And Working At Lily Happens',
      excerptVi: 'Lịch một ngày, lịch một tuần, làm việc trong vườn, workshop, review, dự án...',
      excerptEn: 'Daily schedule, weekly schedule, working in the garden, workshop, review, project...',
      program: 'startup-with-ai'
    },
    'neu-bat-dau-lai-tu-dau-nam-2026-toi-se-hoc-ai-nhu-the-nao': {
      titleVi: 'Nếu Bắt Đầu Lại Từ Đầu Năm 2026, Tôi Sẽ Học AI Như Thế Nào',
      titleEn: 'If I Started Again From Early 2026, How Would I Learn AI',
      excerptVi: 'Không mua 20 khóa học. Không chạy theo trend. Chọn một kỹ năng. Làm dự án thật...',
      excerptEn: 'Don\'t buy 20 courses. Don\'t chase trends. Choose one skill. Do real projects...',
      program: 'startup-with-ai'
    },
    'chung-ta-khong-thieu-y-tuong-chung-ta-thieu-nhung-nguoi-bien-y-tuong-thanh-san-pham': {
      titleVi: 'Chúng Ta Không Thiếu Ý Tưởng. Chúng Ta Thiếu Những Người Biến Ý Tưởng Thành Sản Phẩm.',
      titleEn: 'We Don\'t Lack Ideas. We Lack People Who Turn Ideas Into Products.',
      excerptVi: 'Phần lớn ý tưởng không bao giờ đi xa hơn một cuộc trò chuyện. Không phải vì ý tưởng không tốt...',
      excerptEn: 'Most ideas never go beyond a conversation. Not because the idea isn\'t good...',
      program: 'technology-creation'
    },
    'ai-khong-thay-the-nha-sang-tao-ai-trao-them-suc-manh-cho-nha-sang-tao': {
      titleVi: 'AI Không Thay Thế Nhà Sáng Tạo. AI Trao Thêm Sức Mạnh Cho Nhà Sáng Tạo.',
      titleEn: 'AI Does Not Replace Creators. AI Gives More Power To Creators.',
      excerptVi: 'AI không có giấc mơ, không có tầm nhìn, không có trách nhiệm. Điều AI làm được là giúp người sáng tạo đi nhanh hơn...',
      excerptEn: 'AI has no dreams, no vision, no responsibility. What AI can do is help creators go faster...',
      program: 'technology-creation'
    },
    'tu-da-lat-chung-ta-co-the-xay-dung-san-pham-cho-toan-the-gioi-khong': {
      titleVi: 'Từ Đà Lạt, Chúng Ta Có Thể Xây Dựng Sản Phẩm Cho Toàn Thế Giới Không?',
      titleEn: 'From Da Lat, Can We Build Products For The World?',
      excerptVi: 'Đà Lạt hoàn toàn có thể trở thành nơi khởi đầu của những sản phẩm phục vụ toàn cầu...',
      excerptEn: 'Da Lat can completely become the starting place for products serving the globe...',
      program: 'technology-creation'
    },
    'hai-tuan-tai-lily-se-dien-ra-nhu-the-nao': {
      titleVi: 'Hai Tuần Tại Lily Sẽ Diễn Ra Như Thế Nào?',
      titleEn: 'How Two Weeks At Lily Will Happen?',
      excerptVi: 'Ngày 1–2: xác định ý tưởng. Ngày 3–4: nghiên cứu người dùng. Ngày 5–7: thiết kế giải pháp...',
      excerptEn: 'Day 1–2: define idea. Day 3–4: user research. Day 5–7: design solution...',
      program: 'technology-creation'
    },
    'neu-chi-co-hai-tuan-de-bat-dau-mot-du-an-cong-nghe-toi-se-lam-gi': {
      titleVi: 'Nếu Chỉ Có Hai Tuần Để Bắt Đầu Một Dự Án Công Nghệ, Tôi Sẽ Làm Gì?',
      titleEn: 'If I Only Have Two Weeks To Start A Technology Project, What Will I Do?',
      excerptVi: 'Hai tuần không đủ để xây một công ty. Nhưng hai tuần đủ để bắt đầu một sản phẩm...',
      excerptEn: 'Two weeks is not enough to build a company. But two weeks is enough to start a product...',
      program: 'technology-creation'
    }
  };

  const pageUrl = `https://${brand.subdomain}${locale === 'en' ? '/en' : ''}/articles`;

  // Group articles by program
  const startupArticles = Object.entries(articles).filter(([, a]) => a.program === 'startup-with-ai');
  const techArticles = Object.entries(articles).filter(([, a]) => a.program === 'technology-creation');

  const renderArticleCard = (slug: string, article: any) => {
    const title = isEn ? article.titleEn : article.titleVi;
    const excerpt = isEn ? article.excerptEn : article.excerptVi;
    return `
      <div class="article-card">
        <h3><a href="/${locale === 'en' ? 'en/' : ''}articles/${slug}">${title}</a></h3>
        <p class="excerpt">${excerpt}</p>
        <a href="/${locale === 'en' ? 'en/' : ''}articles/${slug}" class="read-more">${isEn ? 'Read article' : 'Đọc bài viết'} →</a>
      </div>
    `;
  };

  const startupSection = startupArticles.map(([slug, a]) => renderArticleCard(slug, a)).join('');
  const techSection = techArticles.map(([slug, a]) => renderArticleCard(slug, a)).join('');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${isEn ? 'Articles' : 'Bài viết'} - ${brandName}</title>
  <meta name="description" content="${isEn ? 'Articles about Startup With AI and Technology Creation programs at Lily.' : 'Bài viết về chương trình Khởi Nghiệp Cùng AI và Sáng Tạo Công Nghệ tại Lily.'}">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '/articles">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en/articles">'}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${isEn ? 'Articles' : 'Bài viết'} - ${brandName}">
  <meta property="og:description" content="${isEn ? 'Articles about Startup With AI and Technology Creation programs at Lily.' : 'Bài viết về chương trình Khởi Nghiệp Cùng AI và Sáng Tạo Công Nghệ tại Lily.'}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'vi_VN'}">
  <meta property="og:image" content="https://${brand.subdomain}/images/hero/hero-01.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 80px 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .section { padding: 60px 0; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; color: #1a5c43; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
    .articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 30px 0; }
    .article-card { background: #f9f9f9; padding: 25px; border-radius: 8px; }
    .article-card h3 { margin-bottom: 10px; }
    .article-card h3 a { color: #1a5c43; text-decoration: none; }
    .article-card h3 a:hover { text-decoration: underline; }
    .article-card .excerpt { color: #666; font-size: 0.95rem; margin-bottom: 15px; }
    .article-card .read-more { color: #1a5c43; text-decoration: none; font-weight: 500; }
    .article-card .read-more:hover { text-decoration: underline; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    .cta-button:hover { background: #0f3d2e; }
    .program-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 30px 0; }
    .program-card { background: #f9f9f9; padding: 30px; border-radius: 8px; }
    .program-card h3 { margin-bottom: 10px; }
    .program-card h3 a { color: #1a5c43; text-decoration: none; }
    .program-card h3 a:hover { text-decoration: underline; }
    .program-card .duration { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
    .program-card .desc { color: #333; margin-bottom: 20px; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${locale === 'en' ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}programs">${isEn ? 'Programs' : 'Chương trình'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}apply">${isEn ? 'Apply' : 'Gửi hồ sơ'}</a></li>
        <li class="lang-switcher">
          <a href="/articles" class="${!isEn ? 'active' : ''}">Tiếng Việt</a>
          <a href="/en/articles" class="${isEn ? 'active' : ''}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="hero">
    <div class="container">
      <h1>${isEn ? 'Articles' : 'Bài viết'}</h1>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Startup With AI' : 'Khởi Nghiệp Cùng AI'}</h2>
      <div class="articles-grid">
        ${startupSection}
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/${locale === 'en' ? 'en/' : ''}programs/startup-with-ai" class="cta-button">${isEn ? 'Explore the Program' : 'Tìm hiểu chương trình'}</a>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'Technology Creation' : 'Sáng Tạo Công Nghệ'}</h2>
      <div class="articles-grid">
        ${techSection}
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="/${locale === 'en' ? 'en/' : ''}programs/technology-creation" class="cta-button">${isEn ? 'Explore the Program' : 'Tìm hiểu chương trình'}</a>
      </div>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>&copy; 2026 ${brandName} - ${isEn ? 'Part of' : 'Thuộc hệ'} Ôm Đà Lạt</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function generateBrandSiteHTML(brand: any, contentBlocks: any[], locale: string, url: URL): string {
  const isEn = locale === 'en';
  const brandName = isEn ? brand.name_en : brand.name_vi;

  // Extract content blocks by type
  const getBlock = (blockType: string) => {
    const block = contentBlocks.find((b: any) =>
      b.block_type === blockType && b.locale === locale
    );
    return block ? JSON.parse(block.payload) : null;
  };

  const heroBlock = getBlock('hero') || {
    title: brandName,
    subtitle: isEn ? 'A local brand in the Om Dalat network' : 'Một thương hiệu địa phương trong hệ Ôm Đà Lạt'
  };

  const storyBlock = getBlock('story');
  const whatBlock = getBlock('what');
  const whyBlock = getBlock('why');
  const spaceBlock = getBlock('space');
  const locationBlock = getBlock('location');
  const businessBlock = getBlock('business');
  const productsBlock = getBlock('products');
  const experiencesBlock = getBlock('experiences');
  const reviewsBlock = getBlock('reviews');
  const highlightsBlock = getBlock('highlights');

  const pageUrl = `https://${brand.subdomain}${locale === 'en' ? '/en' : ''}`;
  const ogImage = heroBlock.image || `https://${brand.subdomain}/images/og/og-lily.jpg`;

  const organizationSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Om Dalat",
    alternateName: ["Ôm Đà Lạt"],
    url: "https://omdalat.com",
    description: "A real-life living system in Da Lat where people can stay, work, learn from experience, and build long-term value."
  });

  const websiteSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Om Dalat",
    alternateName: ["Ôm Đà Lạt"],
    url: "https://omdalat.com",
    description: "A real-life living system in Da Lat."
  });

  const webpageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: heroBlock.title,
    description: heroBlock.subtitle,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Om Dalat",
      url: "https://omdalat.com"
    }
  });

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${heroBlock.title}</title>
  <meta name="description" content="${heroBlock.subtitle}">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en">'}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${heroBlock.title}">
  <meta property="og:description" content="${heroBlock.subtitle}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${locale === 'en' ? 'en_US' : 'vi_VN'}">
  ${isEn ? '' : '<meta property="og:locale:alternate" content="en_US">'}
  ${isEn ? '<meta property="og:locale:alternate" content="vi_VN">' : ''}
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${heroBlock.title}">
  <meta name="twitter:description" content="${heroBlock.subtitle}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">${organizationSchema}</script>
  <script type="application/ld+json">${websiteSchema}</script>
  <script type="application/ld+json">${webpageSchema}</script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 80px 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; opacity: 0.9; }
    .section { padding: 60px 0; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; color: #1a5c43; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    .cta-button:hover { background: #0f3d2e; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .card { background: #f9f9f9; padding: 20px; border-radius: 8px; }
    .card h3 { margin-bottom: 10px; color: #1a5c43; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${isEn ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        <li><a href="#highlights">${isEn ? 'Highlights' : 'Điểm nổi bật'}</a></li>
        <li><a href="#story">${isEn ? 'Story' : 'Câu chuyện'}</a></li>
        <li><a href="#what">${isEn ? 'What' : 'Đây là nơi gì'}</a></li>
        <li><a href="#space">${isEn ? 'Space' : 'Không gian'}</a></li>
        <li><a href="#location">${isEn ? 'Location' : 'Vị trí'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Liên hệ'}</a></li>
        <li class="lang-switcher">
          <a href="/" class="${isEn ? '' : 'active'}" aria-label="${isEn ? 'Switch to Vietnamese' : 'Đang xem tiếng Việt'}">Tiếng Việt</a>
          <a href="/en" class="${isEn ? 'active' : ''}" aria-label="${isEn ? 'Currently viewing English' : 'Chuyển sang tiếng Anh'}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  ${false && heroBlock.image ? `<div style="width:100%; height:400px; background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); display:flex; align-items:center; justify-content:center; overflow:hidden;"><img src="${heroBlock.image}" alt="${isEn ? 'Featured image: ' : 'Hình ảnh minh họa: '}${heroBlock.title}" style="width:100%; height:100%; object-fit:cover;" loading="eager"/></div>` : ''}

  <section class="hero">
    <div class="container">
      <h1>${heroBlock.title}</h1>
      <p>${heroBlock.subtitle}</p>
      <a href="#contact" class="cta-button">${isEn ? 'Send Inquiry' : 'Gửi yêu cầu tìm hiểu'}</a>
    </div>
  </section>

  ${storyBlock ? `
  <section class="section" id="story">
    <div class="container">
      <h2>${isEn ? 'Our Story' : 'Câu chuyện'}</h2>
      <div class="card">
        <p>${storyBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${whatBlock ? `
  <section class="section" id="what">
    <div class="container">
      <h2>${isEn ? 'What is this place' : 'Đây là nơi gì'}</h2>
      <div class="card">
        <p>${whatBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${whyBlock ? `
  <section class="section" id="why">
    <div class="container">
      <h2>${isEn ? 'Why Lily fits Om Dalat' : 'Vì sao Lily phù hợp Om Dalat'}</h2>
      <div class="card">
        <p>${whyBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${highlightsBlock ? `
  <section class="section" id="highlights" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <div class="container">
      <h2>${isEn ? 'Highlights' : 'Điểm nổi bật'}</h2>
      <div class="grid">
        ${highlightsBlock.items ? highlightsBlock.items.map((item: any) => `
          <div class="card" style="background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            ${false && item.image ? `<div style="width:100%; height:200px; margin-bottom:16px; border-radius:4px; overflow:hidden; background:#eee;"><img src="${item.image}" alt="${isEn ? 'Featured image: ' : 'Hình ảnh minh họa: '}${item.title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy"/></div>` : ''}
            <h3>${item.title}</h3>
            <p>${item.text || ''}</p>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </section>
  ` : ''}

  ${spaceBlock ? `
  <section class="section" id="space">
    <div class="container">
      <h2>${isEn ? 'The Space' : 'Không gian'}</h2>
      <div class="card">
        <p>${spaceBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${locationBlock ? `
  <section class="section" id="location">
    <div class="container">
      <h2>${isEn ? 'Location' : 'Vị trí'}</h2>
      <div class="card">
        <p>${locationBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${highlightsBlock && highlightsBlock.images ? `
  <section class="section" id="gallery" style="background: #f8fafc;">
    <div class="container">
      <h2>${isEn ? 'Photo Gallery' : 'Thư viện ảnh'}</h2>
      <p style="text-align:center; color:#666; margin-bottom:2rem;">${isEn ? 'A glimpse into life at Lily Homestay.' : 'Những khoảnh khắc tại Homestay Lily.'}</p>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        ${highlightsBlock.images.map((img: any) => `
          <div style="border-radius:8px; overflow:hidden; background:#eee; aspect-ratio:4/3;">
            <img src="${img.url}" alt="${img.alt || (isEn ? 'Lily Homestay photo' : 'Hình ảnh Lily Homestay')}" style="width:100%; height:100%; object-fit:cover;" loading="lazy"/>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  ${false && reviewsBlock ? `
  <section class="section" id="reviews" style="background: #f0f4f8;">
    <div class="container">
      <h2>${isEn ? 'What Guests Say' : 'Khách nói gì'}</h2>
      <p style="text-align: center; color: #1a5c43; font-size: 1.2rem; margin-bottom: 2rem;">★★★★☆ 4.6 / 5 (36+ ${isEn ? 'reviews' : 'đánh giá'})</p>
      <div class="grid">
        ${reviewsBlock.reviews ? reviewsBlock.reviews.map((review: any) => `
          <div class="card" style="background: white; border-left: 4px solid #1a5c43;">
            <p style="font-style: italic; margin-bottom: 15px;">"${review.text}"</p>
            <p style="color: #1a5c43; font-weight: 600;">— ${review.author}</p>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </section>
  ` : ''}

  ${businessBlock ? `
  <section class="section" id="business">
    <div class="container">
      <h2>${isEn ? 'Business Lines' : 'Dòng kinh doanh'}</h2>
      <div class="card">
        <p>${businessBlock.content || ''}</p>
      </div>
    </div>
  </section>
  ` : ''}

  ${productsBlock ? `
  <section class="section" id="products">
    <div class="container">
      <h2>${isEn ? 'Our Products' : 'Sản phẩm'}</h2>
      <div class="grid">
        ${productsBlock.items ? productsBlock.items.map((item: any) => `
          <div class="card">
            <h3>${item.name}</h3>
            <p>${item.description || ''}</p>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </section>
  ` : ''}

  ${experiencesBlock ? `
  <section class="section" id="experiences">
    <div class="container">
      <h2>${isEn ? 'Experiences' : 'Trải nghiệm'}</h2>
      <div class="grid">
        ${experiencesBlock.items ? experiencesBlock.items.map((item: any) => `
          <div class="card">
            <h3>${item.title}</h3>
            <p>${item.description || ''}</p>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </section>
  ` : ''}

  <section class="section" id="contact">
    <div class="container">
      <h2>${isEn ? 'Contact' : 'Liên hệ'}</h2>
      <div class="card">
        <p><strong>${isEn ? 'Location' : 'Địa chỉ'}:</strong> ${isEn ? (brand.address_en || brand.address_vi || '') : (brand.address_vi || '')}</p>
        <p><strong>${isEn ? 'Phone' : 'Điện thoại'}:</strong> WA/Zalo: +84919 851 311 | Hotline: +84775 875 133</p>
        <p><strong>Email:</strong> <a href="mailto:contact@lily.omdalat.com">contact@lily.omdalat.com</a></p>
        <p><strong>${isEn ? 'Network' : 'Hệ'}:</strong> Ôm Đà Lạt / Ấp Đà Lạt</p>
        <form action="https://api.omdalat.com/api/omdalat/brands/${brand.id}/inquiry" method="POST" style="margin-top: 20px;">
          <input type="text" name="contact" placeholder="${isEn ? 'Your contact (phone/email)' : 'Liên hệ của bạn (SĐT/email)'}" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
          <textarea name="message" placeholder="${isEn ? 'Your message' : 'Lời nhắn của bạn'}" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; min-height: 100px;"></textarea>
          <input type="hidden" name="brand_id" value="${brand.id}">
          <input type="hidden" name="locale" value="${locale}">
          <button type="submit" class="cta-button">${isEn ? 'Send Inquiry' : 'Gửi yêu cầu'}</button>
        </form>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2026 ${brandName} - ${isEn ? 'Part of' : 'Thuộc hệ'} Ôm Đà Lạt</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}

function generateHoldingPageHTML(status: string, slug: string, brand?: any): string {
  const isEn = false; // Holding pages default to Vietnamese

  if (status === 'unknown') {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Không tìm thấy - Ôm Đà Lạt</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #1a5c43; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 20px; }
    a { color: #1a5c43; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Không tìm thấy</h1>
    <p>Thương hiệu "${slug}" không tồn tại trong hệ thống Ôm Đà Lạt.</p>
    <p><a href="https://omdalat.com">Trở về omdalat.com</a></p>
  </div>
</body>
</html>`;
  }

  const brandName = brand ? brand.name_vi : slug;

  if (status === 'private_preview') {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - Đang xây dựng</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #1a5c43 0%, #764ba2 100%); }
    .container { text-align: center; padding: 60px 40px; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); max-width: 600px; }
    h1 { color: #1a5c43; margin-bottom: 20px; }
    p { color: #666; line-height: 1.6; margin-bottom: 20px; }
    .badge { display: inline-block; background: #f0f0f0; padding: 8px 16px; border-radius: 20px; font-size: 14px; color: #666; margin-bottom: 20px; }
    a { color: #1a5c43; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">Đang xây dựng</span>
    <h1>${brandName}</h1>
    <p>Một hồ sơ đang được xây dựng trong hệ Ấp Đà Lạt. Chúng tôi đang hoàn thiện thông tin, hình ảnh và câu chuyện cùng chủ nhà trước khi mở rộng kết nối.</p>
    <p><a href="https://omdalat.com">Tìm hiểu về Ôm Đà Lạt</a></p>
  </div>
</body>
</html>`;
  }

  // Draft status
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - Nháp</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #1a5c43; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 20px; }
    a { color: #1a5c43; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${brandName}</h1>
    <p>Trang này đang trong quá trình soạn thảo.</p>
    <p><a href="https://omdalat.com">Trở về omdalat.com</a></p>
  </div>
</body>
</html>`;
}

// ── BRAND PORTAL ──

async function renderBrandPortal(_request: Request, _env: Env, url: URL): Promise<Response> {
  const pathParts = url.pathname.split('/').filter(Boolean);
  const queryLocale = url.searchParams.get('locale');
  const locale = (pathParts.includes('en') || queryLocale === 'en') ? 'en' : 'vi';
  const html = generateBrandPortalHTML(locale, url);
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
}

function generateBrandPortalHTML(locale: string, url: URL): string {
  const isEn = locale === 'en';
  const pageUrl = `https://brand.omdalat.com${isEn ? '/en' : ''}`;
  const ogImage = 'https://omdalat.com/images/ready/og/dalat-city-panorama-2020.jpg';

  const t = {
    vi: {
      title: 'Om Dalat Brand System Portal',
      heroH1: 'Xây dựng thương hiệu địa phương từ Đà Lạt ra thế giới',
      heroSub: 'Một hệ thống giúp người dân, hộ kinh doanh, nhà vườn, quán nhỏ, homestay, farm và công ty địa phương có một thương hiệu số rõ ràng, song ngữ và có thể phát triển dài hạn.',
      problemTitle: 'Vấn đề',
      problemP1: 'Phần lớn thương hiệu địa phương hiện chỉ tồn tại trên Facebook, Google Maps hoặc các nền tảng trung gian.',
      problemP2: 'Điều đó giúp được tìm thấy. Nhưng không giúp sở hữu một hiện diện số lâu dài.',
      modelTitle: 'Mô hình 4 lớp',
      layer1: 'Lớp 1: Om Dalat Core — Hệ vận hành thành viên, dashboard, inquiry, workflow.',
      layer2: 'Lớp 2: Ấp Đà Lạt — Truyền thông địa phương, câu chuyện, văn hóa. Không bán hàng.',
      layer3: 'Lớp 3: Brand Portal — Nơi tạo thương hiệu. Intake, verification, strategy, publishing.',
      layer4: 'Lớp 4: Brand Sites — lily.omdalat.com, tamfarm.omdalat.com... Nơi thương hiệu tồn tại.',
      whoTitle: 'Ai có thể tham gia',
      whoList: ['Nhà vườn', 'Farm', 'Homestay', 'Café', 'Quán ăn', 'Sản phẩm địa phương', 'Xưởng nghề', 'Doanh nghiệp', 'Nghệ nhân', 'Hợp tác xã'],
      caseTitle: 'Thương hiệu đang xây',
      lilyStatus: 'Đã xuất bản',
      tamfarmStatus: 'Đang xây',
      roadmapTitle: 'Lộ trình',
      phase1: 'Giai đoạn 1: Đà Lạt & Lạc Dương — 50 thương hiệu',
      phase2: 'Giai đoạn 2: Toàn tỉnh Lâm Đồng — 500 thương hiệu',
      phase3: 'Giai đoạn 3: Quốc tế hóa — 5.000 thương hiệu',
      langTitle: 'Ngôn ngữ',
      langLive: 'Đang hoạt động: Vietnamese, English',
      langPlan: 'Kế hoạch: Korean, Japanese, Chinese, Russian',
      ctaTitle: 'Gửi thương hiệu của bạn',
      ctaLabel: 'Bắt đầu',
      footer: 'Om Dalat Brand System Portal'
    },
    en: {
      title: 'Om Dalat Brand System Portal',
      heroH1: 'Building local brands from Dalat to the world',
      heroSub: 'A system helping local people, household businesses, farms, cafés, homestays, and companies build clear, bilingual, long-term digital brands.',
      problemTitle: 'The Problem',
      problemP1: 'Most local brands today only exist through Facebook, Google Maps, or third-party platforms.',
      problemP2: 'That helps them get discovered. It does not help them own a long-term digital presence.',
      modelTitle: '4-Layer Model',
      layer1: 'Layer 1: Om Dalat Core — Member system, dashboard, inquiry, workflow.',
      layer2: 'Layer 2: Ap Dalat — Local editorial, stories, culture. No commerce.',
      layer3: 'Layer 3: Brand Portal — Where brands are created. Intake, verification, strategy, publishing.',
      layer4: 'Layer 4: Brand Sites — lily.omdalat.com, tamfarm.omdalat.com... Where brands live.',
      whoTitle: 'Who Can Join',
      whoList: ['Farmers', 'Farms', 'Homestays', 'Cafés', 'Restaurants', 'Local Products', 'Craft Workshops', 'Companies', 'Artisans', 'Cooperatives'],
      caseTitle: 'Brands in Progress',
      lilyStatus: 'Published',
      tamfarmStatus: 'In Progress',
      roadmapTitle: 'Roadmap',
      phase1: 'Phase 1: Dalat & Lac Duong — 50 brands',
      phase2: 'Phase 2: All of Lam Dong Province — 500 brands',
      phase3: 'Phase 3: International expansion — 5,000 brands',
      langTitle: 'Languages',
      langLive: 'Live: Vietnamese, English',
      langPlan: 'Planned: Korean, Japanese, Chinese, Russian',
      ctaTitle: 'Submit Your Brand',
      ctaLabel: 'Get Started',
      footer: 'Om Dalat Brand System Portal'
    }
  };

  const c = isEn ? t.en : t.vi;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0f3d2e">
  <meta name="robots" content="index, follow">
  <title>${c.title}</title>
  <meta name="description" content="${c.heroSub}">
  <link rel="canonical" href="${pageUrl}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://brand.omdalat.com">' : '<link rel="alternate" hreflang="en" href="https://brand.omdalat.com/en">'}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${c.title}">
  <meta property="og:description" content="${c.heroSub}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Om Dalat">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'vi_VN'}">
  ${isEn ? '' : '<meta property="og:locale:alternate" content="en_US">'}
  ${isEn ? '<meta property="og:locale:alternate" content="vi_VN">' : ''}
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${c.title}">
  <meta name="twitter:description" content="${c.heroSub}">
  <meta name="twitter:image" content="${ogImage}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); color: white; padding: 100px 0; text-align: center; }
    .hero h1 { font-size: 2.8rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; opacity: 0.9; max-width: 700px; margin: 0 auto; }
    .section { padding: 60px 0; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; color: #1a5c43; }
    .section p { margin-bottom: 1rem; max-width: 700px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
    .card { background: #f9f9f9; padding: 24px; border-radius: 8px; }
    .card h3 { margin-bottom: 10px; color: #1a5c43; }
    .cta-button { display: inline-block; background: #1a5c43; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; margin-top: 20px; }
    .cta-button:hover { background: #0f3d2e; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #1a5c43; }
    .lang-switcher { display: inline-flex; gap: 8px; align-items: center; }
    .lang-switcher a { padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: 500; }
    .lang-switcher a.active { background: #1a5c43; color: white; }
    .lang-switcher a:not(.active) { background: #f0f0f0; color: #333; }
    .lang-switcher a:not(.active):hover { background: #e0e0e0; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .case-list { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
    .case-card { background: white; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; min-width: 200px; text-align: center; }
    .case-card .status { display: inline-block; background: #e8f5e9; color: #1a5c43; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; margin-top: 10px; }
    .case-card .status.draft { background: #fff3e0; color: #e65100; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="https://omdalat.com">${isEn ? 'Om Dalat' : 'Ôm Đà Lạt'}</a></li>
        <li><a href="#problem">${isEn ? 'Why' : 'Vì sao'}</a></li>
        <li><a href="#model">${isEn ? 'Model' : 'Mô hình'}</a></li>
        <li><a href="#who">${isEn ? 'Who' : 'Đối tượng'}</a></li>
        <li><a href="#cases">${isEn ? 'Cases' : 'Thương hiệu'}</a></li>
        <li><a href="#roadmap">${isEn ? 'Roadmap' : 'Lộ trình'}</a></li>
        <li class="lang-switcher">
          <a href="/" class="${isEn ? '' : 'active'}">Tiếng Việt</a>
          <a href="/en" class="${isEn ? 'active' : ''}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>${c.heroH1}</h1>
      <p>${c.heroSub}</p>
      <a href="https://omdalat.com/contact" class="cta-button">${c.ctaLabel}</a>
    </div>
  </section>

  <section class="section" id="problem">
    <div class="container">
      <h2>${c.problemTitle}</h2>
      <p>${c.problemP1}</p>
      <p>${c.problemP2}</p>
    </div>
  </section>

  <section class="section" id="model" style="background: #f0f4f8;">
    <div class="container">
      <h2>${c.modelTitle}</h2>
      <div class="grid">
        <div class="card"><h3>Layer 1</h3><p>${c.layer1}</p></div>
        <div class="card"><h3>Layer 2</h3><p>${c.layer2}</p></div>
        <div class="card"><h3>Layer 3</h3><p>${c.layer3}</p></div>
        <div class="card"><h3>Layer 4</h3><p>${c.layer4}</p></div>
      </div>
    </div>
  </section>

  <section class="section" id="who">
    <div class="container">
      <h2>${c.whoTitle}</h2>
      <div class="grid">
        ${c.whoList.map(item => `<div class="card"><p>${item}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="cases" style="background: #f0f4f8;">
    <div class="container">
      <h2>${c.caseTitle}</h2>
      <div class="case-list">
        <div class="case-card">
          <strong>Lily</strong>
          <span class="status">${c.lilyStatus}</span>
        </div>
        <div class="case-card">
          <strong>Tam Farm</strong>
          <span class="status draft">${c.tamfarmStatus}</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="roadmap">
    <div class="container">
      <h2>${c.roadmapTitle}</h2>
      <div class="grid">
        <div class="card"><h3>Phase 1</h3><p>${c.phase1}</p></div>
        <div class="card"><h3>Phase 2</h3><p>${c.phase2}</p></div>
        <div class="card"><h3>Phase 3</h3><p>${c.phase3}</p></div>
      </div>
    </div>
  </section>

  <section class="section" id="lang" style="background: #f0f4f8;">
    <div class="container">
      <h2>${c.langTitle}</h2>
      <p>${c.langLive}</p>
      <p>${c.langPlan}</p>
    </div>
  </section>

  <section class="section" id="cta">
    <div class="container" style="text-align: center;">
      <h2>${c.ctaTitle}</h2>
      <a href="https://omdalat.com/contact" class="cta-button">${c.ctaLabel}</a>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>${c.footer}</p>
      <p><a href="https://omdalat.com" style="color: #999;">omdalat.com</a></p>
    </div>
  </footer>
</body>
</html>`;
}
