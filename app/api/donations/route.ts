import { NextRequest, NextResponse } from "next/server";
import { createStripeCheckoutDonation, sendDonationReceipt } from "@/lib/integrations";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      amount?: number;
      frequency?: string;
      designation?: string;
    };

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: "Invalid donation amount." },
        { status: 400 }
      );
    }

    const checkout = await createStripeCheckoutDonation({
      donorEmail: body.email ?? "",
      amount: body.amount,
      frequency: body.frequency ?? "monthly",
      designationLabel: body.designation ?? "general-fund",
    });

    await sendDonationReceipt("pending-webhook-reconciliation");

    return NextResponse.json({
      url: checkout.checkoutUrl,
      checkout,
      note: "In production, send the receipt after webhook confirmation rather than immediately.",
    });
  } catch (error) {
    console.error("Donation checkout error:", error);

    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 }
    );
  }
}
