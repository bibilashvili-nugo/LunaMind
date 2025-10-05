// app/dashboard/student-profile/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import PersonalInfo from "../../../../../components/student-profile/PersonalInfo";

export default async function StudentProfilePage() {
  const user = await getCurrentUser();

  // ✅ Server-side redirect if user not found
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        {/* 🔹 Reuse your existing NavBar with the same user */}
        <NavBar user={user} />
        <PersonalInfo user={user} />
      </div>
    </div>
  );
}
