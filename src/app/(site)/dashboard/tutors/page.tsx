import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import { prisma } from "@/lib/prisma";
import { Slider01 } from "react-coolicons";
import { FilterPanel } from "../../../../../components/ui/FilterPanel";
import { Prisma } from "@prisma/client";
import { TeacherList } from "../../../../../components/teacher-profile/TeacherList";

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

  // დებაგინგი
  const allLessons = await prisma.lesson.findMany({
    select: { day: true, time: true, teacherProfileId: true },
  });
  console.log("All lessons in database:", allLessons);

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

  console.log("Final where clause:", JSON.stringify(where, null, 2));

  const teachers = await prisma.teacherProfile.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      teacherSubjects: true,
      lessons: true,
    },
  });

  console.log(
    "Found teachers with lessons:",
    teachers.map((t) => ({
      name: `${t.user.firstName} ${t.user.lastName}`,
      lessonCount: t.lessons.length,
      lessons: t.lessons.map((l) => ({ day: l.day, time: l.time })),
    }))
  );

  const teachersWithSafeImages = teachers.map((teacher) => ({
    ...teacher,
    user: {
      ...teacher.user,
      image: teacher.user?.image || "/images/default-profile.png",
    },
  }));

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
        <NavBar user={safeUser} />
        <div className="grid grid-cols-1 mt-[22px] sm:mt-8 lg:mt-[20px] xl:mt-6 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          <div className="cursor-pointer lg:grid lg:col-span-1">
            <div className="flex items-center gap-[10px] py-3 px-9 bg-[#EBECF0] w-fit h-fit rounded-[50px] lg:hidden">
              <Slider01 />
              <span className="text-sm leading-5 text-[#080808]">ფილტრი</span>
            </div>
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
          <TeacherList
            teachers={teachersWithSafeImages}
            filterParams={{ subjects, days, time, minPrice, maxPrice }}
          />
        </div>
      </div>
    </div>
  );
}
