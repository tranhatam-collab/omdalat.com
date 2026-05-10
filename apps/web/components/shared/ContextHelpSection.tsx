import { localizePath } from "../../../../packages/core";
import { getFreeMemberEntryUrl } from "../../lib/global-links";
import {
  pickDocsText,
  resolveDocsHref,
  type DocsContext
} from "../../lib/public-docs";
import { getRequestLocale } from "../../lib/locale";

type Props = {
  context: DocsContext;
};

export async function ContextHelpSection({ context }: Props) {
  const locale = await getRequestLocale();

  return (
    <section className="runtime-panel runtime-help-section">
      <p className="runtime-kicker">{locale === "vi" ? "Chuẩn bị" : "Preparation"}</p>
      <h2>{pickDocsText(locale, context.title)}</h2>
      <p>{pickDocsText(locale, context.intro)}</p>

      <div className="runtime-actions">
        <a className="runtime-button secondary" href={resolveDocsHref(locale, context.primary.href)}>
          {pickDocsText(locale, context.primary.label)}
        </a>
        <a className="runtime-button primary" href={getFreeMemberEntryUrl(locale)}>
          {locale === "vi" ? "Đăng ký thành viên" : "Register as a member"}
        </a>
      </div>

      <div className="runtime-docs-list">
        <a className="runtime-link-card" href={resolveDocsHref(locale, context.primary.href)}>
          <strong>{pickDocsText(locale, context.primary.label)}</strong>
          <span>{pickDocsText(locale, context.primary.summary)}</span>
        </a>
      </div>

      <div className="runtime-help-grid">
        <section>
          <h3>{locale === "vi" ? "Xem tiếp" : "Next steps"}</h3>
          <div className="runtime-docs-list">
            {context.secondary.map((link) => (
              <a className="runtime-link-card" href={resolveDocsHref(locale, link.href)} key={link.href}>
                <strong>{pickDocsText(locale, link.label)}</strong>
                <span>{pickDocsText(locale, link.summary)}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3>{locale === "vi" ? "Chuẩn bị hồ sơ" : "Prepare your profile"}</h3>
          <div className="runtime-docs-list">
            {context.roleGuides.map((link) => (
              <a className="runtime-link-card" href={resolveDocsHref(locale, link.href)} key={link.href}>
                <strong>{pickDocsText(locale, link.label)}</strong>
                <span>{pickDocsText(locale, link.summary)}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3>{locale === "vi" ? "Quy tắc nền" : "Core rules"}</h3>
          <div className="runtime-docs-list">
            {context.policyGuides.map((link) => (
              <a className="runtime-link-card" href={resolveDocsHref(locale, link.href)} key={link.href}>
                <strong>{pickDocsText(locale, link.label)}</strong>
                <span>{pickDocsText(locale, link.summary)}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3>{locale === "vi" ? "Mở rộng lớp truy cập" : "Open deeper access"}</h3>
          <div className="runtime-docs-list">
            {context.operatorGuides.map((link) => (
              <a className="runtime-link-card" href={resolveDocsHref(locale, link.href)} key={link.href}>
                <strong>{pickDocsText(locale, link.label)}</strong>
                <span>{pickDocsText(locale, link.summary)}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <p className="runtime-note">
        {locale === "vi"
          ? "Một số tài liệu chi tiết chỉ mở sau khi bạn hoàn tất hồ sơ cơ bản."
          : "Some detailed materials open only after you complete a basic profile."}
      </p>
      <a className="runtime-button secondary" href={localizePath("/join", locale)}>
        {locale === "vi" ? "Xem cách tham gia" : "See how to join"}
      </a>
    </section>
  );
}
