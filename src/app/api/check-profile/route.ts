import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const role = searchParams.get("role"); // STUDENT ან TEACHER

  if (!userId || !role) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  let profile = null;

  if (role === "STUDENT") {
    profile = await prisma.studentProfile.findUnique({
      where: { userId },
    });
  } else if (role === "TEACHER") {
    profile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });
  }

  if (!profile) {
    return NextResponse.json({ exists: false, completed: false });
  }

  return NextResponse.json({
    exists: true,
    completed: profile.currentStep >= 7, // მაგ: თუ STUDENT-ის 8 კითხვა გაქვს
    currentStep: profile.currentStep,
  });
}
