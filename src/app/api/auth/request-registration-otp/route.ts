// app/api/auth/request-registration-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, phone, role } = await request.json();

    // Check if email already exists in actual users
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "ეს ელ.ფოსტა უკვე გამოყენებულია" },
        { status: 400 }
      );
    }

    // Generate OTP (6-digit code)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store additional data in a way that can be retrieved later
    // We'll store it as JSON in a separate field or use the identifier creatively
    const registrationData = JSON.stringify({ fullName, phone, role });

    // Delete any existing verification token for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Store OTP and registration data in VerificationToken
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: `${otpCode}|${registrationData}`, // Combine OTP and data
        expires: expiresAt,
      },
    });

    console.log(`OTP for ${email}: ${otpCode}`);

    // Create transporter with TLS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "რეგისტრაციის დასადასტურებელი კოდი - Evectus",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #0C0F21; margin-bottom: 10px;">Evectus</h2>
            <h3 style="color: #333; margin-bottom: 20px;">მეილის დადასტურება</h3>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #333; margin-bottom: 15px;">გამარჯობა <strong>${fullName}</strong>,</p>
            <p style="color: #333; margin-bottom: 20px;">გმადლობთ რომ რეგისტრირდით Evectus-ზე. თქვენი რეგისტრაციის დასადასტურებლად გამოიყენეთ ქვემოთ მოცემული ერთჯერადი კოდი:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #FFD52A; color: #0C0F21; padding: 15px 30px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
                ${otpCode}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-bottom: 10px;">
              ეს კოდი მოქმედებს <strong>10 წუთის</strong> განმავლობაში
            </p>
          </div>
          
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin-bottom: 5px;">
              თუ თქვენ არ გაიარეთ რეგისტრაცია Evectus-ზე, გთხოვთ უგულებელყოთ ეს მეილი.
            </p>
            <p style="color: #999; font-size: 12px;">
              © 2024 Evectus. ყველა უფლება დაცულია.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      message: "ერთჯერადი კოდი გამოგზავნილია თქვენს ელ.ფოსტაზე",
    });
  } catch (error) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { message: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან." },
      { status: 500 }
    );
  }
}
