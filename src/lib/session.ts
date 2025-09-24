// lib/session.ts
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) return null;

    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    // თუ მომხმარებელი არ არსებობს, წავშალოთ კუკი
    if (!user) {
      cookieStore.delete("token");
      return null;
    }

    return user;
  } catch (err) {
    console.error("Invalid JWT:", err);

    // JWT ვალიდაციის შეცდომის შემთხვევაში წავშალოთ კუკი
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return null;
  }
}
