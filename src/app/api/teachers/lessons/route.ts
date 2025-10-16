// app/api/teachers/lessons/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { date: "asc" },
      include: { teacher: true },
    });

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
