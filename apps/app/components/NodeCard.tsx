import { Card } from "../../../packages/ui";

type NodeCardProps = {
  title: string;
  detail: string;
  meta: string;
};

export function NodeCard({ title, detail, meta }: NodeCardProps) {
  return (
    <Card className="app-card">
      <p className="app-card-meta">{meta}</p>
      <h2>{title}</h2>
      <p>{detail}</p>
    </Card>
  );
}
