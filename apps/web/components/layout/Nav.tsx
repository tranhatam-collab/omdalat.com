import { primaryRoutes } from "../../lib/routes";

export function Nav() {
  return (
    <nav className="runtime-nav" aria-label="Primary">
      {primaryRoutes.map((route) => (
        <a href={route.href} key={route.href}>
          {route.label}
        </a>
      ))}
    </nav>
  );
}
