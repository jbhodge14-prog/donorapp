import { NextRequest, NextResponse } from "next/server";
import { donations, currentDonor } from "@/lib/mock-data";
import { syncDonationToQuickBooks, syncDonorToMailchimp } from "@/lib/integrations";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    syncQuickBooks?: boolean;
    syncMailchimp?: boolean;
  };

  const results = [];

  if (body.syncQuickBooks) {
    results.push(await syncDonationToQuickBooks(donations[0]));
  }

  if (body.syncMailchimp) {
    results.push(await syncDonorToMailchimp(currentDonor));
  }

  return NextResponse.json({ ok: true, results });
}
