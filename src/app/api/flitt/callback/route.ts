import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", body);

    const paymentId = body["id-EIo08kPWD2"];
    const status = body["status"];
    const amount = body["amount"];

    console.log(
      "💰 Payment ID:",
      paymentId,
      "Status:",
      status,
      "Amount:",
      amount
    );

    // აქ შეგიძლია შენახვა Supabase ან სხვა DB-ში

    return NextResponse.json({
      message: "Callback received",
      paymentId,
      status,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Callback error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("❌ Callback unknown error:", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
