"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Tutors = () => {
  const t = useTranslations("tutors");
  const tutorImages = [
    "/images/tutor.png",
    "/images/tutor.png",
    "/images/tutor.png",
    "/images/tutor.png",
    "/images/tutor.png",
  ];

  return (
    <>
      <div className="flex items-center justify-center gap-3 pt-6 pb-6 lg:pb-4 3xl:pb-6 lg:pt-0">
        <div className="flex items-center">
          {tutorImages.map((src, index) => (
            <div
              key={index}
              className={`-ml-6 w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden lg:w-[45px] lg:h-[45px] xl:w-[52px] xl:h-[52px]
              ${index === 0 ? "ml-0" : ""} 
              ${index === 4 ? "block lg:hidden xl:block" : ""}`}
            >
              <Image
                alt={`tutor ${index + 1}`}
                src={src}
                width={52}
                height={52}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-spacegrotesk-bold text-[#0C0F21] text-2xl leading-6">
            137+
          </span>
          <span className="text-xs leading-4 text-[#939393] font-helveticaneue-regular">
            {t("tutorsCount")}
          </span>
        </div>
      </div>
      <div className="w-full text-center text-xs leading-4 font-helveticaneue-regular text-[#737373]  hidden lg:block pb-3 3xl:pb-4">
        {t("chooseSubject")}
      </div>
    </>
  );
};

export default Tutors;
