"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import OurLessons from "./OurLessons";

interface AtcivityTrackerBoxProps {
  color: string;
  textColor: string;
  description: string;
  text: string;
  seeAllText: string;
  profilePage?: boolean;
  onClick?: () => void;
}

const AtcivityTrackerBox = ({
  color,
  textColor,
  description,
  text,
  seeAllText,
  profilePage,
  onClick,
}: AtcivityTrackerBoxProps) => {
  return (
    <div
      className={`flex flex-col p-4  border border-[#EFEEF4] rounded-2xl sm:w-1/2 xl:justify-between xl:max-h-[152px]
        ${profilePage ? "bg-[#EBECF0]" : "bg-[#FFFFFF]"}`}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <span
          style={{ backgroundColor: color, color: textColor }}
          className="inline-block w-fit text-[10px] leading-3 px-3 py-2 rounded-[40px] font-helveticaneue-regular"
        >
          {text}
        </span>
        <span
          className="pt-3 text-xs leading-4 text-[#737373] font-helveticaneue-regular md:text-sm md:leading-5
        xl:text-xs xl:leading-4 2xl:text-sm 2xl:leading-5"
        >
          {description}
        </span>
      </div>
      <div className="pt-3 flex justify-between items-center md:pt-5">
        <span className="text-2xl leading-[28px] text-black font-spacegrotesk-bold md:text-[32px]">
          3
        </span>
        <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular underline underline-[#737373] underline-offset-3 cursor-pointer">
          {seeAllText}
        </span>
      </div>
    </div>
  );
};

const ActivityTracker = ({
  profilePage = false,
  teacher = false,
}: {
  profilePage?: boolean;
  teacher?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => setShowModal(false));
  return (
    <div
      className={` rounded-[20px] flex flex-col gap-3 xl:flex-row xl:items-center
        ${profilePage ? "bg-white" : "bg-[#EBECF0] p-3 "}`}
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row xl:flex-1">
        <AtcivityTrackerBox
          text="ისწავლე მეტი"
          color="rgba(255, 213, 42, 0.1)"
          textColor="#F0C514"
          description="აქტიური გაკვეთილი"
          seeAllText="ყველას ნახვა"
          profilePage={profilePage}
          onClick={() => setShowModal(true)}
        />
        <AtcivityTrackerBox
          text="ისწავლე მეტი"
          color="rgba(125, 63, 255, 0.1)"
          textColor="rgba(125, 63, 255, 0.973)"
          description={teacher ? "ჩემი მოსწავლეები" : "არჩეული რეპეტიტორი"}
          seeAllText="ყველას ნახვა"
          profilePage={profilePage}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row xl:flex-1 xl:items-center">
        <AtcivityTrackerBox
          text="საუკეთესო შედეგი"
          color="rgba(82, 206, 145, 0.1)"
          textColor="#52CE91"
          description="დასრულებული გაკვეთილი"
          seeAllText="ისტორიის ნახვა"
          profilePage={profilePage}
        />
        <div
          className={`p-4  border border-[#EFEEF4] rounded-2xl flex flex-col gap-3 md:gap-5 sm:w-1/2
            ${profilePage ? "bg-[#EBECF0]" : "bg-[#FFFFFF]"}`}
        >
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular md:text-sm md:leading-5">
            დღიურად დახარჯული დრო
          </span>
          <span
            className="text-2xl leading-[28px] font-spacegrotesk-bold md:text-[32px]"
            style={{ color: "rgba(125, 63, 255, 0.973)" }}
          >
            02:43:29
          </span>
          <span className="text-[10px] leading-3 text-[#737373] font-helveticaneue-regular md:text-xs md:leading-4">
            სწავლაში დაბანდებული დრო არასდროს არის დაკარგული
          </span>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-[#00000099]">
          <div
            ref={modalRef}
            className="relative w-full lg:max-w-lg mx-0 lg:mx-4 rounded-t-2xl lg:rounded-2xl bg-white overflow-auto h-[570px] lg:h-[592px]"
          >
            <OurLessons />
            <button
              onClick={() => setShowModal(false)}
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

export default ActivityTracker;
