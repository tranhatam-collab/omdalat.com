import { buildBreadcrumbSchema } from "../../lib/breadcrumb";
import { buildWebPageSchema } from "../../lib/schema";

type DetailFact = {
  label: string;
  value: string | number;
};

type DetailScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  backHref: string;
  backLabel: string;
  facts: DetailFact[];
  signals: string[];
};

export function DetailScaffold({
  eyebrow,
  title,
  description,
  path,
  backHref,
  backLabel,
  facts,
  signals
}: DetailScaffoldProps) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: backLabel, path: backHref },
    { name: title, path }
  ]);
  const pageSchema = buildWebPageSchema({ title, description, path });

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
        <p className="runtime-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>
          <a href={backHref}>Back to {backLabel}</a>
        </p>

        <div className="runtime-page-grid">
          <section className="runtime-panel">
            <h2>Current facts</h2>
            <ul className="runtime-list">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.label}</strong>: {fact.value}
                </li>
              ))}
            </ul>
          </section>

          <section className="runtime-panel">
            <h2>Active signals</h2>
            <ul className="runtime-list">
              {signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
