import { OMDALAT_INBOXES } from "../../../../packages/core";
import { contextRoutes } from "../../lib/routes";

export function Footer() {
  return (
    <footer className="runtime-footer">
      <div>
        <p>OMDALAT runtime scaffold for `apps/web`.</p>
        <p>The static route remains active until this runtime is wired into deployment.</p>
        <p>
          Public inboxes: <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a> ·{" "}
          <a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a>
        </p>
      </div>
      <nav className="runtime-footer-links" aria-label="Secondary">
        {contextRoutes.map((route) => (
          <a href={route.href} key={route.href}>
            {route.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
