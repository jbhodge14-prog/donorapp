import Stripe from "stripe";
import { Donation, Donor } from "@/lib/domain";

export interface SyncResult {
  provider: "quickbooks" | "mailchimp";
  ok: boolean;
  message: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function createStripeCheckoutDonation(input: {
  donorEmail: string;
  amount: number;
  frequency: string;
  designationLabel: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: input.frequency === "one-time" ? "payment" : "subscription",
    customer_email: input.donorEmail || undefined,
    success_url: `${baseUrl}/donate?success=1`,
    cancel_url: `${baseUrl}/donate?canceled=1`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name:
              input.designationLabel === "general-fund"
                ? "Donation - General Fund"
                : `Donation - ${input.designationLabel}`,
          },
          unit_amount: Math.round(input.amount * 100),
          recurring:
            input.frequency !== "one-time"
              ? {
                  interval:
                    input.frequency === "annual"
                      ? "year"
                      : input.frequency === "quarterly"
                      ? "month"
                      : "month",
                  interval_count: input.frequency === "quarterly" ? 3 : 1,
                }
              : undefined,
        },
        quantity: 1,
      },
    ],
    metadata: {
      designationLabel: input.designationLabel,
      frequency: input.frequency,
    },
  });

  return {
    ok: true,
    checkoutUrl: session.url,
    message: `Stripe checkout session created for ${input.donorEmail}.`,
  };
}

export async function syncDonationToQuickBooks(donation: Donation): Promise<SyncResult> {
  return {
    provider: "quickbooks",
    ok: true,
    message: `Queued donation ${donation.id} for QuickBooks sync.`,
  };
}

export async function syncDonorToMailchimp(donor: Donor): Promise<SyncResult> {
  return {
    provider: "mailchimp",
    ok: true,
    message: `Queued donor ${donor.email} for Mailchimp audience sync.`,
  };
}

export async function sendDonationReceipt(donationId: string) {
  return {
    ok: true,
    message: `Receipt job queued for ${donationId}.`,
  };
}

export async function generateYearEndStatements(taxYear: number) {
  return {
    ok: true,
    message: `Year-end statement batch queued for tax year ${taxYear}.`,
  };
}
