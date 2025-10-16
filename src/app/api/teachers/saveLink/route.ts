import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { lessonId, link } = await req.json();

    if (!lessonId || !link)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // მოვძებნოთ გაკვეთილი
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { link: true },
    });

    if (!existingLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // თუ link უკვე არსებობს და იგივეა — არ განაახლოს
    if (existingLesson.link === link) {
      return NextResponse.json({
        success: true,
        message: "Link is already up to date",
      });
    }

    // თუ არ არსებობს ან განსხვავებულია — განაახლოს
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: { link },
    });

    return NextResponse.json({
      success: true,
      message: existingLesson.link
        ? "შეხვედრის ლინკი განახლდა"
        : "შეხვედრის ლინკი დაემატა",
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error("Error saving link:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
