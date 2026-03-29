import { accountRoutes, appRoutes } from "../../lib/routes";

export function AppNav() {
  return (
    <div className="app-nav-wrap">
      <nav className="app-nav" aria-label="Primary app navigation">
        {appRoutes.map((route) => (
          <a href={route.href} key={route.href}>
            {route.label}
          </a>
        ))}
      </nav>
      <nav className="app-nav app-nav-secondary" aria-label="Account navigation">
        {accountRoutes.map((route) => (
          <a href={route.href} key={route.href}>
            {route.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
