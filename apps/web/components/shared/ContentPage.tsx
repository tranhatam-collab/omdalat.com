import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";

type ContentSection = {
  heading: LocalizedText;
  points: LocalizedText[];
};

type ContentPageProps = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  sections: ContentSection[];
};

export async function ContentPage({ eyebrow, title, intro, sections }: ContentPageProps) {
  const locale = await getRequestLocale();

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{pickLocalized(locale, eyebrow)}</p>
      <h1>{pickLocalized(locale, title)}</h1>
      <p>{pickLocalized(locale, intro)}</p>
      <div className="runtime-page-grid">
        {sections.map((section) => (
          <section className="runtime-panel" key={section.heading.en}>
            <h2>{pickLocalized(locale, section.heading)}</h2>
            <ul className="runtime-list">
              {section.points.map((point) => (
                <li key={point.en}>{pickLocalized(locale, point)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
