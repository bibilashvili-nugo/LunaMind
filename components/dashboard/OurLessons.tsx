import Link from "next/link";
import { CalendarAdd } from "react-coolicons";
import NoContent from "../ui/NoContent";

interface OurLessonsProps {
  subject: string;
  teacher: string;
  svgColor: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface BookedLesson {
  id: string;
  date: string;
  teacher: User;
  student: User;
  createdAt: string;
  duration: number;
  subject: string;
}

const OurLessonsBox = ({ subject, teacher, svgColor }: OurLessonsProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border border-[#F1F1F1] rounded-2xl">
      <div className="flex items-center gap-3">
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="14" height="14" rx="7" fill="white" />
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              rx="7"
              stroke={svgColor}
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
            {subject}
          </span>
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            {teacher}
          </span>
        </div>
      </div>
    </div>
  );
};

const AddNewLessons = () => {
  return (
    <Link href="/dashboard/tutors">
      <div className="flex items-center justify-center gap-2 px-2 py-4 bg-[#F6F5FA] rounded-[12px]">
        <CalendarAdd className="text-[#7D3FFF]" />
        <span className="text-sm leading-5 font-helveticaneue-regular text-[#080808] border-b-1 border-[#080808]">
          დაამატეთ ახალი გაკვეთილი
        </span>
      </div>
    </Link>
  );
};

const OurLessons = ({
  profilePage = false,
  teacher = false,
  // studentId,
  // teacherId,
  lessons,
}: {
  profilePage?: boolean;
  teacher?: boolean;
  // studentId?: string;
  // teacherId?: string;
  lessons?: BookedLesson[];
}) => {
  return (
    <div
      className={` bg-white rounded-2xl p-5 flex flex-col gap-4 ${
        lessons?.length === 0 && "lg:max-h-[596px]"
      } lg:py-6
        ${
          profilePage
            ? "md:h-[428px] lg:mt-6 mt-4 lg:h-[436px]"
            : "mt-4 lg:mt-0"
        }`}
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
        {teacher ? "ჩემი მოსწავლეები" : "ჩემი გაკვეთილები"}
      </span>
      <div className="flex flex-col justify-between h-full gap-2">
        <div className="flex flex-col gap-2">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <OurLessonsBox
                key={lesson.id}
                subject={lesson.subject}
                teacher={
                  teacher
                    ? `${lesson.student.firstName} ${lesson.student.lastName}`
                    : `${lesson.teacher.firstName} ${lesson.teacher.lastName}`
                }
                svgColor="#7D3FFF"
              />
            ))
          ) : (
            <NoContent needBtn={false} desc="გთხოვთ დაამატოთ გაკვეთილი" />
          )}
        </div>
        {!teacher && <AddNewLessons />}
      </div>
    </div>
  );
};

export default OurLessons;
