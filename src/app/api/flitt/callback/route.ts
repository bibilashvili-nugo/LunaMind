import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 🟣 Flitt აგზავნის JSON
    const body = await req.json();
    console.log(" 11111111111111111111111111შ✅ Received callback:", body);

    const orderStatus = body.order_status;
    const responseStatus = body.response_status;
    const paymentId = body.payment_id;
    const extraDataParam = body.merchant_data || body.additional_info;

    console.log("Order Status:", orderStatus);
    console.log("Response Status:", responseStatus);
    console.log("Payment ID:", paymentId);
    console.log("ExtraData param:", extraDataParam);

    // 🧩 extraData parsing
    let extraData = null;
    if (extraDataParam) {
      try {
        extraData = JSON.parse(extraDataParam);
      } catch (err) {
        console.error("❌ Error parsing extraData:", err);
      }
    }

    // ✅ შემოწმება, რომ გადახდა წარმატებულია
    if (orderStatus === "approved" && responseStatus === "success") {
      console.log("2222222222222222222✅ Payment approved");

      if (!extraData) {
        console.error("❌ No extraData found, stopping processing");
        return NextResponse.json(
          { message: "Callback received but no extraData" },
          { status: 200 } // Flitt არ გაიმეორებს
        );
      }

      // 🧩 საჭირო ველების შემოწმება
      if (
        !extraData.lessonId ||
        !extraData.studentId ||
        !extraData.teacherProfileId
      ) {
        console.error("❌ Missing required fields in extraData:", extraData);
        return NextResponse.json(
          { message: "Callback received but missing required fields" },
          { status: 200 } // Flitt არ გაიმეორებს
        );
      }
      console.log("33333333333333333333333333");
      // 1️⃣ მოძებნე Lesson
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: extraData.lessonId },
        include: { teacher: true },
      });
      console.log("444444444444444444444444");
      if (!existingLesson) {
        console.error("❌ Lesson not found with ID:", extraData.lessonId);
        return NextResponse.json(
          { message: "Callback received but lesson not found" },
          { status: 200 }
        );
      }
      console.log("555555555555555555555");
      // 2️⃣ მოძებნე TeacherProfile
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { id: extraData.teacherProfileId },
        select: { userId: true },
      });

      if (!teacherProfile) {
        console.error(
          "❌ TeacherProfile not found for ID:",
          extraData.teacherProfileId
        );
        return NextResponse.json(
          { message: "Callback received but teacher profile not found" },
          { status: 200 }
        );
      }

      const teacherUserId = teacherProfile.userId;
      console.log("666666666666666666666666");
      // 3️⃣ შექმენი BookedLesson
      await prisma.bookedLesson.create({
        data: {
          studentId: extraData.studentId,
          teacherId: teacherUserId,
          subject: existingLesson.subject,
          day: existingLesson.day,
          date: existingLesson.date,
          time: existingLesson.time,
          price: extraData.price,
          duration: existingLesson.duration,
          comment: existingLesson.comment,
          link: existingLesson.link,
        },
      });

      console.log(
        "7777777777777777777777777777✅ BookedLesson created successfully"
      );

      // 4️⃣ წაშალე Lesson
      await prisma.lesson.delete({ where: { id: existingLesson.id } });
      console.log(
        "88888888888888888888888✅ Lesson deleted:",
        existingLesson.id
      );

      console.log("🎉 Successfully moved lesson to booked lessons!");

      // 🟢 Flitt-თვის დაბრუნება 200 OK
      return NextResponse.json(
        { message: "Callback processed successfully" },
        { status: 200 }
      );
    } else {
      console.log("❌ Payment not approved or failed");
      return NextResponse.json(
        { message: "Payment not approved" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("💥 Callback error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
