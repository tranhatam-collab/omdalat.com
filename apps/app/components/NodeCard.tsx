type NodeCardProps = {
  title: string;
  detail: string;
  meta: string;
};

export function NodeCard({ title, detail, meta }: NodeCardProps) {
  return (
    <article className="app-card">
      <p className="app-card-meta">{meta}</p>
      <h2>{title}</h2>
      <p>{detail}</p>
    </article>
  );
}
