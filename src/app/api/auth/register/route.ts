// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";

interface RegisterRequest {
  fullName: string;
  role: Role;
  email: string;
  phoneNumber: string;
  password: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

export async function POST(req: Request) {
  try {
    const body: RegisterRequest = await req.json();

    const {
      fullName,
      role,
      email,
      phoneNumber,
      password,
      acceptedTerms,
      acceptedPrivacy,
    } = body;

    // Validate required fields
    if (!fullName || !role || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: "ყველა ველი სავალდებულოა" },
        { status: 400 }
      );
    }

    if (!acceptedTerms || !acceptedPrivacy) {
      return NextResponse.json(
        { message: "უნდა დაეთანხმო წესებს და პოლიტიკას" },
        { status: 400 }
      );
    }

    // Split full name
    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ") || "";

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "ეს ელფოსტა უკვე გამოყენებულია" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        role,
        firstName,
        lastName,
        email,
        phoneNumber,
        passwordHash: hashedPassword,
        acceptedTerms,
        acceptedPrivacy,
      },
    });

    // Remove sensitive info before sending to client
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    return NextResponse.json(
      { message: "რეგისტრაცია წარმატებულია", user: safeUser },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error(err);
    const message =
      err instanceof Error ? err.message : "უცნობი სერვერის შეცდომა";

    return NextResponse.json({ message }, { status: 500 });
  }
}
