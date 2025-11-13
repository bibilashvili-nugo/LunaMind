// app/api/flitt/callback/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", JSON.stringify(body, null, 2));

    const paymentId = body.payment_id || body.order_id || "unknown";
    const status = body.status;
    const amount = body.amount;

    const orderData = body.extraData || body.extra_data;
    console.log("🔹 Order data from callback:", orderData);

    console.log(
      "💰 Payment ID:",
      paymentId,
      "Status:",
      status,
      "Amount:",
      amount
    );

    if (status === "success") {
      // ✅ Flitt-ის გადახდის შემდეგ გამოვიძახოთ შენი არსებული book-lesson API
      const bookLessonResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/book-lesson`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: orderData.studentId,
            teacherId: orderData.teacherId,
            subject: orderData.subject,
            day: orderData.day,
            time: orderData.time,
            price: orderData.price,
            // lessonId არ გჭირდება, რადგან შენს API-ს findFirst-ით პოულობს lesson-ს
          }),
        }
      );

      const bookLessonResult = await bookLessonResponse.json();

      if (!bookLessonResponse.ok) {
        console.error("❌ Book lesson failed:", bookLessonResult.error);
        return NextResponse.json(
          {
            error: bookLessonResult.error || "გაკვეთილის დაჯავშნა ვერ მოხერხდა",
          },
          { status: 400 }
        );
      }

      console.log("✅ Book lesson successful:", bookLessonResult);
    } else {
      console.log("❌ Payment status not success:", status);
    }

    return NextResponse.json({
      message: "Callback processed successfully",
      paymentId,
      status,
    });
  } catch (error: unknown) {
    console.error("❌ Callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
