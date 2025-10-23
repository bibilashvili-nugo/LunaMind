// app/api/book-lesson/[booked-lessons]/route.ts
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const teacherId = url.searchParams.get("teacherId");

    console.log(
      "🔍 API called with studentId:",
      studentId,
      "teacherId:",
      teacherId
    );

    if (!studentId && !teacherId) {
      return NextResponse.json(
        { error: "studentId ან teacherId სავალდებულოა" },
        { status: 400 }
      );
    }

    const whereClause: Prisma.BookedLessonWhereInput = {};

    if (studentId) {
      whereClause.studentId = studentId;
      const studentExists = await prisma.user.findUnique({
        where: { id: studentId },
      });
      if (!studentExists) {
        return NextResponse.json(
          { error: "სტუდენტი არ არსებობს" },
          { status: 400 }
        );
      }
    }

    if (teacherId) {
      whereClause.teacherId = teacherId;
      const teacherExists = await prisma.user.findUnique({
        where: { id: teacherId },
      });
      if (!teacherExists) {
        return NextResponse.json(
          { error: "მასწავლებელი არ არსებობს" },
          { status: 400 }
        );
      }
    }

    const bookedLessons = await prisma.bookedLesson.findMany({
      where: whereClause,
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true, // ✅ სურათი დაემატა
          },
        },
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true, // ✅ სურათი დაემატა
          },
        },
      },
      orderBy: { date: "asc" },
    });

    console.log("📚 All booked lessons:", bookedLessons);

    const now = new Date();

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
