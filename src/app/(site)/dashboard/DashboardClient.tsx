// app/dashboard/DashboardClient.tsx
"use client";

import StudentPage from "../../../../components/dashboard/StudentPage";
import TeacherProfile from "../../../../components/dashboard/TeacherProfile";
import { DashboardUser } from "../../../../types/dashboard";

// Type guards for specific roles
const isStudent = (
  user: DashboardUser
): user is DashboardUser & { role: "STUDENT" } => {
  return user.role === "STUDENT";
};

const isTeacher = (
  user: DashboardUser
): user is DashboardUser & { role: "TEACHER" } => {
  return user.role === "TEACHER";
};

interface DashboardClientProps {
  user: DashboardUser;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  if (isStudent(user)) {
    // აქ user.role არის "STUDENT"
    return (
      <div className="bg-[#F6F5FA] h-screen">
        <StudentPage user={user} />
      </div>
    );
  } else if (isTeacher(user)) {
    // აქ user.role არის "TEACHER"
    return (
      <div className="bg-[#F6F5FA] h-screen">
        <TeacherProfile user={user} />
      </div>
    );
  } else if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/dashboard";
    }
    return (
      <div className="bg-[#F6F5FA] h-screen flex justify-center items-center">
        <div className="text-xl">გადამისამართება ადმინ პანელზე...</div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#F6F5FA] h-screen flex justify-center items-center">
        <div className="text-xl">როლი არ მოიძებნა</div>
      </div>
    );
  }
};

export default DashboardClient;
