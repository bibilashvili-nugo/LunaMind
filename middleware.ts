import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  console.log("🔍 Middleware triggered:", {
    pathname: url.pathname,
    hasToken: !!token,
    token: token ? "exists" : "missing",
  });

  // 1️⃣ თუ token არ არის → login
  if (!token) {
    console.log("❌ No token found");
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/questions")
    ) {
      console.log("🔒 Redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ decode JWT
  let userId: string | undefined;
  let role: "STUDENT" | "TEACHER" | undefined;

  try {
    console.log("🔐 Verifying JWT...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "STUDENT" | "TEACHER";
    };
    userId = decoded.id;
    role = decoded.role;
    console.log("✅ JWT verified:", { userId, role });
  } catch (error) {
    console.log("❌ JWT verification failed:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // 3️⃣ Questions page - პროფილის შემოწმება
  if (url.pathname.startsWith("/questions")) {
    console.log("📋 Checking profile completion...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: { Cookie: req.cookies.toString() },
        }
      );

      console.log("📊 Profile check response status:", res.status);

      if (!res.ok) throw new Error("Profile check failed");

      const data = await res.json();
      console.log("📋 Profile completion data:", data);

      if (data.completed) {
        console.log("✅ Profile completed - redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      console.log("📝 Profile not completed - allowing access");
    } catch (e) {
      console.error("❌ Profile check failed:", e);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  console.log("✅ All checks passed - allowing access");
  return NextResponse.next();
}
