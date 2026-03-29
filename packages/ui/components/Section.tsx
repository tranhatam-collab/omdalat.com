import type { ReactNode } from "react";

type SectionProps = {
  className?: string;
  children: ReactNode;
};

export function Section({ className, children }: SectionProps) {
  return <section className={className ? className : ""}>{children}</section>;
}
