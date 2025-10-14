"use client";

import { useEffect, useState } from "react";
import { AccountCircle } from "../ui/Icons";
import Link from "next/link";
import LanguageDropDown from "../ui/LanguageDropDown";
import { useTranslations } from "next-intl";

const NAV_OFFSET = 80;

type HeaderKey = "home" | "why" | "tutors" | "reviews" | "packages";

const NavBar = () => {
  const headerLinks: { key: HeaderKey; href: string }[] = [
    { key: "home", href: "#home" },
    { key: "why", href: "#why" },
    { key: "tutors", href: "#tutors" },
    { key: "reviews", href: "#reviews" },
    { key: "packages", href: "#packages" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(headerLinks[0]?.href || "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      setIsScrolled(window.scrollY > 300);

      if (window.scrollY === 0) {
        setActiveId(headerLinks[0].href);
        return;
      }

      for (const item of headerLinks) {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - NAV_OFFSET <= 0 && rect.bottom - NAV_OFFSET > 0) {
            setActiveId(item.href);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const handleScrollClick = (
    e: React.MouseEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetEl = document.getElementById(href.replace("#", ""));
    if (targetEl) {
      setIsScrolling(true);

      let offsetPosition = 0;
      if (href !== "#home") {
        const elementPosition =
          targetEl.getBoundingClientRect().top + window.scrollY;
        offsetPosition = elementPosition - NAV_OFFSET;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(href);

      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full pb-[20px] z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/70 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <div className="flex items-center justify-between pt-6">
          <div
            className="text-2xl leading-[100%] font-aclonica-regular xl:text-[32px] cursor-pointer"
            onClick={(e) => handleScrollClick(e, "#home")}
          >
            LunaMind
          </div>

          <ul className="flex bg-[#F6F7FB] rounded-[50px] p-1">
            {headerLinks.map((item) => {
              const isHovered = hoveredId === item.href;
              const isActive = activeId === item.href;
              const liClass = `font-helveticaneue-regular text-sm leading-5 px-5 py-3 cursor-pointer rounded-[50px] 3xl:text-base 3xl:leading-6 transition-all duration-300 ${
                isHovered
                  ? "text-[#0C0F21] bg-white scale-105"
                  : !hoveredId && isActive
                  ? "text-[#0C0F21] bg-white"
                  : "text-[#737373] bg-[#F6F7FB] hover:text-[#0C0F21] hover:bg-white  hover:scale-105"
              }`;
              return (
                <li
                  key={item.href}
                  className={liClass}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  onMouseEnter={() => setHoveredId(item.href)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {mounted
                    ? t(`header.${item.key}`, { fallback: item.key })
                    : item.key}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 xl:gap-6">
            <Link href={"/login"}>
              <div className="bg-[#FFD52A] py-[14px] px-[24px] rounded-[40px] xl:flex xl:items-center xl:gap-2">
                <AccountCircle />
                <span className="hidden xl:block xl:text-sm xl:leading-5 3xl:text-base 3xl:leading-[24px] font-helveticaneue-medium">
                  {mounted ? t("header.login") : <span></span>}
                </span>
              </div>
            </Link>

            <LanguageDropDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
