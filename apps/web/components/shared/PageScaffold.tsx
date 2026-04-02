import { buildBreadcrumbSchema } from "../../lib/breadcrumb";
import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildWebPageSchema } from "../../lib/schema";
import { localizePath } from "../../../../packages/core";

type PageScaffoldProps = {
  eyebrow: string | LocalizedText;
  title: string | LocalizedText;
  description: string | LocalizedText;
  highlights: Array<string | LocalizedText>;
  nextStep: string | LocalizedText;
  path: string;
};

export async function PageScaffold({ eyebrow, title, description, highlights, nextStep, path }: PageScaffoldProps) {
  const locale = await getRequestLocale();
  const titleText = pickLocalized(locale, title);
  const eyebrowText = pickLocalized(locale, eyebrow);
  const descriptionText = pickLocalized(locale, description);
  const highlightTexts = highlights.map((item) => pickLocalized(locale, item));
  const nextStepText = pickLocalized(locale, nextStep);
  const localizedPath = localizePath(path, locale);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: localizePath("/", locale) },
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

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Trạng thái hiện tại" : "Current shell"}</h2>
            <ul className="runtime-list">
              {highlightTexts.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="runtime-panel">
            <h2>{locale === "vi" ? "Bước triển khai tiếp theo" : "Next implementation step"}</h2>
            <p>{nextStepText}</p>
          </section>
        </div>
      </article>
    </>
  );
}
