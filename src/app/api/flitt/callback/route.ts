// app/api/flitt/callback/route.ts - შეცვალე ასე
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Flitt-ის პარამეტრების ამოღება URL-დან
    const orderStatus = searchParams.get("order_status");
    const responseStatus = searchParams.get("response_status");
    const paymentId = searchParams.get("payment_id");
    const orderId = searchParams.get("order_id");
    const amount = searchParams.get("amount");

    // extraData ამოღება - ეს არის ცალკე პარამეტრი
    const extraDataParam = searchParams.get("extraData");
    let extraData = null;

    console.log("🟣 Flitt GET callback received:");
    console.log("Order Status:", orderStatus);
    console.log("Response Status:", responseStatus);
    console.log("Payment ID:", paymentId);
    console.log("Order ID:", orderId);
    console.log("Amount:", amount);
    console.log("Extra Data Parameter:", extraDataParam);

    try {
      if (extraDataParam) {
        // URL decode და JSON parse
        const decodedData = decodeURIComponent(extraDataParam);
        extraData = JSON.parse(decodedData);
        console.log("✅ Parsed extraData:", extraData);
      }
    } catch (e) {
      console.error("❌ Error parsing extraData:", e);
      // ვცადოთ დამატებითი ინფორმაციიდან ამოღება
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

    // დავრწმუნდეთ რომ გადახდა წარმატებულია
    if (orderStatus === "approved" && responseStatus === "success") {
      if (!extraData) {
        console.error("❌ No extraData found");
        console.log("🔍 All search params:", Object.fromEntries(searchParams));
        return NextResponse.redirect(
          new URL("/payment/error?reason=no_data", req.url)
        );
      }

      // ✅ დაამატე lessonId validation
      if (
        !extraData.lessonId ||
        !extraData.studentId ||
        !extraData.teacherProfileId
      ) {
        console.error("❌ Missing required fields:", extraData);
        return NextResponse.redirect(
          new URL("/payment/error?reason=missing_data", req.url)
        );
      }

      console.log("🔍 Checking if lesson exists...");

      // 1. მოვძებნოთ lesson
      const existingLesson = await prisma.lesson.findUnique({
        where: { id: extraData.lessonId },
        include: {
          teacher: true,
        },
      });

      if (!existingLesson) {
        console.error("❌ Lesson not found with ID:", extraData.lessonId);
        return NextResponse.redirect(
          new URL("/payment/error?reason=lesson_not_found", req.url)
        );
      }

      console.log("✅ Lesson found:", existingLesson.id);

      // 2. შევქმნათ bookedLesson
      console.log("📝 Creating booked lesson...");
      const bookedLesson = await prisma.bookedLesson.create({
        data: {
          studentId: extraData.studentId,
          teacherId: extraData.teacherProfileId,
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

      console.log("✅ BookedLesson created:", bookedLesson.id);

      // 3. წავშალოთ lesson
      console.log("🗑️ Deleting lesson...");
      await prisma.lesson.delete({
        where: { id: existingLesson.id },
      });

      console.log("✅ Lesson deleted:", existingLesson.id);
      console.log("🎉 Successfully moved lesson to booked lessons!");

      // Redirect to success page
      return NextResponse.redirect(new URL("/payment/success", req.url));
    } else {
      console.log("❌ Payment failed or pending");
      return NextResponse.redirect(new URL("/payment/failed", req.url));
    }
  } catch (error: unknown) {
    console.error("❌ Callback error:", error);
    return NextResponse.redirect(new URL("/payment/error", req.url));
  }
}
