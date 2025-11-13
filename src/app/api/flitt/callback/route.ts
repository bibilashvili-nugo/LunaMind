// app/api/flitt/callback/route.ts
import { prisma } from "@/lib/prisma";
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
      // ✅ ვალიდაცია
      if (!orderData?.lessonId) {
        console.error("❌ Missing lessonId in orderData");
        return NextResponse.json(
          { error: "Missing lessonId" },
          { status: 400 }
        );
      }

      if (!orderData?.teacherProfileId) {
        console.error("❌ Missing teacherProfileId in orderData");
        return NextResponse.json(
          { error: "Missing teacherProfileId" },
          { status: 400 }
        );
      }

      console.log("🔍 Checking if lesson exists...");

      // ჯერ შევამოწმოთ რომ lesson არსებობს
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: orderData.lessonId },
      });

      if (!existingLesson) {
        console.error("❌ Lesson not found:", orderData.lessonId);

        // ✅ შევამოწმოთ უკვე არსებობს თუ არა bookedLesson
        const existingBookedLesson = await prisma.bookedLesson.findFirst({
          where: {
            studentId: orderData.studentId,
            teacherId: orderData.teacherId,
            subject: orderData.subject,
            day: orderData.day,
            time: orderData.time,
          },
        });

        if (existingBookedLesson) {
          console.log("✅ BookedLesson already exists, skipping...");
          return NextResponse.json({
            message: "BookedLesson already exists",
            paymentId,
            status,
          });
        }

        return NextResponse.json(
          { error: "Lesson not found" },
          { status: 404 }
        );
      }

      console.log("✅ Lesson found:", existingLesson);

      // 1. შევქმნათ bookedLesson
      console.log("📝 Creating booked lesson...");
      const bookedLesson = await prisma.bookedLesson.create({
        data: {
          studentId: orderData.studentId,
          teacherId: orderData.teacherId,
          subject: orderData.subject,
          day: orderData.day,
          time: orderData.time,
          price: orderData.price,
          date: orderData.date ? new Date(orderData.date) : new Date(),
          duration: orderData.duration || null,
          comment: orderData.comment || null,
          link: orderData.link || null,
        },
      });

      console.log("✅ BookedLesson created:", bookedLesson.id);

      // 2. წავშალოთ lesson
      console.log("🗑️ Deleting lesson...");
      const deletedLesson = await prisma.lesson.delete({
        where: {
          id: orderData.lessonId,
        },
      });

      console.log("✅ Lesson deleted:", deletedLesson.id);
      console.log("🎉 Successfully moved lesson to booked lessons!");
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

    if (error instanceof Error) {
      console.error("❌ Error details:", error.message);
      console.error("❌ Error stack:", error.stack);

      // Unique constraint error (უკვე არსებობს)
      if (
        error.message.includes("Unique constraint") ||
        error.message.includes("P2002")
      ) {
        console.log(
          "ℹ️ BookedLesson already exists, this is normal for duplicate callbacks"
        );
        return NextResponse.json({
          message: "BookedLesson already exists",
        });
      }

      // Record not found (lesson უკვე წაშლილია)
      if (
        error.message.includes("Record to delete does not exist") ||
        error.message.includes("P2025")
      ) {
        console.log(
          "ℹ️ Lesson already deleted, this is normal for duplicate callbacks"
        );
        return NextResponse.json({
          message: "Lesson already deleted",
        });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
