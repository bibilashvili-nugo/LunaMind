"use client";

import { useEffect, useState } from "react";
import { headerData } from "../../constants/data";
import { AccountCircle, ArrowDown, GeorgianFlag } from "../ui/Icons";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(headerData[0]?.href || "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      headerData.forEach((item) => {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveId(item.href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = (
    e: React.MouseEvent<HTMLElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offset = 80;
      const elementPosition =
        targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(href);
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
          <div className="text-2xl leading-[100%] font-aclonica-regular xl:text-[32px]">
            LunaMind
          </div>
          <ul className="flex bg-[#F6F7FB] rounded-[50px] p-1">
            {headerData.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  onMouseEnter={() => setHoveredId(item.href)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`font-helveticaneue-regular text-sm leading-5 px-5 py-3 cursor-pointer rounded-[50px] 3xl:text-base 3xl:leading-6
                  ${
                    hoveredId
                      ? hoveredId === item.href
                        ? "text-[#0C0F21] bg-white"
                        : "text-[#737373] bg-[#F6F7FB]"
                      : activeId === item.href
                      ? "text-[#0C0F21] bg-white"
                      : "text-[#737373] bg-[#F6F7FB]"
                  }`}
                >
                  <a
                    href={item.href}
                    onClick={(e) => e.preventDefault()}
                    className="block w-full h-full"
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 xl:gap-6">
            <div className="bg-[#FFD52A] py-[14px] px-[24px] rounded-[40px] xl:flex xl:items-center xl:gap-2">
              <AccountCircle />
              <span className="hidden xl:block xl:text-sm xl:leading-5 3xl:text-base 3xl:leading-[24px] font-helveticaneue-medium">
                შესვლა
              </span>
            </div>
            <div className="flex items-center py-[10px] pl-[10px] border border-[#EDEEF2] rounded-[40px]">
              <GeorgianFlag />
              <ArrowDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
