import Link from "next/link";
import { CampaignCard } from "@/components/campaign-card";
import { DonationWidget } from "@/components/donation-widget";
import { campaigns } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="stack-xl">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Stripe + QuickBooks + Mailchimp</p>
          <h1>Donation infrastructure for campaigns, recurring giving, and donor stewardship.</h1>
          <p className="lead">
            This starter gives you the donor-facing embed, donor portal, admin dashboard, and
            backend shape needed to build a modern fundraising platform.
          </p>
          <div className="cta-row">
            <Link className="primary-button" href="/donate">
              Open donation flow
            </Link>
            <Link className="secondary-button" href="/admin">
              View admin dashboard
            </Link>
          </div>
        </div>
        <DonationWidget />
      </section>

      <section className="stack-md">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Campaigns</p>
            <h2>General fund plus campaign-specific giving</h2>
          </div>
          <p className="muted">Each campaign can expose a public progress bar tied to its fundraising goal.</p>
        </div>
        <div className="grid-3">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </div>
  );
}
