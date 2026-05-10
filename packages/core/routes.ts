export const primaryRoutes = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Life" },
  { href: "/work", label: "Work" },
  { href: "/learning", label: "Learning" },
  { href: "/community", label: "Community" },
  { href: "/stay", label: "Stay" },
  { href: "/articles", label: "Articles" },
  { href: "/join", label: "Join" }
];

export const contextRoutes = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/docs/how-it-works", label: "How it works" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export const publicRoutes = [...primaryRoutes, ...contextRoutes];
