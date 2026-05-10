import { Badge } from "../../../packages/ui";

type TrustBadgeProps = {
  label: string;
  score: number;
};

export function TrustBadge({ label, score }: TrustBadgeProps) {
  return (
    <Badge className="app-badge">
      <span>{label}</span>
      <strong>{score}/100</strong>
    </Badge>
  );
}
