// app/api/students/profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ ინტერფეისები ტიპებისთვის
interface StudentProfileUpdateData {
  educationLevel?: string;
  desiredSubjects?: string[];
  reason?: string;
  hasOtherCourses?: boolean;
  usageFrequency?: string;
  preferredLessonType?: string;
  discoverySource?: string;
  currentStep: number;
  completed: boolean;
  updatedAt: Date;
}

interface ApiRequestBody {
  userId: string;
  step: number;
  isLastQuestion: boolean;
  answers?: {
    educationLevel?: string;
    desiredSubjects?: string | string[];
    reason?: string;
    hasOtherCourses?: string | boolean;
    usageFrequency?: string;
    preferredLessonType?: string;
    discoverySource?: string;
    [key: string]: unknown;
  };
}

// ✅ მხოლოდ სტრინგი ველების ტიპი
type StringFields = Pick<
  StudentProfileUpdateData,
  | "educationLevel"
  | "reason"
  | "usageFrequency"
  | "preferredLessonType"
  | "discoverySource"
>;

export async function POST(req: Request) {
  try {
    const body: ApiRequestBody = await req.json();
    const { userId, step, isLastQuestion, answers } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId არ არის მითითებული" },
        { status: 400 }
      );
    }

    const totalQuestions = 8;

    // ✅ უსაფრთხო ტიპების დამუშავება სპეციფიკური ინტერფეისით
    const updateData: StudentProfileUpdateData = {
      currentStep: isLastQuestion ? totalQuestions : (step || 0) + 1,
      completed: Boolean(isLastQuestion),
      updatedAt: new Date(),
    };

    if (answers) {
      // ✅ desiredSubjects - String[]-ში კონვერტაცია
      if (answers.desiredSubjects !== undefined) {
        if (typeof answers.desiredSubjects === "string") {
          updateData.desiredSubjects = [answers.desiredSubjects];
        } else if (Array.isArray(answers.desiredSubjects)) {
          updateData.desiredSubjects = answers.desiredSubjects;
        } else {
          updateData.desiredSubjects = [];
        }
      }

      // ✅ Boolean ველების დამუშავება
      if (answers.hasOtherCourses !== undefined) {
        updateData.hasOtherCourses =
          answers.hasOtherCourses === "კი" || answers.hasOtherCourses === true;
      }

      // ✅ მხოლოდ სტრინგი ველების დამუშავება
      const stringFields: (keyof StringFields)[] = [
        "educationLevel",
        "reason",
        "usageFrequency",
        "preferredLessonType",
        "discoverySource",
      ];

      stringFields.forEach((field) => {
        const value = answers[field];
        if (value !== undefined && value !== null) {
          // ✅ ახლა TypeScript იცის, რომ ეს ველი არის string | undefined
          updateData[field] = String(value);
        }
      });
    }

    console.log("📝 Update data for student profile:", {
      userId,
      step,
      isLastQuestion,
      updateData,
    });

    // ✅ Transaction-ის გამოყენება
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.studentProfile.upsert({
        where: { userId },
        update: updateData,
        create: {
          userId,
          ...updateData,
          desiredSubjects: updateData.desiredSubjects || [],
          completed: Boolean(updateData.completed),
          currentStep: updateData.currentStep || 1,
        },
      });

      return profile;
    });

    console.log("✅ Student profile saved successfully:", {
      id: result.id,
      currentStep: result.currentStep,
      completed: result.completed,
      desiredSubjects: result.desiredSubjects,
    });

    return NextResponse.json({
      message: "პროფილი წარმატებით შენახულია",
      profile: result,
      completed: result.completed,
    });
  } catch (error) {
    console.error("❌ Database transaction error:", error);
    return NextResponse.json(
      {
        error: "დაფიქსირდა შეცდომა პროფილის შენახვისას",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
