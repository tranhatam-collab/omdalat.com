type AppScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  nextStep: string;
};

export function AppScaffold({ eyebrow, title, description, highlights, nextStep }: AppScaffoldProps) {
  return (
    <article className="app-page">
      <p className="app-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="app-page-grid">
        <section className="app-panel">
          <h2>Current shell</h2>
          <ul className="app-list">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section className="app-panel">
          <h2>Next implementation step</h2>
          <p>{nextStep}</p>
        </section>
      </div>
    </article>
  );
}
