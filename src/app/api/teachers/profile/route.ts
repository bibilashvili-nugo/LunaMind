import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Step-by-step პასუხის შენახვა
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, key, value, step } = body;

  const profile = await prisma.teacherProfile.upsert({
    where: { userId },
    update: { [key]: value, currentStep: step },
    create: { userId, [key]: value, currentStep: step },
  });

  return NextResponse.json({ message: "შენახულია", profile });
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

  const profile = await prisma.teacherProfile.findUnique({ where: { userId } });

  return NextResponse.json({ profile });
}
