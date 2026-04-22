import { Donation, Donor } from "@/lib/domain";

export interface SyncResult {
  provider: "quickbooks" | "mailchimp";
  ok: boolean;
  message: string;
}

export async function createStripeCheckoutDonation(input: {
  donorEmail: string;
  amount: number;
  frequency: string;
  designationLabel: string;
}) {
  return {
    ok: true,
    checkoutUrl: "/donate?status=mock-checkout-created",
    message: `Stripe checkout session would be created for ${input.donorEmail}.`
  };
}

export async function syncDonationToQuickBooks(donation: Donation): Promise<SyncResult> {
  return {
    provider: "quickbooks",
    ok: true,
    message: `Queued donation ${donation.id} for QuickBooks sync.`
  };
}

export async function syncDonorToMailchimp(donor: Donor): Promise<SyncResult> {
  return {
    provider: "mailchimp",
    ok: true,
    message: `Queued donor ${donor.email} for Mailchimp audience sync.`
  };
}

export async function sendDonationReceipt(donationId: string) {
  return {
    ok: true,
    message: `Receipt job queued for ${donationId}.`
  };
}

export async function generateYearEndStatements(taxYear: number) {
  return {
    ok: true,
    message: `Year-end statement batch queued for tax year ${taxYear}.`
  };
}
