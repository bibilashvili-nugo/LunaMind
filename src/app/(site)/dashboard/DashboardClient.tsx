// app/dashboard/DashboardClient.tsx
"use client";

import { useRouter } from "next/navigation";

interface DashboardClientProps {
  user: {
    id: string;
    firstName: string;
    role: string;
  };
}

const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="px-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.firstName}! You are logged in.</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardClient;
