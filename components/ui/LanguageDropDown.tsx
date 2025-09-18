"use client";

import { ArrowDown, GeorgianFlag } from "./Icons";
import { useIntlContext } from "@/providers/IntlProvider";

const LanguageDropDown = () => {
  const { locale, setLocale } = useIntlContext();

  const toggleLanguage = () => {
    setLocale(locale === "ka" ? "en" : "ka");
  };
  return (
    <div
      className="flex items-center py-[10px] pl-[10px] border border-[#EDEEF2] rounded-[40px]"
      onClick={toggleLanguage}
    >
      {locale === "ka" ? <GeorgianFlag /> : <span>EN</span>}
      <ArrowDown />
    </div>
  );
};

export default LanguageDropDown;
