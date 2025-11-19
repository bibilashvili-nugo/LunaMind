// app/api/auth/admin-login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    // Check if user is admin or super_admin
    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { message: "არ გაქვთ ადმინის პრივილეგიები" },
        { status: 403 }
      );
    }

    // Check if user is active and not banned
    if (!user.isActive || user.banned) {
      return NextResponse.json(
        { message: "თქვენი ანგარიში დაბლოკილია" },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    // Create admin log
    await prisma.adminLog.create({
      data: {
        action: "ADMIN_LOGIN",
        userId: user.id,
        details: {
          ip: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent"),
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      isAdmin: true,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h") // Shorter expiration for admin sessions
      .sign(secret);

    const response = NextResponse.json({
      message: "წარმატებით შედით ადმინ პანელში",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // Set HttpOnly cookie
    response.cookies.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}
