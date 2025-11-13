import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1️⃣ Flitt JSON
    const body = await req.json();
    console.log("111111111111111111 ✅ Received callback:", body);

    const orderStatus = body.order_status;
    const responseStatus = body.response_status;
    const paymentId = body.payment_id;
    const extraDataParam = body.merchant_data || body.additional_info;

    console.log("Order Status:", orderStatus);
    console.log("Response Status:", responseStatus);
    console.log("Payment ID:", paymentId);
    console.log("ExtraData param:", extraDataParam);

    // 2️⃣ extraData parsing
    let extraData = null;
    let reservationData = null;

    if (extraDataParam) {
      try {
        extraData = JSON.parse(extraDataParam);
        console.log("2222222222222222 ✅ Parsed extraData:", extraData);

        if (extraData.reservation_data) {
          reservationData = JSON.parse(extraData.reservation_data);
          console.log(
            "3333333333333333 ✅ Parsed reservationData:",
            reservationData
          );
        }
      } catch (err) {
        console.error("❌ Error parsing extraData or reservation_data:", err);
      }
    }

    // 3️⃣ გადახდის შემოწმება
    if (orderStatus === "approved" && responseStatus === "success") {
      console.log("44444444444444 ✅ Payment approved");

      if (!reservationData) {
        console.error("❌ No reservationData found, stopping processing");
        return NextResponse.json(
          { message: "Callback received but no reservationData" },
          { status: 200 }
        );
      }

      // 4️⃣ საჭირო ველების შემოწმება
      if (
        !reservationData.lessonId ||
        !reservationData.studentId ||
        !reservationData.teacherProfileId
      ) {
        console.error(
          "❌ Missing required fields in reservationData:",
          reservationData
        );
        return NextResponse.json(
          { message: "Callback received but missing required fields" },
          { status: 200 }
        );
      }
      console.log("55555555555555 ✅ Required fields present");

      // 5️⃣ მოძებნე Lesson
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: reservationData.lessonId },
        include: {
          teacher: true,
          TeacherProfile: {
            include: {
              teacherSubjects: true, // price აქედან
            },
          },
        },
      });
      console.log("66666666666666 ✅ Lesson fetch attempted");

      if (!existingLesson) {
        console.error("❌ Lesson not found with ID:", reservationData.lessonId);
        return NextResponse.json(
          { message: "Callback received but lesson not found" },
          { status: 200 }
        );
      }
      console.log("7777777777777 ✅ Lesson found:", existingLesson.id);

      // 6️⃣ მოძებნე TeacherProfile
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { id: reservationData.teacherProfileId },
        select: { userId: true },
      });

      if (!teacherProfile) {
        console.error(
          "❌ TeacherProfile not found for ID:",
          reservationData.teacherProfileId
        );
        return NextResponse.json(
          { message: "Callback received but teacher profile not found" },
          { status: 200 }
        );
      }
      const teacherUserId = teacherProfile.userId;
      console.log("888888888888 ✅ Teacher user ID found:", teacherUserId);

      // 7️⃣ price უსაფრთხოდ
      let price: number;
      if (reservationData.price) {
        price = reservationData.price;
      } else {
        // პირველი subject-ის price
        const teacherSubjects = existingLesson.TeacherProfile.teacherSubjects;
        price = teacherSubjects?.[0]?.price ?? 0;
      }
      console.log("9999999999 ✅ Price calculated:", price);

      // 8️⃣ BookedLesson შექმნა
      await prisma.bookedLesson.create({
        data: {
          studentId: reservationData.studentId,
          teacherId: teacherUserId,
          subject: existingLesson.subject,
          day: existingLesson.day,
          date: existingLesson.date,
          time: existingLesson.time,
          price,
          duration: existingLesson.duration,
          comment: existingLesson.comment,
          link: existingLesson.link,
        },
      });
      console.log("101010101010 ✅ BookedLesson created successfully");

      // 9️⃣ Lesson წაშლა
      await prisma.lesson.delete({ where: { id: existingLesson.id } });
      console.log("111111111111 ✅ Lesson deleted:", existingLesson.id);

      console.log("🎉 Successfully moved lesson to booked lessons!");

      // 10️⃣ Flitt 200 OK
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
