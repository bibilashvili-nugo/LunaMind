import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Slider01 } from "react-coolicons";
import { FilterPanel } from "../../../../../components/ui/FilterPanel";

export default async function TutorsStudent() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const safeUser = {
    ...user,
    image: user.image || undefined,
  };

  if (safeUser.role === "TEACHER") {
    redirect("/dashboard");
  }

  const teachers = await prisma.teacherProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true, // ✅ bring user info
    },
  });

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
        {/* 🔹 Reuse your existing NavBar with the same user */}
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
              <FilterPanel />
            </div>
          </div>
          <div className="flex flex-col md:grid gap-4 md:grid-cols-2 lg:col-span-2 xl:col-span-3 xl:grid-cols-3 mt-6 lg:mt-0">
            {teachersWithSafeImages.map((item) => (
              <div
                className="border border-[#EBECF0] bg-white rounded-xl p-4"
                key={item?.id}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <div className="w-[64px] h-[64px] relative overflow-hidden">
                      <Image
                        src={item.user.image}
                        alt="user"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base leading-6 text-black font-helveticaneue-medium md:text-sm md:leading-5 xl:text-base xl:leading-6">
                        39 ლარი
                      </span>
                      <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular sm:text-sm sm:leading-5">
                        4.9 შეფასება
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3">
                    <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
                      {item?.profession}
                    </span>
                    <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold 2xl:text-base 2xl:leading-6">
                      {item?.user?.firstName + " " + item?.user?.lastName}
                    </span>
                  </div>
                  <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular lg:text-xs lg:leading-4 2xl:text-sm 2xl:leading-5">
                    შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი
                    შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო
                  </span>
                  <hr className="text-[#EBECF0] mt-5" />
                  <div className="mt-3 flex flex-col text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                    <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                      შეხვედრის დრო
                    </span>
                    <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
                      თავისუფალი გრაფიკი
                    </span>
                  </div>
                  <button className="py-4 w-full rounded-[50px] bg-[#F0C514] cursor-pointer mt-3 text-sm leading-5 text-[#080808] font-helveticaneue-medium">
                    არჩევა
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
