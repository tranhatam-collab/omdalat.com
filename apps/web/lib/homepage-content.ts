import type { LocalizedText } from "./i18n-copy";

type SignalCardTemplate = {
  label: LocalizedText;
  note: LocalizedText;
};

type HomepageLink = {
  href: string;
  label: LocalizedText;
};

type HomepageContent = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  ctaSystem: LocalizedText;
  ctaOpportunity: LocalizedText;
  ctaJoin: LocalizedText;
  signalSectionKicker: LocalizedText;
  signalSectionTitle: LocalizedText;
  signalTemplates: SignalCardTemplate[];
  enginesTitle: LocalizedText;
  engines: LocalizedText[];
  servesTitle: LocalizedText;
  serves: LocalizedText[];
  seedKicker: LocalizedText;
  seedTitle: LocalizedText;
  pagesKicker: LocalizedText;
  pagesTitle: LocalizedText;
  pageLinks: HomepageLink[];
  roadmapKicker: LocalizedText;
  roadmapTitle: LocalizedText;
  roadmap: LocalizedText[];
};

export const homepageContent: HomepageContent = {
  eyebrow: { vi: "OMDALAT / City Node", en: "OMDALAT / City Node" },
  title: {
    vi: "OMDALAT là nơi lớp vận hành thành phố trở nên sống thật.",
    en: "OMDALAT is where a city operating layer becomes real."
  },
  intro: {
    vi: "Đây không phải website du lịch. OMDALAT phối hợp con người, địa điểm, kỹ năng, nhu cầu và bằng chứng để tạo cơ hội địa phương có thể kiểm chứng.",
    en: "This is not a tourism website. OMDALAT coordinates people, places, skills, requests, and proof to create verifiable local opportunity."
  },
  ctaSystem: { vi: "Xem cấu trúc hệ thống", en: "See the system structure" },
  ctaOpportunity: { vi: "Khám phá cơ hội hoạt động", en: "Explore live opportunities" },
  ctaJoin: { vi: "Tham gia OMDALAT", en: "Join OMDALAT" },
  signalSectionKicker: { vi: "Tín hiệu thành phố", en: "Live city signals" },
  signalSectionTitle: {
    vi: "Điều gì đang hoạt động ngay lúc này",
    en: "What is active right now"
  },
  signalTemplates: [
    {
      label: { vi: "Địa điểm đang mở", en: "Active places" },
      note: { vi: "Không gian có thể vận hành ngay", en: "Spaces that can host activity now" }
    },
    {
      label: { vi: "Host đã xác minh", en: "Verified hosts" },
      note: { vi: "Điều phối viên địa phương đáng tin cậy", en: "Trusted local operators" }
    },
    {
      label: { vi: "Nhu cầu đang mở", en: "Open requests" },
      note: { vi: "Yêu cầu có thể ghép nối ngay", en: "Requests ready for matching" }
    },
    {
      label: { vi: "Proof đang hiển thị", en: "Visible proofs" },
      note: {
        vi: "Bằng chứng tích lũy từ hoạt động thật",
        en: "Proof generated from real activity"
      }
    }
  ],
  enginesTitle: { vi: "Bốn động cơ vận hành", en: "Four operating engines" },
  engines: [
    { vi: "Việc làm và cơ hội", en: "Work and opportunity" },
    { vi: "Địa điểm và host", en: "Places and hosts" },
    { vi: "Kinh tế sáng tạo", en: "Creative economy" },
    { vi: "Trust và proof", en: "Trust and proof" }
  ],
  servesTitle: { vi: "OMDALAT phục vụ ai", en: "Who OMDALAT serves" },
  serves: [
    { vi: "Host và người vận hành địa phương", en: "Hosts and local operators" },
    { vi: "Experts và creators", en: "Experts and creators" },
    {
      vi: "Communities và tổ chức địa phương",
      en: "Communities and local organizations"
    },
    { vi: "Nhóm đang có nhu cầu thật", en: "Groups with real requests" }
  ],
  seedKicker: { vi: "Seed data", en: "Seed data" },
  seedTitle: {
    vi: "Mẫu dữ liệu đang vận hành trên web",
    en: "Data already powering the web"
  },
  pagesKicker: { vi: "Public pages", en: "Public pages" },
  pagesTitle: { vi: "Các tuyến nội dung hỗ trợ", en: "Supporting content routes" },
  pageLinks: [
    { href: "/what-is-omdalat", label: { vi: "OMDALAT là gì", en: "What is OMDALAT" } },
    { href: "/how-it-works", label: { vi: "Cách hệ vận hành", en: "How it works" } },
    { href: "/city-signals", label: { vi: "Tín hiệu thành phố", en: "City signals" } },
    {
      href: "/work-and-opportunity",
      label: { vi: "Việc làm và cơ hội", en: "Work and opportunity" }
    },
    { href: "/creative-economy", label: { vi: "Kinh tế sáng tạo", en: "Creative economy" } },
    { href: "/requests", label: { vi: "Nhu cầu đang mở", en: "Open requests" } },
    { href: "/trust", label: { vi: "Trust", en: "Trust" } }
  ],
  roadmapKicker: { vi: "Roadmap", en: "Roadmap" },
  roadmapTitle: { vi: "Lộ trình triển khai gần", en: "Near-term delivery" },
  roadmap: [
    {
      vi: "Phase 1: Homepage system rewrite và signal cards",
      en: "Phase 1: Homepage system rewrite and signal cards"
    },
    {
      vi: "Phase 2: Seed data và content model cho entity công khai",
      en: "Phase 2: Seed data and content model for public entities"
    },
    {
      vi: "Phase 3: Supporting public pages cho trust, requests, opportunity",
      en: "Phase 3: Supporting public pages for trust, requests, and opportunity"
    },
    {
      vi: "Phase 4: CI guard validation với i18n, typecheck, e2e smoke",
      en: "Phase 4: CI guard validation with i18n, typecheck, and smoke e2e"
    }
  ]
};
