// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "ელფოსტა და პაროლი სავალდებულოა" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json(
//         { message: "არასწორი ელფოსტა ან პაროლი" },
//         { status: 401 }
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { message: "არასწორი ელფოსტა ან პაროლი" },
//         { status: 401 }
//       );
//     }

//     // ✅ Generate a real JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "7d" } // token expires in 7 days
//     );

//     return NextResponse.json({
//       message: "წარმატებით შედით",
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("📩 Login attempt:", email);

    if (!email || !password) {
      return NextResponse.json(
        { message: "ელფოსტა და პაროლი სავალდებულოა" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return NextResponse.json(
        { message: "არასწორი ელფოსტა ან პაროლი" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("⚠️ JWT_SECRET is missing in production!");
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login success:", email);

    return NextResponse.json({
      message: "წარმატებით შედით",
      token,
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    return NextResponse.json({ message: "სერვერის შეცდომა" }, { status: 500 });
  }
}
