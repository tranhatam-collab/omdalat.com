import type { Metadata } from "next";
import { localizePath } from "../../../packages/core";
import { getRequestLocale } from "../lib/locale";
import { buildCurrentLocalePageMetadata } from "../lib/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "../lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt",
      en: "Om Dalat | Live and work in Dalat"
    },
    description: {
      vi: "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây một nhịp sống có thể đi đường dài.",
      en: "Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build a life that lasts."
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
      description: "Nơi ở, nhịp sống, sự ổn định và đời sống hằng ngày."
    },
    en: {
      title: "Life",
      description: "Living space, rhythm, stability, and daily life."
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
    "Người có thể làm việc từ xa hoặc tự tạo công việc.",
    "Người muốn học từ đời sống thật.",
    "Người có thể sống cùng người khác mà không làm hỏng nhịp chung."
  ],
  en: [
    "People who want to stay longer in Dalat.",
    "People who can work remotely or create their own work.",
    "People who learn from real life.",
    "People who can live with others without breaking the shared rhythm."
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
    vi: "Một nhịp sống chậm hơn",
    en: "A slower rhythm"
  },
  {
    src: "https://images.unsplash.com/photo-1756714656046-41f3bf6bfe88?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=gvz-42-OpFtIP6ndrQ-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Thác Datanla",
      en: "Datanla Waterfall"
    },
    vi: "Một góc đủ để ở lại",
    en: "A place that is enough to stay"
  },
  {
    src: "https://images.unsplash.com/photo-1771581254097-7a186bd064bf?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-hatuanh-R_wHZ6Xp6eU-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Quầy trái cây ở chợ Đà Lạt",
      en: "A fruit stall at Dalat Market"
    },
    vi: "Đời sống thường ngày",
    en: "Everyday life"
  },
  {
    src: "https://images.unsplash.com/photo-1739286869328-13691f7001ec?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-tien-le-KL-_dlddu58-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Mặt trước chợ Đà Lạt",
      en: "The front of Dalat Market"
    },
    vi: "Một nơi để ở lại",
    en: "A place to stay"
  }
] as const;

const steps = [
  {
    key: "understand",
    vi: {
      title: "Đọc để hiểu đúng",
      body: "Bắt đầu từ phần nền để biết nơi này có thực sự hợp với mình hay không."
    },
    en: {
      title: "Read to understand",
      body: "Start from the foundational pages before deciding whether this place fits you."
    }
  },
  {
    key: "apply",
    vi: {
      title: "Gửi hồ sơ cơ bản",
      body: "Nói rõ bạn muốn gì, có thể làm gì và dự định ở bao lâu."
    },
    en: {
      title: "Send a basic application",
      body: "Explain what you want, what you can do, and how long you expect to stay."
    }
  },
  {
    key: "trial",
    vi: {
      title: "Bắt đầu thời gian thử",
      body: "Nếu có độ phù hợp, bạn bắt đầu từ một thời gian thử trước khi ở lại lâu hơn."
    },
    en: {
      title: "Start a trial period",
      body: "If there is a fit, begin with a trial period before deciding on a longer stay."
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
      answer: "No. Accommodation is only one part of the system."
    }
  },
  {
    vi: {
      question: "Có phải ai cũng tham gia được không?",
      answer: "Không. Hệ này cần sự tự quản lý và trách nhiệm."
    },
    en: {
      question: "Is it for everyone?",
      answer: "No. It requires responsibility and self-management."
    }
  },
  {
    vi: {
      question: "Tôi có thể đến thử không?",
      answer: "Có. Nhưng cần đi qua bước đăng ký và trao đổi trước."
    },
    en: {
      question: "Can I try it first?",
      answer: "Yes, through an application and initial conversation."
    }
  }
] as const;

export default async function HomePage() {
  const locale = await getRequestLocale();
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();
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
                    : "Not for a short experience."}
                </p>
                <p>
                  {locale === "vi"
                    ? "Mà để sống đủ lâu để thấy điều gì thật sự phù hợp."
                    : "But to stay long enough to see what truly fits."}
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

            <div className="runtime-home-hero-media" aria-label={locale === "vi" ? "Đời sống tại Đà Lạt" : "Life in Dalat"}>
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

        <section className="runtime-home-section" aria-label={locale === "vi" ? "Ôm Đà Lạt là gì" : "What is Om Dalat"}>
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Ôm Đà Lạt là gì" : "What is Om Dalat"}</p>
            <h2>{locale === "vi" ? "Ôm Đà Lạt là gì" : "What is Om Dalat"}</h2>
          </div>
          <div className="runtime-home-statement-inner">
            <p>{locale === "vi" ? "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt." : "Om Dalat is a real-life living system in Dalat."}</p>
            <p>
              {locale === "vi"
                ? "Nơi con người có thể ở lại, làm việc, học từ trải nghiệm và sống cùng người khác theo một nhịp rõ ràng hơn."
                : "A place where people can stay, work, learn from experience, and live with others in a clearer rhythm."}
            </p>
            <p>{locale === "vi" ? "Đây không phải là du lịch." : "This is not tourism."}</p>
            <p>
              {locale === "vi"
                ? "Cũng không phải là một cộng đồng mở cho mọi kiểu tham gia."
                : "It is not an open community for every kind of participation."}
            </p>
            <p>{locale === "vi" ? "Đây là một nơi có thể sống lâu." : "It is a place where one can stay for the long term."}</p>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Sống / Làm / Học / Cộng đồng" : "Life / Work / Learning / Community"}</p>
            <h2>{locale === "vi" ? "Bốn phần chính của hệ" : "Four core parts of the system"}</h2>
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
            <h2>{locale === "vi" ? "Ai phù hợp với Ôm Đà Lạt" : "Who is this for"}</h2>
          </div>

          <div className="runtime-home-split">
            <section className="runtime-panel">
              <ul className="runtime-list">
                {(locale === "vi" ? fitList.vi : fitList.en).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="runtime-panel">
              <p>
                {locale === "vi"
                  ? "Không phải ai cũng phù hợp. Và điều đó là bình thường."
                  : "This is not for everyone. And that is normal."}
              </p>
            </section>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Không gian" : "Spaces"}</p>
            <h2>{locale === "vi" ? "Không gian sống và làm" : "Living and working spaces"}</h2>
            <p>
              {locale === "vi"
                ? "Một căn nhà nhỏ, một bàn làm việc, một góc yên, một nhịp sống đủ chậm để nhìn rõ hơn."
                : "A small house, a working desk, a quiet corner, a rhythm slow enough to see more clearly."}
            </p>
            <p>
              {locale === "vi"
                ? "Đà Lạt không cần phải lớn. Chỉ cần đủ để ở lại."
                : "Dalat does not need to be large. It only needs to be enough to stay."}
            </p>
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
            <h2>{locale === "vi" ? "Bắt đầu như thế nào" : "How to begin"}</h2>
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
          <div className="runtime-actions">
            <a className="runtime-button primary" href={localizePath("/join", locale)}>
              {locale === "vi" ? "Gửi hồ sơ" : "Send application"}
            </a>
            <a className="runtime-button secondary" href={localizePath("/docs/getting-started", locale)}>
              {locale === "vi" ? "Đọc hướng dẫn" : "Read the guide"}
            </a>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Cầu nối" : "Bridge"}</p>
            <h2>{locale === "vi" ? "Ấp Đà Lạt" : "Ap Dalat"}</h2>
            <p>
              {locale === "vi"
                ? "Nếu bạn muốn hiểu Đà Lạt sâu hơn trước khi ở lại, hãy bắt đầu từ Ấp Đà Lạt."
                : "If you want to understand Dalat more deeply before staying, begin with Ap Dalat."}
            </p>
            <p>
              {locale === "vi"
                ? "Đó là nơi kể về con người, nơi chốn và nhịp sống đang diễn ra ở đây mỗi ngày."
                : "It tells the story of the people, places, and daily rhythms here."}
            </p>
          </div>
          <div className="runtime-actions">
            <a className="runtime-button secondary" href={localizePath("/community", locale)}>
              {locale === "vi" ? "Mở Ấp Đà Lạt" : "Explore Ap Dalat"}
            </a>
          </div>
        </section>

        <section className="runtime-home-section">
          <div className="runtime-home-section-head">
            <p className="runtime-kicker">{locale === "vi" ? "Giải đáp nhanh" : "FAQ"}</p>
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
              {locale === "vi" ? "Bắt đầu từ đây" : "Start here"}
            </a>
            <a className="runtime-button secondary" href={localizePath("/join", locale)}>
              {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
