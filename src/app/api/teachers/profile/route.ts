// app/api/teachers/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, key, value, step, isLastQuestion } = body;

  const totalQuestions = 5; // TEACHER-ისთვის (teacherQuestions.length)

  // ✅ სწორი ლოგიკა
  const newStep = isLastQuestion ? totalQuestions : step + 1;
  const completed = isLastQuestion;

  console.log("👨‍🏫 Teacher API:", { step, isLastQuestion, newStep, completed });

  const profile = await prisma.teacherProfile.upsert({
    where: { userId },
    update: {
      [key]: value,
      currentStep: newStep,
      completed: completed,
    },
    create: {
      userId,
      [key]: value,
      currentStep: newStep,
      completed: completed,
    },
  });

  return NextResponse.json({
    message: "შენახულია",
    profile,
    completed: completed,
  });
}
