/**
 * Scan brand-site.ts hardcoded content for L3 overclaim terms.
 * This ensures the bypass noted in AGENTS.md (hardcoded content evading validator)
 * is caught by the test suite even before the content is moved to content_blocks.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

// Mirror of L3 forbidden terms in workers/api/src/lib/overclaim-validator.ts
const L3_FORBIDDEN = [
  'đặt ngay', 'đã mở cửa', 'đạt chuẩn', 'cam kết', 'đảm bảo', 'chắc chắn',
  '100%', 'hoàn toàn', 'tuyệt đối', 'duy nhất', 'số 1', 'đứng đầu',
  'hàng đầu', 'tốt nhất', 'lý tưởng nhất', 'hoàn hảo', 'không thể tốt hơn'
];

const L2_FORBIDDEN = [
  'homestay', 'booking', 'đặt phòng', 'book now', 'giá đêm', 'theo đêm',
  'khách sạn', 'hotel', 'motel', 'resort', 'phòng trống', 'còn phòng', 'đầy phòng'
];

const file = readFileSync(join(__dirname, '../src/routes/brand-site.ts'), 'utf8');
const contentLower = file.toLowerCase();

describe('brand-site.ts hardcoded content overclaim scan', () => {
  it('contains no L3 overclaim terms in user-facing content', () => {
    const contentMatches = file.match(/(?:contentVi|contentEn|titleVi|titleEn|excerptVi|excerptEn):\s*([`'"'])(.*?)\1/g) || [];
    const userText = contentMatches.join(' ').toLowerCase();
    const violations = L3_FORBIDDEN.filter(term => userText.includes(term));
    expect(violations).toEqual([]);
  });

  it('contains no L2 hotel/booking forbidden terms in user-facing content', () => {
    // L2 terms are blocked on ap.omdalat.com editorial layer, not on L3 brand sites.
    // This test only checks the hardcoded content objects (contentVi/contentEn strings).
    const contentMatches = file.match(/contentVi: '([^']+)'|contentEn: '([^']+)'/g) || [];
    const userText = contentMatches.join(' ').toLowerCase();
    const violations = L2_FORBIDDEN.filter(term => userText.includes(term));
    expect(violations).toEqual([]);
  });
});
