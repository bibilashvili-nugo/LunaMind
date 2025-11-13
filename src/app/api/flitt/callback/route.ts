// app/api/flitt/callback/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", JSON.stringify(body, null, 2));

    const paymentId = body.payment_id || body.order_id || "unknown";
    const status = body.status;
    const amount = body.amount;

    // ✅ სწორად ვიღებთ extraData-ს
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
      // ✅ ვალიდაცია - შევამოწმოთ რომ orderData არსებობს
      if (!orderData) {
        console.error("❌ orderData is undefined");
        return NextResponse.json(
          { error: "Missing orderData" },
          { status: 400 }
        );
      }

      if (
        !orderData.studentId ||
        !orderData.teacherId ||
        !orderData.subject ||
        !orderData.day ||
        !orderData.time ||
        !orderData.price
      ) {
        console.error("❌ Missing required fields in orderData:", orderData);
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      console.log("🔍 Checking if lesson exists...");

      // 1. მოვძებნოთ lesson
      const existingLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: orderData.teacherId,
          subject: orderData.subject,
          day: orderData.day,
          time: orderData.time,
        },
      });

      if (!existingLesson) {
        console.error("❌ Lesson not found");
        return NextResponse.json(
          { error: "Lesson not found" },
          { status: 404 }
        );
      }

      console.log("✅ Lesson found:", existingLesson.id);

      // 2. შევქმნათ bookedLesson
      console.log("📝 Creating booked lesson...");
      const bookedLesson = await prisma.bookedLesson.create({
        data: {
          studentId: orderData.studentId,
          teacherId: orderData.teacherId,
          subject: orderData.subject,
          day: orderData.day,
          date: existingLesson.date,
          time: orderData.time,
          price: orderData.price,
          duration: existingLesson.duration,
          comment: existingLesson.comment,
          link: existingLesson.link,
        },
      });

      console.log("✅ BookedLesson created:", bookedLesson.id);

      // 3. წავშალოთ lesson
      console.log("🗑️ Deleting lesson...");
      await prisma.lesson.delete({
        where: { id: existingLesson.id },
      });

      console.log("✅ Lesson deleted:", existingLesson.id);
      console.log("🎉 Successfully moved lesson to booked lessons!");
    }

    return NextResponse.json({
      message: "Callback processed successfully",
      paymentId,
      status,
    });
  } catch (error: unknown) {
    console.error("❌ Callback error:", error);

    if (error instanceof Error) {
      console.error("❌ Error details:", error.message);
      console.error("❌ Error stack:", error.stack);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
