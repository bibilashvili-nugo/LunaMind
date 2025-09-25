// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  console.log("🔍 Middleware triggered:", {
    pathname: url.pathname,
    hasToken: !!token,
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
    console.log("🔐 Verifying JWT with jose...");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    userId = payload.id as string;
    role = payload.role as "STUDENT" | "TEACHER";

    console.log("✅ JWT verified:", { userId, role });
  } catch (error) {
    console.log("❌ JWT verification failed:", error);
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // 3️⃣ თუ მომხმარებელი უკვე ავთენტიფიცირებულია და არის /login-ზე
  if (url.pathname === "/login" && userId) {
    console.log("✅ User already authenticated, checking profile status...");

    try {
      const profileCheck = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: { Cookie: req.cookies.toString() },
        }
      );

      if (profileCheck.ok) {
        const data = await profileCheck.json();

        if (data.completed) {
          console.log("✅ Profile completed - redirecting to dashboard");
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } else {
          console.log("📝 Profile not completed - redirecting to questions");
          return NextResponse.redirect(new URL("/questions", req.url));
        }
      }
    } catch (e) {
      console.error("❌ Profile check failed, defaulting to questions:", e);
      return NextResponse.redirect(new URL("/questions", req.url));
    }
  }

  // 4️⃣ Dashboard - შევამოწმოთ რომ მხოლოდ დასრულებული პროფილით შეუდის
  // middleware.ts - გაასწორე dashboard ლოგიკა
  if (url.pathname.startsWith("/dashboard") && userId && role) {
    try {
      console.log("📋 Checking profile completion for dashboard...");

      // ✅ დამატებითი delay, რომ DB-ს დრო მიეცეს განახლებისთვის
      await new Promise((resolve) => setTimeout(resolve, 100));

      const res = await fetch(
        `${
          process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_API_URL
        }/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: {
            Cookie: req.cookies.toString(),
            "Cache-Control": "no-cache",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("📊 Profile check result:", data);

        if (!data.completed) {
          console.log("❌ Profile not completed - redirecting to questions");
          return NextResponse.redirect(new URL("/questions", req.url));
        }
        console.log("✅ Profile completed - allowing dashboard access");
      } else {
        console.log("⚠️ Profile check failed, allowing access");
        // თუ check არ მუშაობს, ნება დართო წვდომას
        return NextResponse.next();
      }
    } catch (e) {
      console.error("❌ Profile check error, allowing access:", e);
      // თუ errorა, ნება დართო წვდომას
      return NextResponse.next();
    }
  }

  // 5️⃣ Questions - ყოველთვის უშვებთ, თუ ავთენტიფიცირებულია
  // (აქ არ არის საჭირო პროფილის შემოწმება, რადგან questions გვერდი არის პროფილის შესავსებად)

  console.log("✅ All checks passed - allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/questions/:path*", "/login"],
};
