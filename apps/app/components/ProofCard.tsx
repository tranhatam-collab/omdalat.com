type ProofCardProps = {
  title: string;
  detail: string;
};

export function ProofCard({ title, detail }: ProofCardProps) {
  return (
    <article className="app-proof-card">
      <p className="app-kicker">Proof signal</p>
      <h2>{title}</h2>
      <p>{detail}</p>
    </article>
  );
}
