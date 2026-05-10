import type { LocalizedText } from "./i18n-copy";

type ProgramCard = {
  title: LocalizedText;
  description: LocalizedText;
};

type HomepageContent = {
  eyebrow: LocalizedText;
  heroName: string;
  title: LocalizedText;
  intro: LocalizedText;
  ctaJoin: LocalizedText;
  ctaDocs: LocalizedText;
  ctaPackages: LocalizedText;
  note: LocalizedText;
  introductionTitle: LocalizedText;
  introductionBody: LocalizedText;
  programsTitle: LocalizedText;
  programs: ProgramCard[];
  howItWorksTitle: LocalizedText;
  howItWorks: LocalizedText[];
};

export const homepageContent: HomepageContent = {
  eyebrow: { vi: "Ôm Đà Lạt", en: "Om Dalat" },
  heroName: "Ôm Đà Lạt",
  title: {
    vi: "Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật.",
    en: "A place to live, work, learn, and build a real life in Dalat."
  },
  intro: {
    vi: "Đây không phải là nơi để ghé qua. Đây là nơi để ở lại, giữ một nhịp sống rõ ràng, làm việc thật và học từ trải nghiệm thật.",
    en: "This is not a place to pass through. It is a place to stay, hold a clear rhythm, do real work, and learn from real experience."
  },
  ctaJoin: { vi: "Bắt đầu từ đây", en: "Start here" },
  ctaDocs: { vi: "Đọc hướng dẫn", en: "Read the guide" },
  ctaPackages: { vi: "Xem cách tham gia", en: "See how to join" },
  note: {
    vi: "Không phải ai cũng hợp. Điều quan trọng là hiểu đúng trước khi quyết định ở lại.",
    en: "It is not for everyone. The important thing is to understand it clearly before deciding to stay."
  },
  introductionTitle: {
    vi: "Ôm Đà Lạt là gì?",
    en: "What is Om Dalat?"
  },
  introductionBody: {
    vi: "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt. Nơi con người có thể ở lại, làm việc, học từ trải nghiệm và sống trong một cộng đồng có kỷ luật.",
    en: "Om Dalat is a real-life living system in Dalat. People can stay, work, learn from experience, and live within a disciplined community."
  },
  programsTitle: { vi: "Bốn trục chính", en: "Four core paths" },
  programs: [
    {
      title: { vi: "Sống", en: "Life" },
      description: {
        vi: "Nơi ở, nhịp sống, sức khỏe và sự ổn định hàng ngày.",
        en: "Living space, rhythm, health, and daily stability."
      }
    },
    {
      title: { vi: "Làm", en: "Work" },
      description: {
        vi: "Công việc thật, dự án thật và khả năng tạo thu nhập thật.",
        en: "Real work, real projects, and the ability to generate real income."
      }
    },
    {
      title: { vi: "Học", en: "Learning" },
      description: {
        vi: "Học từ trải nghiệm, từ công việc và từ cách sống cùng người khác.",
        en: "Learning from experience, work, and living with others."
      }
    },
    {
      title: { vi: "Cộng đồng", en: "Community" },
      description: {
        vi: "Sống chung, chia sẻ, giữ kỷ luật và có đóng góp.",
        en: "Living together, sharing, keeping discipline, and contributing."
      }
    }
  ],
  howItWorksTitle: { vi: "Bắt đầu như thế nào", en: "How to begin" },
  howItWorks: [
    {
      vi: "Đọc để hiểu đúng bản chất của hệ",
      en: "Read to understand the system clearly"
    },
    {
      vi: "Gửi hồ sơ cơ bản và nói rõ nhu cầu của bạn",
      en: "Send a basic profile and explain what you need"
    },
    {
      vi: "Bắt đầu thời gian thử nếu có độ phù hợp",
      en: "Start a trial period if there is a fit"
    }
  ]
};
