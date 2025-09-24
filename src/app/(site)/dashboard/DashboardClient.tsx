// app/dashboard/DashboardClient.tsx
"use client";

interface DashboardClientProps {
  user: {
    id: string;
    firstName: string;
    role: string;
  };
}

const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">
            Welcome, <strong>{user.firstName}</strong>! You are logged in as a{" "}
            <strong>{user.role.toLowerCase()}</strong>.
          </p>
          <p className="text-green-600 mb-4">
            {" ✅ Your profile is complete and you're ready to start!"}
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
