/**
 * Overclaim Validator — H3
 * Blocks forbidden copy (L3 overclaim + L2 hotel/booking keywords)
 */

// L3 forbidden terms (overclaim)
const L3_FORBIDDEN = [
  'đặt ngay',
  'đã mở cửa',
  'đạt chuẩn',
  'cam kết',
  'đảm bảo',
  'chắc chắn',
  '100%',
  'hoàn toàn',
  'tuyệt đối',
  'duy nhất',
  'số 1',
  'đứng đầu',
  'hàng đầu',
  'tốt nhất',
  'lý tưởng nhất',
  'hoàn hảo',
  'không thể tốt hơn'
];

// L2 forbidden terms (hotel/booking keywords for editorial layer)
const L2_FORBIDDEN = [
  'homestay',
  'booking',
  'đặt phòng',
  'book now',
  'giá đêm',
  'theo đêm',
  'khách sạn',
  'hotel',
  'motel',
  'resort',
  'phòng trống',
  'còn phòng',
  'đầy phòng',
  'ngày',
  'đêm'
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  layer: 'L2' | 'L3' | 'both';
}

export function validateBrandCopy(payload: string, layer: 'L2' | 'L3'): ValidationResult {
  const errors: string[] = [];
  const payloadLower = payload.toLowerCase();

  // Check based on layer
  if (layer === 'L3') {
    // L3: block L3 overclaim terms
    for (const term of L3_FORBIDDEN) {
      if (payloadLower.includes(term)) {
        errors.push(`L3 overclaim: "${term}" is not allowed on brand microsites`);
      }
    }
  } else if (layer === 'L2') {
    // L2: block hotel/booking keywords
    for (const term of L2_FORBIDDEN) {
      if (payloadLower.includes(term)) {
        errors.push(`L2 forbidden: "${term}" is not allowed on editorial layer`);
      }
    }
  } else {
    // Both layers: check both
    for (const term of L3_FORBIDDEN) {
      if (payloadLower.includes(term)) {
        errors.push(`L3 overclaim: "${term}" is not allowed`);
      }
    }
    for (const term of L2_FORBIDDEN) {
      if (payloadLower.includes(term)) {
        errors.push(`L2 forbidden: "${term}" is not allowed`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    layer
  };
}
