import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Subject {
  name: string;
  price: number;
}

interface PostBody {
  userId: string;
  key: keyof TeacherProfileInput | "subjects"; // გავუშვათ მხოლოდ teacherProfile-ის ველები
  value: string | number | Subject[];
  step: number;
}

// ტიპი teacherProfile update-ისთვის (subjects ცალკე უნდა მოიხსნა)
type TeacherProfileInput = {
  age?: number;
  country?: string;
  city?: string;
  address?: string;
  profession?: string;
  education?: "BACHELOR" | "MASTER" | "DOCTORATE" | "OTHER";
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();
    const { userId, key, value, step } = body;

    if (!userId)
      return NextResponse.json(
        { error: "UserId აუცილებელია" },
        { status: 400 }
      );

    let profile = await prisma.teacherProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.teacherProfile.create({ data: { userId } });
    }

    if (key === "subjects") {
      const subjects = value as Subject[];
      if (!Array.isArray(subjects) || subjects.length === 0)
        return NextResponse.json(
          { error: "გთხოვთ აირჩიოთ საგნები" },
          { status: 400 }
        );

      for (const s of subjects) {
        if (!s.name || s.name.trim() === "")
          return NextResponse.json(
            { error: "ყველა საგანს უნდა ჰქონდეს სახელი" },
            { status: 400 }
          );
        if (!s.price || s.price <= 0)
          return NextResponse.json(
            { error: `საგანს ${s.name} უნდა ჰქონდეს სწორი ფასი` },
            { status: 400 }
          );
      }

      await prisma.teacherSubject.deleteMany({
        where: { teacherId: profile.id },
      });

      const createSubjects = subjects.map((s) => ({
        teacherId: profile.id,
        name: s.name,
        price: s.price,
      }));

      await prisma.teacherSubject.createMany({ data: createSubjects });
    } else {
      // value ახლა შესაძლოა string | number იყოს, შესაბამისად cast
      const updateData: TeacherProfileInput & { currentStep: number } = {
        currentStep: step + 1,
      };

      if (typeof value === "string" || typeof value === "number") {
        updateData[key as keyof TeacherProfileInput] = value as never;
      }

      await prisma.teacherProfile.update({
        where: { userId },
        data: updateData,
      });
    }

    const totalSteps = 7;
    if (step + 1 >= totalSteps) {
      await prisma.teacherProfile.update({
        where: { userId },
        data: { completed: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("TeacherProfile POST error:", err);
    return NextResponse.json({ error: "სერვერის შეცდომა" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json(
        { error: "UserId აუცილებელია" },
        { status: 400 }
      );

    const profile = await prisma.teacherProfile.findUnique({
      where: { userId },
      include: { teacherSubjects: true },
    });

    if (!profile)
      return NextResponse.json(
        { error: "პროფილი ვერ მოიძებნა" },
        { status: 404 }
      );

    return NextResponse.json({ profile });
  } catch (err) {
    console.error("TeacherProfile GET error:", err);
    return NextResponse.json({ error: "სერვერის შეცდომა" }, { status: 500 });
  }
}
