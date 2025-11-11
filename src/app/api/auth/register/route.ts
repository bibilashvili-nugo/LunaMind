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
  verifiedToken?: string;
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
    const verifiedToken = body.verifiedToken;

    // 1️⃣ Required fields
    if (!fullName || !role || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: "ყველა ველი სავალდებულოა" },
        { status: 400 }
      );
    }

    // 2️⃣ Check if email is verified via OTP
    if (!verifiedToken) {
      return NextResponse.json(
        { message: "გთხოვთ ჯერ დაადასტუროთ თქვენი მეილი" },
        { status: 400 }
      );
    }

    // 3️⃣ Verify the registration token
    const verification = await prisma.verificationToken.findFirst({
      where: {
        identifier: `verified_${email}`,
        token: verifiedToken,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "არასწორი ვერიფიკაციის კოდი" },
        { status: 400 }
      );
    }

    if (new Date() > verification.expires) {
      await prisma.verificationToken.deleteMany({
        where: { identifier: `verified_${email}` },
      });
      return NextResponse.json(
        { message: "ვერიფიკაციის ვადა გაუვიდა" },
        { status: 400 }
      );
    }

    // 4️⃣ Full name validation (at least 2 characters each)
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    if (firstName.length < 2 || lastName.length < 2) {
      return NextResponse.json(
        { message: "სახელი და გვარი უნდა იყოს მინიმუმ 2 ასო" },
        { status: 400 }
      );
    }

    // 5️⃣ Email validation
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "ელფოსტა არასწორია" },
        { status: 400 }
      );
    }

    // 6️⃣ Password strength
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ ასოს და ერთ ციფრს",
        },
        { status: 400 }
      );
    }

    // 7️⃣ Phone validation (digits only, 9-15 digits)
    if (!isValidPhone(phoneNumber)) {
      return NextResponse.json(
        { message: "ტელეფონი არასწორია" },
        { status: 400 }
      );
    }

    // 8️⃣ Terms & Privacy
    if (!acceptedTerms || !acceptedPrivacy) {
      return NextResponse.json(
        { message: "უნდა დაეთანხმო წესებს და პოლიტიკას" },
        { status: 400 }
      );
    }

    // 9️⃣ Check if email already exists (double check)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "ეს ელფოსტა უკვე გამოყენებულია" },
        { status: 400 }
      );
    }

    // 🔟 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣1️⃣ Create user
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
        emailVerified: new Date(), // Mark as verified since OTP was used
      },
    });

    // 1️⃣2️⃣ Create profile based on role
    if (role === "STUDENT") {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "TEACHER") {
      await prisma.teacherProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    // 1️⃣3️⃣ Clean up verification token
    await prisma.verificationToken.deleteMany({
      where: { identifier: `verified_${email}` },
    });

    // 1️⃣4️⃣ Remove sensitive info before sending to client
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
