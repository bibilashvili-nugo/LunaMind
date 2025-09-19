// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { emailRegex, isValidPassword, isValidPhone } from "@/utils/validation";

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

    // Trim inputs
    const fullName = body.fullName.trim();
    const email = body.email.trim().toLowerCase();
    const phoneNumber = body.phoneNumber.trim();
    const password = body.password;
    const role = body.role;
    const acceptedTerms = body.acceptedTerms;
    const acceptedPrivacy = body.acceptedPrivacy;

    // 1️⃣ Required fields
    if (!fullName || !role || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: "ყველა ველი სავალდებულოა" },
        { status: 400 }
      );
    }

    // 2️⃣ Full name validation (at least 2 characters each)
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    if (firstName.length < 2 || lastName.length < 2) {
      return NextResponse.json(
        { message: "სახელი და გვარი უნდა იყოს მინიმუმ 2 ასო" },
        { status: 400 }
      );
    }

    // 3️⃣ Email validation
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "ელფოსტა არასწორია" },
        { status: 400 }
      );
    }

    // 4️⃣ Password strength
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ ასოს და ერთ ციფრს",
        },
        { status: 400 }
      );
    }

    // 5️⃣ Phone validation (digits only, 9-15 digits)
    if (!isValidPhone(phoneNumber)) {
      return NextResponse.json(
        { message: "ტელეფონი არასწორია" },
        { status: 400 }
      );
    }

    // 6️⃣ Terms & Privacy
    if (!acceptedTerms || !acceptedPrivacy) {
      return NextResponse.json(
        { message: "უნდა დაეთანხმო წესებს და პოლიტიკას" },
        { status: 400 }
      );
    }

    // 7️⃣ Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "ეს ელფოსტა უკვე გამოყენებულია" },
        { status: 400 }
      );
    }

    // 8️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 9️⃣ Create user
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

    //  🔒 Remove sensitive info before sending to client
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
