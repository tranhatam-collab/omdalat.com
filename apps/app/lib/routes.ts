export const appRoutes = [
  { href: "/dashboard", vi: "Tổng quan", en: "Overview" },
  { href: "/profile", vi: "Hồ sơ", en: "Profile" },
  { href: "/stay", vi: "Nơi ở", en: "Stay" },
  { href: "/work", vi: "Công việc", en: "Work" },
  { href: "/learning", vi: "Học thực địa", en: "Learning" },
  { href: "/resources", vi: "Tài nguyên", en: "Resources" },
  { href: "/earnings", vi: "Thu nhập", en: "Earnings" },
  { href: "/contributor", vi: "Đóng góp", en: "Contributor" },
  { href: "/places", vi: "Không gian", en: "Places" },
  { href: "/admin/review", vi: "Xét duyệt", en: "Review" }
] as const;

export const supportRoutes = [
  { href: "/member/login", vi: "Đổi phiên", en: "Switch session" },
  { href: "/member/register", vi: "Đăng ký", en: "Register" },
  { href: "/apply", vi: "Gửi hồ sơ", en: "Apply" },
  { href: "/settings", vi: "Hỗ trợ", en: "Support" }
] as const;
