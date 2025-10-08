import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import { prisma } from "@/lib/prisma";

export default async function TutorsStudent() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const teachers = await prisma.teacherProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true, // ✅ bring user info
    },
  });

  console.log(teachers);
  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        {/* 🔹 Reuse your existing NavBar with the same user */}
        <NavBar user={user} />
        <div className="grid grid-cols-1  gap-4">
          {teachers.map((item) => (
            <div
              className="border border-[#EBECF0] rounded-xl p-4"
              key={item?.id}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="w-[64px] h-[64px] bg-black"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base leading-6 text-black font-helveticaneue-medium">
                      39 ლარი
                    </span>
                    <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                      4.9 შეფასება
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
                    {item?.profession}
                  </span>
                  <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
                    {item?.user?.firstName + " " + item?.user?.lastName}
                  </span>
                </div>
                <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
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
  );
}
