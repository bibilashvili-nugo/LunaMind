import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../../components/dashboard/NavBar";
import { redirect } from "next/navigation";
import SingleTeacherLeftSide from "../../../../../../components/teacher-profile/SingleTeacherLeftSide";
import SingleTeacherRightSide from "../../../../../../components/teacher-profile/SingleTeacherRightSide";
import { prisma } from "@/lib/prisma";

interface TutorPageProps {
  params: {
    id: string;
  };
  searchParams: {
    subject?: string;
  };
}

const TutorPage = async ({ params, searchParams }: TutorPageProps) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const safeUser = { ...user, image: user.image || undefined };

  if (safeUser.role === "TEACHER") redirect("/dashboard");

  const { id } = await params;
  const searchParamsObj = await searchParams;
  const selectedSubject = searchParamsObj.subject;

  // პირდაპირ Prisma-ს გამოყენებით მასწავლებლის მონაცემების მიღება
  const teacher = await prisma.teacherProfile.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      teacherSubjects: true,
      lessons: true,
    },
  });

  if (!teacher) {
    redirect("/dashboard/tutors");
  }

  // ფილტრაცია მხოლოდ იმ საგნისა და გაკვეთილების, რომელზეც დააწკაპუნეს
  const filteredTeacher = {
    ...teacher,
    teacherSubjects: selectedSubject
      ? teacher.teacherSubjects.filter(
          (subject) => subject.name === selectedSubject
        )
      : teacher.teacherSubjects,
    lessons: selectedSubject
      ? teacher.lessons.filter((lesson) => lesson.subject === selectedSubject)
      : teacher.lessons,
  };

  const teacherWithSafeImage = {
    ...filteredTeacher,
    user: {
      ...teacher.user,
      image: teacher.user.image || "/images/default-profile.png",
    },
  };

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
        <NavBar user={safeUser} />
        <div className="grid grid-cols-1 mt-[32px] lg:mt-5 xl:mt-6 lg:grid-cols-3 gap-4 pb-[200px]">
          <SingleTeacherLeftSide
            teacher={teacherWithSafeImage}
            selectedSubject={selectedSubject}
          />
          <SingleTeacherRightSide
            teacher={teacherWithSafeImage}
            studentId={safeUser.id}
            teacherUserId={teacher.user.id}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
