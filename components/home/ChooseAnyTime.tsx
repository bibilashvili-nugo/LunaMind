import React from "react";
import TutorsType from "./TutorsType";

const ChooseAnyTime = () => {
  return (
    <div className="text-center flex flex-col gap-3 w-full sm:gap-5 lg:order-1 lg:w-[20%] lg:gap-3">
      <p className="text-sm leading-5 font-helveticaneue-regular text-[#939393] w-[288px] mx-auto lg:w-full lg:text-xs">
        შენ შეგიძლია სწავლისთვის აირჩიო კვირის ნებისმიერი დღე
      </p>

      <div className="rounded-[16px] bg-[#F6F7FB] h-[242px] flex items-center justify-center p-[16px] sm:hidden lg:flex lg:h-full lg:rounded-4xl">
        <div className="w-full h-full bg-white rounded-xl lg:rounded-[30px]"></div>
      </div>

      <div className="gap-4 hidden sm:flex lg:hidden">
        <div className="rounded-[16px] bg-[#F6F7FB] h-[242px] sm:h-[282px] flex items-center justify-center p-[16px] sm:w-1/2">
          <div className="w-full h-full bg-white rounded-xl"></div>
        </div>
        <TutorsType />
      </div>
    </div>
  );
};

export default ChooseAnyTime;
