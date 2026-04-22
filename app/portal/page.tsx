import { currentDonor, donations, statements } from "@/lib/mock-data";
import { formatCurrency } from "@/components/currency";

export default function PortalPage() {
  const donorDonations = donations.filter((donation) => donation.donorId === currentDonor.id);
  const donorStatement = statements.find((statement) => statement.donorId === currentDonor.id);

  return (
    <div className="stack-xl">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Donor portal</p>
          <h1>
            {currentDonor.firstName} {currentDonor.lastName}
          </h1>
        </div>
        <p className="muted">View giving history, manage recurring gifts, and access tax statements.</p>
      </section>

      <div className="grid-3">
        <article className="card">
          <p className="eyebrow">Lifetime giving</p>
          <h3>{formatCurrency(currentDonor.lifetimeGiving)}</h3>
          <p className="muted">{currentDonor.email}</p>
        </article>
        <article className="card">
          <p className="eyebrow">Recurring status</p>
          <h3>{currentDonor.recurringStatus}</h3>
          <p className="muted">Connect this to Stripe Billing or a custom subscription manager.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Year-end statement</p>
          <h3>{donorStatement ? donorStatement.taxYear : "Not ready"}</h3>
          <p className="muted">
            {donorStatement
              ? `Delivery status: ${donorStatement.deliveryStatus}`
              : "Annual giving statements will appear here."}
          </p>
        </article>
      </div>

      <section className="card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Donation history</p>
            <h2>Past gifts</h2>
          </div>
        </div>
        <div className="table">
          <div className="table-row table-header">
            <span>Date</span>
            <span>Amount</span>
            <span>Fund</span>
            <span>Channel</span>
            <span>Receipt</span>
          </div>
          {donorDonations.map((donation) => (
            <div className="table-row" key={donation.id}>
              <span>{new Date(donation.donatedAt).toLocaleDateString("en-US")}</span>
              <span>{formatCurrency(donation.amount)}</span>
              <span>{donation.designation.label}</span>
              <span>{donation.channel}</span>
              <span>{donation.receiptSent ? "sent" : "pending"}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
