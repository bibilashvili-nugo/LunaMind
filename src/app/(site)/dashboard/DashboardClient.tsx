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
  // const handleLogout = async () => {
  //   try {
  //     await fetch("/api/auth/logout", { method: "POST" });
  //     window.location.href = "/login";
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   }
  // };

  if (user.role === "STUDENT") {
    return (
      <div className="bg-[#F6F5FA]">
        <StudentPage user={user} />
      </div>
    );
  } else if (user.role === "TEACHER") {
    return (
      <div className="bg-[#F6F5FA]">
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

{
  /* <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button> */
}
