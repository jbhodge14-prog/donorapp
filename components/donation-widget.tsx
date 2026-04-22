"use client";

import { useState } from "react";
import { campaigns } from "@/lib/mock-data";

const presetAmounts = [25, 50, 100, 250];

export function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [designation, setDesignation] = useState("general-fund");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);

    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setSelectedAmount(parsed);
    }

    if (value === "") {
      setSelectedAmount(0);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select or enter a donation amount.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedAmount,
          frequency,
          designation,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("No checkout URL returned.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="widget-shell widget-shell-dark">
      <div className="widget-header">
        <div>
          <p className="eyebrow">Embeddable donation form</p>
          <h2>Support the mission</h2>
        </div>
        <span className="pill pill-accent">Secure checkout</span>
      </div>

      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Donation amount</label>

          <div className="amount-grid">
            {presetAmounts.map((value) => {
              const isSelected = customAmount === "" && selectedAmount === value;

              return (
                <button
                  type="button"
                  className={`amount-chip ${isSelected ? "is-selected" : ""}`}
                  key={value}
                  onClick={() => handlePresetClick(value)}
                >
                  ${value}
                </button>
              );
            })}
          </div>

          <p className="selected-amount">
            Selected donation:{" "}
            <strong>{selectedAmount > 0 ? `$${selectedAmount}` : "None"}</strong>
          </p>
        </div>

        <div className="field-group">
          <label htmlFor="customAmount">Custom amount</label>
          <input
            id="customAmount"
            type="number"
            min="1"
            step="1"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="frequency">Frequency</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="general-fund">General Fund</option>
            {campaigns
              .filter((campaign) => campaign.slug !== "general-fund")
              .map((campaign) => (
                <option key={campaign.id} value={campaign.slug}>
                  {campaign.name}
                </option>
              ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="donor@example.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="primary-button primary-button-dark" type="submit" disabled={isLoading}>
          {isLoading ? "Redirecting..." : "Continue to Stripe"}
        </button>
      </form>
    </section>
  );
}