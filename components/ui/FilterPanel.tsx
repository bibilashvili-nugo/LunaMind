"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, CaretDownSm, CaretUpSm } from "react-coolicons";
import { useClickOutside } from "@/hooks/useClickOutside";

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

interface FilterPanelProps {
  initialSubjects?: string[];
  initialDays?: string[];
  initialTime?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  onFiltered?: () => void;
}

export const FilterPanel = ({
  initialSubjects = [],
  initialDays = [],
  initialTime = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  onFiltered,
}: FilterPanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openSubjects, setOpenSubjects] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [selectedSubjects, setSelectedSubjects] =
    useState<string[]>(initialSubjects);
  const [selectedDays, setSelectedDays] = useState<string[]>(initialDays);
  const [time, setTime] = useState(initialTime);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [isLoading, setIsLoading] = useState(false);

  const [showSelectSubjectsButton, setShowSelectSubjectsButton] =
    useState(false);
  const [showSelectDaysButton, setShowSelectDaysButton] = useState(false);

  const subjectsRef = useRef<HTMLDivElement | null>(null);
  const daysRef = useRef<HTMLDivElement | null>(null);

  // ჰუკები: click გარეთ დახურვისთვის
  useClickOutside(subjectsRef, () => setOpenSubjects(false));
  useClickOutside(daysRef, () => setOpenDays(false));

  // URL-დან პარამეტრების დასეტვა
  useEffect(() => {
    setSelectedSubjects(initialSubjects);
    setSelectedDays(initialDays);
    setTime(initialTime);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
  }, [
    initialSubjects,
    initialDays,
    initialTime,
    initialMinPrice,
    initialMaxPrice,
  ]);

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

  const handleFilter = async () => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());

    if (selectedSubjects.length > 0) {
      params.set("subjects", selectedSubjects.join(","));
    } else {
      params.delete("subjects");
    }

    if (selectedDays.length > 0) {
      params.set("days", selectedDays.join(","));
    } else {
      params.delete("days");
    }

    if (time) {
      params.set("time", time);
    } else {
      params.delete("time");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    try {
      // ახალი მონაცემების ჩატვირთვა current URL-ზე
      router.replace(`?${params.toString()}`, { scroll: false });
      onFiltered?.();
    } catch (error) {
      console.error("Filter error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveFilters =
    selectedSubjects.length > 0 ||
    selectedDays.length > 0 ||
    time ||
    minPrice ||
    maxPrice;

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedDays([]);
    setTime("");
    setMinPrice("");
    setMaxPrice("");
    router.replace("/dashboard/tutors", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* SUBJECTS */}
      <div className="relative" ref={subjectsRef}>
        <button
          onClick={() => {
            const willOpen = !openSubjects;
            setOpenSubjects(willOpen);
            setOpenDays(false);

            if (willOpen) {
              setTimeout(() => setShowSelectSubjectsButton(true), 0);
            } else {
              setShowSelectSubjectsButton(false);
            }
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
          <div className="absolute w-full mt-1 z-10 rounded-xl overflow-hidden border border-[#F1F1F1] bg-white max-h-60 flex flex-col">
            <div className="overflow-y-auto max-h-60 scrollbar-thumb-rounded">
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

            {showSelectSubjectsButton && (
              <div
                className="p-2 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 text-sm font-helveticaneue-medium"
                onClick={() => setOpenSubjects(false)}
              >
                არჩევა
              </div>
            )}

            <style jsx>{`
              .scrollbar-thumb-rounded::-webkit-scrollbar {
                width: 6px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
                background-color: #f0c514;
                border-radius: 10px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-thumb:hover {
                background-color: #e6c200;
              }
            `}</style>
          </div>
        )}
      </div>

      {/* DAYS */}
      <div className="relative" ref={daysRef}>
        <button
          onClick={() => {
            const willOpen = !openDays;
            setOpenDays(willOpen);
            setOpenSubjects(false);

            if (willOpen) {
              setTimeout(() => setShowSelectDaysButton(true), 0);
            } else {
              setShowSelectDaysButton(false);
            }
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
          <div className="absolute w-full mt-1 z-10 rounded-xl overflow-hidden border border-[#F1F1F1] bg-white max-h-60 flex flex-col">
            <div className="overflow-y-auto max-h-60 scrollbar-thumb-rounded">
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

            {showSelectDaysButton && (
              <div
                className="p-2 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 text-sm font-helveticaneue-medium"
                onClick={() => setOpenDays(false)}
              >
                არჩევა
              </div>
            )}

            <style jsx>{`
              .scrollbar-thumb-rounded::-webkit-scrollbar {
                width: 6px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
                background-color: #f0c514;
                border-radius: 10px;
              }
              .scrollbar-thumb-rounded::-webkit-scrollbar-thumb:hover {
                background-color: #e6c200;
              }
            `}</style>
          </div>
        )}
      </div>

      {/* TIME */}
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
        disabled={isLoading}
        className="py-4 w-full text-sm leading-5 font-helveticaneue-medium rounded-[50px] bg-[#F0C514] text-[#080808] hover:bg-[#e6b800] cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            მოძებნა...
          </>
        ) : (
          "გაფილტვრა"
        )}
      </button>

      {/* CLEAR FILTERS BUTTON */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          disabled={isLoading}
          className="py-3 w-full text-sm leading-5 font-helveticaneue-medium rounded-[50px] border border-[#F0C514] text-[#080808] hover:bg-[#fffae6] cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ფილტრების გასუფთავება
        </button>
      )}
    </div>
  );
};
