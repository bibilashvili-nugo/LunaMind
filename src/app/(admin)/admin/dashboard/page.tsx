"use client";

import {
  House01,
  UsersGroup,
  Settings,
  BookOpen,
  LogOut,
} from "react-coolicons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const menuItems = [
    { icon: <House01 />, label: "Dashboard", active: true, color: "#CB3CFF" },
    { icon: <UsersGroup />, label: "Users", active: false, color: "#AEB9E1" },
    { icon: <BookOpen />, label: "Courses", active: false, color: "#AEB9E1" },
    { icon: <BookOpen />, label: "Analytics", active: false, color: "#AEB9E1" },
    {
      icon: <BookOpen />,
      label: "Messages",
      active: false,
      color: "#AEB9E1",
    },
    { icon: <BookOpen />, label: "Payments", active: false, color: "#AEB9E1" },
    { icon: <Settings />, label: "Settings", active: false, color: "#AEB9E1" },
  ];

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-admin", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // If not authenticated, redirect to admin login
          router.push("/admin");
          return;
        }

        const userData = await res.json();
        setUser(userData.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/admin-logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/admin");
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen bg-[#081028] flex justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#081028] grid grid-cols-5 px-4 py-4 gap-4">
      {/* Sidebar */}
      <div className="bg-[#0A1330] col-span-1 rounded-2xl p-6 shadow-2xl border border-[#1A2450] flex flex-col">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Evectus</h1>
          <p className="text-[#AEB9E1] text-sm mt-1">AdminPanel</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                item.active
                  ? "bg-[#CB3CFF]/10 border border-[#CB3CFF]/20 shadow-lg shadow-[#CB3CFF]/5"
                  : "hover:bg-[#1A2450] hover:border hover:border-[#2D3A6E]"
              }`}
            >
              <div
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  item.active ? "scale-110" : ""
                }`}
                style={{ color: item.active ? item.color : "#AEB9E1" }}
              >
                {item.icon}
              </div>
              <p
                className={`text-base font-semibold transition-all duration-200 ${
                  item.active
                    ? "text-[#CB3CFF] drop-shadow-lg"
                    : "text-[#AEB9E1] group-hover:text-white"
                }`}
              >
                {item.label}
              </p>

              {/* Active indicator */}
              {item.active && (
                <div className="ml-auto w-2 h-2 bg-[#CB3CFF] rounded-full shadow-lg shadow-[#CB3CFF]"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section - User Profile & Logout */}
        <div className="space-y-4 pt-6 border-t border-[#1A2450]">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1A2450] cursor-pointer hover:bg-[#2D3A6E] transition-all duration-200">
            <div className="w-10 h-10 bg-gradient-to-br from-[#CB3CFF] to-[#6C63FF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.firstName?.[0] || "A"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Admin User"}
              </p>
              <p className="text-[#AEB9E1] text-xs capitalize">
                {user?.role?.toLowerCase().replace("_", " ") || "Super Admin"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300 transition-all duration-200 group"
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              <LogOut />
            </div>
            <p className="text-base font-semibold">Log Out</p>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-[#0A1330] to-[#151F45] col-span-4 rounded-2xl shadow-2xl border border-[#1A2450] p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1A2450] border border-[#2D3A6E] rounded-xl px-4 py-2 text-white placeholder-[#AEB9E1] focus:outline-none focus:ring-2 focus:ring-[#CB3CFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content will go here */}
        <div className="text-center mt-20">
          <p className="text-[#AEB9E1] text-lg">Welcome to Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
