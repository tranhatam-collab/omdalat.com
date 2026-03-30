import { Nav } from "./Nav";
import { getLocaleSwitchLinks } from "../../lib/locale";

export async function Header() {
  const { locale, viHref, enHref } = await getLocaleSwitchLinks();

  return (
    <header className="runtime-header">
      <div className="runtime-brand">
        <strong>{locale === "vi" ? "OMDALAT Runtime (Bản phát triển)" : "OMDALAT Runtime Scaffold"}</strong>
        <span>
          {locale === "vi"
            ? "Các khung runtime web công khai giai đoạn 2 đang chạy song song với bề mặt static."
            : "Stage 2 public web runtime shells running alongside the static surface."}
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
