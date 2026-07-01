#!/usr/bin/env node
/**
 * Tam Farms P0 Audit Fix Script
 * Fixes all P0 issues from content QA audit
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = '/Users/tranhatam/Documents/Devnewproject/omdalat.com/tamfarms.omdalat.com';
let fixes = 0;

function fixFile(filePath) {
  let html = readFileSync(filePath, 'utf-8');
  const orig = html;
  const rel = filePath.replace(ROOT + '/', '');

  // P0.4: Fix #TamFarm → #TamFarms (hashtag)
  html = html.replace(/#TamFarm(?!s)/g, '#TamFarms');

  // P0.1: Fix homepage hero — chain model positioning
  if (rel === 'vi/index.html') {
    // Fix hero lead
    html = html.replace(
      'Một không gian nhỏ tại vùng ngoại ô Đà Lạt, nơi bạn được sống chậm lại, làm việc có ý nghĩa, và lớn lên qua từng trải nghiệm thực tế — không phải qua lớp màn hình quảng cáo.',
      'Tam Farms là mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia. Lily là địa điểm tham chiếu đầu tiên để trình diễn và kiểm chứng mô hình — bắt đầu từ Đà Lạt và Lâm Đồng.'
    );

    // Fix hero meta — remove capacity/duration (location-specific)
    html = html.replace(
      'Tiếp nhận tối đa 01–03 người/tháng · Lưu trú 1 tuần – 3 tháng · #NhungKhuVuonTam #TamFarms',
      'Mô hình chuỗi · Địa điểm tham chiếu: Lily (Đà Lạt) · #NhungKhuVuonTam #TamFarms'
    );

    // Fix hero card "Đây là một khu vườn thật" → chain model
    html = html.replace(
      'Đây là một khu vườn thật, một nhịp sống thật, và một khoảng thời gian để bạn tự kiểm chứng bản thân.',
      'Tam Farms là mô hình có thể nhân rộng — không phụ thuộc một địa điểm cụ thể. Mỗi địa điểm đạt chuẩn mang lại một trải nghiệm nhất quán.'
    );

    // Fix "Những Khu Vườn Tâm là gì?" section
    html = html.replace(
      'Một câu trả lời ngắn: đây là nơi bạn được trải nghiệm, không phải được phục vụ.',
      'Một câu trả lời ngắn: đây là mô hình chuỗi, không phải một địa điểm lưu trú đơn lẻ.'
    );

    html = html.replace(
      /Những Khu Vườn Tâm \(Tam Farms\) là một không gian sống và làm việc nhỏ quy mô, nằm tại vùng ngoại ô Đà Lạt\. Nơi đây không bán kỳ nghỉ, không bán trị liệu, không hứa hẹn thu nhập\. Nơi đây tạo ra một khoảng thời gian và một môi trường thật — để bạn tự kiểm chứng mình có hợp với cách sống này hay không\./,
      'Những Khu Vườn Tâm (Tam Farms) là mô hình phát triển chuỗi địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia. Tam Farms sở hữu bộ phương pháp, tiêu chuẩn địa điểm, tiêu chuẩn chuyên gia, tiêu chuẩn chương trình, mô hình doanh thu và hệ thống nhân bản. Lily là địa điểm tham chiếu đầu tiên (Reference Location 01) — nơi mô hình được trình diễn và kiểm chứng.'
    );

    html = html.replace(
      /Chúng tôi tiếp nhận tối đa 01–03 người mỗi tháng\. Mỗi người có thể ở từ 1 tuần đến 3 tháng\. Không có tour, không có lịch trình đóng gói\. Có một khu vườn, có công việc thật, có người thật, và có những câu hỏi thật để bạn tự trả lời\./,
      'Mỗi địa điểm đạt chuẩn Tam Farms có sức chứa, thời gian lưu trú và điều kiện tiếp nhận riêng — được xác minh theo Tiêu chuẩn Địa điểm Tam Farms. Tại Lily, sức chứa hiện tại là 01–03 người/tháng, lưu trú từ 1 tuần đến 3 tháng. Các địa điểm tương lai sẽ có điều kiện riêng theo từng node.'
    );

    // Fix CTA — remove WhatsApp direct, redirect to registration
    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">Trao đổi qua WhatsApp<\/a>/,
      '<a class="btn btn-primary" href="/vi/dang-ky/">Đăng ký tham gia</a>'
    );

    // Fix bottom CTA
    html = html.replace(
      'Hãy trao đổi trực tiếp qua WhatsApp. Chúng tôi sẽ cùng bạn xem nhu cầu, thời gian, mức độ phù hợp và tình trạng chỗ ở trước khi xác nhận lịch.',
      'Hãy bắt đầu bằng việc đăng ký. Chúng tôi sẽ liên hệ sau khi hiểu nhu cầu, thời gian và mức độ phù hợp của bạn.'
    );

    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">WhatsApp: \+84 84 915 3426<\/a>/,
      '<a class="btn btn-primary" href="/vi/dang-ky/">Đăng ký tham gia</a>'
    );

    // Fix meta description
    html = html.replace(
      /content="Những Khu Vườn Tâm \(Tam Farm[s]?\) là không gian trải nghiệm sống và làm việc tại Đà Lạt, dành cho 01–03 người mỗi tháng, lưu trú từ 1 tuần đến 3 tháng\. Sống thật\. Làm thật\. Lớn lên từ trải nghiệm\."/,
      'content="Những Khu Vườn Tâm — Tam Farms là mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia, bắt đầu kiểm chứng từ Đà Lạt và Lâm Đồng."'
    );

    // Fix Organization schema — remove areaServed + capacity
    html = html.replace(
      /"description":\s*"Không gian trải nghiệm sống và làm việc tại Đà Lạt, dành cho 01–03 người mỗi tháng\."/,
      '"description": "Mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia."'
    );

    html = html.replace(
      /"areaServed":\s*"Đà Lạt, Lạc Dương, Lâm Đồng",/,
      '"areaServed": ["Vietnam"],'
    );

    // Fix OG/Twitter descriptions
    html = html.replace(
      /content="Những Khu Vườn Tâm \(Tam Farm[^"]*\) là không gian trải nghiệm[^"]*"/g,
      'content="Những Khu Vườn Tâm — Tam Farms là mô hình chuỗi phát triển các địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia."'
    );
  }

  // Fix EN homepage similarly
  if (rel === 'en/index.html') {
    html = html.replace(
      /A small space in the outskirts of Da Lat[^<]*/,
      'Tam Farms is a chain model developing locations for living, learning, working and real-world experience with experts. Lily is the first reference location — starting from Da Lat and Lam Dong.'
    );

    html = html.replace(
      /Maximum 01–03 guests\/month · Stay 1 week – 3 months · #NhungKhuVuonTam #TamFarm/,
      'Chain model · Reference location: Lily (Da Lat) · #NhungKhuVuonTam #TamFarms'
    );

    html = html.replace(
      /This is a real garden[^<]*/,
      'Tam Farms is a replicable model — not dependent on a single location. Each certified location delivers a consistent experience.'
    );

    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">Chat on WhatsApp<\/a>/,
      '<a class="btn btn-primary" href="/en/register/">Apply to join</a>'
    );

    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">WhatsApp: \+84 84 915 3426<\/a>/,
      '<a class="btn btn-primary" href="/en/register/">Apply to join</a>'
    );

    html = html.replace(
      /Chat directly on WhatsApp[^<]*/,
      'Start by applying. We will contact you after understanding your needs, timeline, and fit.'
    );
  }

  // P0.3: Fix CTAs in articles — replace generic WhatsApp CTA with persona-specific
  const articleCTAs = {
    'bai-viet/song-thu-va-lam-viec-tai-da-lat': 'Xem địa điểm còn lịch',
    'bai-viet/dinh-huong-cong-viec-va-huong-di-cuoc-doi': 'Xem chương trình định hướng',
    'bai-viet/tu-do-va-song-co-muc-dich': 'Xem chương trình tự do',
    'bai-viet/khong-gian-song-lam-viec-giua-vuon-duoc-lieu': 'Xem địa điểm và không gian',
    'bai-viet/thanh-cong-nhung-trong-rong-tim-lai-muc-dich-song': 'Gửi nhu cầu tư vấn',
    'bai-viet/sinh-vien-moi-tot-nghiep-trai-nghiem-nghe-nghiep-thuc-te': 'Xem chương trình cho sinh viên',
    'bai-viet/chuyen-gia-nha-nghien-cuu-can-khong-gian-tap-trung': 'Gửi hồ sơ chuyên môn',
    'bai-viet/nguoi-lam-viec-tu-xa-sang-tao-noi-dung-va-cong-nghe': 'Xem chương trình technology builder',
    'bai-viet/nguoi-can-tam-dung-sau-kiet-suc-va-ap-luc-keo-dai': 'Xem chương trình phục hồi',
    'bai-viet/doanh-nhan-thu-nghiem-y-tuong-va-du-an-moi': 'Đăng ký project lab',
  };

  for (const [slug, ctaText] of Object.entries(articleCTAs)) {
    if (rel.includes(slug)) {
      // Replace generic CTA with persona-specific
      html = html.replace(
        /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">[^<]*<\/a>/g,
        `<a class="btn btn-primary" href="/vi/dang-ky/">${ctaText}</a>`
      );
      // Replace "Tối thiểu 01 tuần, tối đa 03 tháng..." with neutral
      html = html.replace(
        /Tối thiểu 01 tuần, tối đa 03 tháng\. Mỗi tháng chỉ tiếp nhận số lượng giới hạn[^<]*/g,
        'Xem địa điểm đang mở và điều kiện tiếp nhận tại trang đăng ký.'
      );
    }
  }

  // EN article CTAs
  const enArticleCTAs = {
    'articles/live-and-work-in-da-lat': 'Check location availability',
    'articles/career-orientation-and-life-direction': 'View career orientation program',
    'articles/freedom-and-purposeful-living': 'View freedom program',
    'articles/living-and-working-among-herbal-gardens': 'View locations and spaces',
    'articles/successful-but-empty-finding-purpose-again': 'Send inquiry',
    'articles/students-and-graduates-real-career-experience': 'View student programs',
    'articles/experts-and-researchers-need-focused-space': 'Submit expert profile',
    'articles/remote-workers-creators-and-tech': 'View technology builder program',
    'articles/need-to-pause-after-burnout': 'View recovery program',
    'articles/entrepreneurs-testing-new-ideas': 'Apply for project lab',
  };

  for (const [slug, ctaText] of Object.entries(enArticleCTAs)) {
    if (rel.includes(slug)) {
      html = html.replace(
        /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426">[^<]*<\/a>/g,
        `<a class="btn btn-primary" href="/en/register/">${ctaText}</a>`
      );
      html = html.replace(
        /Minimum 01 week, maximum 03 months\. Limited capacity per month[^<]*/g,
        'Check open locations and intake conditions on the registration page.'
      );
    }
  }

  // P0.2: Fix article 1 — remove location-specific claims
  if (rel.includes('khong-gian-song-lam-viec-giua-vuon-duoc-lieu')) {
    html = html.replace(
      /Tại vùng ngoại ô Đà Lạt, Những Khu Vườn Tâm mở ra một mô hình sống và làm việc ngắn hạn trong khuôn viên có cây xanh/,
      'Một địa điểm đạt chuẩn Tam Farms có thể bao gồm khu vườn, workspace, nơi ở và chương trình chuyên gia. Tại Lily — địa điểm tham chiếu đầu tiên — khu vườn dược liệu là một phần của không gian trải nghiệm'
    );
  }
  if (rel.includes('living-and-working-among-herbal-gardens')) {
    html = html.replace(
      /In the outskirts of Da Lat, Tam Farm[s]? opens up a short-term living and working model within a green garden setting/,
      'A Tam Farms certified location can include a garden, workspace, accommodation and expert programs. At Lily — the first reference location — the herbal garden is part of the experiential space'
    );
  }

  // P0.5: Fix article index schema → CollectionPage + ItemList
  if (rel === 'vi/bai-viet/index.html' || rel === 'en/articles/index.html') {
    // Replace Article schema with CollectionPage
    html = html.replace(
      /"@type":\s*"Article"/g,
      '"@type": "CollectionPage"'
    );
  }

  // P0.8: Hide social bar — only show after registration
  // The lang-switcher.js builds social-bar dynamically. We need to disable it on public pages
  // and only show it on /dang-ky/ and /lien-he/ pages
  if (!rel.includes('dang-ky') && !rel.includes('register') && !rel.includes('lien-he') && !rel.includes('contact')) {
    // Add a class to body to hide social bar
    html = html.replace('<body>', '<body class="no-social">');
  }

  if (html !== orig) {
    writeFileSync(filePath, html, 'utf-8');
    fixes++;
    console.log(`  ✅ ${rel}`);
  }
}

// Walk and process
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.git' || entry === 'assets' || entry === 'legal') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (entry === 'index.html' || entry === '404.html') {
      fixFile(full);
    }
  }
}

walk(ROOT);
// Also fix 404.html
fixFile(join(ROOT, '404.html'));

console.log(`\nDone: ${fixes} files fixed.`);
