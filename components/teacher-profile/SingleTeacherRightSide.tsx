"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CaretDownSm, Check } from "react-coolicons";
import toast from "react-hot-toast";

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

interface SingleTeacherRightSideProps {
  teacher: Teacher;
  studentId: string;
  teacherUserId: string;
}
const SingleTeacherRightSide = ({
  teacher,
  studentId,
  teacherUserId,
}: SingleTeacherRightSideProps) => {
  const router = useRouter();
  const [openDays, setOpenDays] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  // მასწავლებლის საგნები
  const subjectsData = teacher.teacherSubjects.map((subject) => subject.name);

  // ფილტრირებული დღეები და დროები
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);

  // დღეები საგნის მიხედვით
  useEffect(() => {
    if (!selectedSubject) {
      setFilteredDays([]);
      setSelectedDay(null);
      setFilteredTimes([]);
      setSelectedTime(null);
      return;
    }

    const lessonsForSubject = teacher.lessons.filter(
      (lesson) => lesson.subject === selectedSubject
    );

    const days = [...new Set(lessonsForSubject.map((lesson) => lesson.day))];
    setFilteredDays(days);

    // თუ current selectedDay აღარ არის days-ში, გამოტოვე
    if (selectedDay && !days.includes(selectedDay)) {
      setSelectedDay(null);
      setSelectedTime(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject, teacher.lessons]);

  // დროები დღისა და საგნის მიხედვით
  useEffect(() => {
    if (!selectedSubject || !selectedDay) {
      setFilteredTimes([]);
      setSelectedTime(null);
      return;
    }

    const lessonsForDayAndSubject = teacher.lessons.filter(
      (lesson) =>
        lesson.subject === selectedSubject && lesson.day === selectedDay
    );

    const times = [
      ...new Set(lessonsForDayAndSubject.map((lesson) => lesson.time)),
    ];
    setFilteredTimes(times);

    if (selectedTime && !times.includes(selectedTime)) setSelectedTime(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject, selectedDay, teacher.lessons]);

  // ფასის გამოთვლა
  const getSelectedSubjectPrice = () => {
    if (!selectedSubject) return teacher.teacherSubjects[0]?.price || 60;
    const selected = teacher.teacherSubjects.find(
      (subj) => subj.name === selectedSubject
    );
    return selected?.price || 60;
  };

  const currentPrice = getSelectedSubjectPrice();

  const handleSelect = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    toggler: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(value);
    toggler(false);
  };

  const handlePayment = async () => {
    if (!selectedSubject) return toast.error("გთხოვთ, აირჩიოთ საგანი");
    if (!selectedDay) return toast.error("გთხოვთ, აირჩიოთ დღე");
    if (!selectedTime) return toast.error("გთხოვთ, აირჩიოთ დრო");
    if (!acceptedTerms)
      return toast.error("გთხოვთ, დაეთანხმეთ პირობებს და წესებს");
    if (!acceptedPrivacy)
      return toast.error("გთხოვთ, დაეთანხმეთ კონფიდენციალურობის პოლიტიკას");

    const orderData = {
      studentId,
      teacherId: teacherUserId, // ✅ გამოიყენე აქ
      subject: selectedSubject,
      day: selectedDay,
      time: selectedTime,
      price: currentPrice,
    };

    try {
      const response = await fetch("/api/book-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "შეცდომა გაკვეთილის დასაწერად");

      toast.success(
        `გაკვეთილი წარმატებით დაინიშნა! მასწავლებელი: ${teacher.user.firstName} ${teacher.user.lastName}, საგანი: ${selectedSubject}, დრო: ${selectedDay} ${selectedTime}, ფასი: ${currentPrice}₾`,
        { duration: 6000 }
      );

      router.push("/dashboard"); // გადაყვანა Dashboard-ზე
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("შეცდომა მოხდა");
        console.error(error);
      }
    }
  };

  return (
    <div className="lg:col-span-1">
      {/* Top notice */}
      <span className="p-3 bg-[#ECF1FF] w-full block rounded-t-2xl text-center text-[#080808] text-xs leading-4 font-helveticaneue-regular">
        სწავლაში დაბანდებული დრო არასდროს არის დაკარგული
      </span>

      {/* Price */}
      <div className="flex flex-col gap-2 p-4 bg-white">
        <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
          პირველი გაკვეთილის ფასი
        </span>
        <span className="text-2xl leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
          {currentPrice}.00 ₾
        </span>
      </div>
      <hr className="border border-[#EBECF0]" />

      {/* Subject Dropdown */}
      <div className="bg-white px-4 pt-4">
        <div className="relative w-full border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => {
              setOpenSubjects((prev) => !prev);
              setOpenDays(false);
              setOpenTime(false);
            }}
          >
            <div>
              <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                აირჩიეთ საგანი
              </span>
              <div className="text-sm leading-5 text-[#000000] font-helveticaneue-medium">
                {selectedSubject || "საგნის არჩევა"}
              </div>
            </div>
            <CaretDownSm className="text-[#969696] text-lg" />
          </div>

          {openSubjects && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#E6E6E6] rounded-xl max-h-48 overflow-y-auto z-10">
              {subjectsData.map((subj) => (
                <div
                  key={subj}
                  onClick={() =>
                    handleSelect(subj, setSelectedSubject, setOpenSubjects)
                  }
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  <span>{subj}</span>
                  {selectedSubject === subj && (
                    <Check className="w-4 h-4 text-[#F0C514]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Day Dropdown */}
      <div className="bg-white px-4 pt-3">
        <div className="relative w-full border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => {
              setOpenDays((prev) => !prev);
              setOpenSubjects(false);
              setOpenTime(false);
            }}
          >
            <div>
              <span className="text-xs text-[#969696] font-helveticaneue-regular">
                სასურველი დღე
              </span>
              <div className="text-sm text-[#000000] font-helveticaneue-medium mt-1">
                {selectedDay || "აირჩიეთ დღე"}
              </div>
            </div>
            <CaretDownSm className="text-[#969696] text-lg" />
          </div>

          {openDays && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#E6E6E6] rounded-xl max-h-48 overflow-y-auto z-10">
              {filteredDays.map((day) => (
                <div
                  key={day}
                  onClick={() => handleSelect(day, setSelectedDay, setOpenDays)}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  <span>{day}</span>
                  {selectedDay === day && (
                    <Check className="w-4 h-4 text-[#F0C514]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Time Dropdown */}
      <div className="bg-white px-4 pt-3 pb-4">
        <div className="relative w-full border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => {
              setOpenTime((prev) => !prev);
              setOpenDays(false);
              setOpenSubjects(false);
            }}
          >
            <div>
              <span className="text-xs text-[#969696] font-helveticaneue-regular">
                სასურველი დრო
              </span>
              <div className="text-sm text-[#000000] font-helveticaneue-medium mt-1">
                {selectedTime || "აირჩიეთ დრო"}
              </div>
            </div>
            <CaretDownSm className="text-[#969696] text-lg" />
          </div>

          {openTime && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#E6E6E6] rounded-xl max-h-48 overflow-y-auto z-10">
              {filteredTimes.map((time) => (
                <div
                  key={time}
                  onClick={() =>
                    handleSelect(time, setSelectedTime, setOpenTime)
                  }
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  <span>{time}</span>
                  {selectedTime === time && (
                    <Check className="w-4 h-4 text-[#F0C514]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="border border-[#EBECF0] bg-white" />

      {/* Checkboxes */}
      <div className="bg-white pt-4 flex flex-col gap-2">
        <div className="px-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB] accent-[#F0C514] cursor-pointer"
            />
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              ვეთანხმები{" "}
              <span className="text-[#0077FF] cursor-pointer text-sm leading-5 font-helveticaneue-regular">
                პირობებს და წესებს
              </span>
            </span>
          </label>
        </div>
        <div className="px-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB] accent-[#F0C514] cursor-pointer"
            />
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              ვეთანხმები{" "}
              <span className="text-[#0077FF] cursor-pointer text-sm leading-5 font-helveticaneue-regular">
                კონფიდენციალურობის პოლიტიკას
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="bg-white py-4 px-4 rounded-b-2xl">
        <button
          className="text-sm leading-5 text-[#080808] font-helveticaneue-medium py-3 bg-[#F0C514] rounded-[50px] w-full"
          onClick={handlePayment}
        >
          გადახდა
        </button>
      </div>
    </div>
  );
};

export default SingleTeacherRightSide;
