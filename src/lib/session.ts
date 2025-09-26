// lib/session.ts
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
  try {
    // ✅ დარწმუნდი, რომ cookies() არის dynamic
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) return null;

    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      cookieStore.delete("token");
      return null;
    }

    return user;
  } catch (err) {
    console.error("Invalid JWT:", err);

    const cookieStore = await cookies();
    cookieStore.delete("token");
    return null;
  }
}

// ✅ დაამატე ეს ხაზი
export const dynamic = "force-dynamic";
