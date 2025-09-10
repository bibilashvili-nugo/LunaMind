import React from "react";

const ChooseAnyTime = () => {
  return (
    <div className="text-center flex flex-col gap-3 w-full">
      <p className="text-sm leading-5 font-helveticaneue-regular text-[#939393] w-[288px] mx-auto">
        შენ შეგიძლია სწავლისთვის აირჩიო კვირის ნებისმიერი დღე
      </p>

      <div className="rounded-[16px] bg-[#F6F7FB] h-[242px] flex items-center justify-center p-[16px]">
        <div className="w-full h-full bg-white rounded-xl"></div>
      </div>
    </div>
  );
};

export default ChooseAnyTime;
