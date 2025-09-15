import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "ელფოსტა და პაროლი სავალდებულოა" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    // უბრალოდ სიმულაცია: შეგვინახავთ token-ს localStorage-ში client-side-ზე
    return NextResponse.json({
      message: "წარმატებით შედით",
      token: "demo-token",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}
