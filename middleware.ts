import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // 1️⃣ თუ token არ არის → login
  if (!token) {
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/questions")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ decode JWT
  let userId: string | undefined;
  let role: "STUDENT" | "TEACHER" | undefined;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "STUDENT" | "TEACHER";
    };
    userId = decoded.id;
    role = decoded.role;
  } catch (error) {
    // ❗️წავშალოთ არასწორი ტოკენი
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // 3️⃣ თუ არ არის userId ან role → არასწორი ტოკენი
  if (!userId || !role) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // 4️⃣ Questions page - პროფილის შემოწმება
  if (url.pathname.startsWith("/questions")) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: { Cookie: req.cookies.toString() },
        }
      );

      if (!res.ok) throw new Error("Profile check failed");

      const data = await res.json();

      if (data.completed) {
        // ✅ პროფილი დასრულებულია → Questions page-ზე წვდომა აკრძალული
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (e) {
      console.error("Middleware check failed:", e);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // 5️⃣ Dashboard - როლის ბაზირებული წვდომა
  if (url.pathname.startsWith("/dashboard")) {
    // აქ შეგიძლიათ დაამატოთ როლის შემოწმებები საჭიროებისამებრ
    // მაგ: if (role !== "TEACHER" && url.pathname.startsWith("/dashboard/admin"))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/questions/:path*"],
};
