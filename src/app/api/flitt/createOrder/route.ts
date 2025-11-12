import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = body.amount || 1000;
    const currency = body.currency || "GEL";
    const order_desc = body.order_desc || "Test payment";

    const merchant_id = process.env.FLITT_MERCHANT_ID;
    const secret = process.env.FLITT_SECRET_KEY;
    const server_callback_url = process.env.FLITT_CALLBACK_URL;
    const order_id = `order_${Date.now()}`;

    const signature = crypto
      .createHash("sha1")
      .update(`${merchant_id}${order_id}${amount}${currency}${secret}`)
      .digest("hex");

    const requestBody = {
      request: {
        server_callback_url,
        order_id,
        currency,
        merchant_id: Number(merchant_id),
        order_desc,
        amount,
        signature,
      },
    };

    console.log("Signature:", signature);
    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const flittRes = await fetch("https://pay.flitt.com/api/checkout/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const text = await flittRes.text();
    if (text.startsWith("<")) {
      console.error("❌ Flitt returned HTML:", text.slice(0, 200));
      return NextResponse.json(
        { error: "Flitt returned HTML – check signature/request" },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("💥 createOrder error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("💥 createOrder unknown error:", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
