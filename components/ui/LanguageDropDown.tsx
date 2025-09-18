// "use client";

// import { useEffect, useState } from "react";
// import { ArrowDown, GeorgianFlag, RussiaLangugage, UsaLanguage } from "./Icons";
// import { useIntlContext } from "@/providers/IntlProvider";

// const LanguageDropDown = () => {
//   const { locale, setLocale } = useIntlContext();
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false); // ✅ Track client mount

//   useEffect(() => {
//     setMounted(true); // Component is mounted on the client
//   }, []);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const changeLanguage = (lang: "ka" | "en" | "ru") => {
//     setLocale(lang);
//     localStorage.setItem("language", lang); // Save to localStorage
//     setIsOpen(false);
//   };

//   const getCurrentLanguageDisplay = () => {
//     if (locale === "ka") return <GeorgianFlag />;
//     if (locale === "en") return <UsaLanguage />;
//     if (locale === "ru") return <RussiaLangugage />;
//     return null;
//   };

//   if (!mounted) return null;
//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center py-[10px] pl-[10px] pr-[12px] border border-[#EDEEF2] rounded-[40px] bg-white hover:bg-gray-50 transition"
//       >
//         {getCurrentLanguageDisplay()}
//         <div
//           className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
//         >
//           <ArrowDown />
//         </div>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <ul className="absolute right-0 mt-2 w-[140px] bg-white border border-[#EDEEF2] rounded-lg shadow-lg z-50">
//           <li
//             onClick={() => changeLanguage("ka")}
//             className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[140px]"
//           >
//             <span className="w-6 h-6 flex-shrink-0 flex gap-0.5 items-center">
//               <GeorgianFlag />
//             </span>
//             <span>ქართული</span>
//           </li>
//           <li
//             onClick={() => changeLanguage("en")}
//             className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[140px]"
//           >
//             <span className="w-6 h-6 flex-shrink-0 flex gap-0.5 items-center">
//               <UsaLanguage />
//             </span>
//             <span>English</span>
//           </li>
//           <li
//             onClick={() => changeLanguage("ru")}
//             className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
//           >
//             <span className="w-6 h-6 flex-shrink-0 flex gap-0.5 items-center">
//               <RussiaLangugage />
//             </span>
//             <span>Русский</span>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LanguageDropDown;

"use client";

import { useEffect, useState } from "react";
import { ArrowDown, GeorgianFlag, RussiaLangugage, UsaLanguage } from "./Icons";
import { useIntlContext } from "@/providers/IntlProvider";

const LanguageDropDown = () => {
  const { locale, setLocale } = useIntlContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center py-[10px] pl-[10px] pr-[12px] border border-[#EDEEF2] rounded-[40px] bg-white hover:bg-gray-50 transition"
      >
        {mounted ? (
          getCurrentLanguageDisplay()
        ) : (
          <div className="flex gap-1 animate-shake">
            <GeorgianFlag />
            <UsaLanguage />
            <RussiaLangugage />
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
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[140px]"
          >
            <GeorgianFlag />
            <span>ქართული</span>
          </li>
          <li
            onClick={() => changeLanguage("en")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 max-w-[140px]"
          >
            <UsaLanguage />
            <span>English</span>
          </li>
          <li
            onClick={() => changeLanguage("ru")}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
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
