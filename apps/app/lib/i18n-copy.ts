import type { OmdalatLocale } from "../../../packages/core";

export type LocalizedText = {
  vi: string;
  en: string;
};

export function pickLocalized(locale: OmdalatLocale, value: LocalizedText | string) {
  if (typeof value === "string") {
    return value;
  }

  return locale === "vi" ? value.vi : value.en;
}

export function formatRoleLabel(role: string, locale: OmdalatLocale) {
  const normalized = role.replaceAll("_", " ");

  if (locale !== "vi") {
    return normalized;
  }

  if (normalized === "guest") return "khách";
  if (normalized === "member") return "thành viên";
  if (normalized === "verified member") return "thành viên đã xác minh";
  return normalized;
}

export function formatPermissionHighlight(label: string, locale: OmdalatLocale) {
  if (locale !== "vi") return label;

  const map: Record<string, string> = {
    "View local activity and trust state": "Xem hoạt động địa phương và trạng thái trust",
    "Review proof-backed interactions": "Rà soát các tương tác có bằng chứng",
    "Track requests, hosts, experts, and communities": "Theo dõi yêu cầu, host, chuyên gia và cộng đồng",
    "Prepare moderation-safe local workflows": "Chuẩn bị luồng địa phương an toàn cho moderation"
  };
  return map[label] ?? label;
}

export function formatRoleSummary(role: string, summary: string, locale: OmdalatLocale) {
  if (locale !== "vi") return summary;

  const map: Record<string, string> = {
    guest: "Quyền truy cập chỉ đọc vào hoạt động công khai của thành phố và phần giải thích trust.",
    member: "Có thể theo dõi node địa phương, yêu cầu và bằng chứng trong tầng vận hành.",
    verified_member: "Mở khoá các luồng trust nâng cao, hành động với bằng chứng và độ hiển thị sâu hơn."
  };
  return map[role] ?? summary;
}

export function formatSessionStatus(status: string, locale: OmdalatLocale) {
  if (locale !== "vi") return status;

  const map: Record<string, string> = {
    "Public observer mode": "Chế độ quan sát công khai",
    "Member session with request and proof visibility": "Phiên thành viên có quyền xem yêu cầu và bằng chứng",
    "Verified member session with proof and moderation access": "Phiên thành viên đã xác minh có quyền bằng chứng và moderation"
  };
  return map[status] ?? status;
}
