export type FundDesignation =
  | { type: "general"; label: string }
  | { type: "campaign"; campaignId: string; label: string };

export type DonationFrequency = "one-time" | "monthly" | "quarterly" | "annual";
export type DonationSource = "embed" | "portal" | "admin" | "import";
export type DonationChannel = "card" | "ach" | "check" | "cash" | "external";

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  status: "active" | "completed" | "draft";
  featured: boolean;
}

export interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lifetimeGiving: number;
  recurringStatus: "active" | "paused" | "none";
  stripeCustomerId?: string;
  quickbooksCustomerId?: string;
  mailchimpMemberId?: string;
}

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  frequency: DonationFrequency;
  designation: FundDesignation;
  source: DonationSource;
  channel: DonationChannel;
  donatedAt: string;
  status: "succeeded" | "pending" | "failed";
  receiptSent: boolean;
}

export interface YearEndStatement {
  donorId: string;
  taxYear: number;
  totalAmount: number;
  generatedAt: string;
  deliveryStatus: "pending" | "sent" | "failed";
}

export interface IntegrationStatus {
  provider: "stripe" | "quickbooks" | "mailchimp";
  status: "connected" | "attention" | "disconnected";
  lastSync: string;
  detail: string;
}
