import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import LoginPageClient from "./LoginPageClient";
import { prisma } from "@/lib/prisma";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    const totalQuestions = user.role === "STUDENT" ? 8 : 6;
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

    if (currentStep >= totalQuestions - 1) {
      return redirect("/dashboard"); // ✅ აქვე გადავრჩებით
    }

    // თუ ჯერ კითხვები დასრულებული არაა, მაშინ გავუშვათ QuestionsPage
    return redirect("/questions");
  }

  return <LoginPageClient />;
}
