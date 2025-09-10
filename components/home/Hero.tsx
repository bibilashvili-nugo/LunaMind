import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-aclonica-regular text-2xl leading-[0] text-[#0C0F21] pt-8 pb-6">
        LunaMind
      </span>

      <span className="font-lgvanastasia-regular text-[#0C0F21] text-[40px] leading-[100%] pb-3">
        ისწავლე ონლაინ საუკეთესო
      </span>

      <div className="relative pb-4">
        <span
          className="font-lgvanastasia-regular text-[#0C0F21] text-[40px] leading-[100%] bg-[#D6FFEB] px-[26px] py-2
      border-r-2 border-l-2 border-[#52CE91]"
        >
          რეპეტიტორებთან
        </span>
        <div className="w-3 h-3 rounded-full border-2 border-[#52CE91] bg-white absolute z-10 top-[-8px] left-[-4px]"></div>
        <div className="w-3 h-3 rounded-full border-2 border-[#52CE91] bg-white absolute z-10 bottom-[8px] right-[-4px]"></div>
      </div>
      <span className="font-helveticaneue-regular text-xs leading-4 text-[#737373] text-center pb-6">
        ჩვენი პლატფორმა აკავშირებს ქართველ სტუდენტებს კვალიფიციურ რეპეტიტორებთან
        ყველა საგანში
      </span>
      <div className="flex justify-center items-center gap-4">
        <button className="font-helveticaneue-medium text-xs leading-4 px-[34px] py-[14px] rounded-[40px] bg-[#FFD52A]">
          მოსწავლე
        </button>
        <button className="font-helveticaneue-medium text-xs leading-4 px-[34px] py-[14px] rounded-[40px] bg-[#F6F7FB]">
          რეპეტიტორი
        </button>
      </div>
    </div>
  );
};

export default Hero;
