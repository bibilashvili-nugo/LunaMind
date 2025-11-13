import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🟣 Flitt callback received:", body);

    const paymentId = body.payment_id || body.order_id || "unknown";
    console.log("🔹 Full callback body:", JSON.stringify(body, null, 2));
    const status = body["status"];
    const amount = body["amount"];

    const orderData = body.extraData;
    console.log("🔹 Order data:", orderData);

    console.log(
      "💰 Payment ID:",
      paymentId,
      "Status:",
      status,
      "Amount:",
      amount
    );
    // აქ შეგიძლია შენახვა Supabase ან სხვა DB-ში

    if (status === "success") {
      console.log("🔥 ნუგო, მიყვარხარ!");
      await prisma.bookedLesson.create({
        data: {
          studentId: orderData.studentId,
          teacherId: orderData.teacherId,
          subject: orderData.subject,
          day: orderData.day,
          time: orderData.time,
          price: orderData.price,
          date: new Date(), // ან თუ Lessons-ში კონკრეტული date გაქვს, გამოიყენე
          duration: orderData.duration || null,
          comment: orderData.comment || null,
          link: orderData.link || null,
        },
      });

      // 2️⃣ Optional: Lessons table-დან წაშლა თუ გინდა
      await prisma.lesson.delete({
        where: { id: orderData.lessonId },
      });

      console.log(
        "✅ Lesson booked successfully for studentId:",
        orderData.studentId
      );
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
