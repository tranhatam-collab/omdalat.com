import { resolveLocaleFallback, type OmdalatLocale } from "../../../packages/core";

export type LocalizedText = {
  vi: string;
  en: string;
} & Partial<Record<OmdalatLocale, string>>;

export function pickLocalized(locale: OmdalatLocale, value: LocalizedText | string) {
  if (typeof value === "string") {
    return value;
  }

  const directMatch = value[locale];
  if (typeof directMatch === "string" && directMatch.length > 0) {
    return directMatch;
  }

  const fallbackLocale = resolveLocaleFallback(locale);
  const fallbackMatch = value[fallbackLocale];
  if (typeof fallbackMatch === "string" && fallbackMatch.length > 0) {
    return fallbackMatch;
  }

  return value.vi || value.en || "";
}

export function formatRoleLabel(role: string, locale: OmdalatLocale) {
  const normalized = role.replaceAll("_", " ");

  if (locale !== "vi") {
    return normalized;
  }

  if (normalized === "guest") return "khách";
  if (normalized === "registered") return "đã đăng ký";
  if (normalized === "profile pending") return "hồ sơ đang thiếu";
  if (normalized === "under review") return "đang được xem xét";
  if (normalized === "trial") return "đang trong thời gian thử";
  if (normalized === "active member") return "thành viên";
  if (normalized === "contributor") return "người cộng tác";
  if (normalized === "host partner") return "đối tác không gian";
  if (normalized === "operator") return "vận hành";
  if (normalized === "member") return "thành viên";
  if (normalized === "verified member") return "thành viên đã xác minh";
  if (normalized === "internal member") return "thành viên nội bộ";
  if (normalized === "admin") return "quản trị";
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
    verified_member: "Mở khoá các luồng trust nâng cao, hành động với bằng chứng và độ hiển thị sâu hơn.",
    internal_member: "Có quyền review hồ sơ, đi qua handbook sâu và hỗ trợ lớp vận hành nội bộ.",
    admin: "Có toàn quyền trên các lớp vận hành, kiểm soát và điều phối hệ."
  };
  return map[role] ?? summary;
}

export function formatSessionStatus(status: string, locale: OmdalatLocale) {
  if (locale !== "vi") return status;

  const map: Record<string, string> = {
    guest: "khách",
    registered: "đã đăng ký",
    profile_pending: "chưa hoàn tất hồ sơ",
    under_review: "đang được xem xét",
    trial: "đang trong thời gian thử",
    active_member: "đã là thành viên",
    contributor: "có thể nhận việc",
    host_partner: "đối tác không gian",
    operator: "đang vận hành hệ",
    admin: "quản trị toàn hệ",
    "Public observer mode": "Chế độ quan sát công khai",
    "Member session with request and proof visibility": "Phiên thành viên có quyền xem yêu cầu và bằng chứng",
    "Verified member session with proof and moderation access": "Phiên thành viên đã xác minh có quyền bằng chứng và moderation",
    "Internal review session with operational access": "Phiên nội bộ có quyền review và truy cập vận hành",
    "Admin session with full operational visibility": "Phiên quản trị có toàn quyền vận hành"
  };
  return map[status] ?? status;
}
