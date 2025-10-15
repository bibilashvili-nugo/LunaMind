// app/api/teachers/updateProfile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { userId, data } = await req.json();

    // Destructure user vs teacher profile fields
    const { firstName, lastName, email, phoneNumber, TeacherProfile } = data;

    // Update main User fields if provided
    if (firstName || lastName || email || phoneNumber) {
      await prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName, email, phoneNumber },
      });
    }

    // Update TeacherProfile fields if provided
    if (TeacherProfile) {
      await prisma.teacherProfile.update({
        where: { userId },
        data: TeacherProfile,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update teacher profile:", err);
    return NextResponse.json(
      { error: "Failed to update teacher profile" },
      { status: 500 }
    );
  }
}
