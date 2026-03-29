export const appRoutes = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/places", label: "Places" },
  { href: "/hosts", label: "Hosts" },
  { href: "/experts", label: "Experts" },
  { href: "/communities", label: "Communities" },
  { href: "/events", label: "Events" },
  { href: "/proofs", label: "Proofs" }
];

export const accountRoutes = [
  { href: "/profile", label: "Profile" },
  { href: "/settings", label: "Settings" }
];

export const allAppRoutes = [...appRoutes, ...accountRoutes];
