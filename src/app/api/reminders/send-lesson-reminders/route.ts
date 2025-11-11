import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Email transporter-ის კონფიგურაცია
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ტიპების განსაზღვრა
interface Student {
  email: string;
  firstName: string;
  lastName: string;
}

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
}

interface BookedLesson {
  id: string;
  student: Student;
  teacher: Teacher;
  subject: string;
  date: Date;
  time: string;
  price: number;
  duration?: number;
  comment?: string;
  link?: string;
}

interface Result {
  lessonId: string;
  student: string;
  studentName: string;
  lessonTime: Date;
  status: string;
  error?: string;
}

export async function GET() {
  try {
    const now = new Date();
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000); // 15 წუთი შემდეგ

    console.log(`🔍 რემაინდერების შემოწმება: ${now.toISOString()}`);
    console.log(
      `⏰ შემოწმების დიაპაზონი: ${now.toISOString()} - ${fifteenMinutesFromNow.toISOString()}`
    );

    // 1. იპოვე დაჯავშნული გაკვეთილები, რომლებიც იწყება მომდევნო 15 წუთში
    const upcomingBookedLessons = (await prisma.bookedLesson.findMany({
      where: {
        date: {
          gte: now,
          lte: fifteenMinutesFromNow,
        },
      },
      include: {
        student: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        teacher: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    })) as BookedLesson[];

    console.log(`📚 ნაპოვნია ${upcomingBookedLessons.length} გაკვეთილი`);

    const results: Result[] = [];

    // 2. გაგზავნე რემაინდერი თითოეული გაკვეთილისთვის
    for (const lesson of upcomingBookedLessons) {
      try {
        // გადაიყვანე date და time ერთ Date ობიექტში
        const lessonDateTime = new Date(lesson.date);
        const [hours, minutes] = lesson.time.split(":").map(Number);
        lessonDateTime.setHours(hours, minutes, 0, 0);

        console.log(
          `📧 რემაინდერის გაგზავნა: ${
            lesson.student.email
          } - ${lessonDateTime.toISOString()}`
        );

        // გაგზავნე email რემაინდერი
        await sendReminderEmail(lesson, lessonDateTime);

        results.push({
          lessonId: lesson.id,
          student: lesson.student.email,
          studentName: `${lesson.student.firstName} ${lesson.student.lastName}`,
          lessonTime: lessonDateTime,
          status: "reminder_sent",
        });

        console.log(`✅ რემაინდერი გაიგზავნა: ${lesson.student.email}`);
      } catch (error) {
        console.error(`❌ ვერ გაიგზავნა ${lesson.student.email}-ს:`, error);

        // გადაიყვანე date და time ერთ Date ობიექტში error-ის შემთხვევაშიც
        const lessonDateTime = new Date(lesson.date);
        const [hours, minutes] = lesson.time.split(":").map(Number);
        lessonDateTime.setHours(hours, minutes, 0, 0);

        results.push({
          lessonId: lesson.id,
          student: lesson.student.email,
          studentName: `${lesson.student.firstName} ${lesson.student.lastName}`,
          lessonTime: lessonDateTime,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      message: "Reminders processed successfully",
      timestamp: now.toISOString(),
      checkRange: {
        from: now.toISOString(),
        to: fifteenMinutesFromNow.toISOString(),
      },
      remindersSent: results.filter((r) => r.status === "reminder_sent").length,
      errors: results.filter((r) => r.status === "error").length,
      details: results,
    });
  } catch (error) {
    console.error("❌ რემაინდერების დამუშავების შეცდომა:", error);

    return NextResponse.json(
      {
        error: "Failed to process reminders",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Email რემაინდერის გაგზავნის ფუნქცია (სტუდენტისთვის და მასწავლებლისთვის)
async function sendReminderEmail(lesson: BookedLesson, lessonDateTime: Date) {
  const formattedTime = lessonDateTime.toLocaleString("ka-GE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // რემაინდერი სტუდენტისთვის
  const studentMailOptions = {
    from: process.env.EMAIL_USER,
    to: lesson.student.email,
    subject: `🔔 გაკვეთილის შეხსენება - ${lesson.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">გაკვეთილის შეხსენება</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👤 სტუდენტი:</strong> ${lesson.student.firstName} ${
      lesson.student.lastName
    }</p>
          <p><strong>👨‍🏫 მასწავლებელი:</strong> ${lesson.teacher.firstName} ${
      lesson.teacher.lastName
    }</p>
          <p><strong>📚 საგანი:</strong> ${lesson.subject}</p>
          <p><strong>⏰ დრო:</strong> ${formattedTime}</p>
          <p><strong>💰 ფასი:</strong> ${lesson.price} ₾</p>
          ${
            lesson.duration
              ? `<p><strong>⏳ ხანგრძლივობა:</strong> ${lesson.duration} საათი</p>`
              : ""
          }
          ${
            lesson.comment
              ? `<p><strong>💬 კომენტარი:</strong> ${lesson.comment}</p>`
              : ""
          }
          ${
            lesson.link
              ? `<p><strong>🔗 ლინკი:</strong> <a href="${lesson.link}">${lesson.link}</a></p>`
              : ""
          }
        </div>

        <p style="color: #64748b;">გაკვეთილი იწყება <strong>15 წუთში</strong>. გთხოვთ, მოემზადოთ!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 14px;">ეს არის ავტომატური შეტყობინება, გთხოვთ არ უპასუხოთ.</p>
        </div>
      </div>
    `,
  };

  // რემაინდერი მასწავლებლისთვის
  const teacherMailOptions = {
    from: process.env.EMAIL_USER,
    to: lesson.teacher.email,
    subject: `🔔 გაკვეთილის შეხსენება - ${lesson.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">გაკვეთილის შეხსენება</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👨‍🏫 მასწავლებელი:</strong> ${lesson.teacher.firstName} ${
      lesson.teacher.lastName
    }</p>
          <p><strong>👤 სტუდენტი:</strong> ${lesson.student.firstName} ${
      lesson.student.lastName
    }</p>
          <p><strong>📚 საგანი:</strong> ${lesson.subject}</p>
          <p><strong>⏰ დრო:</strong> ${formattedTime}</p>
          <p><strong>💰 ფასი:</strong> ${lesson.price} ₾</p>
          ${
            lesson.duration
              ? `<p><strong>⏳ ხანგრძლივობა:</strong> ${lesson.duration} საათი</p>`
              : ""
          }
          ${
            lesson.comment
              ? `<p><strong>💬 კომენტარი:</strong> ${lesson.comment}</p>`
              : ""
          }
          ${
            lesson.link
              ? `<p><strong>🔗 ლინკი:</strong> <a href="${lesson.link}">${lesson.link}</a></p>`
              : ""
          }
        </div>

        <p style="color: #64748b;">გაკვეთილი იწყება <strong>15 წუთში</strong>. გთხოვთ, მოემზადოთ!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 14px;">ეს არის ავტომატური შეტყობინება, გთხოვთ არ უპასუხოთ.</p>
        </div>
      </div>
    `,
  };

  // გაგზავნე ორივე ემაილი
  await Promise.all([
    transporter.sendMail(studentMailOptions),
    transporter.sendMail(teacherMailOptions),
  ]);
}
