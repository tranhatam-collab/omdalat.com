import type { Metadata } from "next";
import { localizePath } from "../../../packages/core";
import { ContextHelpSection } from "../components/shared/ContextHelpSection";
import { getFeaturedArticles } from "../lib/content-seed";
import { getRequestLocale } from "../lib/locale";
import { buildPageMetadata } from "../lib/metadata";
import { getPublicDocsContext } from "../lib/public-docs";
import { buildOrganizationSchema, buildWebSiteSchema } from "../lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Ôm Đà Lạt | Sống và làm việc tại Đà Lạt",
  description:
    "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây giá trị dài hạn.",
  path: "/"
});

const pillars = [
  {
    key: "life",
    vi: {
      title: "Sống",
      description: "Nơi ở, nhịp sống, sức khỏe và sự ổn định hàng ngày."
    },
    en: {
      title: "Life",
      description: "Living space, rhythm, health, and daily stability."
    }
  },
  {
    key: "work",
    vi: {
      title: "Làm",
      description: "Công việc thật, dự án thật và khả năng tạo thu nhập thật."
    },
    en: {
      title: "Work",
      description: "Real work, real projects, and the ability to generate real income."
    }
  },
  {
    key: "learning",
    vi: {
      title: "Học",
      description: "Học từ trải nghiệm, từ công việc và từ cách sống cùng người khác."
    },
    en: {
      title: "Learning",
      description: "Learning from experience, work, and living with others."
    }
  },
  {
    key: "community",
    vi: {
      title: "Cộng đồng",
      description: "Sống chung, chia sẻ, giữ kỷ luật và có đóng góp."
    },
    en: {
      title: "Community",
      description: "Living together, sharing, keeping discipline, and contributing."
    }
  }
] as const;

const audience = {
  vi: [
    "Người muốn ở lại Đà Lạt lâu hơn, không chỉ đi ngắn ngày.",
    "Người đang tìm một nhịp sống rõ ràng hơn.",
    "Người có thể làm việc từ xa hoặc tự tạo công việc.",
    "Người muốn học qua trải nghiệm thay vì lý thuyết rời rạc.",
    "Người muốn ở trong một cộng đồng có trách nhiệm."
  ],
  en: [
    "People who want to stay in Dalat longer, not just visit briefly.",
    "People looking for a clearer rhythm of life.",
    "People who can work remotely or create their own work.",
    "People who want to learn through experience instead of detached theory.",
    "People who want to live in a responsible community."
  ]
};

const notFit = {
  vi: [
    "Người chỉ tìm chỗ nghỉ ngắn ngày.",
    "Người không muốn chịu trách nhiệm với nhịp sống chung.",
    "Người thích nói nhiều hơn làm.",
    "Người vào chỉ để thử cho vui."
  ],
  en: [
    "People only looking for a short stay.",
    "People unwilling to respect shared rhythm and responsibility.",
    "People who talk more than they do.",
    "People joining only for novelty."
  ]
};

const spaces = [
  {
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1600",
    alt: "Đà Lạt trong sương sớm",
    vi: "Nhịp sáng ở Đà Lạt",
    en: "Morning rhythm in Dalat"
  },
  {
    src: "https://images.unsplash.com/photo-1741524427564-0173c980c432?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=di-p-zader-i29Z07meKds-unsplash.jpg&w=1600",
    alt: "Hồ và rừng thông ở Đà Lạt",
    vi: "Không gian đủ yên để làm việc",
    en: "A quiet enough space for work"
  },
  {
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1600",
    alt: "Đường rừng vùng ven Đà Lạt",
    vi: "Khoảng thở giữa nhịp sống",
    en: "A breathing space inside the rhythm"
  }
] as const;

const steps = {
  vi: [
    "Đọc để hiểu đúng bản chất của hệ.",
    "Gửi hồ sơ cơ bản và nói rõ bạn muốn gì.",
    "Bắt đầu thời gian thử nếu có độ phù hợp."
  ],
  en: [
    "Read to understand the system clearly.",
    "Send a basic profile and explain what you want.",
    "Start a trial period if there is a fit."
  ]
};

const faq = [
  {
    vi: {
      question: "Ôm Đà Lạt có phải homestay không?",
      answer: "Không. Nơi ở chỉ là một phần của hệ sống."
    },
    en: {
      question: "Is Om Dalat a homestay?",
      answer: "No. Accommodation is only one part of the living system."
    }
  },
  {
    vi: {
      question: "Có phải ai cũng phù hợp không?",
      answer: "Không. Hệ này cần sự tự quản lý, trách nhiệm và khả năng sống cùng người khác."
    },
    en: {
      question: "Is it for everyone?",
      answer: "No. It asks for self-management, responsibility, and the ability to live with others."
    }
  },
  {
    vi: {
      question: "Tôi có thể tham gia nếu công việc chưa ổn định không?",
      answer: "Có thể, nhưng bạn cần nói rõ tình trạng hiện tại và khả năng của mình trong hồ sơ."
    },
    en: {
      question: "Can I join if my work is not stable yet?",
      answer: "Possibly, but you need to explain your current situation and capabilities in your profile."
    }
  }
] as const;

export default async function HomePage() {
  const locale = await getRequestLocale();
  const docsContext = getPublicDocsContext("/");
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
  const featuredArticles = getFeaturedArticles(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <article className="runtime-page runtime-homepage">
        <p className="runtime-kicker">{locale === "vi" ? "Ôm Đà Lạt / Om Dalat" : "Om Dalat / Ôm Đà Lạt"}</p>
        <h1>{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</h1>
        <p>
          {locale === "vi"
            ? "Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật."
            : "A place to live, work, learn, and build a real life in Dalat."}
        </p>
        <p className="runtime-note">
          {locale === "vi"
            ? "Đây không phải là nơi để ghé qua. Đây là nơi để ở lại, giữ một nhịp sống có giá trị thật, công việc thật và cộng đồng thật."
            : "This is not a place to pass through. It is a place to stay and build a rhythm with real work, real value, and a real community."}
        </p>

        <div className="runtime-actions">
          <a className="runtime-button primary" href={localizePath("/join", locale)}>
            {locale === "vi" ? "Bắt đầu từ đây" : "Start here"}
          </a>
          <a className="runtime-button secondary" href={localizePath("/docs/getting-started", locale)}>
            {locale === "vi" ? "Đọc hướng dẫn" : "Read the guide"}
          </a>
        </div>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ôm Đà Lạt là gì?" : "What is Om Dalat?"}</h2>
          <p>
            {locale === "vi"
              ? "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt. Nơi con người có thể ở lại, làm việc, học từ trải nghiệm và sống trong một cộng đồng có kỷ luật."
              : "Om Dalat is a real-life living system in Dalat. People can stay, work, learn from experience, and live within a disciplined community."}
          </p>
          <p className="runtime-note">
            {locale === "vi"
              ? "Không phải du lịch. Không phải retreat. Không phải nơi để thử cho vui."
              : "Not tourism. Not a retreat. Not a place to try for novelty."}
          </p>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bốn trục chính" : "Four core paths"}</h2>
          <div className="runtime-card-grid">
            {pillars.map((pillar) => {
              const copy = locale === "vi" ? pillar.vi : pillar.en;
              return (
                <article className="runtime-link-card" key={pillar.key}>
                  <strong>{copy.title}</strong>
                  <span>{copy.description}</span>
                </article>
              );
            })}
          </div>
        </section>

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Ai phù hợp?" : "Who is this for?"}</h2>
            <ul className="runtime-list">
              {(locale === "vi" ? audience.vi : audience.en).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Không phù hợp khi nào?" : "When is it not a fit?"}</h2>
            <ul className="runtime-list">
              {(locale === "vi" ? notFit.vi : notFit.en).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Không gian sống và làm" : "Living and working spaces"}</h2>
          <div className="runtime-card-grid">
            {spaces.map((space) => (
              <article className="runtime-panel" key={space.src}>
                <img
                  src={space.src}
                  alt={space.alt}
                  style={{ width: "100%", borderRadius: "14px", aspectRatio: "4 / 3", objectFit: "cover" }}
                />
                <p className="runtime-note" style={{ marginTop: "0.9rem" }}>
                  {locale === "vi" ? space.vi : space.en}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bài viết mới" : "Latest articles"}</h2>
          <div className="runtime-card-grid">
            {featuredArticles.map((article) => (
              <a
                className="runtime-link-card"
                href={`${localizePath("/articles", locale)}#${article.slug}`}
                key={article.id}
              >
                <strong>{article.title}</strong>
                <span>{article.excerpt}</span>
                <span>{article.pillar}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Bắt đầu như thế nào" : "How to begin"}</h2>
            <ul className="runtime-list">
              {(locale === "vi" ? steps.vi : steps.en).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Dành cho thành viên đã đăng ký" : "For registered members"}</h2>
            <p>
              {locale === "vi"
                ? "Một số tài liệu chi tiết về vận hành, chương trình và định hướng phát triển chỉ mở sau khi hoàn tất hồ sơ thành viên cơ bản."
                : "Some detailed materials about operations, programs, and system direction open only after a basic member profile is completed."}
            </p>
            <div className="runtime-actions">
              <a className="runtime-button primary" href={localizePath("/member", locale)}>
                {locale === "vi" ? "Đăng ký thành viên" : "Register as a member"}
              </a>
              <a className="runtime-button secondary" href={localizePath("/join", locale)}>
                {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
              </a>
            </div>
          </section>
        </div>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Câu hỏi thường gặp" : "FAQ"}</h2>
          <div className="runtime-page-grid">
            {faq.map((item) => {
              const copy = locale === "vi" ? item.vi : item.en;
              return (
                <section className="runtime-panel" key={copy.question}>
                  <h3>{copy.question}</h3>
                  <p>{copy.answer}</p>
                </section>
              );
            })}
          </div>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ở lại hoặc rời đi. Nhưng hiểu rõ trước." : "Stay or leave. But understand clearly first."}</h2>
          <div className="runtime-actions">
            <a className="runtime-button primary" href={localizePath("/join", locale)}>
              {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
            </a>
            <a className="runtime-button secondary" href={localizePath("/docs", locale)}>
              {locale === "vi" ? "Đọc hướng dẫn" : "Read the guide"}
            </a>
          </div>
        </section>

        <ContextHelpSection context={docsContext} />
      </article>
    </>
  );
}
