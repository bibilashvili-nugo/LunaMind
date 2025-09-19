"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, GeorgianFlag, RussiaLangugage, UsaLanguage } from "./Icons";
import { useIntlContext } from "@/providers/IntlProvider";
import { useClickOutside } from "@/hooks/useClickOutside";

const LanguageDropDown = () => {
  const { locale, setLocale } = useIntlContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: "ka" | "en" | "ru") => {
    setLocale(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  const getCurrentLanguageDisplay = () => {
    if (locale === "ka") return <GeorgianFlag />;
    if (locale === "en") return <UsaLanguage />;
    if (locale === "ru") return <RussiaLangugage />;
    return null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center py-[10px] pl-[10px] pr-[12px] border border-[#EDEEF2] rounded-[40px] bg-white hover:bg-gray-50 transition"
      >
        {mounted ? (
          getCurrentLanguageDisplay()
        ) : (
          <div className="slot-machine">
            <div className="slot-machine-inner">
              <GeorgianFlag />
              <UsaLanguage />
              <RussiaLangugage />
              <GeorgianFlag />
              <UsaLanguage />
              <RussiaLangugage />
            </div>
          </div>
        )}

        <div
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <ArrowDown />
        </div>
      </button>

      {isOpen && mounted && (
        <ul className="absolute right-0 mt-2 w-[140px] bg-white border border-[#EDEEF2] rounded-lg shadow-lg z-50">
          <li
            onClick={() => changeLanguage("ka")}
            className="px-2 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[160px] h-[40px]"
          >
            <GeorgianFlag />
            <span>ქართული</span>
          </li>
          <li
            onClick={() => changeLanguage("en")}
            className="px-2 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[160px] h-[40px]"
          >
            <UsaLanguage />
            <span>English</span>
          </li>
          <li
            onClick={() => changeLanguage("ru")}
            className="px-2 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[160px] h-[40px]"
          >
            <RussiaLangugage />

            <span>Русский</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageDropDown;
