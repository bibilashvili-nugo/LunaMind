// app/api/students/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: თუ დააჭირა "შემდეგი", ინახავს პასუხს და currentStep-ს
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, key, value, step, isLastQuestion } = body;

  // განვსაზღვროთ სულ რამდენი კითხვაა
  const totalQuestions = 8; // STUDENT-ისთვის

  // განვსაზღვროთ არის თუ არა პროფილი დასრულებული
  const completed = isLastQuestion || step >= totalQuestions - 1;

  const profile = await prisma.studentProfile.upsert({
    where: { userId },
    update: {
      [key]: value,
      currentStep: step + 1, // ✅ step + 1 უნდა იყოს, არა step
      completed: completed, // ✅ მონიშნეთ როგორც დასრულებული თუ ბოლო კითხვაა
    },
    create: {
      userId,
      [key]: value,
      currentStep: step + 1,
      completed: completed,
    },
  });

  return NextResponse.json({
    message: "შენახულია",
    profile,
    completed: completed, // ✅ დაბრუნება client-ისთვის
  });
}

// GET: წამოიღებს profile + currentStep
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId)
    return NextResponse.json(
      { message: "UserId აუცილებელია" },
      { status: 400 }
    );

  const profile = await prisma.studentProfile.findUnique({ where: { userId } });

  return NextResponse.json({ profile });
}
