/**
 * Tests for overclaim validator (validateBrandCopy)
 * Verifies that L3 overclaim terms and L2 hotel/booking keywords are blocked.
 * Also validates hardcoded renderer content against L3 rules.
 */

import { describe, it, expect } from 'vitest';
import { validateBrandCopy } from '../src/lib/overclaim-validator';

describe('Overclaim Validator — L3 (brand microsites)', () => {
  it('blocks "đặt ngay" (book now)', () => {
    const result = validateBrandCopy('Đặt ngay hôm nay để nhận ưu đãi', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('đặt ngay'))).toBe(true);
  });

  it('blocks "cam kết" (commitment)', () => {
    const result = validateBrandCopy('Chúng tôi cam kết chất lượng tốt nhất', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('cam kết'))).toBe(true);
  });

  it('blocks "đảm bảo" (guarantee)', () => {
    const result = validateBrandCopy('Đảm bảo hài lòng 100%', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('đảm bảo'))).toBe(true);
  });

  it('blocks "chắc chắn" (certainly)', () => {
    const result = validateBrandCopy('Bạn chắc chắn sẽ thích', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('chắc chắn'))).toBe(true);
  });

  it('blocks "100%"', () => {
    const result = validateBrandCopy('100% tự nhiên', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('100%'))).toBe(true);
  });

  it('blocks "hoàn toàn" (completely)', () => {
    const result = validateBrandCopy('Hoàn toàn an toàn', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('hoàn toàn'))).toBe(true);
  });

  it('blocks "tuyệt đối" (absolutely)', () => {
    const result = validateBrandCopy('Tuyệt đối không lo', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('tuyệt đối'))).toBe(true);
  });

  it('blocks "duy nhất" (only one)', () => {
    const result = validateBrandCopy('Duy nhất tại Đà Lạt', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('duy nhất'))).toBe(true);
  });

  it('blocks "số 1" (number 1)', () => {
    const result = validateBrandCopy('Số 1 tại Lâm Đồng', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('số 1'))).toBe(true);
  });

  it('blocks "tốt nhất" (best)', () => {
    const result = validateBrandCopy('Tốt nhất khu vực', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('tốt nhất'))).toBe(true);
  });

  it('blocks "hoàn hảo" (perfect)', () => {
    const result = validateBrandCopy('Không gian hoàn hảo', 'L3');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('hoàn hảo'))).toBe(true);
  });

  it('passes clean copy', () => {
    const result = validateBrandCopy('Một không gian sống và làm việc tại Lạc Dương', 'L3');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('passes English clean copy', () => {
    const result = validateBrandCopy('A living and working space in Lac Duong', 'L3');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('Overclaim Validator — L2 (editorial layer)', () => {
  it('blocks "homestay"', () => {
    const result = validateBrandCopy('Homestay đẹp ở Đà Lạt', 'L2');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('homestay'))).toBe(true);
  });

  it('blocks "booking"', () => {
    const result = validateBrandCopy('Booking now available', 'L2');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('booking'))).toBe(true);
  });

  it('blocks "khách sạn" (hotel)', () => {
    const result = validateBrandCopy('Khách sạn gần trung tâm', 'L2');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('khách sạn'))).toBe(true);
  });

  it('blocks "đặt phòng" (book room)', () => {
    const result = validateBrandCopy('Đặt phòng trực tuyến', 'L2');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('đặt phòng'))).toBe(true);
  });

  it('passes clean editorial copy', () => {
    const result = validateBrandCopy('Một bài viết về đời sống tại Lạc Dương', 'L2');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('Overclaim Validator — both layers', () => {
  it('blocks both L2 and L3 terms', () => {
    const result = validateBrandCopy('Homestay tốt nhất Đà Lạt, đặt ngay', 'both' as any);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });

  it('passes clean copy for both', () => {
    const result = validateBrandCopy('Không gian sống và làm việc tại Lạc Dương', 'both' as any);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('Overclaim Validator — case insensitive', () => {
  it('blocks uppercase HOMESTAY', () => {
    const result = validateBrandCopy('HOMESTAY đẹp', 'L2');
    expect(result.valid).toBe(false);
  });

  it('blocks mixed case Booking', () => {
    const result = validateBrandCopy('Booking available', 'L2');
    expect(result.valid).toBe(false);
  });

  it('blocks uppercase CAM KẾT', () => {
    const result = validateBrandCopy('CAM KẾT chất lượng', 'L3');
    expect(result.valid).toBe(false);
  });
});

describe('Overclaim Validator — hardcoded renderer content (L3)', () => {
  // These are samples of hardcoded content from brand-site.ts
  // They must pass L3 validation (brand microsite layer)
  const hardcodedSamples = [
    'Lily Living & Working Garden — một không gian sống và làm việc tại Lạc Dương',
    'A living and working space in Lac Duong with weekly and monthly stays',
    'Trang này là một phần của Lily Living & Working Garden V2',
    'Weekly and monthly stays help Lily avoid becoming a short-term tourist destination',
    'Lily V2 không phải homestay. Đây là không gian sống và làm việc thật',
    'Lily V2 is not a homestay. It is a real living and working space',
    'Om Dalat — Hệ thương hiệu địa phương',
    'Building local brands from Dalat to the world',
    'Giúp người dân, hộ kinh doanh, nhà vườn, quán nhỏ, nơi lưu trú, farm và công ty địa phương',
    'Helping local people, household businesses, farms, cafés, stay spaces, and companies',
  ];

  for (const [i, sample] of hardcodedSamples.entries()) {
    it(`hardcoded sample ${i + 1} passes L3 validation`, () => {
      const result = validateBrandCopy(sample, 'L3');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  }
});
