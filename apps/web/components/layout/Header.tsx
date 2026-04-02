import { Nav } from "./Nav";
import { getLocaleSwitchLinks } from "../../lib/locale";

export async function Header() {
  const { locale, viHref, enHref } = await getLocaleSwitchLinks();

  return (
    <header className="runtime-header">
      <div className="runtime-brand">
        <strong>{locale === "vi" ? "OMDALAT - Lớp vận hành thành phố" : "OMDALAT - City operating layer"}</strong>
        <span>
          {locale === "vi"
            ? "Trusted places, people, requests, and proof in Da Lat."
            : "Trusted places, people, requests, and proof in Da Lat."}
        </span>
        <span>
          <a href={viHref} aria-current={locale === "vi" ? "page" : undefined}>
            Tiếng Việt
          </a>{" "}
          ·{" "}
          <a href={enHref} aria-current={locale === "en" ? "page" : undefined}>
            English
          </a>
        </span>
      </div>
      <Nav />
    </header>
  );
}
