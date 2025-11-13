// app/api/flitt/callback/route.ts - შეცვალე ასე
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// app/api/flitt/callback/route.ts
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
      if (!orderData) {
        console.error("❌ orderData is undefined");
        return NextResponse.json(
          { error: "Missing orderData" },
          { status: 400 }
        );
      }

      // ✅ დაამატე lessonId validation
      if (
        !orderData.lessonId ||
        !orderData.studentId ||
        !orderData.teacherProfileId
      ) {
        console.error("❌ Missing required fields:", orderData);
        return NextResponse.json(
          { error: "Missing lessonId, studentId or teacherProfileId" },
          { status: 400 }
        );
      }

      console.log("🔍 Checking if lesson exists...");

      // 1. მოვძებნოთ lesson
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: orderData.lessonId },
        include: {
          teacher: true, // User-ის ინფორმაციაც დაგვჭირდება
        },
      });

      if (!existingLesson) {
        console.error("❌ Lesson not found with ID:", orderData.lessonId);
        return NextResponse.json(
          { error: "Lesson not found" },
          { status: 404 }
        );
      }

      console.log("✅ Lesson found:", existingLesson.id);

      // 2. შევქმნათ bookedLesson - გამოიყენე სწორი teacherId (TeacherProfile ID)
      console.log("📝 Creating booked lesson...");
      const bookedLesson = await prisma.bookedLesson.create({
        data: {
          studentId: orderData.studentId,
          teacherId: orderData.teacherProfileId, // ✅ TeacherProfile ID
          subject: existingLesson.subject,
          day: existingLesson.day,
          date: existingLesson.date,
          time: existingLesson.time,
          price: orderData.price || existingLesson.duration * 25,
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
