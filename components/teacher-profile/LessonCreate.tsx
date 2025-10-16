"use client";

import React, { useState } from "react";
import { CaretDownSm, CaretUpSm, Check } from "react-coolicons";
import toast from "react-hot-toast";

const subjects = [
  "ინგლისური ენა",
  "ქართული ენა",
  "მათემატიკა",
  "ფიზიკა",
  "ქიმია",
  "ბიოლოგია",
  "ძალიან გრძელი საგანი სახელით მაგალითად: ქიმიური ანალიზი",
];

const days = [
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი",
  "კვირა",
];

interface LessonCreateProps {
  teacherId?: string; // ავტორიზებული მასწავლებლის ID
  setModalOpen?: (open: boolean) => void;
}

const LessonCreate: React.FC<LessonCreateProps> = ({
  teacherId = undefined,
  setModalOpen,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [openSubject, setOpenSubject] = useState(false);
  const [openDay, setOpenDay] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9:]/g, "");
    if (value.length === 2 && !value.includes(":")) setTime(value + ":");
    else if (value.length <= 5) setTime(value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, "").replace(",", ".");
    setDuration(value);
  };

  const handleSubmit = async () => {
    if (
      !selectedSubject ||
      selectedDays.length === 0 ||
      !time.match(/^\d{2}:\d{2}$/) ||
      !duration
    ) {
      toast.error("გთხოვთ შეავსოთ ყველა ველი სწორად");
      return;
    }

    try {
      const res = await fetch("/api/teachers/createLesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          subject: selectedSubject,
          days: selectedDays,
          time,
          duration,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        toast.error("გაკვეთილის შექმნა ვერ მოხერხდა");
        return;
      }

      toast.success("გაკვეთილი წარმატებით შეიქმნა!");
      // ფორმის reset
      setSelectedSubject(null);
      setSelectedDays([]);
      setTime("");
      setDuration("");
      setComment("");
      if (setModalOpen) setModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("შეცდომა მოხდა");
    }
  };

  return (
    <div className="mt-6 w-full">
      <span className="font-helveticaneue-medium !font-bold px-4">
        გაკვეთილის ჩანიშვნა
      </span>
      <hr className="mt-4 text-[#EBECF0]" />

      {/* SUBJECT */}
      <div className="relative mt-4 px-4">
        <button
          onClick={() => {
            setOpenSubject(!openSubject);
            setOpenDay(false);
          }}
          className="w-full text-left border border-[#F1F1F1] rounded-xl p-3 bg-white flex justify-between items-center"
        >
          <span className="text-sm leading-5 text-black font-helveticaneue-medium break-words whitespace-normal">
            {selectedSubject || "მიუთითეთ საგანი რომელსაც ასწავლით"}
          </span>
          <span>{openSubject ? <CaretUpSm /> : <CaretDownSm />}</span>
        </button>
        {openSubject && (
          <div className="absolute w-full bg-white border border-[#F1F1F1] rounded-xl mt-1 max-h-60 overflow-y-auto z-10">
            {subjects.map((subject) => (
              <div
                key={subject}
                onClick={() => {
                  setSelectedSubject(subject);
                  setOpenSubject(false);
                }}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm break-words"
              >
                {subject}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DAYS */}
      <div className="relative mt-4 px-4">
        <button
          onClick={() => {
            setOpenDay(!openDay);
            setOpenSubject(false);
          }}
          className="w-full text-left border border-[#F1F1F1] rounded-xl p-3 bg-white flex justify-between items-center"
        >
          <span className="text-sm leading-5 text-black font-helveticaneue-medium break-words whitespace-normal">
            {selectedDays.length > 0
              ? selectedDays.join(", ")
              : "მიუთითეთ კვირის დღეები"}
          </span>
          <span>{openDay ? <CaretUpSm /> : <CaretDownSm />}</span>
        </button>
        {openDay && (
          <div className="absolute w-full bg-white border border-[#F1F1F1] rounded-xl mt-1 max-h-60 overflow-y-auto z-10">
            {days.map((day) => (
              <div
                key={day}
                onClick={() => toggleDay(day)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                <span>{day}</span>
                {selectedDays.includes(day) && (
                  <Check className="w-4 h-4 text-[#F0C514]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TIME */}
      <div className="mt-4 px-4">
        <input
          type="text"
          placeholder="მიუთითეთ შეხვედრის დრო"
          value={time}
          onChange={handleTimeChange}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-gray-400"
          maxLength={5}
        />
      </div>

      {/* DURATION */}
      <div className="mt-4 px-4 relative">
        <input
          type="text"
          placeholder="შეიყვანეთ შეხვედრის ხანგრძლივობა"
          value={duration}
          onChange={handleDurationChange}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 pr-12 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-gray-400"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          საათი
        </span>
      </div>

      {/* COMMENT */}
      <div className="mt-4 px-4">
        <textarea
          placeholder="შეიყვანეთ კომენტარი (სურვილისამებრ)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-gray-400 resize-none h-24"
        />
      </div>

      {/* SUBMIT */}
      <div className="px-4">
        <button
          onClick={handleSubmit}
          disabled={
            !selectedSubject ||
            selectedDays.length === 0 ||
            !time.match(/^\d{2}:\d{2}$/) ||
            !duration
          }
          className={`mt-5 w-full py-3 rounded-xl font-helveticaneue-medium text-white transition ${
            selectedSubject &&
            selectedDays.length > 0 &&
            time.match(/^\d{2}:\d{2}$/) &&
            duration
              ? "bg-[#F0C514] hover:bg-[#e6b800]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          ჩანიშვნა
        </button>
      </div>
    </div>
  );
};

export default LessonCreate;
