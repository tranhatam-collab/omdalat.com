import { localizePath } from "../../../../packages/core";
import { getLocaleSwitchLinks, getRequestLocale } from "../../lib/locale";

const primaryLinks = [
  { href: "/", vi: "Trang chủ", en: "Home" },
  { href: "/life", vi: "Sống", en: "Life" },
  { href: "/work", vi: "Làm", en: "Work" },
  { href: "/learning", vi: "Học", en: "Learning" },
  { href: "/community", vi: "Cộng đồng", en: "Community" },
  { href: "/stay", vi: "Ở lại", en: "Stay" },
  { href: "/articles", vi: "Bài viết", en: "Articles" },
  { href: "/join", vi: "Tham gia", en: "Join" }
] as const;

const supportLinks = [
  { href: "/about", vi: "Giới thiệu", en: "About" },
  { href: "/docs/how-it-works", vi: "Luồng vận hành", en: "How it works" },
  { href: "/docs", vi: "Lối vào hệ", en: "Entry path" },
  { href: "/docs/faq", vi: "Câu hỏi thường gặp", en: "FAQ" },
  { href: "/privacy", vi: "Quyền riêng tư", en: "Privacy" },
  { href: "/terms", vi: "Điều khoản", en: "Terms" }
] as const;

export async function Footer() {
  const locale = await getRequestLocale();
  const { switchLinks } = await getLocaleSwitchLinks();

  return (
    <footer className="runtime-footer">
      <section className="runtime-footer-section">
        <p className="runtime-footer-title">{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</p>
        <p>
          {locale === "vi"
            ? "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt. Nơi con người có thể ở lại, làm việc và xây một nhịp sống có thể đi đường dài."
            : "Om Dalat is a real-life living system in Dalat. A place where people can stay, work, and build a life that lasts."}
        </p>
        <p>
          <a href={localizePath("/community", locale)}>
            {locale === "vi" ? "Ấp Đà Lạt" : "Ap Dalat"}
          </a>
        </p>
        <p>
          {locale === "vi"
            ? "Nơi cập nhật nhịp sống và hoạt động chung từ cộng đồng."
            : "Updates on daily rhythm and shared activity from the community."}
        </p>
        <p>
          <a href={localizePath("/join", locale)}>{locale === "vi" ? "Bắt đầu tham gia" : "Start joining"}</a>
        </p>
        <p>
          <a href="mailto:hello@omdalat.com">hello@omdalat.com</a>
          {" · "}
          <a href="mailto:join@omdalat.com">join@omdalat.com</a>
        </p>
      </section>

      <section className="runtime-footer-section">
        <p className="runtime-footer-title">{locale === "vi" ? "Điều hướng" : "Explore"}</p>
        <nav className="runtime-footer-links" aria-label={locale === "vi" ? "Điều hướng chính" : "Primary footer links"}>
          {primaryLinks.map((link) => (
            <a href={localizePath(link.href, locale)} key={link.href}>
              {locale === "vi" ? link.vi : link.en}
            </a>
          ))}
        </nav>
      </section>

      <section className="runtime-footer-section">
        <p className="runtime-footer-title">{locale === "vi" ? "Thông tin" : "Info"}</p>
        <nav className="runtime-footer-links" aria-label={locale === "vi" ? "Điều hướng hỗ trợ" : "Support footer links"}>
          {supportLinks.map((link) => (
            <a href={localizePath(link.href, locale)} key={link.href}>
              {locale === "vi" ? link.vi : link.en}
            </a>
          ))}
          {switchLinks.map((link) => (
            <a href={link.href} key={link.code} title={link.nativeLabel}>
              {link.code.toUpperCase()}
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
}
