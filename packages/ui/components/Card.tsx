type CardProps = {
  as?: "article" | "section" | "div";
  className?: string;
  children: any;
};

export function Card({ as = "article", className, children }: CardProps) {
  const Component = as;
  const cardClassName = className ? className : "";

  return <Component className={cardClassName}>{children}</Component>;
}
