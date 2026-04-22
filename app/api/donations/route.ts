import { NextRequest, NextResponse } from "next/server";
import { createStripeCheckoutDonation, sendDonationReceipt } from "@/lib/integrations";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    donorEmail: string;
    amount: number;
    frequency: string;
    designationLabel: string;
  };

  const checkout = await createStripeCheckoutDonation(body);
  const receipt = await sendDonationReceipt("pending-webhook-reconciliation");

  return NextResponse.json({
    checkout,
    receipt,
    note: "In production, send the receipt after webhook confirmation rather than immediately."
  });
}
