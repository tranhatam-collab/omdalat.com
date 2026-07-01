#!/usr/bin/env node
/**
 * Tam Farms go-live fix script.
 * 1. Add hamburger mobile menu (CSS + JS)
 * 2. Fix "Tam Farm" → "Tam Farms" everywhere
 * 3. Update headers with new menu structure + hamburger
 * 4. Update footers
 * 5. Update meta tags (OG, Twitter, schema.org)
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '../..');
let modified = 0;

// New menu structure per ADR-003 (model site)
const VI_MENU = [
  ['Trang chủ', '/vi/'],
  ['Giới thiệu', '/vi/tam-farms-la-gi/'],
  ['Mô hình', '/vi/song-thu-va-lam-viec/'],
  ['Chương trình', '/vi/dinh-huong-cong-viec/'],
  ['Bài viết', '/vi/bai-viet/'],
  ['Địa điểm', '/vi/dia-diem/'],
  ['Chuyên gia', '/vi/danh-cho-chuyen-gia/'],
  ['Doanh nghiệp', '/vi/danh-cho-doanh-nghiep/'],
  ['Đăng ký', '/vi/dang-ky/'],
  ['Liên hệ', '/vi/lien-he/'],
];

const EN_MENU = [
  ['Home', '/en/'],
  ['About', '/en/tam-farm-is/'],
  ['Model', '/en/live-and-work/'],
  ['Programs', '/en/career-orientation/'],
  ['Articles', '/en/articles/'],
  ['Locations', '/en/locations/'],
  ['Experts', '/en/for-experts/'],
  ['Business', '/en/for-businesses/'],
  ['Register', '/en/register/'],
  ['Contact', '/en/contact/'],
];

function buildHeader(locale) {
  const menu = locale === 'vi' ? VI_MENU : EN_MENU;
  const brandStrong = locale === 'vi' ? 'Những Khu Vườn Tâm' : 'Tam Farms';
  const brandSmall = locale === 'vi' ? 'Tam Farms' : 'Những Khu Vườn Tâm';
  const homeHref = locale === 'vi' ? '/vi/' : '/en/';
  const navLabel = locale === 'vi' ? 'Điều hướng chính' : 'Main navigation';
  const menuLabel = locale === 'vi' ? 'Mở menu' : 'Open menu';

  const navLinks = menu.map(([label, href]) => `<a href="${href}">${label}</a>`).join('\n      ');

  return `<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${homeHref}">
      <span class="brand-mark">T</span>
      <span><strong>${brandStrong}</strong><small>${brandSmall}</small></span>
    </a>
    <button class="menu-toggle" aria-label="${menuLabel}" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
    <nav aria-label="${navLabel}" id="main-nav">
      ${navLinks}
    </nav>
  </div>
</header>`;
}

function buildFooter(locale) {
  if (locale === 'vi') {
    return `<footer class="footer">
  <div class="wrap">
    <strong>Những Khu Vườn Tâm · Tam Farms</strong>
    <p>Sống thật. Làm thật. Lớn lên từ trải nghiệm.</p>
    <p class="small">WhatsApp: <a href="https://wa.me/84849153426">+84 84 915 3426</a> · Facebook: <a href="https://www.facebook.com/thtltdl/">thtltdl</a> · Messenger: <a href="https://m.me/thtltdl">m.me/thtltdl</a></p>
    <p class="small">CÔNG TY TNHH SX-TM-DV THÁI LÂM · MST: 5801443073 · Đà Lạt, Lâm Đồng</p>
    <p class="small">Không phải khách sạn, homestay đại trà, cơ sở khám chữa bệnh, đơn vị tuyển dụng hay chương trình bảo đảm thu nhập.</p>
    <p class="small">© 2026 Những Khu Vườn Tâm · Sáng lập bởi Trần Hà Tâm · <a href="/en/">English</a></p>
  </div>
</footer>`;
  } else {
    return `<footer class="footer">
  <div class="wrap">
    <strong>Tam Farms · Những Khu Vườn Tâm</strong>
    <p>Live fully. Work with purpose. Grow through experience.</p>
    <p class="small">WhatsApp: <a href="https://wa.me/84849153426">+84 84 915 3426</a> · Facebook: <a href="https://www.facebook.com/thtltdl/">thtltdl</a> · Messenger: <a href="https://m.me/thtltdl">m.me/thtltdl</a></p>
    <p class="small">CÔNG TY TNHH SX-TM-DV THÁI LÂM · Tax ID: 5801443073 · Da Lat, Lam Dong, Vietnam</p>
    <p class="small">Not a hotel, mass homestay, medical facility, recruitment agency, or income-guarantee program.</p>
    <p class="small">© 2026 Tam Farms · Founded by Trần Hà Tâm · <a href="/vi/">Tiếng Việt</a></p>
  </div>
</footer>`;
  }
}

function processFile(filePath) {
  const rel = relative(ROOT, filePath);
  let html = readFileSync(filePath, 'utf-8');

  // Skip non-HTML
  if (!rel.endsWith('.html')) return false;

  // Determine locale
  const isVI = rel.startsWith('vi/') || rel === 'vi/index.html';
  const isEN = rel.startsWith('en/') || rel === 'en/index.html';
  if (!isVI && !isEN && rel !== '404.html' && rel !== 'index.html') return false;

  const locale = isVI ? 'vi' : 'en';
  let changed = false;

  // 1. Replace header
  const headerRegex = /<header class="site-header">[\s\S]*?<\/header>/;
  if (headerRegex.test(html)) {
    if (rel !== '404.html' && rel !== 'index.html') {
      html = html.replace(headerRegex, buildHeader(locale));
      changed = true;
    }
  }

  // 2. Replace footer
  const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
  if (footerRegex.test(html)) {
    if (rel !== '404.html') {
      html = html.replace(footerRegex, buildFooter(locale));
      changed = true;
    }
  }

  // 3. Fix "Tam Farm" → "Tam Farms" (but not "Tam Farms" which is already correct)
  // Be careful: don't change "Tam Farm" inside "Tam Farms"
  // Strategy: replace "Tam Farm" followed by non-'s' character
  html = html.replace(/Tam Farm(?!s)/g, 'Tam Farms');
  // Also fix "tam-farm-is" slug? No — that's a URL slug, keep it
  // Fix "Tam Farm—" → "Tam Farms—"
  html = html.replace(/Tam Farm(?!s)(?![\w-])/g, 'Tam Farms');

  // 4. Fix OG site_name
  html = html.replace(
    /<meta property="og:site_name" content="Những Khu Vườn Tâm — Tam Farm"/g,
    '<meta property="og:site_name" content="Những Khu Vườn Tâm — Tam Farms"'
  );

  // 5. Fix schema.org alternateName
  html = html.replace(
    /"alternateName":\s*"Tam Farm"/g,
    '"alternateName": "Tam Farms"'
  );

  // 6. Fix schema.org WebSite name
  html = html.replace(
    /"name":\s*"Những Khu Vườn Tâm — Tam Farm"/g,
    '"name": "Những Khu Vườn Tâm — Tam Farms"'
  );

  // 7. Add menu-toggle.js script if not present
  if (!html.includes('menu-toggle.js') && rel !== '404.html' && rel !== 'index.html') {
    html = html.replace(
      /<script src="\/assets\/js\/lang-switcher\.js" defer><\/script>/,
      '<script src="/assets/js/lang-switcher.js" defer></script>\n<script src="/assets/js/menu-toggle.js" defer></script>'
    );
    changed = true;
  }

  if (changed || html !== readFileSync(filePath, 'utf-8')) {
    writeFileSync(filePath, html, 'utf-8');
    modified++;
    console.log(`  ✅ ${rel}`);
  }
  return changed;
}

// Walk directory
function walkHtml(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && entry !== 'node_modules' && entry !== '.git' && entry !== 'assets') {
      results.push(...walkHtml(fullPath));
    } else if (entry === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = walkHtml(ROOT);
for (const file of htmlFiles) {
  try {
    processFile(file);
  } catch (e) {
    console.error(`  ❌ ${relative(ROOT, file)}: ${e.message}`);
  }
}

console.log(`\nDone: ${modified} files modified.`);
