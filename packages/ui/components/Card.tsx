import type { ReactNode } from "react";

type CardProps = {
  as?: "article" | "section" | "div";
  className?: string;
  children: ReactNode;
};

export function Card({ as = "article", className, children }: CardProps) {
  const Component = as;
  const cardClassName = className ? className : "";

  return <Component className={cardClassName}>{children}</Component>;
}
