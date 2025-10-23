// app/api/book-lesson/[booked-lessons]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    console.log("🔍 API called with studentId:", studentId);

    if (!studentId) {
      return NextResponse.json(
        { error: "studentId სავალდებულოა" },
        { status: 400 }
      );
    }

    // სტუდენტი არსებობს?
    const studentExists = await prisma.user.findUnique({
      where: { id: studentId },
    });

    console.log("👤 Student exists:", studentExists);

    if (!studentExists) {
      return NextResponse.json(
        { error: "სტუდენტი არ არსებობს" },
        { status: 400 }
      );
    }

    // ჩანიშნული გაკვეთილები
    const bookedLessons = await prisma.bookedLesson.findMany({
      where: { studentId },
      include: {
        teacher: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
      orderBy: { date: "asc" },
    });

    console.log("📚 All booked lessons:", bookedLessons);

    const now = new Date();
    console.log("⏰ Current time:", now);

    // მხოლოდ მომავალი გაკვეთილები
    const futureLessons = bookedLessons.filter(
      (lesson) => new Date(lesson.date) >= now
    );

    console.log("🚀 Future lessons:", futureLessons);

    return NextResponse.json(futureLessons);
  } catch (error: unknown) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
