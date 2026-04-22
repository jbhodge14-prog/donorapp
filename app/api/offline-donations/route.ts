import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    donation: {
      id: "offline_mock_001",
      ...body
    },
    note: "Persist this in the database and trigger downstream receipt and bookkeeping workflows."
  });
}
