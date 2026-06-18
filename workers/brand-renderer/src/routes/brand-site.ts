import type { Env } from '../index';

export const handleBrandSite = async (
  request: Request,
  env: Env
): Promise<Response> => {
  try {
    const url = new URL(request.url);
    const host = request.headers.get('Host') || url.hostname;

    // Extract slug from query parameter for testing (e.g., ?slug=lily)
    // For brand.omdalat.com, extract from path (e.g., /lily)
    let slug = url.searchParams.get('slug');
    
    if (!slug) {
      // Extract from path
      const pathParts = url.pathname.split('/').filter(Boolean);
      slug = pathParts[0] || 'lily';
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

    // Determine locale from URL path or query parameter (for testing)
    const pathParts = url.pathname.split('/').filter(Boolean);
    const queryLocale = url.searchParams.get('locale');
    const locale = (pathParts[0] === 'en' || queryLocale === 'en') ? 'en' : 'vi';

    // Build HTML response
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

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heroBlock.title} - Ôm Đà Lạt</title>
  <meta name="description" content="${heroBlock.subtitle}">
  <link rel="canonical" href="https://${brand.subdomain}${locale === 'en' ? '/en' : ''}">
  ${isEn ? '<link rel="alternate" hreflang="vi" href="https://' + brand.subdomain + '">' : ''}
  ${isEn ? '' : '<link rel="alternate" hreflang="en" href="https://' + brand.subdomain + '/en">'}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; opacity: 0.9; }
    .section { padding: 60px 0; }
    .section h2 { font-size: 2rem; margin-bottom: 2rem; color: #667eea; }
    .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
    .cta-button:hover { background: #5568d3; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .card { background: #f9f9f9; padding: 20px; border-radius: 8px; }
    .card h3 { margin-bottom: 10px; color: #667eea; }
    footer { background: #333; color: white; padding: 40px 0; text-align: center; }
    .nav { background: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav ul { list-style: none; display: flex; justify-content: center; gap: 30px; }
    .nav a { color: #333; text-decoration: none; }
    .nav a:hover { color: #667eea; }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="container">
      <ul>
        <li><a href="/${isEn ? 'en' : ''}">${isEn ? 'Home' : 'Trang chủ'}</a></li>
        <li><a href="#story">${isEn ? 'Story' : 'Câu chuyện'}</a></li>
        <li><a href="#what">${isEn ? 'What' : 'Đây là nơi gì'}</a></li>
        <li><a href="#why">${isEn ? 'Why' : 'Vì sao phù hợp'}</a></li>
        <li><a href="#space">${isEn ? 'Space' : 'Không gian'}</a></li>
        <li><a href="#business">${isEn ? 'Business' : 'Dòng kinh doanh'}</a></li>
        <li><a href="#location">${isEn ? 'Location' : 'Vị trí'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Liên hệ'}</a></li>
      </ul>
    </div>
  </nav>

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
        <p><strong>${isEn ? 'Location' : 'Địa chỉ'}:</strong> ${brand.address_vi || ''}</p>
        <p><strong>${isEn ? 'Network' : 'Hệ'}:</strong> Ôm Đà Lạt / Ấp Đà Lạt</p>
        <form action="/api/omdalat/brands/${brand.id}/inquiry" method="POST" style="margin-top: 20px;">
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
    h1 { color: #667eea; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 20px; }
    a { color: #667eea; text-decoration: none; }
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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .container { text-align: center; padding: 60px 40px; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); max-width: 600px; }
    h1 { color: #667eea; margin-bottom: 20px; }
    p { color: #666; line-height: 1.6; margin-bottom: 20px; }
    .badge { display: inline-block; background: #f0f0f0; padding: 8px 16px; border-radius: 20px; font-size: 14px; color: #666; margin-bottom: 20px; }
    a { color: #667eea; text-decoration: none; }
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
    h1 { color: #667eea; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 20px; }
    a { color: #667eea; text-decoration: none; }
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
