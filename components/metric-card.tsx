interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
}

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <article className="card">
      <p className="eyebrow">{label}</p>
      <h3>{value}</h3>
      <p className="muted">{detail}</p>
    </article>
  );
}
