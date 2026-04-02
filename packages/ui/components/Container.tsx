type ContainerProps = {
  className?: string;
  children: any;
};

export function Container({ className, children }: ContainerProps) {
  return <div className={className ? className : ""}>{children}</div>;
}
