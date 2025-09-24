// app/questions/page.tsx
import { getCurrentUser } from "@/lib/session";
import QuestionsClient from "./QuestionsClient";
import { prisma } from "@/lib/prisma";

export default async function QuestionsPage() {
  const user = await getCurrentUser();

  // ✅ მხოლოდ ძირითადი ავთენტიფიკაცია (რედირექტები მხოლოდ middleware-ში)
  if (!user) {
    return null; // ან loading spinner, middleware ავტომატურად გადამისამართებს
  }

  // ✅ პროფილის მონაცემები მხოლოდ რენდერისთვის (არა რედირექტებისთვის)
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

  // ❌ აღარ არის რედირექტები აქ - ეს ლოგიკა მხოლოდ middleware-შია

  return (
    <QuestionsClient
      userId={user.id}
      role={user.role}
      initialStep={currentStep}
    />
  );
}
