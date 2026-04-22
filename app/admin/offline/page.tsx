export default function OfflineDonationPage() {
  return (
    <div className="stack-xl">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Offline donation entry</p>
          <h1>Record checks, cash, ACH, and other non-web gifts</h1>
        </div>
      </section>

      <form className="card form-grid">
        <label>
          Donor email
          <input type="email" placeholder="donor@example.org" />
        </label>
        <label>
          Amount
          <input type="number" min="1" step="1" placeholder="250" />
        </label>
        <label>
          Channel
          <select defaultValue="check">
            <option value="check">Check</option>
            <option value="cash">Cash</option>
            <option value="ach">ACH</option>
            <option value="external">External processor</option>
          </select>
        </label>
        <label>
          Designation
          <select defaultValue="general">
            <option value="general">General Fund</option>
            <option value="community-health-expansion">Community Health Expansion</option>
            <option value="youth-scholarship-fund">Youth Scholarship Fund</option>
          </select>
        </label>
        <label>
          Gift date
          <input type="date" />
        </label>
        <label>
          Receipt workflow
          <select defaultValue="send">
            <option value="send">Send receipt</option>
            <option value="skip">Skip receipt</option>
          </select>
        </label>
        <label className="full-span">
          Notes
          <textarea rows={5} placeholder="Check number, batch, campaign notes, or acknowledgment details." />
        </label>
        <button className="primary-button" type="submit">
          Save offline donation
        </button>
      </form>
    </div>
  );
}
