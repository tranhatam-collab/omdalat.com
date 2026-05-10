import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getVisualsForContext } from "../../lib/visuals";
import { VisualNarrative } from "./VisualNarrative";

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
  const eyebrowText = pickLocalized(locale, eyebrow);
  const titleText = pickLocalized(locale, title);
  const introText = pickLocalized(locale, intro);
  const visuals = getVisualsForContext(`${eyebrow.en} ${title.en}`, 2);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{eyebrowText}</p>
      <h1>{titleText}</h1>
      <p>{introText}</p>
      <VisualNarrative
        images={visuals}
        locale={locale}
        label={locale === "vi" ? `Hình minh họa cho ${eyebrowText}` : `Visuals for ${eyebrowText}`}
      />
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
