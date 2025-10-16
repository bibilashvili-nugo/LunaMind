"use client";

import { useEffect, useRef, useState } from "react";
import LessonCreate from "../teacher-profile/LessonCreate";
import { useClickOutside } from "@/hooks/useClickOutside";
import NoContent from "../ui/NoContent";
import LinkCreate from "../teacher-profile/LinkCreate";

interface Lesson {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  comment?: string;
  link?: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const FutureLessonsBoxTitle = ({ title }: { title: string }) => (
  <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
    {title}
  </span>
);

const FutureLessonsBoxTime = ({ timeLine }: { timeLine: string }) => (
  <span className="text-sm leading-5 font-helveticaneue-regular text-[#080808]">
    {timeLine}
  </span>
);

const FutureLessonsBoxContent = ({
  teacher = false,
  lesson,
  onOpenMeetingLink,
}: {
  teacher?: boolean;
  lesson: Lesson;
  onOpenMeetingLink: (lesson: Lesson) => void;
}) => {
  const fullName = `${lesson.teacher.firstName} ${lesson.teacher.lastName}`;
  const handleAttendanceClick = () => {
    if (lesson.link) {
      window.open(lesson.link, "_blank"); // Opens link in a new tab
    } else {
      alert("შეხვედრის ლინკი ჯერ არ არის მითითებული");
    }
  };
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-black rounded-full"></div>
        <div className="flex flex-col">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            {fullName}
          </span>
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
            {lesson.subject}
          </span>
        </div>
      </div>
      {teacher ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <button
            onClick={() => onOpenMeetingLink(lesson)}
            className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-white text-[#080808] cursor-pointer sm:px-[34px] order-2 sm:order-1"
          >
            შეხვედრის ლინკი
          </button>
          <button
            className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-[#F0C514] text-[#080808] cursor-pointer sm:px-[34px] order-1 sm:order-2"
            onClick={handleAttendanceClick}
          >
            დასწრება
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
}: {
  teacher?: boolean;
  lesson: Lesson;
  onOpenMeetingLink: (lesson: Lesson) => void;
}) => {
  const formattedDate = new Date(lesson.date).toLocaleDateString("ka-GE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
          <FutureLessonsBoxTime timeLine={`${lesson.duration} საათი`} />
        </div>
      </div>
      <FutureLessonsBoxContent
        teacher={teacher}
        lesson={lesson}
        onOpenMeetingLink={onOpenMeetingLink}
      />
    </div>
  );
};

const FutureLessons = ({
  teacher = false,
  teacherId = undefined,
}: {
  teacher?: boolean;
  teacherId?: string;
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

  useEffect(() => {
    const today = new Date();
    const formatted = new Intl.DateTimeFormat("ka-GE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);
    setFormattedDate(formatted);
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch("/api/teachers/lessons");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Lesson[] = await res.json();
        const futureLessons = data.filter(
          (lesson) =>
            new Date(lesson.date) >= new Date() &&
            (!teacherId || lesson.teacher.id === teacherId)
        );
        setLessons(futureLessons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLessons();
  }, [teacherId]);

  const handleOpenMeetingLink = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setMeetingModalOpen(true);
  };

  return (
    <div
      className="mt-4 bg-white rounded-2xl p-5 flex flex-col gap-4 overflow-y-auto lg:mt-0 xl:col-span-2 max-h-[644px] xl:max-h-[680px]"
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
            className="text-sm leading-5 font-helveticaneue-medium py-3 w-full bg-[#FFEDFA] sm:w-fit sm:px-6 rounded-[50px] cursor-pointer text-[#080808]"
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
            <LinkCreate
              lesson={selectedLesson}
              onClose={() => setMeetingModalOpen(false)}
            />
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
  );
};

export default FutureLessons;
