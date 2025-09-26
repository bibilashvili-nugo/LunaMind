// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  let profile;

  if (user.role === "STUDENT") {
    profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });
  } else if (user.role === "TEACHER") {
    profile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });
  }

  if (!profile || !profile.completed) {
    redirect("/onboarding");
  }

  return <DashboardClient user={user} />;
}
