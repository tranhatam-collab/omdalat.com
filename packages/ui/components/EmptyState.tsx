type EmptyStateProps = {
  title: string;
  detail: string;
  className?: string;
};

export function EmptyState({ title, detail, className }: EmptyStateProps) {
  return (
    <div className={className ? className : ""}>
      <h2>{title}</h2>
      <p>{detail}</p>
    </div>
  );
}
