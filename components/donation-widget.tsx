import { campaigns } from "@/lib/mock-data";

export function DonationWidget() {
  return (
    <section className="widget-shell">
      <div className="widget-header">
        <div>
          <p className="eyebrow">Embeddable donation form</p>
          <h2>Support the mission</h2>
        </div>
        <span className="pill pill-accent">website embed ready</span>
      </div>

      <form className="donation-form">
        <label>
          Donation amount
          <div className="amount-grid">
            {["25", "50", "100", "250"].map((value) => (
              <button type="button" className="amount-chip" key={value}>
                ${value}
              </button>
            ))}
          </div>
        </label>

        <label>
          Frequency
          <select defaultValue="monthly">
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </label>

        <label>
          Designation
          <select defaultValue="general-fund">
            <option value="general-fund">General Fund</option>
            {campaigns
              .filter((campaign) => campaign.slug !== "general-fund")
              .map((campaign) => (
                <option key={campaign.id} value={campaign.slug}>
                  {campaign.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Email address
          <input type="email" placeholder="donor@example.org" />
        </label>

        <button className="primary-button" type="submit">
          Continue to Stripe
        </button>
      </form>
    </section>
  );
}
