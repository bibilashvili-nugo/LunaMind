// app/dashboard/DashboardClient.tsx
"use client";

import StudentPage from "../../../../components/dashboard/StudentPage";
import TeacherProfile from "../../../../components/dashboard/TeacherProfile";

type Role = "STUDENT" | "TEACHER";

interface DashboardClientProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
  };
}

const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  if (user.role === "STUDENT") {
    return (
      <div className="bg-[#F6F5FA] h-screen">
        <StudentPage user={user} />
      </div>
    );
  } else if (user.role === "TEACHER") {
    return (
      <div className="bg-[#F6F5FA] h-screen">
        <TeacherProfile user={user} />
      </div>
    );
  } else {
    return (
      <div>
        <div>not found</div>
      </div>
    );
  }
};

export default DashboardClient;
