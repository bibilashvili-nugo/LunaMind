import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, key, value, step, isLastQuestion } = body;

    if (!userId || !key)
      return NextResponse.json(
        { error: "მონაცემები არასწორია" },
        { status: 400 }
      );

    const totalQuestions = 6; // შეგიძლია შეცვალო საჭიროებისამებრ

    // ✅ Transaction – თავიდან აიცილებს race condition-ს
    const result = await prisma.$transaction(async (tx) => {
      const newStep = isLastQuestion ? totalQuestions : step + 1;
      const completed = !!isLastQuestion;

      const profile = await tx.teacherProfile.upsert({
        where: { userId },
        update: {
          [key]: value,
          currentStep: newStep,
          completed,
          updatedAt: new Date(),
        },
        create: {
          userId,
          [key]: value,
          currentStep: newStep,
          completed,
        },
      });

      return { profile, completed };
    });

    console.log("✅ Teacher profile transaction completed:", result.completed);

    return NextResponse.json({
      message: "შენახულია",
      profile: result.profile,
      completed: result.completed,
    });
  } catch (error) {
    console.error("❌ Teacher transaction error:", error);
    return NextResponse.json({ error: "დაფიქსირდა შეცდომა" }, { status: 500 });
  }
}

// ✅ GET — წამოიღებს profile-ს userId-ით
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { message: "UserId აუცილებელია" },
        { status: 400 }
      );

    const profile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("❌ Teacher GET error:", error);
    return NextResponse.json({ error: "დაფიქსირდა შეცდომა" }, { status: 500 });
  }
}
