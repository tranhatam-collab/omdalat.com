type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  nextStep: string;
};

export function PageScaffold({ eyebrow, title, description, highlights, nextStep }: PageScaffoldProps) {
  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>Current shell</h2>
          <ul className="runtime-list">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="runtime-panel">
          <h2>Next implementation step</h2>
          <p>{nextStep}</p>
        </section>
      </div>
    </article>
  );
}
