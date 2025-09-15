// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // აიღე token cookie-სგან
  const token = req.cookies.get("token");

  // თუ user არაა logged in და ცდილობს dashboard-ზე წვდომას
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
