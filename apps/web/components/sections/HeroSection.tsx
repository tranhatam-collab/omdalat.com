export function HeroSection() {
  return (
    <section className="runtime-hero">
      <p className="runtime-kicker">apps/web runtime</p>
      <h1>Public OMDALAT runtime scaffold, without replacing the live static surface yet.</h1>
      <p>
        This scaffold mirrors the city-layer direction in the docs while the current root route continues to serve the
        static implementation from `apps/web/index.html`.
      </p>
      <div className="runtime-actions">
        <a className="runtime-button primary" href="/apps/app/">
          Open operating layer
        </a>
        <a className="runtime-button secondary" href="/apps/web/">
          View static web surface
        </a>
      </div>
    </section>
  );
}
