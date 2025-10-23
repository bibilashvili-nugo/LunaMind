import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import { prisma } from "@/lib/prisma";
import { FilterPanel } from "../../../../../components/ui/FilterPanel";
import { TeacherList } from "../../../../../components/teacher-profile/TeacherList";
import { Prisma } from "@prisma/client";
import { FilterMobileModal } from "../../../../../components/ui/FilterMobileModal";

interface SearchParams {
  subjects?: string;
  days?: string;
  time?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function TutorsStudent({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const safeUser = { ...user, image: user.image || undefined };

  if (safeUser.role === "TEACHER") redirect("/dashboard");

  const params = await searchParams;

  const subjects = params.subjects?.split(",") || [];
  const days = params.days?.split(",") || [];
  const time = params.time || "";
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;

  const where: Prisma.TeacherProfileWhereInput = {};

  // საგნების და ფასის ფილტრი
  if (subjects.length > 0 || minPrice !== undefined || maxPrice !== undefined) {
    where.teacherSubjects = {
      some: {
        ...(subjects.length > 0 && { name: { in: subjects } }),
        ...((minPrice !== undefined || maxPrice !== undefined) && {
          price: {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
          },
        }),
      },
    };
  }

  // დღეებისა და დროის ფილტრი
  const lessonsFilter: Prisma.LessonWhereInput = {};
  if (days.length > 0) lessonsFilter.day = { in: days, mode: "insensitive" };
  if (time) lessonsFilter.time = { contains: time, mode: "insensitive" };

  if (Object.keys(lessonsFilter).length > 0) {
    where.lessons = { some: lessonsFilter };
  }

  const teachers = await prisma.teacherProfile.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      teacherSubjects: true,
      lessons: true,
    },
  });

  const teachersWithSafeImages = teachers.map((teacher) => ({
    ...teacher,
    user: {
      ...teacher.user,
      image: teacher.user?.image || "/images/default-profile.png",
    },
  }));

  // მხოლოდ subjects, price, days, time შესაბამისი ქარდები
  const expandedTeachers = teachersWithSafeImages.flatMap((teacher) => {
    return (
      teacher.teacherSubjects
        ?.filter((subject) => {
          // აქვს თუ არა ამ საგანზე გაკვეთილი
          const hasLessonForSubject = teacher.lessons.some(
            (lesson) => lesson.subject === subject.name // subject name უნდა ემთხვეოდეს lesson.subject-ს (შენთან რა field-ია, ის ჩასვი)
          );

          const matchesSubject =
            subjects.length === 0 || subjects.includes(subject.name);
          const matchesPrice =
            (minPrice === undefined || subject.price! >= minPrice) &&
            (maxPrice === undefined || subject.price! <= maxPrice);

          return hasLessonForSubject && matchesSubject && matchesPrice;
        })
        .map((subject) => ({
          ...teacher,
          subjectName: subject.name,
          subjectPrice: subject.price,
        })) || []
    );
  });

  // ✅ იფილტრება მასწავლებლები, რომლებსაც გაკვეთილი/lesson არ აქვთ
  const teachersWithLessons = expandedTeachers.filter(
    (teacher) => teacher.lessons && teacher.lessons.length > 0
  );

  // დღეებისა და დროის საბოლოო ფილტრი
  const fullyFilteredTeachers = teachersWithLessons.filter((teacher) => {
    const matchesDay =
      days.length === 0 ||
      teacher.lessons?.some((lesson) => days.includes(lesson.day));
    const matchesTime =
      !time || teacher.lessons?.some((lesson) => lesson.time === time);
    return matchesDay && matchesTime;
  });

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
        <NavBar user={safeUser} />
        <div className="grid grid-cols-1 mt-[22px] sm:mt-8 lg:mt-[20px] xl:mt-6 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          <div className="cursor-pointer lg:grid lg:col-span-1">
            <FilterMobileModal
              initialSubjects={subjects}
              initialDays={days}
              initialTime={time}
              initialMinPrice={minPrice?.toString()}
              initialMaxPrice={maxPrice?.toString()}
            />
            <div className="hidden lg:flex flex-col rounded-2xl bg-[#FFFFFF] h-fit px-5 py-6 gap-4">
              <span className="text-sm leading-5 font-helveticaneue-regular">
                ფილტრაცია
              </span>
              <FilterPanel
                initialSubjects={subjects}
                initialDays={days}
                initialTime={time}
                initialMinPrice={minPrice?.toString()}
                initialMaxPrice={maxPrice?.toString()}
              />
            </div>
          </div>
          <TeacherList teachers={fullyFilteredTeachers} />
        </div>
      </div>
    </div>
  );
}
