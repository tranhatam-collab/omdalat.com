import { localizePath, type OmdalatLocale } from "../../../packages/core";

type LocalizedLabel = {
  vi: string;
  en: string;
};

export type DocsLink = {
  href: string;
  label: LocalizedLabel;
  summary: LocalizedLabel;
};

export type DocsContext = {
  path: string;
  title: LocalizedLabel;
  intro: LocalizedLabel;
  primary: DocsLink;
  secondary: DocsLink[];
  roleGuides: DocsLink[];
  policyGuides: DocsLink[];
  operatorGuides: DocsLink[];
};

const docsCatalog = {
  docsHome: {
    href: "/docs",
    label: { vi: "Tổng quan lối vào hệ", en: "Entry overview" },
    summary: {
      vi: "Điểm vào chung để hiểu hệ, cách tham gia và những quy tắc nền.",
      en: "The main entry point for understanding the system, how to join, and the core rules."
    }
  },
  gettingStarted: {
    href: "/docs/getting-started",
    label: { vi: "Bắt đầu", en: "Getting started" },
    summary: {
      vi: "Những gì cần đọc trước khi quyết định ở lại.",
      en: "What to read before deciding to stay."
    }
  },
  howItWorks: {
    href: "/docs/how-it-works",
    label: { vi: "Cách hệ vận hành", en: "How the system works" },
    summary: {
      vi: "Luồng đọc, đăng ký, xem xét và thời gian thử.",
      en: "The flow from reading to registration, review, and trial."
    }
  },
  communityRules: {
    href: "/docs/community-rules",
    label: { vi: "Quy tắc cộng đồng", en: "Community rules" },
    summary: {
      vi: "Những điều giữ cho nhịp sống chung không bị vỡ.",
      en: "The rules that keep shared life from falling apart."
    }
  },
  stayGuide: {
    href: "/docs/stay-guide",
    label: { vi: "Lộ trình ở lại", en: "Stay path" },
    summary: {
      vi: "Loại chỗ ở, điều kiện và cách ở đủ lâu để vào nếp.",
      en: "Stay types, conditions, and how to stay long enough to settle into rhythm."
    }
  },
  workGuide: {
    href: "/docs/work-guide",
    label: { vi: "Lộ trình làm việc", en: "Work path" },
    summary: {
      vi: "Việc gì có thể làm, cách bắt đầu và cách giữ nhịp làm việc đều.",
      en: "What work is possible, how to begin, and how to keep output steady."
    }
  },
  faq: {
    href: "/docs/faq",
    label: { vi: "Câu hỏi thường gặp", en: "FAQ" },
    summary: {
      vi: "Những câu trả lời ngắn cho người mới đến.",
      en: "Short answers for people arriving for the first time."
    }
  },
  join: {
    href: "/join",
    label: { vi: "Cách tham gia", en: "How to join" },
    summary: {
      vi: "Bắt đầu từ hồ sơ cơ bản và bước thử nếu phù hợp.",
      en: "Start with a basic profile and a trial step if there is a fit."
    }
  },
  memberWelcome: {
    href: "/member/welcome",
    label: { vi: "Khu thành viên", en: "Member area" },
    summary: {
      vi: "Lớp tài nguyên mở sau khi bạn đăng ký cơ bản.",
      en: "The resource layer that opens after basic registration."
    }
  },
  memberHandbook: {
    href: "/member/handbook",
    label: { vi: "Sổ tay thành viên", en: "Member handbook" },
    summary: {
      vi: "Các tài liệu sâu hơn mở theo từng lớp truy cập.",
      en: "Deeper materials that open by access level."
    }
  }
} satisfies Record<string, DocsLink>;

const contexts: DocsContext[] = [
  {
    path: "/",
    title: { vi: "Đọc đúng trước khi tham gia", en: "Understand clearly before joining" },
    intro: {
      vi: "Bắt đầu từ lớp nền, luồng vận hành và các quy tắc sống chung.",
      en: "Start from the core layer, operating flow, and shared living rules."
    },
    primary: docsCatalog.gettingStarted,
    secondary: [docsCatalog.docsHome, docsCatalog.howItWorks, docsCatalog.faq],
    roleGuides: [docsCatalog.join, docsCatalog.stayGuide, docsCatalog.workGuide],
    policyGuides: [docsCatalog.communityRules],
    operatorGuides: [docsCatalog.memberWelcome]
  },
  {
    path: "/about",
    title: { vi: "Hiểu hệ sống", en: "Understand the living system" },
    intro: {
      vi: "Đọc tổng quan trước khi đi vào các phần sâu hơn.",
      en: "Read the overview before going deeper."
    },
    primary: docsCatalog.docsHome,
    secondary: [docsCatalog.gettingStarted, docsCatalog.howItWorks, docsCatalog.faq],
    roleGuides: [docsCatalog.join, docsCatalog.stayGuide],
    policyGuides: [docsCatalog.communityRules],
    operatorGuides: [docsCatalog.memberWelcome]
  },
  {
    path: "/how-it-works",
    title: { vi: "Luồng tham gia", en: "The participation flow" },
    intro: {
      vi: "Đi từ hiểu đúng, đăng ký, xem xét tới thời gian thử.",
      en: "Move from understanding into registration, review, and trial."
    },
    primary: docsCatalog.howItWorks,
    secondary: [docsCatalog.gettingStarted, docsCatalog.faq],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.communityRules],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/join",
    title: { vi: "Bắt đầu từ hồ sơ cơ bản", en: "Start from a basic profile" },
    intro: {
      vi: "Đừng gửi hồ sơ vội nếu bạn chưa hiểu mình muốn gì và có thể làm gì.",
      en: "Do not rush the application before you understand what you want and what you can do."
    },
    primary: docsCatalog.join,
    secondary: [docsCatalog.gettingStarted, docsCatalog.howItWorks],
    roleGuides: [docsCatalog.stayGuide, docsCatalog.workGuide],
    policyGuides: [docsCatalog.communityRules, docsCatalog.faq],
    operatorGuides: [docsCatalog.memberWelcome]
  },
  {
    path: "/life",
    title: { vi: "Nhịp sống để ở lại bền", en: "A living rhythm that lasts" },
    intro: {
      vi: "Ở đâu, ở như thế nào và làm sao để không bị vỡ nhịp.",
      en: "Where to stay, how to stay, and how to avoid breaking rhythm."
    },
    primary: docsCatalog.stayGuide,
    secondary: [docsCatalog.gettingStarted, docsCatalog.communityRules],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.faq],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/work",
    title: { vi: "Công việc để đi đường dài", en: "Work that supports a longer path" },
    intro: {
      vi: "Giữ công việc đủ thực để có thể ở lại lâu hơn.",
      en: "Keep work practical enough to support a longer stay."
    },
    primary: docsCatalog.workGuide,
    secondary: [docsCatalog.gettingStarted, docsCatalog.howItWorks],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.communityRules],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/learning",
    title: { vi: "Học từ đời sống thật", en: "Learning from real life" },
    intro: {
      vi: "Đi từ quan sát sang tham gia và điều làm ra thật.",
      en: "Move from observation into participation and real output."
    },
    primary: docsCatalog.gettingStarted,
    secondary: [docsCatalog.howItWorks, docsCatalog.workGuide],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.communityRules],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/community",
    title: { vi: "Quy tắc để sống cùng nhau", en: "Rules for living with others" },
    intro: {
      vi: "Cộng đồng chỉ bền khi mọi người giữ phần của mình.",
      en: "Community lasts only when people carry their part."
    },
    primary: docsCatalog.communityRules,
    secondary: [docsCatalog.gettingStarted, docsCatalog.faq],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.docsHome],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/stay",
    title: { vi: "Ở lại theo cách bền", en: "Stay in a durable way" },
    intro: {
      vi: "Chỗ ở chỉ là một phần của việc ở lại lâu dài.",
      en: "Accommodation is only one part of a long-term stay."
    },
    primary: docsCatalog.stayGuide,
    secondary: [docsCatalog.gettingStarted, docsCatalog.communityRules],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.faq],
    operatorGuides: [docsCatalog.memberHandbook]
  },
  {
    path: "/articles",
    title: { vi: "Đọc để hiểu đúng", en: "Read to understand clearly" },
    intro: {
      vi: "Bài viết công khai là lớp nền tin cậy đầu tiên của toàn hệ.",
      en: "Public articles are the first trust layer of the system."
    },
    primary: docsCatalog.docsHome,
    secondary: [docsCatalog.gettingStarted, docsCatalog.workGuide, docsCatalog.stayGuide],
    roleGuides: [docsCatalog.join, docsCatalog.memberWelcome],
    policyGuides: [docsCatalog.faq],
    operatorGuides: [docsCatalog.memberHandbook]
  }
];

export const publicDocsSections = [
  {
    title: { vi: "Bắt đầu", en: "Start here" },
    links: [docsCatalog.docsHome, docsCatalog.gettingStarted, docsCatalog.howItWorks]
  },
  {
    title: { vi: "Ở lại và làm việc", en: "Stay and work" },
    links: [docsCatalog.stayGuide, docsCatalog.workGuide, docsCatalog.communityRules]
  },
  {
    title: { vi: "Đi sâu hơn", en: "Go deeper" },
    links: [docsCatalog.join, docsCatalog.memberWelcome, docsCatalog.memberHandbook]
  }
];

export function getPublicDocsContext(path: string): DocsContext {
  return contexts.find((item) => item.path === path) ?? contexts[0];
}

export function pickDocsText(locale: OmdalatLocale, text: LocalizedLabel) {
  return locale === "vi" ? text.vi : text.en;
}

export function resolveDocsHref(locale: OmdalatLocale, href: string) {
  return href.startsWith("/") ? localizePath(href, locale) : href;
}
