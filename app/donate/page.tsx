import { DonationWidget } from "@/components/donation-widget";
import { CampaignCard } from "@/components/campaign-card";
import { campaigns } from "@/lib/mock-data";

export default function DonatePage() {
  return (
    <div className="stack-xl">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Donor experience</p>
          <h1>Embedded form or hosted page</h1>
        </div>
        <p className="muted">
          The same donation flow can power a full page, modal, or iframe embed on your public site.
        </p>
      </section>

      <div className="two-column">
        <DonationWidget />
        <section className="card stack-md">
          <p className="eyebrow">Implementation notes</p>
          <ul className="plain-list">
            <li>Submit donation intent to a Next.js API route.</li>
            <li>Create Stripe Checkout or Payment Element session server-side.</li>
            <li>Finalize receipts and syncs from Stripe webhook events.</li>
            <li>Track designation to general fund or a specific campaign.</li>
          </ul>
        </section>
      </div>

      <section className="grid-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </section>
    </div>
  );
}
