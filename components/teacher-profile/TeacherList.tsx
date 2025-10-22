"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Teacher {
  id: string;
  profession?: string | null;
  price?: number;
  user: {
    firstName: string;
    lastName: string;
    image?: string;
  };
  teacherSubjects?: Array<{
    id: string;
    name: string;
    price?: number;
  }>;
  lessons?: Array<{
    id: string;
    day: string;
    time: string;
  }>;

  subjectName?: string;
  subjectPrice?: number;
}

interface TeacherListProps {
  teachers: Teacher[];
  filterParams?: {
    subjects?: string[];
    days?: string[];
    time?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export const TeacherList = ({ teachers, filterParams }: TeacherListProps) => {
  const router = useRouter();

  // ფილტრაცია
  // ყველა subject-ით ქარდები გამოჩნდება მხოლოდ იმ subjects-ზე, რაც ფილტრშია
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.subjectName
      ? !filterParams?.subjects?.length ||
        filterParams.subjects.includes(teacher.subjectName)
      : true
  );

  return (
    <div className="flex flex-col md:grid gap-4 md:grid-cols-2 lg:col-span-2 xl:col-span-3 xl:grid-cols-3 mt-6 lg:mt-0 h-fit">
      {filteredTeachers.map((item, index) => (
        <div
          className="border border-[#EBECF0] bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          key={`${item.id}-${index}`}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="w-[64px] h-[64px] relative overflow-hidden rounded-full">
                <Image
                  src={item.user.image || "/images/default-profile.png"}
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base leading-6 text-black font-helveticaneue-medium md:text-sm md:leading-5 xl:text-base xl:leading-6">
                  {item.subjectPrice || 39} ლარი
                </span>
                <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular sm:text-sm sm:leading-5">
                  4.9 შეფასება
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
                {item.subjectName}
              </span>
              <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold 2xl:text-base 2xl:leading-6">
                {item.user.firstName} {item.user.lastName}
              </span>
            </div>
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular lg:text-xs lg:leading-4 2xl:text-sm 2xl:leading-5">
              {item.profession || "პროფესია არ არის მითითებული"}
            </span>
            <hr className="text-[#EBECF0] mt-5" />
            <div className="mt-3 flex flex-col text-xs leading-4 text-[#737373] font-helveticaneue-regular">
              <span>შეხვედრის დრო</span>
              <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
                თავისუფალი გრაფიკი
              </span>
            </div>
            <button
              className="py-4 w-full rounded-[50px] bg-[#F0C514] cursor-pointer mt-3 text-sm leading-5 text-[#080808] font-helveticaneue-medium hover:bg-[#e6b800] transition"
              onClick={() => router.push(`/dashboard/tutors/${item.id}`)}
            >
              არჩევა
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
