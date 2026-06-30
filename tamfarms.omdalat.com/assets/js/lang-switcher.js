// Tam Farm — Language Switcher + Facebook Messenger
// Auto-detects current language and computes alternate URL
(function() {
  'use strict';

  // Route mapping: VI → EN
  var VI_TO_EN = {
    '/vi/': '/en/',
    '/vi/tam-farms-la-gi/': '/en/tam-farm-is/',
    '/vi/hanh-trinh/': '/en/journey/',
    '/vi/song-thu-va-lam-viec/': '/en/live-and-work/',
    '/vi/dinh-huong-cong-viec/': '/en/career-orientation/',
    '/vi/tu-do-va-song-co-muc-dich/': '/en/freedom-and-purposeful-living/',
    '/vi/nong-nghiep-va-khu-vuon/': '/en/agriculture-and-gardens/',
    '/vi/cong-nghe-va-du-an/': '/en/technology-and-projects/',
    '/vi/danh-cho-chuyen-gia/': '/en/for-experts/',
    '/vi/danh-cho-doanh-nghiep/': '/en/for-businesses/',
    '/vi/dia-diem/': '/en/locations/',
    '/vi/bai-viet/': '/en/articles/',
    '/vi/bai-viet/khong-gian-song-lam-viec-giua-vuon-duoc-lieu/': '/en/articles/living-and-working-among-herbal-gardens/',
    '/vi/bai-viet/thanh-cong-nhung-trong-rong-tim-lai-muc-dich-song/': '/en/articles/successful-but-empty-finding-purpose-again/',
    '/vi/bai-viet/song-thu-va-lam-viec-tai-da-lat/': '/en/articles/live-and-work-in-da-lat/',
    '/vi/bai-viet/dinh-huong-cong-viec-va-huong-di-cuoc-doi/': '/en/articles/career-orientation-and-life-direction/',
    '/vi/bai-viet/tu-do-va-song-co-muc-dich/': '/en/articles/freedom-and-purposeful-living/',
    '/vi/bai-viet/sinh-vien-moi-tot-nghiep-trai-nghiem-nghe-nghiep-thuc-te/': '/en/articles/students-and-graduates-real-career-experience/',
    '/vi/bai-viet/chuyen-gia-nha-nghien-cuu-can-khong-gian-tap-trung/': '/en/articles/experts-and-researchers-need-focused-space/',
    '/vi/bai-viet/nguoi-lam-viec-tu-xa-sang-tao-noi-dung-va-cong-nghe/': '/en/articles/remote-workers-creators-and-tech/',
    '/vi/bai-viet/nguoi-can-tam-dung-sau-kiet-suc-va-ap-luc-keo-dai/': '/en/articles/need-to-pause-after-burnout/',
    '/vi/bai-viet/doanh-nhan-thu-nghiem-y-tuong-va-du-an-moi/': '/en/articles/entrepreneurs-testing-new-ideas/',
    '/vi/dang-ky/': '/en/register/',
    '/vi/cau-hoi-thuong-gap/': '/en/faq/',
    '/vi/noi-quy/': '/en/house-rules/',
    '/vi/an-toan/': '/en/safety/',
    '/vi/quyen-rieng-tu/': '/en/privacy/',
    '/vi/dieu-khoan/': '/en/terms/',
    '/vi/lien-he/': '/en/contact/'
  };

  // Build reverse map EN → VI
  var EN_TO_VI = {};
  Object.keys(VI_TO_EN).forEach(function(vi) {
    EN_TO_VI[VI_TO_EN[vi]] = vi;
  });

  var FB_PAGE = 'https://www.facebook.com/thtltdl/';
  var FB_MESSENGER = 'https://m.me/thtltdl';
  var WHATSAPP = 'https://wa.me/84849153426';
  var WHATSAPP_DISPLAY = '+84 84 915 3426';

  function getCurrentPath() {
    var p = window.location.pathname;
    // Normalize: ensure trailing slash
    if (p !== '/' && !p.endsWith('/')) { p = p + '/'; }
    // Handle root redirect page
    if (p === '/' || p === '/index.html') { return '/vi/'; }
    if (p.endsWith('/index.html')) {
      p = p.replace('/index.html', '/');
    }
    return p;
  }

  function getLang(path) {
    if (path.indexOf('/vi/') === 0 || path === '/vi/') return 'vi';
    if (path.indexOf('/en/') === 0 || path === '/en/') return 'en';
    return 'vi'; // default
  }

  function getAlternateURL(path, lang) {
    if (lang === 'vi') {
      return VI_TO_EN[path] || '/en/';
    } else {
      return EN_TO_VI[path] || '/vi/';
    }
  }

  function buildSwitcher() {
    var path = getCurrentPath();
    var lang = getLang(path);
    var altURL = getAlternateURL(path, lang);

    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.setAttribute('role', 'navigation');
    switcher.setAttribute('aria-label', lang === 'vi' ? 'Chuyển ngôn ngữ' : 'Language switch');

    var viLink = document.createElement('a');
    viLink.href = lang === 'vi' ? '#' : altURL;
    viLink.textContent = 'VI';
    viLink.setAttribute('lang', 'vi');
    if (lang === 'vi') {
      viLink.className = 'lang-active';
      viLink.setAttribute('aria-current', 'true');
    }

    var sep = document.createElement('span');
    sep.textContent = ' | ';
    sep.className = 'lang-sep';

    var enLink = document.createElement('a');
    enLink.href = lang === 'en' ? '#' : altURL;
    enLink.textContent = 'EN';
    enLink.setAttribute('lang', 'en');
    if (lang === 'en') {
      enLink.className = 'lang-active';
      enLink.setAttribute('aria-current', 'true');
    }

    switcher.appendChild(viLink);
    switcher.appendChild(sep);
    switcher.appendChild(enLink);

    return switcher;
  }

  function buildSocialBar() {
    var bar = document.createElement('div');
    bar.className = 'social-bar';

    // Facebook Messenger
    var fbLink = document.createElement('a');
    fbLink.href = FB_MESSENGER;
    fbLink.target = '_blank';
    fbLink.rel = 'noopener';
    fbLink.className = 'social-link fb-link';
    fbLink.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2V22l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2zm1 12.4l-2.5-2.7L6 14.4l5.3-5.6 2.6 2.7 4.1-2.3-5 5.2z"/></svg> Facebook';

    // WhatsApp
    var waLink = document.createElement('a');
    waLink.href = WHATSAPP;
    waLink.target = '_blank';
    waLink.rel = 'noopener';
    waLink.className = 'social-link wa-link';
    waLink.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg> WhatsApp';

    bar.appendChild(fbLink);
    bar.appendChild(waLink);

    return bar;
  }

  function inject() {
    // Find header
    var header = document.querySelector('.site-header .header-inner');
    if (!header) return;

    // Check if already injected
    if (header.querySelector('.lang-switcher')) return;

    // Build switcher
    var switcher = buildSwitcher();
    var socialBar = buildSocialBar();

    // Wrap in a container
    var container = document.createElement('div');
    container.className = 'header-controls';
    container.appendChild(switcher);
    container.appendChild(socialBar);

    header.appendChild(container);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
