// app/api/students/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// app/api/students/profile/route.ts - გააკეთე უფრო სწრაფი
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, key, value, step, isLastQuestion } = body;

  const totalQuestions = 8;

  try {
    // ✅ გამოიყენე transaction სინქრონულობისთვის
    const result = await prisma.$transaction(async (tx) => {
      const newStep = isLastQuestion ? totalQuestions : step + 1;
      const completed = isLastQuestion;

      const profile = await tx.studentProfile.upsert({
        where: { userId },
        update: {
          [key]: value,
          currentStep: newStep,
          completed: completed,
          updatedAt: new Date(), // ✅ დროის სტამპი
        },
        create: {
          userId,
          [key]: value,
          currentStep: newStep,
          completed: completed,
        },
      });

      return { profile, completed };
    });

    console.log("✅ Profile transaction completed:", result.completed);

    return NextResponse.json({
      message: "შენახულია",
      profile: result.profile,
      completed: result.completed,
    });
  } catch (error) {
    console.error("❌ Database transaction error:", error);
    return NextResponse.json({ error: "დაფიქსირდა შეცდომა" }, { status: 500 });
  }
}
