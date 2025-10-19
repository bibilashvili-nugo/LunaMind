import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../../components/dashboard/NavBar";
import { redirect } from "next/navigation";

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

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
        <NavBar user={safeUser} />
        <span>{id}</span>
      </div>
    </div>
  );
};

export default TutorPage;
