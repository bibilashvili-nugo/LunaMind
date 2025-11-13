// app/api/teachers/[id]/profile/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: params.id },
      select: { id: true },
    });

    if (!teacherProfile) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ teacherProfileId: teacherProfile.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get teacher profile" },
      { status: 500 }
    );
  }
}
