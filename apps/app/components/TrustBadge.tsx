type TrustBadgeProps = {
  label: string;
  score: number;
};

export function TrustBadge({ label, score }: TrustBadgeProps) {
  return (
    <div className="app-badge">
      <span>{label}</span>
      <strong>{score}/100</strong>
    </div>
  );
}
