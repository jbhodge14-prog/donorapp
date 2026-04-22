import { Campaign } from "@/lib/domain";
import { formatCurrency } from "@/components/currency";
import { ProgressBar } from "@/components/progress-bar";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="card">
      <div className="card-header">
        <span className="pill">{campaign.status}</span>
        {campaign.featured ? <span className="pill pill-accent">featured</span> : null}
      </div>
      <h3>{campaign.name}</h3>
      <p className="muted">{campaign.description}</p>
      <ProgressBar value={campaign.raisedAmount} goal={campaign.goalAmount} />
      <div className="stat-row">
        <strong>{formatCurrency(campaign.raisedAmount)}</strong>
        <span className="muted">of {formatCurrency(campaign.goalAmount)}</span>
      </div>
    </article>
  );
}
