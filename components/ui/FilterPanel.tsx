"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  initialTime?: string; // format: "09:00-12:00"
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

  const [selectedSubjects, setSelectedSubjects] =
    useState<string[]>(initialSubjects);
  const [selectedDays, setSelectedDays] = useState<string[]>(initialDays);
  const [timeStart, setTimeStart] = useState(
    initialTime ? initialTime.split("-")[0] : ""
  );
  const [timeEnd, setTimeEnd] = useState(
    initialTime ? initialTime.split("-")[1] : ""
  );
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [isLoading, setIsLoading] = useState(false);

  const subjectsRef = useRef<HTMLDivElement | null>(null);
  const daysRef = useRef<HTMLDivElement | null>(null);

  // Click გარეთ დახურვისთვის (თუ იყენებთ dropdown-ს)
  useClickOutside(subjectsRef, () => {});
  useClickOutside(daysRef, () => {});

  // initial state-ს განახლება, როცა prop-ები იცვლება
  useEffect(() => {
    setSelectedSubjects(initialSubjects);
    setSelectedDays(initialDays);

    if (initialTime) {
      const [start, end] = initialTime.split("-");
      setTimeStart(start || "");
      setTimeEnd(end || "");
    } else {
      setTimeStart("");
      setTimeEnd("");
    }

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

  const isValidTime = (value: string) => {
    if (!value.includes(":")) return false;
    const [h, m] = value.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return false;
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  };

  const padTime = (value: string) => {
    if (!value) return "";
    const [h, m] = value.split(":");
    const hh = h.padStart(2, "0");
    const mm = (m || "00").padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const handleFilter = async () => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());

    if (selectedSubjects.length > 0)
      params.set("subjects", selectedSubjects.join(","));
    else params.delete("subjects");

    if (selectedDays.length > 0) params.set("days", selectedDays.join(","));
    else params.delete("days");

    if (timeStart || timeEnd)
      params.set("time", `${timeStart || ""}-${timeEnd || ""}`);
    else params.delete("time");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    try {
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
    timeStart ||
    timeEnd ||
    minPrice ||
    maxPrice;

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedDays([]);
    setTimeStart("");
    setTimeEnd("");
    setMinPrice("");
    setMaxPrice("");
    router.replace("/dashboard/tutors", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* SUBJECTS */}
      <div className="flex flex-col gap-2">
        <span className="text-sm leading-5 text-[#000000] mb-1 font-helveticaneue-medium">
          საგანი
        </span>
        {subjectsData.map((subject) => (
          <label key={subject} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSubjects.includes(subject)}
              onChange={() => toggleSubject(subject)}
              className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB] accent-[#F0C514] cursor-pointer"
            />
            <span className="text-sm leading-5 text-[#000] font-helveticaneue-regular">
              {subject}
            </span>
          </label>
        ))}
      </div>

      {/* DAYS */}
      <div className="flex flex-col gap-2">
        <span className="text-sm leading-5 text-[#000000] mb-1 font-helveticaneue-medium">
          სასურველი დღე
        </span>
        {daysData.map((day) => (
          <label key={day} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => toggleDay(day)}
              className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB] accent-[#F0C514] cursor-pointer"
            />
            <span className="text-sm leading-5 text-[#000] font-helveticaneue-regular">
              {day}
            </span>
          </label>
        ))}
      </div>

      {/* TIME RANGE */}
      <div className="flex flex-col gap-2">
        <span className="text-sm leading-5 text-[#000000] mb-1 font-helveticaneue-medium">
          დრო
        </span>
        <div className="flex items-center flex-col gap-2">
          <div className="w-full relative">
            <div className="absolute left-3 top-1/4 transform -translate-y-1/4 text-xs leading-4 text-[#737373] font-helveticaneue-regular pointer-events-none">
              დაწყება
            </div>
            <input
              type="text"
              placeholder="00:00"
              value={timeStart}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9:]/g, "");
                if (value.length === 2 && !value.includes(":")) value += ":";
                if (
                  value.length <= 5 &&
                  (!value.includes(":") || isValidTime(value))
                )
                  setTimeStart(value);
              }}
              onBlur={() => setTimeStart(padTime(timeStart))}
              className="w-full border border-[#F1F1F1] rounded-xl px-3 pb-[10px] pt-[26px] text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none leading-5"
              maxLength={5}
            />
          </div>

          <div className="w-full relative ">
            <div className="absolute left-3 top-1/4 transform -translate-y-1/4 text-xs leading-4 text-[#737373] font-helveticaneue-regular pointer-events-none">
              დასრულება
            </div>
            <input
              type="text"
              placeholder="23:59"
              value={timeEnd}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9:]/g, "");
                if (value.length === 2 && !value.includes(":")) value += ":";
                if (
                  value.length <= 5 &&
                  (!value.includes(":") || isValidTime(value))
                )
                  setTimeEnd(value);
              }}
              onBlur={() => setTimeEnd(padTime(timeEnd))}
              className="w-full border border-[#F1F1F1] rounded-xl px-3 pb-[10px] pt-[26px] text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none leading-5"
              maxLength={5}
            />
          </div>
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="flex flex-col gap-2">
        <span className="text-sm leading-5 text-[#000000] mb-1 font-helveticaneue-medium">
          ფასი
        </span>
        <div className="flex items-center">
          <input
            type="number"
            placeholder="დან"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-[#F1F1F1] rounded-tl-xl rounded-bl-xl border-r-0 p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-[#000000] placeholder:font-helveticaneue-medium placeholder:text-sm"
          />
          <div className="bg-[#EBECF0] w-[1px] h-8"></div>
          <input
            type="number"
            placeholder="მდე"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-[#F1F1F1] rounded-tr-xl rounded-br-xl border-l-0 p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none placeholder-[#000000] placeholder:font-helveticaneue-medium placeholder:text-sm"
          />
        </div>
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
