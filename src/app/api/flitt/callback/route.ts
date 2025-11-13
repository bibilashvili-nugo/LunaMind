import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  console.log(1);
  try {
    const { searchParams } = new URL(req.url);

    // 🟣 Flitt-ის პარამეტრების ამოღება
    const orderStatus = searchParams.get("order_status");
    const responseStatus = searchParams.get("response_status");
    // const paymentId = searchParams.get("payment_id");
    // const orderId = searchParams.get("order_id");
    // const amount = searchParams.get("amount");

    // Extra data
    const extraDataParam = searchParams.get("extraData");
    let extraData = null;
    console.log(2);
    // 🧩 extraData-ის გაშიფვრა
    try {
      if (extraDataParam) {
        const decodedOnce = decodeURIComponent(extraDataParam);
        const decodedTwice = decodeURIComponent(decodedOnce);
        extraData = JSON.parse(decodedTwice);
        console.log("✅ Parsed extraData:", extraData);
      }
    } catch (e) {
      console.error("❌ Error parsing extraData:", e);
      console.log(3);
      // ვცადოთ backup parsing additional_info-დან
      const additionalInfo = searchParams.get("additional_info");
      if (additionalInfo) {
        try {
          const additionalInfoObj = JSON.parse(additionalInfo);
          if (
            additionalInfoObj.reservation_data &&
            additionalInfoObj.reservation_data !== "{}"
          ) {
            extraData = JSON.parse(additionalInfoObj.reservation_data);
          }
        } catch (parseError) {
          console.error("❌ Error parsing additional_info:", parseError);
        }
      }
    }
    console.log(4);
    // 🧠 შეამოწმე რომ გადახდა წარმატებულია
    if (orderStatus === "approved" && responseStatus === "success") {
      if (!extraData) {
        console.error("❌ No extraData found");
        console.log("🔍 All search params:", Object.fromEntries(searchParams));
        return NextResponse.redirect(
          new URL("/payment/error?reason=no_data", req.url)
        );
      }
      console.log(5);
      // 🧩 აუცილებელი ველების შემოწმება
      if (
        !extraData.lessonId ||
        !extraData.studentId ||
        !extraData.teacherProfileId
      ) {
        console.error("❌ Missing required fields in extraData:", extraData);
        return NextResponse.redirect(
          new URL("/payment/error?reason=missing_data", req.url)
        );
      }

      console.log("🔍 Checking if lesson exists...");
      console.log(6);
      // 1️⃣ მოვძებნოთ lesson
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: extraData.lessonId },
        include: { teacher: true },
      });

      if (!existingLesson) {
        console.error("❌ Lesson not found with ID:", extraData.lessonId);
        return NextResponse.redirect(
          new URL("/payment/error?reason=lesson_not_found", req.url)
        );
      }

      console.log("✅ Lesson found:", existingLesson.id);

      // 2️⃣ მოძებნე teacher-ის userId TeacherProfile-იდან
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { id: extraData.teacherProfileId },
        select: { userId: true },
      });
      console.log(7);
      if (!teacherProfile) {
        console.error(
          "❌ TeacherProfile not found for ID:",
          extraData.teacherProfileId
        );
        return NextResponse.redirect(
          new URL("/payment/error?reason=teacher_not_found", req.url)
        );
      }

      const teacherUserId = teacherProfile.userId;
      console.log(8);
      // 3️⃣ შევქმნათ bookedLesson
      console.log("📝 Creating booked lesson...");
      await prisma.bookedLesson.create({
        data: {
          studentId: extraData.studentId,
          teacherId: teacherUserId, // ✅ ეს უნდა იყოს User.id
          subject: existingLesson.subject,
          day: existingLesson.day,
          date: existingLesson.date,
          time: existingLesson.time,
          price: extraData.price || existingLesson.duration * 25,
          duration: existingLesson.duration,
          comment: existingLesson.comment,
          link: existingLesson.link,
        },
      });

      // 4️⃣ წავშალოთ Lesson

      await prisma.lesson.delete({
        where: { id: existingLesson.id },
      });
      console.log(9);
      console.log("✅ Lesson deleted:", existingLesson.id);
      console.log("🎉 Successfully moved lesson to booked lessons!");

      // ✅ Success redirect
      return NextResponse.redirect(new URL("/payment/success", req.url));
    } else {
      console.log("❌ Payment failed or not approved");
      return NextResponse.redirect(new URL("/payment/failed", req.url));
    }
  } catch (error: unknown) {
    console.error("💥 Callback error:", error);
    return NextResponse.redirect(new URL("/payment/error", req.url));
  }
}
