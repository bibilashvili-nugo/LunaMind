import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = (body.amount * 100 || 1000).toString(); // თეთრებში
    const currency = body.currency || "GEL";
    const order_desc = body.order_desc || "Lesson payment";

    const merchant_id = process.env.FLITT_MERCHANT_ID!;
    const secret = process.env.FLITT_SECRET_KEY!;
    const server_callback_url = `${process.env.NEXTAUTH_URL}/api/flitt/callback`;
    const order_id = `order_${Date.now()}`;

    // ✅ extraData უნდა იყოს ორჯერ encodeURIComponent-ით გადამუშავებული JSON string
    const extraDataString = encodeURIComponent(
      encodeURIComponent(JSON.stringify(body.extraData || {}))
    );

    // Signature ფორმირება (Flitt-ის მოთხოვნით)
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
        extraData: extraDataString, // ✅ ორჯერ encode
      },
    };

    console.log("🟣 Sending to Flitt - extraData (encoded):", extraDataString);

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

    if (data?.response?.checkout_url) {
      return NextResponse.json({
        success: true,
        checkoutUrl: data.response.checkout_url,
        orderId: order_id,
      });
    } else {
      console.error("❌ Flitt response error:", data);
      return NextResponse.json(
        { error: "Failed to create checkout URL", details: data },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("💥 createOrder error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
