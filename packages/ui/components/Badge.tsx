import type { ReactNode } from "react";

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export function Badge({ className, children }: BadgeProps) {
  return <div className={className ? className : ""}>{children}</div>;
}
