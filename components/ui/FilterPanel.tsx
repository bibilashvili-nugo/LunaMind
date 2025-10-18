"use client";

import { useState } from "react";
import { Check, CaretDownSm, CaretUpSm } from "react-coolicons";

const subjectsData = [
  "მათემატიკა",
  "ქართული",
  "ისტორია",
  "გეოგრაფია",
  "ქიმია",
  "ფიზიკა",
  "ბიოლოგია",
  "ხელოვნება",
  "ინგლისური",
  "რუსული",
  "გერმანული",
  "ესპანური",
  "ფრანგული",
  "დაწყებითი კლასები",
];

const daysData = [
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი",
  "კვირა",
];

export const FilterPanel = () => {
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleFilter = () => {
    console.log({
      selectedSubjects,
      selectedDays,
      time,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* SUBJECTS */}
      <div className="relative">
        <button
          onClick={() => {
            setOpenSubjects(!openSubjects);
            setOpenDays(false);
          }}
          className="w-full text-left border border-[#F1F1F1] rounded-xl p-3 bg-white flex justify-between items-center"
        >
          <span
            className={`text-sm ${
              selectedSubjects.length > 0
                ? "leading-5 text-[#000000] font-helveticaneue-medium"
                : "leading-4 text-[#737373] font-helveticaneue-regular"
            }`}
          >
            {selectedSubjects.length > 0
              ? selectedSubjects.join(", ")
              : "აირჩიეთ საგნები"}
          </span>

          {openSubjects ? <CaretUpSm /> : <CaretDownSm />}
        </button>

        {openSubjects && (
          <div className="absolute w-full bg-white border border-[#F1F1F1] rounded-xl mt-1 max-h-60 overflow-y-auto z-10">
            {subjectsData.map((subject) => (
              <div
                key={subject}
                onClick={() => toggleSubject(subject)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                <span>{subject}</span>
                {selectedSubjects.includes(subject) && (
                  <Check className="w-4 h-4 text-[#F0C514]" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DAYS */}
      <div className="relative">
        <button
          onClick={() => {
            setOpenDays(!openDays);
            setOpenSubjects(false);
          }}
          className="w-full text-left border border-[#F1F1F1] rounded-xl p-3 bg-white flex justify-between items-center"
        >
          <span
            className={`text-sm ${
              selectedDays.length > 0
                ? "leading-5 text-[#000000] font-helveticaneue-medium"
                : "leading-4 text-[#737373] font-helveticaneue-regular"
            }`}
          >
            {selectedDays.length > 0
              ? selectedDays.join(", ")
              : "სასურველი დღე"}
          </span>

          {openDays ? <CaretUpSm /> : <CaretDownSm />}
        </button>

        {openDays && (
          <div className="absolute w-full bg-white border border-[#F1F1F1] rounded-xl mt-1 max-h-60 overflow-y-auto z-10">
            {daysData.map((day) => (
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

      {/* ✅ TIME (24-hour input) */}
      <div className="relative">
        <input
          type="text"
          placeholder="მიუთითეთ შეხვედრის დრო"
          value={time}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9:]/g, "");
            if (value.length === 2 && !value.includes(":"))
              setTime(value + ":");
            else if (value.length <= 5) setTime(value);
          }}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium 
          text-[#080808] bg-white focus:outline-none placeholder-[#737373] 
          placeholder:font-helveticaneue-regular placeholder:text-xs"
          maxLength={5}
        />
      </div>

      {/* PRICE RANGE */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="დან"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-[#737373] placeholder:font-helveticaneue-regular placeholder:text-sm"
        />
        <input
          type="number"
          placeholder="მდე"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-[#737373] placeholder:font-helveticaneue-regular placeholder:text-sm"
        />
      </div>

      {/* FILTER BUTTON */}
      <button
        onClick={handleFilter}
        disabled={
          selectedSubjects.length === 0 &&
          selectedDays.length === 0 &&
          !time &&
          !minPrice &&
          !maxPrice
        }
        className={`
    py-4 w-full text-sm leading-5 font-helveticaneue-medium rounded-[50px] 
    ${
      selectedSubjects.length === 0 &&
      selectedDays.length === 0 &&
      !time &&
      !minPrice &&
      !maxPrice
        ? "bg-[#DEDDE2] text-[#8B8B8B] cursor-not-allowed"
        : "bg-[#F0C514] text-[#080808] hover:bg-[#e6b800] cursor-pointer transition"
    }
  `}
      >
        გაფილტვრა
      </button>
    </div>
  );
};
