#!/usr/bin/env node
/**
 * Hotfix: Remove all WhatsApp CTAs + social-bar from public pages
 * BUG #3: WhatsApp CTA → /dang-ky/ or /register/
 * BUG #8: Social bar removed from HTML DOM (not just CSS hidden)
 * BUG #4: Schema sameAs WhatsApp → Facebook
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = '/Users/tranhatam/Documents/Devnewproject/omdalat.com/tamfarms.omdalat.com';
let fixes = 0;

function fixFile(filePath) {
  let html = readFileSync(filePath, 'utf-8');
  const orig = html;
  const rel = filePath.replace(ROOT + '/', '');
  const isVI = rel.startsWith('vi/') || rel === 'index.html';
  const isEN = rel.startsWith('en/');

  // Skip registration and contact pages — they keep contact info
  const isRegOrContact = rel.includes('dang-ky') || rel.includes('register') ||
                         rel.includes('lien-he') || rel.includes('contact');

  // BUG #3: Replace ALL btn-primary with wa.me → /dang-ky/ or /register/
  if (isVI) {
    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426"[^>]*>[^<]*<\/a>/g,
      '<a class="btn btn-primary" href="/vi/dang-ky/">Đăng ký tham gia</a>'
    );
  } else if (isEN) {
    html = html.replace(
      /<a class="btn btn-primary" href="https:\/\/wa\.me\/84849153426"[^>]*>[^<]*<\/a>/g,
      '<a class="btn btn-primary" href="/en/register/">Apply to join</a>'
    );
  }

  // BUG #3: Replace ALL btn-ghost with wa.me → /lien-he/ or /contact/
  if (isVI) {
    html = html.replace(
      /<a class="btn btn-ghost" href="https:\/\/wa\.me\/84849153426"[^>]*>[^<]*<\/a>/g,
      '<a class="btn btn-ghost" href="/vi/lien-he/">Liên hệ</a>'
    );
  } else if (isEN) {
    html = html.replace(
      /<a class="btn btn-ghost" href="https:\/\/wa\.me\/84849153426"[^>]*>[^<]*<\/a>/g,
      '<a class="btn btn-ghost" href="/en/contact/">Contact</a>'
    );
  }

  // BUG #3: Replace any remaining wa.me links in CTA sections (not footer)
  // Pattern: <p>...WhatsApp...+84 84 915 3426...</p> in CTA sections
  if (!isRegOrContact) {
    // Remove WhatsApp text mentions in CTA paragraphs (not footer)
    html = html.replace(
      /<p>Hãy trao đổi trực tiếp qua WhatsApp[^<]*<\/p>/g,
      isVI ? '<p>Hãy bắt đầu bằng việc đăng ký. Chúng tôi sẽ liên hệ sau khi hiểu nhu cầu của bạn.</p>'
           : '<p>Start by applying. We will contact you after understanding your needs.</p>'
    );
    html = html.replace(
      /<p>Reach out directly on WhatsApp[^<]*<\/p>/g,
      '<p>Start by applying. We will contact you after understanding your needs.</p>'
    );
    html = html.replace(
      /<p>Trao đổi qua WhatsApp[^<]*<\/p>/g,
      isVI ? '<p>Đăng ký để được liên hệ.</p>' : '<p>Apply to be contacted.</p>'
    );
    html = html.replace(
      /<p>Chat on WhatsApp[^<]*<\/p>/g,
      '<p>Apply to be contacted.</p>'
    );
  }

  // BUG #8: Remove social-bar from footer HTML entirely (not just CSS hidden)
  // Only keep on registration and contact pages
  if (!isRegOrContact) {
    // Remove the social-bar paragraph from footer
    html = html.replace(
      /\s*<p class="small social-bar">WhatsApp: <a href="https:\/\/wa\.me\/84849153426">[^<]*<\/a> · Facebook: <a href="https:\/\/www\.facebook\.com\/thtltdl\/">[^<]*<\/a> · Messenger: <a href="https:\/\/m\.me\/thtltdl">[^<]*<\/a><\/p>/g,
      ''
    );
    // Also remove any remaining social-bar without the class
    html = html.replace(
      /\s*<p class="small">WhatsApp: <a href="https:\/\/wa\.me\/84849153426">[^<]*<\/a> · Facebook: <a href="https:\/\/www\.facebook\.com\/thtltdl\/">[^<]*<\/a> · Messenger: <a href="https:\/\/m\.me\/thtltdl">[^<]*<\/a><\/p>/g,
      ''
    );
  }

  // BUG #4: Fix schema sameAs — replace WhatsApp with Facebook
  html = html.replace(
    /"sameAs":\s*\["https:\/\/wa\.me\/84849153426"\]/g,
    '"sameAs": ["https://www.facebook.com/thtltdl/"]'
  );

  // Remove body class="no-social" since we're removing the HTML now
  html = html.replace(/ class="no-social"/g, '');

  if (html !== orig) {
    writeFileSync(filePath, html, 'utf-8');
    fixes++;
    console.log(`  ✅ ${rel}`);
  }
}

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
fixFile(join(ROOT, '404.html'));
fixFile(join(ROOT, 'index.html'));

console.log(`\nDone: ${fixes} files fixed.`);
