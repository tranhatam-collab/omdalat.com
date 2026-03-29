type SectionProps = {
  className?: string;
  children: any;
};

export function Section({ className, children }: SectionProps) {
  return <section className={className ? className : ""}>{children}</section>;
}
