import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 🟣 Flitt-ის მონაცემები მოდის URL encoded form data-ს სახით
    const formData = await req.formData();

    // 🟣 პარამეტრების ამოღება formData-დან
    const orderStatus = formData.get("order_status") as string;
    const responseStatus = formData.get("response_status") as string;
    const paymentId = formData.get("payment_id") as string;

    console.log("1 - POST callback received");
    console.log("Order Status:", orderStatus);
    console.log("Response Status:", responseStatus);
    console.log("Payment ID:", paymentId);

    // Extra data - Flitt-ში extraData მოდის როგორც ჩვეულებრივი პარამეტრი
    const extraDataParam = formData.get("extraData") as string;
    let extraData = null;
    console.log("2 - ExtraData param:", extraDataParam);

    // 🧩 extraData-ის გაშიფვრა
    try {
      if (extraDataParam) {
        // ცადეთ პირდაპირ JSON.parse (თუ არ არის URL encoded)
        extraData = JSON.parse(extraDataParam);
        console.log("✅ Direct JSON parse worked:", extraData);
      }
    } catch (directError) {
      console.log("❌ Direct parse failed, trying URL decode");
      try {
        if (extraDataParam) {
          // URL decode და მერე JSON parse
          const decoded = decodeURIComponent(extraDataParam);
          extraData = JSON.parse(decoded);
          console.log("✅ URL decode + JSON parse worked:", extraData);
        }
      } catch (urlDecodeError) {
        console.error("❌ URL decode also failed:", urlDecodeError);

        // ვცადოთ backup parsing additional_info-დან
        const additionalInfo = formData.get("additional_info") as string;
        if (additionalInfo) {
          try {
            const additionalInfoObj = JSON.parse(additionalInfo);
            if (
              additionalInfoObj.reservation_data &&
              additionalInfoObj.reservation_data !== "{}"
            ) {
              extraData = JSON.parse(additionalInfoObj.reservation_data);
              console.log("✅ Found extraData in additional_info:", extraData);
            }
          } catch (parseError) {
            console.error("❌ Error parsing additional_info:", parseError);
          }
        }
      }
    }

    console.log("3 - Final extraData:", extraData);

    // 🧠 შეამოწმე რომ გადახდა წარმატებულია
    if (orderStatus === "approved" && responseStatus === "success") {
      if (!extraData) {
        console.error("❌ No extraData found");
        console.log("🔍 All formData entries:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        return NextResponse.redirect(
          new URL("/payment/error?reason=no_data", req.url)
        );
      }

      console.log("4 - Payment approved, processing...");

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

      console.log("5 - All required fields present");
      console.log("🔍 Checking if lesson exists...");

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

      console.log("6 - Lesson found:", existingLesson.id);

      // 2️⃣ მოძებნე teacher-ის userId TeacherProfile-იდან
      const teacherProfile = await prisma.teacherProfile.findUnique({
        where: { id: extraData.teacherProfileId },
        select: { userId: true },
      });

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
      console.log("7 - Teacher user ID found:", teacherUserId);

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

      console.log("8 - BookedLesson created successfully");

      // 4️⃣ წავშალოთ Lesson
      await prisma.lesson.delete({
        where: { id: existingLesson.id },
      });

      console.log("9 - Lesson deleted:", existingLesson.id);
      console.log("🎉 Successfully moved lesson to booked lessons!");

      // ✅ Success redirect
      return NextResponse.redirect(new URL("/payment/success", req.url));
    } else {
      console.log("❌ Payment failed or not approved");
      console.log(
        "Order Status:",
        orderStatus,
        "Response Status:",
        responseStatus
      );
      return NextResponse.redirect(new URL("/payment/failed", req.url));
    }
  } catch (error: unknown) {
    console.error("💥 Callback error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.redirect(new URL("/payment/error", req.url));
  }
}
