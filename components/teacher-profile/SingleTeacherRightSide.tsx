"use client";

import { useState } from "react";
import { CaretDownSm, Check } from "react-coolicons";

const daysData = [
  "ორშაბათი",
  "სამშაბათი",
  "ოთხშაბათი",
  "ხუთშაბათი",
  "პარასკევი",
  "შაბათი",
  "კვირა",
];

const timeData = ["10:00", "12:00", "15:00", "17:00", "19:00", "21:00"];

const subjectsData = [
  "ქართული",
  "გერმანული",
  "ინგლისური",
  "მათემატიკა",
  "ფიზიკა",
];

const SingleTeacherRightSide = () => {
  const [openDays, setOpenDays] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSelect = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    toggler: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(value);
    toggler(false);
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
          60.00 ₾
        </span>
      </div>
      <hr className="border border-[#EBECF0]" />
      {/* Subject Dropdown */}
      <div className="bg-white px-4 pt-4">
        <div className="relative w-full  border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer  ">
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
        <div className="relative w-full  border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer  ">
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
              {daysData.map((day) => (
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
        <div className="relative w-full  border border-[#EBECF0] px-3 py-[10px] rounded-xl flex flex-col cursor-pointer  ">
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
              {timeData.map((time) => (
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
      <div className="bg-white pt-4 flex flex-col gap-2">
        <div className="px-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
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
              className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB] accent-[#F0C514] cursor-pointer"
            />
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              ვეთანხმები
              <span className="text-[#0077FF] cursor-pointer text-sm leading-5 font-helveticaneue-regular">
                კონფიდენციალურობის პოლიტიკას
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="bg-white py-4 px-4">
        <button className="text-sm leading-5 text-[#080808] font-helveticaneue-medium py-3 bg-[#F0C514] rounded-[50px] w-full">
          გადახდა
        </button>
      </div>
    </div>
  );
};

export default SingleTeacherRightSide;
