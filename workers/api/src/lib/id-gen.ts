/**
 * Generate unique IDs with prefix for different entity types
 */
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}${randomPart}`;
};

/**
 * Generate ULID-like ID (sortable, time-based)
 */
export const generateULIDStyle = (prefix: string): string => {
  const time = Date.now().toString(16).padStart(12, '0');
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return `${prefix}_${time}${random}`;
};
