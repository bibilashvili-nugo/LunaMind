import React from "react";
import { LinkHorizontal, Tag } from "react-coolicons";
import { ThreeScene } from "../ThreeScene";

interface Teacher {
  id: string;
  userId: string;
  age: number | null;
  country: string | null;
  city: string | null;
  address: string | null;
  profession: string | null;
  education: string | null;
  currentStep: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    image?: string;
  };
  teacherSubjects: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  lessons: Array<{
    id: string;
    day: string;
    time: string;
    duration: number;
    subject: string;
    link?: string | null;
  }>;
}

interface SingleTeacherLeftSideProps {
  teacher: Teacher;
  selectedSubject?: string;
}

const SingleTeacherLeftSide = ({
  teacher,
  selectedSubject,
}: SingleTeacherLeftSideProps) => {
  const fullName = `${teacher.user.firstName} ${teacher.user.lastName}`;

  // მხოლოდ არჩეული საგნის გაკვეთილების დღეები
  const uniqueDays = [...new Set(teacher.lessons.map((lesson) => lesson.day))];
  const meetingDaysText = `კვირაში ${uniqueDays.length} დღე`;

  // დროების ფორმატირება (მხოლოდ არჩეული საგნისთვის)
  const formatLessonTimes = () => {
    if (teacher.lessons.length === 0) {
      return (
        <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
          დროები არ არის მითითებული
        </span>
      );
    }

    return teacher.lessons.map((lesson, index) => (
      <div key={lesson.id} className="flex items-center gap-1">
        <span className="text-sm leading-5 font-helveticaneue-medium text-[#080808]">
          {lesson.day}: {lesson.time} ({lesson.duration}სთ)
        </span>
        {index < teacher.lessons.length - 1 && (
          <span className="text-[#969696]">•</span>
        )}
      </div>
    ));
  };

  // არჩეული საგანი ან პირველი საგანი
  const mainSubject =
    selectedSubject || teacher.teacherSubjects[0]?.name || "საგანი";

  // ყველა საგანი (მხოლოდ არჩეული საგნისთვის)
  const displaySubjects = selectedSubject
    ? selectedSubject
    : teacher.teacherSubjects.map((subject) => subject.name).join(", ");

  // მასწავლებლის აღწერა
  const getTeacherDescription = () => {
    const parts = [];

    if (teacher.profession) {
      parts.push(teacher.profession);
    }

    if (teacher.city) {
      parts.push(`მუშაობს ${teacher.city}-ში`);
    }

    if (teacher.education) {
      parts.push(`განათლება: ${teacher.education}`);
    }

    if (teacher.age) {
      parts.push(`ასაკი: ${teacher.age} წელი`);
    }

    return parts.length > 0
      ? `${fullName} არის ${parts.join(". ")}.`
      : `${fullName} არის გამოცდილი მასწავლებელი.`;
  };

  return (
    <div className="bg-white p-4 rounded-2xl lg:col-span-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl leading-[100%] text-black font-helveticaneue-medium !font-bold lg:text-[32px]">
            {displaySubjects}
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular lg:text-base lg:leading-[100%]">
            {fullName}
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <LinkHorizontal color="#3E74FF" width={24} height={24} />
            <span className="text-[#3E74FF] text-sm leading-5 font-helveticaneue-regular underline">
              გაზიარება
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Tag color="#969696" width={24} height={24} />
            <span className="text-[#969696] text-sm leading-5 font-helveticaneue-regular">
              {mainSubject}
            </span>
          </div>
        </div>
      </div>

      {/* მხოლოდ თუ არჩეული საგნისთვის არის გაკვეთილები */}
      {teacher.lessons.length > 0 ? (
        <div className="bg-[#ECF1FF] rounded-xl p-3 mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-col gap-1 sm:w-1/2">
              <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
                მასწავლებელი
              </span>
              <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
                {fullName}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:w-1/2">
              <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
                შეხვედრები
              </span>
              <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
                {meetingDaysText}
              </span>
            </div>
          </div>
          <hr className="border border-[#D3DFFF]" />
          <div className="flex flex-col gap-1">
            <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
              საათები ({mainSubject})
            </span>
            <div className="flex flex-col sm:flex-row sm:gap-1 flex-wrap">
              {formatLessonTimes()}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#ECF1FF] rounded-xl p-3 mt-3">
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            {selectedSubject
              ? `${selectedSubject} საგნისთვის გაკვეთილები არ არის მითითებული`
              : "გაკვეთილები არ არის მითითებული"}
          </span>
        </div>
      )}

      <div className=" w-full h-[225px] rounded-xl overflow-hidden">
        {teacher.user.image ? (
          <ThreeScene image={teacher.user.image} />
        ) : (
          <span className="text-white flex items-center justify-center h-full">
            ფოტო არ არის
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            გაკვეთილის აღწერა
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            {teacher.profession ||
              `${mainSubject}-ის გაკვეთილი ${fullName}-ის მიერ. პროფესიონალური მიდგომა და ინდივიდუალური ყურადღება ყველა სტუდენტის მიმართ.`}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            მასწავლებლის შესახებ
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            {getTeacherDescription()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            სტუდენტის კარიერის პროგრამა
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            SCRUM PRODUCT OWNERSHIP-ის კურსის მიზანია, დამწყებ სტუდენტებს
            გააცნოს Product Owner-ის როლი, SCRUM-ის მუშაობის პრინციპები და
            პროდუქტის განვითარებისა და მართვის პრაქტიკული ტექნიკები. კურსი
            ფოკუსირებულია გამოცდილებით სწავლაზე, რეალურ მაგალითებსა და
            ინტერაქტიულ სავარჯიშოებზე, რათა სტუდენტებმა მარტივად აითვისონ
            პროდუქტის მართვის საფუძვლები.
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-3 rounded-xl p-3 gap-1 bg-[#ECF1FF]">
        <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
          კონსულტაციისთვის დაგვიკავშირდი
        </span>
        <span className="text-sm leading-5 text-[#3E74FF] font-helveticaneue-medium !font-bold">
          {teacher.user.phoneNumber} - {teacher.user.email}
        </span>
      </div>
    </div>
  );
};

export default SingleTeacherLeftSide;
