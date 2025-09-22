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
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ თუ Questions page → შევამოწმოთ profile დასრულებულია თუ არა
  if (url.pathname.startsWith("/questions") && userId && role) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: { Cookie: req.cookies.toString() },
        }
      );
      const data = await res.json();

      if (data.completed) {
        // ✅ უკვე დასრულებულია → user Questions page-ს ვერ ნახავს
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (e) {
      console.error("Middleware check failed:", e);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 4️⃣ Dashboard → უბრალოდ შემოვუშვა, თუ token არსებობს
  if (url.pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/questions/:path*"],
};
