"use client";

import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import NoContent from "../ui/NoContent";
import { LessonCreate } from "../teacher-profile/LessonCreate";
import { useBookedLessons } from "@/hooks/useBookedLessons";
import toast from "react-hot-toast";
import Image from "next/image";
import { Check, TrashFull } from "react-coolicons";

interface Lesson {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  price?: number;
  comment?: string;
  link?: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  student: {
    id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
}

interface FutureLessonsBoxTimeProps {
  duration?: number;
  timeLine?: string;
}

const FutureLessonsBoxTitle = ({ title }: { title: string }) => (
  <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
    {title}
  </span>
);

const FutureLessonsBoxTime: React.FC<FutureLessonsBoxTimeProps> = ({
  duration,
  timeLine,
}) => {
  let display = timeLine || "";

  if (duration !== undefined) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0) display += `${hours} საათი`;
    if (minutes > 0)
      display += hours > 0 ? ` და ${minutes} წუთი` : `${minutes} წუთი`;
    if (!display) display = "0 წუთი";
  }

  return (
    <span className="text-sm leading-5 font-helveticaneue-regular text-[#080808]">
      {display}
    </span>
  );
};

const FutureLessonsBoxContent = ({
  teacher = false,
  lesson,
  booked = false,
}: {
  teacher?: boolean;
  lesson: Lesson;
  onOpenMeetingLink: (lesson: Lesson) => void;
  booked?: boolean;
}) => {
  const fullNameTeacher = `${lesson.teacher?.firstName || ""} ${
    lesson.teacher?.lastName || ""
  }`;
  const fullNameStudent = `${lesson.student?.firstName || ""} ${
    lesson.student?.lastName || ""
  }`;

  const handleAttendanceClick = () => {
    if (lesson.link) {
      window.open(lesson.link, "_blank");
    } else {
      toast.error("შეხვედრის ლინკი ჯერ არ არის მითითებული");
    }
  };
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11  rounded-full">
          <Image
            width={44}
            height={44}
            src={
              teacher
                ? lesson?.student?.image || "/images/default-profile.png"
                : lesson?.teacher?.image || "/images/default-profile.png"
            }
            alt="user image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            {teacher ? fullNameStudent : fullNameTeacher}
          </span>
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
            {lesson.subject}
          </span>
        </div>
      </div>
      {teacher && booked ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <button
            className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-[#F0C514] text-[#080808] cursor-pointer sm:px-[34px] order-1 sm:order-2"
            onClick={handleAttendanceClick}
          >
            დასწრება
          </button>
        </div>
      ) : teacher ? (
        <div className="flex gap-3 sm:flex-row sm:gap-2">
          <button className="bg-[#49B02C] w-fit rounded-[48px] py-2 px-10 cursor-pointer">
            <Check width={24} height={24} color="white" />
          </button>
          <button className="bg-[#D80303] w-fit rounded-[48px] py-2 px-10 cursor-pointer">
            <TrashFull width={24} height={24} color="white" />
          </button>
        </div>
      ) : (
        <button
          className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-white cursor-pointer sm:px-[34px]"
          onClick={handleAttendanceClick}
        >
          დასწრება
        </button>
      )}
    </div>
  );
};

const FutureLessonsBox = ({
  teacher = false,
  lesson,
  onOpenMeetingLink,
  booked = false,
}: {
  teacher?: boolean;
  lesson: Lesson;
  onOpenMeetingLink: (lesson: Lesson) => void;
  booked?: boolean;
}) => {
  const months = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  const date = new Date(lesson.date);
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} `;

  return (
    <div className="flex flex-col bg-[#ECF1FF] rounded-2xl p-4 gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="დაწყების თარიღი" />
          <FutureLessonsBoxTime timeLine={formattedDate} />
        </div>
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="შეხვედრის დრო" />
          <FutureLessonsBoxTime timeLine={lesson.time} />
        </div>
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="ხანგრძლივობა" />
          <FutureLessonsBoxTime duration={lesson.duration} />
        </div>
        <div
          className={`${lesson.price ? "flex flex-col sm:w-1/3" : "hidden"}`}
        >
          <FutureLessonsBoxTitle title="ფასი" />
          <FutureLessonsBoxTime timeLine={`${lesson.price} ₾`} />
        </div>
      </div>
      <hr className="text-[#D4D5D8]" />
      <FutureLessonsBoxContent
        teacher={teacher}
        lesson={lesson}
        onOpenMeetingLink={onOpenMeetingLink}
        booked={booked}
      />
    </div>
  );
};

const FutureLessons = ({
  teacher = false,
  teacherId = undefined,
  studentId,
}: {
  teacher?: boolean;
  teacherId?: string;
  studentId?: string;
}) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const meetingModalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => setModalOpen(false));
  useClickOutside(meetingModalRef, () => setMeetingModalOpen(false));

  const { data: bookedLessons } = useBookedLessons({
    teacherId,
  });

  useEffect(() => {
    const months = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];

    const today = new Date();
    const formatted = `${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`;
    setFormattedDate(formatted);
  }, []);

  // FutureLessons კომპონენტში
  useEffect(() => {
    const fetchLessons = async () => {
      if (!studentId && !teacher) return;

      try {
        const url = teacher
          ? `/api/teachers/lessons?teacherId=${teacherId}`
          : `/api/book-lesson/booked-lessons?studentId=${studentId}`;

        console.log("Fetching from:", url);
        console.log("Student ID:", studentId);

        const res = await fetch(url);

        console.log("Response status:", res.status);

        if (!res.ok) throw new Error("Failed to fetch");

        const data: Lesson[] = await res.json();
        console.log("Fetched data:", data);

        // მხოლოდ მომავალი გაკვეთილები
        const futureLessons = data.filter(
          (lesson) => new Date(lesson.date) >= new Date()
        );

        setLessons(futureLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, [teacher, studentId, teacherId]);

  const handleOpenMeetingLink = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setMeetingModalOpen(true);
  };

  const upcomingBookedLessons =
    bookedLessons?.filter((lesson) => new Date(lesson.date) >= new Date()) ||
    [];

  return (
    <div
      className={`${
        teacher
          ? "lg:grid lg:grid-cols-1 gap-4 xl:grid-cols-2"
          : "xl:grid-cols-1"
      }`}
    >
      <div
        className={`mt-4 bg-white rounded-2xl p-5 flex flex-col gap-4 overflow-y-auto lg:mt-0 xl:col-span-1 h-fit max-h-[644px] xl:max-h-[680px] ${
          !teacher && "hidden"
        }`}
        style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xl leading-7 text-[#0C0F21] font-helveticaneue-medium !font-bold">
            {formattedDate}
          </span>
          <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
            მოახლოებული გაკვეთილები ({upcomingBookedLessons.length})
          </span>
        </div>
        <hr className="text-[#EBECF0]" />
        {teacher && bookedLessons && (
          <>
            {bookedLessons.filter(
              (lesson) => new Date(lesson.date) >= new Date()
            ).length === 0 ? (
              <NoContent
                desc="ჯერ არ გაქვთ დაგეგმილი გაკვეთილები"
                needBtn={false}
              />
            ) : (
              bookedLessons
                .filter((lesson) => new Date(lesson.date) >= new Date())
                .map((lesson) => (
                  <FutureLessonsBox
                    key={lesson.id}
                    teacher={teacher}
                    lesson={lesson}
                    onOpenMeetingLink={handleOpenMeetingLink}
                    booked={true}
                  />
                ))
            )}
          </>
        )}
      </div>
      {/* second */}
      <div
        className="mt-4 bg-white rounded-2xl p-5 flex flex-col gap-4 overflow-y-auto lg:mt-0 xl:col-span-1 h-fit max-h-[644px] xl:max-h-[680px]"
        style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
      >
        <div className="flex sm:justify-between sm:items-center flex-col items-start sm:flex-row gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xl leading-7 text-[#0C0F21] font-helveticaneue-medium !font-bold">
              {formattedDate}
            </span>
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              მოახლოებული გაკვეთილები ({lessons.length})
            </span>
          </div>
          {teacher && (
            <button
              className="text-sm leading-5 font-helveticaneue-medium py-3 w-full bg-[#8144FF] sm:w-fit sm:px-6 rounded-[50px] cursor-pointer text-[#fff]"
              onClick={() => setModalOpen(true)}
            >
              გაკვეთილის ჩანიშვნა
            </button>
          )}
        </div>
        <hr className="text-[#EBECF0]" />

        <div className="flex flex-col gap-2">
          {lessons.length === 0 ? (
            <NoContent
              desc="არ გაქვთ გაკვეთილი, გთხოვთ ჩანიშნოთ გაკვეთილი"
              needBtn={false}
            />
          ) : (
            lessons.map((lesson) => (
              <FutureLessonsBox
                key={lesson.id}
                teacher={teacher}
                lesson={lesson}
                onOpenMeetingLink={handleOpenMeetingLink}
              />
            ))
          )}
        </div>

        {/* გაკვეთილის შექმნის მოდალი */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-[#00000099]">
            <div
              ref={modalRef}
              className="relative w-full lg:max-w-lg mx-0 lg:mx-4 rounded-t-2xl lg:rounded-2xl bg-white overflow-auto h-[570px] lg:h-[592px]"
            >
              <LessonCreate teacherId={teacherId} setModalOpen={setModalOpen} />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-6 text-black text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* შეხვედრის ლინკის მოდალი */}
        {meetingModalOpen && selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-[#00000099]">
            <div
              ref={meetingModalRef}
              className="relative w-full lg:max-w-lg mx-0 lg:mx-4 rounded-t-2xl lg:rounded-2xl bg-white overflow-auto h-[400px] lg:h-[420px]"
            >
              <button
                onClick={() => setMeetingModalOpen(false)}
                className="absolute top-3 right-6 text-black text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureLessons;
