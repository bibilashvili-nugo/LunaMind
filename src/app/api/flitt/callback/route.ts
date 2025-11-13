// app/api/flitt/callback/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// app/api/flitt/callback/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", body);

    const status = body.status;
    const orderData = body.extraData || body.extra_data;

    console.log("🔹 Order data:", orderData);

    if (status === "success") {
      // ✅ ვალიდაცია - შევამოწმოთ რომ ყველა საჭირო ველი არსებობს
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

      // 1. ჯერ შევქმნათ bookedLesson
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

      console.log("✅ BookedLesson created");

      // 2. წავშალოთ lesson
      const deletedLesson = await prisma.lesson.delete({
        where: {
          id: orderData.lessonId,
          // დამატებითი ვალიდაცია - დარწმუნდეთ რომ ეს lesson სწორი მასწავლებლისაა
          teacherProfileId: orderData.teacherProfileId,
        },
      });

      console.log("✅ Lesson deleted:", deletedLesson.id);
    }

    return NextResponse.json({
      message: "Callback processed successfully",
      status: status,
    });
  } catch (error: unknown) {
    console.error("❌ Callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
