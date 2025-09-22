// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const Dashboard = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Wait a tiny bit to let middleware handle redirect
//     setLoading(false);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="px-4 pt-8 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <p>Welcome! You are logged in.</p>
//       <button
//         onClick={handleLogout}
//         className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;

import { getCurrentUser } from "@/lib/session";
import QuestionsClient from "./QuestionsClient";
import { redirect } from "next/navigation";

export default async function QuestionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <QuestionsClient userId={user.id} role={user.role} />;
}
