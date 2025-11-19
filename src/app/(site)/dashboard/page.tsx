// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { StudentTeacherUser } from "../../../../types/dashboard";
import { Role } from "@prisma/client"; // import Role enum from Prisma

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Admin redirect
  if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
    redirect("/admin/dashboard");
  }

  let profile;

  if (user.role === Role.STUDENT) {
    profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });
  } else if (user.role === Role.TEACHER) {
    profile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });
  }

  // If profile is missing or not completed, redirect to onboarding
  if (!profile || !profile.completed) {
    redirect("/onboarding");
  }

  // At this point, user.role is guaranteed to be STUDENT or TEACHER
  const dashboardUser: StudentTeacherUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role as "STUDENT" | "TEACHER",
  };

  return <DashboardClient user={dashboardUser} />;
}
