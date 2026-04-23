import type { Metadata } from "next";
import { localizePath } from "../../../packages/core";
import { getFeaturedArticles } from "../lib/content-seed";
import { getRequestLocale } from "../lib/locale";
import { buildCurrentLocalePageMetadata } from "../lib/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "../lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Ôm Đà Lạt | Sống và làm việc tại Đà Lạt",
      en: "Om Dalat | Live and Work in Dalat"
    },
    description: {
      vi: "Hiểu Đà Lạt như một nơi để ở lại, làm việc và giữ một nhịp sống có thể đi đường dài.",
      en: "A place to stay, work, learn from daily life, and keep a rhythm that can last in Dalat."
    },
    path: "/"
  });
}

const heroMoments = [
  {
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1800",
    width: 1800,
    height: 1200,
    alt: {
      vi: "Toàn cảnh Đà Lạt trong sương sớm",
      en: "A wide view of Dalat in the early mist"
    },
    vi: "Đà Lạt trong sương sớm",
    en: "Dalat in the early mist"
  },
  {
    src: "https://images.unsplash.com/photo-1741524427564-0173c980c432?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=di-p-zader-i29Z07meKds-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    alt: {
      vi: "Mặt hồ và rừng thông ở Đà Lạt",
      en: "A lakeside view with pine forest in Dalat"
    },
    vi: "Mặt hồ và rừng thông",
    en: "Lake edge and pine forest"
  },
  {
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    alt: {
      vi: "Con đường đất vùng ven Đà Lạt",
      en: "A dirt road along the edge of Dalat"
    },
    vi: "Đường rừng vùng ven",
    en: "The forest edge road"
  }
] as const;

const pillars = [
  {
    key: "life",
    href: "/life",
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
    href: "/work",
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
    href: "/learning",
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
    href: "/community",
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

const fitList = {
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

const notFitList = {
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

const spaceMoments = [
  {
    src: "https://images.unsplash.com/photo-1562865828-63b04eb687a5?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=vicky-HXC2QFlxG3E-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Ga Đà Lạt",
      en: "Dalat Station"
    },
    vi: "Ga Đà Lạt",
    en: "Dalat Station"
  },
  {
    src: "https://images.unsplash.com/photo-1756714656046-41f3bf6bfe88?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=gvz-42-OpFtIP6ndrQ-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Thác Datanla",
      en: "Datanla Waterfall"
    },
    vi: "Thác Datanla",
    en: "Datanla Waterfall"
  },
  {
    src: "https://images.unsplash.com/photo-1771581254097-7a186bd064bf?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-hatuanh-R_wHZ6Xp6eU-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Quầy trái cây ở chợ Đà Lạt",
      en: "A fruit stall at Dalat Market"
    },
    vi: "Chợ Đà Lạt",
    en: "Dalat Market"
  },
  {
    src: "https://images.unsplash.com/photo-1739286869328-13691f7001ec?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-tien-le-KL-_dlddu58-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Mặt trước chợ Đà Lạt",
      en: "The front of Dalat Market"
    },
    vi: "Phố chợ",
    en: "Market quarter"
  }
] as const;

const steps = [
  {
    key: "understand",
    vi: {
      title: "Hiểu đúng",
      body: "Đọc phần nền để biết hệ này có hợp với mình hay không."
    },
    en: {
      title: "Understand clearly",
      body: "Read the core pages before deciding whether this system fits you."
    }
  },
  {
    key: "apply",
    vi: {
      title: "Gửi hồ sơ",
      body: "Nói rõ bạn muốn gì, có thể làm gì và dự định ở bao lâu."
    },
    en: {
      title: "Send a profile",
      body: "Explain what you want, what you can do, and how long you expect to stay."
    }
  },
  {
    key: "trial",
    vi: {
      title: "Bắt đầu thời gian thử",
      body: "Nếu có độ phù hợp, bạn đi vào nhịp thử trước khi quyết định ở lại lâu hơn."
    },
    en: {
      title: "Start a trial rhythm",
      body: "If there is a fit, you begin with a trial period before deciding on a longer stay."
    }
  }
] as const;

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
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
  const featuredArticles = getFeaturedArticles(locale);
  const heroPrimary = heroMoments[0];
  const heroSecondary = heroMoments.slice(1);
  const responsiveImageStyle = { width: "100%", maxWidth: "100%", display: "block" } as const;

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

      <article className="runtime-homepage">
        <section className="runtime-home-hero">
          <div className="runtime-home-hero-panel">
            <div className="runtime-home-hero-copy">
              <p className="runtime-kicker">{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</p>
              <p className="runtime-home-place">{locale === "vi" ? heroPrimary.vi : heroPrimary.en}</p>
              <h1>{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</h1>
              <p className="runtime-home-subline">
                {locale === "vi"
                  ? "Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật."
                  : "A place to live, work, learn, and build a real life in Dalat."}
              </p>
              <div className="runtime-home-lines">
                <p>{locale === "vi" ? "Đây không phải là nơi để ghé qua." : "This is not a place to pass through."}</p>
                <p>{locale === "vi" ? "Đây là nơi để ở lại." : "It is a place to stay."}</p>
                <p>
                  {locale === "vi"
                    ? "Không phải để thử một trải nghiệm ngắn."
                    : "Not for a short-lived experience."}
                </p>
                <p>
                  {locale === "vi"
                    ? "Mà để giữ một nhịp sống có thể đi đường dài."
                    : "But to keep a rhythm that can last."}
                </p>
              </div>
              <div className="runtime-actions">
                <a className="runtime-button primary" href={localizePath("/join", locale)}>
                  {locale === "vi" ? "Bắt đầu từ đây" : "Start here"}
                </a>
                <a className="runtime-button secondary" href={localizePath("/join", locale)}>
                  {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
                </a>
              </div>
            </div>

            <div className="runtime-home-hero-media" aria-label={locale === "vi" ? "Không gian Đà Lạt" : "Scenes from Dalat"}>
              <figure className="runtime-home-hero-primary">
                <img
                  src={heroPrimary.src}
                  alt={locale === "vi" ? heroPrimary.alt.vi : heroPrimary.alt.en}
                  width={heroPrimary.width}
                  height={heroPrimary.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={responsiveImageStyle}
                />
                <figcaption>{locale === "vi" ? heroPrimary.vi : heroPrimary.en}</figcaption>
              </figure>
              <div className="runtime-home-hero-stack">
                {heroSecondary.map((image) => (
                  <figure className="runtime-home-hero-secondary" key={image.src}>
                    <img
                      src={image.src}
                      alt={locale === "vi" ? image.alt.vi : image.alt.en}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                      style={responsiveImageStyle}
                    />
                    <figcaption>{locale === "vi" ? image.vi : image.en}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="runtime-home-statement" aria-label={locale === "vi" ? "Đây là gì" : "What this is"}>
          <div className="runtime-home-statement-inner">
            <p>{locale === "vi" ? "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt." : "Om Dalat is a real-life living system in Dalat."}</p>
            <p>
              {locale === "vi"
                ? "Nơi con người có thể ở lại, làm việc, học từ trải nghiệm và sống trong một cộng đồng có kỷ luật."
                : "A place where people can stay, work, learn from experience, and live within a disciplined community."}
            </p>
            <p>
              {locale === "vi"
                ? "Không phải du lịch. Không phải nơi nghỉ ngắn ngày. Không phải nơi để thử cho vui."
                : "Not tourism. Not a short-stay escape. Not a place to try for novelty."}
            </p>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Sống / Làm / Học / Cộng đồng" : "Life / Work / Learning / Community"}</p>
            <h2>{locale === "vi" ? "Bốn trục giữ hệ đứng vững" : "Four paths that keep the system standing"}</h2>
            <p>
              {locale === "vi"
                ? "Mỗi trục có việc riêng. Khi ghép lại, nó thành một nơi có thể sống lâu."
                : "Each path has its own job. Together they create a place that can hold a longer life."}
            </p>
          </div>

          <div className="runtime-home-pillar-grid">
            {pillars.map((pillar) => {
              const copy = locale === "vi" ? pillar.vi : pillar.en;

              return (
                <a className="runtime-home-pillar" href={localizePath(pillar.href, locale)} key={pillar.key}>
                  <p className="runtime-home-mini">{copy.title}</p>
                  <h3>{copy.title}</h3>
                  <p>{copy.description}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Phù hợp" : "Fit"}</p>
            <h2>{locale === "vi" ? "Ai phù hợp và ai nên dừng lại trước" : "Who fits and who should pause first"}</h2>
          </div>

          <div className="runtime-home-split">
            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Ai phù hợp?" : "Who is this for?"}</h3>
              <ul className="runtime-list">
                {(locale === "vi" ? fitList.vi : fitList.en).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="runtime-panel">
              <h3>{locale === "vi" ? "Khi nào chưa phù hợp?" : "When is it not a fit?"}</h3>
              <ul className="runtime-list">
                {(locale === "vi" ? notFitList.vi : notFitList.en).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Không gian" : "Spaces"}</p>
            <h2>{locale === "vi" ? "Những khoảng đủ để ở, làm và thở" : "Enough room to stay, work, and breathe"}</h2>
          </div>

          <div className="runtime-home-gallery">
            {spaceMoments.map((image) => (
              <figure key={image.src}>
                <img
                  src={image.src}
                  alt={locale === "vi" ? image.alt.vi : image.alt.en}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  fetchPriority="auto"
                  decoding="async"
                  style={responsiveImageStyle}
                />
                <figcaption>{locale === "vi" ? image.vi : image.en}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Bắt đầu" : "How to begin"}</p>
            <h2>{locale === "vi" ? "Đi từng bước, không cần diễn" : "Move step by step, without performance"}</h2>
            <p>
              {locale === "vi"
                ? "Public đủ để hiểu đúng. Bước sâu hơn chỉ mở khi bạn thực sự đi vào quá trình tham gia."
                : "Public pages should be enough to understand the system. Deeper layers open only when you actually enter the joining process."}
            </p>
          </div>

          <div className="runtime-home-step-grid">
            {steps.map((step, index) => {
              const copy = locale === "vi" ? step.vi : step.en;

              return (
                <article className="runtime-panel runtime-home-step" key={step.key}>
                  <p className="runtime-home-step-index">0{index + 1}</p>
                  <h3>{copy.title}</h3>
                  <p>{copy.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Nội dung" : "Editorial"}</p>
            <h2>{locale === "vi" ? "Bài viết mới" : "Latest articles"}</h2>
            <p>
              {locale === "vi"
                ? "Các bài public đầu tiên để kéo đúng người vào đúng cách hiểu."
                : "The first public articles to bring the right people into the right understanding."}
            </p>
          </div>

          <div className="runtime-home-article-grid">
            {featuredArticles.map((article) => (
              <a className="runtime-link-card" href={localizePath(article.href, locale)} key={article.id}>
                <span className="runtime-home-article-pill">{article.pillar}</span>
                <strong>{article.title}</strong>
                <span>{article.excerpt}</span>
                <span className="runtime-home-article-cta">{locale === "vi" ? "Đọc bài" : "Read article"}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-split">
            <section className="runtime-panel">
              <p className="runtime-kicker">{locale === "vi" ? "Thành viên" : "Members"}</p>
              <h2>{locale === "vi" ? "Dành cho thành viên đã đăng ký" : "For registered members"}</h2>
              <p>
                {locale === "vi"
                  ? "Một số tài liệu chi tiết về vận hành, chương trình và định hướng phát triển chỉ mở sau khi hoàn tất hồ sơ cơ bản."
                  : "Some detailed materials about operations, programs, and direction open only after completing a basic profile."}
              </p>
              <div className="runtime-actions">
                <a
                  className="runtime-button primary"
                  href={localizePath("/member/register?next=/member/welcome", locale)}
                >
                  {locale === "vi" ? "Đăng ký thành viên" : "Register as a member"}
                </a>
                <a className="runtime-button secondary" href={localizePath("/join", locale)}>
                  {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
                </a>
              </div>
            </section>

            <section className="runtime-panel">
              <p className="runtime-kicker">{locale === "vi" ? "Cầu nối địa phương" : "Local bridge"}</p>
              <h2>{locale === "vi" ? "Ấp Đà Lạt" : "Ap Dalat"}</h2>
              <p>
                {locale === "vi"
                  ? "Sau khi hiểu phần public, bạn đi tiếp vào nhịp địa phương để theo dõi đời sống cộng đồng và bước tham gia phù hợp."
                  : "After understanding the public layer, continue into the local bridge to follow community rhythm and your next-fit participation steps."}
              </p>
              <div className="runtime-actions">
                <a className="runtime-button secondary" href={localizePath("/community", locale)}>
                  {locale === "vi" ? "Vào Ấp Đà Lạt" : "Enter Ap Dalat"}
                </a>
                <a className="runtime-button secondary" href={localizePath("/stay", locale)}>
                  {locale === "vi" ? "Xem nhịp sống" : "See living rhythm"}
                </a>
              </div>
            </section>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">FAQ</p>
            <h2>{locale === "vi" ? "Câu hỏi thường gặp" : "FAQ"}</h2>
          </div>

          <div className="runtime-home-faq-grid">
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

        <section className="runtime-home-closing">
          <p>{locale === "vi" ? "Ở lại hoặc rời đi. Nhưng hiểu rõ trước." : "Stay or leave. But understand clearly first."}</p>
          <div className="runtime-actions">
            <a className="runtime-button primary" href={localizePath("/join", locale)}>
              {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
            </a>
            <a className="runtime-button secondary" href={localizePath("/community", locale)}>
              {locale === "vi" ? "Đọc câu chuyện" : "Read the story"}
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
