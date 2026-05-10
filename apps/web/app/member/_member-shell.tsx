import type { ReactNode } from "react";
import type { OmdalatLocale } from "../../../../packages/core";
import { pickLocalized, type LocalizedText } from "../../lib/i18n-copy";

export type MemberAction = {
  href: string;
  label: LocalizedText;
  variant?: "primary" | "secondary";
};

type MemberShellProps = {
  locale: OmdalatLocale;
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  actions?: MemberAction[];
  note?: LocalizedText;
  children: ReactNode;
};

export function MemberShell({ locale, eyebrow, title, intro, actions, note, children }: MemberShellProps) {
  return (
    <article className="runtime-page">
      <p className="runtime-kicker">{pickLocalized(locale, eyebrow)}</p>
      <h1>{pickLocalized(locale, title)}</h1>
      <p>{pickLocalized(locale, intro)}</p>

      {actions && actions.length > 0 ? (
        <div className="runtime-actions">
          {actions.map((action) => (
            <a className={`runtime-button ${action.variant ?? "secondary"}`} href={action.href} key={action.href}>
              {pickLocalized(locale, action.label)}
            </a>
          ))}
        </div>
      ) : null}

      {note ? <p className="runtime-note">{pickLocalized(locale, note)}</p> : null}

      {children}
    </article>
  );
}

