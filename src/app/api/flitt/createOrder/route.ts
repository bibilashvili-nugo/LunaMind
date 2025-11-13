// app/api/flitt/createOrder/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = (body.amount * 100 || 1000).toString();
    const currency = body.currency || "GEL";
    const order_desc = body.order_desc || "Test payment";

    const merchant_id = process.env.FLITT_MERCHANT_ID!;
    const secret = process.env.FLITT_SECRET_KEY!;
    const server_callback_url = `${process.env.NEXTAUTH_URL}/api/flitt/callback`;
    const order_id = `order_${Date.now()}`;

    // ✅ extraData-ის JSON-ად გადაქცევა სტრინგში
    const extraDataString = JSON.stringify(body.extraData || {});

    // Signature string
    const signatureString = `${secret}|${amount}|${currency}|${merchant_id}|${order_desc}|${order_id}|${server_callback_url}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const requestBody = {
      request: {
        server_callback_url,
        order_id,
        currency,
        merchant_id,
        order_desc,
        amount,
        signature,
        extraData: extraDataString, // ✅ გაგზავნე როგორც JSON string
      },
    };

    console.log("🟣 Sending to Flitt - extraData:", extraDataString);

    const flittRes = await fetch("https://pay.flitt.com/api/checkout/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await flittRes.json();
    console.log("🟣 Flitt API Response:", data);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("💥 createOrder error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
