import React from "react";

const ActivityTrackSecondBox = () => {
  return (
    <div className="bg-[#EBECF0] rounded-2xl border border-[#EFEEF4] p-4 flex flex-col gap-3">
      <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular w-full block">
        აქტიური გაკვეთილი
      </span>
      <div className="flex flex-col gap-3">
        <span className="text-2xl leading-[28px] block text-black font-spacegrotesk-bold">
          5
        </span>
        <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular underline underline-[#737373] underline-offset-3 cursor-pointer">
          ყველას ნახვა
        </span>
      </div>
    </div>
  );
};

const ActivityTrackerFinallBox = () => {
  return (
    <div className="bg-[#EBECF0] rounded-2xl border border-[#EFEEF4] p-4 flex flex-col gap-3">
      <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular w-full block">
        დრო
      </span>
      <span
        className="text-2xl leading-[28px] font-spacegrotesk-bold md:text-[32px] w-full block"
        style={{ color: "rgba(125, 63, 255, 0.973)" }}
      >
        02:43:29
      </span>
      <span className="text-xs leading-3 text-[#737373] font-helveticaneue-regular w-full block">
        სწავლაში დაბანდებული დრო არასდროს არის დაკარგული
      </span>
    </div>
  );
};

const ActivityTackSecond = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <ActivityTrackSecondBox />
      <ActivityTrackSecondBox />
      <ActivityTrackSecondBox />
      <ActivityTrackerFinallBox />
    </div>
  );
};

export default ActivityTackSecond;
