// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // ✅ Server-side redirect
  if (!user) {
    redirect("/login");
  }

  return <DashboardClient user={user} />;
}
