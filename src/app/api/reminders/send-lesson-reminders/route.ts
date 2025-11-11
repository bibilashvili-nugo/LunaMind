import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Reminders API is working!",
    timestamp: new Date().toISOString(),
  });
}
