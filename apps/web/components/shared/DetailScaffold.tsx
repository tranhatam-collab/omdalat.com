import { buildBreadcrumbSchema } from "../../lib/breadcrumb";
import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildWebPageSchema } from "../../lib/schema";
import { localizePath } from "../../../../packages/core";

type DetailFact = {
  label: string | LocalizedText;
  value: string | number | LocalizedText;
};

type DetailScaffoldProps = {
  eyebrow: string | LocalizedText;
  title: string | LocalizedText;
  description: string | LocalizedText;
  path: string;
  backHref: string;
  backLabel: string | LocalizedText;
  facts: DetailFact[];
  signals: Array<string | LocalizedText>;
};

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
  const titleText = pickLocalized(locale, title);
  const eyebrowText = pickLocalized(locale, eyebrow);
  const descriptionText = pickLocalized(locale, description);
  const backLabelText = pickLocalized(locale, backLabel);
  const localizedPath = localizePath(path, locale);
  const localizedBackHref = localizePath(backHref, locale);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: localizePath("/", locale) },
    { name: backLabelText, path: localizedBackHref },
    { name: titleText, path: localizedPath }
  ]);
  const pageSchema = buildWebPageSchema({ title: titleText, description: descriptionText, path: localizedPath });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="runtime-page">
        <p className="runtime-kicker">{eyebrowText}</p>
        <h1>{titleText}</h1>
        <p>{descriptionText}</p>
        <p>
          <a href={localizedBackHref}>
            {locale === "vi" ? "Quay lại" : "Back to"} {backLabelText}
          </a>
        </p>

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Thông tin hiện tại" : "Current facts"}</h2>
            <ul className="runtime-list">
              {facts.map((fact) => (
                <li key={pickLocalized(locale, fact.label)}>
                  <strong>{pickLocalized(locale, fact.label)}</strong>:{" "}
                  {typeof fact.value === "string" ? fact.value : typeof fact.value === "number" ? fact.value : pickLocalized(locale, fact.value)}
                </li>
              ))}
            </ul>
          </section>

          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Tín hiệu đang hoạt động" : "Active signals"}</h2>
            <ul className="runtime-list">
              {signals.map((signal) => (
                <li key={pickLocalized(locale, signal)}>{pickLocalized(locale, signal)}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
