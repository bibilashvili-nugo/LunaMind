// app/questions/page.tsx
import { getCurrentUser } from "@/lib/session";
import QuestionsClient from "./QuestionsClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function QuestionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  let currentStep = 0;
  if (user.role === "STUDENT") {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });
    currentStep = profile?.currentStep ?? 0;
  } else if (user.role === "TEACHER") {
    const profile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });
    currentStep = profile?.currentStep ?? 0;
  }

  return (
    <QuestionsClient
      userId={user.id}
      role={user.role}
      initialStep={currentStep}
    />
  );
}
