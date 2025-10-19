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
}

const TutorPage = async ({ params }: TutorPageProps) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const safeUser = { ...user, image: user.image || undefined };

  if (safeUser.role === "TEACHER") redirect("/dashboard");
  const { id } = await params;

  // პირდაპირ Prisma-ს გამოყენებით მასწავლებლის მონაცემების მიღება
  const teacher = await prisma.teacherProfile.findUnique({
    where: {
      id: id, // ან userId: id - დამოკიდებულია რა ID-ს იყენებ
    },
    include: {
      user: true,
      teacherSubjects: true,
      lessons: true,
    },
  });

  if (!teacher) {
    redirect("/dashboard/tutors"); // ან გაუშვი error page
  }

  const teacherWithSafeImage = {
    ...teacher,
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
          <SingleTeacherLeftSide teacher={teacherWithSafeImage} />
          <SingleTeacherRightSide teacher={teacherWithSafeImage} />
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
