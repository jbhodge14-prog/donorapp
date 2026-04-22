import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { campaigns, donations, integrationStatuses } from "@/lib/mock-data";
import { formatCurrency } from "@/components/currency";

export default function AdminPage() {
  const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const recurringCount = donations.filter((donation) => donation.frequency !== "one-time").length;
  const offlineCount = donations.filter(
    (donation) => donation.channel === "check" || donation.channel === "cash" || donation.channel === "external"
  ).length;

  return (
    <div className="stack-xl">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Operations, fundraising, and donor stewardship</h1>
        </div>
        <Link className="primary-button" href="/admin/offline">
          Record offline donation
        </Link>
      </section>

      <div className="grid-3">
        <MetricCard
          label="Raised to date"
          value={formatCurrency(totalRaised)}
          detail="Aggregate across online and offline donations."
        />
        <MetricCard
          label="Recurring gifts"
          value={String(recurringCount)}
          detail="Recurring commitments should reconcile against Stripe subscriptions."
        />
        <MetricCard
          label="Offline gifts"
          value={String(offlineCount)}
          detail="Manual gifts still affect donor history, statements, and campaign progress."
        />
      </div>

      <section className="card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Integrations</p>
            <h2>Provider health</h2>
          </div>
        </div>
        <div className="grid-3">
          {integrationStatuses.map((integration) => (
            <article className="subtle-panel" key={integration.provider}>
              <div className="card-header">
                <strong>{integration.provider}</strong>
                <span className="pill">{integration.status}</span>
              </div>
              <p className="muted">{integration.detail}</p>
              <p className="eyebrow">Last sync: {new Date(integration.lastSync).toLocaleString("en-US")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Campaign management</p>
            <h2>Funding progress</h2>
          </div>
        </div>
        <div className="table">
          <div className="table-row table-header">
            <span>Campaign</span>
            <span>Raised</span>
            <span>Goal</span>
            <span>Status</span>
          </div>
          {campaigns.map((campaign) => (
            <div className="table-row" key={campaign.id}>
              <span>{campaign.name}</span>
              <span>{formatCurrency(campaign.raisedAmount)}</span>
              <span>{formatCurrency(campaign.goalAmount)}</span>
              <span>{campaign.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
