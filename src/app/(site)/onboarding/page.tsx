// app/onboarding/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import QuestionsClient from "../questions/QuestionsClient";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // ✅ მიმდინარე პროგრესის მიღება
  let profile;
  let currentStep = 0;

  if (user.role === "STUDENT") {
    profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });
  } else if (user.role === "TEACHER") {
    profile = await prisma.teacherProfile.findUnique({
      where: { userId: user.id },
    });
  }

  // ✅ თუ პროფილი უკვე დასრულებულია, გადაამისამართეთ დაშბორდზე
  if (profile?.completed) {
    redirect("/dashboard");
  }

  // ✅ მიმდინარე სტეპის დაყენება
  if (profile?.currentStep) {
    currentStep = profile.currentStep;
  }

  return (
    <QuestionsClient
      userId={user.id}
      role={user.role}
      initialStep={currentStep}
    />
  );
}
