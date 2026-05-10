import { Section } from "../../../packages/ui";
import { pickLocalized, type LocalizedText } from "../lib/i18n-copy";
import { getRequestLocale } from "../lib/locale";
import { AppVisualStrip } from "./AppVisualStrip";

type AppScaffoldProps = {
  eyebrow: string | LocalizedText;
  title: string | LocalizedText;
  description: string | LocalizedText;
  highlights: Array<string | LocalizedText>;
  nextStep: string | LocalizedText;
};

export async function AppScaffold({ eyebrow, title, description, highlights, nextStep }: AppScaffoldProps) {
  const locale = await getRequestLocale();
  const eyebrowText = pickLocalized(locale, eyebrow);
  const titleText = pickLocalized(locale, title);
  const descriptionText = pickLocalized(locale, description);
  const highlightTexts = highlights.map((highlight) => pickLocalized(locale, highlight));
  const nextStepText = pickLocalized(locale, nextStep);

  return (
    <article className="app-page">
      <p className="app-kicker">{eyebrowText}</p>
      <h1>{titleText}</h1>
      <p>{descriptionText}</p>
      <AppVisualStrip
        locale={locale}
        label={locale === "vi" ? `Hình minh họa cho ${eyebrowText}` : `Visuals for ${eyebrowText}`}
      />

      <div className="app-page-grid">
        <Section className="app-panel">
          <h2>{locale === "vi" ? "Trạng thái runtime hiện tại" : "Current runtime state"}</h2>
          <ul className="app-list">
            {highlightTexts.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Section>
        <Section className="app-panel">
          <h2>{locale === "vi" ? "Bước triển khai tiếp theo" : "Next implementation step"}</h2>
          <p>{nextStepText}</p>
        </Section>
      </div>
    </article>
  );
}
