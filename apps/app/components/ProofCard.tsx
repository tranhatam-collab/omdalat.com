import { Card } from "../../../packages/ui";
import { getRequestLocale } from "../lib/locale";

type ProofCardProps = {
  title: string;
  detail: string;
};

export async function ProofCard({ title, detail }: ProofCardProps) {
  const locale = await getRequestLocale();

  return (
    <Card className="app-proof-card">
      <p className="app-kicker">{locale === "vi" ? "Tín hiệu bằng chứng" : "Proof signal"}</p>
      <h2>{title}</h2>
      <p>{detail}</p>
    </Card>
  );
}
