// app/api/flitt/callback/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", body);

    const paymentId = body.payment_id || body.order_id || "unknown";
    const status = body.status;
    const amount = body.amount;

    // ✅ სწორად ვიღებთ extraData-ს
    const orderData = body.extraData || body.extra_data;
    console.log("🔹 Order data:", orderData);

    console.log(
      "💰 Payment ID:",
      paymentId,
      "Status:",
      status,
      "Amount:",
      amount
    );

    if (status === "success") {
      // ✅ დარწმუნდი რომ lessonId არსებობს
      if (!orderData?.lessonId) {
        console.error("❌ Missing lessonId in orderData");
        return NextResponse.json(
          { error: "Missing lessonId" },
          { status: 400 }
        );
      }

      // 1. შევქმნათ bookedLesson
      await prisma.bookedLesson.create({
        data: {
          studentId: orderData.studentId,
          teacherId: orderData.teacherId,
          subject: orderData.subject,
          day: orderData.day,
          time: orderData.time,
          price: orderData.price,
          date: orderData.date || new Date(),
          duration: orderData.duration || null,
          comment: orderData.comment || null,
          link: orderData.link || null,
        },
      });

      // 2. წავშალოთ lesson
      await prisma.lesson.delete({
        where: { id: orderData.lessonId },
      });

      console.log("✅ Lesson successfully moved to booked lessons");
    }

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
