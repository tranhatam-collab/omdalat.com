type BadgeProps = {
  className?: string;
  children: any;
};

export function Badge({ className, children }: BadgeProps) {
  return <div className={className ? className : ""}>{children}</div>;
}
