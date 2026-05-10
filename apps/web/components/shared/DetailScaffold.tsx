import type { ReactNode } from "react";
import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getVisualsForContext } from "../../lib/visuals";
import { VisualNarrative } from "./VisualNarrative";

type DetailFact = {
  label: LocalizedText;
  value: LocalizedText | string;
};

type DetailScaffoldProps = {
  eyebrow: LocalizedText;
  title: string;
  description: LocalizedText | string;
  path: string;
  backHref: string;
  backLabel: LocalizedText;
  facts: DetailFact[];
  signals: Array<LocalizedText | string>;
};

function renderSignal(key: string, content: ReactNode) {
  return (
    <li key={key} className="runtime-note">
      {content}
    </li>
  );
}

export async function DetailScaffold({
  eyebrow,
  title,
  description,
  path,
  backHref,
  backLabel,
  facts,
  signals
}: DetailScaffoldProps) {
  const locale = await getRequestLocale();
  const eyebrowText = pickLocalized(locale, eyebrow);
  const descriptionText = pickLocalized(locale, description);
  const visuals = getVisualsForContext(`${eyebrow.en} ${title}`, 2);

  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{eyebrowText}</p>
      <h1>{title}</h1>
      <p>{descriptionText}</p>
      <p className="runtime-meta">{path}</p>
      <VisualNarrative
        images={visuals}
        locale={locale}
        label={locale === "vi" ? `Hình minh họa cho ${title}` : `Visuals for ${title}`}
      />

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Chi tiết" : "Details"}</h2>
          <ul className="runtime-list">
            {facts.map((fact) => (
              <li key={fact.label.en}>
                <strong>{pickLocalized(locale, fact.label)}:</strong> {pickLocalized(locale, fact.value)}
              </li>
            ))}
          </ul>
        </section>

        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Tín hiệu" : "Signals"}</h2>
          <ul className="runtime-list">{signals.map((item, index) => renderSignal(`${index}`, pickLocalized(locale, item)))}</ul>
        </section>
      </div>

      <div className="runtime-actions">
        <a className="runtime-button secondary" href={backHref}>
          {pickLocalized(locale, backLabel)}
        </a>
      </div>
    </article>
  );
}
