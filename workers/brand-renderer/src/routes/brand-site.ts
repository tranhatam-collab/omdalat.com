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
        o.name as owner_name, o.consent_status
       FROM brands b
       JOIN places p ON b.place_id = p.id
       JOIN owners o ON b.owner_id = o.id
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

    // Check for specific Lily V2 routes
    const page = pathParts.find(p => p !== 'en' && p !== 'vi');
    
    if (page && brand.slug === 'lily') {
      // Lily V2 specific pages
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
      contentVi: 'Lily có các chương trình: Work From Garden, AI & Online Work Starter, Brand Factory Contributor, và International Builder Residency.',
      contentEn: 'Lily offers programs: Work From Garden, AI & Online Work Starter, Brand Factory Contributor, and International Builder Residency.'
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
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${locale === 'en' ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        <li><a href="/${locale === 'en' ? 'en/' : ''}stay">${isEn ? 'Stay' : 'Ở lại'}</a></li>
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

  <div class="section">
    <div class="container">
      <h2>${isEn ? 'More Information' : 'Thông tin thêm'}</h2>
      <p>${isEn ? 'This page is part of Lily Living & Working Garden V2. We are transitioning from a daily homestay model to a weekly/monthly stay model focused on remote work, digital learning, and real project participation.' : 'Trang này là một phần của Lily Living & Working Garden V2. Chúng tôi đang chuyển đổi từ mô hình homestay theo ngày sang mô hình ở lại theo tuần/tháng, tập trung vào làm việc từ xa, học kỹ năng số và tham gia dự án thật.'}</p>
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
        <li><a href="#reviews">${isEn ? 'Reviews' : 'Đánh giá'}</a></li>
        <li><a href="#location">${isEn ? 'Location' : 'Vị trí'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Liên hệ'}</a></li>
        <li class="lang-switcher">
          <a href="/" class="${isEn ? '' : 'active'}" aria-label="${isEn ? 'Switch to Vietnamese' : 'Đang xem tiếng Việt'}">Tiếng Việt</a>
          <a href="/en" class="${isEn ? 'active' : ''}" aria-label="${isEn ? 'Currently viewing English' : 'Chuyển sang tiếng Anh'}">English</a>
        </li>
      </ul>
    </div>
  </nav>

  ${heroBlock.image ? `<div style="width:100%; height:400px; background: linear-gradient(135deg, #0f3d2e 0%, #1a5c43 100%); display:flex; align-items:center; justify-content:center; overflow:hidden;"><img src="${heroBlock.image}" alt="${isEn ? 'Featured image: ' : 'Hình ảnh minh họa: '}${heroBlock.title}" style="width:100%; height:100%; object-fit:cover;" loading="eager"/></div>` : ''}

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
            ${item.image ? `<div style="width:100%; height:200px; margin-bottom:16px; border-radius:4px; overflow:hidden; background:#eee;"><img src="${item.image}" alt="${isEn ? 'Featured image: ' : 'Hình ảnh minh họa: '}${item.title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy"/></div>` : ''}
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

  ${reviewsBlock ? `
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
