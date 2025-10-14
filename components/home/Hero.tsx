"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const Hero = ({ id }: { id: string }) => {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [currentLang, setCurrentLang] = useState(locale);

  // Store locale in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", locale);
    setCurrentLang(locale);
  }, [locale]);

  const fontClass =
    currentLang === "ka"
      ? "font-lgvanastasia-regular"
      : "font-helveticaneue-medium";

  return (
    <div
      className="flex flex-col items-center justify-center pb-6 lg:mt-[100px]"
      id={id}
    >
      <span className="font-aclonica-regular text-2xl leading-[0] text-[#0C0F21] pt-8 pb-6 sm:text-[32px] sm:pb-8 lg:hidden">
        LunaMind
      </span>

      <div>
        <span
          className={`text-[#0C0F21] text-[40px] leading-[100%] pb-3 lg:pb-6
      sm:text-[52px] md:text-[64px] lg:hidden ${fontClass}`}
        >
          {t("learnOnlineBest")}
        </span>
        <span
          className={`hidden lg:block text-[#0C0F21]  leading-[100%] pb-6 xl:pb-[19px]
      text-[84px] xl:text-[102px] ${fontClass}`}
        >
          {t("learnOnline")}
        </span>
      </div>

      <div className="relative pb-4 md:pb-3 lg:pb-[22px] xl:pb-[25px]">
        <span
          className={`text-[#0C0F21] text-[40px] leading-[100%] bg-[#D6FFEB] px-[26px] py-2
      border-r-2 border-l-2 border-[#52CE91] sm:text-[52px] sm:p-2 md:text-[64px] lg:hidden ${fontClass}`}
        >
          {t("withTutors")}
        </span>
        <span
          className={`hidden lg:block text-[84px] leading-[100%] border-r-2 border-l-2 border-[#52CE91] bg-[#D6FFEB] p-2
        xl:text-[102px] xl:px-[15px] xl:pt-[9px] xl:pb-[21px] ${fontClass}`}
        >
          {t("withBestTutors")}
        </span>
        <div className="w-3 h-3 rounded-full border-2 xl:border-4 lg:w-[18px] lg:h-[18px]  border-[#52CE91] bg-white absolute z-10 top-[-8px] left-[-4px] lg:left-[-8px]"></div>
        <div className="w-3 h-3 rounded-full border-2 xl:border-4 lg:w-[18px] lg:h-[18px] border-[#52CE91] bg-white absolute z-10 bottom-[8px] right-[-4px] lg:right-[-8px]"></div>
      </div>
      <span
        className="font-helveticaneue-regular text-xs leading-4 text-[#737373] text-center pb-6 sm:text-sm sm:leading-5 lg:text-base lg:leading-[24px] lg:pb-8
      w-[288px] sm:w-[400px] md:w-[488px] lg:w-[696px] xl:w-[584px] 2xl:w-[676px] 3xl:w-[779px]"
      >
        {t("platformDescription")}
      </span>
      <div className="flex justify-center items-center gap-4 lg:gap-[14px]">
        <Link
          href="/register?role=STUDENT"
          className="font-helveticaneue-medium text-xs leading-4 px-[34px] py-[14px] rounded-[40px] bg-[#FFD52A] cursor-pointer
        sm:text-sm sm:leading-5 lg:px-[44px] lg:py-[19px] text-[#0C0F21]"
        >
          <span className="hidden sm:inline">{t("becomeStudent")}</span>
          <span className="inline sm:hidden">{t("student")}</span>
        </Link>
        <Link
          href="/register?role=TEACHER"
          className="font-helveticaneue-medium text-xs leading-4 px-[34px] py-[14px] rounded-[40px] bg-[#F6F7FB] cursor-pointer
        sm:text-sm sm:leading-5 lg:px-[44px] lg:py-[19px] text-[#0C0F21]"
        >
          <span className="hidden sm:inline">{t("becomeTutor")}</span>
          <span className="inline sm:hidden">{t("tutor")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
