import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import NavBar from "../../../../../components/dashboard/NavBar";
import { TutorsStudentBox } from "./TutorsStudentBox";
import ReviewButton from "./ReviewModalButton";

export default async function TutorsStudent() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const safeUser = {
    ...user,
    image: user.image || undefined, // fix null → undefined
  };

  return (
    <div className="bg-[#F6F5FA]">
      <div className="bg-[#F6F5FA] min-h-screen px-4 lg:px-6 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto pb-[70px] lg:pb-0">
        {/* 🔹 Reuse your existing NavBar with the same user */}
        <NavBar user={safeUser} />
        <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:items-center sm:justify-between ">
          <div className="flex flex-col gap-2">
            <span
              className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bol lg:text-base lg:leading-6
            xl:text-[20px] xl:leading-7"
            >
              შეფასებები
            </span>
            <span className="text-xs leading-4 text-[#767676] font-helveticaneue-regular lg:text-sm lg:leading-5">
              აქ რამე პატარა დამხმარე საყვარელი ტექსტი დაიწერება შეფასებებზე
            </span>
          </div>
          {/* <button
            className="text-sm leading-5 text-[#080808] font-helveticaneue-medium w-full py-4 bg-[#F0C514] rounded-xl
          sm:w-fit sm:px-9 cursor-pointer"
          >
            შეფასების გაკეთება
          </button> */}
          <ReviewButton />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-3 lg:mt-7 xl:grid-cols-4 xl:mt-6">
          {[...Array(27)].map((_, i) => (
            <TutorsStudentBox key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
